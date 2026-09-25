/** Explicitly enter optional experiences when testing their retained behavior. */
export async function enterShelf(page) {
  if (!(await page.locator('#experience').count())) await page.locator('[data-enter-shelf]').click();
  await page.locator('.experience.webgl-ready').waitFor({state:'attached',timeout:120000});
  await page.locator('#loading').waitFor({state:'hidden'});
}
export async function enterBook(page) {
  if (await page.locator('.sketchbook-root').getAttribute('data-view') !== 'book') await page.locator('[data-view-book]').click();
  await page.locator('.sketchbook-root[data-ready="1"]').waitFor({state:'attached'});
}
export async function openOptimizer(page) {
  await page.locator('[data-open-optimizer]').click();
  await page.locator('section[aria-label="Geopolitical portfolio optimizer"]').waitFor({state:'attached'});
}
