'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface HeroProps {
  t?: TranslationType;
  locale?: Locale;
}

const Hero: React.FC<HeroProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 px-6 md:px-12 lg:px-16 pt-32 lg:pt-0 lg:items-center">
      
      {/* Left Column - Text Content */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Editorial Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {trans.hero.subtitle}
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-serif text-display text-charcoal mb-8 leading-[1.1]">
            {trans.hero.title1}
            <br />
            <span className="text-muted-light">{trans.hero.title2}</span>
          </h1>
          
          {/* Credentials */}
          <div className="flex flex-wrap gap-4 mb-10 font-mono text-sm text-muted">
            <span className="border-r border-border pr-4">M.Sc. Data Science</span>
            <span className="border-r border-border pr-4">Bocconi University</span>
            <span>AI Specialist</span>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#focus-areas" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy"
            >
              {trans.hero.cta}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="mailto:cetinbumink@gmail.com" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-charcoal text-charcoal font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-charcoal hover:text-cream"
            >
              {trans.nav.contact}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Column - Image */}
      <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center lg:justify-end order-1 lg:order-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
        >
          {/* Image Container with Editorial Frame */}
          <div className="relative aspect-[4/5] w-full">
            {/* Offset Border */}
            <div className="absolute top-4 right-4 bottom-4 left-4 border border-border-dark -z-10"></div>
            
            {/* Main Image */}
            <div className="relative w-full h-full bg-surface-alt overflow-hidden">
              <img 
                src="/bumin1.png" 
                alt="Bumin Kağan Çetin - Data Scientist" 
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
          
          {/* Caption */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 font-mono text-xs text-muted text-right"
          >
            Data Science × Financial Analytics
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
