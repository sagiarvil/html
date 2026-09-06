import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const data=JSON.parse(fs.readFileSync(path.join(root,'data/llms-news.json'),'utf8'));
expect(data.version==='1.0.0','news data version must be 1.0.0');
expect(data.editorialPolicy==='ORIGINAL_ANALYSIS_WITH_PRIMARY_SOURCE_LINK','news editorial policy marker missing');
expect(Array.isArray(data.items)&&data.items.length>=5,'news seed must contain at least five verified briefs');
expect(fs.existsSync(path.join(root,'docs/LLMS_NEWS_EDITORIAL_POLICY.md')),'editorial policy document missing');
expect(fs.existsSync(path.join(root,'.github/workflows/llms-news.yml')),'daily news workflow missing');
const workflow=fs.readFileSync(path.join(root,'.github/workflows/llms-news.yml'),'utf8');
expect(workflow.includes("cron: '0 0 * * *'"),'news schedule must run at 00:00 UTC / 03:00 Turkey');
expect(workflow.includes('NEWS_EDITORIAL_OPENAI_KEY'),'news workflow must use explicit editorial credential');
expect(workflow.includes('steps.editorial.outputs.changed'),'news workflow must avoid no-op daily commits');
const updater=fs.readFileSync(path.join(root,'scripts/update_llms_news.py'),'utf8');
expect(updater.includes('LLMS_NEWS_SAFE_NOOP'),'missing-key editorial automation must fail closed as safe no-op');
expect(updater.includes('MAX_NEW=3'),'daily automatic publish cap must remain 3');
for(const host of ['developers.google.com','searchengineland.com','openai.com','sparktoro.com','www.mariehaynes.com'])expect(updater.includes(host),`fixed monitor source missing: ${host}`);

function slug(v){return String(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,90)}
const sourceUrls=new Set();
for(const item of data.items){
  expect(item.id&&item.sourceUrl&&item.publishedAt,`news item identity incomplete: ${item.id}`);
  expect(/^https:\/\//.test(item.sourceUrl),`${item.id}: sourceUrl must be HTTPS`);
  expect(!sourceUrls.has(item.sourceUrl),`${item.id}: duplicate sourceUrl`);sourceUrls.add(item.sourceUrl);
  expect(!('author' in item),`${item.id}: external author data must not be stored for rendering`);
  for(const k of ['title','dek','summary','whyItMatters','technicalImpact','actions','boundary']){
    expect(item[k]!=null,`${item.id}: missing ${k}`);
    if(k!=='actions')expect(item[k]?.tr&&item[k]?.en,`${item.id}: ${k} must be bilingual`);
    else expect(Array.isArray(item.actions?.tr)&&item.actions.tr.length>=2&&Array.isArray(item.actions?.en)&&item.actions.en.length>=2,`${item.id}: actions must be bilingual arrays`);
  }
  const s=slug(item.id);
  for(const [lang,base] of [['tr','tr/llms-txt-haberler'],['en','en/llms-txt-news']]){
    const rel=path.join(base,s,'index.html');expect(fs.existsSync(rel),`${rel}: article missing`);if(!fs.existsSync(rel))continue;
    const x=fs.readFileSync(rel,'utf8');
    expect((x.match(/<h1\b/gi)||[]).length===1,`${rel}: one H1 required`);
    expect(x.includes('rel="canonical"')&&x.includes('hreflang="tr"')&&x.includes('hreflang="en"'),`${rel}: canonical/hreflang missing`);
    expect(x.includes('NewsArticle'),`${rel}: NewsArticle schema missing`);
    expect(x.includes('data-news-original-analysis="true"'),`${rel}: original-analysis marker missing`);
    expect(x.includes(item.sourceUrl),`${rel}: exact original source URL missing`);
    expect(x.includes(lang==='tr'?'Orijinal kaynak ↗':'Original source ↗'),`${rel}: generic source-link label missing`);
    expect(!/\bBy\s+[A-ZÇĞİÖŞÜ][A-Za-zÇĞİÖŞÜçğıöşü.' -]{2,60}\b/.test(x),`${rel}: external author attribution leaked`);
    expect(!/<img[^>]+src="https?:\/\//i.test(x),`${rel}: remote publisher image must not be embedded`);
  }
  expect(fs.existsSync(path.join(root,'assets/news',s+'.svg')),`${item.id}: original local cover SVG missing`);
}
for(const rel of ['tr/llms-txt-haberler/index.html','en/llms-txt-news/index.html']){
  expect(fs.existsSync(rel),`${rel}: hub missing`);if(!fs.existsSync(rel))continue;
  const x=fs.readFileSync(rel,'utf8');expect(x.includes('data-commercial-intent="static"'),`${rel}: commercial intent missing`);expect(x.includes('/assets/news/'),`${rel}: original news covers missing`);
}
const sitemap=fs.readFileSync('sitemap.xml','utf8');const llms=fs.readFileSync('llms.txt','utf8');
expect(sitemap.includes('https://htmlandhtml.com/tr/llms-txt-haberler/'),'TR news hub missing from sitemap');
expect(sitemap.includes('https://htmlandhtml.com/en/llms-txt-news/'),'EN news hub missing from sitemap');
expect(llms.includes('LLMS.TXT News / AI Search Intelligence'),'news authority graph missing from llms.txt');

if(errors.length){console.error('LLMS NEWS CONTRACT FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log(`LLMS NEWS CONTRACT PASS: ${data.items.length} bilingual original-analysis briefs, source links, local visuals, SEO graph and fail-closed 03:00 automation verified.`);
