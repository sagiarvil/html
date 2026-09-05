import fs from 'node:fs';

const registry=JSON.parse(fs.readFileSync(new URL('../functions/lib/standards-registry.json',import.meta.url),'utf8'));
const llmsRules=JSON.parse(fs.readFileSync(new URL('../functions/lib/llms-rules-v2.json',import.meta.url),'utf8'));

const sources=[
  {
    id:'llms-v2',url:'https://llmstxt.org/changes.html',
    markers:['v2','August 2026','rel="alternate"','rel="describedby"'],
    inspect:text=>{
      const m=text.match(/v(\d+)\s*\(([^)]+)\)/i);
      const latest=m?`v${m[1]}`:null;
      return{observedVersion:latest,expectedVersion:llmsRules.spec.version,drift:Boolean(latest&&latest!==llmsRules.spec.version)};
    }
  },
  {
    id:'openai-crawlers',url:'https://help.openai.com/en/articles/12627856-publishers-and-developers-faq',
    markers:['OAI-SearchBot','GPTBot'],inspect:()=>({drift:false})
  },
  {
    id:'anthropic-crawlers',url:'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler',
    markers:['ClaudeBot','Claude-User','Claude-SearchBot'],inspect:()=>({drift:false})
  },
  {
    id:'google-crawlers',url:'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers',
    markers:['Googlebot','Google-Extended','ranking signal'],inspect:()=>({drift:false})
  },
  {
    id:'a2a',url:'https://a2a-protocol.org/latest/topics/agent-discovery/',
    markers:['agent-card.json','Agent Card'],inspect:()=>({drift:false})
  },
  {
    id:'mcp',url:'https://blog.modelcontextprotocol.io/posts/2026-07-28/',
    markers:['2026-07-28','stateless','Authorization'],
    inspect:text=>{
      const versions=[...text.matchAll(/20\d{2}-\d{2}-\d{2}/g)].map(x=>x[0]);
      const observed=versions[0]||null;
      const expected=registry.policies.find(x=>x.id==='mcp')?.version||null;
      return{observedVersion:observed,expectedVersion:expected,drift:Boolean(observed&&expected&&observed!==expected)};
    }
  }
];

async function get(url){const r=await fetch(url,{headers:{'user-agent':'HTMLandHTML-Standards-Watcher/1.0 (+https://htmlandhtml.com)','accept':'text/html,text/plain;q=0.9,*/*;q=0.5'},redirect:'follow',signal:AbortSignal.timeout(20000)});const text=await r.text();return{status:r.status,text,finalUrl:r.url}}

const report={generatedAt:new Date().toISOString(),registryVersion:registry.registryVersion,llmsRuleSet:llmsRules.ruleSetId,status:'ok',drift:false,checks:[]};
for(const s of sources){try{const x=await get(s.url);const missing=s.markers.filter(m=>!x.text.toLowerCase().includes(m.toLowerCase()));const inspected=s.inspect(x.text);const failed=x.status<200||x.status>=300||missing.length>0;const drift=Boolean(inspected.drift)||failed;report.checks.push({id:s.id,url:s.url,finalUrl:x.finalUrl,httpStatus:x.status,missingMarkers:missing,...inspected,status:drift?'review-required':'ok'});if(drift)report.drift=true}catch(e){report.checks.push({id:s.id,url:s.url,httpStatus:0,missingMarkers:s.markers,error:e?.message||String(e),status:'review-required'});report.drift=true}}
report.status=report.drift?'review-required':'ok';
fs.writeFileSync('standards-watch-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(report.drift)process.exitCode=2;
