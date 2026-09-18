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
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- 1. ZERO-FLASH SCRIPT — Blocking before CSS -->
<script>
  (function() {
    'use strict';
    var COOKIE_NAME = 'htmlandhtml-theme';
    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + 
        name.replace(/([.$?*|{}()[\]\/+^])/g, '\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
    function getInitialTheme() {
      try {
        var hh = localStorage.getItem('hh-theme');
        if (hh === 'light' || hh === 'dark') return hh;
        if (hh === 'system') return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {}
      var cookie = getCookie(COOKIE_NAME);
      if (cookie) {
        try {
          var parsed = JSON.parse(cookie);
          if (parsed.theme === 'system' || !parsed.theme) {
            return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return parsed.theme;
        } catch (e) {
          if (cookie === 'light' || cookie === 'dark') return cookie;
        }
      }
      try {
        var ls = localStorage.getItem('htmlandhtml-theme-v2');
        if (ls) {
          var p = JSON.parse(ls);
          if (p.theme === 'system' || !p.theme) {
            return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return p.theme;
        }
      } catch (e) {}
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var theme = getInitialTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
</script>
<title>Yapay Zeka SEO Analizi ve ChatGPT Görünürlük Testi | HTML&amp;HTML</title>
<meta name="description" content="Web sitenizin ChatGPT, Google Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz analiz edin. 18 deterministik motor, 105 kontrol ve $99 uygulama paketi.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="alternate" type="text/markdown" href="https://htmlandhtml.com/index.md">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/">
<meta property="og:title" content="HTML&amp;HTML — Web Standards Diagnostic &amp; Automated Config Generator">
<meta property="og:description" content="18-engine public website diagnosis with automated configuration packages and code templates.">
<meta name="theme-color" content="#14151a">
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=hh5">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=hh5">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=hh5">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=hh5">
<link rel="icon" href="/favicon.ico?v=hh5" sizes="any">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css">
<link rel="stylesheet" href="/assets/css/validator.css?v=22">
<link rel="stylesheet" href="/assets/css/theme.css?v=9">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=25">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">
<meta name="author" content="HTML&amp;HTML">
<link rel="author" href="https://htmlandhtml.com/tr/hakkimizda/">
<script src="/assets/js/enterprise-theme-engine.js?v=2" defer></script>
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
      "logo": "https://htmlandhtml.com/assets/logo.png",
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
      "operatingSystem": "Web",
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
<script src="/assets/js/theme.js?v=7"></script>
<script src="/assets/js/ai-positioning.js?v=r10-20260910-2355&amp;quality=005" defer></script>
<script src="/assets/js/r10-quality-hotfix.js?v=20260910-005" defer></script>
<link rel="stylesheet" href="/assets/css/v3-capabilities.css?v=1"><link rel="stylesheet" href="/assets/css/r10-report-ux.css?v=20260910-001"><link rel="stylesheet" href="/assets/css/mobile-space-grade.css?v=22">
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">İçeriğe geç</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="162" height="28">
      <span class="hh-space-telemetry-led">● ONLINE</span>
    </a>
    <nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">Çözümler</a>
  <a href="/tr/llms-txt-haberler/">Haberler</a>
  <a href="/tr/sozluk/">Sözlük</a>
  <a href="/tr/fiyatlandirma/">Onarım Seti ($99)</a>
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
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="124" height="22">
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
  </div>
</div>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">KURUMSAL AI ARAMA İSTİHBARATI / V4.1</b></div>
  <h1 data-i18n="heroTitle">Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?</h1>
  <p class="hero-answer" data-i18n="heroCopy">URL'nizi girin. 18 motor, 105 kontrol, 13 puan dışı istihbarat analizi. Sonuçlar tarama sırasında akışla gösterilir. Bir alan adı girin. Biz onu resmi spesifikasyona göre kontrol ediyoruz, her bağlantının gerçekten çalıştığını test ediyoruz ve düzeltmeniz gerekenleri saniyeler içinde size söylüyoruz.</p>
  
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
        <button id="scanButton" type="submit"><b data-i18n="scan">Ücretsiz Kontrol Et</b><span class="btn-arrow" aria-hidden="true">→</span><span class="sr-only">Ücretsiz Kontrol Et</span></button>
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

<!-- 02.4 ENTERPRISE ANALYZER SUITE & DIAGNOSTIC LAB -->
<section class="section px-section ea-showcase-section" id="enterprise-analyzer" data-component="enterprise-analyzer-suite">
  <div class="ea-container">
    <div class="ea-header">
      <span class="ea-eyebrow">
        <span class="ea-live-dot" aria-hidden="true"></span>
        CANLI KURUMSAL DENETİM LABORATUVARI · ENTERPRISE AI DIAGNOSTIC SUITE
      </span>
      <h2>Kurumsal AI Görünürlük Analizörü &amp; Kod Çözüm Laboratuvarı</h2>
      <p>105 deterministik kontrol, 50'ye kadar herkese açık HTML sayfası ve 30 canlı link probu ile üretilen deterministik denetim ortamı. Kod seviyesinde teknik kanıtlar, kilitli onarım yol haritaları ve n8n CI/CD otomasyon paketleriyle donatılmış kurumsal analiz platformunu keşfedin.</p>
    </div>

    <!-- Metric Ribbon -->
    <div class="ea-ribbon">
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div>
          <strong>105 Deterministik Kontrol</strong>
          <span>WCAG 2.1 AA · RFC 6596 · OpenAPI 3.1</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div>
          <strong>50'ye Kadar Sayfa · 30 Prob</strong>
          <span>Kablo seviyesinde kanıt tespiti</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div>
          <strong>15 Teknik Kanıtlı Bulgu</strong>
          <span>Kök neden tespiti ve iş etkisi</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        </div>
        <div>
          <strong>G0–G9 Yayın Kapıları</strong>
          <span>Geri alma güvenceli kod blokları</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div>
          <strong>n8n CI/CD &amp; Bash Paketi</strong>
          <span>Otomatik doğrulama ve izleme</span>
        </div>
      </div>
    </div>

    <!-- Console Grid -->
    <div class="ea-console-grid">
      <!-- Left Card: Telemetry & Score Matrix -->
      <div class="ea-telemetry-card">
        <div class="ea-card-head">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Canlı Telemetri &amp; Skor Matrisi
          </h3>
          <span class="ea-badge-status">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Tarama Tamamlandı
          </span>
        </div>

        <div class="ea-score-box">
          <div class="ea-dial-wrap">
            <svg viewBox="0 0 92 92" aria-hidden="true">
              <defs>
                <linearGradient id="eaDialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00d4ff"></stop>
                  <stop offset="100%" stop-color="#8b5cf6"></stop>
                </linearGradient>
              </defs>
              <circle class="ea-dial-bg" cx="46" cy="46" r="38"></circle>
              <circle class="ea-dial-bar" cx="46" cy="46" r="38"></circle>
            </svg>
            <div class="ea-dial-value">
              <span class="ea-dial-num">70</span>
              <span class="ea-dial-max">/ 100</span>
            </div>
          </div>
          <div class="ea-score-meta">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Dikkat Gerekiyor — Acil Eylem
            </h4>
            <p>105 kontrol kapsamında örnek kritik bulgular gösteriliyor. Yapay zeka arama motorları için kritik engelleyiciler mevcut.</p>
          </div>
        </div>

        <div class="ea-pillars-grid">
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Keşif (Crawl &amp; Index)</span>
              <span class="num">80%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-cyan" data-target-width="80%" style="width: 80%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Anlama (Schema &amp; llms.txt)</span>
              <span class="num">81%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-blue" data-target-width="81%" style="width: 81%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Güven &amp; Kalite (HSTS/E-E-A-T)</span>
              <span class="num">59%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-amber" data-target-width="59%" style="width: 59%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Ticari Yol (Action &amp; CTA)</span>
              <span class="num">100%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-emerald" data-target-width="100%" style="width: 100%;"></div></div>
          </div>
        </div>

        <div class="ea-telemetry-strip">
          <div class="ea-telemetry-item">
            <span>HTML Boyutu:</span>
            <strong>319 KB (Kritik)</strong>
          </div>
          <div class="ea-telemetry-item">
            <span>Canonical:</span>
            <strong>Eksik (RFC 6596)</strong>
          </div>
          <div class="ea-telemetry-item">
            <span>Mixed Content:</span>
            <strong>1 Güvensiz Kaynak</strong>
          </div>
        </div>
      </div>

      <!-- Right Card: Interactive Terminal & Frosted Recipe -->
      <div class="ea-terminal-card">
        <div class="ea-terminal-topbar">
          <div class="ea-mac-dots" aria-hidden="true">
            <span class="ea-dot-red"></span>
            <span class="ea-dot-yellow"></span>
            <span class="ea-dot-green"></span>
          </div>
          <span class="ea-terminal-title">ENTERPRISE DIAGNOSTIC ENGINE — LIVE REPORT PREVIEW</span>
        </div>

        <div class="ea-tab-bar" role="tablist" aria-label="Bulgu seçici">
          <button type="button" class="ea-tab active" role="tab" id="ea-tab-canon" aria-controls="eaFindingPanel" aria-selected="true" tabindex="0" data-finding-tab="canon">TECH-CANON-001 (Yüksek)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-a11y" aria-controls="eaFindingPanel" aria-selected="false" tabindex="-1" data-finding-tab="a11y">A11Y-FORM-001 (Yüksek)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-mixed" aria-controls="eaFindingPanel" aria-selected="false" tabindex="-1" data-finding-tab="mixed">SEC-MIXED-001 (Yüksek)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-perf" aria-controls="eaFindingPanel" aria-selected="false" tabindex="-1" data-finding-tab="perf">PERF-HTML-001 (Orta)</button>
        </div>

        <div class="ea-finding-content ea-tab-content-anim" id="eaFindingPanel" role="tabpanel" aria-labelledby="ea-tab-canon">
          <div class="ea-finding-meta-row">
            <span class="ea-finding-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
              TECH-CANON-001 · YÜKSEK
            </span>
            <span class="ea-standard-tag">RFC 6596 Canonicalization</span>
          </div>

          <div class="ea-finding-summary">
            Canonical tag tanımlı değil. Yinelenen içerik versiyonları yapay zeka alaka sinyallerini böler.
          </div>

          <div class="ea-evidence-block">
            <div class="ea-evidence-head">
              <span>Kablo Seviyesi Telemetri Kanıtı</span>
              <button type="button" class="ea-copy-btn" data-copy-target="evidence" aria-label="Kanıtı kopyala">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span class="ea-copy-label">Kopyala</span>
              </button>
            </div>
            <div class="ea-evidence-body">&lt;head&gt; içinde arama: rel=canonical BULUNAMADI&lt;br&gt;AI Tarayıcı Durumu: Primary URL Belirsiz | Duplicate Riski: Yüksek</div>
          </div>

          <div class="ea-code-sandbox" style="position:relative;">
            <pre class="ea-code-underlay" style="filter:none;opacity:1;pointer-events:auto;user-select:text;"><code>&lt;!-- Çözüm Yol Haritası &amp; Kod Şablonu (100% Açık yol haritası) --&gt;
&lt;link rel="canonical" href="https://htmlandhtml.com/en"&gt;
&lt;link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr"&gt;
&lt;link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en"&gt;
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cloudflare edge cache</code></pre>
            <div class="ea-unlocked-strip" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;margin-top:8px;">
              <span style="color:#10b981;font-weight:700;font-size: 14px;display:inline-flex;align-items:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ✓ Tüm Çözüm yol haritasıleri ve Kod Şablonları Açık ($99 Değerinde Kurumsal Paket)
              </span>
              <span style="color:#0284c7;font-size: 15px;font-weight:600;">Tek tıkla PDF Rapor &amp; 30+ Dosyalık ZIP Seti</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Launch Bar -->
    <div class="ea-actions-bar">
      <a href="/enterprise-analyzer/" id="eaLaunchLink" class="ea-btn-primary" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        Canlı Enterprise Analizörü Başlat ↗
      </a>
      <a href="/enterprise-analyzer/htmlandhtml-ai-report" class="ea-btn-secondary" target="_blank" rel="noopener">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Örnek Raporu İncele (Canlı Demo) →
      </a>
    </div>

    <div class="ea-footnote">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
      <span><strong>Müdahalesiz Denetim Güvencesi:</strong> Müşterinin kaynak koduna doğrudan dokunulmaz. Teşhis ve çözüm yol haritaları kendi yazılım ekibinize teslim edilmek üzere üretilir.</span>
    </div>
  </div>
</section>

<section class="v3-capability-contract" aria-labelledby="v3-capabilities-tr">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT GÖRÜNÜRLÜK · ENGINE V3</span>
    <h2 id="v3-capabilities-tr">Google sırası tek başına yetmiyor. Siteniz yapay zeka aramalarında bulunmalı, anlaşılmalı ve kaynak olmaya hazır olmalı.</h2>
    <p>HTML&amp;HTML, web sitenizdeki AI arama görünürlüğü engellerini kanıtla ölçer. 18 deterministik Engine V3 modülü, 105 kontrol, 13 puan dışı istihbarat analizi ve 7 hazırlık lensi aynı kanıt zincirinde çalışır.</p>
    <div class="v3-decision-line"><b>Teşhis ücretsiz.</b><span>Kök neden, uygulama kodu, kabul testi ve rollback paketi $99 tek seferlik lisansla açılır.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="HTML&HTML V3 karşılaştırma tablosu" tabindex="0">
    <table><thead><tr><th>Karar başlığı</th><th>Ücretsiz AI SEO analizi</th><th class="v3-paid">$99 uygulama paketi</th></tr></thead><tbody>
      <tr><th>Deterministik denetim</th><td>18 Engine V3 modülü · 105 kontrol · rastgele skor yok</td><td class="v3-paid">Bulgu → kök neden → düzeltme → test → rollback</td></tr>
      <tr><th>Tarama ve güvenlik</th><td>50'ye kadar herkese açık HTML sayfası · 30 canlı link probu · SSRF fail-closed</td><td class="v3-paid">Kanıta bağlı uygulama planı</td></tr>
      <tr><th>AI arama disiplinleri</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Kanıta bağlı kod ve konfigürasyon</td></tr>
      <tr><th>Karar istihbaratı</th><td>13 puan dışı analiz · 7 hazırlık lensi · NOT_MEASURED / REQUIRES_CONTEXT</td><td class="v3-paid">P0–P3 öncelik, bağımlılık, kabul ve regresyon</td></tr>
      <tr><th>AI görünürlük gözlemi</th><td>Bot erişimi, kaynak hazırlığı, entity/schema, cevap çıkarılabilirliği</td><td class="v3-paid">Sağlayıcı anahtarları yapılandırıldığında en fazla 3 nötr sorgu ile API/search-grounded gözlem</td></tr>
      <tr><th>Yayın güvenliği</th><td>Kanıt ve confidence sınıfları görünür</td><td class="v3-paid">G0–G9 · acceptance · regression · rollback</td></tr>
    </tbody></table>
  </div>
  <p class="v3-boundary"><b>Kanıt sınırı:</b> Dış model tavsiyesi, sıralama, atıf, trafik veya gelir garanti edilmez. Ölçülemeyen sinyal <b>NOT_MEASURED</b>; kod bağlamı gerektiren sinyal <b>REQUIRES_CONTEXT</b> kalır.</p>
<p class="v3-delivery-boundary"><b>Ücretli teslim sınırı:</b> Kanıtlanan URL’lere bağlı 30'a kadar sayfa bazlı Markdown makine yüzeyi ve sürümlenmiş ZIP teslim paketi.</p></section>

<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->
<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>Yapay Zeka Sizi Nasıl Tavsiye Eder ve Görünürlük Nedir?</h2>
    <p>Yapay zeka görünürlüğü (GEO/AEO) nedir? GEO, arama ve yapay zeka modellerinin sitenizi doğrudan referans almasıdır. HTML&amp;HTML, 18 motor (18 engines) ve %100 deterministik kanıt standardıyla çalışır.</p>
  </div>
  <ol class="pl-flow">
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 01</span></div>
        <h3>Canlı URL Girişi</h3>
        <p>DoH (DNS-over-HTTPS) ve RFC 1918 SSRF izolasyonu ile hedef host güvenlik çemberine alınır.</p>
        <div class="pl-micro">
          <span>🛡️ DoH DNS Koruması</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 02</span></div>
        <h3>18 Motorlu Paralel Tarama</h3>
        <p>cl100k AST token ayrıştırma, payload ölçümleri, semantic structure ve source-readiness taraması.</p>
        <div class="pl-micro">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 03</span></div>
        <h3>Deterministik Kanıt Kilidi</h3>
        <p>UNKNOWN ≠ PASS kuralı. Varsayımsız, kablo seviyesi HTTP/DOM ispatı ve P0–P3 etki matrisi.</p>
        <div class="pl-micro">
          <span>⚖️ P0–P3 Etki Matrisi</span>
          <span>📋 24 Alanlı Bulgu Şeması</span>
          <span>🛑 Stop-Gate Denetimi</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card highlight">
        <div><span class="pl-badge">ADIM 04</span></div>
        <h3>30+ Dosyalık V3 Uygulama Paketi</h3>
        <p>Kök neden çözümü, test.js kabul testleri, 00_ROLLBACK_PLAN ve 30 sayfalık makine yüzeyi.</p>
        <div class="pl-micro">
          <span>⚙️ test.js Scriptleri</span>
          <span>🔄 Geri Alma Güvencesi</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:40px;">
    <div class="px-lens"><b>01 BULUN</b><span>Robots.txt · Sitemap · AI Bot Erişimi</span></div>
    <div class="px-lens"><b>02 ANLAŞILIN</b><span>Schema Graph · Wikidata QID · llms.txt</span></div>
    <div class="px-lens"><b>03 KAYNAK OLUN</b><span>Cross-Encoder · RAG 512 · E-E-A-T</span></div>
    <div class="px-lens"><b>04 DÖNÜŞÜN</b><span>measured HTML payload, semantic structure and source-readiness evidence</span></div>
  </div>
</section>

<!-- 02.6 6 KARA KUTU / DARK POOL VE TRANSFORMER TERSİNE MÜHENDİSLİK SHOWCASE -->
<section class="section px-section" id="dark-pool-intelligence">
  <div class="px-section-head">
    <span class="eyebrow">SILICON VALLEY &amp; LONDON ($5M+) ENTERPRISE INTELLIGENCE</span>
    <h2>Geleneksel SEO Araçlarının Göremediği 6 Yapay Zeka Kara Kutusu</h2>
    <p>Ahrefs, Semrush ve eski nesil araçlar yalnızca anahtar kelime ve meta etiket sayarlar. ChatGPT, Perplexity ve Google Gemini gibi temel nöral modeller, içeriğinizi önermek veya reddetmek için bu 6 gizli transformer katmanından geçirir.</p>
  </div>
  <div class="dp-grid">
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">01</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">14KB AST Token Yükü (Payload Budget)</h3>
      <p class="dp-desc">GPTBot ve Perplexity tarayıcıları, 14KB AST bütçesini aşan şişirilmiş HTML'leri okumayı erken keser (truncation). Tarayıcılar fiyatlandırma ve ürün bloklarınıza ulaşamadan token kapasitelerini tüketir.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: Cloudflare Worker HTMLRewriter AST temizliği ve 40ms altı sınır hızı (TTFB)</span></div>
    </article>
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">02</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">Entity Vault ve Wikidata Konsensüsü</h3>
      <p class="dp-desc">Küresel Bilgi Graflarında (Knowledge Graph) kesin koordinatlarınız olmadan, nöral modeller markanızı otoriteli bir varlık (Entity) olarak doğrulayamaz ve yanıtlarında sizi rakipleriniz lehine sistematik olarak atlar.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: W3C JSON-LD 1.1 @graph, sameAs Wikidata QID ve Google MID konsensüsü</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">03</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">512-Token RAG Semantik Bütünlük Koruması</h3>
      <p class="dp-desc">Standart 512 tokenlık vektör parçalama (chunking) işlemi, değer önerilerinizi ortadan böler. Arama motorları semantik üretim esnasında cümlenin kilit bağlamını eşleştiremez.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: data-chunk-id semantik sınır işaretlemesi ve bağlam koruması</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">04</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">Cross-Encoder Filtresi ve Rakam Yoğunluğu</h3>
      <p class="dp-desc">Çapraz kodlayıcı (Cross-encoder) algoritmaları tanıtım dolu "pazarlama" cümlelerini doğrudan çöpe atar. Doğrulanmış metrikler ve rakamlar içermeyen paragraflar doğrudan filtrelenir.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: H2 başlıkları altında 45-kelimelik matematiksel veri yoğunluğu matrisi</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">05</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">Yapay Zeka Eğitim Verisi (Corpus PMI)</h3>
      <p class="dp-desc">Eğer markanız, modellerin eğitildiği okyanus verilerinde (örn: Common Crawl) sektör benchmark'ları ile yan yana (co-occurrence) geçmiyorsa, doğrudan sorulmadıkça asla spontane olarak önerilmezsiniz.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: Kanonik sektör tanımlamaları ve PMI (Pointwise Mutual Information) çapaları</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">06</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">ColBERT MaxSim Gecikmeli Eşleşmesi</h3>
      <p class="dp-desc">ColBERT ve SPLADE nöral modelleri kullanıcı soru tokenları ile başlık tokenlarınızı tam eşleştiremezse (late-interaction), modern vektör aramalarında siteniz arka sayfalara ötelenir.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Çözüm: Token zenginleştirilmiş H2/H3 başlık hiyerarşisi ve MaxSim eşleşme mimarisi</span></div>
    </article>
  </div>
  
  <div class="dp-callout">
    <div class="dp-callout-text">
      <span>SIFIR DANIŞMANLIK MASRAFI · YAZILIMCINIZA TESLİM EDİN</span>
      <h3>Aylık 5.000$ Ajans Masrafı Ödemeyin. Teşhisi Görün, Kodu Kendi Ekibinize Verin.</h3>
      <p>HTML&amp;HTML bir danışmanlık veya pazarlama ajansı değildir; deterministik bir mühendislik platformudur. Ücretsiz AI denetimi ile sorunları görün. 30+ dosyalık kod paketini $99 karşılığında indirin ve 1 günde canlıya alın.</p>
    </div>
    <div class="dp-callout-action">
      <a href="#scanner" class="btn-scan-trigger">Ücretsiz AI Denetimi Başlat →</a>
      <span>Kayıt gerekmez · 10 saniyede canlı sonuç</span>
    </div>
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
      <button type="button" class="btn-pdf-export" id="btnPdfExport" aria-label="Raporu PDF Olarak İndir">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span data-i18n="downloadPdf">📄 PDF İndir</span>
      </button>
      <button type="button" class="btn-pdf-export btn-zip-export" id="btnZipExport" style="background:#0284c7;border-color:#0284c7;color:#ffffff;" aria-label="30+ Dosyalık Çözüm ZIP Paketi">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
        <span>📦 30+ Dosya ZIP İndir</span>
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
        <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="139" height="24">
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
<script src="/assets/js/mobile-space-runtime.js?v=hh3" defer></script>
</body>
</html>
'''
    en_html = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- 1. ZERO-FLASH SCRIPT — Blocking before CSS -->
<script>
  (function() {
    'use strict';
    var COOKIE_NAME = 'htmlandhtml-theme';
    function getCookie(name) {
      var match = document.cookie.match(new RegExp('(?:^|; )' + 
        name.replace(/([.$?*|{}()[\\]\\\\/+^])/g, '\\$1') + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    }
    function getInitialTheme() {
      try {
        var hh = localStorage.getItem('hh-theme');
        if (hh === 'light' || hh === 'dark') return hh;
        if (hh === 'system') return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {}
      var cookie = getCookie(COOKIE_NAME);
      if (cookie) {
        try {
          var parsed = JSON.parse(cookie);
          if (parsed.theme === 'system' || !parsed.theme) {
            return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return parsed.theme;
        } catch (e) {
          if (cookie === 'light' || cookie === 'dark') return cookie;
        }
      }
      try {
        var ls = localStorage.getItem('htmlandhtml-theme-v2');
        if (ls) {
          var p = JSON.parse(ls);
          if (p.theme === 'system' || !p.theme) {
            return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return p.theme;
        }
      } catch (e) {}
      return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var theme = getInitialTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
</script>
<title>AI SEO Audit &amp; ChatGPT Visibility Test | HTML&amp;HTML</title>
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
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css">
<link rel="stylesheet" href="/assets/css/validator.css?v=22">
<link rel="stylesheet" href="/assets/css/theme.css?v=9">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=25">
<link rel="stylesheet" href="/assets/css/enterprise-system.css?v=1">
<link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2" data-commercial-intent-css="static">
<meta name="author" content="HTML&amp;HTML">
<link rel="author" href="https://htmlandhtml.com/en/about/">
<script src="/assets/js/enterprise-theme-engine.js?v=2" defer></script>
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
      "logo": "https://htmlandhtml.com/assets/logo.png",
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
      "operatingSystem": "Web",
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
<script src="/assets/js/theme.js?v=7"></script>
<script src="/assets/js/ai-positioning.js?v=1" defer></script>
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
<link rel="stylesheet" href="/assets/css/mobile-space-grade.css?v=22">
</head>
<body class="enterprise-ui">
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="162" height="28">
      <span class="hh-space-telemetry-led">● ONLINE</span>
    </a>
    <nav class="primary-nav" aria-label="Primary navigation">
      <a href="/en/ai-search-visibility/">AI Visibility</a>
      <a href="/en/llms-txt-validator/">llms.txt</a>
      <a href="/en/llms-txt-news/">News</a>
      <a href="/en/glossary/">Glossary</a>
      <a href="/en/pricing/" data-i18n="navPrice">Pricing</a>
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
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="124" height="22">
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
  </div>
</div>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">ENTERPRISE AI SEARCH INTELLIGENCE / V4.1</b></div>
  <h1 data-i18n="heroTitle">Can ChatGPT, Gemini and Perplexity Find Your Website?</h1>
  <p class="hero-answer" data-i18n="heroCopy">Run a free AI SEO audit to see the evidence-backed website issues that block discovery, correct understanding and source consideration across leading AI search systems.</p>
  
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
        <button id="scanButton" type="submit"><b data-i18n="scan">Start Deep AI Audit</b><span class="btn-arrow" aria-hidden="true">→</span><span class="sr-only">Check Free</span></button>
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

<!-- 02.4 ENTERPRISE ANALYZER SUITE & DIAGNOSTIC LAB -->
<section class="section px-section ea-showcase-section" id="enterprise-analyzer" data-component="enterprise-analyzer-suite">
  <div class="ea-container">
    <div class="ea-header">
      <span class="ea-eyebrow">
        <span class="ea-live-dot" aria-hidden="true"></span>
        LIVE ENTERPRISE AUDIT LAB · ENTERPRISE AI DIAGNOSTIC SUITE
      </span>
      <h2>Enterprise AI Visibility Analyzer &amp; Solution Lab</h2>
      <p>Deterministic diagnostic environment operating across 105 deterministic controls, up to 50 public HTML pages, and 30 live link probes. Explore wire-level technical evidence, locked remediation roadmaps, and n8n CI/CD automation packages.</p>
    </div>

    <!-- Metric Ribbon -->
    <div class="ea-ribbon">
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div>
          <strong>120 Control Checks</strong>
          <span>WCAG 2.1 AA · RFC 6596 · OpenAPI 3.1</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div>
          <strong>Up to 50 Pages · 30 Probes</strong>
          <span>Wire-level evidence assertion</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div>
          <strong>15 Evidence Findings</strong>
          <span>Root-cause identification &amp; impact</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
        </div>
        <div>
          <strong>G0–G9 Release Gates</strong>
          <span>Rollback-guaranteed code templates</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div>
          <strong>n8n CI/CD &amp; Bash Kit</strong>
          <span>Automated validation &amp; monitoring</span>
        </div>
      </div>
    </div>

    <!-- Console Grid -->
    <div class="ea-console-grid">
      <!-- Left Card: Telemetry & Score Matrix -->
      <div class="ea-telemetry-card">
        <div class="ea-card-head">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Live Telemetry &amp; Score Matrix
          </h3>
          <span class="ea-badge-status">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Scan Complete
          </span>
        </div>

        <div class="ea-score-box">
          <div class="ea-dial-wrap">
            <svg viewBox="0 0 92 92" aria-hidden="true">
              <defs>
                <linearGradient id="eaDialGradEn" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00d4ff"></stop>
                  <stop offset="100%" stop-color="#8b5cf6"></stop>
                </linearGradient>
              </defs>
              <circle class="ea-dial-bg" cx="46" cy="46" r="38"></circle>
              <circle class="ea-dial-bar" style="stroke: url(#eaDialGradEn);" cx="46" cy="46" r="38"></circle>
            </svg>
            <div class="ea-dial-value">
              <span class="ea-dial-num">70</span>
              <span class="ea-dial-max">/ 100</span>
            </div>
          </div>
          <div class="ea-score-meta">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Attention Required — Urgent Action
            </h4>
            <p>108 findings detected across 105 controls. Critical blockers exist for AI search engines.</p>
          </div>
        </div>

        <div class="ea-pillars-grid">
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Discovery (Crawl &amp; Index)</span>
              <span class="num">80%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-cyan" data-target-width="80%" style="width: 80%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Understanding (Schema &amp; Graph)</span>
              <span class="num">81%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-blue" data-target-width="81%" style="width: 81%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Trust &amp; Quality (HSTS/E-E-A-T)</span>
              <span class="num">59%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-amber" data-target-width="59%" style="width: 59%;"></div></div>
          </div>
          <div class="ea-pillar-cell">
            <div class="ea-pillar-label">
              <span>Action Path (Forms &amp; CTA)</span>
              <span class="num">100%</span>
            </div>
            <div class="ea-meter-track"><div class="ea-meter-fill ea-fill-emerald" data-target-width="100%" style="width: 100%;"></div></div>
          </div>
        </div>

        <div class="ea-telemetry-strip">
          <div class="ea-telemetry-item">
            <span>HTML Payload:</span>
            <strong>319 KB (Critical)</strong>
          </div>
          <div class="ea-telemetry-item">
            <span>Canonical:</span>
            <strong>Missing (RFC 6596)</strong>
          </div>
          <div class="ea-telemetry-item">
            <span>Mixed Content:</span>
            <strong>1 Insecure Ref</strong>
          </div>
        </div>
      </div>

      <!-- Right Card: Interactive Terminal & Frosted Recipe -->
      <div class="ea-terminal-card">
        <div class="ea-terminal-topbar">
          <div class="ea-mac-dots" aria-hidden="true">
            <span class="ea-dot-red"></span>
            <span class="ea-dot-yellow"></span>
            <span class="ea-dot-green"></span>
          </div>
          <span class="ea-terminal-title">ENTERPRISE DIAGNOSTIC ENGINE — LIVE REPORT PREVIEW</span>
        </div>

        <div class="ea-tab-bar" role="tablist" aria-label="Finding switcher">
          <button type="button" class="ea-tab active" role="tab" id="ea-tab-canon-en" aria-controls="eaFindingPanelEn" aria-selected="true" tabindex="0" data-finding-tab="canon">TECH-CANON-001 (High)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-a11y-en" aria-controls="eaFindingPanelEn" aria-selected="false" tabindex="-1" data-finding-tab="a11y">A11Y-FORM-001 (High)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-mixed-en" aria-controls="eaFindingPanelEn" aria-selected="false" tabindex="-1" data-finding-tab="mixed">SEC-MIXED-001 (High)</button>
          <button type="button" class="ea-tab" role="tab" id="ea-tab-perf-en" aria-controls="eaFindingPanelEn" aria-selected="false" tabindex="-1" data-finding-tab="perf">PERF-HTML-001 (Medium)</button>
        </div>

        <div class="ea-finding-content ea-tab-content-anim" id="eaFindingPanelEn" role="tabpanel" aria-labelledby="ea-tab-canon-en">
          <div class="ea-finding-meta-row">
            <span class="ea-finding-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
              TECH-CANON-001 · HIGH
            </span>
            <span class="ea-standard-tag">RFC 6596 Canonicalization</span>
          </div>

          <div class="ea-finding-summary">
            Canonical tag not defined. Duplicate content variants dilute AI relevance signals.
          </div>

          <div class="ea-evidence-block">
            <div class="ea-evidence-head">
              <span>Wire-Level Telemetry Evidence</span>
              <button type="button" class="ea-copy-btn" data-copy-target="evidence" aria-label="Copy evidence">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span class="ea-copy-label">Copy</span>
              </button>
            </div>
            <div class="ea-evidence-body">Search in &lt;head&gt;: rel=canonical NOT FOUND&lt;br&gt;AI Crawler State: Primary URL Unresolved | Duplicate Risk: High</div>
          </div>

          <div class="ea-code-sandbox" style="position:relative;">
            <pre class="ea-code-underlay" style="filter:none;opacity:1;pointer-events:auto;user-select:text;"><code>&lt;!-- Remediation Roadmap &amp; Code Template (100% Unlocked) --&gt;
&lt;link rel="canonical" href="https://htmlandhtml.com/en"&gt;
&lt;link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr"&gt;
&lt;link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en"&gt;
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cloudflare edge cache</code></pre>
            <div class="ea-unlocked-strip" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:8px;margin-top:8px;">
              <span style="color:#10b981;font-weight:700;font-size: 14px;display:inline-flex;align-items:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ✓ All Resolution Recipes &amp; Code Templates Unlocked ($99 Enterprise Value)
              </span>
              <span style="color:#0284c7;font-size: 15px;font-weight:600;">1-Click PDF Report &amp; 30+ File ZIP Pack</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Launch Bar -->
    <div class="ea-actions-bar">
      <a href="/enterprise-analyzer/" id="eaLaunchLink" class="ea-btn-primary" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        Launch Live Enterprise Analyzer ↗
      </a>
      <a href="/enterprise-analyzer/htmlandhtml-ai-report" class="ea-btn-secondary" target="_blank" rel="noopener">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        View Sample Report (Live Demo) →
      </a>
    </div>

    <div class="ea-footnote">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
      <span><strong>Zero-Interference Assurance:</strong> Client source code is never touched directly. Diagnostics and remediation roadmaps are generated for handover to your own engineering team.</span>
    </div>
  </div>
</section>

<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->
<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>How Do AI Models Recommend Your Website and What is GEO?</h2>
    <p>What is Generative Engine Optimization (GEO)? GEO is the optimization of content for AI engines. HTML&amp;HTML audits websites across 18 engines with 100% deterministic evidence.</p>
  </div>
  <ol class="pl-flow">
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 01</span></div>
        <h3>Live URL Ingestion</h3>
        <p>DoH (DNS-over-HTTPS) resolution and RFC 1918 SSRF isolation sandbox the target host safely.</p>
        <div class="pl-micro">
          <span>🛡️ DoH DNS Shield</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 02</span></div>
        <h3>18-Engine Parallel Crawl</h3>
        <p>cl100k AST token parsing, 14KB budget enforcement, Cross-Encoder attention, and RAG chunk boundary tests.</p>
        <div class="pl-micro">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 03</span></div>
        <h3>Deterministic Evidence Gate</h3>
        <p>UNKNOWN ≠ PASS principle. Wire-level HTTP/DOM proof without heuristics, mapped to P0–P3 impact matrix.</p>
        <div class="pl-micro">
          <span>⚖️ P0–P3 Impact Matrix</span>
          <span>📋 24-Field Finding Schema</span>
          <span>🛑 Stop-Gate Assertion</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card highlight">
        <div><span class="pl-badge">STEP 04</span></div>
        <h3>Versioned Engine V3 Implementation ZIP</h3>
        <p>Root-cause remediation, test.js verification suites, 00_ROLLBACK_PLAN, and 30-page machine surface.</p>
        <div class="pl-micro">
          <span>⚙️ test.js Suites</span>
          <span>🔄 Rollback Guarantees</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:40px;">
    <div class="px-lens"><b>01 GET DISCOVERED</b><span>Robots.txt · Sitemap · AI Bot Access</span></div>
    <div class="px-lens"><b>02 BE UNDERSTOOD</b><span>Schema Graph · Wikidata QID · llms.txt</span></div>
    <div class="px-lens"><b>03 BECOME SOURCE</b><span>Cross-Encoder · RAG 512 · E-E-A-T</span></div>
    <div class="px-lens"><b>04 CONVERT</b><span>14KB AST Purge · OpenAPI · A2A / MCP</span></div>
  </div>
</section>

<!-- 02.6 6 AI SEARCH BLACK BOXES & TRANSFORMER REVERSE ENGINEERING SHOWCASE -->
<section class="section px-section" id="dark-pool-intelligence">
  <div class="px-section-head">
    <span class="eyebrow">SILICON VALLEY &amp; LONDON ($5M+) ENTERPRISE INTELLIGENCE</span>
    <h2>6 AI Search Black Boxes That Traditional SEO Ignores</h2>
    <p>Ahrefs, Semrush, and legacy tools only count keywords and meta tags. Foundation neural models like ChatGPT, Perplexity, and Google Gemini evaluate your domain across these 6 hidden transformer layers before citing or discarding your content.</p>
  </div>
  <div class="dp-grid">
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">01</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">14KB AST Token Bloat (Payload Budget)</h3>
      <p class="dp-desc">GPTBot and Perplexity crawlers enforce early ingestion truncation on bloated HTML exceeding the 14KB AST budget; crawlers exhaust token capacity before reaching lower pricing and product offerings.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: Cloudflare Worker HTMLRewriter AST trimming and sub-40ms edge TTFB</span></div>
    </article>
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">02</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">Entity Vault &amp; Wikidata Consensus</h3>
      <p class="dp-desc">Without explicit triangulation in global Knowledge Graphs, neural models cannot verify your brand as an authoritative entity, systematically omitting your company in favor of competitors.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: W3C JSON-LD 1.1 @graph, sameAs Wikidata QID and Google MID consensus</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">03</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">512-Token RAG Semantic Fragmentation</h3>
      <p class="dp-desc">Standard 512-token vector chunking fractures entity definitions and value propositions; search engines fail to retrieve key context during semantic generation.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: data-chunk-id semantic boundary markup and contextual preservation</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">04</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">Cross-Encoder &amp; Numerical Density</h3>
      <p class="dp-desc">Cross-encoder neural rerankers (Cohere, bge-reranker) discard promotional puffery; passages lacking hard numerical metrics and verified facts are filtered out of answer sets.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: Opening 45-word numerical fact density template under H2 headings</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">05</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">AI Corpus PMI (Model Co-Occurrence)</h3>
      <p class="dp-desc">If your brand lacks co-occurrence alongside industry benchmarks in foundational training corpuses (Common Crawl), models never recommend you spontaneously in zero-shot queries.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: Canonical benchmark definitions and sectoral PMI co-occurrence anchors</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">06</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">ColBERT MaxSim Late-Interaction</h3>
      <p class="dp-desc">Multi-vector retrieval engines fail to achieve maximum late-interaction dot-product scores when heading tokens fail to align with natural-language user queries.</p>
      <div class="dp-fix"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg><span>Fix: Multi-vector query token enrichment across H2/H3 semantic heading hierarchy</span></div>
    </article>
  </div>
  
  <div class="dp-callout">
    <div class="dp-callout-text">
      <span>ZERO CONSULTING OVERHEAD · IN-HOUSE HANDOVER</span>
      <h3>Don't Pay $5,000/mo in Agency Retainers. Audit Free, Hand Code to Your Devs.</h3>
      <p>HTML&amp;HTML is not an agency or marketing consultancy; it is an automated deterministic engineering platform. Audit your site for free. Unlock the 30+ file implementation pack for $99 and have your developers execute fixes in hours.</p>
    </div>
    <div class="dp-callout-action">
      <a href="#scanner" class="btn-scan-trigger">Start Free AI Audit →</a>
      <span>No account required · Live results in 10s</span>
    </div>
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
      <button type="button" class="btn-pdf-export" id="btnPdfExport" aria-label="Export Full PDF">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span data-i18n="downloadPdf">📄 Export Full PDF</span>
      </button>
      <button type="button" class="btn-pdf-export btn-zip-export" id="btnZipExport" style="background:#0284c7;border-color:#0284c7;color:#ffffff;" aria-label="Download 30+ File ZIP Pack">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
        <span>📦 Download 30+ File ZIP</span>
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
        <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="139" height="24">
      </a>
      <p data-i18n="footerTag">Evidence is free. Automated code generator is the product.</p>
      <div class="preferred-source-wrap" style="margin-top:0.75rem;">
        <div google-add-preferred-source-btn data-theme="dark" data-lang="en"></div>
        <noscript><a href="https://www.google.com/preferences/source?q=htmlandhtml.com" target="_blank" rel="noreferrer" style="font-size:0.75rem;color:var(--text-muted, #94a3b8);">Add as Preferred Source on Google</a></noscript>
      </div>
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
<script src="/assets/js/mobile-space-runtime.js?v=hh3" defer></script>
</body>
</html>'''

    write_page("index.html", root_html)
    tr_html = root_html.replace(
        "<title>Yapay Zeka SEO Analizi ve AI Görünürlük Testi | HTML&amp;HTML</title>",
        "<title>Yapay Zeka SEO Analizi ve AI Görünürlük Testi | HTML&amp;HTML</title>"
    ).replace(
        '<link rel="canonical" href="https://htmlandhtml.com/">',
        '<link rel="canonical" href="https://htmlandhtml.com/tr/">'
    )
    write_page("tr/index.html", tr_html)
    write_page("en/index.html", en_html)
    print("All homepages built cleanly.")

if __name__ == '__main__':
    build_homepages()
