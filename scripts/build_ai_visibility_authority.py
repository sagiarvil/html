#!/usr/bin/env python3
from pathlib import Path
import json, html

ROOT = Path(__file__).resolve().parents[1]
TODAY = "2026-09-06"

GOOGLE_AI = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"
GOOGLE_AI_FEATURES = "https://developers.google.com/search/docs/appearance/ai-features"
GOOGLE_HELPFUL = "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
GOOGLE_SITEMAPS = "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap"
GOOGLE_THIRD_PARTY = "https://developers.google.com/search/docs/fundamentals/third-party-seo"
GOOGLE_GENAI_REPORTS = "https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports"
OPENAI_PUBLISHERS = "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq"
LLMSTXT = "https://llmstxt.org/"
LLMSTXT_CHANGES = "https://llmstxt.org/changes.html"

PAIRS = [
    ("ai-search-visibility","yapay-zeka-arama-gorunurlugu","AI Search Visibility","Yapay Zeka Arama Görünürlüğü"),
    ("geo-optimization","geo-optimizasyon","GEO — Generative Engine Optimization","GEO — Üretken Yapay Zeka Görünürlük Optimizasyonu"),
    ("aeo-answer-engine-optimization","aeo-answer-engine","AEO — Answer Engine Optimization","AEO — Cevap Motoru Optimizasyonu"),
    ("llmo-optimization","llmo-optimizasyon","LLMO — Large Language Model Optimization","LLMO — Büyük Dil Modeli Optimizasyonu"),
    ("aao-agent-optimization","aao-ajent-optimizasyon","AAO — AI Agent Optimization","AAO — Yapay Zeka Ajan Optimizasyonu"),
    ("rag-readiness","rag-optimizasyon","RAG Readiness — Retrieval-Augmented Generation","RAG Hazırlığı — Retrieval-Augmented Generation"),
    ("e-e-a-t-trust-signals","e-e-a-t-guven-sinyalleri","E-E-A-T Trust Signals","E-E-A-T Güven Sinyalleri"),
]

