# Public API Contract

## `/api/scan`

Free, evidence-only. It may return impact descriptions but must not return implementation patches, root fixes, rollback plans or guessed source paths.

## `/api/llms`

Free formal llms.txt v2 validation and audit trail. It may return parser/link findings and disclosed heuristic scores.

## `/api/health`

Free release-state metadata; no secrets.

## `/api/mandate`

Paid entitlement required. This endpoint owns implementation prescriptions and release-safe fix contracts.
