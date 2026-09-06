#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
CSS='<link rel="stylesheet" href="/assets/css/premium-experience.css?v=1">'

TR_TOOL='''<!-- 04 TOOL DIRECTORY -->
<section class="px-section" id="tools" data-premium-infographic="tools">
  <div class="px-section-head"><span class="eyebrow">HTML&amp;HTML / 02</span><h2>Özel Denetim Araçları</h2><p>Teknik araç listesinden fazlası: müşterinin yapay zekaya sorduğu sorudan sitenize gelen ticari fırsata kadar hangi halkanın koptuğunu görün.</p></div>
  <div class="px-tool-flow">
    <article class="px-flow-card"><span class="node">01</span><h3>Bulun</h3><p>Robots, sitemap, crawl ve AI tarayıcı erişimi. Yapay zeka sitenize ulaşabiliyor mu?</p></article>
    <article class="px-flow-card"><span class="node">02</span><h3>Anlaşılın</h3><p>Schema, entity graph, semantik HTML ve llms.txt. Kim olduğunuz ve ne sunduğunuz net mi?</p></article>
    <article class="px-flow-card"><span class="node">03</span><h3>Kaynak Olun</h3><p>AEO, RAG, E-E-A-T ve özgün bilgi sinyalleri. İçeriğiniz cevapta kullanılmaya elverişli mi?</p></article>
    <article class="px-flow-card"><span class="node">04</span><h3>Tıklanın</h3><p>Canlı link, canonical ve yönlendirme bütünlüğü. Kaynak gösterildiğinizde kullanıcı doğru sayfaya geliyor mu?</p></article>
    <article class="px-flow-card"><span class="node">05</span><h3>Talebe Dönüşün</h3><p>CTA, form ve erişilebilir aksiyonlar. Yapay zeka kaynaklı ilgi gerçek müşteri yoluna bağlanabiliyor mu?</p></article>
  </div>
  <div class="px-lenses">
    <div class="px-lens"><b>AI GÖRÜNÜRLÜK</b><span>AI Hazırlığı · AI Tarayıcı · AI Mention</span></div>
    <div class="px-lens"><b>MAKİNE BİLGİ YÜZEYİ</b><span>llms.txt · Schema · Entity Graph</span></div>
    <div class="px-lens"><b>TEKNİK TEMEL</b><span>12 Motor · Teknik SEO · Link · Güvenlik</span></div>
    <div class="px-lens"><b>KULLANICI & AJAN YOLU</b><span>Erişilebilirlik · Dönüşüm · AAO</span></div>
  </div>
  <div class="px-actions"><a class="primary" href="/tr/site-tarama/">Sitemde Hangi Halka Kopuyor? →</a><a href="/tr/araclar/">10 Aracın Tamamını Gör</a></div>
</section>
'''
EN_TOOL=TR_TOOL.replace('Özel Denetim Araçları','Specialized Diagnostic Tools').replace('Teknik araç listesinden fazlası: müşterinin yapay zekaya sorduğu sorudan sitenize gelen ticari fırsata kadar hangi halkanın koptuğunu görün.','More than a tool list: see which link breaks between a customer asking AI and a usable commercial path to your website.').replace('Bulun','Get Discovered').replace('Robots, sitemap, crawl ve AI tarayıcı erişimi. Yapay zeka sitenize ulaşabiliyor mu?','Robots, sitemaps, crawl and AI crawler access. Can AI systems reach your website?').replace('Anlaşılın','Be Understood').replace('Schema, entity graph, semantik HTML ve llms.txt. Kim olduğunuz ve ne sunduğunuz net mi?','Schema, entity graphs, semantic HTML and llms.txt. Is who you are and what you offer unambiguous?').replace('Kaynak Olun','Become Source-Eligible').replace('AEO, RAG, E-E-A-T ve özgün bilgi sinyalleri. İçeriğiniz cevapta kullanılmaya elverişli mi?','AEO, RAG, E-E-A-T and original-information signals. Is your content usable as an answer source?').replace('Tıklanın','Earn the Click').replace('Canlı link, canonical ve yönlendirme bütünlüğü. Kaynak gösterildiğinizde kullanıcı doğru sayfaya geliyor mu?','Live links, canonicals and redirect integrity. If cited, does the user land on the right page?').replace('Talebe Dönüşün','Convert Interest').replace('CTA, form ve erişilebilir aksiyonlar. Yapay zeka kaynaklı ilgi gerçek müşteri yoluna bağlanabiliyor mu?','CTAs, forms and accessible actions. Can AI-sourced interest connect to a real customer journey?').replace('AI GÖRÜNÜRLÜK','AI VISIBILITY').replace('AI Hazırlığı · AI Tarayıcı · AI Mention','AI Readiness · AI Crawler · AI Mention').replace('MAKİNE BİLGİ YÜZEYİ','MACHINE KNOWLEDGE').replace('llms.txt · Schema · Entity Graph','llms.txt · Schema · Entity Graph').replace('TEKNİK TEMEL','TECHNICAL FOUNDATION').replace('12 Motor · Teknik SEO · Link · Güvenlik','12 Engines · Technical SEO · Links · Security').replace('KULLANICI & AJAN YOLU','USER & AGENT JOURNEY').replace('Erişilebilirlik · Dönüşüm · AAO','Accessibility · Conversion · AAO').replace('/tr/site-tarama/','/en/website-scanner/').replace('Sitemde Hangi Halka Kopuyor? →','Find My Broken Link →').replace('/tr/araclar/','/en/tools/').replace('10 Aracın Tamamını Gör','View All 10 Tools')

