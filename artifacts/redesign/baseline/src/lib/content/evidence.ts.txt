/**
 * Evidence registry.
 *
 * Every number the site publishes has an entry here carrying its source,
 * what it measures, the baseline it is measured against, the method, the date
 * and version it was produced at, and its limitations. A figure with no entry
 * does not get rendered — that is the whole point of the file.
 *
 * The greenwashing figures below were read out of
 * https://github.com/bumincetin/greenwashing-detection (PERFORMANCE_REPORT.md,
 * ALGORITHM_GUIDE.md, README.md), which states the metrics were re-run and
 * reproduced on 2026-01-29.
 *
 * Two numbers that used to appear on the site have no entry here on purpose:
 * the "80% reduction in manual review time" and the euro-denominated SME
 * outcomes. See docs/content-verification.md.
 */

export type EvidenceKind =
  /** Produced by a first-party experiment with a published artefact. */
  | 'measured'
  /** Computed in the browser from stated assumptions; not an observation. */
  | 'computed'
  /** A property of a dataset or corpus rather than a model result. */
  | 'dataset';

export interface EvidenceItem {
  id: string;
  /** Short label. Not localised: these are metric names, kept as identifiers. */
  metric: string;
  value: string;
  kind: EvidenceKind;
  /** Where a reader can check it. */
  source: string;
  sourceUrl?: string;
  /** What was measured, on what. */
  context: string;
  /** What it is measured against, if anything. */
  baseline?: string;
  method: string;
  /** ISO date the figure was produced or last reproduced. */
  asOf: string;
  version?: string;
  limitations: string;
}

const EVIDENCE = {
  'gw-sample-size': {
    id: 'gw-sample-size',
    metric: 'Evaluation set',
    value: '29 claims',
    kind: 'dataset',
    source: 'greenwashing-detection · PERFORMANCE_REPORT.md',
    sourceUrl: 'https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md',
    context:
      'Environmental claims extracted from corporate communications and rated for greenwashing risk by human reviewers, forming the reference set the detector is scored against.',
    method: 'Human expert ratings collected via a structured questionnaire, then used as ground truth.',
    asOf: '2026-01-29',
    limitations:
      'Twenty-nine items is a small evaluation set. Every figure derived from it carries wide uncertainty and none of it should be read as a population estimate.',
  },
  'gw-alpha': {
    id: 'gw-alpha',
    metric: "Krippendorff's α",
    value: '0.69',
    kind: 'measured',
    source: 'greenwashing-detection · PERFORMANCE_REPORT.md',
    sourceUrl: 'https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md',
    context: 'Agreement between the human raters who produced the reference ratings.',
    method: "Krippendorff's alpha across raters; pairwise agreement ≈ 0.852.",
    asOf: '2026-01-29',
    limitations:
      'α = 0.69 is substantial but not strong agreement: the humans themselves disagree on roughly a third of the signal, which caps how well any model can be expected to match them.',
  },
  'gw-pearson-v1': {
    id: 'gw-pearson-v1',
    metric: 'Pearson r (v1)',
    value: '0.906',
    kind: 'measured',
    source: 'greenwashing-detection · PERFORMANCE_REPORT.md',
    sourceUrl: 'https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md',
    context: 'Correlation between the v1 detector score and the human reference rating, over the 29-claim set.',
    baseline: 'v3 rule-based detector, r = 0.793; v2 semantic detector, r = 0.557.',
    method: 'Pearson correlation on continuous scores. Spearman 0.811, Kendall 0.627, MAE 0.206, RMSE 0.237.',
    asOf: '2026-01-29',
    version: 'v1',
    limitations:
      'Correlation on 29 items. It says the score moves with reviewer judgement, not that the score is calibrated as a probability of greenwashing.',
  },
  'gw-recall-v3': {
    id: 'gw-recall-v3',
    metric: 'Recall / precision (v3)',
    value: '0.40 recall at 1.00 precision',
    kind: 'measured',
    source: 'greenwashing-detection · PERFORMANCE_REPORT.md',
    sourceUrl: 'https://github.com/bumincetin/greenwashing-detection/blob/main/PERFORMANCE_REPORT.md',
    context:
      'Binary flag / no-flag performance of the v3 rule-based detector against the human reference labels.',
    baseline: 'v1 baseline: recall 0.15 at precision 1.00 (F1 0.261). v3 reaches F1 0.571.',
    method: 'Thresholded score compared with binarised human labels on the same 29-claim set.',
    asOf: '2026-01-29',
    version: 'v3',
    limitations:
      'Recall of 0.40 means roughly three in five flaggable claims are missed. Precision of 1.00 on a set this small is a handful of correct positives, not a guarantee. The tool is a reviewer aid; it cannot be a filter that runs unattended.',
  },
} as const satisfies Record<string, EvidenceItem>;

export type EvidenceKey = keyof typeof EVIDENCE;

export const getEvidence = (key: EvidenceKey): EvidenceItem => EVIDENCE[key];
