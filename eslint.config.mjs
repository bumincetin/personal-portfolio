import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * ESLint flat config.
 *
 * Two fixes to a lint step that had been failing before this work started.
 *
 * `next lint` is deprecated in Next 15 and constructs ESLint with eslintrc-era
 * options (`useEslintrc`, `extensions`) that the flat-config engine rejects, so
 * the script now calls `eslint` directly.
 *
 * And flat config drops the implicit `.eslintignore`, so build output has to be
 * ignored explicitly — without this, ESLint walks `.next`, `.next-dev` and
 * `.open-next` and reports tens of thousands of problems in generated code.
 */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.next-dev/**',
      '.open-next/**',
      '.wrangler/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    // Verification scripts are Node programs, not part of the app bundle.
    files: ['scripts/**/*.mjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    /*
     * The shelf engine is generated from the registered ThreeUI source and is
     * kept faithful to it; its few unused locals are the author's, and
     * "fixing" them would mean diverging from a file whose whole value is that
     * it matches a published SHA-256.
     */
    files: ['src/app/components/shelf/engine.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
