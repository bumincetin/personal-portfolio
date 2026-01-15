'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'phosphor-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';
import { BookingModal } from '@/app/components/BookingModal';

interface HeroProps {
  t?: TranslationType;
  locale?: Locale;
}

const Hero: React.FC<HeroProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-24 lg:pt-0 relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 -z-10"></div>
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            {/* Editorial Label */}
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="h-[2px] bg-accent"
              ></motion.div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {trans.hero.subtitle}
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal mb-8 leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block"
              >
                {trans.hero.title1}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-muted-light"
              >
                {trans.hero.title2}
              </motion.span>
            </h1>
            
            {/* Credentials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-10 font-mono text-sm text-muted"
            >
              <span className="border-r border-border pr-4">M.Sc. Data Science</span>
              <span className="border-r border-border pr-4">Bocconi University</span>
              <span>AI Specialist</span>
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#focus-areas" 
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy hover:shadow-editorial"
              >
                {trans.hero.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-charcoal text-charcoal font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-charcoal hover:text-cream"
              >
                {trans.nav.contact}
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[450px] lg:max-w-[500px]">
              {/* Decorative Background Elements */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-full -z-10"
              ></motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 w-20 h-20 border-2 border-accent/30 -z-10"
              ></motion.div>
              
              {/* Image Container with Editorial Frame */}
              <div className="relative">
                {/* Outer Frame */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -inset-3 border border-border bg-surface-alt -z-10"
                ></motion.div>
                
                {/* Accent Corner */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 50 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="absolute -top-3 -left-3 h-[3px] bg-accent"
                ></motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 50 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="absolute -top-3 -left-3 w-[3px] bg-accent"
                ></motion.div>
                
                {/* Main Image */}
                <div className="relative bg-white overflow-hidden shadow-editorial">
                  <img 
                    src="bumin1.png" 
                    alt="Bumin Kağan Çetin - Data Scientist" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              
              {/* Caption */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-4 flex items-center justify-between font-mono text-xs text-muted"
              >
                <span>Data Science × Financial Analytics</span>
                <span className="text-accent">→</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={trans}
      />
    </section>
  );
};

export default Hero;
