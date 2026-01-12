'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, Globe, Scale, FileCheck, CheckCircle2 } from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface Props {
  locale: Locale;
  t: TranslationType;
}

export default function FinancialConsultancyClient({ locale, t }: Props) {
  const section = t.methodologyPage.section4;

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-cream min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <Link 
          href={`/${locale}/methodology`}
          className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          {t.methodologyPage.servicesLabel}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Building2 className="text-accent" size={24} />
              </div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">{section.num}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              {section.title}
            </h1>
            <p className="font-mono text-sm text-muted mb-4 uppercase tracking-wider">
              {section.arch}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-charcoal p-8 rounded-lg text-cream">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-cream/20 rounded">
                  <Globe className="mx-auto mb-2 text-accent" size={24} />
                  <div className="font-mono text-sm text-cream/70">
                    {locale === 'tr' ? 'Uluslararası' : locale === 'it' ? 'Internazionale' : 'International'}
                  </div>
                </div>
                <div className="text-center p-4 border border-cream/20 rounded">
                  <Scale className="mx-auto mb-2 text-accent" size={24} />
                  <div className="font-mono text-sm text-cream/70">
                    {locale === 'tr' ? 'Yasal Uyum' : locale === 'it' ? 'Compliance' : 'Compliance'}
                  </div>
                </div>
                <div className="text-center p-4 border border-cream/20 rounded">
                  <FileCheck className="mx-auto mb-2 text-accent" size={24} />
                  <div className="font-mono text-sm text-cream/70">
                    {locale === 'tr' ? 'Strateji' : locale === 'it' ? 'Strategia' : 'Strategy'}
                  </div>
                </div>
                <div className="text-center p-4 border border-cream/20 rounded">
                  <Building2 className="mx-auto mb-2 text-accent" size={24} />
                  <div className="font-mono text-sm text-cream/70">Alvolo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="bg-white py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {locale === 'tr' ? 'Herkes İçin Açıklama' : locale === 'it' ? 'Per Tutti' : 'For Everyone'}
              </span>
            </div>
            
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
              {locale === 'tr' ? 'Finansal Danışmanlık Nedir?' : locale === 'it' ? 'Cos\'è la Consulenza Finanziaria?' : 'What is Financial Consultancy?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr' 
                    ? 'Finansal danışmanlık, özellikle farklı ülkelerde iş yapmak isteyenler için karmaşık finansal süreçlerde rehberlik etmektir. İtalya\'da yatırım yapmak, şirket kurmak veya vergi sistemi hakkında bilgi almak isteyenlere yardımcı oluyorum.'
                    : locale === 'it'
                    ? 'La consulenza finanziaria guida attraverso processi finanziari complessi, specialmente per chi vuole fare business in diversi paesi. Aiuto chi vuole investire in Italia, aprire un\'azienda o ottenere informazioni sul sistema fiscale.'
                    : 'Financial consultancy guides you through complex financial processes, especially for those who want to do business in different countries. I help those who want to invest in Italy, establish a company, or learn about the tax system.'
                  }
                </p>
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'Alvolo Consulting\'in kurucusu olarak, özellikle Türkiye-İtalya arasında köprü kuruyorum. Dil, kültür ve yasal farklılıkları aşmanıza yardımcı oluyorum.'
                    : locale === 'it'
                    ? 'Come fondatore di Alvolo Consulting, faccio da ponte in particolare tra Turchia e Italia. Aiuto a superare le differenze linguistiche, culturali e legali.'
                    : 'As the founder of Alvolo Consulting, I specifically bridge between Turkey and Italy. I help you overcome language, cultural, and legal differences.'
                  }
                </p>
              </div>
              
              <div className="bg-surface-alt p-6 rounded-lg">
                <h3 className="font-serif text-lg text-charcoal mb-4">
                  {locale === 'tr' ? 'Kimler İçin Uygun?' : locale === 'it' ? 'Per Chi È Adatto?' : 'Who Is It For?'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-sm text-muted">
                      {locale === 'tr' ? 'İtalya\'da yatırım yapmak isteyenler' : locale === 'it' ? 'Chi vuole investire in Italia' : 'Those who want to invest in Italy'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-sm text-muted">
                      {locale === 'tr' ? 'Uluslararası ticaret yapan şirketler' : locale === 'it' ? 'Aziende che fanno commercio internazionale' : 'Companies engaged in international trade'}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-sm text-muted">
                      {locale === 'tr' ? 'Yasal uyum konusunda destek arayanlar' : locale === 'it' ? 'Chi cerca supporto per la compliance' : 'Those seeking compliance support'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-charcoal"></div>
            <span className="font-mono text-xs text-charcoal uppercase tracking-wider">
              {locale === 'tr' ? 'Hizmet Detayları' : locale === 'it' ? 'Dettagli Servizio' : 'Service Details'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-base text-muted leading-relaxed mb-6">
                {section.desc1}
              </p>
              <p className="font-mono text-base text-muted leading-relaxed mb-8">
                {section.desc2}
              </p>
              
              <h3 className="font-serif text-xl text-charcoal mb-4">
                {locale === 'tr' ? 'Sunduğum Hizmetler' : locale === 'it' ? 'Servizi Offerti' : 'Services Offered'}
              </h3>
              <ul className="space-y-3">
                {section.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-sm text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              {/* Alvolo Consulting */}
              <div className="bg-charcoal p-6 rounded-lg text-cream">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="text-accent" size={20} />
                  <h4 className="font-serif text-lg">Alvolo Consulting</h4>
                </div>
                <p className="font-mono text-sm text-cream/70 mb-4">
                  {locale === 'tr'
                    ? 'İtalya merkezli finansal danışmanlık şirketim. Uluslararası müşterilere İtalyan finans sistemi konusunda rehberlik ediyorum.'
                    : locale === 'it'
                    ? 'La mia società di consulenza finanziaria con sede in Italia. Guido i clienti internazionali nel sistema finanziario italiano.'
                    : 'My Italy-based financial consultancy firm. I guide international clients through the Italian financial system.'
                  }
                </p>
                <div className="flex gap-4 font-mono text-xs">
                  <span className="text-accent">Milan, Italy</span>
                  <span className="text-cream/50">|</span>
                  <span className="text-cream/70">Founded 2025</span>
                </div>
              </div>
              
              {/* Languages */}
              <div className="bg-white border border-border p-6 rounded-lg">
                <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                  {locale === 'tr' ? 'Hizmet Dilleri' : locale === 'it' ? 'Lingue di Servizio' : 'Service Languages'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Turkish', 'English', 'Italian', 'German'].map((lang, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-surface-alt border border-border rounded font-mono text-sm text-charcoal">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-surface-alt border border-border p-8 md:p-12 text-center rounded-lg">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {locale === 'tr' ? 'Finansal Hedeflerinizi Konuşalım' : locale === 'it' ? 'Parliamo dei Tuoi Obiettivi Finanziari' : 'Let\'s Discuss Your Financial Goals'}
          </h3>
          <p className="font-mono text-sm text-muted mb-8 max-w-xl mx-auto">
            {locale === 'tr'
              ? 'Uluslararası finansal süreçlerinizde size nasıl yardımcı olabileceğimi anlatalım.'
              : locale === 'it'
              ? 'Scopriamo come posso aiutarti nei tuoi processi finanziari internazionali.'
              : 'Let me explain how I can help you with your international financial processes.'
            }
          </p>
          <a 
            href="mailto:cetinbumink@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy"
          >
            {t.methodologyPage.ctaButton}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
