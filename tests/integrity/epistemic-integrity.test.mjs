import fs from 'node:fs';
import assert from 'node:assert/strict';

const engine = fs.readFileSync('functions/lib/engine-v2/03-engine-v2-engines.ts','utf8');
const profile = JSON.parse(fs.readFileSync('audit-profile.json','utf8'));
const sources = JSON.parse(fs.readFileSync('sources.json','utf8'));

for (const forbidden of [
  "standard: 'OFFICIAL_STANDARD'",
  "Last-Click Supremacy",
  "Twiddler Defense",
  "Hero Answer Engine Present (First 100px)",
  "DPO Alignment Engine",
  "ColBERT MaxSim Engine",
  "Knowledge Vault Engine",
  "Hallucination Interception'",
  "Dark Pool Remediation'",
  "Historical Corpus Engine'",
  "|| true",
]) assert.ok(!engine.includes(forbidden), `epistemic integrity violation remains: ${forbidden}`);

for (const required of [
  "measurementState: 'NOT_MEASURED'",
  "sourceClass: source.sourceClass",
  "sourceIds: source.sourceIds",
  "measurementStates",
  "Content Quality Heuristics Engine",
  "Retrieval Chunking Heuristics Engine",
  "Entity Consistency & Structured Knowledge Engine",
  "Claim Consistency Heuristics Engine",
  "Discovery Coverage Engine",
  "Freshness & Revision Signals Engine",
]) assert.ok(engine.includes(required), `missing epistemic control: ${required}`);

assert.equal(profile.executionContract.neutralQueryMaximum,3);
assert.equal(profile.executionContract.providerMaximum,3);
assert.equal(profile.executionContract.maximumObservationsPerRun,9);
assert.equal(profile.machineSurfaceContract.googleSearchImpact,'NONE_DOCUMENTED_BY_GOOGLE');
assert.equal(profile.epistemicPolicy.unmeasuredSignals,'NOT_MEASURED_AND_EXCLUDED_FROM_SCORE');
assert.equal(profile.epistemicPolicy.modelInternalClaimsFromPublicHtml,'FORBIDDEN');

for (const lens of ['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T']) {
  assert.ok(profile.measurementTaxonomy?.[lens], `measurement taxonomy missing ${lens}`);
}
const ids = new Set(sources.sources.map(s=>s.id));
for (const id of ['GOOGLE-PREFERRED-SOURCES','GOOGLE-REGIONAL-SEARCH','GOOGLE-FAQ-RICH-RESULT-REMOVAL','GOOGLE-LLMS-TXT-CLARIFICATION','OPENAI-PUBLISHERS']) {
  assert.ok(ids.has(id), `source registry missing ${id}`);
}

console.log('EPISTEMIC INTEGRITY PASS: model-internal pseudo-measurements removed, unmeasured rules excluded from score, and 7-lens source taxonomy enforced.');
