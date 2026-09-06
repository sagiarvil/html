import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from build_full_site import get_header, get_footer

def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    print(f"Generated Hub: {rel_path}")

def build_tools_hub():
    tools_list = [
        {"en_title": "Website Scanner", "tr_title": "Web Sitesi Tarayıcısı", "en_slug": "website-scanner", "tr_slug": "site-tarama", "cat_en": "12 Engines · Full Crawl", "cat_tr": "12 Motor · Tam Tarama", "desc_en": "Complete 12-engine diagnostic crawl inspecting HTTP, SEO, AI, schema, and security across up to 50 public pages.", "desc_tr": "En fazla 50 sayfada HTTP, SEO, AI, şema ve güvenliği denetleyen 12 motorlu tam analiz."},
        {"en_title": "AI Website Readiness", "tr_title": "AI Web Sitesi Hazırlığı", "en_slug": "ai-website-readiness", "tr_slug": "ai-website-readiness", "cat_en": "LLM & Agent Retrieval", "cat_tr": "LLM ve Ajan Erişimi", "desc_en": "Comprehensive readiness audit evaluating robots.txt bot governance, llms.txt v2, JSON-LD knowledge graphs, and machine interfaces.", "desc_tr": "Bot izinlerini, llms.txt standardını, JSON-LD bilgi graflarını ve makine arayüzlerini ölçen hazırlık denetimi."},
        {"en_title": "llms.txt Validator", "tr_title": "llms.txt Doğrulayıcı", "en_slug": "llms-txt-validator", "tr_slug": "llms-txt-validator", "cat_en": "v2 Specification", "cat_tr": "v2 Şartnamesi", "desc_en": "Rigorous validation for /llms.txt and /llms-full.txt files: syntax, blockquotes, link reachability, and rel=describedby discovery.", "desc_tr": "/llms.txt ve /llms-full.txt dosyaları için sözdizimi, blok alıntı, link erişilebilirliği ve rel=describedby denetimi."},
        {"en_title": "AI Crawler Checker", "tr_title": "AI Tarayıcı Kontrolü", "en_slug": "ai-crawler-checker", "tr_slug": "ai-crawler-checker", "cat_en": "RFC 9309 · Bot Policies", "cat_tr": "RFC 9309 · Bot Kuralları", "desc_en": "Inspect allow/disallow behavior for OAI-SearchBot, Claude-SearchBot, PerplexityBot, GPTBot, and wildcard fallback rules.", "desc_tr": "OAI-SearchBot, Claude-SearchBot, PerplexityBot, GPTBot ve joker karakter kurallarını canlıda denetleyin."},
        {"en_title": "Schema Validator", "tr_title": "Yapısal Veri Kontrolü", "en_slug": "schema-validator", "tr_slug": "schema-validator", "cat_en": "JSON-LD & Entities", "cat_tr": "JSON-LD ve Varlıklar", "desc_en": "Parse raw JSON-LD blocks to detect syntax errors, broken schema structures, and missing entity linkages.", "desc_tr": "JSON-LD bloklarını ayrıştırarak sözdizimi hatalarını, bozuk şema yapılarını ve eksik varlık bağlantılarını tespit edin."},
        {"en_title": "Technical SEO Checker", "tr_title": "Teknik SEO Denetimi", "en_slug": "technical-seo-checker", "tr_slug": "teknik-seo-kontrol", "cat_en": "Metadata & Indexability", "cat_tr": "Meta Veri ve İndeksleme", "desc_en": "Audit titles, meta descriptions, single H1 rules, self-canonical tags, and route-level indexability traps.", "desc_tr": "Başlıkları, meta açıklamalarını, tek H1 kuralını, kanonik etiketleri ve dizine ekleme engellerini kanıtıyla inceleyin."},
        {"en_title": "Security Headers Checker", "tr_title": "Güvenlik Başlıkları Kontrolü", "en_slug": "security-headers-checker", "tr_slug": "guvenlik-basliklari-kontrol", "cat_en": "HTTP Edge Security", "cat_tr": "HTTP Uç Güvenliği", "desc_en": "Audit HSTS max-age and preload, Content-Security-Policy, X-Frame-Options clickjacking defense, and nosniff enforcement.", "desc_tr": "HSTS preload, Content-Security-Policy, clickjacking savunması ve nosniff kurallarını uç noktadan denetleyin."},
        {"en_title": "Accessibility Checker", "tr_title": "Erişilebilirlik Denetimi", "en_slug": "accessibility-checker", "tr_slug": "erisilebilirlik-kontrol", "cat_en": "WCAG Hygiene", "cat_tr": "WCAG Hijyeni", "desc_en": "Audit document html lang declarations, image alt attributes, programmatic form labels, and interactive button semantics.", "desc_tr": "html lang özniteliğini, resim alt etiketlerini, form bağlantılarını ve buton semantiğini kontrol edin."},
        {"en_title": "Link Integrity Checker", "tr_title": "Link Kontrolü", "en_slug": "link-integrity-checker", "tr_slug": "link-kontrol", "cat_en": "Live HTTP Probes", "cat_tr": "Canlı HTTP Probları", "desc_en": "Probe internal links with real HTTP requests to catch 404 errors, 500 crashes, circular redirects, and mixed protocols.", "desc_tr": "Gerçek HTTP istekleriyle 404 çıkmaz yollarını, sunucu hatalarını, döngüsel yönlendirmeleri ve protokol sorunlarını yakalayın."},
        {"en_title": "AI Mention Tracker", "tr_title": "AI Marka Görünürlük Takibi", "en_slug": "ai-mention-tracker", "tr_slug": "ai-mention-tracker", "cat_en": "Paid Module · Real Retrieval", "cat_tr": "Ücretli Modül · Gerçek Arama", "desc_en": "Run neutral prompts across OpenAI web search, Perplexity Sonar, and Gemini Google grounding to measure brand and domain citations.", "desc_tr": "Marka ve alan adı atıflarını ölçmek için OpenAI web search, Perplexity Sonar ve Gemini üzerinde nötr sorgular çalıştırın."}
    ]

    for lang in ['en', 'tr']:
        rel_path = "en/tools/index.html" if lang == 'en' else "tr/araclar/index.html"
        alt_url = "/tr/araclar/" if lang == 'en' else "/en/tools/"
        canonical_url = f"https://htmlandhtml.com/{'en/tools/' if lang == 'en' else 'tr/araclar/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"
        h1 = "Specialized Tools for <em>Modern Search & AI Retrieval</em>" if lang == 'en' else "Arama ve Yapay Zeka Keşfi İçin <em>Özel Denetim Araçları</em>"
        sub = "Ten deterministic, evidence-backed tools powered by our shared 12-engine scanning core. Test crawler policies, schema markup, security headers, and agent interfaces without false claims." if lang == 'en' else "Paylaşımlı 12 motorlu tarama çekirdeğimizle güçlendirilen 10 adet deterministik ve kanıta dayalı araç. Bot izinlerini, şemaları, güvenlik başlıklarını ve ajan arayüzlerini sahte iddialar olmadan test edin."

        cards = ""
        for t in tools_list:
            t_title = t['en_title'] if lang == 'en' else t['tr_title']
            t_slug = t['en_slug'] if lang == 'en' else t['tr_slug']
            t_cat = t['cat_en'] if lang == 'en' else t['cat_tr']
            t_desc = t['desc_en'] if lang == 'en' else t['desc_tr']
            t_url = f"/{lang}/{t_slug}/" if lang == 'en' else f"/tr/{t_slug}/"
            btn_text = "Launch Tool" if lang == 'en' else "Aracı Aç"

            cards += f'''<article class="authority-card">
  <b>{t_cat}</b>
  <h3>{t_title}</h3>
  <p>{t_desc}</p>
  <a href="{t_url}">{btn_text} →</a>
</article>'''

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Specialized Website Audit Tools | HTML&HTML' if lang == 'en' else 'Özel Web Sitesi Denetim Araçları | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/tools/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/araclar/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/tools/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "CollectionPage",
      "name": "{'Specialized Website Audit Tools' if lang == 'en' else 'Özel Web Sitesi Denetim Araçları'}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'Tools' if lang == 'en' else 'Araçlar'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'tools')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'Tools' if lang == 'en' else 'Araçlar'}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'ARAÇLAR DİZİNİ' if lang == 'tr' else 'TOOLS DIRECTORY'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
