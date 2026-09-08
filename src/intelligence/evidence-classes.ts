/**
 * HTML&HTML Enterprise AI Intelligence — Evidence Classification System
 * Document Code: HTMLHTML-EAI-2026-V4 (Section 1.1)
 *
 * All claims, rules, scores, and recommendations MUST carry exactly one EvidenceClass.
 */

export const EVIDENCE_CLASSES = [
  'OFFICIAL_STANDARD',
  'OFFICIAL_VENDOR',
  'OBSERVED',
  'MEASURED',
  'INTERNAL_HEURISTIC',
  'PROPOSAL',
  'EXPERIMENTAL',
  'REQUIRES_CONTEXT',
  'REQUIRES_COUNSEL',
  'NOT_APPLICABLE',
  'NOT_MEASURED',
] as const;

export type EvidenceClass = (typeof EVIDENCE_CLASSES)[number];

export interface EvidenceClassification {
  evidenceClass: EvidenceClass;
  sourceId?: string;
  sourceUri?: string;
  measuredAt?: string;
  confidence: number;
  rationale?: string;
}

export function isValidEvidenceClass(val: unknown): val is EvidenceClass {
  return typeof val === 'string' && EVIDENCE_CLASSES.includes(val as EvidenceClass);
}

export function assertValidEvidenceClass(val: unknown): asserts val is EvidenceClass {
  if (!isValidEvidenceClass(val)) {
    throw new Error(`Invalid evidence class: "${String(val)}". Must be one of: ${EVIDENCE_CLASSES.join(', ')}`);
  }
}
