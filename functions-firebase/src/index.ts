import {onRequest} from 'firebase-functions/v2/https';
import {defineSecret} from 'firebase-functions/params';
import {runFriendlyScan} from './scan-request';
import {providerAvailability,runMentionScan} from './mention-engine';
import {generateIntelligenceReport,INTELLIGENCE_ANALYSIS_COUNT,READINESS_LENS_COUNT,ADVANCED_BLACKBOX_RISK_COUNT,INTELLIGENCE_VERSION} from './intelligence-engine';
import {generateFullSiteFixMandate,FULL_SITE_FIX_MANDATE_PRICE_USD,FULL_SITE_FIX_MANDATE_MAX_PAGES} from './remediation-engine-v2';
import {buildDeliveryPack,DELIVERY_PACK_VERSION} from './delivery-pack';
import {verifyGuestEntitlement} from './guest-entitlement';
import {issueRoadmapEntitlement,verifyPaddleSignature,PADDLE_PRICE_ID,PADDLE_PRODUCT_KEY,PADDLE_PRICE_ID_ENTERPRISE,PADDLE_PRODUCT_KEY_ENTERPRISE} from './paddle-payment';
import {classifyScanError,readAdminStats,recordScanTelemetry,ScanTelemetryInput} from './scan-telemetry';

const PADDLE_CLIENT_TOKEN=defineSecret('PADDLE_CLIENT_TOKEN');
const PADDLE_API_KEY=defineSecret('PADDLE_API_KEY');
const PADDLE_WEBHOOK_SECRET=defineSecret('PADDLE_WEBHOOK_SECRET');
const DELIVERY_SIGNING_SECRET=defineSecret('DELIVERY_SIGNING_SECRET');

const common={region:'us-central1' as const,timeoutSeconds:120,memory:'256MiB' as const,cors:false,invoker:'public' as const,maxInstances:2};
function harden(res:any){res.set('Cache-Control','no-store');res.set('X-Content-Type-Options','nosniff')}
const mentionCfg=()=>({openaiApiKey:process.env.OPENAI_API_KEY,perplexityApiKey:process.env.PERPLEXITY_API_KEY,geminiApiKey:process.env.GEMINI_API_KEY});

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
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
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

export const mentions=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);const cfg=mentionCfg();
  if(req.method==='GET'){res.status(200).json({service:'htmlandhtml-ai-mention-tracker',paidModule:true,accessConfigured:Boolean(process.env.AI_MENTION_ACCESS_TOKEN),providers:providerAvailability(cfg),surface:'provider API/search-grounded results; consumer app results may differ'});return}
  if(req.method!=='POST'){res.status(405).json({error:'GET/POST only'});return}
  try{
    const access=process.env.AI_MENTION_ACCESS_TOKEN||'';
    if(!access){res.status(503).json({error:'AI Mention Tracker entitlement is not activated yet.'});return}
    const token=String(req.get('x-ai-mention-token')||'');
    if(!token||token!==access){res.status(402).json({error:'Paid AI Mention Tracker access required.'});return}
    res.status(200).json(await runMentionScan(req.body,cfg));
  }catch(e:any){res.status(400).json({error:String(e?.message||'Mention scan failed')})}
});

