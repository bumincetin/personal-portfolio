/**
 * Dense linear algebra for small (n ≤ ~16) systems.
 *
 * Everything the optimizer needs is here: products, transposes, a Cholesky
 * factorisation with jitter for near-singular SPD matrices, and a pivoted
 * Gauss-Jordan inverse as the general fallback. Plain number[][] keeps the
 * code readable; at n = 8 the difference to typed arrays is noise.
 */

export type Vec = number[];
export type Mat = number[][];

export const zeros = (n: number): Vec => new Array<number>(n).fill(0);

export const zerosMat = (rows: number, cols: number): Mat =>
  Array.from({ length: rows }, () => zeros(cols));

export const identity = (n: number): Mat =>
  Array.from({ length: n }, (_, i) => {
    const row = zeros(n);
    row[i] = 1;
    return row;
  });

export const diag = (values: Vec): Mat =>
  values.map((v, i) => {
    const row = zeros(values.length);
    row[i] = v;
    return row;
  });

export const transpose = (a: Mat): Mat => {
  if (a.length === 0) return [];
  return a[0].map((_, j) => a.map((row) => row[j]));
};

export const matMul = (a: Mat, b: Mat): Mat => {
  const rows = a.length;
  const inner = b.length;
  const cols = inner === 0 ? 0 : b[0].length;
  const out = zerosMat(rows, cols);
  for (let i = 0; i < rows; i++) {
    const ai = a[i];
    const oi = out[i];
    for (let k = 0; k < inner; k++) {
      const aik = ai[k];
      if (aik === 0) continue;
      const bk = b[k];
      for (let j = 0; j < cols; j++) oi[j] += aik * bk[j];
    }
  }
  return out;
};

export const matVec = (a: Mat, v: Vec): Vec =>
  a.map((row) => {
    let s = 0;
    for (let j = 0; j < row.length; j++) s += row[j] * v[j];
    return s;
  });

export const dot = (a: Vec, b: Vec): number => {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
};

export const add = (a: Vec, b: Vec): Vec => a.map((x, i) => x + b[i]);
export const sub = (a: Vec, b: Vec): Vec => a.map((x, i) => x - b[i]);
export const scale = (a: Vec, k: number): Vec => a.map((x) => x * k);

export const matAdd = (a: Mat, b: Mat): Mat => a.map((row, i) => row.map((x, j) => x + b[i][j]));
export const matSub = (a: Mat, b: Mat): Mat => a.map((row, i) => row.map((x, j) => x - b[i][j]));
export const matScale = (a: Mat, k: number): Mat => a.map((row) => row.map((x) => x * k));

/** wᵀ A w */
export const quadForm = (a: Mat, w: Vec): number => {
  let s = 0;
  for (let i = 0; i < w.length; i++) {
    const wi = w[i];
    if (wi === 0) continue;
    const row = a[i];
    for (let j = 0; j < w.length; j++) s += wi * row[j] * w[j];
  }
  return s;
};

/**
 * Cholesky factor L with A = L Lᵀ. If the matrix is not numerically SPD the
 * diagonal is nudged (jitter) until it is; the nudge is reported so callers
 * can decide whether to care.
 */
export const cholesky = (a: Mat): { L: Mat; jitter: number } => {
  const n = a.length;
  let jitter = 0;
  for (let attempt = 0; attempt < 12; attempt++) {
    const L = zerosMat(n, n);
    let ok = true;
    for (let i = 0; i < n && ok; i++) {
      for (let j = 0; j <= i; j++) {
        let s = a[i][j] + (i === j ? jitter : 0);
        for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k];
        if (i === j) {
          if (s <= 1e-14) {
            ok = false;
            break;
          }
          L[i][i] = Math.sqrt(s);
        } else {
          L[i][j] = s / L[j][j];
        }
      }
    }
    if (ok) return { L, jitter };
    jitter = jitter === 0 ? 1e-10 : jitter * 10;
  }
  throw new Error('cholesky: matrix is not positive definite');
};

/** Solve A x = b for SPD A using its Cholesky factor. */
export const choleskySolve = (L: Mat, b: Vec): Vec => {
  const n = L.length;
  const y = zeros(n);
  for (let i = 0; i < n; i++) {
    let s = b[i];
    for (let k = 0; k < i; k++) s -= L[i][k] * y[k];
    y[i] = s / L[i][i];
  }
  const x = zeros(n);
  for (let i = n - 1; i >= 0; i--) {
    let s = y[i];
    for (let k = i + 1; k < n; k++) s -= L[k][i] * x[k];
    x[i] = s / L[i][i];
  }
  return x;
};

/** Inverse of a general square matrix by Gauss-Jordan with partial pivoting. */
export const invert = (a: Mat): Mat => {
  const n = a.length;
  const m = a.map((row, i) => [...row, ...identity(n)[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    if (Math.abs(m[pivot][col]) < 1e-14) throw new Error('invert: singular matrix');
    if (pivot !== col) [m[col], m[pivot]] = [m[pivot], m[col]];
    const p = m[col][col];
    for (let j = 0; j < 2 * n; j++) m[col][j] /= p;
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = m[r][col];
      if (f === 0) continue;
      for (let j = 0; j < 2 * n; j++) m[r][j] -= f * m[col][j];
    }
  }
  return m.map((row) => row.slice(n));
};

/** Inverse of an SPD matrix through its Cholesky factor (falls back to Gauss-Jordan). */
export const invertSPD = (a: Mat): Mat => {
  try {
    const { L } = cholesky(a);
    const n = a.length;
    const cols = identity(n).map((e) => choleskySolve(L, e));
    return transpose(cols);
  } catch {
    return invert(a);
  }
};

/** Force exact symmetry after a chain of products that may have drifted. */
export const symmetrize = (a: Mat): Mat =>
  a.map((row, i) => row.map((x, j) => 0.5 * (x + a[j][i])));
