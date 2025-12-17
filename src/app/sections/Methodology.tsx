'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '../components/ui/GlassCard';
import { ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface MethodologyProps {
  t?: TranslationType;
  locale?: Locale;
}

const Methodology: React.FC<MethodologyProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
          <div className="w-full h-[100px] mb-8 relative bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent bg-[length:100%_100%] overflow-hidden">
             {/* Abstract Chart Line */}
             <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-r from-transparent to-[rgba(0,240,255,0.2)] [clip-path:polygon(0_100%,_0_80%,_20%_60%,_40%_90%,_60%_40%,_80%_50%,_100%_20%,_100%_100%)]"></div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">{trans.methodology.card1Title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{trans.methodology.card1Desc}</p>
          </div>
        </GlassCard>

        {/* Card 2 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
           <div className="w-full h-[100px] mb-8 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(112,0,255,0.2),_transparent)]"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
           </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">{trans.methodology.card2Title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{trans.methodology.card2Desc}</p>
          </div>
        </GlassCard>

        {/* Card 3 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
          <div className="w-full h-[100px] mb-8 relative flex items-center justify-center">
             <div className="w-10 h-10 border border-accent-cyan rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-accent-cyan rounded-full"></div>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">{trans.methodology.card3Title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{trans.methodology.card3Desc}</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Methodology;
