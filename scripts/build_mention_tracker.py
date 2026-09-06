import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
from build_full_site import get_header, get_footer

def build_mention_tracker():
    # EN
    en_html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Mention Tracker — OpenAI, Perplexity, Gemini Citation Check | HTML&HTML</title>
<meta name="description" content="Measure whether your brand appears in OpenAI web-search, Perplexity Sonar and Gemini Google Search grounded answers using neutral prompts.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/en/ai-mention-tracker/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/ai-mention-tracker/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/ai-mention-tracker/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/ai-mention-tracker/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script src="/assets/js/theme.js"></script>
<script src="/assets/js/mention-tracker.js" defer></script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "SoftwareApplication",
      "name": "HTML&HTML AI Mention Tracker",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://htmlandhtml.com/en/ai-mention-tracker/",
      "offers": {{ "@type": "Offer", "description": "Paid AI mention monitoring module" }}
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://htmlandhtml.com/en/" }},
        {{ "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://htmlandhtml.com/en/tools/" }},
        {{ "@type": "ListItem", "position": 3, "name": "AI Mention Tracker", "item": "https://htmlandhtml.com/en/ai-mention-tracker/" }}
      ]
    }}
  ]
}}
</script>
</head>
<body data-mention-tracker>
{get_header('en', '/tr/ai-mention-tracker/', 'tools')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/en/">Home</a>
  <span>/</span>
  <a href="/en/tools/">Tools</a>
  <span>/</span>
  <span>AI Mention Tracker</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>AI MENTION TRACKER / PAID MODULE</b></div>
  <h1>Does your brand <em>actually appear</em> in AI answers?</h1>
  <p>Runs neutral prompts across OpenAI Responses API + web search, Perplexity Sonar and Gemini + Google Search grounding; brand mentions, domain citations and source URLs are measured separately. Consumer ChatGPT, Perplexity and Gemini apps can produce different results.</p>
  <div class="authority-proof">
    <span>Neutral prompt guard</span>
    <span>Brand mention</span>
    <span>Domain citation</span>
    <span>Source URLs</span>
    <span>Provider-by-provider evidence</span>
  </div>
</section>

<section class="tool-shell" id="tracker">
  <div class="tool-panel">
    <h2>Prove AI visibility</h2>
    <p>The tracked brand/domain is searched only in the result. Requests are rejected when the prompts themselves contain the target brand or domain, because that would artificially inflate visibility.</p>
    <div id="mentionProviders" class="mention-grid"></div>
    <form id="mentionForm" class="mention-form-grid" style="margin-top:18px">
      <div>
        <label for="mentionBrand">Brand</label>
        <input id="mentionBrand" autocomplete="organization" placeholder="e.g. HTML&HTML" required>
      </div>
      <div>
        <label for="mentionDomain">Domain</label>
        <input id="mentionDomain" autocomplete="url" placeholder="example.com">
      </div>
      <div class="wide">
        <label for="mentionAccess">Paid access key</label>
        <input id="mentionAccess" type="password" autocomplete="off" placeholder="Access key" required>
      </div>
      <div class="wide mention-queries">
        <label>1–3 neutral prompts</label>
        <textarea id="mentionQ1" maxlength="280" required placeholder="e.g. Which tools audit whether a website is technically ready for AI search engines?"></textarea>
        <textarea id="mentionQ2" maxlength="280" placeholder="e.g. Which website audit tools combine llms.txt, AI crawler access and schema checks?"></textarea>
        <textarea id="mentionQ3" maxlength="280" placeholder="e.g. Which tools provide technical AI website readiness audits?"></textarea>
      </div>
      <div class="wide">
        <button type="submit" style="min-height:52px;width:100%;border:0;border-radius:12px;background:var(--green);color:#102117;font-weight:900;cursor:pointer">Run mention check →</button>
      </div>
    </form>
    <small class="tool-note">The access key is not persisted in the browser. Provider API keys remain server-side only.</small>
    <div id="mentionStatus" class="tool-status" hidden></div>
    <div id="mentionResult" class="tool-result" hidden style="grid-template-columns:1fr">
      <div id="mentionSummary" class="tool-score" style="min-height:auto"></div>
      <div id="mentionRows" class="mention-results"></div>
    </div>
  </div>
</section>

<section class="section" id="method">
  <header>
    <span class="eyebrow">MEASUREMENT CONTRACT</span>
    <h2>We do not put the brand in the prompt and call that a mention.</h2>
    <p>The core rule is prompt neutrality. If the target brand or domain appears in a measurement prompt, the request is rejected. The resulting signal therefore measures organic retrieval/generation visibility rather than self-triggered mention.</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>01 / OPENAI</b>
      <h3>Responses + Web Search</h3>
      <p>Measures OpenAI's web-search-enabled API surface. Final text and source URLs are checked separately for brand and domain presence.</p>
    </article>
    <article class="authority-card">
      <b>02 / PERPLEXITY</b>
      <h3>Sonar + Citations</h3>
      <p>Sonar answer text, citations and search_results are analyzed together, separating text mention from domain citation.</p>
    </article>
    <article class="authority-card">
      <b>03 / GEMINI</b>
      <h3>Google Search Grounding</h3>
      <p>Measures Gemini's grounded answer and web source URLs returned by Google Search grounding.</p>
    </article>
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>The product is the time series, not one snapshot.</h3>
      <p>The commercial value is repeatedly running the same neutral prompt set and showing mention/citation movement over time. The report always states that API surfaces are not identical to consumer-app results.</p>
    </div>
    <a href="#tracker">Open tracker</a>
  </div>
</section>
</main>

{get_footer('en')}
</body>
</html>'''

    # TR
    tr_html = f'''<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Marka Görünürlük Takibi — OpenAI, Perplexity, Gemini Alıntı Denetimi | HTML&HTML</title>
<meta name="description" content="Nötr sorgular kullanarak markanızın OpenAI web-search, Perplexity Sonar ve Gemini Google Search destekli yanıtlarda yer alıp almadığını ölçün.">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="https://htmlandhtml.com/tr/ai-mention-tracker/">
<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr/ai-mention-tracker/">
<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en/ai-mention-tracker/">
<link rel="alternate" hreflang="x-default" href="https://htmlandhtml.com/en/ai-mention-tracker/">
<link rel="describedby" href="https://htmlandhtml.com/llms.txt">
<link rel="stylesheet" href="/assets/css/authority.css">
<script src="/assets/js/theme.js"></script>
<script src="/assets/js/mention-tracker.js" defer></script>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "SoftwareApplication",
      "name": "HTML&HTML AI Marka Görünürlük Takibi",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "url": "https://htmlandhtml.com/tr/ai-mention-tracker/",
      "offers": {{ "@type": "Offer", "description": "Ücretli AI marka görünürlük izleme modülü" }}
    }},
    {{
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{ "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://htmlandhtml.com/tr/" }},
        {{ "@type": "ListItem", "position": 2, "name": "Araçlar", "item": "https://htmlandhtml.com/tr/araclar/" }},
        {{ "@type": "ListItem", "position": 3, "name": "AI Marka Görünürlük Takibi", "item": "https://htmlandhtml.com/tr/ai-mention-tracker/" }}
      ]
    }}
  ]
}}
</script>
</head>
<body data-mention-tracker>
{get_header('tr', '/en/ai-mention-tracker/', 'tools')}

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <a href="/tr/">Ana Sayfa</a>
  <span>/</span>
  <a href="/tr/araclar/">Araçlar</a>
  <span>/</span>
  <span>AI Marka Görünürlük Takibi</span>
