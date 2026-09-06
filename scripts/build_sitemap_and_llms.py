import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define all canonical routes
routes = [
    # Hubs & Home
    {"loc": "https://htmlandhtml.com/", "changefreq": "daily", "priority": "1.0"},
    {"loc": "https://htmlandhtml.com/en/", "changefreq": "daily", "priority": "1.0", "alt_tr": "https://htmlandhtml.com/tr/"},
    {"loc": "https://htmlandhtml.com/tr/", "changefreq": "daily", "priority": "1.0", "alt_en": "https://htmlandhtml.com/en/"},
    {"loc": "https://htmlandhtml.com/en/platform/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/platform/"},
    {"loc": "https://htmlandhtml.com/tr/platform/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/platform/"},
    {"loc": "https://htmlandhtml.com/en/tools/", "changefreq": "daily", "priority": "0.95", "alt_tr": "https://htmlandhtml.com/tr/araclar/"},
    {"loc": "https://htmlandhtml.com/tr/araclar/", "changefreq": "daily", "priority": "0.95", "alt_en": "https://htmlandhtml.com/en/tools/"},
    {"loc": "https://htmlandhtml.com/en/guides/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/rehberler/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/guides/"},
    {"loc": "https://htmlandhtml.com/en/pricing/", "changefreq": "monthly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/fiyatlandirma/"},
    {"loc": "https://htmlandhtml.com/tr/fiyatlandirma/", "changefreq": "monthly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/pricing/"},
    {"loc": "https://htmlandhtml.com/en/fix-mandate/", "changefreq": "monthly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/fix-mandate/"},
    {"loc": "https://htmlandhtml.com/tr/fix-mandate/", "changefreq": "monthly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/fix-mandate/"},

    # 10 Tools
    {"loc": "https://htmlandhtml.com/en/website-scanner/", "changefreq": "weekly", "priority": "0.95", "alt_tr": "https://htmlandhtml.com/tr/site-tarama/"},
    {"loc": "https://htmlandhtml.com/tr/site-tarama/", "changefreq": "weekly", "priority": "0.95", "alt_en": "https://htmlandhtml.com/en/website-scanner/"},
    {"loc": "https://htmlandhtml.com/en/ai-website-readiness/", "changefreq": "weekly", "priority": "0.95", "alt_tr": "https://htmlandhtml.com/tr/ai-website-readiness/"},
    {"loc": "https://htmlandhtml.com/tr/ai-website-readiness/", "changefreq": "weekly", "priority": "0.95", "alt_en": "https://htmlandhtml.com/en/ai-website-readiness/"},
    {"loc": "https://htmlandhtml.com/en/llms-txt-validator/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/llms-txt-validator/"},
    {"loc": "https://htmlandhtml.com/tr/llms-txt-validator/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/llms-txt-validator/"},
    {"loc": "https://htmlandhtml.com/en/ai-crawler-checker/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/ai-crawler-checker/"},
    {"loc": "https://htmlandhtml.com/tr/ai-crawler-checker/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/ai-crawler-checker/"},
    {"loc": "https://htmlandhtml.com/en/schema-validator/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/schema-validator/"},
    {"loc": "https://htmlandhtml.com/tr/schema-validator/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/schema-validator/"},
    {"loc": "https://htmlandhtml.com/en/technical-seo-checker/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/teknik-seo-kontrol/"},
    {"loc": "https://htmlandhtml.com/tr/teknik-seo-kontrol/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/technical-seo-checker/"},
    {"loc": "https://htmlandhtml.com/en/security-headers-checker/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/guvenlik-basliklari-kontrol/"},
    {"loc": "https://htmlandhtml.com/tr/guvenlik-basliklari-kontrol/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/security-headers-checker/"},
    {"loc": "https://htmlandhtml.com/en/accessibility-checker/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/erisilebilirlik-kontrol/"},
    {"loc": "https://htmlandhtml.com/tr/erisilebilirlik-kontrol/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/accessibility-checker/"},
    {"loc": "https://htmlandhtml.com/en/link-integrity-checker/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/link-kontrol/"},
    {"loc": "https://htmlandhtml.com/tr/link-kontrol/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/link-integrity-checker/"},
    {"loc": "https://htmlandhtml.com/en/ai-mention-tracker/", "changefreq": "weekly", "priority": "0.85", "alt_tr": "https://htmlandhtml.com/tr/ai-mention-tracker/"},
    {"loc": "https://htmlandhtml.com/tr/ai-mention-tracker/", "changefreq": "weekly", "priority": "0.85", "alt_en": "https://htmlandhtml.com/en/ai-mention-tracker/"},

    # 5 Guides
    {"loc": "https://htmlandhtml.com/en/guides/ai-website-readiness-checklist/", "changefreq": "monthly", "priority": "0.8", "alt_tr": "https://htmlandhtml.com/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/", "changefreq": "monthly", "priority": "0.8", "alt_en": "https://htmlandhtml.com/en/guides/ai-website-readiness-checklist/"},
    {"loc": "https://htmlandhtml.com/en/guides/llms-txt/", "changefreq": "monthly", "priority": "0.8", "alt_tr": "https://htmlandhtml.com/tr/rehberler/llms-txt/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/llms-txt/", "changefreq": "monthly", "priority": "0.8", "alt_en": "https://htmlandhtml.com/en/guides/llms-txt/"},
    {"loc": "https://htmlandhtml.com/en/guides/ai-crawler-access/", "changefreq": "monthly", "priority": "0.8", "alt_tr": "https://htmlandhtml.com/tr/rehberler/ai-tarayici-erisimi/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/ai-tarayici-erisimi/", "changefreq": "monthly", "priority": "0.8", "alt_en": "https://htmlandhtml.com/en/guides/ai-crawler-access/"},
    {"loc": "https://htmlandhtml.com/en/guides/structured-data-for-ai/", "changefreq": "monthly", "priority": "0.8", "alt_tr": "https://htmlandhtml.com/tr/rehberler/ai-icin-yapisal-veri/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/ai-icin-yapisal-veri/", "changefreq": "monthly", "priority": "0.8", "alt_en": "https://htmlandhtml.com/en/guides/structured-data-for-ai/"},
    {"loc": "https://htmlandhtml.com/en/guides/ai-search-visibility/", "changefreq": "monthly", "priority": "0.8", "alt_tr": "https://htmlandhtml.com/tr/rehberler/ai-arama-gorunurlugu/"},
    {"loc": "https://htmlandhtml.com/tr/rehberler/ai-arama-gorunurlugu/", "changefreq": "monthly", "priority": "0.8", "alt_en": "https://htmlandhtml.com/en/guides/ai-search-visibility/"},

    # Authority & Reference
    {"loc": "https://htmlandhtml.com/methodology.html", "changefreq": "monthly", "priority": "0.9"},
    {"loc": "https://htmlandhtml.com/en/methodology/", "changefreq": "monthly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/methodology/"},
    {"loc": "https://htmlandhtml.com/tr/methodology/", "changefreq": "monthly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/methodology/"},
    {"loc": "https://htmlandhtml.com/standard/", "changefreq": "monthly", "priority": "0.95"},
    {"loc": "https://htmlandhtml.com/en/evidence-standard/", "changefreq": "monthly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/kanit-standardi/"},
    {"loc": "https://htmlandhtml.com/tr/kanit-standardi/", "changefreq": "monthly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/evidence-standard/"},
    {"loc": "https://htmlandhtml.com/reference/ai-crawlers/", "changefreq": "weekly", "priority": "0.9"},
    {"loc": "https://htmlandhtml.com/en/reference/ai-crawlers/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/referans/ai-tarayicilar/"},
    {"loc": "https://htmlandhtml.com/tr/referans/ai-tarayicilar/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/reference/ai-crawlers/"},

    # Trust & Legal
    {"loc": "https://htmlandhtml.com/about/", "changefreq": "monthly", "priority": "0.7"},
    {"loc": "https://htmlandhtml.com/en/about/", "changefreq": "monthly", "priority": "0.7", "alt_tr": "https://htmlandhtml.com/tr/hakkimizda/"},
    {"loc": "https://htmlandhtml.com/tr/hakkimizda/", "changefreq": "monthly", "priority": "0.7", "alt_en": "https://htmlandhtml.com/en/about/"},
    {"loc": "https://htmlandhtml.com/contact/", "changefreq": "monthly", "priority": "0.6"},
    {"loc": "https://htmlandhtml.com/en/contact/", "changefreq": "monthly", "priority": "0.6", "alt_tr": "https://htmlandhtml.com/tr/iletisim/"},
    {"loc": "https://htmlandhtml.com/tr/iletisim/", "changefreq": "monthly", "priority": "0.6", "alt_en": "https://htmlandhtml.com/en/contact/"},
    {"loc": "https://htmlandhtml.com/privacy/", "changefreq": "monthly", "priority": "0.5"},
    {"loc": "https://htmlandhtml.com/en/privacy/", "changefreq": "monthly", "priority": "0.5", "alt_tr": "https://htmlandhtml.com/tr/gizlilik/"},
    {"loc": "https://htmlandhtml.com/tr/gizlilik/", "changefreq": "monthly", "priority": "0.5", "alt_en": "https://htmlandhtml.com/en/privacy/"},
    {"loc": "https://htmlandhtml.com/terms/", "changefreq": "monthly", "priority": "0.5"},
    {"loc": "https://htmlandhtml.com/en/terms/", "changefreq": "monthly", "priority": "0.5", "alt_tr": "https://htmlandhtml.com/tr/kullanim-kosullari/"},
    {"loc": "https://htmlandhtml.com/tr/kullanim-kosullari/", "changefreq": "monthly", "priority": "0.5", "alt_en": "https://htmlandhtml.com/en/terms/"}
]

