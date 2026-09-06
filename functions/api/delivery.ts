import { runFriendlyScan } from '../lib/scan-request';
import { generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES } from '../lib/remediation-engine-v2';
import { buildDeliveryPack } from '../lib/delivery-pack';

interface Env { MANDATE_ACCESS_TOKEN?: string }

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    const expected=env.MANDATE_ACCESS_TOKEN;
    if(!expected)return Response.json({error:'Paid delivery service is not activated: entitlement secret is missing.'},{status:503});
    const auth=request.headers.get('authorization')||'';
    if(auth!==`Bearer ${expected}`)return Response.json({error:'Valid paid entitlement required'},{status:402});
    const body:any=await request.json().catch(()=>({}));
    const target=body?.target_url||body?.url||body?.domain;
    if(typeof target!=='string'||!target.trim())return Response.json({error:'target_url or domain required'},{status:400});
    const locale=body?.locale==='tr'?'tr':'en';
    const scan=await runFriendlyScan(target.trim());
    const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    const pack=buildDeliveryPack(scan,report,locale);
    return new Response(pack.bytes,{status:200,headers:{
      'content-type':'application/zip',
      'content-disposition':`attachment; filename="${pack.filename}"`,
      'cache-control':'no-store',
      'x-content-type-options':'nosniff',
      'x-htmlhtml-product':'AI Visibility Implementation Blueprint',
      'x-htmlhtml-price-usd':String(FULL_SITE_FIX_MANDATE_PRICE_USD),
      'x-htmlhtml-max-pages':String(FULL_SITE_FIX_MANDATE_MAX_PAGES),
      'x-htmlhtml-pack-version':pack.version,
      'x-htmlhtml-pack-files':String(pack.files.length)
    }});
  }catch(e:any){
    const message=e?.message||'Delivery pack generation failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
