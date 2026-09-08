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
<title>Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&amp;HTML</title>
<meta name="description" content="Web siteniz yapay zeka arama sonuçlarında çıkmaya ve tavsiye edilme fırsatı kazanmaya hazır mı? GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt ve teknik temeli ücretsiz kontrol edin.">
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
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=hh4">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=hh4">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=hh4">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=hh4">
<link rel="icon" href="/favicon.ico?v=hh4" sizes="any">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css">
<link rel="stylesheet" href="/assets/css/validator.css?v=8">
<link rel="stylesheet" href="/assets/css/theme.css?v=11">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=3">
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
<script src="/assets/js/validator.js?v=15" defer></script>
<script src="/assets/js/theme.js?v=7"></script>
<script src="/assets/js/ai-positioning.js?v=1" defer></script>
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">İçeriğe geç</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="162" height="28">
    </a>
    <nav class="primary-nav" aria-label="Ana navigasyon">
      <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
      <a href="/tr/yapay-zeka-arama-gorunurlugu/">Çözümler</a>
      <a href="/tr/llms-txt-haberler/">Haberler</a>
      <a href="/tr/sozluk/">Sözlük</a>
      <a href="/tr/fiyatlandirma/" data-i18n="navPrice">Onarım Seti ($99)</a>
    </nav>
    <div class="nav-actions">
      <a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Kontrol</a>
      <div class="langs">
        <button data-lang="tr" class="active">TR</button><span>/</span><button data-lang="en">EN</button>
      </div>
    </div>
  </div>
</header>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">KURUMSAL AI ARAMA İSTİHBARATI / V4.1</b></div>
  <h1 data-i18n="heroTitle">Yapay zeka sitenizi tavsiye ediyor mu?<br><em data-i18n="heroSubtitle">Yapay Zeka Sizi Buluyor mu? Tavsiye Edilmeye Hazır mısınız?</em></h1>
  <p class="hero-answer" data-i18n="heroCopy">ChatGPT, Claude ve Perplexity için 18 motorlu otonom denetim ve dağıtım paketi. 15 saniyede tek tıkla sitenizi tarayın, model ağırlıklarındaki ve RAG mimarisindeki görünürlük kayıplarını kanıtıyla görün.</p>
  
  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <label for="domainInput" class="sr-only">Taranacak web sitesi adresi</label>
        <input id="domainInput" aria-label="Taranacak web sitesi veya alan adı" autocomplete="off" autocorrect="off" autocapitalize="off" inputmode="url" spellcheck="false" placeholder="https://sirketiniz.com/" required>
        <button id="scanButton" type="submit"><b data-i18n="scan">Derin AI Denetimi Başlat</b><span class="btn-arrow" aria-hidden="true">→</span><span class="sr-only">Ücretsiz Kontrol Et</span></button>
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
      <p>120 derin kontrol, 43 sayfa taraması ve 30 canlı link probu ile üretilen deterministik denetim ortamı. Kod seviyesinde teknik kanıtlar, kilitli onarım yol haritaları ve n8n CI/CD otomasyon paketleriyle donatılmış kurumsal analiz platformunu keşfedin.</p>
    </div>

    <!-- Metric Ribbon -->
    <div class="ea-ribbon">
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">🛡️</div>
        <div>
          <strong>120 Kontrol Noktası</strong>
          <span>HTTP, robots, sitemap, DOM, Schema, CWV</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">📑</div>
        <div>
          <strong>43 Sayfa &amp; 30 Canlı Prob</strong>
          <span>Kablo seviyesinde kanıt tespiti</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">⚠️</div>
        <div>
          <strong>15 Teknik Kanıtlı Bulgu</strong>
          <span>Kök neden tespiti ve iş etkisi</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">⚡</div>
        <div>
          <strong>45 Çözüm Yol Haritası</strong>
          <span>Geri alma güvenceli kod blokları</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">📦</div>
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
            <p>120 kontrolde 108 bulgu tespit edildi. Yapay zeka arama motorları için kritik engelleyiciler mevcut.</p>
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

          <div class="ea-code-sandbox">
            <pre class="ea-code-underlay"><code>&lt;!-- Çözüm Yol Haritası &amp; Kod Şablonu --&gt;
