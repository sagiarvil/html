import { runFriendlyScan } from '../lib/scan-request';
import { generateIntelligenceReport } from '../lib/intelligence-engine';
import { generateOpportunityReport } from '../lib/opportunity-engine';

export const onRequestPost:PagesFunction=async({request})=>{
  try{
    const body:any=await request.json();
    const target=body?.domain||body?.url||body?.target_url;
    if(typeof target!=='string'||!target.trim())return Response.json({error:'Domain required'},{status:400});
    const scan=await runFriendlyScan(target.trim());
    const intelligence=generateIntelligenceReport(scan);
    const opportunity=generateOpportunityReport(scan);
    return Response.json({scanId:scan.scanId,domain:scan.domain,coreOverall:scan.overall,coreScores:scan.scores,intelligence,opportunity},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){
    const message=e?.message||'Intelligence audit failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
