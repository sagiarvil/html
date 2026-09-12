(()=>{
const KEY='hh-theme';const root=document.documentElement;
const media = matchMedia('(prefers-color-scheme: dark)');
function getSavedTheme() {
  try {
    const hh = localStorage.getItem('hh-theme');
    if (hh === 'light' || hh === 'dark' || hh === 'system') return hh;
  } catch(e) {}
  try {
    const v2 = localStorage.getItem('htmlandhtml-theme-v2');
    if (v2) {
      const p = JSON.parse(v2);
      if (p && p.theme) return p.theme;
    }
  } catch(e) {}
  try {
    const match = document.cookie.match(/(?:^|; )htmlandhtml-theme=([^;]*)/);
    if (match) {
      const parsed = JSON.parse(decodeURIComponent(match[1]));
      if (parsed && parsed.theme) return parsed.theme;
    }
  } catch(e) {}
  return media.matches ? 'dark' : 'light';
}
let selected = getSavedTheme();

const apply=()=>{
  let mode = selected;
  if(mode === 'system') {
    mode = media.matches ? 'dark' : 'light';
  }
  root.dataset.theme = mode;
  root.setAttribute('data-theme', mode);
  root.dataset.themePreference = selected;
  root.style.colorScheme = mode;
  root.classList.toggle('dark', mode === 'dark');
  root.classList.toggle('light', mode === 'light');
  
  // Update buttons
  document.querySelectorAll('.theme-switch button').forEach(b => {
    const act = b.dataset.themeChoice === selected;
    b.classList.toggle('active', act);
    b.setAttribute('aria-pressed', act ? 'true' : 'false');
  });
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
function loadCommercialIntent(){if(document.querySelector('[data-commercial-intent="static"]'))return;if(document.querySelector('script[data-commercial-intent-loader]'))return;const s=document.createElement('script');s.src='/assets/js/commercial-intent.js?v=3';s.defer=true;s.dataset.commercialIntentLoader='1';document.head.appendChild(s)}
function loadPaddleCheckout(){if(!document.querySelector('.checkout-card')||document.querySelector('script[data-paddle-checkout-loader]'))return;const s=document.createElement('script');s.src='/assets/js/paddle-checkout.js?v=2';s.defer=true;s.dataset.paddleCheckoutLoader='1';document.head.appendChild(s)}

function mount(){
  if(!document.querySelector('.theme-switch')){
    const lang=(document.documentElement.lang||'en').toLowerCase().startsWith('tr')?'tr':'en';
    const wrap=document.createElement('div');
    wrap.className='theme-switch';
    wrap.setAttribute('role','group');
    wrap.setAttribute('aria-label',labels[lang].aria);
    wrap.style.display = 'flex';
    wrap.style.gap = '4px';
    wrap.style.background = 'var(--theme-bg-surface, var(--bg-card, #1e2028))';
    wrap.style.border = '1px solid var(--theme-border, rgba(255,255,255,0.1))';
    wrap.style.padding = '4px';
    wrap.style.borderRadius = '20px';
    
    for(const value of ['light','system','dark']){
      const b=document.createElement('button');
      b.type='button';
      b.dataset.themeChoice=value;
      b.innerHTML=icons[value];
      b.setAttribute('title',labels[lang][value]);
      b.setAttribute('aria-label',labels[lang][value]);
      b.style.background = 'transparent';
      b.style.border = 'none';
      b.style.padding = '4px 8px';
      b.style.borderRadius = '16px';
      b.style.color = 'var(--theme-text-secondary, #94a3b8)';
      b.style.cursor = 'pointer';
      b.style.display = 'flex';
      b.style.alignItems = 'center';
      b.style.justifyContent = 'center';
      
      const isActive = value === selected;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if(isActive) {
        b.style.background = 'var(--theme-text-primary, #ffffff)';
        b.style.color = 'var(--theme-bg-base, #000000)';
      }
      
      b.addEventListener('click',()=>{
        selected=value;
        localStorage.setItem(KEY,value);
        try {
          localStorage.setItem('htmlandhtml-theme-v2', JSON.stringify({theme: value, effective: value==='system' ? (media.matches?'dark':'light') : value, timestamp: Date.now()}));
          document.cookie = 'htmlandhtml-theme=' + encodeURIComponent(JSON.stringify({theme: value})) + '; path=/; max-age=31536000; SameSite=Lax; Secure';
        } catch(e) {}
        apply();
        // Update button styles manually for instant feedback without full re-render
        wrap.querySelectorAll('button').forEach(btn => {
          const act = btn.dataset.themeChoice === selected;
          btn.classList.toggle('active', act);
          btn.setAttribute('aria-pressed', act ? 'true' : 'false');
          if(act) {
            btn.style.background = 'var(--theme-text-primary, #ffffff)';
            btn.style.color = 'var(--theme-bg-base, #000000)';
          } else {
            btn.style.background = 'transparent';
            btn.style.color = 'var(--theme-text-secondary, #94a3b8)';
          }
        });
      });
      wrap.appendChild(b);
    }
    
    const target=document.querySelector('.langs')||document.querySelector('.exec-nav-actions')||document.querySelector('.topbar')||document.body;
    if(target.classList?.contains('langs')||target.classList?.contains('exec-nav-actions'))target.prepend(wrap);
    else target.appendChild(wrap);
  }
  mountMobileNav();
  loadHomepageIntelligence();
  loadCommercialIntent();
  loadPaddleCheckout();
}

function mountMobileNav(){
  if(document.querySelector('.hh-mobile-toggle'))return;
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
