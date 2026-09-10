from __future__ import annotations

from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
EA = ROOT / "enterprise-analyzer"
TR_EA = ROOT / "tr" / "enterprise-analyzer"
RUNTIME_SRC = "/assets/js/enterprise-analyzer-locale.js?v=2"

PAGES = (
    ("index.html", "/enterprise-analyzer", "/tr/enterprise-analyzer"),
    ("htmlandhtml-ai-report.html", "/enterprise-analyzer/htmlandhtml-ai-report", "/tr/enterprise-analyzer/htmlandhtml-ai-report"),
    ("htmlandhtml-ai-report-LIGHT.html", "/enterprise-analyzer/htmlandhtml-ai-report-LIGHT", "/tr/enterprise-analyzer/htmlandhtml-ai-report-LIGHT"),
)

META = {
    "index.html": {
        "en": ("Enterprise AI Visibility Diagnostic Lab | HTML&HTML", "Enterprise AI visibility diagnostic lab with deterministic controls, public-page crawl evidence, live link probes, prioritized findings and a testable $99 implementation roadmap."),
        "tr": ("Kurumsal Yapay Zeka Görünürlük Teşhis Laboratuvarı | HTML&HTML", "Deterministik kontroller, herkese açık sayfa taraması, canlı bağlantı probları, önceliklendirilmiş bulgular ve test edilebilir $99 uygulama yol haritasıyla kurumsal yapay zeka görünürlük teşhisi."),
    },
    "htmlandhtml-ai-report.html": {
        "en": ("Live Sample AI Visibility Report | HTML&HTML Enterprise Analyzer", "Live HTML&HTML sample report showing the same Enterprise Analyzer scores, evidence, findings and remediation structure in a fully English production surface."),
        "tr": ("Canlı Örnek Yapay Zeka Görünürlük Raporu | HTML&HTML Enterprise Analyzer", "HTML&HTML Enterprise Analyzer skorlarını, kanıtlarını, bulgularını ve onarım yapısını tamamen Türkçe üretim yüzeyinde gösteren canlı örnek rapor."),
    },
    "htmlandhtml-ai-report-LIGHT.html": {
        "en": ("Live Sample AI Visibility Report — Light | HTML&HTML", "Light-theme live sample Enterprise Analyzer report with the same English scores, evidence, findings and remediation structure."),
        "tr": ("Canlı Örnek Yapay Zeka Görünürlük Raporu — Açık Tema | HTML&HTML", "Aynı skorları, kanıtları, bulguları ve onarım yapısını tamamen Türkçe gösteren açık temalı canlı Enterprise Analyzer örnek raporu."),
    },
}

PAIRS = [
    ("105 deterministik kontrol, 50'ye kadar herkese açık HTML sayfası ve 30 canlı link probu ile üretilen deterministik denetim ortamı. Kod seviyesinde teknik kanıtlar, kilitli onarım yol haritasıleri ve n8n CI/CD otomasyon paketleriyle donatılmış kurumsal analiz platformu.", "A deterministic audit environment using 105 controls, up to 50 public HTML pages and 30 live link probes. It combines code-level evidence, locked remediation roadmaps and n8n CI/CD automation artifacts in one enterprise analysis surface."),
    ("Biz sadece analiz eder ve yol haritası hazırlarız.", "We analyze the evidence and prepare the remediation roadmap."),
    ("Müşterinin kaynak koduna dokunmayız. Tespit ve çözüm yol haritasılerini kendi yazılım ekibinize teslim edersiniz.", "We do not modify the customer's source code. Findings and implementation guidance are delivered to the customer's engineering team."),
    ("105 kontrol kapsamında örnek kritik bulgular gösteriliyor. Yapay zeka arama motorları için kritik engelleyiciler mevcut.", "Representative critical findings are shown across the 105-control audit. Measured blockers affecting AI search readiness are present."),
    ("yol haritası: 15 Adet", "Roadmaps: 15"),
    ("Tespitler ve Çözüm yol haritasıleri", "Findings and Remediation Roadmaps"),
    ("MÜHENDİSLİK TESLİM PAKETİ (ZIP ENVANTERİ)", "ENGINEERING DELIVERY PACKAGE (ZIP INVENTORY)"),
    ("Bir PDF değil. sürümlenmiş üretim sınıfı Engine V3 mühendislik ZIP'i.", "Not a PDF: a versioned, production-grade Engine V3 engineering ZIP."),
    ("Ödeme entitlement'ı doğrulandığında sistem aynı alan adını yeniden tarar ve $99 Yol Haritası uygulama paketini otomatik olarak ZIP formatında üretir. Üyelik zorunlu değildir; güvenli guest-checkout token'ı ile anında teslim edilir.", "After entitlement is verified, the system rescans the same domain and automatically generates the $99 Roadmap implementation package as a ZIP. No membership is required; delivery uses a secure guest-checkout token."),
    ("Firma ve yazılımcı için kullanım kılavuzu ve P0–P3 öncelik uygulama rehberi.", "Usage guide and P0–P3 implementation priorities for the customer and engineering team."),
    ("The 18 independent engines below audit target systems at the wire level using deterministic rules. Weights, rule chains, and penalty deductions derive strictly from source code architectures. Aşağıdaki 18 bağımsız motor, hedef siteyi kablo seviyesinde deterministik kurallarla denetler. Her motorun ağırlığı, telemetri kural zinciri ve ceza puanları doğrudan kaynak kod mimarisine dayalıdır.", "The 18 independent engines below audit the target with deterministic rules. Weights, telemetry rule chains and deductions are tied to the implemented source-code contract."),
    ("Ücretsiz Kontrol", "Free Check"), ("Çözümler", "Solutions"), ("Haberler", "News"), ("Sözlük", "Glossary"), ("Onarım Seti ($99)", "Fix Mandate ($99)"),
    ("Ücretsiz Tara", "Scan Free"), ("Ana Sayfa", "Home"), ("Site Tarama", "Website Scanner"), ("Tema", "Theme"), ("Temayı Değiştir", "Change Theme"), ("Temayı değiştir", "Change theme"),
    ("Örnek Rapor (htmlandhtml.com) →", "Sample Report (htmlandhtml.com) →"), ("Örnek Rapor (Sample Report)", "Sample Report"),
    ("ÖRNEK RAPOR · SAMPLE SPECIMEN", "SAMPLE REPORT · SPECIMEN"), ("CANLI KURUMSAL ÖRNEK RAPOR · ENTERPRISE SAMPLE SPECIMEN", "LIVE ENTERPRISE SAMPLE REPORT · AI DIAGNOSTIC SPECIMEN"),
    ("CANLI KURUMSAL DENETİM LABORATUVARI · ENTERPRISE AI DIAGNOSTIC SUITE", "LIVE ENTERPRISE AI DIAGNOSTIC LAB"),
    ("Kurumsal AI Görünürlük Analizörü & Teşhis Laboratuvarı", "Enterprise AI Visibility Analyzer & Diagnostic Lab"),
    ("Canlı Enterprise Taramayı Başlat", "Start Live Enterprise Scan"), ("18-Motorlu Dağıtık Telemetri ve N8N DAG Orkestrasyonu Çalışıyor...", "18-engine distributed telemetry and n8n DAG orchestration running..."),
    ("105 deterministik kontrol", "105 deterministic controls"), ("50'ye kadar sayfa", "Up to 50 pages"), ("30 link probu", "30 link probes"),
    ("Hedef:", "Target:"), ("Genel AI Visibility Skoru", "Overall AI Visibility Score"), ("GENEL AI VİSİBİLİTY SKORU", "OVERALL AI VISIBILITY SCORE"),
    ("Tamamlandı", "Completed"), ("Dikkat Gerekiyor", "Attention Required"), ("Kritik Risk Tespit Edildi", "Critical Risk Detected"),
    ("Dört Temel Yetkinlik Sütunu", "Four Core Capability Pillars"), ("Deterministik Skor Dağılımı", "Deterministic Score Distribution"),
    ("Keşif (Crawl & Index)", "Discovery (Crawl & Index)"), ("Anlaşılabilirlik (Schema/LLM)", "Understandability (Schema/LLM)"),
    ("Güven & Kalite (HSTS/E-E-A-T)", "Trust & Quality (HSTS/E-E-A-T)"), ("Ticari Yol (Action & CTA)", "Commercial Path (Action & CTA)"),
    ("HTML Boyutu:", "HTML Size:"), ("319 KB (Kritik)", "319 KB (Critical)"), ("Eksik (RFC 6596)", "Missing (RFC 6596)"), ("1 Güvensiz Kaynak", "1 Insecure Source"),
    ("Ağırlık:", "Weight:"), ("Aktif Bulgular", "Active Findings"), ("Tüm Bulgular", "All Findings"), ("Tümü", "All"), ("Yüksek", "High"), ("Orta", "Medium"), ("Düşük", "Low"), ("Bilgi", "Info"), ("Kritik", "Critical"),
    ("Bulgu", "Finding"), ("Bulgular", "Findings"), ("Kanıt", "Evidence"), ("Kök Neden", "Root Cause"), ("Öncelik", "Priority"), ("Etki", "Impact"), ("Efor", "Effort"),
    ("Onarım Yol Haritası", "Remediation Roadmap"), ("Kabul Testi", "Acceptance Test"), ("Regresyon Testi", "Regression Test"), ("Geri Alma", "Rollback"),
    ("Örnek Paketi İndir (ZIP)", "Download Sample Package (ZIP)"), ("Sitemi Ücretsiz Kontrol Et →", "Check My Site Free →"), ("Onarım Paketini İncele ($99)", "Review $99 Fix Mandate"),
    ("100% Otomatik Yazılım ve Dijital Ürünler (SaaS):", "100% Automated Software & Digital Artifacts (SaaS):"),
]


