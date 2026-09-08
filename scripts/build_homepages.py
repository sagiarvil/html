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
<script src="/assets/js/enterprise-theme-engine.js?v=2" defer></script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
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
</head>
<body>
<a class="skip" href="#scanner" data-i18n="skip">İçeriğe geç</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh5" alt="HTML&amp;HTML" width="127" height="28">
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

<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->
<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">ÖZEL DENETİM ARAÇLARI / END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>Özel Denetim Araçları ve Karar Mimarisi</h2>
    <p>Silikon Vadisi ve New York kurumsal arama mühendisliği standardında; 18 motor, 105 kontrol ve kanıt kilidiyle çalışan deterministik karar akışı.</p>
  </div>
  <div class="px-pipeline-flow">
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
  </div>
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
        <img class="brand-logo" src="/assets/logo.png?v=hh5" alt="HTML&amp;HTML" width="109" height="24">
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
    <p>&copy; 2026 HTML&amp;HTML. Deterministik yapay zeka ve web sitesi analiz platformu. Ödemeler ve faturalandırma yetkili Satıcı ve Aracı Kurum (Merchant of Record) Paddle.com tarafından yürütülür.</p>
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
<script src="/assets/js/enterprise-theme-engine.js?v=2" defer></script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "HTML&HTML Website Fix Validator",
      "url": "https://htmlandhtml.com/en/",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
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
</head>
<body class="enterprise-ui">
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png?v=hh5" alt="HTML&amp;HTML" width="127" height="28">
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

<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->
<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">SPECIALIZED AUDIT TOOLS / END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>Specialized Diagnostic Tools &amp; Decision Architecture</h2>
    <p>Silicon Valley and New York enterprise search engineering standards; deterministic pipeline operating across 18 engines, 105 controls, and cryptographic evidence verification.</p>
  </div>
  <div class="px-pipeline-flow">
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
    <div class="pipeline-flow-arrow" aria-hidden="true">⟶</div>
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
  </div>
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
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Full Site Yol Haritası →</a>
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
        <img class="brand-logo" src="/assets/logo.png?v=hh5" alt="HTML&amp;HTML" width="109" height="24">
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
    <p>&copy; 2026 HTML&amp;HTML. All rights reserved. Payments and billing are processed by our authorized reseller and Merchant of Record Paddle.com.</p>
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
