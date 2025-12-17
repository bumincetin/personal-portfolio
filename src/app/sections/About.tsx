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
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
            alt="Portrait" 
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
            I don&apos;t just analyze numbers; I architect the systems that make them understandable. With a background in Data Science and years on the trading floor, I operate at the intersection of technical rigor and strategic foresight.
          </p>
          <p className="text-text-muted text-lg mb-10 font-light">
            My mission is to equip you with the tools to navigate a chaotic market with the precision of an algorithm.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-primary font-mono text-sm">
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> M.S. Data Science</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> CFA Charterholder</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> Python Expert</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> 10+ Years Exp.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