TERMS = [
  {
    "id":"ai-search-visibility","name":"AI Search Visibility","tr":"Yapay Zeka Arama Görünürlüğü","status":"INDUSTRY_TERM",
    "def_en":"How discoverable, understandable, source-eligible and clickable a website is across generative AI search experiences.",
    "def_tr":"Bir web sitesinin üretken yapay zeka arama deneyimlerinde bulunabilir, anlaşılabilir, kaynak olmaya elverişli ve tıklanabilir olma düzeyi.",
    "google_en":"Google now publishes official guidance for succeeding in generative AI Search features and provides dedicated Search Console visibility reporting for AI Overviews, AI Mode and related experiences.",
    "google_tr":"Google artık üretken yapay zeka Arama özelliklerinde başarı için resmi rehber yayımlıyor ve AI Overviews, AI Mode ve ilgili deneyimler için Search Console görünürlük raporları sunuyor.",
    "ai_en":"AI search systems retrieve candidate pages, evaluate relevant passages and present links or citations when useful.",
    "ai_tr":"Yapay zeka arama sistemleri aday sayfaları bulur, ilgili bölümleri değerlendirir ve uygun olduğunda bağlantı veya kaynak gösterir.",
    "business_en":"The commercial opportunity begins before a website visit: a brand must first be eligible to appear when a customer asks AI what to choose.",
    "business_tr":"Ticari fırsat web sitesi ziyaretinden önce başlar: müşteri yapay zekaya kimi seçeceğini sorduğunda markanın önce cevapta yer almaya aday olması gerekir.",
    "measure_en":"HTML&HTML combines crawler access, technical eligibility, answer extractability, entity integrity, source-worthiness and conversion-path evidence.",
    "measure_tr":"HTML&HTML; tarayıcı erişimi, teknik uygunluk, cevap çıkarılabilirliği, varlık bütünlüğü, kaynak olma sinyalleri ve dönüşüm yolunu birlikte ölçer.",
    "myth_en":"No tool can guarantee an AI recommendation, citation, ranking, click, customer or revenue outcome.",
    "myth_tr":"Hiçbir araç yapay zeka tavsiyesi, kaynak gösterimi, sıralama, tıklama, müşteri veya gelir sonucunu garanti edemez.",
    "sources":[GOOGLE_AI, GOOGLE_GENAI_REPORTS, OPENAI_PUBLISHERS]
  },
  {
    "id":"geo","name":"GEO — Generative Engine Optimization","tr":"GEO — Generative Engine Optimization","status":"INDUSTRY_TERM",
    "def_en":"A market term for work intended to improve visibility and source eligibility in generative AI search experiences.",
    "def_tr":"Üretken yapay zeka arama deneyimlerinde görünürlüğü ve kaynak olma uygunluğunu geliştirmeyi amaçlayan çalışmalar için kullanılan sektör terimi.",
    "google_en":"Google explicitly recognizes the term GEO, but says that from Google Search's perspective optimizing for generative AI search is still SEO and there are no special technical requirements for AI Overviews or AI Mode.",
    "google_tr":"Google GEO terimini açıkça tanıyor; ancak Google Arama açısından üretken yapay zeka aramasına optimizasyonun hâlâ SEO olduğunu ve AI Overviews veya AI Mode için ek teknik şart bulunmadığını söylüyor.",
    "ai_en":"Useful GEO work focuses on eligibility, retrieval, original information, trust, clear entities, usable links and measurable referrals rather than unsupported AI ranking hacks.",
    "ai_tr":"Değerli GEO çalışması; kanıtsız AI sıralama hileleri yerine uygunluk, retrieval, özgün bilgi, güven, net varlıklar, kullanılabilir bağlantılar ve ölçülebilir yönlendirmelere odaklanır.",
    "business_en":"A business wants to be considered when a customer asks an AI system for brands, products, providers or sources.",
    "business_tr":"İşletmenin beklentisi, müşteri yapay zekaya marka, ürün, hizmet sağlayıcı veya kaynak sorduğunda değerlendirme kümesinde yer almaktır.",
    "measure_en":"HTML&HTML maps GEO readiness across AI/search crawlability, answer extractability, information gain signals, entity graph integrity, trust and citation/referral surfaces.",
    "measure_tr":"HTML&HTML GEO hazırlığını AI/arama taranabilirliği, cevap çıkarılabilirliği, özgün bilgi sinyalleri, varlık grafı bütünlüğü, güven ve kaynak/yönlendirme yüzeyleri üzerinden değerlendirir.",
    "myth_en":"GEO is not a Google-approved shortcut and it cannot guarantee inclusion in AI-generated answers.",
    "myth_tr":"GEO, Google onaylı bir kestirme yol değildir ve yapay zeka cevaplarına dahil edilmeyi garanti etmez.",
    "sources":[GOOGLE_AI, GOOGLE_THIRD_PARTY]
  },
  {
    "id":"aeo","name":"AEO — Answer Engine Optimization","tr":"AEO — Answer Engine Optimization","status":"INDUSTRY_TERM",
    "def_en":"A market term for structuring content so answer-oriented systems can more easily identify clear, useful responses.",
    "def_tr":"Cevap odaklı sistemlerin net ve faydalı yanıtları daha kolay belirleyebilmesi için içeriği yapılandırmaya verilen sektör adı.",
    "google_en":"Google recognizes AEO as a term used in the market, while stating that success in generative AI Search still relies on Search fundamentals, helpful content and technical eligibility.",
    "google_tr":"Google AEO'yu piyasada kullanılan bir terim olarak tanıyor; üretken yapay zeka Arama başarısının yine Arama temellerine, faydalı içeriğe ve teknik uygunluğa dayandığını belirtiyor.",
    "ai_en":"Answer extractability improves when headings, paragraphs, definitions, evidence and page intent make the answer clear without losing context.",
    "ai_tr":"Başlıklar, paragraflar, tanımlar, kanıtlar ve sayfa niyeti cevabı bağlamı kaybetmeden netleştirdiğinde cevap çıkarılabilirliği güçlenir.",
    "business_en":"If a customer asks a direct question, the site should make its useful answer easy to identify and verify.",
    "business_tr":"Müşteri doğrudan bir soru sorduğunda, site faydalı cevabını kolay bulunur ve doğrulanabilir biçimde sunabilmelidir.",
    "measure_en":"HTML&HTML evaluates answer-first structure, heading-to-answer continuity, self-contained sections, evidence and structured content signals.",
    "measure_tr":"HTML&HTML answer-first yapı, başlık-cevap devamlılığı, kendi başına anlamlı bölümler, kanıt ve yapılandırılmış içerik sinyallerini değerlendirir.",
    "myth_en":"There is no special AEO markup required by Google Search and no fixed word-count formula guarantees extraction.",
    "myth_tr":"Google Arama'nın zorunlu tuttuğu özel bir AEO işaretlemesi yoktur; sabit kelime sayısı formülleri cevap çıkarımını garanti etmez.",
    "sources":[GOOGLE_AI, GOOGLE_AI_FEATURES]
  },
  {
    "id":"llmo","name":"LLMO — Large Language Model Optimization","tr":"LLMO — Large Language Model Optimization","status":"INDUSTRY_TERM",
    "def_en":"A market term for making web information easier for large language model and retrieval systems to resolve, understand and use correctly.",
    "def_tr":"Web bilgisini büyük dil modelleri ve retrieval sistemlerinin doğru çözmesi, anlaması ve kullanması için daha açık hale getirmeyi anlatan sektör terimi.",
    "google_en":"Google does not define LLMO as a separate Google Search discipline. Its official AI Search guidance emphasizes accessible text, crawlability, unique useful content, internal links and matching structured data.",
    "google_tr":"Google LLMO'yu ayrı bir Google Arama disiplini olarak tanımlamıyor. Resmi AI Arama rehberi; erişilebilir metin, taranabilirlik, özgün faydalı içerik, iç bağlantılar ve görünür içerikle uyumlu yapısal veriyi vurguluyor.",
    "ai_en":"Clear entities, stable canonical URLs, semantic HTML, internal links and coherent sections reduce ambiguity for retrieval and language-model workflows.",
    "ai_tr":"Net varlıklar, kararlı kanonik URL'ler, semantik HTML, iç bağlantılar ve tutarlı bölümler retrieval ve dil modeli iş akışlarındaki belirsizliği azaltır.",
    "business_en":"The practical goal is not to teach an LLM your site; it is to remove ambiguity that makes your offer harder to retrieve or interpret.",
    "business_tr":"Pratik hedef LLM'e sitenizi öğretmek değil; teklifinizin bulunmasını veya yorumlanmasını zorlaştıran belirsizliği azaltmaktır.",
    "measure_en":"HTML&HTML uses entity integrity, semantic structure, internal-link alignment, canonical consistency, language consistency and knowledge-surface checks.",
    "measure_tr":"HTML&HTML varlık bütünlüğü, semantik yapı, iç bağlantı uyumu, canonical tutarlılığı, dil tutarlılığı ve bilgi yüzeyi kontrollerini kullanır.",
    "myth_en":"LLMO is not an official Google ranking factor or a guarantee that a model will mention a brand.",
    "myth_tr":"LLMO resmi bir Google sıralama faktörü değildir ve bir modelin markadan söz edeceğini garanti etmez.",
    "sources":[GOOGLE_AI, GOOGLE_HELPFUL]
  },
  {
    "id":"aao","name":"AAO — AI Agent Optimization","tr":"AAO — AI Agent Optimization","status":"EMERGING_TERM",
    "def_en":"An emerging term for making websites easier for AI agents to understand and interact with safely.",
    "def_tr":"Web sitelerini yapay zeka ajanlarının güvenli biçimde anlaması ve etkileşim kurması için hazırlamayı anlatan gelişen terim.",
    "google_en":"Google's 2026 generative AI optimization guidance includes initial guidance related to AI agents and describes the area as quickly emerging and evolving.",
    "google_tr":"Google'ın 2026 üretken yapay zeka optimizasyon rehberi yapay zeka ajanlarına ilişkin ilk yönlendirmeleri içeriyor ve alanı hızla gelişen bir konu olarak tanımlıyor.",
    "ai_en":"Agents benefit from semantic controls, accessible names, explicit states, clear forms, stable actions and machine-readable interfaces where appropriate.",
    "ai_tr":"Ajanlar; semantik kontroller, erişilebilir adlar, açık durumlar, net formlar, kararlı eylemler ve uygun yerlerde makine okunabilir arayüzlerden yararlanır.",
    "business_en":"As delegated AI actions grow, businesses need critical user journeys to remain understandable, safe and testable for both people and agents.",
    "business_tr":"Yapay zekaya devredilen işlemler arttıkça işletmelerin kritik kullanıcı akışlarını hem insanlar hem ajanlar için anlaşılır, güvenli ve test edilebilir tutması gerekir.",
    "measure_en":"HTML&HTML checks accessibility semantics, forms, actionable controls, OpenAPI/agent discovery signals and public interaction surfaces.",
    "measure_tr":"HTML&HTML erişilebilirlik semantiği, formlar, eyleme dönük kontroller, OpenAPI/ajan keşif sinyalleri ve herkese açık etkileşim yüzeylerini kontrol eder.",
    "myth_en":"AAO is an emerging market term, not a stable universal standard and not a promise that an external agent can complete every action.",
    "myth_tr":"AAO gelişen bir sektör terimidir; kararlı evrensel standart değildir ve dış bir ajanın her işlemi tamamlayacağını garanti etmez.",
    "sources":[GOOGLE_AI, OPENAI_PUBLISHERS]
  },
  {
    "id":"rag","name":"RAG — Retrieval-Augmented Generation","tr":"RAG — Retrieval-Augmented Generation","status":"TECHNIQUE",
    "def_en":"A technique that retrieves relevant external information and uses it to ground a generated response.",
    "def_tr":"İlgili dış bilgiyi getirip üretilen yanıtı bu bilgiyle temellendiren retrieval tekniği.",
    "google_en":"Google's 2026 generative AI Search guide explicitly describes retrieval-augmented generation (RAG), also called grounding, as a technique used with Search ranking systems to retrieve relevant up-to-date pages before generating responses.",
    "google_tr":"Google'ın 2026 üretken yapay zeka Arama rehberi, RAG'i (grounding) ilgili ve güncel sayfaları Arama dizininden getirip yanıtı temellendirmek için kullanılan bir teknik olarak açıkça anlatıyor.",
    "ai_en":"Retrieval works better when important information is textual, coherent, uniquely useful, linked and accessible at stable URLs.",
    "ai_tr":"Önemli bilgi metin biçiminde, tutarlı, özgün değer taşıyan, bağlantılı ve kararlı URL'lerde erişilebilir olduğunda retrieval daha sağlam çalışır.",
    "business_en":"The site owner wants useful facts, products and expertise to be retrievable in the right context when an AI system answers a relevant question.",
    "business_tr":"Site sahibi, yapay zeka ilgili soruyu yanıtlarken faydalı bilgi, ürün ve uzmanlığının doğru bağlamda bulunabilmesini ister.",
    "measure_en":"HTML&HTML evaluates oversized content blocks, context loss, duplication, self-contained sections, discovery paths and semantic integrity.",
    "measure_tr":"HTML&HTML aşırı büyük içerik blokları, bağlam kaybı, tekrar, kendi başına anlamlı bölümler, keşif yolları ve semantik bütünlüğü değerlendirir.",
    "myth_en":"RAG is a retrieval technique, not a standalone Google ranking factor and not a guarantee that a particular page will be cited.",
    "myth_tr":"RAG bir retrieval tekniğidir; bağımsız Google sıralama faktörü değildir ve belirli bir sayfanın kaynak gösterileceğini garanti etmez.",
    "sources":[GOOGLE_AI]
  },
  {
    "id":"eeat","name":"E-E-A-T","tr":"E-E-A-T — Deneyim, Uzmanlık, Otorite, Güven","status":"GOOGLE_QUALITY_CONCEPT",
    "def_en":"Experience, Expertise, Authoritativeness and Trustworthiness: a quality-evaluation concept used in Google's guidance and quality rater framework.",
    "def_tr":"Experience, Expertise, Authoritativeness ve Trustworthiness: Google'ın içerik kalite rehberinde ve kalite değerlendirici çerçevesinde kullandığı değerlendirme kavramı.",
    "google_en":"Google says E-E-A-T can help creators self-assess content quality. Search quality raters use it to evaluate results, but rater data is not used directly as a ranking algorithm score.",
    "google_tr":"Google, E-E-A-T'in içerik üreticilerinin kaliteyi değerlendirmesine yardımcı olabileceğini söylüyor. Kalite değerlendiricileri sonuçları incelerken bu çerçeveyi kullanır; değerlendirici verisi doğrudan bir sıralama algoritması puanı değildir.",
    "ai_en":"Clear authorship, first-hand experience, sourcing, organization identity, editorial accountability and factual accuracy make content easier to trust and verify.",
    "ai_tr":"Açık yazarlık, birinci el deneyim, kaynaklandırma, kurum kimliği, editoryal hesap verebilirlik ve olgusal doğruluk içeriğin güvenilirliğini ve doğrulanabilirliğini güçlendirir.",
    "business_en":"For commercial and high-stakes topics, visitors and systems both need evidence of who is responsible for the information and why it should be trusted.",
    "business_tr":"Ticari ve yüksek riskli konularda hem ziyaretçiler hem sistemler bilginin sorumlusunun kim olduğunu ve neden güvenilmesi gerektiğini görebilmelidir.",
    "measure_en":"HTML&HTML observes authorship, About/Contact/Privacy presence, organization/person schema, citations, freshness and trust signals; it does not claim to measure Google's internal E-E-A-T score.",
    "measure_tr":"HTML&HTML yazarlık, Hakkımızda/İletişim/Gizlilik varlığı, Organization/Person şemaları, kaynaklar, güncellik ve güven sinyallerini gözlemler; Google'ın dahili E-E-A-T puanını ölçtüğünü iddia etmez.",
    "myth_en":"E-E-A-T is not a single public numeric Google ranking factor that third-party tools can read.",
    "myth_tr":"E-E-A-T, üçüncü taraf araçların okuyabileceği tek bir herkese açık sayısal Google sıralama faktörü değildir.",
    "sources":[GOOGLE_HELPFUL]
  },
  {
    "id":"llms-txt","name":"llms.txt","tr":"llms.txt","status":"PROPOSAL",
    "def_en":"A community proposal for publishing a concise machine-readable directory that points language-model tools and agents to important site resources.",
    "def_tr":"Dil modeli araçlarını ve ajanları sitenin önemli kaynaklarına yönlendiren kısa, makine okunabilir bir dizin yayımlamaya yönelik topluluk önerisi.",
    "google_en":"Google Search explicitly says it does not use llms.txt or other special AI text files to determine inclusion in Google Search or its generative AI features.",
    "google_tr":"Google Arama, Google Search ve üretken yapay zeka özelliklerine dahil edilmek için llms.txt veya benzeri özel AI metin dosyalarını kullanmadığını açıkça söylüyor.",
    "ai_en":"The llms.txt v2 proposal adds standard discovery links such as rel=describedby and Markdown alternates; some documentation and coding-agent ecosystems use the proposal.",
    "ai_tr":"llms.txt v2 önerisi rel=describedby ve Markdown alternate gibi standart keşif bağlantıları ekler; bazı dokümantasyon ve kodlama ajanı ekosistemleri bu öneriyi kullanır.",
    "business_en":"It can be a useful optional knowledge-directory surface, especially for documentation-heavy sites, but it should complement—not replace—crawlable HTML, sitemaps and internal links.",
    "business_tr":"Özellikle dokümantasyon yoğun sitelerde yararlı bir isteğe bağlı bilgi dizini olabilir; fakat taranabilir HTML, sitemap ve iç bağlantıların yerine geçmemelidir.",
    "measure_en":"HTML&HTML validates H1, summary structure, link reachability, v2 discovery relationships and Markdown alternates while labeling llms.txt as a proposal.",
    "measure_tr":"HTML&HTML H1, özet yapısı, bağlantı erişimi, v2 keşif ilişkileri ve Markdown alternatiflerini doğrular; llms.txt'yi PROPOSAL olarak etiketler.",
    "myth_en":"llms.txt is not an IETF/W3C standard, Google ranking requirement, AI recommendation guarantee or replacement for robots.txt.",
    "myth_tr":"llms.txt IETF/W3C standardı, Google sıralama şartı, yapay zeka tavsiye garantisi veya robots.txt yerine geçen bir dosya değildir.",
    "sources":[GOOGLE_AI, LLMSTXT, LLMSTXT_CHANGES]
  },
  {
    "id":"sitemap","name":"XML Sitemap","tr":"XML Sitemap / Site Haritası","status":"OFFICIAL_PROTOCOL",
    "def_en":"A machine-readable list of canonical URLs that helps search engines discover the pages a site wants crawled and considered.",
    "def_tr":"Arama motorlarının sitenin taranmasını ve değerlendirilmesini istediği kanonik URL'leri keşfetmesine yardımcı olan makine okunabilir URL listesi.",
    "google_en":"Google recommends standard sitemap formats, root-level placement where practical, absolute URLs, canonical URLs and the protocol limits of 50MB or 50,000 URLs per sitemap.",
    "google_tr":"Google standart sitemap formatlarını, uygun olduğunda kök dizin kullanımını, mutlak URL'leri, kanonik URL'leri ve sitemap başına 50MB/50.000 URL protokol sınırlarını öneriyor.",
    "ai_en":"For Google AI features, pages still rely on the Search index; sitemap hygiene therefore remains part of the discovery foundation rather than a special AI-only file.",
    "ai_tr":"Google'ın yapay zeka özellikleri Arama dizinine dayanır; bu nedenle sitemap hijyeni özel bir AI dosyası değil, keşif temelinin parçasıdır.",
    "business_en":"A correct sitemap reduces discovery ambiguity and helps site owners monitor important URL sets in Search Console.",
    "business_tr":"Doğru site haritası keşif belirsizliğini azaltır ve site sahibinin önemli URL kümelerini Search Console'da izlemesini kolaylaştırır.",
    "measure_en":"HTML&HTML checks sitemap discovery, URL validity, canonical consistency, status codes, hreflang relationships and orphan/discovery-path signals.",
    "measure_tr":"HTML&HTML sitemap keşfi, URL geçerliliği, canonical tutarlılığı, durum kodları, hreflang ilişkileri ve orphan/keşif yolu sinyallerini kontrol eder.",
    "myth_en":"A sitemap does not guarantee crawling, indexing, ranking, AI citation or traffic.",
    "myth_tr":"Sitemap tarama, indeksleme, sıralama, yapay zeka kaynak gösterimi veya trafik garantisi vermez.",
    "sources":[GOOGLE_SITEMAPS, GOOGLE_AI_FEATURES]
  },
  {
    "id":"query-fan-out","name":"Query fan-out","tr":"Query fan-out","status":"GOOGLE_DESCRIBED_TECHNIQUE",
    "def_en":"A technique where a model issues multiple related searches to gather enough context for a complex question.",
    "def_tr":"Modelin karmaşık bir soruya yeterli bağlam toplamak için birden fazla ilişkili arama çalıştırdığı teknik.",
    "google_en":"Google's generative AI Search guide explicitly describes query fan-out as concurrent related queries used to fetch additional relevant results.",
    "google_tr":"Google'ın üretken yapay zeka Arama rehberi query fan-out'u ek ilgili sonuçlar getirmek için aynı anda yürütülen ilişkili sorgular olarak açıkça tanımlıyor.",
    "ai_en":"It means a page may be discovered through a narrower sub-question rather than only through the user's original wording.",
    "ai_tr":"Bu, bir sayfanın yalnız kullanıcının ilk ifadesiyle değil daha dar bir alt soru üzerinden de keşfedilebileceği anlamına gelir.",
    "business_en":"Deep, specific and uniquely useful pages can create more entry points into AI-assisted research journeys.",
    "business_tr":"Derin, spesifik ve özgün değer taşıyan sayfalar yapay zeka destekli araştırma yolculuklarında daha fazla giriş noktası oluşturabilir.",
    "measure_en":"HTML&HTML uses intent, internal-link, information-gain and answer-extractability signals to identify whether important subtopics have clear, retrievable surfaces.",
    "measure_tr":"HTML&HTML önemli alt konuların net ve bulunabilir yüzeyleri olup olmadığını niyet, iç bağlantı, özgün bilgi ve cevap çıkarılabilirliği sinyalleriyle değerlendirir.",
    "myth_en":"Query fan-out does not mean creating thin pages for every keyword variation.",
    "myth_tr":"Query fan-out her anahtar kelime varyasyonu için ince içerikli sayfa açmak anlamına gelmez.",
    "sources":[GOOGLE_AI]
  },
  {
    "id":"source-eligibility","name":"Source eligibility","tr":"Kaynak olma uygunluğu","status":"HTMLANDHTML_DECISION_TERM",
    "def_en":"HTML&HTML's decision term for whether a page clears observable website-side barriers to being retrieved, evaluated and linked as a source.",
    "def_tr":"Bir sayfanın kaynak olarak bulunması, değerlendirilmesi ve bağlantılanması önündeki gözlemlenebilir site kaynaklı engelleri aşıp aşmadığını anlatan HTML&HTML karar terimi.",
    "google_en":"Google says pages shown as supporting links in AI Overviews or AI Mode must be indexed and eligible to appear in Search with a snippet; meeting requirements still does not guarantee serving.",
    "google_tr":"Google, AI Overviews veya AI Mode'da destekleyici bağlantı olabilmek için sayfanın indekslenmiş ve snippet ile Arama'da gösterilmeye uygun olması gerektiğini; şartları karşılamanın gösterimi garanti etmediğini söylüyor.",
    "ai_en":"Eligibility is a prerequisite, not an outcome: access, indexability, usable text, relevance and trust all matter before an external system can choose a source.",
    "ai_tr":"Uygunluk sonuç değil ön koşuldur: dış sistem bir kaynağı seçmeden önce erişim, indekslenebilirlik, kullanılabilir metin, alaka ve güven önemlidir.",
    "business_en":"The site owner needs to know whether preventable website-side failures are removing the brand from consideration before the recommendation decision happens.",
    "business_tr":"Site sahibi, tavsiye kararı oluşmadan önce önlenebilir site hatalarının markayı değerlendirme dışına itip itmediğini bilmek ister.",
    "measure_en":"HTML&HTML combines deterministic access/indexability evidence with non-scoring intelligence context without claiming access to external ranking systems.",
    "measure_tr":"HTML&HTML deterministik erişim/indekslenebilirlik kanıtını puansız intelligence bağlamıyla birleştirir; dış sıralama sistemlerine eriştiğini iddia etmez.",
    "myth_en":"Eligibility is not a probability score for being recommended.",
    "myth_tr":"Kaynak olma uygunluğu tavsiye edilme olasılığı puanı değildir.",
    "sources":[GOOGLE_AI_FEATURES, OPENAI_PUBLISHERS]
  }
]

