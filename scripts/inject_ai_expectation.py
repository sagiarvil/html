#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

EXCLUDED = {
    "checkout.html",
    "en/privacy/index.html", "en/terms/index.html",
    "tr/gizlilik/index.html", "tr/kullanim-kosullari/index.html",
    "privacy/index.html", "terms/index.html",
}

EVIDENCE_ROUTES = {
    "index.html", "en/index.html", "tr/index.html",
    "en/platform/index.html", "tr/platform/index.html",
    "en/pricing/index.html", "tr/fiyatlandirma/index.html",
    "en/fix-mandate/index.html", "tr/fix-mandate/index.html",
    "en/ai-search-visibility/index.html", "tr/yapay-zeka-arama-gorunurlugu/index.html",
    "en/glossary/index.html", "tr/sozluk/index.html",
}

GOOGLE_AI = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
OPENAI = "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"
GOOGLE_REPORTS = "https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports"

COPY = {
    "tr": {
        "eyebrow": "YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ → TAVSİYE FIRSATI → MÜŞTERİ",
        "title": "Müşteriniz yapay zekaya ‘kimi tavsiye edersin?’ diye soruyor. Cevapta siz var mısınız?",
        "lead": "HTML&HTML, web sitenizi yapay zeka arama sonuçlarında görünmeye, kaynak gösterilmeye ve tavsiye edilme fırsatı kazanmaya hazırlar. Sitenizin bulunmasını, anlaşılmasını ve değerlendirme kümesine girmesini engelleyen ölçülebilir sorunları kanıtıyla gösterir.",
        "primary": "Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et",
        "paid": "Sitemi Yapay Zeka Sonuçlarına Hazırla — $149",
        "guard": "Tavsiye, sıralama, atıf, trafik, müşteri veya gelir garanti edilmez. HTML&HTML dış sistemlerin kararını değil, bu fırsatın önündeki site kaynaklı teknik ve içerik engellerini ölçer.",
        "scan": "/tr/site-tarama/",
        "fix": "/tr/fix-mandate/",
        "glossary": "/tr/sozluk/",
        "glossary_label": "AI Arama Sözlüğünü Aç",
        "source_label": "Kaynağı aç",
        "stages": [
            ("01", "YAPAY ZEKA SİTENİZİ BULABİLSİN", "robots.txt, sitemap, canonical, indexability ve AI tarayıcı erişimi kaynak keşfinin temelidir."),
            ("02", "YAPAY ZEKA SİTENİZİ ANLAYABİLSİN", "GEO, AEO, LLMO, entity graph, schema ve cevap çıkarılabilirliği makine için belirsizliği azaltır."),
            ("03", "KAYNAK OLMAYA HAZIR OLUN", "RAG/retrieval, özgün bilgi, E-E-A-T, güncellik ve kanıt yapısı kaynak olma uygunluğunu destekler."),
            ("04", "TAVSİYE FIRSATINI TİCARİ DEĞERE BAĞLAYIN", "AAO, erişilebilir kullanıcı akışları, sağlam linkler, ölçülebilir referral ve net CTA talep fırsatını satış yoluna bağlar."),
        ],
        "terms": [
            ("llms.txt", "/tr/rehberler/llms-txt/"),
            ("GEO", "/tr/geo-optimizasyon/"),
            ("AEO", "/tr/aeo-answer-engine/"),
            ("LLMO", "/tr/llmo-optimizasyon/"),
            ("AAO", "/tr/aao-ajent-optimizasyon/"),
            ("RAG", "/tr/rag-optimizasyon/"),
            ("E-E-A-T", "/tr/e-e-a-t-guven-sinyalleri/"),
            ("Sitemap", "/tr/sozluk/#sitemap"),
        ],
        "evidence_title": "Resmi kaynaklarla doğrulanan zemin",
        "sources": [
            ("Google", "Google, üretken yapay zeka Arama için resmi rehber yayımlıyor; GEO ve AEO terimlerini tanıyor ancak bunları Google Search açısından SEO’nun parçası sayıyor. AI Overviews/AI Mode için özel ek teknik şart olmadığını ve llms.txt dosyasını Google Search görünürlüğü için kullanmadığını açıkça belirtiyor.", GOOGLE_AI),
            ("OpenAI", "OpenAI, herkese açık sitelerin ChatGPT Search’te görünebileceğini; OAI-SearchBot erişiminin içeriğin keşfedilmesi, öne çıkarılması, kaynak gösterilmesi ve bağlantılanması için önemli olduğunu belirtiyor.", OPENAI),
            ("Google Search Console", "Google, 2026’da üretken yapay zeka özellikleri için ayrı Search Console görünürlük raporlarını küresel olarak kullanıma sunduğunu açıkladı.", GOOGLE_REPORTS),
        ],
    },
    "en": {
        "eyebrow": "AI SEARCH VISIBILITY → RECOMMENDATION OPPORTUNITY → CUSTOMER",
        "title": "Your customer asks AI ‘who should I choose?’ Is your website in the consideration set?",
        "lead": "HTML&HTML prepares your website for visibility, citation eligibility and recommendation opportunity across AI search experiences. It shows measurable website-side blockers that can prevent discovery, understanding and source consideration.",
        "primary": "Check My AI Visibility Free",
        "paid": "Prepare My Site for AI Search — $149",
        "guard": "Recommendations, rankings, citations, traffic, customers and revenue are not guaranteed. HTML&HTML measures website-side technical and content blockers; it does not claim control over external AI systems.",
        "scan": "/en/website-scanner/",
        "fix": "/en/fix-mandate/",
        "glossary": "/en/glossary/",
        "glossary_label": "Open AI Search Glossary",
        "source_label": "Open source",
        "stages": [
            ("01", "BE DISCOVERABLE BY AI", "robots.txt, sitemaps, canonicals, indexability and AI crawler access form the discovery foundation."),
            ("02", "BE UNDERSTANDABLE", "GEO, AEO, LLMO, entity graphs, schema and answer extractability reduce machine ambiguity."),
            ("03", "BE SOURCE-READY", "RAG/retrieval, original information, E-E-A-T, freshness and evidence support source eligibility."),
            ("04", "TURN OPPORTUNITY INTO DEMAND", "AAO, accessible journeys, intact links, measurable referrals and clear CTAs connect AI discovery to commercial action."),
        ],
        "terms": [
            ("llms.txt", "/en/guides/llms-txt/"),
            ("GEO", "/en/geo-optimization/"),
            ("AEO", "/en/aeo-answer-engine-optimization/"),
            ("LLMO", "/en/llmo-optimization/"),
            ("AAO", "/en/aao-agent-optimization/"),
            ("RAG", "/en/rag-readiness/"),
            ("E-E-A-T", "/en/e-e-a-t-trust-signals/"),
            ("Sitemap", "/en/glossary/#sitemap"),
        ],
        "evidence_title": "Grounded in primary guidance",
        "sources": [
            ("Google", "Google publishes official guidance for generative AI Search, recognizes GEO/AEO as market terms but treats this work as SEO for Google Search, says there are no special extra AI Overview/AI Mode requirements, and says Google Search does not use llms.txt for this visibility.", GOOGLE_AI),
            ("OpenAI", "OpenAI says any public website can appear in ChatGPT Search and OAI-SearchBot access helps content be discovered, surfaced, clearly cited and linked.", OPENAI),
            ("Google Search Console", "Google announced dedicated generative AI Search visibility reporting in Search Console and worldwide rollout in 2026.", GOOGLE_REPORTS),
        ],
    },
}

