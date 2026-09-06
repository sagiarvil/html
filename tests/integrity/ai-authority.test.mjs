import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const pairs=[
 ['en/glossary/index.html','tr/sozluk/index.html'],
 ['en/ai-search-visibility/index.html','tr/yapay-zeka-arama-gorunurlugu/index.html'],
 ['en/geo-optimization/index.html','tr/geo-optimizasyon/index.html'],
 ['en/aeo-answer-engine-optimization/index.html','tr/aeo-answer-engine/index.html'],
 ['en/llmo-optimization/index.html','tr/llmo-optimizasyon/index.html'],
 ['en/aao-agent-optimization/index.html','tr/aao-ajent-optimizasyon/index.html'],
 ['en/rag-readiness/index.html','tr/rag-optimizasyon/index.html'],
 ['en/e-e-a-t-trust-signals/index.html','tr/e-e-a-t-guven-sinyalleri/index.html']
];
const must=['GEO','AEO','LLMO','AAO','RAG','E-E-A-T','llms.txt','Sitemap','Yapay Zeka Arama Görünürlüğü'];
for(const [en,tr] of pairs){
  for(const rel of [en,tr]){
    const p=path.join(root,rel); if(!fs.existsSync(p)){errors.push(`missing authority page ${rel}`);continue}
    const x=fs.readFileSync(p,'utf8');
    if((x.match(/<h1\b/gi)||[]).length!==1)errors.push(`${rel}: expected exactly one H1`);
    if(!/rel="canonical"/.test(x)||!/hreflang="en"/.test(x)||!/hreflang="tr"/.test(x))errors.push(`${rel}: canonical/hreflang contract`);
    if(!/data-commercial-intent="static"/.test(x))errors.push(`${rel}: commercial expectation layer missing`);
  }
}
const trGloss=fs.readFileSync(path.join(root,'tr/sozluk/index.html'),'utf8');
const enGloss=fs.readFileSync(path.join(root,'en/glossary/index.html'),'utf8');
for(const t of must)if(!trGloss.includes(t)&&!enGloss.includes(t))errors.push(`glossary missing ${t}`);
const trEvidenceChecks=[
 ['Google doğruluk sınırı',/Google doğruluk sınırı/],
 ['Google recognizes GEO market terminology',/Google GEO terimini açıkça tanıyor/],
 ['Google llms.txt non-use boundary',/Google Arama, Google Search ve üretken yapay zeka özelliklerine dahil edilmek için llms\.txt/],
 ['Google RAG/query-fan-out explanation',/Google['’]ın üretken yapay zeka Arama rehberi/]
];
for(const [name,rx] of trEvidenceChecks)if(!rx.test(trGloss))errors.push(`TR glossary evidence boundary missing: ${name}`);
for(const u of ['developers.google.com/search/docs/fundamentals/ai-optimization-guide','developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap','help.openai.com/en/articles/12627856-publishers-and-developers-faq','llmstxt.org/changes.html'])if(!trGloss.includes(u)||!enGloss.includes(u))errors.push(`glossary source missing ${u}`);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const marker of ['YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ','GEO','AEO','LLMO','AAO','RAG','E-E-A-T','llms.txt','Sitemap','/assets/js/ai-positioning.js'])if(!home.includes(marker))errors.push(`homepage expectation vocabulary missing: ${marker}`);
if(/Ahmet Y\.|120\.000\+ site|%300 Artırdı|sınırsız sayfa/i.test(home+trGloss+enGloss))errors.push('unverified mandate marketing claim leaked into public authority content');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
for(const [en,tr] of pairs){for(const rel of [en,tr]){const url='https://htmlandhtml.com/'+rel.replace(/index\.html$/,'');if(!sitemap.includes(url))errors.push(`sitemap missing ${url}`)}}
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
if(!/AI Search.*Glossary|Yapay Zeka.*Sözlük/i.test(llms))errors.push('llms.txt missing glossary authority route');
const googleLlmsBoundary=/Google Search[^\n]*(?:does not use[^\n]*llms\.txt|llms\.txt[^\n]*does not use)/i.test(llms)||/Google[^\n]*llms\.txt[^\n]*(?:kullanmadığını|kullanmıyor)/i.test(llms);
if(!googleLlmsBoundary)errors.push('llms.txt missing Google accuracy boundary');
if(errors.length){console.error('AI AUTHORITY FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('AI AUTHORITY PASS: expectation-led positioning, bilingual glossary, core GEO/AEO/LLMO/AAO/RAG/E-E-A-T authority routes and evidence boundaries verified.');
