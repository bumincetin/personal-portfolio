'use client';

import React from 'react';
import { Terminal, BarChart2, Database, Cpu, Activity, Globe } from 'lucide-react';

const Ticker: React.FC = () => {
  const items = [
    { icon: Terminal, text: "PYTHON" },
    { icon: BarChart2, text: "BLOOMBERG TERMINAL" },
    { icon: Database, text: "SQL" },
    { icon: Cpu, text: "TENSORFLOW" },
    { icon: Activity, text: "R" },
    { icon: Globe, text: "MACRO ECONOMICS" },
  ];

  // Double the items for seamless loop
  const tickerItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden border-y border-glass-border py-6 bg-gradient-to-r from-void via-transparent to-void relative">
      <div className="flex animate-ticker whitespace-nowrap w-max">
        {tickerItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mx-12 text-text-muted font-mono font-semibold opacity-60">
            <item.icon size={18} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;

