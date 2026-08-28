'use client';

/**
 * Institutions band between the hero and Chapter I. The names are set in the
 * display serif and glide past on the site's marquee keyframe; the run is
 * duplicated so the loop is seamless, and the edges are masked to nothing so
 * it reads as a ribbon passing behind the page rather than a ticker.
 */
export default function Marquee({ items }: { items: string[] }) {
  const run = [...items, ...items];

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-border py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center whitespace-nowrap will-change-transform motion-reduce:animate-none">
        {run.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="font-display text-2xl font-light italic tracking-wide text-charcoal/80 md:text-[1.75rem]">
              {item}
            </span>
            <span className="mx-8 h-1 w-1 rounded-full bg-accent md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}
