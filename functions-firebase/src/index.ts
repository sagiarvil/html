import {onRequest} from 'firebase-functions/v2/https';
import {runFriendlyScan} from './scan-request';
import {providerAvailability,runMentionScan} from './mention-engine';
import {generateIntelligenceReport,INTELLIGENCE_ANALYSIS_COUNT,READINESS_LENS_COUNT,INTELLIGENCE_VERSION} from './intelligence-engine';
import {generateOpportunityReport,OPPORTUNITY_SIGNAL_COUNT,OPPORTUNITY_VERSION} from './opportunity-engine';
import {generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES,ENTERPRISE_ROADMAP_VERSION} from './remediation-engine-v3';
import {buildDeliveryPack,DELIVERY_PACK_VERSION} from './delivery-pack';
import {verifyGuestEntitlement} from './guest-entitlement';

const common={region:'us-central1' as const,timeoutSeconds:120,memory:'512MiB' as const,cors:false,invoker:'public' as const,maxInstances:10};
function harden(res:any){res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff')}
const mentionCfg=()=>({openaiApiKey:process.env.OPENAI_API_KEY,perplexityApiKey:process.env.PERPLEXITY_API_KEY,geminiApiKey:process.env.GEMINI_API_KEY});

export const health=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);
  if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  res.status(200).json({
    status:'ok',service:'htmlandhtml-validator',version:'2.5.0',remediationMandateVersion:ENTERPRISE_ROADMAP_VERSION,intelligenceLayerVersion:INTELLIGENCE_VERSION,opportunityLayerVersion:OPPORTUNITY_VERSION,deliveryPackVersion:DELIVERY_PACK_VERSION,
    scanEngines:12,intelligenceAnalyses:INTELLIGENCE_ANALYSIS_COUNT,readinessLenses:READINESS_LENS_COUNT,opportunitySignals:OPPORTUNITY_SIGNAL_COUNT,maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,freeDiagnosis:true,
    fullSiteFixMandatePriceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,deliveryPack:true,paidMandateConfigured:Boolean(process.env.MANDATE_ACCESS_TOKEN),guestDeliveryConfigured:Boolean(process.env.DELIVERY_SIGNING_SECRET),guestEntitlementBoundary:'domain+order',
    aiMentionTracker:true,aiMentionAccessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),timestamp:new Date().toISOString()
  });
});

export const scan=onRequest({...common,timeoutSeconds:240},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{const body=req.body;if(!body||typeof body.domain!=='string'||!body.domain.trim()){res.status(400).json({error:'Domain required'});return}const result=await runFriendlyScan(body.domain);const intelligence=generateIntelligenceReport(result);const opportunity=generateOpportunityReport(result);res.status(200).json({...result,intelligence,opportunity})}
  catch(e:any){const message=e?.message||'Scan failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});

export const intelligence=onRequest({...common,timeoutSeconds:240},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{const body=req.body;const target=body?.domain||body?.url||body?.target_url;if(typeof target!=='string'||!target.trim()){res.status(400).json({error:'Domain required'});return}const scan=await runFriendlyScan(target.trim());const report=generateIntelligenceReport(scan);const opportunity=generateOpportunityReport(scan);res.status(200).json({scanId:scan.scanId,domain:scan.domain,coreOverall:scan.overall,coreScores:scan.scores,intelligence:report,opportunity})}
  catch(e:any){const message=e?.message||'Intelligence audit failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});

export const mentions=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);const cfg=mentionCfg();
  if(req.method==='GET'){res.status(200).json({service:'htmlandhtml-ai-mention-tracker',paidModule:true,accessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),providers:providerAvailability(cfg),surface:'provider API/search-grounded results; consumer app results may differ'});return}
  if(req.method!=='POST'){res.status(405).json({error:'GET/POST only'});return}
  try{const access=process.env.AI_MENTION_ACCESS_TOKEN||'';if(!access){res.status(503).json({error:'AI Mention Tracker entitlement is not activated yet.'});return}const token=String(req.get('x-ai-mention-token')||'');if(!token||token!==access){res.status(402).json({error:'Paid AI Mention Tracker access required.'});return}res.status(200).json(await runMentionScan(req.body,cfg))}
  catch(e:any){res.status(400).json({error:String(e?.message||'Mention scan failed')})}
});

