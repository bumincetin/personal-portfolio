/**
 * Minimal 3D wireframe engine for the site's canvas visuals.
 *
 * Deliberately not three.js: the previous three.js background cost ~750KB of
 * JS per route and was the main cause of the old lag. Everything the site
 * draws is points and lines, which needs nothing more than a rotation, a
 * perspective divide and a handful of polyhedra -- roughly 200 lines, tree-
 * shaken into the two components that use it.
 *
 * Conventions: model space is a unit-ish sphere around the origin, +y up.
 * `project` returns screen coordinates plus the perspective factor `s`, which
 * doubles as a depth cue for size and alpha shading.
 */

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Edge {
  a: number;
  b: number;
}

export interface Shape {
  points: Vec3[];
  edges: Edge[];
}

export const CAMERA_DISTANCE = 3.4;

/** Rotate around the X axis, then the Y axis. */
export function rotatePoint(p: Vec3, ax: number, ay: number): Vec3 {
  const cosX = Math.cos(ax);
  const sinX = Math.sin(ax);
  const y1 = p.y * cosX - p.z * sinX;
  const z1 = p.y * sinX + p.z * cosX;

  const cosY = Math.cos(ay);
  const sinY = Math.sin(ay);
  return {
    x: p.x * cosY + z1 * sinY,
    y: y1,
    z: -p.x * sinY + z1 * cosY,
  };
}

/** Perspective projection onto the canvas. `s` shrinks with distance. */
export function project(p: Vec3, cx: number, cy: number, scale: number) {
  const s = CAMERA_DISTANCE / (CAMERA_DISTANCE + p.z);
  return { x: cx + p.x * scale * s, y: cy - p.y * scale * s, s };
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const lerpVec = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  z: lerp(a.z, b.z, t),
});

