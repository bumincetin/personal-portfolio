'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

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
            I&apos;m a Data Scientist and AI Specialist at Bocconi University, specializing in NLP and deep learning. As CEO & Co-Founder of Alvolo Consulting, I bridge cross-border investment advisory with machine learning solutions.
          </p>
          <p className="text-text-muted text-lg mb-10 font-light">
            My research focuses on detecting greenwashing risks in corporate communications using fine-tuned transformer models.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-primary font-mono text-sm mb-8">
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> M.Sc. Data Science @ Bocconi</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> AI Specialist @ ImpactScope</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> NLP & Deep Learning</li>
            <li className="flex items-center gap-3"><Check size={16} className="text-accent-cyan" /> Founder, Alvolo Consulting</li>
          </ul>

          <Link href="/about" className="group inline-flex items-center gap-2 text-accent-cyan font-mono uppercase tracking-widest text-sm hover:text-white transition-colors">
            View Full Bio <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
