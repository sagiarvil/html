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

const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/theme.css?v=6';
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
  loadHomepageIntelligence();
  loadCommercialIntent();
  loadPaddleCheckout();
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
