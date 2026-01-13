'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { getTranslation, type Locale } from '@/lib/translations';

export default function MethodologyPageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);
  const mp = t.methodologyPage;

  const sections = [
    { ...mp.section1, color: 'accent', href: `/${locale}/services/financial-analytics` },
    { ...mp.section2, color: 'navy', href: `/${locale}/services/ai-nlp` },
    { ...mp.section3, color: 'accent', href: `/${locale}/services/business-intelligence` },
    { ...mp.section4, color: 'navy', href: `/${locale}/services/financial-consultancy` },
  ];

  const processSteps = [
    { title: mp.process.step1Title, desc: mp.process.step1Desc, num: '01' },
    { title: mp.process.step2Title, desc: mp.process.step2Desc, num: '02' },
    { title: mp.process.step3Title, desc: mp.process.step3Desc, num: '03' },
    { title: mp.process.step4Title, desc: mp.process.step4Desc, num: '04' },
  ];

  const stackCategories = [
    { label: mp.stackLangs, items: ['Python', 'R', 'SQL', 'NoSQL'] },
    { label: mp.stackIntel, items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Transformers'] },
    { label: mp.stackDeploy, items: ['Docker', 'Git', 'Apache Airflow', 'Cloud'] },
    { label: mp.stackViz, items: ['PowerBI', 'Plotly', 'Matplotlib', 'Seaborn'] },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 bg-cream">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {mp.label}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 max-w-4xl">
            {mp.title}
          </h1>
          
          <p className="font-mono text-base md:text-lg text-muted max-w-3xl leading-relaxed">
            {mp.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-[2px] bg-accent"></div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {mp.servicesLabel}
          </span>
        </div>

        <div className="space-y-12 md:space-y-16">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Number & Title */}
              <div className={`lg:col-span-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <span className="font-serif text-6xl md:text-7xl text-border">{section.num}</span>
                <Link href={section.href} className="group block">
                  <h3 className="font-serif text-2xl md:text-3xl text-charcoal mt-2 mb-3 group-hover:text-accent transition-colors">
                    {section.title}
                  </h3>
                </Link>
                <p className="font-mono text-xs uppercase tracking-wider text-muted">
                  {section.arch}
                </p>
              </div>

              {/* Content */}
              <div className={`lg:col-span-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-white border border-border p-6 md:p-8 hover:border-charcoal hover:shadow-editorial transition-all duration-300">
                  <p className="font-mono text-sm text-muted leading-relaxed mb-4">
                    {section.desc1}
                  </p>
                  <p className="font-mono text-sm text-muted leading-relaxed mb-6">
                    {section.desc2}
                  </p>
                  
                  <div className="border-t border-border pt-6">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-charcoal mb-4">
                      {mp.keyCapabilities}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {section.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 font-mono text-sm text-muted">
                          <Check size={14} className="text-accent mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      href={section.href}
                      className="group inline-flex items-center gap-2 font-mono text-sm text-accent hover:text-charcoal transition-colors"
                    >
                      {mp.viewDetails}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface-alt py-16 md:py-24 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {mp.processLabel}
              </span>
              <div className="w-12 h-[2px] bg-accent"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              {mp.processTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-border p-6 relative"
              >
                <span className="font-mono text-xs text-accent mb-4 block">{step.num}</span>
                <h4 className="font-serif text-xl text-charcoal mb-3">{step.title}</h4>
                <p className="font-mono text-sm text-muted leading-relaxed">{step.desc}</p>
                
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight size={16} className="text-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {mp.stack}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stackCategories.map((category, idx) => (
              <div key={idx} className="bg-white border border-border p-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-4">
                  {category.label}
                </h4>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="font-mono text-sm text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
