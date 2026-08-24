import Image from 'next/image';

/**
 * Studio photography on an espresso-black page.
 *
 * The source shots were lit against a near-white backdrop, which on this
 * palette reads as a hole punched through the layout. Rather than knocking the
 * background out -- the subject wears white in two of the three, so a
 * luminance cut eats the shirt -- each plate is toned down, vignetted into the
 * ground and given a faint brass wash so it sits in the page instead of on
 * top of it.
 */
export default function PlateImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-editorial ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1100}
        height={1100}
        sizes="(max-width: 1024px) 90vw, 520px"
        className="h-auto w-full [filter:brightness(0.76)_contrast(1.08)_saturate(0.82)]"
      />
      {/* Vignette: fades the bright backdrop into the page at the edges. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_95%_at_50%_12%,transparent_28%,rgba(16,12,10,0.92)_100%)]" />
      {/* Brass wash, so the remaining highlights read warm rather than raw. */}
      <div className="pointer-events-none absolute inset-0 bg-accent/[0.08] mix-blend-overlay" />
    </div>
  );
}