TR_ENG='''<!-- 05 12 ENGINES / EVIDENCE / TRUST -->
<section class="px-section" id="engines" data-premium-infographic="engines">
  <div class="px-section-head"><span class="eyebrow">HTML&amp;HTML / 03</span><h2>12 motor. Tek karar zinciri.</h2><p>12 ayrı skor görmek yerine, sitenizin yapay zekada görünme fırsatını dört iş sonucuna bağlayan tek bir kanıt akışı görün.</p></div>
  <div class="px-engine-rail">
    <article class="px-engine-phase"><span>01 · KEŞFEDİLİRLİK</span><h3>Önce bulunabilir olun.</h3><ul><li><b>01</b>Tarama & İndeksleme</li><li><b>02</b>Teknik SEO</li><li><b>12</b>Bağlantı Bütünlüğü</li></ul><div class="px-engine-outcome">ÇIKTI → Arama ve AI sistemleri doğru URL'lere ulaşabiliyor.</div></article>
    <article class="px-engine-phase"><span>02 · ANLAMLANDIRMA</span><h3>Sonra doğru anlaşılın.</h3><ul><li><b>03</b>AI / GEO Erişimi</li><li><b>04</b>llms.txt</li><li><b>05</b>Yapısal Veri</li><li><b>10</b>Ajan Hazırlığı</li></ul><div class="px-engine-outcome">ÇIKTI → Marka, içerik ve makine yüzeyleri daha az belirsiz.</div></article>
    <article class="px-engine-phase"><span>03 · GÜVEN & DENEYİM</span><h3>Kaynak olmaya hazır hale gelin.</h3><ul><li><b>06</b>Performans Hijyeni</li><li><b>07</b>Erişilebilirlik</li><li><b>08</b>Güvenlik Temeli</li><li><b>09</b>İçerik Güveni</li></ul><div class="px-engine-outcome">ÇIKTI → Teknik güven ve insan/ajan deneyimi korunuyor.</div></article>
    <article class="px-engine-phase"><span>04 · TİCARİ YOL</span><h3>İlgiyi aksiyona bağlayın.</h3><ul><li><b>11</b>Dönüşüm</li><li><b>+13</b>Intelligence Audits</li><li><b>+7</b>Readiness Lens</li></ul><div class="px-engine-outcome">ÇIKTI → Sorun listesi değil, önceliklendirilmiş ticari risk haritası.</div></article>
  </div>
</section>
'''
EN_ENG=TR_ENG.replace('12 motor. Tek karar zinciri.','12 engines. One decision chain.').replace('12 ayrı skor görmek yerine, sitenizin yapay zekada görünme fırsatını dört iş sonucuna bağlayan tek bir kanıt akışı görün.','Instead of twelve disconnected scores, see one evidence chain mapping AI visibility readiness to four business outcomes.').replace('KEŞFEDİLİRLİK','DISCOVERY').replace('Önce bulunabilir olun.','First, be discoverable.').replace('Tarama & İndeksleme','Crawl & Index').replace('Teknik SEO','Technical SEO').replace('Bağlantı Bütünlüğü','Link Integrity').replace("ÇIKTI → Arama ve AI sistemleri doğru URL'lere ulaşabiliyor.",'OUTCOME → Search and AI systems can reach the intended URLs.').replace('ANLAMLANDIRMA','UNDERSTANDING').replace('Sonra doğru anlaşılın.','Then, be understood correctly.').replace('AI / GEO Erişimi','AI / GEO Access').replace('Yapısal Veri','Structured Data').replace('Ajan Hazırlığı','Agent Readiness').replace('ÇIKTI → Marka, içerik ve makine yüzeyleri daha az belirsiz.','OUTCOME → Brand, content and machine surfaces are less ambiguous.').replace('GÜVEN & DENEYİM','TRUST & EXPERIENCE').replace('Kaynak olmaya hazır hale gelin.','Become source-ready.').replace('Performans Hijyeni','Performance Hygiene').replace('Erişilebilirlik','Accessibility').replace('Güvenlik Temeli','Security Baseline').replace('İçerik Güveni','Content Trust').replace('ÇIKTI → Teknik güven ve insan/ajan deneyimi korunuyor.','OUTCOME → Technical trust and human/agent experience are protected.').replace('TİCARİ YOL','COMMERCIAL PATH').replace('İlgiyi aksiyona bağlayın.','Connect interest to action.').replace('Dönüşüm','Conversion').replace('ÇIKTI → Sorun listesi değil, önceliklendirilmiş ticari risk haritası.','OUTCOME → A prioritized commercial risk map, not another issue dump.')

