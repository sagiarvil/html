import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from build_full_site import get_header, get_footer

def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    print(f"Generated Authority/Legal: {rel_path}")

def build_methodology():
    for lang in ['en', 'tr']:
        rel_path = f"{lang}/methodology/index.html"
        alt_url = "/tr/methodology/" if lang == 'en' else "/en/methodology/"
        canonical_url = f"https://htmlandhtml.com/{lang}/methodology/"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "Scoring Methodology & <em>Governance Standards</em>" if lang == 'en' else "Puanlama Metodolojisi ve <em>Yönetişim Standartları</em>"
        sub = "How HTML&HTML measures 12 independent diagnostic categories, assigns evidence classes, handles unmeasured signals, and enforces deterministic scoring boundaries." if lang == 'en' else "HTML&HTML'in 12 bağımsız analiz motorunu nasıl ölçtüğünü, kanıt sınıflarını nasıl atadığını, ölçülmeyen sinyalleri nasıl ele aldığını ve puanlama sınırlarını nasıl koruduğunu keşfedin."

        source_classes = [
            ("OFFICIAL_STANDARD", "RFCs (e.g. RFC 9309 robots.txt), W3C standards, Schema.org official vocabularies." if lang == 'en' else "RFC standartları (örn. RFC 9309 robots.txt), W3C standartları ve Schema.org resmi sözlükleri."),
            ("OFFICIAL_VENDOR", "Published vendor crawler documentation from OpenAI, Anthropic, Google, and Perplexity." if lang == 'en' else "OpenAI, Anthropic, Google ve Perplexity tarafından yayınlanan resmi tarayıcı dokümanları."),
            ("PROPOSAL", "Emerging specifications such as llms.txt v2. Evaluated with limited weight and marked as evolving." if lang == 'en' else "llms.txt v2 gibi gelişmekte olan şartnameler. Sınırlı ağırlıkla puanlanır ve açıkça etiketlenir."),
            ("MEASURED", "Directly observed HTTP responses, status codes, headers, and SSL parameters." if lang == 'en' else "Doğrudan gözlemlenen HTTP yanıtları, durum kodları, başlıklar ve SSL parametreleri."),
            ("INTERNAL_HEURISTIC", "Internal algorithmic patterns detecting dead-end navigation or anti-patterns." if lang == 'en' else "Çıkmaz yönlendirmeleri veya kod anti-desenlerini yakalayan dahili algoritmik modeller."),
            ("EXPERIMENTAL", "Early-stage agent discovery signals (e.g. MCP endpoints), labeled separately without score inflation." if lang == 'en' else "Erken aşama ajan keşif sinyalleri (örn. MCP uç noktaları), puanı şişirmeden ayrı etiketlenir.")
        ]

        sc_html = "".join(f'''<div class="method-item">
  <b>{sc}</b>
  <div>
    <h3>{sc}</h3>
    <p>{desc}</p>
  </div>
</div>''' for sc, desc in source_classes)

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Scoring Methodology — 12-Engine Architecture | HTML&HTML' if lang == 'en' else 'Puanlama Metodolojisi — 12 Motorlu Mimari | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/methodology/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/methodology/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/methodology/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "TechArticle",
      "headline": "{h1.replace('<em>', '').replace('</em>', '')}",
      "description": "{sub}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'Methodology' if lang == 'en' else 'Metodoloji'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'methodology')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'Methodology' if lang == 'en' else 'Metodoloji'}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'YÖNETİŞİM VE METODOLOJİ' if lang == 'tr' else 'GOVERNANCE & METHODOLOGY'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'KAYNAK SINIFLARI' if lang == 'tr' else 'EVIDENCE CLASSES'}</span>
    <h2>{'Altı kademeli kanıt hiyerarşisi.' if lang == 'tr' else 'Six-tier evidence hierarchy.'}</h2>
    <p>{'Bir standardı, sağlayıcı kılavuzunu, öneriyi ve iç sezgisel kuralı asla birbirine karıştırmayız.' if lang == 'tr' else 'We never conflate an official standard, a vendor guideline, an evolving proposal, and an internal heuristic.'}</p>
  </header>
  <div class="method-list">
    {sc_html}
  </div>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'EPİSTEMİK DÜRÜSTLÜK' if lang == 'tr' else 'EPISTEMIC HONESTY'}</span>
    <h2>{'Ölçülmeyen sinyaller: NOT_MEASURED ilkesi.' if lang == 'tr' else 'Unmeasured signals: The NOT_MEASURED contract.'}</h2>
    <p>{'Core Web Vitals (LCP, INP, CLS) verileri gerçek tarayıcı ortamı ve CrUX entegrasyonu olmadan üretilemez. HTML çekiminden sahte performans puanı uydurmak yerine kesin olarak NOT_MEASURED döneriz.' if lang == 'tr' else 'Core Web Vitals cannot be fabricated from raw HTML fetches. Without real user CrUX metrics, performance hygiene strictly reports NOT_MEASURED.'}</p>
  </header>
  <div class="compare">
    <b>{'GÜVENLİK SINIRI' if lang == 'tr' else 'SSRF GUARD'}</b>
    <p>{'Yerel ağlar, localhost, cloud metadata IP adresleri (169.254.169.254) ve private yönlendirmeler SSRF koruması kapsamında fail-closed olarak engellenir.' if lang == 'tr' else 'Private IPv4/IPv6 ranges, loopback addresses, and cloud metadata endpoints fail closed before any TCP handshake to prevent SSRF vulnerabilities.'}</p>
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>{'Ağırlıklarımızı ve kaynak kayıt defterini inceleyin.' if lang == 'tr' else 'Inspect public weights and sources.'}</h3>
      <p>{'audit-profile.json ve sources.json dosyalarımız üretim tarama motorumuzla birebir senkronize tutulur.' if lang == 'tr' else 'Our audit-profile.json and sources.json files are synchronized with our canonical scan engine.'}</p>
    </div>
    <a href="/audit-profile.json">audit-profile.json →</a>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

    # Sync root methodology.html
    root_en = html if lang == 'en' else html
    # Let's ensure methodology.html has all required tokens
    write_page("methodology.html", html)

