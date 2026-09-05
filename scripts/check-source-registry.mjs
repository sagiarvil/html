import fs from 'node:fs';

const registry=JSON.parse(fs.readFileSync('sources.json','utf8'));
const now=new Date();
const maxAgeDays=45;
const failures=[];
const warnings=[];
const seen=new Set();

for(const source of registry.sources||[]){
  if(!source.id||seen.has(source.id))failures.push(`${source.id||'<missing-id>'}: duplicate or missing id`);
  seen.add(source.id);
  if(typeof source.url!=='string'||!source.url.startsWith('https://')){failures.push(`${source.id}: source URL must use https`);continue}
  const verified=new Date(`${source.lastVerified}T00:00:00Z`);
  if(Number.isNaN(verified.getTime())){failures.push(`${source.id}: invalid lastVerified`);continue}
  const age=(now-verified)/86400000;
  if(age>maxAgeDays)failures.push(`${source.id}: human verification stale (${Math.floor(age)} days > ${maxAgeDays})`);
  if(age<-.5)failures.push(`${source.id}: lastVerified is in the future`);
  try{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    const res=await fetch(source.url,{redirect:'follow',signal:controller.signal,headers:{'user-agent':'Mozilla/5.0 HTMLHTML-SourceRegistry/1.0 (+https://htmlandhtml.com/standard/)','accept':'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8'}});
    clearTimeout(timer);
    if(res.status===401||res.status===403){warnings.push(`${source.id}: endpoint reachable but automated verification restricted (HTTP ${res.status})`);continue}
    if(res.status<200||res.status>=400)failures.push(`${source.id}: HTTP ${res.status} at ${res.url}`);
    else console.log(`PASS ${source.id} HTTP ${res.status} ${res.url}`);
  }catch(err){failures.push(`${source.id}: ${err?.name||'fetch-error'} ${err?.message||err}`)}
}

for(const w of warnings)console.warn(`WARN ${w}`);
if(failures.length){console.error('\nSOURCE REGISTRY FAIL');for(const f of failures)console.error(`- ${f}`);process.exit(1)}
console.log(`\nSOURCE REGISTRY PASS: ${seen.size} sources; human verification age <= ${maxAgeDays} days.`);
