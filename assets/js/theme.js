(()=>{
const KEY='hh-theme';const root=document.documentElement;let selected='dark';localStorage.setItem(KEY,'dark');const media=matchMedia('(prefers-color-scheme: dark)');
const apply=()=>{root.dataset.theme='dark';root.dataset.themePreference='dark';root.style.colorScheme='dark'};apply();
const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/theme.css?v=2';if(!document.querySelector('link[href*="/assets/css/theme.css"]'))document.head.appendChild(link);
const labels={tr:{light:'Gece (Koyu)',dark:'Gece (Koyu)',system:'Gece (Koyu)',aria:'Görünüm'},en:{light:'Dark (Night)',dark:'Dark (Night)',system:'Dark (Night)',aria:'Appearance'}};
const icons={
  light:'<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  dark:'<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  system:'<svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
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
    for(const value of ['dark']){
      const b=document.createElement('button');
      b.type='button';
      b.dataset.themeChoice=value;
      b.innerHTML=icons[value];
      b.setAttribute('title',labels[lang][value]);
      b.setAttribute('aria-label',labels[lang][value]);
      b.setAttribute('aria-pressed','true');
      b.addEventListener('click',()=>{
        selected='dark';
        localStorage.setItem(KEY,'dark');
        apply();
      });
      wrap.appendChild(b);
    }
    const placeholder=document.getElementById('theme-toggle-btn');
    if(placeholder){
      placeholder.replaceWith(wrap);
    } else {
      const target=document.querySelector('.langs')||document.querySelector('.exec-nav-actions')||document.querySelector('.topbar')||document.body;
      if(target.classList?.contains('langs')||target.classList?.contains('exec-nav-actions'))target.prepend(wrap);
      else target.appendChild(wrap);
    }
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