INTENT = {
    "tr": {
        "llms-txt-validator": "llms.txt merakı gerçek; ancak fırsatı doğru satın. Google Search bunu yapay zeka görünürlüğü için kullanmıyor. HTML&HTML llms.txt’yi gelişen bir makine okunabilir bilgi yüzeyi olarak doğrular ve onu sitemap, robots.txt, taranabilir HTML ve iç linklerin yerine koymaz.",
        "ai-crawler-checker": "Yapay zeka arama sonuçlarında görünmek istiyorsanız ilk soru basit: ilgili tarayıcı kritik sayfanıza ulaşabiliyor mu? OAI-SearchBot, diğer AI crawler politikaları ve robots.txt erişimini kanıtla kontrol edin.",
        "ai-website-readiness": "Yapay zeka tarafından tavsiye edilme fırsatı tek dosyaya bağlı değildir. GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemap + teknik SEO aynı keşif ve güven zincirinin farklı parçalarıdır.",
        "schema-validator": "Yapay zeka sistemlerinin kim olduğunuzu, ne sunduğunuzu ve sayfalarınızın nasıl bağlandığını daha az belirsizlikle çözebilmesi için entity graph ve yapısal veri bütünlüğünü doğrulayın.",
        "site-tarama": "Tek skor değil, yapay zeka görünürlüğünün nerede kırıldığını görün: bulunma, anlaşılma, kaynak olma uygunluğu, tavsiye fırsatı veya dönüşüm yolu.",
        "teknik-seo-kontrol": "Klasik teknik SEO artık yalnız mavi linkler için değildir. Google’ın üretken yapay zeka özellikleri de Arama dizinine dayanır; taranabilirlik, indekslenebilirlik, canonical ve iç linkler hâlâ temeldir.",
        "ai-mention-tracker": "Hazırlığı ölçmekten sonraki adım gerçek görünürlüğü izlemektir: nötr sorgularda markanız geçiyor mu, alan adınız kaynak gösteriliyor mu ve bu görünürlük referral’a dönüşüyor mu?",
        "fix-mandate": "$149 Fix Mandate, ‘AI sizi tavsiye eder’ vaadi değil; yapay zeka arama görünürlüğü ve tavsiye fırsatı önündeki ölçülmüş engeller için kök neden, uygulama sırası, test ve rollback sözleşmesidir.",
        "fiyatlandirma": "Teşhis ücretsizdir. Ücretli ürün, yapay zeka arama görünürlüğü ve kaynak olma uygunluğu önündeki ölçülmüş engelleri test edilebilir uygulama reçetesine dönüştürür.",
    },
    "en": {
        "llms-txt-validator": "llms.txt interest is real, but the claim must be precise. Google Search does not use llms.txt for AI Search visibility. HTML&HTML validates it as an emerging machine-readable knowledge surface without treating it as a replacement for sitemaps, robots.txt, crawlable HTML or internal links.",
        "ai-crawler-checker": "If you want AI search visibility, start with the basic question: can the relevant crawler reach your critical page? Verify OAI-SearchBot and other AI crawler policies with evidence.",
        "ai-website-readiness": "Recommendation opportunity is not created by one file. GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemaps + technical SEO are different parts of one discovery and trust chain.",
        "website-scanner": "Do not settle for one score. Find where AI visibility breaks: discovery, understanding, source eligibility, recommendation opportunity or conversion path.",
        "technical-seo-checker": "Technical SEO is not only about blue links. Google’s generative AI Search features rely on the Search index, so crawlability, indexability, canonicals and internal links remain foundational.",
        "ai-mention-tracker": "After readiness, measure real visibility: does the brand appear for neutral prompts, is the domain cited, and does that exposure produce measurable referral paths?",
        "fix-mandate": "The $149 Fix Mandate is not an AI recommendation promise. It is a root-cause, implementation, testing and rollback contract for measured blockers to AI search visibility and source eligibility.",
        "pricing": "Diagnosis is free. The paid product converts measured blockers to AI search visibility and source eligibility into a testable implementation prescription.",
    },
}


