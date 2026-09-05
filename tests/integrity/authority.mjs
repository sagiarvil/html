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
const required=['assets/css/authority.css','assets/js/authority-tool.js','methodology.html','sitemap.xml','llms.txt','index.md'];
for(const rel of required)if(!fs.existsSync(path.join(root,rel)))errors.push(`missing authority file: ${rel}`);
for(const [rel,lang,canonical,alternate,categories] of pages){
 const p=path.join(root,rel);if(!fs.existsSync(p)){errors.push(`missing authority page: ${rel}`);continue}
 const text=fs.readFileSync(p,'utf8');
 if(!new RegExp(`<html lang=["']${lang}["']`,'i').test(text))errors.push(`${rel}: wrong html lang`);
 if(!text.includes(`https://htmlandhtml.com${canonical}`))errors.push(`${rel}: canonical missing`);
 if(!text.includes(`https://htmlandhtml.com${alternate}`))errors.push(`${rel}: hreflang pair missing`);
 if(!text.includes(`data-tool-categories="${categories}"`))errors.push(`${rel}: tool category scope drift`);
 if(!/\/api\/scan/.test(fs.readFileSync(path.join(root,'assets/js/authority-tool.js'),'utf8')))errors.push('authority tool must call shared /api/scan');
 if(!/application\/ld\+json/.test(text))errors.push(`${rel}: structured data missing`);
 if(!/rel="describedby"/.test(text))errors.push(`${rel}: llms.txt discovery missing`);
}
const methodology=fs.readFileSync(path.join(root,'methodology.html'),'utf8');
for(const token of ['OFFICIAL_STANDARD','OFFICIAL_VENDOR','PROPOSAL','MEASURED','INTERNAL_HEURISTIC','EXPERIMENTAL','NOT_MEASURED','SSRF'])if(!methodology.includes(token))errors.push(`methodology missing governance token: ${token}`);
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
for(const [, ,canonical] of pages){const absolute=`https://htmlandhtml.com${canonical}`;if(!sitemap.includes(absolute))errors.push(`sitemap missing ${absolute}`);if(!llms.includes(absolute))errors.push(`llms.txt missing ${absolute}`)}
if(!sitemap.includes('https://htmlandhtml.com/methodology.html'))errors.push('sitemap missing methodology');
if(!llms.includes('https://htmlandhtml.com/methodology.html'))errors.push('llms.txt missing methodology');
if(!/Unknown or unavailable measurements are excluded/i.test(llms))errors.push('llms.txt missing unknown-score boundary');
if(errors.length){console.error('AUTHORITY INTEGRITY FAIL');for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('AUTHORITY INTEGRITY PASS: localized tools, shared scan core, methodology, sitemap/hreflang and machine-readable authority graph verified.');
