'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface AboutProps {
  t?: TranslationType;
  locale?: Locale;
}

const About: React.FC<AboutProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section id="about" className="py-16 md:py-32 container mx-auto px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] max-h-[400px] md:max-h-[600px] bg-neutral-900 rounded-[16px] md:rounded-[20px] overflow-hidden relative border border-glass-border group order-2 lg:order-1"
        >
          <img 
            src="/personal-portfolio/Bumin_resmi.jpeg" 
            alt="Bumin Kağan Çetin" 
            className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
          />
        </motion.div>

        {/* Content */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="order-1 lg:order-2"
        >
          <p className="text-accent-cyan font-mono mb-2 md:mb-4 tracking-widest text-xs md:text-sm">{trans.about.label}</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 md:mb-8 leading-tight">{trans.about.title}</h2>
          <p className="text-text-muted text-sm md:text-lg mb-4 md:mb-6 font-light">
            {trans.about.desc1}
          </p>
          <p className="text-text-muted text-sm md:text-lg mb-6 md:mb-10 font-light">
            {trans.about.desc2}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-text-primary font-mono text-xs md:text-sm mb-6 md:mb-8">
            <li className="flex items-center gap-2 md:gap-3"><Check size={14} className="text-accent-cyan flex-shrink-0" /> <span>{trans.about.credential1}</span></li>
            <li className="flex items-center gap-2 md:gap-3"><Check size={14} className="text-accent-cyan flex-shrink-0" /> <span>{trans.about.credential2}</span></li>
            <li className="flex items-center gap-2 md:gap-3"><Check size={14} className="text-accent-cyan flex-shrink-0" /> <span>{trans.about.credential3}</span></li>
            <li className="flex items-center gap-2 md:gap-3"><Check size={14} className="text-accent-cyan flex-shrink-0" /> <span>{trans.about.credential4}</span></li>
          </ul>

          <Link href={`/${locale}/about`} className="group inline-flex items-center gap-2 text-accent-cyan font-mono uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors">
            {trans.about.viewBio} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
