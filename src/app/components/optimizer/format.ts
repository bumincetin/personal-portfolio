import type { Ticker } from '@/lib/optimizer/universe';

export const fmtPct = (x: number, digits = 1): string => `${(x * 100).toFixed(digits)}%`;

export const fmtSignedPct = (x: number, digits = 1): string => {
  const v = x * 100;
  const sign = v > 0.0001 ? '+' : v < -0.0001 ? '−' : '';
  return `${sign}${Math.abs(v).toFixed(digits)}%`;
};

export const fmtBps = (bps: number): string => {
  const r = Math.round(bps);
  const sign = r > 0 ? '+' : r < 0 ? '−' : '';
  return `${sign}${Math.abs(r)} bp`;
};

export const fmtNum = (x: number, digits = 2): string => x.toFixed(digits);

/** Compact currency: $1.23M · $456k · $1,234. */
export const fmtMoney = (x: number): string => {
  const abs = Math.abs(x);
  const sign = x < 0 ? '−' : '';
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e4) return `${sign}$${Math.round(abs / 1e3)}k`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(1)}k`;
  return `${sign}$${Math.round(abs)}`;
};

export const fmtMoneyFull = (x: number): string =>
  `${x < 0 ? '−' : ''}$${Math.round(Math.abs(x)).toLocaleString('en-US')}`;

export const fmtMs = (ms: number): string => (ms < 1 ? '<1 ms' : `${ms.toFixed(ms < 10 ? 1 : 0)} ms`);

/**
 * Asset colours. The house palette is warm-only, so eight distinct hues are
 * not available; identity is carried by ticker labels, the legend rows and
 * the table, while colour encodes the asset *group* (brass = growth
 * equities, copper = defensive rates, bone = real assets) with a lightness
 * step inside each group. Every value resolves through the theme tokens so
 * the chart re-skins with the site.
 */
export const ASSET_COLORS: Record<Ticker, string> = {
  SPY: 'rgb(var(--c-brass-hi))',
  EFA: 'rgb(var(--c-brass))',
  EEM: 'rgb(var(--c-brass-lo))',
  IEF: 'rgb(var(--c-copper-hi))',
  TIP: 'rgb(var(--c-copper))',
  BIL: 'rgb(var(--c-copper-lo))',
  DBC: 'rgb(var(--c-text-3))',
  GLD: 'rgb(var(--c-muted))',
};

export const STRATEGY_COLORS = {
  adaptive: 'rgb(var(--c-brass))',
  benchmark: 'rgb(var(--c-copper))',
  cash: 'rgb(var(--c-muted))',
  paidIn: 'rgb(var(--c-muted-light))',
} as const;

export const GROUP_LABELS = { equity: 'Growth equities', rates: 'Defensive rates', real: 'Real assets' } as const;

/** Nice axis ticks: returns ~`count` round-number ticks spanning [0, max]. */
export const niceTicks = (max: number, count = 4): number[] => {
  if (max <= 0) return [0];
  const raw = max / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + 1e-9; v += step) ticks.push(v);
  return ticks;
};
