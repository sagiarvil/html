#!/usr/bin/env python3
"""Canonical customer-facing copy layer for AI search visibility.

Runs after the authority/commercial builders. It intentionally changes presentation only:
no scoring, crawler, payment, security, or API contracts are touched.
"""
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parents[1]

EXCLUDED = {
    "checkout.html",
    "en/privacy/index.html", "en/terms/index.html",
    "tr/gizlilik/index.html", "tr/kullanim-kosullari/index.html",
    "privacy/index.html", "terms/index.html",
    "tr/fiyatlandirma/index.html", "en/pricing/index.html",
}

TR_COMMON = "HTML&HTML, web sitenizi yapay zeka arama sonuçlarında görünmeye ve tavsiye edilme fırsatı kazanmaya hazırlar. ChatGPT, Google'ın yapay zeka araması ve diğer AI sistemlerinde bulunmanızı, anlaşılmanızı, kaynak gösterilmenizi ve değerlendirme kümesine girmenizi zorlaştıran site kaynaklı engelleri kanıtıyla gösterir."
TR_HOME_LEAD = "Bir alan adı girin. Biz onu resmi spesifikasyona göre kontrol ediyoruz, her bağlantının gerçekten çalıştığını test ediyoruz ve düzeltmeniz gerekenleri saniyeler içinde size söylüyoruz."
EN_COMMON = "HTML&HTML prepares your website to compete for visibility, citation and recommendation opportunity in AI search. It shows measurable website-side blockers that can prevent discovery, understanding, source consideration and a usable referral path."

