# Scanner Security Boundary

The scanner is an outbound-fetch service and is treated as an SSRF-sensitive production component.

## Request boundary

- HTTP/HTTPS only.
- Embedded URL credentials rejected.
- Non-standard target ports rejected.
- localhost, local/internal names and private/reserved address literals rejected.
- DNS answers checked before target fetch.
- Every redirect target is normalized and re-resolved before the next request.
- Redirect loops/hop overflow rejected.
- Response body size and request duration bounded.
- Page/link probe counts bounded.
- Public Firebase endpoint concurrency, instances and request rates bounded.

## Authorization boundary

- Free scan and formal llms audit need no authentication.
- Paid Fix Mandate requires a server-side entitlement secret plus a valid bearer entitlement.
- No authentication bypass or client-side entitlement trust.
- No payment-card handling in the mandate API.
- Secrets, cookies and authorization headers must never be written to application logs.

## Recovery rule

A failure in external fetch, vendor CDN/WAF access or provider authorization must fail closed or return an explicit unavailable/unknown result. It must never be converted into a fabricated pass.
