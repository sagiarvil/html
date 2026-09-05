import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const required=['index.html','checkout.html','assets/css/validator.css','assets/js/validator.js','functions/api/scan.ts','robots.txt','sitemap.xml','llms.txt'];
for(const rel of required){if(!fs.existsSync(path.join(root,rel)))errors.push(`missing required file: ${rel}`)}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/css/validator.css'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/js/validator.js'),'utf8');
const api=fs.readFileSync(path.join(root,'functions/api/scan.ts'),'utf8');
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
const checks=[
  [/<html lang="tr">/i.test(index),'homepage must declare Turkish default language'],
  [/data-lang="tr"/.test(index)&&/data-lang="en"/.test(index),'TR/EN language controls missing'],
  [/id="scanForm"/.test(index)&&/id="domainInput"/.test(index),'scanner form missing'],
  [/\/api\/scan/.test(js),'client scan endpoint missing'],
  [/onRequestPost/.test(api),'server scan handler missing'],
  [/Fix Mandate/.test(index)&&/Codebase Mandate/.test(index),'commercial mandate tiers missing'],
  [/\$49/.test(index)&&/\$99/.test(index),'mandate prices missing'],
  [/application\/ld\+json/.test(index),'structured data missing'],
  [/^# HTML&HTML/m.test(llms)&&/^> /m.test(llms)&&/^## /m.test(llms),'llms.txt structure incomplete'],
  [css.length>5000,'validator CSS unexpectedly small'],
  [js.length>5000,'validator JS unexpectedly small']
];
for(const [ok,msg] of checks)if(!ok)errors.push(msg);
const forbidden=[/Premium HTML templates/i,/Browse templates/i,/product\.html\?template=/i,/live-preview\.html/i,/HTML5 UP/i,/pixelarity\.com/i];
for(const p of forbidden)if(p.test(index))errors.push(`legacy homepage reference: ${p}`);
const localAttr=/(?:href|src)=["']([^"']+)["']/gi;
for(const file of ['index.html','checkout.html']){
  const text=fs.readFileSync(path.join(root,file),'utf8');let m;
  while((m=localAttr.exec(text))){
    let t=m[1];
    if(!t||t.startsWith('#')||/^(https?:|mailto:|tel:|data:|javascript:)/i.test(t))continue;
    t=t.split('#')[0].split('?')[0];if(!t)continue;
    if(t==='/')t='index.html';else if(t.startsWith('/'))t=t.slice(1);else t=path.relative(root,path.resolve(path.dirname(file),t));
    let resolved=path.join(root,t);
    if(!fs.existsSync(resolved)&&!path.extname(resolved)&&fs.existsSync(resolved+'.html'))resolved+='.html';
    if(!fs.existsSync(resolved))errors.push(`${file}: missing local target ${m[1]}`);
  }
}
if(errors.length){console.error('INTEGRITY FAIL');for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('INTEGRITY PASS: bilingual validator, scanner endpoint, mandate pricing and machine-readable files verified.');
