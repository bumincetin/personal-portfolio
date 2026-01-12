'use client';

import React, { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, BarChart3, TrendingUp, TrendingDown, 
  AlertCircle, CheckCircle2, ArrowRight, Download, RefreshCw,
  PieChart, DollarSign, Percent, Activity, Shield, Zap,
  ChevronDown, X, FileSpreadsheet, Eye, Lock
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

interface Props {
  locale: Locale;
  t: TranslationType;
}

type StatementType = 'balance-sheet' | 'income-statement' | 'cash-flow' | 'trial-balance';
type AnalysisStep = 'upload' | 'processing' | 'results';

interface FinancialRatio {
  name: string;
  value: number;
  benchmark: number;
  unit: string;
  status: 'good' | 'warning' | 'bad';
  interpretation: string;
}

interface AnalysisResult {
  statementType: StatementType;
  fileName: string;
  ratios: FinancialRatio[];
  insights: string[];
  warnings: string[];
  recommendations: string[];
  chartData: {
    labels: string[];
    values: number[];
    previousValues: number[];
  };
}

// Portal translations (inline for demo)
const portalTranslations = {
  en: {
    title: 'Financial Analysis Portal',
    subtitle: 'Upload your financial statements and receive instant AI-powered analysis',
    demo: 'Demo Version',
    uploadTitle: 'Upload Financial Statement',
    uploadDesc: 'Drag and drop your file or click to browse',
    supportedFormats: 'Supported formats: PDF, Excel (.xlsx, .xls), CSV, Images (PNG, JPG)',
    selectStatement: 'Select Statement Type',
    statementTypes: {
      'balance-sheet': 'Balance Sheet',
      'income-statement': 'Income Statement',
      'cash-flow': 'Cash Flow Statement',
      'trial-balance': 'Trial Balance',
    },
    analyzeButton: 'Analyze Statement',
    processing: 'Analyzing your financial data...',
    processingSteps: [
      'Reading document structure...',
      'Extracting financial data...',
      'Calculating ratios...',
      'Generating insights...',
      'Preparing visualizations...',
    ],
    results: {
      title: 'Analysis Results',
      overview: 'Financial Overview',
      ratios: 'Key Financial Ratios',
      insights: 'AI-Powered Insights',
      warnings: 'Risk Alerts',
      recommendations: 'Recommendations',
      trends: 'Trend Analysis',
      comparison: 'Industry Comparison',
    },
    ratioCategories: {
      liquidity: 'Liquidity Ratios',
      profitability: 'Profitability Ratios',
      leverage: 'Leverage Ratios',
      efficiency: 'Efficiency Ratios',
    },
    cta: {
      title: 'Want the Full Analysis?',
      desc: 'This demo shows only a fraction of our capabilities. Get comprehensive analysis with industry benchmarks, forecasting, and personalized recommendations.',
      button: 'Request Full Service',
    },
    newAnalysis: 'New Analysis',
    downloadReport: 'Download Report',
    locked: 'Premium Feature',
  },
  tr: {
    title: 'Finansal Analiz Portalı',
    subtitle: 'Mali tablolarınızı yükleyin ve yapay zeka destekli anlık analiz alın',
    demo: 'Demo Sürüm',
    uploadTitle: 'Mali Tablo Yükle',
    uploadDesc: 'Dosyanızı sürükleyip bırakın veya göz atmak için tıklayın',
    supportedFormats: 'Desteklenen formatlar: PDF, Excel (.xlsx, .xls), CSV, Görüntüler (PNG, JPG)',
    selectStatement: 'Tablo Türünü Seçin',
    statementTypes: {
      'balance-sheet': 'Bilanço',
      'income-statement': 'Gelir Tablosu',
      'cash-flow': 'Nakit Akış Tablosu',
      'trial-balance': 'Mizan',
    },
    analyzeButton: 'Tabloyu Analiz Et',
    processing: 'Finansal verileriniz analiz ediliyor...',
    processingSteps: [
      'Belge yapısı okunuyor...',
      'Finansal veriler çıkarılıyor...',
      'Oranlar hesaplanıyor...',
      'İçgörüler üretiliyor...',
      'Görselleştirmeler hazırlanıyor...',
    ],
    results: {
      title: 'Analiz Sonuçları',
      overview: 'Finansal Genel Bakış',
      ratios: 'Temel Finansal Oranlar',
      insights: 'Yapay Zeka Destekli İçgörüler',
      warnings: 'Risk Uyarıları',
      recommendations: 'Öneriler',
      trends: 'Trend Analizi',
      comparison: 'Sektör Karşılaştırması',
    },
    ratioCategories: {
      liquidity: 'Likidite Oranları',
      profitability: 'Karlılık Oranları',
      leverage: 'Kaldıraç Oranları',
      efficiency: 'Verimlilik Oranları',
    },
    cta: {
      title: 'Tam Analizi İster misiniz?',
      desc: 'Bu demo yeteneklerimizin sadece bir kısmını gösteriyor. Sektör kıyaslamaları, tahminler ve kişiselleştirilmiş önerilerle kapsamlı analiz alın.',
      button: 'Tam Hizmet Talep Et',
    },
    newAnalysis: 'Yeni Analiz',
    downloadReport: 'Raporu İndir',
    locked: 'Premium Özellik',
  },
  it: {
    title: 'Portale di Analisi Finanziaria',
    subtitle: 'Carica i tuoi bilanci e ricevi un\'analisi istantanea basata su AI',
    demo: 'Versione Demo',
    uploadTitle: 'Carica Bilancio',
    uploadDesc: 'Trascina e rilascia il tuo file o clicca per sfogliare',
    supportedFormats: 'Formati supportati: PDF, Excel (.xlsx, .xls), CSV, Immagini (PNG, JPG)',
    selectStatement: 'Seleziona Tipo di Bilancio',
    statementTypes: {
      'balance-sheet': 'Stato Patrimoniale',
      'income-statement': 'Conto Economico',
      'cash-flow': 'Rendiconto Finanziario',
      'trial-balance': 'Bilancio di Verifica',
    },
    analyzeButton: 'Analizza Bilancio',
    processing: 'Analisi dei tuoi dati finanziari in corso...',
    processingSteps: [
      'Lettura struttura documento...',
      'Estrazione dati finanziari...',
      'Calcolo rapporti...',
      'Generazione insight...',
      'Preparazione visualizzazioni...',
    ],
    results: {
      title: 'Risultati dell\'Analisi',
      overview: 'Panoramica Finanziaria',
      ratios: 'Indici Finanziari Chiave',
      insights: 'Insight basati su AI',
      warnings: 'Avvisi di Rischio',
      recommendations: 'Raccomandazioni',
      trends: 'Analisi dei Trend',
      comparison: 'Confronto di Settore',
    },
    ratioCategories: {
      liquidity: 'Indici di Liquidità',
      profitability: 'Indici di Redditività',
      leverage: 'Indici di Indebitamento',
      efficiency: 'Indici di Efficienza',
    },
    cta: {
      title: 'Vuoi l\'Analisi Completa?',
      desc: 'Questa demo mostra solo una parte delle nostre capacità. Ottieni un\'analisi completa con benchmark di settore, previsioni e raccomandazioni personalizzate.',
      button: 'Richiedi Servizio Completo',
    },
    newAnalysis: 'Nuova Analisi',
    downloadReport: 'Scarica Report',
    locked: 'Funzione Premium',
  },
};

// Mock analysis data generator
const generateMockAnalysis = (statementType: StatementType, locale: Locale): AnalysisResult => {
  const ratiosByType: Record<StatementType, FinancialRatio[]> = {
    'balance-sheet': [
      { name: locale === 'tr' ? 'Cari Oran' : locale === 'it' ? 'Indice Corrente' : 'Current Ratio', value: 1.85, benchmark: 2.0, unit: 'x', status: 'warning', interpretation: locale === 'tr' ? 'Likidite yeterli ancak sektör ortalamasının altında' : locale === 'it' ? 'Liquidità adeguata ma sotto la media del settore' : 'Adequate liquidity but below industry average' },
      { name: locale === 'tr' ? 'Asit Test Oranı' : locale === 'it' ? 'Acid Test Ratio' : 'Quick Ratio', value: 1.2, benchmark: 1.5, unit: 'x', status: 'warning', interpretation: locale === 'tr' ? 'Stoklar hariç likit varlıklar yeterli' : locale === 'it' ? 'Attività liquide adeguate escluse le scorte' : 'Liquid assets excluding inventory are adequate' },
      { name: locale === 'tr' ? 'Borç/Özkaynak' : locale === 'it' ? 'Debito/Patrimonio' : 'Debt to Equity', value: 0.65, benchmark: 1.0, unit: 'x', status: 'good', interpretation: locale === 'tr' ? 'Sağlıklı sermaye yapısı, düşük finansal risk' : locale === 'it' ? 'Struttura del capitale sana, basso rischio finanziario' : 'Healthy capital structure, low financial risk' },
      { name: locale === 'tr' ? 'Çalışma Sermayesi' : locale === 'it' ? 'Capitale Circolante' : 'Working Capital', value: 250000, benchmark: 200000, unit: '€', status: 'good', interpretation: locale === 'tr' ? 'Yeterli çalışma sermayesi mevcudiyet' : locale === 'it' ? 'Adeguata disponibilità di capitale circolante' : 'Adequate working capital availability' },
      { name: locale === 'tr' ? 'Varlık Devir Hızı' : locale === 'it' ? 'Rotazione Attività' : 'Asset Turnover', value: 1.8, benchmark: 2.0, unit: 'x', status: 'warning', interpretation: locale === 'tr' ? 'Varlık kullanım verimliliği geliştirilebilir' : locale === 'it' ? 'L\'efficienza nell\'utilizzo degli asset può essere migliorata' : 'Asset utilization efficiency can be improved' },
    ],
    'income-statement': [
      { name: locale === 'tr' ? 'Brüt Kar Marjı' : locale === 'it' ? 'Margine Lordo' : 'Gross Profit Margin', value: 42.5, benchmark: 40.0, unit: '%', status: 'good', interpretation: locale === 'tr' ? 'Güçlü brüt karlılık, fiyatlandırma gücü iyi' : locale === 'it' ? 'Forte redditività lorda, buon potere di prezzo' : 'Strong gross profitability, good pricing power' },
      { name: locale === 'tr' ? 'Net Kar Marjı' : locale === 'it' ? 'Margine Netto' : 'Net Profit Margin', value: 12.8, benchmark: 15.0, unit: '%', status: 'warning', interpretation: locale === 'tr' ? 'İşletme giderleri karlılığı etkiliyor' : locale === 'it' ? 'Le spese operative influiscono sulla redditività' : 'Operating expenses affecting profitability' },
      { name: locale === 'tr' ? 'FAVÖK Marjı' : locale === 'it' ? 'Margine EBITDA' : 'EBITDA Margin', value: 22.3, benchmark: 20.0, unit: '%', status: 'good', interpretation: locale === 'tr' ? 'Operasyonel verimlilik sektör ortalamasının üzerinde' : locale === 'it' ? 'Efficienza operativa superiore alla media del settore' : 'Operational efficiency above industry average' },
      { name: locale === 'tr' ? 'Faaliyet Kar Marjı' : locale === 'it' ? 'Margine Operativo' : 'Operating Margin', value: 18.5, benchmark: 18.0, unit: '%', status: 'good', interpretation: locale === 'tr' ? 'Çekirdek iş karlılığı sağlıklı' : locale === 'it' ? 'Redditività del core business sana' : 'Core business profitability is healthy' },
      { name: locale === 'tr' ? 'Gelir Büyümesi' : locale === 'it' ? 'Crescita Ricavi' : 'Revenue Growth', value: 8.5, benchmark: 10.0, unit: '%', status: 'warning', interpretation: locale === 'tr' ? 'Büyüme pazar ortalamasının biraz altında' : locale === 'it' ? 'Crescita leggermente sotto la media di mercato' : 'Growth slightly below market average' },
    ],
    'cash-flow': [
      { name: locale === 'tr' ? 'Nakit Akış Oranı' : locale === 'it' ? 'Rapporto Flusso di Cassa' : 'Cash Flow Ratio', value: 0.95, benchmark: 1.0, unit: 'x', status: 'warning', interpretation: locale === 'tr' ? 'Kısa vadeli borçları karşılama kapasitesi sınırda' : locale === 'it' ? 'Capacità di copertura debiti a breve termine al limite' : 'Short-term debt coverage capacity at threshold' },
      { name: locale === 'tr' ? 'Serbest Nakit Akışı' : locale === 'it' ? 'Free Cash Flow' : 'Free Cash Flow', value: 180000, benchmark: 150000, unit: '€', status: 'good', interpretation: locale === 'tr' ? 'Güçlü serbest nakit akışı, yatırım kapasitesi mevcut' : locale === 'it' ? 'Forte flusso di cassa libero, capacità di investimento disponibile' : 'Strong free cash flow, investment capacity available' },
      { name: locale === 'tr' ? 'İşletme Nakit Dönüşümü' : locale === 'it' ? 'Conversione Cassa Operativa' : 'Operating Cash Conversion', value: 85, benchmark: 80, unit: '%', status: 'good', interpretation: locale === 'tr' ? 'Karların nakde dönüşümü etkin' : locale === 'it' ? 'Conversione efficiente dei profitti in cassa' : 'Efficient conversion of profits to cash' },
      { name: locale === 'tr' ? 'Nakit Döngüsü' : locale === 'it' ? 'Ciclo di Cassa' : 'Cash Conversion Cycle', value: 45, benchmark: 40, unit: locale === 'tr' ? 'gün' : locale === 'it' ? 'giorni' : 'days', status: 'warning', interpretation: locale === 'tr' ? 'Nakit döngüsü optimize edilebilir' : locale === 'it' ? 'Il ciclo di cassa può essere ottimizzato' : 'Cash cycle can be optimized' },
    ],
    'trial-balance': [
      { name: locale === 'tr' ? 'Varlık/Borç Dengesi' : locale === 'it' ? 'Equilibrio Attivo/Passivo' : 'Asset/Liability Balance', value: 1.0, benchmark: 1.0, unit: 'x', status: 'good', interpretation: locale === 'tr' ? 'Muhasebe denkliği sağlanmış' : locale === 'it' ? 'Equilibrio contabile raggiunto' : 'Accounting equation balanced' },
      { name: locale === 'tr' ? 'Alacak Bakiyesi' : locale === 'it' ? 'Saldo Crediti' : 'Receivables Balance', value: 125000, benchmark: 100000, unit: '€', status: 'warning', interpretation: locale === 'tr' ? 'Alacak bakiyesi yüksek, tahsilat hızlandırılmalı' : locale === 'it' ? 'Saldo crediti alto, accelerare gli incassi' : 'High receivables balance, speed up collections' },
      { name: locale === 'tr' ? 'Borç Bakiyesi' : locale === 'it' ? 'Saldo Debiti' : 'Payables Balance', value: 85000, benchmark: 100000, unit: '€', status: 'good', interpretation: locale === 'tr' ? 'Borç yönetimi etkin' : locale === 'it' ? 'Gestione debiti efficace' : 'Effective payables management' },
    ],
  };

  const insightsByType: Record<StatementType, string[]> = {
    'balance-sheet': [
      locale === 'tr' ? '📊 Şirketin likidite pozisyonu sektör ortalamasına yakın ancak iyileştirme potansiyeli var.' : locale === 'it' ? '📊 La posizione di liquidità dell\'azienda è vicina alla media del settore ma c\'è potenziale di miglioramento.' : '📊 Company\'s liquidity position is near industry average but has improvement potential.',
      locale === 'tr' ? '💰 Borç/özkaynak oranı sağlıklı seviyede, bu düşük finansal risk anlamına geliyor.' : locale === 'it' ? '💰 Il rapporto debito/patrimonio è a un livello sano, indicando un basso rischio finanziario.' : '💰 Debt-to-equity ratio is at a healthy level, indicating low financial risk.',
      locale === 'tr' ? '📈 Çalışma sermayesi yeterli, kısa vadeli operasyonel ihtiyaçlar karşılanabilir.' : locale === 'it' ? '📈 Il capitale circolante è sufficiente, le esigenze operative a breve termine possono essere soddisfatte.' : '📈 Working capital is sufficient, short-term operational needs can be met.',
    ],
    'income-statement': [
      locale === 'tr' ? '📊 Brüt kar marjı sektör ortalamasının üzerinde, güçlü fiyatlandırma gücü mevcut.' : locale === 'it' ? '📊 Il margine lordo è superiore alla media del settore, indicando un forte potere di prezzo.' : '📊 Gross margin is above industry average, indicating strong pricing power.',
      locale === 'tr' ? '⚠️ Net kar marjı işletme giderlerinden etkileniyor, maliyet optimizasyonu önerilir.' : locale === 'it' ? '⚠️ Il margine netto è influenzato dalle spese operative, si consiglia l\'ottimizzazione dei costi.' : '⚠️ Net margin is affected by operating expenses, cost optimization recommended.',
      locale === 'tr' ? '💡 FAVÖK performansı güçlü, operasyonel verimlilik iyi seviyede.' : locale === 'it' ? '💡 Prestazione EBITDA forte, efficienza operativa a buon livello.' : '💡 EBITDA performance is strong, operational efficiency is at a good level.',
    ],
    'cash-flow': [
      locale === 'tr' ? '💵 Serbest nakit akışı güçlü, yatırım ve büyüme için kaynak mevcut.' : locale === 'it' ? '💵 Flusso di cassa libero forte, risorse disponibili per investimenti e crescita.' : '💵 Free cash flow is strong, resources available for investment and growth.',
      locale === 'tr' ? '⏱️ Nakit döngüsü optimize edilebilir, tahsilat ve ödeme süreleri gözden geçirilmeli.' : locale === 'it' ? '⏱️ Il ciclo di cassa può essere ottimizzato, rivedere i termini di incasso e pagamento.' : '⏱️ Cash cycle can be optimized, review collection and payment terms.',
      locale === 'tr' ? '📉 İşletme nakit dönüşüm oranı iyi, karlar etkin şekilde nakde dönüyor.' : locale === 'it' ? '📉 Il tasso di conversione della cassa operativa è buono, i profitti si convertono efficacemente in cassa.' : '📉 Operating cash conversion rate is good, profits convert efficiently to cash.',
    ],
    'trial-balance': [
      locale === 'tr' ? '✅ Muhasebe denkliği sağlanmış, kayıt bütünlüğü doğrulandı.' : locale === 'it' ? '✅ Equilibrio contabile raggiunto, integrità dei registri verificata.' : '✅ Accounting equation is balanced, record integrity verified.',
      locale === 'tr' ? '📋 Alacak bakiyesi yüksek, tahsilat süreçleri gözden geçirilmeli.' : locale === 'it' ? '📋 Saldo crediti alto, rivedere i processi di incasso.' : '📋 Receivables balance is high, collection processes should be reviewed.',
      locale === 'tr' ? '💳 Borç yönetimi etkin, vade yapısı dengeli.' : locale === 'it' ? '💳 Gestione debiti efficace, struttura delle scadenze equilibrata.' : '💳 Payables management is effective, maturity structure is balanced.',
    ],
  };

  return {
    statementType,
    fileName: 'uploaded_statement.pdf',
    ratios: ratiosByType[statementType],
    insights: insightsByType[statementType],
    warnings: [
      locale === 'tr' ? '⚠️ Bazı oranlar sektör ortalamasının altında - detaylı analiz için tam hizmeti kullanın' : locale === 'it' ? '⚠️ Alcuni indici sono sotto la media del settore - usa il servizio completo per un\'analisi dettagliata' : '⚠️ Some ratios are below industry average - use full service for detailed analysis',
    ],
    recommendations: [
      locale === 'tr' ? '💡 Likidite oranlarını iyileştirmek için kısa vadeli varlıkları artırın' : locale === 'it' ? '💡 Aumentare le attività a breve termine per migliorare gli indici di liquidità' : '💡 Increase short-term assets to improve liquidity ratios',
      locale === 'tr' ? '📊 Maliyet yapısını optimize ederek net kar marjını artırın' : locale === 'it' ? '📊 Ottimizzare la struttura dei costi per aumentare il margine netto' : '📊 Optimize cost structure to increase net profit margin',
      locale === 'tr' ? '🔄 Nakit döngüsünü kısaltmak için tahsilat süreçlerini hızlandırın' : locale === 'it' ? '🔄 Accelerare i processi di incasso per ridurre il ciclo di cassa' : '🔄 Speed up collection processes to shorten cash cycle',
    ],
    chartData: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [120, 145, 138, 165],
      previousValues: [110, 125, 130, 145],
    },
  };
};