&lt;link rel="canonical" href="https://htmlandhtml.com/en"&gt;
&lt;link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr"&gt;
&lt;link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en"&gt;
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cloudflare edge cache</code></pre>
            <div class="ea-frosted-cover">
              <span class="ea-lock-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Kilitli Çözüm Yol Haritası (3 Adım)
              </span>
              <p>15 bulgunun tamamı için kök neden çözümleri, kod örnekleri ve n8n CI/CD otomasyon şablonları.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Launch Bar -->
    <div class="ea-actions-bar">
      <a href="/enterprise-analyzer/" class="ea-btn-primary" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        Canlı Enterprise Analizörü Başlat ↗
      </a>
      <a href="/enterprise-analyzer/htmlandhtml-ai-report.html" class="ea-btn-secondary" target="_blank" rel="noopener">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        Örnek Raporu İncele →
      </a>
    </div>

    <div class="ea-footnote">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
      <span><strong>Müdahalesiz Denetim Güvencesi:</strong> Müşterinin kaynak koduna doğrudan dokunulmaz. Teşhis ve çözüm yol haritaları kendi yazılım ekibinize teslim edilmek üzere üretilir.</span>
    </div>
  </div>
</section>

<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->
<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">ÖZEL DENETİM ARAÇLARI / END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>Yapay Zeka Sizi Nasıl Tavsiye Eder ve Görünürlük Nedir?</h2>
    <p>Yapay zeka görünürlüğü (GEO/AEO) nedir? GEO, arama ve yapay zeka modellerinin sitenizi doğrudan referans almasıdır. HTML&amp;HTML, 18 motor (18 engines) ve %100 deterministik kanıt standardıyla çalışır.</p>
  </div>
  <ol class="px-pipeline-flow">
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">ADIM 01</div>
        <h3>Canlı URL Girişi</h3>
        <p>DoH (DNS-over-HTTPS) ve RFC 1918 SSRF izolasyonu ile hedef host güvenlik çemberine alınır.</p>
        <div class="pipeline-micro-stream">
          <span>🛡️ DoH DNS Koruması</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">ADIM 02</div>
        <h3>18 Motorlu Paralel Tarama</h3>
        <p>cl100k AST token ayrıştırma, 14KB bütçe kontrolü, Cross-Encoder attention ve RAG chunk testleri.</p>
        <div class="pipeline-micro-stream">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">ADIM 03</div>
        <h3>Deterministik Kanıt Kilidi</h3>
        <p>UNKNOWN ≠ PASS kuralı. Varsayımsız, kablo seviyesi HTTP/DOM ispatı ve P0–P3 etki matrisi.</p>
        <div class="pipeline-micro-stream">
          <span>⚖️ P0–P3 Etki Matrisi</span>
          <span>📋 24 Alanlı Bulgu Şeması</span>
          <span>🛑 Stop-Gate Denetimi</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card px-pipeline-card-highlight">
        <div class="pipeline-step-badge highlight">ADIM 04</div>
        <h3>22 Dosyalık Onarım Paketi</h3>
        <p>Kök neden çözümü, test.js kabul testleri, 00_ROLLBACK_PLAN ve 30 sayfalık makine yüzeyi.</p>
        <div class="pipeline-micro-stream">
          <span>⚙️ test.js Scriptleri</span>
          <span>🔄 Geri Alma Güvencesi</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:24px;">
    <div class="px-lens"><b>01 BULUN</b><span>Robots.txt · Sitemap · AI Bot Erişimi</span></div>
    <div class="px-lens"><b>02 ANLAŞILIN</b><span>Schema Graph · Wikidata QID · llms.txt</span></div>
    <div class="px-lens"><b>03 KAYNAK OLUN</b><span>Cross-Encoder · RAG 512 · E-E-A-T</span></div>
    <div class="px-lens"><b>04 DÖNÜŞÜN</b><span>14KB AST Purge · OpenAPI · A2A / MCP</span></div>
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
      <button type="button" class="btn-pdf-export" id="btnPdfExport" onclick="if(window.openSaasRemediationModal){window.openSaasRemediationModal()}else{location.href='/checkout?plan=pro'}" aria-label="Kurumsal Rapor (Canlı SaaS)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <span data-i18n="downloadPdf">Kurumsal Rapor (Canlı SaaS)</span>
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
        <small data-i18n="oneSite">1 domain | Sınırsız indirme | 30 gün garanti</small>
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
  <details><summary data-i18n="q1">Ücretsiz taramada ne saklanır?</summary><p data-i18n="a1">Problem saklanmaz. URL, severity, confidence, evidence ve kategori görünür. $99 yazılım paketi; kod şablonlarını, test komutlarını ve geri alma planlarını otomatik üretir.</p></details>
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
      <div class="preferred-source-wrap" style="margin-top:0.75rem;">
        <div google-add-preferred-source-btn data-theme="dark" data-lang="tr"></div>
        <noscript><a href="https://www.google.com/preferences/source?q=htmlandhtml.com" target="_blank" rel="noreferrer" style="font-size:0.75rem;color:var(--text-muted, #94a3b8);">Google'da Tercih Edilen Kaynak Olarak Ekle</a></noscript>
      </div>
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
</body>
</html>'''

    # English en/index.html
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
<title>AI Search Visibility, GEO, AEO &amp; llms.txt | HTML&amp;HTML</title>
<meta name="description" content="Is your website ready to appear in AI search and earn recommendation opportunity? Check GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt and the technical foundation free.">
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
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=hh4">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png?v=hh4">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png?v=hh4">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=hh4">
<link rel="icon" href="/favicon.ico?v=hh4" sizes="any">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css">
<link rel="stylesheet" href="/assets/css/validator.css?v=8">
<link rel="stylesheet" href="/assets/css/theme.css?v=11">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=3">
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
<script src="/assets/js/validator.js?v=15" defer></script>
<script src="/assets/js/theme.js?v=7"></script>
<script src="/assets/js/ai-positioning.js?v=1" defer></script>
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
</head>
<body class="enterprise-ui">
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="162" height="28">
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
    </div>
  </div>
</header>

<main data-commercial-intent="static">
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">ENTERPRISE AI SEARCH INTELLIGENCE / V4.1</b></div>
  <h1 data-i18n="heroTitle">Does AI Recommend You?<br><em data-i18n="heroSubtitle">Can AI Find You? Are You Ready to Be Recommended?</em></h1>
  <p class="hero-answer" data-i18n="heroCopy">Autonomous 18-engine diagnostic &amp; deployment pack for ChatGPT, Claude, and Perplexity. Run a 1-click deep audit in 15 seconds to uncover model weight and RAG architectural gaps.</p>
  
  <!-- 02 SCANNER -->
  <div class="scanbox">
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <label for="domainInput" class="sr-only">Target website domain</label>
        <input id="domainInput" aria-label="Website or domain to scan" autocomplete="off" autocorrect="off" autocapitalize="off" inputmode="url" spellcheck="false" placeholder="https://yourcompany.com/" required>
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
      <p>Deterministic diagnostic environment operating across 120 deep checks, 43-page crawl, and 30 live link probes. Explore wire-level technical evidence, locked remediation roadmaps, and n8n CI/CD automation packages.</p>
    </div>

    <!-- Metric Ribbon -->
    <div class="ea-ribbon">
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">🛡️</div>
        <div>
          <strong>120 Control Checks</strong>
          <span>HTTP, robots, sitemap, DOM, Schema, CWV</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">📑</div>
        <div>
          <strong>43 Pages &amp; 30 Probes</strong>
          <span>Wire-level evidence assertion</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">⚠️</div>
        <div>
          <strong>15 Evidence Findings</strong>
          <span>Root-cause identification &amp; impact</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">⚡</div>
        <div>
          <strong>45 Solution Roadmaps</strong>
          <span>Rollback-guaranteed code templates</span>
        </div>
      </div>
      <div class="ea-ribbon-item">
        <div class="ea-ribbon-icon" aria-hidden="true">📦</div>
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
            <p>108 findings detected across 120 checks. Critical blockers exist for AI search engines.</p>
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

          <div class="ea-code-sandbox">
            <pre class="ea-code-underlay"><code>&lt;!-- Remediation Roadmap &amp; Code Template --&gt;
&lt;link rel="canonical" href="https://htmlandhtml.com/en"&gt;
&lt;link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr"&gt;
&lt;link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en"&gt;
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cloudflare edge cache</code></pre>
            <div class="ea-frosted-cover">
              <span class="ea-lock-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Locked Remediation Roadmap (3 Steps)
              </span>
              <p>Step-by-step root-cause fixes, code samples, and n8n CI/CD automation templates for all 15 findings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Launch Bar -->
    <div class="ea-actions-bar">
      <a href="/enterprise-analyzer/" class="ea-btn-primary" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        Launch Live Enterprise Analyzer ↗
      </a>
      <a href="/enterprise-analyzer/htmlandhtml-ai-report.html" class="ea-btn-secondary" target="_blank" rel="noopener">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        View Sample Report →
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
    <span class="eyebrow">SPECIALIZED AUDIT TOOLS / END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>How Do AI Models Recommend Your Website and What is GEO?</h2>
    <p>What is Generative Engine Optimization (GEO)? GEO is the optimization of content for AI engines. HTML&amp;HTML audits websites across 18 engines with 100% deterministic evidence.</p>
  </div>
  <ol class="px-pipeline-flow">
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">STEP 01</div>
        <h3>Live URL Ingestion</h3>
        <p>DoH (DNS-over-HTTPS) resolution and RFC 1918 SSRF isolation sandbox the target host safely.</p>
        <div class="pipeline-micro-stream">
          <span>🛡️ DoH DNS Shield</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">STEP 02</div>
        <h3>18-Engine Parallel Crawl</h3>
        <p>cl100k AST token parsing, 14KB budget enforcement, Cross-Encoder attention, and RAG chunk boundary tests.</p>
        <div class="pipeline-micro-stream">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card">
        <div class="pipeline-step-badge">STEP 03</div>
        <h3>Deterministic Evidence Gate</h3>
        <p>UNKNOWN ≠ PASS principle. Wire-level HTTP/DOM proof without heuristics, mapped to P0–P3 impact matrix.</p>
        <div class="pipeline-micro-stream">
          <span>⚖️ P0–P3 Impact Matrix</span>
          <span>📋 24-Field Finding Schema</span>
          <span>🛑 Stop-Gate Assertion</span>
        </div>
      </article>
    </li>
    <li class="pipeline-flow-arrow" aria-hidden="true">⟶</li>
    <li class="px-pipeline-step">
      <article class="px-pipeline-card px-pipeline-card-highlight">
        <div class="pipeline-step-badge highlight">STEP 04</div>
        <h3>22-File Enterprise Repair Kit</h3>
        <p>Root-cause remediation, test.js verification suites, 00_ROLLBACK_PLAN, and 30-page machine surface.</p>
        <div class="pipeline-micro-stream">
          <span>⚙️ test.js Suites</span>
          <span>🔄 Rollback Guarantees</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:24px;">
    <div class="px-lens"><b>01 GET DISCOVERED</b><span>Robots.txt · Sitemap · AI Bot Access</span></div>
    <div class="px-lens"><b>02 BE UNDERSTOOD</b><span>Schema Graph · Wikidata QID · llms.txt</span></div>
    <div class="px-lens"><b>03 BECOME SOURCE</b><span>Cross-Encoder · RAG 512 · E-E-A-T</span></div>
    <div class="px-lens"><b>04 CONVERT</b><span>14KB AST Purge · OpenAPI · A2A / MCP</span></div>
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
      <button type="button" class="btn-pdf-export" id="btnPdfExport" onclick="if(window.openSaasRemediationModal){window.openSaasRemediationModal()}else{location.href='/checkout?plan=pro'}" aria-label="Executive Report (Live SaaS)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        <span data-i18n="downloadPdf">Executive Report (Live SaaS)</span>
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
  <details><summary data-i18n="q1">What is hidden in the free scan?</summary><p data-i18n="a1">The problem is not hidden. URL, severity, confidence, evidence and category are visible. The paid layer unlocks automated code templates, test suites and rollback plans.</p></details>
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
</body>
</html>'''

    write_page("index.html", root_html)
    tr_html = root_html.replace(
        "<title>Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&amp;HTML</title>",
        "<title>Web Sitesi Yapay Zeka Arama Hazırlığı ve Teşhis | HTML&amp;HTML</title>"
    ).replace(
        '<link rel="canonical" href="https://htmlandhtml.com/">',
        '<link rel="canonical" href="https://htmlandhtml.com/tr/">'
    )
    write_page("tr/index.html", tr_html)
    write_page("en/index.html", en_html)
    print("All homepages built cleanly.")

if __name__ == '__main__':
    build_homepages()
