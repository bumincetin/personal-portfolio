'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from '../components/ui/GlassCard';
import { Brain, BarChart3, Cpu, Vote, ArrowRight } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';

interface AssetsProps {
  t?: TranslationType;
  locale?: Locale;
}

const Assets: React.FC<AssetsProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  
  const assets = [
    {
      icon: Brain,
      title: "Greenwashing Detection",
      desc: "AI-powered toolkit for detecting greenwashing in corporate sustainability communications using NLP.",
      action: trans.assets.viewRepo,
      url: "https://github.com/bumincetin/greenwashing-detection",
      stars: 1
    },
    {
      icon: Cpu,
      title: "Multi-Task Waste Recognition",
      desc: "Deep learning project using CNN and YOLO models for garbage classification on the TACO dataset.",
      action: trans.assets.viewRepo,
      url: "https://github.com/mrliu1212/Multi-Task-Waste-Recognition",
      stars: 2
    },
    {
      icon: Vote,
      title: "Turkish Election 2023",
      desc: "Bachelor thesis predicting parliamentary seat distribution for the Turkish General Election using ML.",
      action: trans.assets.viewRepo,
      url: "https://github.com/bumincetin/TurkishElection2023",
      stars: 1
    },
    {
      icon: BarChart3,
      title: "MaliBot",
      desc: "MaliBot is an intelligent accounting assistant that helps with various accounting tasks.",
      action: trans.assets.viewProject,
      url: "https://github.com/bumincetin/MaliBot-Agent",
      stars: 0
    }
  ];

  return (
    <section id="products" className="py-16 md:py-32 container mx-auto px-4 md:px-6">
      <div className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
        <div>
          <p className="text-accent-cyan font-mono mb-2 md:mb-4 text-xs md:text-base">{trans.assets.label}</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary">{trans.assets.title}</h2>
        </div>
        <Link href={`/${locale}/assets`} className="group flex items-center gap-2 text-accent-cyan font-mono uppercase tracking-widest text-xs md:text-sm hover:text-white transition-colors">
          {trans.assets.viewAll} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
        </Link>
      </div>

      {/* Mobile: Vertical Stack, Desktop: Horizontal Scroll */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:overflow-x-auto md:pb-12 md:no-scrollbar md:snap-x md:snap-mandatory">
        {assets.map((asset, idx) => (
          <a 
            key={idx} 
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full md:w-auto"
          >
            <GlassCard className="w-full md:min-w-[320px] lg:min-w-[380px] h-auto md:h-[400px] p-6 md:p-10 flex flex-col justify-between relative md:shrink-0 md:snap-center group cursor-pointer">
              <div className="flex items-start justify-between mb-4 md:mb-auto">
                <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] border border-glass-highlight rounded-xl flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan/10 transition-colors">
                  <asset.icon size={22} />
                </div>
                
                {asset.stars > 0 && (
                  <div className="flex items-center gap-1 text-text-muted text-xs md:text-sm font-mono">
                    ⭐ {asset.stars}
                  </div>
                )}
              </div>
              
              <div className="mt-4 md:mt-0">
                <h3 className="text-xl md:text-2xl font-serif mb-2">{asset.title}</h3>
                <p className="text-text-muted text-xs md:text-sm">{asset.desc}</p>
                
                <div className="mt-4 md:mt-8 flex items-center gap-2 text-xs md:text-sm text-accent-cyan font-mono uppercase tracking-wider group-hover:gap-4 transition-all">
                  {asset.action} <ArrowRight size={14} />
                </div>
              </div>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Assets;
