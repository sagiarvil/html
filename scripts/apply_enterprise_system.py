#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
SKIP={'.git','node_modules','functions','functions-firebase','scripts','tests'}

TR_NAV='''<nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/site-tarama/">Ücretsiz Kontrol</a>
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">Nasıl Çalışır</a>
  <a href="/tr/fiyatlandirma/">Uygulama Paketi ($99)</a>
  <a href="/tr/referans/">Bir Ekibe Öner</a>
</nav>'''
EN_NAV='''<nav class="primary-nav" aria-label="Primary navigation">
  <a href="/en/website-scanner/">Free Audit</a>
  <a href="/en/ai-search-visibility/">How It Works</a>
  <a href="/en/pricing/">Implementation Pack ($99)</a>
  <a href="/en/referral/">Refer a Team</a>
</nav>'''

TR_TOOLS='''<main>
<section class="authority-hero px-scope-hero" data-commercial-intent="static">
  <div class="kicker"><span></span><b>TEK TARAMA / TÜM KAPSAM</b></div>
  <h1>Tek URL. <em>Tüm Yapay Zeka Görünürlük Sistemi.</em></h1>
  <p>Bu sayfa ayrı ayrı araç başlatma ekranı değildir. Ana taramaya tek URL girildiğinde 18 deterministik motor, 13 Intelligence Audit ve 6 katmanlı derin mimari aynı kanıt zincirinde birlikte çalışır.</p>
  <div class="hero-actions"><a class="primary" href="/tr/#scanner">Tek Taramayı Başlat →</a><a href="/tr/methodology/">Ölçüm metodolojisini incele</a></div>
</section>
<section class="px-section" data-premium-infographic="scope-map">
  <div class="px-section-head"><span class="eyebrow">KAPSAM HARİTASI</span><h2>Ayrı araçlar değil, tek karar sistemi.</h2><p>Her kontrol aynı tarama sonucuna katkı verir. Alt sayfalar yalnızca belirli kontrollerin nasıl ölçüldüğünü açıklayan uzmanlık ve referans sayfalarıdır.</p></div>
  <div class="px-tool-flow">
    <article class="px-flow-card"><span class="node">01</span><h3>Keşfedilebilirlik</h3><p>robots.txt, sitemap, indexability, canonical, dahili linkler ve AI crawler erişimi.</p></article>
    <article class="px-flow-card"><span class="node">02</span><h3>Anlamlandırma</h3><p>Schema, entity graph, semantik HTML, dil tutarlılığı, llms.txt ve makine bilgi yüzeyleri.</p></article>
    <article class="px-flow-card"><span class="node">03</span><h3>Kaynak Uygunluğu</h3><p>GEO, AEO, LLMO, RAG, E-E-A-T, cevap çıkarılabilirliği ve özgün bilgi sinyalleri.</p></article>
    <article class="px-flow-card"><span class="node">04</span><h3>Kullanıcı & Ajan Yolu</h3><p>Erişilebilirlik, güvenlik, bağlantı bütünlüğü, CTA ve ajanların anlayabildiği etkileşim yüzeyleri.</p></article>
    <article class="px-flow-card"><span class="node">05</span><h3>Ölçüm & Öncelik</h3><p>18 skor + 13 Intelligence Audit + 6 layer; Impact × Effort ile en kritik görünürlük kayıplarını öne çıkarır.</p></article>
  </div>
</section>
<section class="px-section px-scope-detail">
 <div class="px-section-head"><span class="eyebrow">UZMANLIK KATMANLARI</span><h2>Detay sayfaları taramayı bölmez.</h2><p>llms.txt, AI crawler, schema, teknik SEO, güvenlik, erişilebilirlik ve link sayfaları; tek taramanın alt kontrollerini açıklar. Hepsinin birincil CTA'sı aynı ana taramaya döner.</p></div>
 <div class="px-lenses">
  <a class="px-lens" href="/tr/llms-txt-validator/"><b>llms.txt</b><span>Yapı · link erişimi · describedby · Markdown</span></a>
  <a class="px-lens" href="/tr/ai-crawler-checker/"><b>AI Crawler</b><span>OAI-SearchBot · Claude · Perplexity · robots</span></a>
  <a class="px-lens" href="/tr/schema-validator/"><b>Entity & Schema</b><span>JSON-LD · @graph · Organization · Product</span></a>
  <a class="px-lens" href="/tr/teknik-seo-kontrol/"><b>Teknik Temel</b><span>Canonical · H1 · metadata · indexability</span></a>
 </div>
 <div class="px-actions"><a class="primary" href="/tr/#scanner">Yapay Zeka Görünürlüğümü Ücretsiz Tara →</a></div>
</section>
</main>'''