LANDING_BY_SLUG = {
    "ai-search-visibility":"ai-search-visibility","yapay-zeka-arama-gorunurlugu":"ai-search-visibility",
    "geo-optimization":"geo","geo-optimizasyon":"geo",
    "aeo-answer-engine-optimization":"aeo","aeo-answer-engine":"aeo",
    "llmo-optimization":"llmo","llmo-optimizasyon":"llmo",
    "aao-agent-optimization":"aao","aao-ajent-optimizasyon":"aao",
    "rag-readiness":"rag","rag-optimizasyon":"rag",
    "e-e-a-t-trust-signals":"eeat","e-e-a-t-guven-sinyalleri":"eeat",
}

def esc(x): return html.escape(str(x), quote=True)

def nav(lang):
    if lang=="tr":
        return '<nav><a href="/tr/yapay-zeka-arama-gorunurlugu/">Yapay Zeka Görünürlüğü</a><a href="/tr/sozluk/">Sözlük</a><a href="/tr/araclar/">Araçlar</a><a href="/tr/rehberler/">Rehberler</a><a href="/tr/methodology/">Metodoloji</a></nav>'
    return '<nav><a href="/en/ai-search-visibility/">AI Search Visibility</a><a href="/en/glossary/">Glossary</a><a href="/en/tools/">Tools</a><a href="/en/guides/">Guides</a><a href="/en/methodology/">Methodology</a></nav>'

