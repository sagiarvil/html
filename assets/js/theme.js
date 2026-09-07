(()=>{
const KEY='fs-theme-001-mode';const root=document.documentElement;let selected=localStorage.getItem(KEY)||'system';const media=matchMedia('(prefers-color-scheme: dark)');
const apply=()=>{
  const resolved = selected === 'system' ? (media.matches ? 'dark' : 'light') : selected;
  root.dataset.theme=resolved;
  root.dataset.themePreference=selected;
  root.style.colorScheme=resolved;
  document.querySelectorAll('.theme-switch button').forEach(b=>{
    b.setAttribute('aria-pressed', b.dataset.themeChoice === selected ? 'true' : 'false');
    if(b.dataset.themeChoice === selected) b.classList.add('active');
    else b.classList.remove('active');
  });
};
apply();
const link=document.createElement('link');link.rel='stylesheet';link.href='/assets/css/theme.css?v=3';if(!document.querySelector('link[href*="/assets/css/theme.css"]'))document.head.appendChild(link);
const labels={tr:{light:'Açık Tema',dark:'Koyu Tema',system:'Sistem Teması',aria:'Görünüm'},en:{light:'Light Theme',dark:'Dark Theme',system:'System Theme',aria:'Appearance'}};
const icons={
  light:'☀️',
  dark:'🌙',
  system:'⚙️'
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
    wrap.style.display='flex';
    wrap.style.gap='4px';
    for(const value of ['light','dark','system']){
      const b=document.createElement('button');
      b.type='button';
      b.dataset.themeChoice=value;
      b.innerHTML=icons[value];
      b.setAttribute('title',labels[lang][value]);
      b.setAttribute('aria-label',labels[lang][value]);
      b.setAttribute('aria-pressed', selected === value ? 'true' : 'false');
      if(selected === value) b.classList.add('active');
      b.style.background='transparent';
      b.style.border='1px solid var(--border-subtle, #e2e8f0)';
      b.style.borderRadius='4px';
      b.style.cursor='pointer';
      b.style.padding='4px 8px';
      b.style.fontSize='12px';
      b.addEventListener('click',()=>{
        selected=value;
        localStorage.setItem(KEY,value);
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
