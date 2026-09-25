import {chromium} from 'playwright';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {getLibraryUI} from '../src/lib/content/library-ui.ts';
import {getShelfBooks} from '../src/app/components/shelf/volumes.ts';
import {getShelfUI} from '../src/app/components/shelf/shelf-ui.ts';
import {getExperienceCopy} from '../src/lib/experience-copy.ts';
const base=process.argv[2]||'http://localhost:3000';
const baseline=JSON.parse(fs.readFileSync('artifacts/redesign/baseline/routes.json','utf8'));
const hashes=JSON.parse(fs.readFileSync('artifacts/redesign/baseline/source-hashes.json','utf8'));
const normalize=s=>(s||'').replace(/\s/g,'');
const immutable=hashes.filter(x=>x.file.startsWith('src/lib/')||x.file.startsWith('public/')||['src/app/components/shelf/volumes.ts','src/app/components/shelf/shelf-ui.ts','src/app/components/sketchbook/sketchbook-ui.ts','next.config.js','src/app/sitemap.ts','src/app/robots.ts'].includes(x.file));
const changed=immutable.filter(x=>crypto.createHash('sha256').update(fs.readFileSync(x.file)).digest('hex')!==x.sha256);
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});const records=[];
for(const old of baseline){
  const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
  const response=await page.goto(base+old.route,{waitUntil:'networkidle',timeout:120000});
  const current=await page.evaluate(()=>({text:document.querySelector('main')?.textContent,title:document.title,metadata:[...document.querySelectorAll('meta[name],meta[property],link[rel="canonical"],link[hreflang]')].map(e=>e.outerHTML),links:[...document.querySelectorAll('a')].map(e=>e.getAttribute('href')),brokenImages:[...document.images].filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>e.textContent)}));
  const isHome=/^\/(en|tr|it)$/.test(old.route),locale=old.route.slice(1,3);
  const copy=getLibraryUI(locale),shelf=getShelfUI(locale);
  const homeStrings=[copy.hero,copy.intro,copy.directory,copy.collection,copy.collectionNote,copy.service,copy.research,copy.synthetic,copy.takeaway,copy.read,copy.shelfTitle,copy.shelfNote,copy.activate,copy.contact,copy.approach,copy.browse,copy.boundary,shelf.identity,shelf.fallbackNote,...getShelfBooks(locale).flatMap(b=>[b.title,b.discipline,b.note,b.format])];
  // The pre-hydration baseline can say "Swipe" before its fine-pointer media
  // query selects "Scroll". Both are original labels; compare the content,
  // normalizing only these two known device-specific instructions.
  const career=getExperienceCopy(locale);
  const canonicalText=text=>old.route.endsWith('/chapters')?normalize(text).replaceAll(normalize(career.swipeChapters),'DEVICE_EXPLORATION_HINT').replaceAll(normalize(career.scrollChapters),'DEVICE_EXPLORATION_HINT'):normalize(text);
  const missingText=isHome?homeStrings.filter(s=>!normalize(current.text).includes(normalize(s))):canonicalText(current.text)===canonicalText(old.text)?[]:['Main text differs'];
  const oldLinks=[...new Set(old.links.map(l=>l.href).filter(Boolean))];
  const missingLinks=oldLinks.filter(href=>!current.links.includes(href));
  const seo=old.metadata.filter(s=>!s.includes('theme-color')).every(s=>current.metadata.includes(s));
  records.push({route:old.route,status:response.status(),title:old.title===current.title,seo,schema:JSON.stringify(old.schema)===JSON.stringify(current.schema),missingText,missingLinks,brokenImages:current.brokenImages,errors});
  console.log(JSON.stringify(records.at(-1)));page.off('pageerror',onError);
}
await browser.close();fs.mkdirSync('artifacts/redesign/qa',{recursive:true});fs.writeFileSync('artifacts/redesign/qa/content-regression.json',JSON.stringify({immutableFilesChecked:immutable.length,changed,records},null,2));
if(changed.length||records.some(r=>r.status!==200||!r.title||!r.seo||!r.schema||r.missingText.length||r.missingLinks.length||r.brokenImages.length||r.errors.length))process.exitCode=1;
