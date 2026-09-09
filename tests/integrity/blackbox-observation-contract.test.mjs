import fs from 'node:fs';
import assert from 'node:assert/strict';

const profile=JSON.parse(fs.readFileSync('audit-profile.json','utf8'));
const publicContract=JSON.parse(fs.readFileSync('blackbox-observation-contract.json','utf8'));
const sources=JSON.parse(fs.readFileSync('sources.json','utf8'));
const sourceIds=new Set(sources.sources.map(x=>x.id));
const layer=profile.advancedBlackBoxRiskLayer;

assert.equal(layer?.version,'2.0.0');
assert.equal(layer?.analysisCount,6);
assert.equal(publicContract.analysisCount,6);
assert.equal(publicContract.scoreEffect,'NONE');
assert.equal(publicContract.classification,'NON_SCORING_ADVANCED_BLACKBOX_RISK_LAYER');
assert.match(publicContract.nonClaim,/proprietary transformer weights/i);
assert.match(publicContract.nonClaim,/neither accessed nor inferred as fact/i);

const expected=[
  'query_fanout_coverage','citation_volatility','crawler_policy_divergence',
  'render_retrieval_gap','entity_identity_drift','agent_action_friction'
];
assert.deepEqual(layer.analyses,expected);
assert.deepEqual(publicContract.analyses.map(x=>x.key),expected);
assert.deepEqual(layer.observationContracts.map(x=>x.key),expected);

const requiredFields=['hypothesis','observable','requiredInputs','metrics','falsifier','decisionRule','minimumEvidence','temporalSensitivity','sourceIds','lenses','failureModes','mitigations'];
for(const item of publicContract.analyses){
  for(const field of requiredFields) assert.ok(item[field] && (typeof item[field]!=='object'||item[field].length>0),`${item.key}: missing ${field}`);
  assert.ok(item.failureModes.length>=2,`${item.key}: requires >=2 failure modes`);
  assert.ok(item.mitigations.length>=2,`${item.key}: requires >=2 mitigations`);
  for(const sourceId of item.sourceIds) assert.ok(sourceIds.has(sourceId),`${item.key}: unknown source ${sourceId}`);
  const text=JSON.stringify(item).toLowerCase();
  for(const forbidden of ['we access hidden prompts','we know model weights','private search index access','guaranteed citation','guaranteed ranking']){
    assert.ok(!text.includes(forbidden),`${item.key}: forbidden black-box claim ${forbidden}`);
  }
}

const orch=publicContract.orchestrationContract;
assert.deepEqual(orch.stages,[
  'INGEST_EVIDENCE','VALIDATE_AND_NORMALIZE','OBSERVE_WITH_FIXED_PROTOCOL',
  'COMPARE_LIKE_FOR_LIKE','DECIDE_WITH_EPISTEMIC_GATE','PERSIST_RECEIPT_OR_DLQ'
]);
assert.equal(orch.dlq.effectOnScore,'NONE');
assert.ok(orch.retryPolicy.maxRetries<=2,'retry budget must remain bounded');
assert.deepEqual(orch.retryPolicy.retryableHttp,[408,429,500,502,503,504]);
assert.ok(orch.temporalIntegrity.some(x=>/missing observation/i.test(x)));
assert.ok(orch.temporalIntegrity.some(x=>/cannot be labeled a trend/i.test(x)));
assert.ok(orch.security.some(x=>/server-side/i.test(x)));
assert.ok(orch.security.some(x=>/SSRF fail-closed/i.test(x)));

assert.match(fs.readFileSync('llms.txt','utf8'),/blackbox-observation-contract\.json/);
assert.match(fs.readFileSync('index.md','utf8'),/blackbox-observation-contract\.json/);

console.log('BLACKBOX OBSERVATION CONTRACT PASS: six falsifiable areas, temporal segmentation, bounded retries, DLQ and zero-score-effect are locked.');
