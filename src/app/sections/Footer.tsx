'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { type TranslationType, translations } from '@/lib/translations';

interface FooterProps {
  t?: TranslationType;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const trans = t || translations.en;
  
  const ctaWords = trans.footer.cta.split(' ');
  
  return (
    <footer id="contact" className="container mx-auto px-4 md:px-6 pt-20 md:pt-40 pb-12 md:pb-20 text-center relative z-10">
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
      >
        <div className="font-serif text-[clamp(2rem,12vw,8rem)] leading-[0.9] opacity-90 mb-8 md:mb-12 transition-all duration-300 hover:text-transparent hover:text-stroke-cyan cursor-default select-none">
          {ctaWords[0]}<br />{ctaWords.slice(1).join(' ')}
        </div>
        
        <a 
          href="mailto:cetinbumink@gmail.com" 
          className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.3)]"
        >
          {trans.footer.button}
        </a>
      </motion.div>

      <div className="mt-20 md:mt-40 pt-6 md:pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-text-muted font-mono uppercase tracking-wider gap-4">
        <div className="text-center md:text-left">{trans.footer.copyright}</div>
        <div className="flex gap-6 md:gap-8">
          <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">{trans.footer.linkedin}</a>
          <a href="mailto:cetinbumink@gmail.com" className="hover:text-accent-cyan transition-colors">{trans.footer.email}</a>
        </div>
      </div>
      
      <style>{`
        .hover\\:text-stroke-cyan:hover {
          -webkit-text-stroke: 1px #00f0ff;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
