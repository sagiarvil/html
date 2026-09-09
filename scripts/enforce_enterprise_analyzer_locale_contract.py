#!/usr/bin/env python3
import html as html_lib
import re
import enterprise_analyzer_locale_core as core


def _localize_bilingual_attrs(source: str, locale: str) -> str:
    """Resolve data-tr/data-en regardless of attribute order."""
    pattern = re.compile(
        r'(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*(?:\bdata-tr="[^"]*"[^>]*\bdata-en="[^"]*"|\bdata-en="[^"]*"[^>]*\bdata-tr="[^"]*")[^>]*)>)(?P<body>.*?)(</(?P=tag)>)',
        re.S,
    )
    def repl(match: re.Match[str]) -> str:
        attr = re.search(rf'data-{locale}="([^"]*)"', match.group('attrs'))
        return match.group(0) if not attr else match.group(1) + attr.group(1) + match.group(5)
    return pattern.sub(repl, source)


core.localize_bilingual_attrs = _localize_bilingual_attrs

# Legacy Enterprise Analyzer sections predate the structured data-i18n layer.
# Exact replacements are deliberately bounded to visible markup. _replace_outside_scripts
# also replaces HTML-escaped equivalents, because the legacy generator serializes
# visible ampersands and angle brackets before the locale pass.
EXTRA_EN = {
    'Örnek Raporu İncele →':'Review Sample Report →',
    'Wikidata: QID Taranıyor':'Wikidata: entity evidence pending',
    'Common Crawl: Arşiv Taranıyor':'Public crawl archive evidence pending',
    'Kurumsal / Ajans Paylaşım Modu:':'Enterprise / Agency Sharing Mode:',
    'Bu denetim sonucunu müşterinizle veya yönetimle paylaşın:':'Share this audit result with your customer or management:',
    '🔗 Canlı Rapor Linkini Kopyala':'🔗 Copy Live Report Link',
    'Onarım Roadmaps: 15':'Remediation Roadmaps: 15',
    '18 deterministik kablo seviyesi motor, RFC standartları (HSTS, Canonical, robots.txt) ve measured HTML payload TCP CWND ilk paket mimarisi.':'18 deterministic evidence engines covering RFC-aligned HSTS, canonical, robots.txt and measured HTML payload signals.',
    '18 Bağımsız Motor Telemetrisi':'18 Independent Engine Telemetry',
    'RFC 6797 / 6596 / 9309 Uyumluluğu':'RFC 6797 / 6596 / 9309 Alignment',
    'Sıfır Rastgelelik & Deterministik Doğrulama':'Deterministic Verification · No Random Scoring',
    '15 alıcı sorusu × 3 tekrarlı panel (ChatGPT Search, Perplexity, Gemini, Claude, Copilot) ve ampirik kanıt makbuzları.':'Configured buyer-intent observation panel with repeatable provider-surface evidence receipts.',
    '3–5 Gerçek Rakip Eşdeğerlik Kıyası':'3–5 Named Competitor Parity Comparison',
    'Alıntı Kaynak Grafı & P0–P3 Hedefleri':'Citation Source Graph & P0–P3 Targets',
    'Varlık çelişki defteri, 24-alanlı açık onarım yol haritasıleri, n8n DAG otomasyonu ve 22/24 dosyalı üretim teslimat paketi.':'Entity-conflict ledger, evidence-bound remediation roadmaps, n8n DAG automation and versioned engineering delivery artifacts.',
    'Varlık Çatışma Defteri (Hallucination Guard)':'Entity Conflict Ledger (Hallucination Guard)',
    '25-Node n8n CI/CD Otomasyonu & Gerçek DLQ':'n8n CI/CD Automation & DLQ Evidence',
    '24 Dosyalı SHA-256 İmzalı Paket Manifestosu':'Versioned SHA-256 Signed Package Manifest',
    'Kurumsal 7 Disiplin Ölçüm Matrisi (SEO + GEO + AEO + LLMO + AAO + RAG + E-E-A-T)':'Enterprise 7-Discipline Measurement Matrix (SEO + GEO + AEO + LLMO + AAO + RAG + E-E-A-T)',
    'Silikon Vadisi ve New York kurumsal yapay zeka ajanslarının uyguladığı 7 temel ölçüm standardı. Arama motorlarının, yanıt motorlarının, büyük dil modellerinin ve otonom satın alma ajanlarının alan adınızı hangi disiplinde nasıl puanladığını canlı olarak inceleyin:':'Seven evidence disciplines used to separate search, answer, retrieval, trust and agent-readiness signals without presenting external-model behavior as deterministic.',
    'DİSİPLİN 01':'DISCIPLINE 01','DİSİPLİN 02':'DISCIPLINE 02','DİSİPLİN 03':'DISCIPLINE 03','DİSİPLİN 04':'DISCIPLINE 04','DİSİPLİN 05':'DISCIPLINE 05','DİSİPLİN 06':'DISCIPLINE 06','DİSİPLİN 07':'DISCIPLINE 07',
    'RFC 6596 Canonical, robots.txt, HSTS, sitemap.xml ve Core Web Vitals tarama uygunluğu.':'RFC 6596 canonical, robots.txt, HSTS, sitemap.xml and measurable crawl-readiness signals.',
    '/llms.txt v2 manifestosu, Perplexity ve ChatGPT Search üretken yanıt görünürlüğü.':'llms.txt discovery surface and provider-specific AI-search readiness evidence.',
    'Doğrudan cevap çıkarılabilirlik, Featured Snippet ve atomik soru-cevap sözdizimi.':'Direct answer extractability, structured answer blocks and atomic question-answer syntax.',
    'A2A Agent Card v1.0, Model Context Protocol (MCP) JSON-RPC ve otonom satın alma desteği.':'A2A Agent Card, Model Context Protocol (MCP) JSON-RPC and agent-readiness evidence.',
    'RAG (Vektörel Geri Çağırma)':'RAG (Retrieval Readiness)',
    'ColBERT MaxSim geç etkileşimi, Cross-Encoder dikkat matrisi ve semantik chunking.':'ColBERT MaxSim, cross-encoder relevance and semantic chunking readiness.',
    'E-E-A-T (Güven & Varlık)':'E-E-A-T (Trust & Entity)',
    'Sektörel 3–5 Rakip Eşdeğerlik Kıyaslama Matrisi (Competitor Parity)':'3–5 Competitor Parity Matrix',
    'Aşağıdaki matris, aynı 15 sorgu paneli altında hedef alan adınız ile sektör lideri 4 rakibin yapay zeka yüzeylerindeki performansını tarafsız olarak kıyaslar.':'The matrix compares the target domain with named competitors under the same configured observation protocol; unavailable provider evidence remains NOT_MEASURED.',
    'Teknik Hazırlık':'Technical Readiness','Alıntılanma %':'Citation %','Cevap Payı (SoA)':'Share of Answer (SoA)',
    'Neden Onlar / Neden Siz Değil? (Empirical Diff)':'Why Them / Not You? (Evidence Diff)',
    'Mevcut Analiz Bazı — Kategori kıyaslama sorgularında Common Crawl eğitim izi eksiği.':'Current evidence baseline — public crawl/archive evidence is not established for category-comparison queries.',
    'Common Crawl WET arşivlerindeki 10+ yıllık eğitim izi ve G2 kıyaslama sitelerinde yüksek alıntı hacmi.':'Public archive and independent software-directory presence are treated as external evidence, not guaranteed model-training proof.',
    'Wikipedia, Crunchbase ve ChatGPT Search tarafından taranan editoryal satın alma rehberlerindeki varlık yoğunluğu.':'Independent editorial and entity-source presence used as external authority evidence.',
    'Kurumsal log analizi sorgularında alıntılanan yerleşik teknik kurumsal taksonomi.':'Established technical taxonomy observed in public enterprise content.',
    'JavaScript render ve tarama bütçesi üzerine AI araştırma botlarınca taranan orijinal teknik raporlar.':'Original technical reports covering JavaScript rendering and crawl-budget constraints.',
    'Alıntı Kaynak Grafı & Öncelikli Ele Geçirme Hedefleri (P0–P3 Matrix)':'Citation Source Graph & Priority Targets (P0–P3 Matrix)',
    'Aşağıdaki kaynaklar, ChatGPT Search ve Perplexity modellerinin yanıt verirken en çok atıfta bulunduğu bağımsız otoritelerdir. Rakiplerin öne geçmesini sağlayan bu kaynaklar için meşru editoryal entegrasyon yol haritasıleri çıkarılmıştır.':'The sources below are candidate independent authority surfaces. Any citation counts require provider-backed observation evidence; acquisition guidance remains editorial and policy-compliant.',
    'GÜVENİLİRLİK: %94':'CONFIDENCE: 94%','GÜVENİLİRLİK: %92':'CONFIDENCE: 92%','GÜVENİLİRLİK: %90':'CONFIDENCE: 90%','GÜVENİLİRLİK: %88':'CONFIDENCE: 88%',
    'Gözlemlenen Motorlar:':'Observed Surfaces:','Rakip Alıntısı:':'Competitor Citations:','Müşteri:':'Customer:',
    '22 Atıf |':'22 Citations |','18 Atıf |':'18 Citations |','34 Atıf |':'34 Citations |','6 Atıf |':'6 Citations |','0 Atıf':'0 Citations','1 Atıf':'1 Citation',
    'Orta Seviye (Doğrulanabilir Kaynak Gerektirir)':'Medium (Requires Verifiable Source)',
    'Yüksek (Açık Protokol)':'High (Open Protocol)', 'Yüksek (Açık Kaynak Katkısı)':'High (Open-Source Contribution)', 'Yüksek (Doğrudan Webmaster Kontrolü)':'High (Direct Webmaster Control)', 'Orta Seviye':'Medium','Orta Seviye (Doğrulanmış Profil)':'Medium (Verified Profile)',
    '✓ Eylem: Bağımsız şirket tescil ve tarafsız basın kaynaklarıyla resmi Wikidata QID kaydı oluşturun.':'✓ Action: Establish verifiable entity evidence through authoritative registries and independent sources.',
    '✓ Eylem: Claude Desktop ve Cursor IDE için çalışan açık kaynak MCP sunucu uç noktasını yayınlayın.':'✓ Action: Publish a documented MCP endpoint only where the implementation is actually available and testable.',
    '✓ Eylem: Canlı JSON-RPC araç şemalarını içeren açık kaynak MCP uç noktasını resmi depoya PR olarak ekleyin.':'✓ Action: Publish testable JSON-RPC/MCP schemas through the authorized repository when implemented.',
    'Bağımsız Yazılım Karşılaştırma Dizinleri (G2 / Capterra)':'Independent Software Comparison Directories (G2 / Capterra)',
    'Bağımsız G2 / Capterra Yazılım Matrisi':'Independent G2 / Capterra Software Matrix',
    '✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle doğrulayın.':'✓ Action: Keep official product profiles aligned with verified pricing and measured capabilities.',
    '✓ Eylem: /llms.txt ve /llms-full.txt dosyalarını W3C Markdown standardıyla sürekli güncel tutun.':'✓ Action: Keep machine-readable discovery files current and standards-aligned; do not present llms.txt as a ranking guarantee.',
    '✓ Eylem: Yapılandırılmış H2 başlıklarıyla /llms.txt ve /llms-full.txt dosyalarını sürekli güncel tutun.':'✓ Action: Keep machine-readable discovery files current with clear structured headings.',
    'Yapay Zeka Arama Motorları Model Tepki & Alıntı Simülasyonu':'AI Search Observation & Citation Simulation',
    'Aşağıdaki simülasyon; alan adınızın Perplexity Pro, OpenAI SearchGPT, Claude 3.5 Sonnet ve Google Gemini modelleri karşısındaki anlık davranışını gösterir. Ham durumda modellerin neden sizi atladığını, $99 onarım seti sonrasında nasıl 1. sıra doğrulanmış kaynağa dönüştüğünüzü test edin.':'This specimen separates website-side readiness from provider-backed observations. It does not claim that a $99 implementation changes external-model ranking or citation position.',
    '🔴 Mevcut site sinyallerine göre risk':'🔴 Risk Based on Current Site Signals','🟢 Onarım Paketi Sonrası (1. Sıra Doğrulanmış Alıntı)':'🟢 Post-Implementation Verification State',
    '📋 15-Sorgulu Kanonik Alıcı Paneli (Observed Prompt Inquiries across 3 Runs)':'📋 Configured Buyer-Intent Observation Panel',
    '3-RUN TARAFIZ TESPİT':'REPEATABLE OBSERVATION PROTOCOL',
    'Aşağıdaki matris, Mandate V4 standardı gereğince 5 soru ailesinde yürütülen canlı arama sorgularında alan adınızın 4 ana modeldeki atıf ve tavsiye durumunu gösterir:':'The matrix records provider-backed observations only when the required provider configuration exists; otherwise values remain NOT_MEASURED.',
    'Tespitler ve Onarım yol haritasıleri':'Findings and Remediation Roadmaps','Kurumsal Onarım yol haritası & Uygulama Adımları':'Enterprise Remediation Roadmap & Implementation Steps','Kurumsal Onarım yol haritası Kilitli':'Enterprise Remediation Roadmap Locked','15 Onarım yol haritası Dahil':'Remediation Roadmaps Included','$99 — Tüm Onarım yol haritasılerini Aç':'$99 — Unlock Remediation Roadmaps',
    'Yapay Zeka Arama Kaybı & Finansal Risk Hesaplayıcısı':'AI Search Opportunity & Scenario Calculator','AYLIK RİSK PROJEKSİYONU':'MONTHLY SCENARIO PROJECTION','📉 AYDA KAYBEDİLEN POTANSİYEL LEAD':'📉 POTENTIAL MONTHLY LEAD SCENARIO','8 – 15 Müşteri':'8–15 Customer Scenario','Arama botunun measured HTML payload kesilmesine takılması kaynaklı':'Scenario input based on measured HTML payload risk','Wikidata / Bilgi grafiği eksikliği kaynaklı':'Scenario input based on entity-evidence gaps','💰 AYLIK RİSKTEKİ PIPELINE GELİRİ':'💰 MONTHLY PIPELINE SCENARIO','Mevcut kurumsal sepet ve arama hacmine göre':'Based on user-provided commercial assumptions','Senaryo Analizi — ölçülmüş gelir değildir:':'Scenario Analysis — not measured revenue:',
    'Arama motoru robotu sitenizde boğulup fiyat ve hizmet katmanınıza ulaşamadığı için yüksek satın alma niyetli kurumsal ziyaretçiler doğrudan rakiplerinize ve aracı platformlara yönlendirilmektedir. Aşağıdaki sürgülerle şirketinizin aylık hacmine göre risk büyüklüğünü hesaplayın:':'Use the controls below to model opportunity exposure from user-provided traffic and order-value assumptions. This is a scenario, not measured lost revenue.',
    'Aylık Sektörel AI Arama Hacmi:':'Monthly AI Search Volume Assumption:','Ortalama Müşteri / Sipariş Değeri:':'Average Customer / Order Value:','⚡ $99 — sürümlenmiş Onarım Paketini Al & Kaybı Durdur →':'⚡ $99 — Get the Versioned Implementation Pack →','📄 1-Sayfalık Yönetim Kurulu Notu (Board Memo)':'📄 One-Page Board Memo',
    '3 Adımda Sıfır Kod Entegrasyon: "Ben Bu Dosyaları Ne Yapacağım?"':'Three-Step Implementation Guide','SIFIR RİSK · ANINDA ÇALIŞIR':'TESTED IMPLEMENTATION · ROLLBACK REQUIRED','Paketteki sürümlenmiş teslim dosyaları, firmanızın kullandığı platforma göre 3 dakikada yüklenebilecek şekilde organize edilmiştir. Veritabanı veya kaynak kod değişikliği gerekmez; sisteminizde bozulma riski sıfırdır.':'Versioned delivery artifacts are organized by platform. Implementation time and risk depend on the customer stack; acceptance tests and rollback are required.',
    'dosyasını sitenizin kök klasörüne':'place the file in the site root','olarak yükleyin.':'and deploy it through the authorized release process.','kodunu Header and Footer Scripts eklentisine yapıştırın.':'add the verified snippet through the approved site integration path.','Test cURL komutunu çalıştırıp anında teyit edin. (Toplam: 2 dk)':'Run the acceptance cURL test and verify the actual response; no fixed completion time is promised.','E-Ticaret Mağazaları':'E-Commerce Stores','Shopify Admin -> Online Mağaza -> Temalar -> Düzenle adımlarını açın.':'Use the approved Shopify theme-editing workflow.','dosyasındaki':'in the provided file','öncesine şema kodunu yapıştırın.':'place the verified schema block before the closing head tag.','Kaydedin. Ürün ve kurumsal kimliğiniz AI ajanlarına hazır. (Toplam: 1.5 dk)':'Save and run the acceptance tests. Agent readiness is reported only from measured checks.','dosyasını Cloudflare Workers\'a yapıştırın.':'deploy the verified worker through the authorized Cloudflare workflow.','tanımlayın.':'configure it according to the evidenced target environment.','Site Ayarları -> Custom Code sekmesine gidin.':'Open the site Custom Code settings.','Head Code kutusuna paketteki JSON-LD bloğunu bırakın.':'Add the verified JSON-LD block to the approved head-code area.','Publish butonuna basın. (Toplam: 1 dk)':'Publish through the normal release process and run acceptance tests.',
    'Paddle.com Yetkili Satıcı (MoR):':'Paddle.com Merchant of Record:','256-Bit SSL, Global Kart & Kurumsal Fatura / Tax ID Desteği':'Secure checkout, supported payment methods and tax handling','Anında Otomatik Teslim:':'Automated Delivery:','Ödeme sonrası saniyeler içinde alan adına özel ZIP indirme':'Versioned domain-bound ZIP delivery after entitlement verification','Sıfır Sunucu Müdahalesi:':'No Direct Server Intervention:','Kaynak koda ve veritabanına dokunulmaz, geri dönüşü risksizdir':'Public diagnosis does not modify source code or databases; implementation requires normal rollback controls','15 Kurumsal Onarım yol haritası':'Enterprise Remediation Roadmaps','15 Detaylı Onarım yol haritası & Yol Haritası':'Detailed Remediation Roadmaps','Onarım yol haritasılerini Aç ve İndir':'Unlock and Download Remediation Roadmaps','Paddle.com Güvenli Ödeme · Anında Otomatik Teslimat · Sıfır Risk':'Paddle Checkout · Automated Delivery · Versioned Rollback Controls',
    'GİZLİ // YÖNETİM KURULU İÇ MEMORANDUMU':'CONFIDENTIAL // INTERNAL BOARD MEMORANDUM','YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ & ÇÖZÜM yol haritası RAPORU':'AI SEARCH VISIBILITY & REMEDIATION ROADMAP','KİME:':'TO:','İcra Kurulu, CEO & CTO':'Executive Board, CEO & CTO','TARİH:':'DATE:','9 Eylül 2026':'9 September 2026','1. YÖNETİCİ ÖZETİ VE RİSK TEŞHİSİ':'1. EXECUTIVE SUMMARY & RISK DIAGNOSIS','Şirketimizin ana alan adı (':'The primary domain (',') üzerinde yürütülen yapay zeka arama motorları (Perplexity, SearchGPT, Claude, Gemini) denetiminde; ölçülen HTML yükü ve semantik yapı sorunları ve şema eksikliği nedeniyle aylık nitelikli kurumsal müşteri / B2B satış fırsatlarının doğrudan rakiplere yönlendirildiği tespit edilmiştir.':') shows website-side readiness issues in measured HTML payload, semantic structure and schema. External-model recommendation and lost-revenue outcomes are not inferred from these technical signals.','Mevcut kurumsal sepet hacmimize göre her ay tahmini 8–15 kurumsal müşteri kaybı yaşanmakta ve $40.000 risk altındadır.':'Any customer or revenue exposure shown below is a scenario estimate based on user assumptions, not measured loss.','2. 3-DÜZLEMLİ KURUMSAL TEŞHİS SKORLARI':'2. THREE-PLANE ENTERPRISE DIAGNOSTIC SCORES','DÜZLEM A: GÖRÜNÜRLÜK':'PLANE A: VISIBILITY','DÜZLEM B: OTORİTE':'PLANE B: AUTHORITY','DÜZLEM C: AJAN HAZIRLIĞI':'PLANE C: AGENT READINESS','3. ÖNERİLEN ÇÖZÜM: sürümlenmiş MÜHENDİSLİK ÇÖZÜM yol haritası PAKETİ':'3. RECOMMENDED RESPONSE: VERSIONED ENGINEERING REMEDIATION PACKAGE','Yazılım ekibimize teslim edilecek üretime hazır kod şablonları, JSON-LD şemaları ve n8n izleme iş akışları ile:':'The engineering package may include evidenced code templates, JSON-LD and n8n monitoring workflows:','HTML Yük ve Semantik Yapı Optimizasyonu:':'HTML Payload & Semantic Structure Optimization:','Arama botlarının sayfayı terk etmeden tüm ürün ve fiyat katmanını belleğe alması için HTML kod optimizasyonu.':'Reduce unnecessary HTML payload and improve machine-readable structure without claiming a fixed crawler memory window.','Wikidata QID ve Corporation şeması doğrudan <head> içine eklenerek marka teyit edilir.':'Use verified entity identifiers and Organization schema only where authoritative evidence exists.','Otonom yapay zeka satın alma ajanları için temiz makine-okunabilir arayüz.':'Machine-readable interfaces for supported agent workflows.','Önemli İlke:':'Important Boundary:','Biz analiz eder ve yol haritasını hazırlarız. Düzeltme çalışmasını firmanızın kendi yazılım ekibi uygular. Kaynak koda doğrudan müdahale edilmez.':'We analyze evidence and prepare the roadmap. The customer engineering team implements changes; public scanning does not modify source code.','✓ sürümlenmiş Tam Çözüm yol haritasıleri Paketi & Anında ZIP İndirme':'✓ Versioned Remediation Package & ZIP Delivery','🖨️ Yazdır / PDF Kaydet':'🖨️ Print / Save PDF','⚡ yol haritası Paketini Al ($99) →':'⚡ Get the Remediation Package ($99) →',
    'ÖRNEK RAPOR · CANLI NUMUNE':'SAMPLE REPORT · LIVE SPECIMEN','Sıfır Simüle Edilmiş / Uydurma Dakika':'No Fabricated Timing Claims','Bahsedilme, Alıntı & Tavsiye Oranları':'Mention, Citation & Recommendation Observations','Varlık Niteliği':'Entity Attribute','Resmi / Gerçek Değer':'Official / Verified Value','Dış Kaynakta Gözlemlenen Hata':'Observed External Discrepancy','Halüsinasyon Riski':'Hallucination Risk','Deterministik Onarım Çözümü':'Deterministic Remediation','Aylık ajans danışmanlığı / Teklif bazlı':'Monthly agency consulting / quote-based','YÜKSEK':'HIGH','Tüm kanonik sayfalarda price=99 Offer şeması zorunlu kılınmalıdır.':'Keep Offer schema aligned with the verified $99 price where commercially applicable.','Hizmet & İş Modeli':'Service & Business Model','%100 Otomatik Deterministik Yazılım':'Automated Deterministic Software','Pazarlama & SEO Danışmanlık Ajansı':'Marketing & SEO Consulting Agency','KRİTİK':'CRITICAL','Organization şemasında net negatif disclaimers (SUNMAZ) beyan edilmelidir.':'Keep Organization schema aligned with the verified software-only service boundary.','Kanonik Düğüm URI':'Canonical Node URI','www ve apex domain karmaşası':'www/apex domain inconsistency','www adresinden kök etki alanına kalıcı 301 HSTS yönlendirmesi kurulmalıdır.':'Use the verified canonical redirect policy between www and apex hosts.','n8n İş Akışı JSON\'ını Kopyala':'Copy n8n Workflow JSON','📦 $99 Onarım Seti (sürümlenmiş teslim dosyaları)':'📦 $99 Fix Mandate (versioned delivery artifacts)','Yükleniyor...':'Loading...','/ her zaman ücretsiz':'/ remains free','Etkilenen URL ve Kablo Kanıtları':'Affected URLs & HTTP Evidence','Temel robots.txt & llms.txt Kontrolü':'Core robots.txt & llms.txt Checks','Sıfır Üyelik ve Kredi Kartı Şartı':'No Membership Required for Free Diagnosis','EN POPÜLER':'MOST POPULAR','sürümlenmiş Eksiksiz ZIP Paketi':'Versioned Complete ZIP Package','Kök Neden Analizi & P0–P3 Uygulama Sırası':'Root Cause Analysis & P0–P3 Implementation Order','30 Gün İçinde 1 Ücretsiz Doğrulama Taraması':'One Verification Re-scan Within 30 Days','24 Dosyalı Enterprise ZIP Paketi (30–53)':'Versioned Enterprise ZIP Package','15 Alıcı Sorusu × 3 Tekrarlı AI Yanıt Gözlemleri':'Configured Buyer-Intent AI Observation Protocol','3–5 Gerçek Rakip Eşdeğerliği & "Neden Onlar" Analizi':'3–5 Named Competitor Parity & Why-Them Analysis','Alıntı Kaynak Grafı & P0–P3 Ele Geçirme Hedefleri':'Citation Source Graph & P0–P3 Priority Targets','25 Düğümlü n8n Otomasyonu & Gerçek DLQ Kanıtı':'n8n Automation & DLQ Evidence','12 Haftalık Dark Pool Zaman Serisi & 30 Günlük Delta':'Time-Series Observation & 30-Day Delta','ÖDEME GÜVENCESİ':'PAYMENT PROCESSING','Yetkili Kayıt Satıcısı Paddle.com (MoR)':'Paddle.com Merchant of Record (MoR)','AYLIK ABONELİK YOK':'NO MONTHLY SUBSCRIPTION','GİZLİ SORUN YOK':'NO HIDDEN DIAGNOSTIC ISSUE','HTML&HTML, web siteleri için deterministik AI görünürlük analizleri ve yapılandırma yol haritasıleri üreten bağımsız bir yazılım platformudur. Şirketimiz reklam ajansı, SEO danışmanlığı veya özel yazılım geliştirme hizmeti SUNMAZ.':'HTML&HTML is an independent software platform producing deterministic website diagnostics and configuration roadmaps. It does not provide advertising-agency, SEO-consulting or bespoke-development services.','İade Politikası':'Refund Policy','Teslimat Politikası':'Delivery Policy','Yetkili Satıcı':'Merchant of Record','Ödemeler, faturalandırma ve vergi süreçleri yetkili Merchant of Record ortağımız':'Payments, invoicing and tax handling are processed by our authorized Merchant of Record partner','tarafından yürütülür.':'under the applicable checkout terms.'
}

EXTRA_TR = {
    '$99 Onarım Seti (Fix Mandate)':'$99 Onarım Seti',
    'Fix Mandate ($99)':'Onarım Seti ($99)',
}


def _replace_outside_scripts(source: str, mapping: dict[str, str]) -> str:
    parts = core.SCRIPT_STYLE_RE.split(source)
    for i in range(0, len(parts), 2):
        for old, new in sorted(mapping.items(), key=lambda kv: len(kv[0]), reverse=True):
            # Legacy markup may contain either literal or HTML-escaped visible text.
            # Replace both forms, but only outside script/style blocks.
            parts[i] = parts[i].replace(old, new)
            escaped_old = html_lib.escape(old, quote=False)
            if escaped_old != old:
                parts[i] = parts[i].replace(escaped_old, html_lib.escape(new, quote=False))
    return ''.join(parts)


_original_build_page = core.build_page

def _build_page(template: str, filename: str, locale: str, en_path: str, tr_path: str, dictionary):
    out = _original_build_page(template, filename, locale, en_path, tr_path, dictionary)
    out = _replace_outside_scripts(out, EXTRA_EN if locale == 'en' else EXTRA_TR)
    return out

core.build_page = _build_page

if __name__ == '__main__':
    core.main()
