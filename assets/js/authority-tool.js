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
const lensMeta={
 SEO:{theme:'blue',tag:'01 · SEO',labelTr:'Arama Motoru',labelEn:'Search Engine',descTr:'Google & Bing indeksleme, HTTP ve teknik temel.',descEn:'Google & Bing indexing, HTTP and technical foundation.'},
 GEO:{theme:'purple',tag:'02 · GEO',labelTr:'Üretken Motorlar',labelEn:'Generative AI',descTr:'Perplexity, ChatGPT ve Gemini kaynak gösterimi.',descEn:'Citations in generative engines and AI summaries.'},
 AEO:{theme:'purple',tag:'03 · AEO',labelTr:'Cevap Motorları',labelEn:'Answer Engine',descTr:'Doğrudan cevap ve featured snippet hazırlığı.',descEn:'Direct answer extraction and featured snippet readiness.'},
 LLMO:{theme:'purple',tag:'04 · LLMO',labelTr:'Büyük Dil Modelleri',labelEn:'Language Models',descTr:'llms.txt v2 ve token verimli dokümantasyon.',descEn:'llms.txt v2 standard and clean markdown surfaces.'},
 AAO:{theme:'amber',tag:'05 · AAO',labelTr:'Otonom Ajanlar',labelEn:'Autonomous Agents',descTr:'Agent-card, MCP araçları ve headless işlem.',descEn:'Autonomous agent discovery, MCP and headless transaction.'},
 RAG:{theme:'blue',tag:'06 · RAG',labelTr:'Semantik Getirme',labelEn:'Retrieval & Context',descTr:'Vektör veri tabanları ve doküman parçalama.',descEn:'Document chunk extractability for RAG pipelines.'},
 'E-E-A-T':{theme:'green',tag:'07 · E-E-A-T',labelTr:'Güven & Otorite',labelEn:'Trust & Authority',descTr:'Deneyim, uzmanlık, otoriterlik ve güvenlik.',descEn:'Experience, expertise, authoritativeness and trust signals.'}
};
const analysisMeta={
 intent_cannibalization:{catTr:'03 · İÇERİK & GÜVEN',catEn:'03 · CONTENT & TRUST',theme:'green',titleTr:'Arama Niyeti ve Kannibalizasyon Denetimi',titleEn:'Search Intent & Cannibalization Audit'},
 information_gain:{catTr:'03 · İÇERİK & GÜVEN',catEn:'03 · CONTENT & TRUST',theme:'green',titleTr:'Özgün Bilgi Değeri Sinyalleri Denetimi',titleEn:'Information Gain Signals Audit'},
 internal_link_semantic_alignment:{catTr:'03 · İÇERİK & GÜVEN',catEn:'03 · CONTENT & TRUST',theme:'green',titleTr:'İç Bağlantı Anlamsal Uyumu',titleEn:'Internal Link Semantic Alignment'},
 answer_extractability:{catTr:'02 · AI & ANLAMLAMA',catEn:'02 · AI & UNDERSTANDING',theme:'purple',titleTr:'Doğrudan Cevap Çıkarılabilirliği Denetimi',titleEn:'Answer Extractability Audit'},
 entity_graph_integrity:{catTr:'02 · AI & ANLAMLAMA',catEn:'02 · AI & UNDERSTANDING',theme:'purple',titleTr:'Varlık Grafı Bütünlüğü',titleEn:'Entity Graph Integrity Audit'},
 llm_knowledge_surface:{catTr:'02 · AI & ANLAMLAMA',catEn:'02 · AI & UNDERSTANDING',theme:'purple',titleTr:'LLM Bilgi Yüzeyi Denetimi',titleEn:'LLM Knowledge Surface Audit'},
 structured_graph_consistency:{catTr:'02 · AI & ANLAMLAMA',catEn:'02 · AI & UNDERSTANDING',theme:'purple',titleTr:'Yapılandırılmış Veri Grafı Tutarlılığı',titleEn:'Structured Graph Consistency Audit'},
 discovery_path:{catTr:'01 · KEŞFEDİLİRLİK',catEn:'01 · DISCOVERY',theme:'blue',titleTr:'Keşif Yolu Denetimi',titleEn:'Discovery Path Audit'},
 orphan_pages:{catTr:'01 · KEŞFEDİLİRLİK',catEn:'01 · DISCOVERY',theme:'blue',titleTr:'Yetim Sayfa Tespiti',titleEn:'Orphan Pages Audit'},
 indexnow_readiness:{catTr:'01 · KEŞFEDİLİRLİK',catEn:'01 · DISCOVERY',theme:'blue',titleTr:'IndexNow Hazırlığı',titleEn:'IndexNow Readiness Audit'},
 freshness_integrity:{catTr:'04 · MİMARİ & YÖNETİŞİM',catEn:'04 · ARCHITECTURE & GOVERNANCE',theme:'amber',titleTr:'Güncellik Bütünlüğü',titleEn:'Freshness Integrity Audit'},
 render_parity:{catTr:'04 · MİMARİ & YÖNETİŞİM',catEn:'04 · ARCHITECTURE & GOVERNANCE',theme:'amber',titleTr:'Hydration / Render Eşitliği',titleEn:'Hydration / Render Parity Audit'},
 codebase_seo_governance:{catTr:'04 · MİMARİ & YÖNETİŞİM',catEn:'04 · ARCHITECTURE & GOVERNANCE',theme:'amber',titleTr:'Kod Tabanı SEO Yönetişim Denetimi',titleEn:'Codebase SEO Governance Audit'}
};
function renderIntelligence(data){
 const old=document.getElementById('toolIntelligence');if(old)old.remove();
 const intel=data.intelligence;if(!intel?.analyses?.length)return;
 const wrap=document.createElement('section');wrap.id='toolIntelligence';wrap.className='tool-intelligence';
 const isTr=lang==='tr';
 const lensKeys=['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T'];
 const lensHtml=lensKeys.map(k=>{
  const v=(intel.readinessLenses||{})[k]||{score:0};const sc=Math.round(v.score||0);
  const m=lensMeta[k]||{theme:'blue',tag:k,descTr:'',descEn:''};
  const tier=sc>=80?(isTr?'OPTİMAL':'OPTIMAL'):sc>=65?(isTr?'GÜÇLÜ':'STRONG'):sc>=50?(isTr?'ORTA':'MODERATE'):(isTr?'RİSKLİ':'AT RISK');
  return `<div class="intel-lens lens-${m.theme}"><div class="intel-lens-head"><span class="lens-tag">${esc(m.tag)}</span><span class="lens-tier">${esc(tier)}</span></div><strong>${sc}<span>/100</span></strong><div class="lens-desc">${esc(isTr?m.descTr:m.descEn)}</div><div class="lens-meter"><i style="width:${Math.max(0,Math.min(100,sc))}%"></i></div></div>`;
 }).join('');
 const priorities=(intel.topPriorities||[]).slice(0,3);
 const priorityHtml=priorities.map((p,idx)=>{
  const m=analysisMeta[p.analysis]||{};const f=intel.analyses.find(a=>a.key===p.analysis);
  const title=isTr?(m.titleTr||f?.labelTr||p.analysis):(m.titleEn||f?.labelEn||p.analysis);
  const desc=isTr?p.reasonTr:p.reasonEn;const col=idx===0?'red':idx===1?'amber':'blue';
  return `<article class="prio-card prio-${col}"><div class="prio-head"><span class="prio-badge">#${p.rank} ${isTr?'ÖNCELİKLİ KARAR':'PRIORITY DECISION'}</span><div class="prio-tags"><span class="prio-tag prio-impact">${esc(isTr?'ETKİ: ':'IMPACT: ')}${esc(p.impact)}</span><span class="prio-tag prio-effort">${esc(isTr?'EFOR: ':'EFFORT: ')}${esc(p.effort)}</span></div></div><h4>${esc(title)}</h4><p>${esc(desc)}</p></article>`;
 }).join('');
 const counts={all:intel.analyses.length,PASS:0,WARN:0,FAIL:0,CONTEXT:0};
 intel.analyses.forEach(a=>{if(a.status==='PASS')counts.PASS++;else if(a.status==='WARN')counts.WARN++;else if(a.status==='FAIL')counts.FAIL++;else counts.CONTEXT++});
 const filterHtml=`<div class="intel-filter-bar" id="toolIntelFilterBar"><button type="button" class="intel-filter-btn active" data-filter="all">${isTr?'Tüm Denetimler':'All Audits'} (${counts.all})</button><button type="button" class="intel-filter-btn filter-green" data-filter="PASS">${isTr?'🟢 Geçti':'🟢 Pass'} (${counts.PASS})</button><button type="button" class="intel-filter-btn filter-amber" data-filter="WARN">${isTr?'🟠 Uyarı':'🟠 Warn'} (${counts.WARN})</button><button type="button" class="intel-filter-btn filter-red" data-filter="FAIL">${isTr?'🔴 Başarısız':'🔴 Fail'} (${counts.FAIL})</button><button type="button" class="intel-filter-btn filter-blue" data-filter="CONTEXT">${isTr?'⚪ Kapsam / Bilgi':'⚪ Context / Scope'} (${counts.CONTEXT})</button></div>`;
 const analysisHtml=intel.analyses.map(a=>{
  const m=analysisMeta[a.key]||{catTr:'01 · DENETİM',catEn:'01 · AUDIT',theme:'blue',titleTr:a.labelTr,titleEn:a.labelEn};
  const title=isTr?(a.labelTr||m.titleTr):(a.labelEn||m.titleEn);const cat=isTr?m.catTr:m.catEn;
  const isCap=a.key==='codebase_seo_governance';const st=statusMap[lang]?.[a.status]||a.status;
  const sc=typeof a.score==='number'?Math.round(a.score):null;const ev=(a.evidence||[])[0]||'';
  let sb='';if(sc!==null){const tr=sc>=80?'green':sc>=60?'blue':sc>=40?'amber':'red';sb=`<div class="intel-card-meter"><i style="width:${Math.max(0,Math.min(100,sc))}%;background:var(--intel-${tr});"></i></div>`}
  return `<article class="intel-item ${isCap?'intel-capstone':''} intel-${m.theme}" data-key="${esc(a.key)}" data-status="${esc(a.status)}"><div class="intel-item-header"><div class="intel-item-title-wrap"><span class="intel-cat-pill intel-cat-${m.theme}">${esc(cat)}</span><h4>${esc(title)}</h4></div><span class="intel-status-pill status-${esc(a.status)}">${esc(st)}${sc!==null?` · ${sc}/100`:''}</span></div>${sb}<div class="intel-evidence"><code><span class="ev-label">${isTr?'KANIT:':'EVIDENCE:'}</span>${esc(ev)}</code></div><div class="intel-boundary"><strong>⚖️ ${isTr?'Ölçüm Sınırı':'Measurement Boundary'}:</strong> ${esc(isTr?a.boundaryTr:a.boundaryEn)}</div>${isCap?`<div class="intel-capstone-action"><a href="/checkout?plan=pro" class="intel-mandate-cta">${isTr?'🔒 Kod Tabanı İncelemesini $99 Fix Mandate ile Başlat →':'🔒 Unlock Codebase Verification in $99 Fix Mandate →'}</a></div>`:''}</article>`;
 }).join('');
 wrap.innerHTML=`<div class="intel-head"><div><span class="intel-head-kicker">${isTr?'YAPAY ZEKA & ARAMA İSTİHBARAT MERKEZİ':'AI & SEARCH INTELLIGENCE COMMAND'}</span><h3>${esc(copy.intelligence)}</h3><p>${esc(copy.intelligenceNote)}</p></div><div class="intel-head-badges"><span class="intel-top-pill pill-blue">${isTr?'13 Derin Analiz':'13 Deep Analyses'}</span><span class="intel-top-pill pill-purple">${isTr?'7 Hazırlık Lensi':'7 Readiness Lenses'}</span><span class="intel-top-pill">${isTr?'Non-Scoring Güvencesi':'Non-Scoring Safe'}</span></div></div><div class="intel-section-title"><h4>${isTr?'7 Boyutlu Hazırlık Lensleri':'7-Dimensional Readiness Lenses'}</h4><span>${isTr?'Tüm arama ve yapay zeka ekosistemindeki görünürlük eksenleri':'Visibility vectors across the entire ecosystem'}</span></div><div class="intel-lenses">${lensHtml}</div>${priorities.length?`<div class="intel-section-title"><h4>${isTr?'Öncelikli Stratejik Karar Alanları':'Priority Strategic Decision Areas'}</h4><span>${isTr?'Doğrulanmış kanıtlara göre en hızlı etki yaratan aksiyon sırası':'Action sequence with highest verified impact-to-effort ratio'}</span></div><div class="intel-priorities-deck">${priorityHtml}</div>`:''}<div class="intel-section-title"><h4>${isTr?'13 Bağımsız İstihbarat Denetimi':'13 Independent Intelligence Audits'}</h4><span>${isTr?'Deterministik ölçüm kanıtları ve kapsam sınırları':'Deterministic measurement evidence and boundary disclosures'}</span></div>${filterHtml}<div class="intel-grid" id="toolIntelAuditsGrid">${analysisHtml}</div>`;
 wrap.querySelectorAll('#toolIntelFilterBar .intel-filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{wrap.querySelectorAll('#toolIntelFilterBar .intel-filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;wrap.querySelectorAll('#toolIntelAuditsGrid .intel-item').forEach(item=>{const st=item.dataset.status;if(f==='all'||(f==='CONTEXT'&&(st==='NOT_MEASURED'||st==='REQUIRES_CONTEXT'))||st===f)item.style.display='';else item.style.display='none'})})});
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
