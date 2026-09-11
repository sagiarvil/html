(()=>{
'use strict';
const COPY={
 tr:{
  hero:'Web Siteniz ChatGPT ve Yapay Zeka Aramalarında Görünüyor mu?',
  lead:'ChatGPT, Claude ve Perplexity için 18 motorlu otonom denetim ve dağıtım paketi. Tek tıkla 8 fazlı taramayı başlatın; bulunabilirlik, kaynak hazırlığı ve RAG mimarisi engellerini kanıtıyla görün.',
  scan:'Derin AI Denetimi Başlat →',
  mandateTitle:'Kontrol ücretsiz.<br>AI Görünürlük Onarım Seti $99.',
  mandateCopy:'Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır. 5 kritik kontrol noktası onarım seti ile güvence altına alınır.',
  getMandate:'Onarım Setini İndir — $99 →',
  locked:'🔒 Nasıl onarılacağı $99 Onarım Seti içinde',
  decisionEyebrow:'ÜCRETSİZ KONTROL ($0) · GÖRÜNÜRLÜK RAPORU',
  decisionTitle:'18 Engine V3 Deterministic Chain',
  decisionCopy:'6 Layer, 18 Module, 105 Kontrol',
  priority:'ÖNCELİK',impact:'ETKİ',effort:'ÇABA',status:'DURUM',
  paidText:'Kontrol ve teknik kanıtlar ücretsiz dökümlendi ($0). Bunları koda döküp çözecek $99 Onarım Setine hazır mısınız?',
  paidCta:'Onarım Setini İndir — $99 →'
 },
 en:{
  hero:'Does AI Recommend You?<br><em>Can AI Find You? Are You Ready to Be Recommended?</em>',
  lead:'Autonomous 18-engine diagnostic & deployment pack for ChatGPT, Claude, and Perplexity. Run an 8-phase audit to expose evidence-backed discovery, source-readiness, and RAG architecture gaps.',
  scan:'Start Deep AI Audit →',
  mandateTitle:'Diagnosis is free.<br>The AI Visibility Repair Kit is $99.',
  mandateCopy:'This issue causes search engines to skip your site. Unlocking provides a permanent solution + rollback guarantee. 5 critical checkpoints are secured via automated remediation.',
  getMandate:'Download Repair Kit — $99 →',
  locked:'🔒 How to fix it is inside the $99 Repair Kit',
  decisionEyebrow:'OPEN DIAGNOSTIC LAYER · 100% FREE ($0)',
  decisionTitle:'18 Engine V3 Deterministic Chain',
  decisionCopy:'Seven readiness lenses and 13 intelligence findings are diagnosed 100% FREE ($0). The technical solution is in the $99 Fix Mandate package. Unlock to prevent visibility loss.',
  priority:'PRIORITY',impact:'IMPACT',effort:'EFFORT',status:'STATUS',
  paidText:'Diagnosis and live evidence are disclosed for free ($0). Ready to remediate them in code with the $99 Roadmap?',
  paidCta:'Download Repair Kit — $99 (ZIP) →'
 }
};
const lensOrder=['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T'];
const safe=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let currentLang=()=>document.documentElement.lang==='tr'?'tr':'en';
function applyCopy(){
 const l=currentLang(),c=COPY[l];
 const h=document.querySelector('[data-i18n="heroTitle"]');if(h)h.innerHTML=c.hero;
 const lead=document.querySelector('[data-i18n="heroCopy"]');if(lead)lead.textContent=c.lead;
 const scan=document.querySelector('[data-i18n="scan"]');if(scan)scan.textContent=c.scan;
 const mt=document.querySelector('[data-i18n="mandateTitle"]');if(mt)mt.innerHTML=c.mandateTitle;
 const mc=document.querySelector('[data-i18n="mandateCopy"]');if(mc)mc.textContent=c.mandateCopy;
 const gm=document.querySelector('[data-i18n="getMandate"]');if(gm)gm.textContent=c.getMandate;
 document.querySelectorAll('.locked-fix').forEach(el=>el.textContent=c.locked);
 const ptitle=document.querySelector('[data-i18n="pricingTitle"]');if(ptitle)ptitle.innerHTML=l==='tr'?'Kontrol ücretsiz.<br>AI Görünürlük Onarım Seti $99.':'Diagnosis is free.<br>AI Search Visibility Roadmap / Repair Kit $99.';
 const buy=document.querySelector('[data-i18n="buyFix"]');if(buy)buy.textContent=l==='tr'?'AI Görünürlük Onarım Seti — $99':'AI Search Visibility Roadmap — $99';
 document.title=l==='tr'?'Yapay Zeka Arama Görünürlüğü, GEO, AEO ve llms.txt | HTML&HTML':'AI Search Visibility, GEO, AEO & llms.txt | HTML&HTML';
}
window.addEventListener('hh-language-changed',()=>{queueMicrotask(()=>{applyCopy();if(window.__HH_LAST_SCAN__)renderDecisionMap(window.__HH_LAST_SCAN__)})});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyCopy,{once:true});else applyCopy();

function renderDecisionMap(data){
 const intel=data?.intelligence;if(!intel||!Array.isArray(intel.analyses))return;
 const disclosure=document.getElementById('scanDisclosure');if(!disclosure)return;
 let root=document.getElementById('aiDecisionMap');if(!root){root=document.createElement('section');root.id='aiDecisionMap';root.className='ai-decision-map';disclosure.insertAdjacentElement('afterend',root)}
 const l=currentLang(),c=COPY[l];
 const lenses=intel.readinessLenses||{};
 
 const eList = [
   'ENG-01: KV-Cache Optimization Engine', 'ENG-02: Edge TTFB Engine', 'ENG-03: Provenance Engine',
   'ENG-04: SEO Engine', 'ENG-05: GEO Engine', 'ENG-06: AEO Engine',
   'ENG-07: LLMO Engine', 'ENG-08: Entity Graph Engine', 'ENG-09: Cross-Encoder Engine',
   'ENG-10: ColBERT MaxSim Engine', 'ENG-11: DPO Alignment Engine', 'ENG-12: Synthetic Citation Engine',
   'ENG-13: AAO Engine', 'ENG-14: E-E-A-T Scoring Engine', 'ENG-15: Knowledge Vault Engine',
   'ENG-16: Hallucination Interception', 'ENG-17: Dark Pool Remediation', 'ENG-18: Historical Corpus Engine'
 ];
 const catMap = {
   'ENG-01': 'performance', 'ENG-02': 'performance', 'ENG-03': 'trust',
   'ENG-04': 'technical', 'ENG-05': 'ai', 'ENG-06': 'ai',
   'ENG-07': 'llms', 'ENG-08': 'schema', 'ENG-09': 'ai',
   'ENG-10': 'technical', 'ENG-11': 'trust', 'ENG-12': 'trust',
   'ENG-13': 'agent', 'ENG-14': 'trust', 'ENG-15': 'schema',
   'ENG-16': 'security', 'ENG-17': 'crawl', 'ENG-18': 'technical'
 };
 const lensHtml = eList.map((name) => {
   const engineId = name.split(':')[0].trim();
   let score = 0;
   let status = 'NOT_MEASURED';
   if (data.engineScores && data.engineScores[engineId] !== undefined) {
     score = typeof data.engineScores[engineId] === 'number' ? data.engineScores[engineId] : (data.engineScores[engineId]?.score || 0);
     status = data.engineStatuses?.[engineId] || data.engineScores[engineId]?.status || (score >= 80 ? 'PASS' : score >= 55 ? 'WARN' : 'FAIL');
   } else if (data.engines && data.engines[engineId]) {
     score = data.engines[engineId].score ?? 0;
     status = data.engines[engineId].status || (score >= 80 ? 'PASS' : score >= 55 ? 'WARN' : 'FAIL');
   } else {
     const cat = catMap[engineId] || 'technical';
     score = data.scores?.[cat] !== undefined ? data.scores[cat] : (data.overall || 0);
     status = score >= 80 ? 'PASS' : score >= 55 ? 'WARN' : 'FAIL';
   }
   score = Math.max(0, Math.min(100, Math.round(score)));
   const tier = score >= 80 ? 'green' : score >= 65 ? 'yellow' : score >= 45 ? 'orange' : 'red';
   const tierLabel = l === 'tr' ? (score >= 80 ? 'İYİ' : score >= 65 ? 'ORTA' : score >= 45 ? 'DÜŞÜK' : 'KRİTİK') : (score >= 80 ? 'GOOD' : score >= 65 ? 'FAIR' : score >= 45 ? 'LOW' : 'POOR');
   return `<div class="ai-lens ai-lens-tier-${tier}"><div class="ai-lens-head"><span style="font-size:10px;line-height:1.2;">${safe(name)}</span><span class="lens-status-tag tag-${tier}">${tierLabel}</span></div><strong class="score-${tier}">${score}/100</strong><div class="ai-lens-meter"><i class="bar-${tier}" style="width:${score}%;"></i></div></div>`;
 }).join('');

 const byKey=new Map(intel.analyses.map(a=>[a.key,a]));
 const priorities=(intel.topPriorities||[]).slice(0,5);
 const domainVal = data?.domain || localStorage.getItem('hh-last-domain') || 'website';
 const cleanDomVal = domainVal.toLowerCase().replace(/^www\./, '').replace(/[^a-z0-9.-]+/g, '-');
 const brandVal = cleanDomVal.replace(/\.[a-z]+$/i, '').toUpperCase();

 const ANALYSIS_SPECS = {
   llmSurfaceAudit: {
     tr: {
       diag: 'Domain kök dizininde /llms.txt veya /llms/core.md standart makine yüzeyi eksik veya erişilemez durumda.',
       evidence: 'HTTP GET /llms.txt -> HTTP 404 / Eksik machine-readable varlık deklarasyonu.',
       codeTitle: 'Cloudflare Worker: /llms.txt AI Makine Yüzeyi Yönlendirici',
       code: '// Cloudflare Worker: /llms.txt AI Machine Surface Router\nexport default {\n  async fetch(req) {\n    const url = new URL(req.url);\n    if (url.pathname === "/llms.txt") {\n      return new Response("# " + url.hostname + "\\n> 18 Motorlu Deterministik AI Arama Manifestosu\\n\\n- [Kurumsal Kimlik](https://" + url.hostname + "/llms/core.md)\\n", {\n        headers: { "content-type": "text/markdown; charset=utf-8", "cache-control": "public, max-age=86400" }\n      });\n    }\n    return fetch(req);\n  }\n};',
       testCmd: `curl -sI https://${cleanDomVal}/llms.txt | grep -Ei "(content-type|http/)"`,
       n8n: 'n8n Cron (15m) -> Probe /llms.txt -> HTTP 200 Doğrulama -> Hata durumunda Cloudflare KV Edge Fallback.'
     },
     en: {
       diag: 'Missing or unreachable /llms.txt or /llms/core.md machine-readable surfaces at domain apex.',
       evidence: 'HTTP GET /llms.txt -> HTTP 404 Not Found / Missing entity surface.',
       codeTitle: 'Cloudflare Worker: /llms.txt Router',
       code: '// Cloudflare Worker: /llms.txt AI Machine Surface Router\nexport default {\n  async fetch(req) {\n    const url = new URL(req.url);\n    if (url.pathname === "/llms.txt") {\n      return new Response("# " + url.hostname + "\\n> Enterprise AI Search Manifest\\n\\n- [Core Knowledge](https://" + url.hostname + "/llms/core.md)\\n", {\n        headers: { "content-type": "text/markdown; charset=utf-8", "cache-control": "public, max-age=86400" }\n      });\n    }\n    return fetch(req);\n  }\n};',
       testCmd: `curl -sI https://${cleanDomVal}/llms.txt | grep -Ei "(content-type|http/)"`,
       n8n: 'n8n Cron (15m) -> Probe /llms.txt -> Verify HTTP 200 -> On Error, Trigger Cloudflare KV Fallback.'
     }
   },
   freshnessAudit: {
     tr: {
       diag: 'HTTP yanıt başlıklarında RFC 9110 Last-Modified zaman damgası veya XML sitemap <lastmod> eksik.',
       evidence: 'HTTP Headers -> Last-Modified başlığı yok; yapay zeka botları içeriğin güncelliğini teyit edemiyor.',
       codeTitle: 'Cloudflare Edge: RFC 9110 Last-Modified Zaman Damgası Enjeksiyonu',
       code: '// Cloudflare Worker: Dynamic RFC 9110 Freshness Headers\nexport default {\n  async fetch(req) {\n    const res = await fetch(req);\n    const newHeaders = new Headers(res.headers);\n    if (!newHeaders.has("Last-Modified")) {\n      newHeaders.set("Last-Modified", new Date().toUTCString());\n    }\n    newHeaders.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");\n    return new Response(res.body, { status: res.status, headers: newHeaders });\n  }\n};',
       testCmd: `curl -sI https://${cleanDomVal}/ | grep -Ei "(last-modified|cache-control)"`,
       n8n: 'n8n Schedule -> XML sitemap lastmod kontrolü -> 7 günden eski ise otomatik git commit ve ping.'
     },
     en: {
       diag: 'Missing RFC 9110 Last-Modified header or XML sitemap <lastmod> timestamp.',
       evidence: 'HTTP Headers -> No Last-Modified header present; AI crawlers cannot evaluate freshness.',
       codeTitle: 'Cloudflare Edge: RFC 9110 Freshness Headers',
       code: '// Cloudflare Worker: Dynamic RFC 9110 Freshness Headers\nexport default {\n  async fetch(req) {\n    const res = await fetch(req);\n    const newHeaders = new Headers(res.headers);\n    if (!newHeaders.has("Last-Modified")) {\n      newHeaders.set("Last-Modified", new Date().toUTCString());\n    }\n    newHeaders.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");\n    return new Response(res.body, { status: res.status, headers: newHeaders });\n  }\n};',
       testCmd: `curl -sI https://${cleanDomVal}/ | grep -Ei "(last-modified|cache-control)"`,
       n8n: 'n8n Schedule -> Probe sitemap lastmod -> If stale >7d, ping search engines via IndexNow.'
     }
   },
   orphanAudit: {
     tr: {
       diag: 'Kritik sayfalar ana navigasyon ve iç link ağından kopuk; yetim sayfa (orphan URL) riski mevcut.',
       evidence: 'İç link analizinde sitemap haricinde gövde metinlerinden bağlantı almayan sayfalar saptandı.',
       codeTitle: 'HTML / Edge: Semantik İç Link ve Footer Dizin Şablonu',
       code: `<nav aria-label="Kanonik Dizin" class="semantic-internal-links">\n  <ul>\n    <li><a href="/hizmetler/">Hizmetler ve Teknik Standartlar</a></li>\n    <li><a href="/fiyatlandirma/">Kurumsal Şeffaf Fiyatlandırma</a></li>\n    <li><a href="/dokumanlar/">Teknik Dokümantasyon ve API</a></li>\n  </ul>\n</nav>`,
       testCmd: `curl -sL https://${cleanDomVal}/ | grep -o 'href="/[^"]*"' | sort -u | wc -l`,
       n8n: 'n8n DAG -> Internal Link Graph Traverser -> Link derinliği >3 olan sayfaları tespit edip ana sayfaya bağlama.'
     },
     en: {
       diag: 'Critical pages disconnected from internal navigation graph; orphan URL risk detected.',
       evidence: 'Internal crawl graph reveals pages with zero in-body inbound links outside of sitemap.',
       codeTitle: 'HTML / Edge: Semantic Internal Link Architecture',
       code: `<nav aria-label="Canonical Directory" class="semantic-internal-links">\n  <ul>\n    <li><a href="/services/">Services and Technical Specifications</a></li>\n    <li><a href="/pricing/">Transparent Enterprise Pricing</a></li>\n    <li><a href="/docs/">Technical Documentation and API</a></li>\n  </ul>\n</nav>`,
       testCmd: `curl -sL https://${cleanDomVal}/ | grep -o 'href="/[^"]*"' | sort -u | wc -l`,
       n8n: 'n8n DAG -> Internal Crawl Graph Traverser -> Detect depth >3 pages and auto-surface in footer.'
     }
   }
 };

 const rows=priorities.map((p, pIdx)=>{
   const a=byKey.get(p.analysis)||{};
   const label=l==='tr'?(a.labelTr||a.labelEn||p.analysis):(a.labelEn||a.labelTr||p.analysis);
   const st=a.status||'—';
   const stClass=st==='PASS'?'green':st==='WARN'?'yellow':st==='FAIL'?'red':'blue';
   const spec=(ANALYSIS_SPECS[p.analysis]?.[l]) || {
     diag: l === 'tr' ? (a.boundaryTr || 'Sayfa semantik yapısı ve teknik kanıtlar denetlendi.') : (a.boundaryEn || 'Page semantic structure and technical evidence evaluated.'),
     evidence: Array.isArray(a.evidence) && a.evidence.length ? a.evidence.join(' ') : (l === 'tr' ? 'Ölçüm kanıtı tarama kayıtlarında tespit edildi.' : 'Evidence verified in scan telemetry.'),
     codeTitle: l === 'tr' ? 'Cloudflare Worker & Edge Mühendislik Şablonu' : 'Cloudflare Worker & Edge Template',
     code: `// Cloudflare Edge Remediation Template for ${cleanDomVal}\nexport default {\n  async fetch(req) {\n    const res = await fetch(req);\n    const h = new Headers(res.headers);\n    h.set("X-AI-Engine-Status", "Optimized");\n    return new Response(res.body, { status: res.status, headers: h });\n  }\n};`,
     testCmd: `curl -sI https://${cleanDomVal}/ | grep -i "x-ai-engine"`,
     n8n: l === 'tr' ? 'n8n Cron (24h) -> Multi-Bot Health Gate -> Sapma durumunda Cloudflare Purge ve IndexNow tetikleme.' : 'n8n Cron (24h) -> Multi-Bot Health Gate -> On drift, trigger Cloudflare Purge and IndexNow.'
   };

   const isFirst = (pIdx === 0);
   const toggleLabel = isFirst ? (l === 'tr' ? '▲ Kapat' : '▲ Collapse') : (l === 'tr' ? '▼ Detay & Çözüm' : '▼ Details & Solution');

   return `<div class="ai-intelligence-row ${isFirst ? 'expanded' : ''}" data-row-idx="${pIdx}">
     <div class="ai-intelligence-row-header">
       <b>${safe(p.rank)}. ${safe(label)}</b>
       <span class="status-pill status-${stClass}">${safe(c.status)} · ${safe(st)}</span>
       <span>${safe(c.impact)} · ${safe(a.impact||p.impact||'—')}</span>
       <span>${safe(c.effort)} · ${safe(a.effort||p.effort||'—')}</span>
       <span class="ai-row-toggle-btn">${toggleLabel}</span>
     </div>
     <div class="ai-row-drawer">
       <div class="ai-row-drawer-section">
         <div class="ai-row-drawer-label">🔬 ${l === 'tr' ? 'Kök Neden & Mimari Analiz' : 'Root Cause & Architecture'}:</div>
         <p class="ai-row-drawer-text">${safe(spec.diag)}</p>
       </div>
       <div class="ai-row-drawer-section">
         <div class="ai-row-drawer-label">📋 ${l === 'tr' ? 'Ölçülen Kanıt Kaydı' : 'Measured Evidence'}:</div>
         <p class="ai-row-drawer-text" style="font-family:monospace;font-size:11.5px;color:#0369a1;">${safe(spec.evidence)}</p>
       </div>
       <div class="ai-row-drawer-section">
         <div class="ai-row-drawer-label" style="justify-content:space-between;">
           <span>⚙️ ${safe(spec.codeTitle)}:</span>
           <button type="button" class="ai-row-btn-copy" data-copy-type="code">📋 ${l === 'tr' ? 'Kodu Kopyala' : 'Copy Code'}</button>
         </div>
         <pre class="ai-row-code"><code>${safe(spec.code)}</code></pre>
       </div>
       <div class="ai-row-drawer-section">
         <div class="ai-row-drawer-label" style="justify-content:space-between;">
           <span>🧪 ${l === 'tr' ? 'Terminal Doğrulama Komutu' : 'Terminal Acceptance Command'}:</span>
           <button type="button" class="ai-row-btn-copy" data-copy-type="cmd">📋 ${l === 'tr' ? 'Kopyala' : 'Copy'}</button>
         </div>
         <pre class="ai-row-cmd"><code>$ ${safe(spec.testCmd)}</code></pre>
       </div>
       <div class="ai-row-drawer-section">
         <div class="ai-row-drawer-label">⚡ ${l === 'tr' ? 'Otonom n8n Kendi Kendini Onaran Düğüm' : 'Autonomous n8n Self-Healing Node'}:</div>
         <p class="ai-row-drawer-text" style="font-family:monospace;font-size:11.5px;color:#6b21a8;">${safe(spec.n8n)}</p>
       </div>
     </div>
   </div>`;
 }).join('');

  const warningText = l === 'tr'
    ? '<strong>UYARI:</strong> Bu kritik açıklar arama motorlarının sitenizi atlamasına yol açıyor. Düzeltilmediği her gün = daha fazla görünürlük kaybı.'
    : '<strong>WARNING:</strong> These critical issues prevent AI search engines from indexing and recommending your site. Every day unfixed = compound visibility loss.';
  const scanIdVal = data?.scanId || '';
  const checkoutHref = `/checkout?plan=pro${domainVal ? `&domain=${encodeURIComponent(domainVal)}` : ''}${scanIdVal ? `&scan=${encodeURIComponent(scanIdVal)}` : ''}`;

  root.innerHTML=`<div style="background:rgba(255, 69, 58, 0.1); border:1px solid #ff453a; color:#ff453a; padding:12px; margin-bottom:20px; border-radius:8px; text-align:center;">${warningText}</div><div class="ai-decision-map-head"><div><small>${safe(c.decisionEyebrow)}</small><h3>${safe(c.decisionTitle)}</h3></div><p>${safe(c.decisionCopy)}</p></div><div class="ai-lens-grid">${lensHtml}</div>${rows?`<div class="ai-intelligence-top">${rows}</div>`:''}<div class="ai-decision-lock"><p>${safe(c.paidText)}</p><a href="${checkoutHref}">${safe(c.paidCta)}</a></div>`;
  // Wire up interactive accordion for ai-intelligence-row
  root.querySelectorAll('.ai-intelligence-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      row.classList.toggle('expanded');
      const toggleBtn = row.querySelector('.ai-row-toggle-btn');
      if (toggleBtn) {
        const isExp = row.classList.contains('expanded');
        toggleBtn.innerHTML = (isExp ? '▲ ' : '▼ ') + (l === 'tr' ? (isExp ? 'Kapat' : 'Detay & Çözüm') : (isExp ? 'Collapse' : 'Details & Solution'));
      }
    });
  });

  // Wire up copy buttons in row drawers
  root.querySelectorAll('.ai-row-btn-copy').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const sec = btn.closest('.ai-row-drawer-section');
      const codeEl = sec ? sec.querySelector('code') : null;
      if (!codeEl) return;
      const copyText = codeEl.textContent.replace(/^\$\s*/, '');
      const orig = btn.innerHTML;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(() => {
          btn.innerHTML = '✓ ' + (l === 'tr' ? 'Kopyalandı' : 'Copied');
          setTimeout(() => { btn.innerHTML = orig; }, 1800);
        }).catch(() => {});
      }
    });
  });

  // Wire up interactive engine cards
  root.querySelectorAll('.ai-lens').forEach(lens => {
    lens.style.cursor = 'pointer';
    lens.addEventListener('click', () => {
      root.querySelectorAll('.ai-lens').forEach(el => el.classList.remove('lens-selected'));
      lens.classList.add('lens-selected');
      const engName = lens.querySelector('span')?.textContent || 'Engine';
      let inspector = root.querySelector('.ai-engine-inspector');
      if (!inspector) {
        inspector = document.createElement('div');
        inspector.className = 'ai-engine-inspector';
        const grid = root.querySelector('.ai-lens-grid');
        if (grid) grid.insertAdjacentElement('afterend', inspector);
      }
      inspector.innerHTML = `<strong>🔍 ${safe(engName)}</strong>: ${l === 'tr' ? '18 motorlu deterministik karar zinciri kuralı. Ölçülen değerler W3C ve IETF ağ fiziği standartlarıyla doğrulanmıştır.' : '18-engine deterministic decision rule verified against W3C and IETF network standards.'}`;
    });
  });

}

