import {chromium} from 'playwright';
const b=await chromium.launch({headless:true,channel:'chromium'}),p=await b.newPage({viewport:{width:393,height:852}});
await p.goto('http://localhost:3100/en',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
console.log(await p.evaluate(()=>['.atlas-page','.atlas-context','.atlas-intro','.atlas-service-copy > p','.experience-route','html'].map(s=>{const el=document.querySelector(s),c=getComputedStyle(el);return {s,color:c.color,background:c.background,opacity:c.opacity,vars:[c.getPropertyValue('--color-black'),c.getPropertyValue('--ink'),c.getPropertyValue('--c-text')]};})));
console.log(await p.evaluate(()=>{const e=document.querySelector('.experience-route'),c=getComputedStyle(e);return {duration:c.animationDuration,play:c.animationPlayState,delay:c.animationDelay,name:c.animationName,iterations:c.animationIterationCount,animations:e.getAnimations().map(a=>({time:a.currentTime,state:a.playState,rate:a.playbackRate,timing:a.effect.getComputedTiming(),frames:a.effect.getKeyframes()}))};}));
await b.close();
