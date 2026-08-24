'use client';

import dynamic from 'next/dynamic';

/**
 * Client boundary for the canvas field.
 *
 * The field is browser-only and purely decorative, so it is loaded without SSR
 * and stays off the critical path -- the page is fully readable before it
 * arrives. Next 15 rejects `ssr: false` inside a Server Component, so the
 * dynamic import has to live in a client module like this one rather than
 * directly in the locale layout.
 */
const ConstellationField = dynamic(() => import('./ConstellationField'), {
  ssr: false,
});

export default function FieldBackdrop() {
  return <ConstellationField />;
}
