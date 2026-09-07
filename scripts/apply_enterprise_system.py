#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
SKIP={'.git','node_modules','functions','functions-firebase','scripts','tests'}

TR_NAV='''<nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">AI Görünürlük</a>
  <a href="/tr/llms-txt-validator/">llms.txt</a>
  <a href="/tr/llms-txt-haberler/">Haberler</a>
  <a href="/tr/sozluk/">Sözlük</a>
  <a href="/tr/fiyatlandirma/">Fiyatlar</a>
</nav>'''
EN_NAV='''<nav class="primary-nav" aria-label="Primary navigation">
  <a href="/en/ai-search-visibility/">AI Visibility</a>
  <a href="/en/llms-txt-validator/">llms.txt</a>
  <a href="/en/llms-txt-news/">News</a>
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
 <div class="kicker"><span></span><b>2 ŞEFFAF KATMAN · TEK SİTE · UYGULAMA ODAKLI</b></div>
 <h1>Problemi ücretsiz görün. <em>Yol haritasını $99'a açın.</em></h1>
 <p class="release-contract-line"><strong>Ücretsiz teşhis:</strong> Ne yanlış? Nerede? Ne kadar önemli? <strong>$99 AI Görünürlük Yol Haritası:</strong> Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</p>
 <div class="hero-actions"><a class="primary" href="/tr/#scanner">Ücretsiz Teşhisi Başlat →</a><a href="#compare">Paketleri İncele</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare" data-premium-infographic="report-boundary">
 <div class="px-report-boundary">
  <article class="px-report-free"><span class="eyebrow">$0 · AI GÖRÜNÜRLÜK TEŞHİSİ</span><h2>Ne yanlış? Nerede? Ne kadar önemli?</h2><p>Ücretsiz rapor sorunu saklamaz. Karar vermek için gereken teşhis ve kanıt görünür.</p><ul><li>12 deterministik motor skoru</li><li>13 Search & AI Intelligence Audit</li><li>9 hazırlık lensi: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema</li><li>Tüm bulgular, etkilenen URL'ler ve kanıt</li><li>Severity · confidence · source class</li><li>Impact × Effort öncelik haritası</li><li>Düzeltme kodları ve talimatları: <b>YOK</b></li><li>Örnek raporu inceleme imkanı</li></ul><a class="px-outline" href="/tr/#scanner">Ücretsiz Tara →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · AI GÖRÜNÜRLÜK YOL HARİTASI</span><h2>Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</h2><p>9 Sütunun tamamında teşhisi yazılımcının veya teknik ekibin uygulayabileceği doğrulanabilir bir execution blueprint'e dönüştürür. Kalıcı çözüm + rollback güvencesi alır..</p><ul><li>9 Sütun tam teknik uygulama mimarisi</li><li>Kök neden teşhisi ve ████████</li><li>Hazır kodlar (robots.txt, llms.txt, Schema graph, AEO)</li><li>Root fix · recovery · prevention</li><li>Test ve güvence sistemleri ████████</li><li>5 kritik kontrol noktası ████████ ile güvence altına alınır</li><li>30 gün içinde 1 doğrulama re-scan</li><li>100% Deterministik Otomasyon (Danışmanlık/Pazarlama Değildir)</li></ul><a class="primary" href="/checkout?plan=pro">Kaybı Önle — $99 →</a></article>
 </div>
</section>

<!-- 9 DETERMINISTIK KATMAN SECTION -->
<section class="px-section" id="deterministik-katmanlar">
 <div class="px-section-head"><span class="eyebrow">DETERMİNİSTİK DENETİM MİMARİSİ</span><h2>Yapay Zeka Arama Sistemlerinin Baktığı 9 Deterministik Katman</h2><p>ChatGPT, Perplexity, Google Gemini ve Claude; anahtar kelime saymaz. Sitenizi tavsiye kümesine almak için bu 9 sütunun teknik ve anlamsal mutabakatını denetler.</p></div>
 <div class="px-delivery-grid-22">
  <article class="px-file-card"><div class="px-file-card-head"><b>01 · TEKNİK SEO & KEŞFEDİLİRLİK</b><span class="format-pill">P0</span></div><p>HTTP 200 OK, taranabilirlik, indekslenebilirlik, canonical tutarlılığı ve DNS çözümlenebilirliği.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>02 · LLMS.TXT & MAKİNE DOKÜMANTASYONU</b><span class="format-pill">P0</span></div><p>v2 şartnamesine uygun /llms.txt, rel=describedby keşfi ve markdown bilgi yüzeyi.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>03 · GEO (GENERATIVE ENGINE OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>Üretken motorların içerik özümsemesi, konu derinliği ve bilgi yoğunluğu optimizasyonu.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>04 · AEO (ANSWER ENGINE OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>Doğrudan yanıt motorları (Perplexity, Claude) için yapılandırılmış soru-cevap ve kanıt blokları.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>05 · LLMO (LARGE LANGUAGE MODEL OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>LLM'lerin bağlam penceresine (context window) en yüksek bilgi/token oranıyla giren semantik metinler.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>06 · RAG & RETRIEVAL READINESS</b><span class="format-pill">P2</span></div><p>Vektör veritabanları ve RAG sistemleri için ayrıştırılabilir chunking ve embedding uygunluğu.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>07 · AAO (AUTONOMOUS AGENT OPTIMIZATION)</b><span class="format-pill">P2</span></div><p>Otonom web ajanları için A2A JSON-LD, form/CTA erişilebilirliği ve etkileşim şemaları.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>08 · SCHEMA.ORG & ENTITY GRAPH</b><span class="format-pill">P2</span></div><p>@graph JSON-LD, Organization, Product, Article tipleri ve açık bilgi grafı ilişkileri.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>09 · E-E-A-T & GÜVEN SİNYALLERİ</b><span class="format-pill">P3</span></div><p>Yazar yetkinliği, yayın tarihi, kaynak atıfları, HTTPS, HSTS ve güvenlik hijyeni.</p></article>
 </div>
 <div class="px-actions" style="margin-top:20px;text-align:center;"><a class="px-outline" href="/tr/deterministik-katmanlar/">9 Katman Detaylı Teknik Dokümanını İncele →</a></div>
</section>

<!-- 18 TEKNİK YOL HARİTASI VEKTÖRÜ -->
<section class="px-section" id="technical-vectors">
 <div class="px-section-head"><span class="eyebrow">TEKNİK MİMARİ VEKTÖRLERİ</span><h2>Teknik İyileştirme ve Makine Uyumluluk Vektörleri</h2><p>$99 Yol Haritası kapsamında sitenizin yapay zeka arama motorları ve otonom ajanlar nezdinde tam mutabakata ulaşması için analiz edilen 18 teknik vektör.</p></div>
 <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>01. MODEL CORPUS SEEDING</b><span class="format-pill">MİMARİ · V1</span></div><p>Common Crawl, Arxiv ve açık web veri havuzlarına yönelik marka entity tohumlama.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02. SYNTHETIC QUERY GEN</b><span class="format-pill">MİMARİ · V2</span></div><p>Sektörel kullanıcı niyetlerini simüle eden teknik sentetik arama varyasyonları.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03. PMI CO-OCCURRENCE</b><span class="format-pill">MİMARİ · V3</span></div><p>Marka adı ile endüstri anahtar terimlerinin anlamsal bağlamda eş-oluşum optimizasyonu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04. CROSS-ENCODER ATTENTION</b><span class="format-pill">MİMARİ · V4</span></div><p>Reranker sistemleri için yüksek alıntı skorlama dikkat matrisi mimarisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05. RECIPROCAL RANK FUSION</b><span class="format-pill">MİMARİ · V5</span></div><p>Hibrit RRF mimarisi ile vektör arama ve anahtar kelime sinyallerini birleştirme.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06. COLBERT LATE-INTERACTION</b><span class="format-pill">MİMARİ · V6</span></div><p>ColBERT MaxSim geç etkileşimli token düzeyinde anlamsal eşleşme yapılandırması.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07. SFT ALIGNMENT</b><span class="format-pill">MİMARİ · V7</span></div><p>Denetimli ince ayar (SFT) veri setlerine uygun formatlı teknik içerik blokları.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08. DPO & RLAIF CALIBRATION</b><span class="format-pill">MİMARİ · V8</span></div><p>AI model filtrelerinde teknik doğruluğu yüksek 'Chosen' içerik kalibrasyonu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09. ANTI-HALLUCINATION DEFENSE</b><span class="format-pill">MİMARİ · V9</span></div><p>Modellerin markanız hakkında yalan veya yanlış veri uydurmasını engelleyen negatif kısıtlar.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10. KNOWLEDGE GRAPH TRIPLES</b><span class="format-pill">MİMARİ · V10</span></div><p>Knowledge Graph ve LLM'ler için @graph JSON-LD anlamsal üçlüler.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>11. WIKIDATA CONSENSUS</b><span class="format-pill">MİMARİ · V11</span></div><p>Wikidata QID ve resmi şirket kayıtlarıyla doğrulanmış bilgi kasası mutabakatı.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>12. ONTOLOGICAL HIERARCHY</b><span class="format-pill">MİMARİ · V12</span></div><p>Thing -> Organization -> Corporation düzeyinde derin ontolojik sınıf tanımları.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>13. 14KB KV-CACHE PURGE</b><span class="format-pill">MİMARİ · V13</span></div><p>AI botlarına 14KB altı mikro-HTML sunan çalışan Cloudflare HTMLRewriter Worker kodu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>14. SUB-40MS ZERO-WINDOW TTFB</b><span class="format-pill">MİMARİ · V14</span></div><p>AI bot IP bloklarına özel HTTP/2 öncelik ağaçları ve 40ms altı anlık sunucu yanıtı.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>15. A2A AGENT CARDS & MCP</b><span class="format-pill">MİMARİ · V15</span></div><p>Otonom web ajanları için A2A v1.0 Agent Card ve Model Context Protocol (MCP) arayüzü.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>16. C2PA CRYPTOGRAPHIC PROVENANCE</b><span class="format-pill">MİMARİ · V16</span></div><p>RFC 3161 zaman damgası ve C2PA dijital imza ile orijinal içerik yaratıcı tescili.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>17. HALLUCINATION INTERCEPTION</b><span class="format-pill">MİMARİ · V17</span></div><p>Modellerde anlık marka halüsinasyonunu izleyen ve semantik yama basan Python nöbetçisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>18. SECOND-ORDER CITATION LOOPS</b><span class="format-pill">MİMARİ · V18</span></div><p>LLM'lerin birbirini referans almasını sağlayan endüstri standart tanımı ve atıf döngüsü.</p></article>
 </div>
</section>

<section class="px-section pricing-delivery-manifest">
 <div class="px-section-head"><span class="eyebrow">MÜHENDİSLİK TESLİM PAKETİ (ZIP ENVANTERİ)</span><h2>Bir PDF değil. 22 dosyalı üretim sınıfı mühendislik paketi.</h2><p>Ödeme entitlement'ı doğrulandığında sistem aynı alan adını yeniden tarar ve $99 Yol Haritası uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token'ı ile anında teslim edilir.</p></div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title"><span>$99 AI Görünürlük Yol Haritası Tam Teslimat Seti</span><span class="badge">22 Dosyalı Eksiksiz Arşiv</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Firma ve yazılımcı için kullanım kılavuzu ve P0–P3 öncelik uygulama rehberi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level yönetim özeti, 12 motor skoru ve kritik risk dağılım matrisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 uygulama sırası, kod şablonları ve teknik uygulama spesifikasyonu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Makine okunabilir bulgular, URL'ler ve kanıt issue envanteri.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Düzeltmenin çalıştığını kanıtlayan Playwright ve cURL kabul testleri.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Hata halinde sıfır kesintili güvenli geri dönüş ve durdurma şartları.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 lens + 13 audit makine okunabilir hazırlık verisi yüzeyi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Yazılım ekibi için adım adım yürütme kontrol listesi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Müşterinin alan adına özel üretilmiş yayına hazır /llms.txt ve /llms-full.txt.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Alan adına özel doğrulanmış Markdown makine yüzey haritası.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12 motorlu deterministik değerlendirme ve saha verisi denetim raporu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>Açık web veri havuzlarına (Common Crawl, Arxiv) marka entity tohumlama kılavuzu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">JSON</span></div><p>Reranker sistemleri için alıntı skorlama dikkat matrisi mimarisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">JSON</span></div><p>Wikidata QID ve Knowledge Graph mutabakat üçlüleri (@graph kodu).</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">JS</span></div><p>AI botlarına 14KB altı mikro-HTML sunan çalışan Cloudflare HTMLRewriter Worker kodu.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">MD</span></div><p>Halüsinasyonu engelleyen kanonik endeks ve sentetik atıf mimarisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">JSON</span></div><p>Otonom ajanların siteyi keşfetmesi ve işlem yapması için A2A v1.0 Agent Card.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">JSON</span></div><p>Claude Desktop ve Cursor için Model Context Protocol (MCP) doğrudan bağlantı şeması.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">MD</span></div><p>AI model filtrelerinde teknik doğruluk ton ve biçim standardı.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">JSON</span></div><p>ColBERT geç etkileşimli iç çarpım vektör hizalama matrisi ve token kümeleri.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">JSON</span></div><p>RFC 3161 zaman damgası ve C2PA kriptografik içerik orijinallik manifest şeması.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">PY</span></div><p>Farklı modellerde (ChatGPT, Claude, Perplexity) marka halüsinasyonunu izleyen Python nöbetçisi.</p></article>
  </div>
 </div>
</section>
<section class="px-section px-value-strip"><div><span>Üyelik yok</span><b>Guest delivery</b></div><div><span>Aylık abonelik yok</span><b>Tek alan adı / yazılım lisansı</b></div><div><span>Gizli sorun yok</span><b>Kanıt ücretsiz</b></div><div><span>Uydurma yok</span><b>Ölçülemeyen veri NOT_MEASURED</b></div></section>
</main>'''