export const mandate=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;const target=body?.target_url||body?.url||body?.domain;if(!target||typeof target!=='string'||!target.trim()){res.status(400).json({error:'target_url or domain required'});return}
    const access=process.env.MANDATE_ACCESS_TOKEN||'';if(!access){res.status(503).json({error:'Paid implementation service is not activated: production entitlement is not configured.'});return}
    const token=String(req.get('authorization')||'').replace(/^Bearer\s+/i,'');if(!token||token!==access){res.status(402).json({error:'Valid paid entitlement required'});return}
    const scan=await runFriendlyScan(target.trim());const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    res.status(200).json({product:'AI Search Visibility Roadmap',internalContract:'FULL_SITE_FIX_MANDATE',version:ENTERPRISE_ROADMAP_VERSION,priceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,domain:scan.domain,scanId:scan.scanId,report,markdown:report.markdown,deliveryEndpoint:'/api/delivery',scan:{scanId:scan.scanId,domain:scan.domain,url:scan.url,scannedAt:scan.scannedAt,overall:scan.overall,scores:scan.scores,summary:scan.summary}})
  }catch(e:any){const message=e?.message||'AI Search Visibility Roadmap generation failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});

export const delivery=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;const target=body?.target_url||body?.url||body?.domain;if(!target||typeof target!=='string'||!target.trim()){res.status(400).json({error:'target_url or domain required'});return}
    const orderId=typeof body?.order_id==='string'?body.order_id.trim():typeof body?.orderId==='string'?body.orderId.trim():'';
    const adminSecret=process.env.MANDATE_ACCESS_TOKEN||'',guestSecret=process.env.DELIVERY_SIGNING_SECRET||'';
    if(!adminSecret&&!guestSecret){res.status(503).json({error:'Paid delivery service is not activated: entitlement secrets are missing.'});return}
    const adminToken=String(req.get('authorization')||'').replace(/^Bearer\s+/i,'');const adminOk=Boolean(adminSecret)&&adminToken===adminSecret;
    const guestToken=String(req.get('x-htmlhtml-entitlement')||'');const guestClaims=!adminOk&&guestSecret&&orderId?await verifyGuestEntitlement(guestToken,guestSecret,target.trim(),orderId):null;
    if(!adminOk&&!guestClaims){res.status(402).json({error:'Valid paid entitlement bound to this domain and order_id required'});return}
    const scan=await runFriendlyScan(target.trim());const report=generateFullSiteFixMandate(scan,body?.baseline_scan);const pack=buildDeliveryPack(scan,report,body?.locale==='tr'?'tr':'en');
    res.set('Content-Type',pack.mime);res.set('Content-Disposition',`attachment; filename="${pack.filename}"`);res.set('X-HTMLHTML-Product','AI Search Visibility Roadmap');res.set('X-HTMLHTML-Price-USD',String(FULL_SITE_FIX_MANDATE_PRICE_USD));res.set('X-HTMLHTML-Max-Pages',String(FULL_SITE_FIX_MANDATE_MAX_PAGES));res.set('X-HTMLHTML-Pack-Version',pack.version);res.set('X-HTMLHTML-Pack-Files',String(pack.files.length));res.set('X-HTMLHTML-Opportunity-Signals',String(report.opportunity.signals.length));res.set('X-HTMLHTML-Entitlement-Mode',guestClaims?'guest':'admin');res.set('X-HTMLHTML-Entitlement-Boundary',guestClaims?'domain+order':'admin');res.status(200).send(Buffer.from(pack.bytes))
  }catch(e:any){const message=e?.message||'Delivery pack generation failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});
