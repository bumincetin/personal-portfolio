'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Locale } from '@/lib/translations';
import Reveal from '@/app/components/ui/Reveal';
import { MicroLabel } from '@/app/components/ui/SectionHeading';
import AttentionMap from '@/app/components/widgets/AttentionMap';

/**
 * Research showcase: the greenwashing-detection work as a live instrument
 * rather than a citation. The AttentionMap carries the interaction; this
 * section frames it and routes to the full research page.
 */

const COPY = {
  en: {
    label: 'Research Lab',
    title: 'Reading between the lines, at model scale',
    desc: 'My thesis work fine-tunes transformer models to flag greenwashing risk in corporate sustainability disclosures — scoring the gap between what is promised and what is mechanically committed. Hover the excerpt below to see what the model sees.',
    verdict: 'GREENWASHING SIGNAL DETECTED',
    gaugeTitle: 'ESG_CLASSIFIER · RoBERTa-ft',
    hint: 'hover a word · attention head L11/H4',
    cta: 'Explore the research',
  },
  tr: {
    label: 'Araştırma Laboratuvarı',
    title: 'Satır aralarını model ölçeğinde okumak',
    desc: 'Tez çalışmam, kurumsal sürdürülebilirlik raporlarındaki yeşil aklama riskini işaretlemek için transformer modellerini ince ayarlıyor — vaat edilenle mekanik olarak taahhüt edilen arasındaki farkı puanlıyor. Modelin gördüğünü görmek için aşağıdaki alıntının üzerine gelin.',
    verdict: 'YEŞİL AKLAMA SİNYALİ TESPİT EDİLDİ',
    gaugeTitle: 'ESG_CLASSIFIER · RoBERTa-ft',
    hint: 'bir kelimenin üzerine gelin · attention head L11/H4',
    cta: 'Araştırmayı keşfedin',
  },
  it: {
    label: 'Laboratorio di Ricerca',
    title: 'Leggere tra le righe, su scala di modello',
    desc: 'La mia tesi affina modelli transformer per segnalare il rischio di greenwashing nelle dichiarazioni di sostenibilità aziendali — misurando il divario tra ciò che viene promesso e ciò che viene meccanicamente garantito. Passa il cursore sull\'estratto per vedere ciò che vede il modello.',
    verdict: 'SEGNALE DI GREENWASHING RILEVATO',
    gaugeTitle: 'ESG_CLASSIFIER · RoBERTa-ft',
    hint: 'passa su una parola · attention head L11/H4',
    cta: 'Esplora la ricerca',
  },
} as const;

const ResearchLab: React.FC<{ locale?: Locale }> = ({ locale = 'en' }) => {
  const copy = COPY[locale] ?? COPY.en;

  return (
    <section id="research-lab" className="relative overflow-hidden px-6 py-section md:px-12 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        {/* Frame */}
        <div>
          <Reveal className="mb-6">
            <MicroLabel>{copy.label}</MicroLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-heading text-charcoal">{copy.title}</h2>
          </Reveal>
          <Reveal delay={200} className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
            {copy.desc}
          </Reveal>
          <Reveal delay={300} className="mt-8">
            <Link
              href={`/${locale}/assets`}
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent transition-colors hover:text-charcoal"
            >
              {copy.cta}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Instrument */}
        <Reveal delay={200}>
          <div className="rounded-editorial border border-border bg-surface/90 p-6 shadow-card md:p-9">
            <AttentionMap
              labels={{ title: copy.gaugeTitle, verdict: copy.verdict, hint: copy.hint }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ResearchLab;
