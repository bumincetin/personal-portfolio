import {chromium,webkit,firefox} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {enterShelf,enterBook,openOptimizer} from './library-test-helpers.mjs';
const base=process.argv[2]||'http://localhost:3100',out='artifacts/refinement/after',results=[];
const b=await chromium.launch({headless:true,channel:'chromium'});
const p=await b.newPage({viewport:{width:1440,height:900}});
for(const [name,path] of [['approach','/front-matter'],['cv','/chapters']]){
 await p.goto(base+'/en'+path,{waitUntil:'networkidle'});await p.emulateMedia({media:'print'});await p.screenshot({path:`${out}/1440-print-${name}.png`});const color=await p.locator(name==='cv'?'.record-detail':'.reader-prose').first().evaluate(e=>getComputedStyle(e).color);assert.equal(color,'rgb(13, 16, 15)');results.push({print:name,color});await p.emulateMedia({media:'screen'});
}
await p.goto(base+'/en/volumes/portfolio-optimizer',{waitUntil:'networkidle'});await openOptimizer(p);await p.waitForTimeout(1600);await p.locator('.reader-section:has(.optimizer-publication)').evaluate(e=>e.scrollIntoView({block:'start'}));await p.waitForTimeout(700);await p.screenshot({path:`${out}/1440-optimizer.png`});
for(const width of [393,768,1440]){await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));results.push({optimizer:width,overflow:false});}
await p.goto(base+'/en/volumes/document-intelligence',{waitUntil:'networkidle'});await enterBook(p);await p.locator('#sbRight').click();await p.waitForTimeout(900);await p.screenshot({path:`${out}/1440-book.png`});await p.addScriptTag({path:'node_modules/axe-core/axe.min.js'});results.push({bookAxe:await p.evaluate(async()=> (await axe.run()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))) });
await p.goto(base+'/en',{waitUntil:'networkidle'});await enterShelf(p);await p.waitForTimeout(1000);await p.screenshot({path:`${out}/1440-library.png`});await p.keyboard.press('Escape');await p.goto(base+'/en/contact',{waitUntil:'networkidle'});await p.locator('.contact-optional-scene > button').click();await p.waitForTimeout(1800);await p.locator('.contact-optional-scene').scrollIntoViewIfNeeded();await p.waitForTimeout(1000);await p.screenshot({path:`${out}/1440-contact-sculpture.png`});
await b.close();
for(const [name,engine] of [['webkit',webkit],['firefox',firefox]]){
 const browser=await engine.launch({headless:true}),page=await browser.newPage({viewport:{width:393,height:852}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/en',{waitUntil:'networkidle'});await page.locator('.world-chapter[data-phase=HOME]').waitFor({timeout:60000});await page.locator('.world-index a').nth(3).click();await page.waitForTimeout(1600);await page.screenshot({path:`${out}/393-${name}-inspector.png`});assert(await page.locator('.world-inspection').isVisible());await page.locator('.world-read').click();await page.waitForURL('**/volumes/cross-border');assert(await page.locator('.reader-prose').first().isVisible());await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');results.push({browser:name,errors,reading:true,menu:true});await browser.close();
}
fs.writeFileSync(`${out}/review-states.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
