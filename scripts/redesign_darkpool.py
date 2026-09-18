import re
from pathlib import Path

# 1. ADD CSS TO premium-experience.css
css_path = Path('/Users/macair1/projects/html/assets/css/premium-experience.css')
css_content = css_path.read_text(encoding='utf-8')

radical_css = """
/* ==========================================================================
   RADICAL DARK POOL INTELLIGENCE REDESIGN (SILICON VALLEY ENTERPRISE TIER)
   ========================================================================== */
#dark-pool-intelligence {
  background: #030712;
  color: #f8fafc;
  border-radius: 32px;
  padding: 80px 56px;
  position: relative;
  overflow: hidden;
  margin: 64px auto;
  max-width: 1200px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 0 120px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05);
}

#dark-pool-intelligence::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse at top, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at top, black 0%, transparent 80%);
}

#dark-pool-intelligence .px-section-head { text-align: center; margin-bottom: 64px; position: relative; z-index: 2; }
#dark-pool-intelligence .px-section-head h2 {
  color: #fff;
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin: 20px 0;
  background: linear-gradient(180deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#dark-pool-intelligence .px-section-head p {
  color: #94a3b8;
  font-size: 19px;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}
#dark-pool-intelligence .eyebrow {
  color: #f8fafc;
  font-weight: 800;
  letter-spacing: 0.1em;
  font-size: 13px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 16px;
  border-radius: 99px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.dp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
  z-index: 2;
}

.dp-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 36px 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}
.dp-card::before {
  content: ''; position: absolute; inset: 0;
  border-radius: 24px; padding: 1px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.dp-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5);
}

.dp-glow {
  position: absolute;
  top: 0; left: 50%;
  width: 200px; height: 200px;
  filter: blur(60px);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.dp-card:hover .dp-glow { opacity: 1; }
.dp-p0 .dp-glow { background: rgba(239, 68, 68, 0.25); }
.dp-p1 .dp-glow { background: rgba(249, 115, 22, 0.25); }
.dp-p2 .dp-glow { background: rgba(56, 189, 248, 0.25); }

.dp-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.dp-num { font-family: 'SF Mono', ui-monospace, monospace; font-size: 15px; color: #64748b; font-weight: 700; }
.dp-badge { font-size: 12px; font-weight: 800; padding: 5px 12px; border-radius: 8px; letter-spacing: 0.05em; font-family: 'SF Mono', ui-monospace, monospace; }
.dp-p0 .dp-badge { color: #fca5a5; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); }
.dp-p1 .dp-badge { color: #fdba74; background: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.25); }
.dp-p2 .dp-badge { color: #7dd3fc; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); }

.dp-title { font-size: 22px; font-weight: 800; color: #f8fafc; margin-bottom: 16px; line-height: 1.3; letter-spacing: -0.02em; }
.dp-desc { font-size: 16px; color: #94a3b8; line-height: 1.65; margin-bottom: 32px; flex-grow: 1; font-weight: 400; }

.dp-fix {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px 20px;
  border-radius: 14px;
  font-size: 14px;
  color: #cbd5e1;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.5;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}
.dp-fix svg { flex-shrink: 0; width: 18px; height: 18px; margin-top: 2px; }
.dp-p0 .dp-fix svg { color: #ef4444; }
.dp-p1 .dp-fix svg { color: #f97316; }
.dp-p2 .dp-fix svg { color: #38bdf8; }

.dp-callout {
  margin-top: 64px;
  background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
}
.dp-callout::before {
  content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  background: radial-gradient(circle at 100% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 60%);
  pointer-events: none;
}
.dp-callout-text h3 { color: #fff; font-size: 28px; margin: 12px 0 16px; font-weight: 800; letter-spacing: -0.02em; }
.dp-callout-text p { color: #94a3b8; font-size: 17px; margin: 0; max-width: 650px; line-height: 1.6;}
.dp-callout-text span { font-size: 13px; font-weight: 800; color: #e2e8f0; letter-spacing: 0.1em; background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 6px;}
.dp-callout-action .btn-scan-trigger {
  background: #fff; color: #000; padding: 18px 36px; border-radius: 14px; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s; white-space: nowrap; box-shadow: 0 0 20px rgba(255,255,255,0.2);
}
.dp-callout-action .btn-scan-trigger:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.4); }
.dp-callout-action span { display: block; margin-top: 14px; font-size: 14px; color: #64748b; text-align: center; }

@media (max-width: 1024px) {
  .dp-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  #dark-pool-intelligence { padding: 48px 24px; border-radius: 0; border-left: none; border-right: none; margin: 0; }
  .dp-grid { grid-template-columns: 1fr; }
  .dp-callout { flex-direction: column; text-align: center; padding: 40px 24px; }
}
"""

if "RADICAL DARK POOL INTELLIGENCE REDESIGN" not in css_content:
    css_path.write_text(css_content + "\n" + radical_css, encoding='utf-8')
    print("Added radical CSS to premium-experience.css")

