# HTML&HTML — LLMS.TXT News Editorial & Automation Policy

Status: PRODUCTION CONTRACT
Version: 1.0.0
Locale: TR + EN
Schedule target: 03:00 Europe/Istanbul daily (00:00 UTC)

## Purpose

LLMS.TXT News is an original AI Search intelligence desk. It monitors a fixed source set for material changes related to llms.txt, AI search visibility, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, AI crawlers, generative Search, agents, retrieval, structured data, crawling and measurement.

It is not a content-scraping or article-republishing system.

## Fixed source set

1. https://developers.google.com/search/blog
2. https://searchengineland.com
3. https://openai.com/news/
4. https://sparktoro.com/blog
5. https://www.mariehaynes.com/blog/

The source set may only be changed by a reviewed repository change.

## Non-negotiable editorial rules

1. Never republish or lightly rewrite a source article.
2. Never copy the source article body, author biography, captions or publisher artwork into HTML&HTML.
3. Never present an external publisher's image as an HTML&HTML image. Every news cover must be an original local HTML&HTML graphic/SVG.
4. Never publish an author name from an external article in the HTML&HTML article body or attribution UI.
5. Never use the publisher name as the attribution label. The outbound citation UI uses only `Orijinal kaynak` / `Original source` and links directly to the exact source URL.
6. Platform or product names such as Google, ChatGPT, Search Console, AI Mode, OpenAI APIs, Claude or Perplexity may be used when they are materially part of the subject. They must not be used as disguised attribution labels.
7. Every factual claim imported from an external update must be traceable to the exact source URL stored in `data/llms-news.json`.
8. Each published item must add original HTML&HTML value: why it matters, technical impact, what a site owner should verify, and an explicit evidence/uncertainty boundary.
9. No invented statistics, traffic claims, ranking claims, AI-citation guarantees, endorsements or private platform metrics.
10. No statement that llms.txt is an IETF/W3C/Google standard. Its status remains a proposal unless an authoritative standards status materially changes.
11. Google-specific behavior claims require a first-party Google source when available. OpenAI crawler/search behavior claims require first-party OpenAI documentation when available.
12. Automated publishing fails closed. If the editorial model, source retrieval, JSON validation, deduplication or quality gate fails, no new article is committed.
13. Maximum automatic publication: 3 new relevant briefs per daily run.
14. Articles must be bilingual before publication. A TR-only or EN-only automated item must not go live.
15. The canonical source link must remain crawlable and visible on the article page.
16. News pages must use canonical, reciprocal hreflang, Article/NewsArticle structured data, sitemap inclusion and machine-readable discovery links.
17. A news update must never mutate the canonical 12-engine scoring weights, the 13 Intelligence Audit contract, security boundaries or paid-entitlement logic.

## What the automation may ingest

The automation may ingest RSS/Atom metadata, titles, publication dates, canonical URLs and short feed descriptions/snippets needed to determine relevance and construct an editorial brief. It must not save or republish full external article bodies.

## Automated editorial output contract

For each new item the editorial system must produce:

- unique TR title
- unique EN title
- TR + EN dek
- TR + EN original summary
- `whyItMatters`
- `technicalImpact`
- 2–4 concrete verification/actions per locale
- evidence boundary per locale
- topic classification
- keywords
- exact canonical `sourceUrl`

The JSON output must pass the repository's schema/quality checks before it can be appended to the news feed.

## Fail-closed model dependency

New external updates are not automatically published unless a configured editorial API key is available. Missing model credentials are a safe no-op, not a reason to publish template filler or copied source text.

## Visual policy

The build creates original HTML&HTML SVG covers from the article topic, date and title. No remote publisher image is downloaded or embedded.

## SEO / AI authority objective

The objective is to become a high-signal AI Search reference hub by adding verified, source-linked, non-commodity interpretation. Volume is secondary to originality, evidence and usefulness.

Google, OpenAI or any other platform endorsement is never implied.
