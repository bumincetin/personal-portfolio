/**
 * Constrained mean-CVaR solver.
 *
 * Returns are modelled as elliptical Student-t (ν = 5) around μ with scatter
 * Σ, so the 95% CVaR of the one-year portfolio loss has the closed form
 *
 *   CVaR₉₅(w) = −μᵀw + κ · √(wᵀΣw)
 *
 * with κ the standardised-t expected-shortfall multiplier (≈ 2.24 at ν = 5,
 * against 2.06 for a Gaussian). Minimising it subject to
 *
 *   0 ≤ wᵢ ≤ cap,  Σwᵢ = 1,  μᵀw ≥ r_target
 *
 * is a convex program. The return constraint is dualised: for a multiplier
 * λ ≥ 0 the inner problem  min CVaR(w) − λ μᵀw  over the capped simplex is
 * solved by projected gradient descent, and λ is bisected until the target is
 * met (portfolio return is monotone in λ). Projection onto the capped simplex
 * is a one-dimensional bisection on the shift.
 *
 * The "robust" variant minimises the worse of two regimes' CVaR — a minimax
 * hedge used by the Geopolitical-Hedged profile.
 */

import { dot, matVec, quadForm, type Mat, type Vec } from './linalg';

/** Degrees of freedom of the fat-tailed return model. */
export const NU = 5;
/** Confidence level β for VaR / CVaR. */
export const BETA = 0.95;

/* ------------------------------------------------------------------ t-dist */

const lnGamma = (z: number): number => {
  // Lanczos approximation, g = 7.
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
};

/** Student-t density with ν degrees of freedom. */
export const tPdf = (x: number, nu: number): number => {
  const logC = lnGamma((nu + 1) / 2) - lnGamma(nu / 2) - 0.5 * Math.log(nu * Math.PI);
  return Math.exp(logC - ((nu + 1) / 2) * Math.log(1 + (x * x) / nu));
};

/** Student-t CDF by composite Simpson integration from 0 (symmetric). */
export const tCdf = (x: number, nu: number): number => {
  const ax = Math.abs(x);
  const n = 400;
  const h = ax / n;
  let s = tPdf(0, nu) + tPdf(ax, nu);
  for (let i = 1; i < n; i++) s += (i % 2 === 0 ? 2 : 4) * tPdf(i * h, nu);
  const half = (h / 3) * s;
  return x >= 0 ? 0.5 + half : 0.5 - half;
};

/** Quantile of the t distribution by bisection on the CDF. */
export const tQuantile = (p: number, nu: number): number => {
  let lo = -60;
  let hi = 60;
  for (let i = 0; i < 80; i++) {
    const mid = 0.5 * (lo + hi);
    if (tCdf(mid, nu) < p) lo = mid;
    else hi = mid;
  }
  return 0.5 * (lo + hi);
};

/**
 * Expected-shortfall multiplier for a *unit-variance* t: E[T | T > q_β] with
 * T rescaled to variance 1. The Gaussian analogue is φ(z_β)/(1−β).
 */
export const cvarKappa = (nu: number, beta: number): number => {
  const q = tQuantile(beta, nu);
  const es = (tPdf(q, nu) / (1 - beta)) * ((nu + q * q) / (nu - 1));
  return es * Math.sqrt((nu - 2) / nu);
};

export const KAPPA = cvarKappa(NU, BETA);
/** Standardised t quantile at β (VaR multiplier). */
export const VAR_MULT = tQuantile(BETA, NU) * Math.sqrt((NU - 2) / NU);
export const KAPPA_GAUSSIAN = Math.exp(-0.5 * 1.6448536269514722 ** 2) / Math.sqrt(2 * Math.PI) / (1 - BETA);

/* --------------------------------------------------------------- stats */

export interface PortfolioStats {
  ret: number;
  vol: number;
  /** 95% CVaR of the one-year loss, as a positive fraction of capital. */
  cvar: number;
  /** 95% VaR of the one-year loss. */
  var95: number;
  sharpe: number;
}

