import {onRequest} from 'firebase-functions/v2/https';
import {runFriendlyScan} from './scan-request';
import {generateIntelligenceReport,INTELLIGENCE_ANALYSIS_COUNT,READINESS_LENS_COUNT,ADVANCED_BLACKBOX_RISK_COUNT,INTELLIGENCE_VERSION} from './intelligence-engine';
import {FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES} from './remediation-engine-v2';
import {DELIVERY_PACK_VERSION} from './delivery-pack';
import {PADDLE_PRICE_ID} from './paddle-payment';
import {classifyScanError,readAdminStats,recordScanTelemetry} from './scan-telemetry';
import type {ScanTelemetryInput} from './scan-telemetry';

/**
 * Isolated production entrypoint for the non-secret scan plane.
 *
 * This module intentionally exports ONLY health, scan and intelligence and
 * intentionally contains no defineSecret() declaration. Firebase CLI loads the
 * complete source manifest before applying --only filters; keeping this entry
 * point secret-free lets the scan plane be released without inspecting or
 * modifying the already-live Paddle/delivery secret-bound functions.
 *
 * Do not add commerce/delivery exports or secret declarations here.
 */

const common={region:'us-central1' as const,timeoutSeconds:120,memory:'256MiB' as const,cors:false,invoker:'public' as const,maxInstances:2};
function harden(res:any){res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff')}

function weightedScore(rules:Array<{ok:boolean|null;weight:number}>){
  let den=0,num=0;
  for(const r of rules){if(r.ok===null)continue;den+=r.weight;if(r.ok)num+=r.weight}
  return den?Math.round(num/den*100):100;
}

function normalizePublicScanResult(result:any){
  if(!result||typeof result!=='object')return result;
  const findings=Array.isArray(result.findings)?result.findings:[];
  const googlebot=findings.find((f:any)=>f?.id==='AI-ROBOTS-GOOGLEBOT');
  if(googlebot){
    googlebot.category='crawl';
    googlebot.titleTr='Googlebot robots.txt tarafından engelleniyor';
    googlebot.titleEn='Googlebot is blocked by robots.txt';
    googlebot.impactTr='Google Search crawler erişimi engelleniyor. Etkilenen URL’lerin Google tarafından taranması ve arama görünürlüğü zarar görebilir. Bu bulgu bir AI bot erişim testi değildir.';
    googlebot.impactEn='Google Search crawler access is blocked. Google crawling and search visibility for affected URLs may be impaired. This finding is not an AI-bot access test.';
    googlebot.evidence='robots.txt decision: Googlebot path / => DISALLOW';
    googlebot.sourceClass='OFFICIAL_VENDOR';
  }
  const botCopy:Record<string,{tr:string;en:string;evidence:string}>={
    'AI-ROBOTS-OAI-SEARCHBOT':{tr:'OpenAI’nin arama amaçlı OAI-SearchBot erişimi robots.txt tarafından engelleniyor; OpenAI arama deneyimlerinde site keşfini etkileyebilir.',en:'OpenAI OAI-SearchBot access is blocked by robots.txt; this may affect site discovery in OpenAI search experiences.',evidence:'robots.txt decision: OAI-SearchBot path / => DISALLOW'},
    'AI-ROBOTS-CLAUDE-SEARCHBOT':{tr:'Anthropic’in arama amaçlı Claude-SearchBot erişimi robots.txt tarafından engelleniyor; ilgili arama deneyimlerinde site keşfini etkileyebilir.',en:'Anthropic Claude-SearchBot access is blocked by robots.txt; this may affect site discovery in related search experiences.',evidence:'robots.txt decision: Claude-SearchBot path / => DISALLOW'},
    'AI-ROBOTS-PERPLEXITYBOT':{tr:'PerplexityBot erişimi robots.txt tarafından engelleniyor; Perplexity’nin web keşif/tarama sürecinde sitenizin kullanılmasını etkileyebilir.',en:'PerplexityBot access is blocked by robots.txt; this may affect use of the site in Perplexity web discovery/crawling.',evidence:'robots.txt decision: PerplexityBot path / => DISALLOW'},
    'AI-ROBOTS-CLAUDE-USER':{tr:'Claude-User için kullanıcı yönlendirmeli web erişimi robots.txt tarafından engelleniyor; kullanıcı isteğine bağlı retrieval erişimini etkileyebilir.',en:'User-directed web access for Claude-User is blocked by robots.txt; this may affect user-requested retrieval.',evidence:'robots.txt decision: Claude-User path / => DISALLOW'}
  };
  for(const f of findings){const c=botCopy[String(f?.id||'')];if(c){f.impactTr=c.tr;f.impactEn=c.en;f.evidence=c.evidence}}
  if(result.scores&&result.policies){
    const noindexOk=!findings.some((f:any)=>f?.id==='TECH-NOINDEX-001');
    result.scores.ai=weightedScore([
      {ok:result.policies['OAI-SearchBot']?.allowed==null?null:result.policies['OAI-SearchBot'].allowed!==false,weight:30},
      {ok:result.policies['Claude-SearchBot']?.allowed==null?null:result.policies['Claude-SearchBot'].allowed!==false,weight:20},
      {ok:result.policies.PerplexityBot?.allowed==null?null:result.policies.PerplexityBot.allowed!==false,weight:20},
      {ok:noindexOk,weight:5}
    ]);
    const weights:Record<string,number>={crawl:12,technical:14,ai:12,llms:6,schema:8,performance:10,accessibility:9,security:10,trust:7,agent:3,conversion:4,links:5};
    let num=0,den=0;
    for(const [k,w] of Object.entries(weights)){if(typeof result.scores[k]!=='number')continue;num+=result.scores[k]*w;den+=w}
    if(den)result.overall=Math.round(num/den);
  }
  return result;
}

async function safeTelemetry(input:ScanTelemetryInput){
  try{
    await Promise.race([
      recordScanTelemetry(input),
      new Promise((_,reject)=>setTimeout(()=>reject(new Error('telemetry_timeout')),1800))
    ]);
  }catch(e:any){
    console.warn('scan_telemetry_unavailable',String(e?.code||e?.message||'unknown').slice(0,80));
  }
}

export const health=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  res.status(200).json({
    status:'ok',service:'htmlandhtml-validator',version:'2.5.1',remediationMandateVersion:'1.1',intelligenceLayerVersion:INTELLIGENCE_VERSION,deliveryPackVersion:DELIVERY_PACK_VERSION,
    scanEngines:18,intelligenceAnalyses:INTELLIGENCE_ANALYSIS_COUNT,readinessLenses:READINESS_LENS_COUNT,advancedBlackBoxRisks:ADVANCED_BLACKBOX_RISK_COUNT,maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,freeDiagnosis:true,
    fullSiteFixMandatePriceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,deliveryPack:true,paidMandateConfigured:Boolean(process.env.MANDATE_ACCESS_TOKEN),guestDeliveryConfigured:Boolean(process.env.DELIVERY_SIGNING_SECRET),guestEntitlementBoundary:'domain+order',
    paddleCheckout:true,paddlePriceId:PADDLE_PRICE_ID,paddleWebhook:'/api/paddle/webhook',
    aiMentionTracker:true,aiMentionAccessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),scanStatsTelemetry:true,timestamp:new Date().toISOString()
  });
});

