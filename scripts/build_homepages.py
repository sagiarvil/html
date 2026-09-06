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
    # Tools directory items
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
<title>HTML&HTML — 12-Motor Website Fix Validator</title>
<meta name="description" content="Web sitenizin yapay zeka ajanları tarafından müşterilerinize doğrudan önerilmesini sağlayacak teknik altyapıyı kuruyoruz. 12 motorlu ücretsiz analizi başlatın.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<meta property="og:type" content="website">
<meta property="og:url" content="https://htmlandhtml.com/">
<meta property="og:title" content="HTML&HTML — Evidence free. Implementation paid.">
<meta property="og:description" content="12-engine public website diagnosis with implementation-grade Fix Mandates for AI coding agents.">
<meta name="theme-color" content="#f4f1e9">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/css/validator.css?v=2">
<style>.pricing-grid.pricing-two .featured{{padding-top:72px}}.pricing-grid.pricing-two .featured .popular{{top:20px;left:24px;right:auto;max-width:calc(100% - 48px);white-space:nowrap}}.pricing-grid.pricing-two .featured .pricehead{{gap:24px}}@media(max-width:600px){{.pricing-grid.pricing-two .featured{{padding-top:68px}}.pricing-grid.pricing-two .featured .popular{{left:20px;max-width:calc(100% - 40px)}}}}</style>
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
        {{ "@type": "Offer", "name": "Full Site Fix Mandate", "price": "99", "priceCurrency": "USD" }}
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
    <nav>
      <a href="/tr/platform/">Platform</a>
      <a href="/tr/araclar/">Araçlar</a>
      <a href="/tr/rehberler/">Rehberler</a>
      <a href="/tr/methodology/" data-methodology-link data-i18n="footerMethod">Metodoloji</a>
      <a href="/tr/fiyatlandirma/" data-i18n="navPrice">Fiyat</a>
      <a href="/openapi.json" target="_blank" rel="noopener">API</a>
    </nav>
    <div class="nav-actions">
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
  <h1 data-i18n="heroTitle">Sorunları görmek<br><em>tamamen ücretsiz.</em></h1>
  <p data-i18n="heroCopy">Alan adını girin. 12 bağımsız analiz motoru herkese açık site yüzeyini tarasın; problemi, önemini, güven seviyesini ve kanıtı gösterelim. Uygulama talimatı ödeme katmanında açılır.</p>
  
  <!-- 02 SCANNER -->
  <div class="scanbox">
    <div class="tabs">
      <button class="active" data-mode="domain" data-i18n="tabDomain">Alan adı tara</button>
      <button data-mode="url" data-i18n="tabUrl">Tam URL tara</button>
    </div>
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <input id="domainInput" autocomplete="url" inputmode="url" spellcheck="false" placeholder="ornek.com" required>
        <button id="scanButton" type="submit"><b data-i18n="scan">Ücretsiz Tara</b><i>→</i></button>
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
    <div class="total-score">
      <strong id="overallScore">0</strong>
      <span>/100</span>
    </div>
  </div>
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
        <small data-i18n="oneSite">1 domain / tek çalışma</small>
        <strong>$99</strong>
      </div>
      <a class="cta" id="mandateLink" href="/checkout" data-i18n="getMandate">Full Site Fix Mandate →</a>
      <small class="note" data-i18n="checkoutNote">Kaynak dosya adı public taramadan uydurulmaz; codebase bağlamı varsa dosya seviyesine iner.</small>
    </aside>
  </div>
</section>

<!-- 03 CORE VALUE -->
<section class="section" id="core-value">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 01</span>
    <h2>Website AI Readiness</h2>
    <p>Arama motorları ve yapay zeka sistemleri için web sitenizin taranabilirliğini, semantik doğruluğunu ve makine arayüzlerini deterministik bir döngüde denetleyin.</p>
  </header>
  <div class="authority-proof" style="justify-content: center; margin-bottom: 36px;">
    <span>SCAN</span><span>EVIDENCE</span><span>PRIORITIZE</span><span>FIX</span><span>RE-SCAN</span><span>MONITOR</span>
  </div>
</section>

