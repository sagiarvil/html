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
const viewports=[{width:360,height:800},{width:390,height:844},{width:430,height:932},{width:768,height:1024}];
const routes=['/','/tr/fiyatlandirma/','/tr/araclar/'];
const errors=[];
const browser=await chromium.launch({headless:true});
try{
  for(const vp of viewports){
    for(const route of routes){
      const page=await browser.newPage({viewport:vp});
      await page.emulateMedia({reducedMotion:'reduce'});
      const response=await page.goto(base+route,{waitUntil:'networkidle'});
      if(!response||!response.ok()){errors.push(`${vp.width}px ${route}: HTTP ${response?.status()}`);await page.close();continue}
      const state=await page.evaluate(()=>{
        const h1=document.querySelector('h1');const meta=document.querySelector('meta[name="viewport"]');
        return {scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,h1Visible:Boolean(h1&&h1.getBoundingClientRect().width>0&&h1.getBoundingClientRect().height>0),h1Size:h1?parseFloat(getComputedStyle(h1).fontSize):0,viewportMeta:meta?.getAttribute('content')||''};
      });
      if(state.scrollWidth>state.innerWidth+1)errors.push(`${vp.width}px ${route}: horizontal overflow ${state.scrollWidth}>${state.innerWidth}`);
      if(!state.h1Visible)errors.push(`${vp.width}px ${route}: H1 not visibly rendered`);
      if(state.h1Size>92)errors.push(`${vp.width}px ${route}: giant H1 ${state.h1Size}px`);
      if(!/width=device-width/i.test(state.viewportMeta))errors.push(`${vp.width}px ${route}: viewport meta missing`);
      await page.keyboard.press('Tab');
      const focus=await page.evaluate(()=>document.activeElement?.tagName||'');
      if(!focus||focus==='BODY'||focus==='HTML')errors.push(`${vp.width}px ${route}: keyboard focus did not enter an interactive element`);
      if(route==='/'){
        const scan=await page.evaluate(()=>{const i=document.querySelector('#domainInput'),b=document.querySelector('#scanForm button');if(!i||!b)return null;const a=i.getBoundingClientRect(),c=b.getBoundingClientRect();return {input:{x:a.x,y:a.y,w:a.width,h:a.height,r:a.right,b:a.bottom},button:{x:c.x,y:c.y,w:c.width,h:c.height,r:c.right,b:c.bottom}}});
        if(!scan){errors.push(`${vp.width}px home: scanner controls missing`)}else{
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
      await page.screenshot({path:`/tmp/htmlhtml-${vp.width}-${route.replace(/\W+/g,'-')||'home'}.png`,fullPage:true});
      await page.close();
    }
  }
} finally {await browser.close();server.close()}
if(errors.length){console.error('MOBILE VISUAL QA FAIL');for(const e of errors)console.error('- '+e);process.exit(1)}
console.log('MOBILE VISUAL QA PASS: Chromium 360/390/430/768, no horizontal overflow/control collision, focusable UI, pricing ZIP manifest and unified tools scope verified.');
