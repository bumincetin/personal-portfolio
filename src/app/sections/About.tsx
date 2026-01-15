'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'phosphor-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface AboutProps {
  t?: TranslationType;
  locale?: Locale;
}

const About: React.FC<AboutProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section id="about" className="py-section px-6 md:px-12 lg:px-16 bg-surface-alt relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-2xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              {/* Background Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -inset-6 bg-white border border-border -z-10"
              ></motion.div>
              
              {/* Portrait Frame */}
              <div className="relative">
                {/* Offset decorative border */}
                <motion.div 
                  initial={{ opacity: 0, x: 10, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute top-6 left-6 right-0 bottom-0 border-2 border-accent -z-10"
                ></motion.div>
                
                {/* Main Image */}
                <div className="relative bg-white overflow-hidden shadow-editorial aspect-[4/5]">
                  <img 
                    src="Bumin_resmi.jpeg" 
                    alt="Bumin Kağan Çetin" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
                </div>
                
                {/* Decorative corner accent */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -bottom-3 -right-3 h-[3px] bg-accent"
                ></motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: 80 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -bottom-3 -right-3 w-[3px] bg-accent"
                ></motion.div>
              </div>
              
              {/* Caption */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 p-4 bg-white border border-border"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-charcoal">Bumin Kağan Çetin</p>
                <p className="font-mono text-xs text-muted mt-1">Milan, Italy — 2025</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            {/* Section Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="h-[2px] bg-accent"
              ></motion.div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {trans.about.label}
              </span>
            </motion.div>
            
            {/* Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif text-heading text-charcoal mb-8 leading-tight"
            >
              {trans.about.title}
            </motion.h2>
            
            {/* Bio */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-4 mb-10"
            >
              <p className="font-mono text-sm md:text-base text-muted leading-relaxed">
                {trans.about.desc1}
              </p>
              <p className="font-mono text-sm md:text-base text-muted leading-relaxed">
                {trans.about.desc2}
              </p>
            </motion.div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[trans.about.credential1, trans.about.credential2, trans.about.credential3, trans.about.credential4].map((credential, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                  className="flex items-center gap-3 py-3 border-b border-border hover:border-accent transition-colors"
                >
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span className="font-mono text-sm text-charcoal">{credential}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link 
                href={`/${locale}/about`} 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy hover:shadow-editorial"
              >
                {trans.about.viewBio}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
