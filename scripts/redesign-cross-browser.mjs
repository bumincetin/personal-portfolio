import {webkit,firefox,chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3100';const results=[];
for(const [name,engine] of [['webkit',webkit],['firefox',firefox]]){
  let browser;
  try{browser=await engine.launch({headless:true});}catch(error){results.push({name,available:false,reason:error.message.split('\n')[0]});continue;}
  const page=await browser.newPage({viewport:{width:393,height:852},reducedMotion:'reduce'});
  for(const route of ['/en','/tr','/it','/en/contact','/tr/front-matter','/it/chapters','/en/volumes/reporting']){
    const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);assert(await page.locator('h1').isVisible());assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  }
  await page.goto(base+'/en');await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(e=>e===document.activeElement));await page.screenshot({path:`artifacts/redesign/qa/${name}-mobile.png`});results.push({name,version:browser.version(),available:true,routes:7,status:'passed'});await browser.close();
}
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:393,height:852}});
for(const route of ['/en','/tr','/it','/tr/contact','/it/volumes/cross-border']){
  await page.goto(base+route,{waitUntil:'networkidle'});await page.addStyleTag({content:'html{font-size:200%!important}'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}
results.push({name:'chromium-200%-text',routes:5,status:'passed'});await browser.close();fs.writeFileSync('artifacts/redesign/qa/cross-browser.json',JSON.stringify(results,null,2));console.log(results);
