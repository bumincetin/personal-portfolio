'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, MessageSquare, FileText, Zap, CheckCircle2 } from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';
import { NeuralNetwork, DataFlow } from '@/app/components/AnimatedVisuals';

interface Props {
  locale: Locale;
  t: TranslationType;
}

export default function AINLPClient({ locale, t }: Props) {
  const section = t.methodologyPage.section2;

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-cream min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <Link 
          href={`/${locale}/methodology`}
          className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          {t.methodologyPage.servicesLabel}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Brain className="text-accent" size={24} />
              </div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">{section.num}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              {section.title}
            </h1>
            <p className="font-mono text-sm text-muted mb-4 uppercase tracking-wider">
              {section.arch}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white border border-border p-8 rounded-lg shadow-editorial">
              <NeuralNetwork className="w-full h-48" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* For Everyone Section */}
      <section className="bg-white py-16 mb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-accent"></div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {locale === 'tr' ? 'Herkes İçin Açıklama' : locale === 'it' ? 'Per Tutti' : 'For Everyone'}
              </span>
            </div>
            
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
              {locale === 'tr' ? 'Yapay Zeka ile Metin Analizi Nedir?' : locale === 'it' ? 'Cos\'è l\'Analisi del Testo con AI?' : 'What is AI-Powered Text Analysis?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr' 
                    ? 'Yapay zeka, bilgisayarların insan gibi düşünmesini sağlayan bir teknoloji. Metin analizi (NLP) ise bu teknolojiyi yazılı içerikleri anlamak için kullanıyor.'
                    : locale === 'it'
                    ? 'L\'intelligenza artificiale è una tecnologia che permette ai computer di pensare come gli umani. L\'analisi del testo (NLP) utilizza questa tecnologia per comprendere i contenuti scritti.'
                    : 'Artificial intelligence is technology that enables computers to think like humans. Text analysis (NLP) uses this technology to understand written content.'
                  }
                </p>
                <p className="font-mono text-base text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'Bu sayede binlerce belgeyi saniyeler içinde okuyabilir, müşteri yorumlarındaki duyguları anlayabilir ve tekrar eden işleri otomatikleştirebilirsiniz.'
                    : locale === 'it'
                    ? 'Questo permette di leggere migliaia di documenti in pochi secondi, comprendere i sentimenti nelle recensioni dei clienti e automatizzare attività ripetitive.'
                    : 'This allows you to read thousands of documents in seconds, understand sentiments in customer reviews, and automate repetitive tasks.'
                  }
                </p>
              </div>
              
              <div className="bg-surface-alt p-6 rounded-lg">
                <h3 className="font-serif text-lg text-charcoal mb-4">
                  {locale === 'tr' ? 'Gerçek Hayat Örneği' : locale === 'it' ? 'Esempio Reale' : 'Real-World Example'}
                </h3>
                <p className="font-mono text-sm text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'ImpactScope için geliştirdiğim sistem, şirketlerin sürdürülebilirlik raporlarını otomatik olarak analiz ediyor ve "yeşil yıkama" (yanıltıcı çevre iddiaları) yapanları tespit ediyor. Manuel inceleme süresi %80 azaldı.'
                    : locale === 'it'
                    ? 'Il sistema che ho sviluppato per ImpactScope analizza automaticamente i report di sostenibilità delle aziende e rileva il "greenwashing" (affermazioni ambientali fuorvianti). Il tempo di revisione manuale è diminuito dell\'80%.'
                    : 'The system I developed for ImpactScope automatically analyzes company sustainability reports and detects "greenwashing" (misleading environmental claims). Manual review time decreased by 80%.'
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Deep Dive */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-charcoal"></div>
            <span className="font-mono text-xs text-charcoal uppercase tracking-wider">
              {locale === 'tr' ? 'Teknik Detaylar' : locale === 'it' ? 'Dettagli Tecnici' : 'Technical Deep Dive'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-base text-muted leading-relaxed mb-6">
                {section.desc1}
              </p>
              <p className="font-mono text-base text-muted leading-relaxed mb-8">
                {section.desc2}
              </p>
              
              <h3 className="font-serif text-xl text-charcoal mb-4">
                {locale === 'tr' ? 'Temel Yetenekler' : locale === 'it' ? 'Capacità Chiave' : 'Key Capabilities'}
              </h3>
              <ul className="space-y-3">
                {section.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-sm text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              {/* Technical Stack */}
              <div className="bg-charcoal p-6 rounded-lg text-cream">
                <h4 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
                  {locale === 'tr' ? 'Kullanılan Teknolojiler' : locale === 'it' ? 'Stack Tecnologico' : 'Technology Stack'}
                </h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">Models</span>
                    <span>RoBERTa, BERT, GPT</span>
                  </div>
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">Libraries</span>
                    <span>HuggingFace, spaCy</span>
                  </div>
                  <div className="flex justify-between border-b border-cream/20 pb-2">
                    <span className="text-cream/70">Framework</span>
                    <span>PyTorch, TensorFlow</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/70">Deployment</span>
                    <span>FastAPI, Docker</span>
                  </div>
                </div>
              </div>
              
              {/* Data Flow Preview */}
              <div className="bg-white border border-border p-6 rounded-lg">
                <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
                  {locale === 'tr' ? 'Veri Akışı' : locale === 'it' ? 'Flusso Dati' : 'Data Flow'}
                </h4>
                <DataFlow className="w-full h-32" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="bg-surface-alt border border-border p-8 md:p-12 text-center rounded-lg">
          <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
            {locale === 'tr' ? 'Yapay Zeka Projeniz İçin Hazır mısınız?' : locale === 'it' ? 'Pronto per il Tuo Progetto AI?' : 'Ready for Your AI Project?'}
          </h3>
          <p className="font-mono text-sm text-muted mb-8 max-w-xl mx-auto">
            {locale === 'tr'
              ? 'Metin analizi ve yapay zekanın işletmenize nasıl değer katabileceğini konuşalım.'
              : locale === 'it'
              ? 'Discutiamo come l\'analisi del testo e l\'AI possono aggiungere valore al tuo business.'
              : 'Let\'s discuss how text analysis and AI can add value to your business.'
            }
          </p>
          <a 
            href="mailto:cetinbumink@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-mono text-sm uppercase tracking-wider transition-all duration-300 hover:bg-navy"
          >
            {t.methodologyPage.ctaButton}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
}