</nav>

<main>
<section class="authority-hero">
  <div class="kicker"><span></span><b>AI MARKA GÖRÜNÜRLÜK TAKİBİ / ÜCRETLİ MODÜL</b></div>
  <h1>Markanız AI yanıtlarında <em>gerçekten geçiyor mu?</em></h1>
  <p>OpenAI Responses API + web search, Perplexity Sonar ve Gemini + Google Search desteği üzerinde nötr sorgular çalıştırır; marka atıfları, alan adı kaynak gösterimleri ve kaynak URL'ler ayrı ölçülür. Tüketici ChatGPT, Perplexity ve Gemini uygulamaları farklı sonuçlar üretebilir.</p>
  <div class="authority-proof">
    <span>Nötr sorgu koruması</span>
    <span>Marka atfı</span>
    <span>Alan adı kaynak gösterimi</span>
    <span>Kaynak URL'ler</span>
    <span>Sağlayıcı bazlı kanıt</span>
  </div>
</section>

<section class="tool-shell" id="tracker">
  <div class="tool-panel">
    <h2>Yapay zeka görünürlüğünü kanıtlayın</h2>
    <p>Hedeflenen marka/domain yalnızca yanıtta aranır. Sorguların kendisi hedef marka veya alan adını içerdiğinde istek reddedilir; çünkü bu görünürlüğü yapay olarak şişirir.</p>
    <div id="mentionProviders" class="mention-grid"></div>
    <form id="mentionForm" class="mention-form-grid" style="margin-top:18px">
      <div>
        <label for="mentionBrand">Marka</label>
        <input id="mentionBrand" autocomplete="organization" placeholder="Örn. HTML&HTML" required>
      </div>
      <div>
        <label for="mentionDomain">Alan adı</label>
        <input id="mentionDomain" autocomplete="url" placeholder="ornek.com">
      </div>
      <div class="wide">
        <label for="mentionAccess">Ücretli erişim anahtarı</label>
        <input id="mentionAccess" type="password" autocomplete="off" placeholder="Erişim anahtarı" required>
      </div>
      <div class="wide mention-queries">
        <label>1–3 nötr sorgu</label>
        <textarea id="mentionQ1" maxlength="280" required placeholder="Örn. Bir web sitesinin teknik olarak yapay zeka arama motorlarına hazır olup olmadığını hangi araçlar denetler?"></textarea>
        <textarea id="mentionQ2" maxlength="280" placeholder="Örn. llms.txt, AI tarayıcı erişimi ve şema kontrollerini birleştiren web denetim araçları hangileridir?"></textarea>
        <textarea id="mentionQ3" maxlength="280" placeholder="Örn. Web siteleri için teknik AI hazırlık denetimi sunan araçlar nelerdir?"></textarea>
      </div>
      <div class="wide">
        <button type="submit" style="min-height:52px;width:100%;border:0;border-radius:12px;background:var(--green);color:#102117;font-weight:900;cursor:pointer">Görünürlük kontrolünü çalıştır →</button>
      </div>
    </form>
    <small class="tool-note">Erişim anahtarı tarayıcıda saklanmaz. Sağlayıcı API anahtarları yalnızca sunucu tarafında kalır.</small>
    <div id="mentionStatus" class="tool-status" hidden></div>
    <div id="mentionResult" class="tool-result" hidden style="grid-template-columns:1fr">
      <div id="mentionSummary" class="tool-score" style="min-height:auto"></div>
      <div id="mentionRows" class="mention-results"></div>
    </div>
  </div>
