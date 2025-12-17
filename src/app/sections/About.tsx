'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Visual */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="aspect-[4/5] bg-neutral-900 rounded-[20px] overflow-hidden relative border border-glass-border group"
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
        >
          <p className="text-accent-cyan font-mono mb-4 tracking-widest text-sm">THE HUMAN VARIABLE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">Bridging the gap between code and capital.</h2>
          <p className="text-text-muted text-lg mb-6 font-light">
            I don&apos;t just analyze numbers; I architect the systems that make them understandable. As CEO & Co-Founder of Alvolo Consulting, I specialize in cross-border investment advisory and machine learning solutions.
          </p>
          <p className="text-text-muted text-lg mb-10 font-light">
            My research focuses on NLP applications in finance, including greenwashing detection and sentiment analysis for market prediction.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-primary font-mono text-sm">
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> Data Science @ Bocconi</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> CEO, Alvolo Consulting</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> NLP & Deep Learning</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> Python & TensorFlow</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
