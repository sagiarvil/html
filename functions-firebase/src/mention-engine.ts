export type MentionProvider='openai'|'perplexity'|'gemini';
export type MentionInput={brand:string;domain?:string;queries:string[];providers?:MentionProvider[]};
export type MentionProviderConfig={openaiApiKey?:string;perplexityApiKey?:string;geminiApiKey?:string};
export type MentionObservation={provider:MentionProvider;surface:string;model:string;query:string;status:'ok'|'not_configured'|'error';mentioned:boolean|null;brandMentions:number;domainMentions:number;citationMatches:number;citations:string[];excerpt:string;error?:string};
export type MentionResult={runId:string;brand:string;domain:string|null;checkedAt:string;queries:string[];providers:MentionProvider[];summary:{observations:number;successful:number;mentions:number;citationMatches:number;mentionRate:number|null;citationRate:number|null};observations:MentionObservation[];disclosure:string};

const PROVIDERS:MentionProvider[]=['openai','perplexity','gemini'];
const TIMEOUT_MS=30000;
const MAX_QUERIES=3;
const MAX_QUERY_LENGTH=280;
const MAX_EXCERPT=700;

function trimText(v:any){return typeof v==='string'?v.trim():''}
function safeHost(input:string){
  const raw=trimText(input);if(!raw)return '';
  try{const u=new URL(/^https?:\/\//i.test(raw)?raw:`https://${raw}`);return u.hostname.toLowerCase().replace(/^www\./,'')}
  catch{return raw.toLowerCase().replace(/^www\./,'').split('/')[0]}
}
function needle(v:string){return v.toLocaleLowerCase('en-US').replace(/\s+/g,' ').trim()}
function count(text:string,target:string){if(!target)return 0;const h=needle(text),n=needle(target);if(!n)return 0;let i=0,c=0;while((i=h.indexOf(n,i))!==-1){c++;i+=n.length}return c}
function uniq<T>(xs:T[]){return [...new Set(xs)]}
function citationMatch(url:string,domain:string){if(!domain)return false;try{const h=new URL(url).hostname.toLowerCase().replace(/^www\./,'');return h===domain||h.endsWith(`.${domain}`)}catch{return false}}
function runId(){return `mention_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,10)}`}
function excerpt(text:string){const t=text.replace(/\s+/g,' ').trim();return t.length>MAX_EXCERPT?t.slice(0,MAX_EXCERPT-1)+'…':t}
function validate(input:MentionInput){
  const brand=trimText(input?.brand);if(brand.length<2||brand.length>80)throw new Error('Brand must be 2–80 characters');
  const domain=safeHost(input?.domain||'');
  const queries=Array.isArray(input?.queries)?input.queries.map(trimText).filter(Boolean):[];
  if(!queries.length||queries.length>MAX_QUERIES)throw new Error(`Provide 1–${MAX_QUERIES} neutral queries`);
  for(const q of queries){if(q.length<8||q.length>MAX_QUERY_LENGTH)throw new Error(`Each query must be 8–${MAX_QUERY_LENGTH} characters`);const l=needle(q);if(l.includes(needle(brand))||(domain&&l.includes(domain)))throw new Error('Queries must be neutral and must not contain the tracked brand or domain');}
  const providers=(Array.isArray(input?.providers)?input.providers:PROVIDERS).filter((x):x is MentionProvider=>PROVIDERS.includes(x as MentionProvider));
  if(!providers.length)throw new Error('Select at least one provider');
  return {brand,domain,queries,providers:uniq(providers)};
}
async function fetchJson(url:string,init:RequestInit){const r=await fetch(url,{...init,signal:AbortSignal.timeout(TIMEOUT_MS)});const text=await r.text();let data:any=null;try{data=JSON.parse(text)}catch{}if(!r.ok)throw new Error(`${r.status} ${data?.error?.message||data?.error||text.slice(0,180)||'Provider request failed'}`);return data}
function assess(provider:MentionProvider,surface:string,model:string,query:string,text:string,citations:string[],brand:string,domain:string):MentionObservation{
  const clean=uniq(citations.filter(x=>/^https?:\/\//i.test(x)));
  const brandMentions=count(text,brand),domainMentions=domain?count(text,domain):0,citationMatches=clean.filter(x=>citationMatch(x,domain)).length;
  return {provider,surface,model,query,status:'ok',mentioned:(brandMentions+domainMentions+citationMatches)>0,brandMentions,domainMentions,citationMatches,citations:clean,excerpt:excerpt(text)};
}
function urlsDeep(value:any,out:string[]=[]):string[]{if(!value)return out;if(typeof value==='string'){if(/^https?:\/\//i.test(value))out.push(value);return out}if(Array.isArray(value)){for(const x of value)urlsDeep(x,out);return out}if(typeof value==='object'){for(const [k,v] of Object.entries(value)){if((k==='url'||k==='uri')&&typeof v==='string'&&/^https?:\/\//i.test(v))out.push(v);else urlsDeep(v,out)}}return out}
async function openai(query:string,key:string,brand:string,domain:string){
  const model='gpt-5.6-luna';
  const data=await fetchJson('https://api.openai.com/v1/responses',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model,input:query,tools:[{type:'web_search'}],tool_choice:'auto',reasoning:{effort:'low'}})});
  const text=trimText(data.output_text)||((data.output||[]).flatMap((o:any)=>o?.content||[]).map((c:any)=>c?.text||'').filter(Boolean).join('\n'));
  return assess('openai','OpenAI Responses API + web search',model,query,text,urlsDeep(data),brand,domain);
}
async function perplexity(query:string,key:string,brand:string,domain:string){
  const model='sonar-pro';
  const data=await fetchJson('https://api.perplexity.ai/v1/sonar',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model,messages:[{role:'user',content:query}],stream:false})});
  const text=trimText(data?.choices?.[0]?.message?.content);const citations=uniq([...(data?.citations||[]),...(data?.search_results||[]).map((x:any)=>x?.url).filter(Boolean)]);
  return assess('perplexity','Perplexity Sonar API web-search surface',model,query,text,citations,brand,domain);
}
async function gemini(query:string,key:string,brand:string,domain:string){
  const model='gemini-3.8-flash';
  const data=await fetchJson(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'x-goog-api-key':key,'content-type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:query}]}],tools:[{google_search:{}}]})});
  const text=(data?.candidates?.[0]?.content?.parts||[]).map((x:any)=>x?.text||'').filter(Boolean).join('\n');
  const chunks=data?.candidates?.[0]?.groundingMetadata?.groundingChunks||[];const citations=chunks.map((x:any)=>x?.web?.uri).filter(Boolean);
  return assess('gemini','Gemini API + Google Search grounding',model,query,text,citations,brand,domain);
}
async function observe(provider:MentionProvider,query:string,cfg:MentionProviderConfig,brand:string,domain:string):Promise<MentionObservation>{
  const key=provider==='openai'?cfg.openaiApiKey:provider==='perplexity'?cfg.perplexityApiKey:cfg.geminiApiKey;
  const surface=provider==='openai'?'OpenAI Responses API + web search':provider==='perplexity'?'Perplexity Sonar API web-search surface':'Gemini API + Google Search grounding';
  const model=provider==='openai'?'gpt-5.6-luna':provider==='perplexity'?'sonar-pro':'gemini-3.8-flash';
  if(!trimText(key))return {provider,surface,model,query,status:'not_configured',mentioned:null,brandMentions:0,domainMentions:0,citationMatches:0,citations:[],excerpt:''};
  try{return provider==='openai'?await openai(query,key!,brand,domain):provider==='perplexity'?await perplexity(query,key!,brand,domain):await gemini(query,key!,brand,domain)}
  catch(e:any){return {provider,surface,model,query,status:'error',mentioned:null,brandMentions:0,domainMentions:0,citationMatches:0,citations:[],excerpt:'',error:String(e?.message||'Provider request failed').slice(0,260)}}
}
export function providerAvailability(cfg:MentionProviderConfig){return {openai:Boolean(trimText(cfg.openaiApiKey)),perplexity:Boolean(trimText(cfg.perplexityApiKey)),gemini:Boolean(trimText(cfg.geminiApiKey))}}
export async function runMentionScan(input:MentionInput,cfg:MentionProviderConfig):Promise<MentionResult>{
  const v=validate(input);const observations:MentionObservation[]=[];
  await Promise.all(v.providers.map(async p=>{for(const q of v.queries)observations.push(await observe(p,q,cfg,v.brand,v.domain))}));
  observations.sort((a,b)=>PROVIDERS.indexOf(a.provider)-PROVIDERS.indexOf(b.provider)||v.queries.indexOf(a.query)-v.queries.indexOf(b.query));
  const ok=observations.filter(x=>x.status==='ok');const mentions=ok.filter(x=>x.mentioned).length;const citationMatches=ok.reduce((s,x)=>s+x.citationMatches,0);const cited=ok.filter(x=>x.citationMatches>0).length;
  return {runId:runId(),brand:v.brand,domain:v.domain||null,checkedAt:new Date().toISOString(),queries:v.queries,providers:v.providers,summary:{observations:observations.length,successful:ok.length,mentions,citationMatches,mentionRate:ok.length?Math.round(mentions/ok.length*100):null,citationRate:ok.length?Math.round(cited/ok.length*100):null},observations,disclosure:'Measures provider API/search-grounded surfaces, not the exact consumer ChatGPT, Perplexity or Gemini UI. Results can vary by model, locale, time, personalization and provider retrieval behavior.'};
}
