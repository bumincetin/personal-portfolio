/** Exercises the career story and message handoff without sending any message. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const axe = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.argv[2] ?? 'http://localhost:3112';
const browser = await chromium.launch({ channel: 'chrome' });
let scans = 0;
async function scan(page, label) {
  await page.addScriptTag({ content: axe });
  const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice'] } })).violations.map(v => ({ id:v.id, nodes:v.nodes.map(n=>({html:n.html,summary:n.failureSummary})) })));
  assert.deepEqual(violations, [], label); scans++;
}
const noOverflow = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
try {
  for (const width of [360, 768, 1440]) {
    const context = await browser.newContext({ viewport:{width,height:900}, hasTouch:width<1000, isMobile:width<700, reducedMotion:'reduce' });
    const page = await context.newPage();
    const errors = [], posts = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if(m.type()==='error') errors.push(m.text()); });
    page.on('request', r => { if(r.method()==='POST' && !r.url().includes('__nextjs')) posts.push(r.url()); });
    for (const locale of ['en','tr','it']) {
      await page.goto(`${BASE}/${locale}/chapters`, {waitUntil:'load'});
      assert.equal(await page.locator('.career-chapter').count(),5);
      assert.equal(await page.locator('.conversation-panel').count(),0);
      assert.ok(await noOverflow(page));
      await scan(page, `${locale} chapters ${width}`);
      await page.locator('#chapter-III').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      if(width>700) {
        assert.equal(await page.locator('.career-reel a[aria-current]').getAttribute('href'),'#chapter-III');
        assert.ok(await page.locator('.career-film').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=68 && r.top<160;}),'film must stay pinned beside the active chapter');
      }
      assert.ok(await noOverflow(page));
      if(locale==='en') await scan(page, `timeline ${width}`);
      await page.locator('#career-record').scrollIntoViewIfNeeded();
      assert.ok(await page.locator('#education-title').isVisible());
      if(locale==='en') await scan(page, `CV ${width}`);
      await page.goto(`${BASE}/${locale}/contact?topic=forecasting`, {waitUntil:'load'});
      assert.equal(await page.locator('.career-chapter').count(),0);
      assert.equal(await page.locator('.colophon-portrait').count(),0);
      assert.ok(await noOverflow(page));
      await scan(page, `${locale} contact ${width}`);
      const next = async () => { await page.locator('.conversation-actions button[type="submit"]').click(); await page.waitForTimeout(100); };
      await next(); assert.ok(await page.locator('#conversation-error').isVisible());
      await page.locator('#conversation-name').fill('Çağla & Alex');
      await page.locator('#conversation-company').fill('A+B Studio');
      await next();
      assert.ok(await page.locator('input[value="forecasting"]').isChecked());
      await page.locator('input[value="document-intelligence"]').check();
      await next();
      await page.locator('.conversation-back').click(); await page.waitForTimeout(100);
      assert.ok(await page.locator('input[value="document-intelligence"]').isChecked(),'back preserves answers');
      await next(); await next(); assert.ok(await page.locator('#conversation-error').isVisible());
      await page.locator('#conversation-idea').fill('We need to review reports in Turkish & Italian. Can we discuss scope + delivery?');
      await next(); await page.locator('input[name="timing"][value="1"]').check(); await next();
      assert.ok(await page.locator('#conversation-draft').isVisible());
      const draft = await page.locator('#conversation-draft').inputValue();
      assert.ok(draft.includes('Çağla & Alex') && draft.includes('A+B Studio') && draft.includes('scope + delivery?'));
      const edited = draft + '\nAn extra note: 50% scope / phase #1.';
      await page.locator('#conversation-draft').fill(edited);
      const wa = new URL(await page.locator('.conversation-delivery a').first().getAttribute('href'));
      assert.equal(wa.hostname,'wa.me'); assert.equal(wa.pathname,'/393481705207'); assert.equal(wa.searchParams.get('text'),edited);
      const email = new URL(await page.locator('.conversation-delivery a').nth(1).getAttribute('href'));
      assert.equal(email.searchParams.get('body'),edited);
      const web = new URL(await page.locator('.conversation-alternatives a').getAttribute('href'));
      assert.equal(web.hostname,'outlook.office.com'); assert.equal(web.searchParams.get('body'),edited);
      assert.ok(await noOverflow(page));
      if(locale==='en') await scan(page, `message review ${width}`);
      assert.equal(posts.length,0,'answers must not be sent by the website');
      console.log(`PASS ${locale} at ${width}px: separate routes, timeline, validation, draft and handoff`);
    }
    assert.deepEqual(errors,[],'no hydration or runtime errors');
    await context.close();
  }
  const motion = await browser.newContext({viewport:{width:1280,height:900}});
  const page = await motion.newPage();
  const motionErrors = [];
  page.on('pageerror', error => motionErrors.push(error.message));
  await page.goto(`${BASE}/en/contact`);
  await page.locator('.neuron-book[data-ready="true"]').waitFor({timeout:60000});
  await page.getByRole('button',{name:'Pause animation'}).click();
  await page.waitForTimeout(800); // Let the canvas entrance opacity settle.
  const canvas = page.locator('.neuron-canvas');
  const cdp = await motion.newCDPSession(page);
  const capture = async () => {
    const r = await canvas.boundingBox();
    const scroll = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
    return (await cdp.send('Page.captureScreenshot', { format:'png', clip:{x:r.x+scroll.x,y:r.y+scroll.y,width:r.width,height:r.height,scale:1} })).data;
  };
  const a = await capture(); await page.waitForTimeout(250); const b = await capture();
  assert.ok(a === b,'paused sculpture must stay still');
  await page.getByRole('button',{name:'Play animation'}).click();
  const c = await capture(); await page.waitForTimeout(300); const d = await capture();
  assert.ok(c !== d,'the 3D neuron must animate');
  await page.goto(`${BASE}/en/chapters`);
  await page.locator('#chapter-IV').scrollIntoViewIfNeeded(); await page.waitForTimeout(1700);
  assert.equal(await page.locator('.career-reel a[aria-current]').getAttribute('href'),'#chapter-IV');
  await page.emulateMedia({media:'print'});
  assert.ok(await page.locator('.chapters-print-identity').isVisible());
  assert.ok(await page.locator('.career-film').isHidden());
  assert.ok(await page.locator('#career-record').isVisible());
  assert.deepEqual(motionErrors, [], 'motion must not raise runtime errors');
  await motion.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  const fallback=await nojs.newPage();
  await fallback.goto(`${BASE}/en/contact`);
  assert.ok(await fallback.locator('.conversation-panel').isHidden());
  assert.ok(await fallback.locator('.conversation-direct a[href^="mailto:"]').isVisible());
  await fallback.goto(`${BASE}/en/chapters`);
  assert.equal(await fallback.locator('.career-chapter').count(),5);
  assert.ok(await fallback.locator('#career-record').isVisible());
  await nojs.close();
  console.log(`PASS ${scans} accessibility scans, live 3D, pause, motion, print, and no-JavaScript fallbacks`);
} finally { await browser.close(); }
