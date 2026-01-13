'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Database, 
  TrendingUp, 
  Sparkles,
  Brain,
  Network,
  BarChart3,
  CircleDot,
  Gem
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface SmeJourneyProps {
  locale: Locale;
  t: TranslationType;
}

// Floating particle component for the chaos phase
const FloatingParticle = ({ 
  index, 
  progress, 
  totalParticles 
}: { 
  index: number; 
  progress: ReturnType<typeof useSpring>;
  totalParticles: number;
}) => {
  // Calculate initial chaotic positions
  const angle = (index / totalParticles) * Math.PI * 2;
  const radius = 80 + (index % 3) * 40;
  const chaosX = Math.cos(angle + index * 0.5) * radius;
  const chaosY = Math.sin(angle + index * 0.7) * radius;
  
  // Calculate structured grid positions (3x4 grid)
  const gridCol = index % 4;
  const gridRow = Math.floor(index / 4);
  const structuredX = (gridCol - 1.5) * 50;
  const structuredY = (gridRow - 1.5) * 50;
  
  // Calculate final converged position (center)
  const finalX = 0;
  const finalY = 0;
  
  // Transform based on scroll progress
  const x = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    [chaosX, structuredX, structuredX * 0.3, finalX]
  );
  
  const y = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    [chaosY, structuredY, structuredY * 0.3 - 20, finalY]
  );
  
  const scale = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    [0.6 + (index % 3) * 0.2, 1, 1.1, 0]
  );
  
  const opacity = useTransform(
    progress,
    [0, 0.3, 0.7, 0.9, 1],
    [0.4 + (index % 3) * 0.2, 0.8, 1, 0.8, 0]
  );
  
  const rotate = useTransform(
    progress,
    [0, 0.4, 0.7, 1],
    [index * 45, 0, 0, 180]
  );

  const icons = [FileSpreadsheet, Database, BarChart3, CircleDot];
  const Icon = icons[index % icons.length];
  
  return (
    <motion.div
      className="absolute"
      style={{ 
        x, 
        y, 
        scale, 
        opacity, 
        rotate,
        left: '50%',
        top: '50%',
      }}
    >
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center backdrop-blur-sm">
        <Icon size={16} className="text-accent md:w-5 md:h-5" />
      </div>
    </motion.div>
  );
};

// Network connection lines
const NetworkLines = ({ progress }: { progress: ReturnType<typeof useSpring> }) => {
  const opacity = useTransform(progress, [0.3, 0.5, 0.7, 0.85], [0, 1, 1, 0]);
  const pathLength = useTransform(progress, [0.3, 0.6], [0, 1]);
  
  return (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      style={{ opacity }}
      viewBox="-150 -150 300 300"
    >
      {/* Grid lines */}
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1={-100}
          y1={-75 + i * 37.5}
          x2={100}
          y2={-75 + i * 37.5}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/30"
          style={{ pathLength }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={-75 + i * 37.5}
          y1={-100}
          x2={-75 + i * 37.5}
          y2={100}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/30"
          style={{ pathLength }}
        />
      ))}
      {/* Connection nodes */}
      {[...Array(9)].map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <motion.circle
            key={`node-${i}`}
            cx={(col - 1) * 50}
            cy={(row - 1) * 50}
            r="3"
            className="fill-accent/60"
            style={{ opacity: useTransform(progress, [0.4, 0.6], [0, 1]) }}
          />
        );
      })}
    </motion.svg>
  );
};

// Rising chart component for capital phase
const RisingChart = ({ progress }: { progress: ReturnType<typeof useSpring> }) => {
  const opacity = useTransform(progress, [0.7, 0.85, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0.7, 0.9], [0.5, 1]);
  const y = useTransform(progress, [0.7, 0.9], [50, 0]);
  
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, scale, y }}
    >
      <div className="relative">
        {/* Glowing gem/diamond */}
        <motion.div
          className="relative z-10"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(201, 169, 106, 0.3)',
              '0 0 60px rgba(201, 169, 106, 0.6)',
              '0 0 20px rgba(201, 169, 106, 0.3)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-accent via-accent/80 to-accent/60 flex items-center justify-center transform rotate-45">
            <div className="transform -rotate-45">
              <Gem size={40} className="text-charcoal md:w-12 md:h-12" />
            </div>
          </div>
        </motion.div>
        
        {/* Rising trend line */}
        <svg 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-16"
          viewBox="0 0 200 60"
        >
          <motion.path
            d="M 10 50 Q 50 45 80 35 T 140 15 T 190 5"
            fill="none"
            stroke="url(#chartGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            style={{ pathLength: useTransform(progress, [0.8, 1], [0, 1]) }}
          />
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(201, 169, 106, 0.3)" />
              <stop offset="100%" stopColor="rgba(201, 169, 106, 1)" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${-20 + Math.sin(i * 1.2) * 60}%`,
              left: `${50 + Math.cos(i * 1.2) * 80}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            <Sparkles size={12} className="text-accent" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Phase card component with glassmorphism
