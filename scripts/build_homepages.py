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
        ("Website Scanner", "/en/website-scanner/", "Full 18-engine crawl inspecting HTTP, SEO, AI, and security."),
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
        ("Web Sitesi Tarayıcısı", "/tr/site-tarama/", "18 analiz motoruyla HTTP, SEO, AI ve güvenlik denetimi."),
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
    root_html = '''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=yes">
<!-- 1. ZERO-FLASH SCRIPT — Blocking before CSS -->
<script>
  (function() {
    'use strict';
    try {
      localStorage.setItem('hh-theme', 'dark');
      localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({theme: 'dark', effective: 'dark'}));
      document.cookie = 'htmlandhtml-theme=' + encodeURIComponent(JSON.stringify({theme: 'dark'})) + '; path=/; max-age=31536000; SameSite=Lax; Secure';
    } catch(e) {}
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  })();
</script>
<title>AI Arama Teknik Teşhis ve Düzeltme Platformu | HTML&amp;HTML</title>
<meta name="description" content="Web sitenizin AI aramalarında neden zayıf kaldığını ücretsiz görün. Bulguyu kanıtlayın; gerekiyorsa $99 Fix Pack ile geliştiricinize uygulanabilir düzeltme, test ve rollback planı verin.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="alternate" type="text/markdown" href="https://htmlandhtml.com/index.md">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/">
<meta property="og:title" content="HTML&amp;HTML — AI Arama Teknik Teşhis Platformu">
<meta property="og:description" content="AI arama görünürlüğünü engelleyebilecek site tarafı sorunlarını kanıtlayan ve uygulanabilir düzeltme paketi üreten karar sistemi.">
<meta name="theme-color" content="#14151a">
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=hh5">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=hh5">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=hh5">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=hh5">
<link rel="icon" href="/favicon.ico?v=hh5" sizes="any">
<link rel="manifest" href="/manifest.webmanifest">

<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/validator.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/theme.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=2026092504_27">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">
<link rel="stylesheet" href="/assets/css/profound-experience.css?v=20260920_27">
<meta name="author" content="HTML&amp;HTML">
<link rel="author" href="https://htmlandhtml.com/tr/hakkimizda/">
<script src="/assets/js/enterprise-theme-engine.js?v=20260920_27" defer></script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://htmlandhtml.com/#website",
      "url": "https://htmlandhtml.com/",
      "name": "HTML&HTML",
      "publisher": { "@id": "https://htmlandhtml.com/#organization" },
      "inLanguage": "tr"
    },
    {
      "@type": ["Organization", "Corporation", "SoftwareApplication"],
      "@id": "https://htmlandhtml.com/#organization",
      "name": "HTML&HTML",
      "url": "https://htmlandhtml.com/",
      "logo": "https://htmlandhtml.com/assets/logo.png?v=hh7",
      "areaServed": ["TR", "US", "GB", "DE", "Global"],
      "sameAs": [
        "https://www.wikidata.org/wiki/Q116503894"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": "https://htmlandhtml.com/tr/hakkimizda/",
        "availableLanguage": ["Turkish", "English"]
      },
      "author": {
        "@type": "Organization",
        "name": "HTML&HTML Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "HTML&HTML"
      },
      "datePublished": "2026-01-01T00:00:00Z",
      "dateModified": "2026-09-08T00:00:00Z",
      "description": "Customer-first AI search visibility platform for GEO, AEO, LLMO, AAO, RAG, and E-E-A-T readiness."
    },
    {
      "@type": "ItemList",
      "@id": "https://htmlandhtml.com/#tools-carousel",
      "name": "Yapay Zeka Görünürlük Araçları ve Teşhis Paketi",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Web Sitesi Yapay Zeka Arama Taraması", "url": "https://htmlandhtml.com/tr/site-tarama/" },
        { "@type": "ListItem", "position": 2, "name": "Yapay Zeka Arama Görünürlüğü (GEO/AEO/LLMO)", "url": "https://htmlandhtml.com/tr/yapay-zeka-arama-gorunurlugu/" },
        { "@type": "ListItem", "position": 3, "name": "llms.txt Doğrulayıcı ve Test Aracı", "url": "https://htmlandhtml.com/tr/llms-txt-validator/" },
        { "@type": "ListItem", "position": 4, "name": "Yapay Zeka Hazırlık ve 18 Motor Teşhisi", "url": "https://htmlandhtml.com/tr/ai-website-readiness/" },
        { "@type": "ListItem", "position": 5, "name": "AI Görünürlük Onarım Seti ($99)", "url": "https://htmlandhtml.com/tr/fiyatlandirma/" }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://htmlandhtml.com/#app",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "datePublished": "2026-01-01T00:00:00Z",
      "dateModified": "2026-09-08T00:00:00Z",
      "publisher": { "@id": "https://htmlandhtml.com/#organization" },
      "offers": [
        { "@type": "Offer", "name": "Tam Site Teşhisi", "price": "0", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "AI Görünürlük Onarım Seti", "price": "99", "priceCurrency": "USD" }
      ]
    }
  ]
}

</script>
<script src="/assets/js/validator.js?v=17" defer></script>
<script src="/assets/js/theme.js?v=20260920_27"></script>
<script src="/assets/js/ai-positioning.js?v=r10-20260910-2355&amp;quality=005" defer></script>
<script src="/assets/js/r10-quality-hotfix.js?v=20260910-005" defer></script>
<link rel="stylesheet" href="/assets/css/v3-capabilities.css?v=1"><link rel="stylesheet" href="/assets/css/r10-report-ux.css?v=20260910-001"><link rel="stylesheet" href="/assets/css/mobile-space-grade.css?v=20260920_27">
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">İçeriğe geç</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="162" height="28">
    </a>
    <nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
  <a href="/pdf-cevirici.html" style="color:#38bdf8 !important;font-weight:700;">Çeviriler</a>
  <a href="/editor-photoshop.html">Photoshop Web</a>
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">Nasıl Çalışır</a>
  <a href="/tr/fiyatlandirma/">Uygulama Paketi ($99)</a>
  <a href="/tr/referans/">Bir Ekibe Öner</a>
</nav>
    <div class="nav-actions">
      <a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Kontrol</a>
      <div class="langs">
        <button data-lang="tr" class="active">TR</button><span>/</span><button data-lang="en">EN</button>
      </div>
      <button type="button" class="hh-mobile-menu-btn" id="hhMobileMenuBtn" aria-label="Menüyü Aç">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </div>
</header>

<!-- Mobil Cyber Drawer Navigasyon -->
<div id="hhCyberDrawer" class="hh-cyber-drawer" aria-hidden="true">
  <div class="hh-drawer-head">
    <div class="brand">
      <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="124" height="22">
      <span class="hh-space-telemetry-led">● RADAR V4.1</span>
    </div>
    <button type="button" class="hh-drawer-close" id="hhDrawerClose" aria-label="Menüyü Kapat">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="hh-drawer-links">
    <a href="#scanner" class="hh-drawer-link highlight">
      <span>⚡ Ücretsiz AI Taraması</span>
      <span class="link-tag">Hemen Tara</span>
    </a>
    <a href="/tr/site-tarama/" class="hh-drawer-link">
      <span>🔍 Site Tarama &amp; Teşhis</span>
      <span class="link-tag">Ücretsiz</span>
    </a>
    <a href="/tr/yapay-zeka-arama-gorunurlugu/" class="hh-drawer-link">
      <span>🌐 Yapay Zeka Görünürlüğü (GEO)</span>
    </a>
    <a href="/tr/llms-txt-validator/" class="hh-drawer-link">
      <span>📑 llms.txt Test Aracı</span>
    </a>
    <a href="/tr/llms-txt-haberler/" class="hh-drawer-link">
      <span>📰 Haberler &amp; Gelişmeler</span>
    </a>
    <a href="/tr/sozluk/" class="hh-drawer-link">
      <span>📖 AI SEO Sözlüğü</span>
    </a>
    <a href="/tr/fiyatlandirma/" class="hh-drawer-link highlight">
      <span>💎 Onarım Seti ($99)</span>
      <span class="link-tag" style="background:#22c55e;color:#04130a;">Tam Çözüm</span>
    </a>
    <a href="/openapi.json" class="hh-drawer-link">
      <span>⚙️ OpenAPI &amp; API Belgeleri</span>
    </a>
    <a href="/en/" class="hh-drawer-link">
      <span>🌍 English</span>
      <span class="link-tag">EN</span>
    </a>
  </div>
</div>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero decision-hero profound-constellation-wrap" id="scanner">
  <canvas id="profoundConstellationCanvas" class="profound-constellation-canvas"></canvas>
  <div class="profound-hero-content">
  <div class="kicker"><span></span><b data-i18n="kicker">YAPAY ZEKA ARAMA KARAR VE CİRO KORUMA SİSTEMİ</b></div>
  <h1 data-i18n="heroTitle">Web Siteniz Yapay Zeka Aramalarında Neden Görünmüyor?</h1>
  <p class="hero-answer" data-i18n="heroCopy">Müşterileriniz ChatGPT, Perplexity ve Siri'ye firmanızı sorduğunda yapay zeka neden rakibinizi öneriyor? 90 saniyede sitenizin önüne çekilen güven, dağıtım ve kod engellerini çıkarıyor; kaçan cironuzu durduracak hazır mühendislik kitini veriyoruz.</p>

  <div class="decision-hero-proof" aria-label="Ücretsiz tarama sınırları">
    <span>Ücretsiz teşhis</span><span>Gerçek URL / HTTP / HTML kanıtı</span><span>Kaynak kod erişimi yok</span>
  </div>

  <div class="pdf-hero-badges" aria-label="Temel Değer Önerileri">
    <div class="pdf-hero-badge"><i>⚡</i><span>5 Saniyede Anlaşılır Karar</span></div>
    <div class="pdf-hero-badge"><i>🛡️</i><span>W3C &amp; RFC 9309 Doğrulanmış Kanıt</span></div>
    <div class="pdf-hero-badge"><i>📦</i><span> Fix Pack: Yazılımcınız İçin Hazır Kod</span></div>
  </div>

  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <div class="hh-input-wrapper">
          <span class="hh-input-radar-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="3" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="21"></line><line x1="3" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="21" y2="12"></line></svg>
          </span>
          <label for="domainInput" class="sr-only">Taranacak web sitesi adresi</label>
          <input id="domainInput" aria-label="Taranacak web sitesi veya alan adı" autocomplete="off" autocorrect="off" autocapitalize="off" inputmode="url" spellcheck="false" placeholder="https://sirketiniz.com/" required>
          <button type="button" class="hh-input-clear-btn" id="hhInputClearBtn" aria-label="Temizle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <button type="button" class="hh-input-paste-btn" id="hhInputPasteBtn" aria-label="Panodan Yapıştır">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            <span>Yapıştır</span>
          </button>
        </div>
        <button id="scanButton" type="submit"><b data-i18n="scan">Sitemi Ücretsiz Tara</b><span class="btn-arrow" aria-hidden="true">→</span><span class="sr-only">Sitemi Ücretsiz Tara</span></button>
      </div>
      <div class="scan-chips">
        <span>Örnekler:</span>
        <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
        <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
        <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
      </div>
      <small data-i18n="scanHint">Kayıt yok · Şifre yok · Kaynak kod erişimi yok · Yalnızca herkese açık web yüzeyi taranır.</small>
    </form>
    <div id="scanStatus" class="status" hidden></div>
  </div>

  <div class="signals decision-signals">
    <span>BULUNABİLİRLİK</span><i></i>
    <span>ANLAŞILABİLİRLİK</span><i></i>
    <span>KAYNAK OLABİLİRLİK</span><i></i>
    <span>DÖNÜŞÜM YOLU</span>
  </div>
  </div>
</section>

<!-- CUSTOMER DECISION HOMEPAGE V2 -->
<section class="decision-shell" id="customer-story" aria-label="HTML&HTML müşteri karar sistemi">

  <!-- 00 PROFOUND AGENTIC WORKBENCH & VISUAL SUITE -->
  <section class="profound-workbench-section" id="profound-architecture">
    <div class="decision-section-no">00</div>
    <div class="decision-heading">
      <span class="decision-kicker">YAPAY ZEKA ÇAĞI İÇİN ÜRETİLDİ · PROFOUND MİMARİSİ</span>
      <h2>Sitenizin yapay zeka arama motorlarındaki tüm temas noktalarını tek bir platformdan yönetin.</h2>
      <p>Müşterilerinizin yapay zekaya ne sorduğunu görün, 18 deterministik motorla teknik teşhis ajanlarını konumlandırın ve sonuçları tek ekrandan ölçün.</p>
    </div>

    <!-- PROFOUND 3-PANE WORKBENCH MOCKUP -->
    <div class="profound-workbench-mockup" aria-label="Profound Model Agentic Workbench Preview">
      <div class="workbench-window-bar">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="workbench-title-bar">
          <span>HTML&amp;HTML Agentic Workspace</span>
          <span class="badge-live">● SYSTEM ACTIVE</span>
        </div>
      </div>
      <div class="workbench-body">
        <!-- Left Sidebar -->
        <div class="workbench-sidebar">
          <div class="wb-workspace-header">
            <span>⚡ HTML&amp;HTML OS</span>
          </div>
          <div class="wb-nav-group">
            <div class="wb-nav-title">Çalışma Alanı</div>
            <div class="wb-nav-item active">🤖 AI Marketer</div>
            <div class="wb-nav-item">📊 Agent Analytics</div>
            <div class="wb-nav-item">🎯 Context Manager</div>
          </div>
          <div class="wb-nav-group">
            <div class="wb-nav-title">Ajanlar &amp; Teşhis</div>
            <div class="wb-nav-item">⚙️ 18-Engine Suite</div>
            <div class="wb-nav-item">🔍 FactCheck Engine</div>
            <div class="wb-nav-item">📈 AI Benchmarking</div>
          </div>
        </div>

        <!-- Center Chat Pane -->
        <div class="workbench-chat">
          <div class="wb-chat-user">
            <strong>Müşteri İstemi:</strong><br>
            "Web sitemiz için yapay zeka arama optimizasyonu (AEO/GEO) iniş sayfasını hazırla ve ChatGPT/Perplexity botlarına hazır hale getir."
          </div>
          <div class="wb-chat-agent">
            <div class="wb-agent-step">✓ 18 Deterministik Motor Doğrulandı (0 Hata)</div>
            <div class="wb-agent-step">✓ Schema.org @graph ve llms.txt v2 Üretildi</div>
            <div class="wb-agent-step">✓ ColBERT MaxSim Semantik Skoru: 94/100</div>
            <strong>Otonom Ajan Çıktısı:</strong> İniş sayfası üretildi, ilk paket AST bütçesine uyarlandı ve canlı önizlemeye aktarıldı.
          </div>
        </div>

        <!-- Right Live Preview Pane -->
        <div class="workbench-preview">
          <div class="wb-preview-card">
            <div class="wb-preview-banner">
              <span>⚡ LIVE AGENT RENDERED PREVIEW</span>
            </div>
            <div class="wb-preview-content">
              <h4>Yapay Zeka Destekli Yeni Nesil Performans</h4>
              <p>LLM botları (ChatGPT, Claude, Perplexity) tarafından saniyeler içinde taranan ve doğrudan alıntılanan optimize edilmiş içerik.</p>
              <div class="wb-preview-btn">Ajanı Devreye Al</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROFOUND 3-COLUMN ARCHITECTURE -->
    <div class="profound-three-columns">
      <div class="profound-col">
        <div class="col-num">01 / TRACK</div>
        <h3>Müşterilerinizin AI'a Ne Sorduğunu Görün</h3>
        <p>Arama motoru ajanlarının (ChatGPT, Claude, Gemini, Perplexity) sitenizi nasıl anladığını ve hangi sorgularda tavsiye ettiğini keşfedin.</p>
      </div>
      <div class="profound-col">
        <div class="col-num">02 / DEPLOY</div>
        <h3>Buna Göre Ajanlarınızı Konumlandırın</h3>
        <p>Eksikleri kapatmak için gerekli teknik konfigürasyonları, llms.txt ve Schema.org mimarisini anında devreye alın.</p>
      </div>
      <div class="profound-col">
        <div class="col-num">03 / MEASURE</div>
        <h3>Sonuçları Tek Ekrandan Ölçün</h3>
        <p>18 deterministik motor ve  Fix Pack ile tüm görünürlük metriklerini gerçek zamanlı takip edip ciro kaybını engelleyin.</p>
      </div>
    </div>

    <!-- PROFOUND VISUAL BENCHMARK & ANALYTICS CARDS (GRAPHICS MATCHING TRYPROFOUND.COM) -->
    <div class="profound-visual-grid">
      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Yapay Zeka Kaynaklı Trafik Etkisini Kanıtlayın</h3>
          <p>OpenAI ChatGPT, Meta LLaMA, Anthropic Claude ve Perplexity botlarının sitenizi ne sıklıkla ziyaret ettiğini ve arama trafiğini nasıl tetiklediğini çok kanallı zaman serisiyle izleyin.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/agent-analytics.png" alt="Yapay Zeka Bot Trafiği ve Ajan Analitiği" loading="lazy" width="600" height="240">
        </div>
        <a href="/tr/site-tarama/" class="profound-card-cta">Ajan Analitiğini İncele →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Sitenizi Rakiplerinizle Kıyaslayın</h3>
          <p>Yapay zeka arama motorlarındaki performansınızı sektör ortalamasıyla kıyaslayın. 82. yüzdelik dilim hızı ve doğrudan alıntılanma oranlarıyla sektör liderliğini koruyun.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/benchmarking.png" alt="AI Arama Karşılaştırma Göstergesi (82nd Percentile)" loading="lazy" width="600" height="240">
        </div>
        <a href="/tr/site-tarama/" class="profound-card-cta">Kıyaslama Raporunu Gör →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Yapay Zeka İddialarının Doğruluğunu Teyit Edin</h3>
          <p>ChatGPT ve Perplexity'nin markanız hakkında yanlış bilgi vermesini (hallucination) engelleyin. Deterministik FactCheck motoruyla her yapay zeka cevabını doğrulanmış web kanıtına bağlayın.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/factcheck.png" alt="AI İddia Doğrulama ve Halüsinasyon Tespiti (FactCheck)" loading="lazy" width="600" height="240">
        </div>
        <a href="/tr/site-tarama/" class="profound-card-cta">FactCheck Denetimini Başlat →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Yapay Zeka Alışveriş &amp; E-Ticaret Görünürlüğü</h3>
          <p>ChatGPT Shopping ve yapay zeka ürün tavsiye botlarında ürünlerinizin fiyat, stok ve özellik bilgileriyle ilk sırada önerilmesini sağlayın.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/shopping.png" alt="ChatGPT Shopping ve AI E-Ticaret Entegrasyonu" loading="lazy" width="600" height="240">
        </div>
        <a href="/tr/fiyatlandirma/" class="profound-card-cta">E-Ticaret Paketini Gör →</a>
      </div>
    </div>
  </section>

  <!-- 01 KARAR VE DIAGNOZ (5 Saniyede Anlaşılma & 5 Temel Karar Sorusu) -->
  <section class="decision-section decision-diagnosis" id="commercial-diagnosis">
    <div class="decision-section-no">01</div>
    <div class="decision-heading">
      <span class="decision-kicker">SATMIYORSA ÖNCE NEDENİNİ BUL: 5 TEMEL KARAR BASAMAĞI</span>
      <h2>Sorun trafik olmayabilir. Kırılan karar basamağını bulun.</h2>
      <p>Kredi komitesindeki bir bankacı şirketinize nasıl bakarsa, yapay zeka arama motorları da sitenize öyle bakar: Tutarsızlık var mı? Kanıt sağlam mı? Veri eksik mi? HTML&amp;HTML teknik gösteri yapmaz; müşterinin ve yapay zekanın hangi basamakta takıldığını ölçülebilir web kanıtlarıyla ayırır.</p>
    </div>
    <div class="decision-question-grid">
      <article><b>01</b><h3>Müşteri</h3><p>5 saniyede ne sattığınız anlaşılıyor mu?</p><span>Teklif karmaşıksa müşteri karar veremez; yapay zeka sitenizi özetleyemez ve rakibe geçer.</span></article>
      <article><b>02</b><h3>Güven</h3><p>İddianızı destekleyen kanıt görünür mü?</p><span>W3C ve RFC standartlarında somut kanıt yoksa satın alma ertelenir, AI sizi kaynak gösteremez.</span></article>
      <article><b>03</b><h3>Dağıtım</h3><p>Google ve AI sistemleri sizi okuyabiliyor mu?</p><span>robots.txt ve llms.txt doğru değilse yapay zeka sitenizi tarayamaz; pazarın %40'ına yoksunuzdur.</span></article>
      <article><b>04</b><h3>Referans</h3><p>Kararı destekleyen örnek çıktı var mı?</p><span>Soyut vaatler değil; doğrulanabilir Schema.org ve Wikidata konsensüsü kurumsal güven üretir.</span></article>
      <article><b>05</b><h3>Satış kanalı</h3><p>Teklif ve CTA doğru sırada mı?</p><span>Trafik boşluğa düşmemeli; 15 dakikada devreye alınacak net bir uygulama paketine bağlanmalıdır.</span></article>
    </div>
  </section>

  <!-- 02 BİZ KİMİZ & MİMARİ KARAR SİSTEMİ (PDF Sayfa 4-5) -->
  <section class="decision-section decision-about" id="about-architecture">
    <div class="decision-section-no">02</div>
    <div class="decision-heading">
      <span class="decision-kicker">BİZ KİMİZ &amp; HANGİ PROBLEMİ ÇÖZÜYORUZ?</span>
      <h2>Rapor değil; doğrudan uygulanabilir Karar ve Mühendislik Sistemidir.</h2>
      <p>Klasik SEO ajansları size yüzlerce sayfalık karmaşık PDF raporları satar ve çözümü size bırakır. HTML&amp;HTML ise karmaşık web problemlerini 5 saniyede anlaşılır karar ağaçlarına ve yazılımcınızın 15 dakikada uygulayacağı hazır üretim kodlarına dönüştürür.</p>
    </div>
    <div class="pdf-about-grid">
      <div class="pdf-about-cards">
        <div class="pdf-card-capsule">
          <h3>⚡ Karar Odaklı Yaklaşım</h3>
          <p>Yapay zeka modellerinin (ChatGPT, Gemini, Claude, Perplexity) sitenizi neden tavsiye etmediğini 'iyi/kötü' puanlarıyla değil; 'Ne bozuk, Kanıtı ne, Ciroya etkisi ne, Nasıl düzeltilir?' zinciriyle çözüme kavuşturur.</p>
        </div>
        <div class="pdf-card-capsule">
          <h3>🛡️ %100 Deterministik Kanıt</h3>
          <p>Hiçbir veri tahmine dayanmaz. URL, HTTP durum kodu, HTML DOM kesiti ve TCP/TLS AST bütçesi üzerinden doğrudan doğrulanabilir W3C ve IETF kanıtları üretilir.</p>
        </div>
        <div class="pdf-card-capsule">
          <h3>📦 Doğrudan Uygulanabilir Kod Paketi</h3>
          <p>Öneri ve danışmanlık değil; yazılımcınızın doğrudan sunucunuza yükleyeceği Nginx/Apache kuralları, Schema.org JSON-LD grafikleri, llms.txt v2 dosyaları ve test scriptleri verilir.</p>
        </div>
      </div>
      <div class="pdf-ecosystem-box">
        <div>
          <div class="pdf-ecosystem-title">Yapay Zeka Keşif Ekosistemi</div>
          <div class="pdf-ecosystem-desc">Arama alışkanlıkları değişti. Müşterileriniz artık Google yerine ChatGPT, Perplexity ve Siri'ye doğrudan soru soruyor. Sitenizin bu ekosistemde kaynak gösterilmesini sağlıyoruz.</div>
        </div>
        <div class="pdf-ecosystem-logos">
          <div class="pdf-eco-logo">OpenAI<span>ChatGPT</span></div>
          <div class="pdf-eco-logo">Google<span>Gemini / AIO</span></div>
          <div class="pdf-eco-logo">Anthropic<span>Claude</span></div>
          <div class="pdf-eco-logo">Perplexity<span>Pro Search</span></div>
          <div class="pdf-eco-logo">Microsoft<span>Copilot</span></div>
          <div class="pdf-eco-logo">Apple<span>Intelligence</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 03 15 YETKİNLİK MODÜLÜ (PDF Yetkinlik Kataloğu) -->
  <section class="decision-section decision-capabilities" id="capabilities-catalog">
    <div class="decision-section-no">03</div>
    <div class="decision-heading">
      <span class="decision-kicker">15 KRİTİK DENETİM VE GÖRÜNÜRLÜK MODÜLÜ</span>
      <h2>Web sitenizin yapay zeka arama motorlarındaki tüm temas noktaları.</h2>
      <p>Sitenizin arama botları ve LLM ajanları tarafından indekslenmesini sağlayan 15 temel mühendislik bileşeni.</p>
    </div>
    <div class="pdf-caps-grid">
      <div class="pdf-cap-pill"><span class="pdf-cap-num">01</span><div><span class="pdf-cap-text">robots.txt &amp; RFC 9309</span><span class="pdf-cap-desc">AI bot izinleri ve tarama bütçesi denetimi</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">02</span><div><span class="pdf-cap-text">llms.txt v2 Protokolü</span><span class="pdf-cap-desc">AI modelleri için optimize edilmiş içerik manifestosu</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">03</span><div><span class="pdf-cap-text">Schema.org JSON-LD @graph</span><span class="pdf-cap-desc">Wikidata ve Google Knowledge Graph varlık kilidi</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">04</span><div><span class="pdf-cap-text">İlk Paket AST Bütçesi</span><span class="pdf-cap-desc">İlk ağ paketinde semantik varlık yükleme hızı</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">05</span><div><span class="pdf-cap-text">512-Token RAG Paragrafları</span><span class="pdf-cap-desc">LLM chunking ve ColBERT MaxSim uygunluğu</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">06</span><div><span class="pdf-cap-text">Tekil H1 ve Semantik DOM</span><span class="pdf-cap-desc">Doğru başlık hiyerarşisi ve landmark etiketleri</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">07</span><div><span class="pdf-cap-text">Canonical &amp; URL Hijyeni</span><span class="pdf-cap-desc">Çift indeksleme ve kopya içerik engelleme</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">08</span><div><span class="pdf-cap-text">Security Headers (HSTS/CSP)</span><span class="pdf-cap-desc">Sunucu güvenlik başlıkları ve clickjacking kalkanı</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">09</span><div><span class="pdf-cap-text">SSRF ve Özel IP İzolasyonu</span><span class="pdf-cap-desc">Güvenli public tarama ve altyapı koruması</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">10</span><div><span class="pdf-cap-text">WCAG 2.2 AA Erişilebilirlik</span><span class="pdf-cap-desc">ARIA landmarkları ve kontrast standartları</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">11</span><div><span class="pdf-cap-text">Link Bütünlüğü &amp; HTTP 200</span><span class="pdf-cap-desc">404 çıkmaz yolları ve zincirleme yönlendirmeler</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">12</span><div><span class="pdf-cap-text">AI Marka Atıf Takibi</span><span class="pdf-cap-desc">Perplexity ve ChatGPT aramalarında marka görünürlüğü</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">13</span><div><span class="pdf-cap-text">E-E-A-T Otorite Doğrulaması</span><span class="pdf-cap-desc">Yazar profilleri, kaynak atıfları ve yayıncı kimliği</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">14</span><div><span class="pdf-cap-text">IndexNow Çok Merkezli Dağıtım</span><span class="pdf-cap-desc">Bing, Yandex ve Naver anlık indeksleme tetikleyicisi</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">15</span><div><span class="pdf-cap-text">Rollback ve Geri Alma Güvencesi</span><span class="pdf-cap-desc">Sıfır kesinti ve anında geri alma komutları</span></div></div>
    </div>
  </section>

  <!-- 04 YAPAY ZEKA ARAMA AĞI UYUMLULUĞU (PDF Sayfa 10-12) -->
  <section class="decision-section decision-ai-network" id="ai-network">
    <div class="decision-section-no">04</div>
    <div class="decision-heading">
      <span class="decision-kicker">TÜM YAPAY ZEKA ARAMA BOTLARIYLA %100 UYUMLU</span>
      <h2>Müşteriniz nereden ararsa arasın; sisteminiz cevabı hazır tutar.</h2>
      <p>Dünyanın en büyük yapay zeka arama motorları için özel olarak test edilmiş tarayıcı kuralları.</p>
    </div>
    <div class="pdf-net-grid">
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">OAI-SearchBot</span><span class="pdf-net-badge">OpenAI</span></div><div class="pdf-net-desc">ChatGPT Search için doğrudan kaynak toplama botu. Sitenizin anlık arama sonuçlarında gösterilmesini sağlar.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Google-Extended</span><span class="pdf-net-badge">Google AI</span></div><div class="pdf-net-desc">Gemini ve Google AI Overviews eğitim ve bilgi çekme protokolü. Doğru varlık tanımlarıyla otorite inşa eder.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">ClaudeBot</span><span class="pdf-net-badge">Anthropic</span></div><div class="pdf-net-desc">Claude 3.5 Sonnet ve kurumsal LLM ajanları için temiz veri akışı sağlayan akıllı tarayıcı.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">PerplexityBot</span><span class="pdf-net-badge">Perplexity</span></div><div class="pdf-net-desc">Akademik ve kurumsal araştırmalarda doğrudan dipnot ve web referansı oluşturan bilgi tarayıcısı.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Applebot-Extended</span><span class="pdf-net-badge">Apple</span></div><div class="pdf-net-desc">Apple Intelligence ve Siri üzerinden gelen sesli ve yazılı aramalarda yerel yanıt kaynağı.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Bingbot / Copilot</span><span class="pdf-net-badge">Microsoft</span></div><div class="pdf-net-desc">Microsoft Copilot ve Bing AI arama entegrasyonu için anlık IndexNow protokol desteği.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Meta-ExternalAgent</span><span class="pdf-net-badge">Meta AI</span></div><div class="pdf-net-desc">WhatsApp, Instagram ve Meta AI asistanlarında web içeriğinizin tavsiye edilmesini sağlar.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Amazonbot</span><span class="pdf-net-badge">Amazon</span></div><div class="pdf-net-desc">Alexa ve kurumsal AWS AI sistemleri için ürün ve servis veri modelleme tarayıcısı.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Cohere-ai</span><span class="pdf-net-badge">Enterprise</span></div><div class="pdf-net-desc">Kurumsal RAG ve B2B karar destek modelleri için yüksek doğruluklu bağlam okuyucu.</div></div>
    </div>
  </section>

  <!-- 05 6 ALTYAPI VE GÜVENLİK SÜTUNU (PDF Sayfa 14-16) -->
  <section class="decision-section decision-security-pillars" id="security-pillars">
    <div class="decision-section-no">05</div>
    <div class="decision-heading">
      <span class="decision-kicker">KURUMSAL GÜVENLİK VE MÜHENDİSLİK STANDARTLARI</span>
      <h2>6 Temel Altyapı ve Güvenlik Sütunu Üzerine İnşa Edildi.</h2>
      <p>HTML&amp;HTML, banka ve kurumsal yazılım seviyesinde sıfır hata toleransıyla çalışır.</p>
    </div>
    <div class="pdf-security-grid">
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🛡️</div><div class="pdf-sec-title">SSRF Koruması</div><div class="pdf-sec-desc">Fail-closed IP filtresiyle kurumsal ağ güvenliği</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">📜</div><div class="pdf-sec-title">RFC 9309 Uyum</div><div class="pdf-sec-desc">IETF resmi standartlarında robots.txt yönetişimi</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">⚡</div><div class="pdf-sec-title">İlk Paket AST Sınırı</div><div class="pdf-sec-desc">İlk TCP paketinde en yüksek semantik varlık yoğunluğu</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">📐</div><div class="pdf-sec-title">ColBERT MaxSim</div><div class="pdf-sec-desc">Late-interaction vektör eşleşmesine uygun içerik</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🔄</div><div class="pdf-sec-title">Rollback Garantisi</div><div class="pdf-sec-desc">Tüm kod paketlerinde sıfır kesintili anında geri alma</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🔒</div><div class="pdf-sec-title">SHA-256 İmzası</div><div class="pdf-sec-desc">Kriptografik bütünlük ve değişmezlik doğrulaması</div></div>
    </div>
  </section>

  <!-- 06 NASIL ÇALIŞIR? 4 BASİT ADIM (PDF Sayfa 18-19) -->
  <section class="decision-section decision-workflow" id="workflow-steps">
    <div class="decision-section-no">06</div>
    <div class="decision-heading">
      <span class="decision-kicker">NASIL ÇALIŞIR? SADECE 4 BASİT ADIM</span>
      <h2>Karmaşık teknik süreçleri dakikalar içinde çözüme kavuşturun.</h2>
      <p>Yazılım uzmanı olmanıza gerek yok. Sistemimiz teşhisi koyar, çözümü paketler, ekibinize uygulatır.</p>
    </div>
    <div class="pdf-steps-grid">
      <div class="pdf-step-card"><span class="pdf-step-num">1</span><h3>1. Ücretsiz Tara</h3><p>Web sitenizin adresini girin. 18 bağımsız motor, sitenizin herkese açık web yüzeyini saniyeler içinde analiz etsin.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">2</span><h3>2. Engelleri Gör</h3><p>Yapay zeka modellerinin sitenizi neden okuyamadığını gerçek HTML ve HTTP kanıtlarıyla şeffafça görün.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">3</span><h3>3. Kararını Al</h3><p>Sorun kritikse  Fix Pack paketini edinin. 30+ dosyadan oluşan mühendislik çözüm setini anında indirin.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">4</span><h3>4. Yazılımcına Ver</h3><p>Hazır kodları, test senaryolarını ve Nginx/Apache ayarlarını yazılımcınıza teslim edin; 15 dakikada yayına alsın.</p></div>
    </div>
  </section>

  <!-- 07 NEDEN HTML&HTML? (PDF Sayfa 20-21) -->
  <section class="decision-section decision-why-us" id="why-html">
    <div class="decision-section-no">07</div>
    <div class="decision-heading">
      <span class="decision-kicker">NEDEN BİZİMLE ÇALIŞMALISINIZ?</span>
      <h2>Geleneksel ajans masraflarına ve aylarca süren belirsizliklere son verin.</h2>
    </div>
    <div class="pdf-why-split">
      <div class="pdf-why-focal">
        <span class="pdf-why-badge-pill">FARKIMIZ NETTİR</span>
        <h3>Rapor Satmıyoruz,<br>Ticari Karar ve Ciro Güvencesi Teslim Ediyoruz.</h3>
        <p>Geleneksel danışmanlar saatliği yüzlerce dolara soyut sunumlar yapar ve çözümü sizin üzerinize yıkar. Biz ise dağınık teknik kusurları karar sistemine dönüştürür; yazılımcınızın hemen kuracağı hazır kodu tek seferlik sabit fiyatla veririz.</p>
        <a class="decision-btn decision-btn--light" href="#scanner">Hemen Ücretsiz Teşhis Et →</a>
      </div>
      <div class="pdf-why-list">
        <div class="pdf-why-item"><span class="pdf-why-num">1</span><span><b>5 Saniyede Ticari Karar:</b> Bankacı netliğiyle teknik jargonu 'hangi engel ciromu düşürüyor?' kararına çevirir.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">2</span><span><b>Kaçan Müşteriyi Kurtarma:</b> Yapay zekanın sizi es geçip rakibe yönlendirdiği kritik temas noktalarını kapatır.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">3</span><span><b>Hazır Üretim Kodları:</b> Yazılımcınıza 'bunu araştır' demez; kopyala-yapıştır Nginx, JSON-LD ve robots.txt konfigürasyonu verir.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">4</span><span><b>Rollback Güvencesi:</b> Her çözüm paketi sıfır kesintili geri alma planı içerir; sisteminiz asla kilitlenmez.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">5</span><span><b>Sabit  Fiyat:</b> Danışmanlık faturası veya bitmeyen aylık abonelik yok. Çözüm tek seferlik satın alınır.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">6</span><span><b>30 Gün Ücretsiz Re-Scan:</b> Düzeltmeler uygulandıktan sonra canlı yüzeyde tekrar taranarak kanıtlanır.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">7</span><span><b>Sıfır Kod/Şifre Riski:</b> Kod deponuza veya sunucunuza erişim gerekmez; sadece herkese açık web taranır.</span></div>
      </div>
    </div>
  </section>

  <!-- 08 DOĞRULANMIŞ STANDARTLAR VE REFERANSLAR (PDF Sayfa 22-23) -->
  <section class="decision-section decision-references" id="industry-standards">
    <div class="decision-section-no">08</div>
    <div class="decision-heading">
      <span class="decision-kicker">KÜRESEL OTORİTELER VE STANDARTLAR</span>
      <h2>Kararlarımız ve Algoritmalarımız Resmi Web Standartlarına Dayanır.</h2>
      <p>Ölçümlerimiz uluslararası standart belirleyicilerin yayınladığı resmi şartnamelerle %100 uyumludur.</p>
    </div>
    <div class="pdf-refs-grid">
      <div class="pdf-ref-card"><b>W3C</b><span>World Wide Web Consortium</span></div>
      <div class="pdf-ref-card"><b>IETF</b><span>RFC 9309 Standartları</span></div>
      <div class="pdf-ref-card"><b>Schema.org</b><span>Yapısal Veri Konsorsiyumu</span></div>
      <div class="pdf-ref-card"><b>OpenAI</b><span>SearchBot Spesifikasyonu</span></div>
      <div class="pdf-ref-card"><b>Google Search</b><span>AI Overviews &amp; E-E-A-T</span></div>
      <div class="pdf-ref-card"><b>Wikidata</b><span>Knowledge Graph MID</span></div>
      <div class="pdf-ref-card"><b>Cloudflare</b><span>Edge ve DNS Güvenliği</span></div>
      <div class="pdf-ref-card"><b>NIST</b><span>Altyapı Güvenlik Çerçevesi</span></div>
      <div class="pdf-ref-card"><b>IndexNow</b><span>Anlık Arama İndeksleme</span></div>
      <div class="pdf-ref-card"><b>Paddle</b><span>Global Satıcı Güvencesi</span></div>
    </div>
  </section>

  <!-- 09 GERÇEK ÖRNEK RAPOR (PDF Çıktı Kanıtı) -->
  <section class="decision-section decision-output" id="sample-output">
    <div class="decision-section-no">09</div>
    <div class="decision-output-grid">
      <div>
        <span class="decision-kicker">SATIN ALMADAN ÖNCE ÇIKTIYI GÖR</span>
        <h2>Rapor, “iyi/kötü” demez. Karar verir.</h2>
        <div class="decision-checks">
          <p><b>Bulgu</b><span>Sorun ne?</span></p>
          <p><b>Konum</b><span>Hangi URL / yüzey?</span></p>
          <p><b>Kanıt</b><span>Neye dayanıyor?</span></p>
          <p><b>Etki</b><span>Neyi sınırlıyor?</span></p>
          <p><b>Öncelik</b><span>Önce ne ele alınmalı?</span></p>
        </div>
        <div class="decision-actions">
          <a class="decision-btn decision-btn--primary" href="/enterprise-analyzer/htmlandhtml-ai-report" target="_blank" rel="noopener">Gerçek örnek raporu gör →</a>
          <a class="decision-btn" href="#scanner">Kendi sitemi tara</a>
        </div>
      </div>
      <div class="decision-report-card" aria-label="Örnek bulgu">
        <div class="decision-report-top"><span></span><span></span><span></span><em>ÖRNEK BULGU</em></div>
        <div class="decision-report-body">
          <div class="decision-severity">TECH-CANON-001 · YÜKSEK</div>
          <h3>Canonical etiketi eksik</h3>
          <p>Arama sistemleri hangi URL'nin ana sürüm olduğunu daha belirsiz okuyabilir.</p>
          <div class="decision-evidence"><b>KANIT</b><code>&lt;head&gt; içinde rel="canonical" bulunamadı</code></div>
          <div class="decision-paid"><b> FIX PACK</b><span>Kök neden → exact fix → test → rollback → re-scan</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 10 TEKLİF & FİYATLANDIRMA (Ücretsiz Teşhis vs  Uygulama) -->
  <section class="decision-section decision-offer" id="offer">
    <div class="decision-section-no">10</div>
    <div class="decision-heading">
      <span class="decision-kicker">ÜCRETSİZ TEŞHİS → ÜCRETLİ UYGULAMA</span>
      <h2>Analiz için değil; uygulanabilir çözüm paketi için ödeme.</h2>
    </div>
    <div class="decision-offer-grid">
      <article class="decision-offer-card">
        <span>ÜCRETSİZ</span>
        <h3>Sorunun ne olduğunu görün.</h3>
        <ul><li>Bulgu</li><li>URL / konum</li><li>Kanıt</li><li>Öncelik</li><li>Genel çözüm yönü</li></ul>
        <a href="#scanner">Ücretsiz tara →</a>
      </article>
      <article class="decision-offer-card decision-offer-card--paid">
        <span> · TEK SEFERLİK</span>
        <h3>Nasıl düzeltileceğini ekibinize verin.</h3>
        <ul><li>Kök neden</li><li>Exact fix / konfigürasyon</li><li>Uygulama sırası</li><li>Acceptance + regression test</li><li>Rollback + 30 gün içinde 1 re-scan</li></ul>
        <a href="/tr/fiyatlandirma/">Fix Pack'i incele →</a>
      </article>
    </div>
  </section>

  <!-- 11 GÜVEN VE ETİK KANIT KATMANI -->
  <section class="decision-section decision-trust" id="trust">
    <div class="decision-section-no">11</div>
    <div class="decision-trust-grid">
      <div class="decision-trust-copy">
        <span class="decision-kicker">GÜVEN SÖYLEM DEĞİL, KANIT KATMANIDIR</span>
        <h2>Ne ölçtüğümüzü, neyi ölçemediğimizi ve neyi garanti etmediğimizi açıkça gösteririz.</h2>
        <p>AI sıralaması, citation, trafik veya gelir garantisi verilmez. Üçüncü taraf model davranışı kontrol edilemez. Public crawl ile ölçülemeyen codebase kusuru uydurulmaz.</p>
      </div>
      <div class="decision-trust-points">
        <article><b>01</b><span>Gerçek URL / HTTP / HTML kanıtı</span></article>
        <article><b>02</b><span>NOT_MEASURED ve REQUIRES_CONTEXT görünür</span></article>
        <article><b>03</b><span>Kaynak koduna müdahale yok</span></article>
        <article><b>04</b><span>Methodology + sample report açık</span></article>
      </div>
    </div>
  </section>

  <!-- 12 NİHAİ DÖNÜŞÜM ÇAĞRISI (CTA) -->
  <section class="decision-section decision-close" id="final-cta">
    <div class="decision-section-no">12</div>
    <div>
      <span class="decision-kicker">İLK KARAR 5 SANİYEDE NET OLSUN</span>
      <h2>Sitenizin AI aramalarında neden zayıf kaldığını ücretsiz görün.</h2>
      <p>Sorun gerçekse 'a yazılımcınızın uygulayacağı düzeltme paketini alın.</p>
      <div class="decision-actions">
        <a class="decision-btn decision-btn--light" href="#scanner">Sitemi ücretsiz tara →</a>
        <a class="decision-btn decision-btn--ghost" href="/tr/fiyatlandirma/"> Fix Pack</a>
      </div>
    </div>
    <div class="decision-orbits" aria-hidden="true">
      <span>Müşteri</span><span>Güven</span><span>Dağıtım</span><span>Referans</span><span>Satış</span>
    </div>
  </section>
</section>

<!-- RESULTS -->
<section id="result" class="results" hidden>
  <div class="result-head">
    <div class="result-head-summary">
      <div class="result-head-info">
        <span class="eyebrow" data-i18n="result">TARAMA SONUCU</span>
        <h2 id="resultDomain">—</h2>
        <p id="resultMeta">—</p>
      </div>
      <div class="result-head-score">
        <div class="total-score">
          <strong id="overallScore">0</strong>
          <span>/100</span>
        </div>
      </div>
    </div>
    <div class="result-head-actions">
      <button type="button" class="btn-pdf-export" id="btnPdfExport" aria-label="Raporu PDF Olarak İndir">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span data-i18n="downloadPdf">📄 PDF İndir</span>
      </button>
      <button type="button" class="btn-pdf-export btn-zip-export" id="btnZipExport" style="background:#0284c7;border-color:#0284c7;color:#ffffff;" aria-label="30+ Dosyalık Çözüm ZIP Paketi">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
        <span>📦 30+ Dosya ZIP İndir</span>
      </button>
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
        <h3 data-i18n="findings">Teknik Kanıtlı Bulgular</h3>
        <span id="findingCount"></span>
      </div>
      <div id="findingsList" class="findings"></div>
    </div>
    <aside class="mandate-card">
      <span class="eyebrow" data-i18n="paidResolution">ONARIM SETİ</span>
      <h3 data-i18n="mandateTitle">Kontrol ücretsiz.<br>AI Görünürlük Onarım Seti $99.</h3>
      <p data-i18n="mandateCopy">Aynı domain yeniden taranır; her geçerli bulgu ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK kod ve konfigürasyon şablonlarına dönüştürülür.</p>
      <ul>
        <li data-i18n="m1">P0–P3 uygulama sırası</li>
        <li data-i18n="m2">Issue ID + teknik kanıt + güven seviyesi</li>
        <li data-i18n="m3">Acceptance + regression test</li>
        <li data-i18n="m4">Rollback + stop conditions</li>
        <li data-i18n="m5">30 gün içinde 1 re-scan</li>
      </ul>
      <div class="price">
        <small data-i18n="oneSite">1 domain | Sınırsız indirme | 30 gün içinde yeniden tarama</small>
        <strong>$99</strong>
      </div>
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Onarım Setini İndir — $99 →</a>
      <small class="note" data-i18n="checkoutNote">Kaynak dosya adı public taramadan uydurulmaz; codebase bağlamı varsa dosya seviyesine iner.</small>
    </aside>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">SSS</span>
    <h2 data-i18n="faqTitle">Sık sorulan sorular</h2>
  </header>
  <details><summary data-i18n="q1">Ücretsiz taramada ne saklanır? yol haritasıler açık mı?</summary><p data-i18n="a1">Problem veya yol haritasıler saklanmaz. URL, severity, confidence, evidence ve kategori ile birlikte tüm çözüm kodları %100 açık sunulur. Ayrıca tam rapor PDF çıktısı ve 30+ dosyalık ZIP çözüm paketi tek tıkla indirilebilir ($99 kurumsal lisans paketi dahil).</p></details>
  <details><summary data-i18n="q2">100/100 Google veya AI citation garantisi mi?</summary><p data-i18n="a2">Hayır. Skor yalnızca ölçülen kontrollerin durumudur. Ranking, trafik veya AI citation garantisi değildir.</p></details>
  <details><summary data-i18n="q3">llms.txt zorunlu mu?</summary><p data-i18n="a3">Hayır. llms.txt bir web standardı değil, gelişmekte olan bir öneridir. Bu nedenle ayrı PROPOSAL etiketi ve düşük ağırlıkla değerlendirilir.</p></details>
  <details><summary data-i18n="q4">Core Web Vitals ölçülüyor mu?</summary><p data-i18n="a4">Bu sürüm HTML/HTTP performans hijyenini ölçer. Güvenilir LCP/INP/CLS için CrUX/PageSpeed verisi gerekir; yoksa NOT_MEASURED döner, değer uydurulmaz.</p></details>
  <details><summary data-i18n="q5">Tarayıcı neden bazı siteleri reddeder?</summary><p data-i18n="a5">SSRF riskine karşı localhost/private/reserved hedefler, private DNS çözümü, non-standard portlar ve redirect ile private ağa geçiş fail-closed engellenir.</p></details>
</section>
</main>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="139" height="24">
      </a>
      <p data-i18n="footerTag">Teşhis ücretsizdir. Otomatik kod ve konfigürasyon paketi asıl üründür.</p>
</div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="/tr/platform/">Platform</a></li>
        <li><a href="/tr/fix-mandate/">Yol Haritası</a></li>
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
        <li><a href="/tr/iletisim/">İletişim</a></li>
        <li><a href="/tr/kullanim-kosullari/">Kullanım Koşulları</a></li>
        <li><a href="/tr/gizlilik/">Gizlilik Politikası</a></li>
        <li><a href="/tr/iade-politikasi/">İade ve İptal Politikası</a></li>
        <li><a href="/tr/teslimat-politikasi/">Teslimat Politikası</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 HTML&amp;HTML. Tüm hakları saklıdır. All rights reserved. Deterministik yapay zeka ve web sitesi analiz platformu. Güncellenme / Son revizyon tarihi: 2026-09-08. Ödemeler ve faturalandırma yetkili Satıcı ve Aracı Kurum (Merchant of Record) Paddle.com tarafından yürütülür.</p>
  </div>
</footer>

<!-- macOS Floating Glass Dock -->
<nav class="hh-floating-dock" aria-label="Hızlı Erişim Menüsü">
  <a href="#scanner" class="hh-dock-item primary">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <span>Tara</span>
  </a>
  <span class="hh-dock-divider"></span>
  <a href="#result" id="hhDockReportLink" class="hh-dock-item">
    <span>📊 Rapor</span>
    <span id="dockScoreBadge" class="hh-dock-score-badge" style="display:none;"></span>
  </a>
  <a href="#pipeline" class="hh-dock-item">Süreç</a>
  <button type="button" id="hhDockMenuBtn" class="hh-dock-item" aria-label="Menüyü Aç">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    <span>Menü</span>
  </button>
  <span class="hh-dock-divider"></span>
  <button type="button" class="hh-dock-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Yukarı Çık">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
  </button>
</nav>
<script src="/assets/js/enterprise-runtime.js?v=3"></script>
<script src="/assets/js/mobile-space-runtime.js?v=hh5" defer></script>
<script src="/assets/js/profound-canvas.js?v=20260920_27" defer></script>
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function() {});
    });
  }
</script>
</body>
</html>
'''

    en_html = '''<!doctype html>
<html lang="en" translate="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=5">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="mobile-web-app-capable" content="yes">
<meta name="format-detection" content="telephone=yes">
<!-- 1. ZERO-FLASH SCRIPT — Blocking before CSS -->
<script>
  (function() {
    'use strict';
    try {
      localStorage.setItem('hh-theme', 'dark');
      localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({theme: 'dark', effective: 'dark'}));
      document.cookie = 'htmlandhtml-theme=' + encodeURIComponent(JSON.stringify({theme: 'dark'})) + '; path=/; max-age=31536000; SameSite=Lax; Secure';
    } catch(e) {}
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  })();
</script>
<title>AI Search Technical Diagnostic &amp; Fix Platform | HTML&amp;HTML</title>
<meta name="description" content="Audit your website for ChatGPT, Gemini, Claude and Perplexity visibility. Get evidence from 18 engines and 105 checks; unlock the implementation pack for $99.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="alternate" type="text/markdown" href="https://htmlandhtml.com/index.md">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/en/">
<meta property="og:title" content="HTML&amp;HTML — Web Standards Diagnostic &amp; Automated Config Generator">
<meta property="og:description" content="18-engine public website diagnosis with automated configuration packages and code templates.">
<meta name="theme-color" content="#14151a">
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=hh5">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=hh5">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=hh5">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=hh5">
<link rel="icon" href="/favicon.ico?v=hh5" sizes="any">
<link rel="manifest" href="/manifest.webmanifest">

<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/validator.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/theme.css?v=20260920_27">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=2026092504_27">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">
<link rel="stylesheet" href="/assets/css/profound-experience.css?v=20260920_27">
<meta name="author" content="HTML&amp;HTML">
<link rel="author" href="https://htmlandhtml.com/en/about/">
<script src="/assets/js/enterprise-theme-engine.js?v=20260920_27" defer></script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://htmlandhtml.com/#website",
      "url": "https://htmlandhtml.com/en/",
      "name": "HTML&HTML",
      "publisher": { "@id": "https://htmlandhtml.com/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": ["Organization", "Corporation", "SoftwareApplication"],
      "@id": "https://htmlandhtml.com/#organization",
      "name": "HTML&HTML",
      "url": "https://htmlandhtml.com/en/",
      "logo": "https://htmlandhtml.com/assets/logo.png?v=hh7",
      "areaServed": ["TR", "US", "GB", "DE", "Global"],
      "sameAs": [
        "https://www.wikidata.org/wiki/Q116503894"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "url": "https://htmlandhtml.com/en/about/",
        "availableLanguage": ["Turkish", "English"]
      },
      "author": {
        "@type": "Organization",
        "name": "HTML&HTML Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "HTML&HTML"
      },
      "datePublished": "2026-01-01T00:00:00Z",
      "dateModified": "2026-09-08T00:00:00Z",
      "description": "Customer-first AI search visibility platform for GEO, AEO, LLMO, AAO, RAG, and E-E-A-T readiness."
    },
    {
      "@type": "ItemList",
      "@id": "https://htmlandhtml.com/#tools-carousel",
      "name": "AI Search Visibility Tools & Diagnostic Suite",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Website AI Search Scanner", "url": "https://htmlandhtml.com/en/website-scanner/" },
        { "@type": "ListItem", "position": 2, "name": "AI Search Visibility (GEO/AEO/LLMO)", "url": "https://htmlandhtml.com/en/ai-search-visibility/" },
        { "@type": "ListItem", "position": 3, "name": "llms.txt Validator & Testing Tool", "url": "https://htmlandhtml.com/en/llms-txt-validator/" },
        { "@type": "ListItem", "position": 4, "name": "AI Website Readiness & 18-Engine Audit", "url": "https://htmlandhtml.com/en/ai-website-readiness/" },
        { "@type": "ListItem", "position": 5, "name": "AI Search Visibility Roadmap ($99)", "url": "https://htmlandhtml.com/en/pricing/" }
      ]
    },
    {
      "@type": "WebApplication",
      "@id": "https://htmlandhtml.com/#app",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/en/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "datePublished": "2026-01-01T00:00:00Z",
      "dateModified": "2026-09-08T00:00:00Z",
      "publisher": { "@id": "https://htmlandhtml.com/#organization" },
      "offers": [
        { "@type": "Offer", "name": "Full Website Diagnosis", "price": "0", "priceCurrency": "USD" },
        { "@type": "Offer", "name": "AI Search Visibility Roadmap", "price": "99", "priceCurrency": "USD" }
      ]
    }
  ]
}

</script>
<script src="/assets/js/validator.js?v=17" defer></script>
<script src="/assets/js/theme.js?v=20260920_27"></script>
<script src="/assets/js/ai-positioning.js?v=1" defer></script>
<link rel="stylesheet" href="/assets/css/mobile-space-grade.css?v=20260920_27">
</head>
<body class="enterprise-ui">
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="162" height="28">
    </a>
    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="/en/website-scanner/">Free Audit</a>
      <a href="/en/ai-search-visibility/">How It Works</a>
      <a href="/en/pricing/" data-i18n="navPrice">Implementation Pack ($99)</a>
      <a href="/en/referral/">Refer a Team</a>
    </nav>
    <div class="nav-actions">
      <a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>
      <div class="langs">
        <button data-lang="tr">TR</button><span>/</span><button data-lang="en" class="active">EN</button>
      </div>
      <button type="button" class="hh-mobile-menu-btn" id="hhMobileMenuBtn" aria-label="Open Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  </div>
</header>

<!-- Mobil Cyber Drawer Navigasyon -->
<div id="hhCyberDrawer" class="hh-cyber-drawer" aria-hidden="true">
  <div class="hh-drawer-head">
    <div class="brand">
      <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="124" height="22">
      <span class="hh-space-telemetry-led">● RADAR V4.1</span>
    </div>
    <button type="button" class="hh-drawer-close" id="hhDrawerClose" aria-label="Close Menu">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>
  <div class="hh-drawer-links">
    <a href="#scanner" class="hh-drawer-link highlight">
      <span>⚡ Free AI Scan</span>
      <span class="link-tag">Scan Now</span>
    </a>
    <a href="/tr/site-tarama/" class="hh-drawer-link">
      <span>🔍 Site Scan &amp; Diagnostics</span>
      <span class="link-tag">Free</span>
    </a>
    <a href="/tr/yapay-zeka-arama-gorunurlugu/" class="hh-drawer-link">
      <span>🌐 AI Visibility (GEO)</span>
    </a>
    <a href="/tr/llms-txt-validator/" class="hh-drawer-link">
      <span>📑 llms.txt Validator</span>
    </a>
    <a href="/tr/llms-txt-haberler/" class="hh-drawer-link">
      <span>📰 News &amp; Updates</span>
    </a>
    <a href="/tr/sozluk/" class="hh-drawer-link">
      <span>📖 AI SEO Glossary</span>
    </a>
    <a href="/tr/fiyatlandirma/" class="hh-drawer-link highlight">
      <span>💎 Fix Pack ($99)</span>
      <span class="link-tag" style="background:#22c55e;color:#04130a;">Full Solution</span>
    </a>
    <a href="/openapi.json" class="hh-drawer-link">
      <span>⚙️ OpenAPI &amp; API Docs</span>
    </a>
    <a href="/tr/" class="hh-drawer-link">
      <span>🌍 Türkçe</span>
      <span class="link-tag">TR</span>
    </a>
  </div>
</div>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero decision-hero profound-constellation-wrap" id="scanner">
  <canvas id="profoundConstellationCanvas" class="profound-constellation-canvas"></canvas>
  <div class="profound-hero-content">
  <div class="kicker"><span></span><b data-i18n="kicker">AI SEARCH DECISION &amp; REVENUE PROTECTION SYSTEM</b></div>
  <h1 data-i18n="heroTitle">Why Is Your Website Missing From AI Search?</h1>
  <p class="hero-answer" data-i18n="heroCopy">When buyers ask ChatGPT, Perplexity or Siri for trusted vendors in your industry, why does AI recommend your competitor? In 90 seconds, we pinpoint the exact trust and distribution barriers that choke your pipeline—and deliver the drop-in engineering kit to recover lost revenue.</p>

  <div class="decision-hero-proof" aria-label="Free scan boundaries">
    <span>Free diagnosis</span><span>Real URL / HTTP / HTML evidence</span><span>No source-code access</span>
  </div>

  <div class="pdf-hero-badges" aria-label="Key Value Pillars">
    <div class="pdf-hero-badge"><i>⚡</i><span>5-Second Executive Clarity</span></div>
    <div class="pdf-hero-badge"><i>🛡️</i><span>W3C &amp; RFC 9309 Empirical Evidence</span></div>
    <div class="pdf-hero-badge"><i>📦</i><span> Fix Pack: Ready-to-Deploy Code</span></div>
  </div>

  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <div class="hh-input-wrapper">
          <span class="hh-input-radar-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle><line x1="12" y1="3" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="21"></line><line x1="3" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="21" y2="12"></line></svg>
          </span>
          <label for="domainInput" class="sr-only">Target website domain</label>
          <input id="domainInput" aria-label="Website or domain to scan" autocomplete="off" autocorrect="off" autocapitalize="off" inputmode="url" spellcheck="false" placeholder="https://yourcompany.com/" required>
          <button type="button" class="hh-input-clear-btn" id="hhInputClearBtn" aria-label="Clear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <button type="button" class="hh-input-paste-btn" id="hhInputPasteBtn" aria-label="Paste from clipboard">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            <span>Paste</span>
          </button>
        </div>
        <button id="scanButton" type="submit"><b data-i18n="scan">Scan My Site Free</b><span class="btn-arrow" aria-hidden="true">→</span><span class="sr-only">Scan My Site Free</span></button>
      </div>
      <div class="scan-chips">
        <span>Examples:</span>
        <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
        <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
        <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
      </div>
      <small data-i18n="scanHint">No signup · No password · No source-code access · Only public web surfaces are scanned.</small>
    </form>
    <div id="scanStatus" class="status" hidden></div>
  </div>

  <div class="signals decision-signals">
    <span>DISCOVERABILITY</span><i></i><span>UNDERSTANDING</span><i></i><span>SOURCE ELIGIBILITY</span><i></i><span>CONVERSION PATH</span>
  </div>
  </div>
</section>

<!-- CUSTOMER DECISION HOMEPAGE V2 -->
<section class="decision-shell" id="customer-story" aria-label="HTML&HTML customer decision system">

  <!-- 00 PROFOUND AGENTIC WORKBENCH & VISUAL SUITE -->
  <section class="profound-workbench-section" id="profound-architecture">
    <div class="decision-section-no">00</div>
    <div class="decision-heading">
      <span class="decision-kicker">BUILT FOR THE AGENTIC ERA · PROFOUND ARCHITECTURE</span>
      <h2>Manage every touchpoint where AI answers customers across search platforms.</h2>
      <p>Know what people ask AI about your category, deploy technical governance agents across 18 deterministic engines, and measure citation impact on one single screen.</p>
    </div>

    <!-- PROFOUND 3-PANE WORKBENCH MOCKUP -->
    <div class="profound-workbench-mockup" aria-label="Profound Model Agentic Workbench Preview">
      <div class="workbench-window-bar">
        <div class="window-dots">
          <span class="window-dot dot-red"></span>
          <span class="window-dot dot-yellow"></span>
          <span class="window-dot dot-green"></span>
        </div>
        <div class="workbench-title-bar">
          <span>HTML&amp;HTML Agentic Workspace</span>
          <span class="badge-live">● SYSTEM ACTIVE</span>
        </div>
      </div>
      <div class="workbench-body">
        <!-- Left Sidebar -->
        <div class="workbench-sidebar">
          <div class="wb-workspace-header">
            <span>⚡ HTML&amp;HTML OS</span>
          </div>
          <div class="wb-nav-group">
            <div class="wb-nav-title">Workspace</div>
            <div class="wb-nav-item active">🤖 AI Marketer</div>
            <div class="wb-nav-item">📊 Agent Analytics</div>
            <div class="wb-nav-item">🎯 Context Manager</div>
          </div>
          <div class="wb-nav-group">
            <div class="wb-nav-title">Agents &amp; Diagnostics</div>
            <div class="wb-nav-item">⚙️ 18-Engine Suite</div>
            <div class="wb-nav-item">🔍 FactCheck Engine</div>
            <div class="wb-nav-item">📈 AI Benchmarking</div>
          </div>
        </div>

        <!-- Center Chat Pane -->
        <div class="workbench-chat">
          <div class="wb-chat-user">
            <strong>User Prompt:</strong><br>
            "Create an AI search landing page for our category and optimize it for ChatGPT, Claude, and Perplexity crawlers."
          </div>
          <div class="wb-chat-agent">
            <div class="wb-agent-step">✓ 18 Deterministic Engines Validated (0 Defect)</div>
            <div class="wb-agent-step">✓ Schema.org @graph &amp; llms.txt v2 Generated</div>
            <div class="wb-agent-step">✓ ColBERT MaxSim Semantic Score: 94/100</div>
            <strong>Autonomous Agent Output:</strong> Landing page synthesized, formatted within initial packet AST budget, and piped to live preview.
          </div>
        </div>

        <!-- Right Live Preview Pane -->
        <div class="workbench-preview">
          <div class="wb-preview-card">
            <div class="wb-preview-banner">
              <span>⚡ LIVE AGENT RENDERED PREVIEW</span>
            </div>
            <div class="wb-preview-content">
              <h4>Next-Gen AI Search Experience</h4>
              <p>Fully crawlable and directly citeable landing page architecture optimized for ChatGPT, Claude, and Perplexity.</p>
              <div class="wb-preview-btn">Deploy Agent</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROFOUND 3-COLUMN ARCHITECTURE -->
    <div class="profound-three-columns">
      <div class="profound-col">
        <div class="col-num">01 / TRACK</div>
        <h3>Know What People Ask AI</h3>
        <p>Discover how answer engines (ChatGPT, Claude, Gemini, Perplexity) synthesize your domain and where competitors capture your branded demand.</p>
      </div>
      <div class="profound-col">
        <div class="col-num">02 / DEPLOY</div>
        <h3>Deploy Your AI Defense Agents</h3>
        <p>Instantly deploy technical fixes, llms.txt v2 endpoints, and authoritative Schema.org knowledge graphs to win AI citations.</p>
      </div>
      <div class="profound-col">
        <div class="col-num">03 / MEASURE</div>
        <h3>Measure Results from One Screen</h3>
        <p>Quantify visibility, resolve crawl errors with our  Fix Pack, and protect your commercial revenue from dark-pool AI erosion.</p>
      </div>
    </div>

    <!-- PROFOUND VISUAL BENCHMARK & ANALYTICS CARDS (GRAPHICS MATCHING TRYPROFOUND.COM) -->
    <div class="profound-visual-grid">
      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Prove Impact on AI-Driven Traffic</h3>
          <p>Track bot visit trends from OpenAI ChatGPT, Meta LLaMA, Anthropic Claude, and Perplexity. Correlate crawler frequency directly with citation growth.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/agent-analytics.png" alt="AI Bot Traffic and Agent Analytics" loading="lazy" width="600" height="240">
        </div>
        <a href="/en/website-scanner/" class="profound-card-cta">See Agent Analytics →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Benchmark Your Site Against Peers</h3>
          <p>Compare answer engine visibility across your industry. Maintain top 82nd percentile performance and win direct brand citations over rivals.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/benchmarking.png" alt="AI Search Benchmarking Gauge (82nd Percentile)" loading="lazy" width="600" height="240">
        </div>
        <a href="/en/website-scanner/" class="profound-card-cta">See Benchmarking →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>Verify the Accuracy of AI Claims</h3>
          <p>Stop AI hallucinations and misstatements about your business. Connect LLM responses directly to verifiable W3C citations with deterministic FactCheck.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/factcheck.png" alt="AI Claim Verification and Hallucination Prevention" loading="lazy" width="600" height="240">
        </div>
        <a href="/en/website-scanner/" class="profound-card-cta">See FactCheck →</a>
      </div>

      <div class="profound-visual-card">
        <div class="profound-card-info">
          <h3>AI Shopping &amp; E-Commerce Visibility</h3>
          <p>Ensure your products rank first in ChatGPT Shopping and conversational shopping agents with rich structured data and direct merchant feeds.</p>
        </div>
        <div class="profound-card-img-wrap">
          <img src="/assets/img/profound/shopping.png" alt="ChatGPT Shopping and AI E-Commerce Visibility" loading="lazy" width="600" height="240">
        </div>
        <a href="/en/pricing/" class="profound-card-cta">See E-Commerce Pack →</a>
      </div>
    </div>
  </section>

  <!-- 01 EXECUTIVE DIAGNOSIS (Understood in 5 Seconds & 5 Decision Questions) -->
  <section class="decision-section decision-diagnosis" id="commercial-diagnosis">
    <div class="decision-section-no">01</div>
    <div class="decision-heading">
      <span class="decision-kicker">IF IT DOESN'T SELL, FIND THE BROKEN STEP: 5 CORE DECISION PILLARS</span>
      <h2>Traffic may not be the problem. Find where the decision breaks.</h2>
      <p>Just as a credit committee underwrites corporate risk, AI engines evaluate your website: Are claims consistent? Is evidence verifiable? Is machine-data missing? HTML&amp;HTML does not produce vanity reports; we isolate which step breaks customer and AI decisions using hard web proof.</p>
    </div>
    <div class="decision-question-grid">
      <article><b>01</b><h3>Customer</h3><p>Can buyers understand the offer in 5 seconds?</p><span>If value is ambiguous, buyers leave and LLMs fail to synthesize your solution, passing leads to rivals.</span></article>
      <article><b>02</b><h3>Trust</h3><p>Is visible evidence supporting your claims?</p><span>Without verifiable W3C and RFC compliance, commercial decisions stall and AI models refuse citation.</span></article>
      <article><b>03</b><h3>Distribution</h3><p>Can Google and AI systems read the site?</p><span>If robots.txt and llms.txt are broken, AI crawlers bypass your domain—rendering you invisible to 40% of the market.</span></article>
      <article><b>04</b><h3>Reference</h3><p>Can buyers inspect a real example output?</p><span>Definitive Schema.org graphs and Wikidata consensus build institutional trust far beyond marketing promises.</span></article>
      <article><b>05</b><h3>Sales channel</h3><p>Does the offer lead to one clear next action?</p><span>Traffic must convert directly into an automated, drop-in engineering package deployable in 15 minutes.</span></article>
    </div>
  </section>

  <!-- 02 WHO WE ARE & ARCHITECTURAL DECISION SYSTEM -->
  <section class="decision-section decision-about" id="about-architecture">
    <div class="decision-section-no">02</div>
    <div class="decision-heading">
      <span class="decision-kicker">WHO WE ARE &amp; WHAT WE SOLVE</span>
      <h2>Not another audit report; an implementable Decision &amp; Engineering System.</h2>
      <p>Traditional agencies sell 200-page PDF audits with vague advice and leave implementation to you. HTML&amp;HTML transforms complex technical barriers into 5-second decision clarity and drop-in code packages that your engineering team can deploy in 15 minutes.</p>
    </div>
    <div class="pdf-about-grid">
      <div class="pdf-about-cards">
        <div class="pdf-card-capsule">
          <h3>⚡ Decision-Led Methodology</h3>
          <p>We do not score 'good or bad'. We pinpoint why AI engines (ChatGPT, Gemini, Claude, Perplexity) ignore your brand through four exact questions: What is broken? What is the evidence? What is the revenue impact? How to fix it?</p>
        </div>
        <div class="pdf-card-capsule">
          <h3>🛡️ 100% Deterministic Evidence</h3>
          <p>Zero hallucinations or random scores. Concrete evidence derived from real URLs, HTTP response headers, DOM hierarchy and TCP/TLS AST budgets under W3C and IETF RFC standards.</p>
        </div>
        <div class="pdf-card-capsule">
          <h3>📦 Production-Ready Engineering Code</h3>
          <p>No vague consultancy. We provide drop-in Nginx/Apache directives, Schema.org JSON-LD graphs, llms.txt v2 manifests and automated rollback scripts.</p>
        </div>
      </div>
      <div class="pdf-ecosystem-box">
        <div>
          <div class="pdf-ecosystem-title">AI Search Discovery Ecosystem</div>
          <div class="pdf-ecosystem-desc">Search habits have shifted. Buyers ask ChatGPT, Perplexity and Siri directly instead of scrolling search engines. We ensure your site is qualified and cited as the authoritative source.</div>
        </div>
        <div class="pdf-ecosystem-logos">
          <div class="pdf-eco-logo">OpenAI<span>ChatGPT</span></div>
          <div class="pdf-eco-logo">Google<span>Gemini / AIO</span></div>
          <div class="pdf-eco-logo">Anthropic<span>Claude</span></div>
          <div class="pdf-eco-logo">Perplexity<span>Pro Search</span></div>
          <div class="pdf-eco-logo">Microsoft<span>Copilot</span></div>
          <div class="pdf-eco-logo">Apple<span>Intelligence</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 03 15 CAPABILITIES MENU -->
  <section class="decision-section decision-capabilities" id="capabilities-catalog">
    <div class="decision-section-no">03</div>
    <div class="decision-heading">
      <span class="decision-kicker">15 ESSENTIAL CAPABILITY &amp; VISIBILITY MODULES</span>
      <h2>Every critical touchpoint between your website and AI search engines.</h2>
      <p>15 core engineering components ensuring search bots and LLM agents index, understand, and cite your domain.</p>
    </div>
    <div class="pdf-caps-grid">
      <div class="pdf-cap-pill"><span class="pdf-cap-num">01</span><div><span class="pdf-cap-text">robots.txt &amp; RFC 9309</span><span class="pdf-cap-desc">AI crawler governance and crawl budget defense</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">02</span><div><span class="pdf-cap-text">llms.txt v2 Protocol</span><span class="pdf-cap-desc">Machine-readable content manifesto for LLMs</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">03</span><div><span class="pdf-cap-text">Schema.org JSON-LD @graph</span><span class="pdf-cap-desc">Wikidata &amp; Google Knowledge Graph MID anchors</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">04</span><div><span class="pdf-cap-text">Initial Packet AST Budget</span><span class="pdf-cap-desc">High-priority semantic entity delivery in initial packet</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">05</span><div><span class="pdf-cap-text">512-Token RAG Paragraphs</span><span class="pdf-cap-desc">LLM chunking and ColBERT MaxSim alignment</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">06</span><div><span class="pdf-cap-text">Single H1 &amp; Semantic DOM</span><span class="pdf-cap-desc">Strict heading hierarchy and landmark tags</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">07</span><div><span class="pdf-cap-text">Canonical &amp; URL Hygiene</span><span class="pdf-cap-desc">Eliminate duplicate indexing and redirect loops</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">08</span><div><span class="pdf-cap-text">Security Headers (HSTS/CSP)</span><span class="pdf-cap-desc">Server-grade defense against clickjacking and spoofing</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">09</span><div><span class="pdf-cap-text">SSRF &amp; Private IP Isolation</span><span class="pdf-cap-desc">Safe public web surface crawling &amp; perimeter security</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">10</span><div><span class="pdf-cap-text">WCAG 2.2 AA Accessibility</span><span class="pdf-cap-desc">ARIA landmarks, focus rings and contrast standards</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">11</span><div><span class="pdf-cap-text">Link Integrity &amp; HTTP 200</span><span class="pdf-cap-desc">Live probes eliminating 404 dead ends</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">12</span><div><span class="pdf-cap-text">AI Brand Mention Tracking</span><span class="pdf-cap-desc">Measure domain citations in ChatGPT and Perplexity</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">13</span><div><span class="pdf-cap-text">E-E-A-T Authority Probes</span><span class="pdf-cap-desc">Author profiles, scientific citations, publisher trust</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">14</span><div><span class="pdf-cap-text">IndexNow Multi-Hub Broadcast</span><span class="pdf-cap-desc">Instant notification pipeline for Bing, Yandex, Naver</span></div></div>
      <div class="pdf-cap-pill"><span class="pdf-cap-num">15</span><div><span class="pdf-cap-text">Zero-Downtime Rollback Plan</span><span class="pdf-cap-desc">Guaranteed zero-risk recovery scripts for every change</span></div></div>
    </div>
  </section>

  <!-- 04 AI SEARCH NETWORK COMPATIBILITY -->
  <section class="decision-section decision-ai-network" id="ai-network">
    <div class="decision-section-no">04</div>
    <div class="decision-heading">
      <span class="decision-kicker">100% COMPATIBLE WITH GLOBAL AI CRAWLERS</span>
      <h2>Wherever buyers search; your architecture delivers verified answers.</h2>
      <p>Independently verified crawler rules and access governance for global AI search engines.</p>
    </div>
    <div class="pdf-net-grid">
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">OAI-SearchBot</span><span class="pdf-net-badge">OpenAI</span></div><div class="pdf-net-desc">Direct search ingestion bot for ChatGPT Search. Powers instant live answers and citations.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Google-Extended</span><span class="pdf-net-badge">Google AI</span></div><div class="pdf-net-desc">Feeds Gemini and Google AI Overviews. Structured data establishes verifiable entity authority.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">ClaudeBot</span><span class="pdf-net-badge">Anthropic</span></div><div class="pdf-net-desc">High-fidelity content ingest bot for Claude 3.5 Sonnet and enterprise AI agents.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">PerplexityBot</span><span class="pdf-net-badge">Perplexity</span></div><div class="pdf-net-desc">Deep-research bot generating footnotes, citations and corporate evaluation summaries.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Applebot-Extended</span><span class="pdf-net-badge">Apple</span></div><div class="pdf-net-desc">Native knowledge provider for Apple Intelligence and Siri across millions of consumer devices.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Bingbot / Copilot</span><span class="pdf-net-badge">Microsoft</span></div><div class="pdf-net-desc">Microsoft Copilot and Bing AI search engine integration backed by real-time IndexNow protocol.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Meta-ExternalAgent</span><span class="pdf-net-badge">Meta AI</span></div><div class="pdf-net-desc">Recommends web solutions and services across WhatsApp, Instagram and Meta AI assistant.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Amazonbot</span><span class="pdf-net-badge">Amazon</span></div><div class="pdf-net-desc">Commercial knowledge crawler for Alexa and enterprise AWS generative search models.</div></div>
      <div class="pdf-net-card"><div class="pdf-net-header"><span class="pdf-net-name">Cohere-ai</span><span class="pdf-net-badge">Enterprise</span></div><div class="pdf-net-desc">High-accuracy context extractor for enterprise RAG and B2B decision systems.</div></div>
    </div>
  </section>

  <!-- 05 6 INFRASTRUCTURE & SECURITY PILLARS -->
  <section class="decision-section decision-security-pillars" id="security-pillars">
    <div class="decision-section-no">05</div>
    <div class="decision-heading">
      <span class="decision-kicker">ENTERPRISE SECURITY &amp; RELIABILITY STANDARDS</span>
      <h2>Engineered upon 6 resilient infrastructure pillars.</h2>
      <p>HTML&amp;HTML operates with zero fault tolerance matching institutional software standards.</p>
    </div>
    <div class="pdf-security-grid">
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🛡️</div><div class="pdf-sec-title">SSRF Fortress</div><div class="pdf-sec-desc">Fail-closed IP filtering protecting internal perimeter</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">📜</div><div class="pdf-sec-title">RFC 9309 Strict</div><div class="pdf-sec-desc">IETF compliant robots.txt governance</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">⚡</div><div class="pdf-sec-title">Initial Packet AST Ceiling</div><div class="pdf-sec-desc">Maximum semantic density in initial TCP packet</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">📐</div><div class="pdf-sec-title">ColBERT MaxSim</div><div class="pdf-sec-desc">Late-interaction token similarity optimization</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🔄</div><div class="pdf-sec-title">Rollback Guarantee</div><div class="pdf-sec-desc">Zero-downtime automated rollback scripts for every fix</div></div>
      <div class="pdf-sec-card"><div class="pdf-sec-icon">🔒</div><div class="pdf-sec-title">SHA-256 Integrity</div><div class="pdf-sec-desc">Cryptographic signature ensuring immutable delivery</div></div>
    </div>
  </section>

  <!-- 06 HOW IT WORKS: 4 SIMPLE STEPS -->
  <section class="decision-section decision-workflow" id="workflow-steps">
    <div class="decision-section-no">06</div>
    <div class="decision-heading">
      <span class="decision-kicker">HOW IT WORKS: ONLY 4 SIMPLE STEPS</span>
      <h2>Resolve complex technical barriers within minutes.</h2>
      <p>No engineering expertise required. Our platform diagnoses issues, packages solutions, and enables your developers.</p>
    </div>
    <div class="pdf-steps-grid">
      <div class="pdf-step-card"><span class="pdf-step-num">1</span><h3>1. Free Scan</h3><p>Enter your website URL. 18 independent engines analyze your public web surface within seconds.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">2</span><h3>2. Inspect Evidence</h3><p>Examine transparent HTML, HTTP and DOM evidence showing why AI models cannot parse your site.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">3</span><h3>3. Make Decision</h3><p>Acquire the  Fix Pack if issues are critical. Download the 30+ file engineering package instantly.</p></div>
      <div class="pdf-step-card"><span class="pdf-step-num">4</span><h3>4. Hand to Developer</h3><p>Deliver production-ready templates, Nginx configs and tests to your team for a 15-minute rollout.</p></div>
    </div>
  </section>

  <!-- 07 WHY HTML&HTML? -->
  <section class="decision-section decision-why-us" id="why-html">
    <div class="decision-section-no">07</div>
    <div class="decision-heading">
      <span class="decision-kicker">WHY CHOOSE US?</span>
      <h2>Eliminate expensive agency retainers and months of uncertainty.</h2>
    </div>
    <div class="pdf-why-split">
      <div class="pdf-why-focal">
        <span class="pdf-why-badge-pill">OUR PROMISE</span>
        <h3>We Don't Sell Audits,<br>We Deliver Executive Decisions and Revenue Security.</h3>
        <p>Traditional agencies bill thousands for abstract PowerPoint decks and leave implementation to you. We transform technical chaos into decisive business clarity, delivering drop-in code your engineers deploy immediately for a single fixed fee.</p>
        <a class="decision-btn decision-btn--light" href="#scanner">Diagnose My Risk Free →</a>
      </div>
      <div class="pdf-why-list">
        <div class="pdf-why-item"><span class="pdf-why-num">1</span><span><b>5-Second Decision Clarity:</b> Underwriter precision that answers: 'which barrier is lowering my revenue?'</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">2</span><span><b>Plug Lost Revenue:</b> Seals touchpoints where AI models disqualify your brand in favor of competitors.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">3</span><span><b>Drop-in Production Code:</b> We don't say 'investigate this'—we provide exact Nginx, JSON-LD and robots.txt code.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">4</span><span><b>Rollback Guarantee:</b> Every fix includes automated zero-downtime rollback scripts. Zero system lockup risk.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">5</span><span><b>Fixed  Price:</b> No recurring retainers, agency contracts, or hidden surprise invoices.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">6</span><span><b>30-Day Free Re-Scan:</b> Re-scan your live domain after deployment to formally prove compliance.</span></div>
        <div class="pdf-why-item"><span class="pdf-why-num">7</span><span><b>Zero Security Footprint:</b> No repository access or server credentials required. Public surface only.</span></div>
      </div>
    </div>
  </section>

  <!-- 08 VERIFIED STANDARDS & REFERENCES -->
  <section class="decision-section decision-references" id="industry-standards">
    <div class="decision-section-no">08</div>
    <div class="decision-heading">
      <span class="decision-kicker">GLOBAL STANDARDS &amp; AUTHORITIES</span>
      <h2>Our algorithms and solutions conform strictly to open web standards.</h2>
      <p>Deterministic checks aligned 100% with official RFC specifications and vendor developer documentation.</p>
    </div>
    <div class="pdf-refs-grid">
      <div class="pdf-ref-card"><b>W3C</b><span>World Wide Web Consortium</span></div>
      <div class="pdf-ref-card"><b>IETF</b><span>RFC 9309 Standards</span></div>
      <div class="pdf-ref-card"><b>Schema.org</b><span>Structured Data Consortium</span></div>
      <div class="pdf-ref-card"><b>OpenAI</b><span>SearchBot Specification</span></div>
      <div class="pdf-ref-card"><b>Google Search</b><span>AI Overviews &amp; E-E-A-T</span></div>
      <div class="pdf-ref-card"><b>Wikidata</b><span>Knowledge Graph MID</span></div>
      <div class="pdf-ref-card"><b>Cloudflare</b><span>Edge &amp; DNS Security</span></div>
      <div class="pdf-ref-card"><b>NIST</b><span>Cybersecurity Framework</span></div>
      <div class="pdf-ref-card"><b>IndexNow</b><span>Real-Time Indexing Protocol</span></div>
      <div class="pdf-ref-card"><b>Paddle</b><span>Global Merchant of Record</span></div>
    </div>
  </section>

  <!-- 09 REAL SAMPLE REPORT -->
  <section class="decision-section decision-output" id="sample-output">
    <div class="decision-section-no">09</div>
    <div class="decision-output-grid">
      <div>
        <span class="decision-kicker">SEE THE OUTPUT BEFORE YOU BUY</span>
        <h2>The report doesn't say “good/bad”. It supports a decision.</h2>
        <div class="decision-checks">
          <p><b>Finding</b><span>What is wrong?</span></p>
          <p><b>Location</b><span>Which URL / surface?</span></p>
          <p><b>Evidence</b><span>What proves it?</span></p>
          <p><b>Impact</b><span>What can it limit?</span></p>
          <p><b>Priority</b><span>What should be handled first?</span></p>
        </div>
        <div class="decision-actions">
          <a class="decision-btn decision-btn--primary" href="/enterprise-analyzer/htmlandhtml-ai-report" target="_blank" rel="noopener">View real sample report →</a>
          <a class="decision-btn" href="#scanner">Scan my site</a>
        </div>
      </div>
      <div class="decision-report-card" aria-label="Sample finding">
        <div class="decision-report-top"><span></span><span></span><span></span><em>SAMPLE FINDING</em></div>
        <div class="decision-report-body">
          <div class="decision-severity">TECH-CANON-001 · HIGH</div>
          <h3>Canonical tag is missing</h3>
          <p>Search systems may read the primary URL with more ambiguity.</p>
          <div class="decision-evidence"><b>EVIDENCE</b><code>rel="canonical" was not found inside &lt;head&gt;</code></div>
          <div class="decision-paid"><b> FIX PACK</b><span>Root cause → exact fix → test → rollback → re-scan</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- 10 OFFER & PRICING -->
  <section class="decision-section decision-offer" id="offer">
    <div class="decision-section-no">10</div>
    <div class="decision-heading">
      <span class="decision-kicker">FREE DIAGNOSIS → PAID IMPLEMENTATION</span>
      <h2>Pay for an implementable fix package, not for another audit.</h2>
    </div>
    <div class="decision-offer-grid">
      <article class="decision-offer-card"><span>FREE</span><h3>See what is wrong.</h3><ul><li>Finding</li><li>URL / location</li><li>Evidence</li><li>Priority</li><li>General fix direction</li></ul><a href="#scanner">Measure My Risk — Free →</a></article>
      <article class="decision-offer-card decision-offer-card--paid"><span> · ONE TIME</span><h3>Give your team the implementation path.</h3><ul><li>Root cause</li><li>Exact fix / configuration</li><li>Implementation order</li><li>Acceptance + regression test</li><li>Rollback + one re-scan within 30 days</li></ul><a href="/en/pricing/">View Fix Pack →</a></article>
    </div>
  </section>

  <!-- 11 TRUST & BOUNDARY LAYER -->
  <section class="decision-section decision-trust" id="trust">
    <div class="decision-section-no">11</div>
    <div class="decision-trust-grid">
      <div class="decision-trust-copy">
        <span class="decision-kicker">TRUST IS AN EVIDENCE LAYER</span>
        <h2>We show what we measure, what we cannot measure and what we do not guarantee.</h2>
        <p>No ranking, citation, traffic or revenue guarantee. Third-party model behavior is outside our control. We do not invent codebase defects that public crawling cannot observe.</p>
      </div>
      <div class="decision-trust-points">
        <article><b>01</b><span>Real URL / HTTP / HTML evidence</span></article>
        <article><b>02</b><span>NOT_MEASURED and REQUIRES_CONTEXT stay visible</span></article>
        <article><b>03</b><span>No source-code modification</span></article>
        <article><b>04</b><span>Open methodology + sample report</span></article>
      </div>
    </div>
  </section>

  <!-- 12 FINAL CONVERSION CLOSE -->
  <section class="decision-section decision-close" id="final-cta">
    <div class="decision-section-no">12</div>
    <div><span class="decision-kicker">MAKE THE FIRST DECISION IN 5 SECONDS</span><h2>See why your site is weak in AI search for free.</h2><p>If the issue is real, get the  fix package your developer can implement.</p><div class="decision-actions"><a class="decision-btn decision-btn--light" href="#scanner">Scan my site free →</a><a class="decision-btn decision-btn--ghost" href="/en/pricing/"> Fix Pack</a></div></div>
    <div class="decision-orbits" aria-hidden="true"><span>Customer</span><span>Trust</span><span>Distribution</span><span>Reference</span><span>Sales</span></div>
  </section>
</section>

<!-- RESULTS -->
<section id="result" class="results" hidden>
  <div class="result-head">
    <div class="result-head-summary">
      <div class="result-head-info">
        <span class="eyebrow" data-i18n="result">SCAN RESULT</span>
        <h2 id="resultDomain">—</h2>
        <p id="resultMeta">—</p>
      </div>
      <div class="result-head-score">
        <div class="total-score">
          <strong id="overallScore">0</strong>
          <span>/100</span>
        </div>
      </div>
    </div>
    <div class="result-head-actions">
      <button type="button" class="btn-pdf-export" id="btnPdfExport" aria-label="Export Full PDF">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span data-i18n="downloadPdf">📄 Export Full PDF</span>
      </button>
      <button type="button" class="btn-pdf-export btn-zip-export" id="btnZipExport" style="background:#0284c7;border-color:#0284c7;color:#ffffff;" aria-label="Download 30+ File ZIP Pack">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
        <span>📦 Download 30+ File ZIP</span>
      </button>
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
      <h3 data-i18n="mandateTitle">Evidence is free.<br>Automated code pack is $99.</h3>
      <p data-i18n="mandateCopy">The same domain is re-scanned and every valid issue becomes a ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK code and configuration template.</p>
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
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Download Resolution Pack — $99 →</a>
      <small class="note" data-i18n="checkoutNote">Public scanning never invents source file names; source context enables file-level targeting.</small>
    </aside>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">FAQ</span>
    <h2 data-i18n="faqTitle">Frequently asked questions</h2>
  </header>
  <details><summary data-i18n="q1">What is hidden in the audit? Are recipes unlocked?</summary><p data-i18n="a1">Nothing is hidden. URL, severity, confidence, evidence, and all production code recipes are 100% unlocked. You can export the full report to PDF and download the 30+ file resolution package as a ZIP (included with the $99 enterprise software package).</p></details>
  <details><summary data-i18n="q2">Does 100/100 guarantee Google or AI citations?</summary><p data-i18n="a2">No. The score only represents measured checks. It is not a ranking, traffic or AI citation guarantee.</p></details>
  <details><summary data-i18n="q3">Is llms.txt mandatory?</summary><p data-i18n="a3">No. llms.txt is an evolving proposal, not a web standard. It is therefore labeled PROPOSAL and given limited weight.</p></details>
  <details><summary data-i18n="q4">Are Core Web Vitals measured?</summary><p data-i18n="a4">This version measures HTML/HTTP performance hygiene. Reliable LCP/INP/CLS needs CrUX/PageSpeed data; without it the result is NOT_MEASURED.</p></details>
  <details><summary data-i18n="q5">Why are some sites rejected?</summary><p data-i18n="a5">To reduce SSRF risk, localhost/private/reserved targets, private DNS resolution, non-standard ports and redirect pivots into private networks fail closed.</p></details>
</section>
</main>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
        <img class="brand-logo" src="/assets/logo.png?v=hh7" alt="HTML&amp;HTML" width="139" height="24">
      </a>
      <p data-i18n="footerTag">Evidence is free. Automated code generator is the product.</p>
    </div>
    <div class="footer-col">
      <h4>Platform</h4>
      <ul>
        <li><a href="/en/platform/">Platform</a></li>
        <li><a href="/en/fix-mandate/">Yol Haritası</a></li>
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
      <h4>Company</h4>
      <ul>
        <li><a href="/en/about/">About</a></li>
        <li><a href="/en/contact/">Contact</a></li>
        <li><a href="/en/terms/">Terms of Service</a></li>
        <li><a href="/en/privacy/">Privacy Policy</a></li>
        <li><a href="/en/refund-policy/">Refund Policy</a></li>
        <li><a href="/en/delivery-policy/">Delivery Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2026 HTML&amp;HTML. All rights reserved. Updated / Revision date: 2026-09-08. Payments and billing are processed by our authorized reseller and Merchant of Record Paddle.com.</p>
  </div>
</footer>

<!-- macOS Floating Glass Dock -->
<nav class="hh-floating-dock" aria-label="Quick Access Menu">
  <a href="#scanner" class="hh-dock-item primary">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <span>Scan</span>
  </a>
  <span class="hh-dock-divider"></span>
  <a href="#result" id="hhDockReportLink" class="hh-dock-item">
    <span>📊 Report</span>
    <span id="dockScoreBadge" class="hh-dock-score-badge" style="display:none;"></span>
  </a>
  <a href="#pipeline" class="hh-dock-item">Pipeline</a>
  <button type="button" id="hhDockMenuBtn" class="hh-dock-item" aria-label="Open Menu">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    <span>Menu</span>
  </button>
  <span class="hh-dock-divider"></span>
  <button type="button" class="hh-dock-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Go Top">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
  </button>
</nav>
<script src="/assets/js/enterprise-runtime.js?v=3"></script>
<script src="/assets/js/mobile-space-runtime.js?v=hh5" defer></script>
<script src="/assets/js/profound-canvas.js?v=20260920_27" defer></script>
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function() {});
    });
  }
</script>
</body>
</html>'''


    write_page("index.html", root_html)
    tr_html = root_html.replace(
        "<title>AI Arama Teknik Teşhis ve Düzeltme Platformu | HTML&amp;HTML</title>",
        "<title>AI Arama Teknik Teşhis ve Düzeltme Platformu | HTML&amp;HTML</title>"
    ).replace(
        '<link rel="canonical" href="https://htmlandhtml.com/">',
        '<link rel="canonical" href="https://htmlandhtml.com/tr/">'
    )
    write_page("tr/index.html", tr_html)
    write_page("en/index.html", en_html)
    print("All homepages built cleanly.")

if __name__ == '__main__':
    build_homepages()