# The first sentence sells the customer expectation; the second explains the mechanism.
PAGES = {
    "index.html": {
        "title": "Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&HTML",
        "description": "Web siteniz yapay zeka arama sonuçlarında çıkmaya ve tavsiye edilme fırsatı kazanmaya hazır mı? GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt ve teknik temeli ücretsiz kontrol edin.",
        "h1": "Müşteriniz Yapay Zekaya “Kimi Tavsiye Edersin?” Diye Soruyor. Cevapta Siz Var mısınız?",
        "lead": TR_HOME_LEAD,
        "cta": "Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et",
    },
    "tr/index.html": {
        "title": "Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&HTML",
        "description": "Web siteniz yapay zeka arama sonuçlarında çıkmaya ve tavsiye edilme fırsatı kazanmaya hazır mı? GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt ve teknik temeli ücretsiz kontrol edin.",
        "h1": "Müşteriniz Yapay Zekaya “Kimi Tavsiye Edersin?” Diye Soruyor. Cevapta Siz Var mısınız?",
        "lead": TR_HOME_LEAD,
        "cta": "Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et",
    },
    "en/index.html": {
        "title": "AI Search Visibility, GEO, AEO & llms.txt | HTML&HTML",
        "description": "Is your website ready to appear in AI search and earn recommendation opportunity? Check GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt and the technical foundation free.",
        "h1": "Your Customer Asks AI “Who Should I Choose?” Is Your Website in the Answer Set?",
        "lead": EN_COMMON,
        "cta": "Check My AI Visibility Free",
    },

    "tr/platform/index.html": {"h1":"Yapay Zeka Arama Sonuçlarında Görünmek İçin Sitenizin Hangi Katmanları Hazır?","lead":"Yapay zeka görünürlüğü tek bir dosya veya tek bir SEO ayarı değildir. GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemap + teknik temel birlikte çalışır."},
    "en/platform/index.html": {"h1":"Which Layers of Your Website Are Ready for AI Search Visibility?","lead":"AI search visibility is not one file or one SEO setting. GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemaps + the technical foundation work as one system."},
    "tr/araclar/index.html": {"h1":"Yapay Zeka Sitenizi Neden Bulamıyor, Anlamıyor veya Kaynak Göstermiyor?","lead":"Her araç aynı ticari sorunun farklı halkasını ölçer: yapay zekanın sitenizi bulması, anlaması, kaynak olarak değerlendirmesi ve kullanıcıyı size taşıması."},
    "en/tools/index.html": {"h1":"Why Might AI Fail to Find, Understand or Cite Your Website?","lead":"Each tool measures a different link in the same commercial chain: discovery, understanding, source eligibility and a usable referral path."},
    "tr/rehberler/index.html": {"h1":"Yapay Zeka Arama Sonuçlarında Çıkmak İçin Ne Yapmalısınız?","lead":"Teknik terimleri ezberlemek yerine, yapay zeka görünürlüğü ve kaynak olma fırsatını etkileyen kararları resmi kaynaklar ve ölçülebilir kanıtla uygulayın."},
    "en/guides/index.html": {"h1":"What Should You Do to Compete for AI Search Visibility?","lead":"Skip generic hacks. Use official guidance and measurable evidence to improve the website-side conditions that support AI discovery, source eligibility and referral."},
    "tr/fix-mandate/index.html": {"h1":"Yapay Zeka Görünürlüğünüzün Önündeki Engelleri Uygulanabilir Düzeltme Reçetesine Çevirin.","lead":"$99 Fix Mandate bir tavsiye garantisi değil; ölçülen GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt ve teknik engelleri kök neden, uygulama, test ve rollback planına dönüştüren sözleşmedir."},
    "en/fix-mandate/index.html": {"h1":"Turn AI Search Visibility Blockers into a Testable Fix Prescription.","lead":"The $99 Fix Mandate is not a recommendation guarantee. It turns measured GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt and technical blockers into root-cause fixes, tests and rollback."},

    "tr/site-tarama/index.html": {"h1":"Yapay Zeka Arama Sonuçlarında Görünmenizi Engelleyen Sorunları Ücretsiz Bulun.","lead":TR_COMMON,"cta":"Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et"},
    "en/website-scanner/index.html": {"h1":"Find What Blocks Your Website from AI Search Visibility — Free.","lead":EN_COMMON,"cta":"Check My AI Visibility Free"},
    "tr/ai-website-readiness/index.html": {"h1":"Web Siteniz Yapay Zeka Tarafından Bulunmaya, Anlaşılmaya ve Tavsiye Edilmeye Hazır mı?","lead":"GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemap + teknik SEO katmanlarını tek görünümde değerlendirin.","cta":"Yapay Zeka Hazırlığımı Ücretsiz Kontrol Et"},
    "en/ai-website-readiness/index.html": {"h1":"Is Your Website Ready to Be Found, Understood and Considered by AI?","lead":"Evaluate GEO + AEO + LLMO + AAO + RAG + E-E-A-T + llms.txt + sitemaps + technical SEO as one readiness chain.","cta":"Check My AI Readiness Free"},
    "tr/llms-txt-validator/index.html": {"title":"llms.txt Doğrulayıcı — Yapay Zeka İçin llms.txt Kontrolü | HTML&HTML","description":"llms.txt dosyanız yapay zeka araçları ve ajanları için kullanılabilir mi? v2 önerisi, link sağlığı, rel=describedby ve Markdown keşfini ücretsiz doğrulayın.","h1":"llms.txt Dosyanız Yapay Zeka İçin Gerçekten Kullanılabilir mi?","lead":"llms.txt gelişen ve ilgi gören bir makine okunabilir bilgi yüzeyidir. HTML&HTML yapıyı, bağlantıları ve v2 keşif ilişkilerini doğrular; Google Search için özel sıralama garantisi olduğunu iddia etmez.","cta":"llms.txt'mi Ücretsiz Doğrula"},
    "en/llms-txt-validator/index.html": {"title":"llms.txt Validator — AI-Readable Knowledge Surface | HTML&HTML","description":"Is your llms.txt usable by AI tools and agents? Validate v2 proposal structure, link health, rel=describedby and Markdown discovery free.","h1":"Is Your llms.txt Actually Usable as an AI Knowledge Surface?","lead":"llms.txt is an emerging machine-readable knowledge-directory proposal. HTML&HTML validates structure, links and v2 discovery relationships without claiming it is a Google Search ranking requirement.","cta":"Validate My llms.txt Free"},
    "tr/ai-crawler-checker/index.html": {"h1":"ChatGPT ve Diğer Yapay Zeka Tarayıcıları Sitenize Ulaşabiliyor mu?","lead":"Yapay zeka arama sonuçlarında görünme fırsatı erişimle başlar. OAI-SearchBot ve diğer ilgili crawler politikalarının kritik sayfalarınızı engelleyip engellemediğini kanıtla görün.","cta":"Yapay Zeka Tarayıcı Erişimimi Kontrol Et"},
    "en/ai-crawler-checker/index.html": {"h1":"Can ChatGPT Search and Other AI Crawlers Reach Your Website?","lead":"AI search visibility starts with access. Verify whether OAI-SearchBot and other relevant crawler policies block critical pages.","cta":"Check My AI Crawler Access"},
    "tr/schema-validator/index.html": {"h1":"Yapay Zeka Sitenizin Kim Olduğunu ve Ne Sunduğunu Doğru Anlıyor mu?","lead":"Entity graph ve yapılandırılmış veri; marka, kişi, ürün, hizmet ve sayfa ilişkilerindeki belirsizliği azaltır. Görünür içerikle uyumlu olup olmadığını kontrol edin.","cta":"Yapay Zekanın Sitemi Nasıl Anladığını Kontrol Et"},
    "en/schema-validator/index.html": {"h1":"Can AI Resolve Who You Are and What Your Website Offers?","lead":"Entity graphs and structured data reduce ambiguity across organizations, people, products, services and pages. Verify that markup matches visible content.","cta":"Check How Machines Understand My Site"},
    "tr/teknik-seo-kontrol/index.html": {"h1":"Yapay Zeka Arama Görünürlüğünüz Teknik Temelde mi Kayboluyor?","lead":"Google'ın üretken yapay zeka Arama özellikleri de Search dizinine dayanır. Crawl, indexability, canonical, iç link ve metinsel içerik hâlâ görünürlüğün temelidir.","cta":"AI Görünürlük Temelimi Kontrol Et"},
    "en/technical-seo-checker/index.html": {"h1":"Is Your AI Search Visibility Breaking at the Technical Foundation?","lead":"Google's generative AI Search features still rely on the Search index. Crawlability, indexability, canonicals, internal links and textual content remain foundational.","cta":"Check My AI Visibility Foundation"},
    "tr/guvenlik-basliklari-kontrol/index.html": {"h1":"Güvenlik Ayarlarınız Yapay Zeka ve Kullanıcı Erişimini Yanlışlıkla Engelliyor mu?","lead":"Güvenlik kontrolleri korunmalı; fakat yanlış yapılandırılmış HTTP politikaları crawler, ajan ve kullanıcı akışlarını istemeden kesebilir.","cta":"Erişim ve Güvenlik Temelimi Kontrol Et"},
    "en/security-headers-checker/index.html": {"h1":"Are Security Controls Accidentally Blocking AI and User Access?","lead":"Security must stay strict, but misconfigured HTTP policies can unintentionally break crawler, agent and user journeys.","cta":"Check My Access & Security Foundation"},
    "tr/erisilebilirlik-kontrol/index.html": {"h1":"Yapay Zeka Ajanları ve Kullanıcılar Sitenizdeki Eylemleri Doğru Anlayabiliyor mu?","lead":"Erişilebilir isimler, roller, durumlar ve doğru form etiketleri insanlara yardım eder; aynı zamanda tarayıcı tabanlı AI ajanlarının etkileşimleri anlamasını kolaylaştırabilir.","cta":"AI Ajan Hazırlığımı Kontrol Et"},
    "en/accessibility-checker/index.html": {"h1":"Can AI Agents and Users Correctly Understand Your Website Actions?","lead":"Accessible names, roles, states and form labels help people and can also make browser-agent interactions easier to interpret.","cta":"Check My Agent Readiness"},
    "tr/link-kontrol/index.html": {"h1":"Yapay Zeka Sizi Kaynak Gösterdiğinde Kullanıcı Sağlam Bir Sayfaya Ulaşıyor mu?","lead":"Kırık URL, gereksiz yönlendirme zinciri veya çıkmaz sayfa; kaynak olma fırsatını kullanıcı yolculuğunda kaybedebilir.","cta":"AI Yönlendirme Yolumu Kontrol Et"},
    "en/link-integrity-checker/index.html": {"h1":"If AI Cites You, Does the User Reach a Working Page?","lead":"Broken URLs, redirect chains and dead ends can waste source and referral opportunity after discovery.","cta":"Check My AI Referral Path"},
    "tr/ai-mention-tracker/index.html": {"h1":"Yapay Zeka Cevaplarında Markanız Gerçekten Geçiyor mu?","lead":"Hazırlık ayrı, gerçek görünürlük ayrıdır. Nötr sorgularda marka atfını, alan adı kaynak gösterimini ve yapılandırılmış sağlayıcı durumunu ölçün."},
    "en/ai-mention-tracker/index.html": {"h1":"Does Your Brand Actually Appear in AI Answers?","lead":"Readiness and observed visibility are different. Measure neutral-prompt brand mentions, domain citations and configured provider status."},

    "tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/index.html": {"h1":"Yapay Zeka Arama Sonuçlarında Görünmek İçin Web Sitenizin Kontrol Listesi","lead":"Yapay zeka görünürlüğünü erişimden güvene kadar adım adım kontrol edin: GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemap ve teknik temel."},
    "en/guides/ai-website-readiness-checklist/index.html": {"h1":"Website Checklist for Competing in AI Search Results","lead":"Check AI search readiness from access to trust: GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemaps and the technical foundation."},
    "tr/rehberler/llms-txt/index.html": {"title":"llms.txt Nedir? Yapay Zeka İçin llms.txt Rehberi | HTML&HTML","description":"llms.txt nedir, ne değildir, v2 proposal nasıl çalışır, Google Search neden özel olarak kullanmaz ve HTML&HTML nasıl doğrular? Kaynaklı Türkçe referans rehber.","h1":"llms.txt Nedir? Yapay Zeka İçin Makine Okunabilir İçerik Haritası Nasıl Kurulur?","lead":"llms.txt, AI araçları ve ajanları için önemli kaynakları işaretlemeyi amaçlayan gelişen bir proposal'dır. Doğru kullanımı öğrenin; sitemap, robots.txt ve taranabilir HTML'in yerine koymayın."},
    "en/guides/llms-txt/index.html": {"title":"What Is llms.txt? AI Knowledge Directory Guide | HTML&HTML","description":"What is llms.txt, what is it not, how does the v2 proposal work, why doesn't Google Search use it specially, and how does HTML&HTML validate it?","h1":"What Is llms.txt? How to Build a Machine-Readable AI Knowledge Directory","lead":"llms.txt is an emerging proposal intended to point AI tools and agents to important resources. Use it as a complement to crawlable HTML, sitemaps and internal links—not a replacement."},
    "tr/rehberler/ai-tarayici-erisimi/index.html": {"h1":"ChatGPT ve Yapay Zeka Tarayıcılarına Erişim Nasıl Yönetilir?","lead":"Search/retrieval crawler erişimini eğitim ve ürün kontrol sinyallerinden ayırın. robots.txt politikasını bilinçli kurun ve gerçek erişimi ölçün."},
    "en/guides/ai-crawler-access/index.html": {"h1":"How Should You Manage ChatGPT and AI Crawler Access?","lead":"Separate search/retrieval access from training and product-control signals. Define robots.txt policy deliberately and verify actual reachability."},
    "tr/rehberler/ai-icin-yapisal-veri/index.html": {"h1":"Yapay Zeka Sitenizi Daha Net Anlasın: Entity Graph ve Yapısal Veri Rehberi","lead":"Organization, Person, WebSite, WebPage ve ürün/hizmet ilişkilerini görünür içerikle uyumlu bir varlık grafında kurun; yapısal veriyi sihirli AI işaretlemesi gibi sunmayın."},
    "en/guides/structured-data-for-ai/index.html": {"h1":"Help AI Resolve Your Site: Entity Graph & Structured Data Guide","lead":"Connect Organization, Person, WebSite, WebPage and product/service entities consistently with visible content—without presenting schema as special AI ranking markup."},
    "tr/rehberler/ai-arama-gorunurlugu/index.html": {"h1":"Yapay Zeka Arama Sonuçlarında Nasıl Görünür ve Kaynak Olmaya Hazır Hale Gelirsiniz?","lead":"Google'ın resmi üretken yapay zeka rehberi, OpenAI crawler kuralları ve HTML&HTML kanıt modeliyle görünürlük, kaynak olma uygunluğu ve referral yolunu birlikte ele alın."},
    "en/guides/ai-search-visibility/index.html": {"h1":"How Do You Become Visible and Source-Ready in AI Search?","lead":"Combine Google's official generative AI guidance, OpenAI crawler controls and HTML&HTML evidence to improve discovery, source eligibility and referral paths."},
}


