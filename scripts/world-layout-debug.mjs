import {chromium} from 'playwright';
const b=await chromium.launch({headless:true});const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('http://localhost:3100/en',{waitUntil:'networkidle'});
for(const y of [0,300,540]){await p.evaluate(y=>scrollTo(0,y),y);console.log(y,await p.locator('.world-stage').evaluate(e=>{const a=[];for(let n=e;n;n=n.parentElement){const c=getComputedStyle(n),r=n.getBoundingClientRect();a.push({tag:n.tagName,class:n.className,y:r.y,height:r.height,position:c.position,overflow:c.overflow,transform:c.transform,display:c.display});}return a;}));}
await b.close();
