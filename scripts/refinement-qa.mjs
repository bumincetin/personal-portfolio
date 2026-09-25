import { chromium } from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3100',out='artifacts/refinement/after';fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'}),results=[];
for(const [width,height] of [[1440,900],[393,852],[768,1024]]){
 const p=await browser.newPage({viewport:{width,height},isMobile:width<500,hasTouch:width<500});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const capture=async(name,fullPage=false)=>{await p.screenshot({path:`${out}/${width}-${name}.png`,fullPage});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} ${name} overflow`);};
 const axe=async(name)=>{await p.addScriptTag({path:'node_modules/axe-core/axe.min.js'});const violations=await p.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));results.push({width,name,violations});};
 await p.goto(base+'/en',{waitUntil:'networkidle',timeout:120000});await p.locator('.world-chapter[data-phase=HOME]').waitFor({timeout:60000});await p.waitForTimeout(1200);await capture('home');await axe('home');
 for(let i=0;i<7;i++){await p.locator('.world-index a').nth(i).click();await p.waitForTimeout(1500);await capture(`inspect-${i+1}`);const box=await p.locator('.world-inspection').boundingBox();assert(box.height<height*.77);assert(box.y>=60);results.push({width,inspector:i+1,box});if(i===3)await axe('inspector');}
 await p.locator('.world-read').click();await p.waitForURL('**/volumes/portfolio-optimizer');await p.waitForTimeout(600);assert.equal(await p.locator('.sketchbook-root').getAttribute('data-view'),'article');results.push({width,readingTransition:true});
 for(const [name,path] of [['reading','/volumes/cross-border'],['approach','/front-matter'],['about','/chapters'],['contact','/contact']]){
  await p.goto(base+'/en'+path,{waitUntil:'networkidle'});await p.waitForTimeout(700);await capture(name);await capture(`${name}-full`,true);await axe(name);
 }
 if(width===1440){ for(const slug of ['document-intelligence','forecasting','reporting','greenwashing-risk-scoring','parliamentary-seat-forecast','portfolio-optimizer']){await p.goto(base+'/en/volumes/'+slug,{waitUntil:'networkidle'});await capture('reading-'+slug);await capture('reading-'+slug+'-full',true);} }
 await p.goto(base+'/en',{waitUntil:'networkidle'});await p.getByRole('button',{name:'Open menu',exact:true}).click();await p.waitForTimeout(500);await capture('menu');await axe('menu');await p.keyboard.press('Escape');
 await p.locator('#catalogue').scrollIntoViewIfNeeded();await p.waitForTimeout(1300);await capture('work-intro');await p.locator('.atlas-service').first().scrollIntoViewIfNeeded();await p.waitForTimeout(1300);await capture('work');await p.locator('.atlas-research').scrollIntoViewIfNeeded();await p.waitForTimeout(1300);await capture('research');
 results.push({width,errors});await p.close();
}
await browser.close();fs.writeFileSync(`${out}/qa.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results.filter(x=>x.violations?.length||x.errors?.length),null,2));
if(results.some(x=>x.violations?.length||x.errors?.length))process.exitCode=1;