TR_HOW='''<!-- 06 HOW IT WORKS -->
<section class="px-section" id="how" data-premium-infographic="process"><div class="px-section-head"><span class="eyebrow">HTML&amp;HTML / 04</span><h2>Üç adım. Aynı kanıt zinciri.</h2><p>Önce gerçeği görün. Sonra neyin para kaybettirebilecek bir görünürlük engeli olduğunu anlayın. Yalnız uygulama reçetesine ihtiyaç duyarsanız ödeme yapın.</p></div><div class="px-three-flow"><article class="px-three-step"><span class="num">1</span><h3>Ücretsiz tara</h3><p>En fazla 50 herkese açık sayfa, 12 motor ve 13 Intelligence Audit ile ölçülür.</p><a href="#scanner">Alan adını gir →</a></article><article class="px-three-step"><span class="num">2</span><h3>Kanıtı görün</h3><p>Skor, bulgu, etkilenen URL, önem, güven ve kanıt görünür. Düzeltme kodu veya uygulama reçetesi verilmez.</p><a href="#scanner">Ücretsiz raporu gör →</a></article><article class="px-three-step paid"><span class="num">3</span><h3>$99 reçeteyi aç</h3><p>Kök neden, uygulama sırası, dosya/codebase bağlamı, kabul/regresyon testleri, rollback ve re-scan sözleşmesine dönüşür.</p><a href="/checkout">Uygulama paketini aç →</a></article></div></section>
'''
EN_HOW=TR_HOW.replace('Üç adım. Aynı kanıt zinciri.','Three steps. One evidence chain.').replace('Önce gerçeği görün. Sonra neyin para kaybettirebilecek bir görünürlük engeli olduğunu anlayın. Yalnız uygulama reçetesine ihtiyaç duyarsanız ödeme yapın.','See the evidence first. Understand which blockers matter. Pay only when you need an implementation-grade prescription.').replace('Ücretsiz tara','Scan free').replace('En fazla 50 herkese açık sayfa, 12 motor ve 13 Intelligence Audit ile ölçülür.','Up to 50 public pages are measured by 12 engines and 13 Intelligence Audits.').replace('Alan adını gir →','Enter a domain →').replace('Kanıtı görün','See the evidence').replace('Skor, bulgu, etkilenen URL, önem, güven ve kanıt görünür. Düzeltme kodu veya uygulama reçetesi verilmez.','Scores, findings, affected URLs, severity, confidence and evidence are visible. Fix code and execution prescriptions remain locked.').replace('Ücretsiz raporu gör →','See the free report →').replace('$99 reçeteyi aç','Unlock the $99 prescription').replace('Kök neden, uygulama sırası, dosya/codebase bağlamı, kabul/regresyon testleri, rollback ve re-scan sözleşmesine dönüşür.','Root cause, implementation order, file/codebase context, acceptance/regression tests, rollback and re-scan become one execution contract.').replace('Uygulama paketini aç →','Unlock the execution pack →')

