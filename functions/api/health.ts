interface Env{MANDATE_ACCESS_TOKEN?:string}
export const onRequestGet:PagesFunction<Env>=async({env})=>Response.json({status:'ok',service:'htmlandhtml-validator',version:'2.0.0',scanEngines:12,freeDiagnosis:true,paidMandateConfigured:Boolean(env.MANDATE_ACCESS_TOKEN),timestamp:new Date().toISOString()},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
