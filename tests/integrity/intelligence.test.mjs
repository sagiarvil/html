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
assert.match(firebase,/readinessLenses:READINESS_LENS_COUNT/,'Health contract must advertise 6 conceptual layers');
assert.match(firebaseJson,/\/api\/intelligence/,'Firebase Hosting must expose intelligence endpoint');

for(const k of ['observed_ai_citations','share_of_authority','grounding_queries','ai_referral_rate']) {
  assert.match(src, new RegExp(`['\"]?${k}['\"]?`), `Missing intelligence telemetry key: ${k}`);
}
assert.match(src, /MS-CLARITY-AI-VISIBILITY-2026/, 'Microsoft Clarity official citation source missing');
assert.match(src, /Microsoft Clarity AI Visibility \(Provider-Scoped Telemetry\)/, 'Provider-scoped telemetry label missing');
assert.match(src, /Simulated Citation Model \(Fallback — No Connected Telemetry\)/, 'Fallback simulated model disclosure missing');

// Behavioral Verification
const { generateIntelligenceReport } = await import('../../functions/lib/intelligence-engine.ts');
const mockScan = {
  scanId: 'test-scan-clarity',
  domain: 'example.com',
  overall: 78,
  scores: { technical: 80, crawl: 75, links: 70, schema: 75, performance: 80, ai: 72, llms: 65, trust: 75, agent: 68, security: 80, conversion: 70, accessibility: 75 },
  findings: [],
  policies: {},
  summary: { pagesScanned: 10, schemaTypes: ['Organization', 'WebSite'], llmsLinks: 1 }
};

// 1. Fallback verification (no connected telemetry): null is preserved, not 0 (Risk 2 mitigation)
const reportFallback = generateIntelligenceReport(mockScan);
assert.equal(reportFallback.observed_ai_citations, null, 'Unconnected observed citations must be null (not 0)');
assert.equal(reportFallback.share_of_authority, null, 'Unconnected share of authority must be null (not 0)');
assert.equal(reportFallback.grounding_queries, null, 'Unconnected grounding queries must be null');
assert.equal(reportFallback.ai_referral_rate, null, 'Unconnected ai referral rate must be null (not 0)');
assert.equal(reportFallback.aiCitationTelemetry.mode, 'FALLBACK_SYNTHETIC', 'Fallback mode must be FALLBACK_SYNTHETIC');
assert.equal(reportFallback.coreOverall, 78, 'Missing telemetry must not reduce score');
assert.equal(reportFallback.coreScoreUnchanged, true);

// 2. Connected observed telemetry verification
const reportEnriched = generateIntelligenceReport(mockScan, {
  observed_ai_citations: 142,
  share_of_authority: 18.4,
  grounding_queries: ['enterprise ai visibility', 'htmlandhtml diagnostics'],
  ai_referral_rate: 4.2,
  verificationSource: 'CLARITY_CODE'
});
assert.equal(reportEnriched.observed_ai_citations, 142);
assert.equal(reportEnriched.share_of_authority, 18.4);
assert.deepEqual(reportEnriched.grounding_queries, ['enterprise ai visibility', 'htmlandhtml diagnostics']);
assert.equal(reportEnriched.ai_referral_rate, 4.2);
assert.equal(reportEnriched.aiCitationTelemetry.mode, 'OBSERVED_TELEMETRY');
assert.equal(reportEnriched.aiCitationTelemetry.telemetryScope.provider, 'microsoft_clarity');
assert.equal(reportEnriched.aiCitationTelemetry.verificationSource, 'CLARITY_CODE');
assert.equal(reportEnriched.coreOverall, 78, 'Enrichment must not alter core deterministic overall score');

// 3. CI Gate: Synthetic data must never be labeled as OBSERVED_TELEMETRY
function assertTelemetryClassificationIntegrity(report) {
  if (report.aiCitationTelemetry.mode === 'OBSERVED_TELEMETRY') {
    if (report.aiCitationTelemetry.telemetryScope.provider === 'fallback_synthetic' || report.observed_ai_citations === null) {
      throw new Error('TELEMETRY_INTEGRITY_VIOLATION: Synthetic citation data must never be labeled as OBSERVED_TELEMETRY');
    }
  }
}
assertTelemetryClassificationIntegrity(reportEnriched);
assert.throws(() => {
  assertTelemetryClassificationIntegrity({
    ...reportFallback,
    aiCitationTelemetry: {
      ...reportFallback.aiCitationTelemetry,
      mode: 'OBSERVED_TELEMETRY'
    }
  });
}, /TELEMETRY_INTEGRITY_VIOLATION/);

console.log('INTELLIGENCE CONTRACT PASS: 13 non-scoring audits, 6 conceptual layers, Microsoft Clarity observed telemetry keys, provider-scoped labeling and CI synthetic labeling guard verified.');
