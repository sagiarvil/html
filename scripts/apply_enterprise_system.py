#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
SKIP={'.git','node_modules','functions','functions-firebase','scripts','tests'}

TR_NAV='''<nav class="primary-nav" aria-label="Ana navigasyon">
  <a href="/tr/yapay-zeka-arama-gorunurlugu/">AI Görünürlük</a>
  <a href="/tr/llms-txt-validator/">llms.txt</a>
  <a href="/tr/llms-txt-haberler/">Haberler</a>
  <a href="/tr/rehberler/">Rehberler</a>
  <a href="/tr/sozluk/">Sözlük</a>
  <a href="/tr/fiyatlandirma/">Fiyatlar</a>
</nav>'''
EN_NAV='''<nav class="primary-nav" aria-label="Primary navigation">
  <a href="/en/ai-search-visibility/">AI Visibility</a>
  <a href="/en/llms-txt-validator/">llms.txt</a>
  <a href="/en/llms-txt-news/">News</a>
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
 <div class="kicker"><span></span><b>3 ŞEFFAF KATMAN · TEK SİTE · UYGULAMA ODAKLI</b></div>
 <h1>Problemi ücretsiz görün. <em>Yol haritasını $99'a açın.</em></h1>
 <p class="release-contract-line"><strong>Ücretsiz teşhis:</strong> Ne yanlış? Nerede? Ne kadar önemli? <strong>$99 AI Görünürlük Yol Haritası:</strong> Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</p>
 <div class="hero-actions"><a class="primary" href="/tr/#scanner">Ücretsiz Teşhisi Başlat →</a><a href="#compare">Paketleri İncele</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare">
 <div class="px-report-boundary px-three-tiers">
  <article class="px-report-free"><span class="eyebrow">$0 · AI GÖRÜNÜRLÜK TEŞHİSİ</span><h2>Ne yanlış? Nerede? Ne kadar önemli?</h2><p>Ücretsiz rapor sorunu saklamaz. Karar vermek için gereken teşhis ve kanıt görünür.</p><ul><li>12 deterministik motor skoru</li><li>13 Search & AI Intelligence Audit</li><li>9 hazırlık lensi: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema</li><li>Tüm bulgular, etkilenen URL'ler ve kanıt</li><li>Severity · confidence · source class</li><li>Impact × Effort öncelik haritası</li><li>Düzeltme kodları ve talimatları: <b>YOK</b></li><li>Enterprise 6 Gizli Vektör: <b>TAMAMEN BUZLU (🔒)</b></li></ul><a class="px-outline" href="/tr/#scanner">Ücretsiz Tara →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · AI GÖRÜNÜRLÜK YOL HARİTASI</span><h2>Nasıl düzeltilecek? Hangi sırayla? Nasıl doğrulanacak?</h2><p>9 Sütunun tamamında teşhisi yazılımcının veya teknik ekibin uygulayabileceği doğrulanabilir bir execution blueprint'e dönüştürür.</p><ul><li>9 Sütun tam mühendislik sözleşmesi</li><li>Kök neden ve P0–P3 uygulama sırası</li><li>Hazır kodlar (robots.txt, llms.txt, Schema graph, AEO)</li><li>Root fix · recovery · prevention</li><li>Kabul ve regresyon testleri + Rollback planı</li><li>Otomatik ZIP teslim paketi (8 ana dosya)</li><li>30 gün içinde 1 doğrulama re-scan</li><li>Enterprise 6 Gizli Vektör: <b>ÖZET AÇIK, KODLAR KİLİTLİ (🔒)</b></li></ul><a class="primary" href="/checkout?plan=pro">Yol Haritasını Aç — $99 →</a></article>
  <article class="px-report-enterprise"><span class="eyebrow vip-tag">$499 · ENTERPRISE DARK POOL INTELLIGENCE</span><h2>Kurumsal Tekel &amp; 6 Gizli Silikon Vadisi Protokolü</h2><p>$1.000.000+ bütçeli AI laboratuvarlarının kullandığı 6 tescilli vektörün açık kaynak kodları ve VIP uygulama kiti.</p><ul><li><b>$99 Yol Haritasındaki her şey DAHİL</b></li><li><b>6 Gizli Enterprise Protokolü (Açık Kodlarla):</b></li><li>1. Model Corpus Seeding &amp; Co-occurrence Engine</li><li>2. Cross-Encoder Attention Optimizasyonu (Perplexity 1. Sıra)</li><li>3. Knowledge Vault Triple Anchoring (Wikidata Consensus)</li><li>4. 14KB KV-Cache Friendly Edge Token Purge (Worker)</li><li>5. Second-Order Synthetic Citation Loop Blueprint</li><li>6. Autonomous Agent Headless Transaction API (MCP)</li><li>22 Dosyalı Mühürlü VIP ZIP Teslimatı</li><li>60 gün içinde 3 VIP re-scan</li></ul><a class="primary enterprise-cta" href="/checkout?plan=enterprise">Enterprise İstihbaratı Aç — $499 →</a></article>
 </div>
</section>
<section class="px-section">
 <div class="px-section-head"><span class="eyebrow">MÜHENDİSLİK TESLİM PAKETİ (ZIP ENVENTARİ)</span><h2>Bir PDF değil. 22 dosyalı üretim sınıfı mühendislik paketi.</h2><p>Ödeme entitlement'ı doğrulandığında sistem aynı alan adını yeniden tarar ve uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token'ı ile teslim edilebilir.</p></div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title"><span>Standart Mühendislik Seti ($99 ve $499 Paketlerinde)</span><span class="badge">11 Temel Dosya</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Firma ve yazılımcı için kullanım kılavuzu ve P0–P3 öncelik başlangıç sözleşmesi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level yönetim özeti, 12 motor skoru ve kritik risk dağılım matrisi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 uygulama sırası, kod şablonları ve teknik uygulama sözleşmesi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Makine okunabilir bulgular, URL'ler ve kanıt issue envanteri.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Düzeltmenin çalıştığını kanıtlayan Playwright ve cURL kabul testleri.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Hata halinde sıfır kesintili güvenli geri dönüş ve durdurma şartları.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 lens + 13 audit makine okunabilir hazırlık verisi yüzeyi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Yazılım ekibi için adım adım yürütme kontrol listesi.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Müşterinin alan adına özel üretilmiş yayına hazır /llms.txt ve /llms-full.txt.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Alan adına özel doğrulanmış Markdown makine yüzey haritası.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12 motorlu deterministik değerlendirme ve saha verisi denetim raporu.</p></article>
  </div>
 </div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title vip"><span>Enterprise Dark Pool İstihbarat Kiti (Yalnızca $499 VIP Pakette)</span><span class="badge">11 Gizli Dosya · Açık Kod &amp; Protokol</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card vip"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">VIP MD</span></div><p>LLM ön-eğitim havuzlarına (Common Crawl, Arxiv) marka entity tohumlama kılavuzu.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">VIP JSON</span></div><p>Perplexity/Cohere Reranker için 0.965+ alıntı skorlama dikkat matrisi.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">VIP JSON</span></div><p>Wikidata QID ve Google Knowledge Graph MID mutabakat üçlüleri (@graph kodu).</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">VIP JS</span></div><p>AI botlarına 14KB altı mikro-HTML sunan çalışan Cloudflare HTMLRewriter Worker kodu.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">VIP MD</span></div><p>LLM'lerin halüsinasyonunu engelleyen kanonik endeks ve sentetik atıf mimarisi.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">VIP JSON</span></div><p>Otonom ajanların siteyi keşfetmesi ve işlem yapması için A2A v1.0 Agent Card.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>Claude Desktop ve Cursor için Model Context Protocol (MCP) doğrudan bağlantı şeması.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">VIP MD</span></div><p>AI yanıt filtrelerinde 'Chosen' (Tercih Edilen) olarak seçilme ton ve biçim standardı.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">VIP JSON</span></div><p>ColBERT v2 geç etkileşimli iç çarpım vektör hizalama matrisi ve token kümeleri.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>RFC 3161 zaman damgası ve C2PA kriptografik içerik orijinallik manifests şeması.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">VIP PY</span></div><p>15 farklı modelde (ChatGPT, Claude, Perplexity) marka halüsinasyonunu izleyen Python nöbetçisi.</p></article>
  </div>
 </div>
</section>
<section class="px-section px-value-strip"><div><span>Üyelik yok</span><b>Guest delivery</b></div><div><span>Aylık abonelik yok</span><b>Tek site / tek çalışma</b></div><div><span>Gizli sorun yok</span><b>Kanıt ücretsiz</b></div><div><span>Uydurma yok</span><b>Ölçülemeyen veri NOT_MEASURED</b></div></section>
</main>'''

