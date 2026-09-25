import fs from 'node:fs';
const quantile=(values,p)=>[...values].sort((a,b)=>a-b)[Math.floor((values.length-1)*p)];
const stats=values=>({median:+quantile(values,.5).toFixed(1),p95:+quantile(values,.95).toFixed(1),fps:+(1000/quantile(values,.5)).toFixed(1)});
for(const stage of ['before','after'])for(const r of JSON.parse(fs.readFileSync(`artifacts/integration/${stage}/profile.json`,'utf8'))){console.log(JSON.stringify({stage,mode:r.mode,lcp:r.load.metrics.lcp,cls:r.load.metrics.cls,initialLongTaskExcess:r.load.metrics.tasks.reduce((s,t)=>s+Math.max(0,t-50),0),mainThreadSeconds:r.mainThreadSeconds,heapMiB:r.heapBytes/1048576,maxEvent:Math.max(0,...r.metrics.events),idle:stats(r.idle),camera:stats(r.camera),scroll:stats(r.scroll),canvases:r.load.canvases},null,2));}