export const mandate=onRequest({...common,timeoutSeconds:120,memory:'512MiB'},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;const target=body?.target_url||body?.url||body?.domain;
    if(!target||typeof target!=='string'||!target.trim()){res.status(400).json({error:'target_url or domain required'});return}
    const access=process.env.MANDATE_ACCESS_TOKEN||'';
    if(!access){res.status(503).json({error:'Paid implementation service is not activated: production entitlement is not configured.'});return}
    const token=String(req.get('authorization')||'').replace(/^Bearer\s+/i,'');
    if(!token||token!==access){res.status(402).json({error:'Valid paid entitlement required'});return}
    const scan=await runFriendlyScan(target.trim());const report=generateFullSiteFixMandate(scan,body?.baseline_scan);
    res.status(200).json({product:'AI Search Visibility Roadmap',internalContract:'FULL_SITE_FIX_MANDATE',version:'1.1',priceUsd:FULL_SITE_FIX_MANDATE_PRICE_USD,maxPages:FULL_SITE_FIX_MANDATE_MAX_PAGES,domain:scan.domain,scanId:scan.scanId,report,markdown:report.markdown,deliveryEndpoint:'/api/delivery',scan:{scanId:scan.scanId,domain:scan.domain,url:scan.url,scannedAt:scan.scannedAt,overall:scan.overall,scores:scan.scores,summary:scan.summary}});
  }catch(e:any){const message=e?.message||'AI Search Visibility Roadmap generation failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});

export const delivery=onRequest({...common,timeoutSeconds:120,memory:'512MiB',secrets:[DELIVERY_SIGNING_SECRET]},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body;const target=body?.target_url||body?.url||body?.domain;
    if(!target||typeof target!=='string'||!target.trim()){res.status(400).json({error:'target_url or domain required'});return}
    const orderId=typeof body?.order_id==='string'?body.order_id.trim():typeof body?.orderId==='string'?body.orderId.trim():'';
    const adminSecret=process.env.MANDATE_ACCESS_TOKEN||'',guestSecret=DELIVERY_SIGNING_SECRET.value()||'';
    if(!adminSecret&&!guestSecret){res.status(503).json({error:'Paid delivery service is not activated: entitlement secrets are missing.'});return}
    const adminToken=String(req.get('authorization')||'').replace(/^Bearer\s+/i,'');const adminOk=Boolean(adminSecret)&&adminToken===adminSecret;
    const guestToken=String(req.get('x-htmlhtml-entitlement')||'');const guestClaims=!adminOk&&guestSecret&&orderId?await verifyGuestEntitlement(guestToken,guestSecret,target.trim(),orderId):null;
    if(!adminOk&&!guestClaims){res.status(402).json({error:'Valid paid entitlement bound to this domain and order_id required'});return}
    const scan=await runFriendlyScan(target.trim());const report=generateFullSiteFixMandate(scan,body?.baseline_scan);const pack=buildDeliveryPack(scan,report,body?.locale==='tr'?'tr':'en');
    res.set('Content-Type',pack.mime);res.set('Content-Disposition',`attachment; filename="${pack.filename}"`);res.set('X-HTMLHTML-Product','AI Search Visibility Roadmap');res.set('X-HTMLHTML-Price-USD',String(FULL_SITE_FIX_MANDATE_PRICE_USD));res.set('X-HTMLHTML-Max-Pages',String(FULL_SITE_FIX_MANDATE_MAX_PAGES));res.set('X-HTMLHTML-Pack-Version',pack.version);res.set('X-HTMLHTML-Pack-Files',String(pack.files.length));res.set('X-HTMLHTML-Entitlement-Mode',guestClaims?'guest':'admin');res.set('X-HTMLHTML-Entitlement-Boundary',guestClaims?'domain+order':'admin');res.status(200).send(Buffer.from(pack.bytes));
  }catch(e:any){const message=e?.message||'Delivery pack generation failed';res.status(/not allowed|private|reserved|credentials|port/i.test(message)?403:400).json({error:message})}
});

export const paddleConfig=onRequest({...common,timeoutSeconds:30,memory:'256MiB',secrets:[PADDLE_CLIENT_TOKEN]},async(req,res)=>{
  harden(res);if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  const token=PADDLE_CLIENT_TOKEN.value().trim();
  const environment=token.startsWith('test_')?'sandbox':token.startsWith('live_')?'production':'unknown';
  if(environment==='unknown'){res.status(503).json({error:'Paddle checkout is not configured.'});return}
  res.status(200).json({priceId:PADDLE_PRICE_ID,productKey:PADDLE_PRODUCT_KEY,priceIdEnterprise:PADDLE_PRICE_ID_ENTERPRISE,productKeyEnterprise:PADDLE_PRODUCT_KEY_ENTERPRISE,clientToken:token,environment});
});

