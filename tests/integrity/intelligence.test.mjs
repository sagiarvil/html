import assert from 'node:assert/strict';
import fs from 'node:fs';

const src=fs.readFileSync('functions/lib/intelligence-engine.ts','utf8');
const scanApi=fs.readFileSync('functions/api/scan.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');
const firebaseJson=fs.readFileSync('firebase.json','utf8');

const analyses=[
'intent_cannibalization','information_gain','answer_extractability','entity_graph_integrity','freshness_integrity','render_parity','llm_knowledge_surface','internal_link_semantic_alignment','orphan_pages','discovery_path','indexnow_readiness','structured_graph_consistency','codebase_seo_governance'
];
for(const key of analyses)assert.match(src,new RegExp(`['\"]${key}['\"]`),`Missing intelligence analysis: ${key}`);
assert.equal(analyses.length,13);
for(const lens of ['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T'])assert.match(src,new RegExp(`['\"]${lens.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}['\"]`),`Missing readiness lens ${lens}`);

assert.match(src,/NON_SCORING_INTELLIGENCE_LAYER/,'Intelligence layer must remain non-scoring relative to canonical overall');
assert.match(src,/coreScoreUnchanged:true/,'Canonical overall score must be explicitly preserved');
assert.match(src,/Information Gain means public within-site differentiation signals/,'Information Gain boundary disclosure missing');
assert.match(src,/key:'render_parity'[\s\S]*status:'NOT_MEASURED'/,'Render parity must not be fabricated without rendered DOM evidence');
assert.match(src,/key:'codebase_seo_governance'[\s\S]*status:'REQUIRES_CONTEXT'/,'Codebase governance must require source context');
assert.match(src,/key:'indexnow_readiness'[\s\S]*status:'NOT_MEASURED'/,'IndexNow must not be guessed from public scan');
assert.doesNotMatch(src,/Last-Click Supremacy|90\s*seconds|80%|LSI keywords|LLMs\.txt v1\.1 RFC/i,'Rejected folklore must not enter intelligence scoring');
assert.match(scanApi,/generateIntelligenceReport/,'Canonical scan response must expose intelligence without a second scoring engine');
assert.match(firebase,/intelligenceAnalyses:INTELLIGENCE_ANALYSIS_COUNT/,'Health contract must advertise 13 analyses');
assert.match(firebase,/readinessLenses:READINESS_LENS_COUNT/,'Health contract must advertise 7 readiness lenses');
assert.match(firebaseJson,/\/api\/intelligence/,'Firebase Hosting must expose intelligence endpoint');

console.log('INTELLIGENCE CONTRACT PASS: 13 non-scoring audits, 7 readiness lenses, honest measurement boundaries and API activation verified.');
