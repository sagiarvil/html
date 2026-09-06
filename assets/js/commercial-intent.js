(()=>{
'use strict';
const root=document.documentElement;
const lang=()=>((root.lang||'en').toLowerCase().startsWith('tr')?'tr':'en');
const path=()=>location.pathname.replace(/\/+$/,'')||'/';
const legal=()=>/(\/privacy|\/terms|\/gizlilik|\/kullanim-kosullari)(\/|$)/.test(path())||path()==='/checkout'||path()==='/checkout.html';
const home=()=>['/','/en','/tr'].includes(path());
const esc=s=>String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

const copy={
  tr:{
    eyebrow:'AI KEŞİF → TALEP → DÖNÜŞÜM',
    title:'Müşteri AI’ya “kimi seçmeliyim?” diye sorduğunda, siteniz cevapta aday mı?',
    body:'AI görünürlüğü tek başına gelir değildir. Ticari değer; sitenizin bulunabilmesi, doğru anlaşılması, güvenilir bir kaynak olarak değerlendirilebilmesi, tıklanabilmesi ve ziyaretçiyi müşteriye dönüştürebilmesiyle oluşur. HTML&HTML bu zincirin site tarafındaki ölçülebilir kırıklarını bulur.',
    primary:'AI Görünürlük Engellerimi Ücretsiz Tara',
    paid:'$99 Düzeltme Sözleşmesini Gör',
    thesis:'Müşteriniz karar vermeden önce AI’ya sorabilir. Hedef, bir “AI sıralaması” satın almak değil; sitenizi AI ve arama sistemlerinin bulabildiği, anlayabildiği, kaynak gösterebildiği ve kullanıcıya yönlendirebildiği bir yapıya getirmektir.',
    guard:'Garanti satmıyoruz: AI sıralaması, öneri, atıf, trafik veya gelir garanti edilemez. Ölçtüğümüz şey, bu sonuçların önündeki site kaynaklı teknik ve içerik engelleridir.',
    stages:[
      ['01','BULUN','AI ve arama tarayıcılarının kritik sayfalara erişmesini engelleyen sorunları kaldırın.'],
      ['02','ANLAŞILIN','Varlık, içerik, yapılandırılmış veri ve cevap çıkarılabilirliğini makine için netleştirin.'],
      ['03','KAYNAK OLABİLİN','Kanıt, özgün bilgi, güven ve retrieval sinyalleriyle kaynak gösterilmeye elverişli yüzey oluşturun.'],
      ['04','TIKLANIN & DÖNÜŞTÜRÜN','AI yönlendirmesini ölçülebilir trafik, güçlü teklif ve net CTA ile ticari sonuca bağlayın.']
    ],
    evidenceTitle:'Neden şimdi?',
    evidence:[
      ['OpenAI','Herkese açık sitelerin ChatGPT Search’te görünebileceğini; OAI-SearchBot erişiminin keşif ve kaynak gösterimi için önemli olduğunu ve ChatGPT yönlendirmelerinin ölçülebildiğini açıklıyor.','https://help.openai.com/en/articles/12627856-publishers-and-developers-faq'],
      ['Google','AI Overviews ve AI Mode’un milyar ölçeğinde kullanıma ulaştığını ve AI Search özelliklerinin web sitelerine milyarlarca tıklama gönderdiğini bildiriyor.','https://blog.google/products-and-platforms/products/search/new-controls-website-owners/'],
      ['Adobe','2026 ABD perakende verilerinde AI kaynaklı ziyaretlerin, AI dışı kanallara göre daha yüksek dönüşüm ve etkileşim gösterebildiğini raporluyor.','https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable']
    ]
  },
  en:{
    eyebrow:'AI DISCOVERY → DEMAND → CONVERSION',
    title:'When your customer asks AI “who should I choose?”, is your website eligible for the answer?',
    body:'AI visibility is not revenue by itself. Commercial value appears when your site can be discovered, understood, considered as a credible source, clicked, and then convert the visit. HTML&HTML finds measurable site-side breaks across that chain.',
    primary:'Scan My AI Visibility Blockers Free',
    paid:'See the $99 Fix Mandate',
    thesis:'Your customer may ask AI before making a decision. The goal is not to buy an “AI ranking”; it is to make your site discoverable, understandable, citable, linkable, and commercially ready when search and AI systems evaluate sources.',
    guard:'We do not sell guarantees: AI rankings, recommendations, mentions, citations, traffic, or revenue cannot be guaranteed. We measure site-side technical and content blockers that can prevent eligibility, retrieval, and conversion.',
    stages:[
      ['01','BE FOUND','Remove crawl, indexation, and access barriers that keep critical pages out of retrieval.'],
      ['02','BE UNDERSTOOD','Clarify entities, content structure, structured data, and answer extractability for machines.'],
      ['03','BE SOURCE-WORTHY','Strengthen evidence, original information, trust, and retrieval signals that support citation eligibility.'],
      ['04','BE CLICKED & CONVERT','Connect AI referrals to a clear offer, measurable traffic, and conversion-ready calls to action.']
    ],
    evidenceTitle:'Why now?',
    evidence:[
      ['OpenAI','OpenAI says public websites can appear in ChatGPT Search, OAI-SearchBot access supports discovery and citation, and ChatGPT referrals can be measured.','https://help.openai.com/en/articles/12627856-publishers-and-developers-faq'],
      ['Google','Google reports billion-scale usage for AI Overviews and AI Mode and says AI Search features send billions of clicks to websites.','https://blog.google/products-and-platforms/products/search/new-controls-website-owners/'],
      ['Adobe','Adobe’s 2026 U.S. retail data reports AI-referred visits outperforming non-AI traffic on conversion and engagement in that market.','https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable']
    ]
  }
};

const intentCopy={
  tr:{
    'ai-mention-tracker':'Önce görünürlüğü ölçün, sonra hangi sorguların markanızı gerçekten taşıdığını izleyin. Mention tek başına hedef değildir; değer, görünürlüğün nitelikli ziyarete ve talebe bağlanmasıdır.',
    'ai-crawler-checker':'AI sistemi sayfanıza ulaşamıyorsa içerik kalitesi tartışması başlamadan biter. Önce erişim ve politika katmanını doğrulayın.',
    'llms-txt-validator':'llms.txt bir sıralama garantisi değildir. Doğru kullanıldığında makine tarafından keşfedilebilir bilgi yüzeyinin bir parçasıdır; bozuk bağlantı ve yanlış yapı fırsatı zayıflatabilir.',
    'schema-validator':'Makine kim olduğunuzu, ne sunduğunuzu ve sayfalar arasındaki ilişkiyi çözemiyorsa kaynak seçimi zorlaşır. Entity graph bütünlüğünü doğrulayın.',
    'teknik-seo-kontrol':'AI keşfi hâlâ taranabilir, kanonik ve anlamlı bir web temeline dayanır. Teknik SEO hataları yalnız Google’ı değil retrieval zincirini de etkileyebilir.',
    'guvenlik-basliklari-kontrol':'Güvenli ve erişilebilir HTTP yüzeyi; crawler, agent ve kullanıcı deneyiminin ortak temelidir. Yanlış güvenlik politikaları erişimi istemeden kesebilir.',
    'erisilebilirlik-kontrol':'Erişilebilir etiketler yalnız insanlara yardım etmez; ajanların buton, form ve sayfa yapısını doğru yorumlamasını da kolaylaştırır.',
    'link-kontrol':'AI veya arama sonucu kullanıcıyı kırık bir URL’ye getiriyorsa keşif ticari değere dönüşmez. Yönlendirme ve link bütünlüğünü koruyun.',
    'website-scanner':'Tek bir skor yerine, AI ve arama görünürlüğünün hangi halkada koptuğunu görün: keşif, anlama, kaynak olma veya dönüşüm.',
    'site-tarama':'Tek bir skor yerine, AI ve arama görünürlüğünün hangi halkada koptuğunu görün: keşif, anlama, kaynak olma veya dönüşüm.',
    'ai-website-readiness':'AI hazırlığı; bir dosya eklemekten fazlasıdır. Erişim, entity, cevap çıkarılabilirliği, bilgi değeri, güven ve dönüşüm aynı zincirde çalışmalıdır.',
    'platform':'HTML&HTML’nin işi “AI sizi önersin” vaadi satmak değil; öneri ve kaynak gösterimi için gerekli site tarafı koşulların hangilerinin eksik olduğunu kanıtlamaktır.',
    'araclar':'Her araç aynı sorunun farklı halkasını ölçer: AI ve arama sistemlerinin sizi bulması, anlaması, kaynak olarak değerlendirmesi ve kullanıcıyı size taşıması.',
    'rehberler':'Rehberlerin amacı içerik üretmek değil; AI keşfi ve nitelikli talep için uygulanabilir kararları teknik kanıtla açıklamaktır.',
    'fiyatlandirma':'Ücretsiz katman neyin yanlış olduğunu kanıtlar. $99 Fix Mandate, bu engelleri test edilebilir uygulama sırasına çevirir.',
    'fix-mandate':'Bir “AI tavsiye garantisi” satın almazsınız. Ölçülen engelleri kaldıran, test eden ve geri dönüş planı olan bir uygulama sözleşmesi satın alırsınız.'
  },
  en:{
    'ai-mention-tracker':'Measure visibility first, then track which neutral prompts actually surface your brand. A mention is not the end goal; value comes when visibility becomes qualified visits and demand.',
    'ai-crawler-checker':'If an AI system cannot reach your page, content quality never enters the conversation. Validate access and policy before optimizing anything else.',
    'llms-txt-validator':'llms.txt is not a ranking guarantee. Used correctly, it can support machine-readable discovery; broken links and weak structure can undermine that surface.',
    'schema-validator':'If machines cannot resolve who you are, what you offer, and how entities connect, source selection becomes harder. Validate entity graph integrity.',
    'technical-seo-checker':'AI discovery still depends on a crawlable, canonical, meaningful web foundation. Technical SEO failures can break retrieval as well as traditional search.',
    'security-headers-checker':'A secure, reachable HTTP surface is shared infrastructure for crawlers, agents, and users. Misconfigured controls can block the very systems you want to reach.',
    'accessibility-checker':'Accessible labels help people and also make buttons, forms, and page structure easier for agents to interpret correctly.',
    'link-integrity-checker':'If AI or search sends a user to a broken URL, discovery cannot become commercial value. Protect referral paths and internal link integrity.',
    'website-scanner':'Do not settle for one score. Find where AI and search visibility breaks: discovery, understanding, source eligibility, or conversion.',
    'ai-website-readiness':'AI readiness is more than adding a file. Access, entities, answer extractability, information value, trust, and conversion must work as one chain.',
    'platform':'HTML&HTML does not sell recommendation promises. It proves which site-side conditions for discovery, citation eligibility, and conversion are missing.',
    'tools':'Each tool measures a different link in the same commercial chain: being found, understood, source-worthy, and able to convert the visit.',
    'guides':'The guides exist to turn AI discovery into actionable engineering and content decisions, not to manufacture generic SEO copy.',
    'pricing':'The free layer proves what is wrong. The $99 Fix Mandate turns measurable blockers into a testable implementation sequence.',
    'fix-mandate':'You are not buying an “AI recommendation guarantee.” You are buying an implementation contract that removes measured blockers, tests the result, and defines rollback.'
  }
};

function intent(){
  const p=path();
  const keys=Object.keys(intentCopy[lang()]);
  return keys.find(k=>p.includes('/'+k))||'';
}
function localizedScan(){return lang()==='tr'?'/tr/site-tarama/':'/en/website-scanner/'}
function localizedFix(){return lang()==='tr'?'/tr/fix-mandate/':'/en/fix-mandate/'}
function sourceHtml(c){return c.evidence.map(([name,text,url])=>`<article><b>${esc(name)}</b><p>${esc(text)}</p><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${lang()==='tr'?'Kaynağı aç':'Open source'} ↗</a></article>`).join('')}
function stagesHtml(c){return c.stages.map(([n,t,d])=>`<article><b>${esc(n)}</b><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('')}
function mountBridge(){
  if(legal()||document.querySelector('[data-commercial-intent]'))return;
  const l=lang(),c=copy[l],i=intent(),specific=i?intentCopy[l][i]:c.thesis;
  const section=document.createElement('section');
  section.className='ai-opportunity';section.dataset.commercialIntent='1';
  section.innerHTML=`<div class="ai-opportunity-shell"><span class="ai-opportunity-eyebrow">${esc(c.eyebrow)}</span><h2>${esc(c.title)}</h2><p class="ai-opportunity-lead">${esc(specific)}</p><div class="ai-value-chain">${stagesHtml(c)}</div><div class="ai-opportunity-actions"><a class="ai-opportunity-primary" href="${localizedScan()}">${esc(c.primary)} →</a><a class="ai-opportunity-secondary" href="${localizedFix()}">${esc(c.paid)} →</a></div><p class="ai-opportunity-guard">${esc(c.guard)}</p>${(home()||/\/(platform|pricing|fiyatlandirma|fix-mandate)$/.test(path()))?`<div class="ai-market-evidence"><h3>${esc(c.evidenceTitle)}</h3><div>${sourceHtml(c)}</div></div>`:''}</div>`;
  const footer=document.querySelector('footer');
  if(footer)footer.before(section);else (document.querySelector('main')||document.body).appendChild(section);
}
function mountHeroThesis(){
  if(!home()||document.querySelector('[data-commercial-thesis]'))return;
  const c=copy[lang()];const hero=document.querySelector('.hero');const intro=hero?.querySelector(':scope > p');
  if(!intro)return;const box=document.createElement('p');box.className='ai-commercial-thesis';box.dataset.commercialThesis='1';box.textContent=c.thesis;intro.after(box);
  const scan=document.querySelector('#scanButton b');if(scan)scan.textContent=lang()==='tr'?'AI Görünürlüğünü Tara':'Scan AI Visibility';
  const card=document.querySelector('.mandate-card');if(card){const h=card.querySelector('h3');const p=card.querySelector(':scope > p');if(h)h.innerHTML=lang()==='tr'?'AI görünürlüğü önündeki engelleri<br>uygulanabilir düzeltmeye çevirin.':'Turn AI visibility blockers<br>into an implementation contract.';if(p)p.textContent=lang()==='tr'?'Bulgu listesini; kök neden, uygulama sırası, kabul testi, regresyon testi ve rollback içeren $99 düzeltme sözleşmesine dönüştürür.':'Convert findings into a $99 fix contract with root cause, implementation order, acceptance tests, regression tests, and rollback.';}
}
function loadCss(){if(document.querySelector('link[data-commercial-intent-css]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='/assets/css/commercial-intent.css?v=1';l.dataset.commercialIntentCss='1';document.head.appendChild(l)}
function mount(){loadCss();mountHeroThesis();mountBridge()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
window.addEventListener('hh-language-changed',()=>{document.querySelector('[data-commercial-intent]')?.remove();document.querySelector('[data-commercial-thesis]')?.remove();mountHeroThesis();mountBridge()});
})();
