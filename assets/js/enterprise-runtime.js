(()=>{
'use strict';
const COPY={
 tr:{
  hero:'Yapay zeka sitenizi tavsiye ediyor mu?<br><em>Yapay Zeka Sizi Buluyor mu? Tavsiye Edilmeye Hazır mısınız?</em>',
  lead:'ChatGPT, Claude ve Perplexity için 18 motorlu otonom denetim ve dağıtım paketi. 15 saniyede tek tıkla sitenizi tarayın, model ağırlıklarındaki ve RAG mimarisindeki görünürlük kayıplarını kanıtıyla görün.',
  scan:'Derin AI Denetimi Başlat →',
  mandateTitle:'Kontrol ücretsiz.<br>AI Görünürlük Onarım Seti $99.',
  mandateCopy:'Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır. 5 kritik kontrol noktası onarım seti ile güvence altına alınır.',
  getMandate:'Onarım Setini İndir — $99 →',
  locked:'🔒 Nasıl onarılacağı $99 Onarım Seti içinde',
  decisionEyebrow:'ÜCRETSİZ KONTROL ($0) · GÖRÜNÜRLÜK RAPORU',
  decisionTitle:'18 Engine Deterministic Chain',
  decisionCopy:'6 Layer, 18 Module, 105 Kontrol',
  priority:'ÖNCELİK',impact:'ETKİ',effort:'ÇABA',status:'DURUM',
  paidText:'Kontrol ve teknik kanıtlar ücretsiz dökümlendi ($0). Bunları koda döküp çözecek $99 Onarım Setine hazır mısınız?',
  paidCta:'Onarım Setini İndir — $99 →'
 },
 en:{
  hero:'Does AI Recommend You?<br><em>Can AI Find You? Are You Ready to Be Recommended?</em>',
  lead:'Autonomous 18-engine diagnostic & deployment pack for ChatGPT, Claude, and Perplexity. Run a 1-click deep audit in 15 seconds to uncover model weight and RAG architectural gaps.',
  scan:'Start Deep AI Audit →',
  mandateTitle:'Diagnosis is free.<br>The AI Visibility Repair Kit is $99.',
  mandateCopy:'This issue causes search engines to skip your site. Unlocking provides a permanent solution + rollback guarantee. 5 critical checkpoints are secured via automated remediation.',
  getMandate:'Download Repair Kit — $99 →',
  locked:'🔒 How to fix it is inside the $99 Repair Kit',
  decisionEyebrow:'OPEN DIAGNOSTIC LAYER · 100% FREE ($0)',
  decisionTitle:'18 Engine Deterministic Chain',
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
 const rows=priorities.map(p=>{
   const a=byKey.get(p.analysis)||{};
   const label=l==='tr'?(a.labelTr||a.labelEn||p.analysis):(a.labelEn||a.labelTr||p.analysis);
   const st=a.status||'—';
   const stClass=st==='PASS'?'green':st==='WARN'?'yellow':st==='FAIL'?'red':'blue';
   return `<div class="ai-intelligence-row"><b>${safe(p.rank)}. ${safe(label)}</b><span class="status-pill status-${stClass}">${safe(c.status)} · ${safe(st)}</span><span>${safe(c.impact)} · ${safe(a.impact||p.impact||'—')}</span><span>${safe(c.effort)} · ${safe(a.effort||p.effort||'—')}</span></div>`;
 }).join('');
  const warningText = l === 'tr'
    ? '<strong>UYARI:</strong> Bu kritik açıklar arama motorlarının sitenizi atlamasına yol açıyor. Düzeltilmediği her gün = daha fazla görünürlük kaybı.'
    : '<strong>WARNING:</strong> These critical issues prevent AI search engines from indexing and recommending your site. Every day unfixed = compound visibility loss.';
  root.innerHTML=`<div style="background:rgba(255, 69, 58, 0.1); border:1px solid #ff453a; color:#ff453a; padding:12px; margin-bottom:20px; border-radius:8px; text-align:center;">${warningText}</div><div class="ai-decision-map-head"><div><small>${safe(c.decisionEyebrow)}</small><h3>${safe(c.decisionTitle)}</h3></div><p>${safe(c.decisionCopy)}</p></div><div class="ai-lens-grid">${lensHtml}</div>${rows?`<div class="ai-intelligence-top">${rows}</div>`:''}<div class="ai-decision-lock" style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); user-select:none; pointer-events:none;"><p>${safe(c.paidText)}</p><a href="/checkout?domain=${encodeURIComponent(data.domain||'')}&scan=${encodeURIComponent(data.scanId||'')}">${safe(c.paidCta)}</a></div>`;
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
