import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const pages=[
  ['tr/llms-txt-validator/index.html','tr','/tr/llms-txt-validator/','/en/llms-txt-validator/','llms,ai,links'],
  ['en/llms-txt-validator/index.html','en','/en/llms-txt-validator/','/tr/llms-txt-validator/','llms,ai,links'],
  ['tr/ai-crawler-checker/index.html','tr','/tr/ai-crawler-checker/','/en/ai-crawler-checker/','ai,crawl'],
  ['en/ai-crawler-checker/index.html','en','/en/ai-crawler-checker/','/tr/ai-crawler-checker/','ai,crawl'],
  ['tr/ai-website-readiness/index.html','tr','/tr/ai-website-readiness/','/en/ai-website-readiness/','crawl,technical,ai,llms,schema,performance,accessibility,security,trust,agent,conversion,links'],
  ['en/ai-website-readiness/index.html','en','/en/ai-website-readiness/','/tr/ai-website-readiness/','crawl,technical,ai,llms,schema,performance,accessibility,security,trust,agent,conversion,links']
];
pages.push(['tr/ai-mention-tracker/index.html','tr','/tr/ai-mention-tracker/','/en/ai-mention-tracker/','']);
pages.push(['en/ai-mention-tracker/index.html','en','/en/ai-mention-tracker/','/tr/ai-mention-tracker/','']);
const trustPages=['about/index.html','contact/index.html','privacy/index.html','terms/index.html'];
const authorityReferencePages=['standard/index.html','reference/ai-crawlers/index.html'];
const required=['assets/css/authority.css','assets/js/authority-tool.js','methodology.html','sitemap.xml','llms.txt','index.md','openapi.json','audit-profile.json','sources.json','scripts/check-source-registry.mjs','.github/workflows/source-registry.yml','.github/workflows/firebase-production.yml','functions-firebase/package.json','functions-firebase/src/index.ts','functions-firebase/scripts/sync-engine.mjs',...trustPages,...authorityReferencePages];
for(const rel of required)if(!fs.existsSync(path.join(root,rel)))errors.push(`missing authority file: ${rel}`);
const toolJs=fs.readFileSync(path.join(root,'assets/js/authority-tool.js'),'utf8');
if(!/\/api\/scan/.test(toolJs))errors.push('authority tool must call shared /api/scan');
for(const [rel,lang,canonical,alternate,categories] of pages){
 const p=path.join(root,rel);if(!fs.existsSync(p)){errors.push(`missing authority page: ${rel}`);continue}
 const text=fs.readFileSync(p,'utf8');
 if(!new RegExp(`<html lang=["']${lang}["']`,'i').test(text))errors.push(`${rel}: wrong html lang`);
 if(!text.includes(`https://htmlandhtml.com${canonical}`))errors.push(`${rel}: canonical missing`);
 if(!text.includes(`https://htmlandhtml.com${alternate}`))errors.push(`${rel}: hreflang pair missing`);
 if(categories&&!text.includes(`data-tool-categories="${categories}"`))errors.push(`${rel}: tool category scope drift`);
 if(!/application\/ld\+json/.test(text))errors.push(`${rel}: structured data missing`);
 if(!/rel="describedby"/.test(text))errors.push(`${rel}: llms.txt discovery missing`);
}
for(const rel of [...trustPages,...authorityReferencePages]){const text=fs.readFileSync(path.join(root,rel),'utf8');if(!/rel="canonical"/.test(text)||!/application\/ld\+json/.test(text))errors.push(`${rel}: canonical/schema authority contract missing`)}
const methodology=fs.readFileSync(path.join(root,'methodology.html'),'utf8');
const sourceClasses=['OFFICIAL_STANDARD','OFFICIAL_VENDOR','PROPOSAL','MEASURED','INTERNAL_HEURISTIC','EXPERIMENTAL'];
for(const token of [...sourceClasses,'NOT_MEASURED','SSRF'])if(!methodology.includes(token))errors.push(`methodology missing governance token: ${token}`);
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
const homepage=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [, ,canonical] of pages){const absolute=`https://htmlandhtml.com${canonical}`;if(!sitemap.includes(absolute))errors.push(`sitemap missing ${absolute}`);if(!llms.includes(absolute))errors.push(`llms.txt missing ${absolute}`)}
for(const href of ['/tr/llms-txt-validator/','/tr/ai-crawler-checker/','/tr/ai-website-readiness/','/methodology.html'])if(!homepage.includes(`href="${href}"`))errors.push(`homepage missing authority internal link: ${href}`);
for(const route of ['/about/','/contact/','/privacy/','/terms/']){if(!sitemap.includes(`https://htmlandhtml.com${route}`))errors.push(`sitemap missing trust route ${route}`);if(!llms.includes(`https://htmlandhtml.com${route}`))errors.push(`llms.txt missing trust route ${route}`)}
for(const route of ['/standard/','/reference/ai-crawlers/']){if(!sitemap.includes(`https://htmlandhtml.com${route}`))errors.push(`sitemap missing authority reference ${route}`);if(!llms.includes(`https://htmlandhtml.com${route}`))errors.push(`llms.txt missing authority reference ${route}`)}
if(!llms.includes('https://htmlandhtml.com/audit-profile.json'))errors.push('llms.txt missing audit profile JSON');
if(!llms.includes('https://htmlandhtml.com/sources.json'))errors.push('llms.txt missing source registry JSON');
if(!llms.includes('https://htmlandhtml.com/methodology.html'))errors.push('llms.txt missing methodology');
if(!llms.includes('https://htmlandhtml.com/openapi.json'))errors.push('llms.txt missing OpenAPI contract');
if(!/Unknown or unavailable measurements are excluded/i.test(llms))errors.push('llms.txt missing unknown-score boundary');

