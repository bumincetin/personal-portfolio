/**
 * Orchestration: inputs → Black-Litterman posterior → CVaR-optimal weights →
 * risk HUD numbers, and separately → Monte Carlo fan.
 *
 * The allocation stage is the hot path (every slider tick) and runs in a few
 * milliseconds. The simulation stage is heavier and is meant to run on a
 * deferred value so dragging never stalls.
 */

import { blackLitterman, type BLResult, type RegimeId } from './blackLitterman';
import { dot, quadForm, type Mat, type Vec } from './linalg';
import { simulate, type SimulationResult } from './monteCarlo';
import { maxAttainableReturn, minimizeCvar, portfolioStats, type PortfolioStats } from './solver';
import { RISK_FREE, SIGMA, WEIGHT_CAP, W_6040, W_CASH } from './universe';

export type RiskProfile = 'conservative' | 'moderate' | 'aggressive' | 'hedged';

export interface ProfileSpec {
  id: RiskProfile;
  name: string;
  summary: string;
  /** Position of the return target between the min-CVaR and max-return portfolios. */
  fraction: number;
  robust: boolean;
}

export const PROFILES: readonly ProfileSpec[] = [
  { id: 'conservative', name: 'Conservative', summary: 'Capital preservation; near the minimum-CVaR frontier point.', fraction: 0.15, robust: false },
  { id: 'moderate', name: 'Moderate', summary: 'Balanced growth with a bounded tail.', fraction: 0.45, robust: false },
  { id: 'aggressive', name: 'Aggressive', summary: 'Return-seeking; accepts a fatter left tail.', fraction: 0.8, robust: false },
  { id: 'hedged', name: 'Geopolitical-Hedged', summary: 'Minimax: optimises the worse of the current and conflict regimes.', fraction: 0.4, robust: true },
];

export const PROFILE_BY_ID: Record<RiskProfile, ProfileSpec> = Object.fromEntries(
  PROFILES.map((p) => [p.id, p]),
) as Record<RiskProfile, ProfileSpec>;

export interface OptimizerInputs {
  initialCapital: number;
  monthlyContribution: number;
  horizonYears: number;
  profile: RiskProfile;
  regime: RegimeId;
  /** Geopolitical inertia θ ∈ [0, 1]. */
  theta: number;
  /** Equity sentiment ∈ [-1, 1]. */
  sentiment: number;
}

export const DEFAULT_INPUTS: OptimizerInputs = {
  initialCapital: 250_000,
  monthlyContribution: 2_000,
  horizonYears: 15,
  profile: 'moderate',
  regime: 'conflict',
  theta: 0.6,
  sentiment: 0,
};

export interface AllocationResult {
  inputs: OptimizerInputs;
  bl: BLResult;
  weights: Vec;
  solve: { lambda: number; iterations: number; feasible: boolean; target: number };
  /** Return range available to the profile selector. */
  frontier: { minCvarReturn: number; maxReturn: number };
  stats: { adaptive: PortfolioStats; benchmark: PortfolioStats; cash: PortfolioStats };
  /** Prior (equilibrium) stats of the same weights, for the "posterior shift" readout. */
  priorStats: { adaptive: PortfolioStats; benchmark: PortfolioStats };
  resilience: {
    /** Expected-return edge over 60/40 if the world snaps to full conflict, in bp. */
    alphaBps: number;
    /** CVaR improvement over 60/40 under full conflict, in bp (positive = smaller tail loss). */
    cvarEdgeBps: number;
    adaptive: PortfolioStats;
    benchmark: PortfolioStats;
  };
  /** 3×3 correlation between adaptive / 60-40 / cash under Σ_BL. */
  strategyCorrelation: Mat;
  timingMs: number;
}

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

