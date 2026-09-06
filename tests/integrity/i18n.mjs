import fs from 'node:fs';
import path from 'node:path';
const read=p=>fs.readFileSync(p,'utf8'),exists=p=>fs.existsSync(p),errors=[];
const theme=read('assets/js/theme.js'),css=read('assets/css/validator.css'),auth=read('assets/css/authority.css');
if(!theme.includes("tr:{light:'AÇIK',dark:'KOYU',system:'SİSTEM'"))errors.push('theme Turkish labels missing');if(!theme.includes("en:{light:'LIGHT',dark:'DARK',system:'AUTO'"))errors.push('theme English labels missing');
for(const token of ['.finding p{font-size:15px!important','.finding code{font-size:13px!important','.scan-disclosure{font-size:14px!important','.tool-finding p{font-size:14px','.mention-row p{font-size:14px'])if(!(css+auth).includes(token))errors.push(`readability contract missing ${token}`);
const trFiles=['tr/index.html','tr/araclar/index.html','tr/rehberler/index.html','tr/platform/index.html','tr/fix-mandate/index.html','tr/fiyatlandirma/index.html','tr/methodology/index.html','tr/kanit-standardi/index.html','tr/referans/ai-tarayicilar/index.html','tr/llms-txt-validator/index.html','tr/ai-crawler-checker/index.html','tr/ai-website-readiness/index.html','tr/ai-mention-tracker/index.html'];
const enFiles=['en/index.html','en/tools/index.html','en/guides/index.html','en/platform/index.html','en/fix-mandate/index.html','en/pricing/index.html','en/methodology/index.html','en/evidence-standard/index.html','en/reference/ai-crawlers/index.html','en/llms-txt-validator/index.html','en/ai-crawler-checker/index.html','en/ai-website-readiness/index.html','en/ai-mention-tracker/index.html'];
for(const p of [...trFiles,...enFiles])if(!exists(p))errors.push(`missing locale page ${p}`);
for(const p of trFiles.filter(exists)){const s=read(p);if(!s.includes('<html lang="tr">'))errors.push(`${p}: lang must be tr`);if(/href="\/en"[^>]*>TR</.test(s))errors.push(`${p}: locale label mismatch`);if(/\?lang=(tr|en)/.test(s))errors.push(`${p}: query language switch forbidden`)}
for(const p of enFiles.filter(exists)){const s=read(p);if(!s.includes('<html lang="en">'))errors.push(`${p}: lang must be en`);if(/href="\/tr"[^>]*>EN</.test(s))errors.push(`${p}: locale label mismatch`);if(/\?lang=(tr|en)/.test(s))errors.push(`${p}: query language switch forbidden`)}
const tr=read('tr/index.html'),en=read('en/index.html');for(const token of ['Araçlar','Rehberler','Fiyatlandırma','Kanıt','Ücretsiz'])if(!tr.includes(token))errors.push(`TR hub missing ${token}`);for(const token of ['Tools','Guides','Pricing','Evidence','free'])if(!en.toLowerCase().includes(token.toLowerCase()))errors.push(`EN hub missing ${token}`);
for(const p of ['tr/hakkimizda/index.html','tr/iletisim/index.html','tr/gizlilik/index.html','tr/kullanim-kosullari/index.html','en/about/index.html','en/contact/index.html','en/privacy/index.html','en/terms/index.html'])if(!exists(p))errors.push(`localized trust page missing ${p}`);

// Language purity is a product contract, not a copy-review convention. Strip
// machine code, schemas, URLs and markup, then reject avoidable English UI copy
// from every Turkish HTML page. Third-party/protocol names remain allowed.
const allTr=[];function walk(dir){if(!fs.existsSync(dir))return;for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(e.isFile()&&e.name.endsWith('.html'))allTr.push(path.relative('.',p).replaceAll('\\','/'))}}walk('tr');
function visibleText(s){return s.replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<code\b[\s\S]*?<\/code>/gi,' ').replace(/<[^>]+>/g,' ').replace(/https?:\/\/\S+/g,' ').replace(/&(?:amp|quot|apos|lt|gt|nbsp);/g,' ').replace(/\s+/g,' ')}
const avoidable=/\b(?:Validator|Checker|Tracker|Paid Module|Public|Private|Source class|confidence|evidence|root fix|recovery|prevention|rollback|retrieval|consumer|provider|website readiness|crawl|security|accessibility|performance hygiene|structured data|agent readiness|agent-ready|full-site|single-purpose|redirect|ranking|citation|prompt|site audit|technical audit|field data|unknown|scan|schema|source registry|audit profile|canonical)\b/i;
for(const p of allTr){const text=visibleText(read(p));const m=text.match(avoidable);if(m)errors.push(`${p}: avoidable English UI token "${m[0]}"`)}

if(errors.length){console.error('I18N INTEGRITY FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}console.log(`I18N INTEGRITY PASS: ${allTr.length} Turkish pages and core English pages preserve locale purity, navigation, trust surfaces, theme labels and readable report typography.`);