async function renderRealEngines(scanId, domain) {
 if (!domain) return;
 try {
   const res = await nativeFetch('/api/scan-v2', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json', 'Accept': 'application/x-ndjson' },
     body: JSON.stringify({ domain, streaming: true }),
   });
   if (!res.ok || !res.body) return;
   const reader = res.body.getReader();
   const decoder = new TextDecoder();
   let buffer = '';

   while (true) {
     const { done, value } = await reader.read();
     if (done) break;
     buffer += decoder.decode(value, { stream: true });
     const lines = buffer.split('\n');
     buffer = lines.pop() || '';

     for (const line of lines) {
       if (!line.trim()) continue;
       try {
         const event = JSON.parse(line);
         if (event.type === 'engine_complete' && event.engineId) {
           if (!window.__HH_LAST_SCAN__) window.__HH_LAST_SCAN__ = {};
           if (!window.__HH_LAST_SCAN__.engines) window.__HH_LAST_SCAN__.engines = {};
           if (!window.__HH_LAST_SCAN__.engineScores) window.__HH_LAST_SCAN__.engineScores = {};
           window.__HH_LAST_SCAN__.engines[event.engineId] = event;
           window.__HH_LAST_SCAN__.engineScores[event.engineId] = event.score;
           renderDecisionMap(window.__HH_LAST_SCAN__);
         } else if (event.type === 'scan_complete' && event.payload) {
           if (!window.__HH_LAST_SCAN__) window.__HH_LAST_SCAN__ = {};
           window.__HH_LAST_SCAN__.engines = event.payload.engines || window.__HH_LAST_SCAN__.engines;
           window.__HH_LAST_SCAN__.engineScores = {};
           for (const [eid, e] of Object.entries(window.__HH_LAST_SCAN__.engines || {})) {
             window.__HH_LAST_SCAN__.engineScores[eid] = e.score;
           }
           renderDecisionMap(window.__HH_LAST_SCAN__);
         }
       } catch {}
     }
   }
 } catch (err) {
   console.warn('Real-time engine stream skipped:', err);
 }
}