EN_TOOLS=TR_TOOLS.replace('TEK TARAMA / TÜM KAPSAM','ONE SCAN / FULL SCOPE').replace('Tek URL. <em>Tüm Yapay Zeka Görünürlük Sistemi.</em>','One URL. <em>The Full AI Visibility System.</em>').replace('Bu sayfa ayrı ayrı araç başlatma ekranı değildir. Ana taramaya tek URL girildiğinde 12 deterministik motor, 13 Intelligence Audit ve 6 katmanlı derin mimari aynı kanıt zincirinde birlikte çalışır.','This is not a directory of separate scanning products. Enter one URL in the primary scanner and all 18 deterministic engines, 6 conceptual layers and their 13 output findings run in the same evidence chain.').replace('/tr/#scanner','/en/#scanner').replace('Tek Taramayı Başlat →','Start the Unified Scan →').replace('/tr/methodology/','/en/methodology/').replace('Ölçüm metodolojisini incele','Review the methodology').replace('KAPSAM HARİTASI','SCOPE MAP').replace('Ayrı araçlar değil, tek karar sistemi.','Not separate tools. One decision system.').replace('Her kontrol aynı tarama sonucuna katkı verir. Alt sayfalar yalnızca belirli kontrollerin nasıl ölçüldüğünü açıklayan uzmanlık ve referans sayfalarıdır.','Every check contributes to the same scan result. Detail pages explain how individual controls are measured; they do not create separate scan flows.').replace('Keşfedilebilirlik','Discovery').replace('robots.txt, sitemap, indexability, canonical, dahili linkler ve AI crawler erişimi.','robots.txt, sitemaps, indexability, canonicals, internal links and AI crawler access.').replace('Anlamlandırma','Understanding').replace('Schema, entity graph, semantik HTML, dil tutarlılığı, llms.txt ve makine bilgi yüzeyleri.','Schema, entity graphs, semantic HTML, language consistency, llms.txt and machine-readable knowledge surfaces.').replace('Kaynak Uygunluğu','Source Eligibility').replace('GEO, AEO, LLMO, RAG, E-E-A-T, cevap çıkarılabilirliği ve özgün bilgi sinyalleri.','GEO, AEO, LLMO, RAG, E-E-A-T, answer extractability and original-information signals.').replace('Kullanıcı & Ajan Yolu','User & Agent Journey').replace('Erişilebilirlik, güvenlik, bağlantı bütünlüğü, CTA ve ajanların anlayabildiği etkileşim yüzeyleri.','Accessibility, security, link integrity, CTAs and interaction surfaces agents can interpret.').replace('Ölçüm & Öncelik','Measurement & Priority').replace('18 skor + 13 Intelligence Audit + 6 layer; Impact × Effort ile en kritik görünürlük kayıplarını öne çıkarır.','18 scores + 13 non-scoring Intelligence analyses + 6 layeres, prioritized by Impact × Effort.').replace('UZMANLIK KATMANLARI','SPECIALIST LAYERS').replace('Detay sayfaları taramayı bölmez.','Detail pages do not fragment the scan.').replace('llms.txt, AI crawler, schema, teknik SEO, güvenlik, erişilebilirlik ve link sayfaları; tek taramanın alt kontrollerini açıklar. Hepsinin birincil CTA\'sı aynı ana taramaya döner.','llms.txt, AI crawler, schema, technical SEO, security, accessibility and link pages explain sub-controls of the unified scan. Every primary CTA returns to the same scanner.').replace('/tr/llms-txt-validator/','/en/llms-txt-validator/').replace('Yapı · link erişimi · describedby · Markdown','Structure · link reachability · describedby · Markdown').replace('/tr/ai-crawler-checker/','/en/ai-crawler-checker/').replace('/tr/schema-validator/','/en/schema-validator/').replace('/tr/teknik-seo-kontrol/','/en/technical-seo-checker/').replace('Teknik Temel','Technical Foundation').replace('Yapay Zeka Görünürlüğümü Ücretsiz Tara →','Check My AI Visibility Free →')