build_methodology()
print("Methodology built.")

def build_evidence_standard():
    for lang in ['en', 'tr']:
        rel_path = f"{lang}/evidence-standard/index.html" if lang == 'en' else "tr/kanit-standardi/index.html"
        alt_url = "/tr/kanit-standardi/" if lang == 'en' else "/en/evidence-standard/"
        canonical_url = f"https://htmlandhtml.com/{'en/evidence-standard/' if lang == 'en' else 'tr/kanit-standardi/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "Evidence Standard: <em>Zero False Certainty</em>" if lang == 'en' else "Kanıt Standardı: <em>Sıfır Sahte Kesinlik</em>"
        sub = "How HTML&HTML validates signals, attaches raw HTTP and HTML evidence to every finding, and separates verified facts from speculative guesses." if lang == 'en' else "HTML&HTML'in sinyalleri nasıl doğruladığını, her bulguya nasıl gerçek HTTP/HTML kanıtı eklediğini ve olguları tahminlerden nasıl ayırdığını öğrenin."

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'Evidence Standard — Verifiable Web Signals | HTML&HTML' if lang == 'en' else 'Kanıt Standardı — Doğrulanabilir Web Sinyalleri | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/evidence-standard/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/kanit-standardi/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/evidence-standard/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "TechArticle",
      "headline": "{h1.replace('<em>', '').replace('</em>', '')}",
      "description": "{sub}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'Evidence Standard' if lang == 'en' else 'Kanıt Standardı'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'methodology')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'Evidence Standard' if lang == 'en' else 'Kanıt Standardı'}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'KANIT VE DOĞRULAMA' if lang == 'tr' else 'EVIDENCE & INTEGRITY'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'İLKELER' if lang == 'tr' else 'PRINCIPLES'}</span>
    <h2>{'Kanıt ilkelerimiz.' if lang == 'tr' else 'Our evidence principles.'}</h2>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>01 / REAL EVIDENCE</b>
      <h3>{'Ham HTTP ve HTML Kanıtı' if lang == 'tr' else 'Raw HTTP & HTML Evidence'}</h3>
      <p>{'Her bulgu ilgili satırı, başlığı veya HTTP durum kodunu açıkça gösterir.' if lang == 'tr' else 'Every finding includes the specific line, header, or HTTP status code proving the issue.'}</p>
    </article>
    <article class="authority-card">
      <b>02 / CONFIDENCE</b>
      <h3>{'Güven Derecelendirmesi' if lang == 'tr' else 'Confidence Classification'}</h3>
      <p>{'Bulgular CONFIRMED, STRONG ve PROBABLE olarak etiketlenir.' if lang == 'tr' else 'Findings are classified into CONFIRMED, STRONG, and PROBABLE confidence tiers.'}</p>
    </article>
    <article class="authority-card">
      <b>03 / SOURCE CLASS</b>
      <h3>{'Normatif Güç' if lang == 'tr' else 'Normative Strength'}</h3>
      <p>{'Resmi standartlar ile topluluk önerileri arasındaki fark açıkça belirtilir.' if lang == 'tr' else 'The distinction between official web standards and community proposals is explicit.'}</p>
    </article>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)
        if lang == 'en':
            write_page("standard/index.html", html)