export const scan=onRequest({...common,timeoutSeconds:240,memory:'1GiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  const started=Date.now(),body=req.body||{};
  if(body?.adminStats===true){
    res.set('X-Robots-Tag','noindex, nofollow, noarchive');
    try{
      const stats=await readAdminStats(body?.password);
      res.status(stats.status).json(stats);
    }catch(e:any){
      console.warn('admin_stats_unavailable',String(e?.code||e?.message||'unknown').slice(0,80));
      res.status(503).json({ok:false,error:'İstatistik servisi geçici olarak kullanılamıyor.'});
    }
    return;
  }
  if(typeof body.domain!=='string'||!body.domain.trim()){
    await safeTelemetry({success:false,durationMs:Date.now()-started,errorClass:'invalid_request'});
    res.status(400).json({error:'Domain required'});return;
  }
  try{
    const result=normalizePublicScanResult(await runFriendlyScan(body.domain));
    const intelligence=generateIntelligenceReport(result);
    await safeTelemetry({success:true,domain:result.domain,durationMs:Date.now()-started,pagesScanned:result.summary?.pagesScanned,linksProbed:result.summary?.linksProbed,findingCount:Array.isArray(result.findings)?result.findings.length:0,overall:result.overall});
    res.status(200).json({...result,intelligence,v2Available:true});
  }catch(e:any){
    const message=e?.message||'Scan failed';
    await safeTelemetry({success:false,durationMs:Date.now()-started,errorClass:classifyScanError(message)});
    res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message});
  }
});

export const intelligence=onRequest({...common,timeoutSeconds:240,memory:'1GiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;const target=body?.domain||body?.url||body?.target_url;
    if(typeof target!=='string'||!target.trim()){res.status(400).json({error:'Domain required'});return}
    const scan=normalizePublicScanResult(await runFriendlyScan(target.trim()));
    const report=generateIntelligenceReport(scan);
    res.status(200).json({scanId:scan.scanId,domain:scan.domain,coreOverall:scan.overall,coreScores:scan.scores,intelligence:report});
  }catch(e:any){
    const message=e?.message||'Intelligence audit failed';
    res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message});
  }
});
