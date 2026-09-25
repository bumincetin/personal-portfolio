import { chromium } from 'playwright';
import fs from 'node:fs';
const dir = 'artifacts/redesign/reference';
fs.mkdirSync(dir,{recursive:true});
const browser = await chromium.launch({headless:true});
const observations = [];
for (const [width,height] of [[1920,1080],[1440,900],[1024,768],[430,932],[393,852]]) {
  const context = await browser.newContext({viewport:{width,height},isMobile:width<500,hasTouch:width<500});
  const page = await context.newPage();
  await page.goto('https://basement.studio',{waitUntil:'domcontentloaded',timeout:90000});
  await page.screenshot({path:`${dir}/${width}-entry.png`});
  await page.waitForTimeout(6500);
  await page.screenshot({path:`${dir}/${width}-home.png`});
  observations.push({width,height,url:page.url(),title:await page.title(),text:await page.locator('body').innerText(),controls:await page.locator('button,a').evaluateAll(els=>els.map(e=>({text:e.textContent,aria:e.getAttribute('aria-label'),href:e.getAttribute('href')})))});
  for (const [label,fraction] of [['middle',.38],['projects',.64],['footer',1]]) {
    await page.evaluate(f=>window.scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*f),fraction);
    await page.waitForTimeout(1400);
    await page.screenshot({path:`${dir}/${width}-${label}.png`});
  }
  await context.close();
}
fs.writeFileSync(`${dir}/observations.json`,JSON.stringify(observations,null,2));
await browser.close();
