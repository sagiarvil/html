import fs from 'node:fs';
import assert from 'node:assert/strict';

const intel=fs.readFileSync('functions/lib/intelligence-engine.ts','utf8');
const intelFb=fs.readFileSync('functions-firebase/src/intelligence-engine.ts','utf8');
const mention=fs.readFileSync('functions/lib/mention-engine.ts','utf8');
const mentionFb=fs.readFileSync('functions-firebase/src/mention-engine.ts','utf8');
const health=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const profile=JSON.parse(fs.readFileSync('audit-profile.json','utf8'));
const n8n=JSON.parse(fs.readFileSync('n8n/workflows.json','utf8'));

assert.equal(intel,intelFb,'Cloudflare/Firebase intelligence engine drift');
assert.equal(mention,mentionFb,'Cloudflare/Firebase mention engine drift');
assert.match(intel,/BLACK_BOX_DOMAIN_COUNT=6/);
for(const key of [
  'retrieval_activation_uncertainty',
  'citation_source_concentration',
  'competitive_share_of_answer',
  'entity_resolution_drift',
  'temporal_visibility_drift',
  'agent_interaction_friction'
]) assert.match(intel,new RegExp(key),`Missing black-box domain ${key}`);

assert.match(intel,/NON_SCORING_BLACK_BOX_INTELLIGENCE/);
assert.match(intel,/coreScoreUnchanged:true/);
assert.match(intel,/temporal_visibility_drift[\s\S]*status:'NOT_MEASURED'/);
assert.match(intel,/competitive_share_of_answer[\s\S]*status:'REQUIRES_CONTEXT'/);

for(const metric of ['groundingRate','citationConcentrationHHI','brandAnswerShare','competitorMentions']) {
  assert.match(mention,new RegExp(metric),`Mention engine missing ${metric}`);
}
assert.match(mention,/MAX_COMPETITORS=5/);
assert.match(mention,/tool_choice:'auto'/,'OpenAI retrieval must remain provider-controlled, not forced');
assert.match(health,/blackBoxDomains:BLACK_BOX_DOMAIN_COUNT/);

assert.equal(profile.blackBoxIntelligenceLayer?.domainCount,6);
assert.equal(profile.blackBoxIntelligenceLayer?.coreScoreUnchanged,true);
assert.match(profile.blackBoxIntelligenceLayer?.policy||'',/NOT_MEASURED|REQUIRES_CONTEXT/);

const wf=n8n.workflows.find(w=>w.id==='wf-03-blackbox-observability');
assert.ok(wf,'Missing n8n black-box observability workflow');
assert.equal(wf.active,false,'Black-box drift workflow must be fail-closed until credentials/baseline are configured');
assert.ok(wf.nodes.some(n=>n.name==='Dead Letter Queue'),'Black-box workflow missing DLQ');
assert.ok(wf.nodes.some(n=>n.name==='Configuration Gate'),'Black-box workflow missing configuration gate');

console.log('BLACK-BOX INTELLIGENCE PASS: six non-scoring domains, competitive provider metrics, parity and fail-closed n8n drift contract verified.');
