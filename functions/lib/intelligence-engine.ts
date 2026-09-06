import type { Finding, ScanResult, SourceClass } from './scan-engine';

export const INTELLIGENCE_VERSION='1.0.0' as const;
export const INTELLIGENCE_ANALYSIS_COUNT=13 as const;
export const READINESS_LENS_COUNT=7 as const;

export type IntelligenceKey=
  |'intent_cannibalization'
  |'information_gain'
  |'answer_extractability'
  |'entity_graph_integrity'
  |'freshness_integrity'
  |'render_parity'
  |'llm_knowledge_surface'
  |'internal_link_semantic_alignment'
  |'orphan_pages'
  |'discovery_path'
  |'indexnow_readiness'
  |'structured_graph_consistency'
  |'codebase_seo_governance';

export type ReadinessLens='SEO'|'GEO'|'AEO'|'LLMO'|'AAO'|'RAG'|'E-E-A-T';
export type IntelligenceStatus='PASS'|'WARN'|'FAIL'|'NOT_MEASURED'|'REQUIRES_CONTEXT';
export type MeasurementMode='MEASURED'|'EVALUATED'|'REQUIRES_CONTEXT';
export type Effort='EASY'|'MEDIUM'|'HARD'|'REQUIRES_CONTEXT';
export type Impact='LOW'|'MEDIUM'|'HIGH'|'CRITICAL';

export interface IntelligenceAnalysis {
  key:IntelligenceKey;
  labelEn:string;
  labelTr:string;
  status:IntelligenceStatus;
  mode:MeasurementMode;
  score:number|null;
  confidence:number;
  sourceClass:SourceClass;
  impact:Impact;
  effort:Effort;
  lenses:ReadinessLens[];
  evidence:string[];
  affectedUrls:string[];
  boundaryEn:string;
  boundaryTr:string;
}

export interface ReadinessLensResult {
  lens:ReadinessLens;
  score:number;
  sourceClass:'INTERNAL_HEURISTIC';
  inputs:string[];
  unavailableInputs:IntelligenceKey[];
}

export interface IntelligencePriority {
  rank:number;
  analysis:IntelligenceKey;
  impact:Impact;
  effort:Effort;
  confidence:number;
  priorityScore:number;
  reasonEn:string;
  reasonTr:string;
}

export interface IntelligenceReport {
  version:typeof INTELLIGENCE_VERSION;
  classification:'NON_SCORING_INTELLIGENCE_LAYER';
  generatedAt:string;
  scanId:string;
  domain:string;
  coreOverall:number;
  coreScoreUnchanged:true;
  analyses:IntelligenceAnalysis[];
  readinessLenses:Record<ReadinessLens,ReadinessLensResult>;
  topPriorities:IntelligencePriority[];
  measured:number;
  evaluated:number;
  notMeasured:number;
  requiresContext:number;
  boundaries:string[];
}

const clamp=(n:number)=>Math.max(0,Math.min(100,Math.round(n)));
const uniq=<T>(xs:T[])=>[...new Set(xs)];
const has=(scan:ScanResult,id:string)=>scan.findings.some(f=>f.id===id);
const pref=(scan:ScanResult,p:string)=>scan.findings.filter(f=>f.id.startsWith(p));
const cat=(scan:ScanResult,c:string)=>scan.findings.filter(f=>f.category===c);
const urls=(fs:Finding[])=>uniq(fs.map(f=>f.url).filter(Boolean) as string[]).slice(0,20);
const evidence=(fs:Finding[])=>uniq(fs.map(f=>`${f.id}: ${f.evidence}`)).slice(0,12);
const penalty=(fs:Finding[])=>fs.reduce((sum,f)=>sum+(f.severity==='critical'?30:f.severity==='high'?20:f.severity==='medium'?12:f.severity==='low'?6:2),0);
const statusFor=(score:number):IntelligenceStatus=>score<55?'FAIL':score<80?'WARN':'PASS';
const impactRank:Record<Impact,number>={LOW:1,MEDIUM:2,HIGH:3,CRITICAL:4};
const effortDiv:Record<Effort,number>={EASY:1,MEDIUM:1.6,HARD:2.4,REQUIRES_CONTEXT:3};

function analysis(x:IntelligenceAnalysis){return x}

