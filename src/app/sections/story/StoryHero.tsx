'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Locale, TranslationType } from '@/lib/translations';
import type { Story } from '@/lib/story';
import { BookingModal } from '@/app/components/BookingModal';
import Reveal from '@/app/components/ui/Reveal';
import RevealText from '@/app/components/ui/RevealText';
import { ShellButton, ShellLink } from '@/app/components/ui/ShellButton';
import Wireframe3D from '@/app/components/three/Wireframe3D';
import HorizonField from '@/app/components/three/HorizonField';
import Marquee from './Marquee';
import useHeroExit from './useHeroExit';

/**
 * Overture. The headline states the thesis of the whole page -- code and
 * capital, one person -- and the portrait is graded into the palette so it
 * reads as part of the material rather than a photo dropped onto it. The
 * only instruction given is where Chapter I begins.
 */
export default function StoryHero({
  story,
  t,
  locale,
}: {
  story: Story;
  t: TranslationType;
  locale: Locale;
}) {
  const [booking, setBooking] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = story;

  // Elements dissolve in sequence as the reader scrolls into Chapter I.
  useHeroExit(sectionRef);

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      {/* Perspective floor receding under the hero -- the ThreeUI wave-grid
          scene, drawn on the house engine. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]" aria-hidden="true">
        <HorizonField />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid min-h-[92vh] w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-32 md:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-16 lg:pt-36">
        {/* Copy */}
        <div className="order-1">
          <div data-hero-exit data-exit-at="0.05" data-exit-span="0.3">
          <Reveal className="mb-8">
            <span className="flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-accent to-transparent" aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-muted">{hero.eyebrow}</span>
            </span>
          </Reveal>
          </div>

          <div data-hero-exit data-exit-at="0.18" data-exit-span="0.42" data-exit-blur="8">
          <h1 className="text-charcoal">
            <RevealText text={hero.titleLine1} className="block text-display font-extralight" />
            <RevealText
              text={hero.titleLine2}
              delay={220}
              className="mt-1 block font-display text-display-serif italic"
              wordClassName="text-gradient-gold pr-[0.06em]"
            />
          </h1>
          </div>

          <div data-hero-exit data-exit-at="0.1" data-exit-span="0.34">
          <Reveal delay={520} className="mt-9 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            {hero.lede}
          </Reveal>
          </div>

          <div data-hero-exit data-exit-at="0.0" data-exit-span="0.3">
          <Reveal delay={640} className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ShellLink href="#chapter-1" variant="primary" data-gravity>
              {hero.ctaStory}
              <ArrowDown size={14} strokeWidth={1.5} />
            </ShellLink>
            <ShellButton variant="secondary" data-gravity onClick={() => setBooking(true)}>
              {hero.ctaBook}
              <ArrowRight size={14} strokeWidth={1.5} className="text-accent" />
            </ShellButton>
          </Reveal>
          </div>
        </div>

        {/* Portrait */}
        <Reveal delay={300} threshold={0} className="order-2">
          <div data-hero-exit data-exit-at="0.3" data-exit-span="0.5" data-exit-shift="false" className="relative mx-auto w-full max-w-[400px] lg:ml-auto lg:mr-0">
            <div
              className="pointer-events-none absolute -inset-16 -z-10 opacity-80 blur-3xl"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgb(var(--c-brass) / 0.18), transparent 62%)' }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-[-22%] -z-10 opacity-50" aria-hidden="true">
              <Wireframe3D shape="orbits" speed={0.55} lineAlpha={0.4} />
            </div>

            {/* Offset hairline frame: the photograph sits a beat off its mount. */}
            <div className="absolute -inset-3 translate-x-3 translate-y-3 border border-accent/40" aria-hidden="true" />

            <div className="portrait-grade relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src="/portrait.webp"
                alt="Bumin Kağan Çetin"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 400px"
                className="scale-[1.9] object-cover [transform-origin:44%_60%]"
              />
              <div className="portrait-tint absolute inset-0" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-cream/70 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-light">
              <span>{hero.portraitCaption}</span>
              <span className="text-accent">§</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Institutions band + scroll cue */}
      <div className="relative">
        <Marquee items={story.marquee} />
        <Reveal delay={200} className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-6 md:px-12 lg:px-16">
          <span className="relative h-10 w-px overflow-hidden bg-border" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-accent" />
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">{hero.scrollCue}</span>
        </Reveal>
      </div>

      <BookingModal isOpen={booking} onClose={() => setBooking(false)} locale={locale} t={t} />
    </section>
  );
}
