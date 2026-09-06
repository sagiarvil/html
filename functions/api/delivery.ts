import { runFriendlyScan } from '../lib/scan-request';
import { generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES } from '../lib/remediation-engine-v2';
import { buildDeliveryPack } from '../lib/delivery-pack';
import { verifyGuestEntitlement } from '../lib/guest-entitlement';

interface Env { MANDATE_ACCESS_TOKEN?: string; DELIVERY_SIGNING_SECRET?: string }

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    const body:any=await request.json().catch(()=>({}));
    const target=body?.target_url||body?.url||body?.domain;
    if(typeof target!=='string'||!target.trim())return Response.json({error:'target_url or domain required'},{status:400});
    const orderId=typeof body?.order_id==='string'?body.order_id.trim():typeof body?.orderId==='string'?body.orderId.trim():'';
    const adminSecret=env.MANDATE_ACCESS_TOKEN||'';
    const guestSecret=env.DELIVERY_SIGNING_SECRET||'';
    if(!adminSecret&&!guestSecret)return Response.json({error:'Paid delivery service is not activated: entitlement secrets are missing.'},{status:503});
    const auth=request.headers.get('authorization')||'';
    const guestToken=request.headers.get('x-htmlhtml-entitlement')||'';
    const adminOk=Boolean(adminSecret)&&auth===`Bearer ${adminSecret}`;
    const guestClaims=!adminOk&&guestSecret&&orderId?await verifyGuestEntitlement(guestToken,guestSecret,target.trim(),orderId):null;
    if(!adminOk&&!guestClaims)return Response.json({error:'Valid paid entitlement bound to this domain and order_id required'},{status:402});
    const locale=body?.locale==='tr'?'tr':'en';
    const scan=await runFriendlyScan(target.trim());
    const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    const pack=buildDeliveryPack(scan,report,locale);
    return new Response(pack.bytes,{status:200,headers:{
      'content-type':'application/zip',
      'content-disposition':`attachment; filename="${pack.filename}"`,
      'cache-control':'no-store',
      'x-content-type-options':'nosniff',
      'x-htmlhtml-product':'AI Search Visibility Roadmap',
      'x-htmlhtml-price-usd':String(FULL_SITE_FIX_MANDATE_PRICE_USD),
      'x-htmlhtml-max-pages':String(FULL_SITE_FIX_MANDATE_MAX_PAGES),
      'x-htmlhtml-pack-version':pack.version,
      'x-htmlhtml-pack-files':String(pack.files.length),
      'x-htmlhtml-entitlement-mode':guestClaims?'guest':'admin',
      'x-htmlhtml-entitlement-boundary':guestClaims?'domain+order':'admin'
    }});
  }catch(e:any){
    const message=e?.message||'Delivery pack generation failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
