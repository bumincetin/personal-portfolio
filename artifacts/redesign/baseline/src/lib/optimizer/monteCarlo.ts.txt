/**
 * Monte Carlo wealth engine.
 *
 * Three strategies (adaptive, 60/40, cash) are simulated jointly on the same
 * random draws — common random numbers, so the comparison is a paired one —
 * with periodic contributions and multivariate Student-t shocks: a
 * correlated Gaussian vector divided by a shared √(χ²_ν/ν) mixing variable,
 * which is exactly how a multivariate t is generated and means fat tails hit
 * every strategy in the same period.
 *
 * 1,000 paths. Steps are monthly for horizons up to ten years and quarterly
 * beyond, which bounds the work at 120 steps so a 30-year fan still draws in
 * tens of milliseconds; contributions accrue per step at the equivalent
 * rate. Percentile snapshots are taken on a grid of at most 73 points so the
 * sort cost stays small; terminal statistics use every path. Seeded, so the
 * same inputs always draw the same fan.
 */

import { cholesky, type Mat } from './linalg';
import { NU } from './solver';

export interface StrategySpec {
  key: string;
  label: string;
  /** Annual arithmetic expected return. */
  mu: number;
  /** Annual volatility. */
  vol: number;
}

export interface SimulationInputs {
  strategies: StrategySpec[];
  /** Correlation matrix between the strategies' returns. */
  correlation: Mat;
  initialCapital: number;
  monthlyContribution: number;
  horizonYears: number;
  paths?: number;
  seed?: number;
  riskFree: number;
}

export interface Percentiles {
  p5: number;
  p50: number;
  p95: number;
}

export interface StrategySimulation {
  key: string;
  label: string;
  /** Sample times in years (0 … H). */
  times: number[];
  /** Wealth percentiles at each sample time. */
  fan: Percentiles[];
  terminal: Percentiles & { mean: number };
  /** Probability the terminal wealth is below total money paid in. */
  shortfallProbability: number;
  /** Annualised statistics of the simulated period returns across all paths. */
  simulated: { meanReturn: number; volatility: number; sharpe: number; cagrMedian: number };
}

export interface SimulationResult {
  strategies: StrategySimulation[];
  totalContributed: number;
  paths: number;
  steps: number;
  stepsPerYear: number;
}

/* ------------------------------------------------------------- random */

/** xorshift128+ — fast, deterministic, good enough for Monte Carlo. */
const makeRng = (seed: number) => {
  let s0 = (seed ^ 0x9e3779b9) >>> 0 || 1;
  let s1 = (Math.imul(seed, 0x85ebca6b) ^ 0xc2b2ae35) >>> 0 || 2;
  const next = () => {
    let x = s0;
    const y = s1;
    s0 = y;
    x ^= x << 23;
    x ^= x >>> 17;
    x ^= y ^ (y >>> 26);
    s1 = x >>> 0;
    return ((s0 + s1) >>> 0) / 4294967296;
  };
  // Warm up so a small seed does not leave the state nearly empty.
  for (let i = 0; i < 8; i++) next();
  return next;
};

