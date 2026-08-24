/**
 * Resolves the Gemini API key.
 *
 * This previously imported `node:fs` at module scope and read the key out of a
 * Google OAuth client-secret JSON file next to `process.cwd()`. Cloudflare
 * Workers have no filesystem, so that path could only ever throw there -- and
 * keeping a client-secret file in the repo to hold an API key is not something
 * worth carrying over. The environment is now the single source.
 *
 * Set it with `wrangler secret put GEMINI_API_KEY`, or under
 * Workers & Pages > bumincetin > Settings > Variables and Secrets. Locally,
 * Next reads it from `.env.local`.
 *
 * Get a key from https://aistudio.google.com/apikey
 */
export function getGeminiApiKey(): string {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    console.warn(
      'GEMINI_API_KEY is not set. The /api/analyze route will return an error until it is configured.',
    );
    return '';
  }

  return key;
}
