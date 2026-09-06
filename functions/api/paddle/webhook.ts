import {verifyPaddleSignature,PADDLE_PRICE_ID,PADDLE_PRODUCT_KEY,PADDLE_PRICE_ID_ENTERPRISE,PADDLE_PRODUCT_KEY_ENTERPRISE} from '../../lib/paddle-payment';

interface Env { PADDLE_WEBHOOK_SECRET?: string }

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  const rawBody=await request.text();
  const signature=request.headers.get('paddle-signature')||'';
  const secret=String(env.PADDLE_WEBHOOK_SECRET||'').trim();
  if(!secret)return Response.json({error:'Paddle webhook is not configured.'},{status:503,headers:{'cache-control':'no-store'}});
  if(!await verifyPaddleSignature(rawBody,signature,secret))return Response.json({error:'Invalid Paddle signature'},{status:401,headers:{'cache-control':'no-store'}});
  let event:any;
  try{event=JSON.parse(rawBody)}catch{return Response.json({error:'Invalid JSON'},{status:400,headers:{'cache-control':'no-store'}})}
  const eventType=String(event?.event_type||event?.eventType||'');
  const data=event?.data||{};
  const relevant=eventType==='transaction.completed'&&Array.isArray(data?.items)&&data.items.some((x:any)=>x?.price?.id===PADDLE_PRICE_ID || x?.price?.id===PADDLE_PRICE_ID_ENTERPRISE);
  return Response.json({ok:true,event_id:String(event?.event_id||''),event_type:eventType,relevant},{status:200,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
