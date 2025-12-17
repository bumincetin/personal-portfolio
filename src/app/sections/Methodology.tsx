'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '../components/ui/GlassCard';
import { ArrowRight, TrendingUp, Brain, BarChart3, Building2 } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface MethodologyProps {
  t?: TranslationType;
  locale?: Locale;
}

const Methodology: React.FC<MethodologyProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  const services = [
    {
      icon: TrendingUp,
      title: trans.methodology.card1Title,
      desc: trans.methodology.card1Desc,
      gradient: 'from-transparent via-[rgba(0,240,255,0.1)] to-transparent',
      accent: 'accent-cyan',
    },
    {
      icon: Brain,
      title: trans.methodology.card2Title,
      desc: trans.methodology.card2Desc,
      gradient: 'from-transparent via-[rgba(112,0,255,0.15)] to-transparent',
      accent: 'accent-purple',
    },
    {
      icon: BarChart3,
      title: trans.methodology.card3Title,
      desc: trans.methodology.card3Desc,
      gradient: 'from-transparent via-[rgba(0,240,255,0.08)] to-transparent',
      accent: 'accent-cyan',
    },
    {
      icon: Building2,
      title: trans.methodology.card4Title,
      desc: trans.methodology.card4Desc,
      gradient: 'from-transparent via-[rgba(112,0,255,0.1)] to-transparent',
      accent: 'accent-purple',
    },
  ];

  return (
    <section id="services" className="py-32 container mx-auto px-6">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
            <p className="text-accent-cyan font-mono mb-4">{trans.methodology.label}</p>
            <h2 className="font-serif text-5xl md:text-6xl text-text-primary">{trans.methodology.title}</h2>
        </div>
        <Link href={`/${locale}/methodology`} className="group flex items-center gap-2 text-accent-cyan font-mono uppercase tracking-widest text-sm hover:text-white transition-colors">
            {trans.methodology.explore} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <GlassCard key={idx} className="p-8 md:p-10 min-h-[280px] flex flex-col justify-between group hover:border-glass-highlight transition-colors duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} border border-glass-border flex items-center justify-center`}>
                <service.icon className={`text-${service.accent}`} size={24} />
              </div>
              <span className="font-mono text-text-muted/50 text-sm">0{idx + 1}</span>
            </div>
            <div>
              <h3 className="text-2xl font-serif mb-3 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{service.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Methodology;
