import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');const errors=[];
const main=read('index.html'),trHome=read('tr/index.html'),enHome=read('en/index.html'),js=read('assets/js/validator.js'),theme=read('assets/js/theme.js'),css=read('assets/css/validator.css')+read('assets/css/premium-experience.css'),auth=read('assets/css/authority.css');
for(const key of ['skip','kicker','paidResolution','footerMethod'])if(!main.includes(`data-i18n="${key}"`))errors.push(`main missing ${key}`);
for(const marker of ['data-premium-infographic="tools"','data-premium-infographic="engines"','data-premium-infographic="process"','data-premium-infographic="knowledge"']){if(!main.includes(marker))errors.push(`main missing ${marker}`);if(!trHome.includes(marker))errors.push(`TR home missing ${marker}`);if(!enHome.includes(marker))errors.push(`EN home missing ${marker}`)}
for(const token of ["domainPlaceholder:'ornek.com'","urlPlaceholder:'https://ornek.com/sayfa'","domainPlaceholder:'example.com'","urlPlaceholder:'https://example.com/page'",'sourceLabel(f.sourceClass)','D[lang].scanId','D[lang].implementationLocked'])if(!js.includes(token))errors.push(`validator locale contract missing ${token}`);
if(!theme.includes('hh-language-changed'))errors.push('theme switch does not relabel on language change');
for(const token of ['.finding p{font-size:15px!important','.finding code{font-size:13px!important','.scan-disclosure{font-size:14px!important','.tool-finding p{font-size:14px','.mention-row p{font-size:14px'])if(!(css+auth).includes(token))errors.push(`readability contract missing ${token}`);
if(!/Yapay Zeka Sizi Buluyor mu\?/.test(trHome))errors.push('TR home concise hero missing');
if(!/Can AI Find You\?/.test(enHome))errors.push('EN home concise hero missing');
if(!/Ücretsiz Kontrol Et/.test(trHome))errors.push('TR scanner CTA missing');
if(!/Check Free/.test(enHome))errors.push('EN scanner CTA missing');
const trFiles=['tr/llms-txt-validator/index.html','tr/ai-crawler-checker/index.html','tr/ai-website-readiness/index.html','tr/ai-mention-tracker/index.html'];
const bannedTr=['>Validator<','>Checker<','>Tracker<','>AI Readiness<','>Methodology<','>Neutral prompt guard<','>Brand mention<','>Domain citation<','>Provider-by-provider evidence<','Evidence is free. Implementation precision is the product.'];
for(const p of trFiles){const s=read(p);for(const x of bannedTr)if(s.includes(x))errors.push(`${p}: English UI leak ${x}`);if(!s.includes('href="/tr/methodology/"'))errors.push(`${p}: Turkish methodology route missing`)}
if(!fs.existsSync('tr/methodology/index.html'))errors.push('Turkish methodology page missing');
const checkout=read('checkout.html');
for(const k of ['kicker','title','lead','priceNote','domainLabel','s1','s2','s3','what','c1','c2','c3','c4','c5','c6','delivery','p1','p1c','p2','p2c','p3','p3c','noticeT','noticeC','back','buy'])if(!checkout.includes(`data-k="${k}"`))errors.push(`checkout i18n missing data-k="${k}"`);
if(!/const T=\{tr:\{/.test(checkout)||!/\},en:\{/.test(checkout))errors.push('checkout must contain complete TR/EN locale dictionaries');
if(!/document\.documentElement\.lang=l/.test(checkout)||!/hh-language-changed/.test(checkout))errors.push('checkout language switch contract missing');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('Strict bilingual UI, premium infographics and readability contract OK');