function intentAudit(scan:ScanResult):IntelligenceAnalysis{
  const dups=pref(scan,'TECH-DUPTITLE');
  const canon=pref(scan,'TECH-CANON');
  const score=clamp(100-penalty(dups)-Math.min(20,canon.length*3));
  return analysis({key:'intent_cannibalization',labelEn:'Search Intent & Cannibalization Audit',labelTr:'Arama Niyeti ve Kannibalizasyon Denetimi',status:statusFor(score),mode:'EVALUATED',score,confidence:dups.length?0.92:0.78,sourceClass:'INTERNAL_HEURISTIC',impact:dups.length?'HIGH':'MEDIUM',effort:'MEDIUM',lenses:['SEO','GEO','AEO'],evidence:dups.length?evidence(dups):[`No exact duplicate-title collision was measured inside the ${scan.summary?.pagesScanned||0}-page scan boundary.`],affectedUrls:urls(dups),boundaryEn:'This detects measured duplicate-title collisions and public-page differentiation signals. It is not a Search Console query-cannibalization dataset.',boundaryTr:'Bu analiz ölçülen yinelenen title çakışmalarını ve sayfa ayrışma sinyallerini değerlendirir; Search Console sorgu kannibalizasyon verisi değildir.'});
}

function informationGainAudit(scan:ScanResult):IntelligenceAnalysis{
  const dups=pref(scan,'TECH-DUPTITLE');
  const schemaTypes=(scan.summary?.schemaTypes||[]) as string[];
  const evidenceTypes=['Dataset','DataCatalog','SoftwareApplication','WebApplication','HowTo','Article','Product'].filter(t=>schemaTypes.includes(t));
  const pageCount=Number(scan.summary?.pagesScanned||1);
  const differentiation=Math.max(0,pageCount-dups.length*2);
  const score=clamp(48+Math.min(24,differentiation*2)+Math.min(18,evidenceTypes.length*6)+(Number(scan.summary?.llmsLinks||0)>0?6:0));
  const ev=[`${pageCount} public pages analyzed; ${dups.length} exact duplicate-title collision groups measured.`,evidenceTypes.length?`Evidence-bearing structured types detected: ${evidenceTypes.join(', ')}.`:'No Dataset/SoftwareApplication/HowTo/Product-style first-party structure was detected in the public schema summary.',`This score estimates within-site differentiation signals only; it does not claim to reproduce any search-engine Information Gain score.`];
  return analysis({key:'information_gain',labelEn:'Information Gain Signals Audit',labelTr:'Özgün Bilgi Değeri Sinyalleri Denetimi',status:statusFor(score),mode:'EVALUATED',score,confidence:0.76,sourceClass:'INTERNAL_HEURISTIC',impact:'HIGH',effort:'HARD',lenses:['SEO','GEO','AEO','LLMO','RAG','E-E-A-T'],evidence:ev,affectedUrls:urls(dups),boundaryEn:'Heuristic signal score from public within-site evidence. It does not measure novelty against the entire web and is not a Google ranking score.',boundaryTr:'Herkese açık site içi kanıtlardan üretilen sezgisel sinyal skorudur. Tüm web’e karşı yeniliği ölçmez ve Google sıralama skoru değildir.'});
}

function answerAudit(scan:ScanResult):IntelligenceAnalysis{
  const h1=pref(scan,'TECH-H1');
  const meta=pref(scan,'TECH-META');
  const title=pref(scan,'TECH-TITLE');
  const score=clamp(100-penalty(h1)-Math.min(20,meta.length*5)-Math.min(15,title.length*5));
  return analysis({key:'answer_extractability',labelEn:'Answer Extractability Audit',labelTr:'Doğrudan Cevap Çıkarılabilirliği Denetimi',status:statusFor(score),mode:'EVALUATED',score,confidence:0.76,sourceClass:'INTERNAL_HEURISTIC',impact:'HIGH',effort:'MEDIUM',lenses:['AEO','GEO','LLMO','RAG'],evidence:[...evidence([...h1,...meta,...title]),'Current public scanner verifies document identity and heading structure; semantic answer quality remains heuristic until page-text chunk observations are available.'],affectedUrls:urls([...h1,...meta,...title]),boundaryEn:'Structural answer-readiness signal, not a guarantee of featured snippets or AI citations.',boundaryTr:'Yapısal cevap-hazırlığı sinyalidir; featured snippet veya AI alıntısı garantisi değildir.'});
}

