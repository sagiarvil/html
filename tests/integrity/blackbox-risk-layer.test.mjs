import fs from 'node:fs';
import assert from 'node:assert/strict';

const scan=fs.readFileSync('functions/lib/scan-engine.ts','utf8');
const firebaseScan=fs.readFileSync('functions-firebase/src/scan-engine.ts','utf8');
const intel=fs.readFileSync('functions/lib/intelligence-engine.ts','utf8');
const firebaseIntel=fs.readFileSync('functions-firebase/src/intelligence-engine.ts','utf8');
const profile=JSON.parse(fs.readFileSync('audit-profile.json','utf8'));
const sources=JSON.parse(fs.readFileSync('sources.json','utf8'));

assert.equal(scan,firebaseScan,'scan-engine Firebase mirror drift');
assert.equal(intel,firebaseIntel,'intelligence-engine Firebase mirror drift');

for(const forbidden of [
  'TOKEN-BLOAT-001','ENTITY-VAULT-001','RAG-CHUNK-001','RERANK-ATTN-001','AI-CORPUS-PMI-001',
  'COLBERT-MAXSIM-001','TOPICAL-CENTROID-001','DPO-RLAIF-001','ACADEMIC-SYCOPHANCY-001',
  'CORROBORATION-RING-001','ONTOLOGY-SUPERCLASS-001','TTFB-COLDSTART-001','A2A-MCP-CARD-001',
  'C2PA-PROVENANCE-001','HALLUCINATION-INTERCEPT-001','SYNTHETIC-CITATION-001','WAYBACK-INOCULATION-001',
  'AGENTIC-COMMERCE-001','AI-PREFERRED-SOURCES-001','REGIONAL-CAROUSEL-001',
  'estimatedLcpRange','Google Alexandria','14KB Token Budget','ColBERT Late-Interaction','DPO & RLAIF'
]) assert.ok(!scan.includes(forbidden),`canonical scan contains forbidden pseudo-signal: ${forbidden}`);

for(const required of [
  "RAW-HTML-CONTENT-001",
  "coreWebVitals:'NOT_MEASURED'",
  "lcp:'NOT_MEASURED'",
  "inp:'NOT_MEASURED'",
  "cls:'NOT_MEASURED'"
]) assert.ok(scan.includes(required),`canonical scan missing measured-only boundary: ${required}`);

const risks=[
  'query_fanout_coverage','citation_volatility','crawler_policy_divergence',
  'render_retrieval_gap','entity_identity_drift','agent_action_friction'
];
assert.match(intel,/ADVANCED_BLACKBOX_RISK_COUNT=6/);
assert.match(intel,/NON_SCORING_ADVANCED_BLACKBOX_RISK_LAYER/);
for(const key of risks) assert.ok(intel.includes(`'${key}'`),`missing advanced black-box risk: ${key}`);
assert.match(intel,/proprietary model weights, embeddings, rerankers, hidden prompts/);
assert.match(intel,/NOT_MEASURED and REQUIRES_CONTEXT remain score-excluded/);

assert.equal(profile.advancedBlackBoxRiskLayer?.analysisCount,6);
assert.deepEqual(profile.advancedBlackBoxRiskLayer?.analyses,risks);
assert.ok(profile.advancedBlackBoxRiskLayer?.policy?.some(x=>x.includes('not secret platform access')));
assert.ok(sources.sources.some(x=>x.id==='GOOGLE-GENAI-PERFORMANCE-2026'));

console.log('BLACK-BOX RISK LAYER PASS: canonical scanner is measured-only; six advanced non-scoring risk analyses and evidence boundaries are enforced.');
