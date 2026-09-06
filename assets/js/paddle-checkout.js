(()=>{
  const button=document.querySelector('[data-paddle-buy]');
  if(!button)return;
  const priceId=button.getAttribute('data-paddle-price-id')||document.querySelector('meta[name="paddle-price-id"]')?.getAttribute('content')||'';
  const token=String(window.HTMLANDHTML_PADDLE_CLIENT_TOKEN||'').trim();
  const domain=(new URLSearchParams(location.search).get('domain')||'').trim();
  const scanId=(new URLSearchParams(location.search).get('scan')||'').trim();
  const validPrice=/^pri_[a-z0-9]+$/.test(priceId);
  const validToken=/^(live|test)_[A-Za-z0-9_-]+$/.test(token);
  if(!validPrice||!validToken)return;

  const load=()=>new Promise((resolve,reject)=>{
    if(window.Paddle)return resolve(window.Paddle);
    const s=document.createElement('script');
    s.src='https://cdn.paddle.com/paddle/v2/paddle.js';
    s.async=true;
    s.onload=()=>resolve(window.Paddle);
    s.onerror=()=>reject(new Error('Paddle.js load failed'));
    document.head.appendChild(s);
  });

  load().then(Paddle=>{
    if(!Paddle||typeof Paddle.Initialize!=='function')throw new Error('Paddle unavailable');
    Paddle.Initialize({token});
    button.disabled=false;
    button.classList.remove('checkout-disabled');
    button.removeAttribute('aria-disabled');
    button.addEventListener('click',()=>{
      const customData={product:'ai_search_visibility_roadmap'};
      if(domain)customData.domain=domain;
      if(scanId)customData.scan_id=scanId;
      Paddle.Checkout.open({
        items:[{priceId,quantity:1}],
        customData,
        settings:{displayMode:'overlay'}
      });
    });
  }).catch(()=>{
    button.disabled=true;
    button.setAttribute('aria-disabled','true');
  });
})();
