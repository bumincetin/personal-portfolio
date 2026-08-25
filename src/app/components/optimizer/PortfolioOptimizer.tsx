'use client';

import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import { Sigma } from 'lucide-react';
import { computeAllocation, computeSimulation, DEFAULT_INPUTS, type OptimizerInputs } from '@/lib/optimizer/engine';
import ControlPanel from './ControlPanel';
import AllocationChart from './AllocationChart';
import FanChart from './FanChart';
import ComparisonTable from './ComparisonTable';
import RiskHud from './RiskHud';
import { Panel } from './primitives';
import { fmtMs } from './format';

/**
 * Geopolitical Portfolio Optimizer.
 *
 * Everything runs in the browser: Black-Litterman posterior → CVaR-optimal
 * weights → analytic risk HUD on every input change (a few ms), and a
 * 1,000-path Student-t Monte Carlo on a deferred value so the fan chart
 * catches up a frame later without ever blocking the sliders.
 *
 * Drop-in: `<PortfolioOptimizer />`. No props required; `initial` overrides
 * the starting inputs.
 */
export default function PortfolioOptimizer({ initial, className = '' }: { initial?: Partial<OptimizerInputs>; className?: string }) {
  const [inputs, setInputs] = useState<OptimizerInputs>({ ...DEFAULT_INPUTS, ...initial });
  const onChange = useCallback((patch: Partial<OptimizerInputs>) => setInputs((prev) => ({ ...prev, ...patch })), []);

  // Hot path: reactive and cheap.
  const alloc = useMemo(() => computeAllocation(inputs), [inputs]);
  // Heavy path: trails the hot path by a render so dragging stays fluid.
  const deferredAlloc = useDeferredValue(alloc);
  const sim = useMemo(() => computeSimulation(deferredAlloc), [deferredAlloc]);
  const pending = deferredAlloc !== alloc;

  // Timings differ between server and client renders; show them only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className={`w-full text-charcoal ${className}`} aria-label="Geopolitical portfolio optimizer">
      {/* Header strip */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sigma size={14} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Black-Litterman · CVaR₉₅ · Student-t Monte Carlo</span>
          </div>
          <h2 className="font-sans font-light text-2xl md:text-3xl tracking-tight text-charcoal">Geopolitical Portfolio Optimizer</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 rounded-editorial border border-border bg-surface px-2 py-1 text-muted">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${pending ? 'bg-accent animate-pulse' : 'bg-positive'}`} aria-hidden="true" />
            client-side engine
          </span>
          <span className="rounded-editorial border border-border bg-surface px-2 py-1 text-muted tabular-nums">
            alloc {mounted ? fmtMs(alloc.timingMs) : '—'}
          </span>
          <span className="rounded-editorial border border-border bg-surface px-2 py-1 text-muted tabular-nums">
            sim {mounted ? fmtMs(sim.timingMs) : '—'}
          </span>
        </div>
      </div>

      {/* Three-column dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-1 md:order-2 lg:col-span-3 lg:order-1">
          <ControlPanel inputs={inputs} onChange={onChange} views={alloc.bl.views} />
        </div>
        <div className="md:col-span-2 md:order-1 lg:col-span-6 lg:order-2 space-y-4">
          <Panel>
            <AllocationChart weights={alloc.weights} mu={alloc.bl.mu} prior={alloc.bl.prior} />
          </Panel>
          <Panel>
            <FanChart sim={sim} pending={pending} />
          </Panel>
          <Panel>
            <ComparisonTable alloc={alloc} sim={sim} />
          </Panel>
        </div>
        <div className="md:col-span-1 md:order-3 lg:col-span-3 lg:order-3">
          <RiskHud alloc={alloc} sim={sim} mounted={mounted} />
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-light">
        Stylised capital-market assumptions; not investment advice. Posterior μ_BL and Σ_BL follow the He–Litterman closed form with τ = 0.05 and
        Ω from view confidence. Weights minimise the 95% CVaR of the one-year loss under an elliptical t(ν=5) model, subject to 0 ≤ wᵢ ≤ 40%,
        Σw = 1 and a return target set by the risk profile; the hedged profile minimises the worse of the current and full-conflict regimes.
        The fan simulates 1,000 paths with a shared fat-tail mixing variable so the three strategies are compared on identical shocks.
      </p>
    </section>
  );
}
