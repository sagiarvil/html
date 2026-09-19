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
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/enterprise-theme-system.css">
<link rel="stylesheet" href="/assets/css/validator.css?v=23">
<link rel="stylesheet" href="/assets/css/theme.css?v=9">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=2026091915">
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
    </a>
    <nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
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
<section class="hero decision-hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">AI ARAMA TEKNİK TEŞHİS PLATFORMU</b></div>
  <h1 data-i18n="heroTitle">Web Siteniz Yapay Zeka Aramalarında Neden Görünmüyor?</h1>
  <p class="hero-answer" data-i18n="heroCopy">URL'nizi girin. HTML&amp;HTML sitenizin bulunmasını, anlaşılmasını ve kaynak olarak değerlendirilmesini engelleyebilecek web sitesi sorunlarını kanıtıyla gösterir.</p>

  <div class="decision-hero-proof" aria-label="Ücretsiz tarama sınırları">
    <span>Ücretsiz teşhis</span><span>Gerçek URL / HTTP / HTML kanıtı</span><span>Kaynak kod erişimi yok</span>
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
</section>

<!-- CUSTOMER DECISION HOMEPAGE V2 -->
<section class="decision-shell" id="customer-story" aria-label="HTML&HTML müşteri karar sistemi">

  <section class="decision-section decision-diagnosis" id="commercial-diagnosis">
    <div class="decision-section-no">01</div>
    <div class="decision-heading">
      <span class="decision-kicker">SATMIYORSA ÖNCE NEDENİNİ BUL</span>
      <h2>Sorun trafik olmayabilir. Kırılan karar basamağını bulun.</h2>
      <p>HTML&amp;HTML teknik gösteri yapmaz; müşterinin neden anlamadığını, güvenmediğini, sizi bulamadığını veya aksiyona geçmediğini ölçülebilir web sinyalleriyle ayırır.</p>
    </div>
    <div class="decision-question-grid">
      <article><b>01</b><h3>Müşteri</h3><p>5 saniyede ne sattığınız anlaşılıyor mu?</p><span>Teklif belirsizse ziyaretçi karar veremez.</span></article>
      <article><b>02</b><h3>Güven</h3><p>İddianızı destekleyen kanıt görünür mü?</p><span>Kanıt yoksa satın alma ertelenir.</span></article>
      <article><b>03</b><h3>Dağıtım</h3><p>Google ve AI sistemleri sizi okuyabiliyor mu?</p><span>Bulunamayan ürün değerlendirme fırsatını kaybeder.</span></article>
      <article><b>04</b><h3>Referans</h3><p>Kararı destekleyen örnek çıktı var mı?</p><span>Söz değil, görülebilir örnek güven üretir.</span></article>
      <article><b>05</b><h3>Satış kanalı</h3><p>Teklif ve CTA doğru sırada mı?</p><span>Trafik, net bir sonraki adıma bağlanmalıdır.</span></article>
    </div>
  </section>

  <section class="decision-section decision-pillars" id="decision-pillars">
    <div class="decision-section-no">02</div>
    <div class="decision-heading decision-heading--split">
      <div>
        <span class="decision-kicker">TEK ÇATI ALTINDA</span>
        <h2>Web sitenizi sayfa olarak değil, karar sistemi olarak inceler.</h2>
      </div>
      <p>Her problem aynı dört soruya çevrilir: <strong>Ne yanlış?</strong> <strong>Kanıtı ne?</strong> <strong>Neyi etkiliyor?</strong> <strong>Önce ne düzeltilmeli?</strong></p>
    </div>
    <div class="decision-bridge" aria-label="Karar zinciri">
      <span>Problem</span><i>→</i><span>Kanıt</span><i>→</i><span>Etki</span><i>→</i><span>Öncelik</span><i>→</i><span>Düzeltme</span>
    </div>
  </section>

  <section class="decision-section decision-output" id="sample-output">
    <div class="decision-section-no">03</div>
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
          <div class="decision-paid"><b>$99 FIX PACK</b><span>Kök neden → exact fix → test → rollback → re-scan</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="decision-section decision-offer" id="offer">
    <div class="decision-section-no">04</div>
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
        <span>$99 · TEK SEFERLİK</span>
        <h3>Nasıl düzeltileceğini ekibinize verin.</h3>
        <ul><li>Kök neden</li><li>Exact fix / konfigürasyon</li><li>Uygulama sırası</li><li>Acceptance + regression test</li><li>Rollback + 30 gün içinde 1 re-scan</li></ul>
        <a href="/tr/fiyatlandirma/">Fix Pack'i incele →</a>
      </article>
    </div>
  </section>

  <section class="decision-section decision-trust" id="trust">
    <div class="decision-section-no">05</div>
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

  <section class="decision-section decision-close" id="final-cta">
    <div class="decision-section-no">06</div>
    <div>
      <span class="decision-kicker">İLK KARAR 5 SANİYEDE NET OLSUN</span>
      <h2>Sitenizin AI aramalarında neden zayıf kaldığını ücretsiz görün.</h2>
      <p>Sorun gerçekse $99'a yazılımcınızın uygulayacağı düzeltme paketini alın.</p>
      <div class="decision-actions">
        <a class="decision-btn decision-btn--light" href="#scanner">Sitemi ücretsiz tara →</a>
        <a class="decision-btn decision-btn--ghost" href="/tr/fiyatlandirma/">$99 Fix Pack</a>
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
<html lang="en" translate="no">
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
<link rel="stylesheet" href="/assets/css/validator.css?v=23">
<link rel="stylesheet" href="/assets/css/theme.css?v=9">
<link rel="stylesheet" href="/assets/css/premium-experience.css?v=2026091915">
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
<section class="hero decision-hero" id="scanner">
  <div class="kicker"><span></span><b data-i18n="kicker">AI SEARCH TECHNICAL DIAGNOSTIC PLATFORM</b></div>
  <h1 data-i18n="heroTitle">Why Is Your Website Missing From AI Search?</h1>
  <p class="hero-answer" data-i18n="heroCopy">Enter your URL. HTML&amp;HTML shows evidence-backed website issues that can prevent discovery, understanding and source consideration across AI search systems.</p>

  <div class="decision-hero-proof" aria-label="Free scan boundaries">
    <span>Free diagnosis</span><span>Real URL / HTTP / HTML evidence</span><span>No source-code access</span>
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
</section>

