import re
from pathlib import Path

# 1. NEW CSS FOR RADICAL MATRIX
css_path = Path('/Users/macair1/projects/html/assets/css/premium-experience.css')
css_content = css_path.read_text(encoding='utf-8')

radical_css = """
/* ==========================================================================
   RADICAL MATRIX REDESIGN (AWE-INSPIRING COMPARISON)
   ========================================================================== */
.v3-capability-contract {
  position: relative;
  z-index: 10;
  margin: 80px auto;
  max-width: 1200px;
}

.v3-contract-head {
  text-align: center;
  margin-bottom: 64px;
}
.v3-contract-head span {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #3b82f6;
  text-transform: uppercase;
  background: rgba(59, 130, 246, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 16px;
}
.v3-contract-head h2 {
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 800;
  line-height: 1.2;
  color: #0f172a;
  max-width: 900px;
  margin: 0 auto 24px;
  letter-spacing: -0.02em;
}
.v3-contract-head p {
  font-size: 18px;
  color: #475569;
  max-width: 800px;
  margin: 0 auto 32px;
  line-height: 1.6;
}
.v3-decision-line {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 12px 24px;
  border-radius: 99px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
}
.v3-decision-line b {
  color: #059669;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.v3-decision-line b::before {
  content: '';
  display: inline-block;
  width: 8px; height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 12px #10b981;
}
.v3-decision-line span {
  font-size: 14.5px;
  color: #334155;
  font-weight: 500;
}

/* Radical Matrix Grid */
.v3-radical-matrix {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
}

.v3-rm-head {
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  gap: 16px;
  padding: 0 24px 16px;
  align-items: end;
  border-bottom: 2px solid rgba(0,0,0,0.05);
  margin-bottom: 8px;
}
.v3-rm-head > div {
  font-family: 'SF Mono', ui-monospace, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  text-transform: uppercase;
}
.v3-rm-head .v3-rm-paid {
  color: #4f46e5;
  position: relative;
  text-align: center;
}

/* Rows */
.v3-rm-row {
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  gap: 16px;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px -4px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.v3-rm-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px -8px rgba(0,0,0,0.06);
  border-color: rgba(0,0,0,0.08);
}

.v3-rm-feature {
  display: flex;
  align-items: center;
  gap: 12px;
}
.v3-rm-feature .rm-icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
.v3-rm-feature h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
}

.v3-rm-free {
  font-size: 14.5px;
  color: #64748b;
  line-height: 1.5;
  padding-right: 24px;
}

/* Paid Column Highlight Overlay */
.v3-rm-paid {
  font-size: 14.5px;
  font-weight: 600;
  color: #1e1b4b;
  background: linear-gradient(90deg, rgba(238, 242, 255, 0.5) 0%, rgba(224, 231, 255, 0.8) 100%);
  padding: 16px 20px;
  border-radius: 12px;
  position: relative;
  line-height: 1.5;
  display: flex;
  align-items: center;
  border: 1px solid rgba(99, 102, 241, 0.1);
  height: 100%;
}
.v3-rm-paid .arr {
  color: #6366f1;
  margin: 0 6px;
  font-family: monospace;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .v3-rm-head { display: none; }
  .v3-rm-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px;
  }
  .v3-rm-feature { margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
  .v3-rm-free { padding-right: 0; }
  .v3-rm-paid { margin-top: 8px; }
  .v3-decision-line { flex-direction: column; text-align: center; }
}

.v3-boundary {
  margin-top: 48px;
  font-size: 13.5px;
  color: #64748b;
  text-align: center;
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
}
"""

if "RADICAL MATRIX REDESIGN" not in css_content:
    css_path.write_text(css_content + "\n" + radical_css, encoding='utf-8')
    print("Added radical matrix CSS to premium-experience.css")

# 2. REWRITE enforce_v3_sales_contract.py
py_path = Path('/Users/macair1/projects/html/scripts/enforce_v3_sales_contract.py')
py_content = py_path.read_text(encoding='utf-8')

