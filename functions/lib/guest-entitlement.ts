export const GUEST_ENTITLEMENT_VERSION=2 as const;
export const GUEST_PRODUCT='AI_VISIBILITY_IMPLEMENTATION_BLUEPRINT' as const;
export type GuestEntitlementClaims={v:typeof GUEST_ENTITLEMENT_VERSION;product:typeof GUEST_PRODUCT;domain:string;orderId:string;exp:number;issuedAt:number;nonce:string};

const enc=new TextEncoder();
function b64url(bytes:Uint8Array){let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function unb64url(v:string){const p=v.replace(/-/g,'+').replace(/_/g,'/');const pad=p+'='.repeat((4-p.length%4)%4);const raw=atob(pad);return Uint8Array.from(raw,c=>c.charCodeAt(0))}
function canonicalHost(v:string){try{const u=new URL(/^https?:\/\//i.test(v)?v:`https://${v}`);return u.hostname.toLowerCase().replace(/^www\./,'')}catch{return v.toLowerCase().replace(/^www\./,'').split('/')[0].split(':')[0]}}
function canonicalOrder(v:string){const s=String(v||'').trim();if(!/^[A-Za-z0-9._:-]{6,128}$/.test(s))throw new Error('Invalid order id');return s}
async function key(secret:string,usage:KeyUsage[]){return crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,usage)}

export async function createGuestEntitlement(domain:string,orderId:string,secret:string,ttlSeconds=3600):Promise<string>{
  if(secret.length<32)throw new Error('Guest entitlement signing secret must be at least 32 characters');
  const now=Math.floor(Date.now()/1000);const claims:GuestEntitlementClaims={v:2,product:GUEST_PRODUCT,domain:canonicalHost(domain),orderId:canonicalOrder(orderId),issuedAt:now,exp:now+Math.max(300,Math.min(ttlSeconds,86400)),nonce:crypto.randomUUID()};
  const body=b64url(enc.encode(JSON.stringify(claims)));const sig=new Uint8Array(await crypto.subtle.sign('HMAC',await key(secret,['sign']),enc.encode(body)));
  return `${body}.${b64url(sig)}`;
}

export async function verifyGuestEntitlement(token:string,secret:string,targetDomain:string,targetOrderId:string):Promise<GuestEntitlementClaims|null>{
  try{
    if(!token||secret.length<32||!targetOrderId)return null;const [body,sig,...extra]=token.split('.');if(!body||!sig||extra.length)return null;
    const ok=await crypto.subtle.verify('HMAC',await key(secret,['verify']),unb64url(sig),enc.encode(body));if(!ok)return null;
    const claims=JSON.parse(new TextDecoder().decode(unb64url(body))) as GuestEntitlementClaims;
    const now=Math.floor(Date.now()/1000);
    if(claims.v!==2||claims.product!==GUEST_PRODUCT||!claims.nonce||claims.exp<now||claims.issuedAt>now+60)return null;
    if(canonicalHost(claims.domain)!==canonicalHost(targetDomain))return null;
    if(canonicalOrder(claims.orderId)!==canonicalOrder(targetOrderId))return null;
    return claims;
  }catch{return null}
}
