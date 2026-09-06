import {issueRoadmapEntitlement} from '../../lib/paddle-payment';

interface Env { PADDLE_API_KEY?: string; DELIVERY_SIGNING_SECRET?: string }

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    const body:any=await request.json().catch(()=>({}));
    const transactionId=String(body?.transaction_id||body?.transactionId||'').trim();
    const domain=String(body?.domain||body?.target_domain||'').trim();
    if(!transactionId||!domain)return Response.json({error:'transaction_id and domain required'},{status:400,headers:{'cache-control':'no-store'}});
    const apiKey=String(env.PADDLE_API_KEY||'').trim(),deliverySecret=String(env.DELIVERY_SIGNING_SECRET||'').trim();
    if(!apiKey||!deliverySecret)return Response.json({error:'Paddle fulfillment is not configured.'},{status:503,headers:{'cache-control':'no-store'}});
    const result=await issueRoadmapEntitlement(transactionId,domain,apiKey,deliverySecret);
    if(!result.ok)return Response.json({error:'Payment is not eligible for this domain.',reason:result.reason},{status:result.status,headers:{'cache-control':'no-store'}});
    return Response.json({entitlement:result.token,order_id:result.orderId,domain:result.domain,expires_in:result.expiresIn},{status:200,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){
    return Response.json({error:String(e?.message||'Paddle entitlement verification failed')},{status:400,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
