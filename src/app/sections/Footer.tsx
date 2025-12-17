'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="container mx-auto px-6 pt-40 pb-20 text-center relative z-10">
      <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
      >
        <div className="font-serif text-[clamp(3rem,10vw,8rem)] leading-[0.9] opacity-90 mb-12 transition-all duration-300 hover:text-transparent hover:text-stroke-cyan cursor-default select-none">
          OPTIMIZE<br />NOW
        </div>
        
        <a 
          href="mailto:cetinbumink@gmail.com" 
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.3)]"
        >
          Initiate Protocol
        </a>
      </motion.div>

      <div className="mt-40 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center text-xs text-text-muted font-mono uppercase tracking-wider gap-4">
        <div>&copy; 2025 Bumin Kağan Çetin. All Systems Operational.</div>
        <div className="flex gap-8">
          <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">LinkedIn</a>
          <a href="mailto:cetinbumink@gmail.com" className="hover:text-accent-cyan transition-colors">Email</a>
        </div>
      </div>
      
      {/* CSS Utility for text stroke effect since Tailwind doesn&apos;t have it built-in standardized yet */}
      <style>{`
        .hover\\:text-stroke-cyan:hover {
          -webkit-text-stroke: 1px #00f0ff;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
