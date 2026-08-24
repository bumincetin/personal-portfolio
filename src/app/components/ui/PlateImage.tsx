import Image from 'next/image';

/**
 * Studio photography, seated into whichever ground is under it.
 *
 * The source shots were lit against a near-white backdrop. On the dark theme
 * that reads as a hole punched through the layout, so the plate is knocked
 * back and vignetted into the ground; on paper the same backdrop belongs
 * there and barely needs touching. Both treatments come from --plate-filter
 * and the ground token, so the component itself is theme-blind. Knocking the
 * background out was not an option: the subject wears white in two of the
 * three shots, so a luminance cut eats the shirt.
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
        className="h-auto w-full [filter:var(--plate-filter)]"
      />
      {/* Vignette: fades the bright backdrop into the page at the edges. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_95%_at_50%_12%,transparent_28%,rgb(var(--c-ground) / 0.92)_100%)]" />
      {/* Brass wash, so the remaining highlights read warm rather than raw. */}
      <div className="pointer-events-none absolute inset-0 bg-accent/[0.08] mix-blend-overlay" />
    </div>
  );
}