<!-- 04 TOOL DIRECTORY -->
<section class="section" id="tools">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 02</span>
    <h2>Özel Denetim Araçları</h2>
    <p>Aynı güvenilir 12 motorlu tarama çekirdeğiyle çalışan, belirli teknik alanlara odaklanmış araçlarımız.</p>
  </header>
  <div class="authority-grid">
    {''.join(f'<article class="authority-card"><b>ARAÇ</b><h3>{name}</h3><p>{desc}</p><a href="{url}">Aracı Başlat →</a></article>' for name, url, desc in tools_tr)}
  </div>
</section>

<!-- 05 12 ENGINES / EVIDENCE / TRUST -->
<section class="section" id="engines">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 03</span>
    <h2 data-i18n="enginesTitle">12 motor. Tek deterministik karar zinciri.</h2>
    <p data-i18n="enginesCopy">Her motor ölçülebilir kurallardan skor üretir. Kanıtlanamayan sinyal “unknown” kalır; tahmin puana zorla yazılmaz.</p>
  </header>
  <div class="engine-grid">
    <article><b>01</b><h3 data-i18n="engine1">Tarama ve İndeksleme</h3><p data-i18n="e1">HTTP, redirect, robots, sitemap, indexability ve sayfa keşfi.</p></article>
    <article><b>02</b><h3 data-i18n="engine2">Teknik SEO</h3><p data-i18n="e2">Title, meta, H1, canonical, duplicate ve route-level sinyaller.</p></article>
    <article><b>03</b><h3 data-i18n="engine3">AI / GEO Erişimi</h3><p data-i18n="e3">Googlebot, OAI-SearchBot, Claude-SearchBot, Claude-User ve PerplexityBot politika kontrolü.</p></article>
    <article><b>04</b><h3 data-i18n="engine4">llms.txt v2</h3><p data-i18n="e4">Format, link erişimi, describedby ve Markdown alternate keşfi.</p></article>
    <article><b>05</b><h3 data-i18n="engine5">Yapısal Veri</h3><p data-i18n="e5">JSON-LD parse, entity types ve bozuk schema blokları.</p></article>
    <article><b>06</b><h3 data-i18n="engine6">Performans Hijyeni</h3><p data-i18n="e6">HTML ağırlığı, script yoğunluğu ve render-blocking sinyalleri; sahte CWV üretmez.</p></article>
    <article><b>07</b><h3 data-i18n="engine7">Erişilebilirlik</h3><p data-i18n="e7">Lang, alt, programatik form label ve accessible-name kontrolleri.</p></article>
    <article><b>08</b><h3 data-i18n="engine8">Güvenlik Temeli</h3><p data-i18n="e8">HTTPS, HSTS, CSP, nosniff, Referrer/Permissions Policy ve mixed content.</p></article>
    <article><b>09</b><h3 data-i18n="engine9">İçerik Güveni</h3><p data-i18n="e9">About, contact, privacy, identity, author ve editoryal hesap verebilirlik sinyalleri.</p></article>
    <article><b>10</b><h3 data-i18n="engine10">Ajan Hazırlığı</h3><p data-i18n="e10">llms, Markdown, OpenAPI; A2A/MCP deneysel sinyaller ayrı etiketlenir.</p></article>
    <article><b>11</b><h3 data-i18n="engine11">Dönüşüm</h3><p data-i18n="e11">CTA, contact ve public form-flow görünürlüğü; business logic’e dokunmaz.</p></article>
    <article><b>12</b><h3 data-i18n="engine12">Bağlantı Bütünlüğü</h3><p data-i18n="e12">Gerçek HTTP probe ile bozuk iç link ve gereksiz redirect tespiti.</p></article>
  </div>
</section>

<!-- 06 HOW IT WORKS -->
<section class="section how" id="how">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 04</span>
    <h2 data-i18n="howTitle">Üç adım. Aynı kanıt zinciri.</h2>
  </header>
  <ol>
    <li><b>01</b><div><h3 data-i18n="s1t">Alan adını girin</h3><p data-i18n="s1c">DNS/redirect güvenlik kapıları sonrası en fazla 50 public HTML sayfası ve temel makine-okunabilir yüzeyler taranır.</p></div></li>
    <li><b>02</b><div><h3 data-i18n="s2t">Problemi ve kanıtı görün</h3><p data-i18n="s2c">Bulgu, severity, confidence, source class, URL ve evidence ücretsizdir. Uygulama reçetesi kilitlidir.</p></div></li>
    <li><b>03</b><div><h3 data-i18n="s3t">$99 mandate ile düzeltin</h3><p data-i18n="s3c">AI coding agent’inize root fix, recovery, prevention, acceptance/regression test ve rollback sözleşmesi verilir; sonra aynı domain re-scan edilir.</p></div></li>
  </ol>
