import fs from 'node:fs';
import assert from 'node:assert/strict';

const scan=fs.readFileSync('functions/lib/scan-engine.ts','utf8');
const firebaseScan=fs.readFileSync('functions-firebase/src/scan-engine.ts','utf8');
const intel=fs.readFileSync('functions/lib/intelligence-engine.ts','utf8');
const firebaseIntel=fs.readFileSync('functions-firebase/src/intelligence-engine.ts','utf8');
const rules=fs.readFileSync('src/intelligence/rules-registry.ts','utf8');
const ui=fs.readFileSync('assets/js/intelligence-root.js','utf8');
const firebaseIndex=fs.readFileSync('functions-firebase/src/index.ts','utf8');
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
assert.ok(!rules.includes('15 buyer prompts'),'observed-AI registry must not retain the legacy 15-prompt contract');
assert.ok(rules.includes('search must not be forced'),'observed-AI registry must preserve unforced-search measurement boundary');
assert.ok(ui.includes('6 Advanced Black-Box Risk Areas') && ui.includes('6 İleri Black-Box Risk Alanı'),'customer UI must expose the six advanced risk analyses bilingually');
assert.match(firebaseIndex,/advancedBlackBoxRisks:ADVANCED_BLACKBOX_RISK_COUNT/,'health endpoint must advertise advanced black-box risk count');

console.log('BLACK-BOX RISK LAYER PASS: canonical scanner is measured-only; six advanced non-scoring risk analyses and evidence boundaries are enforced.');
