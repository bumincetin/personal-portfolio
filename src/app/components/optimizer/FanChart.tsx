'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LineChart } from 'lucide-react';
import type { SimulationOutput } from '@/lib/optimizer/engine';
import { STRATEGY_COLORS, fmtMoney, fmtMoneyFull, niceTicks } from './format';
import { PanelTitle } from './primitives';

const M = { top: 14, right: 64, bottom: 26, left: 52 };
const HEIGHT = 300;

const useMeasuredWidth = (ref: React.RefObject<HTMLDivElement>, fallback = 640) => {
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.max(280, Math.floor(el.getBoundingClientRect().width)));
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
};

interface Series {
  key: 'adaptive' | 'benchmark' | 'cash';
  label: string;
  color: string;
  values: number[];
}

export default function FanChart({ sim, pending }: { sim: SimulationOutput; pending: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const width = useMeasuredWidth(wrapRef);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const adaptive = sim.strategies[0];
  const benchmark = sim.strategies[1];
  const cash = sim.strategies[2];
  const times = adaptive.times;
  const horizon = times[times.length - 1];
  const stepsPerYear = sim.stepsPerYear;
  const contribPerStep = sim.steps > 0 ? (sim.totalContributed - adaptive.fan[0].p50) / sim.steps : 0;

  const paidIn = useMemo(() => times.map((t) => adaptive.fan[0].p50 + contribPerStep * t * stepsPerYear), [times, adaptive.fan, contribPerStep, stepsPerYear]);

  const yMax = useMemo(() => {
    let m = 0;
    for (const s of sim.strategies) for (const p of s.fan) m = Math.max(m, p.p95);
    return m;
  }, [sim]);
  const yTicks = useMemo(() => niceTicks(yMax * 1.04, 4), [yMax]);
  const yTop = yTicks[yTicks.length - 1] > yMax ? yTicks[yTicks.length - 1] : yMax * 1.04;

  const plotW = width - M.left - M.right;
  const plotH = HEIGHT - M.top - M.bottom;
  const x = (t: number) => M.left + (t / horizon) * plotW;
  const y = (v: number) => M.top + plotH - (v / yTop) * plotH;

  const pathFor = (vals: number[]) => vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(times[i]).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const bandPath = (() => {
    const up = adaptive.fan.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(times[i]).toFixed(1)},${y(p.p95).toFixed(1)}`).join(' ');
    const down = [...adaptive.fan]
      .map((p, i) => ({ p, i }))
      .reverse()
      .map(({ p, i }) => `L${x(times[i]).toFixed(1)},${y(p.p5).toFixed(1)}`)
      .join(' ');
    return `${up} ${down} Z`;
  })();

  const series: Series[] = [
    { key: 'adaptive', label: 'Adaptive (median)', color: STRATEGY_COLORS.adaptive, values: adaptive.fan.map((p) => p.p50) },
    { key: 'benchmark', label: '60/40 (median)', color: STRATEGY_COLORS.benchmark, values: benchmark.fan.map((p) => p.p50) },
    { key: 'cash', label: 'T-Bills (median)', color: STRATEGY_COLORS.cash, values: cash.fan.map((p) => p.p50) },
  ];

  // End labels, pushed apart so they never overlap.
  const endLabels = (() => {
    const items = series.map((s) => ({ key: s.key, text: s.key === 'adaptive' ? 'Adaptive' : s.key === 'benchmark' ? '60/40' : 'T-Bills', y: y(s.values[s.values.length - 1]), color: s.color }));
    items.sort((a, b) => a.y - b.y);
    for (let i = 1; i < items.length; i++) if (items[i].y - items[i - 1].y < 13) items[i].y = items[i - 1].y + 13;
    for (let i = items.length - 2; i >= 0; i--) if (items[i + 1].y - items[i].y < 13) items[i].y = items[i + 1].y - 13;
    return items;
  })();

  const xTickStep = horizon <= 6 ? 1 : horizon <= 15 ? 3 : 5;
  const xTicks: number[] = [];
  for (let t = 0; t <= horizon + 1e-9; t += xTickStep) xTicks.push(t);
  if (xTicks[xTicks.length - 1] !== horizon) xTicks.push(horizon);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const t = ((px - M.left) / plotW) * horizon;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < times.length; i++) {
      const d = Math.abs(times[i] - t);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    setHoverIdx(best);
  };

  const h = hoverIdx;
  const tooltipLeft = h === null ? 0 : x(times[h]);
  const flip = tooltipLeft > width * 0.62;

  return (
    <div>
      <PanelTitle icon={LineChart} title="Monte Carlo Wealth Fan" hint={`${sim.paths.toLocaleString()} paths · t(ν=5) · ${stepsPerYear === 12 ? 'monthly' : 'quarterly'} steps`} />
      <div className="p-4 pb-3">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 font-mono text-[10px] uppercase tracking-wider text-muted">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block w-3 h-2.5 rounded-[2px]" style={{ background: STRATEGY_COLORS.adaptive, opacity: 0.25 }} />
            Adaptive 5th–95th
          </span>
          {series.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block w-3 h-0.5 rounded" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block w-3 h-px" style={{ background: STRATEGY_COLORS.paidIn }} />
            Paid in
          </span>
          {pending ? <span className="ml-auto text-accent animate-pulse">simulating…</span> : null}
        </div>

        <div ref={wrapRef} className="relative w-full" style={{ opacity: pending ? 0.7 : 1, transition: 'opacity 200ms' }}>
          <svg
            width={width}
            height={HEIGHT}
            viewBox={`0 0 ${width} ${HEIGHT}`}
            className="block max-w-full select-none"
            role="img"
            aria-label={`Projected wealth over ${horizon} years. Adaptive median ends at ${fmtMoneyFull(adaptive.terminal.p50)}, 60/40 at ${fmtMoneyFull(benchmark.terminal.p50)}, cash at ${fmtMoneyFull(cash.terminal.p50)}.`}
            onPointerMove={onMove}
            onPointerLeave={() => setHoverIdx(null)}
          >
            {/* Gridlines + y ticks */}
            {yTicks.map((v) => (
              <g key={v}>
                <line x1={M.left} x2={width - M.right} y1={y(v)} y2={y(v)} className="stroke-border" strokeWidth={1} />
                <text x={M.left - 8} y={y(v) + 3} textAnchor="end" className="fill-muted font-mono" fontSize={10}>
                  {fmtMoney(v)}
                </text>
              </g>
            ))}
            {/* x ticks */}
            {xTicks.map((t) => (
              <text key={t} x={x(t)} y={HEIGHT - 8} textAnchor="middle" className="fill-muted font-mono" fontSize={10}>
                {t === 0 ? 'now' : `${t}y`}
              </text>
            ))}
            {/* Band */}
            <path d={bandPath} fill={STRATEGY_COLORS.adaptive} fillOpacity={0.12} stroke="none" />
            <path d={pathFor(adaptive.fan.map((p) => p.p95))} fill="none" stroke={STRATEGY_COLORS.adaptive} strokeOpacity={0.35} strokeWidth={1} />
            <path d={pathFor(adaptive.fan.map((p) => p.p5))} fill="none" stroke={STRATEGY_COLORS.adaptive} strokeOpacity={0.35} strokeWidth={1} />
            {/* Paid-in */}
            <path d={pathFor(paidIn)} fill="none" stroke={STRATEGY_COLORS.paidIn} strokeWidth={1} />
            {/* Medians */}
            {series.map((s) => (
              <path key={s.key} d={pathFor(s.values)} fill="none" stroke={s.color} strokeWidth={s.key === 'adaptive' ? 2 : 1.5} strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {/* End labels */}
            {endLabels.map((l) => (
              <text key={l.key} x={width - M.right + 6} y={l.y + 3} className="fill-charcoal font-mono" fontSize={10}>
                {l.text}
              </text>
            ))}
            {/* Crosshair */}
            {h !== null ? (
              <g>
                <line x1={x(times[h])} x2={x(times[h])} y1={M.top} y2={M.top + plotH} className="stroke-border-dark" strokeWidth={1} />
                {series.map((s) => (
                  <circle key={s.key} cx={x(times[h])} cy={y(s.values[h])} r={4} fill={s.color} className="stroke-surface" strokeWidth={2} />
                ))}
              </g>
            ) : null}
          </svg>

          {h !== null ? (
            <div
              className="pointer-events-none absolute top-2 z-10 min-w-[190px] bg-surface-raised border border-border rounded-editorial shadow-editorial px-3 py-2 font-mono text-[11px] leading-relaxed"
              style={flip ? { right: width - tooltipLeft + 10 } : { left: tooltipLeft + 10 }}
            >
              <div className="text-charcoal mb-1">
                {times[h] === 0 ? 'Now' : `Year ${Number(times[h].toFixed(1))}`}
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-muted">
                <span>Adaptive p95</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(adaptive.fan[h].p95)}</span>
                <span>Adaptive p50</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(adaptive.fan[h].p50)}</span>
                <span>Adaptive p5</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(adaptive.fan[h].p5)}</span>
                <span>60/40 p50</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(benchmark.fan[h].p50)}</span>
                <span>T-Bills p50</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(cash.fan[h].p50)}</span>
                <span>Paid in</span>
                <span className="text-right text-charcoal tabular-nums">{fmtMoney(paidIn[h])}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
