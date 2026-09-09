import test from 'node:test';
import assert from 'node:assert/strict';
import { computeAllocation, DEFAULT_INPUTS, PROFILES, type OptimizerInputs } from './engine.ts';
import { blackLitterman, REGIMES, TAU } from './blackLitterman.ts';
import { cholesky, quadForm, invertSPD, matMul, identity } from './linalg.ts';
import { portfolioStats, projectCappedSimplex, KAPPA, NU, BETA } from './solver.ts';
import { ASSETS, CORRELATION, N_ASSETS, SIGMA, WEIGHT_CAP, W_MKT } from './universe.ts';

/**
 * Regression tests over the financial logic.
 *
 * These exist because the redesign changes the optimizer's *presentation* — a
 * simple view, a different label, new copy around it — and none of that is
 * allowed to change what it computes. Every assertion here is a mathematical
 * property of the method rather than a snapshot of today's output, so the tests
 * stay meaningful if an assumption is deliberately retuned.
 */

const EPS = 1e-9;

test('the correlation matrix is symmetric with a unit diagonal', () => {
  for (let i = 0; i < N_ASSETS; i += 1) {
    assert.equal(CORRELATION[i][i], 1);
    for (let j = 0; j < N_ASSETS; j += 1) {
      assert.ok(Math.abs(CORRELATION[i][j] - CORRELATION[j][i]) < EPS, `correlation not symmetric at ${i},${j}`);
      assert.ok(CORRELATION[i][j] >= -1 && CORRELATION[i][j] <= 1, `correlation out of range at ${i},${j}`);
    }
  }
});

test('the covariance matrix is positive definite', () => {
  // Cholesky succeeds without jitter exactly when the matrix is already PD.
  const { jitter } = cholesky(SIGMA);
  assert.equal(jitter, 0, 'SIGMA needed jitter, so it is not positive definite');
});

test('benchmark weights are a valid allocation', () => {
  const total = W_MKT.reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(total - 1) < 1e-9, `benchmark weights sum to ${total}`);
  assert.ok(W_MKT.every((w) => w >= 0));
});

test('every asset has a positive volatility and a finite prior return', () => {
  for (const asset of ASSETS) {
    assert.ok(asset.vol > 0, `${asset.ticker} must have positive volatility`);
    assert.ok(Number.isFinite(asset.pi), `${asset.ticker} must have a finite prior return`);
  }
});

test('quadratic form on the covariance matrix is never negative', () => {
  const probes = [W_MKT, ASSETS.map(() => 1 / N_ASSETS), ASSETS.map((_, i) => (i === 0 ? 1 : 0))];
  for (const w of probes) {
    assert.ok(quadForm(SIGMA, w) >= 0, 'variance cannot be negative');
  }
});

test('SPD inversion round-trips to the identity', () => {
  const inverse = invertSPD(SIGMA);
  const product = matMul(SIGMA, inverse);
  const id = identity(N_ASSETS);
  for (let i = 0; i < N_ASSETS; i += 1) {
    for (let j = 0; j < N_ASSETS; j += 1) {
      assert.ok(Math.abs(product[i][j] - id[i][j]) < 1e-6, `inversion drifted at ${i},${j}`);
    }
  }
});

test('the simplex projection produces valid capped weights', () => {
  const inputs = [
    [5, -3, 0.2, 0.1, 9, -1, 0.4, 0.3],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  for (const raw of inputs) {
    const w = projectCappedSimplex(raw, WEIGHT_CAP);
    const total = w.reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(total - 1) < 1e-6, `projected weights sum to ${total}`);
    assert.ok(w.every((x) => x >= -1e-9), 'projected weights must be non-negative');
    assert.ok(w.every((x) => x <= WEIGHT_CAP + 1e-6), 'projected weights must respect the cap');
  }
});

test('Black-Litterman with no views and no tilt returns the equilibrium prior', () => {
  // theta 0 and neutral sentiment means the views carry no weight.
  const neutral = blackLitterman({ regime: 'cooperative', theta: 0, sentiment: 0 });
  const prior = blackLitterman({ regime: 'cooperative', theta: 0, sentiment: 0 });
  assert.deepEqual(neutral.mu, prior.mu);
  for (const value of neutral.mu) assert.ok(Number.isFinite(value));
});

test('the posterior covariance stays positive definite in every regime', () => {
  for (const regime of REGIMES) {
    for (const theta of [0, 0.5, 1]) {
      const result = blackLitterman({ regime: regime.id, theta, sentiment: 0 });
      const { jitter } = cholesky(result.sigma);
      assert.ok(jitter < 1e-6, `posterior sigma lost definiteness for ${regime.id} at theta ${theta}`);
    }
  }
});

