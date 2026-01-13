'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Zap, LineChart, Shield, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface WhySMEProps {
  t: TranslationType;
  locale: Locale;
}

const iconMap: Record<string, React.ReactNode> = {
  compete: <Target className="text-accent" size={24} />,
  automate: <Zap className="text-accent" size={24} />,
  decisions: <LineChart className="text-accent" size={24} />,
  compliance: <Shield className="text-accent" size={24} />,
};

const WhySME: React.FC<WhySMEProps> = ({ t, locale }) => {
  const sme = t.smeSection;
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <section id="why-sme" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {sme.label}
            </span>
            <div className="w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6 max-w-4xl mx-auto leading-tight">
            {sme.title}
          </h2>
          
          <p className="font-serif text-xl md:text-2xl text-accent italic mb-8">
            {sme.subtitle}
          </p>
          
          <p className="font-mono text-sm md:text-base text-muted max-w-3xl mx-auto leading-relaxed">
            {sme.intro}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {sme.benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`
                bg-cream border border-border p-6 md:p-8 
                hover:border-charcoal hover:shadow-editorial transition-all duration-300
                ${benefit.examples ? 'row-span-1' : ''}
              `}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  {iconMap[benefit.id]}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-2">
                    {benefit.title}
                  </h3>
                </div>
              </div>
              
              <p className="font-mono text-sm text-muted leading-relaxed mb-4">
                {benefit.desc}
              </p>
              
              {/* Expandable Examples */}
              {benefit.examples && benefit.examples.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={() => setExpandedCard(expandedCard === benefit.id ? null : benefit.id)}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent hover:text-charcoal transition-colors w-full justify-between"
                  >
                    <span>
                      {locale === 'tr' ? 'Gerçek Örnekler' : locale === 'it' ? 'Esempi Reali' : 'Real-World Examples'}
                    </span>
                    {expandedCard === benefit.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedCard === benefit.id ? 'auto' : 0,
                      opacity: expandedCard === benefit.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-3">
                      {benefit.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                          <span className="font-mono text-xs text-charcoal/80 leading-relaxed">
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Hybrid Advantage Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal text-cream p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {locale === 'tr' ? 'Hibrit Avantaj' : locale === 'it' ? 'Vantaggio Ibrido' : 'The Hybrid Advantage'}
                </span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream mb-6 leading-tight">
                {sme.hybridTitle}
              </h3>
              
              <p className="font-mono text-sm md:text-base text-cream/80 leading-relaxed">
                {sme.hybridDesc}
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 text-center border border-white/10">
                  <div className="font-serif text-3xl text-accent mb-1">+</div>
                  <div className="font-mono text-xs text-cream/70 uppercase tracking-wider">
                    {locale === 'tr' ? 'Veri Bilimi' : locale === 'it' ? 'Data Science' : 'Data Science'}
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 text-center border border-white/10">
                  <div className="font-serif text-3xl text-accent mb-1">+</div>
                  <div className="font-mono text-xs text-cream/70 uppercase tracking-wider">
                    {locale === 'tr' ? 'Finans' : locale === 'it' ? 'Finanza' : 'Finance'}
                  </div>
                </div>
                <div className="col-span-2 bg-accent/20 backdrop-blur-sm p-4 text-center border border-accent/30">
                  <div className="font-serif text-xl text-cream mb-1">=</div>
                  <div className="font-mono text-xs text-cream uppercase tracking-wider">
                    {locale === 'tr' ? 'İş Değeri' : locale === 'it' ? 'Valore Business' : 'Business Value'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="font-mono text-sm md:text-base text-charcoal mb-6 max-w-2xl mx-auto">
            {sme.cta}
          </p>
          <Link 
            href={`/${locale}/why-sme`}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90 hover:shadow-editorial"
          >
            {locale === 'tr' ? 'Detayları Gör' : locale === 'it' ? 'Vedi Dettagli' : 'Learn More'}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySME;