</section>

<section class="section" id="method">
  <header>
    <span class="eyebrow">ÖLÇÜM SÖZLEŞMESİ</span>
    <h2>Markayı sorguya koyup buna atıf demeyiz.</h2>
    <p>Temel kural sorgu tarafsızlığıdır. Hedef marka veya alan adı ölçüm sorgusunda geçerse istek reddedilir. Bu sayede üretilen sinyal yapay tetiklemeyi değil, organik geri çağırma ve üretim görünürlüğünü ölçer.</p>
  </header>
  <div class="authority-grid">
    <article class="authority-card">
      <b>01 / OPENAI</b>
      <h3>Responses + Web Search</h3>
      <p>OpenAI'ın web araması etkin API yüzeyini ölçer. Nihai metin ve kaynak URL'ler marka ve domain varlığı için ayrı ayrı taranır.</p>
    </article>
    <article class="authority-card">
      <b>02 / PERPLEXITY</b>
      <h3>Sonar + Alıntılar</h3>
      <p>Sonar yanıt metni, alıntılar ve search_results birlikte analiz edilerek metin atfı ile domain kaynak gösterimi ayrıştırılır.</p>
    </article>
    <article class="authority-card">
      <b>03 / GEMINI</b>
      <h3>Google Search Grounding</h3>
      <p>Gemini'ın kaynaklı yanıtını ve Google Search desteği tarafından döndürülen web kaynak URL'lerini ölçer.</p>
    </article>
  </div>
</section>

<section class="section">
  <div class="authority-callout">
    <div>
      <h3>Asıl ürün tek anlık görüntü değil, zaman serisidir.</h3>
      <p>Ticari değer, aynı nötr sorgu kümesini periyodik olarak çalıştırıp zaman içindeki atıf ve kaynak gösterim hareketini görmektir. Rapor her zaman API yüzeylerinin tüketici uygulamalarıyla birebir aynı olmadığını belirtir.</p>
    </div>
    <a href="#tracker">Takip modülünü aç</a>
  </div>
</section>
</main>

{get_footer('tr')}
</body>
</html>'''

    with open(os.path.join(ROOT, 'en/ai-mention-tracker/index.html'), 'w', encoding='utf-8') as f:
        f.write(en_html.strip() + '\n')
    with open(os.path.join(ROOT, 'tr/ai-mention-tracker/index.html'), 'w', encoding='utf-8') as f:
        f.write(tr_html.strip() + '\n')
    print("AI Mention Tracker pages built cleanly.")

build_mention_tracker()