# 2. REWRITE build_homepages.py HTML content
py_path = Path('/Users/macair1/projects/html/scripts/build_homepages.py')
py_content = py_path.read_text(encoding='utf-8')

# The SVG icon for the fix
bolt_svg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'

# We need to replace the section in both TR and EN. We will write a regex to replace the inner content of <section class="section px-section" id="dark-pool-intelligence"> ... </section>

def replace_dark_pool(match):
    is_tr = 'Endüstriyel benchmark' in match.group(0) or 'Danışmanlık veya pazarlama' in match.group(0) or 'SIFIR DANIŞMANLIK' in match.group(0)
    
    if is_tr:
        html = f"""<section class="section px-section" id="dark-pool-intelligence">
  <div class="px-section-head">
    <span class="eyebrow">SILICON VALLEY &amp; LONDON ($5M+) ENTERPRISE INTELLIGENCE</span>
    <h2>Geleneksel SEO Araçlarının Göremediği 6 Yapay Zeka Kara Kutusu</h2>
    <p>Ahrefs, Semrush ve eski nesil araçlar yalnızca anahtar kelime ve meta etiket sayarlar. ChatGPT, Perplexity ve Google Gemini gibi temel nöral modeller, içeriğinizi önermek veya reddetmek için bu 6 gizli transformer katmanından geçirir.</p>
  </div>
  <div class="dp-grid">
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">01</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">14KB AST Token Yükü (Payload Budget)</h3>
      <p class="dp-desc">GPTBot ve Perplexity tarayıcıları, 14KB AST bütçesini aşan şişirilmiş HTML'leri okumayı erken keser (truncation). Tarayıcılar fiyatlandırma ve ürün bloklarınıza ulaşamadan token kapasitelerini tüketir.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: Cloudflare Worker HTMLRewriter AST temizliği ve 40ms altı sınır hızı (TTFB)</span></div>
    </article>
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">02</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">Entity Vault ve Wikidata Konsensüsü</h3>
      <p class="dp-desc">Küresel Bilgi Graflarında (Knowledge Graph) kesin koordinatlarınız olmadan, nöral modeller markanızı otoriteli bir varlık (Entity) olarak doğrulayamaz ve yanıtlarında sizi rakipleriniz lehine sistematik olarak atlar.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: W3C JSON-LD 1.1 @graph, sameAs Wikidata QID ve Google MID konsensüsü</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">03</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">512-Token RAG Semantik Bütünlük Koruması</h3>
      <p class="dp-desc">Standart 512 tokenlık vektör parçalama (chunking) işlemi, değer önerilerinizi ortadan böler. Arama motorları semantik üretim esnasında cümlenin kilit bağlamını eşleştiremez.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: data-chunk-id semantik sınır işaretlemesi ve bağlam koruması</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">04</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">Cross-Encoder Filtresi ve Rakam Yoğunluğu</h3>
      <p class="dp-desc">Çapraz kodlayıcı (Cross-encoder) algoritmaları tanıtım dolu "pazarlama" cümlelerini doğrudan çöpe atar. Doğrulanmış metrikler ve rakamlar içermeyen paragraflar doğrudan filtrelenir.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: H2 başlıkları altında 45-kelimelik matematiksel veri yoğunluğu matrisi</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">05</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">Yapay Zeka Eğitim Verisi (Corpus PMI)</h3>
      <p class="dp-desc">Eğer markanız, modellerin eğitildiği okyanus verilerinde (örn: Common Crawl) sektör benchmark'ları ile yan yana (co-occurrence) geçmiyorsa, doğrudan sorulmadıkça asla spontane olarak önerilmezsiniz.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: Kanonik sektör tanımlamaları ve PMI (Pointwise Mutual Information) çapaları</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">06</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">ColBERT MaxSim Gecikmeli Eşleşmesi</h3>
      <p class="dp-desc">ColBERT ve SPLADE nöral modelleri kullanıcı soru tokenları ile başlık tokenlarınızı tam eşleştiremezse (late-interaction), modern vektör aramalarında siteniz arka sayfalara ötelenir.</p>
      <div class="dp-fix">{bolt_svg}<span>Çözüm: Token zenginleştirilmiş H2/H3 başlık hiyerarşisi ve MaxSim eşleşme mimarisi</span></div>
    </article>
  </div>
  
  <div class="dp-callout">
    <div class="dp-callout-text">
      <span>SIFIR DANIŞMANLIK MASRAFI · YAZILIMCINIZA TESLİM EDİN</span>
      <h3>Aylık 5.000$ Ajans Masrafı Ödemeyin. Teşhisi Görün, Kodu Kendi Ekibinize Verin.</h3>
      <p>HTML&amp;HTML bir danışmanlık veya pazarlama ajansı değildir; deterministik bir mühendislik platformudur. Ücretsiz AI denetimi ile sorunları görün. 30+ dosyalık kod paketini $99 karşılığında indirin ve 1 günde canlıya alın.</p>
    </div>
    <div class="dp-callout-action">
      <a href="#scanner" class="btn-scan-trigger">Ücretsiz AI Denetimi Başlat →</a>
      <span>Kayıt gerekmez · 10 saniyede canlı sonuç</span>
    </div>
  </div>
</section>"""
    else:
        html = f"""<section class="section px-section" id="dark-pool-intelligence">
  <div class="px-section-head">
    <span class="eyebrow">SILICON VALLEY &amp; LONDON ($5M+) ENTERPRISE INTELLIGENCE</span>
    <h2>6 AI Search Black Boxes That Traditional SEO Ignores</h2>
    <p>Ahrefs, Semrush, and legacy tools only count keywords and meta tags. Foundation neural models like ChatGPT, Perplexity, and Google Gemini evaluate your domain across these 6 hidden transformer layers before citing or discarding your content.</p>
  </div>
  <div class="dp-grid">
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">01</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">14KB AST Token Bloat (Payload Budget)</h3>
      <p class="dp-desc">GPTBot and Perplexity crawlers enforce early ingestion truncation on bloated HTML exceeding the 14KB AST budget; crawlers exhaust token capacity before reaching lower pricing and product offerings.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: Cloudflare Worker HTMLRewriter AST trimming and sub-40ms edge TTFB</span></div>
    </article>
    <article class="dp-card dp-p0">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">02</span><span class="dp-badge">P0 CRITICAL</span></div>
      <h3 class="dp-title">Entity Vault &amp; Wikidata Consensus</h3>
      <p class="dp-desc">Without explicit triangulation in global Knowledge Graphs, neural models cannot verify your brand as an authoritative entity, systematically omitting your company in favor of competitors.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: W3C JSON-LD 1.1 @graph, sameAs Wikidata QID and Google MID consensus</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">03</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">512-Token RAG Semantic Fragmentation</h3>
      <p class="dp-desc">Standard 512-token vector chunking fractures entity definitions and value propositions; search engines fail to retrieve key context during semantic generation.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: data-chunk-id semantic boundary markup and contextual preservation</span></div>
    </article>
    <article class="dp-card dp-p1">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">04</span><span class="dp-badge">P1 HIGH</span></div>
      <h3 class="dp-title">Cross-Encoder &amp; Numerical Density</h3>
      <p class="dp-desc">Cross-encoder neural rerankers (Cohere, bge-reranker) discard promotional puffery; passages lacking hard numerical metrics and verified facts are filtered out of answer sets.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: Opening 45-word numerical fact density template under H2 headings</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">05</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">AI Corpus PMI (Model Co-Occurrence)</h3>
      <p class="dp-desc">If your brand lacks co-occurrence alongside industry benchmarks in foundational training corpuses (Common Crawl), models never recommend you spontaneously in zero-shot queries.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: Canonical benchmark definitions and sectoral PMI co-occurrence anchors</span></div>
    </article>
    <article class="dp-card dp-p2">
      <div class="dp-glow"></div>
      <div class="dp-header"><span class="dp-num">06</span><span class="dp-badge">P2 MEDIUM</span></div>
      <h3 class="dp-title">ColBERT MaxSim Late-Interaction</h3>
      <p class="dp-desc">Multi-vector retrieval engines fail to achieve maximum late-interaction dot-product scores when heading tokens fail to align with natural-language user queries.</p>
      <div class="dp-fix">{bolt_svg}<span>Fix: Multi-vector query token enrichment across H2/H3 semantic heading hierarchy</span></div>
    </article>
  </div>
  
  <div class="dp-callout">
    <div class="dp-callout-text">
      <span>ZERO CONSULTING OVERHEAD · IN-HOUSE HANDOVER</span>
      <h3>Don't Pay $5,000/mo in Agency Retainers. Audit Free, Hand Code to Your Devs.</h3>
      <p>HTML&amp;HTML is not an agency or marketing consultancy; it is an automated deterministic engineering platform. Audit your site for free. Unlock the 30+ file implementation pack for $99 and have your developers execute fixes in hours.</p>
    </div>
    <div class="dp-callout-action">
      <a href="#scanner" class="btn-scan-trigger">Start Free AI Audit →</a>
      <span>No account required · Live results in 10s</span>
    </div>
  </div>
</section>"""
    return html

pattern = re.compile(r'<section class="section px-section" id="dark-pool-intelligence">.*?</section>', re.DOTALL)
new_content = pattern.sub(replace_dark_pool, py_content)

if new_content != py_content:
    py_path.write_text(new_content, encoding='utf-8')
    print("Replaced Dark Pool section in Python script!")
else:
    print("WARNING: Regex didn't match the python script section!")
