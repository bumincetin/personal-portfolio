'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard';
import { TrendingUp, Brain, BarChart3, Building2, Search, Cpu, Code, Rocket, ArrowRight, Mail } from 'lucide-react';
import { getTranslation, type Locale } from '@/lib/translations';

const ChartLine = ({ color, delay }: { color: string, delay: number }) => (
  <motion.path
    d="M0 80 Q 20 70, 40 75 T 80 50 T 120 60 T 160 30 T 200 45 T 240 20 T 280 40 T 320 10"
    fill="none"
    stroke={color}
    strokeWidth="2"
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 2, delay: delay, ease: "easeInOut" }}
  />
);

const NeuralNetwork = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <radialGradient id="nodeGlow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#7000ff" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#7000ff" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="nodeGlowCyan" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0"/>
      </radialGradient>
    </defs>
    
    <motion.g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
      {[...Array(6)].map((_, i) => (
        <line key={`a-${i}`} x1="60" y1={60 + i*36} x2="160" y2={150} />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={`b-${i}`} x1="160" y1={150} x2="260" y2={60 + i*36} />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={`c-${i}`} x1="260" y1={60 + i*36} x2="340" y2={150} />
      ))}
    </motion.g>

    {[...Array(6)].map((_, i) => (
      <circle key={`input-${i}`} cx="60" cy={60 + i*36} r="4" fill="#444" />
    ))}
    
    <circle cx="160" cy="150" r="12" fill="url(#nodeGlow)" />
    <circle cx="160" cy="150" r="5" fill="#7000ff" />
    
    {[...Array(6)].map((_, i) => (
      <circle key={`hidden-${i}`} cx="260" cy={60 + i*36} r="4" fill="#555" />
    ))}
    
    <circle cx="340" cy="150" r="12" fill="url(#nodeGlowCyan)" />
    <circle cx="340" cy="150" r="5" fill="#00f0ff" />
    
    <motion.circle r="3" fill="#00f0ff" opacity="0.8">
      <animateMotion dur="2s" repeatCount="indefinite" path="M60 60 L160 150 L260 100 L340 150" />
    </motion.circle>
    <motion.circle r="3" fill="#7000ff" opacity="0.8">
      <animateMotion dur="2.5s" repeatCount="indefinite" path="M60 240 L160 150 L260 200 L340 150" />
    </motion.circle>

    <text x="40" y="280" fill="#555" fontFamily="monospace" fontSize="9">INPUT_LAYER</text>
    <text x="280" y="280" fill="#00f0ff" fontFamily="monospace" fontSize="9">PREDICTION</text>
  </svg>
);

