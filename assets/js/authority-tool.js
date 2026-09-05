(()=>{
const root=document.querySelector('[data-tool-categories]');
if(!root)return;
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
const copy={tr:{scanning:'Site taranıyor; seçili motorlar 12-motor tarama zinciri içinde çalışıyor…',failed:'Tarama tamamlanamadı.',clear:'Bu kapsamda doğrulanmış sorun bulunmadı.',score:'seçili kapsam skoru',checked:'kontrol',pages:'sayfa',finding:'bulgu'},en:{scanning:'Scanning the site; selected engines run inside the full 12-engine chain…',failed:'Scan could not be completed.',clear:'No verified issue was found in this scope.',score:'selected-scope score',checked:'checks',pages:'pages',finding:'findings'}}[lang];
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function selectedScore(data){const values=cats.map(c=>Number(data.scores?.[c])).filter(Number.isFinite);return values.length?Math.round(values.reduce((a,b)=>a+b,0)/values.length):Number(data.overall||0)}
function render(data){
 const list=(data.findings||[]).filter(f=>cats.includes(f.category));
 score.innerHTML=`<strong>${selectedScore(data)}</strong><span>/100 ${copy.score}</span>`;
 meta.textContent=`${data.domain} · ${data.checked||0} ${copy.checked} · ${data.summary?.pagesScanned||data.summary?.pages||'—'} ${copy.pages} · ${list.length} ${copy.finding}`;
 findings.innerHTML=list.length?list.map(f=>`<article class="tool-finding"><header><b>${esc(lang==='tr'?f.titleTr:f.titleEn)}</b><small>${esc(String(f.severity||'').toUpperCase())} · ${esc(f.confidence)} · ${esc(f.sourceClass)}</small></header><p>${esc(lang==='tr'?f.impactTr:f.impactEn)}</p><code>${esc(f.evidence)}</code></article>`).join(''):`<article class="tool-finding"><b>${esc(copy.clear)}</b></article>`;
 result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});
}
form?.addEventListener('submit',async e=>{
 e.preventDefault();const domain=input.value.trim();if(!domain)return;
 btn.disabled=true;status.hidden=false;status.classList.remove('error');status.textContent=copy.scanning;result.hidden=true;
 try{const r=await fetch('/api/scan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({domain})});const data=await r.json();if(!r.ok)throw new Error(data.error||copy.failed);render(data);status.hidden=true}
 catch(err){status.hidden=false;status.classList.add('error');status.textContent=err?.message||copy.failed}
 finally{btn.disabled=false}
});
})();