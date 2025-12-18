'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard';
import { Brain, BarChart3, Cpu, Vote, Music, TrendingUp, ArrowRight, Github, ExternalLink } from 'lucide-react';
import { getTranslation, type Locale } from '@/lib/translations';

const projects = [
  {
    icon: Brain,
    title: "Greenwashing Detection",
    desc: "AI-powered toolkit for detecting greenwashing in corporate sustainability communications using NLP.",
    longDesc: "Developed an internal Data Product by fine-tuning RoBERTa to automatically flag greenwashing risk, reducing manual review time by 80%.",
    tech: ["RoBERTa", "NLP", "Sentiment Analysis", "Python"],
    url: "https://github.com/bumincetin/greenwashing-detection",
    stars: 1
  },
  {
    icon: Cpu,
    title: "Multi-Task Waste Recognition",
    desc: "Deep learning project using CNN and YOLO models for garbage classification on the TACO dataset.",
    longDesc: "Implements both image classification and object detection pipelines for automated waste sorting.",
    tech: ["CNN", "YOLO", "TensorFlow", "Computer Vision"],
    url: "https://github.com/mrliu1212/Multi-Task-Waste-Recognition",
    stars: 2
  },
  {
    icon: Vote,
    title: "Turkish Election 2023",
    desc: "Bachelor thesis predicting parliamentary seat distribution for the Turkish General Election using ML.",
    longDesc: "A comprehensive study of predictive techniques for parliamentary elections using machine learning.",
    tech: ["Machine Learning", "Python", "Statistical Analysis", "Jupyter"],
    url: "https://github.com/bumincetin/TurkishElection2023",
    stars: 1
  },
  {
    icon: BarChart3,
    title: "MaliBot",
    desc: "MaliBot is an intelligent accounting assistant that helps with various accounting tasks.",
    longDesc: "Integrates with popular accounting systems like DBS and Zirve Nova.",
    tech: ["Python", "AI", "Automation", "API Integration"],
    url: "https://github.com/bumincetin/MaliBot-Agent",
    stars: 0
  },
  {
    icon: Music,
    title: "Playlist Recommendation",
    desc: "Multi-label emotion classification model using RoBERTa for music recommendation.",
    longDesc: "A/B testing resulted in 35% increase in user session time.",
    tech: ["RoBERTa", "NLP", "A/B Testing", "Deep Learning"],
    url: "#",
    stars: 0
  },
  {
    icon: TrendingUp,
    title: "Tweet Sentiment Analysis",
    desc: "Predictive analysis exploring Twitter sentiment and stock prices relationship.",
    longDesc: "Using BERT and Granger causality tests for stock return prediction.",
    tech: ["BERT", "Time Series", "Granger Causality", "Twitter API"],
    url: "#",
    stars: 0
  }
];

export default function AssetsPageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20">
      <section className="container mx-auto px-4 md:px-6 mb-10 md:mb-16 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent-cyan font-mono mb-2 md:mb-4 tracking-widest text-xs md:text-sm">
          {t.assetsPage.label}
        </motion.p>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent px-2">
          {t.assetsPage.title}
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-text-muted text-sm md:text-lg max-w-2xl mx-auto font-light px-2">
          {t.assetsPage.subtitle}
        </motion.p>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {projects.map((project, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <GlassCard className="p-5 md:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] border border-glass-highlight rounded-xl flex items-center justify-center text-accent-cyan">
                    <project.icon size={22} />
                  </div>
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1 text-text-muted text-xs md:text-sm font-mono">⭐ {project.stars}</div>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-serif mb-2 md:mb-3">{project.title}</h3>
                <p className="text-text-muted text-xs md:text-sm mb-3 md:mb-4">{project.desc}</p>
                <p className="text-text-muted/70 text-xs md:text-sm mb-4 md:mb-6 flex-grow">{project.longDesc}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 md:px-3 py-1 text-[10px] md:text-xs font-mono bg-glass-surface border border-glass-border rounded-full text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url !== "#" && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs md:text-sm text-accent-cyan font-mono uppercase tracking-wider hover:gap-4 transition-all group">
                    <Github size={14} />
                    {t.assetsPage.viewGithub}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 mt-12 md:mt-20 text-center">
        <GlassCard className="p-8 md:p-12">
          <h3 className="font-serif text-2xl md:text-3xl mb-3 md:mb-4">{t.assetsPage.moreGithub}</h3>
          <p className="text-text-muted text-sm md:text-base mb-6 md:mb-8 max-w-xl mx-auto">{t.assetsPage.moreGithubDesc}</p>
          <a href="https://github.com/bumincetin" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform">
            <Github size={18} />
            {t.assetsPage.visitProfile}
            <ExternalLink size={14} />
          </a>
        </GlassCard>
      </section>
    </div>
  );
}
