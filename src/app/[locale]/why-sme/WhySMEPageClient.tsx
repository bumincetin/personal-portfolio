'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, Lightning as Zap, ChartLine as LineChart, Shield, ArrowRight, CheckCircle, CaretDown as ChevronDown, CaretUp as ChevronUp, Buildings as Building } from 'phosphor-react';
import { getTranslation, type Locale } from '@/lib/translations';
import { BookingModal } from '@/app/components/BookingModal';

interface WhySMEPageClientProps {
  locale: Locale;
}

const iconMap: Record<string, React.ReactNode> = {
  compete: <Target className="text-accent" size={28} />,
  automate: <Zap className="text-accent" size={28} />,
  decisions: <LineChart className="text-accent" size={28} />,
  compliance: <Shield className="text-accent" size={28} />,
};

export default function WhySMEPageClient({ locale }: WhySMEPageClientProps) {
  const t = getTranslation(locale);
  const sme = t.smeSection;
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-cream min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-6 md:mb-8">
        <Link 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-muted hover:text-accent transition-colors min-h-[44px]"
        >
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
          {t.nav.home}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 md:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent">
              {sme.label}
            </span>
            <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
          </div>
          
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-charcoal mb-4 md:mb-6 max-w-4xl mx-auto leading-tight px-2">
            {sme.pageTitle}
          </h1>
          
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-accent italic mb-6 md:mb-8 px-2">
            {sme.pageSubtitle}
          </p>
          
          <p className="font-mono text-sm sm:text-base md:text-lg text-muted max-w-3xl mx-auto leading-relaxed px-2">
            {sme.intro}
          </p>
        </motion.div>
      </section>

      {/* Detailed Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {sme.benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white border border-border p-4 sm:p-6 md:p-8 lg:p-12 hover:shadow-editorial transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Icon & Title */}
                <div className="lg:col-span-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <div className="scale-75 sm:scale-90 md:scale-100">
                      {iconMap[benefit.id]}
                    </div>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-charcoal mb-3 md:mb-4">
                    {benefit.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-muted leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                {/* Detailed Content */}
                <div className="lg:col-span-9 space-y-4 md:space-y-6">
                  <p className="font-mono text-sm sm:text-base text-charcoal leading-relaxed">
                    {benefit.detailedDesc}
                  </p>

                  {/* Key Points */}
                  <div className="bg-cream p-4 sm:p-6 border border-border">
                    <h3 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-accent mb-3 md:mb-4">
                      {locale === 'tr' ? 'Ana Avantajlar' : locale === 'it' ? 'Vantaggi Chiave' : 'Key Advantages'}
                    </h3>
                    <ul className="space-y-2 md:space-y-3">
                      {benefit.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                          <span className="font-mono text-xs sm:text-sm text-charcoal leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Examples */}
                  {benefit.examples && benefit.examples.length > 0 && (
                    <div className="border-t border-border pt-4 md:pt-6">
                      <button
                        onClick={() => setExpandedCard(expandedCard === benefit.id ? null : benefit.id)}
                        className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-accent hover:text-charcoal transition-colors w-full justify-between mb-3 md:mb-4 py-2"
                      >
                        <span className="text-left">
                          {locale === 'tr' ? 'Gerçek Dünya Örnekleri' : locale === 'it' ? 'Esempi del Mondo Reale' : 'Real-World Examples'}
                        </span>
                        {expandedCard === benefit.id ? <ChevronUp size={16} className="flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
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
                        <div className="space-y-3 md:space-y-4">
                          {benefit.examples.map((example, i) => (
                            <div key={i} className="bg-white border-l-4 border-accent pl-3 sm:pl-4 py-2">
                              <p className="font-mono text-xs sm:text-sm text-charcoal leading-relaxed">
                                {example}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hybrid Advantage Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal text-cream p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative Elements - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="hidden md:block absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent">
                  {locale === 'tr' ? 'HİBRİT AVANTAJ' : locale === 'it' ? 'Vantaggio Ibrido' : 'The Hybrid Advantage'}
                </span>
              </div>
              
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream mb-4 md:mb-6 leading-tight">
                {sme.hybridTitle}
              </h2>
              
              <p className="font-mono text-sm sm:text-base text-cream/80 leading-relaxed mb-4 md:mb-6">
                {sme.hybridDesc}
              </p>
              
              <p className="font-mono text-xs sm:text-sm md:text-base text-cream/70 leading-relaxed">
                {sme.hybridDetails}
              </p>
            </div>
            
            <div className="lg:col-span-5 mt-6 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 text-center border border-white/10">
                  <Building className="mx-auto mb-2 sm:mb-3 text-accent" size={24} />
                  <div className="font-serif text-xl sm:text-2xl text-accent mb-1 sm:mb-2">+</div>
                  <div className="font-mono text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider">
                    {locale === 'tr' ? 'VERİ BİLİMİ' : locale === 'it' ? 'Data Science' : 'Data Science'}
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 text-center border border-white/10">
                  <LineChart className="mx-auto mb-2 sm:mb-3 text-accent" size={24} />
                  <div className="font-serif text-xl sm:text-2xl text-accent mb-1 sm:mb-2">+</div>
                  <div className="font-mono text-[10px] sm:text-xs text-cream/70 uppercase tracking-wider">
                    {locale === 'tr' ? 'FİNANS' : locale === 'it' ? 'Finanza' : 'Finance'}
                  </div>
                </div>
                <div className="col-span-2 bg-accent/20 backdrop-blur-sm p-4 sm:p-6 text-center border border-accent/30">
                  <Target className="mx-auto mb-2 sm:mb-3 text-cream" size={24} />
                  <div className="font-serif text-lg sm:text-xl text-cream mb-1 sm:mb-2">=</div>
                  <div className="font-mono text-[10px] sm:text-xs text-cream uppercase tracking-wider">
                    {locale === 'tr' ? 'İŞ DEĞERİ' : locale === 'it' ? 'Valore Business' : 'Business Value'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white border border-border p-6 sm:p-8 md:p-12"
        >
          <p className="font-mono text-sm sm:text-base md:text-lg text-charcoal mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            {sme.cta}
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-cream font-mono text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90 hover:shadow-editorial min-h-[44px]"
          >
            <span className="whitespace-nowrap">
              {locale === 'tr' ? 'Görüşme Talep Et' : locale === 'it' ? 'Richiedi una Consulenza' : 'Request a Consultation'}
            </span>
            <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </button>
        </motion.div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={t}
      />
    </div>
  );
}
