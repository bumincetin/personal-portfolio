'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink, Star } from 'lucide-react';
import { getTranslation, type Locale } from '@/lib/translations';

const projects = [
  {
    title: "Greenwashing Detection",
    description: "AI-powered toolkit for detecting greenwashing in corporate sustainability communications using NLP and transformer models. Implements a proprietary Semantic Contradiction Index for automated risk assessment.",
    tags: ["Python", "NLP", "RoBERTa", "ESG"],
    url: "https://github.com/bumincetin/greenwashing-detection",
    stars: 1,
    featured: true
  },
  {
    title: "Multi-Task Waste Recognition",
    description: "Deep learning project using CNN and YOLO models for garbage classification on the TACO dataset. Implements multi-task learning for simultaneous object detection and material classification.",
    tags: ["Python", "PyTorch", "YOLO", "Computer Vision"],
    url: "https://github.com/mrliu1212/Multi-Task-Waste-Recognition",
    stars: 2,
    featured: true
  },
  {
    title: "Turkish Election 2023",
    description: "Bachelor thesis project predicting parliamentary seat distribution for the Turkish General Election using machine learning techniques and historical voting data analysis.",
    tags: ["Python", "Machine Learning", "Political Science", "Statistics"],
    url: "https://github.com/bumincetin/TurkishElection2023",
    stars: 1,
    featured: false
  },
  {
    title: "MaliBot",
    description: "MaliBot is an intelligent accounting assistant that helps with various accounting tasks using natural language processing and domain-specific knowledge bases.",
    tags: ["Python", "NLP", "LangChain", "Finance"],
    url: "https://github.com/bumincetin/MaliBot-Agent",
    stars: 0,
    featured: false
  }
];

export default function AssetsPageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 bg-cream">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-accent"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {t.assetsPage.label}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 max-w-4xl">
            {t.assetsPage.title}
          </h1>
          
          <p className="font-mono text-base md:text-lg text-muted max-w-3xl leading-relaxed">
            {t.assetsPage.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.filter(p => p.featured).map((project, idx) => (
            <motion.a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group bg-white border border-border p-8 hover:shadow-editorial hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Github size={24} className="text-charcoal" />
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1 font-mono text-sm text-muted">
                      <Star size={14} />
                      {project.stars}
                    </span>
                  )}
                </div>
                <ExternalLink size={18} className="text-muted group-hover:text-accent transition-colors" />
              </div>
              
              <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="font-mono text-sm text-muted leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono bg-surface-alt border border-border text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">More Projects</h2>
        
        <div className="space-y-4">
          {projects.filter(p => !p.featured).map((project, idx) => (
            <motion.a
              key={idx}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between bg-white border border-border p-6 hover:shadow-editorial transition-all duration-300"
            >
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1 font-mono text-xs text-muted">
                      <Star size={12} />
                      {project.stars}
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm text-muted line-clamp-1">
                  {project.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-mono bg-surface-alt border border-border text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight size={16} className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="bg-charcoal p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-cream mb-3">
              {t.assetsPage.moreGithub}
            </h3>
            <p className="font-mono text-sm text-cream/70">
              {t.assetsPage.moreGithubDesc}
            </p>
          </div>
          <div className="md:text-right">
            <a 
              href="https://github.com/bumincetin"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/90"
            >
              <Github size={18} />
              {t.assetsPage.visitProfile}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
