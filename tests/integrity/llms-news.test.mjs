import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const read=(rel)=>fs.readFileSync(path.join(root,rel),'utf8');
const data=JSON.parse(read('data/llms-news.json'));
const editorialAuthor=JSON.parse(read('data/editorial-author.json'));

expect(data.version==='1.0.0','news data version must be 1.0.0');
expect(data.editorialPolicy==='ORIGINAL_ANALYSIS_WITH_PRIMARY_SOURCE_LINK','news editorial policy marker missing');
expect(Array.isArray(data.items)&&data.items.length>=5,'news seed must contain at least five verified briefs');
expect(fs.existsSync(path.join(root,'docs/LLMS_NEWS_EDITORIAL_POLICY.md')),'editorial policy document missing');
expect(fs.existsSync(path.join(root,'.github/workflows/llms-news.yml')),'daily news workflow missing');
expect(fs.existsSync(path.join(root,'scripts/enhance_llms_news_seo.py')),'NewsArticle SEO hardening step missing');

expect(editorialAuthor.version==='1.0.0','editorial author contract version must be 1.0.0');
expect(editorialAuthor.type==='Person','editorial author must be Person');
expect(editorialAuthor.name==='Barış Bağırlar','editorial author identity mismatch');
expect(editorialAuthor.entityId==='https://htmlandhtml.com/#baris-bagirlar','editorial author entity id mismatch');
expect(editorialAuthor.profileUrl==='https://www.linkedin.com/in/barisbagirlar/','editorial author profile URL mismatch');
expect(Array.isArray(editorialAuthor.sameAs)&&editorialAuthor.sameAs.includes(editorialAuthor.profileUrl),'editorial author sameAs must include profile URL');

const workflow=read('.github/workflows/llms-news.yml');
expect(workflow.includes("cron: '0 0 * * *'"),'news schedule must run at 00:00 UTC / 03:00 Turkey');
expect(workflow.includes('NEWS_EDITORIAL_OPENAI_KEY'),'news workflow must use explicit editorial credential');
expect(workflow.includes('steps.materialized.outputs.changed'),'news workflow must avoid no-op materialized commits');
expect(workflow.includes('scripts/enhance_llms_news_seo.py'),'news workflow must run NewsArticle SEO hardening');
expect(workflow.includes('sitemap-news.xml'),'news workflow must commit dedicated Google News sitemap');

const packageJson=JSON.parse(read('package.json'));
expect(packageJson.scripts?.['build:commercial']?.includes('scripts/enhance_llms_news_seo.py'),'production build must run NewsArticle SEO hardening');
expect(packageJson.scripts?.['test:python']?.includes('scripts/enhance_llms_news_seo.py'),'Python syntax gate must cover NewsArticle SEO hardening');

const updater=read('scripts/update_llms_news.py');
expect(updater.includes('LLMS_NEWS_SAFE_NOOP'),'missing-key editorial automation must fail closed as safe no-op');
expect(updater.includes('MAX_NEW=3'),'daily automatic publish cap must remain 3');
for(const host of ['developers.google.com','searchengineland.com','openai.com','sparktoro.com','www.mariehaynes.com']){
  expect(updater.includes(host),`fixed monitor source missing: ${host}`);
}

function slug(v){return String(v).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,90)}
function ldJsonBlocks(x){
  return [...x.matchAll(/<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/gi)]
    .map(m=>{try{return JSON.parse(m[1])}catch{return null}})
    .filter(Boolean);
}
function newsArticleFrom(x){
  const nodes=ldJsonBlocks(x).flatMap(obj=>Array.isArray(obj?.['@graph'])?obj['@graph']:[obj]);
  return nodes.filter(n=>n&&(
    n['@type']==='NewsArticle' ||
    (Array.isArray(n['@type'])&&n['@type'].includes('NewsArticle'))
  ));
}
function personFrom(x){
  const nodes=ldJsonBlocks(x).flatMap(obj=>Array.isArray(obj?.['@graph'])?obj['@graph']:[obj]);
  return nodes.filter(n=>n&&n['@type']==='Person'&&n['@id']===editorialAuthor.entityId);
}
function imageDims(rel){
  const x=read(rel);
  const m=x.match(/<svg\b[^>]*\bwidth="(\d+)"[^>]*\bheight="(\d+)"/i);
  if(!m)return null;
  return [Number(m[1]),Number(m[2])];
}
function isoMs(v){
  const ms=Date.parse(String(v||''));
  return Number.isFinite(ms)?ms:NaN;
}

