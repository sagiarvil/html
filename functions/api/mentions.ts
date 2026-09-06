import {providerAvailability,runMentionScan} from '../lib/mention-engine';

type Env={OPENAI_API_KEY?:string;PERPLEXITY_API_KEY?:string;GEMINI_API_KEY?:string;AI_MENTION_ACCESS_TOKEN?:string};
const cfg=(env:Env)=>({openaiApiKey:env.OPENAI_API_KEY,perplexityApiKey:env.PERPLEXITY_API_KEY,geminiApiKey:env.GEMINI_API_KEY});
const headers={'cache-control':'no-store','x-content-type-options':'nosniff'};

export const onRequestGet:PagesFunction<Env>=async({env})=>Response.json({service:'htmlandhtml-ai-mention-tracker',paidModule:true,accessConfigured:Boolean(env.AI_MENTION_ACCESS_TOKEN),providers:providerAvailability(cfg(env)),surface:'provider API/search-grounded results; consumer app results may differ'},{headers});

export const onRequestPost:PagesFunction<Env>=async({request,env})=>{
  try{
    if(!env.AI_MENTION_ACCESS_TOKEN)return Response.json({error:'AI Mention Tracker entitlement is not activated yet.'},{status:503,headers});
    const token=request.headers.get('x-ai-mention-token')||'';
    if(!token||token!==env.AI_MENTION_ACCESS_TOKEN)return Response.json({error:'Paid AI Mention Tracker access required.'},{status:402,headers});
    const body:any=await request.json();
    const result=await runMentionScan(body,cfg(env));
    return Response.json(result,{headers});
  }catch(e:any){return Response.json({error:String(e?.message||'Mention scan failed')},{status:400,headers})}
};
