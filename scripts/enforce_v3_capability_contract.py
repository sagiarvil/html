#!/usr/bin/env python3
"""Materialize and enforce the customer-facing Engine V3 capability contract."""

from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
CSS_LINK = '<link rel="stylesheet" href="/assets/css/v3-capabilities.css?v=1">'

TR_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-tr">
  <div class="v3-contract-head">
    <span>MÜŞTERİNİZİN YENİ KISA LİSTESİ · ENGINE V3</span>
    <h2 id="v3-capabilities-tr">Müşteriniz artık on bağlantı incelemiyor. Bir soru soruyor ve kısa listeyi yapay zekâdan alıyor.</h2>
    <p>Bu yüzden mesele yalnızca Google sırası değil. Sitenizin bulunması, doğru anlaşılması, güvenilir bir kaynak olarak kullanılabilmesi ve gerektiğinde bir ajan tarafından işleme dönüştürülebilmesi gerekiyor. HTML&amp;HTML bu zincirdeki site kaynaklı engelleri kanıtıyla gösterir; dış sistemlerin kimi önereceğini kontrol ettiğini söylemez.</p>
    <div class="v3-decision-line"><b>Önce riski ücretsiz görün.</b><span>Yalnızca uygulamaya hazır çözüm gerekiyorsa $99 ödeyin.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="Engine V3 kabiliyet karşılaştırması" tabindex="0">
    <table>
      <thead><tr><th scope="col">Kararınız için gereken</th><th scope="col">Ücretsiz: Sorun nerede?</th><th scope="col" class="v3-paid">$99: Ekibim nasıl kapatır?</th></tr></thead>
      <tbody>
        <tr><th scope="row">8 fazlı canlı röntgen</th><td>DoH/SSRF koruması, HTTP yüzeyleri, bot politika matrisi, 14KB AST bütçesi ve Wikidata sorgusu</td><td class="v3-paid">Aynı bulgu kimlikleriyle yeniden tarama ve uygulama sözleşmesi</td></tr>
        <tr><th scope="row">Deterministik analiz</th><td>18 bağımsız Engine V3 motoru · 105 kontrol · sıfır rastgele skor</td><td class="v3-paid">Kök neden → düzeltme → kabul testi → rollback zinciri</td></tr>
        <tr><th scope="row">Karar istihbaratı</th><td>13 puan dışı analiz · 7 hazırlık lensi</td><td class="v3-paid">P0–P3 öncelik, bağımlılık ve kabul kriterleri</td></tr>
        <tr><th scope="row">7 disiplin</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Her disiplin için kanıta bağlı kod ve konfigürasyon</td></tr>
        <tr><th scope="row">AI görünürlük ve iş etkisi</th><td>Teknik uygunluk ve senaryo bazlı ARR risk modeli</td><td class="v3-paid">Yetki ve sağlayıcılar hazırsa 5 sorgu ailesinde 15 nötr prompt ölçümü</td></tr>
        <tr><th scope="row">Tarama sınırı</th><td>50'ye kadar herkese açık HTML sayfası · 30 canlı link probu</td><td class="v3-paid">Kanıtlanan sayfalara bağlı uygulama ve makine yüzeyi planı</td></tr>
        <tr><th scope="row">Yayın güvenliği</th><td>G0–G9 kapı hazırlığı görünür</td><td class="v3-paid">10 fail-closed CI/CD kapısı · kabul, regresyon ve rollback</td></tr>
        <tr><th scope="row">Makine yüzeyleri</th><td>llms.txt, schema, robots ve keşif kanıtı</td><td class="v3-paid">Tek kök llms.txt önerisi · 30'a kadar sayfa bazlı Markdown manifesti</td></tr>
        <tr><th scope="row">Audit trail</th><td>Skor, güven seviyesi, ham kanıt ve durum</td><td class="v3-paid">ruleChain, computationSteps, checksum ve executionMs</td></tr>
        <tr><th scope="row">Teslim ve uygulama</th><td>Hangi risklerin satın almaya değer olduğunu kanıtlayın</td><td class="v3-paid">30+ sürümlenmiş dosya · AI coding agent promptu · WordPress/edge rehberi · yönetim notu · .ics planı</td></tr>
      </tbody>
    </table>
  </div>
  <p class="v3-boundary"><b>Net sınır:</b> Ölçemediğimiz veriyi başarı gibi göstermeyiz. CWV veya render kanıtı yoksa <b>NOT_MEASURED</b>; yetkili repo bağlamı yoksa <b>REQUIRES_CONTEXT</b> yazar. Sıralama, atıf veya tavsiye garantisi verilmez.</p>
