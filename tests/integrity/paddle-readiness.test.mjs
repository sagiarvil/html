import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const checkout=read('checkout.html');
const trPricing=read('tr/fiyatlandirma/index.html'),enPricing=read('en/pricing/index.html');
const trTerms=read('tr/kullanim-kosullari/index.html'),enTerms=read('en/terms/index.html');
const trPrivacy=read('tr/gizlilik/index.html'),enPrivacy=read('en/privacy/index.html');
const trRefund=read('tr/iade-politikasi/index.html'),enRefund=read('en/refund/index.html');
const trContact=read('tr/iletisim/index.html'),enContact=read('en/contact/index.html');
const trAbout=read('tr/hakkimizda/index.html'),enAbout=read('en/about/index.html');
for(const x of [checkout,trPricing,enPricing]){
  expect(x.includes('$99'),'paid product must state $99 price');
  expect(!x.includes('$149'),'legacy $149 must not survive Paddle-facing funnel');
}
expect(checkout.includes('SOFTWARE-AS-A-SERVICE'),'checkout must explicitly identify SaaS/software product');
expect(checkout.includes('abonelik yok'),'checkout must state no subscription');
expect(checkout.includes('50 public sayfaya kadar'),'checkout must state page scope');
for(const f of ['00_READ_ME.md','01_EXECUTIVE_SUMMARY.md','02_IMPLEMENTATION_BLUEPRINT.md','03_FINDINGS.json','04_ACCEPTANCE_TESTS.md','05_ROLLBACK_PLAN.md','06_AI_READINESS.json','07_IMPLEMENTATION_CHECKLIST.txt','08_LLMS_TXT_RECOMMENDED.txt','09_MACHINE_SURFACE_MAP.json','10_EVALUATION_REPORT.md'])expect(checkout.includes(f),`checkout missing deliverable ${f}`);
for(const [name,x] of [['TR terms',trTerms],['EN terms',enTerms]]){
  expect(x.includes('HTML&amp;HTML')||x.includes('HTML&HTML'),`${name} must identify operator brand`);
  expect(/Paddle/i.test(x),`${name} must explain Paddle Merchant of Record/payment role`);
  expect(/subscription|abonelik/i.test(x),`${name} must state subscription boundary`);
}
for(const [name,x] of [['TR privacy',trPrivacy],['EN privacy',enPrivacy]])expect(/Paddle/i.test(x)&&/card|kart/i.test(x),`${name} must disclose payment-data boundary`);
for(const [name,x] of [['TR refund',trRefund],['EN refund',enRefund]])expect(/refund|iade/i.test(x)&&/contact@htmlandhtml.com/i.test(x),`${name} must publish refund route and support contact`);
for(const [name,x] of [['TR contact',trContact],['EN contact',enContact]])expect(x.includes('contact@htmlandhtml.com'),`${name} must publish support contact`);
for(const [name,x] of [['TR about',trAbout],['EN about',enAbout]])expect(/SaaS|software|yazılım/i.test(x)&&!/consultant-written report|danışmanın elle yazdığı rapor/i.test(''),`${name} must explain software nature`);
expect(trPricing.includes('data-paddle-saas-readiness="true"'),'TR pricing missing Paddle SaaS boundary');
expect(enPricing.includes('data-paddle-saas-readiness="true"'),'EN pricing missing Paddle SaaS boundary');
if(errors.length){console.error('PADDLE READINESS FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('PADDLE READINESS PASS: clear SaaS product, $99 one-time pricing, automated deliverables, terms/privacy/refund/contact and Paddle payment boundary verified.');
