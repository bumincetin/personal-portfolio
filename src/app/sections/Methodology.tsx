'use client';

import React from 'react';
import GlassCard from '../components/ui/GlassCard';

const Methodology: React.FC = () => {
  return (
    <section id="services" className="py-32 container mx-auto px-6">
      <div className="mb-16">
        <p className="text-accent-cyan font-mono mb-4">01 // METHODOLOGY</p>
        <h2 className="font-serif text-5xl md:text-6xl text-text-primary">Data Meets Design</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
          <div className="w-full h-[100px] mb-8 relative bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent bg-[length:100%_100%] overflow-hidden">
             {/* Abstract Chart Line */}
             <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-r from-transparent to-[rgba(0,240,255,0.2)] [clip-path:polygon(0_100%,_0_80%,_20%_60%,_40%_90%,_60%_40%,_80%_50%,_100%_20%,_100%_100%)]"></div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Financial Modeling</h3>
            <p className="text-text-muted text-sm leading-relaxed">Building robust, stress-tested models that predict outcomes with high statistical significance.</p>
          </div>
        </GlassCard>

        {/* Card 2 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
           <div className="w-full h-[100px] mb-8 relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(112,0,255,0.2),_transparent)]"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
           </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Algorithmic Strategy</h3>
            <p className="text-text-muted text-sm leading-relaxed">Automating decision frameworks to remove emotional bias from market entry and exit points.</p>
          </div>
        </GlassCard>

        {/* Card 3 */}
        <GlassCard className="p-8 md:p-12 min-h-[320px] flex flex-col justify-between">
          <div className="w-full h-[100px] mb-8 relative flex items-center justify-center">
             <div className="w-10 h-10 border border-accent-cyan rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-accent-cyan rounded-full"></div>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-[1px] bg-glass-border"></div>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-2">Data Visualization</h3>
            <p className="text-text-muted text-sm leading-relaxed">Translating terabytes of raw financial data into clear, actionable executive dashboards.</p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default Methodology;

