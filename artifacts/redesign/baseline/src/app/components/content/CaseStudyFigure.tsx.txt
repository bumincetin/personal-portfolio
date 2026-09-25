import React from 'react';
import type { Locale } from '@/lib/translations';
import type { CaseStudySpine } from '@/lib/content/case-studies';
import { getUI } from '@/lib/content/ui';
import { ProvenanceBadge, type ProvenanceKind } from './Badges';
import ScrollRegion from './ScrollRegion';

/**
 * The one meaningful visual each case study carries.
 *
 * These are inline SVG rather than images for three reasons that all matter
 * here: the text in them is real text (so it is never a rasterised label a
 * screen reader cannot reach, and it stays sharp at any zoom), the colours
 * resolve through the theme tokens so both themes are correct without a second
 * asset, and there is no image request on the critical path.
 *
 * Every figure is a `<figure>` with a `<figcaption>` stating its origin, and
 * the SVG itself carries a hand-written description naming the actual numbers.
 * A reader who cannot see the chart gets the finding, not "chart".
 */

interface Props {
  study: CaseStudySpine;
  locale: Locale;
  caption: string;
  /** Full prose description including the figures. Never "a chart showing…". */
  alt: string;
  provenance: ProvenanceKind;
  provenanceDetail?: string;
  className?: string;
}

const ACCENT = 'rgb(var(--c-brass))';
const MUTED = 'rgb(var(--c-muted))';
const HAIRLINE = 'rgb(var(--c-hairline-strong))';
const TEXT = 'rgb(var(--c-text))';
const CAUTION = 'rgb(var(--c-caution))';

/**
 * Detector versions from the greenwashing performance report, 29 Jan 2026.
 * Correlation is Pearson; recall is the binary flagging rate.
 */
const DETECTORS = [
  { version: 'v1', correlation: 0.906, recall: 0.15, retired: false },
  { version: 'v2', correlation: 0.557, recall: 0.15, retired: true },
  { version: 'v3', correlation: 0.793, recall: 0.4, retired: false },
];

function ScoreCorrelation() {
  const plotW = 300;
  const barH = 16;
  const rowH = 46;

  return (
    <svg viewBox="0 0 520 210" className="h-auto w-full" role="img" aria-hidden="true" focusable="false">
      <text x="0" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        AGREEMENT WITH EXPERT RATING (PEARSON r)
      </text>
      <text x="330" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        FLAGS FOUND
      </text>

      {DETECTORS.map((d, i) => {
        const y = 34 + i * rowH;
        return (
          <g key={d.version}>
            <text x="0" y={y + barH - 3} fontSize="13" fill={TEXT} fontFamily="var(--font-mono)">
              {d.version}
            </text>
            {/* Track */}
            <rect x="34" y={y} width={plotW - 34} height={barH} fill={HAIRLINE} opacity="0.25" rx="2" />
            {/* Value */}
            <rect
              x="34"
              y={y}
              width={(plotW - 34) * d.correlation}
              height={barH}
              fill={d.retired ? MUTED : ACCENT}
              opacity={d.retired ? 0.45 : 1}
              rx="2"
            />
            <text x={plotW + 8} y={y + barH - 3} fontSize="12" fill={TEXT} fontFamily="var(--font-mono)">
              {d.correlation.toFixed(3)}
            </text>

            {/* Recall, as a proportion of the flaggable items. */}
            <rect x="400" y={y} width="80" height={barH} fill={HAIRLINE} opacity="0.25" rx="2" />
            <rect x="400" y={y} width={80 * d.recall} height={barH} fill={CAUTION} rx="2" />
            <text x="488" y={y + barH - 3} fontSize="12" fill={TEXT} fontFamily="var(--font-mono)">
              {Math.round(d.recall * 100)}%
            </text>

            {d.retired && (
              <text x="34" y={y + barH + 13} fontSize="10" fill={MUTED} fontFamily="var(--font-mono)">
                RETIRED
              </text>
            )}
          </g>
        );
      })}

      <line x1="0" y1="184" x2="520" y2="184" stroke={HAIRLINE} strokeWidth="1" />
      <text x="0" y="200" fontSize="11" fill={MUTED}>
        n = 29 expert-rated claims · human rater agreement α = 0.69
      </text>
    </svg>
  );
}

