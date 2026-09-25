/** Lighthouse is a pinned audit tool, installed with npm exec; no app dependency. */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawn} from 'node:child_process';
const [base='http://localhost:3114',dest='artifacts/design/library-audit/lighthouse-before',modulePath]=process.argv.slice(2);
if(!modulePath)throw new Error('Pass the installed lighthouse/core/index.js path as the third argument (Lighthouse 13.5.0).');
const {default:lighthouse}=await import(pathToFileURL(path.resolve(modulePath)).href);
await fs.mkdir(dest,{recursive:true});
const runs=[];
for(let i=1;i<=3;i++){
  if(process.env.RESUME_AUDIT==='1') {
    try {
      const saved=JSON.parse(await fs.readFile(path.join(dest,`run-${i}.json`),'utf8'));
      const a=saved.audits;
      if(saved.runtimeError||!Number.isFinite(a['largest-contentful-paint'].numericValue))throw Error('Invalid prior run');
      runs.push({run:i,browser:saved.environment.hostUserAgent,lighthouse:saved.lighthouseVersion,lcp:a['largest-contentful-paint'].numericValue,cls:a['cumulative-layout-shift'].numericValue,tbt:a['total-blocking-time'].numericValue,bytes:a['total-byte-weight'].numericValue,score:saved.categories.performance.score,settings:saved.configSettings});
      console.log(`Retained completed run ${i}`);continue;
    }catch { /* Only completed, valid reports can be resumed. */ }
  }
  const profile=path.resolve(dest,`chrome-profile-${i}-${Date.now()}`);
  const child=spawn(chromium.executablePath(),['--headless=new','--no-sandbox','--remote-debugging-port=9337',`--user-data-dir=${profile}`,'--no-first-run','--disable-extensions','about:blank'],{windowsHide:true,stdio:'ignore'});
  let version;
  for(let attempt=0;attempt<100;attempt++) {
    try { version=await (await fetch('http://127.0.0.1:9337/json/version')).json();break; } catch { await new Promise(resolve=>setTimeout(resolve,100)); }
  }
  if(!version)throw new Error('Audit browser did not start');
  try{
    const result=await lighthouse(base+'/en',{port:9337,logLevel:'error',onlyCategories:['performance'],output:'json',formFactor:'mobile',throttlingMethod:'simulate',maxWaitForFcp:90000,maxWaitForLoad:90000});
    await fs.writeFile(path.join(dest,`run-${i}.json`),JSON.stringify(result.lhr,null,2));
    const a=result.lhr.audits;
    if (result.lhr.runtimeError || !Number.isFinite(a['largest-contentful-paint'].numericValue) || !Number.isFinite(a['total-blocking-time'].numericValue)) {
      throw new Error('Invalid Lighthouse run; report retained for diagnosis, not counted as a measurement.');
    }
    const run={run:i,browser:version.Browser,lighthouse:result.lhr.lighthouseVersion,lcp:a['largest-contentful-paint'].numericValue,cls:a['cumulative-layout-shift'].numericValue,tbt:a['total-blocking-time'].numericValue,bytes:a['total-byte-weight'].numericValue,score:result.lhr.categories.performance.score,settings:result.lhr.configSettings,runtimeError:result.lhr.runtimeError};
    runs.push(run);console.log(JSON.stringify(run));
  }finally{child.kill(); await new Promise(resolve=>setTimeout(resolve,1000));}
}
const median=key=>runs.map(r=>r[key]).sort((a,b)=>a-b)[1];
await fs.writeFile(path.join(dest,'summary.json'),JSON.stringify({runs,median:Object.fromEntries(['lcp','cls','tbt','bytes','score'].map(k=>[k,median(k)]))},null,2));
