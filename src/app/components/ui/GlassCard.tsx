'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EditorialCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const EditorialCard: React.FC<EditorialCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        bg-white border border-border
        ${hover ? 'hover:shadow-editorial hover:-translate-y-1' : ''}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

// Keep the old name for backwards compatibility
export default EditorialCard;
