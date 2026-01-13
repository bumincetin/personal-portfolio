'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Database, Cpu, Gem, ArrowDown } from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface TheDataSculptorProps {
  locale: Locale;
  t: TranslationType;
}

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

  const opacity = useTransform(progress, [0, 0.3], [0.5, 0]);
  
  const x1 = useTransform(glitchIntensity, (v: number) => Math.sin(time * 0.01) * v * 3);
  const y1 = useTransform(glitchIntensity, (v: number) => Math.cos(time * 0.01) * v * 2);
  const x2 = useTransform(glitchIntensity, (v: number) => Math.cos(time * 0.008) * v * -3);
  const y2 = useTransform(glitchIntensity, (v: number) => Math.sin(time * 0.008) * v * -2);

  return (
    <motion.div
      className="absolute inset-0 preserve-3d"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-0 border border-red-500/30"
        style={{ x: x1, y: y1 }}
      />
      <motion.div 
        className="absolute inset-0 border border-cyan-500/30"
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
}) => {
  const cubeSize = 180; // px
  const halfSize = cubeSize / 2;

  // Face styles for the cube
  const faceBaseStyle = "absolute w-full h-full border backdrop-blur-sm";
  
  return (
    <div 
      className="relative preserve-3d"
      style={{ 
        width: cubeSize, 
        height: cubeSize,
        perspective: '1000px',
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
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}15`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}40`),
            borderRadius,
            boxShadow: useTransform(glowColor, (c: string) => `0 0 30px ${c}30, inset 0 0 30px ${c}10`),
          }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-2 grid grid-cols-4 grid-rows-4 gap-1 opacity-40">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="border"
                style={{
                  borderColor: useTransform(phaseColor, (c: string) => `${c}30`),
                  borderRadius: useTransform(progress, [0.6, 1], ['0px', '2px']),
                }}
              />
            ))}
          </div>
          
          {/* Scan line - Phase 2 */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              top: useTransform(scanProgress, [0, 1], ['0%', '100%']),
              opacity: useTransform(progress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]),
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
            }}
          />
        </motion.div>

        {/* Back Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}10`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}30`),
            borderRadius,
          }}
        />

        {/* Right Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateX(${halfSize}px) rotateY(90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}12`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}35`),
            borderRadius,
          }}
        />

        {/* Left Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateX(-${halfSize}px) rotateY(-90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}12`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}35`),
            borderRadius,
          }}
        />

        {/* Top Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateY(-${halfSize}px) rotateX(90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}08`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}25`),
            borderRadius,
          }}
        />

        {/* Bottom Face */}
        <motion.div
          className={faceBaseStyle}
          style={{
            transform: `translateY(${halfSize}px) rotateX(-90deg)`,
            backgroundColor: useTransform(phaseColor, (c: string) => `${c}18`),
            borderColor: useTransform(phaseColor, (c: string) => `${c}45`),
            borderRadius,
            boxShadow: useTransform(glowColor, (c: string) => `0 0 40px ${c}40`),
          }}
        />

        {/* Center Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateZ(${halfSize + 1}px)`,
            opacity: useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        >
          <motion.div
            style={{
              color: useTransform(phaseColor, (c: string) => c),
              filter: useTransform(glowColor, (c: string) => `drop-shadow(0 0 10px ${c})`),
            }}
          >
            {/* Icon changes based on phase */}
            <motion.div style={{ opacity: useTransform(progress, [0, 0.3], [1, 0]) }}>
              <Database size={40} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-8 rounded-full"
        style={{
          background: useTransform(
            glowColor,
            (c: string) => `radial-gradient(circle, ${c}20 0%, transparent 70%)`
          ),
          scale: useTransform(progress, [0, 0.5, 1], [0.8, 1.2, 1]),
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
}: {
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: MotionValue<number>;
  phaseIndex: number;
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
    [30, 0, 0, 0, -30]
  );

  // Gradient colors for each phase
  const gradientColors = [
    'from-gray-400 via-gray-300 to-gray-500', // Silver - Phase 1
    'from-cyan-400 via-blue-400 to-indigo-500', // Blue - Phase 2
    'from-amber-400 via-yellow-400 to-orange-500', // Gold - Phase 3
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-md p-6 md:p-8 rounded-2xl bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Phase badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${gradientColors[phaseIndex]}
          `}>
            <Icon size={20} className="text-charcoal" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            {phase}
          </span>
        </div>

        {/* Title with gradient */}
        <h3 className={`
          font-serif text-2xl md:text-3xl mb-4 leading-tight
          bg-gradient-to-r ${gradientColors[phaseIndex]} bg-clip-text text-transparent
        `}>
          {title}
        </h3>

        {/* Description */}
        <p className="font-mono text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const TheDataSculptor: React.FC<TheDataSculptorProps> = ({ locale, t }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Cube transformations
  const rotateX = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [-15, 0, 10, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [-25, 45, 180, 360]);
  const scale = useTransform(smoothProgress, [0, 0.33, 0.66, 1], [0.9, 1, 1.1, 1.2]);
  const borderRadius = useTransform(smoothProgress, [0, 0.33, 0.66, 1], ['4px', '8px', '12px', '16px']);

  // Phase-specific effects
  const glitchIntensity = useTransform(smoothProgress, [0, 0.3], [5, 0]);
  const scanProgress = useTransform(smoothProgress, [0.33, 0.66], [0, 1]);

  // Colors per phase
  const phaseColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.33, 0.6, 0.66, 1],
    ['#9CA3AF', '#9CA3AF', '#22D3EE', '#22D3EE', '#F59E0B', '#F59E0B']
  );

  const glowColor = useTransform(
    smoothProgress,
    [0, 0.3, 0.33, 0.6, 0.66, 1],
    ['#6B7280', '#6B7280', '#06B6D4', '#06B6D4', '#D97706', '#D97706']
  );

  // Background gradient
  const bgGradient = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [
      'radial-gradient(ellipse at center, rgba(31,41,55,0.3) 0%, rgba(17,24,39,0.9) 70%)',
      'radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, rgba(17,24,39,0.95) 70%)',
      'radial-gradient(ellipse at center, rgba(217,119,6,0.15) 0%, rgba(17,24,39,0.95) 70%)',
      'radial-gradient(ellipse at center, rgba(245,158,11,0.2) 0%, rgba(17,24,39,0.9) 70%)',
    ]
  );

  // Phase content
  const phases = [
    {
      phase: locale === 'tr' ? 'Faz I' : locale === 'it' ? 'Fase I' : 'Phase I',
      title: locale === 'tr' ? 'Ham Madde' : locale === 'it' ? 'Materia Prima' : 'The Raw Material',
      description: locale === 'tr'
        ? 'Dağınık veri noktaları, yapılandırılmamış bilgi ve kaotik girişler. Değer henüz gizli, şekillenmemiş bir kütle olarak bekliyor.'
        : locale === 'it'
        ? 'Punti dati sparsi, informazioni non strutturate e input caotici. Il valore attende, nascosto in una massa informe.'
        : 'Scattered data points, unstructured information, and chaotic inputs. Value awaits, hidden within a shapeless mass.',
      icon: Database,
    },
    {
      phase: locale === 'tr' ? 'Faz II' : locale === 'it' ? 'Fase II' : 'Phase II',
      title: locale === 'tr' ? 'Arıtma' : locale === 'it' ? 'Raffinamento' : 'The Refinement',
      description: locale === 'tr'
        ? 'AI algoritmaları veriyi tarar, kalıpları tanımlar ve kaos içinden düzen oluşturur. Her satır, her sütun artık bir anlam taşıyor.'
        : locale === 'it'
        ? 'Gli algoritmi AI scansionano i dati, identificano pattern e creano ordine dal caos. Ogni riga, ogni colonna ora porta significato.'
        : 'AI algorithms scan the data, identify patterns, and create order from chaos. Every row, every column now carries meaning.',
      icon: Cpu,
    },
    {
      phase: locale === 'tr' ? 'Faz III' : locale === 'it' ? 'Fase III' : 'Phase III',
      title: locale === 'tr' ? 'Değerli Varlık' : locale === 'it' ? 'L\'Asset Prezioso' : 'The Precious Asset',
      description: locale === 'tr'
        ? 'İşlenmiş veri artık altın gibi parlıyor. Eyleme dönüştürülebilir içgörüler, stratejik kararlar ve ölçülebilir iş değeri yaratıldı.'
        : locale === 'it'
        ? 'I dati elaborati ora brillano come oro. Insight azionabili, decisioni strategiche e valore aziendale misurabile sono stati creati.'
        : 'Processed data now shines like gold. Actionable insights, strategic decisions, and measurable business value have been forged.',
      icon: Gem,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[400vh] bg-charcoal"
    >
      {/* Sticky Visual Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dynamic Background */}
        <motion.div
          className="absolute inset-0"
          style={{ background: bgGradient }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Main content area */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            
            {/* Left: Section Header (Desktop only) */}
            <div className="hidden lg:block w-1/3">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-[2px] bg-accent"></div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {locale === 'tr' ? 'Dönüşüm' : locale === 'it' ? 'Trasformazione' : 'Transformation'}
                  </span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl text-white leading-tight mb-4">
                  {locale === 'tr'
                    ? 'Veri Heykeltıraşı'
                    : locale === 'it'
                    ? 'Lo Scultore di Dati'
                    : 'The Data Sculptor'}
                </h2>
                <p className="font-mono text-sm text-white/50">
                  {locale === 'tr'
                    ? 'Verinin sanata, kaosun değere dönüştüğü yolculuk.'
                    : locale === 'it'
                    ? 'Il viaggio dove i dati diventano arte, il caos diventa valore.'
                    : 'The journey where data becomes art, chaos becomes value.'}
                </p>
              </motion.div>

              {/* Progress indicator */}
              <div className="space-y-4">
                {phases.map((phase, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    style={{
                      opacity: useTransform(
                        smoothProgress,
                        [i * 0.33 - 0.1, i * 0.33, (i + 1) * 0.33, (i + 1) * 0.33 + 0.1],
                        [0.3, 1, 1, 0.3]
                      ),
                    }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: useTransform(
                          smoothProgress,
                          [i * 0.33 - 0.05, i * 0.33, (i + 1) * 0.33, (i + 1) * 0.33 + 0.05],
                          ['rgba(255,255,255,0.3)', phaseColor.get(), phaseColor.get(), 'rgba(255,255,255,0.3)']
                        ),
                        boxShadow: useTransform(
                          smoothProgress,
                          [i * 0.33, (i + 1) * 0.33],
                          [`0 0 10px ${glowColor.get()}`, `0 0 10px ${glowColor.get()}`]
                        ),
                      }}
                    />
                    <span className="font-mono text-xs text-white/50">{phase.phase}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center: 3D Cube */}
            <div className="flex-shrink-0 flex items-center justify-center">
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
              />
            </div>

            {/* Right: Phase Cards */}
            <div className="w-full lg:w-1/3 relative h-[400px] lg:h-[500px]">
              {phases.map((phase, index) => (
                <PhaseCard
                  key={index}
                  {...phase}
                  progress={smoothProgress}
                  phaseIndex={index}
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
          <span className="font-mono text-xs text-white/40">
            {locale === 'tr' ? 'Keşfetmek için kaydır' : locale === 'it' ? 'Scorri per esplorare' : 'Scroll to explore'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-white/40" />
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gray-400 via-cyan-400 to-amber-400"
          style={{
            width: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
          }}
        />
      </div>
    </section>
  );
};

export default TheDataSculptor;
