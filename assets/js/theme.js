(()=>{
const KEY='hh-theme';const root=document.documentElement;const valid=new Set(['light','dark','system']);let selected=localStorage.getItem(KEY)||'dark';if(!valid.has(selected)||selected==='light')selected='dark';const media=matchMedia('(prefers-color-scheme: dark)');
const apply=()=>{const resolved=selected==='system'?'dark':selected;root.dataset.theme=resolved;root.dataset.themePreference=selected;root.style.colorScheme=resolved};apply();
const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/theme.css?v=2';if(!document.querySelector('link[href*="/assets/css/theme.css"]'))document.head.appendChild(link);
const labels={tr:{light:'Açık Tema (Gündüz)',dark:'Koyu Tema (Gece)',system:'Sistem Teması (Otomatik)',aria:'Görünüm'},en:{light:'Light Theme (Day)',dark:'Dark Theme (Night)',system:'System Theme (Auto)',aria:'Appearance'}};
const icons={
  light:'<svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  dark:'<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  system:'<svg class="theme-icon theme-icon-auto" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
};
function loadHomepageIntelligence(){if(!document.getElementById('scanForm')||document.querySelector('script[data-home-intelligence]'))return;const s=document.createElement('script');s.src='/assets/js/intelligence-root.js';s.defer=true;s.dataset.homeIntelligence='1';document.head.appendChild(s)}
function loadCommercialIntent(){if(document.querySelector('[data-commercial-intent="static"]'))return;if(document.querySelector('script[data-commercial-intent-loader]'))return;const s=document.createElement('script');s.src='/assets/js/commercial-intent.js?v=1';s.defer=true;s.dataset.commercialIntentLoader='1';document.head.appendChild(s)}
function loadPaddleCheckout(){if(!document.querySelector('.checkout-card')||document.querySelector('script[data-paddle-checkout-loader]'))return;const s=document.createElement('script');s.src='/assets/js/paddle-checkout.js?v=1';s.defer=true;s.dataset.paddleCheckoutLoader='1';document.head.appendChild(s)}
function mount(){
  if(!document.querySelector('.theme-switch')){
    const lang=(document.documentElement.lang||'en').toLowerCase().startsWith('tr')?'tr':'en';
    const wrap=document.createElement('div');
    wrap.className='theme-switch';
    wrap.setAttribute('role','group');
    wrap.setAttribute('aria-label',labels[lang].aria);
    for(const value of ['light','dark','system']){
      const b=document.createElement('button');
      b.type='button';
      b.dataset.themeChoice=value;
      b.innerHTML=icons[value];
      b.setAttribute('title',labels[lang][value]);
      b.setAttribute('aria-label',labels[lang][value]);
      b.setAttribute('aria-pressed',String(selected===value));
      b.addEventListener('click',()=>{
        selected=value;
        localStorage.setItem(KEY,value);
        apply();
        wrap.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.themeChoice===selected)));
      });
      wrap.appendChild(b);
    }
    const target=document.querySelector('.langs')||document.querySelector('.topbar')||document.body;
    if(target.classList?.contains('langs'))target.prepend(wrap);
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
    if(icons[v]&&!b.querySelector('svg')){
      b.innerHTML=icons[v];
    }
  });
});
media.addEventListener?.('change',()=>{if(selected==='system')apply()});
})();
