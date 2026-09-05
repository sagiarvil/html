import registry from '../lib/standards-registry.json';
import llmsRules from '../lib/llms-rules-v2.json';
interface Env{MANDATE_ACCESS_TOKEN?:string}
export const onRequestGet:PagesFunction<Env>=async({env})=>Response.json({
  status:'ok',
  service:'htmlandhtml-validator',
  version:'3.1.0',
  scanEngines:12,
  llmsEngine:{name:'HTML&HTML Formal llms.txt Engine',version:'2.0.0',parser:'unified/remark CommonMark AST',spec:llmsRules.spec.version,specModified:llmsRules.spec.modified,ruleSet:llmsRules.ruleSetId},
  standardsRegistry:registry.registryVersion,
  standardsVerifiedAt:registry.verifiedAt,
  freeDiagnosis:true,
  paidMandateConfigured:Boolean(env.MANDATE_ACCESS_TOKEN),
  fieldCoreWebVitals:'NOT_MEASURED_WITHOUT_EXTERNAL_FIELD_DATA',
  timestamp:new Date().toISOString()
},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
