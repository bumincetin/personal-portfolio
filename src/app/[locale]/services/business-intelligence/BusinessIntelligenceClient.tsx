'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BarChart3, PieChart, Activity, Database, CheckCircle2 } from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';
import { DashboardChart } from '@/app/components/AnimatedVisuals';

interface Props {
  locale: Locale;
  t: TranslationType;
}

export default function BusinessIntelligenceClient({ locale, t }: Props) {
  const section = t.methodologyPage.section3;

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
                <BarChart3 className="text-accent" size={24} />
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
            <div className="bg-white border border-border p-8 rounded-lg shadow-editorial">
              <DashboardChart className="w-full h-48" />
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
              {locale === 'tr' ? 'İş Zekası Nedir?' : locale === 'it' ? 'Cos\'è la Business Intelligence?' : 'What is Business Intelligence?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr' 
                    ? 'İş zekası, şirketinizdeki tüm verileri bir araya getirip, anlamlı grafikler ve raporlar haline getirmektir. Excel tablolarıyla boğuşmak yerine, tek bir panoda tüm önemli bilgileri görebilirsiniz.'
                    : locale === 'it'
                    ? 'La business intelligence riunisce tutti i dati della tua azienda trasformandoli in grafici e report significativi. Invece di lottare con fogli Excel, puoi vedere tutte le informazioni importanti in un\'unica dashboard.'
                    : 'Business intelligence brings together all your company data and transforms it into meaningful charts and reports. Instead of struggling with Excel spreadsheets, you can see all important information in a single dashboard.'
                  }
                </p>
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'Böylece satışların nasıl gittiğini, hangi ürünlerin daha çok satıldığını veya hangi bölgelerin performansının düştüğünü anında görebilirsiniz.'
                    : locale === 'it'
                    ? 'In questo modo puoi vedere immediatamente come vanno le vendite, quali prodotti vendono di più o quali regioni stanno avendo un calo di performance.'
                    : 'This way you can instantly see how sales are going, which products sell more, or which regions are underperforming.'
                  }
                </p>
              </div>
              
              <div className="bg-surface-alt p-6 rounded-lg">
                <h3 className="font-serif text-lg text-charcoal mb-4">
                  {locale === 'tr' ? 'Gerçek Hayat Örneği' : locale === 'it' ? 'Esempio Reale' : 'Real-World Example'}
                </h3>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'Fedrigoni için geliştirdiğim panolar, yöneticilerin fabrika performansını anlık takip etmesini sağladı. Daha önce günler süren raporlama süreci artık tek tıkla hazır.'
                    : locale === 'it'
                    ? 'Le dashboard che ho sviluppato per Fedrigoni hanno permesso ai manager di monitorare le performance della fabbrica in tempo reale. Il processo di reportistica che prima richiedeva giorni ora è pronto con un solo clic.'
                    : 'The dashboards I developed for Fedrigoni enabled managers to track factory performance in real-time. The reporting process that used to take days is now ready with a single click.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Deep Dive */}
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
              {locale === 'tr' ? 'Teknik Detaylar' : locale === 'it' ? 'Dettagli Tecnici' : 'Technical Deep Dive'}
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
                {locale === 'tr' ? 'Temel Yetenekler' : locale === 'it' ? 'Capacità Chiave' : 'Key Capabilities'}
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
              {/* Technical Stack */}
              <div className="bg-charcoal p-6 rounded-lg text-cream">
                <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                  {locale === 'tr' ? 'Kullanılan Teknolojiler' : locale === 'it' ? 'Stack Tecnologico' : 'Technology Stack'}
                </h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">Visualization</span>
                    <span>PowerBI, Plotly</span>
                  </div>
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">ETL</span>
                    <span>Python, Apache Airflow</span>
                  </div>
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">Database</span>
                    <span>PostgreSQL, Snowflake</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/70">Backend</span>
                    <span>FastAPI, Streamlit</span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Features */}
              <div className="bg-white border border-border p-6 rounded-lg">
                <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
                  {locale === 'tr' ? 'Pano Özellikleri' : locale === 'it' ? 'Funzionalità Dashboard' : 'Dashboard Features'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {['KPI Tracking', 'Real-time Data', 'Drill-down', 'Export PDF'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-surface-alt rounded text-sm font-mono text-muted">
                      <Activity size={14} className="text-accent" />
                      {feature}
                    </div>
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
            {locale === 'tr' ? 'Verilerinizi Görselleştirmeye Hazır mısınız?' : locale === 'it' ? 'Pronto a Visualizzare i Tuoi Dati?' : 'Ready to Visualize Your Data?'}
          </h3>
          <p className="font-mono text-sm text-muted mb-8 max-w-xl mx-auto">
            {locale === 'tr'
              ? 'Size özel bir pano tasarlayalım ve verilerinizi değere dönüştürelim.'
              : locale === 'it'
              ? 'Progettiamo una dashboard personalizzata per te e trasformiamo i tuoi dati in valore.'
              : 'Let\'s design a custom dashboard for you and transform your data into value.'
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