</section>'''

EN_BLOCK = '''<section class="v3-capability-contract" aria-labelledby="v3-capabilities-en">
  <div class="v3-contract-head">
    <span>YOUR CUSTOMER'S NEW SHORTLIST · ENGINE V3</span>
    <h2 id="v3-capabilities-en">Your customer no longer reviews ten links. They ask one question and let AI build the shortlist.</h2>
    <p>This is no longer only a ranking problem. Your site must be discoverable, understood correctly, usable as a trusted source, and ready for an agent to act on. HTML&amp;HTML proves the website-side barriers in that chain; it never claims control over who an external system recommends.</p>
    <div class="v3-decision-line"><b>See the risk for free first.</b><span>Pay $99 only when you need an implementation-ready answer.</span></div>
  </div>
  <div class="v3-compare" role="region" aria-label="Engine V3 capability comparison" tabindex="0">
    <table>
      <thead><tr><th scope="col">What your decision needs</th><th scope="col">Free: Where is the problem?</th><th scope="col" class="v3-paid">$99: How does my team close it?</th></tr></thead>
      <tbody>
        <tr><th scope="row">8-phase live diagnostic</th><td>DoH/SSRF guard, HTTP surfaces, bot-policy matrix, 14KB AST budget, and Wikidata query</td><td class="v3-paid">Re-scan and implementation contract using the same finding IDs</td></tr>
        <tr><th scope="row">Deterministic analysis</th><td>18 independent Engine V3 modules · 105 controls · no random scoring</td><td class="v3-paid">Root cause → fix → acceptance test → rollback chain</td></tr>
        <tr><th scope="row">Decision intelligence</th><td>13 non-scoring analyses · 7 readiness lenses</td><td class="v3-paid">P0–P3 priority, dependencies, and acceptance criteria</td></tr>
        <tr><th scope="row">7 disciplines</th><td>SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</td><td class="v3-paid">Evidence-bound code and configuration for each discipline</td></tr>
        <tr><th scope="row">AI visibility and business impact</th><td>Technical readiness plus a scenario-based ARR risk model</td><td class="v3-paid">15 neutral prompts across 5 query families when entitlement and providers are configured</td></tr>
        <tr><th scope="row">Scan boundary</th><td>Up to 50 public HTML pages · 30 live link probes</td><td class="v3-paid">Evidence-bound implementation and machine-surface plan</td></tr>
        <tr><th scope="row">Release safety</th><td>G0–G9 gate readiness is visible</td><td class="v3-paid">10 fail-closed CI/CD gates · acceptance, regression, and rollback</td></tr>
        <tr><th scope="row">Machine surfaces</th><td>llms.txt, schema, robots, and discovery evidence</td><td class="v3-paid">One proposed root llms.txt · up to 30 page-level Markdown manifests</td></tr>
        <tr><th scope="row">Audit trail</th><td>Score, confidence, raw evidence, and status</td><td class="v3-paid">ruleChain, computationSteps, checksum, and executionMs</td></tr>
        <tr><th scope="row">Delivery and implementation</th><td>Prove which risks are worth fixing</td><td class="v3-paid">30+ versioned files · AI coding-agent prompt · WordPress/edge guide · board memo · .ics plan</td></tr>
      </tbody>
    </table>
  </div>
  <p class="v3-boundary"><b>A clear boundary:</b> We do not present missing evidence as success. Without reliable CWV or render evidence, the result is <b>NOT_MEASURED</b>; without authorized repository context, it is <b>REQUIRES_CONTEXT</b>. Rankings, citations, and recommendations are not guaranteed.</p>
