import { chromium } from 'playwright';
import fs from 'node:fs';
const stage=process.argv[2]||'after',base=process.argv[3]||'http://localhost:3100';
const out=`artifacts/integration/${stage}`;fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'}), results=[];
for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:393,height:852}:{width:1440,height:900},isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(()=>{
  window.__metrics={lcp:0,cls:0,tasks:[],events:[],contexts:0};
  const original=HTMLCanvasElement.prototype.getContext,seen=new WeakSet();
  HTMLCanvasElement.prototype.getContext=function(type,...args){const c=original.call(this,type,...args);if(c&&/^webgl|experimental-webgl/.test(type)&&!seen.has(this)){seen.add(this);window.__metrics.contexts++;}return c;};
  for(const type of ['largest-contentful-paint','layout-shift','longtask','event'])try{new PerformanceObserver(l=>{for(const e of l.getEntries()){if(type==='largest-contentful-paint')window.__metrics.lcp=e.startTime;if(type==='layout-shift'&&!e.hadRecentInput)window.__metrics.cls+=e.value;if(type==='longtask')window.__metrics.tasks.push(e.duration);if(type==='event'&&e.interactionId)window.__metrics.events.push(e.duration);}}).observe({type,buffered:true,durationThreshold:16});}catch{}
 });
 const page=await context.newPage(),cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');
 if(mobile){await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}
 await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await page.waitForFunction(()=>document.querySelector('.world-chapter')?.dataset.phase==='HOME',{},{timeout:60000});
 await page.waitForTimeout(2500);
 const load=await page.evaluate(()=>({metrics:structuredClone(window.__metrics),resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').at(-1),bytes:r.encodedBodySize,type:r.initiatorType})),canvases:[...document.querySelectorAll('canvas')].filter(c=>c.classList.contains('world-canvas')||c.closest('.shader-atmosphere')).map(c=>{const gl=c.getContext('webgl2');const ext=gl?.getExtension('WEBGL_debug_renderer_info');return {class:c.className,width:c.width,height:c.height,...c.dataset,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null};})}));
 const sample=async(action)=>page.evaluate(async action=>{
  if(action==='camera')document.querySelectorAll('.world-index a')[3].click();
  const stamps=[],start=performance.now();let prev=start;
  const world=document.querySelector('.world-canvas'),shader=document.querySelector('.shader-atmosphere canvas'),counts={world:Number(world?.dataset.frames||0),shader:Number(shader?.dataset.frames||0)},initial={...counts},last={world:start,shader:start},intervals={world:[],shader:[]};
  return new Promise(resolve=>{function tick(now){stamps.push(now-prev);prev=now;for(const [name,canvas] of [['world',world],['shader',shader]]){const count=Number(canvas?.dataset.frames||0);if(count!==counts[name]){intervals[name].push(now-last[name]);last[name]=now;counts[name]=count;}}if(action==='scroll')window.scrollBy(0,6);if(now-start<2000)requestAnimationFrame(tick);else {window.__renderSamples??={};window.__renderSamples[action]={frames:{world:counts.world-initial.world,shader:counts.shader-initial.shader},intervals,duration:now-start};resolve(stamps);}}requestAnimationFrame(tick);});
 },action);
 const before=await cdp.send('Performance.getMetrics'),idle=await sample('idle'),camera=await sample('camera');
 await page.keyboard.press('Escape');await page.waitForTimeout(1500);const scroll=await sample('scroll');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');
 const end=await cdp.send('Performance.getMetrics'),metrics=await page.evaluate(()=>window.__metrics);
 const m=(r,k)=>r.metrics.find(x=>x.name===k)?.value||0;
 const renders=await page.evaluate(()=>window.__renderSamples);
 const record={mode:mobile?'mobile-4g':'desktop',load,idle,camera,scroll,renders,metrics,mainThreadSeconds:m(end,'TaskDuration')-m(before,'TaskDuration'),heapBytes:m(end,'JSHeapUsedSize')};
 results.push(record);fs.writeFileSync(`${out}/profile.json`,JSON.stringify(results,null,2));console.log(JSON.stringify({mode:record.mode,lcp:load.metrics.lcp,cls:load.metrics.cls,contexts:load.metrics.contexts,js:load.resources.filter(x=>x.name.includes('.js')).reduce((s,x)=>s+x.bytes,0)}));
 await page.screenshot({path:`${out}/${record.mode}-scroll.png`});await context.close();
}
await browser.close();
