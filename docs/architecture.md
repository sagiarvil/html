# HTML&HTML Evidence Engine Architecture

```text
USER
  -> CLIENT
  -> /api/scan or /api/llms
  -> rate-limit boundary
  -> URL/DNS/redirect SSRF boundary
  -> bounded fetch/discovery
  -> deterministic engines
       -> 12-engine public diagnosis
       -> formal llms.txt v2 CommonMark AST verifier
       -> versioned standards/crawler registry
  -> evidence normalization
  -> free response
       issue ID / severity / confidence / source class / URL / evidence
  -> paid entitlement boundary
  -> /api/mandate
       ROOT FIX / RECOVERY / PREVENTION / TEST / STOP / ROLLBACK
```

## Update boundaries

- `functions/lib/standards-registry.json`: crawler/vendor/protocol registry.
- `functions/lib/llms-rules-v2.json`: llms.txt proposal semantics, safety budgets and disclosed scoring weights.
- `scripts/standards-watch.mjs`: authoritative-source drift detection.
- `tests/llms/check.mjs`: formal parser regression fixtures.

Upstream changes are not allowed to mutate production scoring automatically. A drift signal must be verified, versioned, tested and released.

## Runtime boundaries

- Firebase Hosting owns static UX/docs/Markdown surfaces.
- Firebase Functions v2 owns only `/api/scan`, `/api/llms`, `/api/health` and `/api/mandate`.
- Free endpoints never return remediation instructions.
- Paid mandate fails closed without entitlement.
- No public scanner path may bypass URL/DNS/redirect validation.
