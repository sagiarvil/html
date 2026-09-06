import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const assert=(condition,message)=>{if(!condition)throw new Error(message)};
const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(entry=>{const rel=path.join(dir,entry.name);return entry.isDirectory()?walk(rel):[rel]});

const theme=read('assets/js/theme.js');
const css=read('assets/css/commercial-intent.css');
const llms=read('llms.txt');
const overview=read('index.md');
const injector=read('scripts/inject_ai_expectation.py');

assert(theme.includes('data-commercial-intent="static"'),'theme.js must prefer the static commercial layer and avoid duplicate runtime copy');
assert(injector.includes('YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ'),'Turkish expectation-led thesis missing');
assert(injector.includes('AI SEARCH VISIBILITY'),'English expectation-led thesis missing');
assert(injector.includes('Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et'),'Turkish customer-language CTA missing');
assert(injector.includes('Check My AI Visibility Free'),'English customer-language CTA missing');
for(const term of ['llms.txt','GEO','AEO','LLMO','AAO','RAG','E-E-A-T','Sitemap'])assert(injector.includes(term),`commercial vocabulary missing ${term}`);
assert(injector.includes('developers.google.com/search/docs/fundamentals/ai-optimization-guide'),'official Google AI Search source missing');
assert(injector.includes('help.openai.com/en/articles/12627856-publishers-and-developers-faq'),'OpenAI Search source missing');
assert(injector.includes('Tavsiye, sıralama, atıf, trafik, müşteri veya gelir garanti edilmez'),'Turkish anti-guarantee boundary missing');
assert(injector.includes('Recommendations, rankings, citations, traffic, customers and revenue are not guaranteed'),'English anti-guarantee boundary missing');
assert(injector.includes('data-commercial-intent="static"'),'Static HTML injector contract missing');
assert(css.includes('.ai-opportunity')&&css.includes('.ai-term-strip'),'Commercial component and AI term strip CSS missing');
assert(css.includes('@media(max-width:600px)'),'Commercial component mobile contract missing');
assert(llms.includes('DISCOVERY → UNDERSTANDING → SOURCE ELIGIBILITY → RECOMMENDATION OPPORTUNITY → CLICK → CONVERSION'),'llms.txt commercial chain missing');
assert(overview.includes('YAPAY ZEKA KEŞFİ → ANLAŞILMA → KAYNAK OLMA UYGUNLUĞU → TAVSİYE FIRSATI → TIKLAMA → DÖNÜŞÜM'),'index.md customer-language chain missing');
assert(llms.includes('does not guarantee AI rankings'),'llms.txt guarantee boundary missing');
assert(overview.includes('garantisi vermez'),'index.md guarantee boundary missing');

const htmlFiles=[...walk('en'),...walk('tr'),'index.html'].filter(p=>p.endsWith('.html'));
const exempt=/(privacy|terms|gizlilik|kullanim-kosullari)/;
const missingTheme=[],missingStatic=[],missingStaticCss=[];
for(const file of htmlFiles){const html=read(file);if(exempt.test(file))continue;if(!html.includes('/assets/js/theme.js'))missingTheme.push(file);if(!html.includes('data-commercial-intent="static"'))missingStatic.push(file);if(!html.includes('/assets/css/commercial-intent.css?v=2'))missingStaticCss.push(file)}
assert(missingTheme.length===0,`Commercial enhancement cannot reach pages missing theme.js: ${missingTheme.join(', ')}`);
assert(missingStatic.length===0,`Static commercial intent missing from canonical HTML: ${missingStatic.join(', ')}`);
assert(missingStaticCss.length===0,`Static commercial CSS missing from canonical HTML: ${missingStaticCss.join(', ')}`);

const rootTr=read('tr/index.html'),rootEn=read('en/index.html');
assert(rootTr.includes('YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ'),'TR static commercial thesis missing');
assert(rootEn.includes('AI SEARCH VISIBILITY'),'EN static commercial thesis missing');
assert(rootTr.includes('garanti edilmez'),'TR static anti-guarantee boundary missing');
assert(rootEn.includes('not guaranteed'),'EN static anti-guarantee boundary missing');

const joined=htmlFiles.map(read).join('\n')+injector;
const forbidden=[/Ahmet Y\./i,/120\.000\+ site/i,/AI.*will recommend you/i,/yapay zeka.*kesin.*tavsiye/i,/Google onaylı GEO/i,/garantili.*(?:atıf|müşteri|gelir|tavsiye)/i];
for(const rx of forbidden)assert(!rx.test(joined),`Forbidden unsupported outcome/marketing claim: ${rx}`);
console.log(`commercial-intent: PASS (${htmlFiles.length} localized/root HTML pages covered; expectation-led AI search messaging, term layer and anti-guarantee boundaries verified)`);