function entityAudit(scan:ScanResult):IntelligenceAnalysis{
  const schema=cat(scan,'schema');
  const types=(scan.summary?.schemaTypes||[]) as string[];
  const entityTypes=['Organization','Person','WebSite','WebPage','Product','Service','SoftwareApplication'].filter(t=>types.includes(t));
  const score=clamp((entityTypes.length?82:48)-penalty(schema)+Math.min(18,entityTypes.length*3));
  return analysis({key:'entity_graph_integrity',labelEn:'Entity Graph Integrity',labelTr:'Varlık Grafı Bütünlüğü',status:statusFor(score),mode:'MEASURED',score,confidence:0.88,sourceClass:'MEASURED',impact:'HIGH',effort:'MEDIUM',lenses:['GEO','LLMO','AAO','E-E-A-T','SEO'],evidence:[...evidence(schema),entityTypes.length?`Entity-bearing schema types: ${entityTypes.join(', ')}.`:'No primary Organization/Person/WebSite/Product/Service entity type was detected.'],affectedUrls:urls(schema),boundaryEn:'Public JSON-LD parse and entity-type integrity. Deep @id reference resolution is reported separately.',boundaryTr:'Herkese açık JSON-LD ayrıştırma ve varlık türü bütünlüğüdür. Derin @id referans çözümü ayrı raporlanır.'});
}

function freshnessAudit(scan:ScanResult):IntelligenceAnalysis{
  const trust=cat(scan,'trust');
  const missingDate=trust.filter(f=>/date|güncel|tarih/i.test(`${f.id} ${f.titleEn} ${f.titleTr}`));
  if(!missingDate.length){
    return analysis({key:'freshness_integrity',labelEn:'Freshness Integrity',labelTr:'Güncellik Bütünlüğü',status:'WARN',mode:'EVALUATED',score:72,confidence:0.65,sourceClass:'INTERNAL_HEURISTIC',impact:'MEDIUM',effort:'EASY',lenses:['SEO','GEO','E-E-A-T'],evidence:['The current public scan does not expose per-page datePublished/dateModified/lastmod parity, so false-freshness cannot be fully proven.'],affectedUrls:[],boundaryEn:'No arbitrary freshness threshold is used. Full verification requires page-level schema and sitemap timestamp parity.',boundaryTr:'Keyfî güncellik eşiği kullanılmaz. Tam doğrulama sayfa düzeyi schema ve sitemap tarih karşılaştırması gerektirir.'});
  }
  const score=clamp(85-penalty(missingDate));
  return analysis({key:'freshness_integrity',labelEn:'Freshness Integrity',labelTr:'Güncellik Bütünlüğü',status:statusFor(score),mode:'EVALUATED',score,confidence:0.72,sourceClass:'INTERNAL_HEURISTIC',impact:'MEDIUM',effort:'EASY',lenses:['SEO','GEO','E-E-A-T'],evidence:evidence(missingDate),affectedUrls:urls(missingDate),boundaryEn:'No arbitrary freshness threshold is used; dates are evidence, not a ranking guarantee.',boundaryTr:'Keyfî güncellik eşiği kullanılmaz; tarihler kanıttır, sıralama garantisi değildir.'});
}

function renderParityAudit(scan:ScanResult):IntelligenceAnalysis{
  return analysis({key:'render_parity',labelEn:'Hydration / Render Parity',labelTr:'Hydration / Render Eşitliği',status:'NOT_MEASURED',mode:'REQUIRES_CONTEXT',score:null,confidence:1,sourceClass:'MEASURED',impact:'HIGH',effort:'HARD',lenses:['SEO','GEO','LLMO','RAG','AAO'],evidence:['The canonical 50-page scanner fetches raw public HTTP HTML. A controlled browser-render snapshot is not available in this scan, so DOM parity is intentionally not fabricated.'],affectedUrls:[],boundaryEn:'Requires raw-HTML and controlled browser-render snapshots of the same URL.',boundaryTr:'Aynı URL için ham HTML ve kontrollü tarayıcı render görüntüsü gerekir.'});
}