# Exhaustive Enterprise Analyzer copy contract. These pairs cover static diagnostic
# findings, code-evidence captions, delivery manifest copy and footer/navigation
# text that predate the structured data-tr/data-en layer.
PAIRS += [
    ("Erişilebilir etiketleri olmayan form kontrolleri", "Form controls without accessible labels"),
    ("Yardımcı teknolojiler ve AI tarayıcılar form amacını ayrıştırırken başarısız olabilir. 1 etiketsiz kontrol tespit edildi.", "Assistive technologies and AI crawlers may fail to resolve the form purpose. One unlabeled control was detected."),
    ("Çözüm Süresi: 30 dk", "Resolution Time: 30 min"), ("Çözüm Süresi: 45 dk", "Resolution Time: 45 min"),
    ("Efor: Orta", "Effort: Medium"), ("İş Etkisi", "Business Impact"),
    ("Ekran okuyucular form amacını tanımlayamaz, erişilebilirlik skoru ve AI güven sinyalleri düşer. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Screen readers cannot identify the form purpose, reducing accessibility and AI trust signals. This can create discoverability and conversion risk."),
    ("Etkilenen URL'yi İncele", "Inspect Affected URL"), ("Tespit Kanıtı (Empirical Crawler Output)", "Finding Evidence (Empirical Crawler Output)"),
    ("AI Tarayıcı Gördüğü", "AI Crawler Observation"), ("[aria-label] EKSİK", "[aria-label] MISSING"), ("[label for] EKSİK", "[label for] MISSING"), ("[aria-describedby] EKSİK", "[aria-describedby] MISSING"),
    ("Kurumsal Çözüm yol haritası & Uygulama Adımları", "Enterprise Remediation Roadmap & Implementation Steps"),
    ("elemanına", "to the element"), ("attribute'ü ekleyin. Label ve input ID'si birebir eşleşmeli.", "add the attribute. The label and input ID must match exactly."),
    ("attribute'lerini ekleyerek AI tarayıcıların form alanını doğru yorumlamasını sağlayın.", "add the attributes so AI crawlers can interpret the form field correctly."),
    ("Placeholder'ı yedek etiket olarak kullanmayın. Placeholder sadece ipucu, asıl etiket", "Do not use the placeholder as a substitute label. A placeholder is only a hint; the actual label"),
    ("olmalı.", "must be present."), ("Mevcut (Hatalı)", "Current (Incorrect)"), ("Düzeltilmiş", "Corrected"),
    ("E-postanızı asla paylaşmayız.", "We never share your email."), ("Kurumsal Çözüm yol haritası Kilitli", "Enterprise Remediation Roadmap Locked"),
    ("Bu tespitin adım adım onarım kodu, n8n otomasyon şablonu ve uygulama kılavuzu Enterprise pakettedir.", "The Enterprise package contains the step-by-step remediation code, n8n automation template and implementation guide for this finding."),
    ("15 Çözüm yol haritası Dahil", "15 Remediation Roadmaps Included"), ("$99 — Çözüm Yol Haritasını Aç", "$99 — Unlock Remediation Roadmap"),
    ("Karışık içerik (Mixed Content) tespit edildi", "Mixed Content Detected"),
    ("Tarayıcı güvenliği ve kaynak yüklemesi tehlikeye girebilir. https://vercel.com/about adresinde 1 güvensiz referans tespit edildi.", "Browser security and resource loading may be compromised. One insecure reference was detected at https://vercel.com/about."),
    ("Modern tarayıcılar karışık içeriği engeller, işlevsellik bozulur ve AI tarayıcılar için güven sinyalleri zayıflar. Trafik kaybı riski.", "Modern browsers can block mixed content, breaking functionality and weakening trust signals for AI crawlers."),
    ("Güvensiz Referans", "Insecure Reference"), ("Protokol: HTTP (güvensiz)", "Protocol: HTTP (insecure)"), ("Impact: Tarayıcı tarafından engellenir", "Impact: Blocked by the browser"),
    ("Tüm", "All"), ("kaynak referanslarını", "resource references"), ("ile değiştirin. Görseller, scriptler, CSS dosyaları ve iframe'ler dahil.", "replace them with HTTPS, including images, scripts, CSS files and iframes."),
    ("Content-Security-Policy header'ına", "to the Content-Security-Policy header"), ("direktifini ekleyin. Bu, tarayıcının otomatik olarak HTTP'yi HTTPS'ye yükseltmesini sağlar.", "add the directive so the browser automatically upgrades HTTP references to HTTPS."),
    ("CDN ve üçüncü taraf kaynakları kontrol edin. Eski HTTP CDN URL'lerini HTTPS versiyonlarıyla güncelleyin.", "Audit CDN and third-party resources. Replace legacy HTTP CDN URLs with HTTPS versions."),
    ("Düzeltilmiş Kaynak Referansı", "Corrected Resource Reference"),
    ("Canonicalization sinyali mevcut değil. rel=canonical bulunamadı. Arama motorları yinelenen içerik versiyonlarını dizine ekleyebilir, sıralama sinyallerini sulandırır.", "No canonicalization signal is present. rel=canonical was not found. Search engines may index duplicate content variants and dilute ranking signals."),
    ("Canonical olmadan link eşitliği URL varyantları arasında bölünür, AI erişim güveni azalır. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Without a canonical, link equity is split across URL variants and AI retrieval confidence can decline."),
    ("<head> içinde arama yapıldı:", "Search performed inside <head>:"), ("Her sayfanın", "For every page"), ("bölümüne", "inside the section"),
    ("link ekleyin. URL mutlak (absolute) olmalı, asla relative.", "add the link. The URL must be absolute, never relative."),
    ("Dinamik sayfalarda sunucu tarafında canonical üretin.", "Generate canonical URLs server-side for dynamic pages."),
    ("gibi parametreler canonical URL'de olmamalı.", "parameters such as these must not appear in the canonical URL."),
    ("hreflang uyguluyorsanız, her hreflang versiyonu kendi self-referencing canonical'ına sahip olmalı.", "If hreflang is implemented, every language version must have its own self-referencing canonical."),
    ("Dinamik (Node.js/Next.js örneği)", "Dynamic (Node.js/Next.js example)"),
    ("HTML yanıtı ağır", "HTML Response Is Heavy"),
    ("İlk yükleme süresi ve TTFB artabilir. 319.145 bayt HTML tespit edildi — optimal AI tarayıcı işleme için önerilen 150KB eşiğini aşıyor.", "Initial load time and TTFB may increase. A 319,145-byte HTML response was measured, exceeding the 150 KB operational threshold used by this audit."),
    ("Ağır HTML, TTFB ve LCP'yi artırarak AI tarayıcı bütçe tahsisini ve kullanıcı sabrını azaltır. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Heavy HTML can increase TTFB and LCP, consuming crawler resources and reducing user tolerance."),
    ("Eşik: <150KB optimal", "Threshold: <150 KB target"), ("Mevcut: 319KB = %113 AŞIM", "Current: 319 KB = 113% OVER TARGET"),
    ("içine yerleştirin. Ana CSS dosyasını", "place it inside. Load the main CSS file"), ("ile asenkron yükleyin.", "asynchronously."),
    ("Kullanılmayan HTML, CSS ve JS'i kaldırın. PurgeCSS + HTMLMinifier kullanarak build pipeline'ında otomatik temizlik yapın.", "Remove unused HTML, CSS and JavaScript. Automate cleanup in the build pipeline with PurgeCSS and HTMLMinifier."),
    ("Next.js/Vercel kullanıyorsanız, React Server Components ve Streaming SSR ile sayfayı parçalara bölün. ISR ile edge cache kullanın.", "If you use Next.js/Vercel, split the page with React Server Components and Streaming SSR, and use ISR with edge caching."),
    ("Erişilebilir isimleri olmayan etkileşimli kontroller", "Interactive Controls Without Accessible Names"),
    ("Klavye ve ekran okuyucu deneyimi bozulabilir. 1 isimsiz kontrol tespit edildi. AI tarayıcılar etkileşimli eleman amacını anlamak için erişilebilir isimlere güvenir.", "Keyboard and screen-reader usability can degrade. One unnamed control was detected. AI crawlers also rely on accessible names to infer interactive intent."),
    ("İsimsiz kontroller ekran okuyucular ve AI amaç ayrıştırıcıları için görünmezdir, dönüşüm erişilebilirliğini azaltır. Trafik kaybı riski.", "Unnamed controls are effectively invisible to screen readers and agent intent parsers, reducing accessible conversion paths."),
    ("[aria-label] EKSİZ", "[aria-label] MISSING"), ("[aria-labelledby] EKSİK", "[aria-labelledby] MISSING"), ("[innerText] BOŞ", "[innerText] EMPTY"),
    ("İkon-only butonlara", "For icon-only buttons"), ("ekleyin. Örnek:", "add it. Example:"), ("Visually-hidden text pattern'ini kullanın.", "Use a visually hidden text pattern."),
    ("CSS class'ı ile buton içine gizli ama erişilebilir metin ekleyin.", "Add hidden but accessible text inside the button with a CSS class."),
    ("ekleyin, böylece ekran okuyucu ikonu değil buton amacını okur.", "add it so the screen reader announces the button purpose rather than the icon."),
    ("sitemap.xml erişilemiyor", "sitemap.xml Is Unreachable"),
    ("URL keşfi ve kapsamı azalır. HTTP 0 yanıtı — sitemap ulaşılamıyor veya yapılandırılmamış. AI tarayıcılar sitemap'i birincil keşif yüzeyi olarak kullanır.", "URL discovery and coverage are reduced. HTTP 0 was returned, so the sitemap is unreachable or not configured."),
    ("Sitemap olmadan AI tarayıcılar derin sayfaları ve güncellemeleri kaçırır, dizine ekleme haftalar gecikir. Trafik kaybı riski.", "Without a sitemap, crawlers can miss deep pages and updates, delaying discovery and indexing."),
    ("(Bağlantı başarısız)", "(Connection failed)"), ("robots.txt Sitemap referansı:", "robots.txt sitemap reference:"),
    ("dosyası oluşturun. Tüm önemli URL'leri", "create the file. Include all important URLs"), ("dosyasına", "in the file"),
    ("direktifini ekleyin. Mutlak URL kullanın.", "add the directive and use an absolute URL."),
    ("Google Search Console ve Bing Webmaster Tools'a sitemap URL'sini gönderin. Otomatik ping için n8n workflow kurun.", "Submit the sitemap URL to Google Search Console and Bing Webmaster Tools. Use an n8n workflow for automated update handling."),
    ("Tekrarlayan sayfa başlıkları", "Duplicate Page Titles"),
    ("Sayfa farklılaşması ve tıklama oranları zayıflar. 2 sayfa aynı başlığı paylaşıyor: login – vercel. AI motorları başlıkları birincil alaka sinyali olarak kullanır.", "Page differentiation and click-through potential are weakened. Two pages share the same title: login – vercel."),
    ("Yinelenen başlıklar AI alaka puanlamasını karıştırır ve SERP farklılaşmasını azaltır. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Duplicate titles can confuse relevance scoring and reduce SERP differentiation."),
    ("AI Tarayıcı: Amaç ayırt edilemiyor", "AI Crawler: Intent cannot be distinguished"), ("Her sayfa için", "For each page"), ("benzersiz, açıklayıcı", "a unique, descriptive"),
    ("başlık oluşturun. Formül:", "title. Formula:"), ("[Sayfa Adı] | [Marka] — [Değer Önerisi]", "[Page Name] | [Brand] — [Value Proposition]"),
    ("Başlık uzunluğu 50-60 karakter arasında tutun. AI snippet görünümü için optimal.", "Keep title length around 50–60 characters for clear search-result presentation."),
    ("Dinamik sayfalarda sunucu tarafında başlık üretin. CMS'den otomatik çekin.", "Generate titles server-side for dynamic pages and source them automatically from the CMS."),
    ("Benzersiz başlık örneği", "Unique title example"), ("Giriş | HTML&HTML — Kurumsal Web Çözümleri", "Login | HTML&HTML — Enterprise Web Solutions"),
    ("Dinamik şablon", "Dynamic template"), ("// Örn: 'İletişim | HTML&HTML — Bize Ulaşın'", "// Example: 'Contact | HTML&HTML — Get in Touch'"),
    ("Tutarsız H1 hiyerarşisi", "Inconsistent H1 Hierarchy"),
    ("Birincil konu sinyali ve erişilebilir doküman yapısı zayıflar. H1 etiketleri eksik veya hatalı yerleştirilmiş. AI tarayıcılar H1'i birincil içerik konusu çıkarıcı olarak kullanır.", "Primary-topic signaling and accessible document structure are weakened. H1 tags are missing or incorrectly placed."),
    ("Eksik H1, AI konu alaka güvenini azaltır, erişim önceliğini düşürür. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "A missing H1 reduces topic clarity and can weaken retrieval priority."),
    ("AI Gördüğü: H1 yok = Birincil konu belirsiz", "AI Observation: no H1 = primary topic unclear"), ("Sayfa başına", "Per page"), ("kullanın. H1,", "use one. The H1"),
    ("içinde ilk sıradaki ana başlık olmalı.", "must be the first primary heading inside the content structure."), ("Semantik HTML5 outline kullanın:", "Use a semantic HTML5 outline:"),
    ("CSS ile görsel büyük başlık yapmayın.", "Do not simulate a primary heading only with CSS."), ("kullanın.", "use the semantic element."),
    ("Düzeltilmiş yapı", "Corrected structure"), ("Kurumsal Web Geliştirme Çözümleri", "Enterprise Web Development Solutions"), ("Web Geliştirme", "Web Development"),
    ("Arama snippet'i ve AI özet üretimi üzerindeki kontrol azalır. meta[name=description] bulunamadı. AI motorları otomatik snippet'lere düşer, genellikle yetersiz.", "Control over search snippets and AI summaries is reduced. meta[name=description] was not found, forcing automatic snippet generation."),
    ("Eksik meta description, AI'ın sayfa alaka düzeyini tahmin etmesine zorlar, tıklama ve yanıt dahil etme olasılığını azaltır. Trafik kaybı riski.", "A missing meta description forces systems to infer page relevance and can reduce click-through and answer inclusion."),
    ("AI yedek davranışı", "AI fallback behavior"), ("1. İlk paragraf metni", "1. First paragraph text"), ("3. Rastgele metin çıkarımı", "3. Arbitrary text extraction"),
    ("meta description yazın. Formül:", "write a meta description. Formula:"), ("[Ne] + [Kime] + [Eşsiz Değer] + [CTA]", "[What] + [Audience] + [Unique Value] + [CTA]"),
    ("Uzunluk 150-160 karakter arasında tutun. Optimal AI snippet görünümü için.", "Keep the length around 150–160 characters for predictable snippet presentation."),
    ("CMS'den otomatik üretim için excerpt alanını meta description kaynağı olarak kullanın, 157 karakterde kesin.", "For automated CMS generation, use the excerpt field as the meta-description source and enforce a deterministic maximum length."),
    ("HTML&HTML, küresel markalar için kurumsal web geliştirme, AI hazır mimari ve dönüşüm optimizasyonu sunar. Ücretsiz denetim alın.", "HTML&HTML provides enterprise web development, AI-ready architecture and conversion optimization for global brands. Start with a free audit."),
    ("AI-optimized formül", "AI-optimized formula"), ("[Ne] + [Kime] + [Eşsiz Değer] + [CTA]", "[What] + [Audience] + [Unique Value] + [CTA]"),
    ("llms.txt keşif linki yok", "llms.txt Discovery Link Missing"),
    ("v2 önerisi rel=describedby sinyali eksik. AI tarayıcılar llms.txt dosyanızı keşfedemez, LLM eğitimi için yapılandırılmış bağlam azalır.", "The optional rel=describedby discovery signal is absent. AI crawlers may not discover the llms.txt surface directly."),
    ("llms.txt keşfi olmadan marka bağlamınız yeni nesil AI arama sistemlerine görünmez. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Without explicit llms.txt discovery, machine-readable brand context is less directly discoverable to systems that support the convention."),
    ("içinde", "inside"), ("içine", "into"), ("link'i ekleyin. Bu, AI tarayıcılara llms.txt konumunu bildirir.", "add the link to expose the llms.txt location to compatible crawlers."),
    ("Kök dizinde", "At the root"), ("dosyası oluşturun. Markdown formatında marka bağlamını, hizmetleri ve iletişim bilgilerini yazın.", "create the file and publish brand context, services and contact information in Markdown."),
    ("CMS yayını tetiklediğinde llms.txt'i otomatik güncelleyen n8n workflow kurun.", "Use an n8n workflow to update llms.txt automatically when the CMS publishes."),
    ("Keşif linki", "Discovery link"), ("/llms.txt içeriği", "/llms.txt content"), ("# HTML&HTML — Kurumsal Web Çözümleri", "# HTML&HTML — Enterprise Web Solutions"),
    ("- Kurumsal Web Geliştirme", "- Enterprise Web Development"), ("- AI Hazır Mimari", "- AI-Ready Architecture"), ("- Dönüşüm Optimizasyonu", "- Conversion Optimization"), ("## İletişim", "## Contact"),
    ("Tarayıcı güvenlik sertleştirmesi tamamlanmamış. permissions-policy header yok. Özellik kötüye kullanımı ve parmak izi alma saldırılarına karşı savunma azalır.", "Browser security hardening is incomplete. The Permissions-Policy header is missing, reducing protection against unnecessary feature access and fingerprinting."),
    ("Eksik güvenlik header'ları güven sinyallerini azaltır ve tarayıcı uyarılarına yol açabilir. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Missing security headers can weaken trust signals and trigger browser warnings."),
    ("Permissions-Policy: EKSİK", "Permissions-Policy: MISSING"),
    ("Web sunucusu config'ine (Nginx, Apache, Vercel, Cloudflare) Permissions-Policy header'ı ekleyin.", "Add a Permissions-Policy header to the web-server configuration (Nginx, Apache, Vercel or Cloudflare)."),
    ("Kullanılmayan tarayıcı API'lerini kapatın: accelerometer, camera, geolocation, gyroscope, magnetometer, microphone, payment, usb.", "Disable unused browser APIs: accelerometer, camera, geolocation, gyroscope, magnetometer, microphone, payment and USB."),
    ("Next.js kullanıyorsanız", "If you use Next.js"), ("ile header'ı tüm yanıtlara ekleyin.", "add the header to all responses."),
    ("Gizlilik sayfası bulunamadı", "Privacy Page Not Found"),
    ("Kullanıcı verisi işleyen sitelerde güven/uyum sinyalleri zayıflayabilir. Gizlilik/KVKK rotası tespit edilmedi. AI motorları net veri yönetişimi olan siteleri önceliklendirir.", "Trust and compliance signals can weaken on sites processing user data when no privacy-policy route is discoverable."),
    ("Eksik gizlilik politikası E-E-A-T güven puanını düşürür ve AB veri düzenlemelerini ihlal edebilir. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "A missing privacy policy weakens governance and E-E-A-T trust signals and can create regulatory exposure."),
    ("sayfası oluşturun. H1 başlık, maddeleme ve net dil kullanın.", "create the page with a clear H1, structured sections and plain language."),
    ("GDPR/KVKK uyumlu bölümler ekleyin: Veri erişim hakkı, Silme hakkı, Taşınabilirlik hakkı.", "Add GDPR/KVKK-aligned sections covering access, deletion and portability rights."),
    ("Tüm sayfaların footer'ına gizlilik politikası link'i ekleyin. Schema.org PrivacyPolicy markup'ı kullanın.", "Add a privacy-policy link to every page footer and use appropriate structured-data markup where applicable."),
    ("Gizlilik Politikası", "Privacy Policy"), ("Topladığımız Veriler", "Data We Collect"), ("Minimum veri toplarız...", "We collect the minimum data required..."), ("Haklarınız (GDPR/KVKK)", "Your Rights (GDPR/KVKK)"), ("Erişim hakkı", "Right of access"), ("Silme hakkı", "Right to deletion"),
    ("A2A agent card algılanmadı", "A2A Agent Card Not Detected"),
    ("İsteğe bağlı agent-to-agent keşif yüzeyi eksik. HTTP 404 on /.well-known/agent.json. Otonom AI agent ekosistemleri için geleceğe hazırlık.", "The optional agent-to-agent discovery surface is missing. /.well-known/agent.json returns HTTP 404."),
    ("A2A protokolünün erken benimsenmesi markanızı yeni nesil AI agent yönlendirmeleri için konumlandırır. Trafik kaybı ve AI yanıt motorlarından dışlanma riski.", "Early A2A adoption can improve interoperability with emerging agent ecosystems; it does not guarantee traffic or recommendation outcomes."),
    ("dosyası oluşturun. A2A protokolüne uygun JSON schema kullanın.", "create the file using the applicable A2A JSON schema."),
    ("Agent adı, açıklama, yetenekler, endpoint ve iletişim bilgilerini ekleyin.", "Add the agent name, description, capabilities, endpoint and contact information."),
    ("Servis değişikliklerinde agent.json'i otomatik güncelleyen n8n workflow kurun.", "Use an n8n workflow to update agent.json when service definitions change."),
    ("Kurumsal web geliştirme hizmetleri", "Enterprise web development services"),
    ("OpenAPI keşif dosyası algılanmadı", "OpenAPI Discovery File Not Detected"),
    ("Programatik servis keşfi sınırlı olabilir. HTTP 0 on /openapi.json. AI agent'lar yapılandırılmış spesifikasyon olmadan API yeteneklerini keşfedemez.", "Programmatic service discovery may be limited. /openapi.json returned HTTP 0, so agents cannot rely on a structured API specification."),
    ("OpenAPI spesifikasyonu olmadan AI agent'lar servislerinizi programatik olarak çağıramaz, ekosistem entegrasyonu sınırlanır. Trafik kaybı riski.", "Without an OpenAPI specification, programmatic service discovery and ecosystem integration are limited."),
    ("(Yanıt yok)", "(No response)"), ("dosyası oluşturun. OpenAPI 3.1.0 formatında API endpoint'lerini, parametreleri ve yanıtları tanımlayın.", "create the file in OpenAPI 3.1.0 format and define endpoints, parameters and responses."),
    ("Fastify/Swagger veya Next.js API Routes kullanıyorsanız, otomatik OpenAPI üretimini etkinleştirin.", "If you use Fastify/Swagger or Next.js API Routes, enable automated OpenAPI generation."),
    ("Route tanımlarından otomatik üretim için swagger-jsdoc veya @fastify/swagger kullanın.", "Use swagger-jsdoc or @fastify/swagger to generate the specification from route definitions."),
    ("Markdown alternatif bulunamadı", "Markdown Alternative Not Found"),
    ("Temiz Markdown alternatifi mevcut değil. rel=alternate type=text/markdown bulunamadı. AI tarayıcılar HTML gürültüsü olmadan temiz içerik çıkarımı için Markdown'ı tercih eder.", "No clean Markdown alternative is available. rel=alternate type=text/markdown was not found. Compatible systems can use Markdown to reduce HTML parsing noise."),
    ("Markdown alternatifi, AI içerik çıkarım doğruluğunu %40+ artırır, yanıt dahil etme olasılığını yükseltir. Trafik kaybı riski.", "A Markdown alternative can simplify machine extraction, but no fixed improvement percentage or inclusion guarantee is claimed."),
    ("AI Tarayıcı davranışı", "AI crawler behavior"), ("2. HTML ayrıştırmaya düşer (gürültülü)", "2. Falls back to HTML parsing (noisier)"),
    ("CMS'den otomatik HTML→Markdown dönüşümü yapın. Sayfa başına bir", "Automate HTML-to-Markdown conversion from the CMS. Create one"), ("dosyası oluşturun.", "file per page."),
    ("Edge cache ile Markdown dosyalarını sunun. n8n workflow ile CMS yayınında otomatik güncelle.", "Serve Markdown through edge cache and refresh it automatically from the CMS publishing workflow."),
    ("/en.md örneği", "/en.md example"), ("## Hakkımızda", "## About"), ("AI hazır, dönüşüm optimizasyonlu...", "AI-ready, conversion-oriented..."), ("- **Web Geliştirme**: React, Next.js, Vue", "- **Web Development**: React, Next.js, Vue"), ("- **AI Entegrasyonu**: LLM hazır mimari", "- **AI Integration**: LLM-ready architecture"),
    ("C-Level yönetim özeti, 18 motor skoru ve kritik risk dağılım matrisi.", "C-level executive summary, 18-engine scorecard and critical-risk distribution matrix."),
    ("P0–P3 uygulama sırası, kod şablonları ve teknik uygulama spesifikasyonu.", "P0–P3 implementation sequence, code templates and technical execution specification."),
    ("Makine okunabilir bulgular, URL'ler ve kanıt issue envanteri.", "Machine-readable findings, URLs and evidence issue inventory."),
    ("Düzeltmenin çalıştığını kanıtlayan Playwright ve cURL kabul testleri.", "Playwright and cURL acceptance tests that verify the remediation."),
    ("Hata halinde sıfır kesintili güvenli geri dönüş ve durdurma şartları.", "Safe rollback and stop conditions for failure scenarios."),
    ("6 layer + 13 puan dışı istihbarat analizi makine okunabilir hazırlık verisi yüzeyi.", "Machine-readable readiness surface for the implemented readiness layers and 13 non-scoring intelligence analyses."),
    ("Yazılım ekibi için adım adım yürütme kontrol listesi.", "Step-by-step execution checklist for the engineering team."),
    ("Müşterinin alan adına özel üretilmiş yayına hazır /llms.txt ve /llms-full.txt.", "Publish-ready /llms.txt and /llms-full.txt surfaces generated for the customer domain."),
    ("Alan adına özel doğrulanmış Markdown makine yüzey haritası.", "Verified domain-specific Markdown machine-surface map."),
    ("18 motorlu deterministik değerlendirme ve saha verisi denetim raporu.", "18-engine deterministic evaluation and field-evidence audit report."),
    ("Açık web veri havuzlarına (Common Crawl, Arxiv) marka entity tohumlama kılavuzu.", "Brand-entity publication guidance for open-web data surfaces such as Common Crawl and arXiv."),
    ("Reranker sistemleri için alıntı skorlama dikkat matrisi mimarisi.", "Attention-matrix architecture for reranker-oriented evidence scoring."),
    ("Wikidata QID ve Knowledge Graph mutabakat üçlüleri (@graph kodu).", "Wikidata QID and Knowledge Graph reconciliation triples (@graph code)."),
    ("AI botlarına 14KB altı mikro-HTML sunan çalışan Cloudflare HTMLRewriter Worker kodu.", "Cloudflare HTMLRewriter Worker code for reducing measured HTML payload for configured crawler paths."),
    ("Halüsinasyonu engelleyen kanonik endeks ve sentetik atıf mimarisi.", "Canonical indexing and synthetic-attribution monitoring architecture."),
    ("Otonom ajanların siteyi keşfetmesi ve işlem yapması için A2A v1.0 Agent Card.", "A2A Agent Card for machine-readable agent discovery and declared actions."),
    ("Claude Desktop ve Cursor için Model Context Protocol (MCP) doğrudan bağlantı şeması.", "Model Context Protocol (MCP) connection specification for compatible clients."),
    ("AI model filtrelerinde teknik doğruluk ton ve biçim standardı.", "Technical-accuracy tone and formatting standard for model-facing content."),
    ("ColBERT geç etkileşimli iç çarpım vektör hizalama matrisi ve token kümeleri.", "ColBERT late-interaction vector-alignment matrix and token clusters."),
    ("RFC 3161 zaman damgası ve C2PA kriptografik içerik orijinallik manifest şeması.", "RFC 3161 timestamp and C2PA provenance-manifest specification."),
    ("Farklı modellerde (ChatGPT, Claude, Perplexity) marka halüsinasyonunu izleyen Python nöbetçisi.", "Python sentinel for monitoring brand-output drift across configured model providers."),
    ("n8n CI/CD Otomasyon Şablonu ve Bash Doğrulama Scripti Dahildir", "Includes n8n CI/CD Automation Template and Bash Validation Script"),
    ("Kurumsal Onarım Paketini İndir (ZIP)", "Download Enterprise Remediation Package (ZIP)"),
    ("Üyelik yok", "No membership"), ("Aylık abonelik yok", "No monthly subscription"), ("Tek alan adı / yazılım lisansı", "Single-domain software license"), ("Kanıt ücretsiz", "Evidence is free"), ("Ölçülemeyen veri NOT_MEASURED", "Unmeasured evidence is marked NOT_MEASURED"),
    ("Bu platformda sunulan ürünler anında teslim edilen dijital kod paketleri ve yazılım lisanslarıdır. Şirketimiz reklam, pazarlama, SEO danışmanlığı, insan danışmanlığı veya özel yazılım geliştirme hizmeti", "Products on this platform are digitally delivered code packages and software licenses. HTML&HTML does not provide advertising, marketing, SEO consulting, human consulting or bespoke software-development services"),
    (". Ödeme sonrası teslim paketi üyelik gerektirmeden anında güvenli indirme yetkisiyle sunulur.", ". After payment, the delivery package is made available through secure guest access without requiring membership."),
    ("Kanıt ücretsizdir. Uygulama kesinliği asıl üründür. Web sitenizin arama ve yapay zeka ajanları tarafından erişilebilirliğini kanıtlarla denetleyin.", "Evidence is free. The paid product is the implementation package. Audit your website's search and AI-agent accessibility with measured evidence."),
    ("Tam Site Düzeltme Talimatı", "Full-Site Fix Mandate"), ("Fiyatlandırma", "Pricing"), ("Araçlar", "Tools"), ("Web Sitesi Tarayıcısı", "Website Scanner"), ("AI Hazırlık Endeksi", "AI Readiness Index"), ("llms.txt Doğrulayıcı", "llms.txt Validator"), ("AI Tarayıcı Kontrolü", "AI Crawler Checker"), ("Yapısal Veri Kontrolü", "Structured Data Checker"), ("Güvenlik Başlıkları", "Security Headers"), ("Erişilebilirlik Denetimi", "Accessibility Audit"), ("Link Bütünlüğü", "Link Integrity"), ("AI Marka Görünürlük Takibi", "AI Brand Visibility Tracker"), ("Tüm Rehberler", "All Guides"), ("AI Hazırlık Kontrol Listesi", "AI Readiness Checklist"), ("llms.txt v2 Standardı", "llms.txt v2 Standard"), ("AI Bot ve Tarayıcı Yönetimi", "AI Bot & Crawler Management"), ("AI İçin Yapısal Veri", "Structured Data for AI"), ("AI Arama Görünürlüğü (GEO)", "AI Search Visibility (GEO)"), ("Kanıt Standardı", "Evidence Standard"), ("AI Tarayıcı Dizini", "AI Crawler Directory"),
    ("© 2026 HTML&HTML. Tüm hakları saklıdır. Ödemeler ve faturalandırma yetkili Satıcı (Merchant of Record) Paddle.com tarafından yürütülür.", "© 2026 HTML&HTML. All rights reserved. Payments and billing are handled by the authorized Merchant of Record, Paddle.com."),
    ("18 Bağımsız Teşhis Motoru · 50 Sayfalık Deterministik Tarama Sınırı", "18 Independent Diagnostic Engines · Deterministic Crawl Limit of 50 Pages"),
    ("15 Kurumsal Çözüm yol haritası", "15 Enterprise Remediation Roadmaps"), ("Kilitli — Tümünü Açın", "Locked — Unlock All"), ("Kurumsal Çözüm Paketini Aç", "Unlock Enterprise Remediation Package"),
    ("15 tespitin tam çözüm kodlarına, sürümlenmiş üretim paketine ve n8n CI/CD iş akışına anında erişin.", "Access the complete remediation code, versioned delivery package and n8n CI/CD workflow for all 15 findings."),
    ("15 Detaylı Çözüm yol haritası & Yol Haritası", "15 Detailed Remediation Specifications & Roadmaps"), ("sürümlenmiş Eksiksiz Üretim Paketi (ZIP)", "Versioned Complete Production Package (ZIP)"), ("n8n CI/CD Otomasyon Şablonu & Bash Testi", "n8n CI/CD Automation Template & Bash Test"), ("Çözüm Yol Haritasını Aç ve İndir", "Unlock and Download Remediation Roadmap"),
    ("30 gün koşulsuz memnuniyet garantisi", "30-day satisfaction policy"),
    ("319 KB (measured HTML payload Aşımı)", "319 KB (measured HTML payload over target)"),
    ("Strict-Transport-Security başlığı dönmedi - SONUÇ: EKSİK", "Strict-Transport-Security header not returned - RESULT: MISSING"),
    ("# Üretim Sınıfı HSTS Çözümü (firebase.json & Nginx)", "# Production-Grade HSTS Fix (firebase.json & Nginx)"),
    ("BULUNAMADI VEYA GÖRELİ /tr/ YOLU KULLANILMIŞ", "NOT FOUND OR RELATIVE /tr/ PATH USED"),
    ("[aria-label] EKSİK | [label for] EKSİK | [aria-describedby] EKSİK", "[aria-label] MISSING | [label for] MISSING | [aria-describedby] MISSING"),
    ("WCAG 2.1 AA Uyumlu Kod", "WCAG 2.1 AA Compliant Code"), ("Analiz Edilecek Web Sitesi URL'i", "Website URL to Analyze"), ("Tam etki alanı adresini giriniz.", "Enter the full domain URL."),
    ("veya rel=describedby link başlığı eksik", "or rel=describedby discovery signal is missing"),
    ("# /llms.txt İçeriği", "# /llms.txt Content"), ("18 Motorlu Kurumsal Yapay Zeka Görünürlük & Teşhis Platformu", "18-Engine Enterprise AI Visibility & Diagnostic Platform"), ("Kurumsal Teşhis Sistemi", "Enterprise Diagnostic System"), ("18 motorlu deterministik platform.", "18-engine deterministic platform."), ("Yapay Zeka Sözlüğü", "AI Glossary"), ("GEO, AEO, LLMO ve RAG kavramları.", "GEO, AEO, LLMO and RAG concepts."), ("HTML <head> içine eklenecek link:", "Link to add inside HTML <head>:"),
    ("Ayrık bloklar, @graph kapsayıcısı eksik, Wikidata sameAs bağımsız", "Separate blocks; @graph container missing; Wikidata sameAs is detached"),
    ("Birleşik @graph Mimarisi", "Unified @graph Architecture"), ("Yüksek ColBERT MaxSim Uyumlu Cümle (0.965 Skoru)", "High ColBERT MaxSim Alignment Sentence (0.965 score)"),
    ("HTML&HTML altyapısı sub-180ms edge yanıt süresi, 18 motorlu deterministik telemetri ve RFC uyumlu 22 mühendislik dosyası ile kurumsal yapay zeka arama sistemlerinde %99.4 alıntı doğruluğu sağlar.", "HTML&HTML exposes deterministic telemetry and RFC-aligned engineering artifacts; no fixed citation-accuracy outcome is guaranteed."),
    ("Sonuç: C2PA manifest veya iddia bloğu bulunamadı", "Result: no C2PA manifest or assertion block found"), ("C2PA İçerik Menşei Manifestosu", "C2PA Content Provenance Manifest"),
    ("Bulunan: 4 sübjektif sıfat (DPO Rejected vektör havuzuyla eşleşti)", "Found: 4 subjective adjectives matched by the audit rule set"),
    ("Tercih Edilen (Chosen) DPO Uyumlu Dil", "Preferred Evidence-Oriented Language"), ("18 motorlu deterministik telemetri, sub-180ms kenar yanıt süresi ve RFC uyumlu 22 mühendislik paketi ile web sitenizin AI arama sistemlerindeki teknik altyapısını doğrulayın.", "Use deterministic telemetry and RFC-aligned engineering evidence to verify website-side AI-search readiness."),
    ("Optimize Cross-Encoder Sözdizimi", "Optimized Cross-Encoder Syntax"), ("Yapay Zeka Arama Görünürlüğü:", "AI Search Visibility:"), ("HTML&HTML deterministik altyapısı, sub-180ms yanıt gecikmesi ve 18 motorlu denetim ile büyük dil modellerinde kaynak alıntı doğruluğunu maksimize eder.", "HTML&HTML measures deterministic website-side readiness signals; external model citation decisions are not guaranteed."),
    ("Sonuç: ItemList Host Carousel schema bloğu bulunamadı", "Result: ItemList Host Carousel schema block not found"), ("Google ItemList Host Carousel Şeması", "Google ItemList Host Carousel Schema"), ("HTML&HTML Araç ve Servisleri", "HTML&HTML Tools and Services"),
    ("Heading Tree Telemetry", "Heading Tree Telemetry"), ("AEO Nedir? (H2 EKSİK - Hiyerarşik Atlama)", "What Is AEO? (H2 MISSING - Hierarchy Skip)"), ("font-display] EKSİK | [preconnect] EKSİK", "font-display] MISSING | [preconnect] MISSING"), ("<head> içine:", "inside <head>:"),
    ("Her sabah otonom başlatıcı tetiklenir.", "The autonomous scheduler triggers every morning."), ("/v2/scan derin telemetri ve ağ denetimi.", "/v2/scan runs deep telemetry and network checks."), ("ColBERT ve TCP measured HTML payload sapmalarını ayıklar.", "Filters measured ColBERT and HTML-payload anomalies."), ("Mühendislik Uyarısı", "Engineering Alert"), ("Kritik regresyonda anlık webhook fırlatır.", "Emits a webhook when a critical regression is detected."), ("📋 n8n İş Akışı JSON'ını Kopyala", "📋 Copy n8n Workflow JSON"),
    ("Kendi Web Sitenizi Yapay Zeka Arama Standartlarına Hazırlayın", "Prepare Your Website for AI Search Readiness"),
    ("Bu örnek raporda gördüğünüz tüm teşhisleri kendi siteniz için ücretsiz olarak çalıştırın; hazır olduğunuzda $99 Fix Mandate ile sürümlenmiş üretim paketinizi anında indirin.", "Run the same diagnostic checks on your own site for free; when ready, purchase the $99 Fix Mandate to receive the versioned implementation package."),
    ("Web sitenizin teknik altyapısını arama motorları ve yapay zeka sistemleri için analiz eder, bulguları ve düzeltme yol haritasını raporlar.", "Analyzes website-side technical readiness for search and AI systems and reports findings with a remediation roadmap."),
    ("Analiz & Teşhis", "Analysis & Diagnostics"), ("Bilgi Merkezi", "Knowledge Center"), ("Sektörel Haberler", "Industry News"), ("Kurumsal & Şeffaflık", "Company & Transparency"), ("Hakkımızda", "About"), ("Kullanım Koşulları", "Terms of Use"),
    ("HTML&HTML bir yazılım hizmetidir. Reklam ajansı, pazarlama ajansı, SEO danışmanlığı veya özel yazılım geliştirme hizmeti", "HTML&HTML is a software service. It does not provide advertising-agency, marketing-agency, SEO-consulting or bespoke software-development services"),
    ("© 2026 HTML&HTML. Tüm hakları saklıdır.", "© 2026 HTML&HTML. All rights reserved.")
]


PAIRS += [
    ("<!-- Düzeltilmiş -->", "<!-- Corrected -->"),
    ("<!-- Keşif linki -->", "<!-- Discovery link -->"),
    ("<!-- Doğru ve Mutlak RFC 6596 Standartı -->", "<!-- Correct Absolute RFC 6596 Pattern -->"),
    ("<!-- ColBERT MaxSim İç Çarpım Probu --> Sorgu: 'Kurumsal Yapay Zeka Görünürlük Onarım Paketi' Ölçülen İç Çarpım: 0.812 [UYARI: Hedef >= 0.940]", "<!-- ColBERT MaxSim Dot Product Probe --> Query: 'Enterprise AI Visibility Fix Mandate' Measured Dot Product: 0.812 [WARN: Target >= 0.940 for Top-1 Rerank Placement]"),
    ("<!-- Yüksek ColBERT MaxSim Uyumlu Cümle (0.965 Skoru) --> <p><strong>Kurumsal Yapay Zeka Görünürlük Onarım Paketi:</strong> HTML&HTML ölçülen site-tarafı hazırlık sinyallerini ve deterministik telemetriyi raporlar; dış yapay zeka sistemlerinde sabit alıntı sonucu garanti edilmez.</p>", "<!-- High ColBERT MaxSim Alignment Sentence (0.965 Score) --> <p><strong>Enterprise AI Visibility Fix Mandate:</strong> HTML&HTML reports measured website-side readiness signals and deterministic telemetry; no fixed citation outcome is guaranteed in external AI systems.</p>"),
    ("HTML&HTML için endüstriyel Model Context Protocol sunucusu", "Industrial Model Context Protocol server for htmlandhtml.com"),
    ("Onarım Paketi ($99 USD) için yetkili fiyatlandırma", "Authoritative pricing for Fix Mandate ($99 USD)"),
    ("Ölçülen HTML yüküyle sınırlandırılmış bilgi parçaları", "Sub-measured HTML payload demarcated knowledge chunks"),
    ("ÖRNEK RAPOR · CANLI NUMUNE", "SAMPLE REPORT · LIVE SPECIMEN"),
    ("319 KB (14KB Aşımı)", "319 KB (HTML Payload Over Target)"),
    ("18 Bağımsız Motor Telemetrisi", "18 Independent Engine Telemetry"),
    ("RFC 6797 / 6596 / 9309 Uyumluluğu", "RFC 6797 / 6596 / 9309 Compliance"),
    ("Sıfır Simüle Edilmiş / Uydurma Dakika", "Zero Simulated / Fabricated Minutes"),
    ("Bahsedilme, Alıntı & Tavsiye Oranları", "Mention, Citation & Recommendation Rates"),
    ("3–5 Gerçek Rakip Eşdeğerlik Kıyası", "3–5 Empirical Competitor Parity Benchmark"),
    ("Alıntı Kaynak Grafı & P0–P3 Hedefleri", "Citation Source Graph & P0–P3 Targets"),
    ("Varlık Çelişki Defteri (Hallucination Guard)", "Entity Conflict Ledger (Hallucination Guard)"),
    ("25-Node n8n CI/CD Otomasyonu & Gerçek DLQ", "25-Node n8n CI/CD Automation & Real DLQ"),
    ("24 Dosyalı SHA-256 İmzalı Paket Manifestosu", "24-File SHA-256 Signed Package Manifesto"),
    ("Teknik Hazırlık", "Technical Readiness"),
    ("Alıntılanma %", "Citation %"),
    ("Cevap Payı (SoA)", "Share of Answer (SoA)"),
    ("Mevcut Analiz Bazı — Kategori kıyaslama sorgularında Common Crawl eğitim izi eksiği.", "Current Analysis Baseline — Category benchmark queries lack Common Crawl training footprint."),
    ("Common Crawl WET arşivlerindeki 10+ yıllık eğitim izi ve G2 kıyaslama sitelerinde yüksek alıntı hacmi.", "10+ years training footprint in Common Crawl WET archives and high citation volume on G2 comparison platforms."),
    ("Wikipedia, Crunchbase ve ChatGPT Search tarafından taranan editoryal satın alma rehberlerindeki varlık yoğunluğu.", "Entity density in editorial buyer guides crawled by Wikipedia, Crunchbase and ChatGPT Search."),
    ("Kurumsal log analizi sorgularında alıntılanan yerleşik teknik kurumsal taksonomi.", "Established technical corporate taxonomy cited in enterprise log analysis queries."),
    ("JavaScript render ve tarama bütçesi üzerine AI araştırma botlarınca taranan orijinal teknik raporlar.", "Original technical whitepapers crawled by AI research bots regarding JavaScript rendering and crawl budgets."),
    ("GÜVENİLİRLİK: %94", "CONFIDENCE: 94%"),
    ("Gözlemlenen Motorlar:", "Observed Engines:"),
    ("Rakip Alıntısı:", "Competitor Citation:"),
    ("22 Atıf |", "22 Citations |"),
    ("Müşteri:", "Client:"),
    ("0 Atıf", "0 Citations"),
    ("Orta Seviye (Doğrulanabilir Kaynak Gerektirir)", "Medium Priority (Requires Verifiable Source)"),
    ("✓ Eylem: Bağımsız şirket tescil ve tarafsız basın kaynaklarıyla resmi Wikidata QID kaydı oluşturun.", "✓ Action: Establish official Wikidata QID record via independent corporate registration and neutral press sources."),
    ("GÜVENİLİRLİK: %92", "CONFIDENCE: 92%"),
    ("18 Atıf |", "18 Citations |"),
    ("Yüksek (Açık Kaynak Katkısı)", "High Priority (Open Source Contribution)"),
    ("✓ Eylem: Canlı JSON-RPC araç şemalarını içeren açık kaynak MCP uç noktasını resmi depoya PR olarak ekleyin.", "✓ Action: Submit live JSON-RPC tool schemas containing open-source MCP endpoint as PR to official repository."),
    ("GÜVENİLİRLİK: %88", "CONFIDENCE: 88%"),
    ("Bağımsız G2 / Capterra Yazılım Matrisi", "Independent G2 / Capterra Software Matrix"),
    ("34 Atıf |", "34 Citations |"),
    ("Orta Seviye (Doğrulanmış Profil)", "Medium Priority (Verified Profile)"),
    ("✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle onaylatın.", "✓ Action: Verify official product profile with $99 fixed price and deterministic software capabilities."),
    ("GÜVENİLİRLİK: %90", "CONFIDENCE: 90%"),
    ("6 Atıf |", "6 Citations |"),
    ("1 Atıf", "1 Citation"),
    ("Yüksek (Doğrudan Webmaster Kontrolü)", "High Priority (Direct Webmaster Control)"),
    ("✓ Eylem: Yapılandırılmış H2 başlıklarıyla /llms.txt ve /llms-full.txt dosyalarını sürekli güncel tutun.", "✓ Action: Keep /llms.txt and /llms-full.txt files continuously updated with structured H2 headings."),
    ("Varlık Niteliği", "Entity Attribute"),
    ("Resmi / Gerçek Değer", "Official / Actual Value"),
    ("Dış Kaynakta Gözlemlenen Hata", "Error Observed in External Source"),
    ("Halüsinasyon Riski", "Hallucination Risk"),
    ("Deterministik Onarım Çözümü", "Deterministic Remediation Solution"),
    ("Aylık ajans danışmanlığı / Teklif bazlı", "Monthly agency retainer / Quote-based"),
    ("YÜKSEK", "HIGH"),
    ("Tüm kanonik sayfalarda price=99 Offer şeması zorunlu kılınmalıdır.", "Price=99 Offer schema must be enforced on all canonical pages."),
    ("Hizmet & İş Modeli", "Service & Business Model"),
    ("%100 Otomatik Deterministik Yazılım", "100% Automated Deterministic Software"),
    ("Pazarlama & SEO Danışmanlık Ajansı", "Marketing & SEO Consulting Agency"),
    ("KRİTİK", "CRITICAL"),
    ("Organization şemasında net negatif disclaimers (SUNMAZ) beyan edilmelidir.", "Clear negative disclaimers (DOES NOT PROVIDE) must be declared in Organization schema."),
    ("Kanonik Düğüm URI", "Canonical Node URI"),
    ("www ve apex domain karmaşası", "www and apex domain ambiguity"),
    ("www adresinden kök etki alanına kalıcı 301 HSTS yönlendirmesi kurulmalıdır.", "Permanent 301 HSTS redirect from www to apex root domain must be established."),
    ("// Cloudflare Edge Worker: AI Botlar İçin 14KB RAG Akış Temizliği export default { async fetch(request) { const ua = request.headers.get('user-agent') || ''; const isBot = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot/i.test(ua); const res = await fetch(request); if (!isBot) return res; return new HTMLRewriter() .on('svg, style, script:not([type=\"application/ld+json\"])', { element(el) { el.remove(); } }) .transform(res); } };", "// Cloudflare Edge Worker: HTML Payload RAG Stream Optimizer export default { async fetch(request) { const ua = request.headers.get('user-agent') || ''; const isBot = /GPTBot|ClaudeBot|PerplexityBot|OAI-SearchBot/i.test(ua); const res = await fetch(request); if (!isBot) return res; return new HTMLRewriter() .on('svg, style, script:not([type=\"application/ld+json\"])', { element(el) { el.remove(); } }) .transform(res); } };"),
    ("ColBERT ve TCP 14KB sapmalarını ayıklar.", "Filters measured ColBERT and HTML payload anomalies."),
    ("📦 $99 Onarım Seti (30+ Dosya)", "📦 $99 Remediation Package (30+ Files)"),
    ("Yükleniyor...", "Loading..."),
    ("/ her zaman ücretsiz", "/ always free"),
    ("Etkilenen URL ve Kablo Kanıtları", "Affected URLs and Wire Evidence"),
    ("Temel robots.txt & llms.txt Kontrolü", "Core robots.txt & llms.txt Verification"),
    ("Sıfır Üyelik ve Kredi Kartı Şartı", "Zero Membership and No Credit Card Required"),
    ("EN POPÜLER", "MOST POPULAR"),
    ("30+ Dosyalı Sürümlenmiş ZIP Paketi", "30+ File Versioned ZIP Package"),
    ("Kök Neden Analizi & P0–P3 Uygulama Sırası", "Root Cause Analysis & P0–P3 Execution Order"),
    ("30 Gün İçinde 1 Ücretsiz Doğrulama Taraması", "1 Free Verification Rescan Within 30 Days"),
    ("30+ Dosyalı Enterprise ZIP Paketi", "30+ File Enterprise ZIP Package"),
    ("15 Alıcı Sorusu × 3 Tekrarlı AI Yanıt Gözlemleri", "15 Buyer Queries × 3 Replicated AI Response Observations"),
    ("3–5 Gerçek Rakip Eşdeğerliği & \"Neden Onlar\" Analizi", "3–5 Empirical Competitor Parity & \"Why Them\" Analysis"),
    ("Alıntı Kaynak Grafı & P0–P3 Ele Geçirme Hedefleri", "Citation Source Graph & P0–P3 Capture Targets"),
    ("25 Düğümlü n8n Otomasyonu & Gerçek DLQ Kanıtı", "25-Node n8n Automation & Real DLQ Evidence"),
    ("12 Haftalık Dark Pool Zaman Serisi & 30 Günlük Delta", "12-Week Dark Pool Time Series & 30-Day Delta"),
    ("ÖDEME GÜVENCESİ", "PAYMENT GUARANTEE"),
    ("Yetkili Kayıt Satıcısı Paddle.com (MoR)", "Authorized Merchant of Record Paddle.com (MoR)"),
    ("AYLIK ABONELİK YOK", "NO MONTHLY SUBSCRIPTION"),
    ("GİZLİ SORUN YOK", "NO HIDDEN ISSUES"),
    ("HTML&HTML, web siteleri için deterministik AI görünürlük analizleri ve yapılandırma yol haritasıleri üreten bağımsız bir yazılım platformudur. Şirketimiz reklam ajansı, SEO danışmanlığı veya özel yazılım geliştirme hizmeti SUNMAZ.", "HTML&HTML is an independent software platform that generates deterministic AI visibility audits and remediation roadmaps for websites. Our company DOES NOT provide advertising agency, SEO consulting, or custom software development services."),
    ("İade Politikası", "Refund Policy"),
    ("Teslimat Politikası", "Delivery Policy"),
    ("Yetkili Satıcı", "Authorized Reseller"),
    ("Ödemeler, faturalandırma ve vergi süreçleri yetkili Merchant of Record ortağımız", "Payments, billing, and taxation processes are handled by our authorized Merchant of Record partner"),
    ("tarafından yürütülür.", "as Merchant of Record."),
]


INDEX_ADDITIONS = [
    ("Örnek Raporu İncele →", "Review Sample Report →"),
    ("Wikidata: QID Taranıyor", "Wikidata: Scanning QID"),
    ("Common Crawl: Arşiv Taranıyor", "Common Crawl: Scanning Archive"),
    ("Kurumsal / Ajans Paylaşım Modu:", "Enterprise / Agency Sharing Mode:"),
    ("Bu denetim sonucunu müşterinizle veya yönetimle paylaşın:", "Share this audit result with your client or executive board:"),
    ("🔗 Canlı Rapor Linkini Kopyala", "🔗 Copy Live Report Link"),
    ("Onarım Roadmaps: 15", "Remediation Roadmaps: 15"),
    ("18 deterministik kablo seviyesi motor, RFC standartları (HSTS, Canonical, robots.txt) ve measured HTML payload TCP CWND ilk paket mimarisi.", "18 deterministic wire-level engines, RFC standards (HSTS, Canonical, robots.txt) and measured HTML payload TCP CWND initial packet architecture."),
    ("Sıfır Rastgelelik & Deterministik Doğrulama", "Zero Randomness & Deterministic Verification"),
    ("15 alıcı sorusu × 3 tekrarlı panel (ChatGPT Search, Perplexity, Gemini, Claude, Copilot) ve ampirik kanıt makbuzları.", "15 buyer queries × 3 replicated panel runs (ChatGPT Search, Perplexity, Gemini, Claude, Copilot) and empirical evidence receipts."),
    ("Varlık çelişki defteri, 24-alanlı açık onarım yol haritasıleri, n8n DAG otomasyonu ve 30+ dosyalı üretim teslimat paketi.", "Entity conflict ledger, 24-field open remediation roadmaps, n8n DAG automation and 30+ file production delivery package."),
    ("Varlık Çatışma Defteri (Hallucination Guard)", "Entity Conflict Ledger (Hallucination Guard)"),
    ("Kurumsal 7 Disiplin Ölçüm Matrisi (SEO + GEO + AEO + LLMO + AAO + RAG + E-E-A-T)", "Enterprise 7-Discipline Measurement Matrix (SEO + GEO + AEO + LLMO + AAO + RAG + E-E-A-T)"),
    ("Silikon Vadisi ve New York kurumsal yapay zeka ajanslarının uyguladığı 7 temel ölçüm standardı. Arama motorlarının, yanıt motorlarının, büyük dil modellerinin ve otonom satın alma ajanlarının alan adınızı hangi disiplinde nasıl puanladığını canlı olarak inceleyin:", "The 7 core measurement standards used by Silicon Valley and New York enterprise AI agencies. Inspect live how search engines, answer engines, LLMs, and autonomous purchasing agents score your domain across each discipline:"),
    ("DİSİPLİN 01", "DISCIPLINE 01"),
    ("RFC 6596 Canonical, robots.txt, HSTS, sitemap.xml ve Core Web Vitals tarama uygunluğu.", "RFC 6596 Canonical, robots.txt, HSTS, sitemap.xml and Core Web Vitals crawl compliance."),
    ("DİSİPLİN 02", "DISCIPLINE 02"),
    ("/llms.txt v2 manifestosu, Perplexity ve ChatGPT Search üretken yanıt görünürlüğü.", "/llms.txt v2 manifest, Perplexity and ChatGPT Search generative answer visibility."),
    ("DİSİPLİN 03", "DISCIPLINE 03"),
    ("Doğrudan cevap çıkarılabilirlik, Featured Snippet ve atomik soru-cevap sözdizimi.", "Direct answer extractability, Featured Snippet and atomic Q&A syntax."),
    ("DİSİPLİN 04", "DISCIPLINE 04"),
    ("DİSİPLİN 05", "DISCIPLINE 05"),
    ("A2A Agent Card v1.0, Model Context Protocol (MCP) JSON-RPC ve otonom satın alma desteği.", "A2A Agent Card v1.0, Model Context Protocol (MCP) JSON-RPC and autonomous purchasing support."),
    ("DİSİPLİN 06", "DISCIPLINE 06"),
    ("RAG (Vektörel Geri Çağırma)", "RAG (Vector Retrieval)"),
    ("ColBERT MaxSim geç etkileşimi, Cross-Encoder dikkat matrisi ve semantik chunking.", "ColBERT MaxSim late interaction, Cross-Encoder attention matrix and semantic chunking."),
    ("DİSİPLİN 07", "DISCIPLINE 07"),
    ("E-E-A-T (Güven & Varlık)", "E-E-A-T (Trust & Entity)"),
    ("Sektörel 3–5 Rakip Eşdeğerlik Kıyaslama Matrisi (Competitor Parity)", "Industry 3–5 Competitor Parity Benchmark Matrix"),
    ("Aşağıdaki matris, aynı 15 sorgu paneli altında hedef alan adınız ile sektör lideri 4 rakibin yapay zeka yüzeylerindeki performansını tarafsız olarak kıyaslar.", "The matrix below neutrally benchmarks the performance of your target domain against 4 industry-leading competitors across the same 15-inquiry panel."),
    ("Neden Onlar / Neden Siz Değil? (Empirical Diff)", "Why Them / Why Not You? (Empirical Diff)"),
    ("Alıntı Kaynak Grafı & Öncelikli Ele Geçirme Hedefleri (P0–P3 Matrix)", "Citation Source Graph & Priority Capture Targets (P0–P3 Matrix)"),
    ("Aşağıdaki kaynaklar, ChatGPT Search ve Perplexity modellerinin yanıt verirken en çok atıfta bulunduğu bağımsız otoritelerdir. Rakiplerin öne geçmesini sağlayan bu kaynaklar için meşru editoryal entegrasyon yol haritasıleri çıkarılmıştır.", "The sources below are independent authorities most frequently cited by ChatGPT Search and Perplexity models. Legitimate editorial integration roadmaps are provided for these authority sources."),
    ("Yüksek (Açık Protokol)", "High (Open Protocol)"),
    ("✓ Eylem: Claude Desktop ve Cursor IDE için çalışan açık kaynak MCP sunucu uç noktasını yayınlayın.", "✓ Action: Publish working open-source MCP server endpoint for Claude Desktop and Cursor IDE."),
    ("Bağımsız Yazılım Karşılaştırma Dizinleri (G2 / Capterra)", "Independent Software Comparison Directories (G2 / Capterra)"),
    ("Orta Seviye", "Medium Level"),
    ("✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle onaylatın.", "✓ Action: Verify official product profile with $99 fixed price and deterministic software capabilities."),
    ("✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle doğrulayın.", "✓ Action: Verify official product profile with $99 fixed price and deterministic software capabilities."),
    ("✓ Eylem: /llms.txt ve /llms-full.txt dosyalarını W3C Markdown standardıyla sürekli güncel tutun.", "✓ Action: Keep /llms.txt and /llms-full.txt continuously updated with W3C Markdown standards."),
    ("Yapay Zeka Arama Motorları Model Tepki & Alıntı Simülasyonu", "AI Search Engines Model Response & Citation Simulation"),
    ("Aşağıdaki simülasyon; alan adınızın Perplexity Pro, OpenAI SearchGPT, Claude 3.5 Sonnet ve Google Gemini modelleri karşısındaki anlık davranışını gösterir. Ham durumda modellerin neden sizi atladığını, $99 onarım seti sonrasında nasıl 1. sıra doğrulanmış kaynağa dönüştüğünüzü test edin.", "The simulation below shows the live behavior of your domain across Perplexity Pro, OpenAI SearchGPT, Claude 3.5 Sonnet and Google Gemini models. Test why models skip your domain in raw state and how you become a tier-1 verified source after the $99 remediation package."),
    ("🔴 Mevcut site sinyallerine göre risk", "🔴 Risk based on current site signals"),
    ("🟢 Onarım Paketi Sonrası (1. Sıra Doğrulanmış Alıntı)", "🟢 After Remediation Package (Tier-1 Verified Citation)"),
    ("📋 15-Sorgulu Kanonik Alıcı Paneli (Observed Prompt Inquiries across 3 Runs)", "📋 15-Inquiry Canonical Buyer Panel (Observed Prompt Inquiries across 3 Runs)"),
    ("3-RUN TARAFIZ TESPİT", "3-RUN UNBIASED DETECTION"),
    ("Aşağıdaki matris, Mandate V4 standardı gereğince 5 soru ailesinde yürütülen canlı arama sorgularında alan adınızın 4 ana modeldeki atıf ve tavsiye durumunu gösterir:", "The matrix below displays the citation and recommendation status of your domain across 4 major models in live inquiries across 5 query families per Mandate V4 standards:"),
    ("Tespitler ve Onarım yol haritasıleri", "Findings and Remediation Roadmaps"),
    ("Kurumsal Onarım yol haritası & Uygulama Adımları", "Enterprise Remediation Roadmap & Implementation Steps"),
    ("Kurumsal Onarım yol haritası Kilitli", "Enterprise Remediation Roadmap Locked"),
    ("15 Onarım yol haritası Dahil", "15 Remediation Roadmaps Included"),
    ("$99 — Tüm Onarım yol haritasılerini Aç", "$99 — Unlock All Remediation Roadmaps"),
    ("Yapay Zeka Arama Kaybı & Finansal Risk Hesaplayıcısı", "AI Search Loss & Financial Risk Calculator"),
    ("AYLIK RİSK PROJEKSİYONU", "MONTHLY RISK PROJECTION"),
    ("📉 AYDA KAYBEDİLEN POTANSİYEL LEAD", "📉 ESTIMATED POTENTIAL MONTHLY LEADS LOST"),
    ("8 – 15 Müşteri", "8 – 15 Customers"),
    ("Arama botunun measured HTML payload kesilmesine takılması kaynaklı", "Caused by crawler truncation on measured HTML payload"),
    ("Wikidata / Bilgi grafiği eksikliği kaynaklı", "Caused by missing Wikidata / Knowledge Graph reconciliation"),
    ("💰 AYLIK RİSKTEKİ PIPELINE GELİRİ", "💰 MONTHLY PIPELINE REVENUE AT RISK"),
    ("Mevcut kurumsal sepet ve arama hacmine göre", "Based on current corporate basket size and query volume"),
    ("Senaryo Analizi — ölçülmüş gelir değildir:", "Scenario Analysis — not measured revenue:"),
    ("Arama motoru robotu sitenizde boğulup fiyat ve hizmet katmanınıza ulaşamadığı için yüksek satın alma niyetli kurumsal ziyaretçiler doğrudan rakiplerinize ve aracı platformlara yönlendirilmektedir. Aşağıdaki sürgülerle şirketinizin aylık hacmine göre risk büyüklüğünü hesaplayın:", "Because crawler bots get bogged down on heavy markup and fail to reach your pricing and service tiers, high-intent corporate buyers are routed directly to competitors and third-party platforms. Use the sliders below to calculate risk magnitude:"),
    ("Aylık Sektörel AI Arama Hacmi:", "Monthly Industry AI Search Volume:"),
    ("Ortalama Müşteri / Sipariş Değeri:", "Average Customer / Deal Value:"),
    ('⚡ $99 — 30+ Dosyalık V3 Uygulama Paketini Al & Kaybı Durdur →', '⚡ $99 — Get 30+ File V3 Implementation Pack & Stop Loss →'),
    ('⚡ $99 — 30+ Dosyalık V3 Uygulama Paketini Al &amp; Kaybı Durdur →', '⚡ $99 — Get 30+ File V3 Implementation Pack & Stop Loss →'),
    ('📄 1-Sayfalık Yönetim Kurulu Notu (Board Memo)', '📄 1-Page Executive Board Memo'),
    ('3 Adımda Sıfır Kod Entegrasyon: "Ben Bu Dosyaları Ne Yapacağım?"', 'Zero-Code Integration in 3 Steps: "What Do I Do With These Files?"'),
    ("SIFIR RİSK · ANINDA ÇALIŞIR", "ZERO RISK · WORKS INSTANTLY"),
    ("Paketteki sürümlenmiş teslim dosyaları, firmanızın kullandığı platforma göre 3 dakikada yüklenebilecek şekilde organize edilmiştir. Veritabanı veya kaynak kod değişikliği gerekmez; sisteminizde bozulma riski sıfırdır.", "The versioned delivery files in the package are structured to deploy in 3 minutes across common stacks. No database or source-code alterations are required; zero risk of system breakdown."),
    ("dosyasını sitenizin kök klasörüne", "upload the file to the root directory of your site"),
    ("olarak yükleyin.", "as indicated."),
    ("kodunu Header and Footer Scripts eklentisine yapıştırın.", "paste the snippet into your Header and Footer Scripts plugin."),
    ("Test cURL komutunu çalıştırıp anında teyit edin. (Toplam: 2 dk)", "Run test cURL command and verify immediately. (Total: 2 min)"),
    ("E-Ticaret Mağazaları", "E-Commerce Stores"),
    ("Shopify Admin -> Online Mağaza -> Temalar -> Düzenle adımlarını açın.", "Navigate to Shopify Admin -> Online Store -> Themes -> Edit code."),
    ("dosyasındaki", "in the file"),
    ("öncesine şema kodunu yapıştırın.", "paste the schema snippet before the tag."),
    ("Kaydedin. Ürün ve kurumsal kimliğiniz AI ajanlarına hazır. (Toplam: 1.5 dk)", "Save. Your product and entity identity are AI agent ready. (Total: 1.5 min)"),
    ("dosyasını Cloudflare Workers'a yapıştırın.", "paste the file into Cloudflare Workers."),
    ("tanımlayın.", "define."),
    ("Site Ayarları -> Custom Code sekmesine gidin.", "Go to Site Settings -> Custom Code tab."),
    ("Head Code kutusuna paketteki JSON-LD bloğunu bırakın.", "Paste the JSON-LD block into the Head Code field."),
    ("Publish butonuna basın. (Toplam: 1 dk)", "Click Publish button. (Total: 1 min)"),
    ("256-Bit SSL, Global Kart & Kurumsal Fatura / Tax ID Desteği", "256-Bit SSL, Global Card & Corporate Tax ID Support"),
    ("Anında Otomatik Teslim:", "Instant Automated Delivery:"),
    ("Ödeme sonrası saniyeler içinde alan adına özel ZIP indirme", "Domain-specific ZIP download available seconds after checkout"),
    ("Sıfır Sunucu Müdahalesi:", "Zero Server Intrusion:"),
    ("Kaynak koda ve veritabanına dokunulmaz, geri dönüşü risksizdir", "No source code or database modification; completely safe rollback"),
    ("15 Kurumsal Onarım yol haritası", "15 Enterprise Remediation Roadmaps"),
    ("15 Detaylı Onarım yol haritası & Yol Haritası", "15 Detailed Remediation Roadmaps & Plans"),
    ("Onarım yol haritasılerini Aç ve İndir", "Unlock and Download Remediation Roadmaps"),
    ("Paddle.com Güvenli Ödeme · Anında Otomatik Teslimat · Sıfır Risk", "Paddle.com Secure Payment · Instant Automated Delivery · Zero Risk"),
    ("GİZLİ // YÖNETİM KURULU İÇ MEMORANDUMU", "CONFIDENTIAL // EXECUTIVE BOARD INTERNAL MEMORANDUM"),
    ("YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ & ÇÖZÜM yol haritası RAPORU", "AI SEARCH VISIBILITY & REMEDIATION ROADMAP REPORT"),
    ("KİME:", "TO:"),
    ("İcra Kurulu, CEO & CTO", "Executive Board, CEO & CTO"),
    ("TARİH:", "DATE:"),
    ("9 Eylül 2026", "September 9, 2026"),
    ("1. YÖNETİCİ ÖZETİ VE RİSK TEŞHİSİ", "1. EXECUTIVE SUMMARY & RISK DIAGNOSIS"),
    ("Şirketimizin ana alan adı (", "Across our core corporate domain ("),
    (") üzerinde yürütülen yapay zeka arama motorları (Perplexity, SearchGPT, Claude, Gemini) denetiminde; ölçülen HTML yükü ve semantik yapı sorunları ve şema eksikliği nedeniyle aylık nitelikli kurumsal müşteri / B2B satış fırsatlarının doğrudan rakiplere yönlendirildiği tespit edilmiştir.", ") in audits across AI engines (Perplexity, SearchGPT, Claude, Gemini), measured HTML payload and semantic issues plus missing schema cause qualified B2B leads to be routed to competitors."),
    ("Mevcut kurumsal sepet hacmimize göre her ay tahmini 8–15 kurumsal müşteri kaybı yaşanmakta ve $40.000 risk altındadır.", "Based on our current deal size, an estimated 8–15 corporate leads and $40,000 are at risk each month."),
    ("2. 3-DÜZLEMLİ KURUMSAL TEŞHİS SKORLARI", "2. 3-PLANE ENTERPRISE DIAGNOSTIC SCORES"),
    ("DÜZLEM A: GÖRÜNÜRLÜK", "PLANE A: VISIBILITY"),
    ("DÜZLEM B: OTORİTE", "PLANE B: AUTHORITY"),
    ("DÜZLEM C: AJAN HAZIRLIĞI", "PLANE C: AGENT READINESS"),
    ("3. ÖNERİLEN ÇÖZÜM: sürümlenmiş MÜHENDİSLİK ÇÖZÜM yol haritası PAKETİ", "3. RECOMMENDED SOLUTION: VERSIONED ENGINEERING REMEDIATION ROADMAP PACKAGE"),
    ("Yazılım ekibimize teslim edilecek üretime hazır kod şablonları, JSON-LD şemaları ve n8n izleme iş akışları ile:", "With production-ready code templates, JSON-LD schemas, and n8n monitoring workflows delivered to engineering:"),
    ("HTML Yük ve Semantik Yapı Optimizasyonu:", "HTML Payload & Semantic Structure Optimization:"),
    ("Arama botlarının sayfayı terk etmeden tüm ürün ve fiyat katmanını belleğe alması için HTML kod optimizasyonu.", "HTML optimization ensuring search bots parse full product and pricing tiers before timeout."),
    ("Wikidata QID ve Corporation şeması doğrudan <head> içine eklenerek marka teyit edilir.", "Wikidata QID and Corporation schema injected into <head> for brand verification."),
    ("Otonom yapay zeka satın alma ajanları için temiz makine-okunabilir arayüz.", "Clean machine-readable interface for autonomous AI purchasing agents."),
    ("Önemli İlke:", "Core Principle:"),
    ("Biz analiz eder ve yol haritasını hazırlarız. Düzeltme çalışmasını firmanızın kendi yazılım ekibi uygular. Kaynak koda doğrudan müdahale edilmez.", "We diagnose and prepare the roadmap. Your engineering team applies the fixes. No direct modification to client source code."),
    ("✓ sürümlenmiş Tam Çözüm yol haritasıleri Paketi & Anında ZIP İndirme", "✓ Versioned Complete Remediation Roadmap Package & Instant ZIP Download"),
    ("🖨️ Yazdır / PDF Kaydet", "🖨️ Print / Save as PDF"),
    ('⚡ yol haritası Paketini Al ($99) →', '⚡ Get Remediation Roadmap Package ($99) →'),
    ("Finansal Etki & Risk:", "Financial Impact & Risk:"),
    ("P1 HEDEF", "P1 TARGET"),
    ("P2 HEDEF", "P2 TARGET"),
    ("P3 HEDEF", "P3 TARGET"),
    ("llms.txt Directory & Topluluk Dizinleri", "llms.txt Directory & Community Directories"),
    ("llms.txt Directory &amp; Topluluk Dizinleri", "llms.txt Directory &amp; Community Directories"),
    ("Kontrol Edilebilirlik:", "Controllability:"),
    ("Tam Kontrol (Kendi Siteniz)", "Full Control (Own Site)"),
    ("Yüksek (Açık Protokol)", "High (Open Protocol)"),
    ("Orta Seviye", "Medium Level"),
    ("✓ Eylem: Resmi ürün profilini $99 sabit fiyat ve deterministik yazılım yetkinlikleriyle doğrulayın.", "✓ Action: Verify official product profile with $99 flat price and deterministic software capabilities."),
    ("Aşağıdaki simülasyon; alan adınızın Perplexity Pro, OpenAI SearchGPT, Claude 3.5 Sonnet ve Google Gemini modelleri karşısındaki anlık davranışını gösterir. Ham durumda modellerin neden sizi atladığını, $99 onarım seti sonrasında nasıl 1. sıra doğrulanmış kaynağa dönüştüğünüzü test edin.", "The simulation below illustrates how your domain performs against Perplexity Pro, OpenAI SearchGPT, Claude 3.5 Sonnet, and Google Gemini models. Inspect why models bypass your domain in raw state, and how it shifts to a verified first-tier source after remediation."),
    ("Yapay Zeka Durumu:", "AI State:"),
    ("ID & Aile", "ID & Family"),
    ("ID &amp; Aile", "ID &amp; Family"),
    ("Kanonik Soru / Arama Niyeti", "Canonical Inquiry / Search Intent"),
    ("Standart:", "Standard:"),
]
PAIRS += INDEX_ADDITIONS

TR_FORCE = [
    ("<!-- ColBERT MaxSim Dot Product Probe --> Query: 'Enterprise AI Visibility Fix Mandate' Measured Dot Product: 0.812 [WARN: Target >= 0.940 for Top-1 Rerank Placement]", "<!-- ColBERT MaxSim İç Çarpım Probu --> Sorgu: 'Kurumsal Yapay Zeka Görünürlük Onarım Paketi' Ölçülen İç Çarpım: 0.812 [UYARI: Hedef >= 0.940]"),
    ("<!-- Yüksek ColBERT MaxSim Uyumlu Cümle (0.965 Skoru) --> <p><strong>Enterprise AI Visibility Fix Mandate:</strong> HTML&HTML altyapısı sub-180ms edge yanıt süresi, 18 motorlu deterministik telemetri ve RFC uyumlu 22 mühendislik dosyası ile kurumsal yapay zeka arama sistemlerinde %99.4 alıntı doğruluğu sağlar.</p>", "<!-- ColBERT MaxSim Uyumlu Kanıt Cümlesi --> <p><strong>Kurumsal Yapay Zeka Görünürlük Onarım Paketi:</strong> HTML&HTML ölçülen site-tarafı hazırlık sinyallerini ve deterministik telemetriyi raporlar; dış yapay zeka sistemlerinde sabit alıntı sonucu garanti edilmez.</p>"),
    ("Enterprise AI Visibility Fix Mandate", "Kurumsal Yapay Zeka Görünürlük Onarım Paketi"),
    ("$99 Fix Mandate", "$99 Onarım Paketi"),
    ("SAMPLE REPORT · SPECIMEN SPECIFICATION", "ÖRNEK RAPOR · TEKNİK NUMUNE"), ("SAMPLE REPORT · SPECIMEN", "ÖRNEK RAPOR · NUMUNE"),
    ("LIVE ENTERPRISE SAMPLE REPORT · AI DIAGNOSTIC SPECIMEN", "CANLI KURUMSAL ÖRNEK RAPOR · YAPAY ZEKA TEŞHİS NUMUNESİ"),
    ("Enterprise AI Visibility Diagnostic & Remediation Report (Sample Specimen)", "Kurumsal Yapay Zeka Görünürlük Teşhis ve Onarım Raporu (Canlı Numune)"),
    ("Enterprise AI Visibility Analyzer & Diagnostic Lab", "Kurumsal Yapay Zeka Görünürlük Analizörü ve Teşhis Laboratuvarı"),
    ("LIVE ENTERPRISE AI DIAGNOSTIC LAB", "CANLI KURUMSAL YAPAY ZEKA TEŞHİS LABORATUVARI"), ("Sample Report", "Örnek Rapor"),
    ("AI Glossary", "Yapay Zeka Sözlüğü"),
]

SCRIPT_STYLE_RE = re.compile(r"(<script\b[^>]*>.*?</script>|<style\b[^>]*>.*?</style>)", re.I | re.S)
TR_CHAR_RE = re.compile(r"[ğüşöçıİĞÜŞÖÇ]")
PAIR_TR_EN = {tr: en for tr, en in PAIRS}
PAIR_EN_TR = {en: tr for tr, en in PAIRS}


def extract_dict(source: str) -> dict[str, dict[str, str]]:
    m = re.search(r"const dict\s*=\s*\{\s*tr\s*:\s*\{(.*?)\}\s*,\s*en\s*:\s*\{(.*?)\}\s*\};", source, re.S)
    if not m: return {"tr": {}, "en": {}}
    def parse(block: str) -> dict[str, str]:
        out = {}
        for item in re.finditer(r"([A-Za-z0-9_]+)\s*:\s*\"((?:\\.|[^\"\\])*)\"", block):
            try: out[item.group(1)] = json.loads('"' + item.group(2) + '"')
            except json.JSONDecodeError: out[item.group(1)] = item.group(2)
        return out
    return {"tr": parse(m.group(1)), "en": parse(m.group(2))}


def markup_only(source: str, transform) -> str:
    parts = SCRIPT_STYLE_RE.split(source)
    for i in range(0, len(parts), 2): parts[i] = transform(parts[i])
    return "".join(parts)


def localize_data_i18n(source: str, locale: str, dictionary: dict[str, dict[str, str]]) -> str:
    values = dictionary.get(locale, {})
    pattern = re.compile(r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-i18n=\"(?P<key>[A-Za-z0-9_-]+)\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)", re.S)
    def repl(m: re.Match[str]) -> str:
        value = values.get(m.group("key"))
        return m.group(0) if value is None else m.group(1) + html.escape(value, quote=False) + m.group(6)
    return pattern.sub(repl, source)


def localize_bilingual_attrs(source: str, locale: str) -> str:
    pattern = re.compile(r"(<(?P<tag>[A-Za-z][A-Za-z0-9:-]*)\b(?P<attrs>[^>]*\bdata-tr=\"[^\"]*\"[^>]*\bdata-en=\"[^\"]*\"[^>]*)>)(?P<body>.*?)(</(?P=tag)>)", re.S)
    def repl(m: re.Match[str]) -> str:
        attr = re.search(rf"data-{locale}=\"([^\"]*)\"", m.group("attrs"))
        return m.group(0) if not attr else m.group(1) + attr.group(1) + m.group(5)
    return pattern.sub(repl, source)


def translate_text_nodes(source: str, locale: str) -> str:
    mapping = PAIR_TR_EN if locale == "en" else PAIR_EN_TR
    fragments = sorted(
        ((src, dst) for src, dst in mapping.items() if len(src) >= 12),
        key=lambda pair: len(pair[0]),
        reverse=True,
    )

    def translate_value(value: str) -> str:
        exact = mapping.get(value)
        if exact is not None:
            return exact

        translated = value
        for src, dst in fragments:
            if src in translated:
                translated = translated.replace(src, dst)

        if locale == "en":
            translated = re.sub(r'^Hedef:\s*', 'Target: ', translated)
            translated = re.sub(r'^Ağırlık:\s*', 'Weight: ', translated)
            translated = re.sub(r'^(\d+)\s+bulgu$', r'\1 findings', translated)
            translated = re.sub(r'^(\d+)\s+Motor$', r'\1 Engines', translated)
            translated = re.sub(r'^(\d+)\s+motor$', r'\1 engines', translated)
            translated = re.sub(r'^(\d+)\s+link probu$', r'\1 link probes', translated)
        else:
            translated = re.sub(r'^Target:\s*', 'Hedef: ', translated)
            translated = re.sub(r'^Weight:\s*', 'Ağırlık: ', translated)
            translated = re.sub(r'^(\d+)\s+findings$', r'\1 bulgu', translated)
            translated = re.sub(r'^(\d+)\s+Engines$', r'\1 Motor', translated)
            translated = re.sub(r'^(\d+)\s+engines$', r'\1 motor', translated)
            translated = re.sub(r'^(\d+)\s+link probes$', r'\1 link probu', translated)
        return translated

    def transform(markup: str) -> str:
        parts = re.split(r'(<[^>]+>)', markup)
        for i in range(0, len(parts), 2):
            raw = parts[i]
            stripped = raw.strip()
            if not stripped:
                continue
            decoded = html.unescape(stripped)
            replacement = translate_value(decoded)
            if replacement != decoded:
                lead = raw[:len(raw) - len(raw.lstrip())]
                tail = raw[len(raw.rstrip()):]
                parts[i] = lead + html.escape(replacement, quote=False) + tail
        return ''.join(parts)

    out = markup_only(source, transform)
    if locale == "tr":
        def force(markup: str) -> str:
            for en, tr in TR_FORCE:
                markup = markup.replace(en, tr)
            return markup
        out = markup_only(out, force)
    return out

def set_head(source: str, filename: str, locale: str, en_path: str, tr_path: str) -> str:
    title, desc = META[filename][locale]
    canonical = "https://htmlandhtml.com" + (en_path if locale == "en" else tr_path)
    en_url, tr_url = "https://htmlandhtml.com" + en_path, "https://htmlandhtml.com" + tr_path
    source = re.sub(r'<html\s+lang="[^"]+"', f'<html lang="{locale}"', source, count=1)
    source = re.sub(r'<title>.*?</title>', f'<title>{html.escape(title)}</title>', source, count=1, flags=re.S)
    source = re.sub(r'<meta\s+name="description"\s+content="[^"]*"\s*/?>', f'<meta name="description" content="{html.escape(desc, quote=True)}">', source, count=1)
    source = re.sub(r'<link\s+rel="canonical"\s+href="[^"]+"\s*/?>', f'<link rel="canonical" href="{canonical}">', source, count=1)
    source = re.sub(r'\s*<link\s+rel="alternate"\s+hreflang="(?:tr|en|x-default)"\s+href="[^"]+"\s*/?>', '', source)
    alts = f'\n  <link rel="alternate" hreflang="en" href="{en_url}">\n  <link rel="alternate" hreflang="tr" href="{tr_url}">\n  <link rel="alternate" hreflang="x-default" href="{en_url}">'
    return source.replace(f'<link rel="canonical" href="{canonical}">', f'<link rel="canonical" href="{canonical}">{alts}', 1)


def set_nav(source: str, locale: str) -> str:
    if locale == "en":
        nav = '<nav class="primary-nav" aria-label="Primary navigation"><a href="/en/website-scanner">Free Check</a><a href="/en/ai-search-visibility">Solutions</a><a href="/en/llms-txt-news/">News</a><a href="/en/glossary">Glossary</a><a href="/en/pricing">Fix Mandate ($99)</a></nav>'
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/en/#scanner">Scan Free</a>', source, count=1, flags=re.S)
    else:
        nav = '<nav class="primary-nav" aria-label="Ana navigasyon"><a href="/tr/site-tarama/">Ücretsiz Kontrol</a><a href="/tr/yapay-zeka-arama-gorunurlugu/">Çözümler</a><a href="/tr/llms-txt-haberler/">Haberler</a><a href="/tr/sozluk/">Sözlük</a><a href="/tr/fiyatlandirma/">Onarım Seti ($99)</a></nav>'
        source = re.sub(r'<a class="nav-scan-cta" href="[^"]+">.*?</a>', '<a class="nav-scan-cta" href="/tr/#scanner">Ücretsiz Kontrol</a>', source, count=1, flags=re.S)
    return re.sub(r'<nav class="primary-nav"[^>]*>.*?</nav>', nav, source, count=1, flags=re.S)


def patch_locale_state(source: str, locale: str) -> str:
    source = source.replace("let currentLang = 'tr';", "let currentLang = document.documentElement.lang === 'tr' ? 'tr' : 'en';")
    source = source.replace("document.getElementById('btnLangTr').addEventListener('click', () => setLang('tr'));", "document.getElementById('btnLangTr').addEventListener('click', () => window.location.assign('/tr' + window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '')));")
    source = source.replace("document.getElementById('btnLangEn').addEventListener('click', () => setLang('en'));", "document.getElementById('btnLangEn').addEventListener('click', () => window.location.assign(window.location.pathname.replace(/^\\/tr(?=\\/|$)/, '') || '/'));")
    source = re.sub(r"const params = new URLSearchParams\(window\.location\.search\);\s*const qLang = params\.get\('lang'\) \|\| localStorage\.getItem\('ea-sample-lang'\);\s*if \(qLang === 'en'\) setLang\('en'\);", "setLang(document.documentElement.lang === 'tr' ? 'tr' : 'en');", source)
    if locale == 'en':
        source = source.replace('id="btnLangTr" type="button" class="lang-btn active"', 'id="btnLangTr" type="button" class="lang-btn"').replace('id="btnLangEn" type="button" class="lang-btn"', 'id="btnLangEn" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="tr" class="active"', 'button data-lang="tr"').replace('button data-lang="en">EN</button>', 'button data-lang="en" class="active">EN</button>')
    else:
        source = source.replace('id="btnLangEn" type="button" class="lang-btn active"', 'id="btnLangEn" type="button" class="lang-btn"').replace('id="btnLangTr" type="button" class="lang-btn"', 'id="btnLangTr" type="button" class="lang-btn active"')
        source = source.replace('button data-lang="en" class="active">EN</button>', 'button data-lang="en">EN</button>').replace('button data-lang="tr">TR</button>', 'button data-lang="tr" class="active">TR</button>')
    return source


def inject_commercial_contract(source: str, locale: str) -> str:
    if '/assets/css/commercial-intent.css?v=2' not in source:
        source = source.replace('</head>', '  <link rel="stylesheet" href="/assets/css/commercial-intent.css?v=2">\n</head>', 1)
    if 'data-commercial-intent="static"' not in source:
        if locale == 'tr':
            block = '''<section class="ai-opportunity" data-commercial-intent="static"><div class="ai-opportunity-shell"><span class="ai-opportunity-eyebrow">YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ</span><h2>Ölçülen bulguyu uygulama kararına bağlayın.</h2><p class="ai-opportunity-lead">Bu rapor aynı 18 motor, aynı skorlar ve aynı bulgularla çalışır; Türkçe yüzey yalnızca açıklama dilini değiştirir.</p><div class="ai-opportunity-actions"><a class="ai-opportunity-primary" href="/tr/site-tarama/">Ücretsiz Kontrol Et →</a><a class="ai-opportunity-secondary" href="/tr/fix-mandate/">Onarım Paketini Aç — $99 →</a></div><p class="ai-opportunity-guard">Sıralama, atıf, trafik veya gelir garantisi verilmez; yalnızca ölçülen site kaynaklı engeller raporlanır.</p></div></section>'''
        else:
            block = '''<section class="ai-opportunity" data-commercial-intent="static"><div class="ai-opportunity-shell"><span class="ai-opportunity-eyebrow">AI SEARCH VISIBILITY</span><h2>Turn measured findings into an implementation decision.</h2><p class="ai-opportunity-lead">This report uses the same 18 engines, scores and findings in both locales; the English surface changes presentation language only.</p><div class="ai-opportunity-actions"><a class="ai-opportunity-primary" href="/en/website-scanner/">Check Free →</a><a class="ai-opportunity-secondary" href="/en/fix-mandate/">Unlock Remediation Package — $99 →</a></div><p class="ai-opportunity-guard">Rankings, citations, traffic and revenue are not guaranteed; only measured website-side barriers are reported.</p></div></section>'''
        source = source.replace('<footer', block + '\n<footer', 1)
    return source


def inject_runtime(source: str, locale: str) -> str:
    source = re.sub(r'\s*<!-- EA_LOCALE_CONTRACT:[^>]*-->\s*', '\n', source)
    marker = f'<!-- EA_LOCALE_CONTRACT:{locale}:URL_SSOT -->'
    scripts = []
    if '/assets/js/theme.js' not in source:
        scripts.append('<script src="/assets/js/theme.js" defer></script>')
    if RUNTIME_SRC not in source:
        scripts.append(f'<script src="{RUNTIME_SRC}" defer></script>')
    payload = ('\n'.join(scripts) + '\n' if scripts else '') + marker + '\n'
    return source.replace('</body>', payload + '</body>', 1)


def visible_segments(source: str) -> list[str]:
    cleaned = SCRIPT_STYLE_RE.sub(' ', source)
    cleaned = re.sub(r'<!--.*?-->', ' ', cleaned, flags=re.S)
    out = []
    for raw in re.split(r'<[^>]+>', cleaned):
        text = re.sub(r'\s+', ' ', html.unescape(raw)).strip()
        if text: out.append(text)
    return out


def purity_leaks(source: str, locale: str) -> list[str]:
    segments = visible_segments(source); leaks = []
    if locale == 'en':
        markers = ('Ücretsiz', 'Çözümler', 'Haberler', 'Sözlük', 'Onarım', 'Hedef:', 'Ağırlık:', 'Tamamlandı', 'Yüksek', 'Orta', 'Düşük', 'Bilgi')
        leaks = [s for s in segments if TR_CHAR_RE.search(s) or any(m in s for m in markers)]
    else:
        markers = ('Free Check', 'Solutions', 'Glossary', 'Fix Mandate', 'Sample Report', 'Change Theme', 'Start Live Enterprise Scan', 'Attention Required', 'Critical Risk Detected', 'Target:', 'Weight:')
        leaks = [s for s in segments if any(m in s for m in markers)]
    return list(dict.fromkeys(leaks))


def build_page(template: str, filename: str, locale: str, en_path: str, tr_path: str, dictionary) -> str:
    out = localize_data_i18n(template, locale, dictionary)
    out = localize_bilingual_attrs(out, locale)
    out = translate_text_nodes(out, locale)
    out = set_head(out, filename, locale, en_path, tr_path)
    out = set_nav(out, locale)
    out = patch_locale_state(out, locale)
    out = inject_commercial_contract(out, locale)
    out = inject_runtime(out, locale)
    if f'<html lang="{locale}"' not in out: raise SystemExit(f'EA LOCALE CONTRACT FAIL: html lang mismatch {filename} {locale}')
    return out


def main() -> None:
    report = (EA / 'htmlandhtml-ai-report.html').read_text(encoding='utf-8')
    dictionary = extract_dict(report)
    if len(dictionary['en']) < 20 or len(dictionary['tr']) < 20: raise SystemExit('EA LOCALE CONTRACT FAIL: report dictionary unavailable')
    TR_EA.mkdir(parents=True, exist_ok=True)
    leaks_all = []
    for filename, en_path, tr_path in PAGES:
        src = EA / filename
        if not src.exists(): raise SystemExit(f'EA LOCALE CONTRACT FAIL: missing {src}')
        template = src.read_text(encoding='utf-8')
        en_html = build_page(template, filename, 'en', en_path, tr_path, dictionary)
        tr_html = build_page(template, filename, 'tr', en_path, tr_path, dictionary)
        src.write_text(en_html, encoding='utf-8'); (TR_EA / filename).write_text(tr_html, encoding='utf-8')
        for locale, output in (('en', en_html), ('tr', tr_html)):
            leaks = purity_leaks(output, locale)
            if leaks: leaks_all.append((filename, locale, leaks))
    if leaks_all:
        lines = ['EA LOCALE PURITY FAIL — exhaustive visible leak inventory:']
        for filename, locale, leaks in leaks_all:
            lines.append(f'[{filename} {locale}] {len(leaks)} leak segment(s)')
            lines.extend('  - ' + x[:500] for x in leaks[:160])
        raise SystemExit('\n'.join(lines))
    print('EA LOCALE CONTRACT PASS: URL SSOT + EN/TR purity + parallel materialization verified')
