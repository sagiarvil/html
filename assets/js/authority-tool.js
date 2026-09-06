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
const copy={tr:{
 scanning:'Site taranıyor; 12 motor ve 13 istihbarat denetimi aynı kanıt zincirinde çalışıyor…',
 failed:'Tarama tamamlanamadı.',
 clear:'Bu kapsamda doğrulanmış sorun bulunmadı.',
 score:'seçili kapsam skoru',
 checked:'kontrol',
 pages:'sayfa',
 finding:'bulgu',
 kicker:'AÇIK TEŞHİS KATMANI · %100 ÜCRETSİZ ($0)',
 intelligence:'Arama ve AI İstihbarat Denetimleri',
 intelligenceNote:'Bu bölüm %100 ÜCRETSİZDİR ($0). Sitenizin arama ve yapay zeka eksikliklerini ve kanıtlarını şeffafça belgeler. Hazır düzeltme kodları ve 22 dosyalık ZIP paketi $99 Yol Haritası katmanındadır.',
 badgeFree:'🟢 $0 Ücretsiz Teşhis Katmanı',
 badge13:'13 Derin Analiz',
 badge7:'7 Hazırlık Lensi',
 badgeRemedy:'🔒 Çözüm: $99 Yol Haritası & $499 Enterprise',
 t0Title:'1. Açık Teşhis Envanteri',
 t0Price:'$0 Ücretsiz (Şu Anki Ekran)',
 t0Desc:'Ne yanlış? Nerede? 13 derin istihbarat denetimi ve 7 hazırlık lensiyle canlı kanıt envanteri anında ve ücretsiz dökümlenir.',
 t0Status:'✓ Aktif / Ücretsiz Canlı İnceleme',
 t99Title:'2. Mühendislik Yol Haritası',
 t99Price:'$99 Tek Seferlik',
 t99Desc:'Nasıl düzeltilecek? Bu ekranda listelenen 13 sorunun kök nedeni, hazır kod blokları, P0–P3 sırası ve yazılımcınıza teslim edilecek 22 dosyalık ZIP paketi.',
 t99Cta:'$99 Mühendislik Paketini Aç →',
 t499Title:'3. Kurumsal AI Otoritesi',
 t499Price:'$499 Kurumsal Entegrasyon',
 t499Desc:'Gelişmiş AI ekosistemi: Otonom AI crawler protokolleri, LLM RAG semantik grafı, özel tersine mühendislik ve tam mimari destek.',
 t499Cta:'$499 Kurumsal Çözümü İncele →',
 lenses:'7 Boyutlu Hazırlık Lensleri',
 lensesSub:'Ücretsiz Teşhis Boyutları: Yapay zeka ve arama ekosistemindeki 7 ana vektörünüzün anlık durum puanı',
 priorities:'Öncelikli Stratejik Karar Alanları',
 prioritiesSub:'Acil Düzeltme Sırası: Doğrulanmış kanıtlara göre en yüksek etkiyi sağlayan ilk 3 öncelik ($99 Yol Haritası ile koda dönüşür)',
 audits:'13 Bağımsız İstihbarat Denetimi',
 auditsSub:'Detaylı Teknik Kanıtlar: Her denetim sitenizdeki açık durumu gösterir; düzeltme şablonları $99 pakette yer alır',
 auditDiagNotice:'Teşhis: Ücretsiz Açık · Düzeltme: $99 Yol Haritasında Dahil',
 capstoneCta:'🔒 Kod Tabanı İncelemesini $99 Yol Haritası ile Başlat →',
 bridgeTag:'TEŞHİS TAMAMLANDI · PEKİ ŞİMDİ?',
 bridgeTitle:'13 Açık ve Kanıtlar Ortada. Bunları Kod Seviyesinde Düzeltmeye Hazır mısınız?',
 bridgeDesc:'Ücretsiz raporda eksikleri ve kanıtları gördünüz. Yazılımcınızın hemen devreye alabileceği hazır kod blokları, P0–P3 öncelik sırası ve 22 dosyalık mühendislik ZIP paketi için Yol Haritasını açın.',
 bridgeBtn99:'⚡ $99 Mühendislik Yol Haritasını Aç (22 Dosyalı ZIP) →',
 bridgeBtn499:'🏢 $499 Kurumsal Çözüm →'
},
en:{
 scanning:'Scanning the site; 12 engines and 13 intelligence audits run on the same evidence chain…',
 failed:'Scan could not be completed.',
 clear:'No verified issue was found in this scope.',
 score:'selected-scope score',
 checked:'checks',
 pages:'pages',
 finding:'findings',
 kicker:'OPEN DIAGNOSTIC LAYER · 100% FREE ($0)',
 intelligence:'Search & AI Intelligence Audits',
 intelligenceNote:'This section is 100% FREE ($0). It transparently documents your search and AI vulnerabilities with live evidence. Turn-key code templates and 22-file ZIP package are in the $99 Roadmap layer.',
 badgeFree:'🟢 $0 Free Diagnostic Layer',
 badge13:'13 Deep Analyses',
 badge7:'7 Readiness Lenses',
 badgeRemedy:'🔒 Fix: $99 Roadmap & $499 Enterprise',
 t0Title:'1. Open Diagnostic Inventory',
 t0Price:'$0 Free (Current Screen)',
 t0Desc:'What is wrong? Where? 13 deep intelligence audits and 7 readiness lenses provide a complete verified evidence log for free.',
 t0Status:'✓ Active / Free Live Inspection',
 t99Title:'2. Implementation Roadmap',
 t99Price:'$99 One-Time',
 t99Desc:'How to fix it? Root cause diagnosis, ready-to-deploy code snippets, P0–P3 execution order, and 22-file ZIP engineering package for your developer.',
 t99Cta:'Unlock $99 Roadmap Package →',
 t499Title:'3. Enterprise AI Authority',
 t499Price:'$499 Enterprise Integration',
 t499Desc:'Advanced AI ecosystem: Autonomous agent protocols, LLM RAG semantic knowledge graph, reverse-engineering architecture, and VIP advisory.',
 t499Cta:'View $499 Enterprise Solution →',
 lenses:'7-Dimensional Readiness Lenses',
 lensesSub:'Free Diagnostic Dimensions: Real-time scores across 7 primary visibility vectors in the AI ecosystem',
 priorities:'Priority Strategic Decision Areas',
 prioritiesSub:'Action Sequence: Top 3 priorities with highest verified impact-to-effort ratio (converted to code via $99 Roadmap)',
 audits:'13 Independent Intelligence Audits',
 auditsSub:'Detailed Technical Evidence: Each audit shows exact verified status; implementation code is in the $99 package',
 auditDiagNotice:'Diagnosis: Free Public · Code Fix: Unlocked in $99 Roadmap',
 capstoneCta:'🔒 Unlock Codebase Verification in $99 Visibility Roadmap →',
 bridgeTag:'DIAGNOSIS COMPLETE · WHAT NEXT?',
 bridgeTitle:'Vulnerabilities & Evidence Disclosed. Ready to Remediate in Code?',
 bridgeDesc:'You saw the exact gaps and evidence for free. Unlock the Implementation Roadmap for ready-to-deploy code snippets, regression safeguards, and the 22-file ZIP engineering package.',
 bridgeBtn99:'⚡ Unlock $99 Implementation Roadmap (22-File ZIP) →',
 bridgeBtn499:'🏢 View $499 Enterprise Solution →'
}}[lang];
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
  const tier=sc>=80?'green':sc>=65?'yellow':sc>=45?'orange':'red';
  const tierName=sc>=80?(isTr?'İYİ':'GOOD'):sc>=65?(isTr?'ORTA':'FAIR'):sc>=45?(isTr?'DÜŞÜK':'LOW'):(isTr?'KRİTİK':'CRITICAL');
  return `<div class="intel-lens lens-tier-${tier}"><div class="intel-lens-head"><span class="lens-tag">${esc(m.tag)}</span><span class="lens-tier tier-${tier}">${esc(tierName)}</span></div><strong class="score-${tier}">${sc}<span>/100</span></strong><div class="lens-desc">${esc(isTr?m.descTr:m.descEn)}</div><div class="lens-meter"><i class="bar-${tier}" style="width:${Math.max(0,Math.min(100,sc))}%;"></i></div></div>`;
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
  return `<article class="intel-item ${isCap?'intel-capstone':''} intel-${m.theme}" data-key="${esc(a.key)}" data-status="${esc(a.status)}"><div class="intel-item-header"><div class="intel-item-title-wrap"><span class="intel-cat-pill intel-cat-${m.theme}">${esc(cat)}</span><h4>${esc(title)}</h4></div><span class="intel-status-pill status-${esc(a.status)}">${esc(st)}${sc!==null?` · ${sc}/100`:''}</span></div>${sb}<div class="intel-evidence"><code><span class="ev-label">${isTr?'KANIT:':'EVIDENCE:'}</span>${esc(ev)}</code></div><div class="intel-boundary"><strong>⚖️ ${isTr?'Ölçüm Sınırı':'Measurement Boundary'}:</strong> ${esc(isTr?a.boundaryTr:a.boundaryEn)}</div><div class="intel-item-notice"><span>ℹ️ ${esc(copy.auditDiagNotice)}</span></div>${isCap?`<div class="intel-capstone-action"><a href="/checkout?plan=pro" class="intel-mandate-cta">${esc(copy.capstoneCta)}</a></div>`:''}</article>`;
 }).join('');
 const tierGuideHtml=`<div class="intel-tier-guide"><div class="tier-card tier-card-active"><div class="tier-card-header"><span class="tier-card-badge tier-badge-green">${isTr?'AKTİF KATMAN':'ACTIVE LAYER'}</span><span class="tier-card-price">${esc(copy.t0Price)}</span></div><div class="tier-card-title">${esc(copy.t0Title)}</div><p class="tier-card-desc">${esc(copy.t0Desc)}</p><div class="tier-card-status"><span class="status-active-label">${esc(copy.t0Status)}</span></div></div><div class="tier-card"><div class="tier-card-header"><span class="tier-card-badge tier-badge-blue">${isTr?'UYGULAMA PLANI':'EXECUTION PLAN'}</span><span class="tier-card-price price-blue">${esc(copy.t99Price)}</span></div><div class="tier-card-title">${esc(copy.t99Title)}</div><p class="tier-card-desc">${esc(copy.t99Desc)}</p><div class="tier-card-status"><a href="/checkout?plan=pro" class="tier-card-link">${esc(copy.t99Cta)}</a></div></div><div class="tier-card"><div class="tier-card-header"><span class="tier-card-badge tier-badge-purple">${isTr?'VIP ENTEGRASYON':'VIP INTEGRATION'}</span><span class="tier-card-price price-purple">${esc(copy.t499Price)}</span></div><div class="tier-card-title">${esc(copy.t499Title)}</div><p class="tier-card-desc">${esc(copy.t499Desc)}</p><div class="tier-card-status"><a href="/checkout?plan=enterprise" class="tier-card-link link-purple">${esc(copy.t499Cta)}</a></div></div></div>`;
 const bridgeHtml=`<div class="intel-bridge-banner"><div class="intel-bridge-content"><span class="bridge-tag">${esc(copy.bridgeTag)}</span><h4>${esc(copy.bridgeTitle)}</h4><p>${esc(copy.bridgeDesc)}</p></div><div class="intel-bridge-actions"><a href="/checkout?plan=pro" class="intel-btn-primary">${esc(copy.bridgeBtn99)}</a><a href="/checkout?plan=enterprise" class="intel-btn-secondary">${esc(copy.bridgeBtn499)}</a></div></div>`;
 wrap.innerHTML=`<div class="intel-head"><div><span class="intel-head-kicker">${esc(copy.kicker)}</span><h3>${esc(copy.intelligence)}</h3><p>${esc(copy.intelligenceNote)}</p></div><div class="intel-head-badges"><span class="intel-top-pill pill-green">${esc(copy.badgeFree)}</span><span class="intel-top-pill pill-blue">${esc(copy.badge13)}</span><span class="intel-top-pill pill-purple">${esc(copy.badge7)}</span><span class="intel-top-pill">${esc(copy.badgeRemedy)}</span></div></div>${tierGuideHtml}<div class="intel-section-title"><h4>${esc(copy.lenses)}</h4><span>${esc(copy.lensesSub)}</span></div><div class="intel-lenses">${lensHtml}</div>${priorities.length?`<div class="intel-section-title"><h4>${esc(copy.priorities)}</h4><span>${esc(copy.prioritiesSub)}</span></div><div class="intel-priorities-deck">${priorityHtml}</div>`:''}<div class="intel-section-title"><h4>${esc(copy.audits)}</h4><span>${esc(copy.auditsSub)}</span></div>${filterHtml}<div class="intel-grid" id="toolIntelAuditsGrid">${analysisHtml}</div>${bridgeHtml}`;
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
 btn.disabled=true;status.hidden=false;status.classList.remove('error');status.innerHTML='<span class="status-spinner" aria-hidden="true"></span><span>'+esc(copy.scanning)+'</span>';result.hidden=true;document.getElementById('toolIntelligence')?.remove();
 try{const r=await fetch('/api/scan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({domain})});const data=await r.json();if(!r.ok){if(lang==='tr'){console.warn('Scan API:',data.error);throw new Error(copy.failed)}throw new Error(data.error||copy.failed)}render(data);status.hidden=true}
 catch(err){status.hidden=false;status.classList.add('error');status.innerHTML='<span>'+esc(err?.message||copy.failed)+'</span>'}
 finally{btn.disabled=false}
});
})();
