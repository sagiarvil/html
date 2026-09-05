import {onRequest} from 'firebase-functions/v2/https';
import {runScan} from './scan-engine';

const common={region:'us-central1' as const,timeoutSeconds:120,memory:'512MiB' as const,cors:false,invoker:'public' as const};
function harden(res:any){res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff')}

export const health=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  res.status(200).json({status:'ok',service:'htmlandhtml-validator',version:'2.1.0',scanEngines:12,freeDiagnosis:true,paidMandateConfigured:false,timestamp:new Date().toISOString()});
});

export const scan=onRequest(common,async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;
    if(!body||typeof body.domain!=='string'||!body.domain.trim()){res.status(400).json({error:'Domain required'});return}
    const result=await runScan(body.domain);
    res.status(200).json(result);
  }catch(e:any){
    const message=e?.message||'Scan failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    res.status(status).json({error:message});
  }
});

export const mandate=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  res.status(503).json({error:'Paid mandate service is not activated: production entitlement is not configured.'});
});
