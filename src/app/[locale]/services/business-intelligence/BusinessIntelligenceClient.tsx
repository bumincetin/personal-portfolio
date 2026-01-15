'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChartBar as BarChart3, ChartPie as PieChart, Activity, Database, CheckCircle } from 'phosphor-react';
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

      {/* Expanded Description Section */}
      <section className="bg-white py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-lg max-w-none">
              <p className="font-mono text-base md:text-lg text-charcoal leading-relaxed whitespace-pre-line">
                {section.expandedDesc}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-surface-alt py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {section.useCases.title}
              </span>
            </div>
            
            <div className="space-y-12">
              {section.useCases.scenarios.map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-white border border-border p-8 md:p-10 rounded-lg"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-lg text-accent">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                        {locale === 'tr' ? 'Sorun' : locale === 'it' ? 'Problema' : 'Problem'}
                      </h4>
                      <p className="font-mono text-sm text-muted leading-relaxed">
                        {useCase.problem}
                      </p>
                    </div>
                    
                    <div className="md:col-span-1">
                      <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                        {locale === 'tr' ? 'Çözüm' : locale === 'it' ? 'Soluzione' : 'Solution'}
                      </h4>
                      <p className="font-mono text-sm text-muted leading-relaxed">
                        {useCase.solution}
                      </p>
                    </div>
                    
                    <div className="md:col-span-1">
                      <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
                        {locale === 'tr' ? 'Fayda' : locale === 'it' ? 'Beneficio' : 'Benefit'}
                      </h4>
                      <p className="font-mono text-sm text-muted leading-relaxed">
                        {useCase.benefit}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                {t.methodologyPage.keyCapabilities}
              </h3>
              <ul className="space-y-3">
                {section.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
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

      {/* Closing Message */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal text-cream p-8 md:p-12 rounded-lg text-center"
        >
          <p className="font-serif text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            {section.closingMessage}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
