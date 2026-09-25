/** Acceptance regressions for the HTML library and explicitly entered experiences. */
import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';
import fs from 'node:fs/promises';
import { enterShelf, enterBook, openOptimizer } from './library-test-helpers.mjs';
const base=process.argv[2]||'http://localhost:3115';
const output='artifacts/design/library-audit';
await fs.mkdir(output,{recursive:true});
await fs.mkdir(output+'/after',{recursive:true});
const capture=async (page,name)=>{
  const cdp=await page.context().newCDPSession(page);
  const {data}=await cdp.send('Page.captureScreenshot',{format:'png'});
  await fs.writeFile(`${output}/after/${name}.png`,Buffer.from(data,'base64'));await cdp.detach();
};
const results=[];
const pass=(name,details={})=>{results.push({name,...details});console.log('PASS '+name);};
const slugs=['document-intelligence','forecasting','reporting','cross-border','greenwashing-risk-scoring','parliamentary-seat-forecast','portfolio-optimizer'];
const routes=['','/front-matter','/chapters','/contact',...slugs.map(s=>'/volumes/'+s)];
const browser=await chromium.launch({channel:'chrome'});
const instrumentation=()=>{
  window.__graphics={contexts:[],draws:0,frames:0,errors:[]};
  addEventListener('error',event=>window.__graphics.errors.push(event.message));
  const get=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(kind,...args){if(kind.includes('webgl'))window.__graphics.contexts.push({connected:this.isConnected,route:location.pathname});return get.call(this,kind,...args);};
  for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]) for(const key of ['drawArrays','drawElements']) {
    const original=proto[key];proto[key]=function(...args){window.__graphics.draws++;return original.apply(this,args);};
  }
  const raf=window.requestAnimationFrame;
  window.requestAnimationFrame=callback=>raf(time=>{window.__graphics.frames++;callback(time);});
};
try{
  // All routes at the required widths; multilingual long labels on the narrow path.
  for(const [width,height] of [[320,844],[390,844],[768,1024],[1280,720],[1440,900],[812,375]]) {
    const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
    const page=await context.newPage();page.setDefaultNavigationTimeout(90000);const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const locale of width===390?['en','tr','it']:['en'])for(const route of routes){
      await page.goto(`${base}/${locale}${route}`,{waitUntil:'networkidle'});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${locale}${route} ${width}: reflow`);
      assert.equal(await page.locator('h1').count(),1);
      if(route.includes('volumes')||route==='/front-matter') {
        assert.equal(await page.locator('.sketchbook-root').getAttribute('data-view'),'article');
        assert.ok(await page.locator('#sbSource .sb-leaf').count()>8);
        assert.ok(await page.locator('#leaf-colophon').isVisible());
      }
    }
    assert.deepEqual(errors,[]);pass(`HTML routes and reflow ${width}×${height}`);await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  await context.addInitScript(instrumentation);
  const page=await context.newPage();
  for(const route of ['/en','/en/front-matter','/en/volumes/portfolio-optimizer','/en/contact']) {
    const requests=[];const scripts=[];
    const request=r=>requests.push(r.url());
    const response=r=>{if(r.request().resourceType()==='script')scripts.push(r.text().catch(()=>''));};
    page.on('request',request);page.on('response',response);
    await page.goto(base+route,{waitUntil:'networkidle'});
    const bytes=(await Promise.all(scripts)).join('\n');
    assert.ok(!requests.some(url=>/\/shelf\/(covers|wood)\.webp/.test(url)),route+' textures');
    assert.ok(!bytes.includes('paper-dust')&&!bytes.includes('THREE.WebGLRenderer'),route+' 3D engine');
    assert.equal(await page.evaluate(()=>window.__graphics.contexts.length),0);
    pass(`No graphics transfer or context before activation: ${route}`,{requests:requests.length});
    page.off('request',request);page.off('response',response);
  }
  await page.goto(base+'/en');
  const scrollBefore=await page.evaluate(()=>scrollY);
  await page.mouse.wheel(0,700);await page.waitForTimeout(350);
  assert.ok(await page.evaluate(()=>scrollY)>scrollBefore);
  assert.equal(await page.locator('#experience').count(),0);pass('Ordinary wheel scrolls the catalogue');

  // Complete modal keyboard order, Escape restoration, and the formerly skipped link.
  await enterShelf(page);
  await capture(page,'optional-shelf-1440');
  await page.locator('#inspect').focus();await page.keyboard.press('Enter');
  await page.locator('#close-detail').waitFor();
  await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'reset-view');
  await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'close-detail');
  await page.keyboard.press('Tab');assert.ok(await page.locator('.volume-link').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Escape');await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>document.activeElement.id),'inspect');
  await page.keyboard.press('Enter');await page.keyboard.press('Tab');await page.keyboard.press('Enter');
  await page.waitForURL('**/en/volumes/document-intelligence');
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert.equal(await page.locator('html[data-shelf]').count(),0);pass('Keyboard reaches and follows primary volume link; focus and scroll restore');

  // One set of real leaves, complete content, clone IDs and a single instrument.
  const content=()=>page.evaluate(()=>[...document.querySelectorAll('.sb-source .sb-leaf,#sbBook .sb-full .sb-leaf')].map(el=>({id:el.id,text:el.textContent})).sort((a,b)=>a.id.localeCompare(b.id)));
  const before=await content();await enterBook(page);
  await capture(page,'optional-book-1440');
  await page.locator('#sbRight').click();await page.waitForTimeout(400);
  assert.deepEqual(await content(),before);
  assert.deepEqual(await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);return ids.filter((id,i)=>ids.indexOf(id)!==i);}),[]);
  await page.locator('[data-view-article]').click();assert.deepEqual(await content(),before);
  assert.equal(await page.locator('#sbBook .sb-leaf').count(),0);pass('Article/book switch preserves original content and restores every leaf');
  await page.goto(base+'/en/volumes/reporting#leaf-colophon');
  await enterBook(page);assert.ok(await page.locator('#sbBook #leaf-colophon').count());
  await page.evaluate(()=>dispatchEvent(new Event('beforeprint')));
  await page.emulateMedia({media:'print'});
  assert.ok(await page.locator('#sbSource #leaf-colophon').isVisible());
  assert.equal(await page.locator('#sbBook .sb-leaf').count(),0);
  await page.emulateMedia({media:'screen'});pass('Deep link opens the same leaf; printing exposes the full article');
  await page.goto(base+'/en/volumes/portfolio-optimizer');
  if(await page.locator('.sketchbook-root').getAttribute('data-view')==='book')await page.locator('[data-view-article]').click();
  await openOptimizer(page);
  const slider=page.locator('input[type=range]').first();await slider.fill('20');const initial=await slider.inputValue();
  await page.locator('#leaf-demo').scrollIntoViewIfNeeded();await enterBook(page);
  const index=await page.locator('#leaf-demo').getAttribute('data-folio');await page.locator('.plate').nth(Number(index)-1).click();
  await page.waitForTimeout(250);
  assert.equal(await page.locator('input[type=range]').first().inputValue(),initial);
  assert.equal(await page.locator('section[aria-label="Geopolitical portfolio optimizer"]').count(),1);
  await page.locator('[data-view-article]').click();pass('Optimizer loads independently and retains one live instrument across views');
  await context.close();

  // Locale-specific runtime behavior, including context loss and renderer failure.
  for(const [locale,selected,closed,lost,unavailable] of [
    ['tr','cilt seçildi','Kitabı aç','grafik bağlantısı','kullanılamıyor'],
    ['it','Selezionato il volume','Apri il libro','contesto grafico','non è disponibile'],
  ]) {
    const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
    const p=await ctx.newPage();await p.goto(`${base}/${locale}`);await enterShelf(p);
    assert.ok((await p.locator('#live-region').textContent()).includes(selected));
    await p.locator('#inspect').click();assert.ok((await p.locator('#toggle-book').textContent()).includes(closed));
    await p.locator('#scene').evaluate(canvas=>canvas.dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
    await p.locator('dialog').waitFor({state:'detached'});
    assert.ok((await p.locator('.library-status').textContent()).includes(lost));
    assert.equal(await p.evaluate(()=>document.body.style.overflow),'');
    await ctx.close();
    const bad=await browser.newContext();await bad.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){return kind.includes('webgl')?null:get.call(this,kind,...args);};});
    const q=await bad.newPage();await q.goto(`${base}/${locale}`);await q.locator('[data-enter-shelf]').click();
    await q.waitForFunction(()=>!!document.querySelector('.library-status')?.textContent);
    assert.ok((await q.locator('.library-status').textContent()).includes(unavailable));
    assert.ok(await q.locator('#catalogue').isVisible());await bad.close();pass(`${locale} runtime selection, controls, context loss and unavailable WebGL localized`);
  }

  // Delay both font completion and textures, cancel, then release: no detached init.
  for(const delay of ['font','texture']) {
    const ctx=await browser.newContext({viewport:{width:1440,height:900}});await ctx.addInitScript(instrumentation);
    if(delay==='font')await ctx.addInitScript(()=>{const load=document.fonts.load.bind(document.fonts);document.fonts.load=(...args)=>new Promise(resolve=>{window.__releaseFont=()=>load(...args).then(resolve);});});
    let release;const gate=new Promise(resolve=>release=resolve);
    if(delay==='texture')await ctx.route('**/shelf/covers.webp',async route=>{await gate;await route.continue().catch(()=>{});});
    const p=await ctx.newPage();await p.goto(base+'/en');await p.locator('[data-enter-shelf]').click();
    if(delay==='font')await p.waitForFunction(()=>!!window.__releaseFont);else await p.locator('#scene').waitFor({state:'attached'});
    await p.locator('[data-exit-shelf]').click();
    await p.locator('.site-nav a[href="/en/chapters"]').first().click();await p.waitForURL('**/chapters');
    if(delay==='font')await p.evaluate(()=>window.__releaseFont());else release();
    await p.waitForTimeout(1500);
    assert.deepEqual(await p.evaluate(()=>window.__graphics.contexts),[]);
    assert.deepEqual(await p.evaluate(()=>window.__graphics.errors),[]);
    assert.equal(await p.evaluate(()=>document.body.style.overflow),'');await ctx.close();pass(`Canceled ${delay} initialization creates no renderer after navigation`);
  }

  const idle=await browser.newContext({viewport:{width:1440,height:900}});await idle.addInitScript(instrumentation);
  const p=await idle.newPage();await p.goto(base+'/en');await enterShelf(p);await p.mouse.move(0,0);await p.waitForTimeout(5000);
  const count=await p.evaluate(()=>window.__graphics.draws);await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>window.__graphics.draws),count);
  await p.locator('[data-exit-shelf]').click();await p.waitForTimeout(300);
  const closed=await p.evaluate(()=>({...window.__graphics}));await p.waitForTimeout(1000);
  assert.equal(await p.evaluate(()=>window.__graphics.draws),closed.draws);
  pass('Settled shelf and exited shelf stop rendering',{drawsAtRest:count,closedDraws:closed.draws});await idle.close();

  // Text resizing is separate from viewport reflow.
  const zoom=await browser.newContext({viewport:{width:390,height:844}});const z=await zoom.newPage();
  for(const route of ['/en','/tr/volumes/cross-border','/it/contact']){
    await z.goto(base+route);await z.addStyleTag({content:'html { font-size: 200% !important; }'});
    assert.ok(await z.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' 200% text');
   }await zoom.close();pass('200% text resizing at 390 CSS pixels');
  const pinch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const pin=await pinch.newPage();await pin.goto(base+'/en');
  const cdp=await pinch.newCDPSession(pin);
  // The high-level synthesizePinchGesture command did not zoom even a blank
  // control document here. Dispatch two real touch points with frame spacing.
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:150,y:350,id:1},{x:240,y:350,id:2}]});
  for(let i=1;i<=15;i++) {
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:150-i*5,y:350,id:1},{x:240+i*5,y:350,id:2}]});
    await pin.waitForTimeout(25);
  }
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await pin.waitForFunction(()=>visualViewport.scale>1);
  assert.ok(await pin.evaluate(()=>visualViewport.scale)>1,'browser pinch zoom remains enabled');await pinch.close();pass('Emulated touch pinch zoom remains available');
}finally{await browser.close();}

// WebKit is a browser-engine check, not a real iPhone or a screen-reader audit.
const wk=await webkit.launch();
try {
  const context=await wk.newContext({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
  const p=await context.newPage();
  for(const route of ['/en','/it/front-matter','/tr/volumes/cross-border','/en/contact']){
    await p.goto(base+route);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  }
  await p.goto(base+'/en/volumes/reporting');await enterBook(p);await p.locator('#sbRight').click();await p.locator('[data-view-article]').click();
  assert.ok(await p.locator('#leaf-colophon').isVisible());pass('WebKit mobile routes and reading switch',{browser:wk.version()});
}finally{await wk.close();}
await fs.writeFile(output+'/regressions.json',JSON.stringify(results,null,2));
console.log(`${results.length} library regression groups passed.`);
