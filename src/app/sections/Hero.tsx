'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type Locale, translations } from '@/lib/translations';

type TranslationType = typeof translations.en;

interface HeroProps {
  t?: TranslationType;
  locale?: Locale;
}

const Hero: React.FC<HeroProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      
      {/* Crystal Animation */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-[300px] h-[300px] mb-12 perspective-1000"
      >
        <div className="w-full h-full rounded-full border border-white/15 animate-breathe relative
          shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]">
          
          {/* Outer Ring */}
          <div className="absolute inset-[-10px] rounded-full border border-white/5 animate-spin-slow" />
          
          {/* Inner Ring */}
          <div className="absolute inset-[20px] rounded-full border border-dashed border-white/10 animate-spin-reverse" />
        </div>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-serif text-5xl md:text-7xl lg:text-8xl mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent"
      >
        {trans.hero.title1} <br />{trans.hero.title2}
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl text-text-muted mb-12 max-w-xl"
      >
        {trans.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <a 
          href="#products" 
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-glass-highlight text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-text-primary hover:text-void hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          {trans.hero.cta}
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
