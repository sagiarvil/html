(()=>{
'use strict';
const button=document.querySelector('.checkout-disabled');
if(!button)return;
const notice=document.querySelector('.checkout-notice');
const noticeTitle=notice?.querySelector('strong');
const noticeBody=notice?.querySelector('span');
const query=new URLSearchParams(location.search);
const domainInput=document.getElementById('domainInput');
const domainBox=document.getElementById('domainBox');

let domain='',config=null,busy=false,completedTransaction='',plan=(new URLSearchParams(location.search).get('plan')==='enterprise'?'enterprise':'pro');

const lang=()=>document.documentElement.lang==='tr'?'tr':'en';
const copy={
 tr:{
   ready:()=>plan==='enterprise'?'Paddle ile güvenli öde — $499':'Paddle ile güvenli öde — $99',
   loading:'Güvenli ödeme hazırlanıyor…',
   domain:'Lütfen ödeme ve ZIP üretimi için hedef web sitesi alan adınızı girin.',
   configured:'Paddle güvenli ödeme hazır.',
   configuredBody:'Kart bilgileri HTML&HTML tarafından görülmez veya saklanmaz. Ödeme Paddle tarafından işlenir; teslim yalnız sunucu tarafında doğrulanmış işlem sonrası açılır.',
   verifying:'Ödeme doğrulanıyor…',
   building:'Ödeme doğrulandı. ZIP hazırlanıyor…',
   done:'Ödeme doğrulandı ve ZIP teslimi başlatıldı.',
   error:'Ödeme doğrulanamadı. Kartınızdan tekrar ödeme yapmayın; sayfayı yenileyip işlem durumunu tekrar kontrol edin.'
 },
 en:{
   ready:()=>plan==='enterprise'?'Pay securely with Paddle — $499':'Pay securely with Paddle — $99',
   loading:'Preparing secure checkout…',
   domain:'Please enter your target website domain for payment and ZIP delivery.',
   configured:'Paddle secure checkout is ready.',
   configuredBody:'HTML&HTML never sees or stores card details. Paddle processes payment; delivery unlocks only after server-side transaction verification.',
   verifying:'Verifying payment…',
   building:'Payment verified. Building ZIP…',
   done:'Payment verified and ZIP delivery started.',
   error:'Payment could not be verified. Do not pay again; refresh and re-check the transaction state.'
 }
};
const text=k=>{const v=copy[lang()][k];return typeof v==='function'?v():v};
function canonical(v){const u=new URL(/^https?:\/\//i.test(v)?v:`https://${v}`);const h=u.hostname.toLowerCase().replace(/^www\./,'');if(!h||!h.includes('.'))throw new Error('invalid domain');return h}
function setButton(label,disabled){button.textContent=label;button.disabled=disabled;button.style.opacity=disabled?'.58':'1';button.style.cursor=disabled?'not-allowed':'pointer'}
function setNotice(title,body){if(noticeTitle)noticeTitle.textContent=title;if(noticeBody)noticeBody.textContent=body}
function loadPaddleJs(){return new Promise((resolve,reject)=>{if(window.Paddle){resolve();return}const existing=document.querySelector('script[data-paddle-js]');if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return}const s=document.createElement('script');s.src='https://cdn.paddle.com/paddle/v2/paddle.js';s.async=true;s.dataset.paddleJs='1';s.onload=resolve;s.onerror=()=>reject(new Error('Paddle.js failed to load'));document.head.appendChild(s)})}
async function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
async function fetchEntitlement(transactionId){
 for(let attempt=0;attempt<7;attempt++){
  const r=await fetch('/api/paddle/entitlement',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({transaction_id:transactionId,domain}),cache:'no-store'});
  if(r.ok)return r.json();
  if(r.status!==409)throw new Error(`entitlement ${r.status}`);
  await sleep(Math.min(750*Math.pow(1.55,attempt),4000));
 }
 throw new Error('transaction completion timeout');
}
function filenameFrom(response){const value=response.headers.get('content-disposition')||'';const m=value.match(/filename="?([^";]+)"?/i);return m?.[1]||`htmlandhtml-${domain}-ai-visibility-roadmap.zip`}
async function deliver(entitlement){
 const r=await fetch('/api/delivery',{method:'POST',headers:{'content-type':'application/json','x-htmlhtml-entitlement':entitlement.entitlement},body:JSON.stringify({domain,order_id:entitlement.order_id,locale:lang()}),cache:'no-store'});
 if(!r.ok)throw new Error(`delivery ${r.status}`);
 const blob=await r.blob();const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filenameFrom(r);a.rel='noopener';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)
}
async function finalize(transactionId){
 if(busy||!transactionId||completedTransaction===transactionId)return;
 busy=true;completedTransaction=transactionId;setButton(text('verifying'),true);
 try{const entitlement=await fetchEntitlement(transactionId);setButton(text('building'),true);await deliver(entitlement);setNotice(text('done'),`${domain} · ${transactionId}`);setButton(text('done'),true)}
 catch(error){console.error('Paddle fulfillment failed',error);completedTransaction='';setNotice(text('error'),`${domain} · ${transactionId}`);setButton(text('ready'),false)}
 finally{busy=false}
}
function resolveDomain(){
 const raw=query.get('domain')||domainInput?.value||domainBox?.textContent||localStorage.getItem('hh-last-domain')||'';
 try{
   const c=canonical(raw);
   domain=c;
   if(domainInput&&domainInput.value!==c)domainInput.value=c;
   if(domainBox)domainBox.textContent=c;
   localStorage.setItem('hh-last-domain',c);
   return c;
 }catch{
   return '';
 }
}

async function init(){
 setButton(text('loading'),true);
 try{
  const response=await fetch('/api/paddle/config',{cache:'no-store'});if(!response.ok)throw new Error(`config ${response.status}`);config=await response.json();
  if(!config?.clientToken||!config?.priceId||!config?.productKey)throw new Error('incomplete Paddle config');
  await loadPaddleJs();
  if(config.environment==='sandbox')window.Paddle.Environment.set('sandbox');
  window.Paddle.Initialize({token:config.clientToken,eventCallback:event=>{if(event?.name==='checkout.completed'&&event?.data?.transaction_id)finalize(String(event.data.transaction_id))}});
  
  resolveDomain();

  button.addEventListener('click',()=>{
   if(busy)return;
   const d=resolveDomain();
   if(!d){
     setNotice(text('domain'),'');
     domainInput?.focus();
     domainInput?.classList.add('pulse-error');
     setTimeout(()=>domainInput?.classList.remove('pulse-error'),1200);
     return;
   }
   const isEnt=plan==='enterprise';
   const activeProductKey=isEnt?(config.productKeyEnterprise||config.productKey):config.productKey;
   const checkoutItem={priceId:config.priceId,quantity:1};
   if(isEnt&&config.priceIdEnterprise)checkoutItem.priceId=config.priceIdEnterprise;
   window.Paddle.Checkout.open({items:[checkoutItem],customData:{product_key:activeProductKey,target_domain:domain,locale:lang(),plan},settings:{displayMode:'overlay',theme:'light',locale:lang(),variant:'one-page'}});
  });

  if(domainInput){
    domainInput.addEventListener('input',()=>{
      if(resolveDomain()){setNotice(text('configured'),text('configuredBody'));setButton(text('ready'),false)}
    });
    domainInput.addEventListener('keydown',e=>{if(e.key==='Enter')button.click()});
  }

  setNotice(text('configured'),text('configuredBody'));
  setButton(text('ready'),false);
 }catch(error){console.error('Paddle checkout initialization failed',error);setButton(text('loading'),true)}
}
window.addEventListener('hh-plan-changed',e=>{if(e?.detail?.plan){plan=e.detail.plan;if(!busy&&config)setButton(text('ready'),false)}});
window.addEventListener('hh-language-changed',()=>{if(config&&!busy)setButton(text('ready'),false)});
init();
})();
