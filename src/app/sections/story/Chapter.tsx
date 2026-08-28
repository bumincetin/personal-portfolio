'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import type { Chapter as ChapterData, ChapterVisual, StoryLink } from '@/lib/story';
import Reveal from '@/app/components/ui/Reveal';
import RevealText from '@/app/components/ui/RevealText';
import DecodeText from '@/app/components/ui/DecodeText';
import TiltCard from '@/app/components/ui/TiltCard';
import MonteCarlo from '@/app/components/widgets/MonteCarlo';
import AttentionMap from '@/app/components/widgets/AttentionMap';
import Hemicycle from '@/app/components/widgets/Hemicycle';
import ForecastLine from '@/app/components/widgets/ForecastLine';
import CorridorGlobe from '@/app/components/widgets/CorridorGlobe';

/**
 * One chapter of the story.
 *
 * Text on one side, the chapter's instrument on the other, sides alternating
 * so the eye zigzags down the page. On desktop the text column is sticky, so
 * the title stays put while the taller instrument column scrolls past it. An
 * oversized numeral is set behind the whole thing at a few percent alpha --
 * the ThreeUI "oversized wordmark" treatment -- to mark the chapter the way a
 * folio marks a page.
 */

const ATTENTION_LABELS: Record<Locale, { title: string; verdict: string; hint: string }> = {
  en: { title: 'ESG_CLASSIFIER · RoBERTa-ft', verdict: 'GREENWASHING SIGNAL DETECTED', hint: 'hover a word · attention head L11/H4' },
  tr: { title: 'ESG_CLASSIFIER · RoBERTa-ft', verdict: 'YEŞİL AKLAMA SİNYALİ TESPİT EDİLDİ', hint: 'bir kelimenin üzerine gelin · attention head L11/H4' },
  it: { title: 'ESG_CLASSIFIER · RoBERTa-ft', verdict: 'SEGNALE DI GREENWASHING RILEVATO', hint: 'passa su una parola · attention head L11/H4' },
};

const INSTRUMENT_LABEL: Record<ChapterVisual, string> = {
  hemicycle: 'SEAT_MODEL · TBMM 2023',
  montecarlo: 'MONTE_CARLO · 40 paths',
  forecast: 'LSTM · 16-step horizon',
  attention: 'ATTENTION · L11/H4',
  corridor: 'CORRIDOR · IST ⇄ MIL',
};

function Instrument({ visual, locale }: { visual: ChapterVisual; locale: Locale }) {
  switch (visual) {
    case 'hemicycle':
      return <Hemicycle className="h-full w-full" />;
    case 'montecarlo':
      return <MonteCarlo className="h-full w-full" />;
    case 'forecast':
      return <ForecastLine className="h-full w-full" />;
    case 'attention':
      return (
        <div className="flex h-full w-full items-center">
          <AttentionMap labels={ATTENTION_LABELS[locale] ?? ATTENTION_LABELS.en} />
        </div>
      );
    case 'corridor':
      return <CorridorGlobe className="h-full w-full" />;
  }
}

function WorkLink({ link }: { link: StoryLink }) {
  const className =
    'group/link inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent transition-colors hover:text-charcoal';
  const Icon = link.external ? ArrowUpRight : ArrowRight;
  const icon = <Icon size={12} strokeWidth={1.5} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-px" />;
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {link.label}
        {icon}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
      {icon}
    </Link>
  );
}

export default function Chapter({
  chapter,
  index,
  locale,
  labels,
}: {
  chapter: ChapterData;
  index: number;
  locale: Locale;
  labels: { chapter: string; turnedInto: string; theWork: string };
}) {
  const flipped = index % 2 === 1;
  const id = `chapter-${index + 1}`;

  return (
    <section id={id} className="relative overflow-hidden px-6 py-[clamp(3.5rem,8vw,7rem)] md:px-12 lg:px-16">
      {/* Folio numeral. */}
      <div
        className={`pointer-events-none absolute top-8 select-none font-display text-[clamp(11rem,30vw,28rem)] font-light leading-none text-charcoal/[0.035] ${
          flipped ? 'left-[-0.05em]' : 'right-[-0.05em]'
        }`}
        aria-hidden="true"
      >
        {chapter.numeral}
      </div>

      {/* Chapter rule. */}
      <div className="mx-auto mb-14 flex max-w-7xl items-center gap-5 md:mb-20">
        <span className="font-display text-3xl font-light text-accent">{chapter.numeral}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-border-dark via-border to-transparent" aria-hidden="true" />
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">{chapter.years}</span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Narrative */}
        <div className={`lg:col-span-5 lg:self-start lg:sticky lg:top-32 ${flipped ? 'lg:col-start-8 lg:order-2' : 'lg:col-start-1'}`}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            <DecodeText
              text={`${labels.chapter} ${chapter.numeral} — ${chapter.kicker}`}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-muted"
            />
          </div>

          <Reveal className="mb-7">
            <p className="font-display text-[1.6rem] font-normal italic leading-tight text-charcoal">{chapter.institution}</p>
            <p className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-light">
              {chapter.role} · {chapter.place}
            </p>
          </Reveal>

          <RevealText as="h2" text={chapter.title} className="font-display text-chapter text-charcoal" stagger={38} />

          <Reveal delay={160} className="mt-7 max-w-prose text-[1rem] leading-[1.75] text-muted">
            {chapter.body}
          </Reveal>

          {/* What it became */}
          <Reveal delay={260} className="mt-10 border-t border-border pt-5">
            <span className="mb-2 block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">
              {labels.turnedInto}
            </span>
            <Link
              href={chapter.service.href}
              className="group inline-flex items-baseline gap-3 font-display text-2xl font-light text-charcoal transition-colors hover:text-accent md:text-[1.75rem]"
            >
              <span className="link-underline">{chapter.service.name}</span>
              <ArrowRight size={16} strokeWidth={1.5} className="translate-y-px text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Instrument + work */}
        <div className={`lg:col-span-6 ${flipped ? 'lg:col-start-1 lg:order-1' : 'lg:col-start-7'}`}>
          <Reveal delay={120} threshold={0.1}>
            <TiltCard maxTilt={3}>
              <div className="glass rounded-editorial">
                <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-light">
                  <span>{INSTRUMENT_LABEL[chapter.visual]}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-glow" />
                    live
                  </span>
                </div>
                <div className={`p-5 md:p-7 ${chapter.visual === 'attention' ? '' : 'aspect-[4/3]'}`}>
                  <Instrument visual={chapter.visual} locale={locale} />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={240} className="mt-6 grid gap-5 border-t border-border pt-6 md:grid-cols-[auto_1fr] md:gap-10">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light md:pt-1.5">
              {chapter.work.label}
            </span>
            <div>
              <h3 className="font-display text-2xl font-normal text-charcoal">{chapter.work.title}</h3>
              <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-muted">{chapter.work.desc}</p>
              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                {chapter.work.links.map((link) => (
                  <WorkLink key={link.href + link.label} link={link} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