def detect_lang(text: str) -> str:
    return "tr" if re.search(r'<html[^>]+lang=["\']tr(?:-|["\'])', text, re.I) else "en"


def route_lead(rel: str, lang: str, default: str) -> str:
    for key, value in INTENT[lang].items():
        if f"/{key}/" in f"/{rel}":
            return value
    return default


def section_html(rel: str, lang: str, evidence: bool) -> str:
    c = COPY[lang]
    stages = "".join(
        f'<article><b>{n}</b><h3>{title}</h3><p>{desc}</p></article>'
        for n, title, desc in c["stages"]
    )
    terms = "".join(f'<a href="{url}">{label}</a>' for label, url in c["terms"])
    evidence_html = ""
    if evidence:
        source_label = c["source_label"]
        cards = "".join(
            f'<article><b>{name}</b><p>{desc}</p><a href="{url}" target="_blank" rel="noopener noreferrer">{source_label} ↗</a></article>'
            for name, desc, url in c["sources"]
        )
        evidence_html = f'<div class="ai-market-evidence"><h3>{c["evidence_title"]}</h3><div>{cards}</div></div>'
    return (
        '<section class="ai-opportunity" data-commercial-intent="static"><div class="ai-opportunity-shell">'
        f'<span class="ai-opportunity-eyebrow">{c["eyebrow"]}</span><h2>{c["title"]}</h2>'
        f'<p class="ai-opportunity-lead">{route_lead(rel, lang, c["lead"])}</p>'
        f'<div class="ai-term-strip" aria-label="AI Search topics">{terms}<a class="all" href="{c["glossary"]}">{c["glossary_label"]} →</a></div>'
        f'<div class="ai-value-chain">{stages}</div><div class="ai-opportunity-actions">'
        f'<a class="ai-opportunity-primary" href="{c["scan"]}">{c["primary"]} →</a>'
        f'<a class="ai-opportunity-secondary" href="{c["fix"]}">{c["paid"]} →</a></div>'
        f'<p class="ai-opportunity-guard">{c["guard"]}</p>{evidence_html}</div></section>'
    )