const TimeSeriesChart = () => (
  <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible">
    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
      <line x1="0" y1="0" x2="0" y2="200" />
      <line x1="0" y1="200" x2="400" y2="200" />
      <line x1="0" y1="100" x2="400" y2="100" />
      {[100, 200, 300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" />)}
    </g>
    
    <ChartLine color="#333" delay={0} />
    <ChartLine color="#00f0ff" delay={0.5} />
    
    <motion.path 
      d="M0 85 Q 20 75, 40 80 T 80 55 T 120 65 T 160 35 T 200 50 T 240 25 T 280 45 T 320 15 L 320 5 L 280 35 L 240 15 L 200 40 L 160 25 L 120 55 L 80 45 L 40 70 L 0 75 Z"
      fill="rgba(0, 240, 255, 0.08)"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    />

    <g transform="translate(250, 25)">
      <circle r="4" fill="#00f0ff" />
      <text x="10" y="5" fill="#00f0ff" fontSize="10" fontFamily="monospace">α: 0.05</text>
    </g>
  </svg>
);

const DashboardMockup = () => (
  <svg viewBox="0 0 400 280" className="w-full h-full">
    <rect x="10" y="10" width="380" height="260" rx="8" fill="#0a0a0f" stroke="rgba(255,255,255,0.1)" />
    
    {/* Header */}
    <rect x="20" y="20" width="360" height="30" rx="4" fill="rgba(255,255,255,0.03)" />
    <circle cx="35" cy="35" r="5" fill="#ff5f56" />
    <circle cx="55" cy="35" r="5" fill="#ffbd2e" />
    <circle cx="75" cy="35" r="5" fill="#27ca40" />
    
    {/* KPI Cards */}
    <rect x="20" y="60" width="85" height="50" rx="4" fill="rgba(0,240,255,0.1)" stroke="rgba(0,240,255,0.3)" />
    <rect x="115" y="60" width="85" height="50" rx="4" fill="rgba(112,0,255,0.1)" stroke="rgba(112,0,255,0.3)" />
    <rect x="210" y="60" width="85" height="50" rx="4" fill="rgba(0,240,255,0.1)" stroke="rgba(0,240,255,0.3)" />
    <rect x="305" y="60" width="75" height="50" rx="4" fill="rgba(112,0,255,0.1)" stroke="rgba(112,0,255,0.3)" />
    
    {/* Chart Area */}
    <rect x="20" y="120" width="240" height="130" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
    <motion.path 
      d="M30 220 L70 200 L110 210 L150 180 L190 190 L230 160 L250 170"
      fill="none" stroke="#00f0ff" strokeWidth="2"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    
    {/* Side Panel */}
    <rect x="270" y="120" width="110" height="130" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
    {[0, 1, 2, 3].map(i => (
      <rect key={i} x="280" y={130 + i*30} width={60 + Math.random()*30} height="20" rx="2" fill="rgba(112,0,255,0.2)" />
    ))}
  </svg>
);

const FinanceIcon = () => (
  <svg viewBox="0 0 400 280" className="w-full h-full">
    <defs>
      <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(112,0,255,0.4)" />
        <stop offset="100%" stopColor="rgba(112,0,255,0.1)" />
      </linearGradient>
    </defs>
    
    {/* Buildings */}
    <rect x="50" y="100" width="60" height="140" fill="url(#buildingGrad)" rx="4" />
    <rect x="130" y="60" width="50" height="180" fill="url(#buildingGrad)" rx="4" />
    <rect x="200" y="80" width="70" height="160" fill="url(#buildingGrad)" rx="4" />
    <rect x="290" y="120" width="60" height="120" fill="url(#buildingGrad)" rx="4" />
    
    {/* Connection Lines */}
    <motion.path
      d="M80 100 Q150 30, 240 80"
      fill="none" stroke="#00f0ff" strokeWidth="2" strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    <motion.path
      d="M155 60 Q250 20, 320 120"
      fill="none" stroke="#7000ff" strokeWidth="2" strokeDasharray="5,5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.3 }}
    />
    
    {/* Nodes */}
    <circle cx="80" cy="100" r="6" fill="#00f0ff" />
    <circle cx="155" cy="60" r="6" fill="#7000ff" />
    <circle cx="235" cy="80" r="6" fill="#00f0ff" />
    <circle cx="320" cy="120" r="6" fill="#7000ff" />
    
    <text x="50" y="260" fill="#555" fontFamily="monospace" fontSize="10">CROSS-BORDER NETWORK</text>
  </svg>
);

export default function MethodologyPageClient({ locale }: { locale: Locale }) {
  const t = getTranslation(locale);

  const services = [
    { section: t.methodologyPage.section1, icon: TrendingUp, visual: <NeuralNetwork /> },
    { section: t.methodologyPage.section2, icon: Brain, visual: <TimeSeriesChart /> },
    { section: t.methodologyPage.section3, icon: BarChart3, visual: <DashboardMockup /> },
    { section: t.methodologyPage.section4, icon: Building2, visual: <FinanceIcon /> },
  ];

  const processSteps = [
    { icon: Search, title: t.methodologyPage.process.step1Title, desc: t.methodologyPage.process.step1Desc },
    { icon: Cpu, title: t.methodologyPage.process.step2Title, desc: t.methodologyPage.process.step2Desc },
    { icon: Code, title: t.methodologyPage.process.step3Title, desc: t.methodologyPage.process.step3Desc },
    { icon: Rocket, title: t.methodologyPage.process.step4Title, desc: t.methodologyPage.process.step4Desc },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20">
      {/* HEADER */}
      <section className="container mx-auto px-4 md:px-6 mb-12 md:mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-accent-cyan font-mono mb-2 md:mb-4 tracking-widest text-xs md:text-sm"
        >
          {t.methodologyPage.label}
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent px-2"
        >
          {t.methodologyPage.title}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-text-muted text-sm md:text-lg max-w-3xl mx-auto font-light leading-relaxed px-2"
        >
          {t.methodologyPage.subtitle}
        </motion.p>
      </section>

      {/* SERVICES LABEL */}
      <section className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <p className="text-accent-purple font-mono tracking-widest text-xs md:text-sm">{t.methodologyPage.servicesLabel}</p>
      </section>

      {/* SERVICES */}
      {services.map((item, idx) => (
        <section key={idx} className="container mx-auto px-4 md:px-6 mb-16 md:mb-32">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <span className="text-2xl md:text-4xl font-serif text-accent-purple/50">{item.section.num}</span>
                <div className="h-[1px] flex-1 bg-glass-border"></div>
                <item.icon className="text-accent-cyan" size={20} />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">{item.section.title}</h2>
              <h3 className="font-mono text-accent-cyan text-[10px] md:text-xs mb-4 md:mb-6 tracking-wider">{item.section.arch}</h3>
              
              <p className="text-text-muted mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                {item.section.desc1}
              </p>
              <p className="text-text-muted mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                {item.section.desc2}
              </p>

              <ul className="space-y-2 md:space-y-3">
                {item.section.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-1.5 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-first lg:order-none"
            >
              <GlassCard className="p-4 md:p-8 min-h-[250px] md:min-h-[350px] flex items-center justify-center bg-deep/50 relative overflow-hidden">
                {item.visual}
              </GlassCard>
            </motion.div>
          </div>
        </section>
      ))}

      {/* PROCESS */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-24 border-t border-b border-glass-border mb-12 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-accent-purple font-mono mb-2 md:mb-4 tracking-widest text-xs md:text-sm">{t.methodologyPage.processLabel}</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{t.methodologyPage.processTitle}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 md:p-8 h-full relative">
                <span className="absolute top-3 md:top-4 right-3 md:right-4 text-3xl md:text-5xl font-serif text-glass-border">0{idx + 1}</span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 border border-glass-border flex items-center justify-center mb-4 md:mb-6">
                  <step.icon className="text-accent-cyan" size={18} />
                </div>
                <h3 className="font-serif text-lg md:text-xl mb-2 md:mb-3">{step.title}</h3>
                <p className="text-text-muted text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="container mx-auto px-4 md:px-6 mb-12 md:mb-24">
        <h3 className="text-center font-mono text-text-muted mb-8 md:mb-12 tracking-widest text-xs md:text-sm">{t.methodologyPage.stack}</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
          <div>
            <h4 className="text-white font-serif text-base md:text-xl mb-3 md:mb-4">{t.methodologyPage.stackLangs}</h4>
            <ul className="text-text-muted font-mono text-xs md:text-sm space-y-1 md:space-y-2">
              <li>Python (PyTorch, TF)</li>
              <li>R (dplyr, mlr3)</li>
              <li>SQL (Snowflake)</li>
              <li>NoSQL (MongoDB)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif text-base md:text-xl mb-3 md:mb-4">{t.methodologyPage.stackIntel}</h4>
            <ul className="text-text-muted font-mono text-xs md:text-sm space-y-1 md:space-y-2">
              <li>Deep Learning</li>
              <li>NLP (Transformers)</li>
              <li>Time-Series</li>
              <li>Statistical Modeling</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif text-base md:text-xl mb-3 md:mb-4">{t.methodologyPage.stackDeploy}</h4>
            <ul className="text-text-muted font-mono text-xs md:text-sm space-y-1 md:space-y-2">
              <li>Docker</li>
              <li>Apache Airflow</li>
              <li>AWS / Cloud</li>
              <li>Git CI/CD</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-serif text-base md:text-xl mb-3 md:mb-4">{t.methodologyPage.stackViz}</h4>
            <ul className="text-text-muted font-mono text-xs md:text-sm space-y-1 md:space-y-2">
              <li>PowerBI & Knime</li>
              <li>D3.js / React</li>
              <li>Tableau</li>
              <li>Custom Dashboards</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <GlassCard className="p-8 md:p-12 lg:p-16 text-center bg-gradient-to-br from-accent-purple/5 to-accent-cyan/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">{t.methodologyPage.ctaTitle}</h2>
            <p className="text-text-muted max-w-xl mx-auto mb-6 md:mb-8 text-sm md:text-base">{t.methodologyPage.ctaDesc}</p>
            <a 
              href="mailto:cetinbumink@gmail.com"
              className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-accent-cyan text-void font-mono font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform"
            >
              <Mail size={16} />
              {t.methodologyPage.ctaButton}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </GlassCard>
      </section>
    </div>
  );
}
