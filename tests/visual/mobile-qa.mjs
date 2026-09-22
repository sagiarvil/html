import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const root=process.cwd();
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.txt':'text/plain; charset=utf-8'};
function resolvePath(urlPath){
  const clean=decodeURIComponent(urlPath.split('?')[0]).replace(/\\/g,'/');
  let rel=clean.replace(/^\/+/, '');
  if(!rel)rel='index.html';
  let target=path.resolve(root,rel);
  if(!target.startsWith(path.resolve(root)))return null;
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  if(!fs.existsSync(target)&&!path.extname(target)&&fs.existsSync(target+'.html'))target+='.html';
  return fs.existsSync(target)&&fs.statSync(target).isFile()?target:null;
}
const server=http.createServer((req,res)=>{
  const target=resolvePath(req.url||'/');
  if(!target){res.writeHead(404);res.end('Not found');return}
  res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream','cache-control':'no-store'});fs.createReadStream(target).pipe(res);
});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
const port=server.address().port;
const base=`http://127.0.0.1:${port}`;
const viewports=[{width:360,height:800},{width:390,height:844},{width:430,height:932},{width:768,height:1024},{width:1280,height:900}];
const reportRoute='/enterprise-analyzer/htmlandhtml-ai-report';
const routes=['/','/tr/fiyatlandirma/','/tr/araclar/','/tr/yapay-zeka-arama-gorunurlugu/','/tr/referans/',reportRoute];
const errors=[];
const browser=await chromium.launch({headless:true});
try{
  for(const vp of viewports){
    for(const route of routes){
      const page=await browser.newPage({viewport:vp});
      await page.emulateMedia({reducedMotion:'reduce'});
      if(route===reportRoute){
        await page.addInitScript(()=>{
          localStorage.setItem('hh-theme','light');
          localStorage.setItem('htmlandhtml-theme-v2',JSON.stringify({theme:'light'}));
        });
      }
      const response=await page.goto(base+route,{waitUntil:'networkidle'});
      if(!response||!response.ok()){errors.push(`${vp.width}px ${route}: HTTP ${response?.status()}`);await page.close();continue}
      const state=await page.evaluate(()=>{
        const h1=document.querySelector('h1');const meta=document.querySelector('meta[name="viewport"]');
        return {scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,h1Visible:Boolean(h1&&h1.getBoundingClientRect().width>0&&h1.getBoundingClientRect().height>0),h1Size:h1?parseFloat(getComputedStyle(h1).fontSize):0,viewportMeta:meta?.getAttribute('content')||''};
      });
      if(state.scrollWidth>state.innerWidth+1){
        const offenders=await page.evaluate(()=>{
          const vw=window.innerWidth;
          return [...document.querySelectorAll('body *')].map((el)=>{
            const r=el.getBoundingClientRect();
            const cs=getComputedStyle(el);
            return {tag:el.tagName,cls:String(el.className||'').slice(0,120),id:el.id||'',left:Math.round(r.left*10)/10,right:Math.round(r.right*10)/10,width:Math.round(r.width*10)/10,position:cs.position,display:cs.display,overflowX:cs.overflowX};
          }).filter(x=>x.display!=='none'&&(x.right>vw+1||x.left<-1)).sort((a,b)=>(Math.max(b.right-vw,-b.left)-Math.max(a.right-vw,-a.left))).slice(0,12);
        });
        errors.push(`${vp.width}px ${route}: horizontal overflow ${state.scrollWidth}>${state.innerWidth}; offenders=${JSON.stringify(offenders)}`);
      }
      if(!state.h1Visible)errors.push(`${vp.width}px ${route}: H1 not visibly rendered`);
      if(state.h1Size>92)errors.push(`${vp.width}px ${route}: giant H1 ${state.h1Size}px`);
      if(!/width=device-width/i.test(state.viewportMeta))errors.push(`${vp.width}px ${route}: viewport meta missing`);
      if(vp.width<=430){
        const mobileAudit=await page.evaluate(()=>{
          const vw=window.innerWidth;
          const visible=[...document.querySelectorAll('a,button,input,textarea,select,h1,h2,h3,p')].filter(el=>{
            const r=el.getBoundingClientRect(),cs=getComputedStyle(el);
            return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0&&r.bottom>0&&r.top<window.innerHeight*3;
          });
          const clipped=visible.filter(el=>{
            const r=el.getBoundingClientRect(),cs=getComputedStyle(el);
            const cls=String(el.className||'');
            if(['fixed','absolute'].includes(cs.position))return false;
            if(cls.includes('sr-only')||cls.includes('skip'))return false;
            return r.right>vw+1||r.left<-1;
          }).slice(0,10).map(el=>({tag:el.tagName,cls:String(el.className||'').slice(0,80),text:(el.textContent||'').trim().slice(0,80)}));
          const touchSelectors=['#scanButton','.decision-btn','.hero-actions a','.ai-opportunity-actions a','.reference-premium__actions a','.hh-mobile-menu-btn','.hh-mobile-toggle','.hh-dock-item','.langs a','.langs button'];
          const touch=[...document.querySelectorAll(touchSelectors.join(','))].filter(el=>{const r=el.getBoundingClientRect(),cs=getComputedStyle(el);return cs.display!=='none'&&cs.visibility!=='hidden'&&r.width>0&&r.height>0;});
          const tinyTap=touch.filter(el=>{const r=el.getBoundingClientRect();return r.width<40||r.height<40;}).slice(0,10).map(el=>({tag:el.tagName,cls:String(el.className||'').slice(0,80),w:Math.round(el.getBoundingClientRect().width),h:Math.round(el.getBoundingClientRect().height),text:(el.textContent||'').trim().slice(0,80)}));
          return {clipped,tinyTap};
        });
        if(mobileAudit.clipped.length)errors.push(`${vp.width}px ${route}: visible content clipped/offscreen ${JSON.stringify(mobileAudit.clipped)}`);
        if(['/','/tr/referans/'].includes(route)&&mobileAudit.tinyTap.length)errors.push(`${vp.width}px ${route}: undersized tap targets ${JSON.stringify(mobileAudit.tinyTap)}`);
      }
      await page.keyboard.press('Tab');
      const focus=await page.evaluate(()=>document.activeElement?.tagName||'');
      if(!focus||focus==='BODY'||focus==='HTML')errors.push(`${vp.width}px ${route}: keyboard focus did not enter an interactive element`);
      if(route==='/'){
        const scan=await page.evaluate(()=>{const i=document.querySelector('#domainInput'),b=document.querySelector('#scanButton')||document.querySelector('#scanForm button');if(!i||!b)return null;const a=i.getBoundingClientRect(),c=b.getBoundingClientRect();return {input:{x:a.x,y:a.y,w:a.width,h:a.height,r:a.right,b:a.bottom},button:{x:c.x,y:c.y,w:c.width,h:c.height,r:c.right,b:c.bottom}}});
        if(scan){
          const overlap=!(scan.input.r<=scan.button.x||scan.button.r<=scan.input.x||scan.input.b<=scan.button.y||scan.button.b<=scan.input.y);
          if(overlap)errors.push(`${vp.width}px home: scanner input/CTA overlap`);
          if(scan.input.w<180)errors.push(`${vp.width}px home: URL input too narrow (${Math.round(scan.input.w)}px)`);
          if(vp.width<=640&&scan.button.w<Math.min(260,vp.width-48))errors.push(`${vp.width}px home: mobile CTA does not use available width`);
        }
      }
      if(route==='/tr/fiyatlandirma/'){
        const manifest=await page.locator('.pricing-delivery-manifest').count();
        if(!manifest)errors.push(`${vp.width}px pricing: canonical ZIP manifest missing`);
      }
      if(route==='/tr/araclar/'){
        const scope=await page.locator('[data-premium-infographic="scope-map"]').count();
        if(!scope)errors.push(`${vp.width}px tools: unified scan scope map missing`);
      }
      if(route===reportRoute){
        const darkAudit=await page.evaluate(()=>{
          const root=document.documentElement;
          const parseRgb=(value)=>{
            const m=value&&value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
            return m?{r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]}:null;
          };
          const isNeutralLight=(value)=>{
            const c=parseRgb(value);if(!c||c.a<0.72)return false;
            const max=Math.max(c.r,c.g,c.b),min=Math.min(c.r,c.g,c.b),mean=(c.r+c.g+c.b)/3;
            return mean>=225&&(max-min)<=28;
          };
          const samples={};
          for(const selector of ['body','.topbar','.ea-hud-score-card','.ea-hud-pillars-card','.ea-engine-card','.finding-card','.evidence-box','.ea-file-viewer','.action-bar-inner']){
            const el=document.querySelector(selector);
            if(el){const cs=getComputedStyle(el);samples[selector]={backgroundColor:cs.backgroundColor,backgroundImage:cs.backgroundImage,color:cs.color};}
          }
          const lightNeutral=[];
          for(const el of document.querySelectorAll('body, body *')){
            const rect=el.getBoundingClientRect();
            if(rect.width<8||rect.height<8)continue;
            const cs=getComputedStyle(el);
            if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity)===0)continue;
            if(isNeutralLight(cs.backgroundColor)){
              lightNeutral.push({tag:el.tagName,cls:String(el.className||'').slice(0,120),bg:cs.backgroundColor,w:Math.round(rect.width),h:Math.round(rect.height)});
              if(lightNeutral.length>=20)break;
            }
          }
          return {
            theme:root.getAttribute('data-theme'),
            hasDarkClass:root.classList.contains('dark'),
            hasLightClass:root.classList.contains('light'),
            samples,
            lightNeutral
          };
        });
        if(darkAudit.theme!=='dark'||!darkAudit.hasDarkClass||darkAudit.hasLightClass)errors.push(`${vp.width}px report: dark-only theme lock not applied`);
        for(const [selector,sample] of Object.entries(darkAudit.samples)){
          const m=sample.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
          if(!m)continue;
          const [r,g,b]=m.slice(1).map(Number);
          if(selector==='body'||selector==='.topbar'||selector==='.ea-hud-score-card'||selector==='.ea-hud-pillars-card'||selector==='.ea-engine-card'||selector==='.finding-card'||selector==='.evidence-box'||selector==='.ea-file-viewer'){
            if((r+g+b)/3>115)errors.push(`${vp.width}px report: ${selector} is not a dark surface (${sample.backgroundColor})`);
          }
        }
        if(darkAudit.lightNeutral.length){
          errors.push(`${vp.width}px report: white/near-white background leakage: ${JSON.stringify(darkAudit.lightNeutral.slice(0,5))}`);
        }
      }
      await page.screenshot({path:`/tmp/htmlhtml-${vp.width}-${route.replace(/\W+/g,'-')||'home'}.png`,fullPage:true});
      await page.close();
    }
  }
} finally {await browser.close();server.close()}
if(errors.length){console.error('MOBILE/VISUAL THEME QA FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('MOBILE/VISUAL THEME QA PASS: Chromium 360/390/430/768/1280, no overflow/control collision and Enterprise report is dark-only with no white/near-white surface leakage.');