</section>

<!-- 07 FIX MANDATE & PRICING -->
<section class="section pricing" id="pricing">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 05</span>
    <h2 data-i18n="pricingTitle">Tespit ücretsiz.<br>Düzeltme faaliyeti $99.</h2>
    <p data-i18n="pricingCopy">Tek site için tek fiyat. Sorunları saklayarak değil, uygulama kesinliği satarak gelir üretir.</p>
  </header>
  <div class="pricing-grid pricing-two">
    <article>
      <div class="pricehead"><span data-i18n="fullDiagnosis">TAM TEŞHİS</span><strong>$0</strong></div>
      <p data-i18n="p1d">Public site yüzeyinde tam teşhis.</p>
      <ul>
        <li data-i18n="p1a">12 deterministik skor</li>
        <li data-i18n="p1b">Tüm tespitler + evidence</li>
        <li data-i18n="p1c">Severity + confidence + source class</li>
        <li data-i18n="p1e">AI crawler policy matrix</li>
      </ul>
      <a href="#scanner" data-i18n="scanNow">Ücretsiz tara</a>
    </article>
    <article class="featured">
      <span class="popular" data-i18n="popular">TEK ÜCRETLİ ÜRÜN</span>
      <div class="pricehead"><span data-i18n="fullFixProduct">TAM SİTE DÜZELTME TALİMATI</span><strong>$99</strong></div>
      <p data-i18n="p2d">1 domain için uygulama-grade düzeltme sözleşmesi.</p>
      <ul>
        <li data-i18n="p2a">Tam issue envanteri + P0–P3 sıra</li>
        <li data-i18n="p2b">ROOT FIX → RECOVERY → PREVENTION</li>
        <li data-i18n="p2c">Acceptance + regression test</li>
        <li data-i18n="p2e">Rollback + stop conditions</li>
        <li data-i18n="p2f">30 gün içinde 1 re-scan</li>
      </ul>
      <a class="solid" href="/checkout" data-i18n="buyFix">Full Site Fix Mandate — $99</a>
    </article>
  </div>
  <div class="compare">
    <b data-i18n="compareLabel">ÜRÜN SINIRI</b>
    <p data-i18n="compareCopy"><strong>Free:</strong> ne yanlış ve kanıtı ne? → <strong>$99:</strong> kök neden hangi sırayla, hangi testle ve hangi rollback ile düzeltilmeli? Public tarama kaynak dosya adını tahmin etmez; source/codebase bağlamı sağlanırsa mandate dosya seviyesine iner.</p>
  </div>
</section>

