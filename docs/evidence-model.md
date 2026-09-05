# Evidence Classification Contract

Every automated finding must expose both confidence and normative source class.

## Confidence

- `confirmed`: directly observed from the current HTTP/HTML/header/robots/API response.
- `strong`: multiple independent public signals align.
- `probable`: evidence suggests the issue but source/codebase confirmation can change the decision.
- `requires-source-verification`: public behavior is visible but the implementation owner/root cause cannot safely be named.

## Source classes

- `MEASURED`: direct observation.
- `OFFICIAL_STANDARD`: normative protocol/standard requirement.
- `OFFICIAL_VENDOR`: current provider-published behavior/policy.
- `PROPOSAL`: non-standard proposal such as llms.txt v2.
- `INTERNAL_HEURISTIC`: disclosed HTML&HTML metric or quality rule.
- `EXPERIMENTAL`: emerging interoperability surface.

## Non-fabrication rules

- Do not infer source file paths from a public page.
- Do not report field Core Web Vitals without evidence that measures them.
- Do not turn llms.txt presence into a Google ranking or AI-citation guarantee.
- Do not treat training-control crawler choices as search-access failures.
- Do not generate predictive link-rot probabilities or industry percentiles without a longitudinal benchmark dataset.

## Paid remediation boundary

The public response may explain impact but must not return root-fix instructions, code patches, rollback plans or implementation-specific file targets. Those belong to the paid implementation contract after entitlement and, when necessary, source verification.
