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
    {"loc": "https://htmlandhtml.com/tr/kullanim-kosullari/", "changefreq": "monthly", "priority": "0.5", "alt_en": "https://htmlandhtml.com/en/terms/"},
    {"loc": "https://htmlandhtml.com/en/refund-policy/", "changefreq": "monthly", "priority": "0.5", "alt_tr": "https://htmlandhtml.com/tr/iade-politikasi/"},
    {"loc": "https://htmlandhtml.com/tr/iade-politikasi/", "changefreq": "monthly", "priority": "0.5", "alt_en": "https://htmlandhtml.com/en/refund-policy/"},

    # Architecture & Enterprise
    {"loc": "https://htmlandhtml.com/en/deterministic-layers/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/deterministik-katmanlar/"},
    {"loc": "https://htmlandhtml.com/tr/deterministik-katmanlar/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/deterministic-layers/"},
    {"loc": "https://htmlandhtml.com/en/enterprise-dark-pool/", "changefreq": "weekly", "priority": "0.9", "alt_tr": "https://htmlandhtml.com/tr/enterprise-dark-pool/"},
    {"loc": "https://htmlandhtml.com/tr/enterprise-dark-pool/", "changefreq": "weekly", "priority": "0.9", "alt_en": "https://htmlandhtml.com/en/enterprise-dark-pool/"}
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