const PhaseCard = ({ 
  phase, 
  title, 
  description, 
  icon: Icon,
  isActive,
  index 
}: { 
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
  index: number;
}) => {
  return (
    <motion.div
      className={`
        relative p-6 md:p-8 rounded-2xl 
        bg-neutral-950/60 backdrop-blur-xl
        border border-white/10
        transition-all duration-500
        ${isActive ? 'border-accent/50 shadow-2xl shadow-accent/10' : 'opacity-60'}
      `}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        {/* Phase indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            ${isActive ? 'bg-accent text-charcoal' : 'bg-white/10 text-white/60'}
            transition-colors duration-300
          `}>
            <Icon size={20} />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {phase}
          </span>
        </div>
        
        {/* Content */}
        <h3 className="font-serif text-xl md:text-2xl text-white mb-3">
          {title}
        </h3>
        <p className="font-mono text-sm text-white/60 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const SmeJourney: React.FC<SmeJourneyProps> = ({ locale, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  
  // Smooth spring for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Phase data with translations
  const phases = [
    {
      phase: locale === 'tr' ? 'Faz 1' : locale === 'it' ? 'Fase 1' : 'Phase 1',
      title: locale === 'tr' ? 'Veri Kaos' : locale === 'it' ? 'Caos dei Dati' : 'Data Chaos',
      description: locale === 'tr' 
        ? 'Dağınık elektronik tablolar, tutarsız raporlar ve çelişkili metrikler. Değerli içgörüler, yapılandırılmamış bilgi yığınlarının altında gömülü duruyor.'
        : locale === 'it'
        ? 'Fogli di calcolo sparsi, report incoerenti e metriche contraddittorie. Intuizioni preziose sepolte sotto montagne di dati non strutturati.'
        : 'Scattered spreadsheets, inconsistent reports, and conflicting metrics. Valuable insights buried under mountains of unstructured information.',
      icon: FileSpreadsheet,
    },
    {
      phase: locale === 'tr' ? 'Faz 2' : locale === 'it' ? 'Fase 2' : 'Phase 2',
      title: locale === 'tr' ? 'Yapılandırılmış Zeka' : locale === 'it' ? 'Intelligenza Strutturata' : 'Structured Intelligence',
      description: locale === 'tr'
        ? 'AI ve NLP işleme verilerinizi bir bağlantılı ağa dönüştürür. Kalıplar ortaya çıkar, ilişkiler netleşir ve bilgi anlamlı hale gelir.'
        : locale === 'it'
        ? 'L\'elaborazione AI e NLP trasforma i tuoi dati in una rete connessa. I pattern emergono, le relazioni diventano chiare.'
        : 'AI and NLP processing transforms your data into a connected network. Patterns emerge, relationships become clear, and information becomes meaningful.',
      icon: Network,
    },
    {
      phase: locale === 'tr' ? 'Faz 3' : locale === 'it' ? 'Fase 3' : 'Phase 3',
      title: locale === 'tr' ? 'Sermayeye Dönüşüm' : locale === 'it' ? 'Trasformazione in Capitale' : 'Transformation to Capital',
      description: locale === 'tr'
        ? 'İşlenmiş veriler eyleme dönüştürülebilir içgörülere dönüşür. Kârlılığı artırın, riskleri azaltın ve ölçülebilir iş değeri yaratın.'
        : locale === 'it'
        ? 'I dati elaborati diventano insight azionabili. Aumenta la redditività, riduci i rischi e crea valore aziendale misurabile.'
        : 'Processed data becomes actionable insights. Drive profitability, reduce risks, and create measurable business value.',
      icon: TrendingUp,
    },
  ];

  // Determine active phase based on scroll progress
  const getActivePhase = () => {
    const progress = scrollYProgress.get();
    if (progress < 0.33) return 0;
    if (progress < 0.66) return 1;
    return 2;
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-neutral-950 min-h-[300vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-20">
            
            {/* Left side - Text cards (scrolling on mobile) */}
            <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 lg:mb-12"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-accent"></div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'The Journey'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
                  {locale === 'tr' 
                    ? 'Veri Kaosunu Sermayeye Dönüştürmek' 
                    : locale === 'it' 
                    ? 'Trasformare il Caos dei Dati in Capitale'
                    : 'Turning Data Chaos into Capital'}
                </h2>
              </motion.div>
              
              {/* Phase cards */}
              {phases.map((phase, index) => (
                <PhaseCard
                  key={index}
                  {...phase}
                  isActive={true}
                  index={index}
                />
              ))}
            </div>
            
            {/* Right side - Visual animation area */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(201,169,106,0.1) 0%, transparent 70%)',
                    scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.8]),
                  }}
                />
                
                {/* Center focus area */}
                <div className="absolute inset-8 md:inset-12 rounded-full border border-white/5 bg-neutral-900/50 backdrop-blur-sm" />
                
                {/* Brain icon (processing indicator) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: useTransform(smoothProgress, [0.3, 0.5, 0.7, 0.85], [0, 1, 1, 0]),
                    scale: useTransform(smoothProgress, [0.3, 0.5], [0.5, 1]),
                  }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center backdrop-blur-sm">
                    <Brain size={32} className="text-accent md:w-10 md:h-10" />
                  </div>
                </motion.div>
                
                {/* Network lines */}
                <NetworkLines progress={smoothProgress} />
                
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                  <FloatingParticle 
                    key={i} 
                    index={i} 
                    progress={smoothProgress}
                    totalParticles={12}
                  />
                ))}
                
                {/* Rising chart / Gem for capital phase */}
                <RisingChart progress={smoothProgress} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                backgroundColor: useTransform(
                  smoothProgress,
                  [i * 0.33, i * 0.33 + 0.1, (i + 1) * 0.33 - 0.1, (i + 1) * 0.33],
                  ['rgba(255,255,255,0.2)', 'rgba(201,169,106,1)', 'rgba(201,169,106,1)', 'rgba(255,255,255,0.2)']
                ),
              }}
            />
          ))}
        </div>
        
        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 right-8 font-mono text-xs text-white/40"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
          }}
        >
          {locale === 'tr' ? 'Keşfetmek için kaydırın' : locale === 'it' ? 'Scorri per esplorare' : 'Scroll to explore'}
        </motion.div>
      </div>
    </section>
  );
};

export default SmeJourney;