EN_PRICING='''<main>
<section class="authority-hero px-pricing-hero" data-commercial-intent="static">
 <div class="kicker"><span></span><b>3 TRANSPARENT TIERS · ONE SITE · EXECUTION FOCUSED</b></div>
 <h1>See the evidence free. <em>Unlock the roadmap for $99.</em></h1>
 <p class="release-contract-line"><strong>Free diagnosis:</strong> What is wrong? Where? How important? <strong>$99 AI Search Visibility Roadmap:</strong> How should it be fixed? In what order? How will it be verified?</p>
 <div class="hero-actions"><a class="primary" href="/en/#scanner">Start Free Diagnostic →</a><a href="#compare">Compare Packages</a></div>
</section>
<section class="px-section px-pricing-stage" id="compare">
 <div class="px-report-boundary px-three-tiers">
  <article class="px-report-free"><span class="eyebrow">$0 · AI VISIBILITY DIAGNOSTIC</span><h2>What is wrong? Where? How important?</h2><p>The free report does not hide problems. You see the diagnosis and evidence needed to make a decision.</p><ul><li>12 deterministic engine scores</li><li>13 Search & AI Intelligence Audits</li><li>9 readiness lenses: SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T · Sitemaps · Schema</li><li>All findings, affected URLs and evidence</li><li>Severity · confidence · source class</li><li>Impact × Effort priority map</li><li>Remediation codes & blueprints: <b>NONE</b></li><li>Enterprise 6 Secret Vectors: <b>REDACTED (🔒)</b></li></ul><a class="px-outline" href="/en/#scanner">Scan Free →</a></article>
  <article class="px-report-paid"><span class="eyebrow">$99 · AI SEARCH VISIBILITY ROADMAP</span><h2>How should it be fixed? In what order? How will it be verified?</h2><p>Turns the 9-pillar diagnosis into a verifiable execution blueprint for your developer or engineering team.</p><ul><li>Full 9-pillar issue inventory + P0–P3 order</li><li>ROOT FIX → RECOVERY → PREVENTION</li><li>Acceptance + regression tests</li><li>Rollback + stop conditions</li><li>Production code templates (robots.txt, llms.txt, Schema graph, AEO)</li><li>1 verification re-scan within 30 days</li><li>Automatic ZIP delivery package (8 core files)</li><li>Enterprise 6 Secret Vectors: <b>SUMMARY VISIBLE, CODE REDACTED (🔒)</b></li></ul><a class="primary" href="/checkout?plan=pro">Unlock Roadmap — $99 →</a></article>
  <article class="px-report-enterprise"><span class="eyebrow vip-tag">$499 · ENTERPRISE DARK POOL INTELLIGENCE</span><h2>Corporate Monopoly &amp; 6 Classified Silicon Valley Protocols</h2><p>6 proprietary vectors from $1,000,000+ AI search research labs with turnkey code and VIP execution kit.</p><ul><li><b>Everything in $99 Roadmap INCLUDED</b></li><li><b>6 Classified Enterprise Protocols (Full Code):</b></li><li>1. Model Corpus Seeding &amp; Co-occurrence Engine</li><li>2. Cross-Encoder Attention Optimization (Perplexity #1 Rank)</li><li>3. Knowledge Vault Triple Anchoring (Wikidata Consensus)</li><li>4. 14KB KV-Cache Friendly Edge Token Purge (Worker)</li><li>5. Second-Order Synthetic Citation Loop Blueprint</li><li>6. Autonomous Agent Headless Transaction API (MCP)</li><li>22-file Extended VIP ZIP Delivery</li><li>3 VIP re-scans within 60 days</li></ul><a class="primary enterprise-cta" href="/checkout?plan=enterprise">Unlock Enterprise Intelligence — $499 →</a></article>
 </div>
</section>
<section class="px-section">
 <div class="px-section-head"><span class="eyebrow">ENGINEERING DELIVERY PACKAGE (ZIP MANIFEST)</span><h2>Not another PDF. A 22-file production-grade engineering package.</h2><p>After payment entitlement is verified, the system re-scans the same domain and automatically produces the implementation package as a ZIP. No membership is required; delivery can use a secure guest-checkout entitlement token.</p></div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title"><span>Standard Engineering Set ($99 Pro &amp; $499 Enterprise)</span><span class="badge">11 Core Files</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card"><div class="px-file-card-head"><b>00_READ_ME.md</b><span class="format-pill">MD</span></div><p>Scope, priorities, and execution starting contract for business and developer.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>01_EXECUTIVE_SUMMARY.md</b><span class="format-pill">MD</span></div><p>C-Level executive summary, 12 engine scores, and critical risk matrix.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>02_IMPLEMENTATION_BLUEPRINT.md</b><span class="format-pill">MD</span></div><p>P0–P3 implementation order, code templates, and technical implementation contract.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>03_FINDINGS.json</b><span class="format-pill">JSON</span></div><p>Machine-readable evidence inventory, affected URLs, and issue findings.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>04_ACCEPTANCE_TESTS.md</b><span class="format-pill">TEST</span></div><p>Playwright and cURL acceptance and regression verification test suites.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>05_ROLLBACK_PLAN.md</b><span class="format-pill">SRE</span></div><p>Zero-downtime rollback procedures and automated stop conditions.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>06_AI_READINESS.json</b><span class="format-pill">JSON</span></div><p>7 readiness lenses and 13 AI intelligence audit machine surfaces.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>07_IMPLEMENTATION_CHECKLIST.txt</b><span class="format-pill">TXT</span></div><p>Step-by-step developer and DevOps execution checklist.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>08_LLMS_TXT_RECOMMENDED.txt</b><span class="format-pill">CONFIG</span></div><p>Production-ready /llms.txt and /llms-full.txt generated for your domain.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>09_MACHINE_SURFACE_MAP.json</b><span class="format-pill">JSON</span></div><p>Domain-specific verified Markdown machine surface route map.</p></article>
   <article class="px-file-card"><div class="px-file-card-head"><b>10_EVALUATION_REPORT.md</b><span class="format-pill">MD</span></div><p>12-engine deterministic assessment and field data audit report.</p></article>
  </div>
 </div>
 <div class="px-delivery-category">
  <div class="px-delivery-category-title vip"><span>Enterprise Dark Pool Intelligence Kit (Exclusive to $499 VIP Tier)</span><span class="badge">11 Classified Files · Turnkey Code &amp; Protocols</span></div>
  <div class="px-delivery-grid-22">
   <article class="px-file-card vip"><div class="px-file-card-head"><b>11_MODEL_CORPUS_SEEDING_BLUEPRINT.md</b><span class="format-pill">VIP MD</span></div><p>LLM pre-training corpus seeding (Common Crawl, Arxiv) &amp; PMI co-occurrence guide.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>12_CROSS_ENCODER_ATTENTION_MATRIX.json</b><span class="format-pill">VIP JSON</span></div><p>0.965+ citation scoring attention matrix for Perplexity/Cohere Reranker.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json</b><span class="format-pill">VIP JSON</span></div><p>Wikidata QID and Google Knowledge Graph MID consensus triples (@graph code).</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>14_CLOUDFLARE_WORKER_14KB_TOKEN_PURGE.js</b><span class="format-pill">VIP JS</span></div><p>Ready-to-deploy Cloudflare HTMLRewriter Worker serving &lt;14KB micro-HTML to AI bots.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>15_SECOND_ORDER_SYNTHETIC_CITATION_LOOP.md</b><span class="format-pill">VIP MD</span></div><p>Canonical industry index blueprint and synthetic citation loop preventing AI hallucination.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>16_A2A_AGENT_CARD.json</b><span class="format-pill">VIP JSON</span></div><p>A2A v1.0 Agent Card spec for autonomous agent discovery and transactions.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>17_MCP_SERVER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>Model Context Protocol (MCP) server spec for Claude Desktop and Cursor integration.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>18_DPO_RLAIF_TONE_CALIBRATION_GUIDE.md</b><span class="format-pill">VIP MD</span></div><p>Tone and formatting guide engineered to be selected as 'Chosen' by DPO/RLAIF filters.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>19_COLBERT_MAXSIM_TOKEN_CLUSTERS.json</b><span class="format-pill">VIP JSON</span></div><p>ColBERT v2 late-interaction dot product alignment matrix and token clusters.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>20_C2PA_PROVENANCE_LEDGER_SPEC.json</b><span class="format-pill">VIP JSON</span></div><p>RFC 3161 timestamping and C2PA cryptographic provenance manifest schema.</p></article>
   <article class="px-file-card vip"><div class="px-file-card-head"><b>21_DARK_POOL_HALLUCINATION_MONITOR.py</b><span class="format-pill">VIP PY</span></div><p>Automated Python sentinel monitoring brand hallucination across 15 frontier LLMs.</p></article>
  </div>
 </div>
</section>
<section class="px-section px-value-strip"><div><span>No membership</span><b>Guest delivery</b></div><div><span>No subscription</span><b>One site / one engagement</b></div><div><span>No hidden issues</span><b>Evidence is free</b></div><div><span>No fabricated metrics</span><b>Unknown stays NOT_MEASURED</b></div></section>
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
