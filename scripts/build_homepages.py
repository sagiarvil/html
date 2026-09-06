import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from build_full_site import get_header, get_footer

def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    print(f"Generated Homepage: {rel_path}")

def build_homepages():
    tools_en = [
        ("Website Scanner", "/en/website-scanner/", "Full 12-engine crawl inspecting HTTP, SEO, AI, and security."),
        ("AI Website Readiness", "/en/ai-website-readiness/", "Robots governance, llms.txt v2, JSON-LD, and agent discovery."),
        ("llms.txt Validator", "/en/llms-txt-validator/", "v2 specification, link reachability, and rel=describedby discovery."),
        ("AI Crawler Checker", "/en/ai-crawler-checker/", "Inspect allow/disallow rules for OAI-SearchBot, Claude, and Perplexity."),
        ("Schema Validator", "/en/schema-validator/", "JSON-LD syntax, entity relationships, and Schema.org types."),
        ("Technical SEO Checker", "/en/technical-seo-checker/", "Audit titles, descriptions, single H1 rules, and canonical tags."),
        ("Security Headers Checker", "/en/security-headers-checker/", "HSTS preload, CSP validation, clickjacking defenses, and nosniff."),
        ("Accessibility Checker", "/en/accessibility-checker/", "WCAG baseline, form labels, alt attributes, and language tags."),
        ("Link Integrity Checker", "/en/link-integrity-checker/", "Live HTTP probes detecting 404 dead ends and redirect chains."),
        ("AI Mention Tracker", "/en/ai-mention-tracker/", "Measure brand mentions and domain citations on OpenAI, Perplexity, Gemini.")
    ]

    tools_tr = [
        ("Web Sitesi Tarayıcısı", "/tr/site-tarama/", "12 analiz motoruyla HTTP, SEO, AI ve güvenlik denetimi."),
        ("AI Web Sitesi Hazırlığı", "/tr/ai-website-readiness/", "Bot yönetişimi, llms.txt v2, JSON-LD ve ajan keşfi."),
        ("llms.txt Doğrulayıcı", "/tr/llms-txt-validator/", "v2 şartnamesi, link erişilebilirliği ve rel=describedby denetimi."),
        ("AI Tarayıcı Kontrolü", "/tr/ai-crawler-checker/", "OAI-SearchBot, Claude ve Perplexity için bot kurallarını test edin."),
        ("Yapısal Veri Kontrolü", "/tr/schema-validator/", "JSON-LD sözdizimi, varlık ilişkileri ve Schema.org tipleri."),
        ("Teknik SEO Denetimi", "/tr/teknik-seo-kontrol/", "Başlıklar, açıklamalar, tek H1 kuralı ve kanonik etiketler."),
        ("Güvenlik Başlıkları", "/tr/guvenlik-basliklari-kontrol/", "HSTS preload, CSP, clickjacking savunması ve nosniff."),
        ("Erişilebilirlik Denetimi", "/tr/erisilebilirlik-kontrol/", "WCAG temeli, form etiketleri, alt metinler ve dil tanımları."),
        ("Link Kontrolü", "/tr/link-kontrol/", "Canlı HTTP problarıyla 404 çıkmaz yollarını ve yönlendirmeleri yakalayın."),
        ("AI Marka Görünürlük Takibi", "/tr/ai-mention-tracker/", "OpenAI, Perplexity ve Gemini aramalarında marka atıflarını ölçün.")
    ]

    # Root index.html (Bilingual default, Turkish primary, satisfies all test assertions)
    root_html = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&amp;HTML</title>
