# HTML&HTML — AI & LLM Website Evidence Engine

HTML&HTML is a bilingual TR/EN website diagnosis and implementation-mandate product. The commercial contract is intentionally simple: **all public findings and evidence are free; implementation engineering is paid.**

## Product flow

1. A user enters a public domain or URL.
2. `/api/scan` applies DNS/redirect SSRF gates and runs 12 bounded public-web analysis engines.
3. The response exposes all issue IDs, URLs, severity, confidence, evidence class and measured evidence for free.
4. The standards orchestrator adds a versioned AI-crawler policy matrix and a dedicated formal llms.txt v2 audit.
5. `/api/mandate` performs a fresh evidence scan and produces root-fix/recovery/prevention/test/rollback contracts only after paid entitlement verification.
6. Full Site Fix Mandate: **USD 149 / one domain / one engagement**, including one re-scan within 30 days in the commercial scope.

## Twelve engines

- Crawl & Index
- Technical SEO
- AI / GEO crawler access
- Formal llms.txt v2 verification
- Structured Data
- Performance Hygiene
- Accessibility
- Security Baseline
- Content Trust
- Agent Readiness
- Conversion
- Link Integrity

## Formal llms.txt v2 engine

`functions/lib/llms-engine.ts` is a dedicated deterministic validator rather than a few regex checks inside the generic scanner.

It provides:

- root and path-specific llms.txt discovery, most-specific candidate first
- optional BOM handling
- structural node parsing for H1/H2/blockquotes/prose/file-list items
- required vs recommended vs internal-heuristic rule separation
- bounded concurrent link probes with redirect and SSRF re-validation
- SHA-256 content audit hash
- response/content-type/byte telemetry
- structure, link-integrity and quality subscores
- explicit assumptions and warnings
- public `GET/POST /api/llms`

The rule metadata is versioned separately in `functions/lib/llms-rules-v2.json`. Unsupported folklore is not promoted to specification law: fixed 10 KB or 200 ms thresholds, blanket YAML/HTML prohibitions and llms.txt ranking guarantees are not treated as official v2 requirements.

## Standards freshness

`functions/lib/standards-registry.json` separates:

- `OFFICIAL_STANDARD`
- `OFFICIAL_VENDOR`
- `PROPOSAL`
- `MEASURED`
- `INTERNAL_HEURISTIC`
- `EXPERIMENTAL`

Search/retrieval crawlers are separated from training/product-control tokens so publisher training preferences are not incorrectly penalized as search-access failures.

`.github/workflows/standards-watch.yml` runs a scheduled authoritative-source watcher. Drift produces an evidence artifact and review issue; it **does not silently change production scoring**. Registry/rule changes must pass regression tests before release.

## Runtime safety

The scanner is treated as an SSRF-sensitive production surface:

- DNS resolution before external target fetch
- private/reserved IP rejection
- credential-bearing URL rejection
- non-standard target-port rejection
- redirect re-validation on every hop
- response-body and redirect limits
- bounded page and link probes
- request timeout
- bounded Firebase concurrency/instances
- per-instance public API rate limits
- no secret/token logging
- `no-store` API responses

Field LCP/INP/CLS are never inferred from HTML alone. Without appropriate field/lab evidence they remain `NOT_MEASURED`.

## Production runtime

The production domain is served by **Firebase Hosting**. Dynamic routes are rewritten to one Firebase Functions v2 API function in `europe-west1`:

- `POST /api/scan`
- `GET|POST /api/llms`
- `GET /api/health`
- `POST /api/mandate`

Static developer/documentation routes remain on Hosting:

- `/guide` + `/guide.md`
- `/about` + `/about.md`
- `/api` + `/api.md`
- `/llms.txt`

## Paid mandate gate

`/api/mandate` is fail-closed:

- missing server entitlement configuration → HTTP 503
- missing/invalid paid entitlement → HTTP 402
- valid entitlement → implementation contract

No card data is collected by the mandate endpoint. A real payment provider and entitlement issuance flow must exist before charging is enabled.

## Local checks

```bash
npm install
npm test
npm run firebase:build
```

Firebase emulation:

```bash
npm run firebase:serve
```

Production deployment, with an authorized Firebase credential:

```bash
npm run firebase:deploy
```

## Release gate

A release is not FINAL until all are true:

1. the measured production symptom is gone,
2. the root cause is confirmed by test,
3. recurrence of the same failure mode remains safe.

`live-smoke.yml` verifies the production boundary after deployment. A green build without a green production smoke is not a completed release.

Canonical production repository: `sagiarvil/html`.
