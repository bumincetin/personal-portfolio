'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { 
  Database, 
  Cpu, 
  Gem, 
  ArrowDown,
  BarChart3,
  Users,
  Target,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  TrendingUp,
  FileText,
  Zap,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface TheDataSculptorProps {
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

// Data point component that converges to cube
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
  progress: MotionValue<number>;
  totalPoints: number;
  viewportWidth: number;
  viewportHeight: number;
}) => {
  const Icon = getIconForLabel(label, index);
  
  // Start positions - scattered across viewport with slight randomness
  const angle = (index / totalPoints) * Math.PI * 2;
  const radius = Math.max(viewportWidth, viewportHeight) * 0.4;
  const startX = Math.cos(angle) * radius + (Math.random() * 40 - 20);
  const startY = Math.sin(angle) * radius + (Math.random() * 40 - 20);
  
  const finalX = 0;
  const finalY = 0;
  
  // Transform based on scroll progress - converge to center
  const x = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 0.9],
    [startX, startX * 0.6, startX * 0.3, startX * 0.1, finalX]
  );
  
  const y = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 0.9],
    [startY, startY * 0.6, startY * 0.3, startY * 0.1, finalY]
  );
  
  const scale = useTransform(
    progress,
    [0, 0.3, 0.6, 0.85, 0.9],
    [0.8, 0.9, 1, 1.1, 0]
  );
  
  const opacity = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 0.9],
    [0.4, 0.7, 1, 0.8, 0]
  );
  
  const rotate = useTransform(
    progress,
    [0, 0.5, 0.9],
    [(index % 3 - 1) * 12, (index % 3 - 1) * 4, 0]
  );

  const labelOpacity = useTransform(
    progress,
    [0, 0.2, 0.8, 0.9],
    [0.6, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute flex items-center gap-2 pointer-events-none"
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
      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-white/95 border border-border/60 shadow-sm backdrop-blur-sm">
        <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon size={12} className="text-accent" />
        </div>
        <motion.span 
          className="font-mono text-[10px] text-charcoal/80 whitespace-nowrap"
          style={{ opacity: labelOpacity }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
};

// Glitch layer component for Phase 1
const GlitchLayer = ({
  progress,
  glitchIntensity,
}: {
  progress: MotionValue<number>;
  glitchIntensity: MotionValue<number>;
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  const opacity = useTransform(progress, [0, 0.3], [0.4, 0]);
  
  const x1 = useTransform(glitchIntensity, (v: number) => Math.sin(time * 0.01) * v * 2);
  const y1 = useTransform(glitchIntensity, (v: number) => Math.cos(time * 0.01) * v * 1.5);
  const x2 = useTransform(glitchIntensity, (v: number) => Math.cos(time * 0.008) * v * -2);
  const y2 = useTransform(glitchIntensity, (v: number) => Math.sin(time * 0.008) * v * -1.5);

  return (
    <motion.div
      className="absolute inset-0 preserve-3d"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-0 border border-red-400/20"
        style={{ x: x1, y: y1 }}
      />
      <motion.div 
        className="absolute inset-0 border border-cyan-400/20"
        style={{ x: x2, y: y2 }}
      />
    </motion.div>
  );
};

// The 3D Cube Component with 6 faces
const DataCube = ({ 
  progress,
  rotateX,
  rotateY,
  scale,
  glitchIntensity,
  scanProgress,
  phaseColor,
  glowColor,
  borderRadius,
  locale,
  isMobile = false,
}: {
  progress: MotionValue<number>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  glitchIntensity: MotionValue<number>;
  scanProgress: MotionValue<number>;
  phaseColor: MotionValue<string>;
  glowColor: MotionValue<string>;
  borderRadius: MotionValue<string>;
  locale: Locale;
  isMobile?: boolean;
}) => {
  // Responsive cube size
  const cubeSize = isMobile ? 140 : 200;
  const halfSize = cubeSize / 2;

  // Face styles for the cube
  const faceBaseStyle = "absolute w-full h-full border-2 border-charcoal backdrop-blur-sm";
  
  return (
    <div 
      className="relative preserve-3d border-2 border-charcoal"
      style={{ 
        width: cubeSize, 
        height: cubeSize,
        perspective: isMobile ? '500px' : '1000px',
      }}
    >
      {/* Glitch layers - only visible in Phase 1 */}
      <GlitchLayer progress={progress} glitchIntensity={glitchIntensity} />

      {/* Main Cube Container */}
      <motion.div
        className="relative w-full h-full preserve-3d will-change-transform"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateZ(${halfSize}px)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}20`),
            borderRadius,
            boxShadow: useTransform(glowColor, (c: string) => `0 0 25px ${c}25, inset 0 0 25px ${c}08`),
          }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-1 opacity-30">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="border"
                style={{
                  borderColor: useTransform(phaseColor, (c: string) => `${c}25`),
                  borderRadius: useTransform(progress, [0.6, 1], ['0px', '2px']),
                }}
              />
            ))}
          </div>
          
          {/* Scan line - Phase 2 */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              top: useTransform(scanProgress, [0, 1], ['0%', '100%']),
              opacity: useTransform(progress, [0.3, 0.4, 0.6, 0.7], [0, 0.8, 0.8, 0]),
              boxShadow: '0 0 15px rgba(34, 211, 238, 0.6)',
            }}
          />
        </motion.div>

        {/* Back Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}15`),
            borderRadius,
          }}
        />

        {/* Right Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateX(${halfSize}px) rotateY(90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}18`),
            borderRadius,
          }}
        />

        {/* Left Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateX(-${halfSize}px) rotateY(-90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}18`),
            borderRadius,
          }}
        />

        {/* Top Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateY(-${halfSize}px) rotateX(90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}12`),
            borderRadius,
          }}
        />

        {/* Bottom Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateY(${halfSize}px) rotateX(-90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}22`),
            borderRadius,
            boxShadow: useTransform(glowColor, (c: string) => `0 0 35px ${c}35`),
          }}
        />

        {/* Center Icon - Phase 1-3 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateZ(${halfSize + 1}px)`,
            opacity: useTransform(progress, [0, 0.1, 0.85, 0.9], [0, 1, 1, 0]),
          }}
        >
          <motion.div
            style={{
              color: useTransform(phaseColor, (c: string) => c),
              filter: useTransform(glowColor, (c: string) => `drop-shadow(0 0 8px ${c})`),
            }}
          >
            {/* Icon changes based on phase */}
            <motion.div style={{ opacity: useTransform(progress, [0, 0.3], [1, 0]) }}>
              <Database size={36} />
            </motion.div>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: useTransform(progress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]) }}
            >
              <Cpu size={36} />
            </motion.div>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: useTransform(progress, [0.66, 0.75, 0.85, 0.9], [0, 1, 1, 0]) }}
            >
              <Gem size={36} />
            </motion.div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-6 rounded-full pointer-events-none"
        style={{
          background: useTransform(
            glowColor,
            (c: string) => `radial-gradient(circle, ${c}15 0%, transparent 70%)`
          ),
          scale: useTransform(progress, [0, 0.5, 1], [0.7, 1.1, 1]),
        }}
      />
    </div>
  );
};

