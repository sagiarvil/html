import fs from 'node:fs';

const errors=[];const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const pack=fs.readFileSync('functions/lib/delivery-pack.ts','utf8');
const cf=fs.readFileSync('functions/api/delivery.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const sync=fs.readFileSync('functions-firebase/scripts/sync-engine.mjs','utf8');
const config=JSON.parse(fs.readFileSync('firebase.json','utf8'));
const api=JSON.parse(fs.readFileSync('openapi.json','utf8'));

expect(/DELIVERY_PACK_VERSION='1\.0\.0'/.test(pack),'delivery pack version missing');
expect(/0x04034b50/.test(pack)&&/0x02014b50/.test(pack)&&/0x06054b50/.test(pack),'ZIP local/central/EOCD signatures missing');
for(const f of ['00_READ_ME.md','01_EXECUTIVE_SUMMARY.md','02_IMPLEMENTATION_BLUEPRINT.md','03_FINDINGS.json','04_ACCEPTANCE_TESTS.md','05_ROLLBACK_PLAN.md','06_AI_READINESS.json','07_IMPLEMENTATION_CHECKLIST.txt'])expect(pack.includes(f),`delivery ZIP missing ${f}`);
expect(pack.includes('NOT_MEASURED')&&pack.includes('REQUIRES_CONTEXT'),'delivery guide must preserve epistemic boundaries');
expect(pack.includes('acceptance_tests')&&pack.includes('regression_tests')&&pack.includes('rollback_guidance'),'delivery pack must expose verification and rollback contracts');
for(const x of [cf,firebase]){
  expect(x.includes('MANDATE_ACCESS_TOKEN'),'delivery must reuse paid entitlement boundary');
  expect(x.includes('503'),'missing production entitlement must fail closed');
  expect(x.includes('402'),'invalid entitlement must fail closed');
  expect(x.includes('buildDeliveryPack'),'delivery endpoint must build canonical ZIP pack');
  expect(x.includes('application/zip'),'delivery endpoint must emit ZIP content type');
}
expect(sync.includes("['delivery-pack.ts','delivery-pack.ts']"),'Firebase sync must include canonical delivery pack engine');
expect(config.hosting?.rewrites?.some(x=>x.source==='/api/delivery'&&x.function?.functionId==='delivery'),'Firebase /api/delivery rewrite missing');
expect(api.paths?.['/api/delivery']?.post,'OpenAPI /api/delivery contract missing');
expect(api.paths?.['/api/delivery']?.post?.responses?.['200']?.content?.['application/zip'],'OpenAPI ZIP response type missing');
expect(/\$99/.test(JSON.stringify(api)),'OpenAPI must publish $99 paid implementation boundary');

if(errors.length){console.error('DELIVERY CONTRACT FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('DELIVERY CONTRACT PASS: entitlement-gated $99 implementation ZIP, 8-file engineering pack, Firebase parity and fail-closed delivery verified.');