/**
 * The threshold discontinuity: seats as a step function of vote share. Drawn
 * from the mechanism, not from a forecast — no party is named and no election
 * outcome is asserted.
 */
function SeatDistribution() {
  const threshold = 0.35;
  const points: string[] = [];
  const w = 460;
  const h = 130;

  for (let i = 0; i <= 100; i += 1) {
    const share = i / 100;
    // Below the threshold: nothing. Above it: proportional, from a jump.
    const seats = share < threshold ? 0 : 0.18 + (share - threshold) * 1.1;
    points.push(`${40 + share * (w - 60)},${h - seats * (h - 30)}`);
  }

  return (
    <svg viewBox="0 0 520 190" className="h-auto w-full" role="img" aria-hidden="true" focusable="false">
      <text x="0" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        SEATS AWARDED AS A FUNCTION OF VOTE SHARE
      </text>

      {/* Axes */}
      <line x1="40" y1={h} x2={w} y2={h} stroke={HAIRLINE} strokeWidth="1" />
      <line x1="40" y1="24" x2="40" y2={h} stroke={HAIRLINE} strokeWidth="1" />

      {/* Threshold marker */}
      <line
        x1={40 + threshold * (w - 60)}
        y1="24"
        x2={40 + threshold * (w - 60)}
        y2={h}
        stroke={CAUTION}
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <text x={40 + threshold * (w - 60) + 6} y="36" fontSize="11" fill={CAUTION} fontFamily="var(--font-mono)">
        THRESHOLD
      </text>

      <polyline points={points.join(' ')} fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinejoin="round" />

      <text x="40" y={h + 18} fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        0%
      </text>
      <text x={w - 24} y={h + 18} fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        VOTE SHARE
      </text>
      <text x="0" y="176" fontSize="11" fill={MUTED}>
        Below the threshold a party receives no seats; just above it, a disproportionate number.
      </text>
    </svg>
  );
}

/** Allocation against benchmark, plus a widening outcome fan. */
function EfficientFrontier() {
  const assets = [
    { label: 'SPY', benchmark: 0.36, allocated: 0.24 },
    { label: 'EFA', benchmark: 0.14, allocated: 0.09 },
    { label: 'EEM', benchmark: 0.06, allocated: 0.04 },
    { label: 'IEF', benchmark: 0.18, allocated: 0.22 },
    { label: 'TIP', benchmark: 0.06, allocated: 0.11 },
    { label: 'DBC', benchmark: 0.05, allocated: 0.08 },
    { label: 'GLD', benchmark: 0.05, allocated: 0.14 },
    { label: 'BIL', benchmark: 0.1, allocated: 0.08 },
  ];
  const colW = 30;
  const maxH = 90;

  const fan = (spread: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i += 1) {
      const t = i / 40;
      pts.push(`${300 + t * 210},${96 - t * 34 - spread * t * t * 52}`);
    }
    for (let i = 40; i >= 0; i -= 1) {
      const t = i / 40;
      pts.push(`${300 + t * 210},${96 - t * 34 + spread * t * t * 52}`);
    }
    return pts.join(' ');
  };

  return (
    <svg viewBox="0 0 520 200" className="h-auto w-full" role="img" aria-hidden="true" focusable="false">
      <text x="0" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        ALLOCATION VS BENCHMARK
      </text>
      <text x="300" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        SIMULATED OUTCOME RANGE
      </text>

      {assets.map((a, i) => {
        const x = i * colW;
        return (
          <g key={a.label}>
            <rect x={x} y={110 - a.benchmark * maxH} width="11" height={a.benchmark * maxH} fill={HAIRLINE} rx="1" />
            <rect x={x + 13} y={110 - a.allocated * maxH} width="11" height={a.allocated * maxH} fill={ACCENT} rx="1" />
            <text x={x} y="124" fontSize="9" fill={MUTED} fontFamily="var(--font-mono)">
              {a.label}
            </text>
          </g>
        );
      })}

      <g>
        <rect x="0" y="140" width="11" height="9" fill={HAIRLINE} rx="1" />
        <text x="17" y="148" fontSize="11" fill={MUTED}>
          Benchmark
        </text>
        <rect x="96" y="140" width="11" height="9" fill={ACCENT} rx="1" />
        <text x="113" y="148" fontSize="11" fill={MUTED}>
          Allocation
        </text>
      </g>

      <polygon points={fan(1)} fill={ACCENT} opacity="0.12" />
      <polygon points={fan(0.5)} fill={ACCENT} opacity="0.18" />
      <line x1="300" y1="96" x2="510" y2="62" stroke={ACCENT} strokeWidth="2" />
      <text x="300" y="176" fontSize="11" fill={MUTED}>
        Median path with widening bands — a distribution, not a projection.
      </text>
    </svg>
  );
}

