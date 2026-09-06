import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const checkout=read('checkout.html');
const paddleRuntime=read('assets/js/paddle-checkout.js');
const product=JSON.parse(read('config/paddle-product.json'));
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
expect(product.priceId==='pri_01m1t2f2jkm8w74n7j9ap4hetm','Paddle product must bind the approved $99 Price ID');
expect(product.displayPriceUsd===99&&product.billingType==='one_time'&&product.quantity===1,'Paddle product config must remain $99 one-time quantity 1');
expect(checkout.includes('pri_01m1t2f2jkm8w74n7j9ap4hetm'),'rendered checkout must carry Paddle Price ID');
expect(checkout.includes('data-paddle-buy')&&checkout.includes('/assets/js/paddle-checkout.js'),'checkout must expose controlled Paddle runtime hook');
expect(/HTMLANDHTML_PADDLE_CLIENT_TOKEN/.test(paddleRuntime),'Paddle client token boundary missing');
expect(/Paddle\.Initialize\(\{token\}\)/.test(paddleRuntime),'Paddle.js initialization missing');
expect(/items:\[\{priceId,quantity:1\}\]/.test(paddleRuntime),'Paddle checkout must open the configured price exactly once');
expect(/if\(!validPrice\|\|!validToken\)return/.test(paddleRuntime),'checkout must fail closed when price/token is unavailable');
expect(!/api[_-]?key|PADDLE_API_KEY/i.test(paddleRuntime),'Paddle API key must never enter client runtime');
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
for(const [name,x] of [['TR about',trAbout],['EN about',enAbout]])expect(/SaaS|software|yazılım/i.test(x),`${name} must explain software nature`);
expect(trPricing.includes('data-paddle-saas-readiness="true"'),'TR pricing missing Paddle SaaS boundary');
expect(enPricing.includes('data-paddle-saas-readiness="true"'),'EN pricing missing Paddle SaaS boundary');
if(errors.length){console.error('PADDLE READINESS FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('PADDLE READINESS PASS: $99 Price ID bound, client checkout fail-closed without token, automated SaaS deliverables, terms/privacy/refund/contact and Paddle payment boundary verified.');
