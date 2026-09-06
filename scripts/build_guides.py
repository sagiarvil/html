import os
import json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from build_full_site import get_header, get_footer
def write_page(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content.strip() + chr(10))
    print('Generated Guide:', rel_path)
guides_data = [
    {
        "id": "ai-website-readiness-checklist",
        "en_slug": "en/guides/ai-website-readiness-checklist",
        "tr_slug": "tr/rehberler/ai-web-sitesi-hazirlik-kontrol-listesi",
        "tool_link_en": "/en/ai-website-readiness/",
        "tool_link_tr": "/tr/ai-website-readiness/",
        "tool_name_en": "AI Website Readiness Checker",
        "tool_name_tr": "AI Web Sitesi Hazırlık Denetimi",
        "en": {
            "title": "AI Website Readiness Checklist — 10 Technical Pillars | HTML&HTML",
            "desc": "A comprehensive, actionable 10-step checklist to ensure your website is crawlable, machine-readable, and verifiable by modern AI search models.",
            "kicker": "TECHNICAL GUIDE",
            "h1": "AI Website Readiness: <em>The Complete 10-Step Technical Checklist</em>",
            "sub": "How to structure HTTP headers, robots.txt bot governance, semantic JSON-LD entities, and markdown discovery surfaces for autonomous AI retrieval.",
            "read_time": "7 min read · Verified against canonical scanner rules",
            "body": """
<h2>Introduction: Why Traditional SEO Is Not Enough</h2>
<p>Search engines no longer rely solely on inverted text indexes and keyword frequencies. Systems like ChatGPT Search, Perplexity, Claude, and Google Gemini synthesize answers using Retrieval-Augmented Generation (RAG). If your technical infrastructure blocks, obfuscates, or fragments content, generative models either fail to retrieve your site or hallucinate incorrect details.</p>

<h2>Pillar 1: Explicit AI Crawler Governance (RFC 9309)</h2>
<p>Modern crawlers must be managed intentionally in <code>robots.txt</code>. Do not rely on a generic <code>User-agent: *</code> rule, which often inadvertently blocks specialized search user-agents while intending only to stop bulk scrapers.</p>
<pre><code># Recommended robots.txt configuration
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /private/
Allow: /</code></pre>

<h2>Pillar 2: Clean HTTP Edge Responses & HSTS</h2>
<p>AI crawlers operate with strict latency budgets. Multi-hop 301 redirects or slow TTFB (>1.5s) frequently cause retrieval agents to drop candidate documents. Ensure HSTS is enabled with <code>max-age=31536000; includeSubDomains; preload</code> to prevent insecure protocol downgrades.</p>

<h2>Pillar 3: The Single Primary H1 and Semantic Heading Hierarchy</h2>
<p>Documents with multiple H1 tags or arbitrary heading jumps (e.g. H1 directly to H4) confuse semantic parsers that extract page outlines. Every indexable page must feature exactly one H1 expressing the primary subject, followed by cleanly nested H2 and H3 elements.</p>

<h2>Pillar 4: JSON-LD Entity Graphs and Authorship</h2>
<p>Unambiguous structured data connects your content to the global knowledge graph. Always declare the <code>Organization</code>, <code>Author</code>, and <code>WebSite</code> entities using JSON-LD rather than deprecated Microdata formats.</p>

<h2>Pillar 5: Implementation of llms.txt (v2 Specification)</h2>
<p>Place a clean, curated <code>/llms.txt</code> file in your domain root. Use markdown headings, blockquote descriptions, and clean URLs linking directly to authoritative documentation.</p>

<h2>Pillar 6: Accurate Canonical Tags & Self-Referential Integrity</h2>
<p>Every indexable page must contain a self-referential canonical tag matching its exact scheme, apex or www host, and path. Conflicting canonicals cause AI crawlers to discard extracted metadata.</p>

<h2>Pillar 7: Programmatic Accessibility & Form Labels</h2>
<p>Neural models understand accessible HTML with greater fidelity. Provide explicit <code>aria-label</code> or <code>&lt;label for="..."&gt;</code> associations on all interactive controls, and maintain valid <code>&lt;html lang="..."&gt;</code> attributes.</p>

<h2>Pillar 8: Security Baseline & Clickjacking Defenses</h2>
<p>Modern AI agents verifying site trust check for baseline HTTP headers: <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>, and sensible <code>Content-Security-Policy</code> rules.</p>

<h2>Pillar 9: Elimination of 404s and Broken Internal Links</h2>
<p>AI agents exploring internal link graphs stop crawling when encountering repeated dead ends. Probe internal links regularly and eliminate circular redirects.</p>

<h2>Pillar 10: Rel=Describedby and Markdown Alternates</h2>
<p>Advertise machine-readable documentation directly within HTTP Link headers or HTML <code>&lt;link rel="describedby" href="/llms.txt"&gt;</code> elements so AI bots discover structured documentation immediately.</p>
"""
        },
        "tr": {
            "title": "AI Web Sitesi Hazırlık Kontrol Listesi — 10 Temel Kural | HTML&HTML",
            "desc": "Web sitenizin modern yapay zeka modelleri ve arama ajanları tarafından sorunsuz taranması, anlaşılması ve doğrulanması için 10 adımlık teknik rehber.",
            "kicker": "TEKNİK REHBER",
            "h1": "AI Web Sitesi Hazırlığı: <em>10 Adımlık Eksiksiz Teknik Kontrol Listesi</em>",
            "sub": "HTTP başlıkları, robots.txt bot izinleri, anlamsal JSON-LD varlıkları ve markdown keşif yüzeylerini otonom AI erişimi için nasıl yapılandırmalısınız?",
            "read_time": "7 dk okuma · Kanonik tarama kurallarıyla doğrulandı",
            "body": """
<h2>Giriş: Geleneksel SEO Neden Artık Yetersiz?</h2>
<p>Arama motorları artık yalnızca kelime frekanslarına ve ters dizinlere güvenmiyor. ChatGPT Search, Perplexity, Claude ve Google Gemini gibi sistemler yanıtları Retrieval-Augmented Generation (RAG) mimarisiyle sentezler. Teknik altyapınız içeriği engeller, gizler veya parçalarsa yapay zeka modelleri sitenizi bulamaz ya da yanlış bilgi üretir (halüsinasyon).</p>

<h2>1. Adım: Belirgin AI Tarayıcı Yönetişimi (RFC 9309)</h2>
<p>Modern tarayıcılar <code>robots.txt</code> içinde açıkça yönetilmelidir. Yalnızca genel bir <code>User-agent: *</code> kuralına güvenmeyin; bu kural bazen toplu kazımayı engellemek isterken gerçek zamanlı arama botlarını da yanlışlıkla engeller.</p>
<pre><code># Önerilen robots.txt yapılandırması
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: GPTBot
Disallow: /private/
Allow: /</code></pre>

<h2>2. Adım: Temiz HTTP Uç Yanıtları ve HSTS</h2>
<p>Yapay zeka tarayıcıları katı gecikme sınırları ile çalışır. Çok adımlı 301 yönlendirmeleri veya yavaş yanıt süreleri (>1.5 sn) arama ajanlarının sayfayı terk etmesine neden olur. SSL düşürme saldırılarını önlemek için HSTS başlığını <code>max-age=31536000; includeSubDomains; preload</code> ile yapılandırın.</p>

<h2>3. Adım: Tek Ana H1 ve Semantik Başlık Hiyerarşisi</h2>
<p>Birden fazla H1 içeren veya başlık seviyelerini atlayan (örneğin H1'den doğrudan H4'e geçen) sayfalar anlamsal ayrıştırıcıların kafasını karıştırır. Dizine açık her sayfada ana konuyu özetleyen tam bir H1 ve onu takip eden H2/H3 blokları bulunmalıdır.</p>

<h2>4. Adım: JSON-LD Varlık Grafı ve Yazarlık Bilgisi</h2>
<p>Yapısal veriler içeriğinizi küresel bilgi grafına bağlar. Microdata yerine doğrudan JSON-LD kullanarak <code>Organization</code>, <code>Author</code> ve <code>WebSite</code> varlıklarını açıkça tanımlayın.</p>

<h2>5. Adım: llms.txt (v2 Standardı) Kurulumu</h2>
<p>Sitenizin kök dizinine temiz ve seçilmiş bir <code>/llms.txt</code> dosyası yerleştirin. Markdown başlıkları, özet blok alıntıları ve doğrudan dokümantasyona işaret eden temiz bağlantılar kullanın.</p>

<h2>6. Adım: Doğru Kanonik Etiketler ve Kendine Referans</h2>
<p>Dizine açık her sayfa, tam protokol ve alan adı ile eşleşen bir self-canonical etiketi taşımalıdır. Çelişkili kanonikler AI tarayıcılarının sayfayı tekilleştirememesine yol açar.</p>

<h2>7. Adım: Programatik Erişilebilirlik ve Form Etiketleri</h2>
<p>Yapay zeka modelleri erişilebilir HTML kodunu çok daha yüksek doğrulukla ayrıştırır. Tüm form alanlarında <code>&lt;label for="..."&gt;</code> veya <code>aria-label</code> ilişkilerini koruyun ve geçerli <code>&lt;html lang="..."&gt;</code> tanımlayın.</p>

<h2>8. Adım: Güvenlik Temeli ve Başlık Savunması</h2>
<p>Modern ajanlar site güvenilirliğini doğrulamak için temel HTTP başlıklarını kontrol eder: <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code> ve tutarlı <code>Content-Security-Policy</code> kuralları.</p>

<h2>9. Adım: 404 Hatalarının ve Kırık İç Bağlantıların Temizlenmesi</h2>
<p>Yapay zeka ajanları iç link grafını tararken kırık linklerle karşılaştıklarında taramayı durdururlar. 404 dönen iç linkleri ve gereksiz yönlendirme zincirlerini kaldırın.</p>

<h2>10. Adım: Rel=Describedby ve Makine Keşfi</h2>
<p>HTML belgelerinizin head alanına veya HTTP yanıt başlıklarına <code>&lt;link rel="describedby" href="/llms.txt"&gt;</code> ekleyerek LLM ajanlarının dokümantasyon dosyanızı anında keşfetmesini sağlayın.</p>
"""
        }
    },
    {
        "id": "llms-txt",
        "en_slug": "en/guides/llms-txt",
        "tr_slug": "tr/rehberler/llms-txt",
        "tool_link_en": "/en/llms-txt-validator/",
        "tool_link_tr": "/tr/llms-txt-validator/",
        "tool_name_en": "llms.txt Validator",
        "tool_name_tr": "llms.txt Doğrulayıcı",
        "en": {
            "title": "llms.txt Specification & Implementation Guide | HTML&HTML",
            "desc": "Understand the llms.txt standard. Learn file placement, v2 syntax rules, llms-full.txt aggregation, and rel=describedby discovery for AI models.",
            "kicker": "SPECIFICATION GUIDE",
            "h1": "llms.txt v2 Standard: <em>Architecture, Syntax & Discovery</em>",
            "sub": "A rigorous technical breakdown of the emerging standard providing clean markdown context to large language models and autonomous agents.",
            "read_time": "6 min read · Updated for v2 describedby spec",
            "body": """
<h2>What Is llms.txt?</h2>
<p>llms.txt is a community-driven specification that standardizes how websites expose structured, token-efficient Markdown content to LLMs. Instead of forcing AI crawlers to parse complex CSS, JavaScript bundles, and navigation chrome, an llms.txt file serves as an index of your most critical documentation in plain Markdown.</p>

<h2>File Structure & Syntax Grammar</h2>
<p>An llms.txt file must begin with a single H1 header stating the project or organization name, followed immediately by a blockquote summary of its purpose:</p>
<pre><code># Acme Corporation

> Acme provides enterprise distributed database infrastructure with sub-millisecond replication.

## Documentation
- [Architecture Overview](https://example.com/docs/architecture.md): Core distributed consensus engine
- [API Reference](https://example.com/docs/api.md): REST and gRPC endpoint declarations
- [Deployment Guide](https://example.com/docs/deploy.md): Kubernetes operators and bare-metal setup</code></pre>

<h2>llms.txt vs. llms-full.txt</h2>
<p>The specification defines two files:</p>
<ul>
  <li><code>/llms.txt</code>: The curated directory index of clean Markdown links with short descriptions.</li>
  <li><code>/llms-full.txt</code>: The complete, concatenated text of all referenced documentation, enabling single-request context window injection.</li>
</ul>

<h2>Discovery via rel="describedby"</h2>
<p>Merely placing the file at the root is not enough. You should link to it semantically using the <code>rel="describedby"</code> relationship, both in HTML and HTTP headers:</p>
<pre><code>&lt;!-- In HTML head --&gt;
&lt;link rel="describedby" href="/llms.txt" type="text/markdown"&gt;

# In HTTP Response Headers
Link: &lt;/llms.txt&gt;; rel="describedby"; type="text/markdown"</code></pre>

<h2>Common Syntax Mistakes</h2>
<ol>
  <li><strong>Missing Blockquote:</strong> Omitting the blockquote summary immediately beneath the H1 title breaks standard v2 parsers.</li>
  <li><strong>Broken Links:</strong> Linking to URLs that return HTTP 404, 500, or require login cookies.</li>
  <li><strong>Unformatted Lists:</strong> Using arbitrary paragraphs instead of standardized markdown bullet lists.</li>
</ol>
"""
        },
        "tr": {
            "title": "llms.txt Şartnamesi ve Uygulama Rehberi | HTML&HTML",
            "desc": "llms.txt standardını anlayın. Dosya yerleşimi, v2 sözdizimi kuralları, llms-full.txt birleştirmesi ve rel=describedby keşfi hakkında teknik rehber.",
            "kicker": "ŞARTNAME REHBERİ",
            "h1": "llms.txt v2 Standardı: <em>Mimari, Sözdizimi ve Keşif</em>",
            "sub": "Büyük dil modellerine ve otonom ajanlara temiz markdown bağlamı sunan gelişmekte olan standardın titiz bir teknik analizi.",
            "read_time": "6 dk okuma · v2 describedby şartnamesine güncellendi",
            "body": """
<h2>llms.txt Nedir?</h2>
<p>llms.txt, web sitelerinin yapay zeka modellerine temiz, token tasarruflu Markdown içeriği nasıl sunacağını standartlaştıran bir topluluk şartnamesidir. AI botlarını karmaşık CSS, JavaScript ve görsel kalıpları ayrıştırmaya zorlamak yerine, llms.txt en kritik dokümantasyonunuzu sade Markdown bağlantılarıyla dizinler.</p>

<h2>Dosya Yapısı ve Sözdizimi Grameri</h2>
<p>Bir llms.txt dosyası mutlaka proje veya kurum adını belirten tek bir H1 başlığı ile başlamalı ve hemen altında amacını açıklayan bir alıntı bloğu (blockquote) yer almalıdır:</p>
<pre><code># Acme Corporation

> Acme, milisaniye altı replikasyona sahip kurumsal dağıtık veritabanı altyapısı sunar.

## Dokümantasyon
- [Mimari Genel Bakış](https://example.com/docs/architecture.md): Dağıtık mutabakat motoru mimarisi
- [API Referansı](https://example.com/docs/api.md): REST ve gRPC uç nokta tanımları
- [Kurulum Kılavuzu](https://example.com/docs/deploy.md): Kubernetes operatörleri ve donanım kurulumu</code></pre>

<h2>llms.txt ve llms-full.txt Arasındaki Fark</h2>
<p>Şartname iki dosya tanımlar:</p>
<ul>
  <li><code>/llms.txt</code>: Kısa açıklamalar içeren seçilmiş Markdown bağlantıları dizini.</li>
  <li><code>/llms-full.txt</code>: Modellerin tek seferde tüm bağlamı okuyabilmesi için tüm belgelerin birleştirilmiş tam metni.</li>
</ul>

<h2>rel="describedby" ile Keşfedilebilirlik</h2>
<p>Dosyayı yalnızca kök dizine koymak yeterli değildir. Hem HTML içinde hem de HTTP başlıklarında <code>rel="describedby"</code> ile belirtilmelidir:</p>
<pre><code>&lt;!-- HTML head içinde --&gt;
&lt;link rel="describedby" href="/llms.txt" type="text/markdown"&gt;

# HTTP Yanıt Başlıklarında
Link: &lt;/llms.txt&gt;; rel="describedby"; type="text/markdown"</code></pre>

<h2>En Sık Yapılan Hatalar</h2>
<ol>
  <li><strong>Eksik Alıntı Bloğu:</strong> H1 başlığının hemen altındaki blok alıntıyı unutmak standart v2 ayrıştırıcılarının hata vermesine neden olur.</li>
  <li><strong>Kırık Bağlantılar:</strong> 404 veya 500 hatası dönen veya giriş gerektiren bağlantılar vermek.</li>
  <li><strong>Biçimlendirilmemiş Listeler:</strong> Standart markdown madde işaretleri yerine düz paragraflar kullanmak.</li>
</ol>
"""
        }
    },
    {
        "id": "ai-crawler-access",
        "en_slug": "en/guides/ai-crawler-access",
        "tr_slug": "tr/rehberler/ai-tarayici-erisimi",
        "tool_link_en": "/en/ai-crawler-checker/",
        "tool_link_tr": "/tr/ai-crawler-checker/",
        "tool_name_en": "AI Crawler Checker",
        "tool_name_tr": "AI Tarayıcı Kontrolü",
        "en": {
            "title": "AI Crawler Access: Robots.txt & Bot Management | HTML&HTML",
            "desc": "A technical guide to configuring robots.txt for AI crawlers: GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, and Google-Extended.",
            "kicker": "OPERATIONAL GUIDE",
            "h1": "AI Crawler Access: <em>Managing Search Bots vs. Training Crawlers</em>",
            "sub": "Learn how to decouple model training collection from real-time AI search retrieval so your website remains visible in generative answers.",
            "read_time": "5 min read · RFC 9309 Compliant",
            "body": """
<h2>Training Bots vs. Real-Time Search Crawlers</h2>
<p>The most common mistake webmasters make is treating all AI bots identically. AI companies maintain two distinct categories of crawlers:</p>
<ul>
  <li><strong>Training Crawlers (e.g. GPTBot, ClaudeBot):</strong> Scrape public text in bulk to train future foundation models.</li>
  <li><strong>Search & Retrieval Bots (e.g. OAI-SearchBot, Claude-SearchBot, PerplexityBot):</strong> Execute real-time queries to cite and summarize web content when users ask questions.</li>
</ul>

<h2>Configuring Robots.txt Safely</h2>
<p>If you want citations in ChatGPT Search and Perplexity without allowing bulk training on your copyrighted materials, configure your robots.txt as follows:</p>
<pre><code># Allow real-time search retrieval
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

# Restrict or block offline training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /</code></pre>

<h2>The Fallback Wildcard (*) Trap</h2>
<p>According to RFC 9309, crawlers evaluate the most specific User-agent group matching their identity. If a crawler has no specific group, it falls back to <code>User-agent: *</code>. If your wildcard block disallows <code>/</code>, all AI search bots without specific allow directives will be blocked completely.</p>
"""
        },
        "tr": {
            "title": "AI Tarayıcı Erişimi: Robots.txt ve Bot Yönetimi | HTML&HTML",
            "desc": "AI botları için robots.txt yapılandırma rehberi: GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot ve Google-Extended kuralları.",
            "kicker": "OPERASYONEL REHBER",
            "h1": "AI Tarayıcı Erişimi: <em>Arama Botları ve Eğitim Tarayıcıları</em>",
            "sub": "Model eğitimi kazıması ile gerçek zamanlı arama botlarını birbirinden nasıl ayıracağınızı ve sitenizi AI yanıtlarında nasıl görünür kılacağınızı öğrenin.",
            "read_time": "5 dk okuma · RFC 9309 standartlarıyla uyumlu",
            "body": """
<h2>Eğitim Botları ile Gerçek Zamanlı Arama Botları Arasındaki Fark</h2>
<p>Web yöneticilerinin en sık yaptığı hata tüm yapay zeka botlarını aynı kefeye koymaktır. Yapay zeka şirketleri iki farklı bot kategorisi işletir:</p>
<ul>
  <li><strong>Model Eğitim Botları (Örn. GPTBot, ClaudeBot):</strong> Gelecekteki temel modelleri eğitmek için herkese açık metinleri toplu olarak kazır.</li>
  <li><strong>Arama ve Kaynak Botları (Örn. OAI-SearchBot, Claude-SearchBot, PerplexityBot):</strong> Kullanıcılar soru sorduğunda web sitelerini gerçek zamanlı tarayarak özetleyen ve kaynak gösteren botlardır.</li>
</ul>

<h2>Robots.txt Dosyasını Güvenle Yapılandırma</h2>
<p>Telif haklı içeriklerinizin toplu eğitimde kullanılmasını istemiyor ancak ChatGPT Search ve Perplexity gibi arama motorlarında kaynak gösterilmek istiyorsanız şu ayrımı yapın:</p>
<pre><code># Gerçek zamanlı arama botlarına izin verin
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

# Çevrimdışı eğitim botlarını kısıtlayın veya engelleyin
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /</code></pre>

<h2>Joker Karakter (*) Tuzağı</h2>
<p>RFC 9309 standardına göre botlar kendi adlarıyla en çok eşleşen kuralları uygular. Eğer bota özel bir blok yoksa genel <code>User-agent: *</code> kuralına geri döner. Genel blokta <code>Disallow: /</code> varsa ve özel kural tanımlamamışsanız tüm AI arama botları da engellenir.</p>
"""
        }
    },
    {
        "id": "structured-data-for-ai",
        "en_slug": "en/guides/structured-data-for-ai",
        "tr_slug": "tr/rehberler/ai-icin-yapisal-veri",
        "tool_link_en": "/en/schema-validator/",
        "tool_link_tr": "/tr/schema-validator/",
        "tool_name_en": "Schema Validator",
        "tool_name_tr": "Yapısal Veri Kontrolü",
        "en": {
            "title": "Structured Data for AI: JSON-LD & Entity Disambiguation | HTML&HTML",
            "desc": "Learn how modern LLMs use Schema.org JSON-LD to understand entities, organizations, and products, and how to avoid common semantic markup traps.",
            "kicker": "SEMANTIC GUIDE",
            "h1": "Structured Data for AI: <em>JSON-LD Entity Graphs</em>",
            "sub": "How to structure Schema.org markup so large language models can extract unambiguous entities and facts from your web pages.",
            "read_time": "6 min read · Schema.org 2026 Standards",
            "body": """
<h2>How Neural Retrieval Systems Read Schema</h2>
<p>When an AI agent ingests a web page, it parses both unstructured prose and structured JSON-LD data. High-quality Schema.org markup acts as ground-truth anchor data: it disambiguates whether 'Apple' refers to the fruit or the corporation, declares explicit author identities, and specifies precise pricing and availability.</p>

<h2>Essential Schema Types for AI Retrieval</h2>
<ol>
  <li><strong>Organization & WebSite:</strong> Declares official legal names, alternate names, brand logos, and customer support channels.</li>
  <li><strong>Article / TechArticle:</strong> Declares the exact publication date, last modified date, author URL, and publisher hierarchy.</li>
  <li><strong>Product & Offer:</strong> Prevents AI assistants from hallucinating outdated prices by declaring currency, availability, and return policies explicitly.</li>
</ol>

<h2>Clean JSON-LD Graph Example</h2>
<pre><code>{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#org",
      "name": "Acme Inc.",
      "url": "https://example.com/",
      "logo": "https://example.com/logo.png"
    },
    {
      "@type": "TechArticle",
      "headline": "Understanding Distributed Consensus",
      "author": { "@type": "Person", "name": "Jane Doe" },
      "publisher": { "@id": "https://example.com/#org" },
      "datePublished": "2026-01-15T08:00:00Z"
    }
  ]
}</code></pre>
"""
        },
        "tr": {
            "title": "AI İçin Yapısal Veri: JSON-LD ve Varlık Tanımlama | HTML&HTML",
            "desc": "Modern LLM'lerin varlıkları, kurumları ve ürünleri anlamak için Schema.org JSON-LD yapılarını nasıl kullandığını ve sık yapılan hataları öğrenin.",
            "kicker": "SEMANTİK REHBER",
            "h1": "AI İçin Yapısal Veri: <em>JSON-LD Varlık Grafı</em>",
            "sub": "Büyük dil modellerinin sayfalarınızdan net varlıklar ve olgular çıkarabilmesi için Schema.org etiketlerini nasıl yapılandırmalısınız?",
            "read_time": "6 dk okuma · Schema.org 2026 standartları",
            "body": """
<h2>Yapay Zeka Sistemleri Yapısal Veriyi Nasıl Okur?</h2>
<p>Bir yapay zeka ajanı web sayfasını okurken hem serbest metni hem de yapılandırılmış JSON-LD verilerini işler. Kaliteli bir Schema.org yapısı temel referans noktası görevi görür: kelimelerin anlamsal karmaşasını çözer, açık yazar kimliklerini belirtir ve ürün fiyatları ile stok durumunu netleştirir.</p>

<h2>AI Keşfi İçin Temel Şema Tipleri</h2>
<ol>
  <li><strong>Organization ve WebSite:</strong> Resmi ticari unvanı, marka logolarını ve kurumsal iletişim kanallarını tanıtır.</li>
  <li><strong>Article / TechArticle:</strong> Yayın tarihini, güncellenme tarihini, yazar profilini ve yayıncı hiyerarşisini belgeler.</li>
  <li><strong>Product ve Offer:</strong> Yapay zeka asistanlarının eski fiyatları uydurmasını engellemek için para birimi, stok ve iade politikalarını açıkça tanımlar.</li>
</ol>

<h2>Temiz JSON-LD Graf Örneği</h2>
<pre><code>{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#org",
      "name": "Acme Inc.",
      "url": "https://example.com/",
      "logo": "https://example.com/logo.png"
    },
    {
      "@type": "TechArticle",
      "headline": "Dağıtık Mutabakat Protokolleri",
      "author": { "@type": "Person", "name": "Ahmet Yılmaz" },
      "publisher": { "@id": "https://example.com/#org" },
      "datePublished": "2026-01-15T08:00:00Z"
    }
  ]
}</code></pre>
"""
        }
    },
    {
        "id": "ai-search-visibility",
        "en_slug": "en/guides/ai-search-visibility",
        "tr_slug": "tr/rehberler/ai-arama-gorunurlugu",
        "tool_link_en": "/en/ai-website-readiness/",
        "tool_link_tr": "/tr/ai-website-readiness/",
        "tool_name_en": "AI Website Readiness Checker",
        "tool_name_tr": "AI Web Sitesi Hazırlık Denetimi",
        "en": {
            "title": "AI Search Visibility: Generative Engine Optimization (GEO) | HTML&HTML",
            "desc": "A technical breakdown of Generative Engine Optimization (GEO). Learn how AI search engines select sources, format citations, and evaluate domain credibility.",
            "kicker": "STRATEGY GUIDE",
            "h1": "AI Search Visibility: <em>Generative Engine Optimization</em>",
            "sub": "Moving beyond keyword manipulation: How search-grounded language models evaluate factual authority, technical hygiene, and cited evidence.",
            "read_time": "6 min read · Evidence-based methodology",
            "body": """
<h2>From Links to Synthesis: The GEO Shift</h2>
<p>Traditional SEO focused on backlinks, anchor text, and keyword density to earn a blue-link ranking. Generative Engine Optimization (GEO) operates differently: models like Perplexity Sonar, ChatGPT Search, and Google AI Overviews read retrieved text and synthesize comprehensive answers, citing only the sources deemed credible and factual.</p>

<h2>Key Signals That Earn Citations</h2>
<ul>
  <li><strong>Direct Factual Density:</strong> LLMs favor documents that answer questions directly in the first two sentences rather than burying conclusions beneath marketing fluff.</li>
  <li><strong>Clear Statistical & Source Attribution:</strong> Claims backed by explicit RFC, academic, or vendor citations are preferentially selected by retrieval models.</li>
  <li><strong>Low Latency & High Scrapability:</strong> Fast TTFB and clean HTML allow search crawlers to extract passages within strict real-time query budgets.</li>
</ul>

<h2>Avoid Dangerous GEO Anti-Patterns</h2>
<p>Do not attempt prompt injection in hidden HTML, white-on-white text, or keyword stuffing. Modern safety layers detect adversarial inputs and blacklist abusive domains from retrieval pools.</p>
"""
        },
        "tr": {
            "title": "AI Arama Görünürlüğü: Üretken Motor Optimizasyonu (GEO) | HTML&HTML",
            "desc": "Üretken Motor Optimizasyonunun (GEO) teknik temelleri. Yapay zeka arama motorlarının kaynakları nasıl seçtiğini, alıntıladığını ve değerlendirdiğini öğrenin.",
            "kicker": "STRATEJİ REHBERİ",
            "h1": "AI Arama Görünürlüğü: <em>Üretken Motor Optimizasyonu</em>",
            "sub": "Anahtar kelime manipülasyonunun ötesi: Arama tabanlı yapay zeka modelleri olgusal otoriteyi, teknik hijyeni ve kanıtları nasıl değerlendirir?",
            "read_time": "6 dk okuma · Kanıta dayalı metodoloji",
            "body": """
<h2>Linklerden Senteze: GEO Dönüşümü</h2>
<p>Geleneksel SEO, mavi arama linkleri kazanmak için backlinklere ve kelime yoğunluğuna odaklanırdı. Üretken Motor Optimizasyonu (GEO) ise çok farklı çalışır: Perplexity Sonar, ChatGPT Search ve Google AI Overviews gibi sistemler getirilen metinleri okuyup kapsamlı bir yanıt sentezler ve yalnızca güvenilir, olgusal bulduğu kaynakları alıntılar.</p>

<h2>Alıntı ve Kaynak Gösterimi Kazandıran Temel Sinyaller</h2>
<ul>
  <li><strong>Doğrudan Olgusal Yoğunluk:</strong> LLM'ler cevabı pazarlama süslemelerinin altına gömmek yerine ilk iki cümlede net biçimde veren belgeleri tercih eder.</li>
  <li><strong>Açık Kaynak ve Standart Atfı:</strong> Resmi RFC'ler, akademik referanslar veya sağlayıcı dokümanlarıyla desteklenen iddialar öncelikli olarak seçilir.</li>
  <li><strong>Düşük Gecikme ve Temiz HTML:</strong> Hızlı sunucu yanıt süresi ve temiz HTML yapısı, canlı arama tarayıcılarının bilgiyi anında çekmesini sağlar.</li>
</ul>

<h2>Tehlikeli Anti-Desenlerden Kaçının</h2>
<p>Gizli HTML bloklarına prompt injection yerleştirmek, beyaz zemin üzerine beyaz metin yazmak veya aşırı kelime yığmak gibi hilelerden kaçının. Modern arama güvenlik katmanları bu manipülasyonları tespit eder ve alan adını arama havuzundan tamamen çıkarır.</p>
"""
        }
    }
]