EN_PRICING='''<main>
<section class="authority-hero px-pricing-hero" data-commercial-intent="static">
 <div class="kicker"><span></span><b>2 TRANSPARENT TIERS · ONE SITE · EXECUTION FOCUSED</b></div>
 <h1>See the evidence free. <em>Unlock the roadmap for $99.</em></h1>
 <p class="release-contract-line"><strong>Free diagnosis:</strong> What is wrong? Where? How important? <strong>$99 AI Search Visibility Roadmap:</strong> How should it be fixed? In what order? How will it be verified?</p>
 <div class="hero-actions"><a class="primary" href="/en/#scanner">Start Free Diagnostic →</a><a href="#compare">Compare Packages</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare" data-premium-infographic="report-boundary">
 <div class="px-report-boundary">
  <article class="px-report-free"><span class="eyebrow">$0 · AI VISIBILITY DIAGNOSTIC</span><h2>What is wrong? Where? How important?</h2><p>The free report does not hide problems. You see the diagnosis and evidence needed to make a decision.</p><ul><li>12 deterministic engine scores</li><li>13 Search & AI Intelligence Audits</li><li>9 readiness lenses: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema</li><li>All findings, affected URLs and evidence</li><li>Severity · confidence · source class</li><li>Impact × Effort priority map</li><li>Remediation codes & blueprints: <b>NONE</b></li><li>View sample report anytime</li></ul><a class="px-outline" href="/en/#scanner">Scan Free →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · AI SEARCH VISIBILITY ROADMAP</span><h2>How should it be fixed? In what order? How will it be verified?</h2><p>Turns the 9-pillar diagnosis into a verifiable execution blueprint for your developer or engineering team. Unlocking provides a permanent solution + rollback guarantee..</p><ul><li>Full 9-pillar issue inventory + ████████</li><li>ROOT FIX → RECOVERY → PREVENTION</li><li>Testing and assurance systems ████████</li><li>Rollback + stop conditions</li><li>Production code templates (robots.txt, llms.txt, Schema graph, AEO)</li><li>1 verification re-scan within 30 days</li><li>5 critical checkpoints are secured via ████████</li><li>100% Deterministic Automation (No Agency/Consulting)</li></ul><a class="primary" href="/checkout?plan=pro">Prevent Loss — $99 →</a></article>
 </div>
</section>

<!-- 9 DETERMINISTIC LAYERS SECTION -->
<section class="px-section" id="deterministic-layers">
 <div class="px-section-head"><span class="eyebrow">DETERMINISTIC AUDIT ARCHITECTURE</span><h2>9 Deterministic Layers Evaluated by AI Search Systems</h2><p>ChatGPT, Perplexity, Google Gemini, and Claude evaluate technical and semantic consensus across these 9 pillars to include your domain in recommendation sets.</p></div>
 <div class="px-delivery-grid-22">
  <article class="px-file-card"><div class="px-file-card-head"><b>01 · TECHNICAL SEO & DISCOVERABILITY</b><span class="format-pill">P0</span></div><p>HTTP 200 OK, crawlability, indexability, canonical consistency and DNS resolution.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>02 · LLMS.TXT & MACHINE DOCUMENTATION</b><span class="format-pill">P0</span></div><p>v2 specification /llms.txt, rel=describedby discovery and Markdown knowledge surface.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>03 · GEO (GENERATIVE ENGINE OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>Generative engine ingestion, topical depth and information density optimization.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>04 · AEO (ANSWER ENGINE OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>Structured question-answer and evidence blocks for direct answer engines (Perplexity, Claude).</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>05 · LLMO (LARGE LANGUAGE MODEL OPTIMIZATION)</b><span class="format-pill">P1</span></div><p>Semantic content engineered to enter LLM context windows with maximum info/token ratio.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>06 · RAG & RETRIEVAL READINESS</b><span class="format-pill">P2</span></div><p>Parseable chunking and embedding compatibility for vector databases and RAG systems.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>07 · AAO (AUTONOMOUS AGENT OPTIMIZATION)</b><span class="format-pill">P2</span></div><p>A2A JSON-LD, form/CTA accessibility and interaction schemas for autonomous web agents.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>08 · SCHEMA.ORG & ENTITY GRAPH</b><span class="format-pill">P2</span></div><p>@graph JSON-LD, Organization, Product, Article types and open knowledge graph relations.</p></article>
  <article class="px-file-card"><div class="px-file-card-head"><b>09 · E-E-A-T & TRUST SIGNALS</b><span class="format-pill">P3</span></div><p>Author credentialing, publishing timestamps, citation provenance, HTTPS, HSTS and security hygiene.</p></article>
 </div>
 <div class="px-actions" style="margin-top:20px;text-align:center;"><a class="px-outline" href="/en/deterministic-layers/">Review 9 Layers Technical Specification →</a></div>
</section>

<!-- 18 TECHNICAL ROADMAP VECTORS -->
<section class="px-section" id="technical-vectors">
 <div class="px-section-head"><span class="eyebrow">TECHNICAL ARCHITECTURE VECTORS</span><h2>Technical Remediation and Machine Interoperability Vectors</h2><p>18 technical vectors analyzed within the $99 Roadmap to bring your website into deterministic consensus with AI search engines and autonomous agents.</p></div>
 <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>01. MODEL CORPUS SEEDING</b><span class="format-pill">VECTOR 1</span></div><p>Brand entity seeding guidance into open web pre-training corpora (Common Crawl, Arxiv).</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02. SYNTHETIC QUERY GEN</b><span class="format-pill">VECTOR 2</span></div><p>Synthetic query variations simulating industry customer search intents.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03. PMI CO-OCCURRENCE</b><span class="format-pill">VECTOR 3</span></div><p>Pointwise Mutual Information co-occurrence optimization across model latent spaces.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04. CROSS-ENCODER ATTENTION</b><span class="format-pill">VECTOR 4</span></div><p>Citation scoring attention matrix architecture for neural reranker systems.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05. RECIPROCAL RANK FUSION</b><span class="format-pill">VECTOR 5</span></div><p>Hybrid RRF combining dense semantic vector search with BM25 lexical signals.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06. COLBERT LATE-INTERACTION</b><span class="format-pill">VECTOR 6</span></div><p>ColBERT MaxSim late-interaction token alignment for exact semantic retrieval.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07. SFT ALIGNMENT</b><span class="format-pill">VECTOR 7</span></div><p>Supervised Fine-Tuning dataset formatting for technical product knowledge blocks.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08. DPO & RLAIF CALIBRATION</b><span class="format-pill">VECTOR 8</span></div><p>Calibration to be classified as 'Chosen' by direct preference optimization filters.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09. ANTI-HALLUCINATION DEFENSE</b><span class="format-pill">VECTOR 9</span></div><p>Negative constraint templates preventing models from hallucinating false brand claims.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10. KNOWLEDGE GRAPH TRIPLES</b><span class="format-pill">VECTOR 10</span></div><p>Entity relation triples for Google Knowledge Graph and LLM @graph structures.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>11. WIKIDATA CONSENSUS</b><span class="format-pill">VECTOR 11</span></div><p>Wikidata QID and corporate registry cross-referencing for verified entity status.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>12. ONTOLOGICAL HIERARCHY</b><span class="format-pill">VECTOR 12</span></div><p>Deep class taxonomy definitions from Thing -> Organization -> Corporation.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>13. 14KB KV-CACHE PURGE</b><span class="format-pill">VECTOR 13</span></div><p>Production Cloudflare HTMLRewriter Worker serving sub-14KB micro-HTML to AI bots.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>14. SUB-40MS ZERO-WINDOW TTFB</b><span class="format-pill">VECTOR 14</span></div><p>HTTP/2 Priority Trees and zero-window buffers for sub-40ms response to AI crawlers.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>15. A2A AGENT CARDS & MCP</b><span class="format-pill">VECTOR 15</span></div><p>A2A v1.0 Agent Card and Model Context Protocol (MCP) server endpoints for autonomous agents.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>16. C2PA CRYPTOGRAPHIC PROVENANCE</b><span class="format-pill">VECTOR 16</span></div><p>RFC 3161 timestamps and C2PA cryptographic provenance proving original authorship.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>17. HALLUCINATION INTERCEPTION</b><span class="format-pill">VECTOR 17</span></div><p>Continuous Python watcher monitoring frontier models to detect and patch hallucinations.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>18. SECOND-ORDER CITATION LOOPS</b><span class="format-pill">VECTOR 18</span></div><p>Industry benchmark indexing creating self-reinforcing citation loops across models.</p></article>
 </div>
</section>

<section class="px-section pricing-delivery-manifest">
 <div class="px-section-head"><span class="eyebrow">ENGINEERING DELIVERY PACKAGE (ZIP MANIFEST)</span><h2>Not another PDF. A 22-file production-grade engineering package.</h2><p>After payment entitlement is verified, the system re-scans the same domain and automatically produces the $99 Roadmap implementation package as a ZIP. No membership is required; delivery uses a secure guest-checkout entitlement token.</p></div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title"><span>$99 AI Search Visibility Roadmap Full Delivery Set</span><span class="badge">Complete 22-File Archive</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Scope, priorities, and execution roadmap guide for business and developer.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level executive summary, 12 engine scores, and critical risk matrix.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 implementation order, code templates, and technical implementation blueprint.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Machine-readable evidence inventory, affected URLs, and issue findings.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Playwright and cURL acceptance and regression verification test suites.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Zero-downtime rollback procedures and automated stop conditions.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 readiness lenses and 13 AI intelligence audit machine surfaces.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Step-by-step developer and DevOps execution checklist.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Production-ready /llms.txt and /llms-full.txt generated for your domain.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Domain-specific verified Markdown machine surface route map.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12-engine deterministic assessment and field data audit report.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>Pre-training corpus seeding (Common Crawl, Arxiv) &amp; PMI co-occurrence guide.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">JSON</span></div><p>Citation scoring attention matrix architecture for neural rerankers.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">JSON</span></div><p>Wikidata QID and Google Knowledge Graph MID consensus triples (@graph code).</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">JS</span></div><p>Ready-to-deploy Cloudflare HTMLRewriter Worker serving &lt;14KB micro-HTML to AI bots.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">MD</span></div><p>Canonical industry index blueprint and synthetic citation loop preventing AI hallucination.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">JSON</span></div><p>A2A v1.0 Agent Card spec for autonomous agent discovery and transactions.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">JSON</span></div><p>Model Context Protocol (MCP) server spec for Claude Desktop and Cursor integration.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">MD</span></div><p>Tone and formatting guide engineered to be selected as 'Chosen' by DPO/RLAIF filters.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">JSON</span></div><p>ColBERT late-interaction dot product alignment matrix and token clusters.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">JSON</span></div><p>RFC 3161 timestamping and C2PA cryptographic provenance manifest schema.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">PY</span></div><p>Automated Python sentinel monitoring brand hallucination across frontier LLMs.</p></article>
  </div>
 </div>
</section>
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
