import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { enterShelf } from './library-test-helpers.mjs';
const browser=await chromium.launch({headless:true,channel:'chromium'}),page=await browser.newPage({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
await page.addInitScript(()=>{window.__contexts=[];const old=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){const gl=old.call(this,type,...args);if(gl&&/webgl/.test(type)&&!window.__contexts.some(e=>e.gl===gl))window.__contexts.push({gl,canvas:this});return gl;};});
const count=()=>page.evaluate(()=>window.__contexts.filter(x=>!x.gl.isContextLost()).length),results=[];
await page.goto((process.argv[2]||'http://localhost:3100')+'/en',{waitUntil:'networkidle'});await page.waitForSelector('.shader-atmosphere[data-rendered=true]');assert.equal(await count(),2);results.push({stage:'home',contexts:await count()});
await enterShelf(page);await page.waitForTimeout(500);assert.equal(await count(),2);results.push({stage:'optional library open',contexts:await count()});await page.keyboard.press('Escape');await page.waitForSelector('.shader-atmosphere canvas');await page.waitForTimeout(700);assert.equal(await count(),2);results.push({stage:'library closed',contexts:await count()});
// Real touch events through Chromium's input protocol: root momentum and reversal.
await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);const cdp=await page.context().newCDPSession(page);
const touch=async(type,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x:330,y,radiusX:3,radiusY:3}]});
await touch('touchStart',650);for(const y of [620,570,500,420,350]){await touch('touchMove',y);await page.waitForTimeout(25);}await touch('touchEnd',350);await page.waitForTimeout(400);const down=await page.evaluate(()=>scrollY);assert(down>100);
await touch('touchStart',300);for(const y of [340,400,470,550]){await touch('touchMove',y);await page.waitForTimeout(30);}await touch('touchEnd',550);await page.waitForTimeout(300);const up=await page.evaluate(()=>scrollY);assert(up<down);results.push({stage:'native touch flick and reversal',down,up});
await page.locator('.world-index a').nth(4).click();await page.waitForSelector('.world-chapter[data-phase=SELECTED]');await page.waitForTimeout(1200);
await page.setViewportSize({width:852,height:393});await page.waitForTimeout(700);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.equal(await count(),2);assert.equal(await page.locator('.world-chapter').getAttribute('data-selected'),'4');results.push({stage:'orientation preserves inspection',contexts:await count(),volume:4});
fs.writeFileSync('artifacts/integration/after/lifecycle.json',JSON.stringify(results,null,2));console.log(results);await browser.close();
