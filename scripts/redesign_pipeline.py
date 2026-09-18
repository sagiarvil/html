import re
from pathlib import Path

# 1. ADD CSS TO premium-experience.css
css_path = Path('/Users/macair1/projects/html/assets/css/premium-experience.css')
css_content = css_path.read_text(encoding='utf-8')

radical_css = """
/* ==========================================================================
   RADICAL AI PIPELINE REDESIGN (AURORA GLASS & DATA FLOW)
   ========================================================================== */
#pipeline {
  position: relative;
  padding: 80px 40px;
  border-radius: 32px;
  margin: 64px auto;
  max-width: 1200px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Aurora Gradient Mesh Background */
#pipeline::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: 
    radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
    radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 40%);
  filter: blur(60px);
  z-index: 0;
  animation: aurora-shift 15s infinite alternate ease-in-out;
  pointer-events: none;
}
@keyframes aurora-shift {
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(5deg) scale(1.05); }
}

#pipeline .px-section-head { text-align: center; margin-bottom: 64px; position: relative; z-index: 2; }
#pipeline .px-section-head h2 {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
  margin: 16px 0;
}
#pipeline .px-section-head p { color: #475569; font-size: 18px; max-width: 800px; margin: 0 auto; line-height: 1.6; }

.pl-flow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 2;
  gap: 16px;
}

.pl-step {
  flex: 1;
  position: relative;
  min-width: 0; /* allows flex shrinking */
}

/* Card Styling */
.pl-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 24px;
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 24px -6px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255,255,255,1);
  position: relative;
}
.pl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,1);
  border-color: rgba(0, 102, 255, 0.2);
}

/* Step Badge */
.pl-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 6px 14px;
  border-radius: 99px;
  margin-bottom: 20px;
  background: #f1f5f9;
  color: #0f172a;
  border: 1px solid #e2e8f0;
}
.pl-card.highlight .pl-badge {
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  color: #fff;
  border: none;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}
.pl-card.highlight {
  border: 1.5px solid rgba(99, 102, 241, 0.3);
  background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(238,242,255,0.5) 100%);
}

.pl-card h3 { font-size: 19px; font-weight: 800; color: #0f172a; margin: 0 0 12px; line-height: 1.3; }
.pl-card p { font-size: 15px; color: #475569; margin: 0 0 24px; line-height: 1.6; flex-grow: 1; }

.pl-micro {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pl-micro span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #334155;
  background: rgba(241, 245, 249, 0.6);
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.03);
}

/* Connecting Flow Lines */
.pl-connector {
  flex-shrink: 0;
  width: 32px;
  height: 2px;
  background: rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}
.pl-connector::after {
  content: '';
  position: absolute;
  top: 0; left: -32px;
  width: 32px; height: 100%;
  background: linear-gradient(90deg, transparent, #38bdf8, #6366f1, transparent);
  animation: data-flow 2s infinite linear;
}
@keyframes data-flow {
  0% { left: -32px; }
  100% { left: 100%; }
}

@media (max-width: 1024px) {
  .pl-flow { flex-wrap: wrap; justify-content: center; }
  .pl-step { min-width: 40%; }
  .pl-connector { display: none; }
}
@media (max-width: 768px) {
  #pipeline { padding: 48px 24px; border-radius: 0; border-left: none; border-right: none; margin: 0; }
  .pl-step { min-width: 100%; }
}
"""

if "RADICAL AI PIPELINE REDESIGN" not in css_content:
    css_path.write_text(css_content + "\n" + radical_css, encoding='utf-8')
    print("Added radical pipeline CSS to premium-experience.css")

# 2. REWRITE build_homepages.py HTML content
py_path = Path('/Users/macair1/projects/html/scripts/build_homepages.py')
py_content = py_path.read_text(encoding='utf-8')

