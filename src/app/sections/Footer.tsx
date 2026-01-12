'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { type TranslationType, translations } from '@/lib/translations';

interface FooterProps {
  t?: TranslationType;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const trans = t || translations.en;
  
  return (
    <footer id="contact" className="bg-charcoal text-cream">
      {/* CTA Section */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left - CTA Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-accent"></div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/60">
                  {trans.footer.cta}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6">
                Ready to transform your data into insights?
              </h2>
              <p className="font-mono text-sm text-cream/70 max-w-lg">
                Whether you need financial analytics, AI solutions, or strategic consulting—let's discuss how we can work together.
              </p>
            </div>
            
            {/* Right - Contact Button */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <a 
                href="mailto:cetinbumink@gmail.com" 
                className="group inline-flex items-center gap-3 px-10 py-5 bg-accent text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90"
              >
                {trans.footer.button}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              {/* Quick Contact */}
              <div className="flex flex-col gap-2 font-mono text-sm text-cream/60">
                <a href="mailto:cetinbumink@gmail.com" className="hover:text-cream transition-colors">
                  cetinbumink@gmail.com
                </a>
                <span>Milan, Italy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="font-mono text-xs text-cream/50">
              {trans.footer.copyright}
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a 
                href="https://linkedin.com/in/buminkcetin" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 font-mono text-xs text-cream/50 hover:text-cream transition-colors"
              >
                <Linkedin size={14} />
                {trans.footer.linkedin}
              </a>
              <a 
                href="https://github.com/bumincetin" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 font-mono text-xs text-cream/50 hover:text-cream transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
              <a 
                href="mailto:cetinbumink@gmail.com" 
                className="flex items-center gap-2 font-mono text-xs text-cream/50 hover:text-cream transition-colors"
              >
                <Mail size={14} />
                {trans.footer.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
