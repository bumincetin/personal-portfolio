/**
 * Reproducible hosting adapter for the repository's pre-existing ThreeUI port.
 * The original HTML generator was NOT checked in. This frozen input is the
 * port at 225f0ed, not a replacement for / claim of the canonical vendor HTML.
 * Vendor provenance and notices remain in that input and docs/library-audit.md.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import { adaptShelf } from './shelf-adapter.mjs';
import { adaptEngineColors } from './palette-adapter.mjs';
const input = fs.readFileSync(new URL('./sources/shelf-engine.baseline.txt', import.meta.url));
const expected = 'a5dc225054ebfb7516053bf43cf924f816249bfa0c2f91ba16cc46284e1f0168';
const actual = crypto.createHash('sha256').update(input).digest('hex');
if (actual !== expected) throw new Error(`Shelf port baseline changed: ${actual}`);
const output = adaptEngineColors(adaptShelf(input.toString('utf8')));
const file = new URL('../src/app/components/shelf/engine.js', import.meta.url);
if (process.argv.includes('--check')) {
  if (fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n') !== output) throw new Error('Run node scripts/port-shelf-engine.mjs');
  console.log('Shelf adapter output and frozen port hash verified.');
} else { fs.writeFileSync(file, output); console.log('Generated shelf engine from verified port + maintained adapter.'); }
