(()=>{
const root=document.querySelector('[data-tool-categories]');
if(!root)return;
if(!document.querySelector('link[data-intelligence-ui]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/css/intelligence.css';l.dataset.intelligenceUi='1';document.head.appendChild(l)}
const lang=(document.documentElement.lang||'en').toLowerCase().startsWith('tr')?'tr':'en';
const cats=(root.dataset.toolCategories||'').split(',').map(x=>x.trim()).filter(Boolean);
const form=document.getElementById('toolScanForm');
const input=document.getElementById('toolDomain');
const status=document.getElementById('toolStatus');
const result=document.getElementById('toolResult');
const score=document.getElementById('toolScore');
const meta=document.getElementById('toolMeta');
const findings=document.getElementById('toolFindings');
const btn=form?.querySelector('button');
const copy={tr:{scanning:'Site taranıyor; 12 motor ve 13 istihbarat denetimi aynı kanıt zincirinde çalışıyor…',failed:'Tarama tamamlanamadı.',clear:'Bu kapsamda doğrulanmış sorun bulunmadı.',score:'seçili kapsam skoru',checked:'kontrol',pages:'sayfa',finding:'bulgu',intelligence:'Arama ve AI İstihbarat Denetimleri',intelligenceNote:'Bu 13 analiz ana 12-motor skorunu değiştirmez. Ölçülemeyen veya kaynak kod gerektiren alanlar uydurulmaz.',lenses:'Hazırlık lensleri',priorities:'Öncelikli karar alanları'},en:{scanning:'Scanning the site; 12 engines and 13 intelligence audits run on the same evidence chain…',failed:'Scan could not be completed.',clear:'No verified issue was found in this scope.',score:'selected-scope score',checked:'checks',pages:'pages',finding:'findings',intelligence:'Search & AI Intelligence Audits',intelligenceNote:'These 13 analyses do not change the canonical 12-engine score. Unmeasured or source-context-only areas are never fabricated.',lenses:'Readiness lenses',priorities:'Priority decision areas'}}[lang];
const sevMap={tr:{critical:'KRİTİK',high:'YÜKSEK',medium:'ORTA',low:'DÜŞÜK',info:'BİLGİ'},en:{critical:'CRITICAL',high:'HIGH',medium:'MEDIUM',low:'LOW',info:'INFO'}};
const confMap={tr:{confirmed:'DOĞRULANMIŞ',strong:'GÜÇLÜ',probable:'OLASI','requires-source-verification':'KAYNAK DOĞRULAMASI GEREKİR'},en:{confirmed:'CONFIRMED',strong:'STRONG',probable:'PROBABLE','requires-source-verification':'SOURCE VERIFICATION REQUIRED'}};
const srcMap={tr:{OFFICIAL_STANDARD:'RESMİ STANDART',OFFICIAL_VENDOR:'RESMİ SAĞLAYICI',PROPOSAL:'ÖNERİ',MEASURED:'ÖLÇÜLMÜŞ',INTERNAL_HEURISTIC:'İÇ SEZGİSEL KURAL',EXPERIMENTAL:'DENEYSEL'},en:{}};
const statusMap={tr:{PASS:'GEÇTİ',WARN:'UYARI',FAIL:'BAŞARISIZ',NOT_MEASURED:'ÖLÇÜLMEDİ',REQUIRES_CONTEXT:'BAĞLAM GEREKİR'},en:{PASS:'PASS',WARN:'WARN',FAIL:'FAIL',NOT_MEASURED:'NOT MEASURED',REQUIRES_CONTEXT:'REQUIRES CONTEXT'}};
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function selectedScore(data){const values=cats.map(c=>Number(data.scores?.[c])).filter(Number.isFinite);return values.length?Math.round(values.reduce((a,b)=>a+b,0)/values.length):Number(data.overall||0)}
function renderIntelligence(data){
 const old=document.getElementById('toolIntelligence');if(old)old.remove();
 const intel=data.intelligence;if(!intel?.analyses?.length)return;
 const wrap=document.createElement('section');wrap.id='toolIntelligence';wrap.className='tool-intelligence';
 const lensEntries=Object.entries(intel.readinessLenses||{});
 const lensHtml=lensEntries.map(([k,v])=>`<div class="intel-lens"><span>${esc(k)}</span><strong>${esc(v.score)}/100</strong></div>`).join('');
 const analysisHtml=intel.analyses.map(a=>`<article class="intel-item" data-status="${esc(a.status)}"><header><b>${esc(lang==='tr'?a.labelTr:a.labelEn)}</b><span>${esc(statusMap[lang]?.[a.status]||a.status)}${a.score===null?'':` · ${esc(a.score)}/100`}</span></header><p>${esc((a.evidence||[])[0]||'')}</p><small>${esc(lang==='tr'?a.boundaryTr:a.boundaryEn)}</small></article>`).join('');
 const priorityHtml=(intel.topPriorities||[]).map(p=>`<li><b>#${esc(p.rank)}</b> ${esc(p.analysis)} · ${esc(p.impact)} / ${esc(p.effort)}</li>`).join('');
 wrap.innerHTML=`<div class="intel-head"><div><h3>${esc(copy.intelligence)}</h3><p>${esc(copy.intelligenceNote)}</p></div><span>13 / 7</span></div><h4>${esc(copy.lenses)}</h4><div class="intel-lenses">${lensHtml}</div>${priorityHtml?`<h4>${esc(copy.priorities)}</h4><ol class="intel-priorities">${priorityHtml}</ol>`:''}<div class="intel-grid">${analysisHtml}</div>`;
 result.insertAdjacentElement('afterend',wrap);
}
function render(data){
 const list=(data.findings||[]).filter(f=>cats.includes(f.category));
 score.innerHTML=`<strong>${selectedScore(data)}</strong><span>/100 ${copy.score}</span>`;
 meta.textContent=`${data.domain} · ${data.checked||0} ${copy.checked} · ${data.summary?.pagesScanned||data.summary?.pages||'—'} ${copy.pages} · ${list.length} ${copy.finding}`;
 findings.innerHTML=list.length?list.map(f=>`<article class="tool-finding"><header><b>${esc(lang==='tr'?f.titleTr:f.titleEn)}</b><small>${esc(sevMap[lang]?.[f.severity]||f.severity)} · ${esc(confMap[lang]?.[f.confidence]||f.confidence)} · ${esc(srcMap[lang]?.[f.sourceClass]||f.sourceClass)}</small></header><p>${esc(lang==='tr'?f.impactTr:f.impactEn)}</p><code>${esc(f.evidence)}</code></article>`).join(''):`<article class="tool-finding"><b>${esc(copy.clear)}</b></article>`;
 result.hidden=false;renderIntelligence(data);result.scrollIntoView({behavior:'smooth',block:'nearest'});
}
document.querySelectorAll('.chip-btn').forEach(c=>c.addEventListener('click',()=>{if(input){input.value=c.dataset.domain||c.textContent.trim();input.focus()}}));
form?.addEventListener('submit',async e=>{
 e.preventDefault();const domain=input.value.trim();if(!domain)return;
 btn.disabled=true;status.hidden=false;status.classList.remove('error');status.textContent=copy.scanning;result.hidden=true;document.getElementById('toolIntelligence')?.remove();
 try{const r=await fetch('/api/scan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({domain})});const data=await r.json();if(!r.ok){if(lang==='tr'){console.warn('Scan API:',data.error);throw new Error(copy.failed)}throw new Error(data.error||copy.failed)}render(data);status.hidden=true}
 catch(err){status.hidden=false;status.classList.add('error');status.textContent=err?.message||copy.failed}
 finally{btn.disabled=false}
});
})();
