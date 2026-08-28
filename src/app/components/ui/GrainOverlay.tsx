/**
 * Film grain + vignette, the surface finish every ThreeUI authored page
 * carries (feTurbulence at ~6% under an overlay blend, and a radial vignette
 * that seats the content in the middle of the screen). Both are static,
 * pointer-transparent layers; the grain is a tiny inline SVG tiled at 180px
 * so it costs one composited layer and no requests.
 */

const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  );

export default function GrainOverlay() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-[-1px] z-[45] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: '180px 180px', opacity: 'var(--grain-opacity)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[44]"
        style={{ background: 'radial-gradient(125% 95% at 50% 42%, transparent 46%, rgb(var(--c-ground) / var(--vignette-alpha)) 100%)' }}
        aria-hidden="true"
      />
    </>
  );
}
