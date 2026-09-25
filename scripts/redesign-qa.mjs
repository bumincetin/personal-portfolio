import { chromium } from 'playwright';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const base=process.argv[2]||'http://localhost:3000';
const dir='artifacts/redesign/qa';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,768],[768,1024],[430,932],[393,852],[375,812]]){
  const context=await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<500});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await page.screenshot({path:`${dir}/${width}-home.png`,timeout:20000});
  const overflow=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,hero:document.querySelector('.world-chapter').getBoundingClientRect().height,scene:document.querySelector('.world-chapter').dataset.phase}));
  for(const [name,selector] of [['context','.atlas-context'],['services','.atlas-service'],['research','.atlas-research'],['explore','.atlas-explore'],['footer','.atlas-conversation']]){
    await page.locator(selector).first().scrollIntoViewIfNeeded();if([1440,393].includes(width))await page.screenshot({path:`${dir}/${width}-${name}.png`,timeout:20000});
  }
  await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.locator('dialog[open]').evaluate(async e=>{await Promise.all(e.getAnimations().map(a=>a.finished));});await page.screenshot({path:`${dir}/${width}-menu.png`,timeout:20000});
  await page.keyboard.press('Escape');const focusReturn=await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(e=>e===document.activeElement);
  await page.evaluate(()=>scrollTo(0,0));await page.addScriptTag({content:axe});const audit=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
  results.push({width,height,overflow,focusReturn,errors,audit});console.log(JSON.stringify(results.at(-1)));
  if([1440,393].includes(width))for(const route of ['front-matter','volumes/document-intelligence','chapters','contact']){
    await page.goto(base+'/en/'+route,{waitUntil:'networkidle'});await page.screenshot({path:`${dir}/${width}-${route.replaceAll('/','-')}.png`,timeout:20000});
    await page.addScriptTag({content:axe});const issues=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
    results.push({width,height,route,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),audit:issues});console.log(JSON.stringify(results.at(-1)));
  }
  await context.close();
}
fs.writeFileSync(`${dir}/responsive-accessibility.json`,JSON.stringify(results,null,2));await browser.close();
