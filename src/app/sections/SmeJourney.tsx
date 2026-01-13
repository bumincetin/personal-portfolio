'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  TrendingUp,
  Sparkles,
  Gem,
  BarChart3,
  Users,
  DollarSign,
  FileText,
  Target,
  Activity,
  PieChart,
  LineChart,
  TrendingDown,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface SmeJourneyProps {
  locale: Locale;
  t: TranslationType;
}

// Data labels with translations
const getDataLabels = (locale: Locale) => {
  const labels = {
    en: [
      'Balance Sheet',
      'Head Count',
      'Marketing Data',
      'Advertisement',
      'Churn Rate',
      'User Count',
      'Revenue Streams',
      'Cash Flow',
      'Customer Lifetime Value',
      'Conversion Rate',
      'Inventory Levels',
      'Sales Pipeline',
      'Operating Expenses',
      'Market Share',
      'Customer Acquisition Cost',
      'Net Profit Margin',
      'Return on Investment',
      'Employee Productivity',
      'Website Traffic',
      'Email Campaigns'
    ],
    tr: [
      'Bilanço',
      'Personel Sayısı',
      'Pazarlama Verileri',
      'Reklam',
      'Müşteri Kaybı Oranı',
      'Kullanıcı Sayısı',
      'Gelir Akışları',
      'Nakit Akışı',
      'Müşteri Yaşam Boyu Değeri',
      'Dönüşüm Oranı',
      'Stok Seviyeleri',
      'Satış Hunisi',
      'İşletme Giderleri',
      'Pazar Payı',
      'Müşteri Edinme Maliyeti',
      'Net Kar Marjı',
      'Yatırım Getirisi',
      'Çalışan Verimliliği',
      'Web Sitesi Trafiği',
      'E-posta Kampanyaları'
    ],
    it: [
      'Bilancio',
      'Numero Dipendenti',
      'Dati di Marketing',
      'Pubblicità',
      'Tasso di Abbandono',
      'Numero Utenti',
      'Flussi di Reddito',
      'Flusso di Cassa',
      'Valore Vita Cliente',
      'Tasso di Conversione',
      'Livelli di Inventario',
      'Pipeline Vendite',
      'Spese Operative',
      'Quota di Mercato',
      'Costo Acquisizione Cliente',
      'Margine di Profitto Netto',
      'Ritorno sull\'Investimento',
      'Produttività Dipendenti',
      'Traffico Sito Web',
      'Campagne Email'
    ]
  };
  return labels[locale] || labels.en;
};

// Icon mapping for different data types
const getIconForLabel = (label: string, index: number) => {
  const iconMap: Record<string, React.ElementType> = {
    'Balance Sheet': BarChart3,
    'Bilanço': BarChart3,
    'Bilancio': BarChart3,
    'Head Count': Users,
    'Personel Sayısı': Users,
    'Numero Dipendenti': Users,
    'Marketing Data': Target,
    'Pazarlama Verileri': Target,
    'Dati di Marketing': Target,
    'Revenue Streams': DollarSign,
    'Gelir Akışları': DollarSign,
    'Flussi di Reddito': DollarSign,
    'Cash Flow': Activity,
    'Nakit Akışı': Activity,
    'Flusso di Cassa': Activity,
    'Churn Rate': TrendingDown,
    'Müşteri Kaybı Oranı': TrendingDown,
    'Tasso di Abbandono': TrendingDown,
    'Conversion Rate': ArrowUpRight,
    'Dönüşüm Oranı': ArrowUpRight,
    'Tasso di Conversione': ArrowUpRight,
  };
  
  const icons = [
    BarChart3, Users, Target, DollarSign, Activity, 
    PieChart, LineChart, TrendingUp, FileText, Zap
  ];
  
  return iconMap[label] || icons[index % icons.length];
};

