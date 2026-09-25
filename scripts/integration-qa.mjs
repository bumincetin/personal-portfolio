import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url),axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const base=process.argv[2]||'http://localhost:3100',dir='artifacts/integration/after';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'}),results=[];
const settle=p=>p.waitForFunction(()=>['HOME','HOVERING','SELECTED','EDITORIAL'].includes(document.querySelector('.world-chapter')?.dataset.phase),{},{timeout:45000});
for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[430,932],[393,852],[375,812]]){
 const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<500}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await settle(page);await page.waitForSelector('.shader-atmosphere[data-rendered=true]');await page.waitForTimeout(1700);
 assert.equal(await page.locator('canvas').count(),2);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:`${dir}/${width}-home.png`});
 const count=[1440,393].includes(width)?7:1,stops=[];
 for(let index=0;index<count;index++){
  await page.locator('.world-index a').nth(index).click();await page.waitForFunction(i=>document.querySelector('.world-chapter')?.dataset.phase==='SELECTED'&&document.querySelector('.world-chapter')?.dataset.selected===String(i),index);
  await page.waitForTimeout(600);
  const s=await page.evaluate(index=>({y:scrollY,target:document.querySelectorAll('.world-stop')[index].getBoundingClientRect().top+scrollY,camera:document.querySelector('.world-canvas').dataset.camera,shader:document.querySelector('.shader-atmosphere').dataset.volume,focus:document.activeElement?.id}),index);
  assert(Math.abs(s.y-s.target)<2,JSON.stringify(s));assert.equal(s.shader,String(index));assert.equal(s.camera,`VOLUME_0${index+1}`);assert.equal(s.focus,'world-selection-title');stops.push(s);
  if(count===7)await page.screenshot({path:`${dir}/${width}-selected-${index+1}.png`});
 }
 await page.addScriptTag({content:axe});const audit=await page.evaluate(async()=>{const r=await window.axe.run(document.querySelector('.world-stage'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}));});assert.deepEqual(audit,[]);
 await page.keyboard.press('Escape');await page.waitForTimeout(1700);assert(await page.evaluate(()=>scrollY<2));assert(await page.locator('.world-index a').nth(count-1).evaluate(e=>e===document.activeElement));
 await page.locator('.world-index a').nth(3).focus();await page.keyboard.press('Space');await settle(page);await page.waitForTimeout(1300);assert.equal(await page.locator('.shader-atmosphere').getAttribute('data-volume'),'3');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,800);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>scrollY),y);await page.keyboard.press('Escape');await page.keyboard.press('Escape');await page.waitForTimeout(1500);
 await page.locator('.world-browse').click();await page.waitForTimeout(1600);assert(await page.locator('#catalogue').evaluate(e=>Math.abs(e.getBoundingClientRect().top-90)<3));
 await page.screenshot({path:`${dir}/${width}-editorial.png`});assert.equal(await page.locator('.shader-atmosphere').getAttribute('data-phase'),'editorial');
 results.push({width,height,stops,axe:audit,errors});assert.deepEqual(errors,[]);fs.writeFileSync(`${dir}/qa.json`,JSON.stringify(results,null,2));console.log('PASS',width,height);await context.close();
}
// Interruptible navigation, native keyboard, route history, hidden-tab pause, context failure.
const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage();await page.goto(base+'/en',{waitUntil:'networkidle'});await settle(page);await page.waitForSelector('.shader-atmosphere[data-rendered=true]');
await page.evaluate(()=>{const a=document.querySelectorAll('.world-index a');a[0].click();a[6].click();a[3].click();});await page.waitForTimeout(1800);assert.equal(await page.locator('.world-chapter').getAttribute('data-selected'),'3');
await page.keyboard.press('Escape');await page.waitForTimeout(1500);await page.mouse.move(1200,300);await page.mouse.wheel(0,800);await page.waitForTimeout(120);await page.mouse.wheel(0,-250);await page.waitForTimeout(1200);assert(await page.evaluate(()=>scrollY>0&&scrollY<850));
await page.locator('body').click({position:{x:1400,y:75}});await page.keyboard.press('End');await page.waitForTimeout(400);assert(await page.evaluate(()=>scrollY>document.documentElement.scrollHeight-innerHeight-10));await page.keyboard.press('Home');await page.waitForTimeout(500);assert(await page.evaluate(()=>scrollY<2));
await page.keyboard.press('PageDown');await page.waitForTimeout(500);assert(await page.evaluate(()=>scrollY>0));await page.keyboard.press('PageUp');await page.waitForTimeout(500);await page.keyboard.press('Space');await page.waitForTimeout(500);assert(await page.evaluate(()=>scrollY>0));await page.keyboard.press('Shift+Space');await page.waitForTimeout(500);
const shader=page.locator('.shader-atmosphere canvas');await shader.evaluate(c=>c.dataset.identity='persistent');
await page.locator('.site-nav a[href="/en/contact"]').click();await page.waitForURL('**/contact');assert.equal(await page.locator('.shader-atmosphere canvas').getAttribute('data-identity'),'persistent');await page.goBack();await page.waitForURL('**/en');await settle(page);assert.equal(await page.locator('.shader-atmosphere canvas').getAttribute('data-identity'),'persistent');
await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});const frames=await shader.getAttribute('data-frames');await page.waitForTimeout(350);assert.equal(await shader.getAttribute('data-frames'),frames);await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await page.waitForTimeout(350);assert.notEqual(await shader.getAttribute('data-frames'),frames);
await shader.evaluate(c=>c.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await page.waitForTimeout(400);assert.equal(await page.locator('.shader-atmosphere').getAttribute('data-mode'),'static');assert.equal(await page.locator('.world-chapter').getAttribute('data-phase'),'HOME');results.push({behavior:'rapid selection, wheel reversal, keyboard, persistent route canvas, history, visibility and isolated shader failure passed'});await context.close();
for(const mode of ['reduced','no-js','no-webgl']){
 const c=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='no-js'});
 if(mode==='no-webgl')await c.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:get.call(this,type,...args);};});
 const p=await c.newPage();await p.goto(base+'/en',{waitUntil:'networkidle'});assert(await p.locator('h1').isVisible());assert.equal(await p.locator('.atlas-service').count(),4);assert.equal(await p.locator('.shader-atmosphere canvas').count(),0);
 if(mode==='reduced'){await settle(p);await p.locator('.world-index a').nth(5).click();await settle(p);assert.equal(await p.locator('.world-canvas').getAttribute('data-camera'),'VOLUME_06');await p.keyboard.press('Escape');}
 await p.screenshot({path:`${dir}/${mode}.png`});await p.setViewportSize({width:852,height:393});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));results.push({mode,pass:true});await c.close();
}
fs.writeFileSync(`${dir}/qa.json`,JSON.stringify(results,null,2));await browser.close();console.log('All integration assertions passed');
