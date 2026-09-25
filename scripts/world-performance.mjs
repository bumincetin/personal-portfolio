import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3100';
const browser=await chromium.launch({headless:true,channel:process.env.WORLD_SOFTWARE_GPU ? undefined : 'chromium'}),results=[];
for(const mode of ['desktop','mobile-4g']){
 const context=await browser.newContext({viewport:mode==='desktop'?{width:1440,height:900}:{width:393,height:852},isMobile:mode!=='desktop',hasTouch:mode!=='desktop'});
 await context.addInitScript(()=>{
  window.__worldMetrics={lcp:0,cls:0,tasks:[],events:[],phases:[]};
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.__worldMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__worldMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())window.__worldMetrics.tasks.push(e.duration);}).observe({type:'longtask',buffered:true});
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.__worldMetrics.events.push({name:e.name,duration:e.duration});}).observe({type:'event',buffered:true,durationThreshold:16});
  let phase;new MutationObserver(()=>{const next=document.querySelector('.world-chapter')?.dataset.phase;if(next&&next!==phase){phase=next;window.__worldMetrics.phases.push({phase,time:performance.now()});}}).observe(document,{subtree:true,childList:true,attributes:true,attributeFilter:['data-phase']});
 });
 const page=await context.newPage(),cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Performance.enable');
 if(mode==='mobile-4g'){await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}
 await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await page.waitForFunction(()=>document.querySelector('.world-chapter')?.dataset.phase==='HOME');
 const load=await page.evaluate(()=>({metrics:window.__worldMetrics,resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').at(-1),type:r.initiatorType,encoded:r.encodedBodySize,transfer:r.transferSize,duration:r.duration})),scene:(()=>{const c=document.querySelector('.world-canvas'),gl=c.getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return {...c.dataset,width:c.width,height:c.height,renderer:ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)};})()}));
 await page.waitForTimeout(350);const idleBefore=await page.locator('.world-canvas').getAttribute('data-frames');await page.waitForTimeout(700);const idleAfter=await page.locator('.world-canvas').getAttribute('data-frames');
 const animation=await page.evaluate(()=>new Promise(resolve=>{
  const canvas=document.querySelector('.world-canvas');let previous=Number(canvas.dataset.frames),last=performance.now(),start=last;const intervals=[];
  document.querySelectorAll('.world-index a')[6].dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
  function sample(now){const frames=Number(canvas.dataset.frames);if(frames!==previous){intervals.push(now-last);last=now;previous=frames;}if(now-start<2600)requestAnimationFrame(sample);else resolve({frameIntervals:intervals,scene:{...canvas.dataset},elapsed:now-start});}requestAnimationFrame(sample);
 }));
 await page.locator('.world-index a').nth(3).click();await page.waitForFunction(()=>document.querySelector('.world-chapter').dataset.phase==='SELECTED');await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');
 const events=await page.evaluate(()=>window.__worldMetrics.events),metrics=await cdp.send('Performance.getMetrics');
 const record={mode,configuration:mode==='desktop'?'1440x900, local unthrottled Chromium':'393x852, 1.6Mbps down, 150ms latency, 4x CPU slowdown',lcp:load.metrics.lcp,cls:load.metrics.cls,loadLongTasks:load.metrics.tasks,totalBlockingMs:load.metrics.tasks.reduce((s,d)=>s+Math.max(0,d-50),0),phases:load.metrics.phases,scene:load.scene,idleFrames:Number(idleAfter)-Number(idleBefore),animation,interactionEvents:events,jsEncodedBytes:load.resources.filter(r=>r.type==='script').reduce((s,r)=>s+r.encoded,0),fontEncodedBytes:load.resources.filter(r=>/woff/.test(r.name)).reduce((s,r)=>s+r.encoded,0),imageEncodedBytes:load.resources.filter(r=>r.type==='img').reduce((s,r)=>s+r.encoded,0),resources:load.resources,heapBytes:metrics.metrics.find(m=>m.name==='JSHeapUsedSize')?.value};
 results.push(record);console.log(JSON.stringify(record));await context.close();
}
fs.writeFileSync('artifacts/redesign/world/performance.json',JSON.stringify(results,null,2));await browser.close();
