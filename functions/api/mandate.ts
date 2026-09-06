import { runFriendlyScan } from '../lib/scan-request';
import { generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES,ENTERPRISE_ROADMAP_VERSION } from '../lib/remediation-engine-v3';

interface Env { MANDATE_ACCESS_TOKEN?: string }

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    const body:any=await request.json().catch(()=>({}));
    const target=body?.target_url||body?.url||body?.domain;
    if(typeof target!=='string'||!target.trim())return Response.json({error:'target_url or domain required'},{status:400});
    const expected=env.MANDATE_ACCESS_TOKEN;
    if(!expected)return Response.json({error:'Paid implementation service is not activated: entitlement secret is missing.'},{status:503});
    const auth=request.headers.get('authorization')||'';
    if(auth!==`Bearer ${expected}`)return Response.json({error:'Valid paid entitlement required'},{status:402});
    const scan=await runFriendlyScan(target.trim());
    const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    return Response.json({product:'AI Search Visibility Roadmap',internalContract:'FULL_SITE_FIX_MANDATE',version:ENTERPRISE_ROADMAP_VERSION,priceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,domain:scan.domain,scanId:scan.scanId,report,markdown:report.markdown,deliveryEndpoint:'/api/delivery',scan:{scanId:scan.scanId,domain:scan.domain,url:scan.url,scannedAt:scan.scannedAt,overall:scan.overall,scores:scan.scores,summary:scan.summary}},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){
    const message=e?.message||'AI Search Visibility Roadmap generation failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