def esc(value: str) -> str:
    return html.escape(value, quote=False)


def replace_title(text: str, value: str) -> str:
    return re.sub(r"<title>.*?</title>", f"<title>{esc(value)}</title>", text, count=1, flags=re.S | re.I)


def replace_description(text: str, value: str) -> str:
    repl = f'<meta name="description" content="{html.escape(value, quote=True)}">'
    return re.sub(r'<meta\s+name=["\']description["\']\s+content=["\'].*?["\']\s*/?>', repl, text, count=1, flags=re.S | re.I)


def replace_first_h1(text: str, value: str) -> str:
    main = re.search(r"<main\b[^>]*>(.*?)</main>", text, flags=re.S | re.I)
    if not main:
        return text
    segment = main.group(1)
    changed = re.sub(r"<h1([^>]*)>.*?</h1>", lambda m: f"<h1{m.group(1)}>{esc(value)}</h1>", segment, count=1, flags=re.S | re.I)
    return text[:main.start(1)] + changed + text[main.end(1):]


def replace_hero_lead(text: str, value: str) -> str:
    # Replace first paragraph after the first H1 inside main. This matches home, authority and tool hero patterns.
    main = re.search(r"<main\b[^>]*>(.*?)</main>", text, flags=re.S | re.I)
    if not main:
        return text
    segment = main.group(1)
    h1 = re.search(r"</h1>(.*)", segment, flags=re.S | re.I)
    if not h1:
        return text
    tail = h1.group(1)
    tail2 = re.sub(r"<p([^>]*)>.*?</p>", lambda m: f"<p{m.group(1)}>{esc(value)}</p>", tail, count=1, flags=re.S | re.I)
    changed = segment[:h1.start(1)] + tail2
    return text[:main.start(1)] + changed + text[main.end(1):]


