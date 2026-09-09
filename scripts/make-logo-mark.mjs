/**
 * Cuts the monogram out of the brand lock-up and gives it a real alpha channel.
 *
 * `public/logo.webp` is the full lock-up — a "B/C" monogram over "BUMIN CETIN /
 * Data Solutions" — drawn dark on an opaque white ground. None of that survives
 * a navigation bar: at 36px the wordmark is illegible and only repeats the name
 * set beside it, and the white ground renders as a bright card stuck to a dark
 * page.
 *
 * Two earlier attempts are worth recording, because this replaces both:
 *
 *   - `filter: invert(1)` turned the mark into a white smear.
 *   - `invert` plus `mix-blend-mode: screen` looked right, but a blend mode on
 *     fixed chrome sitting over a continuously rendering WebGL canvas makes the
 *     compositor re-blend that region every frame. It was measurable: Playwright
 *     could no longer wait on anything on the home page, because its polling
 *     never got a slot behind the compositing work.
 *
 * So the transparency is baked once, here, instead of being simulated on every
 * frame in the browser. The output is the monogram in bone on nothing, which the
 * bar can render with no filter and no blend mode at all.
 *
 * The crop is measured rather than guessed: the script finds the bounding box of
 * the dark pixels in the upper part of the artwork, which is the monogram, and
 * stops before the wordmark begins.
 *
 * Run: node scripts/make-logo-mark.mjs
 */

import sharp from 'sharp';
import path from 'node:path';

const SOURCE = 'public/logo.webp';
const OUT = 'public/logo-mark.webp';

/** The ink the mark is rendered in: the site's `--c-text`. */
const INK = { r: 242, g: 234, b: 224 };

/** Anything darker than this counts as ink rather than paper. */
const INK_THRESHOLD = 160;

/** The wordmark starts below this fraction of the artwork; the crop stops there. */
const MONOGRAM_BAND = 0.55;

/** Breathing room around the mark, as a fraction of its longest side. */
const PADDING = 0.06;

const image = sharp(SOURCE).flatten({ background: '#ffffff' });
const { width, height } = await image.metadata();
const { data } = await image.clone().greyscale().raw().toBuffer({ resolveWithObject: true });

let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;
const limit = Math.floor(height * MONOGRAM_BAND);

for (let y = 0; y < limit; y += 1) {
  for (let x = 0; x < width; x += 1) {
    if (data[y * width + x] > INK_THRESHOLD) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

if (maxX < 0) {
  console.error(`No ink found in the top ${Math.round(MONOGRAM_BAND * 100)}% of ${SOURCE}.`);
  process.exit(1);
}

const pad = Math.round(Math.max(maxX - minX, maxY - minY) * PADDING);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const box = {
  left,
  top,
  width: Math.min(width - left, maxX - minX + 1 + pad * 2),
  height: Math.min(height - top, maxY - minY + 1 + pad * 2),
};

// Square it, so the mark sits centred in a square slot without distortion.
const side = Math.max(box.width, box.height);
const square = {
  left: Math.max(0, Math.round(box.left - (side - box.width) / 2)),
  top: Math.max(0, Math.round(box.top - (side - box.height) / 2)),
  width: Math.min(width, side),
  height: Math.min(height, side),
};

const cropped = sharp(SOURCE).flatten({ background: '#ffffff' }).extract(square).resize(256, 256, { fit: 'contain', background: '#ffffff' });

/*
 * The alpha channel is the artwork's own darkness.
 *
 * Greyscale then negate: paper (white) becomes 0 and therefore transparent, ink
 * (dark) becomes 255 and therefore opaque, and every antialiased edge in between
 * lands at exactly the coverage the original had. That is why this is a cut-out
 * rather than a threshold — the curves stay smooth at any size.
 */
const alpha = await cropped.clone().greyscale().negate().raw().toBuffer();

const mark = await sharp({
  create: { width: 256, height: 256, channels: 3, background: INK },
})
  .joinChannel(alpha, { raw: { width: 256, height: 256, channels: 1 } })
  .webp({ quality: 92, alphaQuality: 100 })
  .toBuffer();

await sharp(mark).toFile(OUT);

const { size } = await sharp(OUT).metadata().then(async (m) => ({ ...m, size: (await sharp(OUT).toBuffer()).length }));
console.log(
  `${OUT}: 256x256, ${size} bytes — monogram cut from ${path.basename(SOURCE)} ` +
    `at ${square.width}x${square.height} from (${square.left}, ${square.top})`,
);
