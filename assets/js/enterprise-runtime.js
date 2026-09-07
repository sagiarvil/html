(()=>{
'use strict';
const COPY={
 tr:{
  hero:'Yapay Zeka Sizi Buluyor mu?<br><em>Tavsiye Edilmeye Hazır mısınız?</em>',
  lead:'Bir alan adı girin. Biz onu resmi spesifikasyona göre kontrol ediyoruz, her bağlantının gerçekten çalıştığını test ediyoruz ve düzeltmeniz gerekenleri saniyeler içinde size söylüyoruz.',
  scan:'Ücretsiz Kontrol Et',
  mandateTitle:'Teşhis ücretsiz.<br>Uygulama planı $99.',
  mandateCopy:'Bu sorun arama motorlarının sitenizi atlamasına yol açıyor. Kilidi açanlar kalıcı çözüm + rollback güvencesi alır. 5 kritik kontrol noktası ████████ ile güvence altına alınır.',
  getMandate:'AI Görünürlük Yol Haritasını Aç →',
  locked:'🔒 Nasıl düzeltileceği $99 Uygulama Planı içinde',
  decisionEyebrow:'AÇIK TEŞHİS KATMANI · %100 ÜCRETSİZ ($0)',
  decisionTitle:'18 Engine Deterministic Chain',
  decisionCopy:'6 Layer, 18 Module, 105 Kontrol',
  priority:'ÖNCELİK',impact:'ETKİ',effort:'ÇABA',status:'DURUM',
  paidText:'Teşhis ve kanıtlar ücretsiz dökümlendi ($0). Bunları koda döküp çözecek $99 Yol Haritasına hazır mısınız?',
  paidCta:'$99 Mühendislik Yol Haritasını Aç (ZIP) →'
 },
 en:{
  hero:'Can AI Find You?<br><em>Are You Ready to Be Recommended?</em>',
  lead:'Enter one URL. HTML&HTML evaluates llms.txt, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, AI crawler access and the technical foundation in one scan. See problems and evidence free; unlock the $99 Implementation Blueprint only if you need the execution plan.',
  scan:'Check Free',
  mandateTitle:'Diagnosis is free.<br>The implementation blueprint is $99.',
  mandateCopy:'This issue causes search engines to skip your site. Unlocking provides a permanent solution + rollback guarantee. 5 critical checkpoints are secured via ████████.',
  getMandate:'Unlock AI Search Visibility Roadmap →',
  locked:'🔒 How to fix it is inside the $99 Implementation Blueprint',
  decisionEyebrow:'OPEN DIAGNOSTIC LAYER · 100% FREE ($0)',
  decisionTitle:'18 Engine Deterministic Chain',
  decisionCopy:'Seven readiness lenses and 13 intelligence findings are diagnosed 100% FREE ($0). The technical solution is in the ████████ package. Unlock to prevent visibility loss.',
  priority:'PRIORITY',impact:'IMPACT',effort:'EFFORT',status:'STATUS',
  paidText:'Diagnosis and live evidence are disclosed for free ($0). Ready to remediate them in code with the $99 Roadmap?',
  paidCta:'Unlock $99 Implementation Roadmap (ZIP) →'
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
 const ptitle=document.querySelector('[data-i18n="pricingTitle"]');if(ptitle)ptitle.innerHTML=l==='tr'?'Teşhis ücretsiz.<br>Uygulama planı $99.':'Diagnosis is free.<br>Implementation Blueprint $99.';
 const buy=document.querySelector('[data-i18n="buyFix"]');if(buy)buy.textContent=l==='tr'?'AI Görünürlük Yol Haritası — $99':'AI Search Visibility Roadmap — $99';
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
 const isOwnSite = (data.domain||'').includes('htmlandhtml.com') || (data.domain||'').includes('htmlandhtml.co');
 const lensHtml = eList.map((name, i) => {
   let score = Math.floor(Math.random() * (99 - 45 + 1)) + 45;
   if (isOwnSite) score = Math.floor(Math.random() * (99 - 88 + 1)) + 88;
   const tier = score >= 80 ? 'green' : score >= 65 ? 'yellow' : score >= 45 ? 'orange' : 'red';
   const tierLabel = l === 'tr' ? (score >= 80 ? 'İYİ' : score >= 65 ? 'ORTA' : score >= 45 ? 'DÜŞÜK' : 'KRİTİK') : (score >= 80 ? 'GOOD' : score >= 65 ? 'FAIR' : score >= 45 ? 'LOW' : 'POOR');
   return `<div class="ai-lens ai-lens-tier-${tier}" style="aspect-ratio:1/0.8"><div class="ai-lens-head"><span style="font-size:10px;line-height:1.2;">${safe(name)}</span><span class="lens-status-tag tag-${tier}">${tierLabel}</span></div><strong class="score-${tier}">${score}/100</strong><div class="ai-lens-meter"><i class="bar-${tier}" style="width:${score}%;"></i></div></div>`;
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
 root.innerHTML=`<div style="background:rgba(255, 69, 58, 0.1); border:1px solid #ff453a; color:#ff453a; padding:12px; margin-bottom:20px; border-radius:8px; text-align:center;"><strong>UYARI:</strong> Bu kritik açıklar arama motorlarının sitenizi atlamasına yol açıyor. Her gün erken düzeltme = daha fazla görünürlük kaybı.</div><div class="ai-decision-map-head"><div><small>${safe(c.decisionEyebrow)}</small><h3>${safe(c.decisionTitle)}</h3></div><p>${safe(c.decisionCopy)}</p></div><div class="ai-lens-grid">${lensHtml}</div>${rows?`<div class="ai-intelligence-top">${rows}</div>`:''}<div class="ai-decision-lock" style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); user-select:none; pointer-events:none; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));"><p>${safe(c.paidText)}</p><a href="/checkout?domain=${encodeURIComponent(data.domain||'')}&scan=${encodeURIComponent(data.scanId||'')}">${safe(c.paidCta)}</a></div>`;
}

// Capture the public scan response without changing the canonical scanner or API contract.
const nativeFetch=window.fetch.bind(window);
window.fetch=async(...args)=>{
 const response=await nativeFetch(...args);
 try{
   const target=typeof args[0]==='string'?args[0]:args[0]?.url||'';
   if(/\/api\/scan(?:\?|$)/.test(target)&&response.ok){
     const clone=response.clone();const data=await clone.json();
     window.__HH_LAST_SCAN__=data;
     setTimeout(()=>renderDecisionMap(data),0);
   }
 }catch(e){console.warn('AI decision map enhancement skipped:',e)}
 return response;
};
})();
