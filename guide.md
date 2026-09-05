# HTML&HTML Guide

> A concise engineering guide to llms.txt v2, AI crawler roles, evidence classes, and release-safe website remediation.

## llms.txt v2

- Only the project/site H1 is required by the v2 proposal.
- A concise blockquote summary is recommended but not required.
- Pre-H2 prose may contain Markdown content but should not introduce headings.
- H2 sections are file-list sections whose list items contain Markdown hyperlinks.
- llms.txt may exist at the site root or at a subpath; the most-specific applicable file wins.
- `rel="describedby"` can point to the covering llms.txt file.
- `rel="alternate" type="text/markdown"` can point to a page's Markdown representation.
- The Optional section remains a useful convention but has no mechanical omission semantics in v2.

## AI crawler roles

- OAI-SearchBot: OpenAI search/discovery.
- GPTBot: OpenAI training control.
- Claude-SearchBot: Anthropic search.
- Claude-User: user-directed retrieval.
- ClaudeBot: Anthropic training.
- Googlebot: Google Search crawling.
- Google-Extended: Google AI training/grounding control token; not a Google Search ranking signal.

## Evidence model

- MEASURED: direct HTTP/HTML/header/robots evidence.
- OFFICIAL_STANDARD: protocol or RFC requirement.
- OFFICIAL_VENDOR: provider-published crawler/product policy.
- PROPOSAL: llms.txt v2 and similar non-standard proposals.
- INTERNAL_HEURISTIC: explicitly disclosed HTML&HTML scoring/quality logic.
- EXPERIMENTAL: emerging interoperability surfaces.

## Release gate

1. The measured symptom is gone.
2. The root cause is confirmed by an acceptance/falsification test.
3. Repeating the same failure mode does not break the system.

If any condition is missing, the remediation is not FINAL.

## Links

- [HTML&HTML Validator](https://htmlandhtml.com/): Free 12-engine website diagnosis.
- [API](https://htmlandhtml.com/api): JSON API for full scans and formal llms.txt v2 audits.
- [About](https://htmlandhtml.com/about): Methodology and evidence boundaries.
- [llms.txt v2 proposal](https://llmstxt.org/): Current proposal reference.
