import { chromium } from "playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url),
  axe = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.argv[2] || "http://localhost:3000",
  dir = "artifacts/redesign/world";
fs.mkdirSync(dir, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" }),
  results = [];
const settle = (page) =>
  page.waitForFunction(
    () =>
      ["HOME", "HOVERING", "SELECTED", "EDITORIAL"].includes(
        document.querySelector(".world-chapter")?.dataset.phase,
      ),
    { timeout: 30000 },
  );
const audit = async (page) => {
  await page.addScriptTag({ content: axe });
  return page.evaluate(async () => {
    const r = await window.axe.run(document.querySelector(".world-stage"), {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    });
    return r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    }));
  });
};
for (const [width, height] of [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [393, 852],
  [375, 812],
]) {
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 500,
    hasTouch: width < 500,
  });
  const page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + "/en", { waitUntil: "networkidle", timeout: 120000 });
  await settle(page);
  assert.equal(
    await page.locator(".world-canvas").getAttribute("data-engine"),
    "three.js r165",
  );
  const before = await page
    .locator(".world-canvas")
    .getAttribute("data-position");
  await page.screenshot({ path: `${dir}/${width}-home.png` });
  console.log(
    "HOME",
    width,
    await page
      .locator(".world-canvas")
      .evaluate((e) => ({ w: e.width, h: e.height, ...e.dataset })),
  );
  const homeAudit = await audit(page);
  console.log("AUDIT HOME", width);
  const count = [1440, 393].includes(width) ? 7 : 1;
  for (let i = 0; i < count; i++) {
    await page.locator(".world-index a").nth(i).click();
    await page.waitForFunction(
      () =>
        document.querySelector(".world-chapter").dataset.phase === "SELECTED",
      { timeout: 30000 },
    );
    assert.equal(
      await page.locator(".world-canvas").getAttribute("data-camera"),
      `VOLUME_0${i + 1}`,
    );
    assert.notEqual(
      await page.locator(".world-canvas").getAttribute("data-position"),
      before,
    );
    assert(
      await page
        .locator("#world-selection-title")
        .evaluate((e) => document.activeElement === e),
    );
    assert(await page.locator(".world-read").getAttribute("href"));
    if ([1440, 393].includes(width))
      await page.screenshot({ path: `${dir}/${width}-selected-${i + 1}.png` });
  }
  console.log("SELECTED", width);
  const selectedAudit = await audit(page);
  console.log("AUDIT SELECTED", width);
  await page.keyboard.press("Escape");
  await settle(page);
  assert(
    await page
      .locator(".world-index a")
      .nth(count - 1)
      .evaluate((e) => document.activeElement === e),
  );
  await page.locator(".world-index a").nth(1).focus();
  await page.keyboard.press("Space");
  await page.waitForFunction(
    () => document.querySelector(".world-chapter").dataset.phase === "SELECTED",
  );
  assert.equal(
    await page.locator(".world-chapter").getAttribute("data-selected"),
    "1",
  );
  await page.locator(".world-return").click();
  await settle(page);
  await page.evaluate(() => scrollTo(0, innerHeight * 0.6));
  await page.waitForTimeout(1500);
  assert(
    Math.abs((await page.locator(".world-stage").boundingBox()).y) < 2,
    "The world must remain pinned during its scroll transition",
  );
  assert.equal(
    await page.locator(".world-canvas").getAttribute("data-camera"),
    "EDITORIAL",
  );
  assert.notEqual(
    await page.locator(".world-canvas").getAttribute("data-position"),
    before,
  );
  if ([1440, 393].includes(width))
    await page.screenshot({ path: `${dir}/${width}-scroll.png` });
  await page.locator("#catalogue").scrollIntoViewIfNeeded();
  if ([1440, 393].includes(width))
    await page.screenshot({ path: `${dir}/${width}-editorial.png` });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  results.push({
    width,
    height,
    webgl: true,
    inspections: count,
    camera: true,
    focus: true,
    space: true,
    scroll: true,
    overflow,
    homeAudit,
    selectedAudit,
    errors,
  });
  console.log(JSON.stringify(results.at(-1)));
  await context.close();
}
// Real canvas hits, excluding HTML hotspots: exercise the mesh raycaster itself.
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.emulateMedia({ reducedMotion: "reduce" });
await p.goto(base + "/en", { waitUntil: "networkidle" });
await settle(p);
const rayHits = [];
for (let index = 0; index < 7; index++) {
  const marker = await p.locator(".world-marker").nth(index).boundingBox();
  if (!marker) continue;
  let hit = null;
  for (const dy of [55, 85, 110, 30]) {
    for (const dx of [0, -30, 30, -60, 60]) {
      const x = marker.x + 22 + dx,
        y = marker.y + 22 + dy;
      if (
        await p.evaluate(
          ({ x, y }) =>
            document.elementFromPoint(x, y)?.classList.contains("world-canvas"),
          { x, y },
        )
      ) {
        await p.mouse.move(x, y);
        await p.waitForTimeout(35);
        if (
          (await p.locator(".world-chapter").getAttribute("data-hovered")) ===
          String(index)
        ) {
          hit = { index, x, y };
          break;
        }
      }
    }
    if (hit) break;
  }
  if (hit) {
    await p.screenshot({ path: `${dir}/hover-${index + 1}.png` });
    await p.mouse.click(hit.x, hit.y);
    await p.waitForFunction(
      (i) =>
        document.querySelector(".world-chapter").dataset.selected === String(i),
      index,
    );
    await p.waitForFunction(
      () =>
        document.querySelector(".world-chapter").dataset.phase === "SELECTED",
    );
    rayHits.push(hit);
    await p.locator(".world-return").click();
    await settle(p);
    await p.mouse.move(1400, 100);
    await p.waitForTimeout(200);
  }
}
assert(rayHits.length >= 3, `Only ${rayHits.length} direct mesh hits`);
results.push({ rayHits });
console.log("Raycast", rayHits);
await p
  .locator(".world-canvas")
  .evaluate((canvas) =>
    canvas
      .getContext("webgl2")
      .getExtension("WEBGL_lose_context")
      .loseContext(),
  );
