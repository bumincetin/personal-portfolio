'use client';

import React, { useState } from 'react';
import { PieChart } from 'lucide-react';
import { ASSETS, type Ticker, type AssetGroup } from '@/lib/optimizer/universe';
import type { Vec } from '@/lib/optimizer/linalg';
import { ASSET_COLORS, GROUP_LABELS, fmtPct, fmtSignedPct } from './format';
import { PanelTitle } from './primitives';

export default function AllocationChart({ weights, mu, prior }: { weights: Vec; mu: Vec; prior: Vec }) {
  const [hover, setHover] = useState<Ticker | null>(null);

  const rows = ASSETS.map((a, i) => ({ asset: a, w: weights[i], mu: mu[i], prior: prior[i] })).sort((a, b) => b.w - a.w);
  const groups = (['equity', 'rates', 'real'] as AssetGroup[]).map((g) => ({
    id: g,
    label: GROUP_LABELS[g],
    total: rows.filter((r) => r.asset.group === g).reduce((s, r) => s + r.w, 0),
  }));

  return (
    <div>
      <PanelTitle icon={PieChart} title="Asset Allocation · w*" hint="0 ≤ wᵢ ≤ 40% · Σw = 1" />
      <div className="p-4">
        {/* Segmented bar */}
        <div className="flex h-7 w-full gap-[2px] rounded-[3px] overflow-hidden" role="img" aria-label="Allocation bar">
          {rows
            .filter((r) => r.w > 0.001)
            .map((r) => (
              <div
                key={r.asset.ticker}
                className="relative flex items-center justify-center transition-[flex-basis,opacity] duration-300 ease-editorial"
                style={{
                  flexBasis: `${r.w * 100}%`,
                  background: ASSET_COLORS[r.asset.ticker],
                  opacity: hover && hover !== r.asset.ticker ? 0.45 : 1,
                }}
                title={`${r.asset.ticker} · ${r.asset.name} · ${fmtPct(r.w)}`}
                onMouseEnter={() => setHover(r.asset.ticker)}
                onMouseLeave={() => setHover(null)}
              >
                {r.w >= 0.08 ? (
                  <span className="font-mono text-[10px] tracking-wider text-cream mix-blend-luminosity select-none">{r.asset.ticker}</span>
                ) : null}
              </div>
            ))}
        </div>

        {/* Group chips */}
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
          {groups.map((g) => (
            <span key={g.id} className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {g.label} <span className="text-charcoal tabular-nums">{fmtPct(g.total, 0)}</span>
            </span>
          ))}
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
                <tr
                  key={r.asset.ticker}
                  className={`border-t border-border/70 transition-colors ${active ? 'bg-accent/5' : ''} ${zero ? 'opacity-50' : ''}`}
                  onMouseEnter={() => setHover(r.asset.ticker)}
                  onMouseLeave={() => setHover(null)}
                >
                  <td className="py-1.5 pr-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span aria-hidden="true" className="inline-block w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ background: ASSET_COLORS[r.asset.ticker] }} />
                      <span className="font-mono text-xs text-charcoal w-9 shrink-0">{r.asset.ticker}</span>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
