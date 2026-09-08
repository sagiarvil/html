/**
 * HTML&HTML Enterprise AI Intelligence — Canonical Scoring Registry
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 24 & Section 25)
 */

export interface DimensionScore {
  score: number | null;
  status: 'PASS' | 'WARN' | 'FAIL' | 'NOT_MEASURED' | 'REQUIRES_CONTEXT' | 'NOT_APPLICABLE';
  confidence: number;
  weight: number;
  evidenceCount: number;
  disclosure: string;
}

export interface EnterpriseExecutiveScores {
  planeA_technicalReadiness: DimensionScore;
  planeB_observedAIPresence: DimensionScore;
  citationAuthority: DimensionScore;
  competitiveShareOfAnswer: DimensionScore;
  entityConsistency: DimensionScore;
  agentOperability: DimensionScore;
  governancePosture: DimensionScore;
  eaiDecisionIndex: {
    score: number | null;
    status: 'CALCULATED' | 'NOT_MEASURED';
    label: string;
    coveragePct: number;
  };
}

export function calculateEAIIndex(scores: Record<string, DimensionScore>): {
  score: number | null;
  status: 'CALCULATED' | 'NOT_MEASURED';
  label: string;
  coveragePct: number;
} {
  const entries = Object.values(scores);
  const measured = entries.filter((e) => e.status !== 'NOT_MEASURED' && e.score !== null);
  const coveragePct = Math.round((measured.length / entries.length) * 100);

  if (coveragePct < 80) {
    return {
      score: null,
      status: 'NOT_MEASURED',
      label: 'HTML&HTML INTERNAL DECISION INDEX — INSUFFICIENT COVERAGE',
      coveragePct,
    };
  }

  let totalWeightedScore = 0;
  let totalWeight = 0;
  for (const item of measured) {
    if (item.score !== null) {
      totalWeightedScore += item.score * item.weight;
      totalWeight += item.weight;
    }
  }

  const composite = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : null;
  return {
    score: composite,
    status: composite !== null ? 'CALCULATED' : 'NOT_MEASURED',
    label: 'HTML&HTML INTERNAL DECISION INDEX (NOT A PLATFORM RANKING SCORE)',
    coveragePct,
  };
}
