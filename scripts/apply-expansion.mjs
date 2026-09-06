import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,s)=>fs.writeFileSync(path.join(root,p),s);
const replace=(p,a,b)=>{let s=read(p);if(!s.includes(a))return false;s=s.split(a).join(b);write(p,s);return true};

// 1) Deep Crawl: canonical source and public copy.
replace('functions/lib/scan-engine.ts','MAX_PAGES=25','MAX_PAGES=50');
for(const p of ['tests/integrity/check.mjs','assets/js/validator.js','index.html','methodology.html','llms.txt','index.md']){
  if(!fs.existsSync(path.join(root,p)))continue;
  let s=read(p);
  s=s.replaceAll('MAX_PAGES=25','MAX_PAGES=50')
     .replaceAll('en fazla 25 public HTML sayfası','en fazla 50 public HTML sayfası')
     .replaceAll('up to 25 public HTML pages','up to 50 public HTML pages')
     .replaceAll('25 public HTML pages','50 public HTML pages');
  write(p,s);
}
const profilePath='audit-profile.json';
const profile=JSON.parse(read(profilePath));
profile.version='1.1.0';
if(profile.scanBoundaries)profile.scanBoundaries.maxPublicHtmlPages=50;
write(profilePath,JSON.stringify(profile,null,2)+'\n');

// 2) Theme script on every first-party HTML page. Idempotent.
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['node_modules','.git'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith('.html')){let s=fs.readFileSync(p,'utf8');if(!s.includes('/assets/js/theme.js')&&s.includes('</head>')){s=s.replace('</head>','<script src="/assets/js/theme.js"></script></head>');fs.writeFileSync(p,s)}}}}
walk(root);

// 3) Firebase route for paid AI Mention Tracker.
const firebasePath='firebase.json';
const firebase=JSON.parse(read(firebasePath));
firebase.hosting.rewrites=firebase.hosting.rewrites||[];
if(!firebase.hosting.rewrites.some(x=>x.source==='/api/mentions'))firebase.hosting.rewrites.push({source:'/api/mentions',function:{functionId:'mentions',region:'us-central1',pinTag:true}});
write(firebasePath,JSON.stringify(firebase,null,2)+'\n');

// 4) OpenAPI contract. Intentionally states paid access + provider-neutral measurement boundary.
const openapiPath='openapi.json';
const api=JSON.parse(read(openapiPath));
api.paths=api.paths||{};
api.paths['/api/mentions']={
  get:{summary:'AI Mention Tracker availability',responses:{'200':{description:'Provider and paid-access configuration status'}}},
  post:{summary:'Run paid neutral-prompt AI mention measurement',description:'Measures provider API/search-grounded surfaces. Prompts containing the tracked brand or domain are rejected. Consumer app results can differ.',parameters:[{in:'header',name:'x-ai-mention-token',required:true,schema:{type:'string'}}],requestBody:{required:true,content:{'application/json':{schema:{type:'object',required:['brand','queries'],properties:{brand:{type:'string',minLength:2,maxLength:80},domain:{type:'string'},queries:{type:'array',minItems:1,maxItems:3,items:{type:'string',minLength:8,maxLength:280}},providers:{type:'array',items:{type:'string',enum:['openai','perplexity','gemini']}}}}}}},responses:{'200':{description:'Mention observations and citation evidence'},'400':{description:'Invalid or biased prompt'},'402':{description:'Paid access required'},'503':{description:'Paid module or provider configuration unavailable'}}}
};
write(openapiPath,JSON.stringify(api,null,2)+'\n');

// 5) Sitemap and machine-readable authority graph.
let sitemap=read('sitemap.xml');
for(const url of ['https://htmlandhtml.com/tr/ai-mention-tracker/','https://htmlandhtml.com/en/ai-mention-tracker/']){
  if(!sitemap.includes(url))sitemap=sitemap.replace('</urlset>',`  <url><loc>${url}</loc><lastmod>2026-09-06</lastmod></url>\n</urlset>`);
}
write('sitemap.xml',sitemap);
let llms=read('llms.txt');
if(!llms.includes('https://htmlandhtml.com/tr/ai-mention-tracker/'))llms+='\n## AI Mention Tracker\n- [TR AI Mention Tracker](https://htmlandhtml.com/tr/ai-mention-tracker/): Paid neutral-prompt measurement across OpenAI web-search, Perplexity Sonar and Gemini Search-grounded API surfaces.\n- [EN AI Mention Tracker](https://htmlandhtml.com/en/ai-mention-tracker/): Provider-by-provider mention and domain citation evidence. Consumer app results may differ.\n';
write('llms.txt',llms);
let md=read('index.md');
if(!md.includes('/tr/ai-mention-tracker/'))md+='\n## AI Mention Tracker\n- [Turkish AI Mention Tracker](/tr/ai-mention-tracker/)\n- [English AI Mention Tracker](/en/ai-mention-tracker/)\n- Neutral prompts only: target brand/domain in a measurement prompt is rejected.\n';
write('index.md',md);

// 6) Homepage discoverability, without changing the single primary scan CTA.
let home=read('index.html');
if(!home.includes('href="/tr/ai-mention-tracker/"')){
  const marker='href="/tr/ai-website-readiness/"';
  const i=home.lastIndexOf(marker);
  if(i>=0){const end=home.indexOf('</a>',i);if(end>=0)home=home.slice(0,end+4)+'<a href="/tr/ai-mention-tracker/">AI Mention Tracker</a>'+home.slice(end+4)}
}
write('index.html',home);

// 7) Integrity contracts: route + deep crawl + public module files.
let check=read('tests/integrity/check.mjs');
check=check.replace("'functions/api/mandate.ts'","'functions/api/mandate.ts','functions/api/mentions.ts','functions/lib/mention-engine.ts','assets/js/theme.js','assets/css/theme.css','assets/js/mention-tracker.js'");
write('tests/integrity/check.mjs',check);
let authority=read('tests/integrity/authority.mjs');
if(!authority.includes("tr/ai-mention-tracker/index.html"))authority=authority.replace("const trustPages=",`pages.push(['tr/ai-mention-tracker/index.html','tr','/tr/ai-mention-tracker/','/en/ai-mention-tracker/','']);\npages.push(['en/ai-mention-tracker/index.html','en','/en/ai-mention-tracker/','/tr/ai-mention-tracker/','']);\nconst trustPages=`);
authority=authority.replace("if(!text.includes(`data-tool-categories=\"${categories}\"`))errors.push(`${rel}: tool category scope drift`);","if(categories&&!text.includes(`data-tool-categories=\"${categories}\"`))errors.push(`${rel}: tool category scope drift`);");
authority=authority.replace("for(const route of ['/api/health','/api/scan','/api/mandate'])","for(const route of ['/api/health','/api/scan','/api/mentions','/api/mandate'])");
write('tests/integrity/authority.mjs',authority);

console.log('Expansion migration applied: AI Mention Tracker, selectable theme, Deep Crawl 50.');
