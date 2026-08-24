import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * The site is almost entirely statically generated (every locale route is
 * prerendered via generateStaticParams) and has no ISR or on-demand
 * revalidation, so no incremental cache override is configured. If revalidation
 * is ever added, wire up r2IncrementalCache here and add the
 * NEXT_INC_CACHE_R2_BUCKET binding in wrangler.jsonc.
 */
export default {
  ...defineCloudflareConfig(),

  /*
   * Cloudflare Workers Builds runs `npm run build` and then `npx wrangler
   * deploy`. For the deploy half to work, the build half has to emit
   * .open-next/, so package.json's `build` script points at
   * `opennextjs-cloudflare build`.
   *
   * By default that command shells out to `npm run build` to produce the Next
   * output (see @opennextjs/aws buildNextjsApp), which against that script
   * would recurse forever. Naming the Next build explicitly here breaks the
   * cycle: OpenNext invokes Next directly and never re-enters the npm script.
   */
  buildCommand: 'npx next build',
};