/** A single ratio traced back to the rows it consumed. */
function RatioTrace() {
  const rows = [
    { row: 2, label: 'Cash and bank', value: '180,000' },
    { row: 3, label: 'Trade receivables', value: '420,000' },
    { row: 4, label: 'Inventory', value: '260,000' },
    { row: 5, label: 'Prepaid expenses', value: '40,000' },
  ];

  return (
    <svg viewBox="0 0 520 210" className="h-auto w-full" role="img" aria-hidden="true" focusable="false">
      <text x="0" y="12" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        CURRENT RATIO
      </text>
      <text x="0" y="42" fontSize="30" fill={TEXT} fontFamily="var(--font-mono)">
        1.64
      </text>
      <text x="70" y="42" fontSize="12" fill={MUTED} fontFamily="var(--font-mono)">
        currentAssets / currentLiabilities
      </text>

      <line x1="0" y1="58" x2="520" y2="58" stroke={HAIRLINE} strokeWidth="1" />
      <text x="0" y="76" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        SOURCE ROWS — CURRENT ASSETS 900,000
      </text>

      {rows.map((r, i) => (
        <g key={r.row}>
          <text x="0" y={98 + i * 20} fontSize="11" fill={ACCENT} fontFamily="var(--font-mono)">
            Row {r.row}
          </text>
          <text x="56" y={98 + i * 20} fontSize="12" fill={TEXT}>
            {r.label}
          </text>
          <text x="330" y={98 + i * 20} fontSize="12" fill={TEXT} fontFamily="var(--font-mono)" textAnchor="end">
            {r.value}
          </text>
        </g>
      ))}

      <line x1="0" y1="184" x2="520" y2="184" stroke={HAIRLINE} strokeWidth="1" />
      <text x="0" y="200" fontSize="11" fill={MUTED} fontFamily="var(--font-mono)">
        CURRENT LIABILITIES 550,000 (rows 9–11)
      </text>
    </svg>
  );
}

const FIGURES: Record<CaseStudySpine['visual'], React.ComponentType> = {
  'score-correlation': ScoreCorrelation,
  'seat-distribution': SeatDistribution,
  'efficient-frontier': EfficientFrontier,
  'ratio-trace': RatioTrace,
};

export default function CaseStudyFigure({
  study,
  locale,
  caption,
  alt,
  provenance,
  provenanceDetail,
  className = '',
}: Props) {
  const ui = getUI(locale);
  const Figure = FIGURES[study.visual];

  return (
    <figure className={`rounded-editorial border border-border bg-surface p-5 sm:p-7 ${className}`}>
      <ProvenanceBadge kind={provenance} locale={locale} detail={provenanceDetail} className="mb-5" />

      {/* The SVG is aria-hidden and the description sits beside it as real text,
          so it is available to every reader rather than only to a screen reader. */}
      <ScrollRegion label={`${ui.work.figureLabel}: ${caption}`}>
        <div className="min-w-[600px]">
          <Figure />
        </div>
      </ScrollRegion>

      <figcaption className="mt-5 border-t border-border pt-4">
        <p className="measure text-[0.875rem] leading-relaxed text-charcoal">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            {ui.work.figureLabel}
          </span>{' '}
          {alt}
        </p>
        <p className="measure mt-3 text-[0.8125rem] leading-relaxed text-muted">{caption}</p>
      </figcaption>
    </figure>
  );
}