</section>

<section class="section">
  <div class="authority-grid">
    {cards}
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>{'Tek bir deterministik tarama çekirdeği.' if lang == 'tr' else 'One deterministic scanning engine.'}</h3>
      <p>{'Her araç aynı 12 motorlu çekirdeği çağırır ve ilgili kategorileri izole eder. Puanlama mantığı araçlar arasında asla sapma göstermez.' if lang == 'tr' else 'Every tool executes the same 12-engine core, filtering categories without score divergence. Implementation instructions unlock in the $149 Fix Mandate.'}</p>
    </div>
    <a href="/{'tr/fix-mandate/' if lang == 'tr' else 'en/fix-mandate/'}">{'Full Site Fix Mandate — $149' if lang == 'tr' else 'Full Site Fix Mandate — $149'}</a>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

def build_platform_hub():
    for lang in ['en', 'tr']:
        rel_path = "en/platform/index.html" if lang == 'en' else "tr/platform/index.html"
        alt_url = "/tr/platform/" if lang == 'en' else "/en/platform/"
        canonical_url = f"https://htmlandhtml.com/{'en/platform/' if lang == 'en' else 'tr/platform/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "Website AI Readiness: <em>The Autonomous Verification Platform</em>" if lang == 'en' else "Web Sitesi AI Hazırlığı: <em>Otonom Doğrulama Platformu</em>"
        sub = "How HTML&HTML audits, verifies, prioritizes, and fixes website technical hygiene for large language models, search engines, and autonomous coding agents." if lang == 'en' else "HTML&HTML'in büyük dil modelleri, arama motorları ve otonom kodlama ajanları için web sitelerini nasıl denetlediğini, önceliklendirdiğini ve düzelttiğini keşfedin."

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Platform Architecture — Website AI Readiness | HTML&HTML' if lang == 'en' else 'Platform Mimarisi — Web Sitesi AI Hazırlığı | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/platform/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/platform/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/platform/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "AboutPage",
      "name": "{'Platform Architecture' if lang == 'en' else 'Platform Mimarisi'}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "Platform", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'platform')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>Platform</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'PLATFORM MİMARİSİ' if lang == 'tr' else 'PLATFORM ARCHITECTURE'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
  <div class="pipeline-flow authority-proof" role="region" aria-label="Platform Architecture Loop">
    <div class="pipeline-node"><span class="node-badge">01</span><span class="node-title">SCAN</span><small class="node-desc">{"Derin Keşif" if lang == "tr" else "Deep Discovery"}</small></div>
    <span class="pipeline-arrow">→</span>
    <div class="pipeline-node"><span class="node-badge">02</span><span class="node-title">EVIDENCE</span><small class="node-desc">{"Kanıt Doğrulama" if lang == "tr" else "Evidence Audit"}</small></div>
    <span class="pipeline-arrow">→</span>
    <div class="pipeline-node"><span class="node-badge">03</span><span class="node-title">PRIORITIZE</span><small class="node-desc">{"P0–P3 Etki" if lang == "tr" else "P0–P3 Impact"}</small></div>
    <span class="pipeline-arrow">→</span>
    <div class="pipeline-node active"><span class="node-badge">04</span><span class="node-title">FIX</span><small class="node-desc">{"Uygulama Mandatı" if lang == "tr" else "Execution Mandate"}</small></div>
    <span class="pipeline-arrow">→</span>
    <div class="pipeline-node"><span class="node-badge">05</span><span class="node-title">RE-SCAN</span><small class="node-desc">{"30 Gün Doğrulama" if lang == "tr" else "30-Day Re-scan"}</small></div>
    <span class="pipeline-arrow">→</span>
    <div class="pipeline-node"><span class="node-badge">06</span><span class="node-title">MONITOR</span><small class="node-desc">{"Sürekli İzleme" if lang == "tr" else "Live Monitoring"}</small></div>
  </div>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'ÜRÜN SİSTEMİ' if lang == 'tr' else 'PRODUCT SYSTEM'}</span>
    <h2>{'Altı adımlı deterministik döngü.' if lang == 'tr' else 'The six-stage deterministic loop.'}</h2>
    <p>{'Sadece puan üretmek sorunu çözmez. HTML&HTML tespit ile düzeltme arasındaki köprüyü kurar.' if lang == 'tr' else 'Generating a vanity score fixes nothing. HTML&HTML bridges the gap between diagnosis and verifiable remediation.'}</p>
  </header>
  <div class="method-list">
    <div class="method-item">
      <b>01 / SCAN</b>
      <div>
        <h3>{'Deterministik 12 Motorlu Tarama' if lang == 'tr' else 'Deterministic 12-Engine Scan'}</h3>
        <p>{'DNS-over-HTTPS güvenlik kontrolü ve SSRF filtreleri sonrası 50 sayfaya kadar herkese açık web yüzeyi taranır.' if lang == 'tr' else 'Up to 50 public HTML pages and core machine endpoints are crawled through strict DNS-over-HTTPS and SSRF security gates.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>02 / EVIDENCE</b>
      <div>
        <h3>{'Doğrulanmış Kanıt Toplama' if lang == 'tr' else 'Verified Evidence Collection'}</h3>
        <p>{'Her bulgu için kaynak sınıfı (STANDART, SAĞLAYICI, ÖNERİ, SEZGİSEL), güven derecesi ve gerçek HTTP/HTML kanıtı üretilir.' if lang == 'tr' else 'Every finding is annotated with its evidence class (STANDARD, VENDOR, PROPOSAL, HEURISTIC), confidence level, and raw HTTP/HTML evidence.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>03 / PRIORITIZE</b>
      <div>
        <h3>{'P0–P3 Önem Sıralaması' if lang == 'tr' else 'P0–P3 Priority Sequencing'}</h3>
        <p>{'Bulgular rastgele listelenmez; arama ve yapay zeka erişimini doğrudan engelleyen kritik kusurlar en başa alınır.' if lang == 'tr' else 'Findings are prioritized by impact: blockers preventing crawler ingestion take precedence over minor cosmetic hygiene.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>04 / FIX</b>
      <div>
        <h3>{'Uygulama Sözleşmesi (Fix Mandate)' if lang == 'tr' else 'Remediation Mandate (Fix Mandate)'}</h3>
        <p>{'AI kodlama ajanınız veya mühendisleriniz için kök neden, kabul testleri, regresyon testleri ve geri alma planları sunulur.' if lang == 'tr' else 'Delivers root causes, ordered PR steps, acceptance tests, and rollback safeguards formatted for AI coding agents and human engineers.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>05 / RE-SCAN</b>
      <div>
        <h3>{'30 Günlük Yeniden Doğrulama' if lang == 'tr' else '30-Day Verification Re-Scan'}</h3>
        <p>{'Düzeltmeler yayına alındığında aynı kurallar tekrar çalıştırılır ve sorunların gerçekten çözüldüğü kanıtlanır.' if lang == 'tr' else 'Once code changes deploy, the identical test suite re-executes to prove the blocker is genuinely resolved.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>06 / MONITOR</b>
      <div>
        <h3>{'AI Marka Görünürlük Takibi' if lang == 'tr' else 'AI Mention & Citation Tracking'}</h3>
        <p>{'OpenAI, Perplexity ve Gemini üzerinde periyodik nötr sorgular çalıştırılarak markanızın arama yanıtlarındaki varlığı ölçülür.' if lang == 'tr' else 'Periodic neutral prompts across OpenAI, Perplexity, and Gemini measure whether clean technical hygiene translates into organic citations.'}</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>{'Metodolojimizi ve ağırlıklarımızı inceleyin.' if lang == 'tr' else 'Inspect our methodology and public weights.'}</h3>
      <p>{'12 analiz motorumuzun ağırlıkları, kural kaynakları ve epistemik sınırları herkese açık olarak belgelenmiştir.' if lang == 'tr' else 'Our 12-engine scoring weights, source registries, and epistemic boundaries are fully published and transparent.'}</p>
    </div>
    <a href="/{'tr/methodology/' if lang == 'tr' else 'en/methodology/'}">{'Metodoloji' if lang == 'tr' else 'Methodology'} →</a>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

def build_pricing_hub():
    for lang in ['en', 'tr']:
        rel_path = "en/pricing/index.html" if lang == 'en' else "tr/fiyatlandirma/index.html"
        alt_url = "/tr/fiyatlandirma/" if lang == 'en' else "/en/pricing/"
        canonical_url = f"https://htmlandhtml.com/{'en/pricing/' if lang == 'en' else 'tr/fiyatlandirma/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "Simple, Transparent Pricing: <em>Evidence Free. Fix Mandate $149.</em>" if lang == 'en' else "Basit ve Şeffaf Fiyatlandırma: <em>Tespit Ücretsiz. Düzeltme $149.</em>"
        sub = "No monthly retainer traps. No opaque enterprise tiers. Diagnose your public website for free, then purchase the implementation-grade Fix Mandate when ready." if lang == 'en' else "Aylık abonelik tuzakları yok. Karmaşık kurumsal paketler yok. Herkese açık sitenizi ücretsiz teşhis edin, hazır olduğunuzda $149 Fix Mandate ile düzeltin."

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Pricing — Free Diagnosis & $149 Fix Mandate | HTML&HTML' if lang == 'en' else 'Fiyatlandırma — Ücretsiz Teşhis ve $149 Fix Mandate | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/pricing/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/fiyatlandirma/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/pricing/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/validator.css?v=2">
<style>.pricing-grid.pricing-two .featured{{padding-top:72px}}.pricing-grid.pricing-two .featured .popular{{top:20px;left:24px;right:auto;max-width:calc(100% - 48px);white-space:nowrap}}.pricing-grid.pricing-two .featured .pricehead{{gap:24px}}@media(max-width:600px){{.pricing-grid.pricing-two .featured{{padding-top:68px}}.pricing-grid.pricing-two .featured .popular{{left:20px;max-width:calc(100% - 40px)}}}}</style>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "Product",
      "name": "HTML&HTML Full Site Fix Mandate",
      "description": "{'Implementation-grade fix contract for AI coding agents and engineering teams.' if lang == 'en' else 'AI kodlama ajanları ve mühendislik ekipleri için uygulama sözleşmesi.'}",
      "offers": [
        {{ "@type": "Offer", "name": "Free Diagnosis", "price": "0", "priceCurrency": "USD" }},
        {{ "@type": "Offer", "name": "Full Site Fix Mandate", "price": "149", "priceCurrency": "USD" }}
      ]
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'Pricing' if lang == 'en' else 'Fiyatlandırma'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'pricing')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'Pricing' if lang == 'en' else 'Fiyatlandırma'}</span>
</nav>

<main>
<section class="authority-hero" style="max-width: var(--shell-max); margin: 0 auto; padding: 72px 24px 48px; text-align: center;">
  <div class="kicker"><span></span><b>{'ŞEFFAF FİYATLANDIRMA' if lang == 'tr' else 'TRANSPARENT PRICING'}</b></div>
  <h1>{h1}</h1>
  <p style="max-width: 760px; margin: 18px auto 0; font-size: 18px; line-height: 1.65;">{sub}</p>
</section>

<section class="section pricing" style="border-top: 0; padding-top: 24px;">
  <div class="pricing-grid pricing-two">
    <article>
      <div class="pricehead">
        <span>{'TAM TEŞHİS' if lang == 'tr' else 'FULL DIAGNOSIS'}</span>
        <strong>$0</strong>
      </div>
      <p>{'Herkese açık web sitesi yüzeyinde tam teşhis.' if lang == 'tr' else 'Full diagnostic crawl across up to 50 public pages.'}</p>
      <ul>
        <li>{'12 deterministik motor skoru' if lang == 'tr' else '12 deterministic engine scores'}</li>
        <li>{'Tüm bulgular + doğrulanmış kanıtlar' if lang == 'tr' else 'All findings with attached evidence'}</li>
        <li>{'Severity + confidence + source class etiketleri' if lang == 'tr' else 'Severity, confidence, and source class'}</li>
        <li>{'Robots.txt ve AI tarayıcı politika matrisi' if lang == 'tr' else 'AI crawler policy matrix'}</li>
        <li>{'Kayıt veya kredi kartı gerekmez' if lang == 'tr' else 'No signup or credit card required'}</li>
      </ul>
      <a href="/{'tr/#scanner' if lang == 'tr' else 'en/#scanner'}">{'Ücretsiz Tara' if lang == 'tr' else 'Scan Free'}</a>
    </article>

    <article class="featured">
      <span class="popular">{'TEK ÜCRETLİ ÜRÜN' if lang == 'tr' else 'PRIMARY COMMERCIAL PRODUCT'}</span>
      <div class="pricehead">
        <span>{'TAM SİTE DÜZELTME TALİMATI' if lang == 'tr' else 'FULL SITE FIX MANDATE'}</span>
        <strong>$149</strong>
      </div>
      <p>{'Tek bir alan adı için uygulama-grade düzeltme sözleşmesi.' if lang == 'tr' else 'Implementation-grade fix contract for one domain.'}</p>
      <ul>
        <li>{'P0–P3 önem derecesine göre sıralı eylem planı' if lang == 'tr' else 'Prioritized P0–P3 implementation sequence'}</li>
        <li>{'ROOT FIX → RECOVERY → PREVENTION sözleşmesi' if lang == 'tr' else 'ROOT FIX → RECOVERY → PREVENTION framework'}</li>
        <li>{'Kabul testleri ve regresyon testleri' if lang == 'tr' else 'Automated acceptance and regression tests'}</li>
        <li>{'Geri alma (rollback) ve durma koşulları' if lang == 'tr' else 'Rollback plans and stop conditions'}</li>
        <li>{'30 gün içinde 1 adet doğrulama re-scan hakkı' if lang == 'tr' else 'One verification re-scan within 30 days'}</li>
      </ul>
      <a class="solid" href="/checkout">{'Fix Mandate Satın Al — $149' if lang == 'tr' else 'Buy Fix Mandate — $149'}</a>
    </article>
  </div>

  <div class="compare">
    <b>{'ÜRÜN SINIRI' if lang == 'tr' else 'PRODUCT BOUNDARY'}</b>
    <p>{'Free katmanda neyin yanlış olduğu ve kanıtı gösterilir. $149 Fix Mandate katmanında ise kök nedenin hangi sırayla, hangi testlerle ve hangi geri alma adımlarıyla çözüleceği sunulur. Public tarama dosya adını tahmin etmez; codebase bağlamı verildiğinde dosya düzeyine iner.' if lang == 'tr' else 'Free tier discloses what is broken with evidence. The $149 Fix Mandate delivers root causes, PR sequence, test assertions, and rollback plans. We never guess file names; provided codebase context allows file-level targeting.'}</p>
  </div>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'EK MODÜL' if lang == 'tr' else 'OPTIONAL MODULE'}</span>
    <h2>{'AI Marka Görünürlük Takibi' if lang == 'tr' else 'AI Mention Tracker'}</h2>
    <p>{'Markanızın OpenAI, Perplexity ve Gemini aramalarında kaynak gösterilip gösterilmediğini takip eden ayrı ücretli modül.' if lang == 'tr' else 'Optional monitoring module tracking brand mentions and domain citations across OpenAI, Perplexity, and Gemini.'}</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>{'DURUM' if lang == 'tr' else 'STATUS'}</b>
      <h3>{'Doğrudan API Entegrasyonu' if lang == 'tr' else 'Live API Integration'}</h3>
      <p>{'Sahte veri üretilmez. Sağlayıcı kimlik bilgileri yapılandırılmadığında açıkça \"bağlı değil\" gösterilir.' if lang == 'tr' else 'Zero mock data. Unconfigured upstream providers are transparently displayed as \"not connected\".'}</p>
      <a href="/{'tr/ai-mention-tracker/' if lang == 'tr' else 'en/ai-mention-tracker/'}">{'Modülü İncele' if lang == 'tr' else 'Inspect Module'} →</a>
    </article>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

def build_fix_mandate_hub():
    for lang in ['en', 'tr']:
        rel_path = "en/fix-mandate/index.html" if lang == 'en' else "tr/fix-mandate/index.html"
        alt_url = "/tr/fix-mandate/" if lang == 'en' else "/en/fix-mandate/"
        canonical_url = f"https://htmlandhtml.com/{'en/fix-mandate/' if lang == 'en' else 'tr/fix-mandate/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "Full Site Fix Mandate: <em>$149 Implementation Contract</em>" if lang == 'en' else "Full Site Fix Mandate: <em>$149 Uygulama Sözleşmesi</em>"
        sub = "Turn diagnostic evidence into engineering action. Prioritized root fixes, automated acceptance tests, regression assertions, and rollback plans for human engineers and AI coding agents." if lang == 'en' else "Teşhis kanıtlarını mühendislik eylemine dönüştürün. Mühendisler ve yapay zeka kodlama ajanları için öncelikli kök düzeltmeler, otomatik kabul testleri ve geri alma planları."

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Full Site Fix Mandate — $149 Engineering Contract | HTML&HTML' if lang == 'en' else 'Full Site Fix Mandate — $149 Mühendislik Sözleşmesi | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/fix-mandate/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/fix-mandate/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/fix-mandate/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "Product",
      "name": "HTML&HTML Full Site Fix Mandate",
      "description": "{sub}",
      "offers": {{ "@type": "Offer", "price": "149", "priceCurrency": "USD" }}
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "Fix Mandate", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'fix-mandate')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>Fix Mandate</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'TİCARİ MÜHENDİSLİK ÜRÜNÜ' if lang == 'tr' else 'COMMERCIAL ENGINEERING CONTRACT'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
  <div class="authority-proof">
    <span>P0–P3 Sequencing</span><span>Root Cause Fix</span><span>Acceptance Tests</span><span>Rollback Plan</span><span>30-Day Re-Scan</span>
  </div>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'SÖZLEŞME YAPISI' if lang == 'tr' else 'CONTRACT STRUCTURE'}</span>
    <h2>{'Bir Fix Mandate neleri içerir?' if lang == 'tr' else 'What does a Fix Mandate deliver?'}</h2>
    <p>{'Yüzeysel öneriler yerine kesin mühendislik sözleşmesi verilir.' if lang == 'tr' else 'Delivers exact operational contracts rather than generic marketing recommendations.'}</p>
  </header>
  <div class="method-list">
    <div class="method-item">
      <b>01 / ROOT FIX</b>
      <div>
        <h3>{'Kök Neden Çözümü' if lang == 'tr' else 'Root Cause Remediation'}</h3>
        <p>{'Semptomları geçici olarak maskelemek yerine sorunu üreten şablonu, sunucu yapılandırmasını veya yönlendirme kuralını kalıcı olarak düzeltir.' if lang == 'tr' else 'Fixes the underlying template, server config, or redirect rule producing the defect rather than applying superficial patches.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>02 / ORDER</b>
      <div>
        <h3>{'P0–P3 Uygulama Sırası' if lang == 'tr' else 'P0–P3 Implementation Sequence'}</h3>
        <p>{'Hangi değişikliğin önce yapılması gerektiğini belirler; taramayı tamamen engelleyen P0 kusurlar kozmetik P3 kusurlardan önce çözülür.' if lang == 'tr' else 'Sequences code changes so critical crawler blockers (P0) are deployed before minor semantic hygiene (P3).'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>03 / TEST</b>
      <div>
        <h3>{'Kabul ve Regresyon Testleri' if lang == 'tr' else 'Acceptance & Regression Tests'}</h3>
        <p>{'Her düzeltme için otomatik test komutları sağlar; böylece sonraki sürümlerde aynı hatanın tekrarlanması engellenir.' if lang == 'tr' else 'Includes concrete test commands and assertions to verify the fix and prevent future regression in CI/CD pipelines.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>04 / ROLLBACK</b>
      <div>
        <h3>{'Geri Alma ve Durma Koşulları' if lang == 'tr' else 'Rollback & Stop Conditions'}</h3>
        <p>{'Beklenmedik bir trafik düşüşü veya HTTP hatası durumunda değişikliğin güvenle geri alınmasını sağlayan net kurallar.' if lang == 'tr' else 'Explicit rollback instructions and failure signals to safely revert changes if unexpected side effects occur.'}</p>
      </div>
    </div>
    <div class="method-item">
      <b>05 / RE-SCAN</b>
      <div>
        <h3>{'30 Günlük Doğrulama Yeniden Taraması' if lang == 'tr' else '30-Day Verification Re-Scan'}</h3>
        <p>{'Kod değişiklikleriniz canlıya alındıktan sonra aynı alan adı için 30 gün içinde bir adet ücretsiz doğrulama taraması hakkı.' if lang == 'tr' else 'Includes one full verification re-scan within 30 days to certify that all issues were resolved in production.'}</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>{'Siteniz için Fix Mandate başlatın.' if lang == 'tr' else 'Order your Fix Mandate today.'}</h3>
      <p>{'Tek alan adı için $149 sabit fiyat. Ödeme güvenli Stripe altyapısı üzerinden işlenir.' if lang == 'tr' else 'Single $149 engagement per domain. Securely processed via Stripe with instant receipt.'}</p>
    </div>
    <a href="/checkout">{'Fix Mandate — $149' if lang == 'tr' else 'Fix Mandate — $149'}</a>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

build_tools_hub()
build_platform_hub()
build_pricing_hub()
build_fix_mandate_hub()
print("All Hub pages generated.")