def replace_pipeline(match):
    is_tr = 'Görünürlük Nedir' in match.group(0) or 'Yapay Zeka Sizi Nasıl Tavsiye Eder' in match.group(0)
    
    if is_tr:
        html = """<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>Yapay Zeka Sizi Nasıl Tavsiye Eder ve Görünürlük Nedir?</h2>
    <p>Yapay zeka görünürlüğü (GEO/AEO) nedir? GEO, arama ve yapay zeka modellerinin sitenizi doğrudan referans almasıdır. HTML&amp;HTML, 18 motor (18 engines) ve %100 deterministik kanıt standardıyla çalışır.</p>
  </div>
  <ol class="pl-flow">
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 01</span></div>
        <h3>Canlı URL Girişi</h3>
        <p>DoH (DNS-over-HTTPS) ve RFC 1918 SSRF izolasyonu ile hedef host güvenlik çemberine alınır.</p>
        <div class="pl-micro">
          <span>🛡️ DoH DNS Koruması</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 02</span></div>
        <h3>18 Motorlu Paralel Tarama</h3>
        <p>cl100k AST token ayrıştırma, payload ölçümleri, semantic structure ve source-readiness taraması.</p>
        <div class="pl-micro">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">ADIM 03</span></div>
        <h3>Deterministik Kanıt Kilidi</h3>
        <p>UNKNOWN ≠ PASS kuralı. Varsayımsız, kablo seviyesi HTTP/DOM ispatı ve P0–P3 etki matrisi.</p>
        <div class="pl-micro">
          <span>⚖️ P0–P3 Etki Matrisi</span>
          <span>📋 24 Alanlı Bulgu Şeması</span>
          <span>🛑 Stop-Gate Denetimi</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card highlight">
        <div><span class="pl-badge">ADIM 04</span></div>
        <h3>30+ Dosyalık V3 Uygulama Paketi</h3>
        <p>Kök neden çözümü, test.js kabul testleri, 00_ROLLBACK_PLAN ve 30 sayfalık makine yüzeyi.</p>
        <div class="pl-micro">
          <span>⚙️ test.js Scriptleri</span>
          <span>🔄 Geri Alma Güvencesi</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:40px;">"""
    else:
        html = """<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">
  <div class="px-section-head">
    <span class="eyebrow">END-TO-END AUTONOMOUS PIPELINE</span>
    <h2>How Do AI Models Recommend Your Website and What is GEO?</h2>
    <p>What is Generative Engine Optimization (GEO)? GEO is the optimization of content for AI engines. HTML&amp;HTML audits websites across 18 engines with 100% deterministic evidence.</p>
  </div>
  <ol class="pl-flow">
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 01</span></div>
        <h3>Live URL Ingestion</h3>
        <p>DoH (DNS-over-HTTPS) resolution and RFC 1918 SSRF isolation sandbox the target host safely.</p>
        <div class="pl-micro">
          <span>🛡️ DoH DNS Shield</span>
          <span>⚡ HTTP/2 Handshake</span>
          <span>🔒 Fail-Closed Gate</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 02</span></div>
        <h3>18-Engine Parallel Crawl</h3>
        <p>cl100k AST token parsing, 14KB budget enforcement, Cross-Encoder attention, and RAG chunk boundary tests.</p>
        <div class="pl-micro">
          <span>🎯 ColBERT MaxSim</span>
          <span>🧠 Knowledge Vault QID</span>
          <span>📦 14KB AST Token Purge</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card">
        <div><span class="pl-badge">STEP 03</span></div>
        <h3>Deterministic Evidence Gate</h3>
        <p>UNKNOWN ≠ PASS principle. Wire-level HTTP/DOM proof without heuristics, mapped to P0–P3 impact matrix.</p>
        <div class="pl-micro">
          <span>⚖️ P0–P3 Impact Matrix</span>
          <span>📋 24-Field Finding Schema</span>
          <span>🛑 Stop-Gate Assertion</span>
        </div>
      </article>
    </li>
    <li class="pl-connector" aria-hidden="true"></li>
    <li class="pl-step">
      <article class="pl-card highlight">
        <div><span class="pl-badge">STEP 04</span></div>
        <h3>Versioned Engine V3 Implementation ZIP</h3>
        <p>Root-cause remediation, test.js verification suites, 00_ROLLBACK_PLAN, and 30-page machine surface.</p>
        <div class="pl-micro">
          <span>⚙️ test.js Suites</span>
          <span>🔄 Rollback Guarantees</span>
          <span>🤖 A2A Agent Card &amp; MCP</span>
        </div>
      </article>
    </li>
  </ol>
  <div class="px-lenses" style="margin-top:40px;">"""
    return html

pattern = re.compile(r'<section class="section px-section" id="pipeline" data-premium-infographic="scope-map">.*?<div class="px-lenses" style="margin-top:24px;">', re.DOTALL)
new_content = pattern.sub(replace_pipeline, py_content)

if new_content != py_content:
    py_path.write_text(new_content, encoding='utf-8')
    print("Replaced Pipeline section in Python script!")
else:
    print("WARNING: Regex didn't match the python script section!")
