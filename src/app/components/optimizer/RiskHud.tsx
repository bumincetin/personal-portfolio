'use client';

import React from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, Minus, Gauge, Cpu, Swords } from 'lucide-react';
import type { AllocationResult, SimulationOutput } from '@/lib/optimizer/engine';
import { KAPPA, NU } from '@/lib/optimizer/solver';
import { fmtBps, fmtCount, fmtMs, fmtNum, fmtPct, fmtSignedPct } from './format';
import { Panel, PanelTitle } from './primitives';

function Delta({ value, format, goodWhen }: { value: number; format: (v: number) => string; goodWhen: 'high' | 'low' }) {
  const flat = Math.abs(value) < 1e-6;
  const good = goodWhen === 'high' ? value > 0 : value < 0;
  const Icon = flat ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;
  const tone = flat ? 'text-muted-light' : good ? 'text-positive' : 'text-negative';
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[11px] tabular-nums ${tone}`}>
      <Icon size={12} aria-hidden="true" />
      {format(value)} <span className="text-muted-light">vs 60/40</span>
    </span>
  );
}

function Tile({
  label,
  value,
  sub,
  hero = false,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  hero?: boolean;
}) {
  return (
    <div className="px-4 py-3 border-b border-border/70 last:border-b-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</div>
      <div className={`font-sans font-light text-charcoal tracking-tight leading-none mt-1.5 ${hero ? 'text-4xl' : 'text-2xl'}`}>{value}</div>
      {sub ? <div className="mt-1.5">{sub}</div> : null}
    </div>
  );
}

export default function RiskHud({ alloc, sim, mounted }: { alloc: AllocationResult; sim: SimulationOutput; mounted: boolean }) {
  const a = alloc.stats.adaptive;
  const b = alloc.stats.benchmark;
  const simAdaptive = sim.strategies[0];

  return (
    <Panel className="h-full">
      <PanelTitle icon={Gauge} title="Risk & Performance HUD" />
      <div>
        <Tile label="Expected annual return · μ_BL" value={fmtPct(a.ret, 2)} sub={<Delta value={a.ret - b.ret} format={fmtSignedPct} goodWhen="high" />} />
        <Tile label="Annual volatility · σ" value={fmtPct(a.vol, 2)} sub={<Delta value={a.vol - b.vol} format={fmtSignedPct} goodWhen="low" />} />
        <Tile
          label="95% CVaR · expected tail loss"
          value={fmtPct(a.cvar, 2)}
          sub={
            <div className="flex flex-col gap-0.5">
              <Delta value={a.cvar - b.cvar} format={fmtSignedPct} goodWhen="low" />
              <span className="font-mono text-[10px] text-muted-light">VaR₉₅ {fmtPct(a.var95, 1)} · 1-yr horizon</span>
            </div>
          }
        />
        <Tile
          label="Simulated Sharpe ratio"
          value={fmtNum(simAdaptive.simulated.sharpe, 2)}
          sub={
            <div className="flex flex-col gap-0.5">
              <Delta value={simAdaptive.simulated.sharpe - sim.strategies[1].simulated.sharpe} format={(v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(2)}`} goodWhen="high" />
              <span className="font-mono text-[10px] text-muted-light">analytic {fmtNum(a.sharpe, 2)} · r_f 3.5%</span>
            </div>
          }
        />
        <Tile
          label="Geopolitical resilience alpha"
          value={fmtBps(alloc.resilience.alphaBps)}
          hero
          sub={
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] text-muted">
                return edge vs 60/40 under full conflict
              </span>
              <span className={`inline-flex items-center gap-1 font-mono text-[11px] tabular-nums ${alloc.resilience.cvarEdgeBps > 0 ? 'text-positive' : alloc.resilience.cvarEdgeBps < 0 ? 'text-negative' : 'text-muted-light'}`}>
                <Swords size={12} aria-hidden="true" />
                tail loss {fmtBps(alloc.resilience.cvarEdgeBps)} {alloc.resilience.cvarEdgeBps >= 0 ? 'smaller' : 'larger'} in conflict
              </span>
            </div>
          }
        />

        {/* Stress panel */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">
            <Activity size={12} className="text-accent" aria-hidden="true" />
            Conflict stress · θ = 1
          </div>
          <table className="w-full">
            <thead>
              <tr className="font-mono text-[10px] text-muted-light">
                <th scope="col" className="text-left font-normal"></th>
                <th scope="col" className="text-right font-normal">Adaptive</th>
                <th scope="col" className="text-right font-normal">60/40</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs tabular-nums">
              <tr>
                <th scope="row" className="text-left font-normal text-muted py-0.5">μ</th>
                <td className="text-right text-charcoal">{fmtPct(alloc.resilience.adaptive.ret, 2)}</td>
                <td className="text-right text-muted">{fmtPct(alloc.resilience.benchmark.ret, 2)}</td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal text-muted py-0.5">σ</th>
                <td className="text-right text-charcoal">{fmtPct(alloc.resilience.adaptive.vol, 2)}</td>
                <td className="text-right text-muted">{fmtPct(alloc.resilience.benchmark.vol, 2)}</td>
              </tr>
              <tr>
                <th scope="row" className="text-left font-normal text-muted py-0.5">CVaR₉₅</th>
                <td className="text-right text-charcoal">{fmtPct(alloc.resilience.adaptive.cvar, 2)}</td>
                <td className="text-right text-muted">{fmtPct(alloc.resilience.benchmark.cvar, 2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Engine telemetry */}
        <div className="px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted mb-2">
            <Cpu size={12} className="text-accent" aria-hidden="true" />
            Engine telemetry
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[11px]">
            <dt className="text-muted-light">BL views</dt>
            <dd className="text-right text-charcoal tabular-nums">{alloc.bl.views.length} · τ 0.05</dd>
            <dt className="text-muted-light">Solver</dt>
            <dd className="text-right text-charcoal tabular-nums">{alloc.solve.iterations} iters · λ {alloc.solve.lambda.toFixed(3)}</dd>
            <dt className="text-muted-light">Target μ</dt>
            <dd className="text-right text-charcoal tabular-nums">
              {fmtPct(alloc.solve.target, 2)} {alloc.solve.feasible ? '' : '(clamped)'}
            </dd>
            <dt className="text-muted-light">Tail model</dt>
            <dd className="text-right text-charcoal tabular-nums">t(ν={NU}) · κ {KAPPA.toFixed(3)}</dd>
            <dt className="text-muted-light">Allocation</dt>
            <dd className="text-right text-charcoal tabular-nums">{mounted ? fmtMs(alloc.timingMs) : '—'}</dd>
            <dt className="text-muted-light">Simulation</dt>
            <dd className="text-right text-charcoal tabular-nums">{mounted ? `${fmtMs(sim.timingMs)} · ${fmtCount(sim.paths)} paths` : '—'}</dd>
          </dl>
        </div>
      </div>
    </Panel>
  );
}