/** 0 below `e0`, 1 above `e1`, smooth hermite ramp in between. */
export function smoothstep(value: number, e0: number, e1: number) {
  const t = Math.min(1, Math.max(0, (value - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/**
 * Quintic variant: zero first *and* second derivative at both ends, so a
 * morph driven by it has no perceptible start or stop -- the butter option.
 */
export function smootherstep(value: number, e0: number, e1: number) {
  const t = Math.min(1, Math.max(0, (value - e0) / (e1 - e0)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export type Rgb = [number, number, number];

export const mixRgb = (a: Rgb, b: Rgb, t: number): Rgb => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

export const rgba = (c: Rgb, alpha: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha.toFixed(3)})`;

/**
 * Deterministic pseudo-random stream (LCG). Shapes seeded with the same value
 * come out identical on every mount, so re-renders never reshuffle the scene.
 */
export function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const distance = (a: Vec3, b: Vec3) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

/** Connect every pair separated by (roughly) the shortest pair distance. */
function edgesByNearest(points: Vec3[]): Edge[] {
  let shortest = Infinity;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = distance(points[i], points[j]);
      if (d > 1e-6 && d < shortest) shortest = d;
    }
  }
  const edges: Edge[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (distance(points[i], points[j]) < shortest * 1.05) edges.push({ a: i, b: j });
    }
  }
  return edges;
}

const normalize = (p: Vec3, radius = 1): Vec3 => {
  const m = Math.hypot(p.x, p.y, p.z) || 1;
  return { x: (p.x / m) * radius, y: (p.y / m) * radius, z: (p.z / m) * radius };
};

/** 12 vertices, 30 edges. */
export function icosahedron(radius = 1): Shape {
  const t = (1 + Math.sqrt(5)) / 2;
  const raw: Vec3[] = [
    { x: -1, y: t, z: 0 }, { x: 1, y: t, z: 0 }, { x: -1, y: -t, z: 0 }, { x: 1, y: -t, z: 0 },
    { x: 0, y: -1, z: t }, { x: 0, y: 1, z: t }, { x: 0, y: -1, z: -t }, { x: 0, y: 1, z: -t },
    { x: t, y: 0, z: -1 }, { x: t, y: 0, z: 1 }, { x: -t, y: 0, z: -1 }, { x: -t, y: 0, z: 1 },
  ];
  const points = raw.map((p) => normalize(p, radius));
  return { points, edges: edgesByNearest(points) };
}

/** 6 vertices, 12 edges. */
export function octahedron(radius = 1): Shape {
  const points: Vec3[] = [
    { x: radius, y: 0, z: 0 }, { x: -radius, y: 0, z: 0 },
    { x: 0, y: radius, z: 0 }, { x: 0, y: -radius, z: 0 },
    { x: 0, y: 0, z: radius }, { x: 0, y: 0, z: -radius },
  ];
  return { points, edges: edgesByNearest(points) };
}

/** n^3 grid of points with edges along the axes -- the "refinement" lattice. */
export function cubeLattice(n = 4, extent = 1): Shape {
  const points: Vec3[] = [];
  const edges: Edge[] = [];
  const step = (extent * 2) / (n - 1);
  const index = (x: number, y: number, z: number) => x * n * n + y * n + z;

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      for (let z = 0; z < n; z++) {
        points.push({ x: -extent + x * step, y: -extent + y * step, z: -extent + z * step });
        if (x > 0) edges.push({ a: index(x - 1, y, z), b: index(x, y, z) });
        if (y > 0) edges.push({ a: index(x, y - 1, z), b: index(x, y, z) });
        if (z > 0) edges.push({ a: index(x, y, z - 1), b: index(x, y, z) });
      }
    }
  }
  return { points, edges };
}

/**
 * Brilliant-cut gem: an octagonal table, a crown ring, a wider girdle and a
 * pavilion tapering to a single culet point.
 */
export function gem(): Shape {
  const points: Vec3[] = [];
  const edges: Edge[] = [];

  const girdleCount = 12;
  const crownCount = 8;
  const tableCount = 8;

  // Girdle: the widest ring.
  const girdleStart = points.length;
  for (let i = 0; i < girdleCount; i++) {
    const a = (i / girdleCount) * Math.PI * 2;
    points.push({ x: Math.cos(a) * 1.0, y: 0.08, z: Math.sin(a) * 1.0 });
  }
  // Crown ring.
  const crownStart = points.length;
  for (let i = 0; i < crownCount; i++) {
    const a = ((i + 0.5) / crownCount) * Math.PI * 2;
    points.push({ x: Math.cos(a) * 0.62, y: 0.5, z: Math.sin(a) * 0.62 });
  }
  // Table: the flat top.
  const tableStart = points.length;
  for (let i = 0; i < tableCount; i++) {
    const a = ((i + 0.5) / tableCount) * Math.PI * 2;
    points.push({ x: Math.cos(a) * 0.34, y: 0.66, z: Math.sin(a) * 0.34 });
  }
  // Culet: the bottom point.
  const culet = points.length;
  points.push({ x: 0, y: -0.95, z: 0 });

  const ring = (start: number, count: number) => {
    for (let i = 0; i < count; i++) edges.push({ a: start + i, b: start + ((i + 1) % count) });
  };
  ring(girdleStart, girdleCount);
  ring(crownStart, crownCount);
  ring(tableStart, tableCount);

  // Crown facets: each crown vertex to its two nearest girdle vertices.
  for (let i = 0; i < crownCount; i++) {
    const g = Math.round((i + 0.5) * (girdleCount / crownCount));
    edges.push({ a: crownStart + i, b: girdleStart + (g % girdleCount) });
    edges.push({ a: crownStart + i, b: girdleStart + ((g + girdleCount - 1) % girdleCount) });
  }
  // Table to crown.
  for (let i = 0; i < tableCount; i++) edges.push({ a: tableStart + i, b: crownStart + i });
  // Pavilion: every girdle vertex to the culet.
  for (let i = 0; i < girdleCount; i++) edges.push({ a: girdleStart + i, b: culet });

  return { points, edges };
}

/** Two interlocked tilted rings -- an orbit ornament, not a solid. */
export function orbits(radius = 1, segments = 48): Shape {
  const points: Vec3[] = [];
  const edges: Edge[] = [];
  const addRing = (tiltX: number, tiltZ: number) => {
    const start = points.length;
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      const p = { x: Math.cos(a) * radius, y: 0, z: Math.sin(a) * radius };
      // Tilt around X, then around Z.
      const y1 = p.y * Math.cos(tiltX) - p.z * Math.sin(tiltX);
      const z1 = p.y * Math.sin(tiltX) + p.z * Math.cos(tiltX);
      const x2 = p.x * Math.cos(tiltZ) - y1 * Math.sin(tiltZ);
      const y2 = p.x * Math.sin(tiltZ) + y1 * Math.cos(tiltZ);
      points.push({ x: x2, y: y2, z: z1 });
      edges.push({ a: start + i, b: start + ((i + 1) % segments) });
    }
  };
  addRing(1.15, 0.35);
  addRing(-0.95, -0.5);
  return { points, edges };
}

/** Loose gaussian-ish blob of n points -- the "raw material" chaos cloud. */
export function chaosCloud(n: number, seed: number, radius = 1.1): Vec3[] {
  const rnd = createRandom(seed);
  const points: Vec3[] = [];
  for (let i = 0; i < n; i++) {
    // Sum of two uniforms centers the mass without a hard shell.
    const g = () => (rnd() + rnd() - 1) * radius * 1.35;
    points.push({ x: g(), y: g(), z: g() });
  }
  return points;
}

/** A random point along a random edge of the shape -- fills wireframes out. */
export function pointOnRandomEdge(shape: Shape, rnd: () => number): Vec3 {
  const edge = shape.edges[Math.floor(rnd() * shape.edges.length)];
  return lerpVec(shape.points[edge.a], shape.points[edge.b], rnd());
}

/**
 * The sculpture's colour story: raw stone warms to oxidised copper as it is
 * refined, then to brushed brass once it is cut. Bone is the scan light.
 */
export const PALETTE = {
  stone: [168, 153, 138] as Rgb,
  copper: [161, 124, 88] as Rgb,
  brass: [192, 138, 62] as Rgb,
  bone: [240, 233, 223] as Rgb,
};
