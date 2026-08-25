'use client';

import React from 'react';
import { Table2 } from 'lucide-react';
import type { AllocationResult, SimulationOutput } from '@/lib/optimizer/engine';
import { STRATEGY_COLORS, fmtMoney, fmtNum, fmtPct } from './format';
import { PanelTitle } from './primitives';

type Key = 'adaptive' | 'benchmark' | 'cash';

interface Row {
  label: string;
  hint?: string;
  values: Record<Key, number>;
  format: (v: number) => string;
  /** Which direction is "better", for the subtle emphasis on the best cell. */
  better: 'high' | 'low';
}

export default function ComparisonTable({ alloc, sim }: { alloc: AllocationResult; sim: SimulationOutput }) {
  const [ad, bm, cs] = sim.strategies;
  const s = alloc.stats;

  const rows: Row[] = [
    { label: 'Expected return', hint: 'μ_BL · annual', values: { adaptive: s.adaptive.ret, benchmark: s.benchmark.ret, cash: s.cash.ret }, format: (v) => fmtPct(v, 2), better: 'high' },
    { label: 'Volatility', hint: 'σ · annual', values: { adaptive: s.adaptive.vol, benchmark: s.benchmark.vol, cash: s.cash.vol }, format: (v) => fmtPct(v, 2), better: 'low' },
    { label: '95% CVaR', hint: '1-yr expected tail loss', values: { adaptive: s.adaptive.cvar, benchmark: s.benchmark.cvar, cash: s.cash.cvar }, format: (v) => fmtPct(v, 2), better: 'low' },
    { label: 'Simulated Sharpe', hint: 'from the paths', values: { adaptive: ad.simulated.sharpe, benchmark: bm.simulated.sharpe, cash: cs.simulated.sharpe }, format: (v) => fmtNum(v, 2), better: 'high' },
    { label: 'Median wealth', hint: `year ${Number(ad.times[ad.times.length - 1].toFixed(1))}`, values: { adaptive: ad.terminal.p50, benchmark: bm.terminal.p50, cash: cs.terminal.p50 }, format: fmtMoney, better: 'high' },
    { label: 'Stress wealth', hint: '5th percentile', values: { adaptive: ad.terminal.p5, benchmark: bm.terminal.p5, cash: cs.terminal.p5 }, format: fmtMoney, better: 'high' },
    { label: 'Bull wealth', hint: '95th percentile', values: { adaptive: ad.terminal.p95, benchmark: bm.terminal.p95, cash: cs.terminal.p95 }, format: fmtMoney, better: 'high' },
    { label: 'P(shortfall)', hint: 'ends below money paid in', values: { adaptive: ad.shortfallProbability, benchmark: bm.shortfallProbability, cash: cs.shortfallProbability }, format: (v) => fmtPct(v, 1), better: 'low' },
  ];

  const cols: { key: Key; label: string; color: string }[] = [
    { key: 'adaptive', label: 'Adaptive Geopolitical', color: STRATEGY_COLORS.adaptive },
    { key: 'benchmark', label: 'Static 60/40', color: STRATEGY_COLORS.benchmark },
    { key: 'cash', label: '100% T-Bills', color: STRATEGY_COLORS.cash },
  ];

  return (
    <div>
      <PanelTitle icon={Table2} title="Strategy Comparison" hint={`paid in ${fmtMoney(sim.totalContributed)}`} />
      <div className="p-4 pt-2 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse">
          <thead>
            <tr>
              <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-light font-normal py-2 pr-2">
                Metric
              </th>
              {cols.map((c) => (
                <th key={c.key} scope="col" className="text-right font-mono text-[10px] uppercase tracking-wider text-muted font-normal py-2 pl-2">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px]" style={{ background: c.color }} />
                    {c.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const vals = cols.map((c) => r.values[c.key]);
              const bestVal = r.better === 'high' ? Math.max(...vals) : Math.min(...vals);
              return (
                <tr key={r.label} className="border-t border-border/70">
                  <th scope="row" className="text-left py-1.5 pr-2 font-normal">
                    <span className="font-sans text-xs text-charcoal">{r.label}</span>
                    {r.hint ? <span className="block font-mono text-[10px] text-muted-light">{r.hint}</span> : null}
                  </th>
                  {cols.map((c) => {
                    const v = r.values[c.key];
                    const best = Math.abs(v - bestVal) < 1e-12;
                    return (
                      <td key={c.key} className={`py-1.5 pl-2 text-right font-mono text-xs tabular-nums ${best ? 'text-charcoal' : 'text-muted'}`}>
                        {r.format(v)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