TR_KNOW='''<!-- 08 AUTHORITY & REHBERLER -->
<section class="px-section" data-premium-infographic="knowledge"><div class="px-section-head"><span class="eyebrow">HTML&amp;HTML / 06</span><h2>Teknik Rehberler ve Standartlar</h2><p>Terim ezberletmek yerine, yapay zeka görünürlüğünü öğrenme → doğrulama → uygulama → ölçme döngüsüne bağlayan referans katmanı.</p></div><div class="px-knowledge-flow"><article class="px-knowledge-step"><span class="num">01 · ÖĞREN</span><h3>GEO · AEO · LLMO · AAO · RAG · E-E-A-T</h3><p>Yeni yapay zeka görünürlük kavramlarını kullanıcı diliyle ve kaynak sınıfıyla anlayın.</p><a href="/tr/sozluk/">Referans sözlüğe git →</a></article><article class="px-knowledge-step"><span class="num">02 · DOĞRULA</span><h3>llms.txt · robots · sitemap · schema</h3><p>Makine yüzeylerini gerçek HTTP ve doküman kanıtıyla kontrol edin.</p><a href="/tr/llms-txt-validator/">llms.txt'yi doğrula →</a></article><article class="px-knowledge-step"><span class="num">03 · UYGULA</span><h3>$99 Fix Mandate</h3><p>Ücretsiz teşhisi yazılımcı veya AI coding agent için uygulanabilir görev sözleşmesine çevirin.</p><a href="/tr/fix-mandate/">Teslimatı incele →</a></article><article class="px-knowledge-step"><span class="num">04 · ÖLÇ</span><h3>AI Mention Tracker</h3><p>Hazırlık ile gerçek marka görünürlüğünü karıştırmayın; nötr sorgularda görünürlüğü ayrıca ölçün.</p><a href="/tr/ai-mention-tracker/">Görünürlük takibini incele →</a></article></div></section>
'''
EN_KNOW=TR_KNOW.replace('Teknik Rehberler ve Standartlar','Technical Guides & Standards').replace('Terim ezberletmek yerine, yapay zeka görünürlüğünü öğrenme → doğrulama → uygulama → ölçme döngüsüne bağlayan referans katmanı.','A reference layer that connects AI visibility to a learn → verify → implement → measure loop instead of jargon memorization.').replace('ÖĞREN','LEARN').replace('Yeni yapay zeka görünürlük kavramlarını kullanıcı diliyle ve kaynak sınıfıyla anlayın.','Understand emerging AI visibility concepts in plain language with evidence classes.').replace('/tr/sozluk/','/en/glossary/').replace('Referans sözlüğe git →','Open the reference glossary →').replace('DOĞRULA','VERIFY').replace('Makine yüzeylerini gerçek HTTP ve doküman kanıtıyla kontrol edin.','Verify machine-readable surfaces with real HTTP and documented evidence.').replace('/tr/llms-txt-validator/','/en/llms-txt-validator/').replace("llms.txt'yi doğrula →",'Validate llms.txt →').replace('UYGULA','IMPLEMENT').replace('Ücretsiz teşhisi yazılımcı veya AI coding agent için uygulanabilir görev sözleşmesine çevirin.','Turn the free diagnosis into an execution contract for a developer or AI coding agent.').replace('/tr/fix-mandate/','/en/fix-mandate/').replace('Teslimatı incele →','Review delivery →').replace('ÖLÇ','MEASURE').replace('Hazırlık ile gerçek marka görünürlüğünü karıştırmayın; nötr sorgularda görünürlüğü ayrıca ölçün.','Keep readiness separate from observed visibility; measure neutral-prompt brand visibility independently.').replace('/tr/ai-mention-tracker/','/en/ai-mention-tracker/').replace('Görünürlük takibini incele →','Review visibility tracking →')

