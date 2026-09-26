import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3113";
const dir = "artifacts/evolution/after";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const slugs = [
  "document-intelligence",
  "forecasting",
  "reporting",
  "cross-border",
  "greenwashing-risk-scoring",
  "parliamentary-seat-forecast",
  "portfolio-optimizer",
];
const results = [];
const axe = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
async function audit(page, label) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  await page.addScriptTag({ content: axe });
  const state = await page.evaluate(async () => ({
    h1: document.querySelectorAll("h1").length,
    ids: [...document.querySelectorAll("[id]")]
      .map((e) => e.id)
      .filter((id, i, a) => a.indexOf(id) !== i),
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
    canvas: document.querySelectorAll("canvas").length,
    violations: (
      await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag21a", "wcag22aa"],
        },
      })
    ).violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  }));
  results.push({ label, ...state });
  assert.equal(state.h1, 1, label);
  assert.deepEqual(state.ids, [], label);
  assert.equal(state.overflow, false, label);
  assert.equal(
    state.canvas,
    /\/(en|tr|it)\/?$/.test(new URL(page.url()).pathname) ? 1 : 0,
    label,
  );
  assert.deepEqual(state.violations, [], label);
}
try {
  for (const width of process.env.INTERACTIONS_ONLY
    ? []
    : [320, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 500 ? 844 : 1000 },
      isMobile: width < 500,
      hasTouch: width < 500,
    });
    const page = await context.newPage();
    page.setDefaultTimeout(45000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const locale of width === 390 ? ["en", "tr", "it"] : ["en"]) {
      for (const path of [
        "",
        "/front-matter",
        "/chapters",
        "/contact",
        ...(width === 390 || width === 1440
          ? slugs
          : ["document-intelligence", "greenwashing-risk-scoring"]
        ).map((s) => `/volumes/${s}`),
      ]) {
        const response = await page.goto(`${base}/${locale}${path}`, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200);
        await audit(page, `${locale}${path || "/"} ${width}`);
        const meta = await page.evaluate(() => ({
          canonical: document.querySelector('link[rel="canonical"]').href,
          langs: [...document.querySelectorAll("link[hreflang]")].map(
            (e) => e.hreflang,
          ),
          og: document.querySelector('meta[property="og:image"]').content,
        }));
        assert.equal(new URL(meta.canonical).pathname, `/${locale}${path}`);
        assert.deepEqual(meta.langs.sort(), ["en", "it", "tr", "x-default"]);
        assert.ok(meta.og.includes(`/og/${locale}`));
        if (path.startsWith("/volumes/")) {
          assert.equal(await page.locator(".quick-read").count(), 1);
          assert.ok((await page.locator(".reading-block").count()) > 10);
        }
        if (width === 1440 || width === 390)
          await page.screenshot({
            path: `${dir}/${locale}-${width}-${path.replaceAll("/", "-") || "home"}.png`,
          });
      }
    }
    assert.deepEqual(errors, []);
    await context.close();
    console.log(
      `PASS routes, metadata, reading and accessibility at ${width}px`,
    );
  }
  const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    }),
    page = await context.newPage();
  await page.goto(`${base}/en`);
  await page.locator('.work-gallery[data-animated="true"]').waitFor();
  await page.locator(".gallery-track").scrollIntoViewIfNeeded();
  const card = page.locator(".gallery-item").first();
  const transform = () => card.evaluate((e) => e.style.transform);
  const before = await transform();
  await page.waitForTimeout(350);
  assert.notEqual(await transform(), before, "gallery moves");
  await page.getByRole("button", { name: "Pause gallery" }).click();
  const paused = await transform();
  await page.waitForTimeout(250);
  assert.equal(await transform(), paused, "pause holds position");
  await page.getByRole("button", { name: "Play gallery" }).click();
  await page.mouse.move(10, 100);
  const hoverBox = await page.locator(".gallery-card").first().boundingBox();
  await page.mouse.move(
    Math.max(20, hoverBox.x + 80),
    Math.min(950, hoverBox.y + 80),
  );
  await page.waitForTimeout(60);
  const hovered = await transform();
  await page.waitForTimeout(250);
  assert.equal(await transform(), hovered, "hover stabilizes");
  for (const link of await page.locator(".gallery-card").all()) {
    await link.focus();
    await page.waitForTimeout(50);
    const r = await link.boundingBox();
    assert.ok(r.x >= -1 && r.x + r.width <= 1441, "keyboard card is in view");
  }
  await page.locator(".gallery-card").last().press("Space");
  await page.waitForURL("**/volumes/portfolio-optimizer");
  await page
    .locator(".atlas-languages")
    .first()
    .getByRole("link", { name: "TR / Türkçe", exact: true })
    .click();
  await page.waitForURL("**/tr/volumes/portfolio-optimizer");
  await page.goBack();
  await page.waitForURL("**/en/volumes/portfolio-optimizer");
  await page.locator("[data-open-optimizer]").click();
  await page
    .locator('section[aria-label="Geopolitical portfolio optimizer"]')
    .waitFor();
  await page.goto(`${base}/en`, { waitUntil: "networkidle" });
  await page.locator('.work-gallery[data-ready="true"]').waitFor();
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.locator("dialog[open]").waitFor();
  for (let i = 0; i < 24; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page
        .locator("dialog[open]")
        .evaluate((e) => e.contains(document.activeElement)),
    );
  }
  await page.keyboard.press("Escape");
  assert.ok(
    await page
      .getByRole("button", { name: "Open menu", exact: true })
      .evaluate((e) => e === document.activeElement),
  );
  await page.locator(".gallery-track").scrollIntoViewIfNeeded();
  const dragBox = await page.locator(".gallery-track").boundingBox();
  const dragY = dragBox.y + 100;
  await page.mouse.move(120, dragY);
  await page.mouse.down();
  await page.mouse.move(440, dragY, { steps: 12 });
  await page.mouse.up();
  assert.equal(new URL(page.url()).pathname, "/en", "drag does not navigate");
  await context.close();
  console.log(
    "PASS motion, pause, hover, keyboard activation, language route, history, optimizer and menu",
  );
  for (const mode of ["touch", "reduced", "no-js"]) {
    const c = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
        javaScriptEnabled: mode !== "no-js",
      }),
      p = await c.newPage();
    await p.goto(`${base}/en`);
    assert.equal(await p.locator(".gallery-card").count(), 7);
    assert.ok(await p.locator("h1").isVisible());
    if (mode !== "no-js")
      assert.notEqual(
        await p.locator(".work-gallery").getAttribute("data-animated"),
        "true",
      );
    await p.locator(".gallery-track").scrollIntoViewIfNeeded();
    if (mode === "touch") {
      const cdp = await c.newCDPSession(p),
        box = await p.locator(".gallery-track").boundingBox(),
        y = Math.min(600, box.y + 120);
      const swipe = async (x1, y1, x2, y2) => {
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: x1, y: y1 }],
        });
        for (let i = 1; i <= 12; i++) {
          await cdp.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [
              { x: x1 + ((x2 - x1) * i) / 12, y: y1 + ((y2 - y1) * i) / 12 },
            ],
          });
          await p.waitForTimeout(25);
        }
        await cdp.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
        await p.waitForTimeout(400);
      };
      await swipe(320, y, 70, y);
      assert.ok(
        await p.locator(".gallery-track").evaluate((e) => e.scrollLeft > 100),
      );
      assert.equal(new URL(p.url()).pathname, "/en");
      const top = await p.evaluate(() => scrollY);
      await swipe(200, y, 200, y - 130);
      assert.ok(
        (await p.evaluate(() => scrollY)) > top,
        "vertical page scroll works over gallery",
      );
    }
    await p.locator(".gallery-card").last().focus();
    await p.locator(".gallery-card").last().press("Enter");
    await p.waitForURL("**/volumes/portfolio-optimizer");
    assert.ok((await p.locator(".reading-block").count()) > 10);
    await c.close();
    console.log(`PASS ${mode}: semantic gallery and complete reading`);
  }
  fs.writeFileSync(`${dir}/qa.json`, JSON.stringify(results, null, 2));
} finally {
  if (results.length)
    fs.writeFileSync(`${dir}/qa.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