function llmSurfaceAudit(scan:ScanResult):IntelligenceAnalysis{
  const fs=cat(scan,'llms');
  const score=clamp(scan.scores.llms- Math.min(15,pref(scan,'AGENT-OPENAPI').length*5));
  return analysis({key:'llm_knowledge_surface',labelEn:'LLM Knowledge Surface Audit',labelTr:'LLM Bilgi Yüzeyi Denetimi',status:statusFor(score),mode:'MEASURED',score,confidence:0.94,sourceClass:'PROPOSAL',impact:'HIGH',effort:'MEDIUM',lenses:['GEO','LLMO','AAO','RAG'],evidence:fs.length?evidence(fs):[`llms score ${scan.scores.llms}/100; ${scan.summary?.llmsLinks||0} llms.txt links detected.`],affectedUrls:urls(fs),boundaryEn:'llms.txt remains a proposal; this audit measures published surfaces and link integrity, not AI ranking eligibility.',boundaryTr:'llms.txt bir öneridir; bu denetim yayınlanan yüzeyleri ve bağlantı bütünlüğünü ölçer, AI sıralama uygunluğunu değil.'});
}

function internalLinkAudit(scan:ScanResult):IntelligenceAnalysis{
  const links=cat(scan,'links');
  const score=clamp(scan.scores.links-penalty(links)/2);
  return analysis({key:'internal_link_semantic_alignment',labelEn:'Internal Link Semantic Alignment',labelTr:'İç Bağlantı Anlamsal Uyumu',status:statusFor(score),mode:'EVALUATED',score,confidence:0.74,sourceClass:'INTERNAL_HEURISTIC',impact:'MEDIUM',effort:'MEDIUM',lenses:['SEO','GEO','RAG'],evidence:links.length?evidence(links):[`No broken/redirect link defect was measured in the ${scan.summary?.linksProbed||0}-link probe boundary. Anchor-to-target semantic similarity is not directly exposed by the current core scan.`],affectedUrls:urls(links),boundaryEn:'HTTP link integrity is measured; anchor-to-intent similarity is a heuristic and is not forced to an arbitrary percentage threshold.',boundaryTr:'HTTP bağlantı bütünlüğü ölçülür; anchor-niyet benzerliği sezgiseldir ve keyfî yüzde eşiğine zorlanmaz.'});
}

function orphanAudit(scan:ScanResult):IntelligenceAnalysis{
  const sitemap=pref(scan,'CRAWL-SITEMAP');
  if(sitemap.length){
    return analysis({key:'orphan_pages',labelEn:'Orphan Page Detection',labelTr:'Yetim Sayfa Tespiti',status:'NOT_MEASURED',mode:'REQUIRES_CONTEXT',score:null,confidence:0.98,sourceClass:'MEASURED',impact:'MEDIUM',effort:'MEDIUM',lenses:['SEO','GEO','RAG'],evidence:['sitemap.xml is unavailable, so sitemap-vs-internal-link orphan comparison cannot be performed safely.'],affectedUrls:[],boundaryEn:'Requires a sitemap URL set plus the bounded internal-link graph.',boundaryTr:'Sitemap URL kümesi ve sınırlandırılmış iç bağlantı grafı gerekir.'});
  }
  return analysis({key:'orphan_pages',labelEn:'Orphan Page Detection',labelTr:'Yetim Sayfa Tespiti',status:'WARN',mode:'EVALUATED',score:75,confidence:0.62,sourceClass:'INTERNAL_HEURISTIC',impact:'MEDIUM',effort:'MEDIUM',lenses:['SEO','GEO','RAG'],evidence:[`sitemap.xml is reachable and ${scan.summary?.pagesScanned||0} pages were scanned, but the current core result does not expose the full sitemap-vs-link-set difference.`],affectedUrls:[],boundaryEn:'Full orphan proof requires explicit sitemap and inlink sets; this layer does not invent missing URLs.',boundaryTr:'Tam yetim sayfa kanıtı açık sitemap ve inlink kümeleri gerektirir; bu katman eksik URL uydurmaz.'});
}

