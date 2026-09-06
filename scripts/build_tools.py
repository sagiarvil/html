import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')
    print(f"Generated Tool: {rel_path}")

from build_full_site import get_header, get_footer

tools_data = [
    {
        "id": "website-scanner",
        "en_slug": "website-scanner",
        "tr_slug": "site-tarama",
        "categories": "crawl,technical,ai,llms,schema,performance,accessibility,security,trust,agent,conversion,links",
        "en": {
            "title": "Website Scanner — Full 12-Engine Site Audit | HTML&HTML",
            "desc": "Audit your website with 12 deterministic engines. Discover crawl, technical SEO, AI readiness, schema, performance, accessibility, security and link issues with evidence.",
            "kicker": "12-ENGINE WEBSITE SCANNER",
            "h1": "Complete evidence-based <em>website diagnosis.</em>",
            "sub": "Run all 12 independent diagnostic engines across up to 50 public HTML pages. Identify technical blockers, crawler restrictions and machine-readable discovery gaps.",
            "proof": ["12 Engines", "Up to 50 Pages", "Evidence Attached", "No Signup"],
            "tool_title": "Full website diagnosis",
            "tool_sub": "Enter a domain. The full 12-engine scanner executes and presents prioritized evidence.",
            "btn": "Scan website",
            "scope_eyebrow": "HTML&HTML / SCOPE",
            "scope_title": "Every layer of your public web surface.",
            "scope_sub": "From basic HTTP responses to generative engine accessibility and structured data integrity.",
            "c1_b": "01 / FOUNDATION", "c1_h": "Technical & Crawl Base", "c1_p": "HTTP state, canonical rules, redirect chains, robots.txt, sitemap and indexability checks.",
            "c2_b": "02 / AI & DISCOVERY", "c2_h": "AI & Agent Retrieval", "c2_p": "Bot-specific policies, llms.txt v2, OpenAPI declarations and JSON-LD schema parsing.",
            "c3_b": "03 / USER & TRUST", "c3_h": "Security & Experience", "c3_p": "HSTS, CSP, nosniff headers, WCAG accessibility baseline, content trust and link integrity.",
            "lim_title": "What this scanner does not do",
            "lim_p1": "Does not fabricate Core Web Vitals from raw HTML fetches. Real field data requires CrUX; otherwise returns NOT_MEASURED.",
            "lim_p2": "Does not sell false promises or guarantee search engine or ChatGPT ranking outcomes.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("What is the difference between this and Lighthouse?", "Lighthouse evaluates synthetic browser performance on a single URL. HTML&HTML crawls up to 50 pages across 12 deterministic engines including AI crawlers, llms.txt, schema, and security."),
                ("Why is implementation detail locked?", "Evidence is free so you know what is broken and where. The $149 Fix Mandate provides root causes, implementation order, regression tests, and rollback plans for your engineering team."),
                ("How are private networks protected?", "Localhost, private IP ranges, cloud metadata endpoints, and redirect pivots into private addresses fail closed before any socket connection.")
            ],
            "cta_title": "Turn free diagnosis into code changes.",
            "cta_sub": "The $149 Full Site Fix Mandate delivers prioritized root fixes, acceptance tests, and a 30-day re-scan.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Web Sitesi Tarayıcısı — 12 Motorlu Tam Site Denetimi | HTML&HTML",
            "desc": "Web sitenizi 12 analiz motoruyla ücretsiz tarayın. Teknik SEO, AI hazırlığı, schema, performans, erişilebilirlik, güvenlik ve link sorunlarını kanıtıyla görün.",
            "kicker": "12 MOTORLU WEB SİTESİ TARAYICISI",
            "h1": "Kanıta dayalı eksiksiz <em>web sitesi teşhisi.</em>",
            "sub": "En fazla 50 herkese açık HTML sayfasını 12 bağımsız analiz motoruyla tarayın. Teknik engelleri, bot kısıtlamalarını ve makine-okunabilir veri eksikliklerini tespit edin.",
            "proof": ["12 Analiz Motoru", "50 Sayfa Sınırı", "Doğrulanmış Kanıt", "Kayıt Gerekmez"],
            "tool_title": "Ücretsiz tam web sitesi taraması",
            "tool_sub": "Alan adını girin. 12 motor çalışır ve önceliklendirilmiş kanıtları listeler.",
            "btn": "Siteyi tara",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Herkese açık web yüzeyinizin tüm katmanları.",
            "scope_sub": "Temel HTTP yanıtlarından üretken yapay zeka erişilebilirliğine ve yapısal veri bütünlüğüne kadar.",
            "c1_b": "01 / TEMEL", "c1_h": "Teknik ve Tarama Temeli", "c1_p": "HTTP yanıtları, kanonik kurallar, yönlendirme zincirleri, robots.txt, sitemap ve dizine eklenebilirlik kontrolleri.",
            "c2_b": "02 / AI VE KEŞİF", "c2_h": "AI ve Ajan Erişimi", "c2_p": "Bot bazlı politikalar, llms.txt v2, OpenAPI tanımları ve JSON-LD şema çözümleme.",
            "c3_b": "03 / KULLANICI VE GÜVEN", "c3_h": "Güvenlik ve Deneyim", "c3_p": "HSTS, CSP, nosniff başlıkları, WCAG erişilebilirlik temeli, içerik güveni ve bağlantı sağlığı.",
            "lim_title": "Bu tarayıcının yapmadığı şeyler",
            "lim_p1": "Ham HTML çekiminden sahte Core Web Vitals üretmez. Gerçek saha verisi yoksa NOT_MEASURED döner.",
            "lim_p2": "Arama motoru sıralaması veya ChatGPT atıf garantisi gibi asılsız vaatlerde bulunmaz.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("Lighthouse ile farkı nedir?", "Lighthouse tek bir URL üzerinde sentetik tarayıcı performansı ölçer. HTML&HTML ise 50 sayfaya kadar tarama yaparak AI botları, llms.txt, şema, güvenlik ve link bütünlüğü dahil 12 motoru çalıştırır."),
                ("Uygulama reçetesi neden kilitli?", "Sorunun ne olduğu ve kanıtı ücretsizdir. $149 Fix Mandate ise mühendislik ekibiniz veya AI kodlama ajanınız için kök nedenleri, uygulama sırasını, testleri ve geri alma planlarını sunar."),
                ("Özel ağlar nasıl korunur?", "Localhost, özel IP blokları, AWS metadata adresleri ve yönlendirme ile özel ağa sızma girişimleri donanımsal olarak engellenir (fail-closed).")
            ],
            "cta_title": "Ücretsiz teşhisi kesin kod değişikliklerine dönüştürün.",
            "cta_sub": "$149 Full Site Fix Mandate, önceliklendirilmiş kök düzeltmeler, kabul testleri ve 30 günlük yeniden tarama sağlar.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "ai-website-readiness",
        "en_slug": "ai-website-readiness",
        "tr_slug": "ai-website-readiness",
        "categories": "crawl,technical,ai,llms,schema,performance,accessibility,security,trust,agent,conversion,links",
        "en": {
            "title": "AI Website Readiness Checker — LLM & Search Agent Audit | HTML&HTML",
            "desc": "Check your website AI readiness. Measure crawler policies, llms.txt v2, JSON-LD entities, OpenAPI machine interfaces and content authority with deterministic evidence.",
            "kicker": "WEBSITE AI READINESS INDEX",
            "h1": "Is your site ready for <em>AI agents and retrieval?</em>",
            "sub": "Modern search engines and AI assistants inspect more than keywords. HTML&HTML audits machine readability, agent discovery and crawler governance with public evidence.",
            "proof": ["LLM Discovery", "Agent Contracts", "Entity Schemas", "Zero Fabrication"],
            "tool_title": "Free AI website readiness audit",
            "tool_sub": "Enter a domain to measure your site readiness across all 12 engines.",
            "btn": "Check readiness",
            "scope_eyebrow": "HTML&HTML / READINESS",
            "scope_title": "Three pillars of generative engine optimization.",
            "scope_sub": "Crawlability, semantic comprehension, and verifiable machine interfaces.",
            "c1_b": "01 / CRAWL", "c1_h": "Bot Access Governance", "c1_p": "Verifies that AI training crawlers and real-time search bots have explicit, non-conflicting robots.txt rules.",
            "c2_b": "02 / SEMANTICS", "c2_h": "Structured Knowledge", "c2_p": "Evaluates Schema.org JSON-LD entities, breadcrumbs, authors, and canonical relationships.",
            "c3_b": "03 / INTERFACES", "c3_h": "Machine Endpoints", "c3_p": "Inspects llms.txt, Markdown alternate links, OpenAPI declarations, and rel=describedby discovery.",
            "lim_title": "Epistemic boundary: No fake readiness scores",
            "lim_p1": "We do not claim 100% readiness guarantees ChatGPT citations. Citations depend on model training and search relevance.",
            "lim_p2": "We do not invent fake MCP or A2A capabilities just to artificially inflate scores.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("What is Website AI Readiness?", "Website AI Readiness is the technical state of a site that allows AI models and autonomous agents to crawl, understand, and cite its content accurately."),
                ("Does llms.txt guarantee AI visibility?", "No. llms.txt is an evolving proposal that guides LLMs to clean markdown documentation. It is evaluated with appropriate weight under PROPOSAL status."),
                ("Can I fix readiness issues myself?", "Yes. The free audit provides exact issues, affected URLs, and evidence snippets. For automated remediation contracts, use the $149 Fix Mandate.")
            ],
            "cta_title": "Get your implementation-grade Fix Mandate.",
            "cta_sub": "Turn readiness gaps into sequenced PRs with acceptance tests and rollback conditions.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "AI Web Sitesi Hazırlık Denetimi — LLM ve Ajan Erişimi | HTML&HTML",
            "desc": "Web sitenizin AI hazırlık seviyesini ölçün. Tarayıcı politikaları, llms.txt v2, JSON-LD varlıkları, OpenAPI arayüzleri ve içerik güvenini kanıtıyla görün.",
            "kicker": "WEB SİTESİ AI HAZIRLIK ENDEKSİ",
            "h1": "Siteniz yapay zeka ajanlarına <em>gerçekten hazır mı?</em>",
            "sub": "Modern arama motorları ve AI asistanları yalnızca anahtar kelimelere bakmaz. HTML&HTML, makine tarafından okunabilirliği, ajan keşfini ve bot izinlerini doğrulanmış kanıtlarla denetler.",
            "proof": ["LLM Keşfedilebilirliği", "Ajan Sözleşmeleri", "Varlık Şemaları", "Sıfır Sahte Veri"],
            "tool_title": "Ücretsiz AI hazırlık denetimi",
            "tool_sub": "12 analiz motoru genelinde sitenizin yapay zeka hazırlığını ölçmek için alan adınızı girin.",
            "btn": "Hazırlığı denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Üretken motor optimizasyonunun üç temel ayağı.",
            "scope_sub": "Taranabilirlik, anlamsal kavrayış ve doğrulanabilir makine arayüzleri.",
            "c1_b": "01 / TARAMA", "c1_h": "Bot Erişim Yönetimi", "c1_p": "AI eğitim tarayıcıları ve gerçek zamanlı arama botlarının robots.txt içinde net ve çelişkisiz kurallara sahip olduğunu doğrular.",
            "c2_b": "02 / ANLAM", "c2_h": "Yapılandırılmış Bilgi", "c2_p": "Schema.org JSON-LD varlıklarını, içerik hiyerarşisini, yazarları ve kanonik ilişkileri analiz eder.",
            "c3_b": "03 / ARAYÜZLER", "c3_h": "Makine Uç Noktaları", "c3_p": "llms.txt, Markdown alternatif bağlantıları, OpenAPI tanımları ve rel=describedby keşif zincirini inceler.",
            "lim_title": "Epistemik sınır: Sahte hazırlık puanı üretilmez",
            "lim_p1": "%100 hazırlık puanının ChatGPT veya Claude atıflarını garanti ettiği iddia edilmez. Atıflar model eğitimine ve arama alaka düzeyine bağlıdır.",
            "lim_p2": "Puanı yapay olarak yükseltmek için sahte MCP veya A2A desteği uydurulmaz.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("Web Sitesi AI Hazırlığı nedir?", "Bir web sitesinin yapay zeka modelleri ve otonom ajanlar tarafından sorunsuz taranmasını, anlaşılmasını ve doğru kaynak gösterilmesini sağlayan teknik altyapı durumudur."),
                ("llms.txt AI görünürlüğünü garanti eder mi?", "Hayır. llms.txt, LLM'lere temiz dokümantasyon sunan gelişmekte olan bir öneridir. ÖNERİ statüsünde dengeli bir ağırlıkla puanlanır."),
                ("Bulunan sorunları kendim düzeltebilir miyim?", "Evet. Ücretsiz tarama sorunları, etkilenen URL'leri ve kanıt parçalarını açıkça gösterir. Otomatik onarım sözleşmesi için $149 Fix Mandate tercih edilir.")
            ],
            "cta_title": "Uygulama-grade Fix Mandate edinin.",
            "cta_sub": "AI hazırlık açıklarını kabul testleri ve geri alma koşullarıyla sıralı PR'lara dönüştürün.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "llms-txt-validator",
        "en_slug": "llms-txt-validator",
        "tr_slug": "llms-txt-validator",
        "categories": "llms,ai,links",
        "en": {
            "title": "llms.txt Validator — v2 Spec, Markdown & Describedby Check | HTML&HTML",
            "desc": "Validate your /llms.txt and /llms-full.txt files for free. Check markdown syntax, link reachability, rel=describedby discovery and AI bot access with evidence.",
            "kicker": "LLMS.TXT V2 SPECIFICATION VALIDATOR",
            "h1": "Validate your llms.txt against <em>real specification rules.</em>",
            "sub": "Verify formatting, H1 titles, blockquotes, section lists, link reachability, and rel=describedby headers for /llms.txt and /llms-full.txt without false claims.",
            "proof": ["v2 Specification", "Link Reachability", "rel=describedby", "Strict Grammar"],
            "tool_title": "Free llms.txt validation",
            "tool_sub": "Enter a domain to test /llms.txt discovery, syntax, and link reachability.",
            "btn": "Validate llms.txt",
            "scope_eyebrow": "HTML&HTML / LLMS.TXT",
            "scope_title": "Precise syntax, link health, and agent discovery.",
            "scope_sub": "Evaluated with proposal-grade governance according to official community specifications.",
            "c1_b": "01 / SYNTAX", "c1_h": "Header & Structure", "c1_p": "Verifies single H1, blockquote summary, and formatted markdown section lists.",
            "c2_b": "02 / LINKS", "c2_h": "Link Probe Verification", "c2_p": "Probes linked documentation URLs to ensure they return HTTP 200 without broken redirects.",
            "c3_b": "03 / DISCOVERY", "c3_h": "HTTP & HTML Discovery", "c3_p": "Checks rel=describedby Link headers and HTML link elements pointing to your llms.txt file.",
            "lim_title": "Honest standard governance",
            "lim_p1": "llms.txt is an evolving community proposal, NOT an official IETF or W3C web standard. We never claim it guarantees AI rankings.",
            "lim_p2": "We test real HTTP status codes on linked files rather than guessing their existence.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("What is the difference between llms.txt and llms-full.txt?", "llms.txt serves as a concise directory of curated markdown links, while llms-full.txt contains the aggregated full text of documentation for direct model ingestion."),
                ("How should llms.txt be discovered?", "Through root placement (/llms.txt) and via rel='describedby' Link headers or link elements on key HTML pages."),
                ("Why did my llms.txt fail validation?", "Common causes include missing H1, missing blockquote summary, unbulleted link entries, or linked URLs returning 404/500 errors.")
            ],
            "cta_title": "Fix your llms.txt architecture with precision.",
            "cta_sub": "Get exact file structures, clean link inventories, and validation tests with the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "llms.txt Doğrulayıcı — v2 Şartnamesi, Markdown ve Keşif Kontrolü | HTML&HTML",
            "desc": "/llms.txt ve /llms-full.txt dosyalarınızı ücretsiz doğrulayın. Markdown sözdizimi, link erişilebilirliği, rel=describedby keşfi ve AI bot izinlerini kanıtıyla görün.",
            "kicker": "LLMS.TXT V2 ŞARTNAME DOĞRULAYICISI",
            "h1": "llms.txt dosyanızı <em>gerçek şartname kurallarıyla</em> doğrulayın.",
            "sub": "/llms.txt ve /llms-full.txt için format, H1 başlığı, özet alıntı bloğu, bölüm listeleri, link erişilebilirliği ve rel=describedby başlıklarını sahte iddialar olmadan denetleyin.",
            "proof": ["v2 Şartnamesi", "Link Erişimi", "rel=describedby", "Katı Gramer"],
            "tool_title": "Ücretsiz llms.txt doğrulama",
            "tool_sub": "/llms.txt keşfini, sözdizimini ve bağlantı sağlığını test etmek için alan adı girin.",
            "btn": "llms.txt doğrula",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Hassas sözdizimi, link sağlığı ve ajan keşfi.",
            "scope_sub": "Resmi topluluk spesifikasyonlarına göre ÖNERİ statüsünde dengeli bir şekilde değerlendirilir.",
            "c1_b": "01 / SÖZDİZİMİ", "c1_h": "Başlık ve Yapı", "c1_p": "Tekil H1 başlığını, özet blok alıntısını ve maddeli markdown bağlantı listelerini doğrular.",
            "c2_b": "02 / LİNKLER", "c2_h": "Link Erişilebilirlik Testi", "c2_p": "Listelenen bağlantı URL'lerini HTTP probe ile kontrol ederek 404 veya kırık yönlendirmeleri tespit eder.",
            "c3_b": "03 / KEŞİF", "c3_h": "HTTP ve HTML Keşfi", "c3_p": "HTML içinde ve HTTP Link başlıklarında rel=describedby ile llms.txt dosyasının işaret edildiğini denetler.",
            "lim_title": "Dürüst standart yönetişimi",
            "lim_p1": "llms.txt resmi bir IETF veya W3C standardı değil, gelişmekte olan bir topluluk önerisidir. Sıralama garantisi gibi sunulmaz.",
            "lim_p2": "Linklerin varlığı tahmin edilmez; gerçek HTTP istekleri ile canlıda doğrulanır.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("llms.txt ile llms-full.txt arasındaki fark nedir?", "llms.txt seçilmiş markdown bağlantılarından oluşan özlü bir dizindir; llms-full.txt ise modellerin tek seferde okuyabilmesi için tüm içeriğin birleştirilmiş halidir."),
                ("llms.txt nasıl keşfedilir?", "Kök dizinde bulunarak (/llms.txt) ve HTML sayfalarında rel='describedby' etiketiyle belirtilerek."),
                ("llms.txt doğrulamasından neden kalınır?", "Eksik H1, blok alıntı özeti eksikliği, maddesiz linkler veya link verilen sayfaların 404 dönmesi en sık görülen hatalardır.")
            ],
            "cta_title": "llms.txt mimarinizi kesin kurallarla düzeltin.",
            "cta_sub": "$149 Fix Mandate ile temiz dosya yapıları, çalışan linkler ve doğrulama testleri edinin.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "ai-crawler-checker",
        "en_slug": "ai-crawler-checker",
        "tr_slug": "ai-crawler-checker",
        "categories": "ai,crawl",
        "en": {
            "title": "AI Crawler Checker — Robots.txt Policy & Bot Access | HTML&HTML",
            "desc": "Check AI crawler access for free. Inspect OAI-SearchBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended and fallback robots.txt rules with evidence.",
            "kicker": "AI CRAWLER ACCESS CHECKER",
            "h1": "Can AI crawlers <em>actually reach your site?</em>",
            "sub": "A robots.txt file existing is not enough. HTML&HTML measures bot-specific allow/disallow behavior, crawl barriers and related AI/GEO access signals from real public responses.",
            "proof": ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"],
            "tool_title": "Free AI crawler access check",
            "tool_sub": "Enter a domain. The scan isolates crawl and AI-access evidence.",
            "btn": "Check access",
            "scope_eyebrow": "HTML&HTML / CRAWLERS",
            "scope_title": "One robots.txt verdict is not enough.",
            "scope_sub": "AI access is evaluated across base crawlability, bot policies, and discovery surfaces.",
            "c1_b": "01 / BASE ACCESS", "c1_h": "HTTP & Indexability", "c1_p": "HTTP status codes, redirect chains, sitemaps and noindex headers are evaluated together.",
            "c2_b": "02 / BOT POLICIES", "c2_h": "Bot-Specific Governance", "c2_p": "Evaluates training crawlers vs search crawlers separately, including fallback wildcard groups.",
            "c3_b": "03 / DISCOVERY", "c3_h": "Agent Discovery Layer", "c3_p": "Ensures AI crawler permissions and content guidance are decoupled and correctly signaled.",
            "lim_title": "What this check does not assume",
            "lim_p1": "Allowing AI bots does not guarantee inclusion in ChatGPT answers or search citations.",
            "lim_p2": "We do not simulate behind-the-login or authenticated crawler sessions.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("What is the difference between GPTBot and OAI-SearchBot?", "GPTBot collects data for model training, whereas OAI-SearchBot powers real-time search queries inside ChatGPT Search."),
                ("Should I block all AI crawlers?", "Blocking all crawlers prevents both model training and citation in AI search engines. A granular policy is generally recommended."),
                ("How does HTML&HTML test robots.txt?", "It parses the canonical robots.txt according to RFC 9309 and evaluates specific user-agent rules against public URLs.")
            ],
            "cta_title": "Prove the claim 'AI can access us.'",
            "cta_sub": "Convert robots, header, and redirect findings into implementation contracts with tests and rollback.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "AI Tarayıcı Kontrolü — Robots.txt ve Bot Erişim Denetimi | HTML&HTML",
            "desc": "AI bot erişimini ücretsiz denetleyin. OAI-SearchBot, Claude-SearchBot, PerplexityBot, Google-Extended ve robots.txt kurallarını kanıtıyla görün.",
            "kicker": "AI TARAYICI ERİŞİM KONTROLÜ",
            "h1": "AI botları sitenize <em>gerçekten erişebiliyor mu?</em>",
            "sub": "Sadece bir robots.txt dosyasının bulunması yetersizdir. HTML&HTML, bot bazlı izin ve engelleme kurallarını, tarama engellerini ve AI erişim sinyallerini canlı yanıtlarla ölçer.",
            "proof": ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"],
            "tool_title": "Ücretsiz AI tarayıcı erişim kontrolü",
            "tool_sub": "Alan adını girin. Tarama, tarama ve yapay zeka erişim kanıtlarını izole eder.",
            "btn": "Erişimi denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Tek bir robots.txt sonucu yeterli değildir.",
            "scope_sub": "Yapay zeka erişimi; temel taranabilirlik, bot politikaları ve keşif katmanları üzerinden değerlendirilir.",
            "c1_b": "01 / TEMEL ERİŞİM", "c1_h": "HTTP ve İndekslenebilirlik", "c1_p": "HTTP durum kodları, yönlendirme zincirleri, sitemap ve noindex başlıkları birlikte incelenir.",
            "c2_b": "02 / BOT POLİTİKALARI", "c2_h": "Bot Bazlı Yönetişim", "c2_p": "Eğitim botları ve gerçek zamanlı arama botları, joker karakter (*) kuralları dahil ayrı ayrı değerlendirilir.",
            "c3_b": "03 / KEŞİF", "c3_h": "Ajan Keşif Katmanı", "c3_p": "Tarayıcı izinleri ile içerik kılavuzlarının birbirine karışmadığını ve doğru sinyallendiğini doğrular.",
            "lim_title": "Bu denetimin varsaymadığı şeyler",
            "lim_p1": "Botlara izin verilmesi, ChatGPT yanıtlarında veya arama alıntılarında yer almayı garanti etmez.",
            "lim_p2": "Giriş yapılmış veya kimlik doğrulaması gerektiren oturumlar simüle edilmez.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("GPTBot ile OAI-SearchBot arasındaki fark nedir?", "GPTBot model eğitimi için veri toplar; OAI-SearchBot ise ChatGPT Search içindeki gerçek zamanlı arama sorgularını besler."),
                ("Tüm AI tarayıcılarını engellemeli miyim?", "Tüm tarayıcıları engellemek hem eğitimi hem de AI arama motorlarında kaynak gösterilmeyi engeller. Katmanlı bir politika önerilir."),
                ("HTML&HTML robots.txt dosyasını nasıl test eder?", "RFC 9309 standartlarına göre robots.txt ayrıştırılır ve herkese açık sayfalar için bot kuralları canlıda test edilir.")
            ],
            "cta_title": "'AI bize erişebiliyor' iddiasını kanıtlayın.",
            "cta_sub": "Robots, header ve yönlendirme bulgularını testler ve geri alma adımlarıyla uygulama sözleşmesine dönüştürün.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "schema-validator",
        "en_slug": "schema-validator",
        "tr_slug": "schema-validator",
        "categories": "schema,technical",
        "en": {
            "title": "Schema Validator — JSON-LD & Entity Structured Data | HTML&HTML",
            "desc": "Validate JSON-LD structured data and entity relationships for free. Detect syntax errors, broken schema blocks and missing entity properties with evidence.",
            "kicker": "JSON-LD & ENTITY SCHEMA VALIDATOR",
            "h1": "Validate your structured data for <em>neural entity extraction.</em>",
            "sub": "Modern LLMs and search engines parse Schema.org JSON-LD to understand organizations, products, articles, and authors. Catch syntax and type errors deterministically.",
            "proof": ["JSON-LD Parsing", "Schema.org Types", "Entity Linking", "Zero Guesswork"],
            "tool_title": "Free schema structured data check",
            "tool_sub": "Enter a domain to parse all JSON-LD and structured data blocks.",
            "btn": "Validate schema",
            "scope_eyebrow": "HTML&HTML / SCHEMA",
            "scope_title": "Syntactic validity and entity depth.",
            "scope_sub": "We parse raw JSON-LD blocks directly from crawled HTML without executing arbitrary scripts.",
            "c1_b": "01 / SYNTAX", "c1_h": "JSON Parsing", "c1_p": "Catches unescaped characters, malformed JSON, and invalid script tags embedding structured data.",
            "c2_b": "02 / TYPES", "c2_h": "Schema.org Conformance", "c2_p": "Validates core types including Organization, WebSite, Article, Product, and BreadcrumbList.",
            "c3_b": "03 / RELATIONS", "c3_h": "Entity Graph", "c3_p": "Checks author, publisher, and publisher logo linkages that build knowledge graph clarity.",
            "lim_title": "Epistemic boundaries",
            "lim_p1": "Valid schema does not guarantee rich snippets on Google; search engines decide snippet display algorithmically.",
            "lim_p2": "We do not validate proprietary custom vocabularies outside standard Schema.org.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("Why is JSON-LD preferred over Microdata?", "JSON-LD is decoupled from HTML presentation, easier to maintain, and the format recommended by Google and modern AI systems."),
                ("Does broken schema break my website?", "It won't break page rendering, but it causes search engines and AI agents to discard your semantic entities entirely."),
                ("Can I test raw HTML schema blocks?", "Yes, the homepage direct HTML paste tab allows testing raw snippets directly.")
            ],
            "cta_title": "Implement clean, error-free entity schemas.",
            "cta_sub": "Fix broken schema blocks with exact code fixes and validation tests in the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Yapısal Veri Kontrolü — JSON-LD ve Schema Doğrulayıcı | HTML&HTML",
            "desc": "JSON-LD yapısal verilerini ve varlık ilişkilerini ücretsiz doğrulayın. Sözdizimi hatalarını, bozuk şema bloklarını ve eksik özellikleri kanıtıyla görün.",
            "kicker": "JSON-LD VE VARLIK ŞEMA DOĞRULAYICISI",
            "h1": "Yapısal verilerinizi <em>anlamsal varlık çıkarımı için</em> doğrulayın.",
            "sub": "Modern LLM'ler ve arama motorları kurumları, ürünleri, makaleleri ve yazarları anlamak için Schema.org JSON-LD bloklarını okur. Sözdizimi ve tip hatalarını kesin kanıtlarla yakalayın.",
            "proof": ["JSON-LD Ayrıştırma", "Schema.org Tipleri", "Varlık İlişkileri", "Sıfır Tahmin"],
            "tool_title": "Ücretsiz yapısal veri denetimi",
            "tool_sub": "Sitedeki tüm JSON-LD ve yapısal veri bloklarını ayrıştırmak için alan adı girin.",
            "btn": "Şemayı doğrula",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Sözdizimsel geçerlilik ve anlamsal derinlik.",
            "scope_sub": "Taranan HTML içindeki ham JSON-LD blokları harici script çalıştırmadan güvenle ayrıştırılır.",
            "c1_b": "01 / SÖZDİZİMİ", "c1_h": "JSON Ayrıştırma", "c1_p": "Kaçış karakteri eksikliklerini, bozuk JSON yapılarını ve geçersiz script bloklarını tespit eder.",
            "c2_b": "02 / TİPLER", "c2_h": "Schema.org Uyumu", "c2_p": "Organization, WebSite, Article, Product ve BreadcrumbList gibi temel şema tiplerini denetler.",
            "c3_b": "03 / İLİŞKİLER", "c3_h": "Varlık Grafı", "c3_p": "Yazar, yayıncı ve logo bağlantılarının bilgi grafı standartlarına uygunluğunu inceler.",
            "lim_title": "Epistemik sınırlar",
            "lim_p1": "Geçerli şema Google üzerinde zengin snippet garantisi vermez; gösterim arama motorunun algoritmasına bağlıdır.",
            "lim_p2": "Schema.org dışındaki özel sözlükler kapsam dışı tutulur.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("Neden Microdata yerine JSON-LD tercih edilmeli?", "JSON-LD görsel HTML kodundan bağımsızdır, bakımı kolaydır ve Google ile modern yapay zeka sistemlerinin önerdiği formattır."),
                ("Bozuk şema siteyi bozar mı?", "Görsel tasarımı bozmaz ancak arama motorlarının ve AI ajanlarının anlamsal varlıklarınızı tamamen yok saymasına yol açar."),
                ("Ham HTML şeması test edebilir miyim?", "Evet, ana sayfadaki doğrudan HTML yapıştırma sekmesiyle ham kod bloklarını tarayabilirsiniz.")
            ],
            "cta_title": "Hatasız ve temiz varlık şemaları uygulayın.",
            "cta_sub": "$149 Fix Mandate ile bozuk şema bloklarını doğrudan çalışan kod parçaları ve testlerle düzeltin.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "technical-seo-checker",
        "en_slug": "technical-seo-checker",
        "tr_slug": "teknik-seo-kontrol",
        "categories": "technical,crawl,links",
        "en": {
            "title": "Technical SEO Checker — Canonical, Meta & Indexability Audit | HTML&HTML",
            "desc": "Check technical SEO health for free. Audit titles, meta descriptions, single H1 rules, canonical tags, OpenGraph and route-level indexability with evidence.",
            "kicker": "TECHNICAL SEO INTEGRITY CHECKER",
            "h1": "Technical SEO audited with <em>deterministic evidence.</em>",
            "sub": "Identify duplicate titles, missing descriptions, multi-H1 violations, conflicting canonical URLs, and indexability traps across up to 50 public pages.",
            "proof": ["Canonical Integrity", "Single H1 Rule", "Meta Audit", "OpenGraph Data"],
            "tool_title": "Free technical SEO audit",
            "tool_sub": "Enter a domain to audit technical SEO and route health.",
            "btn": "Audit technical SEO",
            "scope_eyebrow": "HTML&HTML / TECHNICAL SEO",
            "scope_title": "No opinions. Measured HTML facts.",
            "scope_sub": "Checks are tied to standard search engine webmaster documentation and RFC protocols.",
            "c1_b": "01 / TITLES & META", "c1_h": "Document Metadata", "c1_p": "Verifies title lengths, unique meta descriptions, and viewport declarations.",
            "c2_b": "02 / CANONICALS", "c2_h": "URL Deduplication", "c2_p": "Checks self-canonical consistency, parameter stripping, and canonical protocol matching.",
            "c3_b": "03 / HEADINGS", "c3_h": "Semantic Hierarchy", "c3_p": "Ensures exactly one primary H1 exists per indexable page without structural heading skipping.",
            "lim_title": "Boundaries of technical SEO scanning",
            "lim_p1": "We do not claim keyword density or semantic content scores. Technical SEO evaluates infrastructure integrity.",
            "lim_p2": "We do not audit private staging environments requiring VPN or Basic Auth.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("Why is a single H1 important?", "A single primary H1 clearly signals the core topic of a document to search engines and screen readers."),
                ("How are canonical loops detected?", "Our crawler follows canonical declarations up to safe boundaries and flags circular or broken canonical targets."),
                ("Does this audit include mobile friendliness?", "Yes, viewport tags and mobile accessibility baselines are included.")
            ],
            "cta_title": "Fix your technical SEO foundations.",
            "cta_sub": "Receive prioritized code modifications with tests and rollback safeguards with the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Teknik SEO Denetimi — Kanonik, Meta ve İndekslenebilirlik | HTML&HTML",
            "desc": "Teknik SEO sağlığınızı ücretsiz denetleyin. Başlıklar, meta açıklamaları, tek H1 kuralı, kanonik etiketler ve OpenGraph verilerini kanıtıyla görün.",
            "kicker": "TEKNİK SEO BÜTÜNLÜK DENETİMİ",
            "h1": "Teknik SEO sorunlarını <em>deterministik kanıtlarla</em> tespit edin.",
            "sub": "50 sayfaya kadar yinelenen başlıkları, eksik açıklamaları, birden fazla H1 kullanımını, çelişkili kanonik URL'leri ve dizine ekleme engellerini kanıtlarıyla görün.",
            "proof": ["Kanonik Bütünlüğü", "Tek H1 Kuralı", "Meta Denetimi", "OpenGraph Verisi"],
            "tool_title": "Ücretsiz teknik SEO denetimi",
            "tool_sub": "Teknik SEO ve rota sağlığını denetlemek için alan adı girin.",
            "btn": "Teknik SEO'yu denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Yorum yok. Ölçülen HTML gerçekleri.",
            "scope_sub": "Kontroller doğrudan resmi arama motoru yönergelerine ve RFC protokollerine bağlıdır.",
            "c1_b": "01 / BAŞLIK VE META", "c1_h": "Belge Meta Verileri", "c1_p": "Başlık uzunluklarını, benzersiz meta açıklamalarını ve viewport tanımlarını inceler.",
            "c2_b": "02 / KANONİK ETİKET", "c2_h": "URL Tekilleştirme", "c2_p": "Kendi kendine kanonik doğruluğunu, parametre temizliğini ve protokol eşleşmesini doğrular.",
            "c3_b": "03 / BAŞLIK HİYERARŞİSİ", "c3_h": "Semantik Sıralama", "c3_p": "Her dizine eklenebilir sayfada tam olarak bir adet ana H1 başlığı bulunduğunu denetler.",
            "lim_title": "Teknik SEO taramasının sınırları",
            "lim_p1": "Kelime yoğunluğu gibi geçersiz metrikler puanlanmaz; altyapı ve kod bütünlüğü değerlendirilir.",
            "lim_p2": "VPN veya şifre arkasındaki özel geliştirme ortamları taranmaz.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("Neden sayfada tek H1 olmalı?", "Tek bir ana H1, belgenin birincil konusunu arama motorlarına ve ekran okuyuculara en net biçimde iletir."),
                ("Kanonik döngüler nasıl tespit edilir?", "Tarayıcımız kanonik hedefleri güvenli sınırlar içinde takip ederek döngüsel veya geçersiz kanonikleri raporlar."),
                ("Mobil uyumluluk dahil mi?", "Evet, viewport tanımları ve mobil erişilebilirlik kontrolleri analiz kapsamındadır.")
            ],
            "cta_title": "Teknik SEO temellerinizi sağlamlaştırın.",
            "cta_sub": "$149 Fix Mandate ile kabul testleri ve geri alma planları içeren öncelikli düzeltme sözleşmesi edinin.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "security-headers-checker",
        "en_slug": "security-headers-checker",
        "tr_slug": "guvenlik-basliklari-kontrol",
        "categories": "security",
        "en": {
            "title": "Security Headers Checker — HSTS, CSP & HTTPS Baseline | HTML&HTML",
            "desc": "Check security headers for free. Audit HSTS, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy and clickjacking defenses with evidence.",
            "kicker": "SECURITY BASELINE & HEADERS AUDIT",
            "h1": "Verify your website <em>production security headers.</em>",
            "sub": "Audit HTTP Strict Transport Security (HSTS), Content Security Policy (CSP), X-Frame-Options, and nosniff headers directly from public HTTP edge responses.",
            "proof": ["HSTS Preload", "CSP Validation", "Clickjacking Guard", "nosniff Enforcement"],
            "tool_title": "Free security headers audit",
            "tool_sub": "Enter a domain to inspect security headers from edge responses.",
            "btn": "Audit security headers",
            "scope_eyebrow": "HTML&HTML / SECURITY",
            "scope_title": "Hardened HTTP edge defenses.",
            "scope_sub": "Protects users, agents, and brand integrity from common browser-side injection and downgrade attacks.",
            "c1_b": "01 / TRANSPORT", "c1_h": "HSTS & Encryption", "c1_p": "Checks max-age, includeSubDomains, and preload readiness to prevent SSL stripping.",
            "c2_b": "02 / CONTENT POLICY", "c2_h": "CSP & Frame Guards", "c2_p": "Evaluates script-src, frame-ancestors, and object-src against clickjacking and XSS.",
            "c3_b": "03 / LEAKAGE", "c3_h": "MIME & Referrer", "c3_p": "Verifies nosniff enforcement and strict-origin-when-cross-origin referrer policies.",
            "lim_title": "Security scope boundaries",
            "lim_p1": "This audit does not perform invasive penetration testing, port scanning, or vulnerability exploitation.",
            "lim_p2": "We check public HTTP header hygiene without touching application business logic.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("What happens if HSTS is missing?", "Without HSTS, attackers on insecure Wi-Fi can downgrade HTTPS traffic to plain HTTP via SSL stripping attacks."),
                ("Why is nosniff critical?", "X-Content-Type-Options: nosniff stops browsers from MIME-sniffing a response away from the declared content-type, blocking script execution disguised as images."),
                ("Can I test local servers?", "No. To protect against SSRF, all private, loopback, and local network requests fail closed.")
            ],
            "cta_title": "Harden your server security headers.",
            "cta_sub": "Get copy-paste web server and CDN header configurations with verification tests in the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Güvenlik Başlıkları Kontrolü — HSTS, CSP ve Güvenlik Temeli | HTML&HTML",
            "desc": "Güvenlik başlıklarınızı ücretsiz denetleyin. HSTS, Content-Security-Policy, X-Content-Type-Options, Referrer-Policy ve clickjacking korumasını kanıtıyla görün.",
            "kicker": "GÜVENLİK TEMELİ VE BAŞLIK DENETİMİ",
            "h1": "Web sitenizin <em>üretim güvenlik başlıklarını</em> doğrulayın.",
            "sub": "HSTS (HTTP Strict Transport Security), Content Security Policy (CSP), X-Frame-Options ve nosniff başlıklarını doğrudan canlı uç nokta yanıtlarından denetleyin.",
            "proof": ["HSTS Preload", "CSP Doğrulama", "Clickjacking Koruması", "nosniff Zorunluluğu"],
            "tool_title": "Ücretsiz güvenlik başlıkları denetimi",
            "tool_sub": "Canlı uç noktalardan güvenlik başlıklarını incelemek için alan adı girin.",
            "btn": "Güvenliği denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Güçlendirilmiş HTTP uç savunmaları.",
            "scope_sub": "Kullanıcıları, yapay zeka ajanlarını ve marka itibarını tarayıcı taraflı saldırılardan korur.",
            "c1_b": "01 / İLETİM", "c1_h": "HSTS ve Şifreleme", "c1_p": "max-age, includeSubDomains ve preload durumunu kontrol ederek SSL düşürme saldırılarını önler.",
            "c2_b": "02 / İÇERİK POLİTİKASI", "c2_h": "CSP ve Çerçeve Koruması", "c2_p": "script-src ve frame-ancestors kurallarını clickjacking ve XSS risklerine karşı denetler.",
            "c3_b": "03 / SIZINTI", "c3_h": "MIME ve Referrer", "c3_p": "nosniff zorunluluğunu ve strict-origin-when-cross-origin referrer politikasını doğrular.",
            "lim_title": "Güvenlik kapsam sınırları",
            "lim_p1": "Bu denetim sızma testi (penetration test), port taraması veya güvenlik açığı istismarı yapmaz.",
            "lim_p2": "İş mantığına dokunmadan yalnızca herkese açık HTTP başlık hijyeni kontrol edilir.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("HSTS eksikse ne olur?", "HSTS olmadan, güvensiz ağlardaki saldırganlar HTTPS trafiğini düz HTTP'ye düşürerek trafiği dinleyebilir (SSL stripping)."),
                ("nosniff neden kritiktir?", "X-Content-Type-Options: nosniff tarayıcının içerik türünü tahmin etmesini engeller; resim gibi görünen zararlı scriptlerin çalıştırılmasını durdurur."),
                ("Yerel sunucuları test edebilir miyim?", "Hayır. SSRF riskini önlemek için yerel ve özel ağ hedefleri donanımsal olarak reddedilir.")
            ],
            "cta_title": "Sunucu güvenlik başlıklarınızı güçlendirin.",
            "cta_sub": "$149 Fix Mandate ile Nginx, Cloudflare veya Apache için doğrudan uygulanabilir başlık yapılandırmaları edinin.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "accessibility-checker",
        "en_slug": "accessibility-checker",
        "tr_slug": "erisilebilirlik-kontrol",
        "categories": "accessibility",
        "en": {
            "title": "Accessibility Checker — WCAG Standards, Alt & Forms | HTML&HTML",
            "desc": "Check accessibility hygiene for free. Audit html lang attributes, image alt text, programmatic form labels and accessible names with evidence.",
            "kicker": "ACCESSIBILITY HYGIENE AUDIT",
            "h1": "Audit your website for <em>WCAG accessibility hygiene.</em>",
            "sub": "Inspect document language declarations, missing image alt attributes, unlabelled form inputs, and clickable div anti-patterns from crawled HTML.",
            "proof": ["WCAG Baseline", "Form Labels", "Alt Attributes", "html lang Tag"],
            "tool_title": "Free accessibility hygiene check",
            "tool_sub": "Enter a domain to check accessibility hygiene across public pages.",
            "btn": "Check accessibility",
            "scope_eyebrow": "HTML&HTML / ACCESSIBILITY",
            "scope_title": "Clean semantics for screen readers and AI agents.",
            "scope_sub": "Accessible HTML is fundamentally better understood by both assistive technology and neural crawlers.",
            "c1_b": "01 / DOCUMENT", "c1_h": "Language & Structure", "c1_p": "Verifies valid html lang attributes so text-to-speech engines use correct phonetic models.",
            "c2_b": "02 / MEDIA", "c2_h": "Image Descriptions", "c2_p": "Flags non-decorative images lacking alt attributes that blind screen reader users.",
            "c3_b": "03 / CONTROLS", "c3_h": "Form & Button Labels", "c3_p": "Identifies unlabelled inputs and div elements posing as clickable buttons without keyboard focus.",
            "lim_title": "Automated review boundaries",
            "lim_p1": "Automated tools catch 30–40% of WCAG defects. Manual assistive tech testing is still required for full compliance.",
            "lim_p2": "We do not claim automated 100% scores guarantee ADA or legal compliance.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("Why does html lang matter?", "Without html lang, screen readers may read English text with a French or Turkish pronunciation engine, making it unintelligible."),
                ("Should decorative images have alt text?", "Decorative images should have an empty alt='' attribute, not a missing alt attribute."),
                ("Why are button divs problematic?", "A div with an onclick handler cannot be navigated with Tab and activated with Enter/Space by keyboard users.")
            ],
            "cta_title": "Fix accessibility defects at the template level.",
            "cta_sub": "Resolve unlabelled inputs, broken headings, and missing attributes with the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Erişilebilirlik Denetimi — WCAG Standartları, Alt ve Form Kontrolü | HTML&HTML",
            "desc": "Erişilebilirlik hijyeninizi ücretsiz denetleyin. html lang öznitelikleri, görsel alt metinleri, form etiketleri ve erişilebilir isimleri kanıtıyla görün.",
            "kicker": "ERİŞİLEBİLİRLİK HİJYEN DENETİMİ",
            "h1": "Web sitenizi <em>WCAG erişilebilirlik hijyeni için</em> denetleyin.",
            "sub": "Belge dili tanımlarını, eksik resim alt özniteliklerini, etiketsiz form girdilerini ve buton yerine kullanılan div yapılarını taranan HTML üzerinden kontrol edin.",
            "proof": ["WCAG Temeli", "Form Etiketleri", "Resim Alt Metni", "html lang Etiketi"],
            "tool_title": "Ücretsiz erişilebilirlik denetimi",
            "tool_sub": "Herkese açık sayfalarda erişilebilirlik hijyenini denetlemek için alan adı girin.",
            "btn": "Erişilebilirliği denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Ekran okuyucular ve AI ajanları için temiz semantik.",
            "scope_sub": "Erişilebilir bir HTML yapısı hem yardımcı teknolojiler hem de yapay zeka ajanları tarafından çok daha net anlaşılır.",
            "c1_b": "01 / BELGE", "c1_h": "Dil ve Yapı", "c1_p": "Ekran okuyucuların doğru telaffuz kullanması için geçerli html lang tanımlarını doğrular.",
            "c2_b": "02 / MEDYA", "c2_h": "Görsel Açıklamaları", "c2_p": "Dekoratif olmayan ancak alt etiketi bulunmayan görselleri tespit eder.",
            "c3_b": "03 / KONTROLLER", "c3_h": "Form ve Buton Etiketleri", "c3_p": "Programatik etiketi olmayan form alanlarını ve klavye odağı bulunmayan sahte div butonları yakalar.",
            "lim_title": "Otomatik denetimin sınırları",
            "lim_p1": "Otomatik araçlar WCAG hatalarının yaklaşık %30–40'ını yakalayabilir. Tam uyum için manuel test gereklidir.",
            "lim_p2": "%100 puan yasal erişilebilirlik garantisi olarak sunulmaz.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("html lang neden kritiktir?", "html lang tanımlanmadığında ekran okuyucu Türkçe bir metni İngilizce fonetikle okuyabilir ve kullanıcı için anlamsız hale gelir."),
                ("Dekoratif resimlerin alt metni olmalı mı?", "Dekoratif resimlerde alt özniteliği boş bırakılmalıdır (alt=''), tamamen silinmemelidir."),
                ("Neden buton yerine div kullanılmamalı?", "Sadece onclick verilen bir div klavye kullanıcıları tarafından Tab ile seçilemez ve Enter ile tıklanamaz.")
            ],
            "cta_title": "Erişilebilirlik kusurlarını şablon düzeyinde düzeltin.",
            "cta_sub": "$149 Fix Mandate ile etiketsiz formları ve eksik erişilebilirlik özniteliklerini doğrudan kod seviyesinde çözün.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    },
    {
        "id": "link-integrity-checker",
        "en_slug": "link-integrity-checker",
        "tr_slug": "link-kontrol",
        "categories": "links,crawl",
        "en": {
            "title": "Link Integrity Checker — Broken Links & Redirect Chains | HTML&HTML",
            "desc": "Check internal link integrity for free. Probe internal links with real HTTP requests. Detect 404 errors, broken redirects and link equity leaks with evidence.",
            "kicker": "LINK INTEGRITY & REDIRECT CHECKER",
            "h1": "Probe internal link integrity with <em>real HTTP requests.</em>",
            "sub": "Catch 404 dead ends, 500 server crashes, circular redirects, and avoidable 301 hop chains across internal links discovered during public crawl.",
            "proof": ["Live HTTP Probes", "404 Detection", "Redirect Loops", "Real Status Codes"],
            "tool_title": "Free link integrity audit",
            "tool_sub": "Enter a domain to probe internal link health and catch broken paths.",
            "btn": "Check link integrity",
            "scope_eyebrow": "HTML&HTML / LINKS",
            "scope_title": "Zero broken paths for users and crawlers.",
            "scope_sub": "Links are proven with real HTTP probes, bounded to 30 live probes per scan to avoid server strain.",
            "c1_b": "01 / DEAD ENDS", "c1_h": "404 & 410 Errors", "c1_p": "Catches dead links pointing to deleted or mistyped internal pages that bleed user trust.",
            "c2_b": "02 / REDIRECTS", "c2_h": "Redirect Hop Chains", "c2_p": "Identifies internal links pointing to redirected URLs instead of their canonical destinations.",
            "c3_b": "03 / PROTOCOLS", "c3_h": "Mixed Protocol Links", "c3_p": "Flags HTTP links on HTTPS sites that cause needless redirects and mixed-content warnings.",
            "lim_title": "Bounded probe safety",
            "lim_p1": "To protect target servers from denial of service, live link probes are strictly bounded to 30 requests.",
            "lim_p2": "External third-party domain links are validated without deep recursive crawling.",
            "faq_title": "Frequently Asked Questions",
            "faqs": [
                ("Why are redirect chains bad for SEO?", "Each redirect hop adds latency, wastes crawler budget, and can cause search engine crawlers to drop the destination."),
                ("How does the crawler find internal links?", "It parses href attributes from crawled HTML pages and filters out mailto:, tel:, and javascript: pseudo-links."),
                ("Can I fix broken links automatically?", "The $149 Fix Mandate provides the exact source files and replacement URLs to update broken links in your codebase.")
            ],
            "cta_title": "Eliminate dead links and redirect latency.",
            "cta_sub": "Get an exact inventory of broken URLs and replacement targets with the $149 Fix Mandate.",
            "cta_btn": "Full Site Fix Mandate — $149"
        },
        "tr": {
            "title": "Link Kontrolü — Kırık Link ve Yönlendirme Denetimi | HTML&HTML",
            "desc": "İç link sağlığınızı ücretsiz denetleyin. Gerçek HTTP istekleriyle kırık linkleri, 404 hatalarını, yönlendirme zincirlerini ve link sızıntılarını kanıtıyla görün.",
            "kicker": "LİNK BÜTÜNLÜĞÜ VE YÖNLENDİRME DENETİMİ",
            "h1": "İç link sağlığınızı <em>gerçek HTTP istekleriyle</em> denetleyin.",
            "sub": "Taranan sayfalar içindeki 404 çıkmaz yollarını, 500 sunucu hatalarını, döngüsel yönlendirmeleri ve gereksiz 301 zincirlerini canlı kanıtlarla yakalayın.",
            "proof": ["Canlı HTTP Probları", "404 Tespiti", "Yönlendirme Döngüleri", "Gerçek Durum Kodları"],
            "tool_title": "Ücretsiz link bütünlüğü denetimi",
            "tool_sub": "İç link sağlığını test etmek ve kırık yolları tespit etmek için alan adı girin.",
            "btn": "Linkleri denetle",
            "scope_eyebrow": "HTML&HTML / KAPSAM",
            "scope_title": "Kullanıcılar ve botlar için sıfır kırık bağlantı.",
            "scope_sub": "Linkler gerçek HTTP probları ile test edilir; hedef sunucuyu yormamak için tarama başına 30 canlı prob ile sınırlandırılmıştır.",
            "c1_b": "01 / ÇIKMAZ YOLLAR", "c1_h": "404 ve 410 Hataları", "c1_p": "Silinmiş veya yanlış yazılmış sayfalara işaret eden ve güven sarsan kırık iç bağlantıları yakalar.",
            "c2_b": "02 / YÖNLENDİRMELER", "c2_h": "Yönlendirme Zincirleri", "c2_p": "Kanonik hedef yerine ara yönlendirmelere işaret eden iç linkleri listeler.",
            "c3_b": "03 / PROTOKOLLER", "c3_h": "Karışık Protokol Linkleri", "c3_p": "HTTPS sitede gereksiz HTTP yönlendirmelerine yol açan eski protokol bağlantılarını tespit eder.",
            "lim_title": "Sınırlandırılmış prob güvenliği",
            "lim_p1": "Hedef sunucunun aşırı yüklenmesini önlemek için canlı link probları kesinlikle 30 istek ile sınırlıdır.",
            "lim_p2": "Harici üçüncü taraf siteler derinlemesine taranmaz, yalnızca doğrudan HTTP durumu kontrol edilir.",
            "faq_title": "Sıkça Sorulan Sorular",
            "faqs": [
                ("Yönlendirme zincirleri neden zararlıdır?", "Her yönlendirme adımı gecikme ekler, bot tarama bütçesini tüketir ve hedef sayfanın dizinden düşmesine yol açabilir."),
                ("Tarayıcı iç linkleri nasıl bulur?", "Taranan HTML sayfalarındaki href öznitelikleri ayrıştırılır; mailto, tel ve javascript linkleri elenir."),
                ("Kırık linkleri nasıl düzeltebilirim?", "$149 Fix Mandate, kaynak kodunuzdaki tam dosya konumlarını ve güncellenmesi gereken hedef URL'leri sunar.")
            ],
            "cta_title": "Kırık linkleri ve yönlendirme gecikmelerini temizleyin.",
            "cta_sub": "$149 Fix Mandate ile kırık URL'lerin tam envanterini ve düzeltme testlerini edinin.",
            "cta_btn": "Full Site Fix Mandate — $149"
        }
    }
]

