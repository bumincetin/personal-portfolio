'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx'; // Import the xlsx library
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, TrendingUp, AlertCircle,
  CheckCircle2, RefreshCw, Filter, BarChart3,
  Search, Info, Calculator, FileWarning, Globe, Activity
} from 'lucide-react';
import { type Locale, type TranslationType } from '@/lib/translations';

// --- Types ---
interface Props {
  locale: Locale;
  t: TranslationType;
}

type StatementType = 'balance-sheet' | 'income-statement' | 'cash-flow';
type AnalysisStep = 'upload' | 'processing' | 'results';
type FilterCategory = 'all' | 'liquidity' | 'profitability' | 'efficiency' | 'leverage';

interface FinancialRatio {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: FilterCategory;
  status: 'good' | 'warning' | 'bad';
  interpretation: string;
  formula: string;
  sourceData: string[];
}

interface GraphData {
  available: boolean;
  title: string;
  labels: string[];
  series: { label: string; data: number[] }[];
}

interface AnalysisResult {
  statementType: StatementType;
  fileName: string;
  docLanguage: string;
  ratios: FinancialRatio[];
  insights: string[];
  graphData: GraphData;
  unparsed: any[];
  summary?: string;
}

export default function PortalPageClient({ locale, t }: Props) {
  const [step, setStep] = useState<AnalysisStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [statementType, setStatementType] = useState<StatementType>('balance-sheet');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const pt = {
    title: locale === 'tr' ? 'Finansal İstihbarat Portalı' : locale === 'it' ? 'Portale Intelligence Finanziaria' : 'Financial Intelligence Portal',
    subtitle: locale === 'tr' ? 'Yapay zeka destekli IFRS/GAAP analizi' : locale === 'it' ? 'Analisi IFRS/GAAP basata su AI' : 'AI-powered IFRS/GAAP analysis',
    upload: locale === 'tr' ? 'Tablo Yükle' : locale === 'it' ? 'Carica File' : 'Upload Statement',
    select: locale === 'tr' ? 'Tablo Türü' : locale === 'it' ? 'Tipo Documento' : 'Statement Type',
    processing: locale === 'tr' ? 'Analiz Ediliyor...' : locale === 'it' ? 'Analisi in corso...' : 'Analyzing...',
    statementTypes: {
      'balance-sheet': locale === 'tr' ? 'Bilanço' : locale === 'it' ? 'Stato Patrimoniale' : 'Balance Sheet',
      'income-statement': locale === 'tr' ? 'Gelir Tablosu' : locale === 'it' ? 'Conto Economico' : 'Income Statement',
      'cash-flow': locale === 'tr' ? 'Nakit Akış Tablosu' : locale === 'it' ? 'Rendiconto Finanziario' : 'Cash Flow Statement',
    },
    supportedFormats: locale === 'tr' ? 'Desteklenen: Excel, CSV, Metin, JSON' : locale === 'it' ? 'Supportati: Excel, CSV, Testo, JSON' : 'Supported: Excel, CSV, Text, JSON',
  };

  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setStep('processing');
    
    try {
      let fileText = '';

      // Check if the file is Excel (.xlsx or .xls)
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        fileText = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = e.target?.result;
              const workbook = XLSX.read(data, { type: 'array' });
              const firstSheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[firstSheetName];
              const csv = XLSX.utils.sheet_to_csv(worksheet);
              resolve(csv);
            } catch (err) {
              reject(new Error("Failed to parse Excel file. Is it password protected?"));
            }
          };
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsArrayBuffer(selectedFile); 
        });
      } else {
        fileText = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(new Error("Failed to read text file"));
          reader.readAsText(selectedFile);
        });
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileContent: fileText,
          statementType: statementType,
          fileName: selectedFile.name
        })
      });

      if (!response.ok) {
        // Extract the REAL error from the server
        const errorData = await response.text();
        throw new Error(`Server Error ${response.status}: ${errorData}`);
      }

      const aiData = await response.json();
      setAnalysis({ ...aiData, statementType, fileName: selectedFile.name });
      setStep('results');

    } catch (error) {
      console.error(error);
      // Show the ACTUAL error message to help debugging
      let msg = "Unknown error";
      if (error instanceof Error) msg = error.message;
      alert(`Analysis Failed: ${msg}`);
      setStep('upload');
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-accent/20">
      <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Link href={`/${locale}`} className="font-serif text-xl font-medium tracking-tight hover:opacity-70 transition-opacity">
                Bumin Kağan Çetin
             </Link>
             <span className="h-4 w-[1px] bg-charcoal/20 mx-2" />
             <span className="font-mono text-xs uppercase tracking-wider text-muted">Portal</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto mt-8"
            >
              <div className="text-center mb-10">
                <h1 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal">{pt.title}</h1>
                <p className="font-mono text-sm text-muted">{pt.subtitle}</p>
              </div>

              <div className="mb-6 bg-white p-4 border border-charcoal/10 rounded-sm shadow-sm">
                <label className="block font-mono text-xs uppercase text-muted mb-2">{pt.select}</label>
                <div className="relative">
                  <select 
                    value={statementType}
                    onChange={(e) => setStatementType(e.target.value as StatementType)}
                    className="w-full bg-cream border border-charcoal/20 p-3 font-mono text-sm focus:border-accent outline-none appearance-none cursor-pointer"
                  >
                    <option value="balance-sheet">{pt.statementTypes['balance-sheet']}</option>
                    <option value="income-statement">{pt.statementTypes['income-statement']}</option>
                    <option value="cash-flow">{pt.statementTypes['cash-flow']}</option>
                  </select>
                </div>
              </div>

              <div 
                className={`
                  relative border-2 border-dashed rounded-sm p-12 text-center transition-all duration-300 ease-out cursor-pointer
                  ${isDragging ? 'border-accent bg-accent/5' : 'border-charcoal/20 hover:border-accent hover:shadow-editorial'}
                  bg-white
                `}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx,.xls,.csv,.txt,.json,.md" 
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                />
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream border border-charcoal/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-charcoal" />
                </div>
                <h3 className="font-serif text-xl mb-2">{pt.upload}</h3>
                <p className="font-mono text-xs text-muted mb-4">{pt.supportedFormats}</p>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <div className="w-16 h-16 border-2 border-charcoal/10 border-t-accent rounded-full animate-spin mb-8" />
              <h2 className="font-serif text-2xl animate-pulse">{pt.processing}</h2>
              <p className="font-mono text-xs text-muted mt-2">Extracting Intelligence...</p>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-12 gap-8"
            >
              {/* Header */}
              <div className="col-span-12 mb-4 flex justify-between items-end border-b border-charcoal/10 pb-4">
                <div>
                   <h2 className="font-serif text-3xl mb-1">{analysis.fileName}</h2>
                   <div className="flex gap-3">
                     <span className="text-xs font-mono bg-charcoal text-white px-2 py-1 uppercase">{analysis.statementType}</span>
                     <span className="text-xs font-mono bg-accent/10 text-accent px-2 py-1 uppercase flex items-center gap-1">
                       <Globe size={12} /> Detected: {analysis.docLanguage?.toUpperCase()}
                     </span>
                   </div>
                </div>
                <button 
                  onClick={() => { setStep('upload'); setFile(null); }}
                  className="text-xs font-mono text-muted hover:text-accent flex items-center gap-2"
                >
                  <RefreshCw size={12} /> NEW ANALYSIS
                </button>
              </div>

              {/* Main Column */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                
                {/* Executive Summary */}
                <div className="bg-white p-6 border border-charcoal/5 shadow-card">
                  <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-accent" />
                    Executive Summary
                  </h3>
                  <p className="text-sm text-charcoal/80 mb-4 font-serif italic leading-relaxed">
                    "{analysis.summary}"
                  </p>
                  <ul className="space-y-2 border-t border-charcoal/5 pt-4">
                    {analysis.insights.map((insight, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-charcoal/80 font-light">
                        <span className="text-accent mt-1">●</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GRAPH SECTION (New for C-Level) */}
                {analysis.graphData?.available && (
                  <div className="bg-white p-8 border border-charcoal/5 shadow-card">
                    <h3 className="font-serif text-xl mb-6 flex items-center gap-2">
                      <BarChart3 className="text-accent" size={20} />
                      {analysis.graphData.title} (Year-over-Year)
                    </h3>
                    
                    <div className="h-48 flex items-end gap-12 px-8 border-b border-charcoal/10 pb-2">
                      {/* Metric 1 Bars */}
                      <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div className="flex items-end gap-2 h-full w-full justify-center">
                          {analysis.graphData.series[0].data.map((val, i) => {
                             const max = Math.max(...analysis.graphData.series[0].data, ...analysis.graphData.series[1].data) * 1.2;
                             return (
                               <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[60px]">
                                 <div 
                                   className="w-full bg-charcoal/80 hover:bg-charcoal transition-all relative group" 
                                   style={{ height: `${(val / max) * 100}%` }}
                                 >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                      {val.toLocaleString()}
                                    </span>
                                 </div>
                               </div>
                             )
                          })}
                        </div>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{analysis.graphData.series[0].label}</span>
                      </div>

                      {/* Divider */}
                      <div className="w-[1px] h-full bg-charcoal/10" />

                      {/* Metric 2 Bars */}
                      <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div className="flex items-end gap-2 h-full w-full justify-center">
                          {analysis.graphData.series[1].data.map((val, i) => {
                             const max = Math.max(...analysis.graphData.series[0].data, ...analysis.graphData.series[1].data) * 1.2;
                             return (
                               <div key={i} className="flex flex-col items-center gap-1 w-full max-w-[60px]">
                                 <div 
                                   className="w-full bg-accent hover:bg-accent/80 transition-all relative group" 
                                   style={{ height: `${(val / max) * 100}%` }}
                                 >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                      {val.toLocaleString()}
                                    </span>
                                 </div>
                               </div>
                             )
                          })}
                        </div>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{analysis.graphData.series[1].label}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-2 px-12">
                       {analysis.graphData.labels.map((l, i) => (
                         <span key={i} className="text-xs font-mono text-muted">{l}</span>
                       ))}
                    </div>
                  </div>
                )}

                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {analysis.ratios.map((ratio) => (
                    <div key={ratio.id} className="bg-white p-6 border border-charcoal/5 hover:shadow-editorial transition-all group">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-mono text-xs text-muted uppercase">{ratio.name}</h4>
                        <div className={`
                          w-2 h-2 rounded-full 
                          ${ratio.status === 'good' ? 'bg-green-500' : ratio.status === 'bad' ? 'bg-red-500' : 'bg-amber-500'}
                        `} />
                      </div>
                      <div className="text-3xl font-serif mb-2">
                        {ratio.value?.toFixed(2)} <span className="text-sm font-mono text-muted">{ratio.unit}</span>
                      </div>
                      <p className="text-xs text-charcoal/60 mb-4">{ratio.interpretation}</p>
                      
                      <div className="bg-cream p-3 rounded-sm border border-charcoal/5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-accent mb-1 uppercase">
                          <Search size={10} /> Source:
                        </div>
                        {ratio.sourceData?.map((src, i) => (
                          <div key={i} className="text-[10px] font-mono text-charcoal/70 truncate">
                            {src}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar: Confidence & Method */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                 <div className="bg-cream border border-charcoal/5 p-6">
                   <h4 className="font-serif text-lg mb-4 flex items-center gap-2">
                     <FileWarning size={16} className="text-orange-600" />
                     Confidence Report
                   </h4>
                   <p className="text-xs text-muted mb-4">
                     Analysis generated based on available data.
                   </p>
                   <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                     {analysis.unparsed?.map((u, i) => (
                       <div key={i} className="bg-white p-2 text-[10px] border-l-2 border-orange-300">
                         <span className="font-bold block text-orange-800">{u.location}</span>
                         <span className="font-mono text-muted block truncate">{u.content}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="bg-charcoal text-cream p-6">
                    <h4 className="font-serif text-lg mb-4">Methodology</h4>
                    <p className="text-xs opacity-70 mb-4 leading-relaxed">
                      Calculations strictly follow IFRS standards.
                    </p>
                    <div className="space-y-2">
                      {analysis.ratios.map(r => (
                        <div key={r.id} className="flex justify-between text-[10px] border-b border-white/10 pb-1">
                          <span>{r.name}</span>
                          <span className="font-mono text-accent">{r.formula}</span>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}