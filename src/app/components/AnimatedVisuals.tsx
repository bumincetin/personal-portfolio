'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Animated Neural Network
export const NeuralNetwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  const nodes = [
    // Input layer
    { x: 20, y: 30 }, { x: 20, y: 50 }, { x: 20, y: 70 },
    // Hidden layer 1
    { x: 40, y: 25 }, { x: 40, y: 45 }, { x: 40, y: 65 }, { x: 40, y: 85 },
    // Hidden layer 2
    { x: 60, y: 30 }, { x: 60, y: 50 }, { x: 60, y: 70 },
    // Output layer
    { x: 80, y: 40 }, { x: 80, y: 60 },
  ];

  const connections = [
    // Input to hidden 1
    [0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6],
    // Hidden 1 to hidden 2
    [3, 7], [3, 8], [4, 7], [4, 8], [4, 9], [5, 8], [5, 9], [6, 8], [6, 9],
    // Hidden 2 to output
    [7, 10], [7, 11], [8, 10], [8, 11], [9, 10], [9, 11],
  ];

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {connections.map(([from, to], idx) => (
          <motion.line
            key={`conn-${idx}`}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-accent/30"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: idx * 0.05 }}
          />
        ))}
        
        {/* Signal animation along connections */}
        {connections.map(([from, to], idx) => (
          <motion.circle
            key={`signal-${idx}`}
            r="1"
            fill="currentColor"
            className="text-accent"
            initial={{ opacity: 0 }}
            animate={{
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: idx * 0.1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node, idx) => (
          <motion.circle
            key={`node-${idx}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2.5"
            fill="currentColor"
            className="text-charcoal"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Animated Dashboard Chart
export const DashboardChart: React.FC<{ className?: string }> = ({ className = '' }) => {
  const bars = [35, 55, 45, 70, 60, 85, 50, 75, 65, 90];
  
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y, idx) => (
          <motion.line
            key={`grid-${idx}`}
            x1="10"
            y1={80 - y * 0.7}
            x2="95"
            y2={80 - y * 0.7}
            stroke="currentColor"
            strokeWidth="0.2"
            className="text-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          />
        ))}
        
        {/* Bars */}
        {bars.map((height, idx) => (
          <motion.rect
            key={`bar-${idx}`}
            x={12 + idx * 8.5}
            y={80 - height * 0.7}
            width="6"
            height={height * 0.7}
            fill="currentColor"
            className={idx % 2 === 0 ? 'text-accent' : 'text-charcoal/60'}
            initial={{ height: 0, y: 80 }}
            animate={{ height: height * 0.7, y: 80 - height * 0.7 }}
            transition={{ duration: 0.6, delay: 0.8 + idx * 0.1, ease: 'easeOut' }}
          />
        ))}
        
        {/* Trend line */}
        <motion.polyline
          points="15,55 23,40 32,48 40,25 49,35 57,18 66,30 74,22 83,15 91,8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
        
        {/* Data points on trend line */}
        {[[15, 55], [40, 25], [57, 18], [91, 8]].map(([x, y], idx) => (
          <motion.circle
            key={`point-${idx}`}
            cx={x}
            cy={y}
            r="2"
            fill="currentColor"
            className="text-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 + idx * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Animated Data Flow
export const DataFlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 60" className="w-full h-full">
        {/* Data nodes */}
        <motion.rect x="5" y="20" width="15" height="20" rx="2" fill="currentColor" className="text-charcoal/20"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} />
        <motion.rect x="5" y="5" width="10" height="10" rx="1" fill="currentColor" className="text-charcoal/20"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} />
        <motion.rect x="5" y="45" width="12" height="10" rx="1" fill="currentColor" className="text-charcoal/20"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} />
        
        {/* Processing box */}
        <motion.rect x="35" y="15" width="30" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-accent"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
        <motion.text x="50" y="33" textAnchor="middle" fontSize="6" fill="currentColor" className="text-accent font-mono"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>AI</motion.text>
        
        {/* Output */}
        <motion.circle cx="85" cy="30" r="10" fill="currentColor" className="text-accent/20"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
        <motion.path d="M80,30 L85,35 L92,25" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.4 }} />
        
        {/* Flow lines */}
        <motion.path d="M20,30 Q27,30 35,30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.3 }} />
        <motion.path d="M15,10 Q25,20 35,25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.3 }} />
        <motion.path d="M17,50 Q26,40 35,35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.3 }} />
        <motion.path d="M65,30 Q72,30 75,30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.3 }} />
        
        {/* Animated particles */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            r="1.5"
            fill="currentColor"
            className="text-accent"
            initial={{ cx: 20, cy: 30, opacity: 0 }}
            animate={{
              cx: [20, 35, 65, 75],
              cy: [30, 30, 30, 30],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Animated Finance Graph
export const FinanceGraph: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 60" className="w-full h-full">
        {/* Candlesticks */}
        {[
          { x: 10, open: 35, close: 45, high: 50, low: 30, up: true },
          { x: 20, open: 45, close: 40, high: 48, low: 35, up: false },
          { x: 30, open: 40, close: 48, high: 52, low: 38, up: true },
          { x: 40, open: 48, close: 42, high: 50, low: 40, up: false },
          { x: 50, open: 42, close: 55, high: 58, low: 40, up: true },
          { x: 60, open: 55, close: 52, high: 57, low: 48, up: false },
          { x: 70, open: 52, close: 60, high: 62, low: 50, up: true },
          { x: 80, open: 60, close: 58, high: 65, low: 55, up: false },
          { x: 90, open: 58, close: 68, high: 70, low: 56, up: true },
        ].map((candle, idx) => (
          <motion.g key={idx}>
            {/* Wick */}
            <motion.line
              x1={candle.x}
              y1={60 - candle.high}
              x2={candle.x}
              y2={60 - candle.low}
              stroke="currentColor"
              strokeWidth="0.5"
              className={candle.up ? 'text-green-600' : 'text-red-500'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            />
            {/* Body */}
            <motion.rect
              x={candle.x - 2.5}
              y={60 - Math.max(candle.open, candle.close)}
              width="5"
              height={Math.abs(candle.close - candle.open)}
              fill="currentColor"
              className={candle.up ? 'text-green-600' : 'text-red-500'}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            />
          </motion.g>
        ))}
        
        {/* Moving average line */}
        <motion.path
          d="M10,25 Q25,30 35,22 T55,15 T75,10 T90,-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-accent"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
    </div>
  );
};
