/** Production baseline/final evidence. No network or CPU throttling for screenshots. */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const base = process.argv[2] || 'http://localhost:3114';
const dest = process.argv[3] || 'artifacts/design/library-audit/before';
await fs.mkdir(dest, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const volumes = ['document-intelligence','forecasting','reporting','cross-border','greenwashing-risk-scoring','parliamentary-seat-forecast','portfolio-optimizer'];
const routes = ['/en','/en/front-matter','/en/chapters','/en/contact',...volumes.map(v=>`/en/volumes/${v}`)];
const results = { commit: execFileSync('git',['rev-parse','HEAD']).toString().trim(), browser:browser.version(), network:'unthrottled localhost', cpu:'unthrottled', time:new Date().toISOString(), pages:[] };
try {
  for (const viewport of [{width:1440,height:900},{width:768,height:1024},{width:390,height:844}]) {
    const context = await browser.newContext({viewport});
    const page = await context.newPage();
    for (const route of routes) {
      const errors=[], failed=[];
      const onError = e=>errors.push(e.message || e.text());
      const onFailed = r=>failed.push({url:r.url(),error:r.failure()?.errorText});
      page.on('pageerror',onError); page.on('requestfailed',onFailed);
      await page.goto(base+route, {waitUntil:'networkidle', timeout:90000});
      await page.waitForTimeout(6000);
      const data = await page.evaluate(()=>({
        title:document.title, overflow:document.documentElement.scrollWidth-innerWidth,
        h1:[...document.querySelectorAll('h1')].map(h=>({text:h.textContent,font:getComputedStyle(h).fontFamily,weight:getComputedStyle(h).fontWeight,size:getComputedStyle(h).fontSize})),
        resources:performance.getEntriesByType('resource').map(r=>({name:r.name,transfer:r.transferSize,decoded:r.decodedBodySize,duration:r.duration})),
      }));
      const cdp=await context.newCDPSession(page);
      const shot=await cdp.send('Page.captureScreenshot',{format:'png'});
      const file=route.replace(/^\//,'').replaceAll('/','-')+`-${viewport.width}.png`;
      await fs.writeFile(path.join(dest,file),Buffer.from(shot.data,'base64'));
      await cdp.detach();
      results.pages.push({route,viewport,file,errors,failed,...data});
      await fs.writeFile(path.join(dest,'audit.json'),JSON.stringify(results,null,2));
      console.log(`${viewport.width} ${route}: overflow ${data.overflow}; errors ${errors.length}; failures ${failed.length}`);
      page.off('pageerror',onError);page.off('requestfailed',onFailed);
    }
    await context.close();
  }
} finally { await browser.close(); }