/** Marsaglia polar method, caching the spare draw. */
const makeGaussian = (rnd: () => number) => {
  let spare = 0;
  let hasSpare = false;
  return () => {
    if (hasSpare) {
      hasSpare = false;
      return spare;
    }
    let u: number;
    let v: number;
    let s: number;
    do {
      u = 2 * rnd() - 1;
      v = 2 * rnd() - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    const m = Math.sqrt((-2 * Math.log(s)) / s);
    spare = v * m;
    hasSpare = true;
    return u * m;
  };
};

/** Marsaglia–Tsang gamma(shape ≥ 1, scale 1). */
const makeGamma = (rnd: () => number, gaussian: () => number, shape: number) => {
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  return () => {
    for (;;) {
      let x: number;
      let v: number;
      do {
        x = gaussian();
        v = 1 + c * x;
      } while (v <= 0);
      v = v * v * v;
      const u = rnd();
      if (u < 1 - 0.0331 * x * x * x * x) return d * v;
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
  };
};

/* --------------------------------------------------------- percentiles */

const percentileOf = (sorted: Float64Array, p: number): number => {
  const idx = p * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, sorted.length - 1);
  const f = idx - lo;
  return sorted[lo] * (1 - f) + sorted[hi] * f;
};

const percentiles = (values: Float64Array): Percentiles => {
  const sorted = Float64Array.from(values).sort();
  return { p5: percentileOf(sorted, 0.05), p50: percentileOf(sorted, 0.5), p95: percentileOf(sorted, 0.95) };
};

/* ------------------------------------------------------------ engine */

export const stepsPerYearFor = (horizonYears: number): number => (horizonYears <= 10 ? 12 : 4);

export function simulate(inputs: SimulationInputs): SimulationResult {
  const { strategies, correlation, initialCapital, monthlyContribution, horizonYears, riskFree } = inputs;
  const paths = inputs.paths ?? 1000;
  const K = strategies.length;
  const spy = stepsPerYearFor(horizonYears);
  const steps = Math.max(1, Math.round(horizonYears * spy));
  const contribution = monthlyContribution * (12 / spy);

  const rnd = makeRng(inputs.seed ?? 0x5eed);
  const gaussian = makeGaussian(rnd);
  const gamma = makeGamma(rnd, gaussian, NU / 2); // χ²_ν = 2·Gamma(ν/2)

  // Per-step log-drift and scale. The scale carries the √((ν−2)/ν) factor
  // so the t shock has variance σ²/spy.
  const drift = strategies.map((s) => (Math.log(1 + s.mu) - 0.5 * s.vol * s.vol) / spy);
  const scaleS = strategies.map((s) => (s.vol / Math.sqrt(spy)) * Math.sqrt((NU - 2) / NU));
  const { L } = cholesky(correlation.map((row, i) => row.map((x, j) => (i === j ? 1 : x))));
  const Lflat = new Float64Array(K * K);
  for (let i = 0; i < K; i++) for (let j = 0; j < K; j++) Lflat[i * K + j] = L[i][j];

  // Percentile grid: every step up to 72 steps, then thinned to ≤ 73 samples.
  const stride = Math.max(1, Math.ceil(steps / 72));
  const sampleSteps: number[] = [0];
  for (let s = stride; s < steps; s += stride) sampleSteps.push(s);
  if (sampleSteps[sampleSteps.length - 1] !== steps) sampleSteps.push(steps);

  // State: wealth and unit index per (strategy, path); return moments.
  const wealth = strategies.map(() => new Float64Array(paths).fill(initialCapital));
  const index = strategies.map(() => new Float64Array(paths).fill(1));
  const sumR = new Float64Array(K);
  const sumR2 = new Float64Array(K);
  const fans: Percentiles[][] = strategies.map(() => [
    { p5: initialCapital, p50: initialCapital, p95: initialCapital },
  ]);

  const z = new Float64Array(K);
  const e = new Float64Array(K);
  let nextSampleIdx = 1;

  for (let step = 1; step <= steps; step++) {
    for (let p = 0; p < paths; p++) {
      for (let k = 0; k < K; k++) z[k] = gaussian();
      // Shared t mixing variable for this (path, step).
      const mix = Math.sqrt(NU / (2 * gamma()));
      for (let i = 0; i < K; i++) {
        let s = 0;
        for (let j = 0; j <= i; j++) s += Lflat[i * K + j] * z[j];
        e[i] = s * mix;
      }
      for (let k = 0; k < K; k++) {
        const gross = Math.exp(drift[k] + scaleS[k] * e[k]);
        const r = gross - 1;
        sumR[k] += r;
        sumR2[k] += r * r;
        index[k][p] *= gross;
        wealth[k][p] = wealth[k][p] * gross + contribution;
      }
    }
    if (nextSampleIdx < sampleSteps.length && sampleSteps[nextSampleIdx] === step) {
      for (let k = 0; k < K; k++) fans[k].push(percentiles(wealth[k]));
      nextSampleIdx++;
    }
  }

  const totalContributed = initialCapital + contribution * steps;
  const years = steps / spy;
  const samples = paths * steps;

  const out: StrategySimulation[] = strategies.map((s, k) => {
    const terminal = percentiles(wealth[k]);
    let mean = 0;
    let shortfalls = 0;
    for (let p = 0; p < paths; p++) {
      mean += wealth[k][p];
      if (wealth[k][p] < totalContributed) shortfalls++;
    }
    mean /= paths;

    // Annualised arithmetic mean and volatility of the simulated period
    // returns, pooled over every path-step; the ratio is the simulated Sharpe.
    const mR = sumR[k] / samples;
    const vR = Math.max(sumR2[k] / samples - mR * mR, 0);
    const meanReturn = mR * spy;
    const volatility = Math.sqrt(vR * spy);

    const cagr = new Float64Array(paths);
    for (let p = 0; p < paths; p++) cagr[p] = Math.pow(index[k][p], 1 / years) - 1;

    return {
      key: s.key,
      label: s.label,
      times: sampleSteps.map((st) => st / spy),
      fan: fans[k],
      terminal: { ...terminal, mean },
      shortfallProbability: shortfalls / paths,
      simulated: {
        meanReturn,
        volatility,
        sharpe: volatility > 1e-9 ? (meanReturn - riskFree) / volatility : 0,
        cagrMedian: percentiles(cagr).p50,
      },
    };
  });

  return { strategies: out, totalContributed, paths, steps, stepsPerYear: spy };
}
