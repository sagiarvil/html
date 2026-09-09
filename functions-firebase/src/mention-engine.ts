export type MentionProvider='openai'|'perplexity'|'gemini';
export type MentionInput={brand:string;domain?:string;queries:string[];providers?:MentionProvider[];competitors?:string[]};
export type MentionProviderConfig={openaiApiKey?:string;perplexityApiKey?:string;geminiApiKey?:string};
export type MentionObservation={provider:MentionProvider;surface:string;model:string;query:string;status:'ok'|'not_configured'|'error';mentioned:boolean|null;brandMentions:number;domainMentions:number;competitorMentions:Record<string,number>;citationMatches:number;citations:string[];citationDomains:string[];grounded:boolean|null;excerpt:string;error?:string};
export type MentionResult={runId:string;brand:string;domain:string|null;competitors:string[];checkedAt:string;queries:string[];providers:MentionProvider[];summary:{observations:number;successful:number;mentions:number;citationMatches:number;mentionRate:number|null;citationRate:number|null;groundedObservations:number;groundingRate:number|null;uniqueCitationDomains:number;citationConcentrationHHI:number|null;brandAnswerShare:number|null;competitorMentions:Record<string,number>};observations:MentionObservation[];disclosure:string};

const PROVIDERS:MentionProvider[]=['openai','perplexity','gemini'];
const TIMEOUT_MS=30000;
const MAX_QUERIES=3;
const MAX_QUERY_LENGTH=280;
const MAX_EXCERPT=700;
const MAX_COMPETITORS=5;