TR_REPORT='''<section class="px-report-boundary px-three-tiers" data-premium-infographic="report-boundary">
  <article class="px-report-free">
    <span class="eyebrow">AÇIK TEŞHİS · $0</span>
    <h3>Problemi saklamıyoruz.</h3>
    <p>Müşteri taramayı bitirdiğinde karar verecek kadar gerçek veri ve tarafsız kanıt görür.</p>
    <ul>
      <li>✦ 12 deterministik motor skoru ve analizi</li>
      <li>✦ 13 Search &amp; AI Intelligence Audit özeti</li>
      <li>✦ 7 hazırlık lensi (GEO, AEO, LLMO, RAG, E-E-A-T)</li>
      <li>✦ Tüm tespitler, etkilenen URL\'ler ve canlı kanıtlar</li>
      <li>✦ Severity, confidence ve kaynak sınıfı</li>
      <li>✦ Öncelikli P0–P3 etki ve risk sıralaması</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$0</strong><span>/ kamuya açık</span></div>
      <a class="tier-action" href="#scanner">Ücretsiz Teşhisi Başlat →</a>
    </div>
  </article>
  <article class="px-report-paid featured">
    <span class="eyebrow">EN ÇOK TERCİH EDİLEN</span>
    <span class="tier-eyebrow">MÜHENDİSLİK YOL HARİTASI · $99</span>
    <h3>Nasıl düzelteceğinizi açın.</h3>
    <p>Ücretli ürün “daha fazla hata” satmaz; yazılımcının hemen uygulayacağı 50 sayfalık mühendislik yol haritasını sunar.</p>
    <ul>
      <li>✦ Kök neden ve P0–P3 kod uygulama sözleşmesi</li>
      <li>✦ Dosya ve bileşen seviyesi doğrudan hedefleme</li>
      <li>✦ Kabul testleri ve regresyon koruma kontrolleri</li>
      <li>✦ Rollback planı ve durma koşulları güvencesi</li>
      <li>✦ Otomatik üretilen 11 dosyalı ZIP mühendislik paketi</li>
      <li>✦ 30 gün içinde 1 resmi doğrulama re-scan hakkı</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$99</strong><span>/ 1 domain</span></div>
      <a class="primary tier-action" href="/checkout?plan=pro">Yol Haritasını Aç — $99 →</a>
    </div>
  </article>
  <article class="px-report-enterprise">
    <span class="vip-tag">KURUMSAL MİMARİ</span>
    <span class="tier-eyebrow">ENTERPRISE OTORİTE · $499</span>
    <h3>Yapay Zekâda Birincil Otorite Olun.</h3>
    <p>ChatGPT, Perplexity ve Claude\'da markanızı doğal öneri ve ilk alıntı (Citation #1) yapan 6 stratejik kurumsal mimari.</p>
    <ul>
      <li>✦ <b>$99 Mühendislik Yol Haritası DAHİL</b></li>
      <li>✦ Model Corpus Seeding &amp; Entity Eşleştirme Kılavuzu</li>
      <li>✦ Cross-Encoder Reranking &amp; Citation #1 Mimarisi</li>
      <li>✦ Wikidata &amp; Google MID Bilgi Grafı Mutabakatı</li>
      <li>✦ AST llms.txt v2 ve Yüksek Hızlı Bot Uç Dağıtımı</li>
      <li>✦ Otonom Ajan Hazırlığı (A2A JSON-LD &amp; API)</li>
      <li>✦ 22 dosyalı VIP ZIP + Öncelikli Mühendislik Desteği</li>
      <li>✦ 60 gün içinde 3 VIP doğrulama re-scan hakkı</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$499</strong><span>/ enterprise</span></div>
      <a class="enterprise-cta tier-action" href="/checkout?plan=enterprise">Enterprise Lisansı Başlat — $499 →</a>
    </div>
  </article>
</section>'''
EN_REPORT='''<section class="px-report-boundary px-three-tiers" data-premium-infographic="report-boundary">
  <article class="px-report-free">
    <span class="eyebrow">OPEN DIAGNOSIS · $0</span>
    <h3>We do not hide the problem.</h3>
    <p>After the scan, you see enough verified evidence and raw data to make an informed decision.</p>
    <ul>
      <li>✦ 12 deterministic engine scores &amp; diagnosis</li>
      <li>✦ 13 Search &amp; AI Intelligence Audits summary</li>
      <li>✦ 7 readiness lenses (GEO, AEO, LLMO, RAG, E-E-A-T)</li>
      <li>✦ All findings, affected URLs and verified evidence</li>
      <li>✦ Severity, confidence and source class transparency</li>
      <li>✦ Prioritized P0–P3 risk order</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$0</strong><span>/ public &amp; free</span></div>
      <a class="tier-action" href="#scanner">Run Free Diagnosis →</a>
    </div>
  </article>
  <article class="px-report-paid featured">
    <span class="eyebrow">MOST POPULAR</span>
    <span class="tier-eyebrow">EXECUTION ROADMAP · $99</span>
    <h3>Unlock how to fix it.</h3>
    <p>The paid product does not sell “more problems”; it delivers a 50-page engineering roadmap your developer can execute.</p>
    <ul>
      <li>✦ Root cause and P0–P3 implementation order</li>
      <li>✦ File and component level code targeting</li>
      <li>✦ Acceptance and regression test contracts</li>
      <li>✦ Rollback safeguards and stop conditions</li>
      <li>✦ Turnkey 11-file downloadable ZIP package</li>
      <li>✦ 1 verification re-scan within 30 days</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$99</strong><span>/ 1 domain</span></div>
      <a class="primary tier-action" href="/checkout?plan=pro">Unlock Roadmap — $99 →</a>
    </div>
  </article>
  <article class="px-report-enterprise">
    <span class="vip-tag">ENTERPRISE ARCHITECTURE</span>
    <span class="tier-eyebrow">ENTERPRISE AUTHORITY · $499</span>
    <h3>Establish Primary AI Authority.</h3>
    <p>The complete 6-pillar enterprise system to win primary citations and natural LLM recommendations across ChatGPT, Perplexity, and Claude.</p>
    <ul>
      <li>✦ <b>Everything in $99 Roadmap INCLUDED</b></li>
      <li>✦ Model Corpus Seeding &amp; Entity Association Guide</li>
      <li>✦ Cross-Encoder Reranking &amp; Citation #1 Architecture</li>
      <li>✦ Wikidata &amp; Google MID Knowledge Graph Consensus</li>
      <li>✦ AST llms.txt v2 &amp; High-Speed Bot Edge Delivery</li>
      <li>✦ Autonomous Agent Readiness (A2A JSON-LD &amp; API)</li>
      <li>✦ 22-file extended VIP ZIP + Full Architecture Codebases</li>
      <li>✦ 3 VIP re-scans within 60 days</li>
    </ul>
    <div class="tier-footer">
      <div class="tier-price"><strong class="amount">$499</strong><span>/ enterprise</span></div>
      <a class="enterprise-cta tier-action" href="/checkout?plan=enterprise">Unlock Enterprise License — $499 →</a>
    </div>
  </article>
</section>'''