const profile=JSON.parse(fs.readFileSync(path.join(root,'audit-profile.json'),'utf8'));
if(profile.status!=='public-product-profile')errors.push('audit profile must state public-product-profile status');
if(!/not an IETF, W3C/i.test(profile.disclaimer||''))errors.push('audit profile must explicitly reject third-party standard implication');
const canonicalEngine=fs.readFileSync(path.join(root,'functions/lib/scan-engine.ts'),'utf8');
const wm=canonicalEngine.match(/const overallWeights:Record<Category,number>=\{([^}]+)\}/);
if(!wm)errors.push('canonical scan engine overallWeights not parseable');
else{
 const canonicalWeights={};for(const m of wm[1].matchAll(/(\w+):(\d+)/g))canonicalWeights[m[1]]=Number(m[2]);
 const publicWeights=Object.fromEntries((profile.engines||[]).map(x=>[x.id,x.overallWeight]));
 for(const [id,w] of Object.entries(canonicalWeights))if(publicWeights[id]!==w)errors.push(`public audit profile weight drift: ${id}=${publicWeights[id]} canonical=${w}`);
 if(Object.keys(publicWeights).length!==Object.keys(canonicalWeights).length)errors.push('public audit profile engine cardinality drift');
 if(Object.values(publicWeights).reduce((a,b)=>a+Number(b),0)!==100)errors.push('public audit profile weights must total 100');
}
const registry=JSON.parse(fs.readFileSync(path.join(root,'sources.json'),'utf8'));
const ids=new Set();for(const s of registry.sources||[]){if(!s.id||ids.has(s.id))errors.push(`source registry duplicate/missing id: ${s.id}`);ids.add(s.id);if(!sourceClasses.includes(s.class))errors.push(`source registry class outside scanner model: ${s.id}/${s.class}`);if(!String(s.url||'').startsWith('https://'))errors.push(`source registry non-https URL: ${s.id}`);if(!/^\d{4}-\d{2}-\d{2}$/.test(s.lastVerified||''))errors.push(`source registry invalid lastVerified: ${s.id}`)}
for(const id of ['RFC9309','OPENAI-SEARCH','OPENAI-PUBLISHERS','ANTHROPIC-CRAWLERS','PERPLEXITY-ROBOTS','GOOGLE-COMMON-CRAWLERS','LLMS-TXT-V2','LLMS-TXT-CHANGES'])if(!ids.has(id))errors.push(`source registry missing decision source: ${id}`);

const openapi=JSON.parse(fs.readFileSync(path.join(root,'openapi.json'),'utf8'));
if(openapi.openapi!=='3.1.0')errors.push('OpenAPI must be 3.1.0');
for(const route of ['/api/health','/api/scan','/api/mentions','/api/mandate'])if(!openapi.paths?.[route])errors.push(`OpenAPI missing ${route}`);
const firebase=JSON.parse(fs.readFileSync(path.join(root,'firebase.json'),'utf8'));
const rewrites=firebase.hosting?.rewrites||[];for(const route of ['/api/health','/api/scan','/api/mentions','/api/mandate'])if(!rewrites.some(r=>r.source===route&&r.function?.functionId))errors.push(`Firebase missing API rewrite ${route}`);
if(!Array.isArray(firebase.functions)||firebase.functions[0]?.source!=='functions-firebase')errors.push('Firebase functions source not configured');
const adapter=fs.readFileSync(path.join(root,'functions-firebase/src/index.ts'),'utf8');
if(!adapter.includes("from './scan-request'"))errors.push('Firebase adapter must consume synced canonical scan request wrapper');
const sync=fs.readFileSync(path.join(root,'functions-firebase/scripts/sync-engine.mjs'),'utf8');
if(!sync.includes('../functions/lib/')||!sync.includes('scan-engine.ts')||!sync.includes('scan-request.ts'))errors.push('Firebase sync must source canonical scan engine and request wrapper');
if(fs.existsSync(path.join(root,'.well-known/agent-card.json'))||fs.existsSync(path.join(root,'mcp')))errors.push('Do not add fake A2A/MCP surfaces merely to improve score');
if(errors.length){console.error('AUTHORITY INTEGRITY FAIL');for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('AUTHORITY INTEGRITY PASS: localized tools, trust surfaces, public audit profile, source registry, canonical weights, OpenAPI and Firebase production topology verified.');