<!-- 08 AUTHORITY & REHBERLER -->
<section class="section">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 06</span>
    <h2>Teknik Rehberler ve Standartlar</h2>
    <p>Doğrulanmış standart referansları, tarayıcı veri tabanı ve geliştirici belgeleri.</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>ŞARTNAME REHBERİ</b>
      <h3>llms.txt v2 Standardı</h3>
      <p>Dosya yapısı, özet blokları ve rel=describedby keşif kuralları.</p>
      <a href="/tr/rehberler/llms-txt/">Rehberi İncele →</a>
    </article>
    <article class="authority-card">
      <b>BOT YÖNETİŞİMİ</b>
      <h3>AI Tarayıcı Erişimi</h3>
      <p>Arama botları ile model eğitim tarayıcılarını robots.txt içinde ayırma rehberi.</p>
      <a href="/tr/rehberler/ai-tarayici-erisimi/">Rehberi İncele →</a>
    </article>
    <article class="authority-card">
      <b>KONTROL LİSTESİ</b>
      <h3>AI Hazırlık Kontrol Listesi</h3>
      <p>Yapay zeka arama sistemlerine hazır olmak için 10 adımlık teknik kılavuz.</p>
      <a href="/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/">Listeyi İncele →</a>
    </article>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 07</span>
    <h2 data-i18n="faqTitle">Sık sorulan sorular</h2>
  </header>
  <details><summary data-i18n="q1">Ücretsiz taramada ne saklanır?</summary><p data-i18n="a1">Problem saklanmaz. URL, severity, confidence, evidence ve kategori görünür. Ücretli katmanda kilitlenen şey uygulama reçetesi, test sözleşmesi ve rollback planıdır.</p></details>
  <details><summary data-i18n="q2">100/100 Google veya AI citation garantisi mi?</summary><p data-i18n="a2">Hayır. Skor yalnızca ölçülen kontrollerin durumudur. Ranking, trafik veya AI citation garantisi değildir.</p></details>
  <details><summary data-i18n="q3">llms.txt zorunlu mu?</summary><p data-i18n="a3">Hayır. llms.txt bir web standardı değil, gelişmekte olan bir öneridir. Bu nedenle ayrı PROPOSAL etiketi ve düşük ağırlıkla değerlendirilir.</p></details>
  <details><summary data-i18n="q4">Core Web Vitals ölçülüyor mu?</summary><p data-i18n="a4">Bu sürüm HTML/HTTP performans hijyenini ölçer. Güvenilir LCP/INP/CLS için CrUX/PageSpeed verisi gerekir; yoksa NOT_MEASURED döner, değer uydurulmaz.</p></details>
  <details><summary data-i18n="q5">Tarayıcı neden bazı siteleri reddeder?</summary><p data-i18n="a5">SSRF riskine karşı localhost/private/reserved hedefler, private DNS çözümü, non-standard portlar ve redirect ile private ağa geçiş fail-closed engellenir.</p></details>
</section>
</main>

<!-- 10 FOOTER -->
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
        <li><a href="/tr/fiyatlandirma/" data-i18n="navPrice">Fiyat</a></li>
        <li><a href="/openapi.json">OpenAPI</a></li>
        <li><a href="/audit-profile.json">Audit Profile</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Araçlar</h4>
      <ul>
        <li><a href="/tr/llms-txt-validator/" data-locale-base="llms-txt-validator" data-i18n="footerLlms">llms.txt Doğrulayıcı</a></li>
        <li><a href="/tr/ai-crawler-checker/" data-locale-base="ai-crawler-checker" data-i18n="footerCrawler">AI Tarayıcı Kontrolü</a></li>
        <li><a href="/tr/ai-website-readiness/" data-locale-base="ai-website-readiness" data-i18n="footerReadiness">AI Web Sitesi Hazırlığı</a></li>
        <li><a href="/tr/ai-mention-tracker/" data-locale-base="ai-mention-tracker" data-i18n="footerMentions">AI Marka Görünürlük Takibi</a></li>
        <li><a href="/tr/araclar/">Tüm Araçlar</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kaynaklar</h4>
      <ul>
        <li><a href="/tr/rehberler/">Rehberler</a></li>
        <li><a href="/methodology.html" data-methodology-link data-i18n="footerMethod">Metodoloji</a></li>
        <li><a href="/standard/">Kanıt Standardı</a></li>
        <li><a href="/reference/ai-crawlers/">AI Tarayıcı Dizini</a></li>
        <li><a href="/llms.txt">llms.txt</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Kurumsal</h4>
      <ul>
        <li><a href="/about/">Hakkımızda</a></li>
        <li><a href="/contact/">İletişim</a></li>
        <li><a href="/privacy/">Gizlilik</a></li>
        <li><a href="/terms/">Kullanım Koşulları</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 HTML&amp;HTML</span>
    <span>Deterministic 12-Engine Architecture</span>
  </div>
