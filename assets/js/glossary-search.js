/**
 * HTML Sözlük - Akıllı & Toleranslı Canlı Arama Motoru
 * - Türkçe karakter normalizasyonu (İ/I, Ş/S, Ğ/G, Ç/C, Ö/O, Ü/U)
 * - Damerau-Levenshtein toleranslı yazım hatası düzeltme (Fuzzy Search)
 * - Kısmi kelime (Prefix/Substring) ve tam kelime eşleme
 * - Otomatik canlı sonuç getirme & anlık DOM kart filtreleme
 * - Dinamik İlgili Sayfalar, Rehberler ve Tanı Araçları Gösterimi
 * - Açılır Canlı Öneri Listesi (Dropdown Autocomplete)
 * - Klavye kısayolları (Cmd+K / Ctrl+K / '/' ile odaklanma, Ok tuşları ile gezinme, Esc ile temizleme)
 */

(function () {
  'use strict';

  // 1. Sözlük Kartları Veritabanı
  const TERMS = [
    {
      id: 'ai-search-visibility',
      title: 'Yapay Zeka Arama Görünürlüğü',
      badge: 'INDUSTRY_TERM',
      category: 'temel',
      def: 'Bir web sitesinin üretken yapay zeka arama deneyimlerinde bulunabilir, anlaşılabilir ve referans verilebilir olma derecesi.',
      keywords: [
        'yapay zeka arama gorunurlugu', 'ai search visibility', 'yapay zeka',
        'gorunurluk', 'visibility', 'ai arama', 'chatgpt', 'perplexity', 'gemini',
        'copilot', 'llm', 'bulunabilirlik', 'referans', 'kaynak'
      ],
      relatedPageIds: ['yapay-zeka-gorunurluk', 'ai-crawler-checker', 'site-tarama', 'ai-mention-tracker', 'ai-website-readiness', 'ornek-rapor']
    },
    {
      id: 'geo',
      title: 'GEO (Üretken Motor Optimizasyonu)',
      badge: 'METHODOLOGY',
      category: 'metodoloji',
      def: 'Generative Engine Optimization; web içeriğinin geleneksel arama motorlarının ötesinde, yanıt üreten yapay zeka modelleri tarafından tercih edilmesini sağlayan optimizasyon disiplini.',
      keywords: [
        'geo', 'generative engine optimization', 'uretken motor optimizasyonu',
        'uretken motor', 'yapay zeka seo', 'ai seo', 'chatgpt seo', 'perplexity seo',
        'generative ai', 'yeni nesil seo', 'arama motoru', 'optimizasyon'
      ],
      relatedPageIds: ['geo-cozum', 'yapay-zeka-gorunurluk', 'ai-mention-tracker', 'site-tarama', 'ornek-rapor']
    },
    {
      id: 'aeo',
      title: 'AEO (Yanıt Motoru Optimizasyonu)',
      badge: 'METHODOLOGY',
      category: 'metodoloji',
      def: 'Answer Engine Optimization; arama sonuç sayfalarında doğrudan yanıt kutuları, sesli asistanlar ve yapay zeka özetleri için içeriği optimize etme süreci.',
      keywords: [
        'aeo', 'answer engine optimization', 'yanit motoru optimizasyonu',
        'yanit motoru', 'answer engine', 'direkt yanit', 'sesli arama', 'voice search',
        'ozet', 'cevap', 'zero click', 'sifir tiklama', 'ai overviews'
      ],
      relatedPageIds: ['aeo-cozum', 'teknik-seo-kontrol', 'schema-validator', 'yapay-zeka-gorunurluk']
    },
    {
      id: 'llmo',
      title: 'LLMO (Büyük Dil Modeli Optimizasyonu)',
      badge: 'DISCIPLINE',
      category: 'disiplin',
      def: 'Large Language Model Optimization; içeriğin büyük dil modelleri tarafından taranması, indekslenmesi, doğru anlamlandırılması ve eğitim/çıkarım süreçlerinde doğru temsil edilmesi için yapılan çalışmalar.',
      keywords: [
        'llmo', 'large language model optimization', 'buyuk dil modeli optimizasyonu',
        'dil modeli', 'buyuk dil modelleri', 'llm', 'dil modeli egitimi', 'token',
        'cikarim', 'inference', 'model salience', 'model temsili'
      ],
      relatedPageIds: ['llmo-cozum', 'ai-mention-tracker', 'schema-rehber', 'deterministik-katmanlar']
    },
    {
      id: 'aao',
      title: 'AAO (Ajentik Arama Optimizasyonu)',
      badge: 'FUTURE_STANDARD',
      category: 'ajent',
      def: 'Agentic Search Optimization; kullanıcı adına karar veren ve işlem gerçekleştiren otonom yapay zeka ajanları için web sitelerinin teknik ve yapısal olarak optimize edilmesi.',
      keywords: [
        'aao', 'agentic search optimization', 'ajentik arama optimizasyonu',
        'ajentik', 'ajan', 'agent', 'otonom ajan', 'autonomous agent', 'otonom',
        'eylem', 'islem yapma', 'operator', 'computer use', 'browser use'
      ],
      relatedPageIds: ['aao-cozum', 'erisilebilirlik', 'platform', 'araclar']
    },
    {
      id: 'rag',
      title: 'RAG (Geri Getirme Destekli Üretim)',
      badge: 'ARCHITECTURE',
      category: 'mimari',
      def: 'Retrieval-Augmented Generation; yapay zeka modellerinin yanıt üretirken harici bilgi kaynaklarından güncel ve doğrulanmış verileri çekerek içeriği zenginleştirdiği mimari.',
      keywords: [
        'rag', 'retrieval augmented generation', 'geri getirme destekli uretim',
        'geri getirme', 'retrieval', 'vektor', 'vector search', 'semantik arama',
        'embedding', 'chunking', 'harici bilgi', 'vektor veritabani', 'context window'
      ],
      relatedPageIds: ['rag-cozum', 'ai-readiness-checklist', 'ai-website-readiness', 'deterministik-katmanlar']
    },
    {
      id: 'eeat',
      title: 'E-E-A-T (Deneyim, Uzmanlık, Otorite, Güvenilirlik)',
      badge: 'FRAMEWORK',
      category: 'guven',
      def: 'Experience, Expertise, Authoritativeness, Trustworthiness; içerik üreticisinin ve web sitesinin güvenilirliğini değerlendiren kalite çerçevesi. Yapay zeka sistemleri referans seçerken bu sinyalleri ağırlıklandırır.',
      keywords: [
        'eeat', 'e-e-a-t', 'deneyim', 'uzmanlik', 'otorite', 'guvenilirlik',
        'experience', 'expertise', 'authoritativeness', 'trustworthiness',
        'guven', 'kalite sinyali', 'kalite', 'itibar', 'kanit', 'yazar', 'biyografi'
      ],
      relatedPageIds: ['eeat-strateji', 'kanit-standardi', 'guvenlik-basliklari']
    },
    {
      id: 'llms-txt',
      title: 'llms.txt',
      badge: 'SPECIFICATION',
      category: 'standart',
      def: 'Web sitelerinin kök dizininde yer alan ve yapay zeka modellerine sitenin yapısını, önemli içeriklerini ve amacını markdown formatında sunan standartlaştırılmış bildirim dosyası.',
      keywords: [
        'llms.txt', 'llms-txt', 'llmstxt', 'llms txt', 'bildirim dosyasi',
        'markdown', 'site ozeti', 'ai robots', 'manifest', 'standart', 'kok dizin'
      ],
      relatedPageIds: ['llms-validator', 'llms-rehber', 'ai-tarayici-rehber', 'ai-crawler-checker', 'ai-tarayici-katalog']
    },
    {
      id: 'sitemap',
      title: 'Sitemap (Site Haritası)',
      badge: 'TECHNICAL_SPEC',
      category: 'teknik',
      def: 'Bir web sitesindeki sayfaların, videoların ve diğer dosyaların listesini ve aralarındaki ilişkileri içeren XML tabanlı dosya. Yapay zeka tarayıcıları için kritik bir harita görevi görür.',
      keywords: [
        'sitemap', 'site haritasi', 'xml sitemap', 'tarama', 'harita',
        'indeks', 'url listesi', 'lastmod', 'tarayici butcesi', 'crawl budget'
      ],
      relatedPageIds: ['teknik-seo-kontrol', 'link-kontrol', 'site-tarama', 'ai-crawler-checker']
    },
    {
      id: 'query-fan-out',
      title: 'Query Fan-out (Sorgu Genişlemesi)',
      badge: 'PROCESS',
      category: 'surec',
      def: 'Bir kullanıcının tek bir arama sorgusunun, yapay zeka motorları tarafından arka planda birden çok alt sorguya ve farklı açılara bölünerek paralel olarak araştırılması süreci.',
      keywords: [
        'query fan out', 'query fan-out', 'query fanout', 'sorgu genislemesi',
        'alt sorgu', 'paralel arama', 'arama derinligi', 'sub-query', 'semantik genisleme'
      ],
      relatedPageIds: ['deterministik-katmanlar', 'yapay-zeka-gorunurluk', 'ornek-rapor']
    },
    {
      id: 'source-eligibility',
      title: 'Kaynak Olma Uygunluğu (Source Eligibility)',
      badge: 'CORE_CONCEPT',
      category: 'temel',
      def: 'Bir web sayfasının veya içeriğin, yapay zeka modelleri tarafından doğrudan referans ve alıntı kaynağı olarak seçilmek için taşıması gereken teknik, yapısal ve içeriksel yeterlilik düzeyi.',
      keywords: [
        'kaynak olma uygunlugu', 'source eligibility', 'kaynak olma', 'kaynak',
        'alinti olma', 'referans olma', 'citation', 'guvenilirlik esigi', 'teknik yeterlilik'
      ],
      relatedPageIds: ['site-tarama', 'fix-mandate', 'fiyatlandirma', 'ai-website-readiness']
    }
  ];

  // 2. İlgili Sayfalar, Rehberler ve Canlı Tanı Araçları Veritabanı
  const PAGES = [
    {
      id: 'geo-cozum',
      title: 'GEO (Üretken Motor Optimizasyonu) Çözümleri',
      url: '/tr/geo-optimizasyon/',
      category: 'cozum',
      badge: 'ÇÖZÜM & STRATEJİ',
      badgeClass: 'cozum',
      desc: 'ChatGPT Search, Perplexity ve Gemini aramalarında birincil öneri ve kaynak olmak için eksiksiz GEO optimizasyon hizmeti.',
      keywords: ['geo', 'geo optimizasyon', 'uretken motor', 'generative engine optimization', 'chatgpt', 'perplexity', 'gemini', 'ai seo']
    },
    {
      id: 'rag-cozum',
      title: 'RAG Optimizasyonu & Vektör İndeksleme',
      url: '/tr/rag-optimizasyon/',
      category: 'cozum',
      badge: 'MİMARİ & ÇÖZÜM',
      badgeClass: 'cozum',
      desc: 'LLM arama motorlarının bilgi çekme (retrieval) aşamasında içeriğinizi kusursuz semantik parçalara ayırmasını sağlayan altyapı.',
      keywords: ['rag', 'rag optimizasyon', 'retrieval augmented generation', 'vektor', 'semantik arama', 'chunking', 'embedding']
    },
    {
      id: 'aeo-cozum',
      title: 'AEO (Yanıt Motoru Optimizasyonu)',
      url: '/tr/aeo-answer-engine/',
      category: 'cozum',
      badge: 'DİREKT YANIT ÇÖZÜMÜ',
      badgeClass: 'cozum',
      desc: 'Sıfırıncı sıra, AI Overviews ve sesli asistanlarda doğrudan cevap kaynağı olarak konumlanma optimizasyonları.',
      keywords: ['aeo', 'aeo answer engine', 'yanit motoru', 'answer engine optimization', 'zero click', 'direkt yanit', 'ai overviews']
    },
    {
      id: 'llmo-cozum',
      title: 'LLMO (Büyük Dil Modeli Optimizasyonu)',
      url: '/tr/llmo-optimizasyon/',
      category: 'cozum',
      badge: 'MODEL OPTİMİZASYONU',
      badgeClass: 'cozum',
      desc: 'Büyük dil modellerinin ağırlıklarında ve çıkarım döngülerinde kurumsal marka varlığınızı güçlendiren derin modelleme.',
      keywords: ['llmo', 'llmo optimizasyon', 'large language model', 'buyuk dil modeli', 'model egitimi', 'cikarim', 'salience']
    },
    {
      id: 'aao-cozum',
      title: 'AAO (Ajentik Arama Optimizasyonu)',
      url: '/tr/aao-ajent-optimizasyon/',
      category: 'cozum',
      badge: 'OTONOM AJANLAR',
      badgeClass: 'cozum',
      desc: 'Kullanıcılar adına otonom işlem yapan AI ajanlarının web sitenizde engelsiz aksiyon alabilmesi için teknik optimizasyon.',
      keywords: ['aao', 'ajent', 'ajan', 'agentic', 'otonom ajan', 'operator', 'browser use', 'eylem']
    },
    {
      id: 'eeat-strateji',
      title: 'E-E-A-T Güven Sinyalleri & Doğrulanabilirlik',
      url: '/tr/e-e-a-t-guven-sinyalleri/',
      category: 'cozum',
      badge: 'GÜVEN & OTORİTE',
      badgeClass: 'cozum',
      desc: 'Deneyim, Uzmanlık, Otoriterlik ve Güvenilirlik sinyallerini yapay zekanın doğrulayabileceği biçimde yapılandırma.',
      keywords: ['eeat', 'e-e-a-t', 'guven', 'otorite', 'uzmanlik', 'deneyim', 'trust', 'itibar', 'kanit']
    },
    {
      id: 'llms-validator',
      title: 'llms.txt Doğrulayıcı & Syntax Testi',
      url: '/tr/llms-txt-validator/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'Sitenizin /llms.txt ve /llms-full.txt dosyalarının standartlara uygunluğunu, link sağlığını ve LLM okunabilirliğini anında test edin.',
      keywords: ['llms.txt', 'llms-txt', 'llmstxt', 'llms validator', 'dogrulayici', 'syntax', 'kontrol', 'test']
    },
    {
      id: 'llms-rehber',
      title: 'llms.txt Kapsamlı Uygulama Rehberi',
      url: '/tr/rehberler/llms-txt/',
      category: 'rehber',
      badge: 'TEKNİK REHBER',
      badgeClass: 'rehber',
      desc: 'Yapay zeka modellerine sitenizi özetleyen standart /llms.txt dosyasının nasıl hazırlanacağını ve en iyi pratiklerini öğrenin.',
      keywords: ['llms.txt rehber', 'llms nasil hazirlanir', 'markdown ozet', 'llmstxt kilavuz', 'rehber']
    },
    {
      id: 'ai-crawler-checker',
      title: 'AI Crawler Checker & Bot Erişim Denetimi',
      url: '/tr/ai-crawler-checker/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'GPTBot, ClaudeBot, PerplexityBot ve Applebot gibi AI tarayıcılarının robots.txt izinlerini ve engellerini denetleyin.',
      keywords: ['crawler', 'ai crawler', 'bot', 'gptbot', 'claudebot', 'perplexitybot', 'robots.txt', 'tarayici', 'erisim', 'engelleme']
    },
    {
      id: 'ai-tarayici-rehber',
      title: 'AI Tarayıcı Erişimi ve robots.txt Yönetimi',
      url: '/tr/rehberler/ai-tarayici-erisimi/',
      category: 'rehber',
      badge: 'TEKNİK REHBER',
      badgeClass: 'rehber',
      desc: 'Yapay zeka botlarını doğru yönetme, robots.txt yönergeleri ve tarama bütçesi optimizasyon stratejileri.',
      keywords: ['ai tarayici erisimi', 'robots.txt rehber', 'bot yonetimi', 'crawl budget', 'erisim izinleri']
    },
    {
      id: 'ai-tarayici-katalog',
      title: 'AI Tarayıcıları ve User-Agent Kataloğu',
      url: '/tr/referans/ai-tarayicilar/',
      category: 'rehber',
      badge: 'REFERANS KATALOG',
      badgeClass: 'rehber',
      desc: 'Tüm popüler AI arama motorlarının resmi tarayıcı adları, IP blokları, User-Agent dizgileri ve tarama davranışları.',
      keywords: ['ai tarayicilari', 'user agent katalog', 'bot listesi', 'crawler list', 'referans', 'ip bloklari']
    },
    {
      id: 'teknik-seo-kontrol',
      title: 'Teknik SEO & Sitemap Kontrol Aracı',
      url: '/tr/teknik-seo-kontrol/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'XML sitemap yapısı, canonical uyumu, robots direktifleri ve meta etiketlerin teknik kontrolünü tek tıkla gerçekleştirin.',
      keywords: ['sitemap', 'site haritasi', 'teknik seo', 'xml sitemap', 'canonical', 'robots', 'tarama', 'kontrol', 'test']
    },
    {
      id: 'schema-validator',
      title: 'Schema.org & Yapısal Veri Doğrulayıcı',
      url: '/tr/schema-validator/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'JSON-LD ve Schema.org varlık grafiğinizi test edin; yapay zeka modelleri için varlık netliğini ve doğruluğunu denetleyin.',
      keywords: ['schema', 'sema', 'yapisal veri', 'json ld', 'json-ld', 'structured data', 'varlik grafi', 'validator']
    },
    {
      id: 'schema-rehber',
      title: 'AI İçin Yapısal Veri ve Varlık Grafı Rehberi',
      url: '/tr/rehberler/ai-icin-yapisal-veri/',
      category: 'rehber',
      badge: 'TEKNİK REHBER',
      badgeClass: 'rehber',
      desc: 'LLM\'lerin sitenizi bir varlık (entity) olarak tanıması ve bilgi grafına işlemesi için Schema.org kurgulama kılavuzu.',
      keywords: ['yapisal veri rehber', 'schema rehberi', 'entity graph', 'bilgi grafi', 'varlik iliskisi']
    },
    {
      id: 'ai-mention-tracker',
      title: 'AI Mention & Atıf Takip Aracı',
      url: '/tr/ai-mention-tracker/',
      category: 'arac',
      badge: 'GÖRÜNÜRLÜK ARACI',
      badgeClass: 'arac',
      desc: 'Markanızın ChatGPT, Perplexity ve Gemini aramalarında ne sıklıkla kaynak gösterildiğini ve atıf aldığını canlı ölçün.',
      keywords: ['mention', 'atif', 'citation', 'kaynak olma', 'marka takibi', 'share of model', 'model izleme']
    },
    {
      id: 'ai-website-readiness',
      title: 'AI Web Sitesi Hazırlık Testi',
      url: '/tr/ai-website-readiness/',
      category: 'arac',
      badge: 'HAZIRLIK TESTİ',
      badgeClass: 'arac',
      desc: 'Web sitenizin yeni nesil yapay zeka arama sistemleri ve ajanlar için hazır olup olmadığını anında puanlayın.',
      keywords: ['hazirlik', 'readiness', 'ai web sitesi hazirlik', 'hazirlik testi', 'uygunluk', 'skor']
    },
    {
      id: 'ai-readiness-checklist',
      title: 'AI Web Sitesi Hazırlık Kontrol Listesi',
      url: '/tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi/',
      category: 'rehber',
      badge: 'KONTROL LİSTESİ',
      badgeClass: 'rehber',
      desc: 'Sitenizi yapay zeka ekosistemine uyumlu hale getirmek için adım adım izlemeniz gereken teknik ve mimari adımlar.',
      keywords: ['checklist', 'kontrol listesi', 'hazirlik rehberi', 'adim adim', 'kontrol']
    },
    {
      id: 'site-tarama',
      title: 'Derinlemesine Site Tarama & Sağlık Denetimi',
      url: '/tr/site-tarama/',
      category: 'cozum',
      badge: 'ANALİZ & TARAMA',
      badgeClass: 'cozum',
      desc: 'Yapay zeka arama motorlarının sitenizi taramasını engelleyen teknik borçları ve kaynak olma engellerini tespit edin.',
      keywords: ['site tarama', 'tarama', 'crawl', 'audit', 'saglik denetimi', 'kaynak olma uygunlugu', 'source eligibility']
    },
    {
      id: 'link-kontrol',
      title: 'Kırık Link & İç Bağlantı Analiz Aracı',
      url: '/tr/link-kontrol/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'İç bağlantı mimarisi ve 404 veren kırık linkleri tespit ederek arama motoru botlarının tarama bütçesini koruyun.',
      keywords: ['link', 'baglanti', 'kirik link', '404', 'ic baglanti', 'internal link', 'tarama butcesi']
    },
    {
      id: 'guvenlik-basliklari',
      title: 'Güvenlik Başlıkları (Security Headers) Denetleyicisi',
      url: '/tr/guvenlik-basliklari-kontrol/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'CSP, HSTS, X-Frame-Options başlıklarını denetleyerek sitenizin güvenilirlik skorunu ve E-E-A-T sinyallerini yükseltin.',
      keywords: ['guvenlik', 'security', 'headers', 'csp', 'hsts', 'guvenilirlik', 'eeat sinyali']
    },
    {
      id: 'erisilebilirlik',
      title: 'Web Erişilebilirlik (A11y) & DOM Denetleyicisi',
      url: '/tr/erisilebilirlik-kontrol/',
      category: 'arac',
      badge: 'ÜCRETSİZ TANI ARACI',
      badgeClass: 'arac',
      desc: 'AI ajanlarının ve ekran okuyucuların sayfa yapısını hatasız parse edebilmesi için semantik HTML ve ARIA denetimi.',
      keywords: ['erisilebilirlik', 'a11y', 'accessibility', 'dom', 'aria', 'semantik html', 'ajentik erisim']
    },
    {
      id: 'deterministik-katmanlar',
      title: 'Deterministik Katmanlar & Bilgi Mimarisi',
      url: '/tr/deterministik-katmanlar/',
      category: 'cozum',
      badge: 'MİMARİ & STANDART',
      badgeClass: 'cozum',
      desc: 'Olasılıksal yapay zeka modellerine karşın doğrulanabilir, deterministik veri katmanları inşa etme mimarisi.',
      keywords: ['deterministik', 'katmanlar', 'bilgi mimarisi', 'query fan out', 'kesin bilgi', 'dogrulama']
    },
    {
      id: 'kanit-standardi',
      title: 'HTML Kanıt Standardı (Proof Protocol)',
      url: '/tr/kanit-standardi/',
      category: 'cozum',
      badge: 'DOĞRULAMA STANDARDI',
      badgeClass: 'cozum',
      desc: 'AI sistemlerinin halüsinasyon görmesini engelleyen ve kurumsal iddiaları matematiksel kanıtlarla doğrulayan standart.',
      keywords: ['kanit standardi', 'proof protocol', 'dogrulama', 'halusinasyon', 'guven', 'standart']
    },
    {
      id: 'ornek-rapor',
      title: 'Örnek Yapay Zeka Görünürlük Denetim Raporu',
      url: '/tr/ornek-rapor/',
      category: 'rapor',
      badge: 'CANLI RAPOR',
      badgeClass: 'rehber',
      desc: 'HTML platformunun kurumsal siteler için ürettiği çok boyutlu yapay zeka görünürlüğü ve teknik denetim raporu çıktısı.',
      keywords: ['rapor', 'ornek rapor', 'denetim raporu', 'gorunurluk raporu', 'analiz ciktisi', 'sample report']
    },
    {
      id: 'fiyatlandirma',
      title: 'Platform Paketleri & Fiyatlandırma',
      url: '/tr/fiyatlandirma/',
      category: 'cozum',
      badge: 'PAKETLER & HİZMET',
      badgeClass: 'cozum',
      desc: 'Tek seferlik denetimlerden sürekli AI görünürlük ve onarım (Fix Mandate) paketlerine kadar şeffaf fiyatlandırma.',
      keywords: ['fiyat', 'fiyatlandirma', 'paket', 'ucret', 'abonelik', 'maliyet', 'audit fiyati', 'satin al']
    },
    {
      id: 'araclar',
      title: 'Tüm Yapay Zeka ve SEO Tanı Araçları',
      url: '/tr/araclar/',
      category: 'arac',
      badge: 'ARAÇ MERKEZİ',
      badgeClass: 'arac',
      desc: 'HTML platformunun geliştirdiği tüm ücretsiz test, validasyon ve tarama araçlarının toplu kataloğu.',
      keywords: ['araclar', 'tum araclar', 'ucretsiz araclar', 'testler', 'tanilar', 'arac merkezi']
    },
    {
      id: 'yapay-zeka-gorunurluk',
      title: 'Yapay Zeka Arama Görünürlüğü Analizi',
      url: '/tr/yapay-zeka-arama-gorunurlugu/',
      category: 'cozum',
      badge: 'ÇÖZÜM & ANALİZ',
      badgeClass: 'cozum',
      desc: 'Kurumsal sitenizin üretken yapay zeka arama motorlarındaki genel görünürlüğünü, indeks durumunu ve açıklarını analiz edin.',
      keywords: ['yapay zeka arama gorunurlugu', 'ai search visibility', 'analiz', 'gorunurluk analizi', 'cozum']
    },
    {
      id: 'fix-mandate',
      title: 'Fix Mandate - Garantili Onarım Direktifleri',
      url: '/tr/fix-mandate/',
      category: 'cozum',
      badge: 'ONARIM DİREKTİFİ',
      badgeClass: 'cozum',
      desc: 'Denetim sonrasında tespit edilen AI görünürlük açıklarının teknik ekiplerce kolayca uygulanabilmesi için garantili direktifler.',
      keywords: ['fix mandate', 'onarim', 'direktif', 'duzeltme', 'teknik onarim', 'uygulama']
    },
    {
      id: 'iletisim',
      title: 'İletişim & Kurumsal AI Danışmanlığı',
      url: '/tr/iletisim/',
      category: 'cozum',
      badge: 'İLETİŞİM & DANIŞMANLIK',
      badgeClass: 'cozum',
      desc: 'Yapay zeka arama görünürlüğü, GEO entegrasyonu ve teknik denetim için uzman ekibimizle iletişime geçin.',
      keywords: ['iletisim', 'danismanlik', 'destek', 'teklif', 'uzman', 'kurumsal']
    },
    {
      id: 'sss',
      title: 'Sıkça Sorulan Sorular (SSS)',
      url: '/tr/sss/',
      category: 'rehber',
      badge: 'BİLGİ MERKEZİ',
      badgeClass: 'rehber',
      desc: 'Yapay zeka görünürlüğü, GEO, LLM indeksleme ve platform çalışma prensiplerine dair merak edilenler.',
      keywords: ['sss', 'sikca sorulan sorular', 'sorular', 'faq', 'destek', 'rehber', 'nasil calisir']
    },
    {
      id: 'platform',
      title: 'HTML Platformu - Kurumsal AI Görünürlük Altyapısı',
      url: '/tr/platform/',
      category: 'cozum',
      badge: 'KURUMSAL PLATFORM',
      badgeClass: 'cozum',
      desc: 'Büyük ölçekli web siteleri için uçtan uca yapay zeka arama görünürlüğü, tarama izleme ve optimizasyon platformu.',
      keywords: ['platform', 'kurumsal platform', 'altyapi', 'html platform', 'enterprise']
    }
  ];

  // 3. Türkçe Karakter Normalizasyonu (Arama ve Eşleştirme İçin)
  function trNormalize(str) {
    if (!str) return '';
    return str
      .toString()
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .replace(/ı/g, 'i')
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s.-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // 4. Damerau-Levenshtein Mesafesi Algoritması
  function damerauLevenshtein(source, target) {
    if (!source) return target ? target.length : 0;
    if (!target) return source.length;
    if (source === target) return 0;

    const srcLen = source.length;
    const tgtLen = target.length;
    const d = [];

    for (let i = 0; i <= srcLen; i++) {
      d[i] = [i];
    }
    for (let j = 0; j <= tgtLen; j++) {
      d[0][j] = j;
    }

    for (let i = 1; i <= srcLen; i++) {
      for (let j = 1; j <= tgtLen; j++) {
        const cost = source[i - 1] === target[j - 1] ? 0 : 1;
        d[i][j] = Math.min(
          d[i - 1][j] + 1,       // silme
          d[i][j - 1] + 1,       // ekleme
          d[i - 1][j - 1] + cost // değiştirme
        );

        // Bitişik harf yer değişimi (transposition)
        if (i > 1 && j > 1 && source[i - 1] === target[j - 2] && source[i - 2] === target[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }

    return d[srcLen][tgtLen];
  }

  // Benzerlik Oranı (0.0 ile 1.0 arası)
  function similarityRatio(s1, s2) {
    if (s1 === s2) return 1.0;
    const maxLen = Math.max(s1.length, s2.length);
    if (maxLen === 0) return 1.0;
    const dist = damerauLevenshtein(s1, s2);
    return Math.max(0, (maxLen - dist) / maxLen);
  }

  // 5. Bir Terimi Sorguya Göre Puanlama (Scoring Engine)
  function scoreTerm(term, query) {
    const rawQuery = query.trim();
    if (!rawQuery) return { score: 0, exact: false, fuzzy: false, confidence: 0 };

    const qNorm = trNormalize(rawQuery);
    const qTokens = qNorm.split(' ').filter(Boolean);

    let maxScore = 0;
    let isExact = false;
    let isFuzzy = false;
    let bestConfidence = 0;
    let matchedWord = '';

    // ID tam eşleşmesi
    if (term.id === qNorm || term.id.replace(/-/g, '') === qNorm.replace(/-/g, '')) {
      return { score: 1000, exact: true, fuzzy: false, confidence: 1.0, matchedWord: term.title };
    }

    const titleNorm = trNormalize(term.title);
    const defNorm = trNormalize(term.def);
    const kwNormList = term.keywords.map(kw => trNormalize(kw));

    // A. Başlıkta Tam / Kısmi Kontrol
    if (titleNorm === qNorm) {
      return { score: 900, exact: true, fuzzy: false, confidence: 1.0, matchedWord: term.title };
    }
    if (titleNorm.startsWith(qNorm)) {
      maxScore = Math.max(maxScore, 750);
      isExact = true;
      bestConfidence = 0.95;
      matchedWord = term.title;
    } else if (titleNorm.includes(qNorm)) {
      maxScore = Math.max(maxScore, 600);
      isExact = true;
      bestConfidence = 0.9;
      matchedWord = term.title;
    }

    // B. Anahtar Kelimelerde Tam / Kısmi Kontrol
    for (const kw of kwNormList) {
      if (kw === qNorm) {
        maxScore = Math.max(maxScore, 850);
        isExact = true;
        bestConfidence = 1.0;
        matchedWord = kw;
      } else if (kw.startsWith(qNorm)) {
        maxScore = Math.max(maxScore, 700);
        isExact = true;
        bestConfidence = Math.max(bestConfidence, 0.92);
        if (!matchedWord) matchedWord = kw;
      } else if (kw.includes(qNorm)) {
        maxScore = Math.max(maxScore, 500);
        isExact = true;
        bestConfidence = Math.max(bestConfidence, 0.85);
        if (!matchedWord) matchedWord = kw;
      }
    }

    // C. Çoklu Kelime (Token) Eşleşmesi
    if (qTokens.length > 1) {
      let tokensMatched = 0;
      for (const t of qTokens) {
        if (titleNorm.includes(t) || kwNormList.some(kw => kw.includes(t)) || defNorm.includes(t)) {
          tokensMatched++;
        }
      }
      if (tokensMatched === qTokens.length) {
        maxScore = Math.max(maxScore, 650);
        isExact = true;
        bestConfidence = Math.max(bestConfidence, 0.88);
      } else if (tokensMatched > 0) {
        const ratio = tokensMatched / qTokens.length;
        maxScore = Math.max(maxScore, 300 * ratio);
      }
    }

    // D. Tanım İçi Eşleşme
    if (defNorm.includes(qNorm)) {
      maxScore = Math.max(maxScore, 350);
      isExact = true;
      bestConfidence = Math.max(bestConfidence, 0.8);
    }

    // E. Yazım Hatası Toleransı (Fuzzy Matching)
    const allWords = new Set();
    titleNorm.split(' ').forEach(w => w.length >= 3 && allWords.add(w));
    kwNormList.forEach(kw => {
      kw.split(' ').forEach(w => w.length >= 3 && allWords.add(w));
    });

    const compareWord = qTokens.length === 1 ? qNorm : qTokens[0];
    if (compareWord.length >= 3) {
      for (const word of allWords) {
        const maxLen = Math.max(compareWord.length, word.length);
        const lenDiff = Math.abs(word.length - compareWord.length);
        const maxAllowedDiff = maxLen >= 8 ? 3 : 2;
        if (lenDiff > maxAllowedDiff) continue;

        const dist = damerauLevenshtein(compareWord, word);
        const sim = (maxLen - dist) / maxLen;

        let maxAllowedDist = 1;
        if (maxLen >= 5) maxAllowedDist = 2;
        if (maxLen >= 8) maxAllowedDist = 3;

        if (dist <= maxAllowedDist && sim >= 0.60) {
          const fuzzyScore = 400 * sim;
          if (fuzzyScore > maxScore) {
            maxScore = fuzzyScore;
            isFuzzy = true;
            bestConfidence = sim;
            matchedWord = word;
          }
        }
      }
    }

    return {
      score: maxScore,
      exact: isExact,
      fuzzy: isFuzzy,
      confidence: bestConfidence,
      matchedWord: matchedWord || term.title
    };
  }

  // 6. Bir Sayfayı Sorguya ve Eşleşen Terimlere Göre Puanlama
  function scorePage(page, query, matchedTermIds) {
    const rawQuery = query.trim();
    if (!rawQuery) return { score: 0 };

    const qNorm = trNormalize(rawQuery);
    const qTokens = qNorm.split(' ').filter(Boolean);

    let score = 0;
    const titleNorm = trNormalize(page.title);
    const descNorm = trNormalize(page.desc);
    const kwNormList = page.keywords.map(kw => trNormalize(kw));

    // A. Eşleşen Terimler üzerinden doğrudan bağ puanı
    if (matchedTermIds && matchedTermIds.length > 0) {
      matchedTermIds.forEach((termId, index) => {
        const term = TERMS.find(t => t.id === termId);
        if (term && term.relatedPageIds && term.relatedPageIds.includes(page.id)) {
          // Sıralamadaki ilk terimlere daha yüksek öncelik ver
          const priorityBonus = Math.max(50, 200 - (index * 40));
          score += priorityBonus;
        }
      });
    }

    // B. Başlık ve URL eşleşmesi
    if (titleNorm.includes(qNorm)) {
      score += 250;
    } else if (page.url.toLowerCase().includes(qNorm)) {
      score += 200;
    }

    // C. Anahtar kelimeler
    for (const kw of kwNormList) {
      if (kw === qNorm) {
        score += 200;
        break;
      } else if (kw.includes(qNorm)) {
        score += 120;
        break;
      }
    }

    // D. Token eşleşmeleri
    if (qTokens.length > 1) {
      let tokensMatched = 0;
      for (const t of qTokens) {
        if (titleNorm.includes(t) || kwNormList.some(kw => kw.includes(t)) || descNorm.includes(t)) {
          tokensMatched++;
        }
      }
      score += (tokensMatched / qTokens.length) * 100;
    }

    // E. Açıklama metni eşleşmesi
    if (descNorm.includes(qNorm)) {
      score += 60;
    }

    // F. Fuzzy tolerans
    if (score === 0 && qTokens[0] && qTokens[0].length >= 3) {
      for (const kw of kwNormList) {
        const words = kw.split(' ');
        for (const w of words) {
          if (Math.abs(w.length - qTokens[0].length) <= 2) {
            const sim = similarityRatio(qTokens[0], w);
            if (sim >= 0.7) {
              score += 80 * sim;
              break;
            }
          }
        }
        if (score > 0) break;
      }
    }

    return { score };
  }

  // 7. HTML Güvenli Escape
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 8. İlgili Sayfaları Ekrana Render Etme
  function renderRelatedPages(pagesToRender, query) {
    const sectionEl = document.getElementById('glossaryRelatedPagesSection');
    const gridEl = document.getElementById('relatedPagesGrid');
    const countEl = document.getElementById('relatedPagesCount');
    const subTitleEl = document.getElementById('relatedPagesSubtitle');

    if (!sectionEl || !gridEl) return;

    if (!pagesToRender || pagesToRender.length === 0) {
      sectionEl.style.display = 'none';
      gridEl.innerHTML = '';
      return;
    }

    // Başlık ve Sayaç Güncelle
    if (countEl) {
      countEl.textContent = `${pagesToRender.length} Sayfa & Araç`;
    }
    if (subTitleEl) {
      subTitleEl.innerHTML = `‘<strong>${escapeHtml(query)}</strong>’ konusuyla ilgili platform sayfaları ve uygulamalı tanı araçları:`;
    }

    // Kartları Oluştur
    gridEl.innerHTML = pagesToRender.map(page => `
      <a href="${page.url}" class="related-page-card" target="_self">
        <div class="related-page-card-top">
          <span class="related-page-badge ${page.badgeClass}">${escapeHtml(page.badge)}</span>
          <h4 class="related-page-title">${escapeHtml(page.title)}</h4>
          <p class="related-page-desc">${escapeHtml(page.desc)}</p>
        </div>
        <div class="related-page-footer">
          <span class="related-page-url">${page.url}</span>
          <span class="related-page-cta">
            Sayfayı İncele
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </a>
    `).join('');

    sectionEl.style.display = 'block';
  }

  // 9. Gelişmiş Türkçe Regex Üreteci & Sıfır Kaymalı Metin Vurgulama
  function makeTurkishRegex(term) {
    if (!term) return null;
    const map = {
      'c': '[cçCÇ]', 'ç': '[cçCÇ]',
      'g': '[gğGĞ]', 'ğ': '[gğGĞ]',
      'i': '[iıİI]', 'ı': '[iıİI]',
      'o': '[oöOÖ]', 'ö': '[oöOÖ]',
      's': '[sşSŞ]', 'ş': '[sşSŞ]',
      'u': '[uüUÜ]', 'ü': '[uüUÜ]'
    };
    
    let pattern = '';
    for (const ch of term) {
      const lower = ch.toLowerCase();
      if (map[lower]) {
        pattern += map[lower];
      } else if (/[a-z0-9]/i.test(ch)) {
        pattern += ch;
      } else if (!/\s/.test(ch)) {
        pattern += '\\' + ch;
      } else {
        pattern += '\\s+';
      }
    }
    try {
      return new RegExp(pattern, 'gi');
    } catch (e) {
      return null;
    }
  }

  function highlightText(rootEl, token) {
    if (!rootEl || !token || token.trim().length < 2) return;

    const regex = makeTurkishRegex(token.trim());
    if (!regex) return;

    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement && (node.parentElement.classList.contains('highlight-match') || node.parentElement.tagName === 'MARK')) continue;

      const text = node.nodeValue;
      if (regex.test(text)) {
        nodesToReplace.push(node);
      }
      regex.lastIndex = 0;
    }

    nodesToReplace.forEach(node => {
      const text = node.nodeValue;
      regex.lastIndex = 0;
      
      const fragment = document.createDocumentFragment();
      let lastIdx = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        const matchIdx = match.index;
        const matchedText = match[0];

        if (matchIdx > lastIdx) {
          fragment.appendChild(document.createTextNode(text.substring(lastIdx, matchIdx)));
        }

        const mark = document.createElement('mark');
        mark.className = 'highlight-match';
        mark.textContent = matchedText;
        fragment.appendChild(mark);

        lastIdx = matchIdx + matchedText.length;
      }

      if (lastIdx < text.length) {
        fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
      }

      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }

  // Vurguları Temizle
  function clearHighlights() {
    const marks = document.querySelectorAll('mark.highlight-match');
    marks.forEach(mark => {
      const parent = mark.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent), mark);
        parent.normalize();
      }
    });
  }

  // 10. DOM Başlatıcı & Arama Olayları
  function initGlossarySearch() {
    const searchInput = document.getElementById('glossarySearchInput');
    const searchClear = document.getElementById('glossarySearchClear');
    const searchSubmit = document.getElementById('glossarySearchSubmit');
    const dropdownResults = document.getElementById('glossaryDropdownResults');
    const feedbackBanner = document.getElementById('glossaryFeedbackBanner');
    const feedbackBadge = document.getElementById('glossaryFeedbackBadge');
    const feedbackText = document.getElementById('glossaryFeedbackText');
    const feedbackReset = document.getElementById('glossaryFeedbackReset');
    const resultsCountEl = document.getElementById('glossaryResultsCount');
    const emptyState = document.getElementById('glossaryEmptyState');
    const quickPills = document.querySelectorAll('.quick-pill');
    const cards = Array.from(document.querySelectorAll('.glossary-card'));

    if (!searchInput) return;

    let debounceTimer = null;
    let dropdownSelectedIndex = -1;

    // Karta Yumuşak Kaydırma
    function scrollToCard(cardId) {
      const targetCard = document.getElementById(cardId);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.remove('pulse-focus');
        void targetCard.offsetWidth; // Reflow tetikle
        targetCard.classList.add('pulse-focus');
        setTimeout(() => targetCard.classList.remove('pulse-focus'), 2500);
      }
    }

    // Canlı Açılır Liste (Dropdown) Güncellemesi
    function updateDropdown(termResults, relatedPages, query) {
      if (!dropdownResults) return;

      const hasTerms = termResults && termResults.length > 0;
      const hasPages = relatedPages && relatedPages.length > 0;

      if (!hasTerms && !hasPages) {
        dropdownResults.style.display = 'none';
        return;
      }

      dropdownResults.innerHTML = '';
      dropdownSelectedIndex = -1;

      // Terimler Bölümü
      if (hasTerms) {
        const termsToShow = termResults.slice(0, 3);
        termsToShow.forEach(r => {
          const item = document.createElement('div');
          item.className = 'dropdown-item';
          item.setAttribute('role', 'option');
          item.setAttribute('data-target-id', r.term.id);

          const reasonHtml = r.fuzzy
            ? `<span class="dropdown-match-reason">⚡ En yakın eşleşme: ${escapeHtml(r.matchedWord)}</span>`
            : '';

          item.innerHTML = `
            <div class="dropdown-item-head">
              <span class="dropdown-item-title">${escapeHtml(r.term.title)}</span>
              <span class="dropdown-item-badge">${escapeHtml(r.term.badge)}</span>
            </div>
            <div class="dropdown-item-snippet">${escapeHtml(r.term.def)}</div>
            ${reasonHtml}
          `;

          item.addEventListener('click', () => {
            scrollToCard(r.term.id);
            dropdownResults.style.display = 'none';
          });

          dropdownResults.appendChild(item);
        });
      }

      // İlgili Sayfalar & Tanı Araçları Bölümü
      if (hasPages) {
        const titleEl = document.createElement('div');
        titleEl.className = 'dropdown-section-title';
        titleEl.textContent = 'İlgili Platform Sayfaları & Tanı Araçları';
        dropdownResults.appendChild(titleEl);

        const pagesToShow = relatedPages.slice(0, 3);
        pagesToShow.forEach(page => {
          const item = document.createElement('a');
          item.href = page.url;
          item.className = 'dropdown-item is-page-link';
          item.setAttribute('role', 'option');

          item.innerHTML = `
            <div class="dropdown-item-head">
              <span class="dropdown-item-title">${escapeHtml(page.title)}</span>
              <span class="dropdown-item-badge" style="background:rgba(16, 185, 129, 0.15); color:#10b981; border-color:rgba(16, 185, 129, 0.3);">${escapeHtml(page.badge)}</span>
            </div>
            <div class="dropdown-item-snippet">${escapeHtml(page.desc)}</div>
          `;

          dropdownResults.appendChild(item);
        });
      }

      dropdownResults.style.display = 'block';
    }

    // Ana Arama ve Filtreleme Motoru
    function executeSearch(query, isManualTrigger) {
      const q = (query !== undefined ? query : searchInput.value).trim();

      // Temizle butonunu göster/gizle
      if (searchClear) {
        searchClear.style.display = q ? 'flex' : 'none';
      }

      clearHighlights();

      // URL Parametresini Güncelle (Bookmarkable & Shareable)
      if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
        try {
          const u = new URL(window.location);
          if (q) {
            u.searchParams.set('q', q);
          } else {
            u.searchParams.delete('q');
          }
          window.history.replaceState({}, '', u);
        } catch(e) {}
      }

      // Hızlı Konu Haplarını Senkronize Et
      if (quickPills) {
        quickPills.forEach(pill => {
          const filter = pill.getAttribute('data-filter');
          if (!q && filter === 'all') {
            pill.classList.add('is-active');
          } else if (filter && filter.toLowerCase() === q.toLowerCase()) {
            pill.classList.add('is-active');
          } else {
            pill.classList.remove('is-active');
          }
        });
      }

      const noTermHint = document.getElementById('glossaryNoTermHint');
      const noTermHolder = document.getElementById('noTermQueryHolder');

      // Boş sorgu durumunda tüm kartları göster, ilgili sayfaları gizle
      if (!q) {
        cards.forEach(card => {
          card.style.display = '';
          card.classList.remove('pulse-focus');
        });
        if (feedbackBanner) feedbackBanner.style.display = 'none';
        if (dropdownResults) dropdownResults.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
        if (noTermHint) noTermHint.style.display = 'none';
        renderRelatedPages([], '');

        if (resultsCountEl) {
          resultsCountEl.innerHTML = `<span class="dot"></span> <b>11</b> terim listeleniyor`;
          resultsCountEl.classList.remove('empty');
        }
        return;
      }

      // 1. Sözlük Terimlerini Skorla
      const termResults = TERMS.map(term => {
        const res = scoreTerm(term, q);
        return {
          term: term,
          card: document.getElementById(term.id),
          score: res.score,
          exact: res.exact,
          fuzzy: res.fuzzy,
          confidence: res.confidence,
          matchedWord: res.matchedWord
        };
      }).filter(r => r.score > 0);

      termResults.sort((a, b) => b.score - a.score);

      const visibleIds = new Set(termResults.map(r => r.term.id));
      let visibleTermCount = 0;

      cards.forEach(card => {
        const isMatch = visibleIds.has(card.id);
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) visibleTermCount++;
      });

      // 2. İlgili Sayfaları Skorla ve Listele
      const matchedTermIds = termResults.map(r => r.term.id);
      const pageResults = PAGES.map(page => {
        const res = scorePage(page, q, matchedTermIds);
        return {
          page: page,
          score: res.score
        };
      }).filter(r => r.score > 0);

      pageResults.sort((a, b) => b.score - a.score);
      const topPages = pageResults.slice(0, 6).map(r => r.page);

      // İlgili Sayfaları Sayfada Render Et
      renderRelatedPages(topPages, q);

      // 3. Vurgulama Yap
      if (visibleTermCount > 0) {
        const topResult = termResults[0];
        const highlightToken = topResult.exact ? q : topResult.matchedWord;
        termResults.slice(0, 3).forEach(r => {
          if (r.card) {
            const h2 = r.card.querySelector('.term-head h2');
            const def = r.card.querySelector('.term-def');
            highlightText(h2, highlightToken);
            highlightText(def, highlightToken);
          }
        });
      }

      // 4. Sonuç Sayacı Güncellemesi
      if (resultsCountEl) {
        if (visibleTermCount > 0 || topPages.length > 0) {
          const termText = visibleTermCount > 0 ? `<b>${visibleTermCount}</b> terim` : '';
          const pageText = topPages.length > 0 ? `<b>${topPages.length}</b> sayfa/araç` : '';
          const joinedText = [termText, pageText].filter(Boolean).join(' ve ');

          resultsCountEl.innerHTML = `<span class="dot"></span> ${joinedText} bulundu`;
          resultsCountEl.classList.remove('empty');
        } else {
          resultsCountEl.innerHTML = `<span class="dot"></span> <b>0</b> sonuç`;
          resultsCountEl.classList.add('empty');
        }
      }

      // 5. Boş Durum (Empty State) ve İpucu Şeridi Yönetimi
      if (noTermHint) {
        if (visibleTermCount === 0 && topPages.length > 0) {
          noTermHint.style.display = 'block';
          if (noTermHolder) noTermHolder.textContent = q;
        } else {
          noTermHint.style.display = 'none';
        }
      }

      if (visibleTermCount === 0 && topPages.length === 0) {
        if (emptyState) {
          emptyState.style.display = 'flex';
          const queryHolder = document.getElementById('glossaryEmptyQuery');
          if (queryHolder) queryHolder.textContent = q;
        }
        if (feedbackBanner) feedbackBanner.style.display = 'none';
        if (dropdownResults) dropdownResults.style.display = 'none';
        if (noTermHint) noTermHint.style.display = 'none';
        return;
      } else {
        if (emptyState) emptyState.style.display = 'none';
      }

      // 6. Akıllı Yazım Hatası / Yakın Eşleşme Bildirim Şeridi (Fuzzy Feedback)
      const hasFuzzyOnly = termResults.some(r => r.fuzzy) && !termResults.some(r => r.exact);
      const topMatch = termResults[0];

      if (hasFuzzyOnly && topMatch && topMatch.confidence >= 0.65) {
        if (feedbackBanner && feedbackBadge && feedbackText) {
          feedbackBanner.style.display = 'flex';
          feedbackBadge.className = 'feedback-badge';
          feedbackBadge.innerHTML = `⚡ Yazım Düzeltmesi`;
          feedbackText.innerHTML = `‘<strong>${escapeHtml(q)}</strong>’ için en yakın sonuç <strong>${escapeHtml(topMatch.term.title)}</strong> (${Math.round(topMatch.confidence * 100)}% eşleşme) ve ilgili sayfalar otomatik getirildi.`;
        }
      } else if (feedbackBanner) {
        if (topMatch && topMatch.exact) {
          feedbackBanner.style.display = 'flex';
          feedbackBadge.className = 'feedback-badge exact';
          feedbackBadge.innerHTML = `✓ Tam Eşleşme`;
          feedbackText.innerHTML = `‘<strong>${escapeHtml(q)}</strong>’ ile ilgili terimler ve platform sayfaları listeleniyor.`;
        } else if (topPages.length > 0 && visibleTermCount === 0) {
          feedbackBanner.style.display = 'flex';
          feedbackBadge.className = 'feedback-badge exact';
          feedbackBadge.innerHTML = `🌐 İlgili Sayfalar`;
          feedbackText.innerHTML = `‘<strong>${escapeHtml(q)}</strong>’ ile doğrudan ilişkili platform sayfaları ve tanı araçları aşağıda listeleniyor.`;
        } else {
          feedbackBanner.style.display = 'none';
        }
      }

      // 7. Canlı Açılır Liste (Dropdown Autocomplete)
      updateDropdown(termResults, topPages, q);

      // Manuel tetiklendiyse ilk sonuca kaydır
      if (isManualTrigger) {
        if (termResults.length > 0) {
          scrollToCard(termResults[0].term.id);
        } else if (topPages.length > 0) {
          const sectionEl = document.getElementById('glossaryRelatedPagesSection');
          if (sectionEl) sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (dropdownResults) dropdownResults.style.display = 'none';
      }
    }

    // Olay Dinleyicileri
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        executeSearch(searchInput.value, false);
      }, 40);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim().length > 0) {
        executeSearch(searchInput.value, false);
      }
    });

    if (searchSubmit) {
      searchSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        executeSearch(searchInput.value, true);
      });
    }

    searchInput.addEventListener('keydown', (e) => {
      const items = dropdownResults ? Array.from(dropdownResults.querySelectorAll('.dropdown-item')) : [];

      if (e.key === 'ArrowDown') {
        if (items.length > 0 && dropdownResults.style.display !== 'none') {
          e.preventDefault();
          dropdownSelectedIndex = (dropdownSelectedIndex + 1) % items.length;
          highlightDropdownItem(items);
        }
      } else if (e.key === 'ArrowUp') {
        if (items.length > 0 && dropdownResults.style.display !== 'none') {
          e.preventDefault();
          dropdownSelectedIndex = (dropdownSelectedIndex - 1 + items.length) % items.length;
          highlightDropdownItem(items);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (dropdownSelectedIndex >= 0 && items[dropdownSelectedIndex]) {
          const sel = items[dropdownSelectedIndex];
          if (sel.tagName === 'A' && sel.href) {
            window.location.href = sel.href;
          } else {
            sel.click();
          }
        } else {
          executeSearch(searchInput.value, true);
        }
        if (dropdownResults) dropdownResults.style.display = 'none';
      } else if (e.key === 'Escape') {
        searchInput.value = '';
        executeSearch('', false);
      }
    });

    function highlightDropdownItem(items) {
      items.forEach((item, idx) => {
        item.classList.toggle('is-selected', idx === dropdownSelectedIndex);
      });
    }

    // Temizle Butonu
    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        executeSearch('', false);
      });
    }

    // Feedback Sıfırlama Butonu
    if (feedbackReset) {
      feedbackReset.addEventListener('click', () => {
        searchInput.value = '';
        executeSearch('', false);
        searchInput.focus();
      });
    }

    // Sayfa Dışına Tıklanınca Dropdown'ı Kapat
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sozluk-search-shell')) {
        if (dropdownResults) dropdownResults.style.display = 'none';
      }
    });

    // Global Klavye Kısayolları (Cmd+K / Ctrl+K / "/")
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      } else if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });

    // Hızlı Konu Hapları (Quick Filter Pills)
    quickPills.forEach(pill => {
      pill.addEventListener('click', () => {
        quickPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');

        const filter = pill.getAttribute('data-filter');
        if (filter === 'all') {
          searchInput.value = '';
          executeSearch('', false);
        } else {
          searchInput.value = filter;
          executeSearch(filter, true);
        }
      });
    });

    // Boş Durum Öneri Butonları
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.suggestion-btn');
      if (btn) {
        const query = btn.getAttribute('data-suggest');
        if (query) {
          searchInput.value = query;
          executeSearch(query, true);
        }
      }
    });

    // URL Parametresi Kontrolü
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      executeSearch(initialQuery, true);
    }
  }

  // Global Export
  if (typeof window !== 'undefined') {
    window.HTML_GLOSSARY_SEARCH = {
      TERMS,
      PAGES,
      trNormalize,
      damerauLevenshtein,
      similarityRatio,
      scoreTerm,
      scorePage,
      init: initGlossarySearch
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGlossarySearch);
    } else {
      initGlossarySearch();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      TERMS,
      PAGES,
      trNormalize,
      damerauLevenshtein,
      similarityRatio,
      scoreTerm,
      scorePage
    };
  }
})();