export const paddleEntitlement=onRequest({...common,timeoutSeconds:30,memory:'256MiB',secrets:[PADDLE_API_KEY,DELIVERY_SIGNING_SECRET]},async(req,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  try{
    const body=req.body||{};const transactionId=String(body.transaction_id||body.transactionId||'').trim();const domain=String(body.domain||body.target_domain||'').trim();
    if(!transactionId||!domain){res.status(400).json({error:'transaction_id and domain required'});return}
    const result=await issueRoadmapEntitlement(transactionId,domain,PADDLE_API_KEY.value(),DELIVERY_SIGNING_SECRET.value());
    if(!result.ok){res.status(result.status).json({error:'Payment is not eligible for this domain.',reason:result.reason});return}
    res.status(200).json({entitlement:result.token,order_id:result.orderId,domain:result.domain,expires_in:result.expiresIn});
  }catch(e:any){res.status(400).json({error:String(e?.message||'Paddle entitlement verification failed')})}
});

export const paddleWebhook=onRequest({...common,timeoutSeconds:30,memory:'256MiB',secrets:[PADDLE_WEBHOOK_SECRET]},async(req:any,res)=>{
  harden(res);if(req.method!=='POST'){res.status(405).json({error:'POST only'});return}
  const raw=req.rawBody;if(!Buffer.isBuffer(raw)){res.status(400).json({error:'Raw webhook body required'});return}
  const rawBody=raw.toString('utf8');const signature=String(req.get('paddle-signature')||'');
  if(!await verifyPaddleSignature(rawBody,signature,PADDLE_WEBHOOK_SECRET.value())){res.status(401).json({error:'Invalid Paddle signature'});return}
  let event:any;try{event=JSON.parse(rawBody)}catch{res.status(400).json({error:'Invalid JSON'});return}
  const eventType=String(event?.event_type||event?.eventType||'');const data=event?.data||{};
  const relevant=eventType==='transaction.completed'&&Array.isArray(data?.items)&&data.items.some((x:any)=>x?.price?.id===PADDLE_PRICE_ID||x?.price?.id===PADDLE_PRICE_ID_ENTERPRISE);
  res.status(200).json({ok:true,event_id:String(event?.event_id||''),event_type:eventType,relevant});
});

export const agentCard=onRequest({...common,timeoutSeconds:15,memory:'256MiB'},async(req,res)=>{
  harden(res);res.set('Content-Type','application/json; charset=utf-8');res.set('Access-Control-Allow-Origin','*');
  if(req.method!=='GET'){res.status(405).json({error:'GET only'});return}
  res.status(200).json({schemaVersion:'1.0.0',name:'HTML&HTML AI Agent',description:'Deterministic web standards, technical SEO, GEO, AEO, and AI search readiness diagnostic agent.',url:'https://htmlandhtml.com',provider:{name:'HTML&HTML',url:'https://htmlandhtml.com'},capabilities:{tools:true,streaming:false},endpoints:{scan:'https://htmlandhtml.com/api/scan',openapi:'https://htmlandhtml.com/openapi.json',mcp:'https://htmlandhtml.com/mcp'},documentation:'https://htmlandhtml.com/standard/'});
});

export const mcp=onRequest({...common,timeoutSeconds:30,memory:'256MiB'},async(req,res)=>{
  harden(res);res.set('Content-Type','application/json; charset=utf-8');res.set('Access-Control-Allow-Origin','*');
  if(req.method==='GET'||req.method==='POST'){
    res.status(200).json({name:'htmlandhtml-mcp-server',version:'1.0.0',protocolVersion:'2024-11-05',capabilities:{tools:{scan:{description:'Scan a website URL for 18-engine technical SEO, AI readiness, LLMs.txt, Schema, and accessibility signals.',inputSchema:{type:'object',properties:{url:{type:'string',description:'The URL to scan'}},required:['url']}}}},endpoint:'https://htmlandhtml.com/mcp'});return;
  }
  res.status(405).json({error:'GET or POST only'});
});
