'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Brain, BarChart3, Building2 } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';
import { NeuralNetwork, DashboardChart, FinanceGraph, DataFlow } from '@/app/components/AnimatedVisuals';

interface FocusAreasProps {
  t?: TranslationType;
  locale?: Locale;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const FocusAreas: React.FC<FocusAreasProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section id="focus-areas" className="py-section px-6 md:px-12 lg:px-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 -z-10"></div>
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="h-[2px] bg-accent"
              ></motion.div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {trans.methodology.label}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-serif text-heading text-charcoal"
            >
              {trans.methodology.title}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href={`/${locale}/methodology`} 
              className="group inline-flex items-center gap-2 font-mono text-sm text-charcoal hover:text-accent transition-colors link-underline"
            >
              {trans.methodology.explore}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 - Financial Analytics */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <Link 
            href={`/${locale}/services/financial-analytics`}
            className="group block bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden h-full"
          >
            {/* Animated Visual */}
            <div className="aspect-[4/3] overflow-hidden bg-surface-alt relative p-4">
              <FinanceGraph className="w-full h-full" />
              {/* Icon Overlay */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                <TrendingUp size={18} className="text-accent" />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">01</span>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-3 group-hover:text-accent transition-colors">
                {trans.methodology.card1Title}
              </h3>
              <p className="font-mono text-sm text-muted leading-relaxed mb-4">
                {trans.methodology.card1Desc}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                {trans.methodologyPage.viewDetails}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Card 2 - AI & NLP */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <Link 
            href={`/${locale}/services/ai-nlp`}
            className="group block bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden h-full"
          >
            {/* Animated Visual */}
            <div className="aspect-[4/3] overflow-hidden bg-surface-alt relative p-4">
              <NeuralNetwork className="w-full h-full" />
              {/* Icon Overlay */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                <Brain size={18} className="text-accent" />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">02</span>
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-3 group-hover:text-accent transition-colors">
                {trans.methodology.card2Title}
              </h3>
              <p className="font-mono text-sm text-muted leading-relaxed mb-4">
                {trans.methodology.card2Desc}
              </p>
              <span className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                {trans.methodologyPage.viewDetails}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Card 3 - Business Intelligence (Dark card) */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <Link 
            href={`/${locale}/services/business-intelligence`}
            className="group block bg-charcoal text-cream border-4 border-charcoal hover:bg-navy transition-all duration-300 cursor-pointer overflow-hidden h-full"
          >
            <div className="p-6 md:p-8 flex flex-col justify-between min-h-[400px] relative">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <DashboardChart className="w-full h-full" />
              </div>
              
              {/* Top */}
              <div className="relative">
                <div className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 size={18} className="text-accent" />
                </div>
                <span className="font-mono text-xs text-cream/60 uppercase tracking-wider">03</span>
                <h3 className="font-serif text-xl md:text-2xl text-cream mt-2 mb-4">
                  {trans.methodology.card3Title}
                </h3>
                <p className="font-mono text-sm text-cream/70 leading-relaxed">
                  {trans.methodology.card3Desc}
                </p>
              </div>
              
              {/* Bottom CTA */}
              <span className="inline-flex items-center gap-2 font-mono text-sm text-cream mt-8 group-hover:text-accent transition-colors relative">
                {trans.methodologyPage.viewDetails}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Card 4 - Financial Consultancy (Wide card) */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="md:col-span-2 lg:col-span-2"
        >
          <Link 
            href={`/${locale}/services/financial-consultancy`}
            className="group block bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Content */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
                <div className="w-10 h-10 bg-surface-alt rounded-full flex items-center justify-center mb-4">
                  <Building2 size={18} className="text-accent" />
                </div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">04</span>
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal mt-2 mb-4 group-hover:text-accent transition-colors">
                  {trans.methodology.card4Title}
                </h3>
                <p className="font-mono text-sm text-muted leading-relaxed mb-6">
                  {trans.methodology.card4Desc}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-wider">
                  {trans.methodologyPage.viewDetails}
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              
              {/* Visual Element */}
              <div className="bg-surface-alt p-8 flex items-center justify-center order-1 md:order-2 relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(232,93,4,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(232,93,4,0.1) 0%, transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(232,93,4,0.1) 0%, transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                ></motion.div>
                
                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-muted relative">
                  {[
                    { value: '4+', label: locale === 'tr' ? 'Yıl Deneyim' : locale === 'it' ? 'Anni Esperienza' : 'Years Experience' },
                    { value: '7+', label: locale === 'tr' ? 'Sertifika' : locale === 'it' ? 'Certificazioni' : 'Certifications' },
                    { value: '3', label: locale === 'tr' ? 'Ülke' : locale === 'it' ? 'Paesi' : 'Countries' },
                    { value: '∞', label: locale === 'tr' ? 'Merak' : locale === 'it' ? 'Curiosità' : 'Curiosity' },
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: 'rgb(232, 93, 4)' }}
                      className="text-center p-4 border border-border bg-white transition-all duration-300"
                    >
                      <div className="text-2xl font-serif text-charcoal mb-1">{stat.value}</div>
                      <div>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 5 - Tech Stack (Single column) */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="bg-surface-alt border border-border p-6 md:p-8 hover:border-charcoal transition-all duration-300"
        >
          <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-6">
            {locale === 'tr' ? 'Teknoloji Yığını' : locale === 'it' ? 'Stack Tecnologico' : 'Technology Stack'}
          </h4>
          <div className="space-y-3 font-mono text-sm">
            {[
              { tech: 'Python', detail: 'PyTorch, TensorFlow' },
              { tech: 'R', detail: locale === 'tr' ? 'İstatistik Analizi' : locale === 'it' ? 'Analisi Statistica' : 'Statistical Analysis' },
              { tech: 'SQL', detail: 'PostgreSQL, Snowflake' },
              { tech: 'Cloud', detail: 'Docker, Git' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex justify-between items-center py-2 border-b border-border hover:border-accent transition-colors cursor-default"
              >
                <span className="text-charcoal font-medium">{item.tech}</span>
                <span className="text-muted">{item.detail}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FocusAreas;
