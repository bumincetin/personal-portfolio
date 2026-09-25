/** Failure and draft regressions: all destinations intercepted, no messages sent. */
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {enterShelf} from './library-test-helpers.mjs';
const base=process.argv[2]||'http://localhost:3116';
const browser=await chromium.launch({channel:'chrome'});
try {
  for(const [locale,word] of [['en','could not'],['tr','yüklenemedi'],['it','non si è caricata']]) {
    const context=await browser.newContext({reducedMotion:'reduce'});
    const page=await context.newPage();await page.goto(`${base}/${locale}`,{waitUntil:'networkidle'});
    await page.route('**/*.js',route=>route.abort('failed'));
    await page.locator('[data-enter-shelf]').click();
    await page.waitForFunction(()=>!!document.querySelector('.library-status')?.textContent);
    const status=await page.locator('.library-status').textContent();
    assert.ok(status.toLowerCase().includes(word),status);
    assert.equal(await page.locator('dialog[open]').count(),0);
    assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
    assert.ok(await page.locator('#catalogue a').first().isVisible());
    await context.close();console.log(`PASS ${locale}: failed optional chunk returns to the localized catalogue`);
    const article=await browser.newContext({reducedMotion:'reduce'});
    const reader=await article.newPage();await reader.goto(`${base}/${locale}/volumes/reporting`,{waitUntil:'networkidle'});
    await reader.route('**/*.js',route=>route.abort('failed'));
    await reader.locator('[data-view-book]').click();
    await reader.waitForFunction(()=>!!document.querySelector('.reader-view-status')?.textContent);
    assert.equal(await reader.locator('.sketchbook-root').getAttribute('data-view'),'article');
    assert.ok(await reader.locator('#leaf-colophon').isVisible());await article.close();
  }
  const textures=await browser.newContext({reducedMotion:'reduce'});
  await textures.route('**/shelf/*.webp',route=>route.abort('failed'));
  const p=await textures.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/en');await enterShelf(p);
  await p.locator('#inspect').click();assert.ok(await p.locator('.volume-link').isVisible());
  await p.locator('[data-exit-shelf]').click();assert.equal(await p.evaluate(()=>document.body.style.overflow),'');
  assert.deepEqual(errors,[]);await textures.close();console.log('PASS failed cover/wood downloads retain procedural books and readable links');

  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('Unavailable client'))}}));
  const page=await context.newPage();const sent=[];
  await page.route('**/*',route=>{const request=route.request();if(request.method()==='POST'||!request.url().startsWith(base)){sent.push(request.url());return route.abort();}return route.continue();});
  await page.goto(base+'/en/contact?topic=reporting');
  await page.waitForFunction(()=>document.querySelector('#conversation-topic')?.value==='2');
  assert.equal(await page.locator('#conversation-topic').inputValue(),'2');
  await page.locator('#conversation-idea').fill('Synthetic draft: scope + timing & Çağla.');
  await page.locator('.conversation-alternatives button').click();
  assert.ok(await page.locator('#conversation-draft').isVisible(),'clipboard failure reveals the draft for manual copying');
  const edited='Manual synthetic draft with 50% scope / phase #1.';
  await page.locator('#conversation-draft').fill(edited);
  await page.locator('[data-contact-guided]').click();await page.locator('[data-contact-simple]').click();
  assert.equal(await page.locator('#conversation-draft').inputValue(),edited);
  await page.locator('.conversation-alternatives button').click();
  assert.ok(await page.locator('#conversation-draft').evaluate(el=>el.selectionStart===0&&el.selectionEnd===el.value.length));
  assert.ok((await page.locator('.conversation-status').textContent()).length>0);
  const large='Synthetic long message. '.repeat(125);await page.locator('#conversation-draft').fill(large);
  assert.equal(await page.locator('.conversation-delivery a').count(),0);
  assert.ok(await page.locator('.composer-preview').getAttribute('open')!==null);
  assert.deepEqual(await page.evaluate(()=>({local:{...localStorage},session:{...sessionStorage}})),{local:{},session:{}});
  assert.deepEqual(sent,[]);await context.close();console.log('PASS optional details, topic context, edited draft retention, unavailable clipboard and long-URL copy fallback; no POST/storage');
} finally {await browser.close();}
