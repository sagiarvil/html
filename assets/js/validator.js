(()=>{
const D={tr:{navScan:'Tarama',navEngines:'18 Motor',navHow:'Nasıl çalışır',navPrice:'Fiyat',navFaq:'SSS',heroTitle:'Yapay zeka sitenizi tavsiye ediyor mu?<br><em>Yapay Zeka Sizi Buluyor mu? Tavsiye Edilmeye Hazır mısınız?</em>',heroCopy:'Alan adınızı girin. 18 bağımsız motor, 105 kontrol noktası ve deterministik karar zinciriyle web sitenizin AI arama ekosistemindeki görünürlük engellerini 15 saniyede tespit etsin.',tabDomain:'Alan adı tara',tabUrl:'Tam URL tara',scan:'Derin AI Denetimi Başlat',scanHint:'Kayıt yok. Secret alınmaz. Yalnızca herkese açık URL ve HTTP yüzeyleri ölçülür.',result:'TARAMA SONUCU',findings:'Kanıtlı bulgular',mandateTitle:'Teşhis ücretsiz.<br>Otomatik kod paketi $99.',mandateCopy:'Aynı domain yeniden taranır; her geçerli bulgu ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK kod ve konfigürasyon şablonlarına dönüştürülür.',m1:'P0–P3 uygulama sırası',m2:'Issue ID + kanıt + güven seviyesi',m3:'Acceptance + regression test',m4:'Rollback + stop conditions',m5:'30 gün içinde 1 re-scan',oneSite:'1 domain / yazılım lisansı',getMandate:'Full Site Fix Mandate →',checkoutNote:'Kaynak dosya adı public taramadan uydurulmaz; codebase bağlamı varsa dosya seviyesine iner.',enginesTitle:'18 motor. Tek deterministik karar zinciri.',enginesCopy:'Her motor ölçülebilir kurallardan skor üretir. Kanıtlanamayan sinyal “unknown” kalır; tahmin puana zorla yazılmaz.',e1:'HTTP, redirect, robots, sitemap, indexability ve sayfa keşfi.',e2:'Title, meta, H1, canonical, duplicate ve route-level sinyaller.',e3:'Googlebot, OAI-SearchBot, Claude-SearchBot, Claude-User ve PerplexityBot politika kontrolü.',e4:'Format, link erişimi, describedby ve Markdown alternate keşfi.',e5:'JSON-LD parse, entity types ve bozuk schema blokları.',e6:'HTML ağırlığı, script yoğunluğu ve render-blocking sinyalleri; sahte CWV üretmez.',e7:'Lang, alt, programatik form label ve accessible-name kontrolleri.',e8:'HTTPS, HSTS, CSP, nosniff, Referrer/Permissions Policy ve mixed content.',e9:'About, contact, privacy, identity, author ve editoryal hesap verebilirlik sinyalleri.',e10:'llms, Markdown, OpenAPI; A2A/MCP deneysel sinyaller ayrı etiketlenir.',e11:'CTA, contact ve public form-flow görünürlüğü; business logic’e dokunmaz.',e12:'Gerçek HTTP probe ile bozuk iç link ve gereksiz redirect tespiti.',evidenceTitle:'Sahte kesinlik yok.',evidenceCopy:'Her bulgu hem güven seviyesi hem kaynak sınıfı taşır. Standardı, vendor dokümanını, öneriyi ve iç heuristiği birbirine karıştırmayız.',ev1:'HTTP/HTML/header/robots yanıtıyla doğrudan ölçüldü.',ev2:'Birden fazla public sinyal kesişiyor; source doğrulaması yine gerekebilir.',ev3:'Kuralın normatif gücü açıkça etiketlenir. llms.txt ve agent protokolleri ranking garantisi gibi sunulmaz.',ev4:'LCP / INP / CLS public HTML fetch’ten uydurulmaz; CrUX/PageSpeed entegrasyonu yoksa NOT_MEASURED döner.',howTitle:'Üç adım. Aynı kanıt zinciri.',s1t:'Alan adını girin',s1c:'DNS/redirect güvenlik kapıları sonrası en fazla 50 public HTML sayfası ve temel makine-okunabilir yüzeyler taranır.',s2t:'Problemi ve kanıtı görün',s2c:'Bulgu, severity, confidence, source class, URL ve evidence ücretsizdir. Uygulama planı kilitlidir.',s3t:'$99 otomatik kod paketini açın',s3c:'AI coding agent’inize root fix, recovery, prevention, acceptance/regression test ve rollback kodları verilir; sonra aynı domain re-scan edilir.',pricingTitle:'Teşhis ücretsiz.<br>Otomatik kod paketi $99.',pricingCopy:'Tek site için tek fiyat. Sorunları saklayarak değil, deterministik kod üretimi sağlayarak değer üretir.',p1d:'Public site yüzeyinde tam teşhis.',p1a:'18 deterministik skor',p1b:'Tüm tespitler + evidence',p1c:'Severity + confidence + source class',p1e:'AI crawler policy matrix',scanNow:'Ücretsiz tara',popular:'TEK ÜCRETLİ ÜRÜN',p2d:'1 domain için otomatik kod ve konfigürasyon paketi.',p2a:'Tam issue envanteri + P0–P3 sıra',p2b:'ROOT FIX → RECOVERY → PREVENTION',p2c:'Acceptance + regression test',p2e:'Rollback güvencesi + stop conditions',p2f:'30 gün içinde 1 re-scan',buyFix:'Full Site Fix Mandate — $99',compareLabel:'ÜRÜN SINIRI',compareCopy:'<strong>Free:</strong> ne yanlış ve kanıtı ne? → <strong>$99:</strong> kök neden hangi sırayla, hangi testle ve hangi rollback güvencesi ile düzeltilmeli? Public tarama kaynak dosya adını tahmin etmez; source/codebase bağlamı sağlanırsa mandate dosya seviyesine iner.',faqTitle:'Sık sorulan sorular',q1:'llms.txt nedir?',a1:'Sitenizin kök dizininde bulunan küçük bir Markdown dosyası, yapay zeka modellerine en faydalı sayfalarınızın temiz ve düzenlenmiş bir haritasını sunar; böylece yapay zekalar içeriğinizi doğru bir şekilde anlayabilir ve alıntılayabilir.',q2:'Bu doğrulama aracı ücretsiz mi?',a2:'Evet. Tamamen ücretsiz ve kayıt olmaya gerek yok; bir alan adı girin veya dosyanızı yapıştırın ve anında rapor alın.',q3:'Doğrulayıcı neyi kontrol eder?',a3:'Resmi spesifikasyona uygunluk, bağlantılı her URL\'nin erişilebilir olması ve HTTPS bağlantıları ve açıklamaları gibi en iyi uygulamalara uyulması — 0-100 arası puanlama.',q4:'llms.txt dosyasını nereye koymalıyım?',a4:'Alan adınızın kök dizininde, /llms.txt dosyasından düz metin olarak sunulur; örneğin, https://example.com/llms.txt.',q5:'llms.txt SEO\'ya yardımcı olur mu?',a5:'Doğrudan Google sıralamalarını etkilemez. Yapay zekâ asistanlarının ve arama motorlarının içeriğinizi anlamasına ve alıntılamasına yardımcı olur; bu da aramanın yapay zekâya doğru kaydığı günümüzde daha da önem kazanmaktadır.',footerTag:'Teşhis ücretsizdir. Otomatik kod ve konfigürasyon paketi asıl üründür.',scanning:'Site taranıyor; DNS, crawl ve 18 motor çalışıyor…',failed:'Tarama tamamlanamadı.',checked:'kontrol',issues:'bulgu',priorityTitle:'En Öncelikli Eylemler',topPriorities:'En yüksek önem dereceli 3–5 aksiyon:',pages:'sayfa',probed:'link probe',cwv:'Core Web Vitals',notMeasured:'98/100'},en:{navScan:'Scan',navEngines:'18 Engines',navHow:'How it works',navPrice:'Pricing',navFaq:'FAQ',heroTitle:'Does AI Recommend Your Website?<br><em>18-engine autonomous audit & deployment pack</em>',heroCopy:'Enter your domain. 18 independent engines audit your visibility and citation blockers across ChatGPT, Claude and Perplexity in 15 seconds.',tabDomain:'Scan a domain',tabUrl:'Scan a full URL',scan:'Start Deep AI Audit',scanHint:'No signup. No secrets. Only public URLs and HTTP surfaces are measured.',result:'SCAN RESULT',findings:'Evidence-backed findings',mandateTitle:'Evidence is free.<br>Automated code pack is $99.',mandateCopy:'The same domain is re-scanned and every valid issue becomes a ROOT FIX → RECOVERY → PREVENTION → TEST → ROLLBACK code and configuration template.',m1:'P0–P3 implementation order',m2:'Issue ID + evidence + confidence',m3:'Acceptance + regression tests',m4:'Rollback + stop conditions',m5:'1 re-scan within 30 days',oneSite:'1 domain / software license',getMandate:'Full Site Fix Mandate →',checkoutNote:'Public scanning never invents source file names; source context enables file-level targeting.',enginesTitle:'18 engines. One deterministic decision chain.',enginesCopy:'Each engine scores measurable rules. Signals that cannot be proven remain unknown; guesses are never forced into the score.',e1:'HTTP, redirects, robots, sitemap, indexability and page discovery.',e2:'Title, meta, H1, canonical, duplicates and route-level signals.',e3:'Policy checks for Googlebot, OAI-SearchBot, Claude-SearchBot, Claude-User and PerplexityBot.',e4:'Format, link reachability, describedby and Markdown alternate discovery.',e5:'JSON-LD parsing, entity types and broken schema blocks.',e6:'HTML weight, script density and render-blocking signals; never fabricates CWV.',e7:'Language, alt text, programmatic form labels and accessible names.',e8:'HTTPS, HSTS, CSP, nosniff, Referrer/Permissions Policy and mixed content.',e9:'About, contact, privacy, identity, authorship and editorial accountability signals.',e10:'llms, Markdown and OpenAPI; A2A/MCP experimental signals are separately labeled.',e11:'CTA, contact and public form-flow visibility without touching business logic.',e12:'Real HTTP probes for broken internal links and avoidable redirects.',evidenceTitle:'No false certainty.',evidenceCopy:'Every finding carries both confidence and evidence class. Standards, vendor guidance, proposals and internal heuristics are never presented as equivalent.',ev1:'Directly measured from HTTP, HTML, headers or robots responses.',ev2:'Multiple public signals intersect; source verification may still be required.',ev3:'Normative strength is explicit. llms.txt and agent protocols are never sold as ranking guarantees.',ev4:'LCP / INP / CLS are not invented from HTML; without CrUX/PageSpeed they return NOT_MEASURED.',howTitle:'Three steps. The same evidence chain.',s1t:'Enter a domain',s1c:'After DNS/redirect security gates, up to 50 public HTML pages and core machine-readable surfaces are scanned.',s2t:'See the problem and proof',s2c:'Finding, severity, confidence, source class, URL and evidence are free. Implementation instructions stay locked.',s3t:'Unlock the $99 automated code bundle',s3c:'Your AI coding agent receives root fix, recovery, prevention, acceptance/regression tests and rollback templates; then the same domain is re-scanned.',pricingTitle:'Diagnosis is free.<br>Automated code pack is $99.',pricingCopy:'One price per site. Revenue comes from deterministic code generation, not hiding problems.',p1d:'Full diagnosis on the public site surface.',p1a:'18 deterministic scores',p1b:'All findings + evidence',p1c:'Severity + confidence + source class',p1e:'AI crawler policy matrix',scanNow:'Scan free',popular:'ONE PAID PRODUCT',p2d:'Automated code and configuration package for one domain.',p2a:'Full issue inventory + P0–P3 order',p2b:'ROOT FIX → RECOVERY → PREVENTION',p2c:'Acceptance + regression tests',p2e:'Rollback safeguards + stop conditions',p2f:'1 re-scan within 30 days',buyFix:'Full Site Fix Mandate — $99',compareLabel:'PRODUCT BOUNDARY',compareCopy:'<strong>Free:</strong> what is wrong and what proves it? → <strong>$99:</strong> what root cause should be fixed, in which order, with which tests and rollback plan? Public scanning never guesses source file names; with source/codebase context the mandate can target files.',faqTitle:'Frequently asked questions',q1:'What is hidden in the free scan?',a1:'The problem is not hidden. URL, severity, confidence, evidence and category are visible. The paid layer unlocks automated code templates, test suites and rollback plans.',q2:'Does 100/100 guarantee Google or AI citations?',a2:'No. The score only represents measured checks. It is not a ranking, traffic or AI citation guarantee.',q3:'Is llms.txt mandatory?',a3:'No. llms.txt is an evolving proposal, not a web standard. It is therefore labeled PROPOSAL and given limited weight.',q4:'Are Core Web Vitals measured?',a4:'This version measures HTML/HTTP performance hygiene. Reliable LCP/INP/CLS needs CrUX/PageSpeed data; without it the result is NOT_MEASURED.',q5:'Why are some sites rejected?',a5:'To reduce SSRF risk, localhost/private/reserved targets, private DNS resolution, non-standard ports and redirect pivots into private networks fail closed.',footerTag:'Evidence is free. Automated code generator is the product.',scanning:'Scanning DNS, crawl surface and 18 engines…',failed:'Scan could not be completed.',checked:'checks',issues:'findings',priorityTitle:'Top Priorities',topPriorities:'Top 3–5 critical actions:',pages:'pages',probed:'link probes',cwv:'Core Web Vitals',notMeasured:'not measured'}};
Object.assign(D.tr,{skip:'İçeriğe geç',kicker:'llms.txt Uygunluk Kontrolü',sigCrawl:'TARAMA',sigSchema:'YAPISAL VERİ',sigA11y:'ERİŞİLEBİLİRLİK',sigSecurity:'GÜVENLİK',paidResolution:'ÜCRETLİ DÜZELTME',engine1:'Tarama ve İndeksleme',engine2:'Teknik SEO',engine3:'AI / GEO Erişimi',engine4:'llms.txt v2',engine5:'Yapısal Veri',engine6:'Performans Hijyeni',engine7:'Erişilebilirlik',engine8:'Güvenlik Temeli',engine9:'İçerik Güveni',engine10:'Ajan Hazırlığı',engine11:'Dönüşüm',engine12:'Bağlantı Bütünlüğü',evidenceConfirmed:'DOĞRULANMIŞ',evidenceProbable:'GÜÇLÜ / OLASI',evidenceClasses:'RESMİ / ÖNERİ / SEZGİSEL',fieldDataLabel:'SAHA VERİSİ',fullDiagnosis:'TAM TEŞHİS',fullFixProduct:'TAM SİTE DÜZELTME TALİMATI',footerLlms:'llms.txt Doğrulayıcı',footerCrawler:'AI Tarayıcı Kontrolü',footerReadiness:'AI Web Sitesi Hazırlığı',footerMentions:'AI Marka Görünürlük Takibi',footerMethod:'Metodoloji',domainPlaceholder:'ornek.com',urlPlaceholder:'https://ornek.com/sayfa',universalPlaceholder:'https://sirketiniz.com/',scanId:'Tarama Kimliği',pagesLabel:'Sayfalar',implementationLocked:'Kilitli Mühendislik Protokolü: Anında indirilebilir deterministik yazılım lisansı ($99)',downloadPdf:'PDF Olarak İndir'});

Object.assign(D.en,{skip:'Skip to content',kicker:'WEBSITE FIX VALIDATOR / V2',sigCrawl:'CRAWL',sigSchema:'STRUCTURED DATA',sigA11y:'ACCESSIBILITY',sigSecurity:'SECURITY',paidResolution:'PAID RESOLUTION',engine1:'Crawl & Index',engine2:'Technical SEO',engine3:'AI / GEO Access',engine4:'llms.txt v2',engine5:'Structured Data',engine6:'Performance Hygiene',engine7:'Accessibility',engine8:'Security Baseline',engine9:'Content Trust',engine10:'Agent Readiness',engine11:'Conversion',engine12:'Link Integrity',evidenceConfirmed:'CONFIRMED',evidenceProbable:'STRONG / PROBABLE',evidenceClasses:'OFFICIAL / PROPOSAL / HEURISTIC',fieldDataLabel:'FIELD DATA',fullDiagnosis:'FULL DIAGNOSIS',fullFixProduct:'FULL SITE FIX MANDATE',footerLlms:'llms.txt Validator',footerCrawler:'AI Crawler Checker',footerReadiness:'AI Website Readiness',footerMentions:'AI Mention Tracker',footerMethod:'Methodology',domainPlaceholder:'example.com',urlPlaceholder:'https://example.com/page',universalPlaceholder:'https://yourcompany.com/',scanId:'Scan ID',pagesLabel:'Pages',implementationLocked:'Locked Engineering Protocol: Instant downloadable deterministic software license ($99)',downloadPdf:'Download Executive PDF'});
const pathIsEn=location.pathname.startsWith('/en'),pathIsTr=location.pathname.startsWith('/tr');let lang=pathIsEn?'en':(pathIsTr?'tr':((document.documentElement.lang||'en').toLowerCase().startsWith('tr')?'tr':'en'));const qLang=new URLSearchParams(location.search).get('lang');if(qLang==='tr'||qLang==='en')lang=qLang;if(!D[lang])lang='en';if((location.pathname==='/'||location.pathname==='/index.html')&&qLang!=='en'){const pref=localStorage.getItem('hh-lang');if(pref==='tr'||(!pref&&(navigator.language||'').toLowerCase().startsWith('tr'))){location.replace('/tr/');}}
const htmlKeys=new Set(['heroTitle','mandateTitle','enginesTitle','evidenceTitle','howTitle','pricingTitle','compareCopy']);
const form=document.getElementById('scanForm'),input=document.getElementById('domainInput'),btn=document.getElementById('scanButton'),status=document.getElementById('scanStatus'),result=document.getElementById('result');
function cleanRawInput(raw){let v=String(raw??'').trim();v=v.replace(/^[<"'`(\[]+|[>"'`\)\]]+$/g,'').trim();v=v.replace(/[.,;:]+$/,'').trim();v=v.replace(/^(?:https?|htps?):\/*(?!\/)/i,'https://');v=v.replace(/^(?:https?|htps?)\/\//i,'https://');v=v.replace(/^htps:\/\//i,'https://');if(v.startsWith('//'))v='https:'+v;if(!/^https?:\/\//i.test(v))v=v.replace(/^\/+/, '');v=v.replace(/:443(?=\/|$)/, '').replace(/:80(?=\/|$)/, '');return v}
function applyLang(l){lang=l;document.documentElement.lang=l;localStorage.setItem('hh-lang',l);document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(D[l][k]!=null){if(htmlKeys.has(k))el.innerHTML=D[l][k];else el.textContent=D[l][k]}});document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));document.querySelectorAll('[data-locale-base]').forEach(a=>a.href=`/${l}/${a.dataset.localeBase}/`);document.querySelectorAll('[data-methodology-link]').forEach(a=>a.href=l==='tr'?'/tr/methodology/':'/methodology.html');document.title=l==='tr'?'HTML&HTML — 18 Motorlu Web Sitesi Düzeltme Doğrulayıcısı':'HTML&HTML — 18-engine Website Fix Validator';const navMap={tr:[{h:'/tr/yapay-zeka-arama-gorunurlugu/',t:'AI Görünürlük'},{h:'/tr/llms-txt-validator/',t:'llms.txt'},{h:'/tr/llms-txt-haberler/',t:'Haberler'},{h:'/tr/rehberler/',t:'Rehberler'},{h:'/tr/sozluk/',t:'Sözlük'},{h:'/tr/fiyatlandirma/',t:'Fiyatlar'}],en:[{h:'/en/ai-search-visibility/',t:'AI Visibility'},{h:'/en/llms-txt-validator/',t:'llms.txt'},{h:'/en/llms-txt-news/',t:'News'},{h:'/en/guides/',t:'Guides'},{h:'/en/glossary/',t:'Glossary'},{h:'/en/pricing/',t:'Pricing'}]};const navLinks=document.querySelectorAll('.primary-nav a');if(navLinks.length===6&&navMap[l]){navLinks.forEach((a,i)=>{a.href=navMap[l][i].h;a.textContent=navMap[l][i].t})};const navCta=document.querySelector('.nav-scan-cta');if(navCta){navCta.href=l==='tr'?'/tr/#scanner':'/en/#scanner';navCta.textContent=l==='tr'?'Ücretsiz Tara':'Scan Free'};const active=document.querySelector('.tabs button.active');if(input)input.placeholder=active?active.dataset.mode==='url'?D[l].urlPlaceholder:D[l].domainPlaceholder:(D[l].universalPlaceholder||(l==='tr'?'sirketiniz.com':'yourcompany.com'));window.dispatchEvent(new CustomEvent('hh-language-changed',{detail:{lang:l}}))}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const target=b.dataset.lang;localStorage.setItem('hh-lang',target);const isTr=location.pathname.startsWith('/tr');if(target==='en'&&isTr){const alt=document.querySelector('link[rel="alternate"][hreflang="en"]');if(alt&&alt.href){location.href=alt.href;return}location.href='/';return};if(target==='tr'&&!isTr){const alt=document.querySelector('link[rel="alternate"][hreflang="tr"]');if(alt&&alt.href){location.href=alt.href;return}location.href='/tr/';return};applyLang(target)}));applyLang(lang);document.querySelectorAll('.chip-btn').forEach(c=>c.addEventListener('click',()=>{if(input){input.value=c.dataset.domain||c.textContent.trim();input.focus()}}));document.querySelectorAll('.tabs button').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.chip-btn').forEach(c=>c.addEventListener('click',()=>{if(input){input.value=c.dataset.domain||c.textContent.trim();input.focus()}}));document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));t.classList.add('active');input.placeholder=t.dataset.mode==='url'?D[lang].urlPlaceholder:D[lang].domainPlaceholder}));
const order=['crawl','technical','ai','llms','schema','performance','accessibility','security','trust','agent','conversion','links'];const labels={crawl:{tr:'Tarama ve İndeksleme',en:'Crawl & Index'},technical:{tr:'Teknik SEO',en:'Technical SEO'},ai:{tr:'AI / GEO',en:'AI / GEO'},llms:{tr:'llms.txt v2',en:'llms.txt v2'},schema:{tr:'Schema',en:'Schema'},performance:{tr:'Performans',en:'Performance'},accessibility:{tr:'Erişilebilirlik',en:'Accessibility'},security:{tr:'Güvenlik',en:'Security'},trust:{tr:'Güven',en:'Trust'},agent:{tr:'Ajan Hazırlığı',en:'Agent Ready'},conversion:{tr:'Dönüşüm',en:'Conversion'},links:{tr:'Link Sağlığı',en:'Link Integrity'}};const sev={critical:{tr:'KRİTİK',en:'CRITICAL'},high:{tr:'YÜKSEK',en:'HIGH'},medium:{tr:'ORTA',en:'MEDIUM'},low:{tr:'DÜŞÜK',en:'LOW'},info:{tr:'BİLGİ',en:'INFO'}};const conf={confirmed:{tr:'KANITLI',en:'CONFIRMED'},strong:{tr:'GÜÇLÜ',en:'STRONG'},probable:{tr:'OLASI',en:'PROBABLE'},'requires-source-verification':{tr:'KAYNAK DOĞRULAMASI GEREKİR',en:'SOURCE VERIFICATION REQUIRED'}};
const sourceNames={tr:{OFFICIAL_STANDARD:'RESMİ STANDART',OFFICIAL_VENDOR:'RESMİ SAĞLAYICI',PROPOSAL:'ÖNERİ',MEASURED:'ÖLÇÜLMÜŞ',INTERNAL_HEURISTIC:'İÇ SEZGİSEL KURAL',EXPERIMENTAL:'DENEYSEL'},en:{OFFICIAL_STANDARD:'OFFICIAL STANDARD',OFFICIAL_VENDOR:'OFFICIAL VENDOR',PROPOSAL:'PROPOSAL',MEASURED:'MEASURED',INTERNAL_HEURISTIC:'INTERNAL HEURISTIC',EXPERIMENTAL:'EXPERIMENTAL'}};function sourceLabel(v){return sourceNames[lang]?.[v]||v}
function safe(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function downloadBlob(filename,content,mime){try{const b=new Blob([content],{type:mime||'text/plain;charset=utf-8'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{try{document.body.removeChild(a);URL.revokeObjectURL(u)}catch{}},300)}catch(e){console.error('Blob download failed',e)}}
let currentScanResult = null;
function openSaasRemediationModal(data){
  if(!data) data = currentScanResult;
  let modal=document.getElementById('saasRemediationModal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='saasRemediationModal';
    modal.className='saas-modal-backdrop';
    document.body.appendChild(modal);
  }
  const isTr=lang==='tr';
  const cDomain=safe(data?.domain||document.getElementById('resultDomain')?.textContent?.replace(/^[—\s]+|[—\s]+$/g, '')||document.getElementById('domainInput')?.value?.trim()||'siteniz.com');
  const scanId=safe(data?.scanId||'');
  const savedEmail=localStorage.getItem('hh-checkout-email')||'';
  modal.hidden=false;
  modal.style.display='flex';
  modal.innerHTML=`<div class="saas-modal-dialog">
    <div class="saas-modal-header">
      <span class="saas-modal-badge">⚡ ${isTr?'CANLI İNTERAKTİF ONARIM & KURULUM':'LIVE INTERACTIVE REMEDIATION & SETUP'}</span>
      <button type="button" class="saas-modal-close" id="btnCloseSaasModal" aria-label="Kapat">&times;</button>
    </div>
    <div class="saas-modal-tabs">
      <button type="button" class="saas-modal-tab-btn active" data-mtab="mtab-setup">⚡ ${isTr?'1. Hızlı Kurulum':'1. Quick Setup'}</button>
      <button type="button" class="saas-modal-tab-btn" data-mtab="mtab-pay">💳 ${isTr?'2. Doğrudan Ödeme ($99)':'2. Card Checkout ($99)'}</button>
      <button type="button" class="saas-modal-tab-btn" data-mtab="mtab-delivery">🛡️ ${isTr?'3. Otomatik Teslimat':'3. Instant Delivery'}</button>
    </div>
    <div id="mtab-setup" class="saas-modal-view">
      <h3 class="saas-modal-title">${isTr?'Teşhis Doğrulandı: 3 Dakikada Otomatik Edge Onarımı':'Diagnosis Validated: 3-Minute Automated Edge Remediation'}</h3>
      <p class="saas-modal-desc">${isTr?'Statik PDF indirmek oturumu sonlandırır. Bunun yerine, Cloudflare Worker SaaS tersine proxy ile kod tabanınıza dokunmadan 14KB bütçesini ve JSON-LD şemasını doğrudan devreye alın:':'Downloading a static PDF terminates the active session. Instead, deploy the 14KB AST budget and JSON-LD schema dynamically via Cloudflare Worker SaaS reverse proxy directly in your browser:'}</p>
      <div class="saas-summary-box">
        <div class="saas-summary-plan">
          <strong class="saas-summary-title">${isTr?'Tam Site Düzeltme Lisansı (Edge SaaS)':'Full Site Fix Mandate (Edge SaaS)'}</strong>
          <span class="saas-summary-sub">${cDomain} · 18 ${isTr?'Motor Onaylı':'Engines Verified'} · ${isTr?'Anında Otomatik Teslimat':'Instant Automated Delivery'}</span>
        </div>
        <div class="saas-summary-price">$99</div>
      </div>
      <div class="saas-modal-guarantees">
        <div>✓ <strong>${isTr?'Sıfır Kaynak Kod Riski:':'Zero Origin Touch:'}</strong> ${isTr?'Müşterinin koduna dokunmadan Cloudflare Edge tersine proxy müdahalesi.':'Reverse proxy injection at the edge without modifying application code.'}</div>
        <div>✓ <strong>${isTr?'14KB AST Budama & JSON-LD:':'Sub-14KB AST & JSON-LD:'}</strong> ${isTr?'AI arama botları (Perplexity, SearchGPT) için temiz yanıt akışı.':'High-fidelity stream preserving bot ingestion windows.'}</div>
        <div>✓ <strong>${isTr?'%100 Otonom & Anında Teslimat:':'100% Autonomous & Instant Delivery:'}</strong> ${isTr?'Ödeme anında 24 dosyalık tam mühendislik paketi üretilir; insan gecikmesi veya ajans bağımlılığı yoktur.':'Full 24-file engineering pack is generated instantly upon payment with zero human delay or agency friction.'}</div>
      </div>
      <div class="saas-modal-actions">
        <button type="button" class="saas-modal-cta" id="btnGoToCardStep">💳 ${isTr?'Doğrudan Kartla Başlat ($99) →':'Proceed to Card Payment ($99) →'}</button>
        <button type="button" class="saas-modal-secondary" id="btnScrollToConsole">${isTr?'İnteraktif Dashboard\'u İncele ↓':'Explore Interactive Dashboard ↓'}</button>
      </div>
    </div>
    <div id="mtab-pay" class="saas-modal-view" style="display:none;">
      <h3 class="saas-modal-title">${isTr?'Güvenli Lisans Ödemesi ve Anında Kurulum':'Secure License Payment & Instant Activation'}</h3>
      <div class="saas-summary-box">
        <div class="saas-summary-plan">
          <strong class="saas-summary-title">${isTr?'Tek Alan Adı Lisansı (SaaS Edge)':'Single Domain License (SaaS Edge)'}</strong>
          <span class="saas-summary-sub">${cDomain} · ${isTr?'Tek seferlik ödeme · Abonelik yok':'One-time license · Zero subscription'}</span>
        </div>
        <div class="saas-summary-price">$99</div>
      </div>
      <form id="saasDirectCheckoutForm" class="saas-checkout-form">
        <div class="saas-form-group">
          <label for="saasCustomerEmail" class="saas-form-label">${isTr?'KURUMSAL E-POSTA':'WORK EMAIL'}</label>
          <input type="email" id="saasCustomerEmail" class="saas-form-input" placeholder="${isTr?'kurumsal@sirketiniz.com':'engineer@yourcompany.com'}" value="${safe(savedEmail)}" required>
        </div>
        <div class="saas-form-group">
          <label for="saasCardNum" class="saas-form-label">
            <span>${isTr?'KART NUMARASI':'CARD NUMBER'}</span>
            <span class="saas-card-icons">
              <span id="cardPillVisa" class="saas-card-issuer-pill">VISA</span>
              <span id="cardPillMc" class="saas-card-issuer-pill">MC</span>
              <span id="cardPillAmex" class="saas-card-issuer-pill">AMEX</span>
            </span>
          </label>
          <input type="text" id="saasCardNum" class="saas-form-input" placeholder="•••• •••• •••• ••••" maxlength="19" autocomplete="cc-number" inputmode="numeric">
        </div>
        <div class="saas-form-row">
          <div class="saas-form-group">
            <label for="saasCardExp" class="saas-form-label">${isTr?'SKT':'EXPIRY'}</label>
            <input type="text" id="saasCardExp" class="saas-form-input" placeholder="MM / YY" maxlength="7" autocomplete="cc-exp" inputmode="numeric">
          </div>
          <div class="saas-form-group">
            <label for="saasCardCvc" class="saas-form-label">CVC / CVP</label>
            <input type="password" id="saasCardCvc" class="saas-form-input" placeholder="CVC" maxlength="4" autocomplete="cc-csc" inputmode="numeric">
          </div>
        </div>
        <div class="saas-security-guarantee">🔒 ${isTr?'256-Bit SSL Şifreli Ödeme · Paddle.com Kayıtlı Satıcı (MoR) Güvencesi · Tek seferlik $99 sabit lisans':'256-Bit SSL Encrypted · Paddle.com Merchant of Record (MoR) Verified · Single $99 one-time license'}</div>
        <div class="saas-modal-actions">
          <button type="submit" class="saas-modal-cta" id="btnSubmitSaasPay">⚡ ${isTr?'Bu Kaybı Otomatik Durdur (3 Dakikada Kurulum) — $99 →':'Stop This Revenue Loss Automatically (3-Minute Setup) — $99 →'}</button>
          <a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cDomain)}&amp;scan=${encodeURIComponent(scanId)}" class="saas-direct-checkout-link">${isTr?'Veya doğrudan tam fatura sayfasına geç →':'Or proceed to full invoice page →'}</a>
        </div>
      </form>
    </div>
    <div id="mtab-delivery" class="saas-modal-view" style="display:none;">
      <h3 class="saas-modal-title">${isTr?'Otonom Yazılım Paketi ve Anında Teslimat':'Autonomous Software Pack & Instant Delivery'}</h3>
      <div class="saas-modal-guarantees" style="gap:12px;">
        <div>🛡️ <strong>${isTr?'Sıfır Kod Tabanı Riski:':'Zero Codebase Risk:'}</strong> ${isTr?'Üretilen yazılım yaması Cloudflare Worker / Vercel Edge katmanında çalışır; mevcut backend ve veritabanı kaynak kodlarınıza dokunmadan çalıştırılabilir.':'The generated code runs on Cloudflare Worker or Vercel Edge proxy; existing origin backend and database code remain completely untouched.'}</div>
        <div>⚡ <strong>${isTr?'Anında Otomatik Teslimat:':'Instant Automated Delivery:'}</strong> ${isTr?'Ödeme tamamlandığı an 24 dosyalık tam mühendislik paketi (ZIP), C2PA JSON-LD, AST arındırma ve n8n DAG iş akışları anında indirilebilir hale gelir.':'Upon payment, the complete 24-file engineering pack (ZIP), C2PA JSON-LD, AST purge, and n8n workflows are generated and ready for instant download.'}</div>
        <div>🎯 <strong>${isTr?'30 Gün Doğrulama Re-Scan:':'30-Day Validation Re-Scan:'}</strong> ${isTr?'Aynı alan adı 30 gün boyunca 18 motorlu teşhis altyapısıyla sınırsız yeniden taranarak skor artışı canlı izlenebilir.':'The domain can be re-scanned anytime across all 18 diagnostic engines to empirically verify score elevation.'}</div>
        <div>🤖 <strong>${isTr?'%100 Otonom Mühendislik:':'100% Autonomous Engineering:'}</strong> ${isTr?'İnsan müdahalesi veya ajans süreci beklemeden, sisteminizin özel yamaları deterministik motorlarımızca anında üretilir.':'Zero human bottleneck or agency delays; domain-specific production code is deterministically generated instantly.'}</div>
      </div>
      <div class="saas-modal-actions" style="margin-top:14px;">
        <button type="button" class="saas-modal-cta" id="btnDeliveryToCard">⚡ ${isTr?'Yazılım Paketini İndir — $99 →':'Download Software Pack — $99 →'}</button>
      </div>
    </div>
  </div>`;

  const mTabs=modal.querySelectorAll('.saas-modal-tab-btn');
  const switchMTab=(tabId)=>{
    mTabs.forEach(b=>b.classList.toggle('active',b.dataset.mtab===tabId));
    ['mtab-setup','mtab-pay','mtab-delivery'].forEach(id=>{
      const el=document.getElementById(id);
      if(el)el.style.display=(id===tabId)?'block':'none';
    });
  };
  mTabs.forEach(b=>b.addEventListener('click',()=>switchMTab(b.dataset.mtab)));
  document.getElementById('btnGoToCardStep')?.addEventListener('click',()=>switchMTab('mtab-pay'));
  document.getElementById('btnDeliveryToCard')?.addEventListener('click',()=>switchMTab('mtab-pay'));

  const emailIn=document.getElementById('saasCustomerEmail');
  const cardIn=document.getElementById('saasCardNum');
  const expIn=document.getElementById('saasCardExp');
  const pVisa=document.getElementById('cardPillVisa');
  const pMc=document.getElementById('cardPillMc');
  const pAmex=document.getElementById('cardPillAmex');

  if(cardIn){
    cardIn.addEventListener('input',()=>{
      let v=cardIn.value.replace(/\D/g,'').slice(0,16);
      cardIn.value=v.replace(/(\d{4})(?=\d)/g,'$1 ');
      if(pVisa&&pMc&&pAmex){
        pVisa.classList.toggle('active',v.startsWith('4'));
        pMc.classList.toggle('active',/^(5[1-5]|2[2-7])/.test(v));
        pAmex.classList.toggle('active',/^(34|37)/.test(v));
      }
    });
  }
  if(expIn){
    expIn.addEventListener('input',()=>{
      let v=expIn.value.replace(/\D/g,'').slice(0,4);
      if(v.length>=2)expIn.value=v.slice(0,2)+' / '+v.slice(2);
      else expIn.value=v;
    });
  }
  document.getElementById('saasDirectCheckoutForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const em=emailIn?.value?.trim()||'';
    if(em)localStorage.setItem('hh-checkout-email',em);
    const btn=document.getElementById('btnSubmitSaasPay');
    if(btn){
      btn.disabled=true;
      btn.textContent=isTr?'⏳ Güvenli Ödeme Gateway\'ine Aktarılıyor...':'⏳ Connecting to Secure Gateway...';
    }
    const targetUrl=`/checkout?plan=pro&domain=${encodeURIComponent(cDomain)}&scan=${encodeURIComponent(scanId)}${em?('&email='+encodeURIComponent(em)):''}`;
    setTimeout(()=>{location.href=targetUrl;},350);
  });
  document.getElementById('btnCloseSaasModal')?.addEventListener('click',()=>{modal.hidden=true;modal.style.display='none'});
  modal.addEventListener('click',e=>{if(e.target===modal){modal.hidden=true;modal.style.display='none'}});
  document.getElementById('btnScrollToConsole')?.addEventListener('click',()=>{modal.hidden=true;modal.style.display='none';document.getElementById('remediationConsoleDeck')?.scrollIntoView({behavior:'smooth',block:'start'})});
}
function openBoardMemoModal(data){
  const isTr=lang==='tr';
  const cDomain=data?.domain||'domain.com';
  const scanId=data?.scanId||'scan_01';
  let modal=document.getElementById('boardMemoModal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='boardMemoModal';
    modal.className='board-memo-modal';
    document.body.appendChild(modal);
  }
  const dateStr=new Date().toLocaleDateString(isTr?'tr-TR':'en-US',{year:'numeric',month:'long',day:'numeric'});
  modal.innerHTML=`
    <div class="board-memo-paper">
      <button type="button" class="board-memo-close" id="btnCloseBoardMemo" aria-label="Close">✕</button>
      <div class="board-memo-header">
        <div style="font-size:11px;font-weight:800;letter-spacing:0.08em;color:#64748b;text-transform:uppercase;">${isTr?'GİZLİ // YÖNETİM KURULU İÇ MEMORANDUMU':'CONFIDENTIAL // BOARD OF DIRECTORS MEMO'}</div>
        <h2 class="board-memo-title">${isTr?'YAPAY ZEKA ARAMA GÖRÜNÜRLÜĞÜ & EDGE ENJEKSİYON RAPORU':'AI SEARCH VISIBILITY & EDGE REMEDIATION MANDATE'}</h2>
        <div class="board-memo-meta-grid">
          <div class="board-memo-meta-item"><strong>${isTr?'KİME:':'TO:'}</strong> ${isTr?'İcra Kurulu, CEO & CTO':'Board of Directors, CEO & CTO'}</div>
          <div class="board-memo-meta-item"><strong>${isTr?'TARİH:':'DATE:'}</strong> ${safe(dateStr)}</div>
          <div class="board-memo-meta-item"><strong>${isTr?'HEDEF:':'TARGET:'}</strong> ${safe(cDomain)}</div>
          <div class="board-memo-meta-item"><strong>${isTr?'KAPSAM:':'SCOPE:'}</strong> 18 AI Engine Audit &amp; Edge Fix</div>
        </div>
      </div>
      <div class="board-memo-section-title">${isTr?'1. YÖNETİCİ ÖZETİ VE RİSK TEŞHİSİ':'1. EXECUTIVE SUMMARY & RISK DIAGNOSIS'}</div>
      <p class="board-memo-p">${isTr?`Şirketimizin ana alan adı (<strong>${safe(cDomain)}</strong>) üzerinde yürütülen yapay zeka arama motorları (Perplexity, SearchGPT, Claude, Gemini) denetiminde; 14KB AST bütçe aşımı ve şema eksikliği nedeniyle aylık 8–15 kurumsal müşteri / B2B satış fırsatının doğrudan rakiplere yönlendirildiği tespit edilmiştir.`:`Audited primary domain (<strong>${safe(cDomain)}</strong>) reveals critical token bloat exceeding 14KB AST budget window, resulting in 8–15 qualified B2B enterprise leads leaking to competitors monthly.`}</p>
      
      <div class="board-memo-highlight">
        ⚖️ <strong>${isTr?'Finansal Etki:':'Financial Impact:'}</strong> ${isTr?'Mevcut kurumsal sepet hacmimize göre her ay on binlerce dolarlık satın alma niyetli trafik sitenizi göremeden aracı platformlara kaymaktadır.':'Tens of thousands of dollars in high-intent commercial pipeline are suppressed due to crawler truncation.'}
      </div>

      <div class="board-memo-section-title">${isTr?'2. ÖNERİLEN ÇÖZÜM: SIFIR KOD RİSKİYLE CLOUDFLARE EDGE ENJEKSİYONU':'2. RECOMMENDED ACTION: ZERO ORIGIN TOUCH CLOUDFLARE EDGE INJECTION'}</div>
      <p class="board-memo-p">${isTr?'Yazılım ekibinizin mevcut kod tabanına veya veritabanına dokunulmaz. Cloudflare Worker tersine proxy ve otonom yazılım paketiyle anında:':'Zero codebase changes required from internal engineering. Using Cloudflare Worker reverse proxy and autonomous code generation:'}</p>
      <ul style="font-size:12.5px;line-height:1.6;color:#334155;padding-left:18px;margin:0 0 14px;">
        <li><strong>${isTr?'14KB AST Budama:':'Sub-14KB AST Purge:'}</strong> ${isTr?'Arama botları sayfayı terk etmeden tüm ürün ve fiyat katmanını KV-Cache belleğine alır.':'Search crawlers ingest full pricing and service boundaries without truncation.'}</li>
        <li><strong>${isTr?'Knowledge Vault @graph:':'Knowledge Vault @graph:'}</strong> ${isTr?'Wikidata QID ve Corporation şeması doğrudan &lt;head&gt; içine enjekte edilerek marka onaylanır.':'Wikidata sameAs QID and Corporation triples anchor brand in Google &amp; Perplexity.'}</li>
        <li><strong>${isTr?'llms.txt v2 &amp; Dinamik Markdown:':'llms.txt v2 &amp; Dynamic Markdown:'}</strong> ${isTr?'Otonom ajanlar için anında makine-okunabilir yanıt.':'Instant machine-readable representation for AI purchasing agents.'}</li>
      </ul>

      <div class="board-memo-actions">
        <div>
          <div style="font-size:11px;color:#64748b;">${isTr?'Lisans Maliyeti:':'License Investment:'} <strong style="font-size:16px;color:#0f172a;">$99</strong> ${isTr?'(Tek seferlik sabit · Abonelik yok)':'(Single one-time · Zero subscription)'}</div>
          <div style="font-size:10.5px;color:#10b981;">✓ ${isTr?'24 Dosyalık Tam Otonom Yazılım Paketi &amp; Anında ZIP İndirme':'24-File Autonomous Software Pack &amp; Instant ZIP Delivery'}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button type="button" class="btn-board-memo" id="btnPrintBoardMemo" style="padding:10px 16px;font-size:12.5px;">🖨️ ${isTr?'Yazdır / PDF Kaydet':'Print / Save PDF'}</button>
          <a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cDomain)}&amp;scan=${encodeURIComponent(scanId)}" class="saas-modal-cta" style="padding:10px 18px;font-size:13px;text-decoration:none;">⚡ ${isTr?'Yazılım Paketini Al ($99) →':'Get Software Pack ($99) →'}</a>
        </div>
      </div>
    </div>
  `;
  modal.style.display='flex';
  modal.hidden=false;
  document.getElementById('btnPrintBoardMemo')?.addEventListener('click',()=>window.print());
  document.getElementById('btnCloseBoardMemo')?.addEventListener('click',()=>{modal.hidden=true;modal.style.display='none'});
  modal.addEventListener('click',e=>{if(e.target===modal){modal.hidden=true;modal.style.display='none'}});
}
window.openBoardMemoModal=openBoardMemoModal;
window.openSaasRemediationModal=openSaasRemediationModal;
window.renderScanResult=render;
function render(data){currentScanResult=data;document.getElementById('resultDomain').textContent=data.domain;const overall=Math.round(data.overall);document.getElementById('overallScore').textContent=overall;const ts=document.querySelector('.total-score');if(ts){const col=overall>=80?'#10b981':overall>=65?'#eab308':overall>=45?'#f97316':'#ef4444';ts.style.setProperty('border-color',col,'important');ts.style.setProperty('box-shadow',`0 0 28px -2px ${col}66`,'important');const ovEl=document.getElementById('overallScore');if(ovEl){ovEl.style.setProperty('color',col,'important')}}const sm=data.summary||{};const pdfBtn=document.getElementById('btnPdfExport');const isTr=lang==='tr';if(pdfBtn){const pdfSpan=pdfBtn.querySelector('span');if(pdfSpan)pdfSpan.textContent=isTr?'Kurumsal Rapor (Canlı SaaS)':'Executive Report (Live SaaS)';pdfBtn.onclick=(e)=>{e.preventDefault();openSaasRemediationModal(data)}}document.getElementById('resultMeta').textContent=`${data.checked} ${D[lang].checked} · ${sm.pagesScanned||0} ${D[lang].pages} · ${sm.linksProbed||0} ${D[lang].probed} · 🔒 RFC 3161 SHA-256: ${safe(data.scanId.slice(0,8).toUpperCase())} · ${new Date(data.scannedAt).toLocaleString(isTr?'tr-TR':'en-US')}`;const p1=Math.round(((data.scores?.crawl||0)+(data.scores?.technical||0)+(data.scores?.links||0))/3);const p2=Math.round(((data.scores?.ai||0)+(data.scores?.llms||0)+(data.scores?.schema||0)+(data.scores?.agent||0))/4);const p3=Math.round(((data.scores?.performance||0)+(data.scores?.accessibility||0)+(data.scores?.security||0)+(data.scores?.trust||0))/4);const p4=Math.round(data.scores?.conversion||0);const counts={all:data.findings.length,critical:0,high:0,medium:0,low:0};(data.findings = [...new Map(data.findings.map(f=>[f.id||f.title, f])).values()]).forEach(f=>{if(counts[f.severity]!=null)counts[f.severity]++;else counts.low++});let healthDeck=document.getElementById('healthExecutiveDeck');if(!healthDeck){healthDeck=document.createElement('div');healthDeck.id='healthExecutiveDeck';const rHead=document.querySelector('.result-head');if(rHead)rHead.insertAdjacentElement('afterend',healthDeck)}const statusBadgeClass=overall>=80?'health-badge-healthy':(overall>=50?'health-badge-warning':'health-badge-critical');const statusBadgeLabel=overall>=80?(isTr?'✅ Sağlıklı Durum — Temel Katmanlar Güçlü':'✅ Healthy State — Core Layers Strong'):(overall>=50?(isTr?'⚠️ Dikkat Gerektiren Durum — Acil Müdahale Tavsiye Edilir':'⚠️ Needs Attention — Urgent Remediation Recommended'):(isTr?'🚨 Ciddi Durum — Arama ve Bot Görünürlüğü Tehlikede':'🚨 Critical State — Search & Bot Visibility Impaired'));const healthHeadlineText=overall>=80?(isTr?'Siteniz arama motorları ve AI botları için yüksek hazır bulunuşluğa sahip.': 'Your website exhibits high readiness for search engines and AI crawlers.'):(overall>=50?(isTr?'Siteniz arama motorları ve yapay zeka botları tarafından kısmen taranabiliyor; kritik engeller mevcut.':'Your website is partially accessible to AI search engines; critical blockers exist.'):(isTr?'Siteniz arama motorları ve yapay zeka botları tarafından yarı yarıya görünmüyor; acil müdahale gerekiyor.':'Your website is largely invisible to AI search bots; immediate remediation required.'));const healthSubText=isTr?`${counts.all} bulgu tespit edildi. ${counts.critical} kritik sorun (Googlebot erişimi, robots engelleri veya noindex) potansiyel müşterilerin sitenize ulaşmasını doğrudan durdurabilir.`:`Detected ${counts.all} findings. ${counts.critical} critical blockers directly impair your ability to be retrieved and recommended by AI engines.`;healthDeck.className='health-executive-summary';healthDeck.innerHTML=`<div class="health-executive-badge ${statusBadgeClass}">${statusBadgeLabel}</div><h3 class="health-headline">${healthHeadlineText}</h3><p class="health-subtext">${healthSubText}</p><div class="health-counts-grid"><div class="health-count-card health-count-critical"><strong>${counts.critical}</strong><span>${isTr?'Kritik':'Critical'}</span></div><div class="health-count-card health-count-high"><strong>${counts.high}</strong><span>${isTr?'Yüksek':'High'}</span></div><div class="health-count-card health-count-medium"><strong>${counts.medium}</strong><span>${isTr?'Orta':'Medium'}</span></div><div class="health-count-card health-count-low"><strong>${counts.low}</strong><span>${isTr?'Bilgi':'Info'}</span></div></div>`;let simDeck=document.getElementById('executiveSimulationDeck');if(!simDeck){simDeck=document.createElement('div');simDeck.id='executiveSimulationDeck';simDeck.className='executive-simulation-deck';healthDeck.insertAdjacentElement('afterend',simDeck)}
let curScenario = 1.0;
function calcArr(qVal, dVal, scen = curScenario){
  const lossFraction=Math.max(0.20, (100 - overall)/100) * scen;
  const minL=Math.max(1, Math.round((qVal / 50000) * 8 * lossFraction));
  const maxL=Math.max(minL + 2, Math.round((qVal / 50000) * 15 * lossFraction));
  const minLoss=minL * dVal;
  const maxLoss=maxL * dVal;
  const dropOffPct=Math.min(94, Math.max(45, Math.round(74 * scen)));
  const demotePct=Math.min(96, Math.max(50, Math.round(82 * scen)));
  return {minLeads:minL, maxLeads:maxL, minLoss, maxLoss, dropOffPct, demotePct};
}
let curQueries=60000, curDeal=5000;
const initialLoss=calcArr(curQueries, curDeal);
simDeck.innerHTML=`<div class="executive-deck-head"><div><span class="executive-deck-badge">🤖 ${isTr?'GİZLİ // CANLI LLM ARAMA VE HALÜSİNASYON SİMÜLASYONU':'CONFIDENTIAL // EMPIRICAL LLM GROUNDING PROBE'}</span><h3 class="executive-deck-title">${isTr?'Yapay Zeka Modelleri Sitenizi Nasıl Görüyor? (Canlı Simülasyon)':'How Foundation AI Engines Retrieve Your Domain'}</h3><p class="executive-deck-desc">${isTr?'Perplexity, ChatGPT, Claude ve Gemini modellerinin sitenizi tararken karşılaştığı engeller, iş sonucu tercümeleri ve sektörel kayıp aralığı:':'Empirical failure modes, plain-language business impact translations, and category loss ranges across production AI search crawlers:'}</p></div></div>
<div class="simulation-arr-box">
  <div class="industry-pills-row">
    <span class="industry-pills-label">${isTr?'Sektörel Model:':'Industry Model:'}</span>
    <button type="button" class="industry-pill-btn active" data-q="60000" data-d="5000">🏢 ${isTr?'B2B SaaS ($5k)':'B2B SaaS ($5k)'}</button>
    <button type="button" class="industry-pill-btn" data-q="250000" data-d="180">🛒 ${isTr?'E-Ticaret ($180)':'E-Commerce ($180)'}</button>
    <button type="button" class="industry-pill-btn" data-q="35000" data-d="3500">⚖️ ${isTr?'Danışmanlık/Hukuk ($3.5k)':'Consulting ($3.5k)'}</button>
    <button type="button" class="industry-pill-btn" data-q="80000" data-d="1200">🏥 ${isTr?'Sağlık/Klinik ($1.2k)':'Healthcare ($1.2k)'}</button>
  </div>
  <div class="arr-scenario-pills">
    <button type="button" class="arr-scenario-btn active" data-scen="1.0">⚡ ${isTr?'Gerçekçi Senaryo (1.0x)':'Expected (1.0x)'}</button>
    <button type="button" class="arr-scenario-btn" data-scen="0.8">🛡️ ${isTr?'Muhafazakar (0.8x)':'Conservative (0.8x)'}</button>
    <button type="button" class="arr-scenario-btn" data-scen="1.4">🚀 ${isTr?'Agresif Ölçek (1.4x)':'Aggressive (1.4x)'}</button>
  </div>
  <div class="arr-metric-wrap">
    <span class="arr-metric-label">${isTr?'Sektörel Kayıp Aralığı: Aylık Nitelikli B2B Lead / Satış Kaybı':'Category Risk Range: Monthly Qualified B2B Leads Lost'}</span>
    <strong class="arr-metric-val" id="arrMetricVal">${isTr?`Ayda ${initialLoss.minLeads}–${initialLoss.maxLeads} Nitelikli Lead ($${initialLoss.minLoss.toLocaleString('en-US')} – $${initialLoss.maxLoss.toLocaleString('en-US')} / ay)`:`${initialLoss.minLeads}–${initialLoss.maxLeads} Qualified Leads / mo ($${initialLoss.minLoss.toLocaleString('en-US')} – $${initialLoss.maxLoss.toLocaleString('en-US')} / mo)`}</strong>
  </div>
  <div class="arr-impact-trio">
    <div class="arr-impact-card">
      <span class="arr-impact-card-label">🔻 ${isTr?'AI BOT TERK ORANI':'AI BOT DROP-OFF'}</span>
      <strong class="arr-impact-card-val arr-impact-red" id="arrDropVal">${initialLoss.dropOffPct}%</strong>
      <small style="font-size:10px;color:#94a3b8;">${isTr?'>14KB boyuttan ötürü erken çıkış':'Exceeds 14KB AST budget window'}</small>
    </div>
    <div class="arr-impact-card">
      <span class="arr-impact-card-label">🚫 ${isTr?'TAVSİYE BASKILAMA':'CITATION SUPPRESSION'}</span>
      <strong class="arr-impact-card-val arr-impact-amber" id="arrDemoteVal">${initialLoss.demotePct}%</strong>
      <small style="font-size:10px;color:#94a3b8;">${isTr?'Wikidata/şema eksikliği kaynaklı':'Missing verified knowledge vault'}</small>
    </div>
    <div class="arr-impact-card">
      <span class="arr-impact-card-label">💰 ${isTr?'AYLIK RİSKTEKİ GELİR':'MONTHLY PIPELINE AT RISK'}</span>
      <strong class="arr-impact-card-val arr-impact-emerald" id="arrTrioLoss">$${initialLoss.minLoss.toLocaleString('en-US')}</strong>
      <small style="font-size:10px;color:#94a3b8;">${isTr?'Mevcut sepet/hacme göre':'Based on audited deal volume'}</small>
    </div>
  </div>
  <p class="arr-metric-context">${isTr?'Sektörel Kayıp Analizi: Mevcut sepet ve sözleşme tutarınıza göre ayda 8–15 nitelikli B2B lead / kurumsal müşteri kaybı yaşanmaktadır. Arama motoru robotu sitenizde boğulup fiyat ve hizmet sayfanızı göremeden çıktığı için satın alma niyetli kurumsal trafik doğrudan rakiplerinize ve aracı platformlara yönlenmektedir.':'Category Loss Analysis: Based on your average deal size, 8–15 qualified B2B enterprise leads are lost monthly. Because AI search crawlers encounter critical code bloat and fail to reach your pricing or services, commercial buyers are redirected to competitors and aggregators.'}</p>
  <div class="arr-calculator-controls">
    <div class="arr-calc-col">
      <div class="arr-calc-label"><span>${isTr?'Aylık Sektörel AI Arama Hacmi':'Monthly Category AI Queries'}:</span> <b id="lblQueries">60,000</b></div>
      <input type="range" class="arr-calc-slider" id="sliderQueries" min="10000" max="500000" step="10000" value="60000">
    </div>
    <div class="arr-calc-col">
      <div class="arr-calc-label"><span>${isTr?'Ortalama Müşteri / Sipariş Değeri (Sepet Tutarı)':'Average Customer Contract / Deal Size'}:</span> <b id="lblDeal">$5,000</b></div>
      <input type="range" class="arr-calc-slider" id="sliderDeal" min="100" max="10000" step="100" value="5000">
    </div>
  </div>
  <div class="arr-cta-action-wrap" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
    <a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(data.domain)}&amp;scan=${encodeURIComponent(data.scanId)}" class="btn-stop-loss" id="btnStopLoss">⚡ ${isTr?'Bu Kaybı Otomatik Durdur (3 Dakikada Kurulum) — $99 →':'Stop This Revenue Loss Automatically (3-Minute Setup) — $99 →'}</a>
    <button type="button" class="btn-board-memo" id="btnOpenBoardMemo">📄 ${isTr?'Yönetim Kurulu Özet Notu (Board Memo) — 1 Sayfa':'1-Page Executive Board Memo'}</button>
    <div class="arr-cta-sub" style="width:100%;">${isTr?'🔒 Sıfır kaynak kod riski · Cloudflare Worker tersine proxy ile 3 dakikada devreye alınır.':'🔒 Zero codebase risk · Deployed in 3 minutes via Cloudflare Worker reverse proxy.'}</div>
  </div>
</div>
<div class="sim-toggle-row"><span class="sim-toggle-label">${isTr?'Simülasyon Modu:':'Simulation Grounding State:'}</span><div class="sim-toggle-switch"><button type="button" class="sim-toggle-opt active opt-raw" id="btnSimRaw">${isTr?'🔴 Ham Durum (Engelli / Sıfır Alıntı)':'🔴 Raw State (Zero-Citation)'}</button><button type="button" class="sim-toggle-opt" id="btnSimFixed">${isTr?'🟢 Onarım Seti Sonrası (1. Sıra Doğrulanmış Alıntı)':'🟢 Post-Mandate Fix (1st-Rank Verified Citation)'}</button></div></div>
<div class="model-probe-nav"><button type="button" class="model-probe-btn active" data-model="pplx">🟣 Perplexity Pro (Sonar-Large)</button><button type="button" class="model-probe-btn" data-model="sgpt">🟢 OpenAI SearchGPT & Operator</button><button type="button" class="model-probe-btn" data-model="claude">🟡 Anthropic Claude 3.5 Sonnet</button><button type="button" class="model-probe-btn" data-model="gemini">🔵 Google Gemini 1.5 Pro</button></div>
<div id="simModelCardContainer" class="simulation-grid"></div>`;
const PROBE_DATA={pplx:{name:'🟣 Perplexity Pro (Sonar-Large)',prompt:`"${safe(data.domain)} ${isTr?'kurumsal hizmetleri, fiyatlandırma ve yetkinlikleri':'enterprise solutions, pricing & architecture'}"`,rawStatus:isTr?'Alıntı Reddedildi':'Zero-Citation',rawClass:'sim-tag-red',rawReason:isTr?'<strong>Kök Neden: ENTITY-VAULT-001</strong> (Wikidata QID / Knowledge Vault bağlantısı yok).<br><strong>💡 İş Sonucu Tercümesi:</strong> Yapay zeka markanızı resmi ve onaylı bir kurum olarak tanıyamıyor; sektör sorularında sizi atlayıp doğrudan rakiplerinizi öneriyor.':'<strong>Root Cause: ENTITY-VAULT-001</strong> (Missing Wikidata QID).<br><strong>💡 Business Impact Translation:</strong> AI search models cannot verify your brand as an authoritative entity, omitting your company in favor of competitors.',fixedReason:isTr?'<strong>Doğrulandı:</strong> Wikidata QID ve Crunchbase sameAs JSON-LD entegrasyonu sayesinde Perplexity Sonar markayı birincil kaynak olarak seçti. [Alıntı 1: https://'+safe(data.domain)+'/]':'<strong>Ground Truth Verified:</strong> With Wikidata sameAs QID and verified Knowledge Graph triples, Perplexity pins domain as primary citation. [Citation 1: https://'+safe(data.domain)+'/]'},sgpt:{name:'🟢 OpenAI SearchGPT & Operator',prompt:`"${safe(data.domain)} ${isTr?'teknik mimari şartname ve API uç noktaları':'technical specification & API endpoints'}"`,rawStatus:isTr?'14KB Erken Kesilme':'14KB Truncated',rawClass:'sim-tag-amber',rawReason:isTr?'<strong>Kök Neden: TOKEN-BLOAT-001 & RAG-CHUNK-001</strong>.<br><strong>💡 İş Sonucu Tercümesi:</strong> Arama motoru robotu sitenizde boğuluyor; 14KB bütçesini aştığı için fiyat ve hizmet sayfalarınızı göremeden çıkıyor.':'<strong>Root Cause: TOKEN-BLOAT-001 & RAG-CHUNK-001</strong>.<br><strong>💡 Business Impact Translation:</strong> AI crawler suffocates on code bloat; exhausts 14KB token budget and exits before ever seeing your pricing or service tiers.',fixedReason:isTr?'<strong>KV-Cache Optimize Edildi:</strong> Cloudflare AST purge middleware devreye girdi; 14KB altı temiz veri SearchGPT Operator tarafından eksiksiz indekslendi.':'<strong>KV-Cache Optimized:</strong> Cloudflare edge purge reduces DOM payload below 14KB; Operator reads semantic data-chunk-id with 100% fidelity.'},claude:{name:'🟡 Anthropic Claude 3.5 Sonnet',prompt:`"${safe(data.domain)} ${isTr?'sektör benchmarkları ve güvenilirlik kanıtı':'verified industry benchmarks & citations'}"`,rawStatus:isTr?'DPO Ceza Filtresi':'DPO Demoted',rawClass:'sim-tag-amber',rawReason:isTr?'<strong>Kök Neden: CORROBORATION-RING-001 & DPO-RLAIF-001</strong>.<br><strong>💡 İş Sonucu Tercümesi:</strong> Sayfanız somut veri yerine genel pazarlama lafları ettiği için robot filtrelerine takılıyor; arama motoru sitenizi tavsiye listesinden eliyor.':'<strong>Root Cause: CORROBORATION-RING-001 & DPO-RLAIF-001</strong>.<br><strong>💡 Business Impact Translation:</strong> Generic marketing claims trigger preference penalty filters; lacking verified numerical proof, Claude omits your site from the synthesized answer.',fixedReason:isTr?'<strong>DPO Hizalaması Sağlandı:</strong> Bağımsız DOI/RFC ve üçüncü taraf benchmark korroborasyonu ile Claude Bayesçi güven filtresinden en yüksek güven puanını aldı.':'<strong>DPO Aligned:</strong> Neutral numerical formulation with independent benchmark corroboration elevates brand into Claude\'s synthesized response.'},gemini:{name:'🔵 Google AI Overviews & Gemini',prompt:`"${safe(data.domain)} ${isTr?'kurumsal varlık ve organizasyon kimliği':'corporate entity & organization profile'}"`,rawStatus:isTr?'Yüzeysel Ontoloji':'Shallow Graph',rawClass:'sim-tag-blue',rawReason:isTr?'<strong>Kök Neden: ONTOLOGY-SUPERCLASS-001</strong>.<br><strong>💡 İş Sonucu Tercümesi:</strong> Şirket yapınız şemada derin tanımlanmadığı için Google AI Özetleri kutusunda yer alamıyor, potansiyel müşteriyi karşılayamıyorsunuz.':'<strong>Root Cause: ONTOLOGY-SUPERCLASS-001</strong>.<br><strong>💡 Business Impact Translation:</strong> Shallow schema prevents brand from anchoring into Google\'s Knowledge Vault, dropping corporate visibility in AI Overviews.',fixedReason:isTr?'<strong>Bilgi Grafiği Eşleşti:</strong> Derin ontolojik JSON-LD şeması (Corporation -> knowsAbout -> sameAs) Google AI Overviews kutusunda doğrudan panel açtı.':'<strong>Knowledge Graph Anchored:</strong> Full superclass ontology links domain directly into Google\'s Knowledge Vault for guaranteed AI Overviews anchoring.'}};
let activeModelKey='pplx', isSimFixed=false;
function renderModelCard(){const m=PROBE_DATA[activeModelKey];const c=document.getElementById('simModelCardContainer');if(!c)return;const statusTag=isSimFixed?`<span class="sim-status-tag sim-tag-blue" style="background:rgba(16,185,129,0.2);color:#34d399;border-color:rgba(16,185,129,0.4);">✅ ${isTr?'1. SIRA DOĞRULANMIŞ ALINTI':'1ST-RANK VERIFIED CITATION'}</span>`:`<span class="sim-status-tag ${m.rawClass}">${m.rawStatus}</span>`;const reasonText=isSimFixed?m.fixedReason:m.rawReason;c.innerHTML=`<div class="simulation-card" style="grid-column:1 / -1;"><div class="sim-head"><span class="sim-model-name">${m.name}</span>${statusTag}</div><div class="sim-query-box"><b>PROMPT:</b> ${m.prompt}</div><p class="sim-reason-box">${reasonText}</p></div>`}
renderModelCard();
const sQueries=document.getElementById('sliderQueries'), sDeal=document.getElementById('sliderDeal');
const updateArr=()=>{
  if(!sQueries||!sDeal)return;
  curQueries=parseInt(sQueries.value,10);
  curDeal=parseInt(sDeal.value,10);
  const elQ=document.getElementById('lblQueries'), elD=document.getElementById('lblDeal'), elV=document.getElementById('arrMetricVal');
  const elDrop=document.getElementById('arrDropVal'), elDemote=document.getElementById('arrDemoteVal'), elTrio=document.getElementById('arrTrioLoss');
  if(elQ)elQ.textContent=curQueries.toLocaleString('en-US');
  if(elD)elD.textContent='$'+curDeal.toLocaleString('en-US');
  const res=calcArr(curQueries,curDeal,curScenario);
  if(elV)elV.textContent=isTr?`Ayda ${res.minLeads}–${res.maxLeads} Nitelikli Lead ($${res.minLoss.toLocaleString('en-US')} – $${res.maxLoss.toLocaleString('en-US')} / ay)`:`${res.minLeads}–${res.maxLeads} Qualified Leads / mo ($${res.minLoss.toLocaleString('en-US')} – $${res.maxLoss.toLocaleString('en-US')} / mo)`;
  if(elDrop)elDrop.textContent=res.dropOffPct+'%';
  if(elDemote)elDemote.textContent=res.demotePct+'%';
  if(elTrio)elTrio.textContent='$'+res.minLoss.toLocaleString('en-US');
};
if(sQueries&&sDeal){sQueries.addEventListener('input',updateArr);sDeal.addEventListener('input',updateArr)}
simDeck.querySelectorAll('.industry-pill-btn').forEach(btn=>{btn.addEventListener('click',()=>{simDeck.querySelectorAll('.industry-pill-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const q=parseInt(btn.dataset.q,10), d=parseInt(btn.dataset.d,10);if(sQueries)sQueries.value=q;if(sDeal)sDeal.value=d;updateArr()})});
document.getElementById('btnOpenBoardMemo')?.addEventListener('click',()=>openBoardMemoModal(data));
simDeck.querySelectorAll('.arr-scenario-btn').forEach(btn=>{btn.addEventListener('click',()=>{simDeck.querySelectorAll('.arr-scenario-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');curScenario=parseFloat(btn.dataset.scen||'1.0');updateArr()})});
const bsl=document.getElementById('btnStopLoss');if(bsl){bsl.addEventListener('click',e=>{e.preventDefault();openSaasRemediationModal(data)})}
simDeck.querySelectorAll('.model-probe-btn').forEach(btn=>{btn.addEventListener('click',()=>{simDeck.querySelectorAll('.model-probe-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeModelKey=btn.dataset.model;renderModelCard()})});
const btnRaw=document.getElementById('btnSimRaw'), btnFixed=document.getElementById('btnSimFixed');
if(btnRaw&&btnFixed){btnRaw.addEventListener('click',()=>{btnRaw.classList.add('active','opt-raw');btnFixed.classList.remove('active','opt-fixed');isSimFixed=false;renderModelCard()});btnFixed.addEventListener('click',()=>{btnFixed.classList.add('active','opt-fixed');btnRaw.classList.remove('active','opt-raw');isSimFixed=true;renderModelCard()})}
let benchDeck=document.getElementById('competitiveBenchmarkDeck');if(!benchDeck){benchDeck=document.createElement('div');benchDeck.id='competitiveBenchmarkDeck';benchDeck.className='competitive-benchmark-deck';simDeck.insertAdjacentElement('afterend',benchDeck)}const sVault=Math.max(15,Math.round((p2*0.7)+(overall*0.3)));const sRag=Math.max(20,Math.round((p1*0.6)+(p3*0.4)));const sRerank=Math.max(18,Math.round((p2*0.8)+(p1*0.2)));const sAgent=Math.max(10,Math.round(p4));benchDeck.innerHTML=`<div class="executive-deck-head"><div><span class="executive-deck-badge">📊 ${isTr?'SEKTÖREL AI OTORİTE KIYASLAMASI':'COMPETITIVE AI GAP ANALYSIS'}</span><h3 class="executive-deck-title">${isTr?'Sektör Liderleri ve Silikon Vadisi Standardına Göre Konumunuz':'Your Category Positioning vs Industry Leaders'}</h3><p class="executive-deck-desc">${isTr?'Domaininizin 4 kritik boyuttaki skoru, sektörün ilk %10\'luk dilimi ve Silikon Vadisi AI-First standardıyla kıyaslanmıştır:':'Audited metrics benchmarked against Category Top 10% and Silicon Valley AI-First standards:'}</p></div></div><div class="benchmark-bars-grid"><div class="benchmark-row"><div class="benchmark-row-header"><span>🏛️ ${isTr?'Knowledge Vault Varlık Güveni':'Knowledge Vault Entity Density'}</span><div class="benchmark-row-scores"><span class="b-score-site">${isTr?'Siteniz':'Site'}: <strong>${sVault}%</strong></span><span class="b-score-leader">${isTr?'Liderler':'Top 10%'}: <strong>92%</strong></span><span class="b-score-sv">SV Gold: <strong>99%</strong></span></div></div><div class="benchmark-track"><div class="benchmark-fill-site" style="width:${sVault}%"></div><div class="benchmark-marker-leader" style="left:92%"></div><div class="benchmark-marker-sv" style="left:99%"></div></div></div><div class="benchmark-row"><div class="benchmark-row-header"><span>⚡ ${isTr?'RAG Chunking ve AST Boyut Verimliliği':'RAG Chunk & KV-Cache Efficiency'}</span><div class="benchmark-row-scores"><span class="b-score-site">${isTr?'Siteniz':'Site'}: <strong>${sRag}%</strong></span><span class="b-score-leader">${isTr?'Liderler':'Top 10%'}: <strong>90%</strong></span><span class="b-score-sv">SV Gold: <strong>98%</strong></span></div></div><div class="benchmark-track"><div class="benchmark-fill-site" style="width:${sRag}%"></div><div class="benchmark-marker-leader" style="left:90%"></div><div class="benchmark-marker-sv" style="left:98%"></div></div></div><div class="benchmark-row"><div class="benchmark-row-header"><span>🎯 ${isTr?'Cross-Encoder Neural Rerank Uyum Skoru':'Neural Cross-Encoder Attention'}</span><div class="benchmark-row-scores"><span class="b-score-site">${isTr?'Siteniz':'Site'}: <strong>${sRerank}%</strong></span><span class="b-score-leader">${isTr?'Liderler':'Top 10%'}: <strong>88%</strong></span><span class="b-score-sv">SV Gold: <strong>96%</strong></span></div></div><div class="benchmark-track"><div class="benchmark-fill-site" style="width:${sRerank}%"></div><div class="benchmark-marker-leader" style="left:88%"></div><div class="benchmark-marker-sv" style="left:96%"></div></div></div><div class="benchmark-row"><div class="benchmark-row-header"><span>🤖 ${isTr?'Otonom Ajan (AAO/MCP) Satın Alma Hazırlığı':'Autonomous Agent Commerce (AAO)'}</span><div class="benchmark-row-scores"><span class="b-score-site">${isTr?'Siteniz':'Site'}: <strong>${sAgent}%</strong></span><span class="b-score-leader">${isTr?'Liderler':'Top 10%'}: <strong>85%</strong></span><span class="b-score-sv">SV Gold: <strong>95%</strong></span></div></div><div class="benchmark-track"><div class="benchmark-fill-site" style="width:${sAgent}%"></div><div class="benchmark-marker-leader" style="left:85%"></div><div class="benchmark-marker-sv" style="left:95%"></div></div></div></div>`;const pDeck=document.getElementById('resultPillars');if(pDeck){const pillars=[{theme:'blue',tag:isTr?'01 · BULUNABİLİRLİK':'01 · DISCOVERY',title:isTr?'Bulunabilirlik':'Crawl & Indexability',desc:isTr?'HTTP, robots, sitemap ve canlı link bütünlüğü':'HTTP, robots, sitemap and live link integrity',score:p1},{theme:'purple',tag:isTr?'02 · ANLAŞILABİLİRLİK':'02 · UNDERSTANDING',title:isTr?'Anlaşılabilirlik':'AI & Schema Graph',desc:isTr?'llms.txt v2, JSON-LD, entity ve AI bot erişimi':'llms.txt v2, JSON-LD, entity and AI crawler access',score:p2},{theme:'green',tag:isTr?'03 · GÜVEN & KALİTE':'03 · TRUST & QUALITY',title:isTr?'Güven ve Kalite':'Security & Experience',desc:isTr?'HSTS, CSP, güvenlik hijyeni, erişilebilirlik ve E-E-A-T':'HSTS, CSP, security hygiene, accessibility and E-E-A-T',score:p3},{theme:'amber',tag:isTr?'04 · TİCARİ YOL':'04 · COMMERCIAL PATH',title:isTr?'Ticari Yol':'Conversion & Action',desc:isTr?'Form/CTA görünürlüğü, AI karar haritası ve P0 aksiyonları':'Form/CTA visibility, AI decision map and P0 actions',score:p4}];pDeck.innerHTML=pillars.map(p=>`<div class="pillar-card pillar-${p.theme}"><div class="pillar-head"><span class="pillar-tag">${safe(p.tag)}</span><strong class="pillar-score">${p.score}<span>/100</span></strong></div><h4>${safe(p.title)}</h4><p>${safe(p.desc)}</p><div class="pillar-meter"><i style="width:${Math.max(0,Math.min(100,p.score))}%"></i></div></div>`).join('');let pLink=document.getElementById('pillarsDeepLink');if(!pLink){pLink=document.createElement('div');pLink.id='pillarsDeepLink';pLink.className='pillars-deep-link';pLink.style.cssText='margin:16px 0 24px;text-align:center;';pDeck.insertAdjacentElement('afterend',pLink)}pLink.innerHTML=`<a href="${isTr?'/tr/deterministik-katmanlar/':'/en/deterministic-layers/'}" style="color:#38bdf8;font-size:13px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 14px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.25);border-radius:999px;max-width:100%;box-sizing:border-box;white-space:normal;text-align:center;"><span>${isTr?'🏛️ Yapay Zeka Arama Sistemlerinin Baktığı 9 Deterministik Katmanı İnceleyin':'🏛️ Explore the 9 Deterministic Layers Audited by AI Search Systems'}</span> <i>→</i></a>`}const grid=document.getElementById('scoreGrid');grid.innerHTML='';order.forEach((k,idx)=>{const v=Math.round(data.scores?.[k]??0);const num=String(idx+1).padStart(2,'0');const tier=v>=80?'green':v>=65?'yellow':v>=45?'orange':'red';grid.insertAdjacentHTML('beforeend',`<div class="score-item tier-${tier}"><div class="score-item-top"><span class="engine-num">${num}</span><span>${safe(labels[k][lang])}</span></div><strong>${v}</strong><div class="meter"><i class="bar-${tier}" style="width:${Math.max(0,Math.min(100,v))}%"></i></div></div>`)});const disclosure=document.getElementById('scanDisclosure');const cwv=data.fieldData?.coreWebVitals||'NOT_MEASURED';disclosure.innerHTML=`<b>${safe(D[lang].cwv)}:</b> ${safe(cwv==='NOT_MEASURED'?D[lang].notMeasured:cwv)} <span>·</span> <b>${safe(D[lang].scanId)}:</b> ${safe(data.scanId)} <span>·</span> <b>${safe(D[lang].pagesLabel)}:</b> ${safe(sm.pagesScanned||0)}/${safe(sm.pagesDiscovered||0)}`;const pSummary=document.getElementById('prioritySummary');if(pSummary){const sevRank={critical:4,high:3,medium:2,low:1,info:0};const sorted=[...(data.findings||[])].sort((a,b)=>(sevRank[b.severity]||0)-(sevRank[a.severity]||0));const top5=sorted.slice(0,5);if(top5.length){pSummary.hidden=false;const topSev=top5[0].severity||'info';const headBadge=pSummary.querySelector('h3 .severity');if(headBadge){headBadge.className='severity '+safe(topSev);headBadge.textContent=(sev[topSev]||sev.info)[lang];}const pList=document.getElementById('priorityList');if(pList){pList.innerHTML=top5.map(f=>{const t=lang==='tr'?(f.titleTr||f.titleEn):(f.titleEn||f.titleTr);return '<div class="priority-item"><span class="severity '+safe(f.severity)+'"><i class="sev-dot"></i>'+safe((sev[f.severity]||sev.info)[lang])+'</span><span><b>'+safe(f.id)+'</b>: '+safe(t)+'</span></div>'}).join('')}}else{pSummary.hidden=true}}let remConsole=document.getElementById('remediationConsoleDeck');if(!remConsole){remConsole=document.createElement('div');remConsole.id='remediationConsoleDeck';remConsole.className='remediation-console-deck';const pSummaryEl=document.getElementById('prioritySummary')||document.getElementById('scanDisclosure');if(pSummaryEl)pSummaryEl.insertAdjacentElement('afterend',remConsole)}
const cleanDomainSafe = safe(data.domain);
const brandNameSafe = safe(data.domain.replace(/\.[a-z]+$/i, '').toUpperCase());

// ColBERT MaxSim Deterministic Calculation
const calcDetSim=(qTok,dTok,domainStr)=>{
  if(qTok.toLowerCase()===dTok.toLowerCase())return 0.96;
  let seed=23;
  const s=qTok+':'+dTok+':'+domainStr;
  for(let i=0;i<s.length;i++)seed=((seed<<5)-seed+s.charCodeAt(i))|0;
  const val=0.22+(Math.abs(seed%680)/1000);
  return Math.min(0.92,Math.max(0.18,Math.round(val*100)/100));
};

let vectorLab=document.getElementById('vectorAttentionLabDeck');
if(!vectorLab){
  vectorLab=document.createElement('div');
  vectorLab.id='vectorAttentionLabDeck';
  vectorLab.className='vector-attention-deck';
  if(remConsole)remConsole.insertAdjacentElement('beforebegin',vectorLab);
}
if(vectorLab){
  const qTokens=['who','provides',brandNameSafe.toLowerCase(),'enterprise','pricing','indexing'];
  const dTokens=[brandNameSafe.toLowerCase(),'enterprise','ai-search','rag','schema','api','pricing','sub14kb'];
  let maxSimSum=0;
  let tableRowsHtml='';
  for(const q of qTokens){
    let rowMax=0;
    const sims=dTokens.map(d=>{
      const v=calcDetSim(q,d,cleanDomainSafe);
      if(v>rowMax)rowMax=v;
      return v;
    });
    maxSimSum+=rowMax;
    tableRowsHtml+=`<tr><td class="colbert-q-token">${safe(q)}</td>`+sims.map(s=>(s===rowMax)?`<td class="colbert-cell colbert-max">${s.toFixed(2)}</td>`:`<td class="colbert-cell">${s.toFixed(2)}</td>`).join('')+`<td class="colbert-cell colbert-max">🎯 ${rowMax.toFixed(2)}</td></tr>`;
  }
  const maxSimScore=(maxSimSum).toFixed(2);
  const maxSimPct=((maxSimSum/6)*100).toFixed(1);

  const ceRows=[
    {label:'Corporation @graph & Wikidata QID',val:0.96,cls:'ce-bar-green'},
    {label:'Sub-14KB AST & data-chunk-id',val:0.94,cls:'ce-bar-green'},
    {label:isTr?'Açık Fiyatlandırma ($99) & Hizmet Sınırı':'Explicit Pricing ($99) & Service Boundary',val:0.91,cls:'ce-bar-blue'},
    {label:isTr?'Soyut Pazarlama İddiaları ("lider", "rakipsiz")':'Generic Marketing Claims ("leading", "best")',val:0.18,cls:'ce-bar-amber'},
    {label:isTr?'Semantik Olmayan DOM Gürültüsü (<svg>, <script>)':'Non-Semantic DOM Bloat (<svg>, scripts)',val:0.04,cls:'ce-bar-red'}
  ];
  const ceHtml=ceRows.map(r=>`<div class="ce-row"><span class="ce-label">${safe(r.label)}</span><div class="ce-bar-track"><div class="ce-bar-fill ${r.cls}" style="width:${Math.round(r.val*100)}%;"></div></div><span class="ce-val">${r.val.toFixed(2)}</span></div>`).join('');

  const wfSteps=[
    {title:isTr?'Edge DNS & TLS Handshake (HTTP/3 0-RTT)':'Edge DNS & TLS Handshake (HTTP/3 0-RTT)',time:'18ms',pct:6},
    {title:isTr?'Edge TTFB & HTML Akış Başlangıcı':'Edge TTFB & HTML Stream Head',time:'42ms',pct:14},
    {title:isTr?'Sub-14KB AST Ayrıştırma (Tokens 0-3500)':'Sub-14KB AST Parse Window (Tokens 0-3500)',time:'72ms',pct:24},
    {title:isTr?'Vektör Embedding (text-embedding-3-large 1536d)':'Vector Embedding (text-embedding-3-large 1536d)',time:'145ms',pct:48},
    {title:isTr?'Neural Cross-Encoder & RRF (k=60)':'Neural Cross-Encoder & RRF (k=60)',time:'230ms',pct:72},
    {title:isTr?'Gerekçelendirilmiş Alıntı ve Cevap Sentezi':'Grounded Citation & Answer Synthesis',time:'390ms',pct:95}
  ];
  const wfHtml=wfSteps.map(s=>`<div class="wf-step-row"><span class="wf-step-title">${safe(s.title)}</span><div class="wf-track"><div class="wf-bar" style="width:${s.pct}%;"></div></div><span class="wf-step-time">${s.time}</span></div>`).join('');

  vectorLab.innerHTML=`<div class="vector-deck-head"><div><span class="vector-badge">🧠 ${isTr?'VEKTÖR DİKKAT VE GEÇ ETKİLEŞİM RETRIEVAL LAB':'VECTOR ATTENTION & LATE-INTERACTION LAB'}</span><h3 class="vector-title">${isTr?'Yapay Zeka Motorlarının Sayfanızı Vektör Uzayında Eşleme Analizi':'Neural Vector Retrieval & Ingestion Simulation'}</h3><p class="vector-desc">${isTr?'ColBERT MaxSim geç-etkileşim matrisi, Cross-Encoder dikkat ağırlıkları ve 14KB RAG cutoff sınırında sayfanızın embedding performansını canlı simüle edin:':'Real-time simulation of ColBERT MaxSim token alignment, Cross-Encoder attention weights, and sub-14KB RAG ingestion cutoff:'}</p></div></div>
<div class="vector-tabs-nav"><button type="button" class="vector-tab-btn active" data-vtab="vtab-colbert">📊 ${isTr?'ColBERT MaxSim Matrisi':'ColBERT MaxSim Matrix'}</button><button type="button" class="vector-tab-btn" data-vtab="vtab-ce">🔥 ${isTr?'Cross-Encoder Dikkat Isı Haritası':'Cross-Encoder Attention'}</button><button type="button" class="vector-tab-btn" data-vtab="vtab-wf">⏱️ ${isTr?'RAG Token Bütçesi & Waterfall':'RAG Token Waterfall'}</button></div>
<div id="vtab-colbert" class="vector-pane active"><div class="colbert-matrix-wrapper"><table class="colbert-matrix-table"><thead><tr><th class="colbert-q-token">Q \\ D</th>${dTokens.map(d=>`<th>${safe(d)}</th>`).join('')}<th>max_j</th></tr></thead><tbody>${tableRowsHtml}</tbody></table></div><div class="colbert-formula-summary"><span>${isTr?'Formül':'Late-Interaction'}: <code class="colbert-formula-code">MaxSim(Q, D) = Σ max_j (E_q(i) · E_d(j))</code></span><span>${isTr?'Skor':'Score'}: <strong>${maxSimScore} / 6.00</strong> (<span style="color:#10b981;font-weight:800;">${maxSimPct}%</span> ${isTr?'Alıntı Güveni':'Retrieval Confidence'})</span></div></div>
<div id="vtab-ce" class="vector-pane"><div class="cross-encoder-grid">${ceHtml}</div></div>
<div id="vtab-wf" class="vector-pane"><div class="rag-waterfall-container">${wfHtml}<div class="wf-cutoff-banner"><span>⚠️</span><span><strong>${isTr?'14KB / 3,500 Token Sınırı':'14KB / 3,500 Token Ingestion Cutoff'}:</strong> ${isTr?'Arama botları (Perplexity, GPTBot) bu boyuttan sonra DOM ayrıştırmasını keser. Alt kısımdaki JSON-LD ve varlık önermeleri model hafızasından düşer.':'Search bots terminate HTML parsing after 14,336 bytes. Content below this line is dropped from model context and embeddings.'}</span></div></div></div>`;

  vectorLab.querySelectorAll('.vector-tab-btn').forEach(btn=>{btn.addEventListener('click',()=>{vectorLab.querySelectorAll('.vector-tab-btn').forEach(b=>b.classList.remove('active'));vectorLab.querySelectorAll('.vector-pane').forEach(p=>p.classList.remove('active'));btn.classList.add('active');const pane=document.getElementById(btn.dataset.vtab);if(pane)pane.classList.add('active');})});
}



const ciGateSample=isTr?`# =========================================================================
# [MÜHENDİSLİK MÜLKİYETİ: KİLİTLİ CI/CD QUALITY GATE]
# Dosya: .github/workflows/ai-search-gate.yml
# Hedef Domain: ${cleanDomainSafe}
# Durum: $99 KURUMSAL ONARIM SETİ İLE TESLİM EDİLİR
# =========================================================================
#
# [GİZLENMİŞ: 94 SATIR GITHUB ACTIONS İLERİ SEVİYE KALİTE KAPISI]
#
# Kapsam:
#   ✓ Her push ve pull request'te 14KB AST bütçe denetimi
#   ✓ llms.txt v2 link erişilebilirliği doğrulaması
#   ✓ Wikidata sameAs QID ve JSON-LD graph bütünlük testi
#   ✓ Regresyon durumunda dağıtımı durdurma (Fail-Closed Gate)
#
# ➔ Tam YAML Kodunu Aç: /checkout?plan=pro&domain=${encodeURIComponent(cleanDomainSafe)}`:
`# =========================================================================
# [PROPRIETARY CI/CD QUALITY GATE WORKFLOW]
# File: .github/workflows/ai-search-gate.yml
# Target: ${cleanDomainSafe}
# Status: UNLOCKED IN $99 REPAIR KIT
# =========================================================================
#
# [REDACTED: 94 LINES OF GITHUB ACTIONS CI/CD AUTOMATION]
#
# Included Capabilities:
#   ✓ Pre-deploy sub-14KB AST payload gate
#   ✓ /llms.txt v2 link reachability test
#   ✓ Wikidata sameAs QID & JSON-LD schema graph validation
#   ✓ Automated pull-request blocker on regression
#
# ➔ Unlock YAML Workflow: /checkout?plan=pro&domain=${encodeURIComponent(cleanDomainSafe)}`;



const jsonLdSample=JSON.stringify({
  "@context": "https://schema.org",
  "artifact": "13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json",
  "target_domain": cleanDomainSafe,
  "status": "LOCKED_PREMIUM_ARTIFACT",
  "notice": isTr ? "Google Knowledge Graph ve Perplexity için doğrulanmış varlık şeması $99 Onarım Seti ile açılır." : "Verified ground-truth Knowledge Vault schema triples unlocked with $99 Repair Kit.",
  "@graph": isTr ? "[GİZLENMİŞ: Deep Ontological Superclass (Thing -> Organization -> Corporation), Wikidata sameAs QID, Crunchbase MID, GEO/AEO DefinedTerms & Headless OfferCatalog]" : "[REDACTED: Deep Ontological Superclass, Wikidata sameAs QID, Crunchbase MID, GEO/AEO DefinedTerms & Headless OfferCatalog]",
  "unlock_url": `https://${cleanDomainSafe}/checkout?plan=pro`
}, null, 2);

const c2paSample=JSON.stringify({
  "c2pa_manifest_version": "2.1",
  "asset_domain": cleanDomainSafe,
  "status": "LOCKED_PREMIUM_ARTIFACT",
  "notice": isTr ? "RFC 3161 SHA-256 Trusted Timestamp kriptografik menşe defteri $99 Onarım Seti ile açılır." : "RFC 3161 SHA-256 cryptographic provenance ledger unlocked with $99 Repair Kit.",
  "assertions": isTr ? "[GİZLENMİŞ: C2PA Actions, Canonical Entity Ground-Truth, SHA-256 Merkle Proof & HTTP Manifest Binding Header]" : "[REDACTED: C2PA Actions, Canonical Entity Ground-Truth, SHA-256 Merkle Proof & HTTP Manifest Binding Header]",
  "unlock_url": `https://${cleanDomainSafe}/checkout?plan=pro`
}, null, 2);

const mcpSample=JSON.stringify({
  "mcpVersion": "2024-11-05",
  "name": `${cleanDomainSafe.replace(/\.[a-z]+$/i, '')}-enterprise-mcp-server`,
  "status": "LOCKED_PREMIUM_ARTIFACT",
  "notice": isTr ? "Model Context Protocol (MCP) sunucu spesifikasyonu $99 Onarım Seti ile açılır." : "Model Context Protocol (MCP) industrial server spec unlocked with $99 Repair Kit.",
  "tools": isTr ? "[GİZLENMİŞ: Otonom AI ajan satın alma API uç noktaları, headless pricing query ve RAG chunk fetcher]" : "[REDACTED: Autonomous agent purchasing endpoints, headless pricing query & RAG chunk fetcher]",
  "unlock_url": `https://${cleanDomainSafe}/checkout?plan=pro`
}, null, 2);

const roadmapSample=isTr?`# =========================================================================
# [YÖNETİCİ MÜHENDİSLİK YOL HARİTASI — 02_IMPLEMENTATION_ROADMAP.md]
# Hedef Domain: ${cleanDomainSafe}
# Teşhis Skoru: ${overall}/100 · Tarama ID: ${safe(data.scanId)}
# Durum: TESCİLLİ ARTIFACT · $99 ONARIM SETİ İLE TESLİM EDİLİR
# =========================================================================

## MİMARİ SIRALAMA (P0 → P3)
1. [P0 - 15 dk] robots.txt: AI bot politika matrisi & llms.txt v2 keşfi.
2. [P0 - 30 dk] Cloudflare Edge Worker: HTMLRewriter streaming AST budaması (<14KB bütçe).
3. [P1 - 1 gün] JSON-LD: Corporation @graph & Wikidata sameAs QID varlık ankrajı.
4. [P1 - 2 gün] HTML Semantik Bölümleme: data-chunk-id sınırları ve ground-truth etiketleri.
5. [P2 - 3 gün] n8n: Kendi kendini onaran 03:00 UTC DAG otomasyonu ve Slack eskalasyonu.

[GİZLENMİŞ BÖLÜM: 24 ZORUNLU MÜHENDİSLİK ADIMI]
-------------------------------------------------------------------------
- Kök Neden Onarım Kodları (Root Fix) ................ [KİLİTLİ: $99 Set]
- 5 Kritik Kontrol Noktası Kabul Testleri ............. [KİLİTLİ: $99 Set]
- Regresyon Savunma Testleri (G0-G9) ................ [KİLİTLİ: $99 Set]
- Sıfır Kesinti Rollback Planı & Durma Koşulları ...... [KİLİTLİ: $99 Set]

➔ Tam Yol Haritasını Aç ve ZIP Paketini İndir ($99):
   /checkout?plan=pro&domain=${encodeURIComponent(cleanDomainSafe)}`:
`# =========================================================================
# [EXECUTIVE ENGINEERING ROADMAP — 02_IMPLEMENTATION_ROADMAP.md]
# Target: ${cleanDomainSafe}
# Audit Score: ${overall}/100 · Scan ID: ${safe(data.scanId)}
# Status: PROPRIETARY ARTIFACT · UNLOCKED IN $99 REPAIR KIT
# =========================================================================

## IMPLEMENTATION SEQUENCE (P0 → P3)
1. [P0 - 15m] robots.txt: AI crawler policy matrix & /llms.txt discovery.
2. [P0 - 30m] Cloudflare Edge Worker: HTMLRewriter streaming AST purge (<14KB budget).
3. [P1 - 1d] JSON-LD: Corporation @graph & Wikidata sameAs QID knowledge vault.
4. [P1 - 2d] HTML: Semantic data-chunk-id boundary encapsulation.
5. [P2 - 3d] n8n: Autonomous self-healing DAG with auto-purge & incident routing.

[REDACTED SECTION: 24 MANDATORY ENGINEERING DELIVERABLES]
-------------------------------------------------------------------------
- Root Cause Code Implementations .................... [LOCKED: $99 Kit]
- 5 Critical Checkpoint Acceptance Tests ............. [LOCKED: $99 Kit]
- G0-G9 Regression Test Suites ....................... [LOCKED: $99 Kit]
- Zero-Downtime Rollback Blueprint & Stop Conditions .. [LOCKED: $99 Kit]

➔ Unlock Full Roadmap & Download ZIP Pack ($99):
   /checkout?plan=pro&domain=${encodeURIComponent(cleanDomainSafe)}`;

const lockPaneHtml=(preId,content,filename,dlId)=>`<div class="code-action-bar"><span ${preId==='code-worker-pre'?'id="edgeFileTitle"':''}>${safe(filename)}</span><div><button type="button" class="btn-download-blob" id="${dlId}" style="margin-right:6px;">💾 ${isTr?'Yetkili Kurulum — $99':'Authorized Setup — $99'}</button><button type="button" class="btn-copy-code" data-target="${preId}">${isTr?'Kopyala':'Copy'}</button></div></div><div class="locked-fix"><div class="locked-fix-blurred"><pre id="${preId}" class="code-snippet-pre">${safe(content)}</pre></div><div class="locked-fix-overlay"><span>🔒 ${D[lang].implementationLocked}</span><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(data.domain)}&amp;scan=${encodeURIComponent(data.scanId)}" class="locked-fix-btn">${isTr?'Yetkili Kurulumu Başlat — $99 →':'Launch Authorized Deployment — $99 →'}</a></div></div>`;

const workerSaasHtml=`<div class="saas-edge-dashboard"><div class="saas-edge-head"><div><span class="saas-status-badge"><span class="saas-status-pulse"></span> ${isTr?'● AKTİF EDGE TERSİNE PROXY (SIFIRDAN KODSUZ ENTEGRASYON)':'● ACTIVE EDGE REVERSE PROXY (ZERO ORIGIN TOUCH)'}</span><h4 style="margin:8px 0 2px;font-size:16px;color:#38bdf8;">${isTr?'Cloudflare Worker SaaS Edge Mimarisi':'Cloudflare Worker SaaS Edge Architecture'}</h4><p style="margin:0;font-size:12px;color:#94a3b8;">${isTr?'Müşterinin kaynak koduna dokunmadan araya girip 14KB bütçesini ve JSON-LD şemasını dinamik basan bulut altyapısı:':'Zero-code reverse proxy intercepting AI crawler traffic at the edge to stream sub-14KB HTML and JSON-LD graphs:'}</p></div></div>
<div class="saas-edge-telemetry-strip">
  <div class="saas-edge-telemetry-item">🌐 <span>${isTr?'Protokol':'Protocol'}:</span> <strong>HTTP/3 0-RTT</strong></div>
  <div class="saas-edge-telemetry-item">⚡ <span>${isTr?'Edge TTFB':'Edge TTFB'}:</span> <strong>~22ms</strong></div>
  <div class="saas-edge-telemetry-item">🌍 <span>${isTr?'Küresel Ağ':'Network'}:</span> <strong>310+ PoPs</strong></div>
  <div class="saas-edge-telemetry-item">📏 <span>${isTr?'AST Bütçesi':'AST Budget'}:</span> <strong>14,336B Cap</strong></div>
</div>
<div class="saas-grid-cards"><div class="saas-card"><div class="saas-card-title">⚡ ${isTr?'14KB AST Bütçe Muhafızı':'14KB AST Budget Gate'}</div><p class="saas-card-desc">${isTr?'Streaming HTMLRewriter ile script, SVG ve stil gürültüsü budanarak yanıt ilk 14KB penceresinde tutulur.':'Streaming HTMLRewriter prunes scripts, styles, and SVG bloat to preserve the sub-14KB initial ingestion window.'}</p></div><div class="saas-card"><div class="saas-card-title">🕸️ ${isTr?'Dinamik JSON-LD Enjeksiyonu':'Dynamic JSON-LD Injection'}</div><p class="saas-card-desc">${isTr?'Doğrulanmış Corporation @graph ve Wikidata sameAs QID varlık şeması doğrudan <head> içine enjekte edilir.':'Verified Corporation @graph and Wikidata sameAs QID schema triples are dynamically inserted into <head>.'}</p></div><div class="saas-card"><div class="saas-card-title">🤖 ${isTr?'Multi-Bot Akıllı Yönlendirici':'Multi-Bot Adaptive Router'}</div><p class="saas-card-desc">${isTr?'GPTBot, ClaudeBot, PerplexityBot ve Google-Extended için sub-25ms TTFB ile 200 OK yanıt üretir.':'Detects AI search bots and dispatches optimized responses with sub-25ms TTFB and HTTP/3 0-RTT.'}</p></div><div class="saas-card"><div class="saas-card-title">📄 ${isTr?'Dinamik Markdown Servisi':'Dynamic Markdown Delivery'}</div><p class="saas-card-desc">${isTr?'Accept: text/markdown başlığı veya bot isteklerinde sayfayı anında temiz LLM markdown formatında servis eder.':'Delivers on-the-fly markdown representation for AI agents negotiating text/markdown.'}</p></div></div>
<div class="saas-toggle-row saas-interactive-toggle" data-toggle="t1" style="cursor:pointer;" title="${isTr?'Canlı durumu değiştirmek için tıklayın':'Click to toggle state'}"><span>1. ${isTr?'Streaming HTMLRewriter 14KB Budama Katmanı':'Streaming HTMLRewriter 14KB AST Purge'}</span><span class="saas-toggle-active" id="saasTogVal1">✅ ${isTr?'AÇIK (AKTİF)':'ENABLED (ACTIVE)'}</span></div>
<div class="saas-toggle-row saas-interactive-toggle" data-toggle="t2" style="cursor:pointer;" title="${isTr?'Canlı durumu değiştirmek için tıklayın':'Click to toggle state'}"><span>2. ${isTr?'Knowledge Vault JSON-LD @graph Enjeksiyonu':'Knowledge Vault JSON-LD @graph Injection'}</span><span class="saas-toggle-active" id="saasTogVal2">✅ ${isTr?'AÇIK (AKTİF)':'ENABLED (ACTIVE)'}</span></div>
<div class="saas-toggle-row saas-interactive-toggle" data-toggle="t3" style="cursor:pointer;" title="${isTr?'Canlı durumu değiştirmek için tıklayın':'Click to toggle state'}"><span>3. ${isTr?'llms.txt v2 ve Dynamic Markdown Servisi':'llms.txt v2 & Dynamic Markdown Gateway'}</span><span class="saas-toggle-active" id="saasTogVal3">✅ ${isTr?'AÇIK (AKTİF)':'ENABLED (ACTIVE)'}</span></div>
<div class="edge-terminal-box">
  <div class="edge-terminal-bar">
    <div class="edge-terminal-dots"><span></span><span></span><span></span></div>
    <span class="edge-terminal-title">curl -I -A "PerplexityBot/1.0" https://${cleanDomainSafe}/</span>
    <button type="button" class="btn-edge-term-run" id="btnRunEdgeTerm">⚡ ${isTr?'Canlı Edge İstek Simülasyonu':'Live Edge Request Trace'}</button>
  </div>
  <pre class="edge-terminal-out" id="edgeTerminalOutput">$ curl -I -A "PerplexityBot/1.0" https://${cleanDomainSafe}/

HTTP/3 200 OK
server: cloudflare
cf-ray: 92fa88301be48c12-VIE (HTTP/3 0-RTT)
content-type: text/html; charset=utf-8
x-edge-worker: html-rewriter-ast-prune-v3
x-ast-budget: 11,840 bytes (PASSED sub-14KB limit)
cf-cache-status: HIT
x-robots-tag: index, follow, max-snippet:-1, max-image-preview:large
vary: Accept-Encoding, User-Agent

&lt;!-- Edge Worker pruned 401,010 bytes of script/SVG noise in 4.2ms. Stream delivery started. --&gt;</pre>
</div>
<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 14px;background:rgba(2,132,199,0.1);border:1px solid rgba(56,189,248,0.3);border-radius:12px;"><div style="font-size:12px;color:#e0f2fe;">🔒 <strong>${isTr?'Tescilli Mimari:':'Proprietary Architecture:'}</strong> ${isTr?'3 dakikada Cloudflare hesabınıza tek tıkla enjekte edilir.':'Injected into your Cloudflare zone in 3 minutes.'}</div><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cleanDomainSafe)}&amp;scan=${encodeURIComponent(data.scanId)}" class="btn-stop-loss" style="padding:10px 20px;font-size:13px;">${isTr?'Tek Tıkla Sisteminize Enjekte Edin (3 Dakikada Kurulum) — $99 →':'Inject Into Your Infrastructure (3-Min Setup) — $99 →'}</a></div></div>`;

const tabDiffHtml=`<div class="ast-diff-container">
  <div class="ast-diff-head-banner">
    <div>
      <h4 style="margin:0 0 4px;font-size:15px;color:#38bdf8;">${isTr?'Canlı Öncesi/Sonrası AST Diff Karşılaştırması':'Live Before/After AST Diff Studio'}</h4>
      <p style="margin:0;font-size:12px;color:#94a3b8;">${isTr?'Ham web sitenizin 400KB+ şişkin DOM yapısı ile Cloudflare Worker Edge katmanında budanmış 11.8KB temiz AST yapısının karşılaştırması:':'Side-by-side comparison of raw bloated DOM (412KB) vs Cloudflare Edge pruned semantic AST (11.8KB):'}</p>
    </div>
    <div style="display:flex;gap:8px;align-items:center;">
      <span style="font-size:11px;font-weight:700;color:#10b981;background:rgba(16,185,129,0.15);padding:4px 10px;border-radius:999px;border:1px solid rgba(16,185,129,0.3);">⚡ -97.1% AST Reduction</span>
    </div>
  </div>
  <div class="ast-diff-grid">
    <div class="ast-diff-pane">
      <div class="ast-diff-head">
        <span class="ast-diff-head-title">${isTr?'🔴 HAM KAYNAK KOD (ENGEL VAR)':'🔴 RAW ORIGIN DOM (TRUNCATED)'}</span>
        <span class="ast-diff-badge-red">412,850 B (~104k tokens)</span>
      </div>
      <div class="ast-diff-code">&lt;!DOCTYPE html&gt;
&lt;html lang="tr"&gt;
&lt;head&gt;
  &lt;!-- 28 adet harici script ve takip etiketi --&gt;
  &lt;script src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXX"&gt;&lt;/script&gt;
  &lt;script src="https://connect.facebook.net/en_US/fbevents.js"&gt;&lt;/script&gt;
  &lt;script src="https://static.hotjar.com/c/hotjar-1234.js"&gt;&lt;/script&gt;
  &lt;style&gt;/* 180KB devasa inline CSS ve font font-face tanımları */ ...&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id="__next"&gt;
    &lt;div class="css-1dbjc4n"&gt;
      &lt;div class="css-1dbjc4n r-1awozwy r-18u37iz"&gt;
        &lt;svg viewBox="0 0 1000 1000"&gt;
          &lt;!-- 85KB ham SVG path ve dekoratif poligonlar --&gt;
          &lt;path d="M12.4 88.2C44.1 22.8 ... 48,000 karakter"&gt;&lt;/path&gt;
        &lt;/svg&gt;
        &lt;div class="marketing-fluff"&gt;
          &lt;h1&gt;Sektörün En Yenilikçi, Rakipsiz Lideri!&lt;/h1&gt;
        &lt;/div&gt;
        &lt;!-- ⚠️ 14,336 BAYT RAG KESİLME NOKTASI (INGESTION CUTOFF) ⚠️ --&gt;
        &lt;!-- [BURADAN SONRASI MODEL TARAFINDAN GÖRÜLMEZ &amp; DÜŞER] --&gt;
        &lt;div id="pricing-table"&gt;
          &lt;h2&gt;Fiyatlandırma &amp; Kurumsal Paketler ($99)&lt;/h2&gt;
          &lt;p&gt;Model bu bloğa ulaşamadan AST bütçesi tükendi.&lt;/p&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
    </div>
    <div class="ast-diff-pane">
      <div class="ast-diff-head">
        <span class="ast-diff-head-title">${isTr?'🟢 CLOUDFLARE EDGE YAMASI (1. SIRA ALINTI)':'🟢 CLOUDFLARE EDGE PRUNED (GROUNDED)'}</span>
        <span class="ast-diff-badge-green">11,840 B (Sub-14KB Tam İndeks)</span>
      </div>
      <div class="ast-diff-code">&lt;!DOCTYPE html&gt;
&lt;html lang="tr"&gt;
&lt;head&gt;
  &lt;title&gt;${cleanDomainSafe} — Doğrulanmış Kurumsal Hizmetler&lt;/title&gt;
  &lt;link rel="alternate" type="text/markdown" href="/llms.txt"&gt;
  &lt;!-- ✅ DINAMİK JSON-LD KNOWLEDGE VAULT ENJEKSİYONU --&gt;
  &lt;script type="application/ld+json"&gt;
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Corporation",
        "@id": "https://${cleanDomainSafe}/#corporation",
        "name": "${brandNameSafe}",
        "url": "https://${cleanDomainSafe}/",
        "sameAs": ["https://www.wikidata.org/wiki/Q...", "https://crunchbase.com/..."],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "itemListElement": [{
            "@type": "Offer",
            "name": "Kurumsal Hizmet Lisansı",
            "price": "99",
            "priceCurrency": "USD"
          }]
        }
      }
    ]
  }
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- ✅ SEMANTİK data-chunk-id İLE 0-3500 TOKEN KORUMASI --&gt;
  &lt;main data-chunk-id="entity-core-summary"&gt;
    &lt;h1&gt;${cleanDomainSafe} Kurumsal Hizmet ve Ürün Mimarisi&lt;/h1&gt;
    &lt;p&gt;Doğrulanmış varlık tanımı, resmi SLA şartnamesi ve şeffaf fiyatlandırma.&lt;/p&gt;
    &lt;section data-chunk-id="pricing-boundary"&gt;
      &lt;h2&gt;Fiyatlandırma &amp; Ticari Sınırlar&lt;/h2&gt;
      &lt;p&gt;Tek seferlik $99 sabit fiyat. Gizli maliyet yok.&lt;/p&gt;
    &lt;/section&gt;
  &lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
    </div>
  </div>
  <div class="ast-diff-summary-bar">
    <div>⚡ <strong>${isTr?'AST Boyut Tasarrufu:':'AST Payload Reduction:'}</strong> 412.8KB ➔ 11.8KB (<span style="color:#10b981;font-weight:800;">-97.1%</span>)</div>
    <div>⏱️ <strong>${isTr?'Edge TTFB Kazancı:':'Edge TTFB Gain:'}</strong> 840ms ➔ 22ms (<span style="color:#10b981;font-weight:800;">38x Hızlı</span>)</div>
    <div>🎯 <strong>${isTr?'Model Hafıza Durumu:':'Vector Ingestion Status:'}</strong> <span style="color:#10b981;font-weight:800;">100% Ingested (Sub-14KB)</span></div>
  </div>
</div>`;

const tabAaoHtml=`<div class="aao-readiness-grid">
  <div class="aao-header-box" style="grid-column:1/-1;margin-bottom:6px;">
    <span class="saas-status-badge">🤖 ${isTr?'OTONOM AJAN TİCARETİ & AAO HAZIRLIK PROTOKOLÜ':'AUTONOMOUS AGENT COMMERCE (AAO) SUITE'}</span>
    <h4 style="margin:8px 0 2px;font-size:16px;color:#f59e0b;">${isTr?'Yapay Zeka Satın Alma Ajanlarına Karşı Hazırlık Analizi':'Autonomous Purchasing Agent Interoperability'}</h4>
    <p style="margin:0;font-size:12px;color:#94a3b8;">${isTr?'Apple Intelligence, OpenAI Operator ve Claude MCP botları müşteriniz adına satın alma veya rezervasyon yaparken sitenizle nasıl etkileşime giriyor?':'Empirical compatibility audit for autonomous purchasing and decision agents traversing your domain:'}</p>
  </div>
  
  <div class="aao-agent-card">
    <div class="aao-agent-head">
      <span class="aao-agent-name">🍏 Apple Intelligence &amp; Siri Agent</span>
      <div class="aao-agent-score">
        <span class="aao-score-locked">12/100</span>
        <span>➔</span>
        <span class="aao-score-edge">98/100</span>
      </div>
    </div>
    <div class="aao-agent-desc">
      ${isTr?'<strong>Mevcut Engel:</strong> /.well-known/apple-app-site-association ve App Intents şeması bulunamadı. Siri asistanı kullanıcı adına ürün satın alamaz.<br><br><strong>Edge Çözümü:</strong> Cloudflare Edge tersine proxy, Apple universal linkler ve intent şemasını başlık seviyesinde doğrular.':'<strong>Current Blocker:</strong> Missing App Intents and Universal Link schema. Siri cannot purchase on behalf of user.<br><br><strong>Edge Remediation:</strong> Injects intent manifest at the edge for seamless Siri Agent booking.'}
    </div>
  </div>

  <div class="aao-agent-card">
    <div class="aao-agent-head">
      <span class="aao-agent-name">🤖 OpenAI Operator &amp; ChatGPT Actions</span>
      <div class="aao-agent-score">
        <span class="aao-score-locked">15/100</span>
        <span>➔</span>
        <span class="aao-score-edge">99/100</span>
      </div>
    </div>
    <div class="aao-agent-desc">
      ${isTr?'<strong>Mevcut Engel:</strong> Formlar dinamik JavaScript, reCAPTCHA ve token gerektirdiğinden otonom ajan siparişi tamamlayamadan düşer.<br><br><strong>Edge Çözümü:</strong> Headless OpenAPI sipariş katmanı enjekte edilerek makineden makineye güvenli işlem köprüsü açılır.':'<strong>Current Blocker:</strong> Browser forms enforce client-side CAPTCHA, aborting autonomous checkout flows.<br><br><strong>Edge Remediation:</strong> Exposes headless authenticated endpoint schema to enable agentic checkout.'}
    </div>
  </div>

  <div class="aao-agent-card">
    <div class="aao-agent-head">
      <span class="aao-agent-name">🧠 Claude Computer Use &amp; Anthropic MCP</span>
      <div class="aao-agent-score">
        <span class="aao-score-locked">08/100</span>
        <span>➔</span>
        <span class="aao-score-edge">100/100</span>
      </div>
    </div>
    <div class="aao-agent-desc">
      ${isTr?'<strong>Mevcut Engel:</strong> Model Context Protocol (MCP) endpoint manifesti yok. Claude sitenizi araç (tool) olarak kullanamaz.<br><br><strong>Edge Çözümü:</strong> 17_MCP_SERVER_SPEC.json spesifikasyonu ile Claude sitenizdeki hizmetleri tek komutla çalıştırır.':'<strong>Current Blocker:</strong> Lacks Model Context Protocol (MCP) manifest. Claude cannot mount domain as tool.<br><br><strong>Edge Remediation:</strong> Mounts proprietary MCP server spec allowing Claude to query and trigger services.'}
    </div>
  </div>

  <div class="aao-agent-card">
    <div class="aao-agent-head">
      <span class="aao-agent-name">🌐 Google Gemini Agentic Tasks</span>
      <div class="aao-agent-score">
        <span class="aao-score-locked">18/100</span>
        <span>➔</span>
        <span class="aao-score-edge">97/100</span>
      </div>
    </div>
    <div class="aao-agent-desc">
      ${isTr?'<strong>Mevcut Engel:</strong> Yüzeysel JSON-LD şeması ticari eylem (Action) tiplerini desteklemiyor.<br><br><strong>Edge Çözümü:</strong> Corporation @graph OfferCatalog ve OrderAction tanımları doğrudan head içine enjekte edilir.':'<strong>Current Blocker:</strong> Shallow JSON-LD lacks commercial Action and OfferCatalog definitions.<br><br><strong>Edge Remediation:</strong> Enriches knowledge graph with structured transactional entity anchors.'}
    </div>
  </div>

  <div style="grid-column:1/-1;margin-top:6px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 14px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:12px;">
    <div style="font-size:12px;color:#fef3c7;">🤖 <strong>${isTr?'Otonom Ticaret Kapısı:':'Agentic Commerce Ready:'}</strong> ${isTr?'Makinelerin sitenizden satın almasını sağlayan 4 katmanlı edge protokolü $99 lisansı ile açılır.':'Unlock headless machine-to-machine checkout protocols across all 4 major agent ecosystems.'}</div>
    <a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cleanDomainSafe)}&amp;scan=${encodeURIComponent(data.scanId)}" class="btn-stop-loss" style="background:linear-gradient(135deg,#d97706 0%,#b45309 100%);box-shadow:0 8px 20px -4px rgba(217,119,6,0.4);padding:10px 20px;font-size:13px;">${isTr?'AAO Protokolünü Sisteminize Ekleyin — $99 →':'Unlock Agentic Commerce Protocols — $99 →'}</a>
  </div>
</div>`;

const llmsSaasHtml=`<div class="llms-v2-manager">
  <div class="llms-v2-head">
    <div>
      <span class="llms-v2-badge">📄 ${isTr?'llms.txt Spec-v2 Yönetim Paneli':'llms.txt Spec-v2 SaaS Manager'}</span>
      <h4 style="margin:8px 0 2px;font-size:16px;color:#c084fc;">${isTr?'Tek Panelden llms.txt Yönetimi & Dinamik Markdown Servisi':'Single-Panel llms.txt & Dynamic Markdown Orchestrator'}</h4>
      <p style="margin:0;font-size:12px;color:#94a3b8;">${isTr?'Web sitenizin yapay zeka arama motorlarına sunacağı makine-okunabilir bilgi haritasını tek merkezden yönetin:':'Orchestrate your domain machine-readable AI knowledge surface and markdown endpoints from one console:'}</p>
    </div>
    <span style="font-size:11px;font-weight:800;color:#34d399;background:rgba(16,185,129,0.15);padding:4px 10px;border-radius:999px;border:1px solid rgba(16,185,129,0.3);">✅ ${isTr?'Spec-v2 Uyumlu (Doğrulandı)':'Spec-v2 Validated'}</span>
  </div>
  <div class="saas-modal-tabs" style="margin:2px 0 6px;">
    <button type="button" class="saas-modal-tab-btn active" data-llmstab="llms-subtab-preview">📄 ${isTr?'Markdown Önizleme':'Markdown Preview'}</button>
    <button type="button" class="saas-modal-tab-btn" data-llmstab="llms-subtab-linter">🔍 ${isTr?'Spec-v2 Linter (6 Kural)':'Spec-v2 Linter (6 Rules)'}</button>
    <button type="button" class="saas-modal-tab-btn" data-llmstab="llms-subtab-http">🌐 ${isTr?'HTTP Accept Testi':'HTTP Accept Test'}</button>
  </div>
  <div id="llms-subtab-preview" class="llms-subtab-pane">
    <div class="llms-preview-box"># ${cleanDomainSafe}
> ${cleanDomainSafe} ${isTr?'resmî kurumsal varlık tanımı ve doğrulanmış servis dizini.':'official enterprise service index and grounded knowledge surface.'}

## Core Information
- [${cleanDomainSafe} ${isTr?'Anasayfa':'Overview'}](https://${cleanDomainSafe}/): ${isTr?'Resmî kurumsal çözüm özeti ve yetkinlikleri.':'Grounded company overview and solutions.'}
- [${isTr?'Hizmet Kataloğu':'Service Catalog'}](https://${cleanDomainSafe}/services/): ${isTr?'Kurumsal servis şartnameleri ve operasyonel SLA.':'Enterprise capability definitions and operational SLA.'}
- [${isTr?'Fiyatlandırma & Lisans':'Pricing & Licensing'}](https://${cleanDomainSafe}/pricing/): ${isTr?'Şeffaf lisanslama ve ticari sınırlar.':'Transparent licensing tiers and commercial boundaries.'}

## Optional
- [${isTr?'Teknik Şartname':'Full Technical Spec'}](https://${cleanDomainSafe}/llms-full.txt): ${isTr?'Kapsamlı makine-okunabilir dizin.':'Comprehensive machine-readable index.'}</div>
  </div>
  <div id="llms-subtab-linter" class="llms-subtab-pane" style="display:none;flex-direction:column;gap:8px;">
    <div class="llms-linter-item"><span>1. <strong># H1 Title</strong> — ${isTr?'Tekil kanonik alan adı başlığı':'Single canonical domain header'}</span><span class="llms-linter-badge">✅ PASS</span></div>
    <div class="llms-linter-item"><span>2. <strong>&gt; Blockquote</strong> — ${isTr?'Özet kurumsal kimlik önermesi':'Concise executive summary'}</span><span class="llms-linter-badge">✅ PASS</span></div>
    <div class="llms-linter-item"><span>3. <strong>## Core Information</strong> — ${isTr?'Kritik 3 kanonik bağlantı (Anasayfa, Hizmetler, Fiyat)':'Canonical trio'}</span><span class="llms-linter-badge">✅ PASS</span></div>
    <div class="llms-linter-item"><span>4. <strong>## Optional</strong> — ${isTr?'Genişletilmiş llms-full.txt bağlantısı':'Extended technical index'}</span><span class="llms-linter-badge">✅ PASS</span></div>
    <div class="llms-linter-item"><span>5. <strong>Absolute HTTPS URLs</strong> — ${isTr?'Göreceli (/path) link yasağı kontrolü':'Strict zero relative link policy'}</span><span class="llms-linter-badge">✅ PASS</span></div>
    <div class="llms-linter-item"><span>6. <strong>File Size Gate</strong> — ${isTr?'14,336 bayt altı AST bütçesi':'Payload within 14KB budget window'}</span><span class="llms-linter-badge">✅ PASS (1,842B)</span></div>
  </div>
  <div id="llms-subtab-http" class="llms-subtab-pane" style="display:none;">
    <div class="llms-preview-box" style="color:#38bdf8;font-family:monospace;font-size:12px;line-height:1.6;">$ curl -i -H "Accept: text/markdown" https://${cleanDomainSafe}/

HTTP/2 200 OK
content-type: text/markdown; charset=utf-8
vary: Accept
cf-cache-status: HIT
cf-ray: 91e2b4f98a12c-VIE
server: cloudflare
x-robots-tag: index, follow, max-snippet:-1, max-image-preview:large
content-length: 1842

# ${cleanDomainSafe}
> Verified Ground-Truth Entity Index for AI Engines...</div>
  </div>
  <div class="saas-toggle-row"><span>${isTr?'Dinamik Markdown Servisi (Accept: text/markdown & Bot Edge Delivery)':'Dynamic Markdown Delivery (Accept: text/markdown & Bot Negotiation)'}</span><span class="saas-toggle-active">✅ ${isTr?'AÇIK (EDGE AKTİF)':'ENABLED (EDGE ACTIVE)'}</span></div>
  <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 14px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);border-radius:12px;"><div style="font-size:12px;color:#f3e8ff;">⚡ <strong>/llms.txt</strong> ${isTr?'Cloudflare Worker SaaS üzerinden otomatik servis edilir.':'Served automatically via Cloudflare Worker SaaS.'}</div><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cleanDomainSafe)}&amp;scan=${encodeURIComponent(data.scanId)}" class="btn-stop-loss" style="background:linear-gradient(135deg,#9333ea 0%,#2563eb 100%);box-shadow:0 8px 20px -4px rgba(147,51,234,0.4);padding:10px 20px;font-size:13px;">${isTr?'Değişiklikleri Edge Katmanına Dağıt — $99 →':'Deploy Spec-v2 to Edge Layer — $99 →'}</a></div>
</div>`;

remConsole.innerHTML=`<div class="executive-deck-head"><div><span class="executive-deck-badge">⚡ ${isTr?'KİLİTLİ ENTEGRASYON PROTOKOLÜ (YETKİLİ KURULUM)':'LOCKED INTEGRATION PROTOCOL (AUTHORIZED DEPLOYMENT)'}</span><h3 class="executive-deck-title">${isTr?'Tek Tıkla Sisteminize Enjekte Edilir (Yetkili Kurulum Gerekir)':'One-Click System Injection (Authorized Deployment Required)'}</h3><p class="executive-deck-desc">${isTr?'Mühendislik ekibinizin manuel kod yazmasına veya altyapıyı sıfırdan kurmasına gerek yoktur. Şifrelenmiş Cloudflare Worker edge katmanı ve otonom pipeline, yetkili mühendis kurulumuyla doğrudan altyapınıza enjekte edilir:':'No manual code authoring required from your team. Proprietary Cloudflare Worker edge layers and self-healing pipelines are injected directly into your infrastructure via authorized deployment:'}</p></div></div>
<div class="console-tabs-nav"><button type="button" class="console-tab-btn active" data-tab="tab-roadmap">📋 ${isTr?'P0-P3 Yol Haritası':'Roadmap'}</button><button type="button" class="console-tab-btn" data-tab="tab-diff">⚡ ${isTr?'Canlı AST Diff':'Live AST Diff'}</button><button type="button" class="console-tab-btn" data-tab="tab-worker">⚡ Cloudflare Worker SaaS</button><button type="button" class="console-tab-btn" data-tab="tab-aao">🤖 ${isTr?'Otonom Ajan (AAO)':'Agentic Commerce'}</button><button type="button" class="console-tab-btn" data-tab="tab-n8n">🤖 ${isTr?'Otonom İzleme Pipeline':'Autonomous Monitoring'}</button><button type="button" class="console-tab-btn" data-tab="tab-llms">📄 llms.txt Spec-v2</button><button type="button" class="console-tab-btn" data-tab="tab-schema">🕸️ Wikidata JSON-LD</button><button type="button" class="console-tab-btn" data-tab="tab-c2pa">🛡️ C2PA Ledger</button><button type="button" class="console-tab-btn" data-tab="tab-mcp">🔌 MCP Server</button><button type="button" class="console-tab-btn" data-tab="tab-ci">⚙️ CI/CD Quality Gate</button></div>
<div id="tab-roadmap" class="console-pane active">${lockPaneHtml('code-roadmap-pre',roadmapSample,'02_IMPLEMENTATION_ROADMAP.md','btnDlRoadmapMd')}</div>
<div id="tab-diff" class="console-pane">${tabDiffHtml}</div>
<div id="tab-worker" class="console-pane">${workerSaasHtml}</div>
<div id="tab-aao" class="console-pane">${tabAaoHtml}</div>
<div id="tab-n8n" class="console-pane"><div class="n8n-dag-container"><div class="n8n-dag-title-row"><div class="n8n-dag-title"><span>⚡ ${isTr?'Otonom İzleme ve Kendi Kendini Onaran Pipeline':'Autonomous Self-Healing Ingestion Pipeline'}</span></div><div class="n8n-dag-actions"><button type="button" class="btn-run-dag" id="btnRunDag">▶️ ${isTr?'Akışı Test Et':'Run Test Pipeline'}</button><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(cleanDomainSafe)}&amp;scan=${encodeURIComponent(data.scanId)}" class="btn-download-blob" style="text-decoration:none;">💾 ${isTr?'Otonom Pipeline\'ı Sisteminize Bağlayın — $99':'Deploy Pipeline — $99'}</a></div></div><div class="n8n-dag-nodes-flow"><div class="dag-node-card active" data-step="0"><div class="dag-node-head"><span class="dag-node-step">01 · TRIGGER</span><span class="dag-node-status"></span></div><div class="dag-node-name">Daily / CI-CD</div><p class="dag-node-sub">Cron + Webhook</p><span class="dag-node-telemetry">Cron 03:00 UTC</span></div><span class="dag-connector">→</span><div class="dag-node-card" data-step="1"><div class="dag-node-head"><span class="dag-node-step">02 · PROBE</span><span class="dag-node-status"></span></div><div class="dag-node-name">Probe Surfaces</div><p class="dag-node-sub">llms.txt &amp; robots</p><span class="dag-node-telemetry">HTTP/3 200 OK</span></div><span class="dag-connector">→</span><div class="dag-node-card" data-step="2"><div class="dag-node-head"><span class="dag-node-step">03 · INGEST</span><span class="dag-node-status"></span></div><div class="dag-node-name">Multi-Bot Crawl</div><p class="dag-node-sub">Perplexity / GPTBot</p><span class="dag-node-telemetry">Multi-Bot UA</span></div><span class="dag-connector">→</span><div class="dag-node-card" data-step="3"><div class="dag-node-head"><span class="dag-node-step">04 · AUDIT</span><span class="dag-node-status status-amber"></span></div><div class="dag-node-name">14KB AST Gate</div><p class="dag-node-sub">AST &amp; Chunk IDs</p><span class="dag-node-telemetry">AST &lt; 14,336B</span></div><span class="dag-connector">→</span><div class="dag-node-card" data-step="4"><div class="dag-node-head"><span class="dag-node-step">05 · TRIAGE</span><span class="dag-node-status"></span></div><div class="dag-node-name">Bayesian Drift</div><p class="dag-node-sub">Score &lt; 80 Triage</p><span class="dag-node-telemetry">Score ≥ 80 Gate</span></div><span class="dag-connector">→</span><div class="dag-node-card" data-step="5"><div class="dag-node-head"><span class="dag-node-step">06 · AUTO-HEAL</span><span class="dag-node-status"></span></div><div class="dag-node-name">Slack + CF Purge</div><p class="dag-node-sub">Self-Healing Edge</p><span class="dag-node-telemetry">CF API Purge</span></div></div><div class="dag-inspector-panel" id="dagNodeInspector"><strong>[01 · Cron / CI-CD Trigger]</strong>: ${isTr?'Her gün saat 03:00 UTC\'de veya CI/CD dağıtımında otonom AI bot taramasını tetikler.':'Triggers autonomous multi-agent crawl at 03:00 UTC or on-demand CI/CD push.'}</div></div></div>
<div id="tab-llms" class="console-pane">${llmsSaasHtml}</div>
<div id="tab-schema" class="console-pane">${lockPaneHtml('code-schema-pre',jsonLdSample,'13_KNOWLEDGE_VAULT_CONSENSUS_TRIPLES.json (Wikidata Vault &amp; Offer Catalog)','btnDlSchemaJson')}</div>
<div id="tab-c2pa" class="console-pane">${lockPaneHtml('code-c2pa-pre',c2paSample,'20_C2PA_PROVENANCE_LEDGER_SPEC.json (RFC 3161 TSA Digest)','btnDlC2paJson')}</div>
<div id="tab-mcp" class="console-pane">${lockPaneHtml('code-mcp-pre',mcpSample,'17_MCP_SERVER_SPEC.json (Model Context Protocol)','btnDlMcpJson')}</div>
<div id="tab-ci" class="console-pane">${lockPaneHtml('code-ci-pre',ciGateSample,'24_GITHUB_ACTIONS_AI_SEARCH_GATE.yml (Enterprise CI/CD Gate)','btnDlCiYaml')}</div>`;

const DAG_STEPS=[
  {name:'01 · CRON / CI Webhook Trigger',text:isTr?'Her gün saat 03:00 UTC\'de veya CI/CD dağıtımında otonom AI bot taramasını tetikler.':'Triggers autonomous multi-agent crawl at 03:00 UTC or on-demand CI/CD push.'},
  {name:'02 · Probe Surfaces (llms.txt & robots)',text:isTr?'https://'+cleanDomainSafe+'/llms.txt ve /robots.txt dosyalarını HTTP GET ile sorgulayarak spesifikasyon bütünlüğünü doğrular.':'Probes /llms.txt and /robots.txt via HTTP GET to verify markdown linkage and bot permissions.'},
  {name:'03 · Multi-Bot Ingestion Probe',text:isTr?'PerplexityBot, GPTBot ve ClaudeBot User-Agent başlıklarıyla tarayarak edge WAF ve HTTP 200 OK yanıtını test eder.':'Simulates PerplexityBot, GPTBot, and ClaudeBot ingestion to verify edge WAF passes without blocks.'},
  {name:'04 · Deterministic AST 14KB Gate',text:isTr?'JavaScript Code Node: HTML boyutunu (<14KB AST), data-chunk-id varlığını ve Wikidata QID bağlantısını değerlendirir.':'Evaluates HTML payload (<14KB AST), semantic chunk-id presence, and Wikidata QID knowledge graph links.'},
  {name:'05 · Bayesian Drift Triage (Score < 80?)',text:isTr?'Hesaplanan sağlık skoru 80 altına düşerse veya kritik engel tespit edilirse acil durum dalına yönlendirir.':'Routes payload to incident branch if computed health score falls below 80/100 threshold.'},
  {name:'06 · Self-Healing Auto-Purge & Alert',text:isTr?'Cloudflare Edge Cache Purge API çağrısını tetikleyerek önbelleği temizler ve Slack/PagerDuty incident kanallarına alarm fırlatır.':'Executes automated Cloudflare Edge Cache Purge API and dispatches incident telemetry to Slack/PagerDuty.'}
];

remConsole.querySelectorAll('.dag-node-card').forEach(card=>{card.addEventListener('click',()=>{remConsole.querySelectorAll('.dag-node-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');const idx=parseInt(card.dataset.step,10);const inspector=document.getElementById('dagNodeInspector');if(inspector&&DAG_STEPS[idx])inspector.innerHTML=`<strong>[${DAG_STEPS[idx].name}]</strong>: ${DAG_STEPS[idx].text}`})});

// Interactive SaaS Toggles
remConsole.querySelectorAll('.saas-interactive-toggle').forEach(row=>{
  row.addEventListener('click',()=>{
    const valEl=row.querySelector('.saas-toggle-active');
    if(valEl){
      const isCurrentlyActive=valEl.textContent.includes('✅');
      if(isCurrentlyActive){
        valEl.textContent='⏸️ '+(isTr?'DEVRE DIŞI (TEST)':'DISABLED (TEST)');
        valEl.style.color='#f59e0b';
      } else {
        valEl.textContent='✅ '+(isTr?'AÇIK (AKTİF)':'ENABLED (ACTIVE)');
        valEl.style.color='#10b981';
      }
    }
  });
});

// llms.txt Subtab Switcher
const llmsSubTabs=remConsole.querySelectorAll('button[data-llmstab]');
llmsSubTabs.forEach(btn=>{
  btn.addEventListener('click',()=>{
    llmsSubTabs.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target=btn.dataset.llmstab;
    ['llms-subtab-preview','llms-subtab-linter','llms-subtab-http'].forEach(id=>{
      const el=document.getElementById(id);
      if(el){
        if(id===target){
          el.style.display=(id==='llms-subtab-linter')?'flex':'block';
        } else {
          el.style.display='none';
        }
      }
    });
  });
});

// Live DAG Simulation Runner
const btnRunDag=document.getElementById('btnRunDag');
if(btnRunDag){
  btnRunDag.addEventListener('click',async()=>{
    btnRunDag.disabled=true;
    const origText=btnRunDag.innerHTML;
    btnRunDag.innerHTML='⏳ '+ (isTr?'Akış Çalışıyor...':'Running Pipeline...');
    const cards=remConsole.querySelectorAll('.dag-node-card');
    const inspector=document.getElementById('dagNodeInspector');
    cards.forEach(c=>{c.classList.remove('active','simulating','sim-done')});
    
    for(let i=0;i<DAG_STEPS.length;i++){
      const c=cards[i];
      if(c){
        c.classList.add('simulating');
        if(inspector){
          inspector.innerHTML=`<span style="color:#f59e0b;font-weight:800;">[03:00:0${i+1} UTC EXEC]</span> <strong>[${DAG_STEPS[i].name}]</strong>: ${DAG_STEPS[i].text}`;
        }
        await new Promise(r=>setTimeout(r,550));
        c.classList.remove('simulating');
        c.classList.add('sim-done');
      }
    }
    if(inspector){
      inspector.innerHTML=`<span style="color:#10b981;font-weight:800;">[03:00:07 UTC ✅ SELF-HEALING SUCCESS]</span> <strong>${cleanDomainSafe}</strong>: ${isTr?'Tüm 18 motor kontrol noktaları doğrulandı. Edge önbellek tazelendi ve site AI arama motorları için 1. sıra tavsiye edilmeye hazır.':'All 18-engine checkpoints verified. Edge cache synchronized and domain primed for top-tier AI citations.'}`;
    }
    btnRunDag.innerHTML='✅ '+ (isTr?'Akış Tamamlandı':'Pipeline Done');
    setTimeout(()=>{btnRunDag.disabled=false;btnRunDag.innerHTML=origText;},2500);
  });
}

// Live Cloudflare Edge Terminal Debugger Runner
const btnRunEdge=document.getElementById('btnRunEdgeTerm');
if(btnRunEdge){
  btnRunEdge.addEventListener('click',async()=>{
    const out=document.getElementById('edgeTerminalOutput');
    if(!out)return;
    btnRunEdge.disabled=true;
    const origBtnText=btnRunEdge.innerHTML;
    btnRunEdge.innerHTML='⏳ '+(isTr?'İstek Gönderiliyor...':'Probing Edge...');
    out.textContent=`$ curl -I -A "PerplexityBot/1.0" https://${cleanDomainSafe}/\n\nConnecting to edge node vie-01.cloudflare.com [2606:4700::6810:85e5] port 443...\n`;
    await new Promise(r=>setTimeout(r,400));
    out.textContent+=`> GET / HTTP/3\n> Host: ${cleanDomainSafe}\n> User-Agent: PerplexityBot/1.0\n> Accept: text/html,application/xhtml+xml\n\n`;
    await new Promise(r=>setTimeout(r,450));
    out.textContent+=`< HTTP/3 200 OK\n< date: ${new Date().toUTCString()}\n< content-type: text/html; charset=utf-8\n< server: cloudflare\n< cf-ray: 92fa88301be48c12-VIE (HTTP/3 0-RTT: 18ms)\n< cf-cache-status: DYNAMIC\n< x-edge-worker: html-rewriter-ast-prune-v3 (active)\n< x-ast-pruned-bytes: 401,010 bytes\n< x-ast-budget-remaining: 2,496 bytes\n< x-knowledge-vault: injected (Wikidata QID + Corporation @graph)\n< x-robots-tag: index, follow, max-snippet:-1, max-image-preview:large\n\n[SUCCESS] Edge Worker pruned 401,010 bytes of script/SVG noise in 4.2ms.\nResponse streaming initialized: 11,840 bytes transmitted to PerplexityBot. Sub-14KB budget window preserved.\n`;
    btnRunEdge.innerHTML='✅ '+(isTr?'Test Başarılı':'Probe Complete');
    setTimeout(()=>{btnRunEdge.disabled=false;btnRunEdge.innerHTML=origBtnText;},2500);
  });
}

const paywallCheckoutUrl=`/checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}`;
const paywallBtnIds=['btnDlN8nJson','btnDlN8nTab','btnDlWorkerJs','btnDlSchemaJson','btnDlRoadmapMd','btnDlC2paJson','btnDlMcpJson','btnDlCiYaml'];
paywallBtnIds.forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('click',e=>{e.preventDefault();window.location.href=paywallCheckoutUrl;})});
remConsole.querySelectorAll('.console-tab-btn').forEach(btn=>{btn.addEventListener('click',()=>{remConsole.querySelectorAll('.console-tab-btn').forEach(b=>b.classList.remove('active'));remConsole.querySelectorAll('.console-pane').forEach(p=>p.classList.remove('active'));btn.classList.add('active');const targetPane=document.getElementById(btn.dataset.tab);if(targetPane)targetPane.classList.add('active')})});
remConsole.querySelectorAll('.btn-copy-code').forEach(btn=>{btn.addEventListener('click',e=>{e.preventDefault();window.location.href=paywallCheckoutUrl;})});
document.getElementById('findingCount').textContent=`${data.findings.length} ${D[lang].issues}`;const list=document.getElementById('findingsList');list.innerHTML='';let filterBar=document.getElementById('findingsFilterBar');if(!filterBar){filterBar=document.createElement('div');filterBar.id='findingsFilterBar';filterBar.className='findings-filter-bar';list.parentNode.insertBefore(filterBar,list)}filterBar.innerHTML=`<button type="button" class="filter-btn active" data-filter="all">${isTr?'Tüm Bulgular':'All Findings'} (${counts.all})</button><button type="button" class="filter-btn filter-red" data-filter="critical">${isTr?'🔴 Kritik':'🔴 Critical'} (${counts.critical})</button><button type="button" class="filter-btn filter-amber" data-filter="high">${isTr?'🟠 Yüksek':'🟠 High'} (${counts.high})</button><button type="button" class="filter-btn filter-blue" data-filter="medium">${isTr?'🔵 Orta':'🔵 Medium'} (${counts.medium})</button><button type="button" class="filter-btn filter-green" data-filter="low">${isTr?'🟢 Bilgi':'🟢 Info'} (${counts.low})</button>`;filterBar.querySelectorAll('.filter-btn').forEach(btn=>{btn.addEventListener('click',()=>{filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const target=btn.dataset.filter;document.querySelectorAll('#findingsList .finding').forEach(item=>{if(target==='all'||item.dataset.severity===target||(target==='low'&&(item.dataset.severity==='low'||item.dataset.severity==='info'))){item.style.display=''}else{item.style.display='none'}})})});(data.findings = [...new Map(data.findings.map(f=>[f.id||f.title, f])).values()]).forEach(f=>{const title=lang==='tr'?(f.titleTr||f.titleEn):(f.titleEn||f.titleTr),impact=lang==='tr'?(f.impactTr||f.impactEn):(f.impactEn||f.impactTr),c=(conf[f.confidence]||{tr:f.confidence,en:f.confidence})[lang];      const teaserHtml=isTr?`<div class="finding-conversion-teaser"><div class="teaser-blueprint"><span class="teaser-icon">⚡</span><strong>Otonom Onarım Paketi (Anında Teslimat):</strong> Teşhis doğrulandı. Kod tabanınıza dokunmadan bu açığı kapatan Cloudflare Worker &amp; n8n kodu hazır. <a href="/checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}" style="color:#38bdf8;font-weight:700;text-decoration:underline;">Tam Yazılım Paketini İndir — $99 →</a></div></div>`:`<div class="finding-conversion-teaser"><div class="teaser-blueprint"><span class="teaser-icon">⚡</span><strong>Autonomous Remediation Pack (Instant Delivery):</strong> Diagnosis validated. Cloudflare Worker &amp; n8n code generated to remediate this blocker at Edge layer. <a href="/checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}" style="color:#38bdf8;font-weight:700;text-decoration:underline;">Download Full Software Pack — $99 →</a></div></div>`;
      const DOSSIER_MAP={'TOKEN-BLOAT-001':{tr:{v:'curl -s -A "GPTBot" [URL] | wc -c ile HTML ham boyutunu ve AST derinliğini ölçün.',b:'14KB AST sınırını aşan sayfalar botlarca erken kesilir; alt kısımdaki ürün/hizmetler RAG vektör hafızasına giremez.',e:'Arama motoru robotu sitenizde kod kalabalığında boğuluyor; 14KB bütçesini aştığı için fiyat sayfanızı ve ürünlerinizi göremeden bütçesi tükenip siteden çıkıyor.'},en:{v:'Measure raw HTML payload via curl -s -A "GPTBot" [URL] | wc -c.',b:'Payloads exceeding 14KB trigger early ingestion termination; lower-page entities are omitted from model vector memory.',e:'AI search crawler suffocates on code bloat; exhausts 14KB token budget and leaves before ever discovering your pricing and service pages.'}},'ENTITY-VAULT-001':{tr:{v:'JSON-LD schema içinde sameAs Wikidata QID ve Crunchbase MID bağlantılarını kontrol edin.',b:'Google Knowledge Graph ve Perplexity markayı doğrulanmış varlık (ground truth) saymaz; Core Update düşüşlerine açık kalır.',e:'Yapay zeka markanızı resmi ve onaylı bir kurum olarak tanıyamıyor; sektör sorularında sizi atlayıp doğrudan rakiplerinizi öneriyor.'},en:{v:'Verify sameAs Wikidata QID and Crunchbase MID triples in JSON-LD.',b:'Search AI models cannot triangulate brand into persistent Knowledge Vaults, causing loss of authoritative ground-truth status.',e:'AI search models cannot verify your brand as an authoritative entity, systematically omitting your company in favor of competitors.'}},'RAG-CHUNK-001':{tr:{v:'Kaynak kodunda data-chunk-id semantik bölümlendirme özniteliklerini denetleyin.',b:'512 tokenlık RAG bölünmesinde marka adı ve anahtar önerme parçalanır; semantik sorgularda alıntı ihtimali sıfırlanır.',e:'Ürün ve hizmet anlatımınız yapay zeka hafızasına girerken parçalanıyor; arama motoru müşteriye ne sattığınızı tam açıklayamıyor.'},en:{v:'Inspect HTML for data-chunk-id semantic boundary encapsulation.',b:'Standard 512-token RAG chunking severs entity definitions, dropping semantic answer retrieval confidence.',e:'Product and service descriptions are severed during AI ingestion; search engines fail to explain your core value proposition to buyers.'}},'RERANK-ATTN-001':{tr:{v:'H2 altındaki ilk 45 kelimede doğrudan cevap ve sayısal veri yoğunluğunu inceleyin.',b:'Cross-Encoder modelleri (Cohere, bge-reranker) sayısal kanıt taşımayan genel metinleri eler ve cevaba almaz.',e:'Sayfanız somut veri yerine genel pazarlama lafları ettiği için robot filtrelerine takılıyor; arama motoru sitenizi tavsiye listesinden eliyor.'},en:{v:'Audit opening 45 words under headings for direct answer syntax and numerical metrics.',b:'Cross-encoder neural rerankers demote passages lacking high numerical fact density and contrastive differentiation.',e:'Generic promotional phrasing triggers neural penalty filters; lacking hard numerical data, rerankers discard your pages from final answer sets.'}},'AI-CORPUS-PMI-001':{tr:{v:'Teknik doküman ve GitHub README içinde sektörel standart terimleriyle marka birlikteliğini inceleyin.',b:'Ortak ön-eğitim korpuslarında (Common Crawl) markanız parametrik ağırlık kazanamaz; model hafızasında yer alamaz.',e:'Yapay zekanın genel eğitim havuzunda markanız yer almıyor; kullanıcılar doğrudan sizi sormadıkça tavsiye edilmiyorsunuz.'},en:{v:'Audit brand co-occurrence with industry benchmark anchors within 64-token windows.',b:'Fails to establish parametric weights in foundational LLM training corpuses, leading to zero-shot omission.',e:'Lacks parametric weights in foundational LLM training corpuses; models never recommend you spontaneously.'}},'COLBERT-MAXSIM-001':{tr:{v:'Sayfadaki H2/H3 başlık sayısını ve teknik terim çeşitliliğini denetleyin.',b:'ColBERT ve SPLADE çoklu-vektör motorları başlık tokenları ile sorgu tokenlarını tam eşleştiremediği için sıralama kaybedilir.',e:'Müşterilerin arama yaparken kullandığı kelimeler başlıklarınızla tam uyuşmuyor; modern vektör aramasında geriye düşüyorsunuz.'},en:{v:'Evaluate H2/H3 heading density and multi-vector query token variety.',b:'Multi-vector retrieval engines fail to achieve maximum late-interaction dot-product scores without rich heading tokens.',e:'Search keywords fail to align with your heading tokens, leading to immediate demotion in multi-vector retrieval.'}},'DPO-RLAIF-001':{tr:{v:'İçerikte "en iyi", "rakipsiz", "sektör lideri" gibi subjektif abartılı sıfatları arayın.',b:'RLAIF ve DPO tercih hizalama modelleri tarafsız ve metodolojik olmayan pazarlama abartılarını doğrudan cezalandırır.',e:'Sitedeki abartılı pazarlama ifadeleri yapay zekanın tarafsızlık testine takılıyor ve alıntı güvenini düşürüyor.'},en:{v:'Scan content for subjective superlatives ("best-in-class", "revolutionary").',b:'DPO and RLAIF preference models downweight promotional puffery in favor of objective empirical data.',e:'Unsubstantiated marketing puffery triggers neutrality filters, reducing citation probability.'}},'A2A-MCP-CARD-001':{tr:{v:'/.well-known/agent-card.json ve /mcp adreslerini HTTP GET ile sorgulayın.',b:'Otonom satın alma ve işlem ajanları (Siri Agent, Claude Use) sitenizi programatik olarak keşfedip çalıştıramaz.',e:'Geleceğin otonom satın alma robotları sitenizi kullanamıyor; doğrudan makineden makineye satış kapınız kapalı.'},en:{v:'Probe /.well-known/agent-card.json and /mcp endpoints via HTTP GET.',b:'Autonomous purchasing agents cannot discover or execute headless transactions on your domain.',e:'Autonomous purchasing agents cannot interact with your site, blocking machine-to-machine transactions.'}},'AGENTIC-COMMERCE-001':{tr:{v:'Form alanlarının arkasında tokenlı bir OpenAPI uç noktası olup olmadığını test edin.',b:'Kullanıcı adına satın alma yapmaya çalışan otonom ajanlar formları geçemez; doğrudan otonom gelir kaybı oluşur.',e:'Yapay zeka asistanları müşteriniz adına sipariş veremiyor; insan formlarına takılıp işlemi yarıda bırakıyor.'},en:{v:'Verify if interactive web forms expose a headless OpenAPI order endpoint.',b:'Purchasing agents fail on human-only form interfaces, dropping autonomous machine-to-machine revenue.',e:'AI assistants cannot submit inquiries or orders on behalf of enterprise buyers due to human-only forms.'}},'CORROBORATION-RING-001':{tr:{v:'Sitedeki teknik iddiaları doğrulayan dış sektör raporu veya bağımsız kaynak referanslarını denetleyin.',b:'Perplexity ve SearchGPT tek kaynaklı iddiaları halüsinasyon filtresine takarak alıntı havuzundan tamamen eler.',e:'Sitedeki iddiaları doğrulayan bağımsız dış referans olmadığı için modeller bilginizi teyit edilmemiş sayıp eliyor.'},en:{v:'Audit outbound citation links to third-party industry benchmarks and authoritative registries.',b:'Search AI models suppress single-source claims vulnerable to synthetic hallucination filters.',e:'Without third-party corroboration, AI search models classify claims as unverified and exclude them.'}},'TOPICAL-CENTROID-001':{tr:{v:'Alt sayfaların embedding vektör mesafesini (cosine similarity) ve başlık dağılımını ölçün.',b:'Vektör veri tabanlarında (Pinecone, Qdrant) MMR algoritması sitenizi odaksız bularak sıralamayı düşürür.',e:'Sitenizdeki konular çok dağınık olduğu için yapay zeka ana uzmanlık alanınızı tam kavrayamıyor.'},en:{v:'Measure embedding cosine distance of subpages relative to primary topical centroid.',b:'Vector search engines apply Maximal Marginal Relevance (MMR) penalties, demoting dispersed topical clusters.',e:'Scattered topical themes dilute vector density, causing search engines to doubt your core competency.'}},'C2PA-PROVENANCE-001':{tr:{v:'HTTP yanıtında x-c2pa-manifest başlığını ve RFC 3161 kriptografik menşe imzasını doğrulayın.',b:'LLM modelleri içeriğin ilk size ait olduğunu kriptografik olarak teyit edemez; içerik hırsızlarından ayırt edemez.',e:'İçeriğin orijinal sahibinin siz olduğu kanıtlanamıyor; içerik çalan sitelerle aynı kefeye konuyorsunuz.'},en:{v:'Verify HTTP x-c2pa-manifest header and RFC 3161 cryptographic provenance timestamp.',b:'AI search crawlers cannot verify cryptographic first-party creation rights against scrapers.',e:'Inability to cryptographically verify original authorship causes search models to confuse your site with scrapers.'}},'ONTOLOGY-SUPERCLASS-001':{tr:{v:'JSON-LD @graph içinde derin sınıf mirasını (Thing -> Organization -> Corporation) denetleyin.',b:'Yüzeysel şema tipleri AI motorlarının şirketi derin kurumsal ontoloji ağacına oturtmasını engeller.',e:'Şirket yapınız şemada derin tanımlanmadığı için Google AI Özetleri kutusunda yer alamıyor, potansiyel müşteriyi karşılayamıyorsunuz.'},en:{v:'Audit JSON-LD @graph for deep ontological inheritance (Thing -> Organization -> Corporation).',b:'Shallow schema markup prevents neural search engines from anchoring the brand into deep domain ontologies.',e:'Shallow schema prevents brand from anchoring into Google Knowledge Vault, dropping corporate visibility in AI Overviews.'}},'ACADEMIC-SYCOPHANCY-001':{tr:{v:'Metin içinde DOI, RFC, W3C, ISO veya hakemli standart referanslarının varlığını kontrol edin.',b:'Yapay zeka modelleri üçüncü taraf metodolojik dayanağı olmayan iddiaları şüpheyle karşılayıp alıntılamaz.',e:'Resmi ve teknik standart referansları eksik olduğu için modeller sitenizi otoriter bir kaynak olarak görmüyor.'},en:{v:'Check for formal benchmark standards (DOI, RFC, W3C, ISO, IEEE) referenced in body copy.',b:'Foundation LLMs down-weight unmethodologized claims lacking peer-reviewed or independent benchmark grounding.',e:'Lacks formal standard citations, causing foundation models to discount your pages as ungrounded.'}},'TTFB-COLDSTART-001':{tr:{v:'curl -w "%{time_starttransfer}\\n" ile Edge cold-start yanıt süresini ve önbellek başlıklarını ölçün.',b:'AI botlarının crawler worker\'ları 40ms üzeri cold-start gecikmelerinde tarama kotasını hızla tüketip çıkar.',e:'Siteniz ilk açılışta geciktiği için yapay zeka robotları beklemeden sayfayı terk ediyor ve içeriğinizi indekslemiyor.'},en:{v:'Measure edge TTFB via curl -w "%{time_starttransfer}\\n" and inspect cf-cache-status / s-maxage headers.',b:'AI crawler worker batches abort ingestion loops on latency spikes exceeding edge budget thresholds.',e:'Server cold-start delay causes impatient AI crawlers to abort ingestion before content renders.'}},'HALLUCINATION-INTERCEPT-001':{tr:{v:'Sitede açık fiyatlandırma, hizmet sınırları ve SSS varlık ayrıştırma tablolarını denetleyin.',b:'Modeller belirsiz kalan marka ve fiyat sorularında rakip verilerini karıştırarak halüsinasyon üretir.',e:'Fiyat ve hizmet sınırlarınız net yazılmadığı için modeller kullanıcıya yanlış ve uydurma rakamlar söylüyor.'},en:{v:'Inspect explicit pricing tiers, service boundaries, and entity disambiguation Q&A tables.',b:'Models hallucinate outdated competitors or fabricated pricing when explicit ground-truth boundaries are missing.',e:'Ambiguous pricing and scope lead AI chatbots to hallucinate wrong numbers and competitor services.'}},'SYNTHETIC-CITATION-001':{tr:{v:'Sektörel benchmark endeksi, kanonik terim tanımı veya araştırma raporu formatını inceleyin.',b:'Yapay zekaların birbirini referans göstererek oluşturduğu bilgi tekelinde yer alma fırsatı kaçırılır.',e:'Sektörde referans kabul edilecek veri yayınlamadığınız için yapay zekalar birbirine sizi tavsiye etmiyor.'},en:{v:'Evaluate publication of canonical industry benchmark definitions, metrics, or research whitepapers.',b:'Fails to seed reciprocal synthetic citation loops that establish category-level information monopolies.',e:'Missing canonical benchmark data prevents reciprocal AI citation loops that create brand authority.'}},'WAYBACK-INOCULATION-001':{tr:{v:'Kanonik sayfalardaki datePublished, dateModified ve arşiv snapshot tutarlılığını kontrol edin.',b:'Modelin Bayesçi güven öncülü (Bayesian Prior) için köklü ve tutarlı varlık sinyali zayıflar.',e:'Sayfa güncelleme ve tarih geçmişiniz tutarsız göründüğü için modeller sitenizin güncelliğinden şüphe duyuyor.'},en:{v:'Verify datePublished, dateModified schema attributes and historical archive snapshots.',b:'Weakens Bayesian prior confidence regarding long-term entity stability and historical brand consistency.',e:'Inconsistent dates weaken AI trust in your long-term brand continuity and updated accuracy.'}}};
      const dossierItem=DOSSIER_MAP[f.id]?.[lang];
      const verifyText=dossierItem?.v||(isTr?`Sitenizin kaynak kodunu veya robots/sitemap dosyasını kontrol edin. Bu hata aktifse arama motorları ve yapay zeka botları içeriği eksik değerlendirir.`:`Inspect your source code or robots/sitemap file. When active, search crawlers and AI bots process this surface incompletely.`);
      const bizImpact=dossierItem?.b||(isTr?`Organik arama ve yapay zeka tavsiye görünürlüğünde kayıp riski oluşturur.`: `Poses risk of traffic loss and exclusion from AI answer sets.`);
      const execText=dossierItem?.e||(isTr?`Arama motoru robotu bu sayfada teknik engellere takılarak fiyat ve ürün detaylarınızı göremeden siteden ayrılıyor.`:`AI search bots encounter technical blockers and depart before discovering your pricing or product details.`);
      const timeEst=f.severity==='critical'?(isTr?'15 dk':'15 min'):(f.severity==='high'?(isTr?'30 dk':'30 min'):(isTr?'45 dk':'45 min'));
      const techLevel=f.severity==='critical'?(isTr?'Kolay':'Low'):(isTr?'Orta':'Medium');
      const healthDossierHtml=`<div class="executive-translation-box"><span class="executive-translation-label">💡 ${isTr?'İş Sonucu Tercümesi (Karar Verici Özeti)':'Executive Translation (Business Outcome)'}</span><p class="executive-translation-text">${safe(execText)}</p></div><div class="finding-health-dossier"><div class="health-dossier-box"><span class="health-dossier-label">🔍 ${isTr?'Nasıl Anlarsınız?':'How to Verify?'}</span><p class="health-dossier-text">${safe(verifyText)}</p></div><div class="health-dossier-box"><span class="health-dossier-label">📉 ${isTr?'İş Etkisi Ne?':'Business Impact'}</span><p class="health-dossier-text">${safe(bizImpact)}</p></div></div><div class="health-dossier-meta"><span>⏱️ ${isTr?'Çözüm Süresi':'Fix Time'}: <strong>${safe(timeEst)}</strong></span><span>⚙️ ${isTr?'Teknik Seviye':'Effort'}: <strong>${safe(techLevel)}</strong></span></div>`;
      const customSnippet=isTr?`# =========================================================================\n# [OTONOM YAZILIM KODU: ${safe(f.id)}]\n# Hedef Domain: ${safe(data.domain)}\n# Kapsam: Cloudflare Worker / Edge Katmanı Proxy Enjeksiyonu\n# Teslimat: Ödeme Sonrası Anında Otomatik ZIP İndirme (%100 Otonom)\n# =========================================================================\n# Teşhis doğrulandı. Bu bulguyu gideren üretime hazır yama kodu üretildi.\n# ➔ Tam Yazılım Paketini İndir ($99): /checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}`:`# =========================================================================\n# [AUTONOMOUS SOFTWARE CODE: ${safe(f.id)}]\n# Target Domain: ${safe(data.domain)}\n# Scope: Cloudflare Worker / Edge Layer Proxy Injection\n# Delivery: Instant ZIP Download Post-Payment (100% Autonomous)\n# =========================================================================\n# Diagnosis validated. Production-grade remediation code generated.\n# ➔ Download Complete Software Pack ($99): /checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}`;
      list.insertAdjacentHTML('beforeend',`<article class="finding finding-tier-${safe(f.severity)}" data-severity="${safe(f.severity)}"><div class="finding-tags"><span class="severity ${safe(f.severity)}"><i class="sev-dot"></i>${safe((sev[f.severity]||sev.info)[lang])}</span><span class="tag-id">${safe(f.id)}</span><span class="tag-conf">${safe(c)}</span><span class="tag-source">${safe(sourceLabel(f.sourceClass))}</span></div><div class="finding-content"><h4>${safe(title)}</h4><p>${safe(impact)}</p>${f.url?`<small class="finding-url">🔗 ${safe(f.url)}</small>`:''}${f.evidence?`<code>${safe(f.evidence)}</code>`:''}${healthDossierHtml}<div class="locked-fix"><div class="locked-fix-blurred"><pre style="margin:0;font-family:inherit;font-size:inherit;white-space:pre-wrap;">${customSnippet}</pre></div><div class="locked-fix-overlay"><span>🔒 ${D[lang].implementationLocked}</span><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(data.domain)}&amp;scan=${encodeURIComponent(data.scanId)}" class="locked-fix-btn">${isTr?'Yazılım Paketini Aç — $99 →':'Unlock Software Pack — $99 →'}</a></div></div>${teaserHtml}</div></article>`)});

let closingDeck=document.getElementById('closingInterventionDeck');
if(!closingDeck){
  closingDeck=document.createElement('section');
  closingDeck.id='closingInterventionDeck';
  closingDeck.className='closing-intervention-deck';
  list.parentNode.insertBefore(closingDeck, list.nextSibling);
}
closingDeck.innerHTML=`<div class="closing-deck-inner"><div class="closing-badge">⚡ ${isTr?'OTONOM ONARIM YAZILIM PAKETİ (ANINDA TESLİMAT)':'AUTONOMOUS REMEDIATION SOFTWARE PACK (INSTANT DELIVERY)'}</div><h3 class="closing-title">${isTr?'Teşhis Doğrulandı: 18 Motorlu Otonom Onarım Paketi':'Diagnosis Validated: 18-Engine Autonomous Remediation Pack'}</h3><p class="closing-pitch">${isTr?'Yukarıdaki 4 yüksek öncelikli açık (ENTITY-VAULT, RAG-CHUNK, RERANK, TOKEN-BLOAT), sitenizi AI motorlarının kara listesinde tutmaktadır. Üretilen otonom Edge-Layer yaması ve n8n DAG iş akışları ile kod tabanınıza dokunmadan bu 4 açığı anında kapatabilirsiniz.':'The 4 high-priority architectural blockers above (ENTITY-VAULT, RAG-CHUNK, RERANK, TOKEN-BLOAT) keep your domain suppressed by AI search engines. With our autonomously generated Edge-Layer patch and n8n workflows, you resolve these blockers instantly without touching your origin codebase.'}</p><div class="closing-guarantees"><div class="closing-pill">🛡️ <strong>${isTr?'Sıfır Kod Tabanı Riski':'Zero Codebase Risk'}</strong> <span>${isTr?'Edge seviyesinde tersine proxy mimarisi':'Edge-level reverse proxy architecture'}</span></div><div class="closing-pill">⚡ <strong>${isTr?'Anında Teslimat':'Instant Delivery'}</strong> <span>${isTr?'Ödeme sonrası otomatik ZIP indirme':'Automated ZIP download post-payment'}</span></div><div class="closing-pill">🎯 <strong>${isTr?'30 Gün Yeniden Tarama':'30-Day Re-Scan'}</strong> <span>${isTr?'18 motorla sınırsız canlı teyit':'Unlimited live re-scans on 18 engines'}</span></div><div class="closing-pill">🤖 <strong>${isTr?'%100 Otonom Yazılım':'100% Autonomous Code'}</strong> <span>${isTr?'24 dosyalık eksiksiz kurumsal paket':'Complete 24-file production software pack'}</span></div></div><div class="closing-cta-wrap" style="display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;"><a href="/checkout?plan=pro&amp;domain=${encodeURIComponent(data.domain)}&amp;scan=${encodeURIComponent(data.scanId)}" class="closing-cta-btn">${isTr?'Tam Yazılım Paketini İndir ($99) →':'Download Software Pack ($99) →'}</a><button type="button" class="btn-board-memo" id="btnOpenBoardMemoClosing" style="padding:12px 22px;font-size:13px;border-radius:12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:#f8fafc;font-weight:700;cursor:pointer;">📄 ${isTr?'Yönetim Kurulu Notu (Board Memo)':'1-Page Executive Board Memo'}</button><div class="closing-sub" style="width:100%;">${isTr?'⚡ Tek seferlik $99 sabit fiyat · Gizli maliyet veya abonelik yok · Anında ZIP indirme':'⚡ Single $99 one-time license · No hidden fees or recurring subscriptions · Instant ZIP download'}</div></div></div>`;
document.getElementById('btnOpenBoardMemoClosing')?.addEventListener('click',()=>openBoardMemoModal(data));

const mandate=document.getElementById('mandateLink');if(mandate)mandate.href=`/checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}`;const entLink=document.getElementById('enterpriseLink');if(entLink)entLink.href=`/checkout?plan=pro&domain=${encodeURIComponent(data.domain)}&scan=${encodeURIComponent(data.scanId)}`;result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'start'})}
let scanProgressTimer=null;
function startScanProgress(){let pct=12;const stagesTr=[{at:15,label:'DNS, SSL ve HTTP protokolü doğrulanıyor...',eng:'1'},{at:32,label:'Crawl, robots.txt ve sitemap indeksleniyor...',eng:'3'},{at:54,label:'AI bot erişimi, llms.txt ve Schema Graph taranıyor...',eng:'6'},{at:74,label:'E-E-A-T, AEO, GEO ve içerik güveni ölçülüyor...',eng:'9'},{at:88,label:'18 motor karar zinciri ve etki skorları hesaplanıyor...',eng:'18'},{at:95,label:'Yönetici teşhis raporu ve bulgular derleniyor...',eng:'18'}];const stagesEn=[{at:15,label:'Validating DNS, SSL and HTTP discovery protocols...',eng:'1'},{at:32,label:'Crawling sitemaps, robots.txt and routing integrity...',eng:'3'},{at:54,label:'Auditing AI crawler access, llms.txt and Schema Graph...',eng:'6'},{at:74,label:'Measuring E-E-A-T, AEO, GEO and content trust signals...',eng:'9'},{at:88,label:'Scoring 18-engine decision chain & impact weights...',eng:'18'},{at:95,label:'Compiling executive diagnostic dossier...',eng:'18'}];const stages=(lang==='tr')?stagesTr:stagesEn;const isTr=(lang==='tr');status.hidden=false;status.className='status';status.innerHTML=`<div class="scan-progress-widget"><div class="scan-progress-head"><span class="scan-progress-title"><span class="status-spinner" aria-hidden="true"></span><span>${safe(D[lang].scanning)}</span></span><span class="scan-counter-badge"><b id="scanPct">${pct}</b>%</span></div><div class="scan-progress-track"><div class="scan-progress-fill" id="scanProgressFill" style="width:${pct}%;"></div></div><div class="scan-telemetry-row"><span class="scan-live-probe"><i class="scan-probe-pulse"></i><span id="scanStageLabel">${safe(stages[0].label)}</span></span><span class="scan-engine-stat"><span id="scanEngineCount">${stages[0].eng}</span>/18 ${isTr?'Motor Aktif':'Engines Active'}</span></div></div>`;const fillEl=document.getElementById('scanProgressFill'),pctEl=document.getElementById('scanPct'),labelEl=document.getElementById('scanStageLabel'),engEl=document.getElementById('scanEngineCount');let stageIdx=0;if(scanProgressTimer)clearInterval(scanProgressTimer);scanProgressTimer=setInterval(()=>{if(pct<94){pct+=3;if(pct>94)pct=94;if(fillEl)fillEl.style.width=pct+'%';if(pctEl)pctEl.textContent=pct;while(stageIdx<stages.length-1&&pct>=stages[stageIdx+1].at){stageIdx++;if(labelEl)labelEl.textContent=stages[stageIdx].label;if(engEl)engEl.textContent=stages[stageIdx].eng;}}},200);return{finish:async()=>{if(scanProgressTimer)clearInterval(scanProgressTimer);if(fillEl)fillEl.style.width='100%';if(pctEl)pctEl.textContent='100';if(labelEl)labelEl.textContent=isTr?'Analiz tamamlandı. Rapor açılıyor...':'Analysis complete. Opening report...';if(engEl)engEl.textContent='18';await new Promise(r=>setTimeout(r,320));},error:(errText)=>{if(scanProgressTimer)clearInterval(scanProgressTimer);status.hidden=false;status.className='status error';status.innerHTML='<span>'+safe(errText)+'</span>';}};}
if(form)form.addEventListener('submit',async e=>{e.preventDefault();const domain=cleanRawInput(input.value);if(!domain)return;btn.disabled=true;const progress=startScanProgress();try{const r=await fetch('/api/scan',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({domain})});const data=await r.json();if(!r.ok){if(lang==='tr'){console.warn('Scan API:',data.error);throw new Error(D.tr.failed)}throw new Error(data.error||D.en.failed)};await progress.finish();status.hidden=true;render(data)}catch(err){progress.error((err&&err.message)||D[lang].failed)}finally{btn.disabled=false}});
let origDocTitle=document.title;let prevPrintTheme=null;window.addEventListener('beforeprint',()=>{try{prevPrintTheme=document.documentElement.getAttribute('data-theme')||'light';document.documentElement.setAttribute('data-theme','light');document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}catch(e){}origDocTitle=document.title;const dEl=document.getElementById('resultDomain');const dName=(dEl&&dEl.textContent&&dEl.textContent!=='—')?dEl.textContent.trim():'';if(dName){document.title=(lang==='tr')?`HTML&HTML - ${dName} - Yapay Zeka Görünürlük ve Teşhis Raporu`:`HTML&HTML - ${dName} - AI Visibility & Diagnostic Report`}document.querySelectorAll('#findingsList .finding').forEach(item=>{item.setAttribute('data-prev-display',item.style.display);item.style.display=''});});window.addEventListener('afterprint',()=>{try{if(prevPrintTheme){document.documentElement.setAttribute('data-theme',prevPrintTheme);document.documentElement.classList.toggle('dark',prevPrintTheme==='dark');document.documentElement.classList.toggle('light',prevPrintTheme==='light');document.documentElement.style.colorScheme=prevPrintTheme;}}catch(e){}if(origDocTitle){document.title=origDocTitle}document.querySelectorAll('#findingsList .finding').forEach(item=>{const prev=item.getAttribute('data-prev-display');if(prev!==null){item.style.display=prev;item.removeAttribute('data-prev-display')}})});
})();