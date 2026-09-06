#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
SKIP={'.git','node_modules','functions','functions-firebase','scripts','tests'}

TR_NAV='''<nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">AI Görünürlük</a>
  <a href="/tr/llms-txt-validator/">llms.txt</a>
  <a href="/tr/llms-txt-haberler/">LLMS.TXT Haberler</a>
  <a href="/tr/rehberler/">Rehberler</a>
  <a href="/tr/sozluk/">Sözlük</a>
  <a href="/tr/fiyatlandirma/">Fiyat</a>
</nav>'''
EN_NAV='''<nav class="primary-nav" aria-label="Primary navigation">
  <a href="/en/ai-search-visibility/">AI Visibility</a>
  <a href="/en/llms-txt-validator/">llms.txt</a>
  <a href="/en/llms-txt-news/">LLMS.TXT News</a>
  <a href="/en/guides/">Guides</a>
  <a href="/en/glossary/">Glossary</a>
  <a href="/en/pricing/">Pricing</a>
</nav>'''

TR_TOOLS='''<main>
<section class="authority-hero px-scope-hero" data-commercial-intent="static">
  <div class="kicker"><span></span><b>TEK TARAMA / TÜM KAPSAM</b></div>
  <h1>Tek URL. <em>Tüm Yapay Zeka Görünürlük Sistemi.</em></h1>
  <p>Bu sayfa ayrı ayrı araç başlatma ekranı değildir. Ana taramaya tek URL girildiğinde 12 deterministik motor, 13 Intelligence Audit ve 7 hazırlık lensi aynı kanıt zincirinde birlikte çalışır.</p>
  <div class="hero-actions"><a class="primary" href="/tr/#scanner">Tek Taramayı Başlat →</a><a href="/tr/methodology/">Ölçüm metodolojisini incele</a></div>
</section>
<section class="px-section" data-premium-infographic="scope-map">
  <div class="px-section-head"><span class="eyebrow">KAPSAM HARİTASI</span><h2>Ayrı araçlar değil, tek karar sistemi.</h2><p>Her kontrol aynı tarama sonucuna katkı verir. Alt sayfalar yalnızca belirli kontrollerin nasıl ölçüldüğünü açıklayan uzmanlık ve referans sayfalarıdır.</p></div>
  <div class="px-tool-flow">
    <article class="px-flow-card"><span class="node">01</span><h3>Keşfedilebilirlik</h3><p>robots.txt, sitemap, indexability, canonical, dahili linkler ve AI crawler erişimi.</p></article>
    <article class="px-flow-card"><span class="node">02</span><h3>Anlamlandırma</h3><p>Schema, entity graph, semantik HTML, dil tutarlılığı, llms.txt ve makine bilgi yüzeyleri.</p></article>
    <article class="px-flow-card"><span class="node">03</span><h3>Kaynak Uygunluğu</h3><p>GEO, AEO, LLMO, RAG, E-E-A-T, cevap çıkarılabilirliği ve özgün bilgi sinyalleri.</p></article>
    <article class="px-flow-card"><span class="node">04</span><h3>Kullanıcı & Ajan Yolu</h3><p>Erişilebilirlik, güvenlik, bağlantı bütünlüğü, CTA ve ajanların anlayabildiği etkileşim yüzeyleri.</p></article>
    <article class="px-flow-card"><span class="node">05</span><h3>Ölçüm & Öncelik</h3><p>12 skor + 13 Intelligence Audit + 7 lens; Impact × Effort ile en kritik görünürlük kayıplarını öne çıkarır.</p></article>
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

EN_TOOLS=TR_TOOLS.replace('TEK TARAMA / TÜM KAPSAM','ONE SCAN / FULL SCOPE').replace('Tek URL. <em>Tüm Yapay Zeka Görünürlük Sistemi.</em>','One URL. <em>The Full AI Visibility System.</em>').replace('Bu sayfa ayrı ayrı araç başlatma ekranı değildir. Ana taramaya tek URL girildiğinde 12 deterministik motor, 13 Intelligence Audit ve 7 hazırlık lensi aynı kanıt zincirinde birlikte çalışır.','This is not a directory of separate scanning products. Enter one URL in the primary scanner and all 12 deterministic engines, 13 Intelligence Audits and seven readiness lenses run in the same evidence chain.').replace('/tr/#scanner','/en/#scanner').replace('Tek Taramayı Başlat →','Start the Unified Scan →').replace('/tr/methodology/','/en/methodology/').replace('Ölçüm metodolojisini incele','Review the methodology').replace('KAPSAM HARİTASI','SCOPE MAP').replace('Ayrı araçlar değil, tek karar sistemi.','Not separate tools. One decision system.').replace('Her kontrol aynı tarama sonucuna katkı verir. Alt sayfalar yalnızca belirli kontrollerin nasıl ölçüldüğünü açıklayan uzmanlık ve referans sayfalarıdır.','Every check contributes to the same scan result. Detail pages explain how individual controls are measured; they do not create separate scan flows.').replace('Keşfedilebilirlik','Discovery').replace('robots.txt, sitemap, indexability, canonical, dahili linkler ve AI crawler erişimi.','robots.txt, sitemaps, indexability, canonicals, internal links and AI crawler access.').replace('Anlamlandırma','Understanding').replace('Schema, entity graph, semantik HTML, dil tutarlılığı, llms.txt ve makine bilgi yüzeyleri.','Schema, entity graphs, semantic HTML, language consistency, llms.txt and machine-readable knowledge surfaces.').replace('Kaynak Uygunluğu','Source Eligibility').replace('GEO, AEO, LLMO, RAG, E-E-A-T, cevap çıkarılabilirliği ve özgün bilgi sinyalleri.','GEO, AEO, LLMO, RAG, E-E-A-T, answer extractability and original-information signals.').replace('Kullanıcı & Ajan Yolu','User & Agent Journey').replace('Erişilebilirlik, güvenlik, bağlantı bütünlüğü, CTA ve ajanların anlayabildiği etkileşim yüzeyleri.','Accessibility, security, link integrity, CTAs and interaction surfaces agents can interpret.').replace('Ölçüm & Öncelik','Measurement & Priority').replace('12 skor + 13 Intelligence Audit + 7 lens; Impact × Effort ile en kritik görünürlük kayıplarını öne çıkarır.','12 scores + 13 Intelligence Audits + 7 lenses, prioritized by Impact × Effort.').replace('UZMANLIK KATMANLARI','SPECIALIST LAYERS').replace('Detay sayfaları taramayı bölmez.','Detail pages do not fragment the scan.').replace('llms.txt, AI crawler, schema, teknik SEO, güvenlik, erişilebilirlik ve link sayfaları; tek taramanın alt kontrollerini açıklar. Hepsinin birincil CTA\'sı aynı ana taramaya döner.','llms.txt, AI crawler, schema, technical SEO, security, accessibility and link pages explain sub-controls of the unified scan. Every primary CTA returns to the same scanner.').replace('/tr/llms-txt-validator/','/en/llms-txt-validator/').replace('Yapı · link erişimi · describedby · Markdown','Structure · link reachability · describedby · Markdown').replace('/tr/ai-crawler-checker/','/en/ai-crawler-checker/').replace('/tr/schema-validator/','/en/schema-validator/').replace('/tr/teknik-seo-kontrol/','/en/technical-seo-checker/').replace('Teknik Temel','Technical Foundation').replace('Yapay Zeka Görünürlüğümü Ücretsiz Tara →','Check My AI Visibility Free →')

TR_PRICING='''<main>
<section class="authority-hero px-pricing-hero" data-commercial-intent="static">
 <div class="kicker"><span></span><b>TEK FİYAT · TEK SİTE · UYGULAMA ODAKLI</b></div>
 <h1>Problemi ücretsiz görün. <em>Uygulama planını $99'a açın.</em></h1>
 <p>Tanı için kredi kartı istemiyoruz. Web sitenizin ölçülen sorunlarını ve kanıtlarını ücretsiz gösteriyoruz. Yalnızca firmanızın veya yazılımcınızın uygulayabileceği teknik çözüm planına ihtiyaç duyduğunuzda ödeme yaparsınız.</p>
 <div class="hero-actions"><a class="primary" href="/tr/#scanner">Ücretsiz Teşhisi Başlat →</a><a href="#compare">$99 paketini incele</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare">
 <div class="px-report-boundary">
  <article class="px-report-free"><span class="eyebrow">$0 · AI GÖRÜNÜRLÜK TEŞHİSİ</span><h2>Ne yanlış? Nerede? Ne kadar önemli?</h2><p>Ücretsiz rapor sorunu saklamaz. Karar vermek için gereken teşhis ve kanıt görünür.</p><ul><li>12 deterministik motor skoru</li><li>13 Search & AI Intelligence Audit</li><li>7 hazırlık lensi: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</li><li>Tüm bulgular, etkilenen URL'ler ve kanıt</li><li>Severity · confidence · source class</li><li>Impact × Effort öncelik haritası</li><li>NOT_MEASURED / REQUIRES_CONTEXT sınırları</li></ul><a class="px-outline" href="/tr/#scanner">Ücretsiz Tara →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · AI GÖRÜNÜRLÜK UYGULAMA PLANI</span><h2>Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</h2><p>Ücretli paket, teşhisi yazılımcının veya teknik ekibin uygulayabileceği doğrulanabilir bir execution blueprint'e dönüştürür.</p><ul><li>Kök neden ve P0–P3 uygulama sırası</li><li>Dosya/codebase bağlamı varsa hedefleme</li><li>Root fix · recovery · prevention</li><li>Kabul ve regresyon testleri</li><li>Rollback ve stop conditions</li><li>13 Intelligence Audit için güvenli uygulama adımları</li><li>30 gün içinde 1 doğrulama re-scan</li><li>Otomatik ZIP teslim paketi</li></ul><a class="primary" href="/checkout">Uygulama Planını Aç — $99 →</a></article>
 </div>
