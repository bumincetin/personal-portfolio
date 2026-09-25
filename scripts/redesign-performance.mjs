import {chromium} from 'playwright';
import fs from 'node:fs';
const base=process.argv[2]||'http://localhost:3100';const browser=await chromium.launch({headless:true});const results=[];
for(const mode of ['desktop','mobile-4g']){
  const context=await browser.newContext({viewport:mode==='desktop'?{width:1440,height:900}:{width:393,height:852},isMobile:mode!=='desktop',hasTouch:mode!=='desktop'});
  await context.addInitScript(()=>{
    window.__measure={lcp:0,cls:0,longTasks:[],events:[],draws:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__measure.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__measure.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__measure.longTasks.push(e.duration);}).observe({type:'longtask',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.__measure.events.push({name:e.name,duration:e.duration});}).observe({type:'event',buffered:true,durationThreshold:16});
    for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype])for(const key of ['drawArrays','drawElements']){const orig=proto[key];proto[key]=function(...args){window.__measure.draws++;return orig.apply(this,args);};}
  });
  const page=await context.newPage();const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Performance.enable');
  if(mode==='mobile-4g'){await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});}
  await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await page.waitForFunction(()=>['HOME','HOVERING'].includes(document.querySelector('.world-chapter')?.dataset.phase));await page.waitForTimeout(500);
  const load=await page.evaluate(()=>({...window.__measure,resources:performance.getEntriesByType('resource').map(r=>({name:r.name.split('/').at(-1),type:r.initiatorType,transfer:r.transferSize,encoded:r.encodedBodySize,duration:r.duration})),navigation:performance.getEntriesByType('navigation')[0].toJSON()}));
  const idleBefore=await page.evaluate(()=>window.__measure.draws);await page.waitForTimeout(600);const idleAfter=await page.evaluate(()=>window.__measure.draws);
  await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.waitForTimeout(500);await page.keyboard.press('Escape');
  const timings=await page.evaluate(async()=>{const frames=[];let prior;await new Promise(resolve=>{function step(time){if(prior)frames.push(time-prior);prior=time;if(frames.length<60)requestAnimationFrame(step);else resolve();}requestAnimationFrame(step);});return {median:frames.sort((a,b)=>a-b)[30],max:Math.max(...frames)};});
  const events=await page.evaluate(()=>window.__measure.events);
  const metrics=await cdp.send('Performance.getMetrics');
  const transitionStart=Date.now();await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('dialog[open] a[href="/en/contact"]').click();await page.waitForURL('**/en/contact');await page.locator('#conversation-idea').waitFor({state:'visible'});
  results.push({mode,configuration:mode==='mobile-4g'?'393×852; 1.6Mbps down; 150ms latency; 4× CPU slowdown':'1440×900; local unthrottled Chromium',lcp:load.lcp,cls:load.cls,longTasks:load.longTasks,totalBlockingMs:load.longTasks.reduce((s,d)=>s+Math.max(0,d-50),0),resources:load.resources,jsEncodedBytes:load.resources.filter(r=>r.type==='script').reduce((s,r)=>s+r.encoded,0),fontEncodedBytes:load.resources.filter(r=>/woff/.test(r.name)).reduce((s,r)=>s+r.encoded,0),idleDraws:idleAfter-idleBefore,frameIntervals:timings,interactionEvents:events,heapBytes:metrics.metrics.find(m=>m.name==='JSHeapUsedSize')?.value,contactNavigationMs:Date.now()-transitionStart});
  console.log(JSON.stringify(results.at(-1)));await context.close();
}
fs.writeFileSync('artifacts/redesign/qa/performance.json',JSON.stringify(results,null,2));await browser.close();
