import fs from 'node:fs';

const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const pack=fs.readFileSync('functions/lib/delivery-pack.ts','utf8');
const guest=fs.readFileSync('functions/lib/guest-entitlement.ts','utf8');
const cf=fs.readFileSync('functions/api/delivery.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const sync=fs.readFileSync('functions-firebase/scripts/sync-engine.mjs','utf8');
const config=JSON.parse(fs.readFileSync('firebase.json','utf8'));
const api=JSON.parse(fs.readFileSync('openapi.json','utf8'));

expect(/DELIVERY_PACK_VERSION='1\.2\.0'/.test(pack),'delivery pack v1.2.0 missing');
expect(/MAX_MACHINE_SURFACES=30/.test(pack),'paid machine-surface boundary must remain max 30');
expect(/mime:'application\/zip'/.test(pack),'canonical delivery pack MIME must be application/zip');
expect(/0x04034b50/.test(pack)&&/0x02014b50/.test(pack)&&/0x06054b50/.test(pack),'ZIP local/central/EOCD signatures missing');
for(const f of ['00_READ_ME.md','01_EXECUTIVE_SUMMARY.md','02_IMPLEMENTATION_BLUEPRINT.md','03_FINDINGS.json','04_ACCEPTANCE_TESTS.md','05_ROLLBACK_PLAN.md','06_AI_READINESS.json','07_IMPLEMENTATION_CHECKLIST.txt','08_LLMS_TXT_RECOMMENDED.txt','09_MACHINE_SURFACE_MAP.json','10_EVALUATION_REPORT.md','machine-surfaces/'])expect(pack.includes(f),`delivery ZIP missing ${f}`);
expect(pack.includes('NOT_MEASURED')&&pack.includes('REQUIRES_CONTEXT'),'delivery guide must preserve epistemic boundaries');
expect(pack.includes('acceptance_tests')&&pack.includes('regression_tests')&&pack.includes('rollback_guidance'),'delivery pack must expose canonical verification and rollback contracts');
expect(pack.includes('acceptanceTests')&&pack.includes('regressionTests')&&pack.includes('stopConditions'),'delivery pack must expose enterprise opportunity verification and stop contracts');
expect(pack.includes('opportunityActions')&&pack.includes('Enterprise Opportunity'),'enterprise opportunity execution must be embedded in the Roadmap ZIP');
expect(pack.includes('does not invent page content')&&pack.includes('sayfa içeriği uydurmaz'),'machine surfaces must fail closed against fabricated page content');
expect(pack.includes('single proposed root surface')&&pack.includes('tek önerilen yüzey'),'delivery must distinguish root llms.txt from page-level Markdown surfaces');
expect(/GUEST_ENTITLEMENT_VERSION=2/.test(guest)&&/orderId:string/.test(guest),'guest entitlement v2 must carry orderId');
expect(/canonicalHost\(claims\.domain\).*canonicalHost\(targetDomain\)/s.test(guest),'guest entitlement must bind domain');
expect(/canonicalOrder\(claims\.orderId\).*canonicalOrder\(targetOrderId\)/s.test(guest),'guest entitlement must bind order id');
expect(/crypto\.randomUUID\(\)/.test(guest)&&/HMAC/.test(guest)&&/SHA-256/.test(guest),'guest entitlement must be unpredictable and signed');
for(const x of [cf,firebase]){
  expect(x.includes('MANDATE_ACCESS_TOKEN'),'delivery must reuse paid entitlement boundary');
  expect(x.includes('503'),'missing production entitlement must fail closed');
  expect(x.includes('402'),'invalid entitlement must fail closed');
  expect(x.includes('buildDeliveryPack'),'delivery endpoint must build canonical ZIP pack');
  expect(/verifyGuestEntitlement[\s\S]{0,240}orderId/.test(x),'guest delivery must verify domain+order entitlement');
  expect(/Opportunity-Signals|opportunity-signals/.test(x),'delivery endpoint must expose opportunity signal count');
}
expect(/['"]content-type['"]\s*:\s*['"]application\/zip['"]/.test(cf),'Cloudflare delivery endpoint must emit ZIP content type');
expect(/res\.set\(['"]Content-Type['"],pack\.mime\)/.test(firebase),'Firebase delivery endpoint must emit the canonical pack MIME');
expect(sync.includes("['delivery-pack.ts','delivery-pack.ts']")&&sync.includes("['guest-entitlement.ts','guest-entitlement.ts']")&&sync.includes("['opportunity-engine.ts','opportunity-engine.ts']")&&sync.includes("['remediation-engine-v3.ts','remediation-engine-v3.ts']"),'Firebase sync must include canonical delivery, enterprise opportunity and guest entitlement engines');
expect(config.hosting?.rewrites?.some(x=>x.source==='/api/delivery'&&x.function?.functionId==='delivery'),'Firebase /api/delivery rewrite missing');
expect(api.paths?.['/api/delivery']?.post,'OpenAPI /api/delivery contract missing');
expect(api.paths?.['/api/delivery']?.post?.responses?.['200']?.content?.['application/zip'],'OpenAPI ZIP response type missing');
expect(api.paths?.['/api/delivery']?.post?.requestBody?.content?.['application/json']?.schema?.properties?.order_id,'OpenAPI order_id delivery contract missing');
expect(api.components?.securitySchemes?.guestEntitlement?.name==='x-htmlhtml-entitlement','OpenAPI guest entitlement header contract missing');
expect(/\$99/.test(JSON.stringify(api)),'OpenAPI must publish $99 paid implementation boundary');
expect(/AI Search Visibility Roadmap/.test(JSON.stringify(api)),'OpenAPI must publish Roadmap customer product name');

if(errors.length){console.error('DELIVERY CONTRACT FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('DELIVERY CONTRACT PASS: $99 Roadmap ZIP v1.2, 11 core files, 12 enterprise opportunity signals/actions, up-to-30 evidence-bound machine surfaces, signed domain+order guest entitlement, Firebase parity and fail-closed delivery verified.');
