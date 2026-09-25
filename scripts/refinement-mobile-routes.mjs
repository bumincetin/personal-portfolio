import {chromium} from 'playwright';
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url),axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const base=process.argv[2]||'http://localhost:3100';const routes=JSON.parse(fs.readFileSync('artifacts/redesign/baseline/routes.json','utf8')).map(r=>r.route);
const browser=await chromium.launch({headless:true,channel:"chromium"});const page=await browser.newPage({viewport:{width:393,height:852},hasTouch:true,isMobile:true});const results=[];
for(const route of routes){
  await page.goto(base+route,{waitUntil:'networkidle'});await page.addScriptTag({content:axe});
  const audit=await page.evaluate(async()=>({overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('h1').length,violations:(await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}));
  results.push({route,...audit});console.log(JSON.stringify(results.at(-1)));
  if(['/tr','/it'].includes(route))await page.screenshot({path:`artifacts/refinement/after/${route.slice(1)}-mobile.png`});
}
fs.writeFileSync('artifacts/refinement/after/mobile-all-routes.json',JSON.stringify(results,null,2));await browser.close();if(results.some(r=>r.overflow||r.headings!==1||r.violations.length))process.exitCode=1;
