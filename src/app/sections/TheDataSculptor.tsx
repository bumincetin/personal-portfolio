'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import {
  Database, Cpu, Gem, ChevronDown as ArrowDown, BarChart3, Users, Target, DollarSign,
  Activity, PieChart, LineChart, TrendingUp, FileText, Zap, TrendingDown, ArrowUpRight,
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';
import DataSculpture from '@/app/components/three/DataSculpture';

interface TheDataSculptorProps {
  locale: Locale;
  t: TranslationType;
}

/* ------------------------------------------------------------- copy tables */

const getDataLabels = (locale: Locale) => {
  const labels = {
    en: [
      'Balance Sheet', 'Head Count', 'Marketing Data', 'Advertisement', 'Churn Rate',
      'User Count', 'Revenue Streams', 'Cash Flow', 'Customer Lifetime Value',
      'Conversion Rate', 'Inventory Levels', 'Sales Pipeline', 'Operating Expenses',
      'Market Share', 'Customer Acquisition Cost', 'Net Profit Margin',
      'Return on Investment', 'Employee Productivity', 'Website Traffic', 'Email Campaigns',
    ],
    tr: [
      'Bilanço', 'Personel Sayısı', 'Pazarlama Verileri', 'Reklam', 'Müşteri Kaybı Oranı',
      'Kullanıcı Sayısı', 'Gelir Akışları', 'Nakit Akışı', 'Müşteri Yaşam Boyu Değeri',
      'Dönüşüm Oranı', 'Stok Seviyeleri', 'Satış Hunisi', 'İşletme Giderleri',
      'Pazar Payı', 'Müşteri Edinme Maliyeti', 'Net Kar Marjı', 'Yatırım Getirisi',
      'Çalışan Verimliliği', 'Web Sitesi Trafiği', 'E-posta Kampanyaları',
    ],
    it: [
      'Bilancio', 'Numero Dipendenti', 'Dati di Marketing', 'Pubblicità', 'Tasso di Abbandono',
      'Numero Utenti', 'Flussi di Reddito', 'Flusso di Cassa', 'Valore Vita Cliente',
      'Tasso di Conversione', 'Livelli di Inventario', 'Pipeline Vendite', 'Spese Operative',
      'Quota di Mercato', 'Costo Acquisizione Cliente', 'Margine di Profitto Netto',
      'Ritorno sull\'Investimento', 'Produttività Dipendenti', 'Traffico Sito Web', 'Campagne Email',
    ],
  };
  return labels[locale] || labels.en;
};

const getIconForLabel = (label: string, index: number) => {
  const iconMap: Record<string, React.ElementType> = {
    'Balance Sheet': BarChart3, 'Bilanço': BarChart3, 'Bilancio': BarChart3,
    'Head Count': Users, 'Personel Sayısı': Users, 'Numero Dipendenti': Users,
    'Marketing Data': Target, 'Pazarlama Verileri': Target, 'Dati di Marketing': Target,
    'Revenue Streams': DollarSign, 'Gelir Akışları': DollarSign, 'Flussi di Reddito': DollarSign,
    'Cash Flow': Activity, 'Nakit Akışı': Activity, 'Flusso di Cassa': Activity,
    'Churn Rate': TrendingDown, 'Müşteri Kaybı Oranı': TrendingDown, 'Tasso di Abbandono': TrendingDown,
    'Conversion Rate': ArrowUpRight, 'Dönüşüm Oranı': ArrowUpRight, 'Tasso di Conversione': ArrowUpRight,
  };
  const icons = [BarChart3, Users, Target, DollarSign, Activity, PieChart, LineChart, TrendingUp, FileText, Zap];
  return iconMap[label] || icons[index % icons.length];
};

/* -------------------------------------------------- converging data labels */

