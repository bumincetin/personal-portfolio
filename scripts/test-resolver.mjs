/**
 * Module-resolution hook for `node --test`.
 *
 * Node 24 strips TypeScript types on its own, so the test suite needs no
 * compiler and no test framework. What Node will not do is guess an extension:
 * application source under src/ is written for a bundler and imports
 * `./blackLitterman`, which the ESM resolver rejects outright.
 *
 * This hook adds exactly two behaviours for relative specifiers that failed to
 * resolve — try `.ts`, then `/index.ts` — plus the `@/` path alias from
 * tsconfig. It is registered only by the `test` script, so nothing about the
 * production build depends on it.
 */

import { fileURLToPath, pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(import.meta.dirname, '..', 'src');

const CANDIDATE_SUFFIXES = ['.ts', '.tsx', '/index.ts', '/index.tsx', '.js', '.mjs'];

/** Returns a file: URL for the first candidate that exists on disk. */
function firstExisting(basePath) {
  if (existsSync(basePath) && path.extname(basePath)) return pathToFileURL(basePath).href;
  for (const suffix of CANDIDATE_SUFFIXES) {
    const candidate = `${basePath}${suffix}`;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  // tsconfig path alias: "@/*" -> "./src/*"
  if (specifier.startsWith('@/')) {
    const resolved = firstExisting(path.join(SRC, specifier.slice(2)));
    if (resolved) return { url: resolved, shortCircuit: true };
  }

  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    try {
      return await nextResolve(specifier, context);
    } catch (error) {
      const parentPath = context.parentURL ? path.dirname(fileURLToPath(context.parentURL)) : process.cwd();
      const resolved = firstExisting(path.resolve(parentPath, specifier));
      if (resolved) return { url: resolved, shortCircuit: true };
      throw error;
    }
  }

  return nextResolve(specifier, context);
}