function discoveryAudit(scan:ScanResult):IntelligenceAnalysis{
  const relevant=[...cat(scan,'crawl'),...cat(scan,'llms'),...cat(scan,'agent'),...pref(scan,'TECH-CANON')];
  const score=clamp((scan.scores.crawl*.35)+(scan.scores.technical*.20)+(scan.scores.llms*.20)+(scan.scores.agent*.15)+(scan.scores.links*.10));
  return analysis({key:'discovery_path',labelEn:'Discovery Path Audit',labelTr:'Keşif Yolu Denetimi',status:statusFor(score),mode:'MEASURED',score,confidence:0.90,sourceClass:'MEASURED',impact:'HIGH',effort:'MEDIUM',lenses:['SEO','GEO','LLMO','AAO'],evidence:relevant.length?evidence(relevant):['robots, sitemap, canonical, llms and agent discovery surfaces passed their current bounded checks.'],affectedUrls:urls(relevant),boundaryEn:'Combines independently measured discovery surfaces; it does not imply indexing or citation placement.',boundaryTr:'Bağımsız ölçülen keşif yüzeylerini birleştirir; indekslenme veya alıntı konumu garantisi değildir.'});
}

function indexNowAudit(scan:ScanResult):IntelligenceAnalysis{
  return analysis({key:'indexnow_readiness',labelEn:'IndexNow Readiness',labelTr:'IndexNow Hazırlığı',status:'NOT_MEASURED',mode:'REQUIRES_CONTEXT',score:null,confidence:1,sourceClass:'OFFICIAL_VENDOR',impact:'LOW',effort:'EASY',lenses:['SEO'],evidence:['A public scan cannot safely infer an IndexNow key file or whether changed URLs are actually pushed to an endpoint. No score is fabricated.'],affectedUrls:[],boundaryEn:'Optional discovery acceleration surface; not required for Google or AI visibility.',boundaryTr:'İsteğe bağlı keşif hızlandırma yüzeyidir; Google veya AI görünürlüğü için zorunlu değildir.'});
}

function graphAudit(scan:ScanResult):IntelligenceAnalysis{
  const schema=cat(scan,'schema');
  const invalid=schema.filter(f=>/JSON|parse|schema/i.test(`${f.id} ${f.titleEn}`));
  const score=clamp(scan.scores.schema-penalty(invalid));
  return analysis({key:'structured_graph_consistency',labelEn:'Structured @graph Consistency',labelTr:'Yapısal @graph Tutarlılığı',status:statusFor(score),mode:'MEASURED',score,confidence:0.87,sourceClass:'MEASURED',impact:'HIGH',effort:'MEDIUM',lenses:['SEO','GEO','LLMO','AAO','E-E-A-T'],evidence:invalid.length?evidence(invalid):[`Structured-data core score ${scan.scores.schema}/100; detected schema types: ${(scan.summary?.schemaTypes||[]).join(', ')||'none'}.`],affectedUrls:urls(invalid),boundaryEn:'Current core validates parse/type presence. Full cross-page @id edge resolution requires expanded schema observations.',boundaryTr:'Mevcut çekirdek parse/tür varlığını doğrular. Tam sayfalar arası @id kenar çözümü genişletilmiş schema gözlemleri gerektirir.'});
}

function codebaseAudit(scan:ScanResult):IntelligenceAnalysis{
  return analysis({key:'codebase_seo_governance',labelEn:'Codebase SEO Governance Audit',labelTr:'Kod Tabanı SEO Yönetişim Denetimi',status:'REQUIRES_CONTEXT',mode:'REQUIRES_CONTEXT',score:null,confidence:1,sourceClass:'MEASURED',impact:'HIGH',effort:'HARD',lenses:['SEO','GEO','LLMO','AAO'],evidence:['Public HTTP scanning cannot inspect route registries, metadata generators, CI quality gates, source-level canonical logic or deployment drift. Repository/source context is required.'],affectedUrls:[],boundaryEn:'Only activates with authorized source/repository context; public scanning never guesses source-file paths.',boundaryTr:'Yalnız yetkili kaynak/repo bağlamıyla etkinleşir; herkese açık tarama kaynak dosya yollarını tahmin etmez.'});
}

