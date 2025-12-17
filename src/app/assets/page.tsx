'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { Brain, BarChart3, Cpu, Vote, Music, TrendingUp, ArrowRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    icon: Brain,
    title: "Greenwashing Detection",
    desc: "AI-powered toolkit for detecting greenwashing in corporate sustainability communications using NLP. Developed a semantic contradiction index (SCI) utilizing stance detection, sentiment drift, and contextual embeddings.",
    longDesc: "Developed an internal Data Product by fine-tuning RoBERTa to automatically flag greenwashing risk by analyzing corporate sustainability claims, reducing manual review time by 80% and enabling a new auditable metric for clients.",
    tech: ["RoBERTa", "NLP", "Sentiment Analysis", "Python"],
    url: "https://github.com/bumincetin/greenwashing-detection",
    stars: 1
  },
  {
    icon: Cpu,
    title: "Multi-Task Waste Recognition",
    desc: "Deep learning project using CNN and YOLO models for garbage classification on the TACO dataset.",
    longDesc: "Implements both image classification and object detection pipelines for automated waste sorting and recycling optimization.",
    tech: ["CNN", "YOLO", "TensorFlow", "Computer Vision"],
    url: "https://github.com/mrliu1212/Multi-Task-Waste-Recognition",
    stars: 2
  },
  {
    icon: Vote,
    title: "Turkish Election 2023",
    desc: "Bachelor thesis predicting parliamentary seat distribution for the Turkish General Election using ML.",
    longDesc: "A comprehensive study of predictive techniques for parliamentary elections, utilizing machine learning algorithms to forecast seat distribution among participating parties.",
    tech: ["Machine Learning", "Python", "Statistical Analysis", "Jupyter"],
    url: "https://github.com/bumincetin/TurkishElection2023",
    stars: 1
  },
  {
    icon: BarChart3,
    title: "MaliBot",
    desc: "MaliBot is an intelligent accounting assistant that helps with various accounting tasks.",
    longDesc: "Integrates with popular accounting systems like DBS and Zirve Nova to automate and streamline accounting workflows.",
    tech: ["Python", "AI", "Automation", "API Integration"],
    url: "https://github.com/bumincetin/MaliBot-Agent",
    stars: 0
  },
  {
    icon: Music,
    title: "Playlist Recommendation System",
    desc: "Multi-label emotion classification model using RoBERTa to enhance music recommendation accuracy.",
    longDesc: "Developed a custom model based on similarity between user's mood and songs' vibe. Conducted A/B testing that resulted in a 35% increase in user session time.",
    tech: ["RoBERTa", "NLP", "A/B Testing", "Deep Learning"],
    url: "#",
    stars: 0
  },
  {
    icon: TrendingUp,
    title: "Tweet Sentiment for Stock Returns",
    desc: "Predictive analysis exploring the relationship between Twitter sentiment and stock prices.",
    longDesc: "Employed time series analysis and Granger causality tests. Utilized BERT for sentiment classification, demonstrating that volume can predict sentiment with identified patterns in stock returns.",
    tech: ["BERT", "Time Series", "Granger Causality", "Twitter API"],
    url: "#",
    stars: 0
  }
];

export default function AssetsPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16 text-center">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-accent-cyan font-mono mb-4 tracking-widest text-sm"
        >
          OPEN SOURCE & RESEARCH
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
        >
          Projects & Work
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="text-text-muted text-lg max-w-2xl mx-auto font-light"
        >
          A collection of data science projects, research work, and open source contributions focused on NLP, deep learning, and financial analytics.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-[60px] h-[60px] border border-glass-highlight rounded-xl flex items-center justify-center text-accent-cyan">
                    <project.icon size={24} />
                  </div>
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1 text-text-muted text-sm font-mono">
                      ⭐ {project.stars}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-serif mb-3">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4">{project.desc}</p>
                <p className="text-text-muted/70 text-sm mb-6 flex-grow">{project.longDesc}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono bg-glass-surface border border-glass-border rounded-full text-text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.url !== "#" && (
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent-cyan font-mono uppercase tracking-wider hover:gap-4 transition-all group"
                  >
                    <Github size={16} />
                    View on GitHub
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="container mx-auto px-6 mt-20 text-center">
        <GlassCard className="p-12">
          <h3 className="font-serif text-3xl mb-4">More on GitHub</h3>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Explore all my repositories, contributions, and ongoing projects.
          </p>
          <a 
            href="https://github.com/bumincetin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
          >
            <Github size={20} />
            Visit GitHub Profile
            <ExternalLink size={16} />
          </a>
        </GlassCard>
      </section>
    </div>
  );
}