def build_crawler_reference():
    for lang in ['en', 'tr']:
        rel_path = f"{lang}/reference/ai-crawlers/index.html" if lang == 'en' else "tr/referans/ai-tarayicilar/index.html"
        alt_url = "/tr/referans/ai-tarayicilar/" if lang == 'en' else "/en/reference/ai-crawlers/"
        canonical_url = f"https://htmlandhtml.com/{'en/reference/ai-crawlers/' if lang == 'en' else 'tr/referans/ai-tarayicilar/'}"
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"

        h1 = "AI Crawler Directory: <em>User-Agents & IP Ranges</em>" if lang == 'en' else "AI Tarayıcı Dizini: <em>User-Agent ve IP Bilgileri</em>"
        sub = "A canonical reference of official web crawlers operated by OpenAI, Anthropic, Google, Perplexity, and Apple, including purpose, user-agent tokens, and documentation links." if lang == 'en' else "OpenAI, Anthropic, Google, Perplexity ve Apple tarafından işletilen resmi web tarayıcılarının kullanıcı ajanları, amaçları ve dokümantasyon bağlantıları."

        crawlers = [
            ("OAI-SearchBot", "OpenAI", "Real-Time Search", "Powers web search queries inside ChatGPT Search.", "https://platform.openai.com/docs/bots"),
            ("GPTBot", "OpenAI", "Model Training", "Collects public data for future foundational model training.", "https://platform.openai.com/docs/bots"),
            ("Claude-SearchBot", "Anthropic", "Real-Time Search", "Retrieves web content for Claude live search answers.", "https://support.anthropic.com/en/articles/8896518"),
            ("ClaudeBot", "Anthropic", "Model Training", "Crawls public text for Claude training datasets.", "https://support.anthropic.com/en/articles/8896518"),
            ("PerplexityBot", "Perplexity", "Real-Time Search", "Searches and extracts source citations for Perplexity answers.", "https://docs.perplexity.ai/"),
            ("Google-Extended", "Google", "Training Governance", "Token used in robots.txt to control Gemini/Vertex training data collection.", "https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers")
        ]

        rows = "".join(f'''<tr>
  <td><strong>{name}</strong></td>
  <td>{vendor}</td>
  <td><span class="chip-btn">{purpose}</span></td>
  <td>{desc}</td>
  <td><a href="{doc}" target="_blank" rel="noopener">Docs ↗</a></td>
</tr>''' for name, vendor, purpose, desc, doc in crawlers)

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{'AI Crawler Directory — User-Agents & Purpose | HTML&HTML' if lang == 'en' else 'AI Tarayıcı Dizini — User-Agent ve Bot Amaçları | HTML&HTML'}</title>
<meta name="description" content="{sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/reference/ai-crawlers/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/referans/ai-tarayicilar/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/reference/ai-crawlers/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "TechArticle",
      "headline": "{h1.replace('<em>', '').replace('</em>', '')}",
      "description": "{sub}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'AI Crawlers' if lang == 'en' else 'AI Tarayıcılar'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'methodology')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'AI Crawlers' if lang == 'en' else 'AI Tarayıcılar'}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'TARAYICI VERİTABANI' if lang == 'tr' else 'CRAWLER REGISTRY'}</b></div>
  <h1>{h1}</h1>
  <p>{sub}</p>
</section>

<section class="section">
  <div class="comparison-wrap">
    <table class="comparison-table">
      <thead>
        <tr>
          <th>User-Agent</th>
          <th>Vendor</th>
          <th>Purpose</th>
          <th>Description</th>
          <th>Reference</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)
        if lang == 'en':
            write_page("reference/ai-crawlers/index.html", html)

