import fs from 'node:fs';
const q=(values,p)=>+([...values].sort((a,b)=>a-b)[Math.floor((values.length-1)*p)]).toFixed(2);
const results=[];
for(const stage of ['before','after','repeat'])for(const r of JSON.parse(fs.readFileSync(`artifacts/refinement/${stage}/profile.json`,'utf8'))) results.push({stage,mode:r.mode,lcpMs:r.load.metrics.lcp,cls:r.load.metrics.cls,mainThreadSeconds:+r.mainThreadSeconds.toFixed(3),heapMiB:+(r.heapBytes/1048576).toFixed(2),maxSampledEventMs:Math.max(0,...r.metrics.events),jsBytes:r.load.resources.filter(x=>x.name.includes('.js')).reduce((s,x)=>s+x.bytes,0),raf:Object.fromEntries(['idle','camera','scroll'].map(k=>[k,{median:q(r[k],.5),p95:q(r[k],.95)}])),frames:Object.fromEntries(Object.entries(r.renders).map(([k,v])=>[k,v.frames]))});
fs.writeFileSync('artifacts/refinement/performance-summary.json',JSON.stringify(results,null,2));
const table=['| Run | Device | LCP ms | Camera p95 ms | Scroll p95 ms | Main-thread s | Sampled event max ms |','| --- | --- | ---: | ---: | ---: | ---: | ---: |',...results.map(r=>`| ${r.stage} | ${r.mode} | ${r.lcpMs} | ${r.raf.camera.p95} | ${r.raf.scroll.p95} | ${r.mainThreadSeconds} | ${r.maxSampledEventMs} |`)].join('\n');
const path='docs/global-visual-refinement.md';let doc=fs.readFileSync(path,'utf8').split('\n<!-- measured-table -->')[0];fs.writeFileSync(path,doc+'\n<!-- measured-table -->\n\n'+table+'\n');
console.log(JSON.stringify(results,null,2));
