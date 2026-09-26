import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3113";
const dir = "artifacts/world-restoration";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const axe = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const results = [],
  errors = [];
const settled = async (page) => {
  await page.waitForFunction(
    () => document.querySelector(".world-room").dataset.state !== "loading",
  );
  if (
    (await page.locator(".world-room").getAttribute("data-state")) === "still"
  ) {
    await page.locator(".world-mode").click();
  }
  await page
    .locator('.world-room[data-state="ready"] canvas[data-settled="true"]')
    .waitFor();
  await page.waitForFunction(() => {
    const selected = [
      ...document.querySelectorAll(".world-index button"),
    ].findIndex((button) => button.getAttribute("aria-pressed") === "true");
    const canvas = document.querySelector("canvas");
    return (
      canvas.dataset.camera === (selected < 0 ? "home" : String(selected)) &&
      canvas.dataset.settled === "true"
    );
  });
};
async function audit(page, label, javascript = true) {
  await page.evaluate(() => document.fonts.ready);
  if (javascript) await page.addScriptTag({ content: axe });
  const result = await page.evaluate(
    async (javascript) => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      h1: document.querySelectorAll("h1").length,
      violations: javascript
        ? (
            await window.axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
              },
            })
          ).violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          }))
        : null,
    }),
    javascript,
  );
  assert.deepEqual(
    result,
    { overflow: false, h1: 1, violations: javascript ? [] : null },
    label,
  );
  results.push({ check: label, ...result });
  console.log(`PASS ${label}`);
}
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${base}/en`, { waitUntil: "networkidle" });
  await settled(page);
  await audit(page, "desktop interactive room");
  await page.screenshot({ path: `${dir}/desktop.png` });
  const frames = () => page.locator("canvas").getAttribute("data-frames");
  const idle = await frames();
  await page.waitForTimeout(400);
  assert.equal(await frames(), idle, "settled scene stops rendering");
  const roomBounds = await page.locator("canvas").boundingBox();
  await page.mouse.click(
    roomBounds.x + roomBounds.width * 0.45,
    roomBounds.y + roomBounds.height * 0.45,
  );
  await page.locator('.world-index [aria-pressed="true"]').waitFor();
  await settled(page);
  await page.locator(".world-overview").click();
  await settled(page);
  const slugs = [
    "document-intelligence",
    "forecasting",
    "reporting",
    "cross-border",
    "greenwashing-risk-scoring",
    "parliamentary-seat-forecast",
    "portfolio-optimizer",
  ];
  for (let i = 0; i < 7; i++) {
    const button = page.locator(".world-index button").nth(i);
    await button.focus();
    await button.press(i % 2 ? "Space" : "Enter");
    await page.waitForFunction(
      (index) =>
        document.querySelector("canvas").dataset.camera === String(index) &&
        document.querySelector("canvas").dataset.settled === "true",
      i,
    );
    assert.equal(await button.getAttribute("aria-pressed"), "true");
    assert.equal(
      await page.locator(".world-detail a").getAttribute("href"),
      `/en/volumes/${slugs[i]}`,
    );
    if (i === 4) await page.screenshot({ path: `${dir}/selected.png` });
  }
  await page.keyboard.press("Escape");
  await page.waitForFunction(
    () => document.querySelector("canvas").dataset.camera === "home",
  );
  await settled(page);
  await page.mouse.move(900, 420);
  await page.mouse.wheel(0, 240);
  await page.waitForTimeout(250);
  const scroll = await page.evaluate(() => scrollY);
  assert.ok(Math.abs(scroll - 240) <= 2, `native wheel over canvas: ${scroll}`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(100);
  const offscreen = await frames();
  await page
    .locator(".world-index button")
    .first()
    .evaluate((e) => e.click());
  await page.waitForTimeout(350);
  assert.equal(await frames(), offscreen, "offscreen scene stops");
  await page.locator(".world-mode").click();
  await page.locator('.world-room[data-state="still"]').waitFor();
  assert.ok(
    await page
      .locator(".world-preview")
      .evaluate((e) => e.complete && e.naturalWidth > 0),
  );
  await page.locator(".world-mode").click();
  await settled(page);
  await page.locator(".world-index button").nth(2).click();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const hidden = await frames();
  await page.waitForTimeout(300);
  assert.equal(await frames(), hidden, "hidden scene stops mid-transition");
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await settled(page);
  await page
    .locator("canvas")
    .evaluate((e) =>
      e.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext(),
    );
  await page.locator('.world-room[data-state="still"]').waitFor();
  await page.locator(".world-mode").click();
  await settled(page);
  results.push({
    check:
      "seven keyboard selections, canonical links, Escape, idle/offscreen, still/3D toggle, context-loss recovery",
    scroll,
  });

  for (const locale of ["en", "tr", "it"]) {
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
      if (width < 700) {
        await page.locator('.world-room[data-state="still"]').waitFor();
        assert.equal(
          await page.locator("canvas").getAttribute("data-frames"),
          null,
          "phone starts with lightweight room image",
        );
        if (width === 390)
          await page.screenshot({
            path: `${dir}/${locale}-mobile-initial.png`,
          });
      }
      await settled(page);
      await audit(page, `${locale} ${width}px`);
      if (width === 390)
        await page.screenshot({ path: `${dir}/${locale}-mobile.png` });
    }
  }
  const reduced = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await reduced.goto(`${base}/en`, { waitUntil: "networkidle" });
  await settled(reduced);
  await reduced.locator(".world-index button").nth(4).click();
  await reduced.waitForFunction(
    () => document.querySelector("canvas").dataset.camera === "4",
  );
  assert.equal(
    await reduced.locator("canvas").getAttribute("data-settled"),
    "true",
    "reduced motion snaps directly",
  );
  await reduced.emulateMedia({ reducedMotion: "no-preference" });
  await reduced.locator(".world-overview").click();
  await settled(reduced);
  await reduced.close();

  const touch = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await touch.goto(`${base}/en`, { waitUntil: "networkidle" });
  await touch.locator('.world-room[data-state="still"]').waitFor();
  await touch.locator(".world-index button").nth(4).tap();
  await settled(touch);
  assert.equal(
    await touch.locator("canvas").getAttribute("data-camera"),
    "4",
    "phone selection activates 3D",
  );
  await touch.locator(".world-overview").tap();
  await settled(touch);
  await touch.locator("canvas").scrollIntoViewIfNeeded();
  await settled(touch);
  const box = await touch.locator("canvas").boundingBox();
  const startY = await touch.evaluate(() => scrollY);
  const cdp = await touch.context().newCDPSession(touch);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 200, y: box.y + 250 }],
  });
  for (let step = 1; step <= 6; step++) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: 200, y: box.y + 250 - step * 25 }],
    });
    await touch.waitForTimeout(40);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  assert.ok(
    (await touch.evaluate(() => scrollY)) > startY + 50,
    "touch scroll crosses scene",
  );
  assert.equal(
    await touch.locator(".world-overview").getAttribute("aria-pressed"),
    "true",
    "swiping does not inspect an exhibit",
  );
  await touch.close();

  for (const mode of ["no-js", "no-webgl", "save-data"]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      javaScriptEnabled: mode !== "no-js",
    });
    if (mode === "no-webgl")
      await context.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (kind, options) {
          return kind.startsWith("webgl")
            ? null
            : original.call(this, kind, options);
        };
      });
    if (mode === "save-data")
      await context.addInitScript(() =>
        Object.defineProperty(navigator, "connection", {
          value: { saveData: true },
          configurable: true,
        }),
      );
    const fallback = await context.newPage();
    await fallback.goto(`${base}/en`, { waitUntil: "networkidle" });
    if (mode !== "no-js")
      await fallback.locator('.world-room[data-state="still"]').waitFor();
    assert.ok(
      await fallback
        .locator(".world-preview")
        .evaluate((e) => e.complete && e.naturalWidth > 0),
    );
    assert.equal(await fallback.locator(".gallery-card").count(), 7);
    await audit(fallback, mode, mode !== "no-js");
    await fallback.screenshot({ path: `${dir}/${mode}.png` });
    if (mode === "save-data") {
      await fallback.locator(".world-mode").click();
      await settled(fallback);
    }
    await fallback.locator(".gallery-card").first().click();
    await fallback.waitForURL("**/volumes/document-intelligence");
    await context.close();
  }
  results.push({
    check:
      "reduced motion, live preference changes, touch scrolling, no-JS/WebGL fallback, data-saving opt-in",
  });
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    `${dir}/checks.json`,
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(`PASS ${results.length} world checks; no page errors`);
} finally {
  await browser.close();
}
