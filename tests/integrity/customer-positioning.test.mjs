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

for(const [rel,marker] of [
  ['index.html','Yapay Zeka Sizi Buluyor mu?'],
  ['tr/index.html','Tavsiye Edilmeye Hazır mısınız?'],
  ['en/index.html','Can AI Find You?'],
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

for(const term of ['GEO','AEO','LLMO','AAO','RAG','E-E-A-T','llms.txt','Sitemap']){
  expect(rootHome.includes(term),`homepage missing active AI visibility term: ${term}`);
  expect(glossaryTr.includes(term),`TR glossary missing term: ${term}`);
  expect(glossaryEn.includes(term),`EN glossary missing term: ${term}`);
}

expect(/Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms\.txt \| HTML(?:&|&amp;)HTML/.test(rootHome),'homepage title must own AI search visibility category');
expect(rootHome.includes('$99'),'homepage must expose $99 implementation product');
expect(!rootHome.includes('$149'),'homepage must not retain old $149 price');
expect(rootHome.includes('data-premium-infographic="tools"'),'homepage must use premium tools infographic');
expect(rootHome.includes('data-premium-infographic="engines"'),'homepage must use premium engine infographic');
expect(rootHome.includes('data-premium-infographic="process"'),'homepage must use premium process infographic');
expect(rootHome.includes('data-premium-infographic="knowledge"'),'homepage must use premium knowledge infographic');
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
];
const corpus=[rootHome,trHome,enHome,glossaryTr,glossaryEn,llmsGuideTr,llmsGuideEn].join('\n');
for(const re of forbidden)expect(!re.test(corpus),`unsupported commercial/Google claim detected: ${re}`);

expect(rootHome.includes('tavsiye edilme fırsatı'),'homepage must sell recommendation opportunity');
expect(rootHome.includes('garanti') || rootHome.includes('Garanti'),'homepage must retain explicit no-guarantee boundary');
expect(enHome.includes('recommendation opportunity'),'EN homepage must sell recommendation opportunity');
expect(enHome.includes('not guaranteed') || enHome.includes('cannot be guaranteed'),'EN homepage must retain no-guarantee boundary');

if(errors.length){console.error('CUSTOMER POSITIONING FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('CUSTOMER POSITIONING PASS: concise AI-recommendation headline, $99 execution boundary, premium infographics and source guardrails verified.');