export const portfolioStats = (w: Vec, mu: Vec, sigma: Mat, rf: number): PortfolioStats => {
  const ret = dot(w, mu);
  const vol = Math.sqrt(Math.max(quadForm(sigma, w), 0));
  return {
    ret,
    vol,
    cvar: -ret + KAPPA * vol,
    var95: -ret + VAR_MULT * vol,
    sharpe: vol > 1e-9 ? (ret - rf) / vol : 0,
  };
};

/* ---------------------------------------------------------- projection */

/**
 * Euclidean projection onto { 0 ≤ wᵢ ≤ cap, Σwᵢ = 1 }: clip(v − λ) with λ
 * found by bisection so the clipped vector sums to one.
 */
export const projectCappedSimplex = (v: Vec, cap: number): Vec => {
  const n = v.length;
  if (cap * n < 1 - 1e-12) throw new Error('projectCappedSimplex: cap too small for a full allocation');
  let lo = Infinity;
  let hi = -Infinity;
  for (const x of v) {
    if (x < lo) lo = x;
    if (x > hi) hi = x;
  }
  lo -= 1;
  const sumAt = (lambda: number) => {
    let s = 0;
    for (let i = 0; i < n; i++) s += Math.min(cap, Math.max(0, v[i] - lambda));
    return s;
  };
  for (let i = 0; i < 40; i++) {
    const mid = 0.5 * (lo + hi);
    if (sumAt(mid) > 1) lo = mid;
    else hi = mid;
  }
  const lambda = 0.5 * (lo + hi);
  const w = new Array<number>(n);
  let s = 0;
  for (let i = 0; i < n; i++) {
    w[i] = Math.min(cap, Math.max(0, v[i] - lambda));
    s += w[i];
  }
  for (let i = 0; i < n; i++) w[i] /= s;
  return w;
};

/* ------------------------------------------------------------- solver */

export interface RegimeModel {
  mu: Vec;
  sigma: Mat;
}

export interface SolveOptions {
  model: RegimeModel;
  /** Optional second model; the objective becomes max(CVaR₁, CVaR₂). */
  robustModel?: RegimeModel;
  targetReturn: number;
  cap: number;
  initial?: Vec;
}

export interface SolveResult {
  weights: Vec;
  lambda: number;
  iterations: number;
  /** Realised expected return under `model`. */
  ret: number;
  /** Whether the requested return target was attainable under the caps. */
  feasible: boolean;
  /** Target actually enforced (clamped to the attainable range). */
  target: number;
}

const cvarAndGrad = (w: Vec, m: RegimeModel): { value: number; grad: Vec } => {
  const sw = matVec(m.sigma, w);
  const variance = Math.max(dot(w, sw), 1e-16);
  const vol = Math.sqrt(variance);
  const value = -dot(w, m.mu) + KAPPA * vol;
  const grad = m.mu.map((mi, i) => -mi + (KAPPA * sw[i]) / vol);
  return { value, grad };
};

/**
 * min CVaR(w) − λ μᵀw over the capped simplex.
 *
 * Accelerated projected gradient (FISTA) with adaptive restart. The
 * objective is smooth away from σ = 0 for a single model; the minimax
 * variant is piecewise-smooth, and the best-iterate is returned in both
 * cases so a late kink cannot degrade the answer.
 */
