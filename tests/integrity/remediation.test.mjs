import assert from 'node:assert/strict';
import fs from 'node:fs';

const legacy=fs.readFileSync('functions/lib/remediation-engine.ts','utf8');
const wrapper=fs.readFileSync('functions/lib/remediation-engine-v2.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const cf=fs.readFileSync('functions/api/mandate.ts','utf8');

assert.match(legacy,/generateRemediationReport/,'Legacy remediation generator must remain available for wrapper compatibility');
assert.match(wrapper,/FULL_SITE_FIX_MANDATE_PRICE_USD=149/,'Full Site Fix Mandate price must be $149');
assert.match(wrapper,/FULL_SITE_FIX_MANDATE_MAX_PAGES=50/,'Mandate deep crawl boundary must remain 50 pages');
assert.match(wrapper,/generateIntelligenceReport/,'Paid mandate must include the intelligence report');
assert.match(wrapper,/replace\(\/\\\$99\/g,'\$149'\)/,'Legacy $99 markdown must be normalized before delivery');

for(const api of [firebase,cf]){
  assert.match(api,/MANDATE_ACCESS_TOKEN/,'Mandate endpoint must require entitlement configuration');
  assert.match(api,/503/,'Missing entitlement configuration must fail closed');
  assert.match(api,/402/,'Invalid entitlement must fail closed');
  assert.match(api,/generateFullSiteFixMandate/,'Mandate endpoint must use the commercial boundary wrapper');
  assert.doesNotMatch(api,/priceUsd\s*:\s*planType\s*===\s*['"]PRO['"]\s*\?\s*99/,'No public $99 plan may remain in active endpoint code');
}

assert.doesNotMatch(firebase,/type PlanType/,'Firebase endpoint must not expose legacy FREE/PRO plan selection');
assert.doesNotMatch(cf,/type PlanType/,'Cloudflare endpoint must not expose legacy FREE/PRO plan selection');

console.log('REMEDIATION CONTRACT PASS: Cursor v1 engine is wrapped by a paid-only $149, 50-page, entitlement-gated Full Site Fix Mandate.');
