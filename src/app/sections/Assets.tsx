'use client';

import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Brain, BarChart3, Cpu, Vote, ArrowRight } from 'lucide-react';

const Assets: React.FC = () => {
  const assets = [
    {
      icon: Brain,
      title: "Greenwashing Detection",
      desc: "AI-powered toolkit for detecting greenwashing in corporate sustainability communications using NLP.",
      action: "View Repository",
      url: "https://github.com/bumincetin/greenwashing-detection",
      stars: 1
    },
    {
      icon: Cpu,
      title: "Garbage Classification",
      desc: "Deep learning project using CNN and YOLO models for garbage classification on the TACO dataset.",
      action: "View Repository",
      url: "https://github.com/bumincetin/Garbage-Classification-",
      stars: 2
    },
    {
      icon: Vote,
      title: "Turkish Election 2023",
      desc: "Bachelor thesis predicting parliamentary seat distribution for the Turkish General Election using ML.",
      action: "View Repository",
      url: "https://github.com/bumincetin/TurkishElection2023",
      stars: 1
    },
    {
      icon: BarChart3,
      title: "ML Algorithm Comparison",
      desc: "Final project comparing machine learning algorithms' accuracy and performance metrics.",
      action: "View Repository",
      url: "https://github.com/bumincetin/Machine_Learning_FinalProject",
      stars: 0
    }
  ];

  return (
    <section id="products" className="py-32 container mx-auto px-6">
      <div className="mb-16">
        <p className="text-accent-cyan font-mono mb-4">02 // PROJECTS</p>
        <h2 className="font-serif text-5xl md:text-6xl text-text-primary">Open Source Work</h2>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory">
        {assets.map((asset, idx) => (
          <a 
            key={idx} 
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <GlassCard className="min-w-[320px] md:min-w-[380px] h-[400px] p-10 flex flex-col justify-end relative shrink-0 snap-center group cursor-pointer">
              <div className="absolute top-8 left-8 w-[60px] h-[60px] border border-glass-highlight rounded-xl flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors">
                <asset.icon size={24} />
              </div>
              
              {asset.stars > 0 && (
                <div className="absolute top-8 right-8 flex items-center gap-1 text-text-muted text-sm font-mono">
                  ⭐ {asset.stars}
                </div>
              )}
              
              <h3 className="text-2xl font-serif mb-2">{asset.title}</h3>
              <p className="text-text-muted text-sm">{asset.desc}</p>
              
              <div className="mt-8 flex items-center gap-2 text-sm text-accent-cyan font-mono uppercase tracking-wider group-hover:gap-4 transition-all">
                {asset.action} <ArrowRight size={16} />
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Assets;
