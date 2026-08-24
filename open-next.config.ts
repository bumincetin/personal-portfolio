import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * The site is almost entirely statically generated (every locale route is
 * prerendered via generateStaticParams) and has no ISR or on-demand
 * revalidation, so no incremental cache override is configured. If revalidation
 * is ever added, wire up r2IncrementalCache here and add the
 * NEXT_INC_CACHE_R2_BUCKET binding in wrangler.jsonc.
 */
export default defineCloudflareConfig();