def footer(lang):
    if lang=="tr":
        return '<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/tr/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>Web sitenizi yapay zeka arama sonuçlarında görünmeye, kaynak olmaya ve tavsiye edilme fırsatı kazanmaya hazırlayan kanıt odaklı platform.</p></div><div class="footer-col"><h4>Yapay Zeka Görünürlüğü</h4><ul><li><a href="/tr/yapay-zeka-arama-gorunurlugu/">Yapay Zeka Arama Görünürlüğü</a></li><li><a href="/tr/geo-optimizasyon/">GEO</a></li><li><a href="/tr/aeo-answer-engine/">AEO</a></li><li><a href="/tr/llmo-optimizasyon/">LLMO</a></li><li><a href="/tr/aao-ajent-optimizasyon/">AAO</a></li><li><a href="/tr/rag-optimizasyon/">RAG</a></li><li><a href="/tr/e-e-a-t-guven-sinyalleri/">E-E-A-T</a></li><li><a href="/tr/rehberler/llms-txt/">llms.txt</a></li></ul></div><div class="footer-col"><h4>Referans</h4><ul><li><a href="/tr/sozluk/">AI Arama Sözlüğü</a></li><li><a href="/tr/methodology/">Metodoloji</a></li><li><a href="/sources.json">Kaynak Kayıt Defteri</a></li><li><a href="/audit-profile.json">Audit Profile</a></li></ul></div></div></footer>'
    return '<footer><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/en/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a><p>Evidence-led readiness for appearing, being cited, and earning recommendation opportunity across AI search experiences.</p></div><div class="footer-col"><h4>AI Visibility</h4><ul><li><a href="/en/ai-search-visibility/">AI Search Visibility</a></li><li><a href="/en/geo-optimization/">GEO</a></li><li><a href="/en/aeo-answer-engine-optimization/">AEO</a></li><li><a href="/en/llmo-optimization/">LLMO</a></li><li><a href="/en/aao-agent-optimization/">AAO</a></li><li><a href="/en/rag-readiness/">RAG</a></li><li><a href="/en/e-e-a-t-trust-signals/">E-E-A-T</a></li><li><a href="/en/guides/llms-txt/">llms.txt</a></li></ul></div><div class="footer-col"><h4>Reference</h4><ul><li><a href="/en/glossary/">AI Search Glossary</a></li><li><a href="/en/methodology/">Methodology</a></li><li><a href="/sources.json">Source Registry</a></li><li><a href="/audit-profile.json">Audit Profile</a></li></ul></div></div></footer>'

