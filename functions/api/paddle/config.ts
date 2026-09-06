import {PADDLE_PRICE_ID,PADDLE_PRODUCT_KEY,PADDLE_PRICE_ID_ENTERPRISE,PADDLE_PRODUCT_KEY_ENTERPRISE} from '../../lib/paddle-payment';

interface Env { PADDLE_CLIENT_TOKEN?: string }

export const onRequestGet:PagesFunction<Env>=async({env})=>{
  const token=String(env.PADDLE_CLIENT_TOKEN||'').trim();
  if(!token)return Response.json({error:'Paddle checkout is not configured.'},{status:503,headers:{'cache-control':'no-store'}});
  const environment=token.startsWith('test_')?'sandbox':token.startsWith('live_')?'production':'unknown';
  if(environment==='unknown')return Response.json({error:'Invalid Paddle client token.'},{status:503,headers:{'cache-control':'no-store'}});
  return Response.json({priceId:PADDLE_PRICE_ID,productKey:PADDLE_PRODUCT_KEY,priceIdEnterprise:PADDLE_PRICE_ID_ENTERPRISE,productKeyEnterprise:PADDLE_PRODUCT_KEY_ENTERPRISE,clientToken:token,environment},{status:200,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
};

export const onRequestPost:PagesFunction=()=>Response.json({error:'GET only'},{status:405});