// Data point component with label
const DataPoint = ({ 
  label,
  index, 
  progress, 
  totalPoints,
  viewportWidth,
  viewportHeight
}: { 
  label: string;
  index: number; 
  progress: ReturnType<typeof useSpring>;
  totalPoints: number;
  viewportWidth: number;
  viewportHeight: number;
}) => {
  const Icon = getIconForLabel(label, index);
  
  // Start positions - scattered across the entire viewport
  const startX = (index % 5) * (viewportWidth / 5) - viewportWidth / 2 + (Math.random() * 100 - 50);
  const startY = (Math.floor(index / 5)) * (viewportHeight / 4) - viewportHeight / 2 + (Math.random() * 100 - 50);
  
  const edgeFactor = 1.2;
  const finalX = 0;
  const finalY = 0;
  
  // Transform based on scroll progress
  const x = useTransform(
    progress,
    [0, 0.3, 0.6, 0.9, 1],
    [startX * edgeFactor, startX * 0.6, startX * 0.3, startX * 0.1, finalX]
  );
  
  const y = useTransform(
    progress,
    [0, 0.3, 0.6, 0.9, 1],
    [startY * edgeFactor, startY * 0.6, startY * 0.3, startY * 0.1, finalY]
  );
  
  const scale = useTransform(
    progress,
    [0, 0.3, 0.6, 0.85, 1],
    [0.7, 0.85, 1, 1.1, 0]
  );
  
  const opacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 0.95, 1],
    [0.3, 0.6, 0.9, 1, 0.7, 0]
  );
  
  const rotate = useTransform(
    progress,
    [0, 0.3, 0.6, 1],
    [(index % 3 - 1) * 15, (index % 3 - 1) * 8, 0, 0]
  );

  const labelOpacity = useTransform(
    progress,
    [0, 0.2, 0.8, 0.95],
    [0.5, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute flex items-center gap-2"
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
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon size={14} className="text-accent" />
        </div>
        <motion.span 
          className="font-mono text-xs text-charcoal whitespace-nowrap"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
};

// Converged value visualization
const ConvergedValue = ({ 
  progress, 
  locale 
}: { 
  progress: ReturnType<typeof useSpring>;
  locale: Locale;
}) => {
  const opacity = useTransform(progress, [0.85, 0.95, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0.85, 0.95], [0.3, 1]);
  const y = useTransform(progress, [0.85, 0.95], [30, 0]);
  
  const glowIntensity = useTransform(progress, [0.9, 1], [0.3, 0.8]);
  
  const businessValueText = locale === 'tr' 
    ? 'İş Değeri' 
    : locale === 'it' 
    ? 'Valore Business' 
    : 'Business Value';
  
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity, scale, y }}
    >
      <motion.div
        className="relative"
        style={{
          boxShadow: useTransform(
            glowIntensity,
            (val) => `0 0 ${val * 60}px rgba(201, 169, 106, ${val * 0.6})`
          )
        }}
      >
        {/* Central gem/value icon */}
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-accent via-accent/90 to-accent/70 flex items-center justify-center transform rotate-45 shadow-2xl">
          <div className="transform -rotate-45">
            <Gem size={36} className="text-charcoal md:w-12 md:h-12" />
          </div>
        </div>
        
        {/* Value text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
          style={{
            opacity: useTransform(progress, [0.9, 1], [0, 1])
          }}
        >
          <span className="font-serif text-lg md:text-xl text-charcoal font-medium">
            {businessValueText}
          </span>
        </motion.div>
      </motion.div>
      
      {/* Rising trend visualization */}
      <svg 
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-40 h-20 md:w-56 md:h-24"
        viewBox="0 0 200 60"
      >
        <motion.path
          d="M 10 50 Q 50 45 80 35 T 140 15 T 190 5"
          fill="none"
          stroke="url(#valueGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ 
            pathLength: useTransform(progress, [0.92, 1], [0, 1]),
            opacity: useTransform(progress, [0.92, 1], [0, 1])
          }}
        />
        <defs>
          <linearGradient id="valueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(201, 169, 106, 0.4)" />
            <stop offset="100%" stopColor="rgba(201, 169, 106, 1)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Sparkles around the value */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${-30 + Math.sin(i * 0.785) * 80}%`,
            left: `${50 + Math.cos(i * 0.785) * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        >
          <Sparkles size={10} className="text-accent" />
        </motion.div>
      ))}
    </motion.div>
  );
};

// Phase card component - now with scroll-based visibility
const PhaseCard = ({ 
  phase, 
  title, 
  description, 
  index,
  progress
}: { 
  phase: string;
  title: string;
  description: string;
  index: number;
  progress: ReturnType<typeof useSpring>;
}) => {
  // Each phase is visible for 1/3 of the scroll
  const phaseStart = index * 0.33;
  const phaseEnd = (index + 1) * 0.33;
  const phaseMid = (phaseStart + phaseEnd) / 2;
  
  // Much better readability - cards are fully opaque for most of their phase
  const opacity = useTransform(
    progress,
    [
      phaseStart - 0.03,
      phaseStart + 0.02,
      phaseMid - 0.05,
      phaseMid + 0.05,
      phaseEnd - 0.02,
      phaseEnd + 0.03
    ],
    [0, 1, 1, 1, 1, 0]
  );
  
  // Very subtle vertical movement
  const y = useTransform(
    progress,
    [
      phaseStart - 0.03,
      phaseStart + 0.02,
      phaseMid,
      phaseEnd - 0.02,
      phaseEnd + 0.03
    ],
    [10, 0, 0, 0, -10]
  );
  
  // No scale change - keeps cards crisp
  const scale = useTransform(
    progress,
    [
      phaseStart - 0.03,
      phaseStart + 0.02,
      phaseEnd - 0.02,
      phaseEnd + 0.03
    ],
    [1, 1, 1, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 p-4 sm:p-6 md:p-8 rounded-2xl bg-white border border-border shadow-sm flex items-center"
      style={{ opacity, y, scale, pointerEvents: useTransform(opacity, (o) => o > 0.5 ? 'auto' : 'none') }}
    >
      <div className="relative z-10 w-full">
        {/* Phase indicator */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-accent text-charcoal flex-shrink-0">
            <span className="font-serif text-base sm:text-lg font-medium">{index + 1}</span>
          </div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent">
            {phase}
          </span>
        </div>
        
        {/* Content */}
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal mb-2 sm:mb-3 leading-tight">
          {title}
        </h3>
        <p className="font-mono text-xs sm:text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const SmeJourney: React.FC<SmeJourneyProps> = ({ locale, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = React.useState({ width: 1920, height: 1080 });
  
  // Update viewport size on mount and resize
  React.useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
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

  const dataLabels = getDataLabels(locale);

  // Phase data with translations
  const phases = [
    {
      phase: locale === 'tr' ? 'Faz 1' : locale === 'it' ? 'Fase 1' : 'Phase 1',
      title: locale === 'tr' ? 'Veri Kaosu' : locale === 'it' ? 'Caos dei Dati' : 'Data Chaos',
      description: locale === 'tr' 
        ? 'Dağınık elektronik tablolar, tutarsız raporlar ve çelişkili metrikler. Değerli içgörüler, yapılandırılmamış bilgi yığınlarının altında gömülü duruyor.'
        : locale === 'it'
        ? 'Fogli di calcolo sparsi, report incoerenti e metriche contraddittorie. Intuizioni preziose sepolte sotto montagne di dati non strutturati.'
        : 'Scattered spreadsheets, inconsistent reports, and conflicting metrics. Valuable insights buried under mountains of unstructured information.',
    },
    {
      phase: locale === 'tr' ? 'Faz 2' : locale === 'it' ? 'Fase 2' : 'Phase 2',
      title: locale === 'tr' ? 'Yapılandırılmış Zeka' : locale === 'it' ? 'Intelligenza Strutturata' : 'Structured Intelligence',
      description: locale === 'tr'
        ? 'AI ve NLP işleme verilerinizi bir bağlantılı ağa dönüştürür. Kalıplar ortaya çıkar, ilişkiler netleşir ve bilgi anlamlı hale gelir.'
        : locale === 'it'
        ? 'L\'elaborazione AI e NLP trasforma i tuoi dati in una rete connessa. I pattern emergono, le relazioni diventano chiare.'
        : 'AI and NLP processing transforms your data into a connected network. Patterns emerge, relationships become clear, and information becomes meaningful.',
    },
    {
      phase: locale === 'tr' ? 'Faz 3' : locale === 'it' ? 'Fase 3' : 'Phase 3',
      title: locale === 'tr' ? 'Sermayeye Dönüşüm' : locale === 'it' ? 'Trasformazione in Capitale' : 'Transformation to Capital',
      description: locale === 'tr'
        ? 'İşlenmiş veriler eyleme dönüştürülebilir içgörülere dönüşür. Kârlılığı artırın, riskleri azaltın ve ölçülebilir iş değeri yaratın.'
        : locale === 'it'
        ? 'I dati elaborati diventano insight azionabili. Aumenta la redditività, riduci i rischi e crea valore aziendale misurabile.'
        : 'Processed data becomes actionable insights. Drive profitability, reduce risks, and create measurable business value.',
    },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative bg-cream min-h-[500vh] md:min-h-[450vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden z-10">
        {/* Background - matching homepage */}
        <div className="absolute inset-0 bg-cream" />
        
        {/* Subtle grid pattern like homepage */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          {/* Desktop Layout */}
          <div className="hidden lg:flex h-full flex-row items-center justify-center gap-16 py-20">
            
            {/* Left side - Single phase card that changes */}
            <div className="w-1/2 flex flex-col justify-center">
              {/* Section header - Always visible */}
              <div className="mb-8 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-accent"></div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'The Journey'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
                  {locale === 'tr' 
                    ? 'Veri Kaosunu Sermayeye Dönüştürmek' 
                    : locale === 'it' 
                    ? 'Trasformare il Caos dei Dati in Capitale'
                    : 'Turning Data Chaos into Capital'}
                </h2>
              </div>
              
              {/* Single phase card container - shows one at a time, uses full space */}
              <div className="relative w-full h-[450px] lg:h-[500px]">
                {phases.map((phase, index) => (
                  <PhaseCard
                    key={index}
                    {...phase}
                    index={index}
                    progress={smoothProgress}
                  />
                ))}
              </div>
            </div>
            
            {/* Right side - Visual animation area */}
            <div className="w-1/2 flex items-center justify-center relative h-full">
              <div className="relative w-full h-full max-h-[600px]">
                {/* Data points scattered across viewport */}
                {dataLabels.map((label, index) => (
                  <DataPoint
                    key={index}
                    label={label}
                    index={index}
                    progress={smoothProgress}
                    totalPoints={dataLabels.length}
                    viewportWidth={viewportSize.width}
                    viewportHeight={viewportSize.height}
                  />
                ))}
                
                {/* Converged value visualization */}
                <ConvergedValue progress={smoothProgress} locale={locale} />
              </div>
            </div>
          </div>

          {/* Mobile Layout - Stacked vertically */}
          <div className="lg:hidden flex flex-col h-full py-4 sm:py-6 overflow-hidden">
            {/* Section header - Always visible at top */}
            <div className="mb-3 sm:mb-4 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 sm:w-12 h-[2px] bg-accent"></div>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent">
                  {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'The Journey'}
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal leading-tight">
                {locale === 'tr' 
                  ? 'Veri Kaosunu Sermayeye Dönüştürmek' 
                  : locale === 'it' 
                  ? 'Trasformare il Caos dei Dati in Capitale'
                  : 'Turning Data Chaos into Capital'}
              </h2>
            </div>

            {/* Visual animation area - Fixed height, no overflow */}
            <div className="flex-shrink-0 flex items-center justify-center relative h-[180px] sm:h-[220px] mb-3 sm:mb-4">
              <div className="relative w-full h-full">
                {/* Data points scattered across viewport */}
                {dataLabels.map((label, index) => (
                  <DataPoint
                    key={index}
                    label={label}
                    index={index}
                    progress={smoothProgress}
                    totalPoints={dataLabels.length}
                    viewportWidth={viewportSize.width}
                    viewportHeight={viewportSize.height}
                  />
                ))}
                
                {/* Converged value visualization - appears at end */}
                <ConvergedValue progress={smoothProgress} locale={locale} />
              </div>
            </div>

            {/* Phase cards - Single card that changes, uses full remaining space */}
            <div className="relative flex-1 w-full min-h-[280px] sm:min-h-[320px] overflow-hidden">
              {phases.map((phase, index) => (
                <PhaseCard
                  key={index}
                  {...phase}
                  index={index}
                  progress={smoothProgress}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-charcoal/20"
              style={{
                backgroundColor: useTransform(
                  smoothProgress,
                  [i * 0.33, i * 0.33 + 0.1, (i + 1) * 0.33 - 0.1, (i + 1) * 0.33],
                  ['rgba(0,0,0,0.2)', 'rgba(201,169,106,1)', 'rgba(201,169,106,1)', 'rgba(0,0,0,0.2)']
                ),
              }}
            />
          ))}
        </div>
        
        {/* Scroll hint - hidden on mobile */}
        <motion.div
          className="hidden md:block absolute bottom-8 right-8 font-mono text-xs text-muted z-20"
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
