# About HTML&HTML

> HTML&HTML is an evidence-based website diagnosis and implementation-mandate platform. It separates measured behavior, standards, vendor policy, proposals and internal heuristics instead of presenting them as equivalent facts.

## Methodology

- Crawl/index, technical SEO, AI access, llms.txt, schema, performance hygiene, accessibility, security, trust, agent readiness, conversion and link integrity are measured as separate fault boundaries.
- Findings include issue ID, severity, confidence, source class, URL and evidence.
- Values that cannot be measured remain unknown or not measured.
- Public scanning never invents source-code file paths.

## Evidence classes

- MEASURED: Direct HTTP, HTML, header, robots or endpoint evidence.
- OFFICIAL_STANDARD: RFC or protocol requirement.
- OFFICIAL_VENDOR: Provider-published crawler or product policy.
- PROPOSAL: Non-standard proposals such as llms.txt v2.
- INTERNAL_HEURISTIC: Disclosed HTML&HTML scoring or quality logic.
- EXPERIMENTAL: Emerging interoperability surfaces.

## Freshness architecture

- Crawler and protocol information is stored in a versioned standards registry.
- llms.txt v2 rules are stored in a separate versioned rule-set JSON.
- A scheduled CI watcher checks authoritative upstream sources and creates a review issue when drift is detected.
- Upstream changes do not silently change production scoring; they require registry/rule updates and regression tests.

## Deliberate limits

- llms.txt is not presented as a Google ranking or AI citation guarantee.
- Field Core Web Vitals are not fabricated without reliable field/lab evidence.
- Missing A2A or MCP support is not automatically an SEO defect.
- Predictive link-rot probabilities and sector percentiles are not generated without sufficient longitudinal data.

## Commercial model

- Full public diagnosis: USD 0.
- Full Site Fix Mandate: USD 149 per domain / engagement.
- Paid output contains root fix, recovery, prevention, acceptance/falsification tests, regression considerations, stop conditions and rollback.

## Links

- [Validator](https://htmlandhtml.com/): Free 12-engine website diagnosis.
- [Guide](https://htmlandhtml.com/guide): llms.txt v2 and AI crawler engineering guide.
- [API](https://htmlandhtml.com/api): JSON API documentation.