def source_links(term, lang):
    label = "Resmi / birincil kaynaklar" if lang=="tr" else "Official / primary sources"
    items = "".join(f'<li><a href="{esc(u)}" rel="noopener noreferrer" target="_blank">{esc(u)}</a></li>' for u in term["sources"])
    return f'<div class="term-sources"><h3>{label}</h3><ul>{items}</ul></div>'

def six_blocks(term, lang):
    if lang=="tr":
        blocks=[("Tanım",term["def_tr"]),("Google ne diyor?",term["google_tr"]),("Yapay zeka sistemleri açısından anlamı",term["ai_tr"]),("Web sitesi sahibi için neden önemli?",term["business_tr"]),("HTML&HTML bunu nasıl ölçüyor?",term["measure_tr"]),("Yanlış bilinen / garanti edilmeyen",term["myth_tr"])]
    else:
        blocks=[("Definition",term["def_en"]),("What does Google say?",term["google_en"]),("What it means for AI systems",term["ai_en"]),("Why it matters to a website owner",term["business_en"]),("How HTML&HTML measures it",term["measure_en"]),("What it does not guarantee",term["myth_en"])]
    return '<div class="term-blocks">' + "".join(f'<section><h2>{esc(h)}</h2><p>{esc(v)}</p></section>' for h,v in blocks) + '</div>'