</section>
<section class="px-section">
 <div class="px-section-head"><span class="eyebrow">TESLİM PAKETİ</span><h2>Bir PDF değil. Uygulanabilir mühendislik paketi.</h2><p>Ödeme entitlement'ı doğrulandığında sistem aynı alan adını yeniden tarar ve uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token'ı ile teslim edilebilir.</p></div>
 <div class="px-delivery-grid"><article><b>00</b><h3>READ_ME.md</h3><p>Firma ve yazılımcı için kullanım kılavuzu.</p></article><article><b>01</b><h3>EXECUTIVE_SUMMARY.md</h3><p>Yönetim özeti, risk ve öncelikler.</p></article><article><b>02</b><h3>IMPLEMENTATION_BLUEPRINT.md</h3><p>Uygulama sırası ve teknik sözleşme.</p></article><article><b>03</b><h3>FINDINGS.json</h3><p>Makine okunabilir issue envanteri.</p></article><article><b>04</b><h3>ACCEPTANCE_TESTS.md</h3><p>Düzeltmenin çalıştığını kanıtlayan testler.</p></article><article><b>05</b><h3>ROLLBACK_PLAN.md</h3><p>Hata halinde güvenli geri dönüş.</p></article></div>
</section>
<section class="px-section px-value-strip"><div><span>Üyelik yok</span><b>Guest delivery</b></div><div><span>Aylık abonelik yok</span><b>Tek site / tek çalışma</b></div><div><span>Gizli sorun yok</span><b>Kanıt ücretsiz</b></div><div><span>Uydurma yok</span><b>Ölçülemeyen veri NOT_MEASURED</b></div></section>
</main>'''

EN_PRICING=TR_PRICING.replace('TEK FİYAT · TEK SİTE · UYGULAMA ODAKLI','ONE PRICE · ONE SITE · EXECUTION FOCUSED').replace('Problemi ücretsiz görün. <em>Uygulama planını $99\'a açın.</em>','See the evidence free. <em>Unlock the implementation blueprint for $99.</em>').replace('Tanı için kredi kartı istemiyoruz. Web sitenizin ölçülen sorunlarını ve kanıtlarını ücretsiz gösteriyoruz. Yalnızca firmanızın veya yazılımcınızın uygulayabileceği teknik çözüm planına ihtiyaç duyduğunuzda ödeme yaparsınız.','No credit card for diagnosis. See measured website problems and evidence free. Pay only when you need an implementation-grade blueprint your engineering team can execute.').replace('/tr/#scanner','/en/#scanner').replace('Ücretsiz Teşhisi Başlat →','Start Free Diagnostic →').replace('$99 paketini incele','Review the $99 package').replace('$0 · AI GÖRÜNÜRLÜK TEŞHİSİ','$0 · AI VISIBILITY DIAGNOSTIC').replace('Ne yanlış? Nerede? Ne kadar önemli?','What is wrong? Where? How important is it?').replace('Ücretsiz rapor sorunu saklamaz. Karar vermek için gereken teşhis ve kanıt görünür.','The free report does not hide problems. You see the diagnosis and evidence needed to make a decision.').replace('12 deterministik motor skoru','12 deterministic engine scores').replace('13 Search & AI Intelligence Audit','13 Search & AI Intelligence Audits').replace('7 hazırlık lensi','7 readiness lenses').replace('Tüm bulgular, etkilenen URL\'ler ve kanıt','All findings, affected URLs and evidence').replace('öncelik haritası','priority map').replace('sınırları','boundaries').replace('Ücretsiz Tara →','Scan Free →').replace('$99 · AI GÖRÜNÜRLÜK UYGULAMA PLANI','$99 · AI VISIBILITY IMPLEMENTATION BLUEPRINT').replace('Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?','How should it be fixed? In what order? How will it be verified?').replace('Ücretli paket, teşhisi yazılımcının veya teknik ekibin uygulayabileceği doğrulanabilir bir execution blueprint\'e dönüştürür.','The paid package turns the diagnosis into a verifiable execution blueprint for your developer or engineering team.').replace('Kök neden ve P0–P3 uygulama sırası','Root cause and P0–P3 implementation order').replace('Dosya/codebase bağlamı varsa hedefleme','File/codebase targeting when context is provided').replace('Kabul ve regresyon testleri','Acceptance and regression tests').replace('Rollback ve stop conditions','Rollback and stop conditions').replace('13 Intelligence Audit için güvenli uygulama adımları','Safe implementation actions for 13 Intelligence Audits').replace('30 gün içinde 1 doğrulama re-scan','1 verification re-scan within 30 days').replace('Otomatik ZIP teslim paketi','Automatic ZIP delivery package').replace('Uygulama Planını Aç — $99 →','Unlock Implementation Blueprint — $99 →').replace('TESLİM PAKETİ','DELIVERY PACKAGE').replace('Bir PDF değil. Uygulanabilir mühendislik paketi.','Not another PDF. An executable engineering package.').replace('Ödeme entitlement\'ı doğrulandığında sistem aynı alan adını yeniden tarar ve uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token\'ı ile teslim edilebilir.','After payment entitlement is verified, the system re-scans the same domain and automatically produces the implementation package as a ZIP. No membership is required; delivery can use a secure guest-checkout entitlement token.').replace('Firma ve yazılımcı için kullanım kılavuzu.','Usage guide for the business and developer.').replace('Yönetim özeti, risk ve öncelikler.','Executive summary, risk and priorities.').replace('Uygulama sırası ve teknik sözleşme.','Implementation order and technical contract.').replace('Makine okunabilir issue envanteri.','Machine-readable issue inventory.').replace('Düzeltmenin çalıştığını kanıtlayan testler.','Tests that prove the fix works.').replace('Hata halinde güvenli geri dönüş.','Safe recovery if a change fails.').replace('Üyelik yok','No membership').replace('Aylık abonelik yok','No subscription').replace('Tek site / tek çalışma','One site / one engagement').replace('Gizli sorun yok','No hidden issues').replace('Kanıt ücretsiz','Evidence is free').replace('Uydurma yok','No fabricated metrics').replace('Ölçülemeyen veri NOT_MEASURED','Unknown stays NOT_MEASURED')


def replace_main(rel, html):
    p=ROOT/rel
    if not p.exists(): return
    t=p.read_text(encoding='utf-8')
    t=re.sub(r'<main>[\s\S]*?</main>',html,t,count=1)
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
