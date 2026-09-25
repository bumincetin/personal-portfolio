/**
 * Asset universe: eight broad classes with capital-market assumptions.
 *
 * Π  – baseline (equilibrium) annualised arithmetic returns
 * Σ  – annual covariance, built from a volatility vector and a correlation
 *      matrix so each is legible on its own
 * w_mkt – global market-cap style benchmark weights (sum to 1)
 *
 * The numbers are long-run stylised estimates, deliberately round; they are
 * the prior that the Black-Litterman views pull away from.
 */

import type { Mat, Vec } from './linalg';

export type Ticker = 'SPY' | 'EFA' | 'EEM' | 'IEF' | 'TIP' | 'DBC' | 'GLD' | 'BIL';
export type AssetGroup = 'equity' | 'rates' | 'real';

export interface Asset {
  ticker: Ticker;
  name: string;
  description: string;
  group: AssetGroup;
  /** Baseline annualised expected return (Π). */
  pi: number;
  /** Annualised volatility. */
  vol: number;
  /** Benchmark market-cap weight. */
  wMkt: number;
}

export const ASSETS: readonly Asset[] = [
  { ticker: 'SPY', name: 'US Large-Cap Equities', description: 'S&P 500 exposure; the core growth engine.', group: 'equity', pi: 0.072, vol: 0.16, wMkt: 0.36 },
  { ticker: 'EFA', name: 'Developed Markets ex-US', description: 'Europe, Japan, Australasia; currency-exposed growth.', group: 'equity', pi: 0.066, vol: 0.17, wMkt: 0.14 },
  { ticker: 'EEM', name: 'Emerging Markets', description: 'Higher growth, higher political and FX risk.', group: 'equity', pi: 0.078, vol: 0.22, wMkt: 0.06 },
  { ticker: 'IEF', name: 'US 7-10Y Treasuries', description: 'Duration ballast; the classic flight-to-quality asset.', group: 'rates', pi: 0.038, vol: 0.07, wMkt: 0.18 },
  { ticker: 'TIP', name: 'US TIPS', description: 'Inflation-linked Treasuries; real-rate exposure.', group: 'rates', pi: 0.036, vol: 0.06, wMkt: 0.06 },
  { ticker: 'DBC', name: 'Commodities / Energy', description: 'Broad commodity basket; supply-shock hedge.', group: 'real', pi: 0.048, vol: 0.20, wMkt: 0.05 },
  { ticker: 'GLD', name: 'Gold', description: 'Monetary metal; conflict and debasement hedge.', group: 'real', pi: 0.046, vol: 0.15, wMkt: 0.05 },
  { ticker: 'BIL', name: 'Cash / T-Bills', description: 'Short-dated bills; the risk-free anchor.', group: 'rates', pi: 0.035, vol: 0.005, wMkt: 0.10 },
] as const;

export const N_ASSETS = ASSETS.length;
export const TICKERS: readonly Ticker[] = ASSETS.map((a) => a.ticker);
export const INDEX: Record<Ticker, number> = Object.fromEntries(TICKERS.map((t, i) => [t, i])) as Record<Ticker, number>;

/** Annual risk-free rate, anchored to the T-bill assumption. */
export const RISK_FREE = 0.035;

/** Correlation matrix, ordered as ASSETS. Symmetric and positive definite. */
export const CORRELATION: Mat = [
  //  SPY    EFA    EEM    IEF    TIP    DBC    GLD    BIL
  [1.00, 0.86, 0.75, -0.15, 0.05, 0.35, 0.05, 0.00], // SPY
  [0.86, 1.00, 0.82, -0.10, 0.10, 0.42, 0.12, 0.00], // EFA
  [0.75, 0.82, 1.00, -0.08, 0.12, 0.45, 0.18, 0.00], // EEM
  [-0.15, -0.10, -0.08, 1.00, 0.72, -0.20, 0.30, 0.10], // IEF
  [0.05, 0.10, 0.12, 0.72, 1.00, 0.15, 0.38, 0.08], // TIP
  [0.35, 0.42, 0.45, -0.20, 0.15, 1.00, 0.35, 0.00], // DBC
  [0.05, 0.12, 0.18, 0.30, 0.38, 0.35, 1.00, 0.02], // GLD
  [0.00, 0.00, 0.00, 0.10, 0.08, 0.00, 0.02, 1.00], // BIL
];

export const PI: Vec = ASSETS.map((a) => a.pi);
export const VOL: Vec = ASSETS.map((a) => a.vol);
export const W_MKT: Vec = ASSETS.map((a) => a.wMkt);

/** Σ = D R D with D = diag(vol). */
export const SIGMA: Mat = CORRELATION.map((row, i) => row.map((rho, j) => rho * VOL[i] * VOL[j]));

/** Static 60/40 benchmark: 60% US equities, 40% intermediate Treasuries. */
export const W_6040: Vec = TICKERS.map((t) => (t === 'SPY' ? 0.6 : t === 'IEF' ? 0.4 : 0));

/** 100% cash / T-bills. */
export const W_CASH: Vec = TICKERS.map((t) => (t === 'BIL' ? 1 : 0));

/** Diversification cap per asset. */
export const WEIGHT_CAP = 0.4;

export const weightsFrom = (partial: Partial<Record<Ticker, number>>): Vec =>
  TICKERS.map((t) => partial[t] ?? 0);