def head(lang,title,desc,canonical,alternate):
    return f'<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)}</title><meta name="description" content="{esc(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{esc(canonical)}"><link rel="alternate" hreflang="{lang}" href="{esc(canonical)}"><link rel="alternate" hreflang="{"en" if lang=="tr" else "tr"}" href="{esc(alternate)}"><link rel="alternate" hreflang="x-default" href="{esc(alternate if lang=="tr" else canonical)}"><link rel="describedby" href="https://htmlandhtml.com/llms.txt"><link rel="stylesheet" href="/assets/css/authority.css"><link rel="stylesheet" href="/assets/css/ai-authority.css?v=1"><script src="/assets/js/theme.js"></script></head>'

def page_shell(lang, title, desc, canonical, alternate, body, schema):
    lang_switch = f'<a href="{alternate}">{"EN" if lang=="tr" else "TR"}</a>'
    return f'<!doctype html><html lang="{lang}">{head(lang,title,desc,canonical,alternate)}<body><header class="topbar"><div class="topbar-shell"><a class="brand" href="/{lang}/"><img class="brand-logo" src="/assets/logo.png" alt="HTML&amp;HTML" width="144" height="22"></a>{nav(lang)}<div class="nav-actions"><div class="langs">{lang_switch}</div></div></div></header><script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script><main>{body}</main>{footer(lang)}</body></html>'

