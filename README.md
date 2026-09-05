# HTML&HTML — Website Fix Validator

HTML&HTML is a bilingual (TR/EN) website validation and implementation-mandate product.

## Product flow

1. User enters a public domain or URL.
2. `/api/scan` inspects externally verifiable website signals.
3. The UI returns five scores plus prioritized findings.
4. A paid Fix Mandate turns findings into an AI-agent implementation contract.
5. Codebase Mandate adds source-aware file/component targeting when code access exists.

## Current checks

- HTTP/HTML availability
- title and meta description
- H1 hierarchy
- canonical
- HTML language
- viewport
- JSON-LD presence
- robots meta
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- HSTS, nosniff, CSP, referrer policy

## Commercial tiers

- Free Scan — $0
- Fix Mandate — $49 one-time
- Codebase Mandate — $99 one-time

Payment processing is intentionally not active until a production payment provider is connected.

## Runtime

- Static HTML/CSS/JS frontend
- Cloudflare Pages Function: `functions/api/scan.ts`
- No framework dependency

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

Cloudflare Pages:

```bash
npm run pages:deploy
```

The canonical production repository is `sagiarvil/html`.