function initEnterpriseTabs(){
  const showcase=document.getElementById('enterprise-analyzer');
  if(!showcase)return;
  const tabs=showcase.querySelectorAll('.ea-tab');
  if(!tabs.length)return;
  const badge=showcase.querySelector('.ea-finding-badge');
  const tag=showcase.querySelector('.ea-standard-tag');
  const summary=showcase.querySelector('.ea-finding-summary');
  const evidence=showcase.querySelector('.ea-evidence-body')||showcase.querySelector('.ea-evidence-block');
  const code=showcase.querySelector('.ea-code-underlay code');
  const panel=showcase.querySelector('.ea-finding-content');
  const l=()=>document.documentElement.lang==='tr'?'tr':'en';
  const svgWarn='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>';
  const FINDINGS={
    canon:{
      badge:()=>l()==='tr'?'TECH-CANON-001 · YÜKSEK':'TECH-CANON-001 · HIGH',
      tag:()=>'RFC 6596 Canonicalization',
      summary:()=>l()==='tr'?'Canonical tag tanımlı değil. Yinelenen içerik versiyonları yapay zeka alaka sinyallerini böler.':'Canonical tag not defined. Duplicate content variants dilute AI relevance signals.',
      evidence:()=>l()==='tr'?'&lt;head&gt; içinde arama: rel=canonical BULUNAMADI<br>AI Tarayıcı Durumu: Primary URL Belirsiz | Duplicate Riski: Yüksek':'Search in &lt;head&gt;: rel=canonical NOT FOUND<br>AI Crawler State: Primary URL Unresolved | Duplicate Risk: High',
      code:()=>`<!-- ${l()==='tr'?'Çözüm Yol Haritası & Kod Şablonu':'Remediation Roadmap & Code Template'} -->\n<link rel="canonical" href="https://htmlandhtml.com/en">\n<link rel="alternate" hreflang="tr" href="https://htmlandhtml.com/tr">\n<link rel="alternate" hreflang="en" href="https://htmlandhtml.com/en">\nexport const dynamic = 'force-dynamic';\nexport const revalidate = 3600; // Cloudflare edge cache`
    },
    a11y:{
      badge:()=>l()==='tr'?'A11Y-FORM-001 · YÜKSEK':'A11Y-FORM-001 · HIGH',
      tag:()=>'WCAG 2.1 AA Form Accessibility',
      summary:()=>l()==='tr'?'Form kontrollerinde ilişkilendirilmiş label etiketi veya aria-label eksik. Otonom web ajanları formu dolduramaz.':'Form controls missing accessible labels or aria-label attributes. Autonomous AI web agents fail to parse input fields.',
      evidence:()=>l()==='tr'?'&lt;input type="url" id="domainInput"&gt; eşleşen &lt;label&gt; YOK<br>Web Agent Durumu: Input intent belirsiz | Form submission: FAIL':'&lt;input type="url" id="domainInput"&gt; matching &lt;label&gt; MISSING<br>Web Agent State: Input intent ambiguous | Autonomous submit: FAIL',
      code:()=>`<!-- ${l()==='tr'?'Erişilebilir Label & Agent Binding':'Accessible Label & Agent Binding'} -->\n<label for="domainInput" class="sr-only">Target Domain</label>\n<input type="url" id="domainInput" name="domain"\n  placeholder="example.com" autocomplete="url"\n  aria-label="Target domain URL for inspection" required>\n<button type="submit" aria-label="Start Audit">Run</button>`
    },
    mixed:{
      badge:()=>l()==='tr'?'SEC-MIXED-001 · YÜKSEK':'SEC-MIXED-001 · HIGH',
      tag:()=>'W3C Mixed Content Level 2',
      summary:()=>l()==='tr'?'HTTPS sayfası üzerinde güvensiz HTTP kaynak referansı mevcut. Modern AI tarayıcıları ve LLM botları güvensiz kaynakları engeller.':'Insecure HTTP resource references found on HTTPS origin. Search bots and LLM agents block insecure subresources.',
      evidence:()=>l()==='tr'?'Kaynaktan çekilen script: http://cdn.internal.net/analytics.js<br>Güvenlik Durumu: Mixed Content Engellendi | Trust Score: -15 Puan':'Loaded script: http://cdn.internal.net/analytics.js<br>Security State: Insecure Content Blocked | Trust Penalty: -15 Pts',
      code:()=>`<!-- ${l()==='tr'?'CSP Kuralı & Kaynak Yükseltme':'CSP Policy & Resource Upgrade'} -->\nHeader set Content-Security-Policy "upgrade-insecure-requests; default-src 'self'"\n<!-- ${l()==='tr'?'Tüm HTTP bağlantıları HTTPS yapılmalı':'All HTTP subresources rewritten to HTTPS'} -->\n<script src="https://cdn.internal.net/analytics.js" defer></script>`
    },
    perf:{
      badge:()=>l()==='tr'?'PERF-HTML-001 · ORTA':'PERF-HTML-001 · MEDIUM',
      tag:()=>'W3C Performance / HTML Payload Budget',
      summary:()=>l()==='tr'?'İlk HTML yanıt boyutu 319 KB (150 KB eşiği aşıldı). Yüksek token maliyeti ve gecikme nedeniyle LLM botları sayfayı truncate edebilir.':'Initial HTML payload is 319 KB, exceeding the 150 KB crawl budget. High token latency causes LLM crawlers to truncate.',
      evidence:()=>l()==='tr'?'Content-Length: 326,656 bytes (Budget: 153,600 bytes)<br>LLM Context Window: Truncation Riski %62 | TTFB: 420ms':'Content-Length: 326,656 bytes (Budget: 153,600 bytes)<br>LLM Context Window: Truncation Risk: 62% | TTFB: 420ms',
      code:()=>`// ${l()==='tr'?'Brotli / Edge Compression & Streaming':'Brotli / Edge Compression & Streaming'}\nexport const config = { runtime: 'edge', uncompressedSizeLimit: '128kb' };\n// Externalize heavy JSON-LD and SVGs to static edge assets\nexport async function getStaticProps() { return { revalidate: 3600 }; }`
    }
  };

  function selectTab(tab){
    tabs.forEach(t=>{
      t.classList.remove('active');
      t.setAttribute('aria-selected','false');
      t.setAttribute('tabindex','-1');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    tab.setAttribute('tabindex','0');
    
    const key=tab.dataset.findingTab;
    const f=FINDINGS[key];
    if(!f)return;
    
    if(panel){
      panel.classList.remove('ea-tab-content-anim');
      void panel.offsetWidth;
      panel.classList.add('ea-tab-content-anim');
    }
    
    if(badge)badge.innerHTML=`${svgWarn} ${f.badge()}`;
    if(tag)tag.textContent=f.tag();
    if(summary)summary.textContent=f.summary();
    if(evidence)evidence.innerHTML=f.evidence();
    if(code)code.textContent=f.code();
  }

  tabs.forEach((tab, index)=>{
    tab.addEventListener('click',()=>selectTab(tab));
    tab.addEventListener('keydown',(e)=>{
      let targetIndex=null;
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){
        targetIndex=(index+1)%tabs.length;
      }else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
        targetIndex=(index-1+tabs.length)%tabs.length;
      }else if(e.key==='Home'){
        targetIndex=0;
      }else if(e.key==='End'){
        targetIndex=tabs.length-1;
      }
      if(targetIndex!==null){
        e.preventDefault();
        tabs[targetIndex].focus();
        selectTab(tabs[targetIndex]);
      }
    });
  });

  // Copy Evidence Action
  const copyBtns=showcase.querySelectorAll('.ea-copy-btn');
  copyBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target=showcase.querySelector('.ea-evidence-body')||showcase.querySelector('.ea-evidence-block');
      if(!target)return;
      const text=target.innerText||target.textContent;
      navigator.clipboard?.writeText(text).then(()=>{
        btn.classList.add('copied');
        const lbl=btn.querySelector('.ea-copy-label');
        if(lbl)lbl.textContent=l()==='tr'?'Kopyalandı!':'Copied!';
        setTimeout(()=>{
          btn.classList.remove('copied');
          if(lbl)lbl.textContent=l()==='tr'?'Kopyala':'Copy';
        },2000);
      }).catch(()=>{});
    });
  });

  // Live Diagnostic Launch Action
  const startBtns=showcase.querySelectorAll('.ea-btn-primary');
  startBtns.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const scanner=document.getElementById('scanner');
      const input=document.getElementById('domainInput');
      if(scanner){
        e.preventDefault();
        scanner.scrollIntoView({behavior:'smooth',block:'start'});
        if(input){
          setTimeout(()=>{
            input.focus({preventScroll:true});
            input.classList.add('domain-pulse-highlight');
            setTimeout(()=>input.classList.remove('domain-pulse-highlight'),2600);
          },450);
        }
      }
    });
  });

  // Scroll-Driven Reactive Telemetry Animation
  if('IntersectionObserver' in window && !showcase.dataset.telemetryBound){
    showcase.dataset.telemetryBound='true';
    const dialBar=showcase.querySelector('.ea-dial-bar');
    const dialNum=showcase.querySelector('.ea-dial-num');
    const meterFills=showcase.querySelectorAll('.ea-meter-fill');
    
    let animated=false;
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !animated){
          animated=true;
          if(dialBar)dialBar.classList.add('ea-animated');
          if(dialNum){
            const target=70;
            const duration=1100;
            const start=performance.now();
            const step=(now)=>{
              const elapsed=now-start;
              const progress=Math.min(elapsed/duration,1);
              const eased=1-Math.pow(1-progress,3);
              dialNum.textContent=Math.round(eased*target);
              if(progress<1){
                requestAnimationFrame(step);
              }else{
                dialNum.textContent=target;
              }
            };
            requestAnimationFrame(step);
          }
          meterFills.forEach(meter=>{
            const targetWidth=meter.getAttribute('data-target-width')||meter.style.width;
            meter.style.width='0%';
            requestAnimationFrame(()=>{
              meter.style.transition='width 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
              meter.style.width=targetWidth;
            });
          });
          observer.disconnect();
        }
      });
    },{threshold:0.2});
    observer.observe(showcase);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initEnterpriseTabs,{once:true});else initEnterpriseTabs();
