'use client';

import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Box, Video, FileText, ArrowRight } from 'lucide-react';

const Assets: React.FC = () => {
  const assets = [
    {
      icon: Box,
      title: "The Quant's Toolkit",
      desc: "A library of Python scripts for market analysis.",
      action: "Access Repository"
    },
    {
      icon: Video,
      title: "Financial Data Masterclass",
      desc: "4-week intensive course on modeling.",
      action: "Enroll Now"
    },
    {
      icon: FileText,
      title: "Private Consulting",
      desc: "Bespoke strategy for institutional clients.",
      action: "Inquire"
    }
  ];

  return (
    <section id="products" className="py-32 container mx-auto px-6">
      <div className="mb-16">
        <p className="text-accent-cyan font-mono mb-4">02 // ASSETS</p>
        <h2 className="font-serif text-5xl md:text-6xl text-text-primary">Intelligence for Sale</h2>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
        {assets.map((asset, idx) => (
          <GlassCard key={idx} className="min-w-[320px] md:min-w-[380px] h-[400px] p-10 flex flex-col justify-end relative shrink-0 snap-center group cursor-pointer">
            <div className="absolute top-8 left-8 w-[60px] h-[60px] border border-glass-highlight rounded-xl flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors">
              <asset.icon size={24} />
            </div>
            
            <h3 className="text-2xl font-serif mb-2">{asset.title}</h3>
            <p className="text-text-muted text-sm">{asset.desc}</p>
            
            <div className="mt-8 flex items-center gap-2 text-sm text-accent-cyan font-mono uppercase tracking-wider group-hover:gap-4 transition-all">
              {asset.action} <ArrowRight size={16} />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Assets;

