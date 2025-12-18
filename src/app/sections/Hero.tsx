'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface HeroProps {
  t?: TranslationType;
  locale?: Locale;
}

const Hero: React.FC<HeroProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4 pt-20 md:pt-0">
      
      {/* Crystal Animation - Smaller on mobile */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-[180px] h-[180px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] mb-8 md:mb-12 perspective-1000"
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
        className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 md:mb-6 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent leading-tight px-2"
      >
        {trans.hero.title1} <br className="md:hidden" /><span className="hidden md:inline"> </span>{trans.hero.title2}
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-sm sm:text-base md:text-lg lg:text-xl text-text-muted mb-8 md:mb-12 max-w-xs sm:max-w-md md:max-w-xl px-4"
      >
        {trans.hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <a 
          href="#services" 
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-accent-cyan text-void font-mono font-semibold text-xs md:text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
        >
          {trans.hero.cta}
        </a>
        <a 
          href="mailto:cetinbumink@gmail.com" 
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/5 border border-glass-border text-text-primary font-mono text-xs md:text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-accent-cyan/50"
        >
          {trans.nav.contact}
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
