'use client';

import React, { useId } from 'react';
import { Earth, Flame, Swords, TrendingDown, SlidersHorizontal, Shield, Scale, Zap, ShieldCheck } from 'lucide-react';
import type { OptimizerInputs, RiskProfile } from '@/lib/optimizer/engine';
import { PROFILES } from '@/lib/optimizer/engine';
import { REGIMES, REGIME_BY_ID, type AppliedView, type RegimeId } from '@/lib/optimizer/blackLitterman';
import { FieldLabel, Panel, PanelTitle, SegmentedChoice, Slider } from './primitives';
import { fmtMoneyFull, fmtPct } from './format';

const REGIME_ICONS: Record<RegimeId, typeof Earth> = {
  cooperative: Earth,
  inflation: Flame,
  conflict: Swords,
  stagnation: TrendingDown,
};

const PROFILE_ICONS: Record<RiskProfile, typeof Shield> = {
  conservative: Shield,
  moderate: Scale,
  aggressive: Zap,
  hedged: ShieldCheck,
};

const thetaCaption = (theta: number) =>
  theta < 0.2
    ? 'Cyclical data dominates; regime views barely move the prior.'
    : theta < 0.5
      ? 'Structural trends tilt the posterior modestly.'
      : theta < 0.8
        ? 'Structural trends carry most of the weight.'
        : 'Regime views applied at near-full conviction.';

function MoneyInput({
  id,
  value,
  min,
  step,
  onCommit,
}: {
  id: string;
  value: number;
  min: number;
  step: number;
  onCommit: (v: number) => void;
}) {
  const [text, setText] = React.useState(String(value));
  const [focused, setFocused] = React.useState(false);
  React.useEffect(() => {
    if (!focused) setText(String(value));
  }, [value, focused]);
  const commit = (raw: string) => {
    const n = Number(raw.replace(/[^0-9.]/g, ''));
    if (Number.isFinite(n)) onCommit(Math.max(min, Math.round(n)));
  };
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-light">$</span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={focused ? text : fmtMoneyFull(value).replace('$', '')}
        min={min}
        step={step}
        onFocus={() => {
          setFocused(true);
          setText(String(value));
        }}
        onBlur={(e) => {
          setFocused(false);
          commit(e.target.value);
        }}
        onChange={(e) => {
          setText(e.target.value);
          commit(e.target.value);
        }}
        className="w-full bg-surface-alt/70 border border-border rounded-editorial pl-6 pr-2.5 py-1.5 font-mono text-sm text-charcoal tabular-nums focus:outline-none focus:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent/40"
      />
    </div>
  );
}

export default function ControlPanel({
  inputs,
  onChange,
  views,
}: {
  inputs: OptimizerInputs;
  onChange: (patch: Partial<OptimizerInputs>) => void;
  views: AppliedView[];
}) {
  const uid = useId();
  const regime = REGIME_BY_ID[inputs.regime];

  return (
    <Panel className="h-full">
      <PanelTitle icon={SlidersHorizontal} title="Control & Macro Inputs" />
      <div className="p-4 space-y-5">
        {/* Capital */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor={`${uid}-cap`}>Initial capital</FieldLabel>
            <MoneyInput id={`${uid}-cap`} value={inputs.initialCapital} min={1000} step={1000} onCommit={(v) => onChange({ initialCapital: v })} />
          </div>
          <div>
            <FieldLabel htmlFor={`${uid}-contrib`}>Monthly contribution</FieldLabel>
            <MoneyInput id={`${uid}-contrib`} value={inputs.monthlyContribution} min={0} step={100} onCommit={(v) => onChange({ monthlyContribution: v })} />
          </div>
        </div>

        {/* Horizon */}
        <div>
          <FieldLabel htmlFor={`${uid}-horizon`} value={`${inputs.horizonYears} yr`}>
            Investment horizon
          </FieldLabel>
          <Slider
            id={`${uid}-horizon`}
            min={1}
            max={30}
            step={1}
            value={inputs.horizonYears}
            aria-valuetext={`${inputs.horizonYears} years`}
            onChange={(e) => onChange({ horizonYears: Number(e.target.value) })}
          />
          <div className="flex justify-between font-mono text-[10px] text-muted-light mt-1">
            <span>1</span>
            <span>15</span>
            <span>30</span>
          </div>
        </div>

        {/* Risk profile */}
        <div>
          <FieldLabel>Risk tolerance</FieldLabel>
          <SegmentedChoice
            label="Risk tolerance"
            value={inputs.profile}
            onChange={(profile) => onChange({ profile })}
            options={PROFILES.map((p) => ({ id: p.id, label: p.name, icon: PROFILE_ICONS[p.id], hint: p.summary }))}
          />
        </div>

        {/* Regime */}
        <div>
          <FieldLabel>Geopolitical shock / regime</FieldLabel>
          <SegmentedChoice
            label="Macro regime"
            value={inputs.regime}
            onChange={(r) => onChange({ regime: r })}
            options={REGIMES.map((r) => ({ id: r.id, label: r.name, icon: REGIME_ICONS[r.id], hint: r.summary }))}
            columns={1}
          />
          <p className="mt-2 font-sans text-xs leading-relaxed text-muted">{regime.summary}</p>
        </div>

        {/* Theta */}
        <div>
          <FieldLabel htmlFor={`${uid}-theta`} value={`θ = ${inputs.theta.toFixed(2)}`}>
            Geopolitical inertia
          </FieldLabel>
          <Slider
            id={`${uid}-theta`}
            min={0}
            max={1}
            step={0.01}
            value={inputs.theta}
            aria-valuetext={`theta ${inputs.theta.toFixed(2)}`}
            onChange={(e) => onChange({ theta: Number(e.target.value) })}
          />
          <div className="flex justify-between font-mono text-[10px] text-muted-light mt-1">
            <span>Cyclical</span>
            <span>Structural</span>
          </div>
          <p className="mt-1.5 font-sans text-xs text-muted">{thetaCaption(inputs.theta)}</p>
        </div>

        {/* Sentiment */}
        <div>
          <FieldLabel htmlFor={`${uid}-sent`} value={`${inputs.sentiment > 0 ? '+' : ''}${Math.round(inputs.sentiment * 100)}`}>
            Equity sentiment
          </FieldLabel>
          <Slider
            id={`${uid}-sent`}
            min={-1}
            max={1}
            step={0.05}
            value={inputs.sentiment}
            aria-valuetext={`sentiment ${Math.round(inputs.sentiment * 100)}`}
            onChange={(e) => onChange({ sentiment: Number(e.target.value) })}
          />
          <div className="flex justify-between font-mono text-[10px] text-muted-light mt-1">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
        </div>

        {/* Active views */}
        <div>
          <FieldLabel value={`${views.length} views`}>Active Black-Litterman views</FieldLabel>
          <ul className="space-y-1">
            {views.map((v) => (
              <li key={v.label} className="flex items-baseline justify-between gap-2 font-mono text-[11px] leading-snug">
                <span className={`truncate ${v.isSentiment ? 'text-accent' : 'text-charcoal'}`} title={v.label}>
                  {v.label}
                </span>
                <span className="shrink-0 tabular-nums text-muted">
                  {fmtPct(v.q, 1)} · c {Math.round(v.confidence * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