function trimText(v:any){return typeof v==='string'?v.trim():''}
function safeHost(input:string){
  const raw=trimText(input);if(!raw)return '';
  try{const u=new URL(/^https?:\/\//i.test(raw)?raw:`https://${raw}`);return u.hostname.toLowerCase().replace(/^www\./,'')}
  catch{return raw.toLowerCase().replace(/^www\./,'').split('/')[0]}
}
function needle(v:string){return v.toLocaleLowerCase('en-US').replace(/\s+/g,' ').trim()}
function count(text:string,target:string){if(!target)return 0;const h=needle(text),n=needle(target);if(!n)return 0;let i=0,c=0;while((i=h.indexOf(n,i))!==-1){c++;i+=n.length}return c}
function uniq<T>(xs:T[]){return [...new Set(xs)]}
function citationDomain(url:string){try{return new URL(url).hostname.toLowerCase().replace(/^www\./,'')}catch{return ''}}
function citationMatch(url:string,domain:string){if(!domain)return false;const h=citationDomain(url);return Boolean(h)&&(h===domain||h.endsWith(`.${domain}`))}
function hhi(domains:string[]){if(!domains.length)return null;const counts=new Map<string,number>();for(const d of domains)counts.set(d,(counts.get(d)||0)+1);const n=domains.length;return Math.round([...counts.values()].reduce((sum,c)=>sum+Math.pow(c/n,2),0)*10000)}
let runSeq = 0;
function runId(){return `mention_${Date.now().toString(36)}_${(++runSeq).toString(36)}`}
function excerpt(text:string){const t=text.replace(/\s+/g,' ').trim();return t.length>MAX_EXCERPT?t.slice(0,MAX_EXCERPT-1)+'…':t}
function validate(input:MentionInput){
  const brand=trimText(input?.brand);if(brand.length<2||brand.length>80)throw new Error('Brand must be 2–80 characters');
  const domain=safeHost(input?.domain||'');
  const queries=Array.isArray(input?.queries)?input.queries.map(trimText).filter(Boolean):[];
  if(!queries.length||queries.length>MAX_QUERIES)throw new Error(`Provide 1–${MAX_QUERIES} neutral queries`);
  for(const q of queries){if(q.length<8||q.length>MAX_QUERY_LENGTH)throw new Error(`Each query must be 8–${MAX_QUERY_LENGTH} characters`);const l=needle(q);if(l.includes(needle(brand))||(domain&&l.includes(domain)))throw new Error('Queries must be neutral and must not contain the tracked brand or domain');}
  const providers=(Array.isArray(input?.providers)?input.providers:PROVIDERS).filter((x):x is MentionProvider=>PROVIDERS.includes(x as MentionProvider));
  if(!providers.length)throw new Error('Select at least one provider');
  const competitors=uniq((Array.isArray(input?.competitors)?input.competitors:[]).map(trimText).filter(Boolean));
  if(competitors.length>MAX_COMPETITORS)throw new Error(`Track at most ${MAX_COMPETITORS} competitors`);
  for(const c of competitors){if(c.length<2||c.length>80)throw new Error('Each competitor must be 2–80 characters');if(needle(c)===needle(brand))throw new Error('Tracked brand cannot also be a competitor');}
  return {brand,domain,queries,providers:uniq(providers),competitors};
}
async function fetchJson(url:string,init:RequestInit){const r=await fetch(url,{...init,signal:AbortSignal.timeout(TIMEOUT_MS)});const text=await r.text();let data:any=null;try{data=JSON.parse(text)}catch{}if(!r.ok)throw new Error(`${r.status} ${data?.error?.message||data?.error||text.slice(0,180)||'Provider request failed'}`);return data}
function assess(provider:MentionProvider,surface:string,model:string,query:string,text:string,citations:string[],brand:string,domain:string,competitors:string[]):MentionObservation{
  const clean=uniq(citations.filter(x=>/^https?:\/\//i.test(x)));
  const citationDomains=uniq(clean.map(citationDomain).filter(Boolean));
  const brandMentions=count(text,brand),domainMentions=domain?count(text,domain):0,citationMatches=clean.filter(x=>citationMatch(x,domain)).length;
  const competitorMentions=Object.fromEntries(competitors.map(c=>[c,count(text,c)]));
  return {provider,surface,model,query,status:'ok',mentioned:(brandMentions+domainMentions+citationMatches)>0,brandMentions,domainMentions,competitorMentions,citationMatches,citations:clean,citationDomains,grounded:clean.length>0,excerpt:excerpt(text)};
}
function urlsDeep(value:any,out:string[]=[]):string[]{if(!value)return out;if(typeof value==='string'){if(/^https?:\/\//i.test(value))out.push(value);return out}if(Array.isArray(value)){for(const x of value)urlsDeep(x,out);return out}if(typeof value==='object'){for(const [k,v] of Object.entries(value)){if((k==='url'||k==='uri')&&typeof v==='string'&&/^https?:\/\//i.test(v))out.push(v);else urlsDeep(v,out)}}return out}
async function openai(query:string,key:string,brand:string,domain:string,competitors:string[]){
  const model='gpt-5.6-luna';
  const data=await fetchJson('https://api.openai.com/v1/responses',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model,input:query,tools:[{type:'web_search'}],tool_choice:'auto',reasoning:{effort:'low'}})});
  const text=trimText(data.output_text)||((data.output||[]).flatMap((o:any)=>o?.content||[]).map((c:any)=>c?.text||'').filter(Boolean).join('\n'));
  return assess('openai','OpenAI Responses API + web search',model,query,text,urlsDeep(data),brand,domain,competitors);
}
async function perplexity(query:string,key:string,brand:string,domain:string,competitors:string[]){
  const model='sonar-pro';
  const data=await fetchJson('https://api.perplexity.ai/v1/sonar',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model,messages:[{role:'user',content:query}],stream:false})});
  const text=trimText(data?.choices?.[0]?.message?.content);const citations=uniq([...(data?.citations||[]),...(data?.search_results||[]).map((x:any)=>x?.url).filter(Boolean)]);
  return assess('perplexity','Perplexity Sonar API web-search surface',model,query,text,citations,brand,domain,competitors);
}
async function gemini(query:string,key:string,brand:string,domain:string,competitors:string[]){
  const model='gemini-3.8-flash';
  const data=await fetchJson(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'x-goog-api-key':key,'content-type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:query}]}],tools:[{google_search:{}}]})});
  const text=(data?.candidates?.[0]?.content?.parts||[]).map((x:any)=>x?.text||'').filter(Boolean).join('\n');
  const chunks=data?.candidates?.[0]?.groundingMetadata?.groundingChunks||[];const citations=chunks.map((x:any)=>x?.web?.uri).filter(Boolean);
  return assess('gemini','Gemini API + Google Search grounding',model,query,text,citations,brand,domain,competitors);
}
async function observe(provider:MentionProvider,query:string,cfg:MentionProviderConfig,brand:string,domain:string,competitors:string[]):Promise<MentionObservation>{
  const key=provider==='openai'?cfg.openaiApiKey:provider==='perplexity'?cfg.perplexityApiKey:cfg.geminiApiKey;
  const surface=provider==='openai'?'OpenAI Responses API + web search':provider==='perplexity'?'Perplexity Sonar API web-search surface':'Gemini API + Google Search grounding';
  const model=provider==='openai'?'gpt-5.6-luna':provider==='perplexity'?'sonar-pro':'gemini-3.8-flash';
  if(!trimText(key))return {provider,surface,model,query,status:'not_configured',mentioned:null,brandMentions:0,domainMentions:0,competitorMentions:Object.fromEntries(competitors.map(c=>[c,0])),citationMatches:0,citations:[],citationDomains:[],grounded:null,excerpt:''};
  try{return provider==='openai'?await openai(query,key!,brand,domain,competitors):provider==='perplexity'?await perplexity(query,key!,brand,domain,competitors):await gemini(query,key!,brand,domain,competitors)}
  catch(e:any){return {provider,surface,model,query,status:'error',mentioned:null,brandMentions:0,domainMentions:0,competitorMentions:Object.fromEntries(competitors.map(c=>[c,0])),citationMatches:0,citations:[],citationDomains:[],grounded:null,excerpt:'',error:String(e?.message||'Provider request failed').slice(0,260)}}
}
export function providerAvailability(cfg:MentionProviderConfig){return {openai:Boolean(trimText(cfg.openaiApiKey)),perplexity:Boolean(trimText(cfg.perplexityApiKey)),gemini:Boolean(trimText(cfg.geminiApiKey))}}
export async function runMentionScan(input:MentionInput,cfg:MentionProviderConfig):Promise<MentionResult>{
  const v=validate(input);const observations:MentionObservation[]=[];
  await Promise.all(v.providers.map(async p=>{for(const q of v.queries)observations.push(await observe(p,q,cfg,v.brand,v.domain,v.competitors))}));
  observations.sort((a,b)=>PROVIDERS.indexOf(a.provider)-PROVIDERS.indexOf(b.provider)||v.queries.indexOf(a.query)-v.queries.indexOf(b.query));
  const ok=observations.filter(x=>x.status==='ok');
  const mentions=ok.filter(x=>x.mentioned).length;
  const citationMatches=ok.reduce((sum,x)=>sum+x.citationMatches,0);
  const cited=ok.filter(x=>x.citationMatches>0).length;
  const grounded=ok.filter(x=>x.grounded===true).length;
  const allCitationDomains=ok.flatMap(x=>x.citations.map(citationDomain).filter(Boolean));
  const competitorMentions=Object.fromEntries(v.competitors.map(c=>[c,ok.reduce((sum,x)=>sum+(x.competitorMentions[c]||0),0)]));
  const brandEntityMentions=ok.reduce((sum,x)=>sum+x.brandMentions+x.domainMentions,0);
  const competitorEntityMentions=Object.values(competitorMentions).reduce((sum,n)=>sum+Number(n||0),0);
  const trackedEntityMentions=brandEntityMentions+competitorEntityMentions;
  return {
    runId:runId(),brand:v.brand,domain:v.domain||null,competitors:v.competitors,checkedAt:new Date().toISOString(),queries:v.queries,providers:v.providers,
    summary:{
      observations:observations.length,successful:ok.length,mentions,citationMatches,
      mentionRate:ok.length?Math.round(mentions/ok.length*100):null,
      citationRate:ok.length?Math.round(cited/ok.length*100):null,
      groundedObservations:grounded,
      groundingRate:ok.length?Math.round(grounded/ok.length*100):null,
      uniqueCitationDomains:new Set(allCitationDomains).size,
      citationConcentrationHHI:hhi(allCitationDomains),
      brandAnswerShare:trackedEntityMentions?Math.round((brandEntityMentions/trackedEntityMentions)*100):null,
      competitorMentions
    },
    observations,
    disclosure:'Measures provider API/search-grounded surfaces, not the exact consumer ChatGPT, Perplexity or Gemini UI. OpenAI and Gemini are configured with search tools available while model/tool selection remains provider-controlled; Perplexity Sonar is a search-native API surface. Grounding rate, citation concentration and Share of Answer are sample observations, not market share or revenue forecasts.'
  };
}
