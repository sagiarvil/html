(()=>{
const KEY='hh-theme';const root=document.documentElement;
const media = matchMedia('(prefers-color-scheme: dark)');
function getSavedTheme() {
  return 'dark';
}
let selected = 'dark';

const apply=()=>{
  const mode = 'dark';
  root.dataset.theme = 'dark';
  root.setAttribute('data-theme', 'dark');
  root.dataset.themePreference = 'dark';
  root.style.colorScheme = 'dark';
  root.classList.add('dark');
  root.classList.remove('light');
  try {
    localStorage.setItem(KEY, 'dark');
    localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({theme: 'dark', effective: 'dark', timestamp: Date.now()}));
  } catch(e) {}
};

apply();

const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/theme.css?v=12';
if(!document.querySelector('link[href*="/assets/css/theme.css"]'))document.head.appendChild(link);

const labels={
  tr:{light:'Açık Tema',dark:'Koyu Tema',system:'Sistem',aria:'Tema Seçimi'},
  en:{light:'Light Theme',dark:'Dark Theme',system:'System',aria:'Theme'}
};

const icons={
  light:'<svg class="theme-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
  dark:'<svg class="theme-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  system:'<svg class="theme-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>'
};

function loadHomepageIntelligence(){if(!document.getElementById('scanForm')||document.querySelector('script[data-home-intelligence]'))return;const s=document.createElement('script');s.src='/assets/js/intelligence-root.js?v=4';s.defer=true;s.dataset.homeIntelligence='1';document.head.appendChild(s)}
function loadCommercialIntent(){if(location.pathname.indexOf('editor-photoshop')!==-1||location.pathname.indexOf('pdf-cevirici')!==-1)return;if(document.querySelector('[data-commercial-intent="static"]'))return;if(document.querySelector('script[data-commercial-intent-loader]'))return;const s=document.createElement('script');s.src='/assets/js/commercial-intent.js?v=4';s.defer=true;s.dataset.commercialIntentLoader='1';document.head.appendChild(s)}
function loadPaddleCheckout(){if(!document.querySelector('.checkout-card')||document.querySelector('script[data-paddle-checkout-loader]'))return;const s=document.createElement('script');s.src='/assets/js/paddle-checkout.js?v=2';s.defer=true;s.dataset.paddleCheckoutLoader='1';document.head.appendChild(s)}

function mount(){
  if(document.querySelector('.mac-appstore-layout') || document.body?.classList.contains('mac-appstore-body')) {
    return;
  }
  mountMobileNav();
  loadHomepageIntelligence();
  loadCommercialIntent();
  loadPaddleCheckout();
}

function mountMobileNav(){
  if(document.querySelector('.hh-mobile-toggle') || document.querySelector('.hh-mobile-menu-btn'))return;
  const topbarShell=document.querySelector('.topbar-shell')||document.querySelector('.topbar')||document.querySelector('.header-top')||document.querySelector('header');
  if(!topbarShell)return;

  const isTr=(document.documentElement.lang||'en').toLowerCase().startsWith('tr')||window.location.pathname.startsWith('/tr');

  // Hamburger Button
  const toggleBtn=document.createElement('button');
  toggleBtn.type='button';
  toggleBtn.className='hh-mobile-toggle';
  toggleBtn.setAttribute('aria-label',isTr?'Menüyü Aç':'Open Menu');
  toggleBtn.setAttribute('aria-expanded','false');
  toggleBtn.setAttribute('aria-controls','hh-mobile-menu-drawer');
  toggleBtn.innerHTML='<span class="hh-toggle-bar hh-bar-1" aria-hidden="true"></span><span class="hh-toggle-bar hh-bar-2" aria-hidden="true"></span><span class="hh-toggle-bar hh-bar-3" aria-hidden="true"></span>';

  const navActions=topbarShell.querySelector('.nav-actions')||topbarShell.querySelector('.primary-nav');
  if(navActions&&navActions.nextSibling){
    topbarShell.insertBefore(toggleBtn,navActions.nextSibling);
  } else {
    topbarShell.appendChild(toggleBtn);
  }

  // Drawer Panel
  const drawer=document.createElement('div');
  drawer.id='hh-mobile-menu-drawer';
  drawer.className='hh-mobile-drawer';
  drawer.setAttribute('role','dialog');
  drawer.setAttribute('aria-modal','true');
  drawer.setAttribute('aria-label',isTr?'Mobil Gezinme Menüsü':'Mobile Navigation Menu');
  drawer.setAttribute('hidden','');

  const links=isTr?[
    {title:'Ana Sayfa',href:'/tr/',icon:'🏠'},
    {title:'Ücretsiz AI Kontrolü',href:'/tr/site-tarama/',icon:'🔍',badge:'Canlı Test'},
    {title:'Çözümler & Görünürlük',href:'/tr/yapay-zeka-arama-gorunurlugu/',icon:'⚡'},
    {title:'GEO (Generative Engine)',href:'/tr/geo-optimizasyon/',icon:'🌐'},
    {title:'AEO (Answer Engine)',href:'/tr/aeo-answer-engine/',icon:'🎯'},
    {title:'Haberler & LLMS.txt',href:'/tr/llms-txt-haberler/',icon:'📰'},
    {title:'AI Arama Sözlüğü',href:'/tr/sozluk/',icon:'📚'},
    {title:'Onarım Seti ($99)',href:'/tr/fiyatlandirma/',icon:'🛡️',badge:'$99'},
    {title:'Metodoloji & Kanıt',href:'/methodology.html',icon:'🔬'},
    {title:'İletişim & Destek',href:'/tr/iletisim/',icon:'✉️'}
  ]:[
    {title:'Home',href:'/en/',icon:'🏠'},
    {title:'Free AI Website Audit',href:'/en/ai-crawler-checker/',icon:'🔍',badge:'Live Test'},
    {title:'AI Search Visibility',href:'/en/ai-search-visibility/',icon:'⚡'},
    {title:'GEO Optimization',href:'/en/geo-optimization/',icon:'🌐'},
    {title:'AEO Optimization',href:'/en/aeo-answer-engine-optimization/',icon:'🎯'},
    {title:'News & LLMS.txt',href:'/en/guides/llms-txt/',icon:'📰'},
    {title:'AI Glossary',href:'/en/glossary/',icon:'📚'},
    {title:'Fix Mandate ($99)',href:'/en/fix-mandate/',icon:'🛡️',badge:'$99'},
    {title:'Methodology',href:'/methodology.html',icon:'🔬'},
    {title:'Contact Support',href:'/en/contact/',icon:'✉️'}
  ];

  const currentPath=window.location.pathname;

  const linksHtml=links.map(l=>{
    const isActive=currentPath===l.href||(l.href!=='/'&&l.href!=='/tr/'&&l.href!=='/en/'&&currentPath.startsWith(l.href));
    return '<a href="'+l.href+'" class="hh-drawer-link '+(isActive?'active':'')+'">'+
      '<span class="hh-link-icon">'+l.icon+'</span>'+
      '<span class="hh-link-text">'+l.title+'</span>'+
      (l.badge?'<span class="hh-link-badge">'+l.badge+'</span>':'<span class="hh-link-arrow">→</span>')+
    '</a>';
  }).join('');

  drawer.innerHTML='<div class="hh-drawer-backdrop"></div>'+
    '<div class="hh-drawer-panel">'+
      '<div class="hh-drawer-header">'+
        '<a class="hh-drawer-brand" href="'+(isTr?'/tr/':'/en/')+'" aria-label="HTML&amp;HTML">'+
          '<img src="/assets/logo.png?v=hh6" alt="HTML&amp;HTML" width="138" height="24">'+
        '</a>'+
        '<button type="button" class="hh-drawer-close" aria-label="'+(isTr?'Menüyü Kapat':'Close Menu')+'">'+
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+
            '<line x1="18" y1="6" x2="6" y2="18"></line>'+
            '<line x1="6" y1="6" x2="18" y2="18"></line>'+
          '</svg>'+
        '</button>'+
      '</div>'+
      '<div class="hh-drawer-hero-cta">'+
        '<a href="'+(isTr?'/tr/#scanner':'/en/#scanner')+'" class="hh-cta-btn">'+
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'+
          '<span>'+(isTr?'Ücretsiz AI Denetimi Başlat':'Start Free AI Audit')+'</span>'+
        '</a>'+
      '</div>'+
      '<div class="hh-drawer-scroll">'+
        '<div class="hh-drawer-section-title">'+(isTr?'NAVİGASYON & KATEGORİLER':'NAVIGATION & CATEGORIES')+'</div>'+
        '<nav class="hh-drawer-nav" aria-label="Mobil Gezinme">'+linksHtml+'</nav>'+
      '</div>'+
      '<div class="hh-drawer-footer">'+
        '<div class="hh-drawer-row">'+
          '<div class="hh-drawer-lang-selector">'+
            '<span class="hh-footer-label">'+(isTr?'Dil:':'Lang:')+'</span>'+
            '<a href="/tr/" class="hh-lang-btn '+(isTr?'active':'')+'">TR</a>'+
            '<span class="hh-lang-sep">/</span>'+
            '<a href="/en/" class="hh-lang-btn '+(isTr?'':'active')+'">EN</a>'+
          '</div>'+
          '<div class="hh-drawer-theme-box"></div>'+
        '</div>'+
      '</div>'+
    '</div>';

  document.body.appendChild(drawer);

  const closeBtn=drawer.querySelector('.hh-drawer-close');
  const backdrop=drawer.querySelector('.hh-drawer-backdrop');

  function openDrawer(){
    drawer.removeAttribute('hidden');
    drawer.offsetHeight;
    drawer.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded','true');
    document.body.classList.add('hh-menu-locked');
    closeBtn.focus();
  }

  function closeDrawer(){
    drawer.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('hh-menu-locked');
    setTimeout(()=>{
      if(!drawer.classList.contains('is-open')){
        drawer.setAttribute('hidden','');
      }
    },280);
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click',()=>{
    if(drawer.classList.contains('is-open'))closeDrawer();
    else openDrawer();
  });

  closeBtn.addEventListener('click',closeDrawer);
  backdrop.addEventListener('click',closeDrawer);

  drawer.querySelectorAll('.hh-drawer-link, .hh-cta-btn').forEach(l=>{
    l.addEventListener('click',closeDrawer);
  });

  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&drawer.classList.contains('is-open'))closeDrawer();
  });

  const origThemeSwitch=document.querySelector('.theme-switch');
  const drawerThemeBox=drawer.querySelector('.hh-drawer-theme-box');
  if(origThemeSwitch&&drawerThemeBox){
    const cloned=origThemeSwitch.cloneNode(true);
    cloned.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const ch=btn.dataset.themeChoice;
        const tb=origThemeSwitch.querySelector('button[data-theme-choice="'+ch+'"]');
        if(tb)tb.click();
        cloned.querySelectorAll('button').forEach(b=>{
          const act=b.dataset.themeChoice===ch;
          b.classList.toggle('active',act);
          b.setAttribute('aria-pressed',act?'true':'false');
          if(act){
            b.style.background='var(--theme-text-primary, #ffffff)';
            b.style.color='var(--theme-bg-base, #000000)';
          } else {
            b.style.background='transparent';
            b.style.color='var(--theme-text-secondary, #94a3b8)';
          }
        });
      });
    });
    drawerThemeBox.appendChild(cloned);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();

window.addEventListener('hh-language-changed',e=>{
  const l=e.detail?.lang==='tr'?'tr':'en';
  const w=document.querySelector('.theme-switch');
  if(!w)return;
  w.setAttribute('aria-label',labels[l].aria);
  w.querySelectorAll('button').forEach(b=>{
    const v=b.dataset.themeChoice;
    if(labels[l]&&labels[l][v]){
      b.setAttribute('title',labels[l][v]);
      b.setAttribute('aria-label',labels[l][v]);
    }
  });
});
media.addEventListener?.('change',()=>{if(selected==='system')apply()});
})();
