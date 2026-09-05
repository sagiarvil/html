interface Env{MANDATE_ACCESS_TOKEN?:string}
export const onRequestGet:PagesFunction<Env>=async({env})=>Response.json({
  status:'ok',
  service:'htmlandhtml-validator',
  version:'3.1.0',
  scanEngines:12,
  llmsEngine:{name:'HTML&HTML Formal llms.txt Engine',version:'1.0.0',spec:'v2',specModified:'2026-08-10'},
  standardsRegistry:'2026.09.05',
  freeDiagnosis:true,
  paidMandateConfigured:Boolean(env.MANDATE_ACCESS_TOKEN),
  fieldCoreWebVitals:'NOT_MEASURED_WITHOUT_EXTERNAL_FIELD_DATA',
  timestamp:new Date().toISOString()
},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
