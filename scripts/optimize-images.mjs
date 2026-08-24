/**
 * Re-encodes the oversized source images into the assets actually served.
 *
 * The portraits were committed as 2048x2048 PNGs (~6MB each) but never render
 * wider than ~500px, so they were the single biggest cause of slow page loads.
 * Sources now sit in assets/source-images/ and stay out of the deployment.
 * We downscale to a retina-safe width and emit WebP, which next/image then
 * serves (further resized) per device.
 *
 * Run with: npm run optimize:images
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Full-resolution originals live outside /public so the ~18MB of source art is
// not shipped with the deployment; only the encoded output below is served.
const SOURCE_DIR = join(process.cwd(), 'assets', 'source-images');
const PUBLIC_DIR = join(process.cwd(), 'public');

const TARGETS = [
  // Only bumin1 sits on a flat white studio backdrop, so only it is knocked
  // out. bumin2/bumin3 are shot against a textured grey wall that is part of
  // the composition -- cutting those would chew holes in the subject.
  { from: 'bumin1.png', to: 'bumin1.webp', width: 1100, cutout: { opaqueBelow: 120, clearAbove: 238 } },
  { from: 'bumin2.png', to: 'bumin2.webp', width: 1100 },
  { from: 'bumin3.png', to: 'bumin3.webp', width: 1100 },
  { from: 'Bumin_resmi.jpeg', to: 'portrait.webp', width: 1000 },
  { from: 'profile.jpg', to: 'profile.webp', width: 1000 },
  { from: 'BuminLogo.png', to: 'logo.webp', width: 256, inPublic: true },
];

const mb = (bytes) => `${(bytes / 1048576).toFixed(2)}MB`;

/**
 * The three illustrations were rendered on a flat white studio backdrop, which
 * glares against the site's near-black ground. This knocks that backdrop out to
 * transparency so the subject sits directly on the constellation field.
 *
 * Alpha ramps between the two thresholds rather than switching at one, so the
 * cut edge stays anti-aliased instead of going jagged.
 */
async function knockOutBackdrop(input, { opaqueBelow, clearAbove }) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Rec. 601 luma, and a saturation guard so genuinely coloured highlights
    // (skin, warm tones) are never mistaken for backdrop.
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    if (saturation > 12 || luma <= opaqueBelow) continue;

    const t = Math.min(1, (luma - opaqueBelow) / (clearAbove - opaqueBelow));
    data[i + 3] = Math.round(data[i + 3] * (1 - t));
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

for (const { from, to, width, cutout, inPublic } of TARGETS) {
  const source = join(inPublic ? PUBLIC_DIR : SOURCE_DIR, from);
  const before = (await stat(source)).size;

  const pixels = cutout ? await knockOutBackdrop(source, cutout) : await readFile(source);

  const output = await sharp(pixels)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  await writeFile(join(PUBLIC_DIR, to), output);
  const saved = (100 * (1 - output.length / before)).toFixed(1);
  console.log(`${from} ${mb(before)} -> ${to} ${mb(output.length)}  (-${saved}%)`);
}