export default function PortalPageClient({ locale, t }: Props) {
  const [step, setStep] = useState<AnalysisStep>('upload');
  const [statementType, setStatementType] = useState<StatementType>('balance-sheet');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pt = portalTranslations[locale];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setStep('processing');
    setProcessingStep(0);

    // Simulate processing steps
    for (let i = 0; i < pt.processingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(i + 1);
    }

    // Generate mock analysis
    const result = generateMockAnalysis(statementType, locale);
    result.fileName = file.name;
    setAnalysis(result);
    setStep('results');
  };

  const handleReset = () => {
    setStep('upload');
    setFile(null);
    setAnalysis(null);
    setProcessingStep(0);
  };

  // Mini chart component
  const MiniBarChart = ({ data, previousData }: { data: number[], previousData: number[] }) => {
    const max = Math.max(...data, ...previousData);
    return (
      <div className="flex items-end gap-2 h-24">
        {data.map((value, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end gap-0.5 h-16">
              <div 
                className="flex-1 bg-charcoal/20 rounded-t transition-all"
                style={{ height: `${(previousData[idx] / max) * 100}%` }}
              />
              <div 
                className="flex-1 bg-accent rounded-t transition-all"
                style={{ height: `${(value / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted">Q{idx + 1}</span>
          </div>
        ))}
      </div>
    );
  };

  // Ratio gauge component
  const RatioGauge = ({ ratio }: { ratio: FinancialRatio }) => {
    const percentage = Math.min((ratio.value / (ratio.benchmark * 1.5)) * 100, 100);
    const benchmarkPosition = (ratio.benchmark / (ratio.benchmark * 1.5)) * 100;
    
    return (
      <div className="bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-mono text-xs text-charcoal font-medium">{ratio.name}</h4>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
            ratio.status === 'good' ? 'bg-green-100 text-green-700' :
            ratio.status === 'warning' ? 'bg-amber-100 text-amber-700' :
            'bg-red-100 text-red-700'
          }`}>
            {ratio.status === 'good' ? '✓' : ratio.status === 'warning' ? '!' : '✗'}
          </span>
        </div>
        
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-serif text-2xl text-charcoal">
            {typeof ratio.value === 'number' && ratio.value >= 1000 
              ? `${(ratio.value / 1000).toFixed(0)}K` 
              : ratio.value.toFixed(ratio.unit === '%' || ratio.unit === 'x' ? 2 : 0)}
          </span>
          <span className="font-mono text-xs text-muted">{ratio.unit}</span>
        </div>
        
        {/* Progress bar */}
        <div className="relative h-2 bg-surface-alt rounded-full overflow-hidden mb-2">
          <div 
            className={`absolute h-full rounded-full transition-all ${
              ratio.status === 'good' ? 'bg-green-500' :
              ratio.status === 'warning' ? 'bg-amber-500' :
              'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
          {/* Benchmark marker */}
          <div 
            className="absolute top-0 w-0.5 h-full bg-charcoal"
            style={{ left: `${benchmarkPosition}%` }}
          />
        </div>
        
        <p className="text-[10px] text-muted leading-relaxed">{ratio.interpretation}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="font-serif text-xl text-white/90">
            Bumin Kağan Çetin
          </Link>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-mono rounded-full">
              {pt.demo}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">{pt.title}</h1>
          <p className="font-mono text-sm md:text-base text-white/60 max-w-2xl mx-auto">{pt.subtitle}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Upload Step */}
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Statement Type Selection */}
              <div className="mb-8">
                <label className="font-mono text-xs text-white/60 uppercase tracking-wider block mb-3">
                  {pt.selectStatement}
                </label>
                <div className="relative">
                  <select
                    value={statementType}
                    onChange={(e) => setStatementType(e.target.value as StatementType)}
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-4 font-mono text-sm text-white outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    {Object.entries(pt.statementTypes).map(([key, label]) => (
                      <option key={key} value={key} className="bg-[#0D1B2A] text-white">
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" size={20} />
                </div>
              </div>

              {/* File Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-accent bg-accent/10' 
                    : file 
                    ? 'border-green-500/50 bg-green-500/5' 
                    : 'border-white/20 hover:border-white/40 bg-white/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg"
                  className="hidden"
                />
                
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <p className="font-mono text-sm text-white mb-2">{file.name}</p>
                    <p className="font-mono text-xs text-white/40">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <Upload size={32} className="text-white/60" />
                    </div>
                    <p className="font-mono text-sm text-white mb-2">{pt.uploadTitle}</p>
                    <p className="font-mono text-xs text-white/40 mb-4">{pt.uploadDesc}</p>
                    <p className="font-mono text-[10px] text-white/30">{pt.supportedFormats}</p>
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file}
                className={`w-full mt-8 py-5 rounded-xl font-mono text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${
                  file 
                    ? 'bg-accent text-white hover:bg-accent/90' 
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                <BarChart3 size={20} />
                {pt.analyzeButton}
              </button>
            </motion.div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw size={40} className="text-accent" />
                </motion.div>
              </div>
              
              <h2 className="font-serif text-2xl text-white mb-8">{pt.processing}</h2>
              
              <div className="space-y-3">
                {pt.processingSteps.map((stepText, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      idx < processingStep 
                        ? 'bg-green-500/10 text-green-400' 
                        : idx === processingStep 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-white/5 text-white/30'
                    }`}
                  >
                    {idx < processingStep ? (
                      <CheckCircle2 size={18} />
                    ) : idx === processingStep ? (
                      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                        <Activity size={18} />
                      </motion.div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border border-current" />
                    )}
                    <span className="font-mono text-sm">{stepText}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results Step */}
          {step === 'results' && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">{pt.results.title}</h2>
                  <p className="font-mono text-sm text-white/60">
                    {pt.statementTypes[analysis.statementType]} • {analysis.fileName}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-white/20 rounded-lg font-mono text-xs text-white/60 hover:text-white hover:border-white/40 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={14} />
                    {pt.newAnalysis}
                  </button>
                  <button
                    className="px-4 py-2 bg-white/10 rounded-lg font-mono text-xs text-white/40 flex items-center gap-2 cursor-not-allowed"
                  >
                    <Lock size={14} />
                    {pt.downloadReport}
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {analysis.ratios.slice(0, 4).map((ratio, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="font-mono text-[10px] text-white/40 uppercase mb-1">{ratio.name}</p>
                    <p className="font-serif text-2xl text-white">
                      {ratio.value >= 1000 ? `${(ratio.value / 1000).toFixed(0)}K` : ratio.value.toFixed(ratio.unit === '%' || ratio.unit === 'x' ? 1 : 0)}
                      <span className="text-sm text-white/60 ml-1">{ratio.unit}</span>
                    </p>
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      ratio.status === 'good' ? 'bg-green-500' :
                      ratio.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Ratios */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                      <Percent size={18} className="text-accent" />
                      {pt.results.ratios}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {analysis.ratios.map((ratio, idx) => (
                        <RatioGauge key={idx} ratio={ratio} />
                      ))}
                    </div>
                  </div>

                  {/* Trend Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={18} className="text-accent" />
                      {pt.results.trends}
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded" />
                        <span className="font-mono text-xs text-white/60">{locale === 'tr' ? 'Bu Dönem' : locale === 'it' ? 'Periodo Attuale' : 'Current Period'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-charcoal/30 rounded" />
                        <span className="font-mono text-xs text-white/60">{locale === 'tr' ? 'Önceki Dönem' : locale === 'it' ? 'Periodo Precedente' : 'Previous Period'}</span>
                      </div>
                    </div>
                    <MiniBarChart data={analysis.chartData.values} previousData={analysis.chartData.previousValues} />
                  </div>
                </div>

                {/* Right: Insights */}
                <div className="space-y-6">
                  {/* Insights */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                      <Zap size={18} className="text-accent" />
                      {pt.results.insights}
                    </h3>
                    <div className="space-y-3">
                      {analysis.insights.map((insight, idx) => (
                        <div key={idx} className="p-3 bg-white/5 rounded-lg">
                          <p className="font-mono text-xs text-white/80 leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Warnings */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                    <h3 className="font-serif text-lg text-amber-400 mb-4 flex items-center gap-2">
                      <AlertCircle size={18} />
                      {pt.results.warnings}
                    </h3>
                    <div className="space-y-2">
                      {analysis.warnings.map((warning, idx) => (
                        <p key={idx} className="font-mono text-xs text-amber-200/80 leading-relaxed">{warning}</p>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations - Locked */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-center">
                        <Lock size={24} className="text-white/40 mx-auto mb-2" />
                        <p className="font-mono text-xs text-white/40">{pt.locked}</p>
                      </div>
                    </div>
                    <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                      <Shield size={18} className="text-accent" />
                      {pt.results.recommendations}
                    </h3>
                    <div className="space-y-2 blur-sm">
                      {analysis.recommendations.map((rec, idx) => (
                        <p key={idx} className="font-mono text-xs text-white/60">{rec}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">{pt.cta.title}</h3>
                <p className="font-mono text-sm text-white/60 mb-8 max-w-2xl mx-auto">{pt.cta.desc}</p>
                <Link
                  href={`/${locale}/methodology`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-mono text-sm uppercase tracking-wider rounded-xl hover:bg-accent/90 transition-colors"
                >
                  {pt.cta.button}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <p className="font-mono text-xs text-white/40">
            © 2025 Bumin Kağan Çetin
          </p>
          <Link href={`/${locale}`} className="font-mono text-xs text-white/40 hover:text-white transition-colors">
            {locale === 'tr' ? 'Ana Sayfaya Dön' : locale === 'it' ? 'Torna alla Home' : 'Back to Home'}
          </Link>
        </div>
      </footer>
    </div>
  );
}
