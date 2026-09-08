import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};

const rootHome=read('index.html');
const trHome=read('tr/index.html');
const enHome=read('en/index.html');
const glossaryTr=read('tr/sozluk/index.html');
const glossaryEn=read('en/glossary/index.html');
const llmsGuideTr=read('tr/rehberler/llms-txt/index.html');
const llmsGuideEn=read('en/guides/llms-txt/index.html');
const sources=read('sources.json');
const runtimeCopy=read('assets/js/validator.js');

for(const [rel,marker] of [
  ['index.html','Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?'],
  ['tr/index.html','Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?'],
  ['en/index.html','Can ChatGPT, Gemini and Perplexity Find Your Website?'],
  ['tr/ai-website-readiness/index.html','GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemap'],
  ['tr/llms-txt-validator/index.html','llms.txt Dosyanız Yapay Zeka İçin Gerçekten Kullanılabilir mi?'],
  ['tr/ai-crawler-checker/index.html','ChatGPT ve Diğer Yapay Zeka Tarayıcıları'],
  ['tr/schema-validator/index.html','Yapay Zeka Sitenizin Kim Olduğunu ve Ne Sunduğunu'],
  ['tr/teknik-seo-kontrol/index.html','Yapay Zeka Arama Görünürlüğünüz Teknik Temelde'],
  ['tr/erisilebilirlik-kontrol/index.html','Yapay Zeka Ajanları ve Kullanıcılar'],
  ['tr/link-kontrol/index.html','Yapay Zeka Sizi Kaynak Gösterdiğinde'],
  ['tr/ai-mention-tracker/index.html','Yapay Zeka Cevaplarında Markanız Gerçekten Geçiyor mu?'],
  ['tr/fiyatlandirma/index.html','Problemi ücretsiz görün.'],
  ['tr/fix-mandate/index.html','Yapay Zeka Görünürlüğünüzün Önündeki Engelleri'],
  ['tr/rehberler/llms-txt/index.html','llms.txt Nedir? Yapay Zeka İçin Makine Okunabilir İçerik Haritası'],
  ['tr/rehberler/ai-arama-gorunurlugu/index.html','Yapay Zeka Arama Sonuçlarında Nasıl Görünür'],
  ['en/llms-txt-validator/index.html','AI Knowledge Surface'],
  ['en/ai-crawler-checker/index.html','ChatGPT Search and Other AI Crawlers'],
]){
  const text=read(rel); expect(text.includes(marker),`${rel}: missing customer-first marker: ${marker}`);
}

const validatorTr = read('tr/llms-txt-validator/index.html');
const validatorEn = read('en/llms-txt-validator/index.html');

for(const term of ['GEO','AEO','LLMO','AAO','RAG','E-E-A-T','llms.txt']){
  expect(rootHome.includes(term),`homepage missing active AI visibility term: ${term}`);
  expect(glossaryTr.includes(term),`TR glossary missing term: ${term}`);
  expect(glossaryEn.includes(term),`EN glossary missing term: ${term}`);
}
expect(validatorTr.includes('Sitemap'),'TR validator missing term: Sitemap');
expect(validatorEn.includes('Sitemap'),'EN validator missing term: Sitemap');

expect(/Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi \| HTML(?:&|&amp;)HTML/.test(rootHome),'homepage title must own transactional AI SEO + ChatGPT visibility intent');
expect(/AI SEO Audit &(?:amp;)? ChatGPT Visibility Test \| HTML(?:&|&amp;)HTML/.test(enHome),'EN homepage title must own AI SEO + ChatGPT visibility intent');
expect(rootHome.includes('$99'),'homepage must expose $99 implementation product');
expect(!rootHome.includes('$149'),'homepage must not retain old $149 price');
const trTools = read('tr/araclar/index.html');
const trPricing = read('tr/fiyatlandirma/index.html');
expect(trTools.includes('data-premium-infographic="scope-map"'),'tools page must use scope-map infographic');
expect(trPricing.includes('data-premium-infographic="report-boundary"'),'pricing page must use report-boundary infographic');
expect(!glossaryTr.includes('Google doğruluk sınırı'),'TR glossary must not render removed accuracy-boundary callout');
expect(!glossaryEn.includes('Google accuracy boundary'),'EN glossary must not render removed accuracy-boundary callout');
expect(llmsGuideTr.includes('Google Search') && llmsGuideTr.includes('llms.txt'),'TR llms guide must explain Google boundary in-context');
expect(llmsGuideEn.includes('Google Search') && llmsGuideEn.includes('llms.txt'),'EN llms guide must explain Google boundary in-context');
expect(sources.includes('GOOGLE-AI-OPTIMIZATION') && sources.includes('OPENAI-PUBLISHERS') && sources.includes('LLMS-TXT-V2'),'source registry missing primary AI visibility authorities');

const forbidden=[
  /Google (?:öneriyor|tavsiye ediyor).*llms\.txt/i,
  /Google Search (?:uses|requires) llms\.txt/i,
  /llms\.txt.*(?:sıralamanızı yükseltir|Google sıralamasını artırır|improves? (?:your )?Google rankings?)/i,
  /(?:ChatGPT|yapay zeka|AI).*(?:kesin tavsiye eder|will definitely recommend you|will recommend your (?:brand|website))/i,
  /(?:garantili trafik|garantili gelir|guaranteed traffic|guaranteed revenue)/i,
  /120\.000\+ site zaten kullanıyor/i,
  /%300 artırdı/i,
  /AEO.*3 kat/i,
  /E-E-A-T.*en önemli kriter/i,
  /dünyanın ilk|world.?s first/i,
  /14\s*KB|14[,.]?336/i,
];
const corpus=[rootHome,trHome,enHome,glossaryTr,glossaryEn,llmsGuideTr,llmsGuideEn,runtimeCopy].join('\n');
for(const re of forbidden)expect(!re.test(corpus),`unsupported commercial/Google claim detected: ${re}`);

expect(rootHome.includes('kaynak olarak değerlendirilmesini') || runtimeCopy.includes('kaynak olarak değerlendirilmesini'),'homepage runtime must explain source-consideration value');
expect(validatorTr.includes('garanti') || validatorTr.includes('Garanti'),'TR validator must retain explicit no-guarantee boundary');
expect(/source consideration/i.test(runtimeCopy),'EN homepage runtime must explain source-consideration value');
expect(validatorEn.includes('not guaranteed') || validatorEn.includes('cannot be guaranteed'),'EN validator must retain no-guarantee boundary');

if(errors.length){console.error('CUSTOMER POSITIONING FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('CUSTOMER POSITIONING PASS: AI SEO/ChatGPT transactional title, $99 execution boundary, premium infographics and source guardrails verified.');