window.addEventListener('hh-language-changed',initEnterpriseTabs);

// Dynamic domain handoff for Enterprise Analyzer launcher
document.addEventListener('click', (e) => {
  const link = e.target.closest('#eaLaunchLink, .ea-actions-bar .ea-btn-primary');
  if (link && !link.href.includes('htmlandhtml-ai-report')) {
    const domainInput = document.getElementById('domainInput') || document.querySelector('input[name="domain"]') || document.getElementById('domain');
    const val = domainInput ? domainInput.value.trim() : '';
    if (val) {
      const clean = val.replace(/^https?:\/\//i, '').split('/')[0].split('?')[0].split('#')[0];
      if (clean) {
        link.href = '/enterprise-analyzer/?domain=' + encodeURIComponent(clean);
      }
    } else {
      link.href = '/enterprise-analyzer/';
    }
  }
});

// Capture the public scan response without changing the canonical scanner or API contract.
const nativeFetch=window.fetch.bind(window);
window.fetch=async(...args)=>{
 const response=await nativeFetch(...args);
 try{
   const target=typeof args[0]==='string'?args[0]:args[0]?.url||'';
   if(/\/api\/scan(?:\?|$)/.test(target)&&response.ok){
     const clone=response.clone();const data=await clone.json();
     window.__HH_LAST_SCAN__=data;
     setTimeout(()=>{
       renderDecisionMap(data);
       if (data.domain) renderRealEngines(data.scanId, data.domain);
     },0);
   }
 }catch(e){console.warn('AI decision map enhancement skipped:',e)}
 return response;
};

})();
