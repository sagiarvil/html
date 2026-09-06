import {onRequest} from 'firebase-functions/v2/https';
import {runFriendlyScan} from './scan-request';
import {providerAvailability,runMentionScan} from './mention-engine';
import {generateIntelligenceReport,INTELLIGENCE_ANALYSIS_COUNT,READINESS_LENS_COUNT,INTELLIGENCE_VERSION} from './intelligence-engine';
import {generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES} from './remediation-engine-v2';

const common={region:'us-central1' as const,timeoutSeconds:120,memory:'512MiB' as const,cors:false,invoker:'public' as const,maxInstances:10};
function harden(res:any){res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff')}
const mentionCfg=()=>({openaiApiKey:process.env.OPENAI_API_KEY,perplexityApiKey:process.env.PERPLEXITY_API_KEY,geminiApiKey:process.env.GEMINI_API_KEY});

export const health=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  res.status(200).json({
    status:'ok',
    service:'htmlandhtml-validator',
    version:'2.3.0',
    remediationMandateVersion:'1.1',
    intelligenceLayerVersion:INTELLIGENCE_VERSION,
    scanEngines:12,
    intelligenceAnalyses:INTELLIGENCE_ANALYSIS_COUNT,
    readinessLenses:READINESS_LENS_COUNT,
    maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,
    freeDiagnosis:true,
    fullSiteFixMandatePriceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,
    paidMandateConfigured:Boolean(process.env.MANDATE_ACCESS_TOKEN),
    aiMentionTracker:true,
    aiMentionAccessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),
    timestamp:new Date().toISOString()
  });
});

export const scan=onRequest({...common,timeoutSeconds:240},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;
    if(!body||typeof body.domain!=='string'||!body.domain.trim()){res.status(400).json({error:'Domain required'});return}
    const result=await runFriendlyScan(body.domain);
    const intelligence=generateIntelligenceReport(result);
    res.status(200).json({...result,intelligence});
  }catch(e:any){
    const message=e?.message||'Scan failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    res.status(status).json({error:message});
  }
});

export const intelligence=onRequest({...common,timeoutSeconds:240},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;
    const target=body?.domain||body?.url||body?.target_url;
    if(typeof target!=='string'||!target.trim()){res.status(400).json({error:'Domain required'});return}
    const scan=await runFriendlyScan(target.trim());
    const report=generateIntelligenceReport(scan);
    res.status(200).json({scanId:scan.scanId,domain:scan.domain,coreOverall:scan.overall,coreScores:scan.scores,intelligence:report});
  }catch(e:any){
    const message=e?.message||'Intelligence audit failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    res.status(status).json({error:message});
  }
});

export const mentions=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);
  const cfg=mentionCfg();
  if(req.method==='GET'){
    res.status(200).json({service:'htmlandhtml-ai-mention-tracker',paidModule:true,accessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),providers:providerAvailability(cfg),surface:'provider API/search-grounded results; consumer app results may differ'});return;
  }
  if(req.method!=='POST'){res.status(405).json({error:'GET/POST only'});return}
  try{
    const access=process.env.AI_MENTION_ACCESS_TOKEN||'';
    if(!access){res.status(503).json({error:'AI Mention Tracker entitlement is not activated yet.'});return}
    const token=String(req.get('x-ai-mention-token')||'');
    if(!token||token!==access){res.status(402).json({error:'Paid AI Mention Tracker access required.'});return}
    const result=await runMentionScan(req.body, cfg);
    res.status(200).json(result);
  }catch(e:any){res.status(400).json({error:String(e?.message||'Mention scan failed')})}
});

export const mandate=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;
    const target=body?.target_url||body?.url||body?.domain;
    if(!target||typeof target!=='string'||!target.trim()){res.status(400).json({error:'target_url or domain required'});return}
    const access=process.env.MANDATE_ACCESS_TOKEN||'';
    if(!access){res.status(503).json({error:'Paid mandate service is not activated: production entitlement is not configured.'});return}
    const token=String(req.get('authorization')||'').replace(/^Bearer\s+/i,'');
    if(!token||token!==access){res.status(402).json({error:'Valid paid entitlement required'});return}
    const scan=await runFriendlyScan(target.trim());
    const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    res.status(200).json({
      product:'Full Site Fix Mandate',
      version:'1.1',
      priceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,
      maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,
      domain:scan.domain,
      scanId:scan.scanId,
      report,
      markdown:report.markdown,
      scan:{scanId:scan.scanId,domain:scan.domain,url:scan.url,scannedAt:scan.scannedAt,overall:scan.overall,scores:scan.scores,summary:scan.summary}
    });
  }catch(e:any){
    const message=e?.message||'Mandate generation failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    res.status(status).json({error:message});
  }
});
