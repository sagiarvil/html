import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');const errors=[];
const main=read('index.html'),js=read('assets/js/validator.js'),theme=read('assets/js/theme.js'),css=read('assets/css/validator.css'),auth=read('assets/css/authority.css');
for(const key of ['skip','kicker','paidResolution','engine1','engine12','fullDiagnosis','fullFixProduct','footerMethod'])if(!main.includes(`data-i18n="${key}"`))errors.push(`main missing ${key}`);
for(const token of ["domainPlaceholder:'ornek.com'","urlPlaceholder:'https://ornek.com/sayfa'","domainPlaceholder:'example.com'","urlPlaceholder:'https://example.com/page'",'sourceLabel(f.sourceClass)','D[lang].scanId','D[lang].implementationLocked'])if(!js.includes(token))errors.push(`validator locale contract missing ${token}`);
if(!theme.includes('hh-language-changed'))errors.push('theme switch does not relabel on language change');
for(const token of ['.finding p{font-size:15px!important','.finding code{font-size:13px!important','.scan-disclosure{font-size:14px!important','.tool-finding p{font-size:14px','.mention-row p{font-size:14px'])if(!(css+auth).includes(token))errors.push(`readability contract missing ${token}`);
const trFiles=['tr/llms-txt-validator/index.html','tr/ai-crawler-checker/index.html','tr/ai-website-readiness/index.html','tr/ai-mention-tracker/index.html'];
const bannedTr=['>Validator<','>Checker<','>Tracker<','>AI Readiness<','>Methodology<','>Neutral prompt guard<','>Brand mention<','>Domain citation<','>Provider-by-provider evidence<','Evidence is free. Implementation precision is the product.'];
for(const p of trFiles){const s=read(p);for(const x of bannedTr)if(s.includes(x))errors.push(`${p}: English UI leak ${x}`);if(!s.includes('href="/tr/methodology/"'))errors.push(`${p}: Turkish methodology route missing`)}
if(!fs.existsSync('tr/methodology/index.html'))errors.push('Turkish methodology page missing');
const checkout=read('checkout.html');for(const k of ['data-k="product"','data-k="c2"','data-k="c3"','data-k="c4"'])if(!checkout.includes(k))errors.push(`checkout i18n missing ${k}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('Strict bilingual UI and readability contract OK');