import fs from 'node:fs';

const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const read=p=>fs.readFileSync(p,'utf8');
const home=read('index.html'),trHome=read('tr/index.html'),enHome=read('en/index.html');
const tools=read('tr/araclar/index.html'),toolsEn=read('en/tools/index.html');
const pricing=read('tr/fiyatlandirma/index.html'),pricingEn=read('en/pricing/index.html');
const premium=read('assets/css/premium-experience.css'),enterprise=read('assets/css/enterprise-system.css');
const runtime=read('assets/js/enterprise-runtime.js'),validator=read('assets/js/validator.js');

expect(home.includes('Yapay Zeka Sizi Buluyor mu?'),'homepage concise AI visibility headline missing');
expect(home.includes('Tavsiye Edilmeye Hazır mısınız?'),'homepage recommendation-opportunity headline missing');
expect(home.includes('data-premium-infographic="tools"'),'homepage tools infographic missing');
expect(home.includes('data-premium-infographic="engines"'),'homepage engine infographic missing');
expect(home.includes('data-premium-infographic="process"'),'homepage process infographic missing');
expect(home.includes('data-premium-infographic="knowledge"'),'homepage knowledge infographic missing');
for(const marker of ['Bulun','Anlaşılın','Kaynak Olun','Tıklanın','Talebe Dönüşün'])expect(home.includes(marker),`homepage customer journey missing ${marker}`);

expect(/\.scanbox\{width:min\(760px,100%\)/.test(premium),'scanner width must prioritize long URLs');
expect(/grid-template-columns:minmax\(0,1fr\) auto/.test(premium),'desktop scanner must preserve flexible input and compact CTA');
expect(/\.scanbox \.field button\{[^}]*max-width:188px/.test(premium),'desktop scanner CTA must stay compact');
expect(/@media\(max-width:640px\)/.test(premium)&&/\.scanbox \.field\{grid-template-columns:1fr\}/.test(premium),'mobile scanner stacking contract missing');
expect(/\.result-columns\{grid-template-columns:1fr\}/.test(premium),'mobile result layout contract missing');
expect(/\.topbar nav\{order:3;width:100%;display:flex;overflow-x:auto/.test(premium),'tablet navigation overflow contract missing');

for(const x of [tools,toolsEn]){
  expect(x.includes('data-premium-infographic="scope-map"'),'tools route must be a unified scan scope map');
  expect(x.includes('12')&&x.includes('13')&&x.includes('7'),'tools scope must expose 12 engines + 13 audits + 7 lenses');
}
expect(tools.includes('Tek URL.')&&tools.includes('Tüm Yapay Zeka Görünürlük Sistemi'),'TR tools route must explain one-URL system');
expect(tools.includes('/tr/#scanner'),'TR tools primary flow must return to unified scanner');
expect(toolsEn.includes('/en/#scanner'),'EN tools primary flow must return to unified scanner');
expect(!/Aracı Aç →/.test(tools),'TR tools hub must not behave as a launch-each-tool product directory');
expect(!/Launch Tool →/.test(toolsEn),'EN tools hub must not behave as a launch-each-tool product directory');

for(const x of [pricing,pricingEn]){
  expect(x.includes('$99'),'pricing must publish $99 implementation price');
  expect(!x.includes('$149'),'legacy $149 must not survive pricing build');
  expect(x.includes('00_READ_ME.md')&&x.includes('03_FINDINGS.json')&&x.includes('05_ROLLBACK_PLAN.md'),'pricing must preview the engineering ZIP deliverable');
}
expect(pricing.includes('Ne yanlış? Nerede? Ne kadar önemli?'),'TR free diagnostic promise missing');
expect(pricing.includes('Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?'),'TR paid execution boundary missing');
expect(pricing.includes('Üyelik zorunlu değildir'),'guest delivery explanation missing');
expect(pricingEn.includes('No membership is required'),'EN guest delivery explanation missing');

for(const x of [home,trHome,enHome,pricing,pricingEn,tools,toolsEn])expect(x.includes('/assets/css/enterprise-system.css?v=1'),'enterprise visual system must be attached to major funnel surfaces');
expect(home.includes('/assets/js/enterprise-runtime.js?v=1'),'central scanner must attach enterprise runtime');
expect(runtime.includes('ai-decision-map')&&runtime.includes('readinessLenses')&&runtime.includes('topPriorities'),'free result must expose readiness lenses and intelligence priorities');
expect(runtime.includes('$99')&&runtime.includes('Implementation Blueprint'),'runtime customer copy must use $99 professional implementation language');
expect(!validator.includes('$149'),'language switch runtime must not resurrect $149');
expect(!/reçete/i.test(home+pricing+runtime),'customer-facing main funnel must not use novice prescription metaphor');
expect(enterprise.includes('.news-grid')&&enterprise.includes('.ai-decision-map')&&enterprise.includes('.px-report-boundary'),'enterprise CSS must cover news, free results and pricing comparison');

if(errors.length){console.error('ENTERPRISE FUNNEL FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('ENTERPRISE FUNNEL PASS: concise hero, reference-width scanner, unified scan scope, premium infographics, $99 implementation boundary, free decision map and mobile system verified.');
