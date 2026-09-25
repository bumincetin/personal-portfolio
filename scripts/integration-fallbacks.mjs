import {chromium} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3100',browser=await chromium.launch({headless:true,channel:'chromium'}),results=[];
const chunks=fs.readdirSync('.next/static/chunks').filter(f=>f.endsWith('.js'));
for(const mode of ['shader-chunk','world-chunk','save-data','low-memory']){
 const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
 if(mode==='save-data')await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
 if(mode==='low-memory')await context.addInitScript(()=>Object.defineProperty(navigator,'deviceMemory',{value:2}));
 const page=await context.newPage();
 if(mode.endsWith('chunk')){const key=mode==='shader-chunk'?'shadergradient-mesh':'VOLUME_01';const chunk=chunks.find(f=>fs.readFileSync(`.next/static/chunks/${f}`,'utf8').includes(key));assert(chunk,`Missing ${key} chunk`);await page.route(`**/${chunk}`,r=>r.abort());}
 await page.goto(base+'/en',{waitUntil:'networkidle'});await page.waitForTimeout(3000);
 const state=await page.evaluate(()=>({world:document.querySelector('.world-chapter').dataset.phase,tier:document.querySelector('.shader-atmosphere').dataset.tier,mode:document.querySelector('.shader-atmosphere').dataset.mode,quality:document.querySelector('.world-canvas').dataset.quality}));
 if(mode==='world-chunk'){assert.equal(state.world,'FALLBACK');assert.equal(await page.locator('.world-index a[role=button]').count(),0);}
 else {assert(['HOME','HOVERING'].includes(state.world));if(mode==='low-memory'){assert.equal(state.tier,'C');assert.equal(state.quality,'0.82');}else {assert.equal(state.mode,'static');assert.equal(await page.locator('.shader-atmosphere canvas').count(),0);}}
 assert(await page.locator('h1').isVisible());results.push({test:mode,...state});await page.screenshot({path:`artifacts/integration/after/${mode}.png`});await context.close();
}
fs.writeFileSync('artifacts/integration/after/fallbacks.json',JSON.stringify(results,null,2));console.log(results);await browser.close();
