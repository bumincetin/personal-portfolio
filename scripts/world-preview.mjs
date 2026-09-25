import { chromium } from "playwright";
import fs from "node:fs";
fs.mkdirSync("artifacts/redesign/world", { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const [width, height] of [
  [1440, 900],
  [393, 852],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: width < 500,
    hasTouch: width < 500,
  });
  page.on("pageerror", (e) => console.log("ERROR", e.message));
  await page.goto("http://localhost:3000/en", {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForFunction(
    () => document.querySelector(".world-chapter")?.dataset.phase === "HOME",
    { timeout: 30000 },
  );
  await page.screenshot({ path: `artifacts/redesign/world/${width}-home.png` });
  console.log(
    width,
    await page
      .locator(".world-canvas")
      .evaluate((e) => ({ ...e.dataset, width: e.width, height: e.height })),
  );
  await page.locator(".world-index a").nth(0).click();
  await page.waitForFunction(
    () =>
      document.querySelector(".world-chapter")?.dataset.phase === "SELECTED",
    { timeout: 30000 },
  );
  await page.screenshot({
    path: `artifacts/redesign/world/${width}-selected.png`,
  });
  await page.close();
}
await browser.close();
