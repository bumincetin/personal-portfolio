'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';
import { BookingModal } from '@/app/components/BookingModal';
import Reveal from '@/app/components/ui/Reveal';
import RevealText from '@/app/components/ui/RevealText';
import { MicroLabel } from '@/app/components/ui/SectionHeading';
import { ShellButton, ShellLink } from '@/app/components/ui/ShellButton';
import Wireframe3D from '@/app/components/three/Wireframe3D';
import TerminalBoot from '@/app/components/ui/TerminalBoot';

interface HeroProps {
  t?: TranslationType;
  locale?: Locale;
}

const CREDENTIALS = ['M.Sc. Data Science', 'Bocconi University', 'Milan, Italy'];

const Hero: React.FC<HeroProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-16 lg:pt-36"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          {/* Boot transcript: reserved height, so the settle into the status
              line cannot shove the headline. */}
          <TerminalBoot className="mb-5 min-h-[3.4rem]" />

          <Reveal className="mb-7">
            <MicroLabel>{trans.hero.subtitle}</MicroLabel>
          </Reveal>

          <h1 className="text-display text-charcoal">
            <RevealText text={trans.hero.title1} className="block" />
            <RevealText text={trans.hero.title2} className="block text-muted-light" delay={180} />
          </h1>

          <Reveal delay={420} className="mt-8 max-w-xl text-base leading-relaxed text-muted">
            {trans.about.desc1}
          </Reveal>

          {/* Credential rail */}
          <Reveal delay={520} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {CREDENTIALS.map((credential) => (
              <span
                key={credential}
                className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted"
              >
                <span className="h-1 w-1 rounded-full bg-accent shadow-glow" aria-hidden="true" />
                {credential}
              </span>
            ))}
          </Reveal>

          <Reveal delay={620} className="mt-11 flex flex-col gap-4 sm:flex-row">
            <ShellLink href="#focus-areas" variant="primary">
              {trans.hero.cta}
            </ShellLink>
            <ShellButton variant="secondary" onClick={() => setIsBookingModalOpen(true)}>
              {trans.nav.contact}
              <ArrowRight size={15} className="text-accent-blue" strokeWidth={1.5} />
            </ShellButton>
          </Reveal>
        </div>

        {/* Portrait, seated in a gradient shell so it reads as part of the field */}
        <Reveal delay={260} threshold={0} className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-[460px]">
            {/* Gold bloom behind the frame */}
            <div
              className="pointer-events-none absolute -inset-10 -z-10 opacity-70 blur-3xl"
              style={{ background: 'radial-gradient(circle at 60% 40%, rgb(var(--c-brass) / 0.16), transparent 65%)' }}
              aria-hidden="true"
            />

            {/* Orbit rings turning slowly behind the figure */}
            <div className="pointer-events-none absolute inset-[-14%] -z-10 opacity-60" aria-hidden="true">
              <Wireframe3D shape="orbits" speed={0.7} lineAlpha={0.4} />
            </div>

            {/* The studio backdrop is cut out at build time (see
                scripts/optimize-images.mjs), so the figure stands directly on
                the constellation field with no frame around it. */}
            <Image
              src="/bumin1.webp"
              alt="Bumin Kağan Çetin, data scientist"
              width={1100}
              height={1100}
              priority
              sizes="(max-width: 1024px) 90vw, 460px"
              className="relative h-auto w-full object-contain"
            />

            {/* Caption strip */}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-light">
              <span>Data Science × Financial Analytics</span>
              <span className="text-accent" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={trans}
      />
    </section>
  );
};

export default Hero;
