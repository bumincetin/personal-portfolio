import { chromium } from 'playwright';
import fs from 'node:fs';
const slugs = ['document-intelligence','forecasting','reporting','cross-border','greenwashing-risk-scoring','parliamentary-seat-forecast','portfolio-optimizer'];
const routes = ['en','tr','it'].flatMap(l=>['','/front-matter','/chapters','/contact',...slugs.map(s=>`/volumes/${s}`)].map(s=>`/${l}${s}`));
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const records = [];
for(const route of routes) {
  await page.goto(`http://localhost:3000${route}`,{waitUntil:'networkidle',timeout:120000});
  records.push(await page.evaluate(route=>({route,title:document.title,text:document.querySelector('main')?.textContent,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.textContent),links:[...document.querySelectorAll('a')].map(e=>({text:e.textContent,href:e.getAttribute('href')})),metadata:[...document.querySelectorAll('meta[name],meta[property],link[rel="canonical"],link[hreflang]')].map(e=>e.outerHTML),forms:[...document.querySelectorAll('input,textarea,select,button')].map(e=>({tag:e.tagName,name:e.getAttribute('name'),type:e.getAttribute('type'),label:e.getAttribute('aria-label')||e.textContent})),media:[...document.querySelectorAll('img')].map(e=>({alt:e.alt,src:e.getAttribute('src')})),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>e.textContent)}),route));
  if(['/en','/en/contact','/en/chapters','/en/volumes/document-intelligence'].includes(route)) await page.screenshot({path:`artifacts/redesign/baseline/${route.slice(1).replaceAll('/','-')}.png`,fullPage:true});
  console.log(route);
}
fs.writeFileSync('artifacts/redesign/baseline/routes.json',JSON.stringify(records,null,2));
await browser.close();
