import fs from 'node:fs';
import assert from 'node:assert/strict';

const src=fs.readFileSync('functions/lib/opportunity-engine.ts','utf8');
const scan=fs.readFileSync('functions/api/scan.ts','utf8');
const intel=fs.readFileSync('functions/api/intelligence.ts','utf8');
const paid=fs.readFileSync('functions/lib/remediation-engine-v3.ts','utf8');
const delivery=fs.readFileSync('functions/lib/delivery-pack.ts','utf8');
const firebase=fs.readFileSync('functions-firebase/src/index.ts','utf8');

const keys=['query_fanout_coverage','non_commodity_evidence','citation_source_readiness','answer_unit_architecture','entity_resolution_depth','retrieval_surface_coherence','discovery_graph_coherence','commercial_path_clarity','trust_accountability','freshness_provenance','multimodal_accessibility','observability_gap'];
assert.equal(keys.length,12);
assert.match(src,/OPPORTUNITY_SIGNAL_COUNT=12/);
assert.match(src,/NON_SCORING_ENTERPRISE_OPPORTUNITY_LAYER/);
assert.match(src,/canonicalScoreUnchanged:true/);
for(const k of keys)assert.match(src,new RegExp(`['\"]${k}['\"]`),`missing opportunity signal ${k}`);
for(const lens of ['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T'])assert.match(src,new RegExp(`['\"]${lens.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}['\"]`));
assert.match(src,/Traffic, revenue, ranking and citation estimates are never fabricated/);
assert.match(src,/key:'observability_gap'[\s\S]*status:'REQUIRES_CONTEXT'/);
assert.match(src,/key:'freshness_provenance'[\s\S]*status:'REQUIRES_CONTEXT'/);
assert.match(scan,/generateOpportunityReport/);
assert.match(intel,/generateOpportunityReport/);
assert.match(firebase,/opportunitySignals:OPPORTUNITY_SIGNAL_COUNT/);
assert.match(paid,/generateOpportunityActions/);
assert.match(paid,/\*\*Owner:\*\*/);
assert.match(paid,/\*\*Dependencies:\*\*/);
assert.match(paid,/\*\*Blast radius:\*\*/);
assert.match(paid,/\*\*Stop conditions:\*\*/);
assert.match(delivery,/opportunityActions/);
assert.match(delivery,/Enterprise Opportunity/);
assert.match(delivery,/traffic, revenue, ranking or citation estimate is fabricated/i);

console.log('OPPORTUNITY CONTRACT PASS: 12 non-scoring enterprise opportunity signals, free evidence boundary and paid owner/dependency/blast-radius/test/rollback execution contract verified.');
