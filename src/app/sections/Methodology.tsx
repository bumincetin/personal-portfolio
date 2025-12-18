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
    <section id="services" className="py-16 md:py-32 container mx-auto px-4 md:px-6">
      <div className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
        <div>
          <p className="text-accent-cyan font-mono mb-2 md:mb-4 text-xs md:text-base">{trans.methodology.label}</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary">{trans.methodology.title}</h2>
        </div>
        <Link href={`/${locale}/methodology`} className="group flex items-center gap-2 text-accent-cyan font-mono uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors">
          {trans.methodology.explore} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
        {services.map((service, idx) => (
          <GlassCard key={idx} className="p-6 md:p-8 lg:p-10 min-h-[200px] md:min-h-[280px] flex flex-col justify-between group hover:border-glass-highlight transition-colors duration-300">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.gradient} border border-glass-border flex items-center justify-center`}>
                <service.icon className={`text-${service.accent}`} size={20} />
              </div>
              <span className="font-mono text-text-muted/50 text-xs md:text-sm">0{idx + 1}</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-serif mb-2 md:mb-3 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-text-muted text-xs md:text-sm leading-relaxed">{service.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Methodology;