TR_PRICING='''<main>
<section class="authority-hero px-pricing-hero" data-commercial-intent="static">
 <div class="kicker"><span></span><b>2 ŞEFFAF KATMAN · TEK SİTE · UYGULAMA ODAKLI</b></div>
 <h1>Problemi ücretsiz görün. <em>Uygulama paketini $99'a açın.</em></h1>
 <p class="release-contract-line"><strong>Ücretsiz teşhis:</strong> sorun nerede ve neyi etkiliyor? <strong>$99 uygulama paketi:</strong> hangi düzeltme önce yapılacak, nasıl uygulanacak ve nasıl doğrulanacak?</p>
 <div class="hero-actions"><a class="primary" href="/tr/#scanner">Ücretsiz Teşhisi Başlat →</a><a href="#compare">İki katmanı karşılaştır</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare" data-premium-infographic="report-boundary">
 <div class="px-report-boundary">
  <article class="px-report-free"><span class="eyebrow">$0 · BULGU + KANIT</span><h2>Ne yanlış? Nerede? Neyi etkiliyor?</h2><p>Ücretsiz tarama bulguyu, etkilenen URL'yi ve kanıtı gösterir.</p><ul><li>Teknik bulgular ve etkilenen URL'ler</li><li>Severity ve confidence</li><li>Impact × Effort öncelik görünümü</li><li>Uygulama kodu ve talimatı: <b>YOK</b></li></ul><a class="px-outline" href="/tr/#scanner">Ücretsiz Tara →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · UYGULAMA + DOĞRULAMA</span><h2>Hangi düzeltme önce? Nasıl uygulanacak? Nasıl doğrulanacak?</h2><p>Ölçülen bulguları teknik ekibinizin uygulayabileceği düzeltme sırasına dönüştürür.</p><ul><li>Kök neden ve P0–P3 öncelik</li><li>Uygulanabilir kod / konfigürasyon talimatı</li><li>Kabul ve regresyon testleri</li><li>Rollback ve stop koşulları</li><li>30 gün içinde 1 doğrulama re-scan</li></ul><a class="primary" href="/checkout?plan=pro">Uygulama Paketini Aç — $99 →</a></article>
 </div>
</section>
<section class="px-section" id="uygulama-akisi">
 <div class="px-section-head"><span class="eyebrow">BULGU → ETKİ → DÜZELTME → DOĞRULAMA</span><h2>Satın aldığınız şey dosya sayısı değil, uygulanabilir düzeltme sırasıdır.</h2><p>Ücretsiz tarama problemi gösterir; ücretli katman yalnız ölçülen bulguları uygulanabilir ve test edilebilir hale getirir.</p></div>
 <div class="px-delivery-grid-22"><article class="px-file-card"><b>1 · BULGU</b><p>Kanıt ve URL.</p></article><article class="px-file-card"><b>2 · ETKİ</b><p>Hangi teknik veya görünürlük akışı etkileniyor.</p></article><article class="px-file-card"><b>3 · DÜZELTME</b><p>Geliştiricinin uygulayacağı adım.</p></article><article class="px-file-card"><b>4 · DOĞRULA</b><p>Acceptance, regresyon ve rollback.</p></article></div>
</section>
<section class="px-section"><div class="px-section-head"><span class="eyebrow">REFERANS</span><h2>Başka bir teknik ekip de aynı denetimi tekrar yapıyorsa paylaşın.</h2><p>Önce ücretsiz tarama bağlantısını iletin; satın alma kararı ancak ölçülen sorunların uygulama paketine ihtiyaç duyması halinde verilsin.</p></div><div class="px-actions"><a class="px-outline" href="/tr/referans/">Paylaşım seçeneklerini aç →</a></div></section>
<section class="px-section px-value-strip"><div><span>Üyelik yok</span><b>Guest delivery</b></div><div><span>Aylık abonelik yok</span><b>Tek alan adı / yazılım lisansı</b></div><div><span>Gizli sorun yok</span><b>Kanıt ücretsiz</b></div><div><span>Uydurma yok</span><b>Ölçülemeyen veri NOT_MEASURED</b></div></section>
</main>'''