# Write all guides
for g in guides_data:
    for lang in ['en', 'tr']:
        c = g[lang]
        slug = g['en_slug'] if lang == 'en' else g['tr_slug']
        rel_path = f"{slug}/index.html"
        alt_slug = g['tr_slug'] if lang == 'en' else g['en_slug']
        alt_url = f"/{alt_slug}/"
        canonical_url = f"https://htmlandhtml.com/{slug}/"

        bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
        bc_home_url = "/en/" if lang == 'en' else "/tr/"
        bc_guides_name = "Guides" if lang == 'en' else "Rehberler"
        bc_guides_url = "/en/guides/" if lang == 'en' else "/tr/rehberler/"

        tool_link = g['tool_link_en'] if lang == 'en' else g['tool_link_tr']
        tool_name = g['tool_name_en'] if lang == 'en' else g['tool_name_tr']
        method_url = "/en/methodology/" if lang == 'en' else "/tr/methodology/"
        fix_mandate_url = "/en/fix-mandate/" if lang == 'en' else "/tr/fix-mandate/"

        html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{c['title']}</title>
<meta name="description" content="{c['desc']}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/{g['en_slug']}/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/{g['tr_slug']}/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/{g['en_slug']}/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "TechArticle",
      "headline": "{c['h1'].replace('<em>', '').replace('</em>', '')}",
      "description": "{c['desc']}",
      "url": "{canonical_url}",
      "inLanguage": "{lang}",
      "author": {{ "@type": "Organization", "name": "HTML&HTML Research Team", "url": "https://htmlandhtml.com/" }},
      "publisher": {{ "@type": "Organization", "name": "HTML&HTML", "logo": "https://htmlandhtml.com/assets/logo.png" }},
      "datePublished": "2026-02-01T00:00:00Z",
      "dateModified": "2026-09-06T00:00:00Z"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{bc_guides_name}", "item": "https://htmlandhtml.com{bc_guides_url}" }},
        {{ "@type": "ListItem", "position": 3, "name": "{c['title'].split('—')[0].strip()}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'guides')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <a href="{bc_guides_url}">{bc_guides_name}</a>
  <span>/</span>
  <span>{c['kicker']}</span>
</nav>

<main>
<article class="section" style="max-width: var(--reading-max); margin: 0 auto; padding-top: 56px;">
  <div class="kicker"><span></span><b>{c['kicker']}</b></div>
  <h1 style="margin: 20px 0 16px; font-size: clamp(38px, 4.5vw, 56px); line-height: 1.1; letter-spacing: -.045em;">{c['h1']}</h1>
  <p style="font-size: 19px; line-height: 1.7; color: var(--muted); margin-bottom: 24px;">{c['sub']}</p>
  <div style="font-size: 13px; font-weight: 750; color: #88867e; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid var(--line);">
    {c['read_time']}
  </div>

  <div class="guide-content" style="font-size: 18px; line-height: 1.75;">
    {c['body']}
  </div>

  <div class="authority-callout" style="margin-top: 56px;">
    <div>
      <h3>{'Sitenizi hemen denetleyin' if lang == 'tr' else 'Audit your site now'}</h3>
      <p>{'Bu rehberde açıklanan kuralları ücretsiz olarak web siteniz üzerinde test edin.' if lang == 'tr' else 'Test the exact criteria explained in this guide against your public site for free.'}</p>
    </div>
    <a href="{tool_link}">{tool_name} →</a>
  </div>

  <div class="compare" style="margin-top: 32px;">
    <b>{'UYGULAMA SÖZLEŞMESİ' if lang == 'tr' else 'FIX MANDATE'}</b>
    <p>{'Tespit edilen teknik engelleri mühendislik ekibiniz için kök neden, kabul testleri ve geri alma planlarıyla çözmek için' if lang == 'tr' else 'To resolve detected blockers with root cause analysis, acceptance tests and rollbacks for your engineering team,'} <a href="{fix_mandate_url}" style="font-weight: 800; text-decoration: underline;">$149 Full Site Fix Mandate</a> {'ürününü inceleyin.' if lang == 'tr' else 'is available.'}</p>
  </div>

  <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 14px; font-weight: 800;">
    <a href="{bc_guides_url}">← {'Tüm Rehberler' if lang == 'tr' else 'All Guides'}</a>
    <a href="{method_url}">{'Metodolojiyi İncele' if lang == 'tr' else 'View Methodology'} →</a>
  </div>
</article>
</main>

{get_footer(lang)}
</body>
</html>'''
        write_page(rel_path, html)

# Build Guides Hub: /en/guides/ & /tr/rehberler/
for lang in ['en', 'tr']:
    rel_path = "en/guides/index.html" if lang == 'en' else "tr/rehberler/index.html"
    alt_url = "/tr/rehberler/" if lang == 'en' else "/en/guides/"
    canonical_url = f"https://htmlandhtml.com/{'en/guides/' if lang == 'en' else 'tr/rehberler/'}"

    cards_html = ""
    for g in guides_data:
        c = g[lang]
        slug = g['en_slug'] if lang == 'en' else g['tr_slug']
        title = c['title'].split('—')[0].strip()
        cards_html += f'''<article class="authority-card">
  <b>{c['kicker']}</b>
  <h3>{title}</h3>
  <p>{c['desc']}</p>
  <a href="/{slug}/">{'Rehberi Oku' if lang == 'tr' else 'Read Guide'} →</a>
</article>'''

    bc_home_name = "Home" if lang == 'en' else "Ana Sayfa"
    bc_home_url = "/en/" if lang == 'en' else "/tr/"
    hub_title = "Technical Guides & Authority Research | HTML&HTML" if lang == 'en' else "Teknik Rehberler ve Otorite Araştırmaları | HTML&HTML"
    hub_h1 = "Technical Guides for <em>Modern Search & AI Retrieval</em>" if lang == 'en' else "Modern Arama ve Yapay Zeka Keşfi İçin <em>Teknik Rehberler</em>"
    hub_sub = "Authoritative, fact-checked technical guides on crawler policies, llms.txt standard v2, JSON-LD knowledge graphs, and generative engine optimization." if lang == 'en' else "Tarayıcı politikaları, llms.txt v2 standardı, JSON-LD bilgi grafları ve üretken motor optimizasyonu üzerine doğrulanmış teknik rehberler."

    html = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{hub_title}</title>
<meta name="description" content="{hub_sub}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="{canonical_url}">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/guides/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/rehberler/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/guides/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "CollectionPage",
      "name": "{hub_title}",
      "url": "{canonical_url}"
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "{bc_home_name}", "item": "https://htmlandhtml.com{bc_home_url}" }},
        {{ "@type": "ListItem", "position": 2, "name": "{'Rehberler' if lang == 'tr' else 'Guides'}", "item": "{canonical_url}" }}
      ]
    }}
  ]
}}
</script>
<script src="/assets/js/theme.js"></script>
</head>
<body>
{get_header(lang, alt_url, 'guides')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="{bc_home_url}">{bc_home_name}</a>
  <span>/</span>
  <span>{'Rehberler' if lang == 'tr' else 'Guides'}</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>{'REHBERLER MERKEZİ' if lang == 'tr' else 'GUIDES HUB'}</b></div>
  <h1>{hub_h1}</h1>
  <p>{hub_sub}</p>
</section>

<section class="section">
  <div class="authority-grid">
    {cards_html}
  </div>
</section>
</main>

{get_footer(lang)}
</body>
</html>'''
    write_page(rel_path, html)

print("Guides and Guides Hub built successfully.")
