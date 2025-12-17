'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        bg-glass-surface backdrop-blur-xl border border-glass-border rounded-xl
        hover:border-glass-highlight hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]
        hover:-translate-y-1 transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