const sourceUrls=new Set();
for(const item of data.items){
  expect(item.id&&item.sourceUrl&&item.publishedAt,`news item identity incomplete: ${item.id}`);
  expect(/^https:\/\//.test(item.sourceUrl),`${item.id}: sourceUrl must be HTTPS`);
  expect(!sourceUrls.has(item.sourceUrl),`${item.id}: duplicate sourceUrl`);
  sourceUrls.add(item.sourceUrl);
  expect(!('author' in item),`${item.id}: external source author data must not be stored for rendering`);

  const publishedMs=isoMs(item.publishedAt);
  const modifiedValue=item.updatedAt||item.publishedAt;
  const modifiedMs=isoMs(modifiedValue);
  expect(Number.isFinite(publishedMs),`${item.id}: publishedAt must be ISO 8601`);
  expect(Number.isFinite(modifiedMs),`${item.id}: dateModified must be ISO 8601`);
  expect(modifiedMs>=publishedMs,`${item.id}: dateModified must not precede datePublished`);

  for(const k of ['title','dek','summary','whyItMatters','technicalImpact','actions','boundary']){
    expect(item[k]!=null,`${item.id}: missing ${k}`);
    if(k!=='actions')expect(item[k]?.tr&&item[k]?.en,`${item.id}: ${k} must be bilingual`);
    else expect(Array.isArray(item.actions?.tr)&&item.actions.tr.length>=2&&Array.isArray(item.actions?.en)&&item.actions.en.length>=2,`${item.id}: actions must be bilingual arrays`);
  }

  const s=slug(item.id);
  const imageContract=[
    [`assets/news/${s}-16x9.svg`,1200,675],
    [`assets/news/${s}-4x3.svg`,1200,900],
    [`assets/news/${s}-1x1.svg`,1200,1200],
  ];
  expect(fs.existsSync(path.join(root,'assets/news',s+'.svg')),`${item.id}: original local cover SVG missing`);
  for(const [rel,w,h] of imageContract){
    expect(fs.existsSync(path.join(root,rel)),`${item.id}: ratio image missing: ${rel}`);
    if(fs.existsSync(path.join(root,rel))){
      const dims=imageDims(rel);
      expect(dims?.[0]===w&&dims?.[1]===h,`${item.id}: ${rel} must be ${w}x${h}`);
      expect(w*h>=50000,`${item.id}: ${rel} must exceed Google's 50K-pixel recommendation`);
    }
  }

  for(const [lang,base] of [['tr','tr/llms-txt-haberler'],['en','en/llms-txt-news']]){
    const rel=path.join(base,s,'index.html');
    expect(fs.existsSync(rel),`${rel}: article missing`);
    if(!fs.existsSync(rel))continue;
    const x=read(rel);
    const canonical=`https://htmlandhtml.com/${base}/${s}/`;

    expect((x.match(/<h1\b/gi)||[]).length===1,`${rel}: one H1 required`);
    expect(x.includes(`rel="canonical" href="${canonical}"`)&&x.includes('hreflang="tr"')&&x.includes('hreflang="en"'),`${rel}: canonical/hreflang missing`);
    expect(x.includes('data-news-original-analysis="true"'),`${rel}: original-analysis marker missing`);
    expect(x.includes(item.sourceUrl),`${rel}: exact original source URL missing`);
    expect(x.includes(lang==='tr'?'Orijinal kaynak ↗':'Original source ↗'),`${rel}: generic source-link label missing`);
    expect(!/\bBy\s+[A-ZÇĞİÖŞÜ][A-Za-zÇĞİÖŞÜçğıöşü.' -]{2,60}\b/.test(x),`${rel}: external source author attribution leaked`);
    expect(!/<img[^>]+src="https?:\/\//i.test(x),`${rel}: remote publisher image must not be embedded`);

    const articles=newsArticleFrom(x);
    expect(articles.length===1,`${rel}: exactly one NewsArticle schema required`);
    if(articles.length===1){
      const a=articles[0];
      expect(a.headline===item.title[lang],`${rel}: headline must match visible article`);
      expect(a.datePublished===item.publishedAt,`${rel}: datePublished mismatch`);
      expect(a.dateModified===modifiedValue,`${rel}: dateModified mismatch`);
      expect(a.url===canonical,`${rel}: NewsArticle url mismatch`);
      expect(a.mainEntityOfPage?.['@id']===canonical,`${rel}: mainEntityOfPage @id mismatch`);
      expect(a.inLanguage===lang,`${rel}: inLanguage mismatch`);
      expect(a.isAccessibleForFree===true,`${rel}: free-access declaration missing`);
      expect(a.isBasedOn===item.sourceUrl,`${rel}: source provenance mismatch`);
      expect(Array.isArray(a.author)&&a.author.length===1,`${rel}: exactly one editorial author required`);
      expect(a.author?.[0]?.['@type']==='Person',`${rel}: editorial author must be Person`);
      expect(a.author?.[0]?.['@id']===editorialAuthor.entityId,`${rel}: editorial author entity mismatch`);
      expect(a.author?.[0]?.name===editorialAuthor.name,`${rel}: editorial author name mismatch`);
      expect(a.author?.[0]?.url===editorialAuthor.profileUrl,`${rel}: author.url missing or unstable`);
      expect(Array.isArray(a.author?.[0]?.sameAs)&&a.author[0].sameAs.includes(editorialAuthor.profileUrl),`${rel}: author sameAs evidence missing`);
      expect(a.publisher?.name==='HTML&HTML'&&a.publisher?.url==='https://htmlandhtml.com/about/',`${rel}: publisher identity incomplete`);
      expect(a.publisher?.logo?.url==='https://htmlandhtml.com/assets/brand/logo-master-2026.png',`${rel}: publisher logo missing`);
      expect(Array.isArray(a.image)&&a.image.length===3,`${rel}: three Article image variants required`);
      const dims=new Set((a.image||[]).map(i=>`${i.width}x${i.height}`));
      for(const d of ['1200x1200','1200x900','1200x675'])expect(dims.has(d),`${rel}: schema image ratio missing ${d}`);
      for(const i of a.image||[])expect(String(i.url||'').startsWith('https://htmlandhtml.com/assets/news/'),`${rel}: schema image must be local and crawlable`);
    }

    const persons=personFrom(x);
    expect(persons.length===1,`${rel}: one graph-level editorial Person identity required`);
    if(persons.length===1){
      expect(persons[0].name===editorialAuthor.name,`${rel}: Person graph name mismatch`);
      expect(persons[0].url===editorialAuthor.profileUrl,`${rel}: Person graph profile mismatch`);
    }

    expect(x.includes(`name="author" content="${editorialAuthor.name}"`),`${rel}: compact meta author missing`);
    expect(x.includes('class="news-author"'),`${rel}: compact visible author byline missing`);
    expect(x.includes(`href="${editorialAuthor.profileUrl}"`),`${rel}: visible author evidence link missing`);
    expect(x.includes('rel="author noopener noreferrer external"'),`${rel}: author link relationship contract missing`);
    expect(x.includes('property="article:published_time"'),`${rel}: article:published_time missing`);
    expect(x.includes('property="article:modified_time"'),`${rel}: article:modified_time missing`);
    expect(x.includes('name="twitter:card" content="summary_large_image"'),`${rel}: Twitter large-image card missing`);
    expect(x.includes('class="news-date news-date-published"'),`${rel}: visible published date missing`);
    if(modifiedValue!==item.publishedAt){
      expect(x.includes('class="news-date news-date-modified"'),`${rel}: visible modified date missing`);
    }
  }
}

for(const rel of ['tr/llms-txt-haberler/index.html','en/llms-txt-news/index.html']){
  expect(fs.existsSync(rel),`${rel}: hub missing`);
  if(!fs.existsSync(rel))continue;
  const x=read(rel);
  expect(x.includes('data-commercial-intent="static"'),`${rel}: commercial intent missing`);
  expect(x.includes('/assets/news/'),`${rel}: original news covers missing`);
}

const sitemap=read('sitemap.xml');
const llms=read('llms.txt');
expect(sitemap.includes('https://htmlandhtml.com/tr/llms-txt-haberler/'),'TR news hub missing from sitemap');
expect(sitemap.includes('https://htmlandhtml.com/en/llms-txt-news/'),'EN news hub missing from sitemap');
expect(llms.includes('LLMS.TXT News / AI Search Intelligence'),'news authority graph missing from llms.txt');

expect(fs.existsSync(path.join(root,'sitemap-news.xml')),'dedicated Google News sitemap missing');
if(fs.existsSync(path.join(root,'sitemap-news.xml'))){
  const newsMap=read('sitemap-news.xml');
  expect(newsMap.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"'),'Google News namespace missing');
  const blocks=[...newsMap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]);
  expect(blocks.length<=1000,'Google News sitemap must not exceed 1,000 entries');
  const actual=new Set(blocks.map(b=>(b.match(/<loc>([^<]+)<\/loc>/)||[])[1]).filter(Boolean));

  const nowMs=isoMs(data.lastUpdated);
  expect(Number.isFinite(nowMs),'data.lastUpdated must be ISO 8601 for deterministic 48h news lifecycle');
  const expected=new Set();
  for(const item of data.items){
    const age=nowMs-isoMs(item.publishedAt);
    if(age>=0&&age<=48*60*60*1000){
      const s=slug(item.id);
      expected.add(`https://htmlandhtml.com/tr/llms-txt-haberler/${s}/`);
      expected.add(`https://htmlandhtml.com/en/llms-txt-news/${s}/`);
    }
  }
  expect(actual.size===expected.size,`Google News sitemap URL count mismatch: expected ${expected.size}, got ${actual.size}`);
  for(const url of expected)expect(actual.has(url),`Google News sitemap missing recent article: ${url}`);
  for(const url of actual)expect(expected.has(url),`Google News sitemap contains stale/non-contract URL: ${url}`);
  for(const b of blocks){
    expect(b.includes('<news:publication>')&&b.includes('<news:name>HTML&amp;HTML</news:name>'),'news sitemap publication identity missing');
    expect(/<news:language>(tr|en)<\/news:language>/.test(b),'news sitemap language must be tr or en');
    expect(/<news:publication_date>[^<]+<\/news:publication_date>/.test(b),'news sitemap publication date missing');
    expect(/<news:title>[^<]+<\/news:title>/.test(b),'news sitemap title missing');
  }
}

const robots=read('robots.txt');
expect(robots.includes('Sitemap: https://htmlandhtml.com/sitemap.xml'),'primary sitemap robots discovery missing');
expect(robots.includes('Sitemap: https://htmlandhtml.com/sitemap-news.xml'),'Google News sitemap robots discovery missing');

const liveSmoke=read('.github/workflows/ai-authority-live-smoke.yml');
expect(liveSmoke.includes('sitemap-news.xml'),'live smoke must verify dedicated News sitemap');
expect(liveSmoke.includes('NewsArticle'),'live smoke must verify production NewsArticle markup');
expect(liveSmoke.includes('Barış Bağırlar'),'live smoke must verify production person author');
expect(liveSmoke.includes('linkedin.com/in/barisbagirlar/'),'live smoke must verify author evidence URL');
expect(liveSmoke.includes('htmlandhtml.com/about/'),'live smoke must keep HTML&HTML publisher identity');

if(errors.length){
  console.error('LLMS NEWS CONTRACT FAIL');
  for(const e of errors)console.error('- '+e);
  process.exit(1);
}
console.log(`LLMS NEWS CONTRACT PASS: ${data.items.length} bilingual briefs, Google News 48h lifecycle, Person author/date/image Article contract, local visuals and live regression guard verified.`);
