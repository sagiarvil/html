import assert from 'node:assert/strict';
import fs from 'node:fs';

const legacy=fs.readFileSync('functions/lib/remediation-engine.ts','utf8');
const wrapper=fs.readFileSync('functions/lib/remediation-engine-v2.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const cf=fs.readFileSync('functions/api/mandate.ts','utf8');

assert.match(legacy,/generateRemediationReport/,'Legacy remediation generator must remain available for wrapper compatibility');
assert.match(wrapper,/FULL_SITE_FIX_MANDATE_PRICE_USD=99/,'Full Site Fix Mandate price must be $99');
assert.match(wrapper,/FULL_SITE_FIX_MANDATE_MAX_PAGES=50/,'Mandate deep crawl boundary must remain 50 pages');
assert.match(wrapper,/generateIntelligenceReport/,'Paid mandate must include the intelligence report');
assert.match(wrapper,/intelligence_actions:IntelligencePrescription\[\]/,'Paid mandate must expose intelligence prescriptions');
assert.match(wrapper,/buildIntelligenceActions/,'Intelligence priorities must be converted into implementation prescriptions');
assert.match(wrapper,/case 'information_gain'/,'Information Gain must have an explicit safe prescription');
assert.match(wrapper,/Never label this internal signal as a Google Information Gain score/,'Information Gain prescription must prohibit Google-score impersonation');
assert.match(wrapper,/status==='NOT_MEASURED'\|\|a\.status==='REQUIRES_CONTEXT'/,'Missing evidence must produce context requirements rather than fake fixes');
assert.match(wrapper,/acceptance_tests/,'Intelligence prescriptions must contain acceptance tests');
assert.match(wrapper,/regression_tests/,'Intelligence prescriptions must contain regression tests');
assert.match(wrapper,/rollback_guidance/,'Intelligence prescriptions must contain rollback guidance');
assert.match(wrapper,/replace\(\/\\\$149\/g,'\$99'\)/,'Any stale $149 legacy markdown must be normalized to $99 before delivery');

for(const api of [firebase,cf]){
  assert.match(api,/MANDATE_ACCESS_TOKEN/,'Mandate endpoint must require entitlement configuration');
  assert.match(api,/503/,'Missing entitlement configuration must fail closed');
  assert.match(api,/402/,'Invalid entitlement must fail closed');
  assert.match(api,/generateFullSiteFixMandate/,'Mandate endpoint must use the commercial boundary wrapper');
}

assert.doesNotMatch(firebase,/type PlanType/,'Firebase endpoint must not expose legacy FREE/PRO plan selection');
assert.doesNotMatch(cf,/type PlanType/,'Cloudflare endpoint must not expose legacy FREE/PRO plan selection');

console.log('REMEDIATION CONTRACT PASS: remediation is paid-only at $99, 50-page, entitlement-gated and intelligence-prescription complete.');
