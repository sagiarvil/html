# AI Editing Guide

Use this guide when giving the HTML&HTML project to ChatGPT, Claude Code, Cursor, Windsurf or another coding agent.

## Safe editing objective

Customize branding, copy, product catalog content and visual tokens without breaking responsive behavior, accessibility or preview routing.

## Primary files

- `index.html` — storefront content and product cards
- `assets/css/main.css` — design tokens, catalog layout and shared demo styles
- `live-preview.html` — local responsive preview shell and product map
- `demos/*.html` — original product demos
- `checkout.html` — honest non-payment placeholder until a real provider is connected

## Rules for AI agents

1. Preserve semantic heading order and keyboard-accessible controls.
2. Keep the `viewport` meta tag on every public page.
3. Do not reintroduce legacy third-party template names, copy, source, branding or remote demo URLs.
4. Do not claim Lighthouse, WCAG, browser or device results unless evidence exists.
5. Do not add a framework or runtime dependency unless explicitly requested.
6. When adding a catalog item, add matching entries to `index.html` and `live-preview.html`, then create its local `demos/<slug>.html` file.
7. Preserve the `$9–$29` default commercial positioning unless intentionally changed.
8. Keep checkout honest until a real payment provider is implemented.
9. Re-run link, asset, responsive, accessibility and console checks after material changes.

## Acceptance checks

- every catalog preview opens a local HTML&HTML demo
- no required relative link is broken
- no required local asset is missing
- no uncaught console error
- no unintended horizontal overflow at 320, 360, 390, 430, 768, 1024, 1440 and 1920px
- keyboard focus remains visible
- reduced motion is respected
- public indexable pages do not ship with `noindex`