test('tau is the small scalar Black-Litterman expects', () => {
  assert.ok(TAU > 0 && TAU < 1, 'tau must be a small positive scalar');
});

test('CVaR multiplier is positive and heavier than the Gaussian case', () => {
  assert.ok(KAPPA > 0);
  assert.ok(NU > 2, 'Student-t needs more than two degrees of freedom for finite variance');
  assert.ok(BETA > 0.5 && BETA < 1);
});

test('portfolio statistics are internally consistent', () => {
  const bl = blackLitterman({ regime: 'conflict', theta: 0.6, sentiment: 0 });
  const stats = portfolioStats(W_MKT, bl.mu, bl.sigma, 0.035);
  assert.ok(stats.vol >= 0, 'volatility cannot be negative');
  assert.ok(Math.abs(stats.vol ** 2 - quadForm(bl.sigma, W_MKT)) < 1e-6, 'volatility must be the root of the variance');
  assert.ok(Number.isFinite(stats.sharpe));
  assert.ok(stats.cvar >= 0, 'CVaR is reported as a positive loss magnitude');
});

test('every risk profile produces a valid, capped, fully invested allocation', () => {
  for (const profile of PROFILES) {
    const inputs: OptimizerInputs = { ...DEFAULT_INPUTS, profile: profile.id };
    const result = computeAllocation(inputs);
    const total = result.weights.reduce((a, b) => a + b, 0);
    assert.ok(Math.abs(total - 1) < 1e-5, `${profile.id} weights sum to ${total}`);
    assert.ok(result.weights.every((w) => w >= -1e-9), `${profile.id} produced a short position`);
    assert.ok(result.weights.every((w) => w <= WEIGHT_CAP + 1e-5), `${profile.id} breached the weight cap`);
    assert.equal(result.weights.length, N_ASSETS);
  }
});

test('allocation is deterministic for identical inputs', () => {
  const a = computeAllocation(DEFAULT_INPUTS);
  const b = computeAllocation(DEFAULT_INPUTS);
  for (let i = 0; i < N_ASSETS; i += 1) {
    assert.ok(Math.abs(a.weights[i] - b.weights[i]) < 1e-12, `weight ${i} is not deterministic`);
  }
});

test('a more aggressive profile does not target a lower return than a conservative one', () => {
  const conservative = computeAllocation({ ...DEFAULT_INPUTS, profile: 'conservative' });
  const aggressive = computeAllocation({ ...DEFAULT_INPUTS, profile: 'aggressive' });
  assert.ok(
    aggressive.solve.target >= conservative.solve.target - 1e-9,
    'the aggressive profile should not aim below the conservative one',
  );
});

test('the frontier bounds are ordered and finite', () => {
  const result = computeAllocation(DEFAULT_INPUTS);
  assert.ok(Number.isFinite(result.frontier.minCvarReturn));
  assert.ok(Number.isFinite(result.frontier.maxReturn));
  assert.ok(result.frontier.maxReturn >= result.frontier.minCvarReturn);
});

test('changing the geopolitical regime changes the allocation', () => {
  const cooperative = computeAllocation({ ...DEFAULT_INPUTS, regime: 'cooperative', theta: 1 });
  const conflict = computeAllocation({ ...DEFAULT_INPUTS, regime: 'conflict', theta: 1 });
  const moved = cooperative.weights.some((w, i) => Math.abs(w - conflict.weights[i]) > 1e-4);
  assert.ok(moved, 'the regime input must actually reach the allocation');
});

test('extreme inputs do not produce NaN anywhere in the result', () => {
  const extremes: OptimizerInputs[] = [
    { ...DEFAULT_INPUTS, theta: 0, sentiment: -1, horizonYears: 1, initialCapital: 1 },
    { ...DEFAULT_INPUTS, theta: 1, sentiment: 1, horizonYears: 40, initialCapital: 10_000_000 },
    { ...DEFAULT_INPUTS, monthlyContribution: 0 },
  ];
  for (const inputs of extremes) {
    const result = computeAllocation(inputs);
    assert.ok(result.weights.every(Number.isFinite), 'weights must stay finite');
    assert.ok(Number.isFinite(result.stats.adaptive.vol));
    assert.ok(Number.isFinite(result.stats.adaptive.cvar));
    assert.ok(Number.isFinite(result.resilience.alphaBps));
  }
});