def replace_cta(text: str, value: str) -> str:
    safe = esc(value)
    if 'id="scanButton"' in text:
        text = re.sub(r'(<button\s+id="scanButton"[^>]*>\s*<b[^>]*>).*?(</b>)', rf'\1{safe}\2', text, count=1, flags=re.S | re.I)
    if 'id="toolScanForm"' in text:
        text = re.sub(r'(<form[^>]+id="toolScanForm".*?<button\s+type="submit"[^>]*>).*?(</button>)', rf'\1{safe}\2', text, count=1, flags=re.S | re.I)
    return text


def apply_one(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if rel in EXCLUDED or rel not in PAGES:
        return False
    data = PAGES[rel]
    text = path.read_text(encoding="utf-8")
    before = text
    if data.get("title"):
        text = replace_title(text, data["title"])
    if data.get("description"):
        text = replace_description(text, data["description"])
    text = replace_first_h1(text, data["h1"])
    text = replace_hero_lead(text, data["lead"])
    if data.get("cta"):
        text = replace_cta(text, data["cta"])
    if text != before:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main():
    changed = 0
    missing = []
    for rel in PAGES:
        path = ROOT / rel
        if not path.exists():
            missing.append(rel)
            continue
        changed += 1 if apply_one(path) else 0
    if missing:
        raise SystemExit("CUSTOMER POSITIONING FAIL: missing canonical routes: " + ", ".join(missing))
    print(f"CUSTOMER POSITIONING PASS: {changed}/{len(PAGES)} canonical commercial pages materialized")


if __name__ == "__main__":
    main()
