import { chromium } from 'playwright';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'chromium'});fs.mkdirSync('artifacts/integration/after',{recursive:true});
for(const [width,height] of [[1440,900],[393,852]]){
 const page=await browser.newPage({viewport:{width,height},isMobile:width<500,hasTouch:width<500});
 page.on('pageerror',e=>console.log('ERROR',e.message));page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,800));});
 await page.goto((process.argv[2]||'http://localhost:3100')+'/en',{waitUntil:'networkidle',timeout:120000});await page.waitForTimeout(5000);
 console.log(width,await page.evaluate(()=>({world:document.querySelector('.world-chapter')?.dataset,shader:document.querySelector('.shader-atmosphere')?.dataset,canvases:[...document.querySelectorAll('canvas')].map(x=>({class:x.className,w:x.width,h:x.height,...x.dataset})),header:document.querySelector('.world-chapter')?.getBoundingClientRect().height})));
 await page.screenshot({path:`artifacts/integration/after/${width}-home.png`});
 for(const index of [0,3,6]){await page.locator('.world-index a').nth(index).click();await page.waitForTimeout(2200);console.log('select',index,await page.evaluate(()=>({y:scrollY,world:document.querySelector('.world-chapter')?.dataset,shader:document.querySelector('.shader-atmosphere')?.dataset,camera:document.querySelector('.world-canvas')?.dataset.camera})));await page.screenshot({path:`artifacts/integration/after/${width}-selected-${index+1}.png`});}
 await page.keyboard.press('Escape');await page.waitForTimeout(1700);console.log('home',await page.evaluate(()=>({y:scrollY,world:document.querySelector('.world-chapter')?.dataset})));
 await page.close();
}
await browser.close();