def eligible_files():
    files = [ROOT / "index.html"]
    for locale in ("en", "tr"):
        base = ROOT / locale
        if base.exists():
            files.extend(base.rglob("*.html"))
    return sorted({p.resolve() for p in files if p.exists()})


def inject(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in EXCLUDED:
        return False
    text = path.read_text(encoding="utf-8")
    if "<footer" not in text:
        return False
    lang = detect_lang(text)
    text = re.sub(
        r'<section class="ai-opportunity" data-commercial-intent="static">.*?</section>\s*(?=<footer)',
        "",
        text,
        flags=re.S,
    )
    if "/assets/css/commercial-intent.css" not in text:
        text = text.replace(
            "</head>",
            '<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">\n</head>',
            1,
        )
    else:
        text = text.replace("/assets/css/commercial-intent.css?v=1", "/assets/css/commercial-intent.css?v=2")
    if rel == "index.html" and "/assets/js/ai-positioning.js" not in text:
        text = text.replace("</head>", '<script src="/assets/js/ai-positioning.js?v=1" defer></script>\n</head>', 1)
    glossary_link = '<a href="/tr/sozluk/">Sözlük</a>' if lang == "tr" else '<a href="/en/glossary/">Glossary</a>'
    if glossary_link not in text:
        text = re.sub(
            r'(<header class="topbar".*?<nav>)(.*?)(</nav>)',
            lambda m: m.group(1) + m.group(2) + glossary_link + m.group(3),
            text,
            count=1,
            flags=re.S,
        )
    text = text.replace("<footer", section_html(rel, lang, rel in EVIDENCE_ROUTES) + "\n<footer", 1)
    path.write_text(text, encoding="utf-8")
    return True


def main():
    changed = sum(1 for p in eligible_files() if inject(p))
    print(f"STATIC AI EXPECTATION POSITIONING PASS: {changed} pages materialized")


if __name__ == "__main__":
    main()
