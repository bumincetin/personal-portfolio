import assert from "node:assert/strict";
import fs from "node:fs";
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3113";
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.goto(`${base}/en`, { waitUntil: "networkidle" });
  await page.locator('.work-gallery[data-ready="true"]').waitFor();
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").getAttribute("href"), "#main");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => window.scrollY === 0);
  await page.waitForTimeout(200);
  await page.mouse.move(700, 300);
  await page.mouse.wheel(0, 240);
  await page.waitForFunction(() => window.scrollY > 0);
  const scroll = await page.evaluate(() => scrollY);
  assert.ok(scroll >= 200 && scroll <= 280, `native scroll: ${scroll}`);
  const position = () =>
    page
      .locator(".gallery-item")
      .first()
      .evaluate((e) => e.style.transform);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(150);
  const offscreen = await position();
  await page.waitForTimeout(300);
  assert.equal(await position(), offscreen);
  await page.locator(".gallery-track").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      value: true,
      configurable: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForTimeout(100);
  const hidden = await position();
  await page.waitForTimeout(300);
  assert.equal(await position(), hidden);
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  results.push({
    check: "skip link, native wheel, offscreen and hidden pause",
    scroll,
  });
  for (const path of ["", "/contact", "/volumes/document-intelligence"]) {
    await page.goto(`${base}/en${path}`, { waitUntil: "networkidle" });
    await page.evaluate(() => (document.documentElement.style.zoom = "2"));
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `200% zoom ${path}`,
    );
    await page.screenshot({
      path: `artifacts/evolution/after/zoom-${path.replaceAll("/", "-") || "home"}.png`,
    });
  }
  results.push({ check: "200% CSS zoom: homepage, contact, service article" });
  await page.close();
  for (const mode of ["reduced", "limited"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: mode === "reduced" ? "reduce" : "no-preference",
    });
    if (mode === "limited")
      await context.addInitScript(() =>
        Object.defineProperty(navigator, "deviceMemory", { get: () => 2 }),
      );
    const p = await context.newPage();
    await p.goto(`${base}/en`, { waitUntil: "networkidle" });
    await p.locator('.work-gallery[data-ready="true"]').waitFor();
    assert.equal(
      await p.locator(".work-gallery").getAttribute("data-animated"),
      "false",
    );
    assert.equal(await p.locator(".gallery-card").count(), 7);
    await context.close();
    results.push({ check: `${mode}: desktop static gallery` });
  }
  for (const [locale, label] of [
    ["en", "Initial capital"],
    ["tr", "Başlangıç sermayesi"],
    ["it", "Capitale iniziale"],
  ]) {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await p.goto(`${base}/${locale}/volumes/portfolio-optimizer`, {
      waitUntil: "networkidle",
    });
    await p.locator("[data-open-optimizer]").click();
    await p.getByLabel(label, { exact: true }).waitFor();
    await p.addScriptTag({
      content: fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8"),
    });
    const violations = await p.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag21a", "wcag22aa"],
          },
        })
      ).violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.failureSummary),
      })),
    );
    assert.deepEqual(violations, [], `${locale} optimizer`);
    assert.ok(
      await p.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    );
    await p
      .locator(".optimizer-publication")
      .screenshot({
        path: `artifacts/evolution/after/${locale}-optimizer.png`,
      });
    results.push({
      check: `${locale}: localized optimizer, axe, mobile overflow`,
    });
    await p.close();
  }
  fs.writeFileSync(
    "artifacts/evolution/after/enhancements.json",
    JSON.stringify(results, null, 2),
  );
  console.log("PASS", results);
} finally {
  await browser.close();
}