const innerSolve = (opts: SolveOptions, lambda: number, start: Vec): { w: Vec; iterations: number } => {
  const { model, robustModel, cap } = opts;
  const n = model.mu.length;
  const objective = (w: Vec): { value: number; grad: Vec } => {
    const a = cvarAndGrad(w, model);
    let value = a.value;
    let grad = a.grad;
    if (robustModel) {
      const b = cvarAndGrad(w, robustModel);
      if (b.value > value) {
        value = b.value;
        grad = b.grad;
      }
    }
    const g = new Array<number>(n);
    for (let i = 0; i < n; i++) g[i] = grad[i] - lambda * model.mu[i];
    return { value: value - lambda * dot(w, model.mu), grad: g };
  };

  let w = projectCappedSimplex(start, cap);
  let y = w;
  let tk = 1;
  const step = 0.02;
  let best = w;
  let bestVal = Infinity;
  const maxIter = 160;
  let it = 0;
  const trial = new Array<number>(n);
  for (; it < maxIter; it++) {
    const { value, grad } = objective(y);
    for (let i = 0; i < n; i++) trial[i] = y[i] - step * grad[i];
    const next = projectCappedSimplex(trial, cap);
    const nextVal = objective(next).value;
    if (nextVal < bestVal) {
      bestVal = nextVal;
      best = next;
    }
    // Adaptive restart: if momentum stops paying, drop it.
    if (nextVal > value) {
      tk = 1;
      y = next;
    } else {
      const tNext = 0.5 * (1 + Math.sqrt(1 + 4 * tk * tk));
      const beta = (tk - 1) / tNext;
      const yNext = new Array<number>(n);
      for (let i = 0; i < n; i++) yNext[i] = next[i] + beta * (next[i] - w[i]);
      y = yNext;
      tk = tNext;
    }
    let delta = 0;
    for (let i = 0; i < n; i++) delta = Math.max(delta, Math.abs(next[i] - w[i]));
    w = next;
    if (delta < 5e-7 && it > 10) break;
  }
  return { w: best, iterations: it };
};

/** Highest expected return attainable under the caps: greedy fill by μ. */
export const maxAttainableReturn = (mu: Vec, cap: number): { ret: number; weights: Vec } => {
  const order = mu.map((m, i) => [m, i] as const).sort((a, b) => b[0] - a[0]);
  const w = new Array<number>(mu.length).fill(0);
  let remaining = 1;
  for (const [, i] of order) {
    const take = Math.min(cap, remaining);
    w[i] = take;
    remaining -= take;
    if (remaining <= 1e-12) break;
  }
  return { ret: dot(w, mu), weights: w };
};

export function minimizeCvar(opts: SolveOptions): SolveResult {
  const { model, cap } = opts;
  const n = model.mu.length;
  const start = opts.initial ?? new Array<number>(n).fill(1 / n);
  let totalIter = 0;

  const { ret: rMax } = maxAttainableReturn(model.mu, cap);
  const feasible = opts.targetReturn <= rMax + 1e-9;
  const target = Math.min(opts.targetReturn, rMax - 1e-5);

  // λ = 0: the pure minimum-CVaR portfolio.
  const base = innerSolve(opts, 0, start);
  totalIter += base.iterations;
  let w = base.w;
  let ret = dot(w, model.mu);
  if (ret >= target - 1e-6) return { weights: w, lambda: 0, iterations: totalIter, ret, feasible, target };

  // Grow λ until the target is met, then bisect on λ until the realised
  // return sits within 0.1bp of the target. Every inner solve is
  // warm-started from the nearest solved point.
  let lo = 0;
  let hi = 0.5;
  let wLo = w;
  let wHi = w;
  for (let k = 0; k < 14; k++) {
    const r = innerSolve(opts, hi, wHi);
    totalIter += r.iterations;
    wHi = r.w;
    if (dot(wHi, model.mu) >= target - 1e-6) break;
    lo = hi;
    wLo = wHi;
    hi *= 2;
  }
  for (let k = 0; k < 20; k++) {
    const retHi = dot(wHi, model.mu);
    if (retHi - target < 1e-5 || hi - lo < 1e-3) break;
    const mid = 0.5 * (lo + hi);
    const warm = wLo.map((x, i) => 0.5 * (x + wHi[i]));
    const r = innerSolve(opts, mid, warm);
    totalIter += r.iterations;
    if (dot(r.w, model.mu) >= target - 1e-6) {
      hi = mid;
      wHi = r.w;
    } else {
      lo = mid;
      wLo = r.w;
    }
  }
  w = wHi;
  ret = dot(w, model.mu);
  return { weights: w, lambda: hi, iterations: totalIter, ret, feasible, target };
}