# Write tools
for t in tools_data:
    for lang in ['en', 'tr']:
        c = t[lang]
        slug = t['en_slug'] if lang == 'en' else t['tr_slug']
        rel_path = f"{lang}/{slug}/index.html"
        alt_slug = t['tr_slug'] if lang == 'en' else t['en_slug']
        alt_url = f"/{'tr' if lang == 'en' else 'en'}/{alt_slug}/"
        canonical_url = f"https://htmlandhtml.com/{lang}/{slug}/"
        alt_full_url = f"https://htmlandhtml.com{alt_url}"

        # Breadcrumbs
        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"
        bc_tools_name = "Tools" if lang == 'en' else "Araçlar"
        bc_tools_url = "/en/tools/" if lang == 'en' else "/tr/araclar/"
        curr_name = c['kicker'].title() if lang == 'en' else c['kicker']

        proof_spans = "".join(f"<span>{p}</span>" for p in c['proof'])
        faqs_html = "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in c['faqs'])

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{c['title']}</title>
<meta name="description" content="{c['desc']}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/{t['en_slug']}/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/{t['tr_slug']}/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/{t['en_slug']}/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "SoftwareApplication",
      "name": "HTML&HTML {c['kicker']}",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "url": "{canonical_url}",
      "offers": {{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }}
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{bc_tools_name}", "item": "https://htmlandhtml.com{bc_tools_url}" }},
        {{ "@type": "ListItem", "position": 3, "name": "{curr_name}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/authority-tool.js" defer></script>
<script src="/assets/js/theme.js"></script>
</head>
<body data-tool-categories="{t['categories']}">
{get_header(lang, alt_url, 'tools')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <a href="{bc_tools_url}">{bc_tools_name}</a>
  <span>/</span>
  <span>{curr_name}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{c['kicker']}</b></div>
  <h1>{c['h1']}</h1>
  <p>{c['sub']}</p>
  <div class="authority-proof">
    {proof_spans}
  </div>
</section>

<section class="tool-shell" id="toolRunner">
  <div class="tool-panel">
    <h2>{c['tool_title']}</h2>
    <p>{c['tool_sub']}</p>
    <form class="tool-form" id="toolScanForm">
      <input id="toolDomain" aria-label="Domain" autocomplete="url" placeholder="example.com" required>
      <button type="submit">{c['btn']}</button>
    </form>
    <div class="scan-chips">
      <span>{'Örnekler:' if lang == 'tr' else 'Try:'}</span>
      <button type="button" class="chip-btn" data-domain="llmstxt.org">llmstxt.org</button>
      <button type="button" class="chip-btn" data-domain="anthropic.com">anthropic.com</button>
      <button type="button" class="chip-btn" data-domain="vercel.com">vercel.com</button>
    </div>
    <small class="tool-note">{'Yalnızca herkese açık HTTP/HTTPS yüzeyleri ölçülür. Özel ve yerel ağlar fail-closed engellenir.' if lang == 'tr' else 'Public HTTP/HTTPS surfaces only. Private or local targets fail closed.'}</small>
    <div id="toolStatus" class="tool-status" hidden></div>
    <div id="toolResult" class="tool-result" hidden>
      <div class="tool-score" id="toolScore"></div>
      <div>
        <p id="toolMeta" class="tool-note"></p>
        <div id="toolFindings" class="tool-findings"></div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="scope">
  <header>
    <span class="eyebrow">{c['scope_eyebrow']}</span>
    <h2>{c['scope_title']}</h2>
    <p>{c['scope_sub']}</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>{c['c1_b']}</b>
      <h3>{c['c1_h']}</h3>
      <p>{c['c1_p']}</p>
    </article>
    <article class="authority-card">
      <b>{c['c2_b']}</b>
      <h3>{c['c2_h']}</h3>
      <p>{c['c2_p']}</p>
    </article>
    <article class="authority-card">
      <b>{c['c3_b']}</b>
      <h3>{c['c3_h']}</h3>
      <p>{c['c3_p']}</p>
    </article>
  </div>
</section>

<section class="section">
  <header>
    <span class="eyebrow">{'EPİSTEMİK SINIR' if lang == 'tr' else 'EPISTEMIC BOUNDARY'}</span>
    <h2>{c['lim_title']}</h2>
    <p>{c['lim_p1']}</p>
  </header>
  <div class="compare">
    <b>{'SORUMLULUK' if lang == 'tr' else 'DISCLOSURE'}</b>
    <p>{c['lim_p2']}</p>
  </div>
</section>

<section class="section faq">
  <header>
    <span class="eyebrow">{'SSS' if lang == 'tr' else 'FAQ'}</span>
    <h2>{c['faq_title']}</h2>
  </header>
  {faqs_html}
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>{c['cta_title']}</h3>
      <p>{c['cta_sub']}</p>
    </div>
    <a href="/checkout">{c['cta_btn']}</a>
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

print("Standard tool pages built.")
