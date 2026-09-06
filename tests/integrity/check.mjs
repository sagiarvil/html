import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const errors=[];
const required=['index.html','checkout.html','assets/css/validator.css','assets/css/validator-base.css','assets/css/validator-v2.css','assets/css/intelligence.css','assets/css/premium-experience.css','assets/js/validator.js','assets/js/intelligence-root.js','functions/api/scan.ts','functions/api/intelligence.ts','functions/lib/scan-engine.ts','functions/lib/scan-request.ts','functions/lib/intelligence-engine.ts','functions/api/mandate.ts','functions/lib/remediation-engine.ts','functions/lib/remediation-engine-v2.ts','functions/api/mentions.ts','functions/lib/mention-engine.ts','assets/js/theme.js','assets/css/theme.css','assets/js/mention-tracker.js','robots.txt','sitemap.xml','llms.txt','scripts/apply_premium_experience.py'];
for(const rel of required){if(!fs.existsSync(path.join(root,rel)))errors.push(`missing required file: ${rel}`)}
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/css/validator-base.css'),'utf8')+fs.readFileSync(path.join(root,'assets/css/validator-v2.css'),'utf8')+fs.readFileSync(path.join(root,'assets/css/premium-experience.css'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/js/validator.js'),'utf8');
const api=fs.readFileSync(path.join(root,'functions/api/scan.ts'),'utf8');
const engine=fs.readFileSync(path.join(root,'functions/lib/scan-engine.ts'),'utf8');
const request=fs.readFileSync(path.join(root,'functions/lib/scan-request.ts'),'utf8');
const intelligence=fs.readFileSync(path.join(root,'functions/lib/intelligence-engine.ts'),'utf8');
const mandate=fs.readFileSync(path.join(root,'functions/api/mandate.ts'),'utf8');
const remediation=fs.readFileSync(path.join(root,'functions/lib/remediation-engine.ts'),'utf8')+fs.readFileSync(path.join(root,'functions/lib/remediation-engine-v2.ts'),'utf8');
const checkout=fs.readFileSync(path.join(root,'checkout.html'),'utf8');
const llms=fs.readFileSync(path.join(root,'llms.txt'),'utf8');
const glossary=fs.existsSync(path.join(root,'tr/sozluk/index.html'))?fs.readFileSync(path.join(root,'tr/sozluk/index.html'),'utf8'):'';
const categories=['crawl','technical','ai','llms','schema','performance','accessibility','security','trust','agent','conversion','links'];
const checks=[
  [/<html lang="tr">/i.test(index),'homepage must declare Turkish default language'],
  [/data-lang="tr"/.test(index)&&/data-lang="en"/.test(index),'TR/EN language controls missing'],
  [/id="scanForm"/.test(index)&&/id="domainInput"/.test(index),'scanner form missing'],
  [/\/api\/scan/.test(js),'client scan endpoint missing'],
  [/runFriendlyScan/.test(api)&&/runScan/.test(request),'server scan handler must use shared engine through normalization wrapper'],
  [/generateIntelligenceReport/.test(api),'public scan must attach the intelligence layer without replacing canonical scores'],
  [/NON_SCORING_INTELLIGENCE_LAYER/.test(intelligence)&&/INTELLIGENCE_ANALYSIS_COUNT=13/.test(intelligence),'13-audit non-scoring intelligence layer missing'],
  [/alternateHost/.test(request)&&/https:/.test(request)&&/http:/.test(request),'domain normalization/fallback contract missing'],
  [/\$99/.test(index),'single $99 mandate positioning missing'],
  [!/\$49(?!\d)|\$149/.test(index),'legacy mandate prices still present on homepage'],
  [/data-premium-infographic="tools"/.test(index)&&/data-premium-infographic="engines"/.test(index)&&/data-premium-infographic="process"/.test(index),'premium infographic system missing from homepage'],
  [/premium-experience\.css/.test(index),'premium responsive CSS missing from homepage'],
  [/Yapay Zeka Sizi Buluyor mu\?/.test(index)&&/Tavsiye Edilmeye Hazır mısınız\?/.test(index),'concise customer-first hero missing'],
  [!/Google doğruluk sınırı/i.test(glossary),'removed Google accuracy-boundary callout must not render'],
  [!/\((?:feat|fix|chore|refactor|docs|style|test):/i.test(index),'git commit metadata leaked into homepage DOM'],
  [/MANDATE_ACCESS_TOKEN/.test(mandate)&&/status:402/.test(mandate)&&/status:503/.test(mandate),'paid mandate must fail closed without entitlement/config'],
  [/root_fix/.test(remediation)&&/recovery/.test(remediation)&&/prevention/.test(remediation)&&/rollback_guidance/.test(remediation)&&/acceptance_tests/.test(remediation)&&/regression_tests/.test(remediation),'structured mandate execution contract incomplete'],
  [/FULL_SITE_FIX_MANDATE_PRICE_USD=99/.test(remediation)&&/FULL_SITE_FIX_MANDATE_MAX_PAGES=50/.test(remediation),'commercial remediation wrapper must enforce $99 and 50-page boundary'],
  [/MAX_PAGES=50/.test(engine)&&/MAX_LINK_PROBES=30/.test(engine),'crawl limits missing'],
  [/cloudflare-dns\.com\/dns-query/.test(engine)&&/Target resolves to a private or reserved address/.test(engine),'DNS-level SSRF guard missing'],
  [/redirect:'manual'/.test(engine)&&/MAX_REDIRECTS/.test(engine),'redirect boundary control missing'],
  [/MAX_BYTES/.test(engine)&&/AbortSignal\.timeout/.test(engine),'size/timeout controls missing'],
  [/OAI-SearchBot/.test(engine)&&/Claude-SearchBot/.test(engine)&&/Claude-User/.test(engine)&&/PerplexityBot/.test(engine)&&/Google-Extended/.test(engine),'AI crawler policy matrix incomplete'],
  [/relLink\(home\.html,'describedby'\)/.test(engine)&&/text\/markdown/.test(engine),'llms.txt v2 discovery checks missing'],
  [/coreWebVitals:'NOT_MEASURED'/.test(engine),'field CWV must not be fabricated'],
  [/sourceClass/.test(js)&&/confidence/.test(js)&&/locked-fix/.test(js),'free evidence rendering contract missing'],
  [!/fixTr|fixEn/.test(engine),'free scan engine must not expose implementation instructions'],
  [/application\/ld\+json/.test(index),'structured data missing'],
  [/^# HTML&HTML/m.test(llms)&&/^> /m.test(llms)&&/^## /m.test(llms),'llms.txt structure incomplete'],
  [css.length>10000,'combined validator/premium CSS unexpectedly small'],
  [js.length>9000,'validator JS unexpectedly small'],
  [/(?:Güvenli ödeme sağlayıcısı henüz production[’'a]* bağlanmadı|A secure payment provider is not connected to production yet)/i.test(checkout)&&/(?:kart verisi toplamıyoruz|collect no card data)/i.test(checkout)&&/(?:ücret tahsil etmiyoruz|make no charge)/i.test(checkout)&&/(?:ödeme webhook[^<]{0,120}doğrulan|payment webhook[^<]{0,120}verified)/i.test(checkout)&&/<button[^>]+disabled/i.test(checkout),'checkout must disclose inactive payment dependency and remain non-chargeable until a verified payment webhook'],
  [!/\(feat: yeni html&html logosu/i.test(checkout),'checkout must not leak commit metadata'],
  [/@media\(max-width:640px\)/.test(css)&&/grid-template-columns:1fr/.test(css),'mobile-first premium layout contract missing']
];
for(const c of categories)checks.push([new RegExp(`['\"]${c}['\"]`).test(engine),`missing scoring engine: ${c}`]);
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
console.log('INTEGRITY PASS: canonical 12-engine diagnosis, 13-audit intelligence, $99 paid prescription boundary, premium infographics, mobile contract and machine-readable surfaces verified.');