TR_PRICING='''<main class="px-pricing"><section class="px-pricing-hero"><div class="kicker"><span></span><b>TEK ÜRÜN · NET SINIR</b></div><h1>Problemi ücretsiz görün.<br><em>Nasıl düzelteceğinizi $99'da açın.</em></h1><p>Ücretsiz tarama teşhisi saklamaz. $99 Fix Mandate; aynı bulguları yazılımcı, DevOps veya AI coding agent için uygulanabilir, test edilebilir ve geri alınabilir bir çalışma paketine dönüştürür.</p><div class="px-trust-row"><span>Kayıt gerekmez</span><span>1 domain</span><span>50 sayfaya kadar</span><span>30 gün re-scan</span><span>Reçete ödeme katmanında</span></div></section><section class="px-price-grid"><article class="px-price-card"><span class="tag">TAM TEŞHİS</span><div class="amount">$0</div><p class="sub">Ne yanlış? Nerede? Ne kadar önemli? Hangi kanıt bunu destekliyor?</p><ul><li>12 deterministik motor skoru</li><li>13 Intelligence Audit + 7 readiness lens</li><li>Tüm bulgular ve etkilenen URL'ler</li><li>Severity + confidence + source class</li><li>AI crawler / llms.txt / schema / link kanıtı</li><li>Uygulama reçetesi ve kod değişikliği yok</li></ul><a href="/tr/#scanner">Ücretsiz raporumu oluştur →</a></article><article class="px-price-card featured"><span class="tag">FULL SITE FIX MANDATE</span><div class="amount">$99</div><p class="sub">Teşhisi, doğrudan uygulanabilir mühendislik çalışma emrine dönüştürür.</p><ul><li>P0–P3 uygulanma sırası</li><li>Kök neden → düzeltme → recovery → prevention</li><li>Acceptance + regression testleri</li><li>Rollback + stop conditions</li><li>Codebase verilirse dosya/bileşen hedefleme</li><li>30 gün içinde 1 doğrulama re-scan</li></ul><a href="/checkout">Uygulama paketini aç — $99 →</a></article></section><section class="px-delivery"><header><span class="eyebrow">TESLİMAT TASARIMI</span><h2>Yazılımcının “şimdi ne yapacağım?” diye sormayacağı paket.</h2><p>Ödeme entegrasyonu aktive edildiğinde üyelik zorunlu olmayacak. Satın alma kaydına bağlı süreli teslim bağlantısı, ilgili domain için oluşturulan ZIP paketini açacak.</p></header><div class="px-files"><div class="px-file"><b>00-README.txt</b><span>Kapsam, öncelik ve başlangıç noktası.</span></div><div class="px-file"><b>01-FIX-MANDATE.md</b><span>P0–P3 uygulama sözleşmesi.</span></div><div class="px-file"><b>02-FINDINGS.json</b><span>Makine okunabilir kanıt envanteri.</span></div><div class="px-file"><b>03-TESTS.md</b><span>Kabul, regresyon ve re-scan kriterleri.</span></div><div class="px-file"><b>04-ROLLBACK.md</b><span>Geri alma ve durma koşulları.</span></div></div><div class="px-buy-flow"><article><strong>01</strong><h3>Tara</h3><p>Ücretsiz teşhis tamamlanır.</p></article><article><strong>02</strong><h3>Öde</h3><p>Güvenli sağlayıcı entitlement üretir.</p></article><article><strong>03</strong><h3>ZIP'i al</h3><p>Süreli indirme bağlantısı; hesap zorunlu değil.</p></article><article><strong>04</strong><h3>Uygula & doğrula</h3><p>Yazılımcı uygular, aynı domain yeniden taranır.</p></article></div><p class="px-note">Kart verisi HTML&HTML sunucusunda tutulmaz. Ödeme sağlayıcısı yapılandırılana kadar ücret tahsilatı ve teslim entitlement'ı fail-closed kalır.</p></section></main>'''
EN_PRICING=TR_PRICING.replace('TEK ÜRÜN · NET SINIR','ONE PRODUCT · CLEAR BOUNDARY').replace('Problemi ücretsiz görün.<br><em>Nasıl düzelteceğinizi $99\'da açın.</em>','See the problem free.<br><em>Unlock how to fix it for $99.</em>').replace('Ücretsiz tarama teşhisi saklamaz. $99 Fix Mandate; aynı bulguları yazılımcı, DevOps veya AI coding agent için uygulanabilir, test edilebilir ve geri alınabilir bir çalışma paketine dönüştürür.','The free scan does not hide the diagnosis. The $99 Fix Mandate turns the same evidence into an executable, testable and reversible work package for a developer, DevOps or AI coding agent.').replace('Kayıt gerekmez','No signup').replace('1 domain','1 domain').replace('50 sayfaya kadar','Up to 50 pages').replace('30 gün re-scan','30-day re-scan').replace('Reçete ödeme katmanında','Prescription is paid').replace('TAM TEŞHİS','FULL DIAGNOSIS').replace('Ne yanlış? Nerede? Ne kadar önemli? Hangi kanıt bunu destekliyor?','What is wrong, where, how serious, and what proves it?').replace('12 deterministik motor skoru','12 deterministic engine scores').replace('13 Intelligence Audit + 7 readiness lens','13 Intelligence Audits + 7 readiness lenses').replace("Tüm bulgular ve etkilenen URL'ler",'All findings and affected URLs').replace('AI crawler / llms.txt / schema / link kanıtı','AI crawler / llms.txt / schema / link evidence').replace('Uygulama reçetesi ve kod değişikliği yok','No implementation prescription or code changes').replace('/tr/#scanner','/en/#scanner').replace('Ücretsiz raporumu oluştur →','Create my free report →').replace('Teşhisi, doğrudan uygulanabilir mühendislik çalışma emrine dönüştürür.','Turns the diagnosis into an implementation-grade engineering work order.').replace('P0–P3 uygulanma sırası','P0–P3 implementation order').replace('Kök neden → düzeltme → recovery → prevention','Root cause → fix → recovery → prevention').replace('Acceptance + regression testleri','Acceptance + regression tests').replace('Codebase verilirse dosya/bileşen hedefleme','File/component targeting when codebase is provided').replace('30 gün içinde 1 doğrulama re-scan','1 validation re-scan within 30 days').replace('Uygulama paketini aç — $99 →','Unlock execution pack — $99 →').replace('TESLİMAT TASARIMI','DELIVERY DESIGN').replace('Yazılımcının “şimdi ne yapacağım?” diye sormayacağı paket.','A package that removes “what do I do next?” from implementation.').replace('Ödeme entegrasyonu aktive edildiğinde üyelik zorunlu olmayacak. Satın alma kaydına bağlı süreli teslim bağlantısı, ilgili domain için oluşturulan ZIP paketini açacak.','When payment integration is activated, membership will not be required. A purchase-scoped, expiring delivery link will unlock the ZIP package generated for the paid domain.').replace('Kapsam, öncelik ve başlangıç noktası.','Scope, priorities and starting point.').replace('P0–P3 uygulama sözleşmesi.','P0–P3 implementation contract.').replace('Makine okunabilir kanıt envanteri.','Machine-readable evidence inventory.').replace('Kabul, regresyon ve re-scan kriterleri.','Acceptance, regression and re-scan criteria.').replace('Geri alma ve durma koşulları.','Rollback and stop conditions.').replace('Tara','Scan').replace('Ücretsiz teşhis tamamlanır.','Free diagnosis completes.').replace('Öde','Pay').replace('Güvenli sağlayıcı entitlement üretir.','Secure provider issues entitlement.').replace("ZIP'i al",'Get ZIP').replace('Süreli indirme bağlantısı; hesap zorunlu değil.','Expiring download link; no account required.').replace('Uygula & doğrula','Implement & verify').replace('Yazılımcı uygular, aynı domain yeniden taranır.','Developer implements; the same domain is re-scanned.').replace('Kart verisi HTML&HTML sunucusunda tutulmaz. Ödeme sağlayıcısı yapılandırılana kadar ücret tahsilatı ve teslim entitlement\'ı fail-closed kalır.','Card data is not stored on HTML&HTML servers. Until a payment provider is configured, charging and delivery entitlement remain fail-closed.')