def glossary_page(lang):
    tr = lang=="tr"
    canonical = f"https://htmlandhtml.com/{'tr/sozluk' if tr else 'en/glossary'}/"
    alternate = f"https://htmlandhtml.com/{'en/glossary' if tr else 'tr/sozluk'}/"
    title = "Yapay Zeka Arama Sözlüğü: GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt | HTML&HTML" if tr else "AI Search Glossary: GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt | HTML&HTML"
    desc = "Yapay zeka arama görünürlüğü, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemap ve kaynak olma kavramlarını resmi kaynaklarla açıklayan referans sözlüğü." if tr else "Reference glossary for AI search visibility, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemaps and source eligibility with primary-source boundaries."
    if tr:
        hero = '<section class="authority-hero glossary-hero"><div class="kicker"><span></span><b>HTML&HTML / AI SEARCH REFERENCE</b></div><h1>Yapay Zeka Arama ve Görünürlük <em>Referans Sözlüğü</em></h1><p>GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemap ve yapay zeka arama görünürlüğü terimlerini kullanıcı diliyle açıklar; Google tarafından gerçekten söylenenlerle sektör yorumunu birbirinden ayırır.</p><div class="hero-actions"><a class="primary" href="/tr/site-tarama/">Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et →</a><a href="/tr/yapay-zeka-arama-gorunurlugu/">Yapay Zeka Görünürlüğü Rehberi →</a></div></section>'
        note = '<section class="reference-note"><h2>Google doğruluk sınırı</h2><p>Google, GEO ve AEO terimlerini piyasada kullanılan adlar olarak tanır; Google Arama açısından üretken yapay zeka optimizasyonunun hâlâ SEO olduğunu, AI Overviews/AI Mode için özel ek teknik şart bulunmadığını ve llms.txt dosyasını bu görünürlük için kullanmadığını açıkça belirtir. HTML&HTML bu nedenle sektör terimlerini kullanır ama Google onayı veya gizli sıralama verisi iddiasında bulunmaz.</p></section>'
    else:
        hero = '<section class="authority-hero glossary-hero"><div class="kicker"><span></span><b>HTML&HTML / AI SEARCH REFERENCE</b></div><h1>AI Search & Visibility <em>Reference Glossary</em></h1><p>A source-aware reference for GEO, AEO, LLMO, AAO, RAG, E-E-A-T, llms.txt, sitemaps and AI search visibility—separating official platform guidance from industry terminology.</p><div class="hero-actions"><a class="primary" href="/en/website-scanner/">Check My AI Visibility Free →</a><a href="/en/ai-search-visibility/">AI Search Visibility Guide →</a></div></section>'
        note = '<section class="reference-note"><h2>Google accuracy boundary</h2><p>Google recognizes GEO and AEO as market terms, while stating that generative AI optimization in Google Search is still SEO, that AI Overviews/AI Mode have no special additional technical requirements, and that Google Search does not use llms.txt for this visibility. HTML&HTML therefore uses market terminology without implying Google approval or access to private ranking data.</p></section>'
    cards=[]
    for t in TERMS:
        nm=t["tr"] if tr else t["name"]; definition=t["def_tr"] if tr else t["def_en"]
        cards.append(f'<article class="glossary-card" id="{t["id"]}"><div class="term-head"><h2>{esc(nm)}</h2><span>{esc(t["status"])}</span></div><p class="term-def">{esc(definition)}</p>{six_blocks(t,lang)}{source_links(t,lang)}</article>')
    body=hero+note+'<section class="glossary-index">'+''.join(cards)+'</section>'
    defined=[{"@type":"DefinedTerm","name":t["tr"] if tr else t["name"],"description":t["def_tr"] if tr else t["def_en"],"inDefinedTermSet":canonical} for t in TERMS]
    schema={"@context":"https://schema.org","@graph":[{"@type":"DefinedTermSet","name":"HTML&HTML Yapay Zeka Arama ve Görünürlük Referans Sözlüğü" if tr else "HTML&HTML AI Search & Visibility Reference Glossary","url":canonical,"hasDefinedTerm":defined},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Ana Sayfa" if tr else "Home","item":f"https://htmlandhtml.com/{lang}/"},{"@type":"ListItem","position":2,"name":"Sözlük" if tr else "Glossary","item":canonical}]}]}
    return page_shell(lang,title,desc,canonical,alternate,body,schema)

def landing_page(lang, slug, other_slug, key):
    tr=lang=="tr"; term=next(t for t in TERMS if t["id"]==key)
    canonical=f"https://htmlandhtml.com/{lang}/{slug}/"; alternate=f"https://htmlandhtml.com/{'en' if tr else 'tr'}/{other_slug}/"
    name=term["tr"] if tr else term["name"]
    title=(f"{name} Nedir? Yapay Zeka Arama Sonuçlarında Görünürlük | HTML&HTML" if tr else f"{name}: AI Search Visibility Guide | HTML&HTML")
    desc=(f"{name} kavramını, Google'ın resmi yaklaşımını, yapay zeka arama sonuçlarında görünme ve tavsiye edilme fırsatı açısından ticari anlamını ve HTML&HTML ölçümünü öğrenin." if tr else f"Understand {name}, Google's official boundary, its commercial meaning for AI search visibility, and how HTML&HTML measures website-side readiness.")
    user_h1=("Müşteriniz yapay zekaya “kimi tavsiye edersin?” diye soruyor. " + name + " bu fırsatın hangi kısmını etkiler?" if tr else "When a customer asks AI “who should I choose?”, what part of that opportunity does " + name + " affect?")
    hero=f'<section class="authority-hero concept-hero"><div class="kicker"><span></span><b>AI SEARCH VISIBILITY / {esc(name)}</b></div><h1>{esc(user_h1)}</h1><p>{esc(term["business_tr"] if tr else term["business_en"])}</p><div class="hero-actions"><a class="primary" href="/{"tr/site-tarama" if tr else "en/website-scanner"}/">{"Yapay Zeka Görünürlüğümü Ücretsiz Kontrol Et" if tr else "Check My AI Visibility Free"} →</a><a href="/{"tr/sozluk" if tr else "en/glossary"}/">{"Referans Sözlüğüne Git" if tr else "Open Reference Glossary"} →</a></div></section>'
    body=hero+'<section class="concept-body">'+six_blocks(term,lang)+source_links(term,lang)+'</section>'
    schema={"@context":"https://schema.org","@graph":[{"@type":"TechArticle","headline":name,"description":desc,"url":canonical},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Ana Sayfa" if tr else "Home","item":f"https://htmlandhtml.com/{lang}/"},{"@type":"ListItem","position":2,"name":name,"item":canonical}]}]}
    return page_shell(lang,title,desc,canonical,alternate,body,schema)

def write(rel, content):
    p=ROOT/rel; p.parent.mkdir(parents=True,exist_ok=True); p.write_text(content,encoding="utf-8")

def ensure_sitemap():
    p=ROOT/"sitemap.xml"
    if not p.exists(): return
    text=p.read_text(encoding="utf-8")
    if "</urlset>" not in text: return
    additions=[]; pairs=[("en/glossary","tr/sozluk")]
    for en_slug,tr_slug,_,_ in PAIRS: pairs.append((f"en/{en_slug}",f"tr/{tr_slug}"))
    for en_path,tr_path in pairs:
        for path_,lang,alt_path,alt_lang in [(en_path,"en",tr_path,"tr"),(tr_path,"tr",en_path,"en")]:
            loc=f"https://htmlandhtml.com/{path_}/"
            if loc in text: continue
            alt=f"https://htmlandhtml.com/{alt_path}/"
            additions.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.86</priority>\n    <xhtml:link rel="alternate" hreflang="{lang}" href="{loc}"/>\n    <xhtml:link rel="alternate" hreflang="{alt_lang}" href="{alt}"/>\n  </url>')
    if additions:
        text=text.replace("</urlset>","\n".join(additions)+"\n</urlset>"); p.write_text(text,encoding="utf-8")

def main():
    write("tr/sozluk/index.html", glossary_page("tr")); write("en/glossary/index.html", glossary_page("en"))
    for en_slug,tr_slug,_,_ in PAIRS:
        key=LANDING_BY_SLUG[en_slug]
        write(f"en/{en_slug}/index.html", landing_page("en",en_slug,tr_slug,key))
        write(f"tr/{tr_slug}/index.html", landing_page("tr",tr_slug,en_slug,key))
    ensure_sitemap()
    print(f"AI VISIBILITY AUTHORITY BUILD PASS: {2+2*len(PAIRS)} canonical pages materialized")

if __name__=="__main__": main()