function lens(scan:ScanResult, analyses:IntelligenceAnalysis[], lensName:ReadinessLens, core:[string,number][]):ReadinessLensResult{
  const relevant=analyses.filter(a=>a.lenses.includes(lensName));
  const available=relevant.filter(a=>a.score!==null) as (IntelligenceAnalysis&{score:number})[];
  const coreWeight=core.reduce((a,[,w])=>a+w,0);
  const coreScore=core.reduce((a,[k,w])=>a+(Number((scan.scores as any)[k]||0)*w),0)/(coreWeight||1);
  const intelligenceScore=available.length?available.reduce((a,x)=>a+x.score,0)/available.length:coreScore;
  const score=clamp(coreScore*.7+intelligenceScore*.3);
  return {lens:lensName,score,sourceClass:'INTERNAL_HEURISTIC',inputs:[...core.map(([k])=>`core:${k}`),...available.map(a=>`intelligence:${a.key}`)],unavailableInputs:relevant.filter(a=>a.score===null).map(a=>a.key)};
}

function priorities(analyses:IntelligenceAnalysis[]):IntelligencePriority[]{
  return analyses.filter(a=>a.score!==null&&a.status!=='PASS').map(a=>{
    const priorityScore=Number(((impactRank[a.impact]*a.confidence*25)/effortDiv[a.effort]).toFixed(2));
    return {analysis:a.key,impact:a.impact,effort:a.effort,confidence:a.confidence,priorityScore,reasonEn:`${a.labelEn}: ${a.status}, impact ${a.impact}, effort ${a.effort}.`,reasonTr:`${a.labelTr}: ${a.status}, etki ${a.impact}, efor ${a.effort}.`,rank:0};
  }).sort((a,b)=>b.priorityScore-a.priorityScore).slice(0,5).map((x,i)=>({...x,rank:i+1}));
}

export function generateIntelligenceReport(scan:ScanResult):IntelligenceReport{
  const analyses=[intentAudit(scan),informationGainAudit(scan),answerAudit(scan),entityAudit(scan),freshnessAudit(scan),renderParityAudit(scan),llmSurfaceAudit(scan),internalLinkAudit(scan),orphanAudit(scan),discoveryAudit(scan),indexNowAudit(scan),graphAudit(scan),codebaseAudit(scan)];
  if(analyses.length!==INTELLIGENCE_ANALYSIS_COUNT)throw new Error('Intelligence analysis registry drift');
  const readinessLenses:Record<ReadinessLens,ReadinessLensResult>={
    SEO:lens(scan,analyses,'SEO',[['technical',3],['crawl',2],['links',2],['schema',1],['performance',1]]),
    GEO:lens(scan,analyses,'GEO',[['ai',3],['llms',2],['schema',2],['trust',2]]),
    AEO:lens(scan,analyses,'AEO',[['technical',2],['schema',2],['trust',1]]),
    LLMO:lens(scan,analyses,'LLMO',[['ai',3],['llms',2],['schema',2],['trust',1]]),
    AAO:lens(scan,analyses,'AAO',[['agent',3],['schema',2],['security',2],['trust',1]]),
    RAG:lens(scan,analyses,'RAG',[['technical',2],['ai',2],['links',1]]),
    'E-E-A-T':lens(scan,analyses,'E-E-A-T',[['trust',3],['schema',2],['security',1]])
  };
  return {version:INTELLIGENCE_VERSION,classification:'NON_SCORING_INTELLIGENCE_LAYER',generatedAt:new Date().toISOString(),scanId:scan.scanId,domain:scan.domain,coreOverall:scan.overall,coreScoreUnchanged:true,analyses,readinessLenses,topPriorities:priorities(analyses),measured:analyses.filter(a=>a.mode==='MEASURED').length,evaluated:analyses.filter(a=>a.mode==='EVALUATED').length,notMeasured:analyses.filter(a=>a.status==='NOT_MEASURED').length,requiresContext:analyses.filter(a=>a.status==='REQUIRES_CONTEXT').length,boundaries:['The 12 canonical engine scores and overall score are not modified by this intelligence layer.','Evaluated signals are internal heuristics, not official search-engine scores.','NOT_MEASURED and REQUIRES_CONTEXT are preserved rather than converted into artificial pass/fail values.','Information Gain means public within-site differentiation signals; it is not a reproduction of any Google ranking system.']};
}
