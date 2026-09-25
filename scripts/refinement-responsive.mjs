import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const b=await chromium.launch({headless:true,channel:'chromium'}),results=[];
for(const [width,height,locale] of [[375,667,'en'],[375,667,'tr'],[375,667,'it'],[430,932,'en'],[1024,768,'en'],[1366,768,'en'],[1920,1080,'en']]){
 const p=await b.newPage({viewport:{width,height},reducedMotion:'reduce'});await p.goto('http://localhost:3100/'+locale,{waitUntil:'networkidle'});await p.locator('.world-chapter[data-phase=HOME]').waitFor();
 for(let i=0;i<7;i++){
  await p.locator('.world-index a').nth(i).click();const box=await p.locator('.world-inspection').boundingBox();assert(box.y>=60);assert(box.y+box.height<=height-65);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));const text=await p.locator('.world-inspection-body > p:not(.world-eyebrow)').evaluate(e=>parseFloat(getComputedStyle(e).fontSize));assert(text>=17);results.push({width,viewportHeight:height,locale,volume:i+1,inspectorHeight:box.height,body:text});
  if(i===2&&width===375)await p.screenshot({path:`artifacts/refinement/after/375-${locale}-inspector.png`});
 }
 await p.close();
}
await b.close();fs.writeFileSync('artifacts/refinement/after/responsive.json',JSON.stringify(results,null,2));console.log(`${results.length} additional inspector layouts passed.`);
