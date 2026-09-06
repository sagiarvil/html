(()=>{
'use strict';
const COPY={
 tr:{
  hero:'Yapay Zeka Sizi Buluyor mu?<br><em>Tavsiye Edilmeye Hazır mısınız?</em>',
  lead:'Tek URL girin. HTML&HTML; llms.txt, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, AI crawler erişimi ve teknik temeli tek taramada ölçer. Sorunları ve kanıtı ücretsiz görün; nasıl uygulanacağını yalnız ihtiyacınız varsa $99 Uygulama Planı ile açın.',
  scan:'Ücretsiz Kontrol Et',
  mandateTitle:'Teşhis ücretsiz.<br>Uygulama planı $99.',
  mandateCopy:'Ne yanlış olduğunu saklamıyoruz. $99 katmanında kök neden, P0–P3 uygulama sırası, kabul/regresyon testleri, rollback ve yazılımcınıza teslim edilecek ZIP mühendislik paketi açılır.',
  getMandate:'AI Görünürlük Yol Haritasını Aç →',
  locked:'🔒 Nasıl düzeltileceği $99 Uygulama Planı içinde',
  decisionEyebrow:'AÇIK TEŞHİS KATMANI · %100 ÜCRETSİZ ($0)',
  decisionTitle:'12 skorun ötesinde: hangi görünürlük katmanı kaybediyor?',
  decisionCopy:'7 hazırlık lensi ve 13 istihbarat bulgusu %100 ÜCRETSİZ ($0) teşhis edilir. Teşhis edilen açıkların hazır düzeltme kodları ve 22 dosyalık ZIP paketi $99 Yol Haritası katmanındadır.',
  priority:'ÖNCELİK',impact:'ETKİ',effort:'ÇABA',status:'DURUM',
  paidText:'Teşhis ve kanıtlar ücretsiz dökümlendi ($0). Bunları koda döküp çözecek $99 Yol Haritasına hazır mısınız?',
  paidCta:'$99 Mühendislik Yol Haritasını Aç (ZIP) →'
 },
 en:{
  hero:'Can AI Find You?<br><em>Are You Ready to Be Recommended?</em>',
  lead:'Enter one URL. HTML&HTML evaluates llms.txt, GEO, AEO, LLMO, AAO, RAG, E-E-A-T, AI crawler access and the technical foundation in one scan. See problems and evidence free; unlock the $99 Implementation Blueprint only if you need the execution plan.',
  scan:'Check Free',
  mandateTitle:'Diagnosis is free.<br>The implementation blueprint is $99.',
  mandateCopy:'We do not hide the diagnosis. The $99 layer unlocks root causes, P0–P3 execution order, acceptance/regression tests, rollback safeguards and the ZIP engineering package for your developer.',
  getMandate:'Unlock AI Search Visibility Roadmap →',
  locked:'🔒 How to fix it is inside the $99 Implementation Blueprint',
  decisionEyebrow:'OPEN DIAGNOSTIC LAYER · 100% FREE ($0)',
  decisionTitle:'Beyond 12 scores: which visibility layer is losing ground?',
  decisionCopy:'Seven readiness lenses and 13 intelligence findings are diagnosed 100% FREE ($0). Turn-key code templates and the 22-file ZIP package are unlocked in the $99 Roadmap.',
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
 const lensHtml=lensOrder.map(k=>{
   const x=lenses[k];
   const score=typeof x?.score==='number'?Math.round(x.score):null;
   const scoreDisplay=score!==null?score:'—';
   const tier=score===null?'blue':score>=80?'green':score>=65?'yellow':score>=45?'orange':'red';
   const tierLabel=l==='tr'
     ?(score>=80?'İYİ':score>=65?'ORTA':score>=45?'DÜŞÜK':'KRİTİK')
     :(score>=80?'GOOD':score>=65?'FAIR':score>=45?'LOW':'POOR');
   return `<div class="ai-lens ai-lens-tier-${tier}"><div class="ai-lens-head"><span>${safe(k)}</span><span class="lens-status-tag tag-${tier}">${tierLabel}</span></div><strong class="score-${tier}">${safe(scoreDisplay)}${score===null?'':'/100'}</strong><div class="ai-lens-meter"><i class="bar-${tier}" style="width:${Math.max(0,Math.min(100,score||0))}%;"></i></div></div>`;
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
 root.innerHTML=`<div class="ai-decision-map-head"><div><small>${safe(c.decisionEyebrow)}</small><h3>${safe(c.decisionTitle)}</h3></div><p>${safe(c.decisionCopy)}</p></div><div class="ai-lens-grid">${lensHtml}</div>${rows?`<div class="ai-intelligence-top">${rows}</div>`:''}<div class="ai-decision-lock"><p>${safe(c.paidText)}</p><a href="/checkout?domain=${encodeURIComponent(data.domain||'')}&scan=${encodeURIComponent(data.scanId||'')}">${safe(c.paidCta)}</a></div>`;
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