def add_css(text):
    if 'premium-experience.css' not in text:
        text=text.replace('</head>',CSS+'\n</head>')
    return text

def between(text,start,end,replacement):
    if start not in text or end not in text: return text
    a=text.index(start); b=text.index(end,a)
    return text[:a]+replacement+'\n'+text[b:]

def transform_home(rel,lang):
    p=ROOT/rel
    if not p.exists(): return
    text=p.read_text(encoding='utf-8')
    text=add_css(text)
    if lang=='tr':
        h='<h1 data-i18n="heroTitle">Yapay Zeka Sizi Buluyor mu?<br><em>Tavsiye Edilmeye Hazır mısınız?</em></h1>' if rel!='en/index.html' else ''
        text=re.sub(r'<h1 data-i18n="heroTitle">.*?</h1>',h,text,count=1,flags=re.S)
        text=text.replace('<b data-i18n="scan">Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et</b>','<b data-i18n="scan">Ücretsiz Kontrol Et</b>').replace('<b data-i18n="scan">Ücretsiz Tara</b>','<b data-i18n="scan">Ücretsiz Kontrol Et</b>')
        tool,eng,how,know,report=TR_TOOL,TR_ENG,TR_HOW,TR_KNOW,TR_REPORT
    else:
        text=re.sub(r'<h1[^>]*>Your Customer Asks AI.*?</h1>','<h1 data-i18n="heroTitle">Can AI Find You?<br><em>Are You Ready to Be Recommended?</em></h1>',text,count=1,flags=re.S)
        text=re.sub(r'<h1[^>]*>Know what blocks your website.*?</h1>','<h1 data-i18n="heroTitle">Can AI Find You?<br><em>Are You Ready to Be Recommended?</em></h1>',text,count=1,flags=re.S)
        text=text.replace('<b data-i18n="scan">Check My AI Visibility Free</b>','<b data-i18n="scan">Check Free</b>').replace('<b data-i18n="scan">Scan Free</b>','<b data-i18n="scan">Check Free</b>')
        text=text.replace('<b>Check My AI Visibility Free</b>','<b>Check Free</b>').replace('<b>Scan Free</b>','<b>Check Free</b>')
        tool,eng,how,know,report=EN_TOOL,EN_ENG,EN_HOW,EN_KNOW,EN_REPORT
    text=between(text,'<!-- 04 TOOL DIRECTORY -->','<!-- 05 12 ENGINES / EVIDENCE / TRUST -->',tool)
    next_anchor = '<!-- 07 FIX MANDATE & PRICING -->' if '<!-- 07 FIX MANDATE & PRICING -->' in text else '<!-- 08 AUTHORITY & REHBERLER -->'
    text=between(text,'<!-- 06 HOW IT WORKS -->',next_anchor,how)
    text=between(text,'<!-- 08 AUTHORITY & REHBERLER -->','<!-- 09 SHORT FAQ -->',know)
    if 'data-premium-infographic="report-boundary"' in text:
        text=re.sub(r'<section[^>]+data-premium-infographic="report-boundary".*?</section>', report, text, flags=re.S)
    elif '<!-- 03 CORE VALUE -->' in text:
        text=text.replace('<!-- 03 CORE VALUE -->',report+'\n\n<!-- 03 CORE VALUE -->',1)
    text=text.replace('$149','$99').replace('"price": "149"','"price": "99"')
    p.write_text(text,encoding='utf-8')