<!-- CUSTOMER DECISION HOMEPAGE V2 -->
<section class="decision-shell" id="customer-story" aria-label="HTML&HTML customer decision system">
  <section class="decision-section decision-diagnosis" id="commercial-diagnosis">
    <div class="decision-section-no">01</div>
    <div class="decision-heading">
      <span class="decision-kicker">IF IT DOESN'T SELL, FIND THE BROKEN STEP</span>
      <h2>Traffic may not be the problem. Find where the decision breaks.</h2>
      <p>HTML&amp;HTML separates whether visitors fail to understand, trust, discover or act on your website using measurable site-side evidence.</p>
    </div>
    <div class="decision-question-grid">
      <article><b>01</b><h3>Customer</h3><p>Can people understand the offer in 5 seconds?</p><span>Unclear offers delay decisions.</span></article>
      <article><b>02</b><h3>Trust</h3><p>Is visible evidence supporting your claims?</p><span>Unproven claims weaken purchase confidence.</span></article>
      <article><b>03</b><h3>Distribution</h3><p>Can Google and AI systems read the site?</p><span>Unfindable products lose evaluation opportunities.</span></article>
      <article><b>04</b><h3>Reference</h3><p>Can buyers inspect a real example output?</p><span>Visible proof beats promises.</span></article>
      <article><b>05</b><h3>Sales channel</h3><p>Does the offer lead to one clear next action?</p><span>Traffic needs a conversion path.</span></article>
    </div>
  </section>

  <section class="decision-section decision-pillars" id="decision-pillars">
    <div class="decision-section-no">02</div>
    <div class="decision-heading decision-heading--split">
      <div><span class="decision-kicker">ONE DECISION SYSTEM</span><h2>Evaluate the website as a decision system, not a feature list.</h2></div>
      <p>Every issue becomes four questions: <strong>What is wrong?</strong> <strong>What proves it?</strong> <strong>What does it affect?</strong> <strong>What should change first?</strong></p>
    </div>
    <div class="decision-bridge"><span>Problem</span><i>→</i><span>Evidence</span><i>→</i><span>Impact</span><i>→</i><span>Priority</span><i>→</i><span>Fix</span></div>
  </section>

  <section class="decision-section decision-output" id="sample-output">
    <div class="decision-section-no">03</div>
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
          <div class="decision-paid"><b>$99 FIX PACK</b><span>Root cause → exact fix → test → rollback → re-scan</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class="decision-section decision-offer" id="offer">
    <div class="decision-section-no">04</div>
    <div class="decision-heading">
      <span class="decision-kicker">FREE DIAGNOSIS → PAID IMPLEMENTATION</span>
      <h2>Pay for an implementable fix package, not for another audit.</h2>
    </div>
    <div class="decision-offer-grid">
      <article class="decision-offer-card"><span>FREE</span><h3>See what is wrong.</h3><ul><li>Finding</li><li>URL / location</li><li>Evidence</li><li>Priority</li><li>General fix direction</li></ul><a href="#scanner">Scan free →</a></article>
      <article class="decision-offer-card decision-offer-card--paid"><span>$99 · ONE TIME</span><h3>Give your team the implementation path.</h3><ul><li>Root cause</li><li>Exact fix / configuration</li><li>Implementation order</li><li>Acceptance + regression test</li><li>Rollback + one re-scan within 30 days</li></ul><a href="/en/pricing/">View Fix Pack →</a></article>
    </div>
  </section>

  <section class="decision-section decision-trust" id="trust">
    <div class="decision-section-no">05</div>
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

  <section class="decision-section decision-close" id="final-cta">
    <div class="decision-section-no">06</div>
    <div><span class="decision-kicker">MAKE THE FIRST DECISION IN 5 SECONDS</span><h2>See why your site is weak in AI search for free.</h2><p>If the issue is real, get the $99 fix package your developer can implement.</p><div class="decision-actions"><a class="decision-btn decision-btn--light" href="#scanner">Scan my site free →</a><a class="decision-btn decision-btn--ghost" href="/en/pricing/">$99 Fix Pack</a></div></div>
    <div class="decision-orbits" aria-hidden="true"><span>Customer</span><span>Trust</span><span>Distribution</span><span>Reference</span><span>Sales</span></div>
  </section>
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