</section>'''

PUBLIC_SUFFIXES = {'.html', '.md', '.json', '.js'}
PUBLIC_ROOT_FILES = {
    'index.html', 'index.md', 'llms.txt', 'openapi.json', 'audit-profile.json',
    'methodology.html', 'pricing.html', 'checkout.html', 'enterprise-analyzer.html',
}
PUBLIC_DIRS = {'tr', 'en', 'enterprise-analyzer', 'ai-report', 'llms', 'assets'}

REPLACEMENTS = (
    ('Web Sitesi Yapay Zeka Arama Hazırlığı ve Teşhis | HTML&amp;HTML', 'Yapay Zeka SEO Analizi ve AI Görünürlük Testi | HTML&amp;HTML'),
    ('Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&amp;HTML', 'Yapay Zeka SEO Analizi ve AI Görünürlük Testi | HTML&amp;HTML'),
    ('AI Search Visibility, GEO, AEO &amp; llms.txt | HTML&amp;HTML', 'AI SEO Audit &amp; ChatGPT Visibility Test | HTML&amp;HTML'),
    ('Web siteniz yapay zeka arama sonuçlarında çıkmaya ve tavsiye edilme fırsatı kazanmaya hazır mı? GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt ve teknik temeli ücretsiz kontrol edin.', 'Web sitenizin ChatGPT, Gemini, Claude ve Perplexity aramalarındaki görünürlük sorunlarını ücretsiz ölçün. 18 motor, 105 kontrol ve $99 uygulama paketi.'),
    ('Is your website ready to appear in AI search and earn recommendation opportunity? Check GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt and the technical foundation free.', 'Audit your website for ChatGPT, Gemini, Claude and Perplexity visibility. Get evidence from 18 engines and 105 checks; unlock the implementation pack for $99.'),
    ('Yapay Zeka Sizi Tavsiye Ediyor mu?<br><em data-i18n="heroSubtitle">Yapay Zeka Sizi Buluyor mu? Tavsiye Edilmeye Hazır mısınız?</em>', 'Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?'),
    ('Can AI Find You?<br><em>Are You Ready to Be Recommended?</em>', 'Can ChatGPT, Gemini and Perplexity Find Your Website?'),
    ('Does AI Recommend You?<br><em data-i18n="heroSubtitle">Can AI Find You? Are You Ready to Be Recommended?</em>', 'Can ChatGPT, Gemini and Perplexity Find Your Website?'),
    ('Müşteriniz kararını yapay zekâdan almaya başladı.<br><em>Siteniz kısa listeye girmeye hazır mı?</em>', 'Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?'),
    ('Your customers now ask AI before they buy.<br><em>Is your site ready to make the shortlist?</em>', 'Can ChatGPT, Gemini and Perplexity Find Your Website?'),
    ('Alan adınızı girin. 8 faz, 18 bağımsız Engine V3 motoru ve 105 kontrol; AI arama görünürlüğü engellerini tarama sırasında kanıtıyla göstersin.', 'Ücretsiz yapay zeka SEO analizi; sitenizin ChatGPT, Gemini, Claude ve Perplexity tarafından bulunmasını ve kaynak olarak değerlendirilmesini engelleyen sorunları kanıtıyla gösterir.'),
    ('Enter your domain. Eight phases, 18 independent Engine V3 modules, and 105 controls stream evidence for AI-search discovery and source-readiness blockers.', 'Run a free AI SEO audit to see the evidence-backed website issues that block discovery, correct understanding and source consideration across leading AI search systems.'),
    ('Fiyatlandırma — Ücretsiz Teşhis ve $99 Fix Mandate | HTML&amp;HTML', 'AI SEO Analizi: Ücretsiz Test ve $99 Paket | HTML&amp;HTML'),
    ('Pricing — Free Diagnosis & $99 Fix Mandate | HTML&amp;HTML', 'AI SEO Audit Pricing: Free Test + $99 Pack | HTML&amp;HTML'),
    ('Tam Site Düzeltme Talimatı — $99 Otomatik Yazılım Paketi | HTML&amp;HTML', 'Yapay Zeka SEO Düzeltme Paketi — $99 | HTML&amp;HTML'),
    ('Get the V3 Implementation Pack — $99 Automated Software Bundle | HTML&HTML', 'AI SEO Implementation Pack — $99 | HTML&HTML'),
    ('Engine V2.1.0', 'Engine V3.0.0'),
    ('ENGINE V2.1.0', 'ENGINE V3.0.0'),
    ('18-Engine V2 Deterministic Orchestrator Active', '18-Engine V3 Deterministic Orchestrator Active'),
    ('120 deep checks, 43-page crawl, and 30 live link probes', '105 deterministic controls, up to 50 public HTML pages, and 30 live link probes'),
    ('120 derin kontrol, 43 sayfa taraması ve 30 canlı link probu', "105 deterministik kontrol, 50'ye kadar herkese açık HTML sayfası ve 30 canlı link probu"),
    ('120 Deep Controls', '105 Deterministic Controls'),
    ('120 Kontrol Noktası', '105 Deterministik Kontrol'),
    ('43 Pages &amp; 30 Probes', 'Up to 50 Pages · 30 Probes'),
    ('43 Sayfa &amp; 30 Canlı Prob', "50'ye Kadar Sayfa · 30 Prob"),
    ('45 Solution Roadmaps', 'G0–G9 Release Gates'),
    ('45 Çözüm Yol Haritası', 'G0–G9 Yayın Kapıları'),
    ('120 kontrolde 108 bulgu tespit edildi.', '105 kontrol kapsamında örnek kritik bulgular gösteriliyor.'),
    ('120 controls identified 108 findings.', 'Representative critical findings are shown across the 105-control contract.'),
    ('18 Engine Deterministic Chain', '18 Engine V3 Deterministic Chain'),
    ('18-Engine Deterministic Chain', '18-Engine V3 Deterministic Chain'),
    ('18 motorlu deterministik zincir', '18 motorlu Engine V3 deterministik zinciri'),
    ('18-engine deterministic chain', '18-engine Engine V3 deterministic chain'),
    ('13 audits in 15 seconds', '13 non-scoring intelligence analyses with streamed results'),
    ('13 denetim. 15 saniye.', '13 puan dışı istihbarat analizi. Sonuçlar tarama sırasında akışla gösterilir.'),
    ('13 intelligence audits', '13 non-scoring intelligence analyses'),
    ('13 Intelligence Audits', '13 non-scoring Intelligence analyses'),
    ('13 audits', '13 non-scoring intelligence analyses'),
    ('13 audit', '13 puan dışı istihbarat analizi'),
    ('13 istihbarat denetimi', '13 puan dışı istihbarat analizi'),
    ('13 denetim', '13 puan dışı istihbarat analizi'),
    ('22-file ZIP', 'versioned implementation ZIP'),
    ('22-file software', 'versioned implementation software'),
    ('22 delivery files', 'a versioned implementation ZIP'),
    ('22-File Enterprise Repair Kit', 'Versioned Engine V3 Implementation ZIP'),
    ('ZIP Delivery with 22 Files', 'ZIP Delivery with 30+ versioned Engine V3 files'),
    ('22 Dosyalı Eksiksiz Arşiv', '30+ Dosyalık Sürümlenmiş Arşiv'),
    ('22 Dosyalı Eksiksiz Mühendislik ZIP Seti', '30+ Dosyalık Sürümlenmiş Engine V3 ZIP Seti'),
    ('22 Files Manifest', 'Engine V3 Delivery Manifest'),
    ('22 dosyadan oluşur', '30+ sürümlenmiş dosyadan oluşur'),
    ('Yapay zeka sitenizi tavsiye ediyor mu?<br><em>Yapay Zeka Sizi Buluyor mu? Tavsiye Edilmeye Hazır mısınız?</em>', 'Müşteriniz kararını yapay zekâdan almaya başladı.<br><em>Siteniz kısa listeye girmeye hazır mı?</em>'),
    ('Does AI Recommend Your Website?<br><em>18-engine autonomous audit & deployment pack</em>', 'Your customers now ask AI before they buy.<br><em>Is your site ready to make the shortlist?</em>'),
    ('Teşhis ücretsiz.<br>Otomatik kod paketi $99.', 'Riski ücretsiz görün.<br>Ekibiniz için uygulanabilir çözüm yalnızca $99.'),
    ("Riski ücretsiz görün.<br>Ekibinize uygulanabilir çözümü $99'a verin.", 'Riski ücretsiz görün.<br>Ekibiniz için uygulanabilir çözüm yalnızca $99.'),
    ('Diagnosis is free.<br>Automated code pack is $99.', 'See the risk for free.<br>Give your team the implementation answer for $99.'),
    ('Riskimi Ücretsiz Ölçmada', 'Ücretsiz taramada'),
    ('Riskimi Ücretsiz Ölçmaya dön', 'Ücretsiz taramaya dön'),
    ('Riskimi Ücretsiz Ölçma', 'Ücretsiz tarama'),
    ('Scan free', 'Measure My Risk — Free'),
    ('Full Site Fix Mandate — $99', 'Get the V3 Implementation Pack — $99'),
    ('Full Site Fix Mandate →', 'Get the V3 Implementation Pack →'),
    ('30 gün garanti', '30 gün içinde yeniden tarama'),
    ('30 days guarantee', 'one re-scan within 30 days'),
    ('24 dosyalık mühendislik reçetelerini', '30+ sürümlenmiş mühendislik dosyasını'),
    ('24-file engineering recipes', '30+ versioned engineering files'),
    ('18 motorla sınırsız canlı teyit', '18 motorla 1 yeniden tarama'),
    ('Unlimited live re-scans on 18 engines', 'One re-scan on 18 engines'),
    ('Simülasyon Modu:', 'Senaryo Önizlemesi — canlı ölçüm değildir:'),
    ('Simulation Grounding State:', 'Scenario Preview — not a live measurement:'),
    ('🔴 Ham Durum (Engelli / Sıfır Alıntı)', '🔴 Mevcut site sinyallerine göre risk'),
    ('🔴 Raw State (Zero-Citation)', '🔴 Risk from current site signals'),
    ('🟢 Onarım Seti Sonrası (1. Sıra Doğrulanmış Alıntı)', '🟢 Uygulama sonrası beklenen hazırlık'),
    ('🟢 Post-Mandate Fix (1st-Rank Verified Citation)', '🟢 Expected readiness after implementation'),
    ('1. SIRA DOĞRULANMIŞ ALINTI', 'ÖNGÖRÜLEN KAYNAK HAZIRLIĞI'),
    ('1ST-RANK VERIFIED CITATION', 'PROJECTED SOURCE READINESS'),
    ('Sektörel Kayıp Aralığı: Aylık Nitelikli B2B Lead / Satış Kaybı', 'Senaryo Aralığı: Aylık Potansiyel B2B Fırsatı'),
    ('Category Risk Range: Monthly Qualified B2B Leads Lost', 'Scenario Range: Potential Monthly B2B Opportunity'),
    ('Sektörel Kayıp Analizi:', 'Senaryo Analizi — ölçülmüş gelir değildir:'),
    ('Category Loss Analysis:', 'Scenario estimate — not measured revenue:'),
    ('Mevcut sepet/hacme göre', 'Girdiğiniz varsayımlara göre'),
    ('Based on audited deal volume', 'Based on your assumptions'),
    ('22 dosyalı üretim sınıfı mühendislik paketi', "sürümlenmiş üretim sınıfı Engine V3 mühendislik ZIP'i"),
    ('22 dosyalık eksiksiz ZIP paketinde', "sürümlenmiş Engine V3 ZIP paketinde"),
    ('22 dosyalık eksiksiz ZIP arşivi', "sürümlenmiş Engine V3 ZIP arşivi"),
    ('22 dosyalık otomatik kod paketidir', "sürümlenmiş otomatik Engine V3 kod paketidir"),
    ('temel 22 dosyanın', 'kanonik teslim dosyalarının'),
    ('22 dosyalık hazır uygulanabilir', 'sürümlenmiş ve uygulanabilir'),
    ('sürümlenmiş Onarım Paketi', '30+ Dosyalık V3 Uygulama Paketi'),
    ('ZIP teslim paketi (sürümlenmiş teslim dosyaları)', 'ZIP teslim paketi (30+ Dosyalık V3 Paket)'),
    ('ZIP delivery package (versioned delivery files)', 'ZIP delivery package (30+ Files · Engine V3)'),
    ('sürümlenmiş Eksiksiz Arşiv', '30+ Dosyalık Sürümlenmiş Arşiv'),
    ('sürümlenmiş Envanter Dizini', '30+ Dosyalık Envanter Dizini'),
    ('versioned production-grade engineering package', '30+ file versioned Engine V3 engineering package'),
    ('versioned turnkey ZIP archive', '30+ file versioned Engine V3 ZIP archive'),
    ('15 saniyede tek tıkla sitenizi tarayın, model ağırlıklarındaki ve RAG mimarisindeki görünürlük kayıplarını kanıtıyla görün.', 'Tek tıkla 8 fazlı taramayı başlatın; bulunabilirlik, kaynak hazırlığı ve RAG mimarisi engellerini kanıtıyla görün.'),
    ('Run a 1-click deep audit in 15 seconds to uncover model weight and RAG architectural gaps.', 'Run an 8-phase audit to expose evidence-backed discovery, source-readiness, and RAG architecture gaps.'),
    ('Alan adınızı girin. 18 bağımsız motor, 105 kontrol noktası ve deterministik karar zinciriyle web sitenizin AI arama ekosistemindeki görünürlük engellerini 15 saniyede tespit etsin.', 'Alan adınızı girin. 8 faz, 18 bağımsız Engine V3 motoru ve 105 kontrol; AI arama görünürlüğü engellerini tarama sırasında kanıtıyla göstersin.'),
    ('Enter your domain. 18 independent engines audit your visibility and citation blockers across ChatGPT, Claude and Perplexity in 15 seconds.', 'Enter your domain. Eight phases, 18 independent Engine V3 modules, and 105 controls stream evidence for AI-search discovery and source-readiness blockers.'),
    ('model ağırlıklarında kayıp riski var', 'açık webde bulunabilirlik ve kaynak olma riski var'),
)


def is_public(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if rel.parts[:2] in {('en', 'llms-txt-news'), ('tr', 'llms-txt-haberler')}:
        return False
    if path.suffix not in PUBLIC_SUFFIXES and path.name != 'llms.txt':
        return False
    return (len(rel.parts) == 1 and path.suffix == '.html') or rel.as_posix() in PUBLIC_ROOT_FILES or rel.parts[0] in PUBLIC_DIRS


def write_if_changed(path: Path, content: str) -> None:
    current = path.read_text(encoding='utf-8')
    if current != content:
        path.write_text(content, encoding='utf-8')


def normalize(content: str) -> str:
    content = re.sub(r'(?:30\+ file ){2,}(?=versioned delivery package)', '30+ file ', content)
    for old, new in REPLACEMENTS:
        content = content.replace(old, new)
    content = re.sub(r'\b18[- ]Engine V2\b', '18-Engine V3', content, flags=re.I)
    content = re.sub(r'\bEngine V2\b', 'Engine V3', content, flags=re.I)
    content = re.sub(r'\b120 deep controls\b', '105 deterministic controls', content, flags=re.I)
    content = re.sub(r'\b120 deep checks\b', '105 deterministic controls', content, flags=re.I)
    content = re.sub(r'\b120 controls\b', '105 controls', content, flags=re.I)
    content = re.sub(r'\b120 checks\b', '105 controls', content, flags=re.I)
    content = re.sub(r'\b120 derin kontrol\b', '105 deterministik kontrol', content, flags=re.I)
    content = re.sub(r'\b120 kontrol(?: noktası)?\b', '105 deterministik kontrol', content, flags=re.I)
    content = re.sub(r'\b120 kontrolde\b', '105 kontrol kapsamında', content, flags=re.I)
    content = re.sub(r'\b43[- ]page crawl\b', 'up to 50 public HTML pages', content, flags=re.I)
    content = re.sub(r'\b43 audited pages\b', 'up to 50 audited public HTML pages', content, flags=re.I)
    content = re.sub(r'\ball 43 pages\b', 'up to 50 evidenced public HTML pages', content, flags=re.I)
    content = re.sub(r'\b43 pages\b', 'up to 50 pages', content, flags=re.I)
    content = re.sub(r'\b43 sayfa taraması\b', "50'ye kadar herkese açık HTML sayfası", content, flags=re.I)
    content = re.sub(r'\b43 taranan sayfa\b', "50'ye kadar taranan herkese açık HTML sayfası", content, flags=re.I)
    content = re.sub(r'\b43 sayfa\b', "50'ye kadar sayfa", content, flags=re.I)
    content = re.sub(r'\b22[- ]file\b', 'versioned', content, flags=re.I)
    content = re.sub(r'\b22 files\b', 'versioned delivery files', content, flags=re.I)
    content = re.sub(r'\b22 dosyalı\b', 'sürümlenmiş', content, flags=re.I)
    content = re.sub(r'\b22 dosyalık\b', 'sürümlenmiş', content, flags=re.I)
    content = re.sub(r'\b22 dosyanın\b', 'kanonik teslim dosyalarının', content, flags=re.I)
    content = re.sub(r'\b22 dosya\b', 'sürümlenmiş teslim dosyaları', content, flags=re.I)
    content = re.sub(r'\b24[- ]file\b', '30+ file versioned', content, flags=re.I)
    content = re.sub(r'\b24 dosyalık\b', '30+ dosyalık sürümlenmiş', content, flags=re.I)
    content = re.sub(r'\b15 saniyede\b', 'tarama sırasında', content, flags=re.I)
    content = re.sub(r'\bin 15 seconds\b', 'during the scan', content, flags=re.I)
    return content


def add_css(content: str) -> str:
    if 'v3-capabilities.css?v=1' in content or '</head>' not in content:
        return content
    return content.replace('</head>', CSS_LINK + '</head>', 1)


def add_block(path: Path, content: str) -> str:
    if '</main>' not in content:
        return content
    lang = 'en' if path.relative_to(ROOT).parts[0] == 'en' else 'tr'
    block = EN_BLOCK if lang == 'en' else TR_BLOCK
    if 'v3-capability-contract' in content:
        return re.sub(r'<section class="v3-capability-contract"[\s\S]*?</section>', block, content, count=1)
    marker = '<!-- 02.5 AUTONOMOUS INTELLIGENCE PIPELINE INFOGRAPHIC -->'
    if marker in content:
        return content.replace(marker, block + '\n\n' + marker, 1)
    return content.replace('</main>', block + '\n</main>', 1)


KEY_PAGES = {
    ROOT / 'index.html', ROOT / 'tr/index.html', ROOT / 'en/index.html',
    ROOT / 'tr/platform/index.html', ROOT / 'en/platform/index.html',
    ROOT / 'tr/methodology/index.html', ROOT / 'en/methodology/index.html',
    ROOT / 'tr/fiyatlandirma/index.html', ROOT / 'en/pricing/index.html',
    ROOT / 'tr/fix-mandate/index.html', ROOT / 'en/fix-mandate/index.html',
}

for path in ROOT.rglob('*'):
    if not path.is_file() or not is_public(path):
        continue
    content = normalize(path.read_text(encoding='utf-8'))
    if path in KEY_PAGES:
        content = add_block(path, add_css(content))
    write_if_changed(path, content)

SOURCE_CONTRACTS = {
    ROOT / 'README.md',
    ROOT / 'src/seo/registry.ts',
    ROOT / 'docs/AI_SEARCH_POSITIONING_CONTRACT.md',
    ROOT / 'scripts/build_homepages.py',
    ROOT / 'scripts/apply_enterprise_system.py',
    ROOT / 'functions/lib/delivery-pack.ts',
    ROOT / 'functions-firebase/src/delivery-pack.ts',
}
for path in SOURCE_CONTRACTS:
    write_if_changed(path, normalize(path.read_text(encoding='utf-8')).replace('$149', '$99'))

# Canonical machine-readable contracts must expose V3 as the primary capability.
audit_path = ROOT / 'audit-profile.json'
audit = json.loads(audit_path.read_text(encoding='utf-8'))
audit['version'] = '3.0.0'
audit['engineContract'] = {
    'name': 'Engine V3 Deterministic Chain',
    'moduleCount': 18,
    'controlCount': 105,
    'qualityGateRange': 'G0-G9',
    'qualityGateCount': 10,
    'randomness': 'none',
    'auditTrailFields': ['score', 'confidence', 'rawData', 'ruleChain', 'computationSteps', 'checksum', 'executionMs'],
}
audit['executionContract'] = {
    'scannerPhases': 8,
    'readinessDisciplines': ['SEO', 'GEO', 'AEO', 'LLMO', 'AAO', 'RAG', 'E-E-A-T'],
    'neutralQueryMaximum': 3,
    'providerMaximum': 3,
    'providerSurfaces': ['OpenAI Responses API + web search', 'Perplexity Sonar API web-search surface', 'Gemini API + Google Search grounding'],
    'maximumObservationsPerRun': 9,
    'promptMeasurementBoundary': 'PAID_AND_PROVIDER_CONFIGURATION_REQUIRED; API/search-grounded surfaces are not identical to consumer UI results',
    'arrRiskClassification': 'SCENARIO_ESTIMATE_NOT_MEASURED_REVENUE',
    'implementationPackage': 'VERSIONED ZIP; EXACT FILE COUNT VARIES WITH EVIDENCED FINDINGS AND UP TO 30 PAGE-LEVEL MACHINE-SURFACE MANIFESTS',
}
audit['machineSurfaceContract'] = {
    'rootLlmsTxt': 1,
    'maxPageLevelMarkdownManifests': 30,
    'llmsTxtClassification': 'PROPOSAL',
    'googleSearchImpact': 'NONE_DOCUMENTED_BY_GOOGLE',
}
audit['measurementTaxonomy'] = {
    'SEO': 'Measured crawl/index/technical signals plus Google vendor guidance; no ranking guarantee.',
    'GEO': 'Website-side source-readiness and generative-search eligibility signals; model recommendation is not measured.',
    'AEO': 'Question/answer structure and answer-extractability heuristics; FAQ rich-result eligibility is not claimed.',
    'LLMO': 'Machine-readable surfaces and llms.txt proposal checks; Google ranking impact is explicitly none.',
    'AAO': 'Explicit agent/API/tool discovery surfaces only; experimental protocols remain EXPERIMENTAL.',
    'RAG': 'Retrieval/chunking/readability heuristics; internal model embeddings, rerankers and vector scores are not observed.',
    'E-E-A-T': 'Public trust, identity and accountability evidence; not a reproduction of a Google ranking score.',
}
audit['epistemicPolicy'] = {
    'unmeasuredSignals': 'NOT_MEASURED_AND_EXCLUDED_FROM_SCORE',
    'privateCodeSignals': 'REQUIRES_CONTEXT',
    'defaultRuleSourceClass': 'INTERNAL_HEURISTIC',
    'vendorClaimsRequireSourceId': True,
    'modelInternalClaimsFromPublicHtml': 'FORBIDDEN',
}
write_if_changed(audit_path, json.dumps(audit, ensure_ascii=False, indent=2) + '\n')

errors = []
for path in KEY_PAGES:
    text = path.read_text(encoding='utf-8')
    for required in ('18', '105', 'G0–G9', 'v3-capability-contract'):
        if required not in text:
            errors.append(f'{path.relative_to(ROOT)} missing {required}')

legacy_patterns = {
    'legacy Engine V2': r'Engine V2(?:\.1\.0)?',
    'legacy 120 controls': r'120 (?:deep )?(?:checks|controls)|120 (?:derin )?kontrol',
    'legacy 43-page contract': r'43[- ]page|43 sayfa',
    'legacy fixed 22-file promise': r'22[- ]file|22 dosya',
}
for path in [p for p in ROOT.rglob('*') if p.is_file() and is_public(p) and p.name != 'enterprise-theme-engine.js']:
    text = path.read_text(encoding='utf-8', errors='ignore')
    for label, pattern in legacy_patterns.items():
        if re.search(pattern, text, re.I):
            errors.append(f'{label}: {path.relative_to(ROOT)}')

if errors:
    raise SystemExit('V3 CAPABILITY CONTRACT FAIL\n- ' + '\n- '.join(errors[:100]))

print('V3 CAPABILITY CONTRACT PASS: public surfaces, comparison matrix, SSOT profile, and legacy-fragment gate aligned.')
