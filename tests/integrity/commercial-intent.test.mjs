import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(entry=>{
  const rel=path.join(dir,entry.name);
  return entry.isDirectory()?walk(rel):[rel];
});

const commercial=read('assets/js/commercial-intent.js');
const theme=read('assets/js/theme.js');
const css=read('assets/css/commercial-intent.css');
const llms=read('llms.txt');
const overview=read('index.md');
const injector=read('scripts/inject_commercial_intent.py');

assert(theme.includes('/assets/js/commercial-intent.js?v=1'),'theme.js must load the shared commercial intent enhancement layer');
assert(commercial.includes('AI DISCOVERY → DEMAND → CONVERSION'),'English commercial thesis missing');
assert(commercial.includes('AI KEŞİF → TALEP → DÖNÜŞÜM'),'Turkish commercial thesis missing');
assert(commercial.includes('DISCOVERY')||commercial.includes('BE FOUND'),'Discovery stage missing');
assert(commercial.includes('BULUN'),'Turkish discovery stage missing');
assert(commercial.includes('cannot be guaranteed'),'English anti-guarantee boundary missing');
assert(commercial.includes('garanti edilemez'),'Turkish anti-guarantee boundary missing');
assert(commercial.includes('help.openai.com/en/articles/12627856-publishers-and-developers-faq'),'OpenAI market evidence source missing');
assert(commercial.includes('blog.google/products-and-platforms/products/search/new-controls-website-owners'),'Google market evidence source missing');
assert(commercial.includes('business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable'),'Adobe scoped market evidence source missing');
assert(commercial.includes("'/privacy|/terms|/gizlilik|/kullanim-kosullari")||commercial.includes('\\/privacy|\\/terms|\\/gizlilik|\\/kullanim-kosullari'),'Legal-route exclusion missing');
assert(injector.includes('data-commercial-intent="static"'),'Static HTML injector contract missing');
assert(css.includes('.ai-opportunity'),'Commercial component CSS missing');
assert(css.includes('@media(max-width:600px)'),'Commercial component mobile contract missing');
assert(llms.includes('DISCOVERY → UNDERSTANDING → SOURCE ELIGIBILITY → CLICK → CONVERSION'),'llms.txt commercial chain missing');
assert(overview.includes('DISCOVERY → UNDERSTANDING → SOURCE ELIGIBILITY → CLICK → CONVERSION'),'index.md commercial chain missing');
assert(llms.includes('does not guarantee AI rankings'),'llms.txt guarantee boundary missing');
assert(overview.includes('does not guarantee AI rankings'),'index.md guarantee boundary missing');

const htmlFiles=[...walk('en'),...walk('tr'),'index.html'].filter(p=>p.endsWith('.html'));
const exempt=/(privacy|terms|gizlilik|kullanim-kosullari)/;
const missingTheme=[];
const missingStatic=[];
const missingStaticCss=[];
for(const file of htmlFiles){
  const html=read(file);
  if(exempt.test(file))continue;
  if(!html.includes('/assets/js/theme.js'))missingTheme.push(file);
  if(!html.includes('data-commercial-intent="static"'))missingStatic.push(file);
  if(!html.includes('/assets/css/commercial-intent.css?v=1'))missingStaticCss.push(file);
}
assert(missingTheme.length===0,`Commercial enhancement cannot reach pages missing theme.js: ${missingTheme.join(', ')}`);
assert(missingStatic.length===0,`Static commercial intent missing from canonical HTML: ${missingStatic.join(', ')}`);
assert(missingStaticCss.length===0,`Static commercial CSS missing from canonical HTML: ${missingStaticCss.join(', ')}`);

const rootTr=read('tr/index.html');
const rootEn=read('en/index.html');
assert(rootTr.includes('AI KEŞİF → TALEP → DÖNÜŞÜM'),'TR static commercial thesis missing');
assert(rootEn.includes('AI DISCOVERY → DEMAND → CONVERSION'),'EN static commercial thesis missing');
assert(rootTr.includes('Garanti satmıyoruz'),'TR static anti-guarantee boundary missing');
assert(rootEn.includes('We do not sell guarantees'),'EN static anti-guarantee boundary missing');

const forbidden=[
  /guaranteed\s+(?:AI|ChatGPT|Google|traffic|revenue|rankings?|citations?)/i,
  /guarantee\s+(?:AI|ChatGPT|Google|traffic|revenue|rankings?|citations?)/i,
  /(?:AI|ChatGPT|Google)\s+will\s+(?:recommend|rank|cite)\s+you/i,
  /(?:yapay zeka|ChatGPT|Google).*sizi\s+(?:kesin|garantili).*?(?:öner|sırala|kaynak)/i
];
for(const rx of forbidden){
  assert(!rx.test(commercial),`Forbidden outcome guarantee in commercial copy: ${rx}`);
}

console.log(`commercial-intent: PASS (${htmlFiles.length} localized/root HTML pages covered; static SEO/LLM layer present; legal pages intentionally excluded from sales injection)`);
