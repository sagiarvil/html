import { auditLlms } from '../lib/llms-engine';

export const onRequestPost:PagesFunction=async({request})=>{
  try{
    const body:any=await request.json();
    if(!body||typeof body.domain!=='string'||!body.domain.trim())return Response.json({error:'Domain required'},{status:400});
    const result=await auditLlms(body.domain);
    return Response.json(result,{headers:{'cache-control':'no-store','x-content-type-options':'nosniff','access-control-allow-origin':'*'}});
  }catch(e:any){
    const message=e?.message||'llms.txt audit failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store','access-control-allow-origin':'*'}});
  }
};

export const onRequestGet:PagesFunction=async({request})=>{
  try{
    const url=new URL(request.url);const domain=url.searchParams.get('url')||url.searchParams.get('domain')||'';
    if(!domain)return Response.json({error:'url or domain query parameter required'},{status:400,headers:{'access-control-allow-origin':'*'}});
    const result=await auditLlms(domain);
    return Response.json(result,{headers:{'cache-control':'no-store','x-content-type-options':'nosniff','access-control-allow-origin':'*'}});
  }catch(e:any){const message=e?.message||'llms.txt audit failed';const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;return Response.json({error:message},{status,headers:{'cache-control':'no-store','access-control-allow-origin':'*'}})}
};
