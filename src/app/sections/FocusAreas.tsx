'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface FocusAreasProps {
  t?: TranslationType;
  locale?: Locale;
}

const FocusAreas: React.FC<FocusAreasProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  return (
    <section id="focus-areas" className="py-section px-6 md:px-12 lg:px-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {trans.methodology.label}
              </span>
            </div>
            <h2 className="font-serif text-heading text-charcoal">
              {trans.methodology.title}
            </h2>
          </div>
          <Link 
            href={`/${locale}/methodology`} 
            className="group inline-flex items-center gap-2 font-mono text-sm text-charcoal hover:text-accent transition-colors link-underline"
          >
            {trans.methodology.explore}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 - Data Science (with bumin2.png) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="group bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer"
        >
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
            <img 
              src="/bumin2.png" 
              alt="Data Science" 
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">01</span>
            <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-3 group-hover:text-accent transition-colors">
              {trans.methodology.card1Title}
            </h3>
            <p className="font-mono text-sm text-muted leading-relaxed">
              {trans.methodology.card1Desc}
            </p>
          </div>
        </motion.div>

        {/* Card 2 - Financial Tech (with bumin3.png) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer"
        >
          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
            <img 
              src="/bumin3.png" 
              alt="Financial Technology" 
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">02</span>
            <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-2 mb-3 group-hover:text-accent transition-colors">
              {trans.methodology.card2Title}
            </h3>
            <p className="font-mono text-sm text-muted leading-relaxed">
              {trans.methodology.card2Desc}
            </p>
          </div>
        </motion.div>

        {/* Card 3 - Methodology (Text-only with strong border) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group bg-charcoal text-cream border-4 border-charcoal hover:bg-navy transition-all duration-300 cursor-pointer flex flex-col"
        >
          <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[300px] md:min-h-[400px]">
            {/* Top */}
            <div>
              <span className="font-mono text-xs text-cream/60 uppercase tracking-wider">03</span>
              <h3 className="font-serif text-xl md:text-2xl text-cream mt-2 mb-4">
                {trans.methodology.card3Title}
              </h3>
              <p className="font-mono text-sm text-cream/70 leading-relaxed">
                {trans.methodology.card3Desc}
              </p>
            </div>
            
            {/* Bottom CTA */}
            <Link 
              href={`/${locale}/methodology`}
              className="inline-flex items-center gap-2 font-mono text-sm text-cream mt-8 group-hover:text-accent transition-colors"
            >
              View Research
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Card 4 - Consultancy (Wide card spanning 2 columns on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="group md:col-span-2 lg:col-span-2 bg-white border border-border hover:border-charcoal hover:shadow-card-hover transition-all duration-300 cursor-pointer"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
              <span className="font-mono text-xs text-muted uppercase tracking-wider">04</span>
              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal mt-2 mb-4 group-hover:text-accent transition-colors">
                {trans.methodology.card4Title}
              </h3>
              <p className="font-mono text-sm text-muted leading-relaxed mb-6">
                {trans.methodology.card4Desc}
              </p>
              <a 
                href="mailto:cetinbumink@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-charcoal hover:text-accent transition-colors"
              >
                Contact Me
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Visual Element */}
            <div className="bg-surface-alt p-8 flex items-center justify-center order-1 md:order-2">
              <div className="grid grid-cols-2 gap-4 font-mono text-xs text-muted">
                <div className="text-center p-4 border border-border">
                  <div className="text-2xl font-serif text-charcoal mb-1">4+</div>
                  <div>Years Experience</div>
                </div>
                <div className="text-center p-4 border border-border">
                  <div className="text-2xl font-serif text-charcoal mb-1">7+</div>
                  <div>Certifications</div>
                </div>
                <div className="text-center p-4 border border-border">
                  <div className="text-2xl font-serif text-charcoal mb-1">3</div>
                  <div>Countries</div>
                </div>
                <div className="text-center p-4 border border-border">
                  <div className="text-2xl font-serif text-charcoal mb-1">∞</div>
                  <div>Curiosity</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 5 - Quick Stats (Single column) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-surface-alt border border-border p-6 md:p-8"
        >
          <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-6">Technology Stack</h4>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal">Python</span>
              <span className="text-muted">PyTorch, TensorFlow</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal">R</span>
              <span className="text-muted">Statistical Analysis</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-charcoal">SQL</span>
              <span className="text-muted">PostgreSQL, Snowflake</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-charcoal">Cloud</span>
              <span className="text-muted">Docker, Git</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FocusAreas;
