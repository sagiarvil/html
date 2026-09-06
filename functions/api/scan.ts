import { runFriendlyScan } from '../lib/scan-request';
import { generateIntelligenceReport } from '../lib/intelligence-engine';

export const onRequestPost:PagesFunction=async({request})=>{
  try{
    const body:any=await request.json();
    if(!body||typeof body.domain!=='string'||!body.domain.trim())return Response.json({error:'Domain required'},{status:400});
    const result=await runFriendlyScan(body.domain);
    const intelligence=generateIntelligenceReport(result);
    return Response.json({...result,intelligence},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){
    const message=e?.message||'Scan failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
