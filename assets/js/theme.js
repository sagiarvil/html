(()=>{
const KEY='hh-theme';
const root=document.documentElement;
root.dataset.theme='dark';
root.dataset.themePreference='dark';
root.style.colorScheme='dark';
localStorage.setItem(KEY,'dark');

const link=document.createElement('link');
link.rel='stylesheet';
link.href='/assets/css/theme.css?v=3';
if(!document.querySelector('link[href*="/assets/css/theme.css"]'))document.head.appendChild(link);

function loadHomepageIntelligence(){if(!document.getElementById('scanForm')||document.querySelector('script[data-home-intelligence]'))return;const s=document.createElement('script');s.src='/assets/js/intelligence-root.js';s.defer=true;s.dataset.homeIntelligence='1';document.head.appendChild(s)}
function loadCommercialIntent(){if(document.querySelector('[data-commercial-intent="static"]'))return;if(document.querySelector('script[data-commercial-intent-loader]'))return;const s=document.createElement('script');s.src='/assets/js/commercial-intent.js?v=1';s.defer=true;s.dataset.commercialIntentLoader='1';document.head.appendChild(s)}
function loadPaddleCheckout(){if(!document.querySelector('.checkout-card')||document.querySelector('script[data-paddle-checkout-loader]'))return;const s=document.createElement('script');s.src='/assets/js/paddle-checkout.js?v=1';s.defer=true;s.dataset.paddleCheckoutLoader='1';document.head.appendChild(s)}

function mount(){
  document.querySelectorAll('.theme-switch, #theme-toggle-btn').forEach(el=>el.remove());
  loadHomepageIntelligence();
  loadCommercialIntent();
  loadPaddleCheckout();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
window.addEventListener('hh-language-changed',e=>{
  root.dataset.theme='dark';
  root.dataset.themePreference='dark';
  root.style.colorScheme='dark';
});
})();