def build_company_legal():
    pages = [
        {
            "id": "about",
            "en_slug": "en/about",
            "tr_slug": "tr/hakkimizda",
            "root_slug": "about",
            "en": {
                "title": "About HTML&HTML — Automated Web & AI Diagnostic Software SaaS",
                "h1": "About HTML&HTML: <em>Automated Diagnostic Software & Code Generator SaaS</em>",
                "sub": "We develop deterministic web diagnostic software and automated code generation tools that bridge technical web standards and artificial intelligence retrieval.",
                "body": """<h2>100% Automated Software (SaaS)</h2><p>HTML&HTML is a 100% automated Software-as-a-Service (SaaS) and developer tooling platform. We build autonomous website scanning engines, deterministic diagnostic algorithms, and digital code artifact generators. We do not provide human marketing services, manual agency audits, or consulting. Every diagnostic signal, blueprint, and code patch is produced deterministically by software algorithms.</p><h2>The Core Principle: Epistemic Honesty</h2><p>If something cannot be measured from a public crawl, we do not guess. Core Web Vitals return NOT_MEASURED without real user field data. Emerging formats like llms.txt are treated as proposals, not web standards. We never sell ranking guarantees.</p>"""
            },
            "tr": {
                "title": "HTML&HTML Hakkında — Deterministik Web & AI Teşhis Yazılımı SaaS",
                "h1": "HTML&HTML Hakkında: <em>Otomatik Teşhis Yazılımı ve Kod Üretici SaaS</em>",
                "sub": "Teknik web standartları ile modern yapay zeka sistemleri arasındaki boşluğu dolduran deterministik web teşhis yazılımları ve otomatik kod araçları geliştiriyoruz.",
                "body": """<h2>%100 Otomatik Yazılım ve SaaS</h2><p>HTML&HTML, web geliştiricileri ve sistem mimarları için geliştirilmiş %100 otomatik bir Yazılım Hizmeti (SaaS) ve dijital kod üretim platformudur. Platformumuz; otonom web tarayıcı motorları, deterministik teşhis algoritmaları ve anında indirilebilir dijital kod paketleri üretir. Şirketimiz insan eliyle yürütülen danışmanlık, ajans veya pazarlama hizmetleri sunmaz; tüm çıktılar yazılım motorlarımız tarafından algoritmik olarak üretilir.</p><h2>Temel İlke: Epistemik Dürüstlük</h2><p>Herkese açık bir taramadan ölçülemeyen hiçbir sinyal uydurulmaz. Saha verisi olmadan Core Web Vitals puanı uydurulmaz, kesinlikle NOT_MEASURED dönülür. llms.txt gibi gelişmekte olan yapılar web standardı değil öneri olarak ele alınır. Asla sıralama garantisi satılmaz.</p>"""
            }
        },
        {
            "id": "contact",
            "en_slug": "en/contact",
            "tr_slug": "tr/iletisim",
            "root_slug": "contact",
            "en": {
                "title": "Contact HTML&HTML — Software Support & Licensing",
                "h1": "Contact HTML&HTML: <em>Software Support & Licensing</em>",
                "sub": "Questions regarding our 12-engine scanning software, OpenAPI integration, or digital software package delivery.",
                "body": """<h2>Engineering Inquiries</h2><p>For technical feedback on scan heuristics, false positives, or source registry updates, our engineering team monitors RFC and vendor standards daily.</p><h2>Software Licensing & Order Support</h2><p>For questions about the $99 Full Site Fix Mandate Software Pack, $499 Enterprise Bundle, digital download delivery, or invoices, reach out directly at contact@htmlandhtml.com.</p>"""
            },
            "tr": {
                "title": "İletişim — HTML&HTML Yazılım Desteği ve Lisanslama",
                "h1": "HTML&HTML İletişim: <em>Yazılım Desteği ve Lisanslama</em>",
                "sub": "12 analiz motorumuzun yazılım metodolojisi, OpenAPI entegrasyonu veya dijital yazılım paketi teslimatı hakkında sorularınız için bize ulaşın.",
                "body": """<h2>Mühendislik İletişimi</h2><p>Tarama motoru kuralları, yanlış pozitif bildirimleri veya kaynak kayıt defteri güncellemeleri için mühendislik ekibimizle iletişime geçebilirsiniz.</p><h2>Yazılım Lisanslama ve Destek</h2><p>$99 Full Site Fix Mandate Yazılım Paketi, $499 Enterprise Paketi, dijital indirme teslimatı veya faturalar hakkındaki tüm sorularınız için contact@htmlandhtml.com adresinden bize ulaşabilirsiniz.</p>"""
            }
        },
        {
            "id": "privacy",
            "en_slug": "en/privacy",
            "tr_slug": "tr/gizlilik",
            "root_slug": "privacy",
            "en": {
                "title": "Privacy Policy — HTML&HTML",
                "h1": "Privacy Policy: <em>Data Protection & Zero Secret Storage</em>",
                "sub": "We only scan public web surfaces. We do not store passwords, session tokens, or private network credentials.",
                "body": """<h2>Public Web Scanning</h2><p>HTML&HTML performs automated scans strictly on publicly reachable HTTP and HTTPS endpoints. We do not accept, require, or store private credentials or server access keys for free scans.</p><h2>Fail-Closed Security</h2><p>All private network addresses (localhost, 10.0.0.0/8, 192.168.0.0/16, 169.254.169.254) are rejected immediately at the DNS resolution layer to prevent SSRF vulnerabilities.</p>"""
            },
            "tr": {
                "title": "Gizlilik Politikası — HTML&HTML",
                "h1": "Gizlilik Politikası: <em>Veri Koruma ve Sıfır Gizli Bilgi</em>",
                "sub": "Yalnızca herkese açık web yüzeylerini tararız. Şifreler, oturum anahtarları veya özel ağ kimlik bilgileri kesinlikle saklanmaz.",
                "body": """<h2>Açık Web Taraması</h2><p>HTML&HTML yalnızca herkese açık HTTP ve HTTPS uç noktalarını tarar. Ücretsiz taramalar için sunucu şifresi veya özel erişim anahtarı talep edilmez ve saklanmaz.</p><h2>Fail-Closed Güvenlik</h2><p>Tüm yerel ve özel ağ adresleri (localhost, 10.0.0.0/8, 192.168.0.0/16, 169.254.169.254) SSRF açıklarını önlemek için DNS katmanında donanımsal olarak reddedilir.</p>"""
            }
        },
        {
            "id": "terms",
            "en_slug": "en/terms",
            "tr_slug": "tr/kullanim-kosullari",
            "root_slug": "terms",
            "en": {
                "title": "Software License Agreement & Terms of Service — HTML&HTML",
                "h1": "Terms of Service: <em>Software License & Automated SaaS Agreement</em>",
                "sub": "Terms governing access to the automated HTML&HTML diagnostic SaaS platform and digital code artifact licenses.",
                "body": """<h2>1. Software as a Service (SaaS) & Automated Digital Goods</h2><p>HTML&HTML is an automated Software-as-a-Service (SaaS) and developer tooling platform operated by HTML&HTML. The platform provides automated website diagnostic scans and compiles instant digital software packages (ZIP archives containing machine-generated configuration files, code patches, OpenAPI definitions, and automated acceptance test suites).</p><h2>2. Complete Exclusion of Human Advisory and Consulting Services</h2><p>HTML&HTML strictly provides automated software products and digital goods. We DO NOT provide human consulting, managed marketing services, agency retainers, advertising campaigns, or personalized advisory services. All diagnostic scores, technical blueprints, and remediation packages are generated deterministically by algorithmic software execution without human intervention.</p><h2>3. Digital License & Delivery</h2><p>Upon purchase of a software license tier (such as the $99 AI Search Visibility Roadmap or $499 Enterprise Dark Pool Software Bundle), software entitlements and instant digital download links (ZIP archives) are generated and delivered electronically. Because the product consists of instantly delivered digital software assets and machine-generated blueprints, delivery is fulfilled immediately upon cryptographic payment authorization.</p><h2>4. Algorithmic Integrity & Anti-Guarantee Policy</h2><p>HTML&HTML measures compliance against published RFC web specifications, vendor crawler documentation, and deterministic heuristics. We make no representations or guarantees regarding third-party search engine placement, commercial traffic volume, or generative AI citation rankings, as external machine learning algorithms update independently.</p><h2>5. Payment Processing via Paddle (Merchant of Record)</h2><p>All software purchases and digital goods transactions on HTML&HTML are processed securely by Paddle, our Merchant of Record. Paddle provides customer service inquiries and handles returns in accordance with our digital software delivery policy.</p>"""
            },
            "tr": {
                "title": "Yazılım Lisans Sözleşmesi ve Kullanım Koşulları — HTML&HTML",
                "h1": "Kullanım Koşulları: <em>Yazılım Lisansı ve Otomatik SaaS Sözleşmesi</em>",
                "sub": "HTML&HTML otomatik web ve AI teşhis yazılımı (SaaS) ve dijital kod lisanslarını düzenleyen yasal şartlar.",
                "body": """<h2>1. Yazılım Hizmeti (SaaS) ve Otomatik Dijital Ürünler</h2><p>HTML&HTML, web geliştiricileri ve sistem mimarları için geliştirilmiş %100 otomatik bir Yazılım Hizmeti (SaaS) ve dijital kod üretim platformudur. Platform, web siteleri için otomatik teknik taramalar gerçekleştirir ve makine tarafından derlenen hazır dijital yazılım paketleri (kod yamaları, konfigürasyon şablonları, OpenAPI tanımları ve regresyon test betikleri içeren ZIP arşivi) üretir.</p><h2>2. İnsan Danışmanlığı ve Ajans Hizmetlerinin Kesin Olarak Reddi</h2><p>HTML&HTML yalnızca bağımsız çalışan otomatik yazılım ürünleri ve dijital kod dosyaları sunar. Şirketimiz kesinlikle insan eliyle yürütülen danışmanlık, ajans hizmeti, reklam veya pazarlama hizmetleri SUNMAZ. Üretilen tüm teşhis raporları, mimari planlar ve kod paketleri insan müdahalesi olmaksızın, tamamen algoritmik yazılım motorları tarafından deterministik olarak oluşturulur.</p><h2>3. Dijital Lisans ve Anında Teslimat</h2><p>Ücretli bir yazılım lisansı ($99 AI Görünürlük Yol Haritası veya $499 Enterprise Dark Pool Kod Paketi) satın alındığında, yazılım yetkilendirmesi ve anlık dijital indirme bağlantısı (ZIP arşivi) elektronik olarak anında üretilir. Ürün, anında teslim edilen dijital kod varlıklarından ve yazılım dosyalarından oluşur.</p><h2>4. Algoritmik Sınırlar ve Garanti Muafiyeti</h2><p>HTML&HTML, web sitelerini RFC şartnameleri, resmi arama motoru/AI dokümanları ve deterministik kurallar çerçevesinde test eder. Dış yapay zeka modelleri ve arama motorları stokastik olarak çalıştığı için kesin sıralama, organik trafik, atıf veya gelir garantisi verilmez.</p><h2>5. Güvenli Ödeme ve Kayıtlı Satıcı (Paddle)</h2><p>HTML&HTML üzerindeki tüm yazılım lisansı ve dijital ürün satışları, Kayıtlı Satıcımız (Merchant of Record) olan Paddle tarafından güvenle işlenir.</p>"""
            }
        }
    ]

    for p in pages:
        for lang in ['en', 'tr']:
            c = p[lang]
            rel_path = f"{p['en_slug']}/index.html" if lang == 'en' else f"{p['tr_slug']}/index.html"
            alt_url = f"/{p['tr_slug']}/" if lang == 'en' else f"/{p['en_slug']}/"
            canonical_url = f"https://htmlandhtml.com/{p['en_slug'] if lang == 'en' else p['tr_slug']}/"
            bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
            bc_home_url = "/en/" if lang == 'en' else "/tr/"

            html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{c['title']}</title>
<meta name="description" content="{c['sub']}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/{p['en_slug']}/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/{p['tr_slug']}/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/{p['en_slug']}/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "WebPage",
      "name": "{c['title']}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{c['title'].split('—')[0].strip()}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'company')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{c['title'].split('—')[0].strip()}</span>
</nav>

<main>
<section class="authority-hero" style="max-width: var(--shell-max); margin: 0 auto; padding: 72px 28px 48px;">
  <div class="kicker"><span></span><b>{'KURUMSAL' if lang == 'tr' else 'COMPANY'}</b></div>
  <h1>{c['h1']}</h1>
  <p>{c['sub']}</p>
</section>

<section class="section" style="max-width: var(--shell-max); margin: 0 auto;">
  <div class="legal-body" style="max-width: 860px; font-size: 18px; line-height: 1.75;">
    {c['body']}
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
            write_page(rel_path, html)
            if lang == 'en':
                write_page(f"{p['root_slug']}/index.html", html)

build_evidence_standard()
build_crawler_reference()
build_company_legal()
print("Authority and Company/Legal pages generated successfully.")
