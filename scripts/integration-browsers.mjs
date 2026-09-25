import {webkit,firefox} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3100',results=[];
for(const [name,engine] of [['webkit',webkit],['firefox',firefox]]){
 const browser=await engine.launch({headless:true}),page=await browser.newPage({viewport:{width:393,height:852},hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await page.waitForSelector('.shader-atmosphere[data-rendered=true]',{timeout:45000});await page.waitForSelector('.world-chapter[data-phase=HOME]');
 assert.equal(await page.locator('canvas').count(),2);await page.locator('.world-index a').nth(3).click();await page.waitForSelector('.world-chapter[data-phase=SELECTED]');await page.waitForTimeout(1200);assert.equal(await page.locator('.shader-atmosphere').getAttribute('data-volume'),'3');await page.screenshot({path:`artifacts/integration/after/${name}-inspection.png`});
 await page.keyboard.press('Escape');await page.waitForTimeout(1500);await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(e=>e===document.activeElement));
 await page.locator('.world-browse').click();await page.waitForTimeout(1600);assert.equal(await page.evaluate(()=>document.activeElement?.id),'catalogue-title');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);assert.equal(await page.locator('.shader-atmosphere canvas').count(),0);await page.setViewportSize({width:852,height:393});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);results.push({name,version:browser.version(),shader:true,selection:true,menu:true,anchorFocus:true,reduced:true,orientation:true,errors});console.log(results.at(-1));await browser.close();
}
fs.writeFileSync('artifacts/integration/after/browsers.json',JSON.stringify(results,null,2));