def pricing(rel,lang):
    p=ROOT/rel
    if not p.exists(): return
    text=add_css(p.read_text(encoding='utf-8')).replace('$149','$99').replace('"price": "149"','"price": "99"')
    main=TR_PRICING if lang=='tr' else EN_PRICING
    text=re.sub(r'<main>.*?</main>',main,text,count=1,flags=re.S)
    p.write_text(text,encoding='utf-8')

def clean_glossary():
    for rel in ['tr/sozluk/index.html','en/glossary/index.html']:
        p=ROOT/rel
        if not p.exists(): continue
        text=p.read_text(encoding='utf-8')
        text=re.sub(r'<section class="reference-note">\s*<h2>(?:Google doğruluk sınırı|Google accuracy boundary)</h2>.*?</section>','',text,flags=re.S|re.I)
        p.write_text(add_css(text),encoding='utf-8')

def patch_assets():
    js=ROOT/'assets/js/validator.js'
    if js.exists():
        t=js.read_text(encoding='utf-8').replace('$149','$99').replace("scan:'Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et'","scan:'Ücretsiz Kontrol Et'").replace("scan:'Ücretsiz Tara'","scan:'Ücretsiz Kontrol Et'").replace("scan:'Check My AI Visibility Free'","scan:'Check Free'").replace("scan:'Scan Free'","scan:'Check Free'")
        t=t.replace("heroTitle:'Müşteriniz Yapay Zekaya “Kimi Tavsiye Edersin?” Diye Soruyor. Cevapta Siz Var mısınız?'","heroTitle:'Yapay Zeka Sizi Buluyor mu?<br><em>Tavsiye Edilmeye Hazır mısınız?</em>'")
        js.write_text(t,encoding='utf-8')
    for rel in ['checkout.html','openapi.json']:
        p=ROOT/rel
        if p.exists(): p.write_text(p.read_text(encoding='utf-8').replace('$149','$99').replace('"149"','"99"'),encoding='utf-8')

for rel,lang in [('index.html','tr'),('tr/index.html','tr'),('en/index.html','en')]: transform_home(rel,lang)
pricing('tr/fiyatlandirma/index.html','tr'); pricing('en/pricing/index.html','en')
clean_glossary(); patch_assets()
print('Premium experience materialized: concise hero, reference-like scanner, infographic sections, free/paid report boundary, $99 pricing and mobile layout.')