// Phase content card
const PhaseCard = ({
  phase,
  title,
  description,
  icon: Icon,
  progress,
  phaseIndex,
  isMobile = false,
}: {
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: MotionValue<number>;
  phaseIndex: number;
  isMobile?: boolean;
}) => {
  const phaseStart = phaseIndex * 0.33;
  const phaseEnd = (phaseIndex + 1) * 0.33;
  const phaseMid = (phaseStart + phaseEnd) / 2;

  const opacity = useTransform(
    progress,
    [phaseStart - 0.05, phaseStart + 0.05, phaseMid, phaseEnd - 0.05, phaseEnd + 0.05],
    [0, 1, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [phaseStart - 0.05, phaseStart + 0.05, phaseMid, phaseEnd - 0.05, phaseEnd + 0.05],
    [20, 0, 0, 0, -20]
  );

  // Gradient colors for each phase
  const gradientColors = [
    'from-gray-500 via-gray-400 to-gray-600', // Silver - Phase 1
    'from-cyan-500 via-blue-500 to-indigo-600', // Blue - Phase 2
    'from-amber-500 via-yellow-500 to-orange-600', // Gold - Phase 3
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ opacity, y, pointerEvents: 'none' }}
    >
      <div className={`w-full max-w-md rounded-lg bg-white/95 backdrop-blur-sm border border-border/60 shadow-lg ${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
        {/* Phase badge */}
        <div className={`flex items-center gap-2.5 ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <div className={`
            ${isMobile ? 'w-7 h-7' : 'w-9 h-9'} rounded-lg flex items-center justify-center
            bg-gradient-to-br ${gradientColors[phaseIndex]}
          `}>
            <Icon size={isMobile ? 14 : 18} className="text-white" />
          </div>
          <span className={`font-mono uppercase tracking-[0.15em] text-muted ${isMobile ? 'text-[9px]' : 'text-[10px]'}`}>
            {phase}
          </span>
        </div>

        {/* Title with gradient */}
        <h3 className={`
          font-serif ${isMobile ? 'text-base' : 'text-xl md:text-2xl'} ${isMobile ? 'mb-2' : 'mb-3'} leading-tight
          bg-gradient-to-r ${gradientColors[phaseIndex]} bg-clip-text text-transparent
        `}>
          {title}
        </h3>

        {/* Description */}
        <p className={`font-mono text-charcoal/70 leading-relaxed ${isMobile ? 'text-[10px]' : 'text-xs md:text-sm'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const TheDataSculptor: React.FC<TheDataSculptorProps> = ({ locale, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Cube transformations - more organic, less perfect, reduced on mobile
  const rotateX = useTransform(smoothProgress, [0, 0.33, 0.66, 1], isMobile ? [-8, 1, 5, 0] : [-12, 2, 8, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.33, 0.66, 1], isMobile ? [-15, 30, 120, 360] : [-20, 42, 175, 360]);
  const scale = useTransform(smoothProgress, [0, 0.33, 0.66, 1], isMobile ? [0.9, 1, 1.05, 1.1] : [0.85, 1, 1.08, 1.15]);
  const borderRadius = useTransform(smoothProgress, [0, 0.33, 0.66, 1], isMobile ? ['2px', '4px', '6px', '8px'] : ['3px', '6px', '10px', '14px']);

  // Phase-specific effects
  const glitchIntensity = useTransform(smoothProgress, [0, 0.3], [4, 0]);
  const scanProgress = useTransform(smoothProgress, [0.33, 0.66], [0, 1]);

  // Colors per phase - more muted, natural
  const phaseColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.33, 0.6, 0.66, 1],
    ['#6B7280', '#6B7280', '#0891B2', '#0891B2', '#D97706', '#D97706']
  );

  const glowColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.33, 0.6, 0.66, 1],
    ['#4B5563', '#4B5563', '#06B6D4', '#06B6D4', '#F59E0B', '#F59E0B']
  );

  // Phase content - more elaborate descriptions
  const phases = [
    {
      phase: locale === 'tr' ? 'Faz I' : locale === 'it' ? 'Fase I' : 'Phase I',
      title: locale === 'tr' ? 'Ham Madde' : locale === 'it' ? 'Materia Prima' : 'The Raw Material',
      description: locale === 'tr'
        ? 'İşletmenizin farklı köşelerinde dağınık halde duran veriler: Excel dosyaları, e-postalar, CRM kayıtları, finansal raporlar. Her biri kendi başına değerli ama birbirinden kopuk. Bu kaotik yığın, henüz şekillenmemiş bir kütle gibi bekliyor. Manuel işlemler, tekrarlayan görevler ve gözden kaçan fırsatlar bu fazın karakteristiği. Veri var ama anlam yok, bilgi var ama içgörü yok.'
        : locale === 'it'
        ? 'Dati sparsi negli angoli della vostra azienda: file Excel, email, record CRM, rapporti finanziari. Ognuno prezioso da solo, ma scollegato dagli altri. Questa massa caotica attende, informe. Processi manuali, compiti ripetitivi e opportunità perse caratterizzano questa fase. Ci sono dati ma nessun significato, informazioni ma nessuna intuizione.'
        : 'Data scattered across your business: Excel files, emails, CRM records, financial reports. Each valuable alone, but disconnected. This chaotic mass awaits, shapeless. Manual processes, repetitive tasks, and missed opportunities characterize this phase. Data exists but meaning doesn\'t, information exists but insight doesn\'t.',
      icon: Database,
    },
    {
      phase: locale === 'tr' ? 'Faz II' : locale === 'it' ? 'Fase II' : 'Phase II',
      title: locale === 'tr' ? 'Arıtma' : locale === 'it' ? 'Raffinamento' : 'The Refinement',
      description: locale === 'tr'
        ? 'Yapay zeka algoritmaları devreye giriyor. Makine öğrenmesi modelleri veriyi tarıyor, kalıpları tanımlıyor, anormallikleri tespit ediyor. NLP sistemleri yapılandırılmamış metinleri anlamlandırıyor, bilgisayarlı görü sistemleri görsellerden veri çıkarıyor. Kaos içinden düzen doğuyor. Her satır, her sütun, her veri noktası artık bir anlam taşıyor. Otomasyon başlıyor, verimlilik artıyor, hatalar azalıyor. Veri işleniyor, temizleniyor, zenginleştiriliyor.'
        : locale === 'it'
        ? 'Gli algoritmi di intelligenza artificiale entrano in gioco. I modelli di machine learning scansionano i dati, identificano pattern, rilevano anomalie. I sistemi NLP danno significato ai testi non strutturati, la computer vision estrae dati dalle immagini. L\'ordine nasce dal caos. Ogni riga, ogni colonna, ogni punto dati ora porta significato. L\'automazione inizia, l\'efficienza aumenta, gli errori diminuiscono. I dati vengono elaborati, puliti, arricchiti.'
        : 'AI algorithms come into play. Machine learning models scan data, identify patterns, detect anomalies. NLP systems give meaning to unstructured text, computer vision extracts data from images. Order emerges from chaos. Every row, every column, every data point now carries meaning. Automation begins, efficiency rises, errors decrease. Data is processed, cleaned, enriched.',
      icon: Cpu,
    },
    {
      phase: locale === 'tr' ? 'Faz III' : locale === 'it' ? 'Fase III' : 'Phase III',
      title: locale === 'tr' ? 'Değerli Varlık' : locale === 'it' ? 'L\'Asset Prezioso' : 'The Precious Asset',
      description: locale === 'tr'
        ? 'İşlenmiş veri artık altın gibi parıldıyor. Eyleme dönüştürülebilir içgörüler, stratejik kararlar ve ölçülebilir iş değeri yaratılıyor. Tahmine dayalı modeller geleceği öngörüyor, risk analizi şirketi koruyor, optimizasyon algoritmaları maliyetleri düşürüyor. Müşteri segmentasyonu pazarlama bütçesini maksimize ediyor, finansal modeller yatırım kararlarını yönlendiriyor. Veri artık sadece bilgi değil, rekabet avantajı. Sadece rapor değil, stratejik pusula. Sadece sayılar değil, sermaye.'
        : locale === 'it'
        ? 'I dati elaborati ora brillano come oro. Insight azionabili, decisioni strategiche e valore aziendale misurabile sono stati creati. I modelli predittivi prevedono il futuro, l\'analisi del rischio protegge l\'azienda, gli algoritmi di ottimizzazione riducono i costi. La segmentazione dei clienti massimizza il budget di marketing, i modelli finanziari guidano le decisioni di investimento. I dati non sono più solo informazioni, ma vantaggio competitivo. Non solo rapporti, ma bussola strategica. Non solo numeri, ma capitale.'
        : 'Processed data now shines like gold. Actionable insights, strategic decisions, and measurable business value have been forged. Predictive models forecast the future, risk analysis protects the company, optimization algorithms reduce costs. Customer segmentation maximizes marketing budget, financial models guide investment decisions. Data is no longer just information, but competitive advantage. Not just reports, but strategic compass. Not just numbers, but capital.',
      icon: Gem,
    },
  ];

  const dataLabels = getDataLabels(locale);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] bg-cream"
    >
      {/* Sticky Visual Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26,26,26,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26,26,26,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Converging Data Points - fewer on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none">
          {dataLabels.slice(0, isMobile ? 12 : 20).map((label, index) => (
            <DataPoint
              key={index}
              label={label}
              index={index}
              progress={smoothProgress}
              totalPoints={isMobile ? 12 : 20}
              viewportWidth={viewportSize.width}
              viewportHeight={viewportSize.height}
            />
          ))}
        </div>

        {/* Main content area */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            
            {/* Left: Section Header (Desktop only) */}
            <div className="hidden lg:block w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-8"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-[1.5px] bg-accent"></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'Transformation'}
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-charcoal leading-tight mb-3">
                  {locale === 'tr'
                    ? 'Veri Heykeltıraşı'
                    : locale === 'it'
                    ? 'Lo Scultore di Dati'
                    : 'The Data Sculptor'}
                </h2>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {locale === 'tr'
                    ? 'Verinin sanata, kaosun değere dönüştüğü yolculuk.'
                    : locale === 'it'
                    ? 'Il viaggio dove i dati diventano arte, il caos diventa valore.'
                    : 'The journey where data becomes art, chaos becomes value.'}
                </p>
              </motion.div>

              {/* Progress indicator */}
              <div className="space-y-3">
                {phases.map((phase, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2.5"
                    style={{
                      opacity: useTransform(
                        smoothProgress,
                        [i * 0.33 - 0.1, i * 0.33, (i + 1) * 0.33, (i + 1) * 0.33 + 0.1],
                        [0.3, 1, 1, 0.3]
                      ),
                    }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-muted"
                      style={{
                        backgroundColor: useTransform(
                          smoothProgress,
                          [i * 0.33 - 0.05, i * 0.33, (i + 1) * 0.33, (i + 1) * 0.33 + 0.05],
                          ['#9CA3AF', '#0891B2', '#0891B2', '#9CA3AF']
                        ),
                      }}
                    />
                    <span className="font-mono text-[10px] text-muted">{phase.phase}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center: 3D Cube */}
            <div className="flex-shrink-0 flex items-center justify-center z-10 relative">
              <div className="relative" style={{ width: isMobile ? 140 : 200, height: isMobile ? 140 : 200 }}>
                <DataCube
                  progress={smoothProgress}
                  rotateX={rotateX}
                  rotateY={rotateY}
                  scale={scale}
                  glitchIntensity={glitchIntensity}
                  scanProgress={scanProgress}
                  phaseColor={phaseColor}
                  glowColor={glowColor}
                  borderRadius={borderRadius}
                  locale={locale}
                  isMobile={isMobile}
                />
                
                {/* Final Message - Phase 4 (end) - positioned on top of cube, rotating with it, coming out */}
                <motion.div
                  className="absolute left-1/2 pointer-events-none"
                  style={{
                    x: '-50%',
                    y: useTransform(smoothProgress, [0.85, 0.95, 1], isMobile ? ['-70px', '-85px', '-100px'] : ['-100px', '-120px', '-140px']),
                    opacity: useTransform(smoothProgress, [0.85, 0.95, 1], [0, 1, 1]),
                    scale: useTransform(smoothProgress, [0.85, 0.95], [0.8, 1]),
                    rotateX: isMobile ? useTransform(rotateX, (v) => v * 0.7) : rotateX,
                    rotateY: isMobile ? useTransform(rotateY, (v) => v * 0.7) : rotateY,
                    transformStyle: 'preserve-3d',
                    perspective: isMobile ? '500px' : '1000px',
                    z: useTransform(smoothProgress, [0.85, 0.95, 1], isMobile ? [0, 15, 30] : [0, 20, 40]),
                  }}
                >
                  <div 
                    className="relative text-center bg-gradient-to-b from-amber-50 via-white to-amber-50/30 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]"
                    style={{ 
                      width: isMobile ? '140px' : '200px',
                      padding: isMobile ? '12px 16px' : '16px 20px',
                      willChange: 'auto',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      border: '2px solid #1A1A1A',
                      borderTop: '3px solid #D97706',
                      borderBottom: '3px solid #D97706',
                    }}
                  >
                    {/* Decorative corner flourishes - smaller on mobile */}
                    <div className={`absolute top-1 left-1 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-l-2 border-t-2 border-charcoal/40`}></div>
                    <div className={`absolute top-1 right-1 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-r-2 border-t-2 border-charcoal/40`}></div>
                    <div className={`absolute bottom-1 left-1 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-l-2 border-b-2 border-charcoal/40`}></div>
                    <div className={`absolute bottom-1 right-1 ${isMobile ? 'w-2 h-2' : 'w-3 h-3'} border-r-2 border-b-2 border-charcoal/40`}></div>
                    
                    {/* Ornate divider lines */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 ${isMobile ? 'w-12' : 'w-16'} h-[1px] bg-gradient-to-r from-transparent via-charcoal/30 to-transparent`}></div>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${isMobile ? 'w-12' : 'w-16'} h-[1px] bg-gradient-to-r from-transparent via-charcoal/30 to-transparent`}></div>
                    
                    {/* Decorative dots */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600/60"></div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600/60"></div>
                    
                    <p 
                      className={`font-serif text-charcoal leading-relaxed font-semibold italic tracking-wide ${isMobile ? 'text-xs' : 'text-sm md:text-base lg:text-lg'}`}
                      style={{
                        fontVariant: 'small-caps',
                        letterSpacing: isMobile ? '0.03em' : '0.05em',
                        textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      }}
                    >
                      {locale === 'tr' 
                        ? 'İş Değerinin Veri Rönesansı'
                        : locale === 'it' 
                        ? 'Rinascimento dei Dati del Valore Aziendale'
                        : 'A Data Renaissance of Business Value'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Phase Cards */}
            <div className="w-full lg:w-1/3 relative h-[300px] sm:h-[350px] lg:h-[500px]">
              {phases.map((phase, index) => (
                <PhaseCard
                  key={index}
                  {...phase}
                  progress={smoothProgress}
                  phaseIndex={index}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]),
          }}
        >
          <span className="font-mono text-[10px] text-muted">
            {locale === 'tr' ? 'Keşfetmek için kaydır' : locale === 'it' ? 'Scorri per esplorare' : 'Scroll to explore'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-muted" />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gray-400 via-cyan-500 to-amber-500"
          style={{
            width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
          }}
        />
      </div>
    </section>
  );
};

export default TheDataSculptor;
