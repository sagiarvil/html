# Production Deployment Contract

## Canonical runtime

- Repository: `sagiarvil/html`
- Branch: `main`
- Domain: `https://htmlandhtml.com`
- Hosting: Firebase Hosting
- Dynamic runtime: Firebase Functions v2, `europe-west1`
- Function ID: `api`

## Required deploy command

```bash
npm run firebase:deploy
```

This command builds the Firebase API bundles and deploys **both** Functions and Hosting. A Hosting-only deploy is not a valid release because `/api/scan`, `/api/llms`, `/api/health` and `/api/mandate` are part of the production contract.

## Release gates

1. `quality.yml` must pass: static integrity, client syntax, Cloudflare compatibility, Firebase runtime build and formal llms.txt v2 fixtures.
2. Firebase deploy must complete with an authorized credential for project `studio-7658156126-ffb8e`.
3. `live-smoke.yml` must pass against `htmlandhtml.com`:
   - current premium homepage and $149 product contract
   - static docs + Markdown alternates
   - `/api/health`
   - formal `/api/llms` with SHA-256 audit trail
   - 12-engine `/api/scan`
   - repeated SSRF rejection
   - paid mandate fail-closed behavior

A successful Git commit or CI build alone is **not** a production release.

## Rollback

- Hosting: roll back to the last known-good Firebase Hosting release in the Firebase project.
- Functions: redeploy the last known-good commit or roll back the function revision using the provider's supported revision controls.
- Do not disable authentication/entitlement checks to recover the paid endpoint.

## Missing credential behavior

Deployment credentials are never committed to this repository. If an authorized Firebase credential is not available to the execution environment, deployment stops at the provider boundary; code must not report the site as live until the external production smoke passes.
