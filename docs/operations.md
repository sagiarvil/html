# Operations

## Fault boundaries

`USER -> CLIENT -> Firebase Hosting -> Firebase Function -> rate limit -> URL/DNS guard -> external site -> engine -> response`

## Typical decisions

- Client syntax/UI failure: fix frontend; do not touch scanner semantics.
- Firebase Hosting serves stale build: deployment boundary; rebuild/redeploy Hosting and Functions together.
- `/api/health` unavailable: runtime/provider boundary; do not call public scan healthy.
- Target site WAF blocks validator: report unavailable/blocked evidence; do not fabricate target defects.
- Standards watcher drift: freeze old scoring until the authoritative change is reviewed and regression-tested.
- Paid endpoint missing entitlement config: keep 503 fail-closed; never bypass authorization as recovery.
