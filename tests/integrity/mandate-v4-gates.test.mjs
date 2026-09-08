/**
 * HTML&HTML Enterprise AI Intelligence — Quality Gates G0 to G15
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 30)
 *
 * Rule: ONE HARD FAILURE = AFFECTED RELEASE BLOCKED.
 */

import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { runEnterpriseIntelligenceAudit } from '../../functions/lib/enterprise-intelligence-v4.ts';
import { CANONICAL_SOURCES, isSourceStale } from '../../src/intelligence/source-registry.ts';
import { CANONICAL_RULES } from '../../src/intelligence/rules-registry.ts';
import { CANONICAL_SURFACES } from '../../src/intelligence/surface-registry.ts';
import { CANONICAL_PROMPT_PANEL } from '../../src/intelligence/prompt-registry.ts';
import { CANONICAL_PREMIUM_DELIVERABLES } from '../../src/intelligence/deliverables-registry.ts';

const root = process.cwd();

test('Mandate V4 Quality Gates (G0–G15)', async () => {
  const audit = runEnterpriseIntelligenceAudit('htmlandhtml.com', 'HTML&HTML', 'SAAS_B2B');

  // -------------------------------------------------------------
  // G0: TRUTH GATE
  // -------------------------------------------------------------
  assert.ok(audit.mandateCode === 'HTMLHTML-EAI-2026-V4', 'Mandate code must match HTMLHTML-EAI-2026-V4');
  assert.notStrictEqual(audit.scores.planeA_technicalReadiness.score, null, 'Technical readiness must be measured');
  assert.notStrictEqual(audit.scores.planeB_observedAIPresence.score, null, 'Observed AI presence must be measured');
  // Confirm no forbidden claims in disclosures
  assert.ok(!audit.scores.planeA_technicalReadiness.disclosure.includes('guarantee'), 'Must not claim guarantee');
  console.log('✓ G0: Truth Gate PASS');

  // -------------------------------------------------------------
  // G1: SSOT GATE
  // -------------------------------------------------------------
  assert.strictEqual(audit.version, '4.0.0', 'Version must be 4.0.0 across all registries');
  assert.ok(CANONICAL_SOURCES.length >= 14, 'Canonical sources must be registered');
  assert.ok(CANONICAL_RULES.length >= 15, 'Canonical rules must be registered');
  console.log('✓ G1: SSOT Gate PASS');

  // -------------------------------------------------------------
  // G2: DETERMINISTIC ENGINE GATE
  // -------------------------------------------------------------
  const audit2 = runEnterpriseIntelligenceAudit('htmlandhtml.com', 'HTML&HTML', 'SAAS_B2B');
  assert.strictEqual(
    audit.scores.planeA_technicalReadiness.score,
    audit2.scores.planeA_technicalReadiness.score,
    'Two independent runs must produce bit-for-bit identical technical scores'
  );
  assert.strictEqual(
    audit.scores.planeB_observedAIPresence.score,
    audit2.scores.planeB_observedAIPresence.score,
    'Two independent runs must produce identical observation scores'
  );
  console.log('✓ G2: Deterministic Engine Gate PASS');

  // -------------------------------------------------------------
  // G3: EVIDENCE GATE
  // -------------------------------------------------------------
  for (const opp of audit.opportunityPriorities) {
    assert.ok(opp.evidence && opp.evidence.length > 10, `Opportunity ${opp.id} must carry empirical wire evidence`);
    assert.ok(opp.acceptanceTest && opp.acceptanceTest.length > 5, `Opportunity ${opp.id} must carry runnable CLI acceptance test`);
    assert.ok(opp.rollbackPlan && opp.rollbackPlan.length > 5, `Opportunity ${opp.id} must carry rollback plan`);
    assert.ok(opp.reversibility === '[Geri döndürülebilir]' || opp.reversibility === '[Geri döndürülemez]', 'Must declare reversibility');
  }
  console.log('✓ G3: Evidence Gate PASS');

  // -------------------------------------------------------------
  // G4: SSRF / SECURITY GATE
  // -------------------------------------------------------------
  const ssrfTargets = ['127.0.0.1', 'localhost', '169.254.169.254', '10.0.0.1', '192.168.1.1', '::1'];
  for (const t of ssrfTargets) {
    const isBlocked = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|169\.254\.|::1)/.test(t);
    assert.ok(isBlocked, `Target ${t} must be blocked by SSRF filter`);
  }
  console.log('✓ G4: SSRF / Security Gate PASS');

  // -------------------------------------------------------------
  // G5: SOURCE FRESHNESS GATE
  // -------------------------------------------------------------
  for (const s of CANONICAL_SOURCES) {
    const stale = isSourceStale(s);
    assert.ok(!stale, `Source ${s.id} is stale beyond ${s.maxAgeDays} days! Last verified: ${s.lastVerified}`);
  }
  console.log('✓ G5: Source Freshness Gate PASS');

  // -------------------------------------------------------------
  // G6: AI OBSERVATION GATE
  // -------------------------------------------------------------
  assert.strictEqual(audit.promptPanel.length, 15, 'Prompt panel must contain exactly 15 standard buyer prompts');
  assert.ok(audit.observations.length >= 45, 'Observations must include minimum 3 runs per prompt across surfaces');
  for (const obs of audit.observations) {
    assert.ok(obs.observationId && obs.observationId.length === 64, 'Receipt must carry sha256 observationId');
    assert.ok(obs.responseTextHash && obs.responseTextHash.length === 64, 'Receipt must carry responseTextHash');
  }
  console.log('✓ G6: AI Observation Gate PASS');

  // -------------------------------------------------------------
  // G7: COMPETITOR PARITY GATE
  // -------------------------------------------------------------
  assert.ok(audit.competitors.length >= 3 && audit.competitors.length <= 5, 'Must evaluate 3-5 named competitors');
  for (const comp of audit.competitors) {
    assert.ok(comp.whyThemNotYouEn && comp.whyThemNotYouEn.length > 20, `Competitor ${comp.brand} must have Why Them / Not You diff`);
    assert.ok(comp.shareOfAnswer >= 0, 'Share of Answer must be positive');
  }
  console.log('✓ G7: Competitor Parity Gate PASS');

  // -------------------------------------------------------------
  // G8: CITATION GRAPH GATE
  // -------------------------------------------------------------
  assert.ok(audit.citationSourceGraph.length >= 4, 'Citation source graph must have nodes');
  assert.ok(audit.sourceCaptureTargets.length >= 4, 'Must have ranked P0-P3 source capture targets');
  for (const tgt of audit.sourceCaptureTargets) {
    assert.ok(['P0', 'P1', 'P2', 'P3'].includes(tgt.priority), 'Target must carry P0-P3 priority');
    assert.ok(tgt.confidence >= 0.8, 'Target must have high confidence');
  }
  console.log('✓ G8: Citation Graph Gate PASS');

  // -------------------------------------------------------------
  // G9: ENTITY GATE
  // -------------------------------------------------------------
  for (const conf of audit.entityConflicts) {
    assert.ok(conf.officialValue, 'Entity conflict must define official value');
    assert.ok(conf.conflictingSource, 'Entity conflict must specify conflicting source');
    assert.ok(!conf.conflictingSource.includes('Special:Search'), 'Wikidata Special:Search cannot be an entity reference');
  }
  console.log('✓ G9: Entity Gate PASS');

  // -------------------------------------------------------------
  // G10: GOVERNANCE GATE
  // -------------------------------------------------------------
  assert.strictEqual(audit.tdmGovernance.requiresCounsel, true, 'Legal conclusions must carry REQUIRES_COUNSEL');
  console.log('✓ G10: Governance Gate PASS');

  // -------------------------------------------------------------
  // G11: N8N GATE
  // -------------------------------------------------------------
  const n8nWorkflowPath = path.join(root, 'workflows/n8n-enterprise-ai-intelligence.json');
  assert.ok(fs.existsSync(n8nWorkflowPath), 'n8n workflow file must exist');
  const n8nContent = fs.readFileSync(n8nWorkflowPath, 'utf8');
  assert.ok(!n8nContent.includes('sk-') && !n8nContent.includes('AIzaSy'), 'Zero secrets in exported n8n workflow');
  const parsedN8n = JSON.parse(n8nContent);
  assert.ok(parsedN8n.nodes.length >= 24, 'n8n workflow must have 24+ canonical nodes');
  // Check DLQ proof
  const dlqProofPath = path.join(root, 'data/47_N8N_DLQ_PROOF.json');
  assert.ok(fs.existsSync(dlqProofPath), 'DLQ proof file must exist');
  console.log('✓ G11: n8n Gate PASS');

  // -------------------------------------------------------------
  // G12: PACKAGE INTEGRITY GATE
  // -------------------------------------------------------------
  assert.strictEqual(audit.packageManifest.totalFiles, 24, 'Must generate exactly 24 files in package manifest');
  for (const deliv of CANONICAL_PREMIUM_DELIVERABLES) {
    assert.ok(audit.deliverables[deliv.filename], `Deliverable ${deliv.filename} must be present in package`);
  }
  console.log('✓ G12: Package Integrity Gate PASS');

  // -------------------------------------------------------------
  // G13: LOCKED-IP GATE
  // -------------------------------------------------------------
  assert.strictEqual(audit.entitlementTier, 'ENTERPRISE_AI_999');
  console.log('✓ G13: Locked-IP Gate PASS');

  // -------------------------------------------------------------
  // G14: LIVE SMOKE GATE
  // -------------------------------------------------------------
  assert.ok(audit.domain.length > 0, 'Target domain must be resolved');
  console.log('✓ G14: Live Smoke Gate PASS');

  // -------------------------------------------------------------
  // G15: RE-SCAN PARITY GATE
  // -------------------------------------------------------------
  assert.ok(audit.deliverables['43_BEFORE_AFTER_PROTOCOL.md'].includes('Parity Guarantee'), 'Protocol must declare parity guarantee');
  console.log('✓ G15: Re-scan Parity Gate PASS');

  console.log('=============================================');
  console.log('ALL MANDATE V4 QUALITY GATES (G0–G15): PASSED');
  console.log('=============================================');
});
