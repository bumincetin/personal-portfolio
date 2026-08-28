'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale, TranslationType } from '@/lib/translations';
import type { Story } from '@/lib/story';
import { BookingModal } from '@/app/components/BookingModal';
import Reveal from '@/app/components/ui/Reveal';
import RevealText from '@/app/components/ui/RevealText';
import DecodeText from '@/app/components/ui/DecodeText';
import { ShellButton, ShellLink } from '@/app/components/ui/ShellButton';
import Odometer from '@/app/components/widgets/Odometer';
import Wireframe3D from '@/app/components/three/Wireframe3D';

/**
 * Where the story lands: the practice as it stands today. The four services
 * are set as an index -- the Kage "lesson row" treatment: hairline rows that
 * shift right, wash brass and draw an underline on hover -- because by now
 * the reader has met each one inside a chapter and only needs the list.
 */
export default function Epilogue({
  story,
  t,
  locale,
}: {
  story: Story;
  t: TranslationType;
  locale: Locale;
}) {
  const [booking, setBooking] = useState(false);
  const { epilogue } = story;

  return (
    <section id="today" className="relative overflow-hidden px-6 py-section md:px-12 lg:px-16">
      <div
        className="pointer-events-none absolute right-[-0.05em] top-8 select-none font-display text-[clamp(11rem,30vw,28rem)] font-light italic leading-none text-charcoal/[0.035]"
        aria-hidden="true"
      >
        §
      </div>

      <div className="mx-auto mb-14 flex max-w-7xl items-center gap-5 md:mb-20">
        <span className="font-display text-3xl font-light italic text-accent">{epilogue.kicker}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-border-dark via-border to-transparent" aria-hidden="true" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">{story.hero.portraitCaption.split('—').pop()?.trim()}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Statement + figure */}
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <DecodeText text={epilogue.servicesLabel} className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-muted" />
          </div>
          <RevealText as="h2" text={epilogue.title} className="font-display text-chapter text-charcoal" stagger={38} />
          <Reveal delay={160} className="mt-7 max-w-prose text-[1rem] leading-[1.75] text-muted">
            {epilogue.body}
          </Reveal>

          <Reveal delay={260} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ShellButton variant="primary" data-gravity onClick={() => setBooking(true)}>
              {epilogue.cta}
              <ArrowRight size={14} strokeWidth={1.5} />
            </ShellButton>
            <ShellLink href={`/${locale}/about`} variant="secondary" data-gravity>
              {epilogue.ctaSecondary}
            </ShellLink>
          </Reveal>

          {/* Stats */}
          <Reveal delay={340} className="mt-12 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-2">
            {epilogue.stats.map((stat) => (
              <div key={stat.label} className="bg-surface/80 px-5 py-5 backdrop-blur-sm">
                <div className="font-display text-4xl font-light text-charcoal">
                  <Odometer value={stat.value} />
                </div>
                <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-light">{stat.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Index + figure */}
        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <ol className="border-t border-border">
              {epilogue.services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="index-row group grid items-baseline gap-4 border-b border-border py-6 md:grid-cols-[3.5rem_1fr_auto] md:gap-8">
                    <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-accent">{service.numeral}</span>
                    <span>
                      <span className="block font-display text-2xl font-light text-charcoal transition-colors duration-500 group-hover:text-accent md:text-[1.9rem]">
                        {service.name}
                      </span>
                      <span className="mt-1 block font-sans text-sm text-muted">{service.line}</span>
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.25}
                      className="hidden self-center text-muted-light transition-all duration-500 ease-luxe group-hover:translate-x-1 group-hover:text-accent md:block"
                    />
                    <span className="index-bar" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={260} className="relative mt-12 hidden lg:block">
            <div className="relative mx-auto w-[min(100%,420px)]">
              <div className="pointer-events-none absolute inset-[-18%] -z-10 opacity-50" aria-hidden="true">
                <Wireframe3D shape="gem" speed={0.5} lineAlpha={0.45} />
              </div>
              <div
                className="pointer-events-none absolute -inset-10 -z-10 blur-3xl"
                style={{ background: 'radial-gradient(circle at 50% 70%, rgb(var(--c-brass) / 0.16), transparent 65%)' }}
                aria-hidden="true"
              />
              <Image
                src="/bumin1.webp"
                alt=""
                width={1100}
                height={1100}
                sizes="420px"
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <BookingModal isOpen={booking} onClose={() => setBooking(false)} locale={locale} t={t} />
    </section>
  );
}