const DataPoint = ({
  label,
  index,
  progress,
  totalPoints,
  viewportWidth,
  viewportHeight,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
  totalPoints: number;
  viewportWidth: number;
  viewportHeight: number;
}) => {
  const Icon = getIconForLabel(label, index);

  // Scattered around the viewport edge; each label is pulled into the
  // sculpture as the raw data gets absorbed.
  const angle = (index / totalPoints) * Math.PI * 2;
  const radius = Math.max(viewportWidth, viewportHeight) * 0.4;
  const startX = Math.cos(angle) * radius + ((index * 37) % 41) - 20;
  const startY = Math.sin(angle) * radius + ((index * 53) % 37) - 18;

  const x = useTransform(progress, [0, 0.22, 0.42, 0.58, 0.7], [startX, startX * 0.6, startX * 0.3, startX * 0.1, 0]);
  const y = useTransform(progress, [0, 0.22, 0.42, 0.58, 0.7], [startY, startY * 0.6, startY * 0.3, startY * 0.1, 0]);
  const scale = useTransform(progress, [0, 0.25, 0.5, 0.64, 0.7], [0.85, 0.92, 1, 1.04, 0]);
  const opacity = useTransform(progress, [0, 0.18, 0.42, 0.58, 0.68], [0.35, 0.7, 1, 0.6, 0]);
  const rotate = useTransform(progress, [0, 0.42, 0.7], [((index % 3) - 1) * 10, ((index % 3) - 1) * 3, 0]);

  return (
    <motion.div
      className="pointer-events-none absolute flex items-center gap-2"
      style={{ x, y, scale, opacity, rotate, left: '50%', top: '50%' }}
    >
      <div className="flex items-center gap-2 rounded-md border border-border bg-surface/80 px-2.5 py-1.5 shadow-card backdrop-blur-sm">
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-accent/10">
          <Icon size={11} className="text-accent" />
        </span>
        <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.06em] text-muted">{label}</span>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------- phase cards */

const PHASE_STYLES = [
  {
    gradientText: 'text-gradient-silver',
    chip: 'border-muted-light/40 bg-muted/10 text-muted',
    dot: '#9AA3BC',
  },
  {
    gradientText: 'text-gradient-blue',
    chip: 'border-accent-blue/40 bg-accent-blue/10 text-accent-blue',
    dot: '#7FC4FF',
  },
  {
    gradientText: 'text-gradient-gold',
    chip: 'border-accent/40 bg-accent/10 text-accent',
    dot: '#E6C879',
  },
];

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

  // Sequential, not crossfaded: the outgoing card is fully gone before the
  // next one arrives, so two translucent panels never read through each other.
  const fadeIn = phaseIndex === 0 ? phaseStart : phaseStart + 0.01;
  const keyframes = [fadeIn, fadeIn + 0.05, phaseEnd - 0.06, phaseEnd - 0.01];

  const opacity = useTransform(progress, keyframes, [phaseIndex === 0 ? 1 : 0, 1, 1, 0]);
  const y = useTransform(progress, keyframes, [phaseIndex === 0 ? 0 : 24, 0, 0, -24]);

  const style = PHASE_STYLES[phaseIndex];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ opacity, y, pointerEvents: 'none' }}
    >
      <div className={`w-full max-w-md rounded-editorial border border-border bg-surface/80 shadow-card backdrop-blur-md ${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
        <div className={`flex items-center gap-3 ${isMobile ? 'mb-3' : 'mb-4'}`}>
          <span className={`flex items-center justify-center rounded-md border ${style.chip} ${isMobile ? 'h-7 w-7' : 'h-9 w-9'}`}>
            <Icon size={isMobile ? 13 : 16} strokeWidth={1.5} />
          </span>
          <span className={`font-mono uppercase tracking-[0.18em] text-muted ${isMobile ? 'text-[9px]' : 'text-[10px]'}`}>
            {phase}
          </span>
        </div>

        <h3 className={`font-extralight tracking-tight ${style.gradientText} ${isMobile ? 'mb-2 text-lg' : 'mb-3 text-2xl md:text-3xl'}`}>
          {title}
        </h3>

        <p className={`font-sans leading-relaxed text-muted ${isMobile ? 'text-xs' : 'text-sm'}`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------- phase rail (left, desktop) */

const PhaseRailItem = ({
  label,
  index,
  progress,
}: {
  label: string;
  index: number;
  progress: MotionValue<number>;
}) => {
  const start = index * 0.33;
  const end = (index + 1) * 0.33;
  const opacity = useTransform(progress, [start - 0.1, start, end, end + 0.1], [0.35, 1, 1, 0.35]);
  const color = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    ['#5C668A', PHASE_STYLES[index].dot, PHASE_STYLES[index].dot, '#5C668A'],
  );
  const barScale = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div className="flex items-center gap-3" style={{ opacity }}>
      <motion.span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="w-14 font-mono text-[10px] tracking-[0.1em] text-muted">{label}</span>
      <span className="relative h-px w-16 overflow-hidden bg-border">
        <motion.span
          className="absolute inset-0 origin-left"
          style={{ backgroundColor: color, scaleX: barScale }}
        />
      </span>
    </motion.div>
  );
};

/* ------------------------------------------------------------ main section */

const TheDataSculptor: React.FC<TheDataSculptorProps> = ({ locale, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const updateSize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
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

  const sectionTitle = locale === 'tr' ? 'Veri Heykeltıraşı' : locale === 'it' ? 'Lo Scultore di Dati' : 'The Data Sculptor';
  const sectionTagline =
    locale === 'tr'
      ? 'Verinin sanata, kaosun değere dönüştüğü yolculuk.'
      : locale === 'it'
      ? 'Il viaggio dove i dati diventano arte, il caos diventa valore.'
      : 'The journey where data becomes art, chaos becomes value.';

  return (
    <section
      id="data-sculptor"
      ref={containerRef}
      className="relative min-h-[400vh] bg-cream/85 backdrop-blur-sm"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Faint blueprint grid behind the whole stage. */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Converging data labels. */}
        <div className="pointer-events-none absolute inset-0">
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

        <div className="relative mx-auto h-full max-w-7xl px-4 md:px-8 lg:px-16">
          {/* Mobile header, pinned at the top of the stage. */}
          <motion.div
            className="absolute inset-x-4 top-20 text-center lg:hidden"
            style={{ opacity: useTransform(smoothProgress, [0, 0.12], [1, 0]) }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'Transformation'}
            </span>
            <h2 className="mt-2 text-2xl font-extralight tracking-tight text-charcoal">{sectionTitle}</h2>
          </motion.div>

          <div className="flex h-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-12">
            {/* Left rail (desktop). */}
            <div className="hidden w-1/3 lg:block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-10"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'Transformation'}
                  </span>
                </div>
                <h2 className="mb-3 text-3xl font-extralight leading-tight tracking-tight text-charcoal lg:text-4xl">
                  {sectionTitle}
                </h2>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-muted">{sectionTagline}</p>
              </motion.div>

              <div className="space-y-3.5">
                {phases.map((phase, i) => (
                  <PhaseRailItem key={i} label={phase.phase} index={i} progress={smoothProgress} />
                ))}
              </div>
            </div>

            {/* Center: the sculpture. */}
            <div className="relative z-10 flex flex-shrink-0 items-center justify-center">
              <div className="relative h-[300px] w-[300px] md:h-[440px] md:w-[440px] lg:h-[500px] lg:w-[500px]">
                <DataSculpture progress={smoothProgress} />

                {/* Closing plaque, rising off the finished gem. */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-0 w-max max-w-[85vw]"
                  style={{
                    x: '-50%',
                    y: useTransform(smoothProgress, [0.85, 1], [26, -8]),
                    opacity: useTransform(smoothProgress, [0.85, 0.94], [0, 1]),
                    scale: useTransform(smoothProgress, [0.85, 0.95], [0.92, 1]),
                  }}
                >
                  <div className="shell-square shadow-editorial-hover">
                    <div className="rounded-editorial bg-surface/90 px-6 py-4 text-center backdrop-blur-md md:px-8 md:py-5">
                      <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                        {locale === 'tr' ? 'Sonuç' : locale === 'it' ? 'Risultato' : 'The Outcome'}
                      </span>
                      <p className="text-gradient-gold text-sm font-light tracking-[0.04em] md:text-base" style={{ fontVariant: 'small-caps' }}>
                        {locale === 'tr'
                          ? 'İş Değerinin Veri Rönesansı'
                          : locale === 'it'
                          ? 'Rinascimento dei Dati del Valore Aziendale'
                          : 'A Data Renaissance of Business Value'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: phase cards. */}
            <div className="relative h-[280px] w-full sm:h-[330px] lg:mt-16 lg:h-[500px] lg:w-1/3">
              {phases.map((phase, index) => (
                <PhaseCard key={index} {...phase} progress={smoothProgress} phaseIndex={index} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator. */}
        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="font-mono text-[10px] tracking-[0.1em] text-muted">
            {locale === 'tr' ? 'Keşfetmek için kaydır' : locale === 'it' ? 'Scorri per esplorare' : 'Scroll to explore'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-muted" />
          </motion.div>
        </motion.div>

        {/* Phase progress bar along the bottom edge. */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{
            width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            background: 'linear-gradient(90deg, #9AA3BC, #7FC4FF, #E6C879)',
            boxShadow: '0 0 8px rgba(230, 200, 121, 0.4)',
          }}
        />
      </div>
    </section>
  );
};

export default TheDataSculptor;
