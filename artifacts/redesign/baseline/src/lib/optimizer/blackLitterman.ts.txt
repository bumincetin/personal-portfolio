/**
 * Black-Litterman view engine.
 *
 * A macro regime is expressed as a handful of qualitative views — absolute
 * ("gold earns 9%") or relative ("TIPS beat nominal Treasuries by 250bp") —
 * each with a confidence. Together with an optional equity-sentiment view
 * they become the pick matrix P, the view vector Q and the uncertainty
 * matrix Ω, and the posterior return μ_BL / covariance Σ_BL follow from the
 * standard closed form:
 *
 *   μ_BL = Π + τΣPᵀ (PτΣPᵀ + Ω)⁻¹ (Q − PΠ)
 *   Σ_BL = Σ + τΣ − τΣPᵀ (PτΣPᵀ + Ω)⁻¹ PτΣ
 *
 * Geopolitical inertia θ ∈ [0, 1] governs how much structural (regime) views
 * override cyclical data: it scales both the size of each view's deviation
 * from equilibrium and the confidence attached to it. θ = 0 collapses the
 * posterior onto the prior; θ = 1 applies the regime at full strength.
 */

import { INDEX, N_ASSETS, PI, SIGMA, TICKERS, type Ticker } from './universe';
import {
  dot,
  invertSPD,
  matAdd,
  matMul,
  matScale,
  matSub,
  matVec,
  sub,
  symmetrize,
  transpose,
  type Mat,
  type Vec,
} from './linalg';

export type RegimeId = 'cooperative' | 'inflation' | 'conflict' | 'stagnation';

export interface View {
  /** Portfolio picks: positive = long, negative = short. Relative views sum to 0. */
  picks: Partial<Record<Ticker, number>>;
  /** Annualised return the view asserts for pᵀr. */
  q: number;
  /** Confidence in (0, 1). */
  confidence: number;
  label: string;
}

export interface Regime {
  id: RegimeId;
  name: string;
  shortName: string;
  summary: string;
  views: View[];
}

export const REGIMES: readonly Regime[] = [
  {
    id: 'cooperative',
    name: 'Cooperative Global Growth',
    shortName: 'Cooperative',
    summary:
      'Open trade, synchronised expansion, low political risk premia. Risk assets and EM lead; hedges earn little.',
    views: [
      { picks: { EEM: 1, SPY: -1 }, q: 0.02, confidence: 0.55, label: 'EM outperforms US by 200bp' },
      { picks: { EFA: 1, SPY: -1 }, q: 0.01, confidence: 0.45, label: 'Developed ex-US beats US by 100bp' },
      { picks: { GLD: 1 }, q: 0.03, confidence: 0.55, label: 'Gold returns 3% (hedge premium fades)' },
      { picks: { DBC: 1 }, q: 0.04, confidence: 0.45, label: 'Commodities return 4%' },
      { picks: { IEF: 1 }, q: 0.035, confidence: 0.4, label: 'Treasuries return 3.5%' },
    ],
  },
  {
    id: 'inflation',
    name: 'High Inflation / Resource Nationalism',
    shortName: 'Inflation',
    summary:
      'Export controls and cartelised supply keep prices elevated. Real assets and inflation-linked bonds lead; nominal duration suffers.',
    views: [
      { picks: { DBC: 1 }, q: 0.09, confidence: 0.65, label: 'Commodities return 9%' },
      { picks: { TIP: 1, IEF: -1 }, q: 0.025, confidence: 0.7, label: 'TIPS beat Treasuries by 250bp' },
      { picks: { GLD: 1 }, q: 0.07, confidence: 0.6, label: 'Gold returns 7%' },
      { picks: { SPY: 1 }, q: 0.05, confidence: 0.5, label: 'US equities return 5% (margin squeeze)' },
      { picks: { EEM: 1, EFA: -1 }, q: 0.015, confidence: 0.45, label: 'Resource-heavy EM beats DM ex-US by 150bp' },
      { picks: { IEF: 1 }, q: 0.02, confidence: 0.55, label: 'Treasuries return 2%' },
    ],
  },
  {
    id: 'conflict',
    name: 'Geopolitical Fracturing / Conflict',
    shortName: 'Conflict',
    summary:
      'Bloc formation, sanctions and kinetic risk. Gold and energy spike, US assets attract safe-haven flows, EM and Europe de-rate.',
    views: [
      { picks: { GLD: 1 }, q: 0.1, confidence: 0.75, label: 'Gold returns 10% (safe-haven bid)' },
      { picks: { SPY: 1, EFA: -1 }, q: 0.03, confidence: 0.65, label: 'US beats Europe/Japan by 300bp' },
      { picks: { EEM: 1 }, q: 0.015, confidence: 0.65, label: 'EM returns 1.5% (sanctions, capital flight)' },
      { picks: { DBC: 1 }, q: 0.085, confidence: 0.6, label: 'Energy-led commodities return 8.5%' },
      { picks: { IEF: 1 }, q: 0.045, confidence: 0.55, label: 'Treasuries return 4.5% (flight to quality)' },
      { picks: { EFA: 1 }, q: 0.03, confidence: 0.55, label: 'Developed ex-US returns 3%' },
    ],
  },
  {
    id: 'stagnation',
    name: 'Disinflationary Stagnation',
    shortName: 'Stagnation',
    summary:
      'Demographic drag, deleveraging and falling real rates. Duration wins, commodities lose their bid, equities grind.',
    views: [
      { picks: { IEF: 1 }, q: 0.058, confidence: 0.7, label: 'Treasuries return 5.8% (rate cuts)' },
      { picks: { SPY: 1 }, q: 0.045, confidence: 0.55, label: 'US equities return 4.5%' },
      { picks: { EEM: 1 }, q: 0.03, confidence: 0.55, label: 'EM returns 3% (weak global demand)' },
      { picks: { DBC: 1 }, q: 0.0, confidence: 0.6, label: 'Commodities return 0%' },
      { picks: { GLD: 1 }, q: 0.04, confidence: 0.45, label: 'Gold returns 4% (real rates fall)' },
      { picks: { TIP: 1, IEF: -1 }, q: -0.012, confidence: 0.55, label: 'TIPS lag Treasuries by 120bp' },
    ],
  },
];

