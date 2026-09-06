import {runScan, type ScanResult} from './scan-engine';

const SECURITY_ERROR=/not allowed|private|reserved|credentials|non-standard ports?/i;
const IPV4=/^\d{1,3}(?:\.\d{1,3}){3}$/;

function cleanRaw(input:string){
  let value=String(input??'').trim();
  value=value.replace(/^[<"'`(\[]+|[>"'`\)\]]+$/g,'').trim();
  value=value.replace(/[.,]+$/,'').trim();
  value=value.replace(/^(?:https?|htps?):\/*(?!\/)/i,'https://');
  value=value.replace(/^(?:https?|htps?)\/\//i,'https://');
  value=value.replace(/^htps:\/\//i,'https://');
  if(value.startsWith('//'))value='https:'+value;
  if(!value)throw new Error('Domain required');
  return value;
}

function parseCandidate(value:string,defaultProtocol='https:'){
  const withScheme=/^https?:\/\//i.test(value)?value:`${defaultProtocol}//${value.replace(/^\/+/, '')}`;
  const url=new URL(withScheme);
  if(!url.hostname)throw new Error('Enter a valid domain');
  url.hostname=url.hostname.toLowerCase().replace(/\.+$/,'');
  url.hash='';
  return url;
}

function alternateHost(host:string){
  const h=host.toLowerCase().replace(/\.$/,'');
  if(!h||IPV4.test(h)||h.includes(':')||h==='localhost')return null;
  return h.startsWith('www.')?h.slice(4):`www.${h}`;
}

export function buildScanCandidates(input:string){
  const raw=cleanRaw(input);
  const explicit=/^https?:\/\//i.test(raw);
  const primary=parseCandidate(raw);
  const candidates:URL[]=[];
  const add=(u:URL)=>{if(!candidates.some(x=>x.toString()===u.toString()))candidates.push(u)};
  add(primary);

  const altHost=alternateHost(primary.hostname);
  if(altHost){const alt=new URL(primary);alt.hostname=altHost;add(alt)}

  if(!explicit||primary.protocol==='https:'){
    const http=new URL(primary);http.protocol='http:';add(http);
    if(altHost){const altHttp=new URL(http);altHttp.hostname=altHost;add(altHttp)}
  }else if(primary.protocol==='http:'){
    const https=new URL(primary);https.protocol='https:';add(https);
    if(altHost){const altHttps=new URL(https);altHttps.hostname=altHost;add(altHttps)}
  }

  return candidates.map(x=>x.toString());
}

export async function runFriendlyScan(input:string):Promise<ScanResult>{
  const candidates=buildScanCandidates(input);
  let lastError:any=null;
  for(const candidate of candidates){
    try{return await runScan(candidate)}catch(error:any){
      const message=error?.message||'Scan failed';
      if(SECURITY_ERROR.test(message))throw error;
      lastError=error;
    }
  }
  throw lastError||new Error('Scan failed');
}
