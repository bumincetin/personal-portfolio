'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PieChart } from 'lucide-react';
import { PieChart as BklitPieChart } from '../ui/bklit/pie-chart';
import { PieSlice } from '../ui/bklit/pie-slice';
import { ASSETS, type Ticker, type AssetGroup } from '@/lib/optimizer/universe';
import type { Vec } from '@/lib/optimizer/linalg';
import { ASSET_COLORS, GROUP_LABELS, fmtPct, fmtSignedPct } from './format';
import { PanelTitle } from './primitives';

export default function AllocationChart({ weights, mu, prior }: { weights: Vec; mu: Vec; prior: Vec }) {
  const [hover, setHover] = useState<Ticker | null>(null);
  const reduced = useReducedMotion();

  const rows = ASSETS.map((a, i) => ({ asset: a, w: weights[i], mu: mu[i], prior: prior[i] })).sort((a, b) => b.w - a.w);
  // Stable slice order avoids morphing one asset into another when weights reorder.
  const slices = ASSETS.map((asset, i) => ({ label: asset.ticker, value: weights[i], color: ASSET_COLORS[asset.ticker] }));
  const hoveredIndex = hover ? ASSETS.findIndex(asset => asset.ticker === hover) : null;
  const selected = rows.find(row => row.asset.ticker === hover);
  const groups = (['equity', 'rates', 'real'] as AssetGroup[]).map((g) => ({
    id: g,
    label: GROUP_LABELS[g],
    total: rows.filter((r) => r.asset.group === g).reduce((s, r) => s + r.w, 0),
  }));

  return (
    <div>
      <PanelTitle icon={PieChart} title="Asset Allocation · w*" hint="0 ≤ wᵢ ≤ 40% · Σw = 1" />
      <div className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-5">
          <div className="relative" role="img" aria-label="Portfolio allocation donut; exact weights in the table below">
            <BklitPieChart data={slices} size={168} innerRadius={54} padAngle={0.025} cornerRadius={3}
              hoveredIndex={hoveredIndex} onHoverChange={index => setHover(index === null ? null : ASSETS[index].ticker)}
              hoverOffset={reduced ? 0 : 4} enterStaggerScale={0} geometryScrubbing={!!reduced}>
              {!reduced && slices.map((slice, index) => <PieSlice key={slice.label} index={index} animate={!reduced} showGlow={false} hoverEffect={reduced ? 'none' : 'translate'} />)}
            </BklitPieChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-lg tabular-nums text-charcoal">{selected ? fmtPct(selected.w) : '100%'}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted">{selected ? selected.asset.ticker : 'Allocated'}</span>
            </div>
          </div>
          <div className="space-y-2 font-mono text-xs text-muted">
            {groups.map(group => <p key={group.id} className="flex min-w-32 justify-between gap-6"><span>{group.label}</span><span className="tabular-nums text-charcoal">{fmtPct(group.total, 0)}</span></p>)}
          </div>
        </div>
        {/* Rows */}
        <table className="mt-3 w-full border-collapse">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-wider text-muted-light">
              <th scope="col" className="text-left font-normal pb-1.5">
                Asset
              </th>
              <th scope="col" className="text-right font-normal pb-1.5 w-16">
                Weight
              </th>
              <th scope="col" className="text-right font-normal pb-1.5 w-16 hidden sm:table-cell">
                μ<sub>BL</sub>
              </th>
              <th scope="col" className="text-right font-normal pb-1.5 w-16 hidden sm:table-cell">
                vs Π
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const zero = r.w < 0.001;
              const active = hover === r.asset.ticker;
              const delta = r.mu - r.prior;
              return (
                <motion.tr layout="position" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 360, damping: 32 }}
                  key={r.asset.ticker}
                  data-unallocated={zero || undefined}
                  className={`border-t border-border/70 transition-colors ${active ? 'bg-accent/5' : ''} ${zero ? 'bg-surface-alt' : ''}`}
                  onMouseEnter={() => setHover(r.asset.ticker)}
                  onMouseLeave={() => setHover(null)}
                >
                  <td className="py-1.5 pr-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ background: ASSET_COLORS[r.asset.ticker] }} />
                      <button type="button" aria-label={`${r.asset.name}: ${fmtPct(r.w)}`} aria-pressed={active}
                        onFocus={() => setHover(r.asset.ticker)} onBlur={() => setHover(null)}
                        onClick={() => setHover(r.asset.ticker)}
                        className="min-h-6 w-9 shrink-0 rounded text-left font-mono text-xs text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">{r.asset.ticker}</button>
                      <span className="font-sans text-xs text-muted truncate" title={r.asset.description}>
                        {r.asset.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-1.5 text-right font-mono text-xs text-charcoal tabular-nums">{fmtPct(r.w)}</td>
                  <td className="py-1.5 text-right font-mono text-xs text-muted tabular-nums hidden sm:table-cell">{fmtPct(r.mu)}</td>
                  <td className="py-1.5 text-right font-mono text-xs tabular-nums hidden sm:table-cell">
                    <span className={delta > 0.0005 ? 'text-positive' : delta < -0.0005 ? 'text-negative' : 'text-muted-light'}>{fmtSignedPct(delta)}</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
