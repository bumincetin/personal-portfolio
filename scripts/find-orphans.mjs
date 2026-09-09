/**
 * Reports source modules unreachable from any route.
 *
 * A redesign that replaces whole pages leaves behind components nothing imports
 * any more. They are invisible in the build (tree-shaken) but not harmless:
 * they still lint, still typecheck, still turn up in searches, and still look
 * like live code to whoever reads this repository next.
 *
 * Entry points are the App Router's own file conventions; everything else has
 * to be reachable from one of them by a static import or a dynamic import with
 * a literal specifier.
 *
 * Usage: node scripts/find-orphans.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const SRC = 'src';
const files = [];

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.endsWith('.test.ts')) {
      files.push(p.split(path.sep).join('/'));
    }
  }
})(SRC);

const contents = new Map(files.map((f) => [f, fs.readFileSync(f, 'utf8')]));

/** App Router file conventions are entry points by definition. */
const isEntry = (f) => /\/(page|layout|route|sitemap|robots|not-found|error|loading|global-error)\.tsx?$/.test(f);

const resolveSpecifier = (spec, fromFile) => {
  if (spec.startsWith('@/')) return path.join(SRC, spec.slice(2)).split(path.sep).join('/');
  if (spec.startsWith('.')) return path.join(path.dirname(fromFile), spec).split(path.sep).join('/');
  return null;
};

const used = new Set();
const PATTERNS = [/from\s+['"]([^'"]+)['"]/g, /import\(\s*['"]([^'"]+)['"]\s*\)/g];

for (const [file, source] of contents) {
  for (const pattern of PATTERNS) {
    for (const match of source.matchAll(pattern)) {
      const base = resolveSpecifier(match[1], file);
      if (!base) continue;
      for (const suffix of ['.tsx', '.ts', '/index.tsx', '/index.ts', '']) {
        if (contents.has(base + suffix)) {
          used.add(base + suffix);
          break;
        }
      }
    }
  }
}

const orphans = files.filter((f) => !isEntry(f) && !used.has(f)).sort();

if (orphans.length === 0) {
  console.log(`No orphans: all ${files.length} modules are reachable from a route.`);
  process.exit(0);
}

console.log('Modules unreachable from any route:\n');
let totalLines = 0;
for (const orphan of orphans) {
  const lines = contents.get(orphan).split('\n').length;
  totalLines += lines;
  console.log(`  ${orphan.padEnd(58)} ${String(lines).padStart(5)} lines`);
}
console.log(`\n${orphans.length} of ${files.length} modules, ${totalLines} lines.`);
