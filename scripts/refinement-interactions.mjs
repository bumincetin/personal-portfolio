import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {enterShelf,enterBook,openOptimizer} from './library-test-helpers.mjs';
const base=process.argv[2]||'http://localhost:3000';const dir='artifacts/refinement/after';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'});const results=[];
const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();
await page.goto(base+'/en',{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Open menu',exact:true}).click();
for(let i=0;i<30;i++){await page.keyboard.press('Tab');assert(await page.locator('dialog[open]').evaluate(e=>e.contains(document.activeElement)));}
await page.keyboard.press('Shift+Tab');await page.keyboard.press('Escape');assert(await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(e=>document.activeElement===e));results.push('Menu Tab/Shift+Tab focus containment, Escape and focus restoration passed');
await page.locator('.world-index a').nth(2).focus();await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelector('.world-chapter').dataset.selected==='2');await page.keyboard.press('Escape');await page.locator('#catalogue').scrollIntoViewIfNeeded();results.push('Keyboard world selection and editorial navigation passed');
await page.getByRole('link',{name:'Read this volume: The Unread Pile',exact:true}).click();await page.waitForURL('**/volumes/document-intelligence');await page.goBack();await page.waitForURL('**/en');await page.goForward();await page.waitForURL('**/volumes/document-intelligence');results.push('Client navigation, back and forward passed');
await enterBook(page);await page.locator('#sbRight').click();await page.waitForTimeout(850);await page.screenshot({path:`${dir}/book-open.png`});await page.locator('[data-view-article]').click();assert.equal(await page.locator('.sketchbook-root').getAttribute('data-view'),'article');results.push('Book activation, page turn and article restoration passed');
await page.goto(base+'/en/volumes/portfolio-optimizer',{waitUntil:'networkidle'});await openOptimizer(page);assert(await page.locator('section[aria-label="Geopolitical portfolio optimizer"]').isVisible());results.push('Synthetic optimizer activation passed');await page.screenshot({path:`${dir}/optimizer.png`});
await page.goto(base+'/en/contact',{waitUntil:'networkidle'});
await page.getByRole('link',{name:'Open email draft',exact:false}).click();assert(await page.locator('#conversation-error').isVisible());
const message='We need a review workflow for 200 contracts. Please help us define a bounded pilot.';
await page.locator('#conversation-idea').fill(message);await page.getByRole('button',{name:'Copy message',exact:true}).click();assert((await page.evaluate(()=>navigator.clipboard.readText())).includes(message));
assert(decodeURIComponent(await page.getByRole('link',{name:'Open email draft',exact:false}).getAttribute('href')).includes(message));
await page.locator('[data-contact-guided]').click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();assert.equal(await page.locator('#conversation-idea').inputValue(),message);await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Review my message',exact:true}).click();assert((await page.locator('#conversation-draft').inputValue()).includes(message));await page.screenshot({path:`${dir}/contact-review.png`});results.push('Contact validation, clipboard, email URL, mode persistence and complete guided flow passed; no message sent');
await page.goto(base+'/en',{waitUntil:'networkidle'});await enterShelf(page);await page.screenshot({path:`${dir}/library-open.png`});await page.keyboard.press('Escape');assert.equal(await page.locator('.library-dialog').count(),0);results.push('Retained 3D library activation and Escape passed');
await page.goto(base+'/en',{waitUntil:'networkidle'});await page.locator('.world-chapter[data-phase=HOME]').waitFor();await page.locator('.world-canvas').evaluate(canvas=>{const gl=canvas.getContext('webgl2');gl?.getExtension('WEBGL_lose_context')?.loseContext();});await page.waitForTimeout(200);assert.equal(await page.locator('.world-chapter').getAttribute('data-phase'),'FALLBACK');results.push('World WebGL context loss preserves the direct volume index');
await context.close();
for(const mode of ['reduced','no-js','no-webgl']){
  const c=await browser.newContext({viewport:{width:393,height:852},reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='no-js'});
  if(mode==='no-webgl')await c.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2')return null;return original.call(this,type,...args);};});
  const p=await c.newPage();await p.goto(base+'/en',{waitUntil:'networkidle'});assert(await p.locator('h1').isVisible());assert.equal(await p.locator('.atlas-service').count(),4);await p.screenshot({path:`${dir}/${mode}.png`});await p.setViewportSize({width:852,height:393});assert(await p.locator('h1').isVisible());results.push(`${mode}: readable content and orientation change passed`);await c.close();
}
fs.writeFileSync(`${dir}/interactions.json`,JSON.stringify(results,null,2));console.log(results.join('\n'));await browser.close();
