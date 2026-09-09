'use client';

import dynamic from 'next/dynamic';

/**
 * The optimizer, loaded only when its leaf is built.
 *
 * It is the solver plus its charts — roughly 15 kB on top of the reader — and
 * exactly one leaf of one volume needs it, so it must not be in the bundle any
 * other page pays for.
 *
 * It sits in its own file because `dynamic(..., { ssr: false })` needs a client
 * boundary, and the reader around it is a server component: the volumes' prose
 * is rendered on the server and never shipped as JavaScript. One small client
 * island is the price of keeping the other several thousand words on the server.
 */
const PortfolioOptimizer = dynamic(() => import('@/app/components/optimizer/PortfolioOptimizer'), {
  ssr: false,
  loading: () => <p className="reader-prose">…</p>,
});

export default function OptimizerLeaf() {
  return <PortfolioOptimizer />;
}
