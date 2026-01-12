'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface AboutProps {
  t?: TranslationType;
  locale?: Locale;
}

const About: React.FC<AboutProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section id="about" className="py-section px-6 md:px-12 lg:px-16 bg-surface-alt">
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
              {/* Portrait Frame */}
              <div className="relative aspect-[4/5]">
                {/* Offset decorative border */}
                <div className="absolute top-6 left-6 right-0 bottom-0 border-2 border-accent -z-10"></div>
                
                {/* Main Image */}
                <div className="relative bg-white overflow-hidden shadow-editorial">
                  <img 
                    src="/Bumin_resmi.jpeg" 
                    alt="Bumin Kağan Çetin" 
                    className="w-full h-full object-cover aspect-[4/5]"
                  />
                </div>
              </div>
              
              {/* Caption */}
              <div className="mt-6 font-mono text-xs text-muted">
                <p className="uppercase tracking-wider">Bumin Kağan Çetin</p>
                <p className="mt-1">Milan, Italy — 2025</p>
              </div>
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {trans.about.label}
              </span>
            </div>
            
            {/* Headline */}
            <h2 className="font-serif text-heading text-charcoal mb-8 leading-tight">
              {trans.about.title}
            </h2>
            
            {/* Bio */}
            <div className="space-y-4 mb-10">
              <p className="font-mono text-sm md:text-base text-muted leading-relaxed">
                {trans.about.desc1}
              </p>
              <p className="font-mono text-sm md:text-base text-muted leading-relaxed">
                {trans.about.desc2}
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[trans.about.credential1, trans.about.credential2, trans.about.credential3, trans.about.credential4].map((credential, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 py-3 border-b border-border"
                >
                  <Check size={16} className="text-accent flex-shrink-0" />
                  <span className="font-mono text-sm text-charcoal">{credential}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link 
              href={`/${locale}/about`} 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy"
            >
              {trans.about.viewBio}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
