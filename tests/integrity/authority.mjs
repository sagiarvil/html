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
const trustPages=['about/index.html','contact/index.html','privacy/index.html','terms/index.html'];
const required=['assets/css/authority.css','assets/js/authority-tool.js','methodology.html','sitemap.xml','llms.txt','index.md','openapi.json','.github/workflows/firebase-production.yml','functions-firebase/package.json','functions-firebase/src/index.ts','functions-firebase/scripts/sync-engine.mjs',...trustPages];
for(const rel of required)if(!fs.existsSync(path.join(root,rel)))errors.push(`missing authority file: ${rel}`);
const toolJs=fs.readFileSync(path.join(root,'assets/js/authority-tool.js'),'utf8');
if(!/\/api\/scan/.test(toolJs))errors.push('authority tool must call shared /api/scan');
for(const [rel,lang,canonical,alternate,categories] of pages){
 const p=path.join(root,rel);if(!fs.existsSync(p)){errors.push(`missing authority page: ${rel}`);continue}
 const text=fs.readFileSync(p,'utf8');
 if(!new RegExp(`<html lang=["']${lang}["']`,'i').test(text))errors.push(`${rel}: wrong html lang`);
 if(!text.includes(`https://htmlandhtml.com${canonical}`))errors.push(`${rel}: canonical missing`);
 if(!text.includes(`https://htmlandhtml.com${alternate}`))errors.push(`${rel}: hreflang pair missing`);
 if(!text.includes(`data-tool-categories="${categories}"`))errors.push(`${rel}: tool category scope drift`);
 if(!/application\/ld\+json/.test(text))errors.push(`${rel}: structured data missing`);
 if(!/rel="describedby"/.test(text))errors.push(`${rel}: llms.txt discovery missing`);
}
for(const rel of trustPages){const text=fs.readFileSync(path.join(root,rel),'utf8');if(!/rel="canonical"/.test(text)||!/application\/ld\+json/.test(text))errors.push(`${rel}: canonical/schema trust contract missing`)}
const methodology=fs.readFileSync(path.join(root,'methodology.html'),'utf8');
for(const token of ['OFFICIAL_STANDARD','OFFICIAL_VENDOR','PROPOSAL','MEASURED','INTERNAL_HEURISTIC','EXPERIMENTAL','NOT_MEASURED','SSRF'])if(!methodology.includes(token))errors.push(`methodology missing governance token: ${token}`);
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
const homepage=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [, ,canonical] of pages){const absolute=`https://htmlandhtml.com${canonical}`;if(!sitemap.includes(absolute))errors.push(`sitemap missing ${absolute}`);if(!llms.includes(absolute))errors.push(`llms.txt missing ${absolute}`)}
for(const href of ['/tr/llms-txt-validator/','/tr/ai-crawler-checker/','/tr/ai-website-readiness/','/methodology.html'])if(!homepage.includes(`href="${href}"`))errors.push(`homepage missing authority internal link: ${href}`);
for(const route of ['/about/','/contact/','/privacy/','/terms/']){if(!sitemap.includes(`https://htmlandhtml.com${route}`))errors.push(`sitemap missing trust route ${route}`);if(!llms.includes(`https://htmlandhtml.com${route}`))errors.push(`llms.txt missing trust route ${route}`)}
if(!sitemap.includes('https://htmlandhtml.com/methodology.html'))errors.push('sitemap missing methodology');
if(!llms.includes('https://htmlandhtml.com/methodology.html'))errors.push('llms.txt missing methodology');
if(!llms.includes('https://htmlandhtml.com/openapi.json'))errors.push('llms.txt missing OpenAPI contract');
if(!/Unknown or unavailable measurements are excluded/i.test(llms))errors.push('llms.txt missing unknown-score boundary');
const openapi=JSON.parse(fs.readFileSync(path.join(root,'openapi.json'),'utf8'));
if(openapi.openapi!=='3.1.0')errors.push('OpenAPI must be 3.1.0');
for(const route of ['/api/health','/api/scan','/api/mandate'])if(!openapi.paths?.[route])errors.push(`OpenAPI missing ${route}`);
const firebase=JSON.parse(fs.readFileSync(path.join(root,'firebase.json'),'utf8'));
const rewrites=firebase.hosting?.rewrites||[];for(const route of ['/api/health','/api/scan','/api/mandate'])if(!rewrites.some(r=>r.source===route&&r.function?.functionId))errors.push(`Firebase missing API rewrite ${route}`);
if(!Array.isArray(firebase.functions)||firebase.functions[0]?.source!=='functions-firebase')errors.push('Firebase functions source not configured');
const adapter=fs.readFileSync(path.join(root,'functions-firebase/src/index.ts'),'utf8');
if(!adapter.includes("from './scan-engine'"))errors.push('Firebase adapter must consume synced canonical scan-engine');
const sync=fs.readFileSync(path.join(root,'functions-firebase/scripts/sync-engine.mjs'),'utf8');if(!sync.includes('../functions/lib/scan-engine.ts'))errors.push('Firebase sync must source canonical scan engine');
if(fs.existsSync(path.join(root,'.well-known/agent-card.json'))||fs.existsSync(path.join(root,'mcp')))errors.push('Do not add fake A2A/MCP surfaces merely to improve score');
if(errors.length){console.error('AUTHORITY INTEGRITY FAIL');for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('AUTHORITY INTEGRITY PASS: localized tools, trust surfaces, OpenAPI, canonical scan-core adapter and quality-gated Firebase production topology verified.');
