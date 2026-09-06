import {createGuestEntitlement} from './guest-entitlement';

export const PADDLE_PRICE_ID='pri_01m1t2f2jkm8w74n7j9ap4hetm' as const;
export const PADDLE_PRODUCT_KEY='HTMLHTML_AI_VISIBILITY_ROADMAP_99' as const;
export const PADDLE_ENTITLEMENT_TTL_SECONDS=3600 as const;
export const PADDLE_PURCHASE_WINDOW_DAYS=30 as const;

const enc=new TextEncoder();

export function canonicalPaymentDomain(value:string):string{
  const raw=String(value||'').trim();
  if(!raw)throw new Error('Domain required');
  const url=new URL(/^https?:\/\//i.test(raw)?raw:`https://${raw}`);
  if(!/^https?:$/.test(url.protocol))throw new Error('Invalid domain protocol');
  const host=url.hostname.toLowerCase().replace(/^www\./,'');
  if(!host||!host.includes('.')||host.length>253)throw new Error('Invalid domain');
  return host;
}

function parsePaddleSignature(header:string){
  let timestamp='';const signatures:string[]=[];
  for(const part of String(header||'').split(';')){
    const i=part.indexOf('=');if(i<1)continue;
    const key=part.slice(0,i).trim(),value=part.slice(i+1).trim();
    if(key==='ts'&&!timestamp)timestamp=value;
    if(key==='h1'&&/^[a-f0-9]{64}$/i.test(value))signatures.push(value.toLowerCase());
  }
  if(!/^\d{10,13}$/.test(timestamp)||!signatures.length)throw new Error('Invalid Paddle-Signature header');
  return {timestamp,signatures};
}

function hexBytes(hex:string){
  const out=new Uint8Array(hex.length/2);
  for(let i=0;i<out.length;i++)out[i]=Number.parseInt(hex.slice(i*2,i*2+2),16);
  return out;
}

export async function verifyPaddleSignature(rawBody:string,header:string,secret:string,toleranceSeconds=300):Promise<boolean>{
  if(!secret||secret.length<16)return false;
  let parsed:{timestamp:string;signatures:string[]};
  try{parsed=parsePaddleSignature(header)}catch{return false}
  const ts=Number(parsed.timestamp);const now=Math.floor(Date.now()/1000);
  if(!Number.isFinite(ts)||Math.abs(now-ts)>Math.max(5,toleranceSeconds))return false;
  const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
  const payload=enc.encode(`${parsed.timestamp}:${rawBody}`);
  for(const sig of parsed.signatures){
    if(await crypto.subtle.verify('HMAC',key,hexBytes(sig),payload))return true;
  }
  return false;
}

export function paddleApiBase(apiKey:string){
  if(/^pdl_sdbx_apikey_/.test(apiKey))return 'https://sandbox-api.paddle.com';
  if(/^pdl_live_apikey_/.test(apiKey))return 'https://api.paddle.com';
  throw new Error('Invalid Paddle API key environment');
}

export async function fetchPaddleTransaction(transactionId:string,apiKey:string):Promise<any>{
  if(!/^txn_[a-z\d]{26}$/.test(String(transactionId||'')))throw new Error('Invalid Paddle transaction id');
  const response=await fetch(`${paddleApiBase(apiKey)}/transactions/${encodeURIComponent(transactionId)}`,{
    headers:{Authorization:`Bearer ${apiKey}`,'Paddle-Version':'1','User-Agent':'HTMLHTML-Payment-Verification/1.0'},
    signal:AbortSignal.timeout(10000)
  });
  if(!response.ok)throw new Error(`Paddle transaction verification failed (${response.status})`);
  const payload:any=await response.json();
  if(!payload?.data?.id)throw new Error('Paddle transaction response missing data');
  return payload.data;
}

export function validatePaidRoadmapTransaction(tx:any,targetDomain:string):{ok:true;domain:string;orderId:string}|{ok:false;reason:string}{
  let domain='';try{domain=canonicalPaymentDomain(targetDomain)}catch{return {ok:false,reason:'invalid_domain'}}
  if(tx?.status!=='completed')return {ok:false,reason:'transaction_not_completed'};
  if(tx?.collection_mode&&tx.collection_mode!=='automatic')return {ok:false,reason:'unexpected_collection_mode'};
  const items=Array.isArray(tx?.items)?tx.items:[];
  if(items.length!==1||items[0]?.price?.id!==PADDLE_PRICE_ID||Number(items[0]?.quantity)!==1)return {ok:false,reason:'price_mismatch'};
  const custom=tx?.custom_data&&typeof tx.custom_data==='object'?tx.custom_data:{};
  if(custom.product_key!==PADDLE_PRODUCT_KEY)return {ok:false,reason:'product_binding_mismatch'};
  let bound='';try{bound=canonicalPaymentDomain(String(custom.target_domain||''))}catch{return {ok:false,reason:'missing_domain_binding'}}
  if(bound!==domain)return {ok:false,reason:'domain_binding_mismatch'};
  const created=Date.parse(String(tx?.created_at||''));
  if(Number.isFinite(created)&&Date.now()-created>PADDLE_PURCHASE_WINDOW_DAYS*86400_000)return {ok:false,reason:'purchase_window_expired'};
  return {ok:true,domain,orderId:String(tx.id)};
}

export async function issueRoadmapEntitlement(transactionId:string,targetDomain:string,apiKey:string,deliverySecret:string){
  if(!deliverySecret||deliverySecret.length<32)throw new Error('Delivery signing secret is not configured');
  const tx=await fetchPaddleTransaction(transactionId,apiKey);
  const verdict=validatePaidRoadmapTransaction(tx,targetDomain);
  if(!verdict.ok)return {ok:false as const,reason:verdict.reason,status:verdict.reason==='transaction_not_completed'?409:402};
  const token=await createGuestEntitlement(verdict.domain,verdict.orderId,deliverySecret,PADDLE_ENTITLEMENT_TTL_SECONDS);
  return {ok:true as const,token,domain:verdict.domain,orderId:verdict.orderId,expiresIn:PADDLE_ENTITLEMENT_TTL_SECONDS};
}
