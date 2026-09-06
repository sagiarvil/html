(()=>{
if(!document.getElementById('scanForm'))return;
if(!document.querySelector('link[data-intelligence-ui]')){
  const l=document.createElement('link');
  l.rel='stylesheet';
  l.href='/assets/css/intelligence.css';
  l.dataset.intelligenceUi='1';
  document.head.appendChild(l);
}
const nativeFetch=window.fetch.bind(window);let last=null;
const statusMap={
  tr:{PASS:'GEÇTİ',WARN:'UYARI',FAIL:'BAŞARISIZ',NOT_MEASURED:'ÖLÇÜLMEDİ',REQUIRES_CONTEXT:'BAĞLAM GEREKİR'},
  en:{PASS:'PASS',WARN:'WARN',FAIL:'FAIL',NOT_MEASURED:'NOT MEASURED',REQUIRES_CONTEXT:'REQUIRES CONTEXT'}
};

const copy={
  tr:{
    kicker:'YAPAY ZEKA & ARAMA İSTİHBARAT MERKEZİ',
    title:'Arama ve AI İstihbarat Denetimleri',
    note:'13 gelişmiş analiz, ana 12-motor skorunu değiştirmeden aynı kanıt zincirini yorumlar. Ölçülemeyen veya kaynak kod gerektiren alanlar uydurulmaz.',
    badge13:'13 Derin Analiz',
    badge7:'7 Hazırlık Lensi',
    badgeSafe:'Non-Scoring Güvencesi',
    lenses:'7 Boyutlu Hazırlık Lensleri',
    lensesSub:'Tüm arama ve yapay zeka ekosistemindeki görünürlük eksenleri',
    priorities:'Öncelikli Stratejik Karar Alanları',
    prioritiesSub:'Doğrulanmış kanıtlara göre en hızlı etki yaratan aksiyon sırası',
    audits:'13 Bağımsız İstihbarat Denetimi',
    auditsSub:'Deterministik ölçüm kanıtları ve kapsam sınırları',
    all:'Tüm Denetimler',
    pass:'🟢 Geçti',
    warn:'🟠 Uyarı',
    fail:'🔴 Başarısız',
    context:'⚪ Kapsam / Bilgi',
    evidenceLabel:'KANIT DÖKÜMÜ',
    boundaryLabel:'Ölçüm Sınırı',
    capstoneCta:'🔒 Kod Tabanı İncelemesini $99 Fix Mandate ile Başlat →'
  },
  en:{
    kicker:'AI & SEARCH INTELLIGENCE COMMAND',
    title:'Search & AI Intelligence Audits',
    note:'Thirteen advanced analyses interpret the same evidence chain without changing the canonical 12-engine score. Unmeasured or source-context-only signals are never fabricated.',
    badge13:'13 Deep Analyses',
    badge7:'7 Readiness Lenses',
    badgeSafe:'Non-Scoring Safe',
    lenses:'7-Dimensional Readiness Lenses',
    lensesSub:'Visibility vectors across the entire search and AI ecosystem',
    priorities:'Priority Strategic Decision Areas',
    prioritiesSub:'Action sequence with highest verified impact-to-effort ratio',
    audits:'13 Independent Intelligence Audits',
    auditsSub:'Deterministic measurement evidence and boundary disclosures',
    all:'All Audits',
    pass:'🟢 Pass',
    warn:'🟠 Warn',
    fail:'🔴 Fail',
    context:'⚪ Context / Scope',
    evidenceLabel:'EVIDENCE LOG',
    boundaryLabel:'Measurement Boundary',
    capstoneCta:'🔒 Unlock Codebase Verification in $99 Fix Mandate →'
  }
};

const lensMeta = {
  SEO: { theme: 'blue', tag: '01 · SEO', labelTr: 'Arama Motoru', labelEn: 'Search Engine', descTr: 'Google & Bing indeksleme, HTTP ve teknik temel.', descEn: 'Google & Bing indexing, HTTP and technical foundation.' },
  GEO: { theme: 'purple', tag: '02 · GEO', labelTr: 'Üretken Motorlar', labelEn: 'Generative AI', descTr: 'Perplexity, ChatGPT ve Gemini kaynak gösterimi.', descEn: 'Citations in generative engines and AI summaries.' },
  AEO: { theme: 'purple', tag: '03 · AEO', labelTr: 'Cevap Motorları', labelEn: 'Answer Engine', descTr: 'Doğrudan cevap ve featured snippet hazırlığı.', descEn: 'Direct answer extraction and featured snippet readiness.' },
  LLMO: { theme: 'purple', tag: '04 · LLMO', labelTr: 'Büyük Dil Modelleri', labelEn: 'Language Models', descTr: 'llms.txt v2 ve token verimli dokümantasyon.', descEn: 'llms.txt v2 standard and clean markdown surfaces.' },
  AAO: { theme: 'amber', tag: '05 · AAO', labelTr: 'Otonom Ajanlar', labelEn: 'Autonomous Agents', descTr: 'Agent-card, MCP araçları ve headless işlem.', descEn: 'Autonomous agent discovery, MCP and headless transaction.' },
  RAG: { theme: 'blue', tag: '06 · RAG', labelTr: 'Semantik Getirme', labelEn: 'Retrieval & Context', descTr: 'Vektör veri tabanları ve doküman parçalama.', descEn: 'Document chunk extractability for RAG pipelines.' },
  'E-E-A-T': { theme: 'green', tag: '07 · E-E-A-T', labelTr: 'Güven & Otorite', labelEn: 'Trust & Authority', descTr: 'Deneyim, uzmanlık, otoriterlik ve güvenlik.', descEn: 'Experience, expertise, authoritativeness and trust signals.' }
};

const analysisMeta = {
  intent_cannibalization: { catTr: '03 · İÇERİK & GÜVEN', catEn: '03 · CONTENT & TRUST', theme: 'green', titleTr: 'Arama Niyeti ve Kannibalizasyon Denetimi', titleEn: 'Search Intent & Cannibalization Audit', descTr: 'Aynı arama niyetine birden fazla sayfanın çakışması veya yinelenen başlık sinyalleri.', descEn: 'Multiple URLs competing for the same intent or exhibiting duplicate title collision groups.' },
  information_gain: { catTr: '03 · İÇERİK & GÜVEN', catEn: '03 · CONTENT & TRUST', theme: 'green', titleTr: 'Özgün Bilgi Değeri Sinyalleri Denetimi', titleEn: 'Information Gain Signals Audit', descTr: 'İçeriğin genel AI özetlerinden ayrışmasını sağlayan birinci el özgün veri ve formatlar.', descEn: 'First-party unique structured data differentiating pages from generic commodity text.' },
  internal_link_semantic_alignment: { catTr: '03 · İÇERİK & GÜVEN', catEn: '03 · CONTENT & TRUST', theme: 'green', titleTr: 'İç Bağlantı Anlamsal Uyumu', titleEn: 'Internal Link Semantic Alignment', descTr: 'Anchor text ve hedef sayfa semantiğinin konu bütünlüğü ve yönlendirme kontrolü.', descEn: 'Semantic harmony between anchor text intent and target destination pages.' },
  answer_extractability: { catTr: '02 · AI & ANLAMLAMA', catEn: '02 · AI & UNDERSTANDING', theme: 'purple', titleTr: 'Doğrudan Cevap Çıkarılabilirliği Denetimi', titleEn: 'Answer Extractability Audit', descTr: 'Yapay zeka modellerinin içeriği doğrudan alıntılayabilmesi için başlık hiyerarşisi ve netlik.', descEn: 'Heading hierarchy and structural clarity required for direct AI citations and answer engine inclusion.' },
  entity_graph_integrity: { catTr: '02 · AI & ANLAMLAMA', catEn: '02 · AI & UNDERSTANDING', theme: 'purple', titleTr: 'Varlık Grafı Bütünlüğü', titleEn: 'Entity Graph Integrity Audit', descTr: 'JSON-LD schema varlıklarının WebSite, WebPage, Organization ile doğru bağlanması.', descEn: 'Valid JSON-LD schema entity resolution connecting Organization, WebSite and Product graph.' },
  llm_knowledge_surface: { catTr: '02 · AI & ANLAMLAMA', catEn: '02 · AI & UNDERSTANDING', theme: 'purple', titleTr: 'LLM Bilgi Yüzeyi Denetimi', titleEn: 'LLM Knowledge Surface Audit', descTr: 'Yapay zeka modellerine temiz dokümantasyon sunan standart llms.txt ve markdown yüzeyi.', descEn: 'Standardized llms.txt and clean markdown documentation for LLM ingestion.' },
  structured_graph_consistency: { catTr: '02 · AI & ANLAMLAMA', catEn: '02 · AI & UNDERSTANDING', theme: 'purple', titleTr: 'Yapılandırılmış Veri Grafı Tutarlılığı', titleEn: 'Structured Graph Consistency Audit', descTr: 'Tüm sayfalarda schema.org tiplerinin geçerli ve eksiksiz hiyerarşide tanımlanması.', descEn: 'Consistency and depth of structured schema.org markup across all discovered templates.' },
  discovery_path: { catTr: '01 · KEŞFEDİLİRLİK', catEn: '01 · DISCOVERY', theme: 'blue', titleTr: 'Keşif Yolu Denetimi', titleEn: 'Discovery Path Audit', descTr: 'AI crawler ve otonom ajanların keşif protokolleri (robots, agent-card, endpoint).', descEn: 'Autonomous agent discovery surfaces including robots directives, agent cards and endpoint manifests.' },
  orphan_pages: { catTr: '01 · KEŞFEDİLİRLİK', catEn: '01 · DISCOVERY', theme: 'blue', titleTr: 'Yetim Sayfa Tespiti', titleEn: 'Orphan Pages Audit', descTr: 'Site haritasında bulunan ancak site içi iç bağlantısı bulunmayan izole URL riskleri.', descEn: 'Isolated URLs present in sitemap without internal incoming anchor paths.' },
  indexnow_readiness: { catTr: '01 · KEŞFEDİLİRLİK', catEn: '01 · DISCOVERY', theme: 'blue', titleTr: 'IndexNow Hazırlığı', titleEn: 'IndexNow Readiness Audit', descTr: 'Arama motorlarına anlık içerik değişikliği sinyali gönderen IndexNow API entegrasyonu.', descEn: 'Instant indexing protocol integration for immediate real-time search engine notification.' },
  freshness_integrity: { catTr: '04 · MİMARİ & YÖNETİŞİM', catEn: '04 · ARCHITECTURE & GOVERNANCE', theme: 'amber', titleTr: 'Güncellik Bütünlüğü', titleEn: 'Freshness Integrity Audit', descTr: 'Sitemap tarihleri ile sayfa içi schema ve son güncelleme sinyallerinin eşzamanlı doğruluğu.', descEn: 'Synchronization between sitemap lastmod, on-page schema dates, and machine crawl freshness.' },
  render_parity: { catTr: '04 · MİMARİ & YÖNETİŞİM', catEn: '04 · ARCHITECTURE & GOVERNANCE', theme: 'amber', titleTr: 'Hydration / Render Eşitliği', titleEn: 'Hydration / Render Parity Audit', descTr: 'Ham HTML ile JavaScript render sonrasındaki DOM içeriğinin botlar için tutarlılığı.', descEn: 'Parity between raw server HTML and client-side JavaScript hydrated DOM for AI crawlers.' },
  codebase_seo_governance: { catTr: '04 · MİMARİ & YÖNETİŞİM', catEn: '04 · ARCHITECTURE & GOVERNANCE', theme: 'amber', titleTr: 'Kod Tabanı SEO Yönetişim Denetimi', titleEn: 'Codebase SEO Governance Audit', descTr: 'CI/CD kalite kapıları, kaynak kod seviyesinde canonical kuralları ve repo düzeyinde güvence.', descEn: 'CI/CD quality gates, build-time canonical enforcement, and repository-level engineering governance.' }
};

const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function lang(){return (document.documentElement.lang||'tr').toLowerCase().startsWith('tr')?'tr':'en'}

function render(intel){
  if(!intel?.analyses?.length)return;
  last=intel;
  document.getElementById('homepageIntelligence')?.remove();
  const l=lang(),isTr=l==='tr',t=copy[l];
  const section=document.createElement('section');
  section.id='homepageIntelligence';
  section.className='tool-intelligence';

  // 1. Header
  const headHtml=`
    <div class="intel-head">
      <div>
        <span class="intel-head-kicker">${esc(t.kicker)}</span>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.note)}</p>
      </div>
      <div class="intel-head-badges">
        <span class="intel-top-pill pill-blue">${esc(t.badge13)}</span>
        <span class="intel-top-pill pill-purple">${esc(t.badge7)}</span>
        <span class="intel-top-pill">${esc(t.badgeSafe)}</span>
      </div>
    </div>
  `;

  // 2. The 7 Readiness Lenses (Symmetrical Executive Deck)
  const lensKeys=['SEO','GEO','AEO','LLMO','AAO','RAG','E-E-A-T'];
  const lensesHtml=lensKeys.map(k=>{
    const v=(intel.readinessLenses||{})[k]||{score:0};
    const sc=Math.round(v.score||0);
    const meta=lensMeta[k]||{theme:'blue',tag:k,labelTr:k,labelEn:k,descTr:'',descEn:''};
    const tier=sc>=80?'green':sc>=65?'yellow':sc>=45?'orange':'red';
    const tierName=sc>=80?(isTr?'İYİ':'GOOD'):sc>=65?(isTr?'ORTA':'FAIR'):sc>=45?(isTr?'DÜŞÜK':'LOW'):(isTr?'KRİTİK':'CRITICAL');
    return `
      <div class="intel-lens lens-tier-${tier}">
        <div class="intel-lens-head">
          <span class="lens-tag">${esc(meta.tag)}</span>
          <span class="lens-tier tier-${tier}">${esc(tierName)}</span>
        </div>
        <strong class="score-${tier}">${sc}<span>/100</span></strong>
        <div class="lens-desc">${esc(isTr?meta.descTr:meta.descEn)}</div>
        <div class="lens-meter"><i class="bar-${tier}" style="width:${Math.max(0,Math.min(100,sc))}%;"></i></div>
      </div>
    `;
  }).join('');

  // 3. Priority Strategic Decision Areas (3 Balanced Executive Cards)
  const priorities=(intel.topPriorities||[]).slice(0,3);
  const prioCardsHtml=priorities.map((p,idx)=>{
    const meta=analysisMeta[p.analysis]||{};
    const found=intel.analyses.find(a=>a.key===p.analysis);
    const title=isTr?(meta.titleTr||found?.labelTr||p.analysis):(meta.titleEn||found?.labelEn||p.analysis);
    const desc=isTr?(meta.descTr||p.reasonTr):(meta.descEn||p.reasonEn);
    const col=idx===0?'red':idx===1?'amber':'blue';
    const impactLabel=isTr?`ETKİ: ${p.impact}`:`IMPACT: ${p.impact}`;
    const effortLabel=isTr?`EFOR: ${p.effort}`:`EFFORT: ${p.effort}`;
    return `
      <article class="prio-card prio-${col}">
        <div class="prio-head">
          <span class="prio-badge">#${p.rank} ${isTr?'ÖNCELİKLİ KARAR':'PRIORITY DECISION'}</span>
          <div class="prio-tags">
            <span class="prio-tag prio-impact">${esc(impactLabel)}</span>
            <span class="prio-tag prio-effort">${esc(effortLabel)}</span>
          </div>
        </div>
        <h4>${esc(title)}</h4>
        <p>${esc(desc)}</p>
      </article>
    `;
  }).join('');

  // 4. Filter Bar & 13 Audits
  const counts={all:intel.analyses.length,PASS:0,WARN:0,FAIL:0,CONTEXT:0};
  intel.analyses.forEach(a=>{
    if(a.status==='PASS')counts.PASS++;
    else if(a.status==='WARN')counts.WARN++;
    else if(a.status==='FAIL')counts.FAIL++;
    else counts.CONTEXT++;
  });

  const filterBarHtml=`
    <div class="intel-filter-bar" id="intelFilterBar">
      <button type="button" class="intel-filter-btn active" data-filter="all">${esc(t.all)} (${counts.all})</button>
      <button type="button" class="intel-filter-btn filter-green" data-filter="PASS">${esc(t.pass)} (${counts.PASS})</button>
      <button type="button" class="intel-filter-btn filter-amber" data-filter="WARN">${esc(t.warn)} (${counts.WARN})</button>
      <button type="button" class="intel-filter-btn filter-red" data-filter="FAIL">${esc(t.fail)} (${counts.FAIL})</button>
      <button type="button" class="intel-filter-btn filter-blue" data-filter="CONTEXT">${esc(t.context)} (${counts.CONTEXT})</button>
    </div>
  `;

  const analysesHtml=intel.analyses.map(a=>{
    const meta=analysisMeta[a.key]||{catTr:'01 · DENETİM',catEn:'01 · AUDIT',theme:'blue',titleTr:a.labelTr,titleEn:a.labelEn};
    const title=isTr?(a.labelTr||meta.titleTr):(a.labelEn||meta.titleEn);
    const cat=isTr?meta.catTr:meta.catEn;
    const isCapstone=a.key==='codebase_seo_governance';
    const statusText=statusMap[l]?.[a.status]||a.status;
    const scoreVal=typeof a.score==='number'?Math.round(a.score):null;
    const evidenceSnippet=(a.evidence||[])[0]||(isTr?'Kanıt zinciri hazırlandı.':'Evidence chain established.');
    const boundaryText=isTr?a.boundaryTr:a.boundaryEn;

    let scoreBar='';
    if(scoreVal!==null){
      const tier=scoreVal>=80?'green':scoreVal>=60?'blue':scoreVal>=40?'amber':'red';
      scoreBar=`
        <div class="intel-card-meter">
          <i style="width:${Math.max(0,Math.min(100,scoreVal))}%;background:var(--intel-${tier});"></i>
        </div>
      `;
    }

    return `
      <article class="intel-item ${isCapstone?'intel-capstone':''} intel-${meta.theme}" data-key="${esc(a.key)}" data-status="${esc(a.status)}">
        <div class="intel-item-header">
          <div class="intel-item-title-wrap">
            <span class="intel-cat-pill intel-cat-${meta.theme}">${esc(cat)}</span>
            <h4>${esc(title)}</h4>
          </div>
          <span class="intel-status-pill status-${esc(a.status)}">${esc(statusText)}${scoreVal!==null?` · ${scoreVal}/100`:''}</span>
        </div>
        ${scoreBar}
        <div class="intel-evidence">
          <code><span class="ev-label">${esc(t.evidenceLabel)}:</span>${esc(evidenceSnippet)}</code>
        </div>
        <div class="intel-boundary">
          <strong>⚖️ ${esc(t.boundaryLabel)}:</strong> ${esc(boundaryText)}
        </div>
        ${isCapstone?`<div class="intel-capstone-action"><a href="/checkout?plan=pro" class="intel-mandate-cta">${esc(t.capstoneCta)}</a></div>`:''}
      </article>
    `;
  }).join('');

  section.innerHTML=`
    ${headHtml}
    <div class="intel-section-title">
      <h4>${esc(t.lenses)}</h4>
      <span>${esc(t.lensesSub)}</span>
    </div>
    <div class="intel-lenses">${lensesHtml}</div>
    ${priorities.length?`
      <div class="intel-section-title">
        <h4>${esc(t.priorities)}</h4>
        <span>${esc(t.prioritiesSub)}</span>
      </div>
      <div class="intel-priorities-deck">${prioCardsHtml}</div>
    `:''}
    <div class="intel-section-title">
      <h4>${esc(t.audits)}</h4>
      <span>${esc(t.auditsSub)}</span>
    </div>
    ${filterBarHtml}
    <div class="intel-grid" id="intelAuditsGrid">${analysesHtml}</div>
  `;

  // Attach filter events
  section.querySelectorAll('#intelFilterBar .intel-filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      section.querySelectorAll('#intelFilterBar .intel-filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      section.querySelectorAll('#intelAuditsGrid .intel-item').forEach(item=>{
        const st=item.dataset.status;
        if(f==='all')item.style.display='';
        else if(f==='CONTEXT'&&(st==='NOT_MEASURED'||st==='REQUIRES_CONTEXT'))item.style.display='';
        else if(st===f)item.style.display='';
        else item.style.display='none';
      });
    });
  });

  const anchor=document.getElementById('result');
  anchor?.insertAdjacentElement('afterend',section);
}

window.fetch=async(...args)=>{
  const response=await nativeFetch(...args);
  try{
    const url=typeof args[0]==='string'?args[0]:args[0]?.url||'';
    if(url.includes('/api/scan')&&response.ok){
      response.clone().json().then(data=>{
        if(data?.intelligence)setTimeout(()=>render(data.intelligence),0);
      }).catch(()=>{});
    }
  }catch{}
  return response;
};

window.addEventListener('hh-language-changed',()=>{if(last)render(last)});
})();
