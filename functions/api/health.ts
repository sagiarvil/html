import {BLACK_BOX_DOMAIN_COUNT,INTELLIGENCE_ANALYSIS_COUNT,READINESS_LENS_COUNT,INTELLIGENCE_VERSION} from '../lib/intelligence-engine';
interface Env{MANDATE_ACCESS_TOKEN?:string}
export const onRequestGet:PagesFunction<Env>=async({env})=>Response.json({
  status:'ok',service:'htmlandhtml-validator',version:'2.1.0',intelligenceLayerVersion:INTELLIGENCE_VERSION,
  scanEngines:18,intelligenceAnalyses:INTELLIGENCE_ANALYSIS_COUNT,readinessLenses:READINESS_LENS_COUNT,blackBoxDomains:BLACK_BOX_DOMAIN_COUNT,
  freeDiagnosis:true,paidMandateConfigured:Boolean(env.MANDATE_ACCESS_TOKEN),timestamp:new Date().toISOString()
},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});