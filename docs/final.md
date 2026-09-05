# Definition of Done

The v3 evidence engine is done only when:

- quality CI passes,
- Firebase Hosting + Functions deploy succeeds,
- production `htmlandhtml.com` serves the v3 premium UI,
- `/api/health` reports the intended engine/registry versions,
- `/api/llms` produces a valid formal audit with SHA-256 evidence,
- `/api/scan` returns 12 scores and no paid remediation leakage,
- repeated SSRF probes remain blocked,
- `/api/mandate` remains fail-closed without paid entitlement,
- external production smoke is green.
