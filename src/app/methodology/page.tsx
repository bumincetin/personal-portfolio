'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';

// Reusable animated chart component
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

export default function MethodologyDetailPage() {
  return (
    <div className="pt-32 pb-20">
      {/* HEADER */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-accent-cyan font-mono mb-4 tracking-widest text-sm"
        >
          SYSTEM ARCHITECTURE
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
        >
          The Algorithmic Core
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-text-muted text-lg max-w-2xl mx-auto font-light"
        >
          Deconstructing the proprietary models driving prediction, risk assessment, and sentiment analysis.
        </motion.p>
      </section>

      {/* MODEL 1: NLP & GREENWASHING */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-accent-purple/50">01.</span>
                <div className="h-[1px] flex-1 bg-glass-border"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Semantic Risk Detection</h2>
            <h3 className="font-mono text-accent-cyan text-sm mb-6">ARCH: RoBERTa FINE-TUNING // CONTEXTUAL EMBEDDINGS</h3>
            
            <p className="text-text-muted mb-4 leading-relaxed">
              Utilizing a fine-tuned <strong className="text-white">RoBERTa</strong> architecture, this module automatically flags greenwashing risks by analyzing corporate sustainability claims. The system reduces manual review time by <span className="text-accent-cyan">80%</span> through a custom <strong>Semantic Contradiction Index (SCI)</strong>.
            </p>
            <p className="text-text-muted mb-8 leading-relaxed">
              The SCI leverages stance detection and sentiment drift analysis to cross-reference ESG risk scores with historical controversies, ensuring an auditable metric for clients.
            </p>

            <ul className="space-y-3 font-mono text-sm text-text-muted">
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-accent-purple rounded-full"></span> Input: Unstructured Corp Comm</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-accent-purple rounded-full"></span> Layer: Contextual Embedding Extraction</li>
                <li className="flex items-center gap-3"><span className="w-1 h-1 bg-accent-purple rounded-full"></span> Output: Probability of Greenwashing (P_gw)</li>
            </ul>
          </div>

          <GlassCard className="p-8 min-h-[400px] flex items-center justify-center bg-deep/50 relative overflow-hidden">
            {/* Abstract Neural Node Viz */}
            <svg viewBox="0 0 400 300" className="w-full h-full">
                <defs>
                    <radialGradient id="nodeGlow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#7000ff" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#7000ff" stopOpacity="0"/>
                    </radialGradient>
                </defs>
                
                {/* Connections */}
                <motion.g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                    {[...Array(8)].map((_, i) => (
                        <line key={`a-${i}`} x1="50" y1={40 + i*30} x2="150" y2={150} />
                    ))}
                     {[...Array(8)].map((_, i) => (
                        <line key={`b-${i}`} x1="150" y1={150} x2="250" y2={40 + i*30} />
                    ))}
                     {[...Array(8)].map((_, i) => (
                        <line key={`c-${i}`} x1="250" y1={40 + i*30} x2="350" y2={150} />
                    ))}
                </motion.g>

                {/* Nodes */}
                <circle cx="150" cy="150" r="10" fill="url(#nodeGlow)" />
                <circle cx="150" cy="150" r="4" fill="#fff" />
                
                <circle cx="350" cy="150" r="10" fill="url(#nodeGlow)" />
                <circle cx="350" cy="150" r="4" fill="#00f0ff" />
                
                {/* Data Packets */}
                <motion.circle r="2" fill="#00f0ff">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M50 40 L150 150 L250 100 L350 150" />
                </motion.circle>
                <motion.circle r="2" fill="#7000ff">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M50 250 L150 150 L250 200 L350 150" />
                </motion.circle>

                <text x="50" y="280" fill="#888" fontFamily="monospace" fontSize="10">TOKEN_INPUT</text>
                <text x="300" y="280" fill="#00f0ff" fontFamily="monospace" fontSize="10">SENTIMENT_SCORE</text>
            </svg>
          </GlassCard>
        </div>
      </section>

      {/* MODEL 2: PREDICTIVE ANALYTICS */}
      <section className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual First on Desktop */}
            <GlassCard className="p-8 min-h-[400px] flex items-center justify-center bg-deep/50 lg:order-1">
                 <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible">
                    {/* Grid */}
                    <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
                        <line x1="0" y1="0" x2="0" y2="200" />
                        <line x1="0" y1="200" x2="400" y2="200" />
                        <line x1="0" y1="100" x2="400" y2="100" />
                        <line x1="100" y1="0" x2="100" y2="200" />
                        <line x1="200" y1="0" x2="200" y2="200" />
                        <line x1="300" y1="0" x2="300" y2="200" />
                    </g>
                    
                    {/* Graphs */}
                    <ChartLine color="#444" delay={0} /> {/* Historical */}
                    <ChartLine color="#00f0ff" delay={0.5} /> {/* Prediction */}
                    
                    {/* Error Bounds */}
                    <motion.path 
                        d="M0 85 Q 20 75, 40 80 T 80 55 T 120 65 T 160 35 T 200 50 T 240 25 T 280 45 T 320 15 L 320 5 L 280 35 L 240 15 L 200 40 L 160 25 L 120 55 L 80 45 L 40 70 L 0 75 Z"
                        fill="rgba(0, 240, 255, 0.1)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    />

                    {/* Marker */}
                    <g transform="translate(240, 20)">
                         <circle r="4" fill="#00f0ff" />
                         <text x="10" y="5" fill="#00f0ff" fontSize="10" fontFamily="monospace">α: 0.05</text>
                    </g>
                 </svg>
            </GlassCard>

          <div className="lg:order-2">
            <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-serif text-accent-cyan/50">02.</span>
                <div className="h-[1px] flex-1 bg-glass-border"></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Time-Series & Causality</h2>
            <h3 className="font-mono text-accent-cyan text-sm mb-6">ARCH: LSTM // GRANGER CAUSALITY // BERT</h3>
            
            <p className="text-text-muted mb-4 leading-relaxed">
              Predicting stock returns requires distinguishing signal from noise. We employ <strong className="text-white">LSTM (Long Short-Term Memory)</strong> networks for their ability to learn order dependence in sequence prediction problems.
            </p>
            <p className="text-text-muted mb-8 leading-relaxed">
              To augment technical data, we integrate alternative datasets. Using <strong className="text-white">BERT</strong> for sentiment classification on Twitter feeds, we run <strong className="text-white">Granger causality tests</strong> to mathematically validate the predictive relationship between public sentiment volume and market volatility.
            </p>

            <ul className="grid grid-cols-2 gap-4 font-mono text-xs text-text-muted uppercase tracking-wider">
                <li className="border border-glass-border p-2 rounded text-center">Mean Reversion</li>
                <li className="border border-glass-border p-2 rounded text-center">Stationarity Test</li>
                <li className="border border-glass-border p-2 rounded text-center">Lag Optimization</li>
                <li className="border border-glass-border p-2 rounded text-center">Alpha Generation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STACK / SKILLS */}
      <section className="container mx-auto px-6 mt-32 border-t border-glass-border pt-16">
        <h3 className="text-center font-mono text-text-muted mb-12">FULL TECHNOLOGY STACK</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <h4 className="text-white font-serif text-xl mb-4">Languages</h4>
                <ul className="text-text-muted font-mono text-sm space-y-2">
                    <li>Python (PyTorch, TF)</li>
                    <li>R (dplyr, mlr3)</li>
                    <li>SQL (Snowflake)</li>
                    <li>NoSQL (MongoDB)</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-serif text-xl mb-4">Intelligence</h4>
                <ul className="text-text-muted font-mono text-sm space-y-2">
                    <li>Deep Learning (CNN/RNN)</li>
                    <li>Natural Language Processing</li>
                    <li>Unsupervised Clustering</li>
                    <li>Statistical Modeling</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-serif text-xl mb-4">Deployment</h4>
                <ul className="text-text-muted font-mono text-sm space-y-2">
                    <li>Docker Containers</li>
                    <li>Apache Airflow</li>
                    <li>AWS / Cloud</li>
                    <li>Git Pipelines</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-serif text-xl mb-4">Visualization</h4>
                <ul className="text-text-muted font-mono text-sm space-y-2">
                    <li>PowerBI & Knime</li>
                    <li>D3.js / React</li>
                    <li>Tableau</li>
                    <li>Executive Dashboards</li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  );
}