export const REGIME_BY_ID: Record<RegimeId, Regime> = Object.fromEntries(
  REGIMES.map((r) => [r.id, r]),
) as Record<RegimeId, Regime>;

/** Prior scaling τ: how uncertain the equilibrium is relative to Σ. */
export const TAU = 0.05;

/** Equity basket used by the sentiment view. */
const EQUITY_BASKET: Partial<Record<Ticker, number>> = { SPY: 0.6, EFA: 0.25, EEM: 0.15 };

export interface AppliedView {
  label: string;
  /** Effective view return after θ scaling. */
  q: number;
  /** Equilibrium-implied return for the same pick vector (PΠ). */
  prior: number;
  /** Effective confidence after θ scaling. */
  confidence: number;
  /** Diagonal Ω entry. */
  omega: number;
  isSentiment: boolean;
}

export interface BLInputs {
  regime: RegimeId;
  /** Geopolitical inertia θ ∈ [0, 1]. */
  theta: number;
  /** Equity sentiment ∈ [-1, 1]; 0 disables the sentiment view. */
  sentiment: number;
}

export interface BLResult {
  mu: Vec;
  sigma: Mat;
  prior: Vec;
  views: AppliedView[];
  P: Mat;
  Q: Vec;
  omega: Vec;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

const pickVector = (picks: Partial<Record<Ticker, number>>): Vec => {
  const p = new Array<number>(N_ASSETS).fill(0);
  for (const t of TICKERS) {
    const v = picks[t];
    if (v) p[INDEX[t]] = v;
  }
  return p;
};

/**
 * Build P, Q, Ω for a regime at inertia θ with optional sentiment, then
 * compute the posterior. Pure and deterministic; ~0.1ms at n = 8.
 */
export function blackLitterman({ regime, theta, sentiment }: BLInputs): BLResult {
  const t = clamp(theta, 0, 1);
  // θ scales structural conviction: view size and certainty both shrink as
  // θ → 0, so the posterior slides back onto the cyclical prior.
  const magnitude = 0.25 + 0.75 * t;
  const certainty = 0.2 + 0.8 * t;

  const P: Mat = [];
  const Q: Vec = [];
  const omega: Vec = [];
  const applied: AppliedView[] = [];

  const tauSigma = matScale(SIGMA, TAU);

  const pushView = (
    picks: Partial<Record<Ticker, number>>,
    q: number,
    conf: number,
    label: string,
    isSentiment: boolean,
  ) => {
    const p = pickVector(picks);
    const prior = dot(p, PI);
    // Ω_k = τ·pΣpᵀ·(1−c)/c — the He-Litterman variance at c = 0.5, tighter
    // with more confidence, looser with less.
    const pSp = dot(p, matVec(tauSigma, p));
    const om = Math.max(pSp * ((1 - conf) / conf), 1e-10);
    P.push(p);
    Q.push(q);
    omega.push(om);
    applied.push({ label, q, prior, confidence: conf, omega: om, isSentiment });
  };

  for (const v of REGIME_BY_ID[regime].views) {
    const prior = dot(pickVector(v.picks), PI);
    const q = prior + magnitude * (v.q - prior);
    const conf = clamp(v.confidence * certainty, 0.03, 0.97);
    pushView(v.picks, q, conf, v.label, false);
  }

  const s = clamp(sentiment, -1, 1);
  if (Math.abs(s) > 0.01) {
    // ±400bp at full conviction. Raw confidence rises with |s| and is not
    // θ-scaled: sentiment is a cyclical view, not a structural one.
    const prior = dot(pickVector(EQUITY_BASKET), PI);
    const q = prior + 0.04 * s;
    const conf = clamp(0.2 + 0.6 * Math.abs(s), 0.03, 0.97);
    const bp = Math.round(s * 400);
    pushView(
      EQUITY_BASKET,
      q,
      conf,
      `${s > 0 ? 'Bullish' : 'Bearish'} equity sentiment (${bp > 0 ? '+' : ''}${bp}bp)`,
      true,
    );
  }

  if (P.length === 0) {
    return { mu: [...PI], sigma: matAdd(SIGMA, tauSigma), prior: [...PI], views: [], P, Q, omega };
  }

  const Pt = transpose(P);
  const tauSigmaPt = matMul(tauSigma, Pt); // n×k
  const PtauSigmaPt = matMul(P, tauSigmaPt); // k×k
  const M = symmetrize(PtauSigmaPt.map((row, i) => row.map((x, j) => x + (i === j ? omega[i] : 0))));
  const Minv = invertSPD(M);

  const gain = matMul(tauSigmaPt, Minv); // n×k
  const innovation = sub(Q, matVec(P, PI)); // Q − PΠ
  const mu = PI.map((pi, i) => pi + dot(gain[i], innovation));

  // Posterior covariance of the mean: τΣ − τΣPᵀ M⁻¹ PτΣ; add to Σ for the
  // predictive covariance of returns.
  const reduction = matMul(gain, matMul(P, tauSigma));
  const sigma = symmetrize(matAdd(SIGMA, matSub(tauSigma, reduction)));

  return { mu, sigma, prior: [...PI], views: applied, P, Q, omega };
}
