import {chromium} from 'playwright';import fs from 'node:fs';import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,channel:'chromium'}),page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'}),hits=[];
await page.goto((process.argv[2]||'http://localhost:3100')+'/en',{waitUntil:'networkidle'});await page.waitForSelector('.world-chapter[data-phase=HOME]');
for(let index=0;index<7;index++){
 await page.waitForFunction(()=>document.querySelector('.world-canvas').dataset.position==='11.00,8.50,17.00'&&scrollY<2);
 const marker=await page.locator('.world-marker').nth(index).boundingBox();let hit;
 for(const dy of [55,85,110,30,0,-30,140,170]){for(const dx of [0,-30,30,-60,60,-90,90,-120,120]){const x=marker.x+22+dx,y=marker.y+22+dy;if(await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.classList.contains('world-canvas'),{x,y})){await page.mouse.move(x,y);await page.waitForTimeout(40);if(await page.locator('.world-chapter').getAttribute('data-hovered')===String(index)){hit={index,x,y};break;}}}if(hit)break;}
 if(!hit)console.log('RAY DEBUG',index,marker,await page.evaluate(()=>({y:scrollY,world:document.querySelector('.world-chapter').dataset,canvas:document.querySelector('.world-canvas').dataset})));
 assert(hit,`Missing actual mesh hit ${index}`);await page.mouse.click(hit.x,hit.y);await page.waitForFunction(index=>document.querySelector('.world-chapter').dataset.selected===String(index)&&document.querySelector('.world-chapter').dataset.phase==='SELECTED',index);
 const y=await page.evaluate(()=>scrollY);assert(y>0);hits.push({...hit,scroll:y});await page.locator('.world-return').click();await page.waitForFunction(()=>['HOME','HOVERING'].includes(document.querySelector('.world-chapter').dataset.phase));await page.mouse.move(1400,100);await page.waitForTimeout(150);
}
fs.writeFileSync('artifacts/integration/after/raycast.json',JSON.stringify(hits,null,2));console.log(hits);await browser.close();