await p.waitForFunction(
  () => document.querySelector(".world-chapter").dataset.phase === "FALLBACK",
);
assert.equal(await p.locator(".world-index a[role=button]").count(), 0);
await p.screenshot({ path: `${dir}/context-loss.png` });
await p.close();
for (const mode of ["reduced", "no-js", "no-webgl"]) {
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    javaScriptEnabled: mode !== "no-js",
    reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
  });
  if (mode === "no-webgl")
    await context.addInitScript(() => {
      const get = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        return type === "webgl" || type === "webgl2"
          ? null
          : get.call(this, type, ...args);
      };
    });
  const page = await context.newPage();
  await page.goto(base + "/en", { waitUntil: "networkidle" });
  if (mode === "reduced") {
    await settle(page);
    assert.equal(
      await page.locator(".world-canvas").getAttribute("data-engine"),
      "three.js r165",
    );
    await page.locator(".world-index a").nth(6).click();
    await page.waitForFunction(
      () =>
        document.querySelector(".world-chapter").dataset.phase === "SELECTED",
    );
  }
  if (mode === "no-webgl")
    assert.equal(
      await page.locator(".world-chapter").getAttribute("data-phase"),
      "FALLBACK",
    );
  assert(await page.locator("h1").isVisible());
  assert.equal(await page.locator(".atlas-service").count(), 4);
  assert.equal(await page.locator(".world-index a").count(), 7);
  await page.screenshot({ path: `${dir}/${mode}.png` });
  await page.setViewportSize({ width: 852, height: 393 });
  assert(
    !(await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    )),
  );
  results.push({ mode, passed: true });
  await context.close();
}
// Capture the genuine SSR loading plan before permitting hydration chunks.
const loading = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});
let release;
const gate = new Promise((resolve) => {
  release = resolve;
});
await loading.route("**/*.js", async (route) => {
  await gate;
  await route.continue();
});
await loading.goto(base + "/en", { waitUntil: "commit" });
await loading.locator("h1").waitFor();
await loading.screenshot({ path: `${dir}/loading.png` });
release();
await loading.waitForLoadState("networkidle");
await settle(loading);
await loading.close();
fs.writeFileSync(`${dir}/verification.json`, JSON.stringify(results, null, 2));
await browser.close();
if (
  results.some(
    (r) =>
      r.overflow ||
      r.errors?.length ||
      r.homeAudit?.length ||
      r.selectedAudit?.length,
  )
)
  process.exitCode = 1;
