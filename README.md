# HTML&HTML — 12-Engine Website Fix Validator

HTML&HTML is a bilingual TR/EN website diagnosis and implementation-mandate product.

## Product contract

1. User enters a public domain or URL.
2. `/api/scan` applies DNS/redirect SSRF gates and scans up to 25 public HTML pages plus machine-readable surfaces.
3. Twelve deterministic engines return all findings, URLs, severity, confidence, evidence class and measured evidence for free.
4. Free results never expose implementation instructions and never invent source-file paths.
5. `/api/mandate` re-scans the same domain and converts valid findings into an implementation contract only after paid entitlement verification.
6. Full Site Fix Mandate is USD 149 for one domain / one engagement, with one re-scan within 30 days in the commercial scope.

## Twelve engines

- Crawl & Index
- Technical SEO
- AI / GEO crawler access
- llms.txt v2 proposal checks
- Structured Data
- Performance Hygiene
- Accessibility
- Security Baseline
- Content Trust
- Agent Readiness
- Conversion
- Link Integrity

## Evidence model

Each finding contains a stable issue ID plus severity, confidence and evidence class:

- `OFFICIAL_STANDARD`
- `OFFICIAL_VENDOR`
- `PROPOSAL`
- `MEASURED`
- `INTERNAL_HEURISTIC`
- `EXPERIMENTAL`

Field LCP/INP/CLS are not inferred from HTML. Without reliable CrUX/PageSpeed integration they remain `NOT_MEASURED`.

## Runtime safety

- fail-closed DNS resolution before target fetch
- private/reserved IP rejection
- non-standard port rejection
- redirect re-validation on every hop
- response body limit
- request timeout
- bounded pages and link probes
- no secret/token logging
- API responses use `no-store`

## Paid mandate gate

`functions/api/mandate.ts` requires `MANDATE_ACCESS_TOKEN`. If the entitlement secret is absent it returns HTTP 503; an invalid/missing entitlement returns HTTP 402. No payment provider credentials are committed to the repository.

The external payment provider is intentionally not simulated. Production charging must remain disabled until a real provider and entitlement issuance flow are configured.

## Local development

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Deployment

```bash
npm run pages:deploy
```

Canonical production repository: `sagiarvil/html`.