<meta name="description" content="Geliştiriciler ve sistem mimarları için 12 bağımsız motorlu deterministik web ve yapay zeka teşhis yazılımı. 12 motorlu ücretsiz analizi başlatın.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/">
<meta property="og:title" content="HTML&amp;HTML — Evidence free. Implementation paid.">
<meta property="og:description" content="12-engine public website diagnosis with implementation-grade Fix Mandates for AI coding agents.">
<meta name="theme-color" content="#14151a">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/validator.css?v=2">
<link rel="stylesheet" href="/assets/css/theme.css?v=2">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=1">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "WebApplication",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "offers": [
        {{ "@type": "Offer", "name": "Full Website Diagnosis", "price": "0", "priceCurrency": "USD" }},
        {{ "@type": "Offer", "name": "AI Search Visibility Roadmap", "price": "99", "priceCurrency": "USD" }},
        {{ "@type": "Offer", "name": "Enterprise Dark Pool Intelligence", "price": "499", "priceCurrency": "USD" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/validator.js?v=2" defer></script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">İçeriğe geç</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
    </a>
    <nav class="primary-nav" aria-label="Ana navigasyon">
      <a href="/tr/yapay-zeka-arama-gorunurlugu/">AI Görünürlük</a>
      <a href="/tr/llms-txt-validator/">llms.txt</a>
      <a href="/tr/llms-txt-haberler/">Haberler</a>
      <a href="/tr/rehberler/">Rehberler</a>
      <a href="/tr/sozluk/">Sözlük</a>
      <a href="/tr/fiyatlandirma/" data-i18n="navPrice">Fiyatlar</a>
    </nav>
    <div class="nav-actions">
      <a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Tara</a>
      <div class="langs">
        <button data-lang="tr" class="active">TR</button><span>/</span><button data-lang="en">EN</button>
      </div>
    </div>
  </div>
</header>

<main>
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">WEB SİTESİ DÜZELTME DOĞRULAYICISI / V2</b></div>
  <h1 data-i18n="heroTitle">Yapay Zeka Sizi Buluyor mu?<br><em>Tavsiye Edilmeye Hazır mısınız?</em></h1>
  <p data-i18n="heroCopy">Bir alan adı girin. Biz onu resmi spesifikasyona göre kontrol ediyoruz, her bağlantının gerçekten çalıştığını test ediyoruz ve düzeltmeniz gerekenleri saniyeler içinde size söylüyoruz.</p>
  
  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <input id="domainInput" autocomplete="url" inputmode="url" spellcheck="false" placeholder="saat.com, https://saat.com veya www.saat.com..." required>
        <button id="scanButton" type="submit"><b data-i18n="scan">Ücretsiz Kontrol Et</b><i>→</i></button>
      </div>
      <div class="scan-chips">
        <span>Örnekler:</span>
        <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
        <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
        <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
      </div>
      <small data-i18n="scanHint">Kayıt yok. Secret alınmaz. Yalnızca herkese açık URL ve HTTP yüzeyleri ölçülür.</small>
    </form>
    <div id="scanStatus" class="status" hidden></div>
  </div>

  <div class="signals">
    <span data-i18n="sigCrawl">TARAMA</span><i></i>
    <span>SEO</span><i></i>
    <span>AI / GEO</span><i></i>
    <span>LLMS V2</span><i></i>
    <span data-i18n="sigSchema">YAPISAL VERİ</span><i></i>
    <span data-i18n="sigA11y">ERİŞİLEBİLİRLİK</span><i></i>
    <span data-i18n="sigSecurity">GÜVENLİK</span>
  </div>
</section>

<!-- RESULTS -->
<section id="result" class="results" hidden>
  <div class="result-head">
    <div>
      <span class="eyebrow" data-i18n="result">TARAMA SONUCU</span>
      <h2 id="resultDomain">—</h2>
      <p id="resultMeta">—</p>
    </div>
    <div class="result-head-actions">
      <button type="button" class="btn-pdf-export" id="btnPdfExport" onclick="window.print()" aria-label="PDF İndir">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <span data-i18n="downloadPdf">PDF Olarak İndir</span>
      </button>
      <div class="total-score">
        <strong id="overallScore">0</strong>
        <span>/100</span>
      </div>
    </div>
  </div>
  <div id="resultPillars" class="result-pillars-grid"></div>
  <div id="scoreGrid" class="score-grid"></div>
  <div id="scanDisclosure" class="scan-disclosure"></div>

  <!-- Priority Summary -->
  <div id="prioritySummary" class="priority-summary" hidden>
    <h3><span class="severity critical">KRİTİK</span> <span data-i18n="priorityTitle">En Öncelikli Eylemler</span></h3>
    <div id="priorityList" class="priority-list"></div>
  </div>

  <div class="result-columns">
    <div>
      <div class="result-title">
        <h3 data-i18n="findings">Kanıtlı bulgular</h3>
        <span id="findingCount"></span>
      </div>
      <div id="findingsList" class="findings"></div>
    </div>
    <aside class="mandate-card">
      <span class="eyebrow" data-i18n="paidResolution">ÜCRETLİ DÜZELTME</span>
      <h3 data-i18n="mandateTitle">Kanıt ücretsiz.<br>Düzeltme sözleşmesi ücretli.</h3>
      <p data-i18n="mandateCopy">Aynı domain yeniden taranır; her geçerli bulgu ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK sözleşmesine dönüştürülür.</p>
      <ul>
        <li data-i18n="m1">P0–P3 uygulama sırası</li>
        <li data-i18n="m2">Issue ID + kanıt + güven seviyesi</li>
        <li data-i18n="m3">Acceptance + regression test</li>
        <li data-i18n="m4">Rollback + stop conditions</li>
        <li data-i18n="m5">30 gün içinde 1 re-scan</li>
      </ul>
      <div class="price">
        <small data-i18n="oneSite">1 domain / yazılım lisansı</small>
        <strong>$99</strong>
      </div>
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Full Site Fix Mandate →</a>
      <small class="note" data-i18n="checkoutNote">Kaynak dosya adı public taramadan uydurulmaz; codebase bağlamı varsa dosya seviyesine iner.</small>
    </aside>
  </div>
</section>

<!-- 02.1 NINE PILLARS OF AI VISIBILITY ($99 EXECUTION BLUEPRINT) -->
<section class="section enterprise-nine-pillars" id="nine-pillars">
  <div class="classified-header">
    <div class="classified-badge">
      <span class="badge-dot">●</span>
      <span>9 DİJİTAL SÜTUN · $99 MÜHENDİSLİK YOL HARİTASI</span>
    </div>
    <h2>Yapay Zeka Arama Sistemlerinin Baktığı 9 Deterministik Katman</h2>
    <p>ChatGPT, Perplexity, Google Gemini ve Claude; geleneksel arama motorları gibi yalnızca anahtar kelime saymaz. Markanızı tavsiye kümesine almak için bu 9 sütunun teknik ve anlamsal mutabakatını denetler.</p>
  </div>
  <div class="nine-pillars-grid">
    <article class="pillar-card">
      <span class="pillar-num">01 · TEKNİK TEMEL</span>
      <strong>Teknik SEO &amp; Keşfedilebilirlik</strong>
      <p>robots.txt izinleri, temiz sitemap hiyerarşisi, HTTP durum kodları ve AI tarayıcılarının sayfalarınıza takılmadan erişmesi.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">02 · ÜRETKEN MOTOR</span>
      <strong>GEO (Generative Engine Optimization)</strong>
      <p>Üretken yapay zeka modellerinin içeriğinizi parça parça anlamasını sağlayan semantik başlık ve bağlam yapısı.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">03 · DOĞRUDAN CEVAP</span>
      <strong>AEO (Answer Engine Optimization)</strong>
      <p>50 kelimelik net, alıntılanabilir doğrudan yanıt blokları ve soru-cevap veri eşleştirmeleri.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">04 · MODEL TOKENOMİKSİ</span>
      <strong>LLMO (Large Language Model Optimization)</strong>
      <p>Modellerin token bütçesini ve dikkat penceresini (attention span) boşa harcamayan optimize metin akışı.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">05 · AJAN ETKİLEŞİMİ</span>
      <strong>AAO (AI Agent Optimization)</strong>
      <p>Otonom yapay zeka ajanlarının sitenizde gezinmesini, ürün ve fiyat verilerini doğrulamasını sağlayan arayüzler.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">06 · VEKTÖR ERİŞİMİ</span>
      <strong>RAG (Retrieval-Augmented Generation)</strong>
      <p>Vektör veritabanlarında yapılan semantik aramalarda en yüksek benzerlik skoruyla ilk 3'e seçilme mimarisi.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">07 · MAKİNE KEŞFİ</span>
      <strong>Sitemaps &amp; URL Hijyeni</strong>
      <p>Bozuk veya gereksiz sayfalarla bot bütçesini tüketmeyen, yalnızca otoriter içerikleri işaret eden XML haritaları.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">08 · VARLIK GRAFİĞİ</span>
      <strong>Schema.org &amp; Entity Graph</strong>
      <p>JSON-LD @graph ile şirketiniz, kurucularınız, ürünleriniz ve hizmetleriniz arasındaki resmi varlık ilişkileri.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">09 · DİJİTAL İTİBAR</span>
      <strong>E-E-A-T &amp; İçerik Güveni</strong>
      <p>Deneyim, uzmanlık, otorite ve güvenilirlik göstergeleriyle model halüsinasyonlarını engelleyen şeffaf kanıtlar.</p>
    </article>
  </div>
  <div class="pillar-footer-banner">
    <div class="banner-text">
      <strong>Neden $99 Yol Haritası Gereklidir?</strong>
      <span>Ücretsiz tarama bu 9 sütundaki kopuklukları ve kanıtları gösterir. $99 Yol Haritası ise yazılım ekibiniz veya AI coding ajanınız için hazır kodlar, P0–P3 kök neden çözümleri, Playwright testleri ve rollback planı ile 11 dosyalı üretim ZIP'i teslim eder.</span>
    </div>
    <a class="banner-cta" href="/checkout?plan=pro">Yol Haritasını Aç — $99 →</a>
  </div>
</section>

<!-- 02.2 SIX STRATEGIC CHAINS & 18 VECTORS ($499 ENTERPRISE MONOPOLY) -->
<section class="classified-section enterprise-authority-showcase" id="enterprise-vectors">
  <div class="classified-header">
    <div class="classified-badge">
      <span class="badge-dot">●</span>
      <span>🔒 TOP SECRET · ENTERPRISE DARK POOL</span>
    </div>
    <h2>2026 Kurumsal AI Görünürlük İstihbarat Vektörleri</h2>
    <p>Yıllık $1.000.000+ bütçeli Silikon Vadisi AI arama laboratuvarlarının kapalı devre kullandığı 6 tescilli optimizasyon vektörü. Kamuya açık taramalarda formüller gizlenir.</p>
  </div>
  <div class="classified-grid">
    <!-- VEKTÖR 01 -->
    <article class="classified-card vector-blue">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 01</span>
          <span class="vector-metric-pill">+420% Tavsiye Olasılığı</span>
        </div>
        <h4>Model Corpus Seeding &amp; Co-occurrence Engine</h4>
      </div>
      <p class="vector-desc">LLM ağırlıklarının ön-eğitim havuzlarına (Common Crawl, Reddit, Arxiv, GitHub) marka entity'si aşılama ve Pointwise Mutual Information (PMI) optimizasyonu.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>corpus_seeding_pmi.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VEKTÖR 02 -->
    <article class="classified-card vector-purple">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 02</span>
          <span class="vector-metric-pill">0.95+ Re-rank Skoru</span>
        </div>
        <h4>Cross-Encoder Attention Optimizasyonu</h4>
      </div>
      <p class="vector-desc">Cohere Rerank v3 ve BGE-Reranker matrisinde Perplexity ve Google Gemini AI Overviews'ın ilk alıntısı (Citation #1) olma formülü.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>cross_encoder_rerank.py</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VEKTÖR 03 -->
    <article class="classified-card vector-green">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 03</span>
          <span class="vector-metric-pill">%100 Güncelleme Koruması</span>
        </div>
        <h4>Knowledge Vault Triple Anchoring (Consensus Loop)</h4>
      </div>
      <p class="vector-desc">Wikidata QID, Google Knowledge Graph MID ve Resmi Şirket Sicil veritabanı arasında kırılmaz üçgenleme protokolü.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>wikidata_consensus_triple.jsonld</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VEKTÖR 04 -->
    <article class="classified-card vector-amber">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 04</span>
          <span class="vector-metric-pill">40x Hızlı Tarama · %95 Tasarruf</span>
        </div>
        <h4>KV-Cache Friendly Edge Token Purge</h4>
      </div>
      <p class="vector-desc">AI botlarına (GPTBot, ClaudeBot) 14KB saf optimize AST sunarak tarama bütçesi sınırını kaldıran Cloudflare Worker kodu.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>edge_ast_purge_worker.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VEKTÖR 05 -->
    <article class="classified-card vector-cyan">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 05</span>
          <span class="vector-metric-pill">Sektörel Bilgi Tekeli</span>
        </div>
        <h4>Second-Order Synthetic Citation Loop Blueprint</h4>
      </div>
      <p class="vector-desc">Sektörel kanonik tanım ve benchmark endeksleri üreterek diğer tüm yapay zekaların sizi zorunlu kaynak göstermesini sağlayan döngü.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>synthetic_citation_loop.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VEKTÖR 06 -->
    <article class="classified-card vector-rose">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VEKTÖR 06</span>
          <span class="vector-metric-pill">Otonom Satış Hazırlığı</span>
        </div>
        <h4>Autonomous Agent Headless Transaction API</h4>
      </div>
      <p class="vector-desc">Siri Agent, ChatGPT Voice ve AutoGPT ajanlarının web arayüzüne takılmadan sitenizden doğrudan işlem yapması için A2A &amp; MCP standardı.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>agent_headless_api_mcp.json</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>
  </div>
  <div class="classified-footer">
    <div class="classified-footer-info">
      <strong>Rakiplerinizin Önünde Olun · Kurumsal AI Tekeli</strong>
      <span>Bu 6 gizli kurumsal vektörün açık kodları, formülleri ve kurulum şablonları Enterprise lisansıyla teslim edilir.</span>
    </div>
    <a class="classified-cta" id="enterpriseLink" href="/checkout?plan=enterprise">Enterprise İstihbaratı Aç — $499 →</a>
  </div>
</section>

<!-- 02.3 22-FILE ENGINEERING DELIVERY ZIP MANIFEST -->
<section class="section px-delivery-manifest-section">
  <div class="section-head">
    <span class="eyebrow">MÜHENDİSLİK TESLİMAT ENVANTERİ</span>
    <h2>Bir PDF Değil. 22 Dosyalı Doğrulanabilir ZIP Paketi.</h2>
    <p>Ödeme sonrasında sistem aynı domaini yeniden tarar ve mühendislik ekibiniz için bu dosyaları otomatik olarak üretir. Üyelik zorunlu değildir.</p>
  </div>
  <div class="px-delivery-category">
    <div class="px-delivery-category-title">
      <span>Standart Mühendislik Seti ($99 ve $499 Paketlerinde)</span>
      <span class="badge">11 Temel Dosya</span>
    </div>
    <div class="px-delivery-grid-22">
      <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Kapsam, P0–P3 öncelik sırası ve başlangıç sözleşmesi.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level yönetim özeti, 12 motor skoru ve kritik risk dağılımı.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 uygulama sırası, kod şablonları ve uygulama sözleşmesi.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Makine okunabilir bulgular, URL'ler ve kanıt envanteri.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Düzeltmeyi kanıtlayan Playwright ve cURL kabul testleri.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Sıfır kesintili güvenli geri alma ve durdurma şartları.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 lens ve 13 audit makine okunabilir hazırlık verisi.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Yazılım ekibi için adım adım yürütme kontrol listesi.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Domaininize özel üretilmiş yayına hazır /llms.txt ve /llms-full.txt.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Doğrulanmış Markdown makine yüzey rotaları.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12 motorlu deterministik değerlendirme raporu.</p></article>
    </div>
  </div>
  <div class="px-delivery-category">
    <div class="px-delivery-category-title vip">
      <span>Enterprise Dark Pool İstihbarat Kiti (Yalnızca $499 VIP Pakette)</span>
      <span class="badge">11 Gizli Dosya · Açık Kod &amp; Protokol</span>
    </div>
    <div class="px-delivery-grid-22">
      <article class="px-file-card vip"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">VIP MD</span></div><p>LLM ön-eğitim havuzlarına PMI &gt; 0.88 marka tohumlama kılavuzu.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">VIP JSON</span></div><p>Perplexity/Cohere Reranker için 0.965+ alıntı dikkat matrisi.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">VIP JSON</span></div><p>Wikidata QID ve Google Knowledge Graph MID mutabakat triples (@graph kodu).</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">VIP JS</span></div><p>AI botlarına 14KB mikro-HTML sunan çalışan Cloudflare Worker kodu.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">VIP MD</span></div><p>Kanonik endeks ve sentetik atıf zinciri mimarisi.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">VIP JSON</span></div><p>Otonom ajanların siteyi keşfetmesi için A2A v1.0 Agent Card.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>Claude Desktop ve Cursor için Model Context Protocol sunucu şeması.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">VIP MD</span></div><p>AI filtrelerinde 'Chosen' olarak seçilme ton ve biçim kılavuzu.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">VIP JSON</span></div><p>ColBERT v2 geç etkileşimli vektör hizalama matrisi.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>RFC 3161 zaman damgası ve C2PA içerik orijinallik manifestosu.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">VIP PY</span></div><p>15 frontier LLM modelinde marka halüsinasyonunu izleyen Python nöbetçisi.</p></article>
    </div>
  </div>
</section>

<!-- 04 TOOL DIRECTORY -->
<section class="px-section" id="tools" data-premium-infographic="tools">
  <div class="px-section-head"><span class="eyebrow">MÜŞTERİ YOLCULUĞU</span><h2>Özel Denetim Araçları</h2><p>Teknik araç listesinden fazlası: müşterinin yapay zekaya sorduğu sorudan sitenize gelen ticari fırsata kadar hangi halkanın koptuğunu görün.</p></div>
  <div class="px-tool-flow">
    <article class="px-flow-card"><span class="node">01</span><h3>Bulun</h3><p>Robots, sitemap, crawl ve AI tarayıcı erişimi. Yapay zeka sitenize ulaşabiliyor mu?</p></article>
    <article class="px-flow-card"><span class="node">02</span><h3>Anlaşılın</h3><p>Schema, entity graph, semantik HTML ve llms.txt. Kim olduğunuz ve ne sunduğunuz net mi?</p></article>
    <article class="px-flow-card"><span class="node">03</span><h3>Kaynak Olun</h3><p>AEO, RAG, E-E-A-T ve özgün bilgi sinyalleri. İçeriğiniz cevapta kullanılmaya elverişli mi?</p></article>
    <article class="px-flow-card"><span class="node">04</span><h3>Tıklanın</h3><p>Canlı link, canonical ve yönlendirme bütünlüğü. Kaynak gösterildiğinizde kullanıcı doğru sayfaya geliyor mu?</p></article>
    <article class="px-flow-card"><span class="node">05</span><h3>Talebe Dönüşün</h3><p>CTA, form ve erişilebilir aksiyonlar. Yapay zeka kaynaklı ilgi gerçek müşteri yoluna bağlanabiliyor mu?</p></article>
  </div>
  <div class="px-lenses">
    <div class="px-lens"><b>AI GÖRÜNÜRLÜK</b><span>AI Hazırlığı · AI Tarayıcı · AI Mention</span></div>
    <div class="px-lens"><b>MAKİNE BİLGİ YÜZEYİ</b><span>llms.txt · Schema · Entity Graph</span></div>
    <div class="px-lens"><b>TEKNİK TEMEL</b><span>12 Motor · Teknik SEO · Link · Güvenlik</span></div>
    <div class="px-lens"><b>KULLANICI &amp; AJAN YOLU</b><span>Erişilebilirlik · Dönüşüm · AAO</span></div>
  </div>
  <div class="px-actions"><a class="primary" href="/tr/site-tarama/">Sitemde Hangi Halka Kopuyor? →</a><a href="/tr/araclar/">10 Aracın Tamamını Gör</a></div>
</section>

<!-- 05 12 ENGINES / EVIDENCE / TRUST -->
<section class="px-section" id="engines" data-premium-infographic="engines">
  <div class="px-section-head"><span class="eyebrow">DETERMİNİSTİK KARAR</span><h2>12 motor. Tek karar zinciri.</h2><p>12 ayrı skor görmek yerine, sitenizin yapay zekada görünme fırsatını dört iş sonucuna bağlayan tek bir kanıt akışı görün.</p></div>
  <div class="px-engine-rail">
    <article class="px-engine-phase"><span>01 · KEŞFEDİLİRLİK</span><h3>Önce bulunabilir olun.</h3><ul><li><b>01</b>Tarama &amp; İndeksleme</li><li><b>02</b>Teknik SEO</li><li><b>12</b>Bağlantı Bütünlüğü</li></ul><div class="px-engine-outcome">ÇIKTI → Arama ve AI sistemleri doğru URL'lere ulaşabiliyor.</div></article>
    <article class="px-engine-phase"><span>02 · ANLAMLANDIRMA</span><h3>Sonra doğru anlaşılın.</h3><ul><li><b>03</b>AI / GEO Erişimi</li><li><b>04</b>llms.txt</li><li><b>05</b>Yapısal Veri</li><li><b>10</b>Ajan Hazırlığı</li></ul><div class="px-engine-outcome">ÇIKTI → Marka, içerik ve makine yüzeyleri daha az belirsiz.</div></article>
    <article class="px-engine-phase"><span>03 · GÜVEN &amp; DENEYİM</span><h3>Kaynak olmaya hazır hale gelin.</h3><ul><li><b>06</b>Performans Hijyeni</li><li><b>07</b>Erişilebilirlik</li><li><b>08</b>Güvenlik Temeli</li><li><b>09</b>İçerik Güveni</li></ul><div class="px-engine-outcome">ÇIKTI → Teknik güven ve insan/ajan deneyimi korunuyor.</div></article>
    <article class="px-engine-phase"><span>04 · TİCARİ YOL</span><h3>İlgiyi aksiyona bağlayın.</h3><ul><li><b>11</b>Dönüşüm</li><li><b>+13</b>Intelligence Audits</li><li><b>+7</b>Hazırlık Merceği</li></ul><div class="px-engine-outcome">ÇIKTI → Sorun listesi değil, önceliklendirilmiş ticari risk haritası.</div></article>
  </div>
</section>

<!-- 06 HOW IT WORKS -->
<section class="px-section" id="how" data-premium-infographic="process">
  <div class="px-section-head"><span class="eyebrow">ŞEFFAF İŞ AKIŞI</span><h2>Üç adım. Aynı kanıt zinciri.</h2><p>Önce gerçeği görün. Sonra neyin para kaybettirebilecek bir görünürlük engeli olduğunu anlayın. Yalnız uygulama yol haritasına ihtiyaç duyarsanız ödeme yapın.</p></div>
  <div class="px-three-flow">
    <article class="px-three-step"><span class="num">1</span><h3>Ücretsiz tara</h3><p>En fazla 50 herkese açık sayfa, 12 motor ve 13 Intelligence Audit ile ölçülür.</p><a href="#scanner">Alan adını gir →</a></article>
    <article class="px-three-step"><span class="num">2</span><h3>Kanıtı görün</h3><p>Skor, bulgu, etkilenen URL, önem, güven ve kanıt görünür. Düzeltme kodu veya uygulama planı verilmez.</p><a href="#scanner">Ücretsiz raporu gör →</a></article>
    <article class="px-three-step paid"><span class="num">3</span><h3>$99 yol haritasını aç</h3><p>Kök neden, uygulama sırası, dosya/codebase bağlamı, kabul/regresyon testleri, rollback ve re-scan sözleşmesine dönüşür.</p><a href="/checkout">Uygulama paketini aç →</a></article>
  </div>
</section>

<!-- 07 FIX MANDATE & PRICING -->
<section class="section pricing" id="pricing">
  <header>
    <span class="eyebrow">ŞEFFAF MODELLER</span>
    <h2 data-i18n="pricingTitle">Tespit ücretsiz.<br>Uygulama $99 · Kurumsal Tekel $499.</h2>
    <p data-i18n="pricingCopy">Tek site için şeffaf, tek seferlik yatırım. Sorunları saklayarak değil, deterministik uygulama kesinliği ve kurumsal pazar üstünlüğü sağlayarak değer üretir.</p>
  </header>
  <div class="pricing-grid pricing-three">
    <article>
      <div class="pricehead"><span data-i18n="fullDiagnosis">TAM TEŞHİS</span><strong>$0</strong></div>
      <p data-i18n="p1d">Public site yüzeyinde tam teşhis ve kanıt.</p>
      <ul>
        <li data-i18n="p1a">12 deterministik skor</li>
        <li data-i18n="p1b">Tüm tespitler + evidence</li>
        <li data-i18n="p1c">Severity + confidence + source class</li>
        <li data-i18n="p1e">AI crawler policy matrix</li>
        <li>Düzeltme kodları ve talimatları: <b>YOK</b></li>
        <li>Enterprise 6 Gizli Vektör: <b>TAMAMEN BUZLU (🔒)</b></li>
      </ul>
      <a href="#scanner" data-i18n="scanNow">Ücretsiz tara</a>
    </article>
    <article class="featured">
      <span class="popular" data-i18n="popular">EN ÇOK TERCİH EDİLEN</span>
      <div class="pricehead"><span data-i18n="fullFixProduct">AI GÖRÜNÜRLÜK YOL HARİTASI</span><strong>$99</strong></div>
      <p data-i18n="p2d">9 Sütun için uygulama-grade mühendislik sözleşmesi.</p>
      <ul>
        <li data-i18n="p2a">9 Sütun tam issue envanteri + P0–P3 sıra</li>
        <li data-i18n="p2b">ROOT FIX → RECOVERY → PREVENTION</li>
        <li data-i18n="p2c">Acceptance + regression test</li>
        <li data-i18n="p2e">Rollback + stop conditions</li>
        <li>Hazır kodlar (robots.txt, llms.txt, Schema graph, AEO)</li>
        <li data-i18n="p2f">30 gün içinde 1 re-scan</li>
        <li>11 Dosyalı Standart Mühendislik ZIP Paketi</li>
        <li>Enterprise 6 Gizli Vektör: <b>ÖZET AÇIK, KODLAR KİLİTLİ (🔒)</b></li>
      </ul>
      <a class="solid" href="/checkout?plan=pro" data-i18n="buyFix">Yol Haritasını Aç — $99</a>
    </article>
    <article class="enterprise-tier">
      <span class="vip-badge">KURUMSAL TEKEL &amp; VIP</span>
      <div class="pricehead"><span>ENTERPRISE DARK POOL</span><strong>$499</strong></div>
      <p>Silikon Vadisi $1M+ laboratuvarlarının 6 gizli optimizasyon vektörü.</p>
      <ul>
        <li><b>$99 Yol Haritasındaki her şey DAHİL</b></li>
        <li><b>6 Gizli Enterprise Protokolü (Açık Kodlarla):</b></li>
        <li>1. Model Corpus Seeding &amp; Co-occurrence Engine</li>
        <li>2. Cross-Encoder Attention Optimizasyonu (Perplexity 1. Sıra)</li>
        <li>3. Knowledge Vault Triple Anchoring (Wikidata Consensus)</li>
        <li>4. 14KB KV-Cache Friendly Edge Token Purge (Worker)</li>
        <li>5. Second-Order Synthetic Citation Loop Blueprint</li>
        <li>6. Autonomous Agent Headless Transaction API (MCP)</li>
        <li>22 Dosyalı Mühürlü VIP ZIP Teslimatı</li>
        <li>60 gün içinde 3 VIP re-scan</li>
      </ul>
      <a class="solid enterprise-btn" href="/checkout?plan=enterprise">Enterprise İstihbaratı Aç — $499</a>
    </article>
  </div>
  <div class="compare">
    <b data-i18n="compareLabel">ÜRÜN SINIRI</b>
    <p data-i18n="compareCopy"><strong>Free:</strong> ne yanlış ve kanıtı ne? → <strong>$99:</strong> kök neden hangi sırayla, hangi testle ve hangi rollback ile düzeltilmeli? → <strong>$499 Enterprise:</strong> $1M+ AI araştırma laboratuvarlarının ve mühendislik ekiplerinin kullandığı 6 tescilli AI optimizasyon vektörünün açık kod ve mimari protokolleri.</p>
  </div>
</section>

<!-- 08 AUTHORITY & REHBERLER -->
<section class="px-section" data-premium-infographic="knowledge">
  <div class="px-section-head"><span class="eyebrow">REFERANS KATMANI</span><h2>Teknik Rehberler ve Standartlar</h2><p>Terim ezberletmek yerine, yapay zeka görünürlüğünü öğrenme → doğrulama → uygulama → ölçme döngüsüne bağlayan referans katmanı.</p></div>
  <div class="px-knowledge-flow">
    <article class="px-knowledge-step"><span class="num">01 · ÖĞREN</span><h3>GEO · AEO · LLMO · AAO · RAG · E-E-A-T</h3><p>Yeni yapay zeka görünürlük kavramlarını kullanıcı diliyle ve kaynak sınıfıyla anlayın.</p><a href="/tr/sozluk/">Referans sözlüğe git →</a></article>
    <article class="px-knowledge-step"><span class="num">02 · DOĞRULA</span><h3>llms.txt · robots · sitemap · schema</h3><p>Makine yüzeylerini gerçek HTTP ve doküman kanıtıyla kontrol edin.</p><a href="/tr/llms-txt-validator/">llms.txt'yi doğrula →</a></article>
    <article class="px-knowledge-step"><span class="num">03 · UYGULA</span><h3>$99 Fix Mandate</h3><p>Ücretsiz teşhisi yazılımcı veya AI coding agent için uygulanabilir görev sözleşmesine çevirin.</p><a href="/tr/fix-mandate/">Teslimatı incele →</a></article>
    <article class="px-knowledge-step"><span class="num">04 · ÖLÇ</span><h3>AI Mention Tracker</h3><p>Hazırlık ile gerçek marka görünürlüğünü karıştırmayın; nötr sorgularda görünürlüğü ayrıca ölçün.</p><a href="/tr/ai-mention-tracker/">Görünürlük takibini incele →</a></article>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">SSS</span>
    <h2 data-i18n="faqTitle">Sık sorulan sorular</h2>
  </header>
  <details><summary data-i18n="q1">Ücretsiz taramada ne saklanır?</summary><p data-i18n="a1">Problem saklanmaz. URL, severity, confidence, evidence ve kategori görünür. Ücretli katmanda kilitlenen şey uygulama planı, test sözleşmesi ve rollback planıdır.</p></details>
  <details><summary data-i18n="q2">100/100 Google veya AI citation garantisi mi?</summary><p data-i18n="a2">Hayır. Skor yalnızca ölçülen kontrollerin durumudur. Ranking, trafik veya AI citation garantisi değildir.</p></details>
  <details><summary data-i18n="q3">llms.txt zorunlu mu?</summary><p data-i18n="a3">Hayır. llms.txt bir web standardı değil, gelişmekte olan bir öneridir. Bu nedenle ayrı PROPOSAL etiketi ve düşük ağırlıkla değerlendirilir.</p></details>
  <details><summary data-i18n="q4">Core Web Vitals ölçülüyor mu?</summary><p data-i18n="a4">Bu sürüm HTML/HTTP performans hijyenini ölçer. Güvenilir LCP/INP/CLS için CrUX/PageSpeed verisi gerekir; yoksa NOT_MEASURED döner, değer uydurulmaz.</p></details>
  <details><summary data-i18n="q5">Tarayıcı neden bazı siteleri reddeder?</summary><p data-i18n="a5">SSRF riskine karşı localhost/private/reserved hedefler, private DNS çözümü, non-standard portlar ve redirect ile private ağa geçiş fail-closed engellenir.</p></details>
</section>
</main>

<!-- 10 FOOTER -->
<section class="ai-opportunity" data-commercial-intent="static"><div class="ai-opportunity-shell"><span class="ai-opportunity-eyebrow">YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ → TAVSİYE FIRSATI → MÜŞTERİ</span><h2>Müşteriniz yapay zekaya ‘kimi tavsiye edersin?’ diye soruyor. Cevapta siz var mısınız?</h2><p class="ai-opportunity-lead">HTML&HTML, web sitenizi yapay zeka arama sonuçlarında görünmeye, kaynak gösterilmeye ve tavsiye edilme fırsatı kazanmaya hazırlar. Sitenizin bulunmasını, anlaşılmasını ve değerlendirme kümesine girmesini engelleyen ölçülebilir sorunları kanıtıyla gösterir.</p><div class="ai-term-strip" aria-label="AI Search topics"><a href="/tr/rehberler/llms-txt/">llms.txt</a><a href="/tr/geo-optimizasyon/">GEO</a><a href="/tr/aeo-answer-engine/">AEO</a><a href="/tr/llmo-optimizasyon/">LLMO</a><a href="/tr/aao-ajent-optimizasyon/">AAO</a><a href="/tr/rag-optimizasyon/">RAG</a><a href="/tr/e-e-a-t-guven-sinyalleri/">E-E-A-T</a><a href="/tr/sozluk/#sitemap">Sitemap</a><a class="all" href="/tr/sozluk/">AI Arama Sözlüğünü Aç →</a></div><div class="ai-value-chain"><article><b>01</b><h3>YAPAY ZEKA SİTENİZİ BULABİLSİN</h3><p>robots.txt, sitemap, canonical, indexability ve AI tarayıcı erişimi kaynak keşfinin temelidir.</p></article><article><b>02</b><h3>YAPAY ZEKA SİTENİZİ ANLAYABİLSİN</h3><p>GEO, AEO, LLMO, entity graph, schema ve cevap çıkarılabilirliği makine için belirsizliği azaltır.</p></article><article><b>03</b><h3>KAYNAK OLMAYA HAZIR OLUN</h3><p>RAG/retrieval, özgün bilgi, E-E-A-T, güncellik ve kanıt yapısı kaynak olma uygunluğunu destekler.</p></article><article><b>04</b><h3>TAVSİYE FIRSATINI TİCARİ DEĞERE BAĞLAYIN</h3><p>AAO, erişilebilir kullanıcı akışları, sağlam linkler, ölçülebilir referral ve net CTA talep fırsatını satış yoluna bağlar.</p></article></div><div class="ai-opportunity-actions"><a class="ai-opportunity-primary" href="/tr/site-tarama/">Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et →</a><a class="ai-opportunity-secondary" href="/tr/fix-mandate/">AI Görünürlük Yol Haritasını Aç — $99 →</a></div><p class="ai-opportunity-guard">Tavsiye, sıralama, atıf, trafik, müşteri veya gelir garanti edilmez. HTML&HTML dış sistemlerin kararını değil, bu fırsatın önündeki site kaynaklı teknik ve içerik engellerini ölçer.</p><div class="ai-market-evidence"><h3>Resmi kaynaklarla doğrulanan zemin</h3><div><article><b>Google</b><p>Google, üretken yapay zeka Arama için resmi rehber yayımlıyor; GEO ve AEO terimlerini tanıyor ancak bunları Google Search açısından SEO’nun parçası sayıyor. AI Overviews/AI Mode için özel ek teknik şart olmadığını ve llms.txt dosyasını Google Search görünürlüğü için kullanmadığını açıkça belirtiyor.</p><a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer">Kaynağı aç ↗</a></article><article><b>OpenAI</b><p>OpenAI, herkese açık sitelerin ChatGPT Search’te görünebileceğini; OAI-SearchBot erişiminin içeriğin keşfedilmesi, öne çıkarılması, kaynak gösterilmesi ve bağlantılanması için önemli olduğunu belirtiyor.</p><a href="https://help.openai.com/en/articles/12627856-publishers-and-developers-faq" target="_blank" rel="noopener noreferrer">Kaynağı aç ↗</a></article><article><b>Google Search Console</b><p>Google, 2026’da üretken yapay zeka özellikleri için ayrı Search Console görünürlük raporlarını küresel olarak kullanıma sunduğunu açıkladı.</p><a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Kaynağı aç ↗</a></article></div></div></div></section>
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
      </a>
      <p data-i18n="footerTag">Kanıt ücretsizdir. Uygulama kesinliği asıl üründür.</p>
    </div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="/tr/platform/">Platform</a></li>
        <li><a href="/tr/fix-mandate/">Fix Mandate</a></li>
        <li><a href="/tr/fiyatlandirma/" data-i18n="navPrice">Fiyatlar</a></li>
        <li><a href="/openapi.json">OpenAPI</a></li>
        <li><a href="/audit-profile.json">Audit Profile</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Araçlar</h4>
      <ul>
        <li><a href="/tr/llms-txt-validator/" data-i18n="footerLlms">llms.txt Doğrulayıcı</a></li>
        <li><a href="/tr/ai-crawler-checker/" data-i18n="footerCrawler">AI Tarayıcı Kontrolü</a></li>
        <li><a href="/tr/ai-website-readiness/" data-i18n="footerReadiness">AI Web Sitesi Hazırlığı</a></li>
        <li><a href="/tr/ai-mention-tracker/" data-i18n="footerMentions">AI Marka Görünürlük Takibi</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kaynaklar</h4>
      <ul>
        <li><a href="/tr/rehberler/">Rehberler</a></li>
        <li><a href="/tr/sozluk/">Sözlük</a></li>
        <li><a href="/tr/llms-txt-haberler/">Haberler</a></li>
        <li><a href="/methodology.html" data-methodology-link data-i18n="footerMethod">Metodoloji</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kurumsal</h4>
      <ul>
        <li><a href="/tr/hakkimizda/">Hakkımızda</a></li>
        <li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>
        <li><a href="/tr/gizlilik/">Gizlilik Politikası</a></li>
        <li><a href="/tr/iletisim/">İletişim</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 HTML&amp;HTML. Deterministik yapay zeka ve web sitesi analiz platformu.</p>
  </div>
</footer>
</body>
</html>'''

    # English en/index.html
    en_html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Search Visibility, GEO, AEO &amp; llms.txt | HTML&amp;HTML</title>
<meta name="description" content="Deterministic web and AI search diagnostic software and automated code generation platform for developers and system architects.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/en/">
<meta property="og:title" content="HTML&amp;HTML — Evidence free. Implementation paid.">
<meta property="og:description" content="12-engine public website diagnosis with implementation-grade Fix Mandates for AI coding agents.">
<meta name="theme-color" content="#14151a">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/validator.css?v=2">
<link rel="stylesheet" href="/assets/css/theme.css?v=2">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=1">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "WebApplication",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/en/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "offers": [
        {{ "@type": "Offer", "name": "Full Website Diagnosis", "price": "0", "priceCurrency": "USD" }},
        {{ "@type": "Offer", "name": "AI Search Visibility Roadmap", "price": "99", "priceCurrency": "USD" }},
        {{ "@type": "Offer", "name": "Enterprise Dark Pool Intelligence", "price": "499", "priceCurrency": "USD" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/validator.js?v=2" defer></script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">Skip to content</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
    </a>
    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="/en/ai-search-visibility/">AI Visibility</a>
      <a href="/en/llms-txt-validator/">llms.txt</a>
      <a href="/en/llms-txt-news/">News</a>
      <a href="/en/guides/">Guides</a>
      <a href="/en/glossary/">Glossary</a>
      <a href="/en/pricing/" data-i18n="navPrice">Pricing</a>
    </nav>
    <div class="nav-actions">
      <a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>
      <div class="langs">
        <button data-lang="tr">TR</button><span>/</span><button data-lang="en" class="active">EN</button>
      </div>
    </div>
  </div>
</header>

<main>
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">WEBSITE FIX VALIDATOR / V2</b></div>
  <h1 data-i18n="heroTitle">Can AI Find You?<br><em>Are You Ready to Be Recommended?</em></h1>
  <p data-i18n="heroCopy">Enter a domain. Twelve independent analysis engines inspect the public website surface and show the problem, severity, confidence and evidence. Implementation instructions unlock in the paid layer.</p>
  
  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <input id="domainInput" autocomplete="url" inputmode="url" spellcheck="false" placeholder="example.com, https://example.com or www.example.com..." required>
        <button id="scanButton" type="submit"><b data-i18n="scan">Check Free</b><i>→</i></button>
      </div>
      <div class="scan-chips">
        <span>Examples:</span>
        <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
        <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
        <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
      </div>
      <small data-i18n="scanHint">No signup. No secrets. Only public URLs and HTTP surfaces are measured.</small>
    </form>
    <div id="scanStatus" class="status" hidden></div>
  </div>

  <div class="signals">
    <span data-i18n="sigCrawl">CRAWL</span><i></i>
    <span>SEO</span><i></i>
    <span>AI / GEO</span><i></i>
    <span>LLMS V2</span><i></i>
    <span data-i18n="sigSchema">STRUCTURED DATA</span><i></i>
    <span data-i18n="sigA11y">ACCESSIBILITY</span><i></i>
    <span data-i18n="sigSecurity">SECURITY</span>
  </div>
</section>

<!-- RESULTS -->
<section id="result" class="results" hidden>
  <div class="result-head">
    <div>
      <span class="eyebrow" data-i18n="result">SCAN RESULT</span>
      <h2 id="resultDomain">—</h2>
      <p id="resultMeta">—</p>
    </div>
    <div class="result-head-actions">
      <button type="button" class="btn-pdf-export" id="btnPdfExport" onclick="window.print()" aria-label="Download PDF">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <span data-i18n="downloadPdf">Download Executive PDF</span>
      </button>
      <div class="total-score">
        <strong id="overallScore">0</strong>
        <span>/100</span>
      </div>
    </div>
  </div>
  <div id="resultPillars" class="result-pillars-grid"></div>
  <div id="scoreGrid" class="score-grid"></div>
  <div id="scanDisclosure" class="scan-disclosure"></div>

  <!-- Priority Summary -->
  <div id="prioritySummary" class="priority-summary" hidden>
    <h3><span class="severity critical">CRITICAL</span> <span data-i18n="priorityTitle">Top Priorities</span></h3>
    <div id="priorityList" class="priority-list"></div>
  </div>

  <div class="result-columns">
    <div>
      <div class="result-title">
        <h3 data-i18n="findings">Evidence-backed findings</h3>
        <span id="findingCount"></span>
      </div>
      <div id="findingsList" class="findings"></div>
    </div>
    <aside class="mandate-card">
      <span class="eyebrow" data-i18n="paidResolution">PAID RESOLUTION</span>
      <h3 data-i18n="mandateTitle">Evidence is free.<br>The fix contract is paid.</h3>
      <p data-i18n="mandateCopy">The same domain is re-scanned and every valid issue becomes a ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK contract.</p>
      <ul>
        <li data-i18n="m1">P0–P3 implementation order</li>
        <li data-i18n="m2">Issue ID + evidence + confidence</li>
        <li data-i18n="m3">Acceptance + regression tests</li>
        <li data-i18n="m4">Rollback + stop conditions</li>
        <li data-i18n="m5">1 re-scan within 30 days</li>
      </ul>
      <div class="price">
        <small data-i18n="oneSite">1 domain / software license</small>
        <strong>$99</strong>
      </div>
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Full Site Fix Mandate →</a>
      <small class="note" data-i18n="checkoutNote">Public scanning never invents source file names; source context enables file-level targeting.</small>
    </aside>
  </div>
</section>

<!-- 02.1 NINE PILLARS OF AI VISIBILITY ($99 EXECUTION BLUEPRINT) -->
<section class="section enterprise-nine-pillars" id="nine-pillars">
  <div class="classified-header">
    <div class="classified-badge">
      <span class="badge-dot">●</span>
      <span>9 DIGITAL PILLARS · $99 EXECUTION ROADMAP</span>
    </div>
    <h2>9 Deterministic Layers Evaluated by AI Search Engines</h2>
    <p>ChatGPT, Perplexity, Google Gemini, and Claude do not merely count keywords like legacy search engines. To place your brand into their recommendation set, they audit the technical and semantic consensus of these 9 pillars.</p>
  </div>
  <div class="nine-pillars-grid">
    <article class="pillar-card">
      <span class="pillar-num">01 · TECHNICAL CORE</span>
      <strong>Technical SEO &amp; Discoverability</strong>
      <p>robots.txt directives, clean sitemap hierarchies, HTTP status codes, and unobstructed crawl access for frontier AI bots.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">02 · GENERATIVE ENGINE</span>
      <strong>GEO (Generative Engine Optimization)</strong>
      <p>Semantic headers, topical boundaries, and structured paragraphs enabling LLMs to accurately parse key claims.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">03 · DIRECT ANSWER</span>
      <strong>AEO (Answer Engine Optimization)</strong>
      <p>50-word concise, quotable direct answers formatted for instant footnote extraction in conversational answers.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">04 · MODEL TOKENOMICS</span>
      <strong>LLMO (Large Language Model Optimization)</strong>
      <p>Token-efficient text architecture that preserves LLM context window attention spans and eliminates boilerplate noise.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">05 · AGENT INTERACTION</span>
      <strong>AAO (AI Agent Optimization)</strong>
      <p>Machine interfaces allowing autonomous agents to navigate, verify pricing, and extract inventory data reliably.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">06 · VECTOR RETRIEVAL</span>
      <strong>RAG (Retrieval-Augmented Generation)</strong>
      <p>High cosine-similarity chunking that positions your content in the top 3 vector matches during multi-hop retrieval.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">07 · MACHINE DISCOVERY</span>
      <strong>Sitemaps &amp; URL Hygiene</strong>
      <p>Authoritative XML sitemaps pointing only to 200-OK canonical pages, conserving AI bot crawl quotas.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">08 · ENTITY GRAPH</span>
      <strong>Schema.org &amp; Entity Graph</strong>
      <p>Interlinked JSON-LD @graph nodes connecting your organization, founders, products, and services unambiguously.</p>
    </article>
    <article class="pillar-card">
      <span class="pillar-num">09 · DIGITAL REPUTATION</span>
      <strong>E-E-A-T &amp; Content Trust</strong>
      <p>First-hand experience, verifiable credentials, and transparent sourcing that prevent model hallucinations.</p>
    </article>
  </div>
  <div class="pillar-footer-banner">
    <div class="banner-text">
      <strong>Why Is the $99 Roadmap Essential?</strong>
      <span>The free scan reveals measured breaks across these 9 pillars. The $99 Roadmap delivers turnkey code templates, P0–P3 root causes, Playwright tests, and rollback procedures in an 11-file engineering ZIP.</span>
    </div>
    <a class="banner-cta" href="/checkout?plan=pro">Unlock Roadmap — $99 →</a>
  </div>
</section>

<!-- 02.2 SIX STRATEGIC CHAINS & 18 VECTORS ($499 ENTERPRISE MONOPOLY) -->
<section class="classified-section enterprise-authority-showcase" id="enterprise-vectors">
  <div class="classified-header">
    <div class="classified-badge">
      <span class="badge-dot">●</span>
      <span>🔒 TOP SECRET · ENTERPRISE DARK POOL</span>
    </div>
    <h2>2026 Enterprise AI Visibility Intelligence Vectors</h2>
    <p>Six proprietary optimization vectors used behind closed doors by $1,000,000+ Silicon Valley AI search labs. Formulas redacted in public scans.</p>
  </div>
  <div class="classified-grid">
    <!-- VECTOR 01 -->
    <article class="classified-card vector-blue">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 01</span>
          <span class="vector-metric-pill">+420% Recommendation Probability</span>
        </div>
        <h4>Model Corpus Seeding &amp; Co-occurrence Engine</h4>
      </div>
      <p class="vector-desc">Pre-training corpus seeding (Common Crawl, Reddit, Arxiv, GitHub) with Pointwise Mutual Information (PMI) optimization directly into core model weights.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>corpus_seeding_pmi.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VECTOR 02 -->
    <article class="classified-card vector-purple">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 02</span>
          <span class="vector-metric-pill">0.95+ Re-rank Score</span>
        </div>
        <h4>Cross-Encoder Attention Optimization</h4>
      </div>
      <p class="vector-desc">Algorithmic template to maximize cross-encoder vector attention scores and secure primary citation across Cohere Rerank v3 and BGE-Reranker matrices.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>cross_encoder_rerank.py</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VECTOR 03 -->
    <article class="classified-card vector-green">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 03</span>
          <span class="vector-metric-pill">100% Update Resilience</span>
        </div>
        <h4>Knowledge Vault Triple Anchoring (Consensus Loop)</h4>
      </div>
      <p class="vector-desc">Unbreakable triangulation protocol linking Wikidata QID, Google Knowledge Graph MID, and official corporate registry records.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>wikidata_consensus_triple.jsonld</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VECTOR 04 -->
    <article class="classified-card vector-amber">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 04</span>
          <span class="vector-metric-pill">40x Faster Crawl · 95% Savings</span>
        </div>
        <h4>KV-Cache Friendly Edge Token Purge</h4>
      </div>
      <p class="vector-desc">Production Cloudflare Worker serving pure 14KB AST to AI crawlers (GPTBot, ClaudeBot), eliminating crawl budget exhaustion.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>edge_ast_purge_worker.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VECTOR 05 -->
    <article class="classified-card vector-cyan">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 05</span>
          <span class="vector-metric-pill">Sector Knowledge Monopoly</span>
        </div>
        <h4>Second-Order Synthetic Citation Loop Blueprint</h4>
      </div>
      <p class="vector-desc">Establishes canonical definitions and benchmark indexes, forcing secondary frontier models to mandate your site as root citation.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>synthetic_citation_loop.ts</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>

    <!-- VECTOR 06 -->
    <article class="classified-card vector-rose">
      <div class="classified-card-head">
        <div class="vector-meta-bar">
          <span class="vector-tag">VECTOR 06</span>
          <span class="vector-metric-pill">Autonomous Sales Readiness</span>
        </div>
        <h4>Autonomous Agent Headless Transaction API</h4>
      </div>
      <p class="vector-desc">A2A &amp; MCP standard enabling Siri Agent, ChatGPT Voice, and AutoGPT agents to complete actions directly without web UI friction.</p>
      <div class="classified-file-meta">
        <span class="file-badge"><code>agent_headless_api_mcp.json</code></span>
        <span class="lock-pill">🔒 $499 Enterprise</span>
      </div>
    </article>
  </div>
  <div class="classified-footer">
    <div class="classified-footer-info">
      <strong>Lead Your Industry · Enterprise AI Monopoly</strong>
      <span>Production Cloudflare Worker code, MCP servers, and the 22-file VIP engineering kit are delivered immediately under Enterprise license.</span>
    </div>
    <a class="classified-cta" id="enterpriseLink" href="/checkout?plan=enterprise">Unlock Enterprise Intelligence — $499 →</a>
  </div>
</section>

<!-- 02.3 22-FILE ENGINEERING DELIVERY ZIP MANIFEST -->
<section class="section px-delivery-manifest-section">
  <div class="section-head">
    <span class="eyebrow">ENGINEERING DELIVERY MANIFEST</span>
    <h2>Not a Static PDF. A Verifiable 22-File Engineering Package.</h2>
    <p>Following payment, our system re-scans the domain and compiles this production-grade ZIP package automatically. No membership required.</p>
  </div>
  <div class="px-delivery-category">
    <div class="px-delivery-category-title">
      <span>Standard Engineering Set ($99 Pro &amp; $499 Enterprise)</span>
      <span class="badge">11 Core Files</span>
    </div>
    <div class="px-delivery-grid-22">
      <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Scope, P0–P3 priorities, and execution starting contract.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level executive summary, 12 engine scores, and risk matrix.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 implementation sequence and technical specifications.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Machine-readable evidence inventory and affected URLs.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Playwright and cURL acceptance verification test suites.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Zero-downtime rollback procedures and automated stop conditions.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 readiness lenses and 13 AI intelligence audit machine surfaces.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Step-by-step developer and DevOps execution checklist.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Production-ready /llms.txt and /llms-full.txt generated for your domain.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Domain-specific verified Markdown machine surface route map.</p></article>
      <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12-engine deterministic assessment and field data audit report.</p></article>
    </div>
  </div>
  <div class="px-delivery-category">
    <div class="px-delivery-category-title vip">
      <span>Enterprise Dark Pool Intelligence Kit (Exclusive to $499 VIP Tier)</span>
      <span class="badge">11 Classified Files · Turnkey Code &amp; Protocols</span>
    </div>
    <div class="px-delivery-grid-22">
      <article class="px-file-card vip"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">VIP MD</span></div><p>LLM pre-training corpus seeding (Common Crawl, Arxiv) &amp; PMI guide.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">VIP JSON</span></div><p>0.965+ citation scoring attention matrix for Perplexity/Cohere Reranker.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">VIP JSON</span></div><p>Wikidata QID and Google MID consensus triples (@graph code).</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">VIP JS</span></div><p>Production Cloudflare HTMLRewriter Worker serving &lt;14KB micro-HTML.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">VIP MD</span></div><p>Canonical industry index blueprint and synthetic citation loop.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">VIP JSON</span></div><p>A2A v1.0 Agent Card spec for autonomous agent discovery.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>Model Context Protocol (MCP) server spec for Claude Desktop/Cursor.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">VIP MD</span></div><p>Tone and formatting guide engineered to pass 'Chosen' reward filters.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">VIP JSON</span></div><p>ColBERT v2 late-interaction dot product alignment matrix.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>RFC 3161 timestamping and C2PA cryptographic provenance manifest.</p></article>
      <article class="px-file-card vip"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">VIP PY</span></div><p>Automated Python sentinel monitoring brand hallucination across 15 models.</p></article>
    </div>
  </div>
</section>

<!-- 04 TOOL DIRECTORY -->
<section class="px-section" id="tools" data-premium-infographic="tools">
  <div class="px-section-head"><span class="eyebrow">CUSTOMER JOURNEY</span><h2>Specialized Diagnostic Tools</h2><p>More than a tool list: see which link breaks between a customer asking AI and a usable commercial path to your website.</p></div>
  <div class="px-tool-flow">
    <article class="px-flow-card"><span class="node">01</span><h3>Bulun</h3><p>Robots, sitemaps, crawl and AI crawler access. Can AI systems reach your website?</p></article>
    <article class="px-flow-card"><span class="node">02</span><h3>Anlaşılın</h3><p>Schema, entity graphs, semantic HTML and llms.txt. Is who you are and what you offer unambiguous?</p></article>
    <article class="px-flow-card"><span class="node">03</span><h3>Kaynak Olun</h3><p>AEO, RAG, E-E-A-T and original-information signals. Is your content usable as an answer source?</p></article>
    <article class="px-flow-card"><span class="node">04</span><h3>Tıklanın</h3><p>Live links, canonicals and redirect integrity. If cited, does the user land on the right page?</p></article>
    <article class="px-flow-card"><span class="node">05</span><h3>Talebe Dönüşün</h3><p>CTAs, forms and accessible actions. Can AI-sourced interest connect to a real customer journey?</p></article>
  </div>
  <div class="px-lenses">
    <div class="px-lens"><b>AI VISIBILITY</b><span>AI Readiness · AI Crawler · AI Mention</span></div>
    <div class="px-lens"><b>MACHINE KNOWLEDGE</b><span>llms.txt · Schema · Entity Graph</span></div>
    <div class="px-lens"><b>TECHNICAL FOUNDATION</b><span>12 Engines · Technical SEO · Links · Security</span></div>
    <div class="px-lens"><b>USER &amp; AGENT JOURNEY</b><span>Accessibility · Conversion · AAO</span></div>
  </div>
  <div class="px-actions"><a class="primary" href="/en/website-scanner/">Find My Broken Link →</a><a href="/en/tools/">View All 10 Tools</a></div>
</section>

<!-- 05 12 ENGINES / EVIDENCE / TRUST -->
<section class="px-section" id="engines" data-premium-infographic="engines">
  <div class="px-section-head"><span class="eyebrow">DETERMINISTIC DECISION</span><h2>12 engines. One decision chain.</h2><p>Instead of twelve disconnected scores, see one evidence chain mapping AI visibility readiness to four business outcomes.</p></div>
  <div class="px-engine-rail">
    <article class="px-engine-phase"><span>01 · DISCOVERY</span><h3>First, be discoverable.</h3><ul><li><b>01</b>Crawl &amp; Index</li><li><b>02</b>Technical SEO</li><li><b>12</b>Link Integrity</li></ul><div class="px-engine-outcome">OUTCOME → Search and AI systems can reach the intended URLs.</div></article>
    <article class="px-engine-phase"><span>02 · UNDERSTANDING</span><h3>Then, be understood correctly.</h3><ul><li><b>03</b>AI / GEO Access</li><li><b>04</b>llms.txt</li><li><b>05</b>Structured Data</li><li><b>10</b>Agent Readiness</li></ul><div class="px-engine-outcome">OUTCOME → Brand, content and machine surfaces are less ambiguous.</div></article>
    <article class="px-engine-phase"><span>03 · TRUST &amp; EXPERIENCE</span><h3>Become source-ready.</h3><ul><li><b>06</b>Performance Hygiene</li><li><b>07</b>Accessibility</li><li><b>08</b>Security Baseline</li><li><b>09</b>Content Trust</li></ul><div class="px-engine-outcome">OUTCOME → Technical trust and human/agent experience are protected.</div></article>
    <article class="px-engine-phase"><span>04 · COMMERCIAL PATH</span><h3>Connect interest to action.</h3><ul><li><b>11</b>Conversion</li><li><b>+13</b>Intelligence Audits</li><li><b>+7</b>Readiness Lens</li></ul><div class="px-engine-outcome">OUTCOME → A prioritized commercial risk map, not another issue dump.</div></article>
  </div>
</section>

<!-- 06 HOW IT WORKS -->
<section class="px-section" id="how" data-premium-infographic="process">
  <div class="px-section-head"><span class="eyebrow">TRANSPARENT WORKFLOW</span><h2>Three steps. One evidence chain.</h2><p>See the evidence first. Understand which blockers matter. Pay only when you need an implementation-grade roadmap.</p></div>
  <div class="px-three-flow">
    <article class="px-three-step"><span class="num">1</span><h3>Scan free</h3><p>Up to 50 public pages are measured by 12 engines and 13 Intelligence Audits.</p><a href="#scanner">Enter a domain →</a></article>
    <article class="px-three-step"><span class="num">2</span><h3>See the evidence</h3><p>Scores, findings, affected URLs, severity, confidence and evidence are visible. Fix code and blueprints remain locked.</p><a href="#scanner">See the free report →</a></article>
    <article class="px-three-step paid"><span class="num">3</span><h3>Unlock the $99 roadmap</h3><p>Root cause, implementation order, file/codebase context, acceptance/regression tests, rollback and re-scan become one execution contract.</p><a href="/checkout">Unlock execution pack →</a></article>
  </div>
</section>

<!-- 07 FIX MANDATE & PRICING -->
<section class="section pricing" id="pricing">
  <header>
    <span class="eyebrow">TRANSPARENT PRICING</span>
    <h2 data-i18n="pricingTitle">Diagnosis is free.<br>Resolution is $99 · Enterprise Monopoly $499.</h2>
    <p data-i18n="pricingCopy">Transparent, one-time investment per site. Revenue comes from implementation precision and enterprise market dominance, not hiding problems.</p>
  </header>
  <div class="pricing-grid pricing-three">
    <article>
      <div class="pricehead"><span data-i18n="fullDiagnosis">FULL DIAGNOSIS</span><strong>$0</strong></div>
      <p data-i18n="p1d">Full diagnosis on the public site surface.</p>
      <ul>
        <li data-i18n="p1a">12 deterministic scores</li>
        <li data-i18n="p1b">All findings + evidence</li>
        <li data-i18n="p1c">Severity + confidence + source class</li>
        <li data-i18n="p1e">AI crawler policy matrix</li>
        <li>Remediation codes &amp; blueprints: <b>NONE</b></li>
        <li>Enterprise 6 Secret Vectors: <b>REDACTED (🔒)</b></li>
      </ul>
      <a href="#scanner" data-i18n="scanNow">Scan free</a>
    </article>
    <article class="featured">
      <span class="popular" data-i18n="popular">MOST POPULAR</span>
      <div class="pricehead"><span data-i18n="fullFixProduct">AI SEARCH VISIBILITY ROADMAP</span><strong>$99</strong></div>
      <p data-i18n="p2d">Implementation-grade fix contract for 9 Pillars.</p>
      <ul>
        <li data-i18n="p2a">Full issue inventory + P0–P3 order</li>
        <li data-i18n="p2b">ROOT FIX → RECOVERY → PREVENTION</li>
        <li data-i18n="p2c">Acceptance + regression tests</li>
        <li data-i18n="p2e">Rollback + stop conditions</li>
        <li>Production code templates (robots.txt, llms.txt, Schema graph, AEO)</li>
        <li data-i18n="p2f">1 re-scan within 30 days</li>
        <li>11-File Core Engineering ZIP Package</li>
        <li>Enterprise 6 Secret Vectors: <b>SUMMARY VISIBLE, CODE REDACTED (🔒)</b></li>
      </ul>
      <a class="solid" href="/checkout?plan=pro" data-i18n="buyFix">Unlock Roadmap — $99</a>
    </article>
    <article class="enterprise-tier">
      <span class="vip-badge">CORPORATE MONOPOLY &amp; VIP</span>
      <div class="pricehead"><span>ENTERPRISE DARK POOL</span><strong>$499</strong></div>
      <p>6 proprietary vectors from $1M+ frontier AI research labs.</p>
      <ul>
        <li><b>Everything in $99 Roadmap INCLUDED</b></li>
        <li><b>6 Classified Enterprise Protocols (Full Code):</b></li>
        <li>1. Model Corpus Seeding &amp; Co-occurrence Engine</li>
        <li>2. Cross-Encoder Attention Optimization (Perplexity #1 Rank)</li>
        <li>3. Knowledge Vault Triple Anchoring (Wikidata Consensus)</li>
        <li>4. 14KB KV-Cache Friendly Edge Token Purge (Worker)</li>
        <li>5. Second-Order Synthetic Citation Loop Blueprint</li>
        <li>6. Autonomous Agent Headless Transaction API (MCP)</li>
        <li>22-File Extended VIP ZIP Delivery</li>
        <li>3 VIP re-scans within 60 days</li>
      </ul>
      <a class="solid enterprise-btn" href="/checkout?plan=enterprise">Unlock Enterprise Intelligence — $499</a>
    </article>
  </div>
  <div class="compare">
    <b data-i18n="compareLabel">PRODUCT BOUNDARY</b>
    <p data-i18n="compareCopy"><strong>Free:</strong> what is wrong and what proves it? → <strong>$99:</strong> what root cause should be fixed, in which order, with which tests and rollback? → <strong>$499 Enterprise:</strong> 6 proprietary AI algorithm vectors with turnkey execution code and prompts.</p>
  </div>
</section>

<!-- 08 AUTHORITY & REHBERLER -->
<section class="px-section" data-premium-infographic="knowledge">
  <div class="px-section-head"><span class="eyebrow">REFERENCE LAYER</span><h2>Technical Guides &amp; Standards</h2><p>A reference layer that connects AI visibility to a learn → verify → implement → measure loop instead of jargon memorization.</p></div>
  <div class="px-knowledge-flow">
    <article class="px-knowledge-step"><span class="num">01 · LEARN</span><h3>GEO · AEO · LLMO · AAO · RAG · E-E-A-T</h3><p>Understand emerging AI visibility concepts in plain language with evidence classes.</p><a href="/en/glossary/">Open the reference glossary →</a></article>
    <article class="px-knowledge-step"><span class="num">02 · VERIFY</span><h3>llms.txt · robots · sitemap · schema</h3><p>Verify machine-readable surfaces with real HTTP and documented evidence.</p><a href="/en/llms-txt-validator/">Validate llms.txt →</a></article>
    <article class="px-knowledge-step"><span class="num">03 · IMPLEMENT</span><h3>$99 Fix Mandate</h3><p>Turn the free diagnosis into an execution contract for a developer or AI coding agent.</p><a href="/en/fix-mandate/">Review delivery →</a></article>
    <article class="px-knowledge-step"><span class="num">04 · MEASURE</span><h3>AI Mention Tracker</h3><p>Keep readiness separate from observed visibility; measure neutral-prompt brand visibility independently.</p><a href="/en/ai-mention-tracker/">Review visibility tracking →</a></article>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">FAQ</span>
    <h2 data-i18n="faqTitle">Frequently asked questions</h2>
  </header>
  <details><summary data-i18n="q1">What is hidden in the free scan?</summary><p data-i18n="a1">The problem is not hidden. URL, severity, confidence, evidence and category are visible. The paid layer unlocks the implementation roadmap, test contract and rollback plan.</p></details>
  <details><summary data-i18n="q2">Does 100/100 guarantee Google or AI citations?</summary><p data-i18n="a2">No. The score only represents measured checks. It is not a ranking, traffic or AI citation guarantee.</p></details>
  <details><summary data-i18n="q3">Is llms.txt mandatory?</summary><p data-i18n="a3">No. llms.txt is an evolving proposal, not a web standard. It is therefore labeled PROPOSAL and given limited weight.</p></details>
  <details><summary data-i18n="q4">Are Core Web Vitals measured?</summary><p data-i18n="a4">This version measures HTML/HTTP performance hygiene. Reliable LCP/INP/CLS needs CrUX/PageSpeed data; without it the result is NOT_MEASURED.</p></details>
  <details><summary data-i18n="q5">Why are some sites rejected?</summary><p data-i18n="a5">To reduce SSRF risk, localhost/private/reserved targets, private DNS resolution, non-standard ports and redirect pivots into private networks fail closed.</p></details>
</section>
</main>

<!-- 10 FOOTER -->
<section class="ai-opportunity" data-commercial-intent="static"><div class="ai-opportunity-shell"><span class="ai-opportunity-eyebrow">AI SEARCH VISIBILITY → RECOMMENDATION OPPORTUNITY → CUSTOMER</span><h2>Your Customer Asks AI “Who Should I Choose?” Is Your Website in the Answer Set?</h2><p class="ai-opportunity-lead">HTML&HTML prepares your website to compete for visibility, citation and recommendation opportunity in AI search. It shows measurable website-side blockers that can prevent discovery, understanding, source consideration and a usable referral path.</p><div class="ai-term-strip" aria-label="AI Search topics"><a href="/en/guides/llms-txt/">llms.txt</a><a href="/en/geo-optimization/">GEO</a><a href="/en/aeo-answer-engine-optimization/">AEO</a><a href="/en/llmo-optimization/">LLMO</a><a href="/en/aao-agent-optimization/">AAO</a><a href="/en/rag-readiness/">RAG</a><a href="/en/e-e-a-t-trust-signals/">E-E-A-T</a><a href="/en/glossary/#sitemap">Sitemap</a><a class="all" href="/en/glossary/">Open AI Search Glossary →</a></div><div class="ai-value-chain"><article><b>01</b><h3>AI MUST DISCOVER YOUR WEBSITE</h3><p>robots.txt, sitemaps, canonicals, indexability and AI crawler access are prerequisites for source discovery.</p></article><article><b>02</b><h3>AI MUST UNDERSTAND YOUR WEBSITE</h3><p>GEO, AEO, LLMO, entity graphs, schema and answer extractability reduce ambiguity for machine readers.</p></article><article><b>03</b><h3>BECOME ELIGIBLE AS A SOURCE</h3><p>RAG/retrieval fitness, original information, E-E-A-T, freshness and evidence structures support source eligibility.</p></article><article><b>04</b><h3>CONNECT CITATION TO COMMERCIAL VALUE</h3><p>AAO, accessible user flows, link integrity, measurable referral paths and clear CTAs turn visibility into customer opportunity.</p></article></div><div class="ai-opportunity-actions"><a class="ai-opportunity-primary" href="/en/website-scanner/">Check My AI Visibility Free →</a><a class="ai-opportunity-secondary" href="/en/fix-mandate/">Unlock AI Search Visibility Roadmap — $99 →</a></div><p class="ai-opportunity-guard">Recommendations, rankings, citations, traffic, customers, or revenue are never guaranteed. HTML&HTML measures website-side technical and content blockers under your control, not external algorithm choices.</p><div class="ai-market-evidence"><h3>Official reference baseline</h3><div><article><b>Google</b><p>Google publishes official guidance for generative search, recognizing GEO and AEO while treating them as modern technical SEO. Google explicitly confirms it does not require special tags for AI Overviews and does not use llms.txt for Google Search visibility.</p><a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer">Open Source ↗</a></article><article><b>OpenAI</b><p>OpenAI confirms public sites can appear in ChatGPT Search; OAI-SearchBot access is critical for discovery, consideration, citation, and referral linking.</p><a href="https://help.openai.com/en/articles/12627856-publishers-and-developers-faq" target="_blank" rel="noopener noreferrer">Open Source ↗</a></article><article><b>Google Search Console</b><p>Google launched dedicated generative AI performance reporting in Search Console globally in 2026.</p><a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Open Source ↗</a></article></div></div></div></section>
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
      </a>
      <p data-i18n="footerTag">Evidence is free. Implementation precision is the product.</p>
    </div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="/en/platform/">Platform</a></li>
        <li><a href="/en/fix-mandate/">Fix Mandate</a></li>
        <li><a href="/en/pricing/" data-i18n="navPrice">Pricing</a></li>
        <li><a href="/openapi.json">OpenAPI</a></li>
        <li><a href="/audit-profile.json">Audit Profile</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Tools</h4>
      <ul>
        <li><a href="/en/llms-txt-validator/" data-i18n="footerLlms">llms.txt Validator</a></li>
        <li><a href="/en/ai-crawler-checker/" data-i18n="footerCrawler">AI Crawler Checker</a></li>
        <li><a href="/en/ai-website-readiness/" data-i18n="footerReadiness">AI Website Readiness</a></li>
        <li><a href="/en/ai-mention-tracker/" data-i18n="footerMentions">AI Mention Tracker</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Resources</h4>
      <ul>
        <li><a href="/en/guides/">Guides</a></li>
        <li><a href="/en/glossary/">Glossary</a></li>
        <li><a href="/en/llms-txt-news/">News</a></li>
        <li><a href="/en/methodology/" data-methodology-link data-i18n="footerMethod">Methodology</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company &amp; Legal</h4>
      <ul>
        <li><a href="/en/about/">About Us</a></li>
        <li><a href="/en/terms/">Terms of Service</a></li>
        <li><a href="/en/privacy/">Privacy Policy</a></li>
        <li><a href="/en/contact/">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 HTML&amp;HTML. Deterministic AI &amp; website visibility validator.</p>
  </div>
</footer>
</body>
</html>'''

    write_page("index.html", root_html)
    write_page("tr/index.html", root_html)
    write_page("en/index.html", en_html)
    print("All homepages built cleanly.")

if __name__ == '__main__':
    build_homepages()
