'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Envelope as Mail, LinkedinLogo as Linkedin, GithubLogo as Github, ChatCircle as MessageCircle } from 'phosphor-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';
import { BookingModal } from '@/app/components/BookingModal';

interface FooterProps {
  t?: TranslationType;
  locale?: Locale;
}

const Footer: React.FC<FooterProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
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
                {trans.footer.ctaTitle}
              </h2>
              <p className="font-mono text-sm text-cream/70 max-w-lg">
                {trans.footer.ctaDesc}
              </p>
            </div>
            
            {/* Right - Contact Button */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-accent text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90"
              >
                {trans.footer.button}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* Quick Contact */}
              <div className="flex flex-col gap-2 font-mono text-sm text-cream/60">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="hover:text-cream transition-colors text-left"
                >
                  cetinbumink@gmail.com
                </button>
                <a
                  href="https://wa.me/393481705207"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-cream transition-colors text-left group"
                >
                  <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
                  <span>+39 348 170 5207</span>
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
                href="https://wa.me/393481705207"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-xs text-cream/50 hover:text-cream transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
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
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={trans}
      />
    </footer>
  );
};

export default Footer;