</footer>
</body>
</html>'''

    write_page("index.html", root_html)
    write_page("tr/index.html", root_html)

    # English Category Hub: en/index.html
    en_html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>HTML&HTML — Evidence-Based Site Auditor & Fix Mandate</title>
<meta name="description" content="Audit your website with 12 deterministic engines. Discover blockers preventing search engines and AI models from retrieving your site. Implementation-grade $99 Fix Mandate.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/validator.css?v=2">
<style>.pricing-grid.pricing-two .featured{{padding-top:72px}}.pricing-grid.pricing-two .featured .popular{{top:20px;left:24px;right:auto;max-width:calc(100% - 48px);white-space:nowrap}}.pricing-grid.pricing-two .featured .pricehead{{gap:24px}}@media(max-width:600px){{.pricing-grid.pricing-two .featured{{padding-top:68px}}.pricing-grid.pricing-two .featured .popular{{left:20px;max-width:calc(100% - 40px)}}}}</style>
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
        {{ "@type": "Offer", "name": "Full Site Fix Mandate", "price": "99", "priceCurrency": "USD" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/validator.js?v=2" defer></script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
<a class="skip" href="#scanner">Skip to content</a>
<header class="topbar">
  <div class="topbar-shell">
    <a class="brand" href="/en/" aria-label="HTML&amp;HTML">
      <img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22">
    </a>
    <nav>
      <a href="/en/platform/">Platform</a>
      <a href="/en/tools/">Tools</a>
      <a href="/en/guides/">Guides</a>
      <a href="/en/methodology/">Methodology</a>
      <a href="/en/pricing/">Pricing</a>
      <a href="/openapi.json" target="_blank" rel="noopener">API</a>
    </nav>
    <div class="nav-actions">
      <div class="langs">
        <a href="/tr/" aria-label="Türkçeye geç">TR</a>
      </div>
    </div>
  </div>
</header>

<main>
<!-- 01 HERO -->
<section class="hero" id="scanner">
  <div class="kicker"><span></span><b>WEBSITE AI READINESS & FIX MANDATE</b></div>
  <h1>Know what blocks your website from <em>search and AI retrieval.</em></h1>
  <p>Enter a domain. Twelve independent deterministic engines audit up to 50 public pages. Problems, confidence tiers, and attached evidence are free. Implementation contracts unlock in the Fix Mandate.</p>

  <!-- 02 SCANNER -->
  <div class="scanbox">
    <div class="tabs">
      <button class="active" data-mode="domain">Scan a domain</button>
      <button data-mode="url">Scan a full URL</button>
    </div>
    <form id="scanForm" onsubmit="event.preventDefault()">
      <div class="field">
        <input id="domainInput" autocomplete="url" inputmode="url" spellcheck="false" placeholder="example.com" required>
        <button id="scanButton" type="submit"><b>Scan Free</b><i>→</i></button>
      </div>
      <div class="scan-chips">
        <span>Try:</span>
        <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
        <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
        <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
      </div>
      <small>No signup. No secrets. Strictly public HTTP and HTML surfaces are measured.</small>
    </form>
    <div id="scanStatus" class="status" hidden></div>
  </div>

  <div class="signals">
    <span>CRAWL</span><i></i>
    <span>SEO</span><i></i>
    <span>AI / GEO</span><i></i>
    <span>LLMS V2</span><i></i>
    <span>STRUCTURED DATA</span><i></i>
    <span>ACCESSIBILITY</span><i></i>
    <span>SECURITY</span>
  </div>
</section>

<!-- RESULTS -->
<section id="result" class="results" hidden>
  <div class="result-head">
    <div>
      <span class="eyebrow">SCAN RESULT</span>
      <h2 id="resultDomain">—</h2>
      <p id="resultMeta">—</p>
    </div>
    <div class="total-score">
      <strong id="overallScore">0</strong>
      <span>/100</span>
    </div>
  </div>
  <div id="scoreGrid" class="score-grid"></div>
  <div id="scanDisclosure" class="scan-disclosure"></div>

  <!-- Priority Summary -->
  <div id="prioritySummary" class="priority-summary" hidden>
    <h3><span class="severity critical">CRITICAL</span> Top Priorities</h3>
    <div id="priorityList" class="priority-list"></div>
  </div>

  <div class="result-columns">
    <div>
      <div class="result-title">
        <h3>Evidence-backed findings</h3>
        <span id="findingCount"></span>
      </div>
      <div id="findingsList" class="findings"></div>
    </div>
    <aside class="mandate-card">
      <span class="eyebrow">PAID RESOLUTION</span>
      <h3>Evidence is free.<br>The fix contract is paid.</h3>
      <p>The same domain is re-scanned and valid issues become a prioritized ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK contract.</p>
      <ul>
        <li>P0–P3 implementation order</li>
        <li>Issue ID + evidence + confidence</li>
        <li>Acceptance + regression tests</li>
        <li>Rollback + stop conditions</li>
        <li>1 re-scan within 30 days</li>
      </ul>
      <div class="price">
        <small>1 domain / single engagement</small>
        <strong>$99</strong>
      </div>
      <a class="cta" id="mandateLink" href="/checkout">Full Site Fix Mandate →</a>
      <small class="note">Public scanning never guesses file names; provided codebase context enables file-level targeting.</small>
    </aside>
  </div>
</section>

<!-- 03 CORE VALUE -->
<section class="section" id="core-value">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 01</span>
    <h2>Website AI Readiness</h2>
    <p>Audit, verify, and resolve technical blockers for autonomous agents, generative search engines, and traditional web crawlers.</p>
  </header>
  <div class="authority-proof" style="justify-content: center; margin-bottom: 36px;">
    <span>SCAN</span><span>EVIDENCE</span><span>PRIORITIZE</span><span>FIX</span><span>RE-SCAN</span><span>MONITOR</span>
  </div>
</section>

<!-- 04 TOOL DIRECTORY -->
<section class="section" id="tools">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 02</span>
    <h2>Specialized Diagnostic Tools</h2>
    <p>Each tool executes our shared 12-engine core, isolating findings for targeted investigations.</p>
  </header>
  <div class="authority-grid">
    {''.join(f'<article class="authority-card"><b>TOOL</b><h3>{name}</h3><p>{desc}</p><a href="{url}">Launch Tool →</a></article>' for name, url, desc in tools_en)}
  </div>
</section>

<!-- 05 12 ENGINES / EVIDENCE / TRUST -->
<section class="section" id="engines">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 03</span>
    <h2>12 engines. One deterministic decision chain.</h2>
    <p>Each engine scores measurable rules. Unproven signals remain unknown; guesses are never forced into scores.</p>
  </header>
  <div class="engine-grid">
    <article><b>01</b><h3>Crawl & Index</h3><p>HTTP status codes, redirect chains, robots.txt, sitemaps, indexability, and page discovery.</p></article>
    <article><b>02</b><h3>Technical SEO</h3><p>Titles, meta descriptions, single H1 rules, canonical tags, OpenGraph, and route signals.</p></article>
    <article><b>03</b><h3>AI / GEO Access</h3><p>Policy checks for Googlebot, OAI-SearchBot, Claude-SearchBot, Claude-User, and PerplexityBot.</p></article>
    <article><b>04</b><h3>llms.txt v2</h3><p>v2 format, blockquotes, link reachability, describedby headers, and Markdown alternate discovery.</p></article>
    <article><b>05</b><h3>Structured Data</h3><p>JSON-LD parsing, entity types, author schemas, and broken structured data blocks.</p></article>
    <article><b>06</b><h3>Performance Hygiene</h3><p>HTML weight, script density, and render-blocking signals; never fabricates fake CWV metrics.</p></article>
    <article><b>07</b><h3>Accessibility</h3><p>html lang declarations, image alt attributes, programmatic form labels, and accessible names.</p></article>
    <article><b>08</b><h3>Security Baseline</h3><p>HTTPS, HSTS preload, CSP validation, nosniff, and Referrer/Permissions policies.</p></article>
    <article><b>09</b><h3>Content Trust</h3><p>About, contact, privacy, identity, author bio, and editorial accountability signals.</p></article>
    <article><b>10</b><h3>Agent Readiness</h3><p>llms.txt, Markdown, OpenAPI; A2A/MCP experimental signals are explicitly labeled.</p></article>
    <article><b>11</b><h3>Conversion</h3><p>CTA, contact, and public form visibility without touching private business logic.</p></article>
    <article><b>12</b><h3>Link Integrity</h3><p>Real HTTP probes for broken internal links (404/500) and avoidable redirect loops.</p></article>
  </div>
</section>

<!-- 06 HOW IT WORKS -->
<section class="section how" id="how">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 04</span>
    <h2>Three steps. The same evidence chain.</h2>
  </header>
  <ol>
    <li><b>01</b><div><h3>Enter a domain</h3><p>After DNS and SSRF security gates, up to 50 public HTML pages and machine endpoints are crawled.</p></div></li>
    <li><b>02</b><div><h3>See the problem and proof</h3><p>Findings, severity, confidence, source class, URL, and raw evidence are free. Remediation details remain locked.</p></div></li>
    <li><b>03</b><div><h3>Fix with a $99 mandate</h3><p>Your AI coding agent or engineering team receives root causes, PR sequence, test assertions, and rollback plans.</p></div></li>
  </ol>
</section>

<!-- 07 FIX MANDATE & PRICING -->
<section class="section pricing" id="pricing">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 05</span>
    <h2>Diagnosis is free.<br>Resolution is $99.</h2>
    <p>Single engagement per site. We monetize implementation precision, not withholding problems.</p>
  </header>
  <div class="pricing-grid pricing-two">
    <article>
      <div class="pricehead"><span>FULL DIAGNOSIS</span><strong>$0</strong></div>
      <p>Full diagnostic crawl across up to 50 public pages.</p>
      <ul>
        <li>12 deterministic engine scores</li>
        <li>All findings + attached evidence</li>
        <li>Severity + confidence + source class</li>
        <li>AI crawler policy matrix</li>
      </ul>
      <a href="#scanner">Scan Free</a>
    </article>
    <article class="featured">
      <span class="popular">PRIMARY PRODUCT</span>
      <div class="pricehead"><span>FULL SITE FIX MANDATE</span><strong>$99</strong></div>
      <p>Implementation-grade fix contract for one domain.</p>
      <ul>
        <li>Full issue inventory + P0–P3 order</li>
        <li>ROOT FIX → RECOVERY → PREVENTION</li>
        <li>Acceptance + regression tests</li>
        <li>Rollback + stop conditions</li>
        <li>1 re-scan within 30 days</li>
      </ul>
      <a class="solid" href="/checkout">Full Site Fix Mandate — $99</a>
    </article>
  </div>
  <div class="compare">
    <b>PRODUCT BOUNDARY</b>
    <p><strong>Free:</strong> what is wrong and what proves it? → <strong>$99:</strong> what root cause should be fixed, in which order, with which tests and rollback? Public scanning never guesses file names; provided codebase context allows file-level targeting.</p>
  </div>
</section>

<!-- 08 AUTHORITY & GUIDES -->
<section class="section">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 06</span>
    <h2>Technical Guides & Standards</h2>
    <p>Authoritative technical guides for engineering teams building for modern search and AI retrieval.</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>SPECIFICATION</b>
      <h3>llms.txt v2 Standard</h3>
      <p>File structures, blockquotes, and rel=describedby discovery rules.</p>
      <a href="/en/guides/llms-txt/">Read Guide →</a>
    </article>
    <article class="authority-card">
      <b>BOT GOVERNANCE</b>
      <h3>AI Crawler Access</h3>
      <p>Separating real-time search crawlers from bulk model training scrapers.</p>
      <a href="/en/guides/ai-crawler-access/">Read Guide →</a>
    </article>
    <article class="authority-card">
      <b>CHECKLIST</b>
      <h3>AI Readiness Checklist</h3>
      <p>A comprehensive 10-step technical checklist for generative engine optimization.</p>
      <a href="/en/guides/ai-website-readiness-checklist/">View Checklist →</a>
    </article>
  </div>
</section>

<!-- 09 SHORT FAQ -->
<section class="section faq" id="faq">
  <header>
    <span class="eyebrow">HTML&amp;HTML / 07</span>
    <h2>Frequently Asked Questions</h2>
  </header>
  <details><summary>What is hidden in the free scan?</summary><p>Nothing is hidden. URL, severity, confidence, evidence, and category are visible. The paid layer unlocks the implementation prescription, test contract, and rollback plan.</p></details>
  <details><summary>Does 100/100 guarantee Google or AI citations?</summary><p>No. The score only represents measured checks. It is not a ranking, traffic, or AI citation guarantee.</p></details>
  <details><summary>Is llms.txt mandatory?</summary><p>No. llms.txt is an evolving proposal, not an official web standard. It is labeled PROPOSAL and given limited weight.</p></details>
  <details><summary>Are Core Web Vitals measured?</summary><p>This version measures HTML/HTTP performance hygiene. Reliable LCP/INP/CLS requires CrUX field data; without it the result strictly returns NOT_MEASURED.</p></details>
  <details><summary>Why are some sites rejected?</summary><p>To eliminate SSRF risks, localhost, private IP ranges, non-standard ports, and redirect pivots into private networks fail closed.</p></details>
</section>
</main>

{get_footer('en')}
</body>
</html>'''

    write_page("en/index.html", en_html)
    print("All homepages built cleanly.")

build_homepages()