new_tr_block = '''TR_BLOCK = """<section class="v3-capability-contract" aria-labelledby="v3-capabilities-tr">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT GÖRÜNÜRLÜK · ENGINE V3</span>
    <h2 id="v3-capabilities-tr">Google sırası tek başına yetmiyor. Siteniz yapay zeka aramalarında bulunmalı, anlaşılmalı ve kaynak olmaya hazır olmalı.</h2>
    <p>HTML&amp;HTML, web sitenizdeki AI arama görünürlüğü engellerini kanıtla ölçer. 18 deterministik Engine V3 modülü, 105 kontrol, 13 puan dışı istihbarat analizi ve 7 hazırlık lensi aynı kanıt zincirinde çalışır.</p>
    <div class="v3-decision-line"><b>Teşhis ücretsiz.</b><span>Kök neden, uygulama kodu, kabul testi ve rollback paketi $99 tek seferlik lisansla açılır.</span></div>
  </div>
  
  <div class="v3-radical-matrix" role="region" aria-label="HTML&HTML V3 karşılaştırma matrisi" tabindex="0">
    <div class="v3-rm-head">
      <div class="v3-rm-feature-col">Karar Alanı</div>
      <div class="v3-rm-free-col">ÜCRETSİZ AI SEO ANALİZİ</div>
      <div class="v3-rm-paid-col">$99 UYGULAMA PAKETİ</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🎯</span><h4>Deterministik denetim</h4></div>
      <div class="v3-rm-free">18 Engine V3 modülü · 105 kontrol · rastgele skor yok</div>
      <div class="v3-rm-paid">Bulgu <span class="arr">→</span> kök neden <span class="arr">→</span> düzeltme <span class="arr">→</span> test <span class="arr">→</span> rollback</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🛡️</span><h4>Tarama ve güvenlik</h4></div>
      <div class="v3-rm-free">50'ye kadar herkese açık HTML sayfası · 30 canlı link probu · SSRF fail-closed</div>
      <div class="v3-rm-paid">Kanıta bağlı uygulama planı</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🌐</span><h4>AI arama disiplinleri</h4></div>
      <div class="v3-rm-free">SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</div>
      <div class="v3-rm-paid">Kanıta bağlı kod ve konfigürasyon</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🧠</span><h4>Karar istihbaratı</h4></div>
      <div class="v3-rm-free">13 puan dışı analiz · 7 hazırlık lensi · NOT_MEASURED / REQUIRES_CONTEXT</div>
      <div class="v3-rm-paid">P0–P3 öncelik, bağımlılık, kabul ve regresyon</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">👁️</span><h4>AI görünürlük gözlemi</h4></div>
      <div class="v3-rm-free">Bot erişimi, kaynak hazırlığı, entity/schema, cevap çıkarılabilirliği</div>
      <div class="v3-rm-paid">Sağlayıcı anahtarları yapılandırıldığında en fazla 3 nötr sorgu ile API/search-grounded gözlem</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🚀</span><h4>Yayın güvenliği</h4></div>
      <div class="v3-rm-free">Kanıt ve confidence sınıfları görünür</div>
      <div class="v3-rm-paid">G0–G9 · acceptance · regression · rollback</div>
    </div>
  </div>

  <p class="v3-boundary"><b>Kanıt sınırı:</b> Dış model tavsiyesi, sıralama, atıf, trafik veya gelir garanti edilmez. Ölçülemeyen sinyal <b>NOT_MEASURED</b>; kod bağlamı gerektiren sinyal <b>REQUIRES_CONTEXT</b> kalır.</p>
</section>"""'''

new_en_block = '''EN_BLOCK = """<section class="v3-capability-contract" aria-labelledby="v3-capabilities-en">
  <div class="v3-contract-head">
    <span>AI SEO · CHATGPT VISIBILITY · ENGINE V3</span>
    <h2 id="v3-capabilities-en">Google rankings are not the whole decision path. Your site must be discoverable, understandable and source-ready for AI search.</h2>
    <p>HTML&amp;HTML measures website-side AI-search blockers with evidence. Eighteen deterministic Engine V3 modules, 105 controls, 13 non-scoring intelligence analyses and seven readiness lenses run on one evidence chain.</p>
    <div class="v3-decision-line"><b>Diagnosis is free.</b><span>Root cause, implementation code, acceptance tests and rollback unlock with the one-time $99 license.</span></div>
  </div>
  
  <div class="v3-radical-matrix" role="region" aria-label="HTML&HTML V3 comparison matrix" tabindex="0">
    <div class="v3-rm-head">
      <div class="v3-rm-feature-col">Decision area</div>
      <div class="v3-rm-free-col">FREE AI SEO AUDIT</div>
      <div class="v3-rm-paid-col">$99 IMPLEMENTATION PACK</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🎯</span><h4>Deterministic audit</h4></div>
      <div class="v3-rm-free">18 Engine V3 modules · 105 controls · no random scoring</div>
      <div class="v3-rm-paid">Finding <span class="arr">→</span> root cause <span class="arr">→</span> fix <span class="arr">→</span> test <span class="arr">→</span> rollback</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🛡️</span><h4>Crawl and security</h4></div>
      <div class="v3-rm-free">Up to 50 public HTML pages · 30 live link probes · fail-closed SSRF</div>
      <div class="v3-rm-paid">Evidence-bound implementation plan</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🌐</span><h4>AI search disciplines</h4></div>
      <div class="v3-rm-free">SEO · GEO · AEO · LLMO · AAO · RAG · E-E-A-T</div>
      <div class="v3-rm-paid">Evidence-bound code and configuration</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🧠</span><h4>Decision intelligence</h4></div>
      <div class="v3-rm-free">13 non-scoring analyses · 7 readiness lenses · NOT_MEASURED / REQUIRES_CONTEXT</div>
      <div class="v3-rm-paid">P0–P3 priority, dependencies, acceptance and regression</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">👁️</span><h4>AI visibility observation</h4></div>
      <div class="v3-rm-free">Bot access, source readiness, entity/schema and answer extractability</div>
      <div class="v3-rm-paid">When provider keys are configured, up to 3 neutral queries on API/search-grounded surfaces</div>
    </div>
    
    <div class="v3-rm-row">
      <div class="v3-rm-feature"><span class="rm-icon">🚀</span><h4>Release safety</h4></div>
      <div class="v3-rm-free">Evidence and confidence classes remain visible</div>
      <div class="v3-rm-paid">G0–G9 · acceptance · regression · rollback</div>
    </div>
  </div>

  <p class="v3-boundary"><b>Evidence boundary:</b> External-model recommendation, ranking, citation, traffic or revenue is not guaranteed. Unavailable evidence stays <b>NOT_MEASURED</b>; code context stays <b>REQUIRES_CONTEXT</b>.</p>
</section>"""'''

# Regex replace the TR_BLOCK block
py_content = re.sub(r"TR_BLOCK\s*=\s*'''<section class=\"v3-capability-contract\".*?</section>'''", new_tr_block, py_content, flags=re.DOTALL)
py_content = re.sub(r"EN_BLOCK\s*=\s*'''<section class=\"v3-capability-contract\".*?</section>'''", new_en_block, py_content, flags=re.DOTALL)

py_path.write_text(py_content, encoding='utf-8')
print("Replaced TR_BLOCK and EN_BLOCK in python script")

