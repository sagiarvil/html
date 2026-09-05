import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(),errors=[];
const required=[
  'index.html','checkout.html','guide.html','guide.md','about.html','about.md','api.html','api.md',
  'assets/css/validator.css','assets/css/validator-base.css','assets/css/validator-v2.css','assets/css/docs.css',
  'assets/js/validator.js','assets/js/docs.js',
  'functions/api/scan.ts','functions/api/llms.ts','functions/api/health.ts','functions/api/mandate.ts',
  'functions/lib/scan-engine.ts','functions/lib/scan-orchestrator.ts','functions/lib/llms-engine.ts','functions/lib/llms-rules-v2.json','functions/lib/standards-registry.json',
  'firebase-functions/index.js','firebase-functions/package.json','firebase.json',
  'scripts/standards-watch.mjs','.github/workflows/standards-watch.yml','.github/workflows/live-smoke.yml',
  'tests/llms/check.mjs','robots.txt','sitemap.xml','llms.txt'
];
for(const rel of required)if(!fs.existsSync(path.join(root,rel)))errors.push(`missing required file: ${rel}`);
const read=rel=>fs.readFileSync(path.join(root,rel),'utf8');
const index=read('index.html'),css=read('assets/css/validator-base.css')+read('assets/css/validator-v2.css')+read('assets/css/docs.css'),js=read('assets/js/validator.js');
const api=read('functions/api/scan.ts'),llmsApi=read('functions/api/llms.ts'),engine=read('functions/lib/scan-engine.ts'),orchestrator=read('functions/lib/scan-orchestrator.ts'),llmsEngine=read('functions/lib/llms-engine.ts'),rules=JSON.parse(read('functions/lib/llms-rules-v2.json')),registry=JSON.parse(read('functions/lib/standards-registry.json')),mandate=read('functions/api/mandate.ts'),checkout=read('checkout.html'),firebase=read('firebase.json'),firebaseEntry=read('firebase-functions/index.js'),watcher=read('scripts/standards-watch.mjs'),llms=read('llms.txt'),sitemap=read('sitemap.xml');
const categories=['crawl','technical','ai','llms','schema','performance','accessibility','security','trust','agent','conversion','links'];
const checks=[
  [/<html lang="tr">/i.test(index),'homepage must declare Turkish default language'],
  [/data-lang="tr"/.test(index)&&/data-lang="en"/.test(index),'TR/EN language controls missing'],
  [/id="scanForm"/.test(index)&&/id="domainInput"/.test(index),'scanner form missing'],
  [/\/api\/scan/.test(js),'client scan endpoint missing'],
  [/llmsAudit/.test(js)&&/auditHash/.test(js),'formal llms audit is not rendered in the result UI'],
  [/runScan/.test(api)&&/scan-orchestrator/.test(api),'public scan must use standards orchestrator'],
  [/auditLlms/.test(llmsApi)&&/access-control-allow-origin/.test(llmsApi),'dedicated public llms audit endpoint incomplete'],
  [/FULL SITE FIX MANDATE/i.test(index)&&/\$149/.test(index),'single $149 mandate positioning missing'],
  [!/\$49|\$99/.test(index),'legacy mandate prices still present'],
  [/MANDATE_ACCESS_TOKEN/.test(mandate)&&/status:402/.test(mandate)&&/status:503/.test(mandate),'paid mandate must fail closed without entitlement/config'],
  [/scan-orchestrator/.test(mandate),'paid mandate must use the same full evidence orchestrator as the free scan'],
  [/ROOT FIX/.test(mandate)&&/RECOVERY/.test(mandate)&&/PREVENTION/.test(mandate)&&/ROLLBACK/.test(mandate)&&/STOP/.test(mandate),'mandate execution contract incomplete'],
  [/MAX_PAGES=25/.test(engine)&&/MAX_LINK_PROBES=30/.test(engine),'crawl limits missing'],
  [/cloudflare-dns\.com\/dns-query/.test(engine)&&/Target resolves to a private or reserved address/.test(engine),'core DNS-level SSRF guard missing'],
  [/redirect:'manual'/.test(engine)&&/MAX_REDIRECTS/.test(engine),'core redirect boundary control missing'],
  [/MAX_BYTES/.test(engine)&&/AbortSignal\.timeout/.test(engine),'core size/timeout controls missing'],
  [/auditLlms/.test(orchestrator)&&/llmsAudit/.test(orchestrator),'formal llms engine not integrated into orchestrator'],
  [/most-specific|llmsCandidates|path-specific/i.test(llmsEngine),'path-specific llms discovery missing'],
  [/createHash\('sha256'\)/.test(llmsEngine),'llms audit SHA-256 evidence missing'],
  [/LINK_CONCURRENCY|mapLimit/.test(llmsEngine)&&/MAX_LINKS/.test(llmsEngine),'bounded llms link probing missing'],
  [/unified/.test(llmsEngine)&&/remarkParse/.test(llmsEngine),'formal llms parser must use CommonMark AST'],
  [/llms-rules-v2\.json/.test(llmsEngine),'formal llms engine must load the versioned rule set'],
  [rules.spec?.version==='v2'&&rules.structure?.h1Required===true&&rules.structure?.blockquoteRequired===false,'llms v2 rule-set semantics are wrong'],
  [rules.delivery?.hardByteLimit===null&&rules.delivery?.hardTtfbMs===null,'non-normative llms size/latency thresholds must not be hard spec failures'],
  [rules.structure?.optionalSectionMechanicalSemantics===false,'v2 Optional mechanical semantics must remain disabled'],
  [registry.registryVersion&&Array.isArray(registry.crawlers)&&registry.crawlers.length>=10,'versioned standards/crawler registry incomplete'],
  [registry.crawlers.some(x=>x.token==='OAI-SearchBot'&&x.purpose==='search'),'OAI-SearchBot search role missing'],
  [registry.crawlers.some(x=>x.token==='GPTBot'&&x.purpose==='training'),'GPTBot training role separation missing'],
  [registry.crawlers.some(x=>x.token==='Claude-SearchBot')&&registry.crawlers.some(x=>x.token==='Claude-User'),'Anthropic search/user crawler roles missing'],
  [/coreWebVitals:'NOT_MEASURED'/.test(engine),'field CWV must not be fabricated'],
  [/sourceClass/.test(js)&&/confidence/.test(js)&&/locked-fix/.test(js),'free evidence rendering contract missing'],
  [!/fixTr|fixEn/.test(engine),'free core scan must not expose implementation instructions'],
  [/application\/ld\+json/.test(index),'structured data missing'],
  [/rel="alternate" type="text\/markdown"/.test(index)&&/rel="describedby"/.test(index),'homepage llms v2 discovery links missing'],
  [/^# HTML&HTML/m.test(llms)&&/^> /m.test(llms)&&/^## /m.test(llms),'llms.txt structure incomplete'],
  [/guide/.test(sitemap)&&/about/.test(sitemap)&&/api/.test(sitemap),'sitemap is missing product documentation routes'],
  [/"source":\s*"firebase-functions"/.test(firebase)&&/\/api\/scan/.test(firebase)&&/\/api\/llms/.test(firebase),'Firebase Hosting/Functions routing incomplete'],
  [/llmsApi/.test(firebaseEntry)&&/rate limit|RATE_WINDOW_MS/i.test(firebaseEntry),'Firebase runtime must expose llms API and rate limiting'],
  [/llmstxt\.org\/changes\.html/.test(watcher)&&/openai/i.test(watcher)&&/anthropic/i.test(watcher)&&/google/i.test(watcher),'standards watcher source coverage incomplete'],
  [css.length>12000,'combined premium CSS unexpectedly small'],
  [js.length>12000,'validator JS unexpectedly small'],
  [/Harici ödeme sağlayıcısı henüz yapılandırılmadı/.test(checkout),'checkout must disclose inactive external payment dependency']
];
for(const c of categories)checks.push([new RegExp(`['\"]${c}['\"]`).test(engine)||new RegExp(`${c}:`).test(orchestrator),`missing scoring engine: ${c}`]);
for(const [ok,msg] of checks)if(!ok)errors.push(msg);
const forbidden=[/Premium HTML templates/i,/Browse templates/i,/product\.html\?template=/i,/live-preview\.html/i,/HTML5 UP/i,/pixelarity\.com/i];
for(const p of forbidden)if(p.test(index))errors.push(`legacy homepage reference: ${p}`);
const localAttr=/(?:href|src)=["']([^"']+)["']/gi;
for(const file of ['index.html','checkout.html','guide.html','about.html','api.html']){
  const text=read(file).replace(/<pre\b[\s\S]*?<\/pre>/gi,'');let m;
  while((m=localAttr.exec(text))){
    let t=m[1];if(!t||t.startsWith('#')||/^(https?:|mailto:|tel:|data:|javascript:)/i.test(t))continue;
    t=t.split('#')[0].split('?')[0];if(!t)continue;if(t==='/')t='index.html';else if(t.startsWith('/'))t=t.slice(1);else t=path.relative(root,path.resolve(path.dirname(file),t));
    let resolved=path.join(root,t);if(!fs.existsSync(resolved)&&!path.extname(resolved)&&fs.existsSync(resolved+'.html'))resolved+='.html';if(!fs.existsSync(resolved))errors.push(`${file}: missing local target ${m[1]}`);
  }
}
if(errors.length){console.error('INTEGRITY FAIL');for(const e of errors)console.error(`- ${e}`);process.exit(1)}
console.log('INTEGRITY PASS: premium bilingual UI, 12-engine evidence scan, CommonMark formal llms v2 audit, versioned standards, Firebase runtime, SSRF/rate limits, $149 paid mandate and update watcher verified.');