EN_PRICING='''<main>
<section class="authority-hero px-pricing-hero" data-commercial-intent="static">
 <div class="kicker"><span></span><b>2 TRANSPARENT TIERS · ONE SITE · EXECUTION FOCUSED</b></div>
 <h1>See the problem free. <em>Unlock implementation for $99.</em></h1>
 <p class="release-contract-line"><strong>Free diagnosis:</strong> where is the issue and what does it affect? <strong>$99 implementation pack:</strong> what should be fixed first, how should it be implemented, and how will it be verified?</p>
 <div class="hero-actions"><a class="primary" href="/en/#scanner">Start Free Diagnostic →</a><a href="#compare">Compare the two tiers</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare" data-premium-infographic="report-boundary">
 <div class="px-report-boundary">
  <article class="px-report-free"><span class="eyebrow">$0 · FINDING + EVIDENCE</span><h2>What is wrong? Where? What does it affect?</h2><p>The free scan shows the finding, affected URL and evidence.</p><ul><li>Technical findings and affected URLs</li><li>Severity and confidence</li><li>Impact × Effort priority view</li><li>Implementation code and instructions: <b>NONE</b></li></ul><a class="px-outline" href="/en/#scanner">Scan Free →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · IMPLEMENT + VERIFY</span><h2>What should be fixed first? How? How will it be verified?</h2><p>Turns measured findings into an execution order your technical team can implement.</p><ul><li>Root cause and P0–P3 priority</li><li>Actionable code / configuration guidance</li><li>Acceptance and regression checks</li><li>Rollback and stop conditions</li><li>1 verification re-scan within 30 days</li></ul><a class="primary" href="/checkout?plan=pro">Unlock Implementation Pack — $99 →</a></article>
 </div>
</section>
<section class="px-section" id="implementation-path">
 <div class="px-section-head"><span class="eyebrow">FINDING → IMPACT → FIX → VERIFY</span><h2>You are buying an executable remediation order, not a file count.</h2><p>The free scan exposes the problem; the paid layer makes measured findings actionable and testable.</p></div>
 <div class="px-delivery-grid-22"><article class="px-file-card"><b>1 · FINDING</b><p>Evidence and URL.</p></article><article class="px-file-card"><b>2 · IMPACT</b><p>Which technical or discovery path is affected.</p></article><article class="px-file-card"><b>3 · FIX</b><p>The next step your developer can execute.</p></article><article class="px-file-card"><b>4 · VERIFY</b><p>Acceptance, regression and rollback.</p></article></div>
</section>
<section class="px-section"><div class="px-section-head"><span class="eyebrow">REFERRAL</span><h2>If another technical team is repeating the same audit work, share it.</h2><p>Send the free diagnostic first; the buying decision only happens when measured issues require implementation.</p></div><div class="px-actions"><a class="px-outline" href="/en/referral/">Open sharing options →</a></div></section>
<section class="px-section px-value-strip"><div><span>No membership</span><b>Guest delivery</b></div><div><span>No subscription</span><b>Single domain / software license</b></div><div><span>No hidden issues</span><b>Evidence is free</b></div><div><span>No fabricated metrics</span><b>Unknown stays NOT_MEASURED</b></div></section>
</main>'''


def replace_main(rel, html):
    p=ROOT/rel
    if not p.exists(): return
    t=p.read_text(encoding='utf-8')
    t=re.sub(r'<main[^>]*>[\s\S]*?</main>',html,t,count=1)
    p.write_text(t,encoding='utf-8')

# Focus the global primary navigation on the actual acquisition funnel.
for p in ROOT.rglob('*.html'):
    if any(part in SKIP for part in p.relative_to(ROOT).parts): continue
    t=p.read_text(encoding='utf-8')
    lang='tr' if re.search(r'<html[^>]+lang=["\']tr["\']',t,re.I) else 'en'
    nav=TR_NAV if lang=='tr' else EN_NAV
    t=re.sub(r'(<header class="topbar">[\s\S]*?<div class="topbar-shell">[\s\S]*?)<nav[^>]*>[\s\S]*?</nav>',lambda m:m.group(1)+nav,t,count=1)
    if 'class="nav-scan-cta"' not in t and '<div class="nav-actions">' in t:
        cta='<a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Tara</a>' if lang=='tr' else '<a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>'
        t=t.replace('<div class="nav-actions">','<div class="nav-actions">'+cta,1)
    p.write_text(t,encoding='utf-8')

replace_main('tr/araclar/index.html',TR_TOOLS)
replace_main('en/tools/index.html',EN_TOOLS)
replace_main('tr/fiyatlandirma/index.html',TR_PRICING)
replace_main('en/pricing/index.html',EN_PRICING)

# Customer-facing product language: keep internal Full Site Fix Mandate code for API compatibility,
# but sell the global deliverable as an implementation blueprint rather than a novice "prescription" metaphor.
for rel in ['index.html','tr/index.html','en/index.html','tr/fix-mandate/index.html','en/fix-mandate/index.html','checkout.html']:
    p=ROOT/rel
    if not p.exists(): continue
    t=p.read_text(encoding='utf-8')
    t=t.replace('$99 reçeteyi aç','$99 uygulama planını aç')
    t=t.replace('$99 prescription','$99 implementation blueprint')
    t=t.replace('Düzeltme reçetesi','Uygulama planı').replace('düzeltme reçetesi','uygulama planı')
    t=t.replace('Fix Prescription','Implementation Blueprint').replace('fix prescription','implementation blueprint')
    t=t.replace('Sitemi Yapay Zeka Sonuçlarına Hazırla — $99','AI Görünürlük Uygulama Planını Aç — $99')
    p.write_text(t,encoding='utf-8')

print('ENTERPRISE COMMERCIAL SYSTEM PASS: focused unified-scan navigation, tools scope map, premium $99 pricing, delivery narrative and global implementation-blueprint language materialized.')
