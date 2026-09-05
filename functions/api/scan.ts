import { runScan } from '../lib/scan-orchestrator';

const CACHE_TTL_MS=90_000;
const cache=new Map<string,{expires:number,value:any}>();
function cacheKey(domain:string){return domain.trim().toLowerCase().replace(/#.*$/,'')}
function cleanup(now:number){if(cache.size<500)return;for(const [k,v] of cache)if(v.expires<=now)cache.delete(k)}

export const onRequestPost:PagesFunction=async({request})=>{
  try{
    const body:any=await request.json();
    if(!body||typeof body.domain!=='string'||!body.domain.trim())return Response.json({error:'Domain required'},{status:400});
    const key=cacheKey(body.domain),now=Date.now();cleanup(now);
    const hit=cache.get(key);
    if(!body.fresh&&hit&&hit.expires>now)return Response.json({...hit.value,cache:{hit:true,ttlSeconds:Math.ceil((hit.expires-now)/1000)}},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
    const result=await runScan(body.domain);
    cache.set(key,{expires:now+CACHE_TTL_MS,value:result});
    return Response.json({...result,cache:{hit:false,ttlSeconds:Math.ceil(CACHE_TTL_MS/1000)}},{headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch(e:any){
    const message=e?.message||'Scan failed';
    const status=/not allowed|private|reserved|credentials|port/i.test(message)?403:400;
    return Response.json({error:message},{status,headers:{'cache-control':'no-store'}});
  }
};

export const onRequestGet:PagesFunction=()=>Response.json({error:'POST only'},{status:405});