# Generate sitemap.xml
xml_items = []
for r in routes:
    item = f"  <url>\n    <loc>{r['loc']}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <changefreq>{r['changefreq']}</changefreq>\n    <priority>{r['priority']}</priority>"
    if "alt_tr" in r:
        item += f'\n    <xhtml:link rel="alternate" hreflang="tr" href="{r["alt_tr"]}"/>'
        item += f'\n    <xhtml:link rel="alternate" hreflang="en" href="{r["loc"]}"/>'
    elif "alt_en" in r:
        item += f'\n    <xhtml:link rel="alternate" hreflang="en" href="{r["alt_en"]}"/>'
        item += f'\n    <xhtml:link rel="alternate" hreflang="tr" href="{r["loc"]}"/>'
    item += "\n  </url>"
    xml_items.append(item)

sitemap_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
{chr(10).join(xml_items)}
</urlset>'''

with open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(sitemap_content.strip() + "\n")
print(f"Generated sitemap.xml with {len(routes)} URLs.")

# Generate llms.txt (v2 Specification Directory)
llms_content = """# HTML&HTML

> HTML&HTML is a bilingual 12-engine website diagnosis and implementation-mandate platform. Evidence-backed public findings are free; the implementation contract is the paid product.

HTML&HTML separates measured facts, vendor/standard guidance, proposals, and internal heuristics. Public scanning never invents source-file paths and never fabricates field Core Web Vitals. The platform provides an extensive suite of 10 specialized audit tools, technical guides, open reference datasets, and commercial Fix Mandates using the shared canonical 12-engine scanning core.

## Open audit profile and reference layer

- [Open Website AI Readiness Audit Profile](https://htmlandhtml.com/standard/): Public HTML&HTML product profile defining the 12-engine decision contract, evidence classes, confidence, unknown-state semantics, and safety invariants. It is explicitly not presented as an IETF/W3C/vendor standard.
- [Machine-readable audit profile](https://htmlandhtml.com/audit-profile.json): Versioned JSON representation of the same engine weights, boundaries, and invariants.
- [External evidence source registry](https://htmlandhtml.com/sources.json): First-party vendor, standards-body, and proposal references with manual verification dates.
- [AI Crawler Reference 2026](https://htmlandhtml.com/reference/ai-crawlers/): Sourced distinctions between search, user-directed retrieval, model-development collection, and product-control robots tokens.

## Platform and Core Services

- [Website Fix Validator](https://htmlandhtml.com/): Free diagnosis across Crawl & Index, Technical SEO, AI/GEO crawler access, llms.txt v2, Structured Data, Performance Hygiene, Accessibility, Security Baseline, Content Trust, Agent Readiness, Conversion, and Link Integrity.
- [Platform Architecture — English](https://htmlandhtml.com/en/platform/): Six-stage deterministic product loop (SCAN → EVIDENCE → PRIORITIZE → FIX → RE-SCAN → MONITOR).
- [Platform Architecture — Turkish](https://htmlandhtml.com/tr/platform/): Altı aşamalı deterministik ürün döngüsü ve platform mimarisi.
- [Methodology](https://htmlandhtml.com/methodology.html): Public evidence classes, confidence levels, scoring rules, scan boundaries, and governance model.
- [Markdown overview](https://htmlandhtml.com/index.md): Clean machine-readable overview of the product and commercial boundary.
- [OpenAPI contract](https://htmlandhtml.com/openapi.json): Machine-readable contract for health, public scan, and entitlement-gated mandate endpoints.
- [Health endpoint](https://htmlandhtml.com/api/health): Runtime service state, version, engine count, and paid-mandate configuration state.

## Specialized Free Diagnostic Tools

- [Website Scanner — English](https://htmlandhtml.com/en/website-scanner/): Complete 12-engine public site audit.
- [Website Scanner — Turkish](https://htmlandhtml.com/tr/site-tarama/): 12 motorlu tam web sitesi taraması.
- [AI Website Readiness — English](https://htmlandhtml.com/en/ai-website-readiness/): Full 12-engine AI and technical readiness view.
- [AI Website Readiness — Turkish](https://htmlandhtml.com/tr/ai-website-readiness/): 12 motorlu AI/GEO ve teknik hazırlık görünümü.
- [llms.txt Validator — English](https://htmlandhtml.com/en/llms-txt-validator/): Structure, real HTTP link reachability, llms.txt v2 discovery, and related AI access evidence.
- [llms.txt Validator — Turkish](https://htmlandhtml.com/tr/llms-txt-validator/): llms.txt yapı, gerçek link erişimi, v2 keşif ilişkileri ve ilgili AI erişim kanıtları.
- [AI Crawler Checker — English](https://htmlandhtml.com/en/ai-crawler-checker/): Bot-policy and crawl-access checks for OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, and Google-Extended.
- [AI Crawler Checker — Turkish](https://htmlandhtml.com/tr/ai-crawler-checker/): AI bot politikası ve crawl erişimi kontrolleri.
- [Schema Validator — English](https://htmlandhtml.com/en/schema-validator/): JSON-LD syntax, entity relationships, and Schema.org types.
- [Schema Validator — Turkish](https://htmlandhtml.com/tr/schema-validator/): JSON-LD sözdizimi ve varlık şeması kontrolü.
- [Technical SEO Checker — English](https://htmlandhtml.com/en/technical-seo-checker/): Title, meta, single H1, and canonical tag audit.
- [Technical SEO Checker — Turkish](https://htmlandhtml.com/tr/teknik-seo-kontrol/): Başlık, meta ve kanonik etiket denetimi.
- [Security Headers Checker — English](https://htmlandhtml.com/en/security-headers-checker/): HSTS, CSP, X-Frame-Options, and nosniff verification.
- [Security Headers Checker — Turkish](https://htmlandhtml.com/tr/guvenlik-basliklari-kontrol/): Güvenlik başlıkları ve HSTS denetimi.
- [Accessibility Checker — English](https://htmlandhtml.com/en/accessibility-checker/): WCAG baseline, form labels, and image alt text.
- [Accessibility Checker — Turkish](https://htmlandhtml.com/tr/erisilebilirlik-kontrol/): Erişilebilirlik hijyeni ve etiket kontrolleri.
- [Link Integrity Checker — English](https://htmlandhtml.com/en/link-integrity-checker/): Live HTTP probes detecting 404s and redirect chains.
- [Link Integrity Checker — Turkish](https://htmlandhtml.com/tr/link-kontrol/): Kırık link ve yönlendirme zinciri denetimi.
- [AI Mention Tracker — English](https://htmlandhtml.com/en/ai-mention-tracker/): Brand mention and domain citation tracking across OpenAI, Perplexity, and Gemini.
- [AI Mention Tracker — Turkish](https://htmlandhtml.com/tr/ai-mention-tracker/): Yapay zeka arama yanıtlarında marka atfı takibi.

## Technical Guides & Educational Resources

- [AI Website Readiness Checklist — English](https://htmlandhtml.com/en/guides/ai-website-readiness-checklist/): Actionable 10-step checklist for generative engine optimization.
- [AI Website Readiness Checklist — Turkish](https://htmlandhtml.com/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/): 10 adımlık teknik AI hazırlık kontrol listesi.
- [llms.txt Specification Guide — English](https://htmlandhtml.com/en/guides/llms-txt/): v2 format, blockquotes, and rel=describedby discovery rules.
- [llms.txt Specification Guide — Turkish](https://htmlandhtml.com/tr/rehberler/llms-txt/): llms.txt v2 şartnamesi ve keşif rehberi.
- [AI Crawler Access Guide — English](https://htmlandhtml.com/en/guides/ai-crawler-access/): Decoupling search bots from training scrapers in robots.txt.
- [AI Crawler Access Guide — Turkish](https://htmlandhtml.com/tr/rehberler/ai-tarayici-erisimi/): Arama botları ile model eğitimi tarayıcılarını ayırma rehberi.
- [Structured Data for AI Guide — English](https://htmlandhtml.com/en/guides/structured-data-for-ai/): JSON-LD entity graphs for neural retrieval.
- [Structured Data for AI Guide — Turkish](https://htmlandhtml.com/tr/rehberler/ai-icin-yapisal-veri/): AI bilgi çıkarımı için yapısal veri rehberi.
- [AI Search Visibility Guide — English](https://htmlandhtml.com/en/guides/ai-search-visibility/): Generative engine optimization strategies.
- [AI Search Visibility Guide — Turkish](https://htmlandhtml.com/tr/rehberler/ai-arama-gorunurlugu/): Üretken motor optimizasyonu stratejileri.

## Identity, support and policy

- [About HTML&HTML](https://htmlandhtml.com/about/): Product identity, evidence-first position, and commercial boundary.
- [Contact and support](https://htmlandhtml.com/contact/): Official contact route for technical and commercial inquiries.
- [Privacy Policy](https://htmlandhtml.com/privacy/): Public scan data boundary and zero secret storage contract.
- [Terms of Service](https://htmlandhtml.com/terms/): Responsible-use boundaries and explicit limits of diagnostic scores.
- [Source repository](https://github.com/sagiarvil/html): Maintained source-of-truth repository for HTML&HTML.

## Commercial model

- Free Diagnosis: USD 0. All detected issues, URLs, severity, confidence, source class, and evidence are visible.
- Full Site Fix Mandate: USD 149 for one domain / one engagement. It converts a fresh scan into P0–P3 implementation order, ROOT FIX, RECOVERY, PREVENTION, acceptance/regression tests, rollback, and stop conditions.
- Re-scan: One re-scan within 30 days is included in the commercial scope.

## Evidence policy

- OFFICIAL_STANDARD: standards or normative platform rules.
- OFFICIAL_VENDOR: current crawler/product guidance from the relevant vendor.
- PROPOSAL: emerging proposals such as llms.txt; not presented as ranking requirements.
- MEASURED: direct HTTP/HTML/header/link evidence.
- INTERNAL_HEURISTIC: clearly labeled product heuristics.
- EXPERIMENTAL: optional agent surfaces such as A2A/MCP when applicable.

## Scan boundaries

- Up to 50 public HTML pages and 30 link probes per scan.
- Private/local/reserved targets, credential-bearing URLs, non-standard ports, and redirect pivots into private address space fail closed.
- Unknown or unavailable measurements are excluded from the relevant score denominator rather than forced to pass or fail.
- Reliable LCP, INP, and CLS require field/lab data integration. If unavailable, those metrics remain NOT_MEASURED.
"""

with open(os.path.join(ROOT, "llms.txt"), "w", encoding="utf-8") as f:
    f.write(llms_content.strip() + "\n")
print("Generated llms.txt v2 directory.")

# Update index.md
index_md_content = """# HTML&HTML — Platform & Architecture Overview

HTML&HTML provides deterministic, evidence-based website audits and Fix Mandates for engineering teams and AI coding agents.

## Core Capabilities
1. **12 Independent Diagnostic Engines:** Crawl & Index, Technical SEO, AI/GEO Access, llms.txt v2, Structured Data, Performance Hygiene, Accessibility, Security Baseline, Content Trust, Agent Readiness, Conversion, and Link Integrity.
2. **Deterministic Governance:** Every finding is linked to raw evidence. No vanity percentages or fabricated metrics.
3. **Boundaries:** 50 public HTML pages, 30 live link probes, strict SSRF defenses, zero private credential storage.
4. **Commercial Product ($149):** Full Site Fix Mandate sequencing root causes, recovery, prevention, tests, and rollback for AI agents.

## Machine-Readable Endpoints
- `/llms.txt`: Directory of all platform services, tools, and technical guides.
- `/openapi.json`: OpenAPI 3.1.0 REST API specification for `/api/health`, `/api/scan`, `/api/mentions`, and `/api/mandate`.
- `/audit-profile.json`: Canonical scoring weights and rule governance.
- `/sources.json`: Registry of standards, RFCs, and vendor crawler documentation.
"""

with open(os.path.join(ROOT, "index.md"), "w", encoding="utf-8") as f:
    f.write(index_md_content.strip() + "\n")
print("Generated index.md.")