export function computeAllocation(inputs: OptimizerInputs): AllocationResult {
  const t0 = now();
  const bl = blackLitterman({ regime: inputs.regime, theta: inputs.theta, sentiment: inputs.sentiment });
  const model = { mu: bl.mu, sigma: bl.sigma };
  const profile = PROFILE_BY_ID[inputs.profile];

  // The conflict posterior at full inertia is the stress world used by both
  // the hedged profile's minimax objective and the resilience alpha.
  const conflict = blackLitterman({ regime: 'conflict', theta: 1, sentiment: 0 });
  const conflictModel = { mu: conflict.mu, sigma: conflict.sigma };
  const robustModel = profile.robust ? conflictModel : undefined;

  // Anchor the return range: minimum-CVaR return (λ = 0) to max attainable.
  const minCvar = minimizeCvar({ model, robustModel, targetReturn: -1, cap: WEIGHT_CAP });
  const { ret: maxReturn } = maxAttainableReturn(bl.mu, WEIGHT_CAP);
  const minCvarReturn = minCvar.ret;
  const target = minCvarReturn + profile.fraction * Math.max(maxReturn - minCvarReturn, 0);

  const solved = minimizeCvar({ model, robustModel, targetReturn: target, cap: WEIGHT_CAP, initial: minCvar.weights });
  const weights = solved.weights.map((w) => (w < 5e-4 ? 0 : w));
  const sum = weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < weights.length; i++) weights[i] /= sum;

  const stats = {
    adaptive: portfolioStats(weights, bl.mu, bl.sigma, RISK_FREE),
    benchmark: portfolioStats(W_6040, bl.mu, bl.sigma, RISK_FREE),
    cash: portfolioStats(W_CASH, bl.mu, bl.sigma, RISK_FREE),
  };
  const priorStats = {
    adaptive: portfolioStats(weights, bl.prior, SIGMA, RISK_FREE),
    benchmark: portfolioStats(W_6040, bl.prior, SIGMA, RISK_FREE),
  };

  const resAdaptive = portfolioStats(weights, conflict.mu, conflict.sigma, RISK_FREE);
  const resBenchmark = portfolioStats(W_6040, conflict.mu, conflict.sigma, RISK_FREE);
  const resilience = {
    alphaBps: (resAdaptive.ret - resBenchmark.ret) * 1e4,
    cvarEdgeBps: (resBenchmark.cvar - resAdaptive.cvar) * 1e4,
    adaptive: resAdaptive,
    benchmark: resBenchmark,
  };

  const ws = [weights, W_6040, W_CASH];
  const vols = ws.map((w) => Math.sqrt(Math.max(quadForm(bl.sigma, w), 1e-16)));
  const strategyCorrelation = ws.map((wi, i) =>
    ws.map((wj, j) => {
      if (i === j) return 1;
      let cov = 0;
      for (let a = 0; a < wi.length; a++) {
        if (wi[a] === 0) continue;
        for (let b = 0; b < wj.length; b++) cov += wi[a] * bl.sigma[a][b] * wj[b];
      }
      return Math.max(-0.999, Math.min(0.999, cov / (vols[i] * vols[j])));
    }),
  );

  return {
    inputs,
    bl,
    weights,
    solve: { lambda: solved.lambda, iterations: solved.iterations + minCvar.iterations, feasible: solved.feasible, target: solved.target },
    frontier: { minCvarReturn, maxReturn },
    stats,
    priorStats,
    resilience,
    strategyCorrelation,
    timingMs: now() - t0,
  };
}

export interface SimulationOutput extends SimulationResult {
  timingMs: number;
}

export function computeSimulation(alloc: AllocationResult): SimulationOutput {
  const t0 = now();
  const { inputs, stats, strategyCorrelation } = alloc;
  const result = simulate({
    strategies: [
      { key: 'adaptive', label: 'Adaptive Geopolitical', mu: stats.adaptive.ret, vol: stats.adaptive.vol },
      { key: 'benchmark', label: 'Static 60/40', mu: stats.benchmark.ret, vol: stats.benchmark.vol },
      { key: 'cash', label: '100% T-Bills', mu: stats.cash.ret, vol: stats.cash.vol },
    ],
    correlation: strategyCorrelation,
    initialCapital: inputs.initialCapital,
    monthlyContribution: inputs.monthlyContribution,
    horizonYears: inputs.horizonYears,
    paths: 1000,
    seed: 0x5eed,
    riskFree: RISK_FREE,
  });
  return { ...result, timingMs: now() - t0 };
}

/** Convenience: dot product exported for UI-side derived numbers. */
export { dot };
