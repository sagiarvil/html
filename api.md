# HTML&HTML API

> JSON API for the 12-engine public website diagnosis, formal llms.txt v2 audit, runtime health contract and paid Fix Mandate generation.

## Base URL

- [HTML&HTML](https://htmlandhtml.com/): `https://htmlandhtml.com`

## Full public scan

- Endpoint: `POST /api/scan`
- Body: `{"domain":"example.com"}`
- Optional: `{"domain":"example.com","fresh":true}` to bypass the short duplicate-scan cache.
- Returns: overall score, 12 category scores, evidence-backed findings, crawler policy matrix, standards registry metadata and formal llms.txt audit.

## Formal llms.txt v2 audit

- Endpoint: `GET /api/llms?url=https://example.com/docs/page`
- Alternative: `POST /api/llms` with `{"domain":"https://example.com/docs/page"}`.
- Discovery: checks the most-specific applicable path-specific llms.txt before parent/root candidates.
- Validation: formal line/section AST, v2 required/recommended distinction, real bounded link probes and SHA-256 audit evidence.

## Runtime health

- Endpoint: `GET /api/health`
- Returns: runtime version, 12-engine contract, llms.txt engine version/spec revision, standards registry version and paid-mandate configuration state.

## Paid Fix Mandate

- Endpoint: `POST /api/mandate`
- Requires: valid paid entitlement bearer token.
- Fail-closed behavior: 402 without entitlement; 503 if the entitlement secret is not configured server-side.
- Output: issue-specific root fix, recovery, prevention, acceptance/falsification test, rollback, stop conditions and Markdown mandate.

## Safety

- Private/reserved IP targets, localhost, embedded credentials and non-standard target ports are rejected.
- DNS resolution and redirect targets are revalidated to reduce SSRF risk.
- Scans are bounded by timeout, response-size, redirect, page and link-probe limits.
- Public API endpoints are rate-limited.
- No endpoint logs or returns secrets.

## Evidence boundary

- MEASURED: direct HTTP/HTML/header/robots evidence.
- OFFICIAL_STANDARD: protocol or RFC requirement.
- OFFICIAL_VENDOR: provider-published crawler/product policy.
- PROPOSAL: llms.txt v2 and other non-standard proposals.
- INTERNAL_HEURISTIC: explicitly disclosed HTML&HTML scoring/quality logic.
- EXPERIMENTAL: emerging interoperability surfaces.

## Links

- [Engineering guide](https://htmlandhtml.com/guide.md): llms.txt v2 and AI crawler interpretation.
- [Methodology](https://htmlandhtml.com/about.md): Evidence and non-claim policy.
- [llms.txt](https://htmlandhtml.com/llms.txt): Agent-oriented site map.
