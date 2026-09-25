import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://localhost:3114';
const browser=await chromium.launch({channel:'chrome'});
const report={};
try {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto(base+'/en',{waitUntil:'load'});
  for(let i=0;i<90;i++) {if(await page.evaluate(()=>!!document.querySelector('.webgl-ready')))break;await page.waitForTimeout(1000);}
  await page.locator('#inspect').focus();await page.keyboard.press('Enter');await page.waitForTimeout(1200);
  const sequence=[];
  for(let i=0;i<12;i++){await page.keyboard.press('Tab');sequence.push(await page.evaluate(()=>({id:document.activeElement.id,classes:document.activeElement.className})));}
  report.focus={sequence,primaryLinkReached:sequence.some(s=>s.classes.includes('volume-link'))};
  await context.close();
  const race=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await race.addInitScript(()=>{
    window.__contexts=[];
    const get=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(kind,...args){if(kind.includes('webgl')) window.__contexts.push({connected:this.isConnected,route:location.pathname});return get.call(this,kind,...args);};
    const load=document.fonts.load.bind(document.fonts);
    document.fonts.load=(...args)=>new Promise(resolve=>{window.__releaseFont=()=>load(...args).then(resolve);});
  });
  const p=await race.newPage();await p.goto(base+'/en',{waitUntil:'load'});
  await p.waitForFunction(()=>!!window.__releaseFont);
  await p.locator('nav a[href="/en/chapters"]').first().click();
  await p.waitForURL('**/en/chapters');await p.evaluate(()=>window.__releaseFont());await p.waitForTimeout(10000);
  report.unmountRace=await p.evaluate(()=>({contexts:window.__contexts,detachedRendererCreated:window.__contexts.some(c=>!c.connected)}));
  await race.close();
} finally {await browser.close();}
await fs.mkdir('artifacts/design/library-audit',{recursive:true});
await fs.writeFile('artifacts/design/library-audit/baseline-defects.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
