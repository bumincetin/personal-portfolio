import {chromium} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8'),browser=await chromium.launch({headless:true,channel:'chromium'}),base=process.argv[2]||'http://localhost:3100',results=[];
for(const width of [1440,393]){
 const page=await browser.newPage({viewport:{width,height:width===1440?900:852}});await page.goto(base+'/en',{waitUntil:'networkidle'});await page.waitForSelector('.shader-atmosphere[data-rendered=true]');await page.addScriptTag({content:axe});
 const audit=await page.evaluate(async()=>{const r=await window.axe.run(document.querySelector('.world-stage'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return r.violations.map(v=>v.id);});assert.deepEqual(audit,[]);
 const target=await page.locator('#catalogue').evaluate(e=>e.getBoundingClientRect().top+scrollY-90);await page.locator('.world-browse').click();await page.waitForTimeout(80);const mid=await page.evaluate(()=>scrollY);assert(mid>0&&mid<target-30);await page.waitForTimeout(1300);assert.equal(await page.evaluate(()=>document.activeElement.id),'catalogue-title');results.push({width,homeAxe:audit,anchorAnimated:true});await page.close();
}
for(const mode of ['reduced','no-webgl']){
 const context=await browser.newContext({viewport:{width:393,height:852},reducedMotion:mode==='reduced'?'reduce':'no-preference'});if(mode==='no-webgl')await context.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};});
 const page=await context.newPage();await page.goto(base+'/en',{waitUntil:'networkidle'});await page.waitForTimeout(700);const height=await page.locator('.world-chapter').evaluate(e=>e.offsetHeight);assert(Math.abs(height-(mode==='reduced'?852*1.75:852))<2);await page.screenshot({path:`artifacts/integration/after/${mode}.png`});results.push({mode,archiveHeight:height});await context.close();
}
fs.writeFileSync('artifacts/integration/after/final-check.json',JSON.stringify(results,null,2));console.log(results);await browser.close();
