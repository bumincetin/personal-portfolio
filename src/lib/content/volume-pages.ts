import type { Locale } from '../translations';
import { getUI } from './ui';
import { getCaseStudy, getCaseStudyCopy, type CaseStudySpine } from './case-studies';
import { getAllServiceCopy, getService } from './services';
import { getEvidence, type EvidenceKey } from './evidence';
import { VOLUMES, getShelfBooks, type VolumeSpine } from '@/app/components/shelf/volumes';
import { getShelfUI } from '@/app/components/shelf/shelf-ui';

/**
 * Turns each volume's content into the pages of a book.
 *
 * The site used to spread this material across a services index, four service
 * pages, a work index and four case-study pages. It is now bound into seven
 * volumes, and a volume is read the way a book is read: a title page, then one
 * idea per spread, then the colophon that tells you what to do next.
 *
 * A page is a small typed block rather than free HTML, so the reader component
 * can lay any of them out and every one stays real, selectable, translatable
 * text. Nothing here is rasterised onto a canvas — the 3D book on the shelf is
 * the presentation of this content, and this is the content itself.
 */

export type PageBlock =
  | {
      kind: 'title';
      roman: string;
      /** Replaces "Volume N" where the thing being opened is not a volume. */
      label?: string;
      discipline: string;
      title: string;
      note: string;
    }
  | { kind: 'prose'; heading: string; body: string }
  | { kind: 'list'; heading: string; lede?: string; items: string[] }
  | { kind: 'pairs'; heading: string; lede?: string; items: { term: string; detail: string }[] }
  | { kind: 'figure'; heading: string; slug: string; caption: string; alt: string; synthetic: boolean }
  | { kind: 'evidence'; heading: string; lede: string; entries: EvidencePageEntry[] }
  | { kind: 'offer'; heading: string; name: string; output: string }
  | { kind: 'links'; heading: string; items: { label: string; href: string; external: boolean }[] }
  | { kind: 'demo'; heading: string; lede: string }
  | { kind: 'colophon'; heading: string; body: string; cta: string; href: string };

export interface EvidencePageEntry {
  metric: string;
  value: string;
  source: string;
  sourceUrl?: string;
  method: string;
  baseline?: string;
  asOf: string;
  limitations: string;
}

export interface VolumePage {
  /** Stable id, used for the page anchor and the deep link. */
  id: string;
  block: PageBlock;
}

export interface Volume {
  spine: VolumeSpine;
  title: string;
  discipline: string;
  note: string;
  deck: string;
  theme: string;
  binding: string;
  format: string;
  roman: string;
  pages: VolumePage[];
}

const page = (id: string, block: PageBlock): VolumePage => ({ id, block });

/**
 * How many characters of prose fit on one leaf.
 *
 * A page of a book holds about a page of text; when it holds more, the book
 * grows a scrollbar and stops being a book. Rather than shrink the type until
 * everything fits — which costs exactly the readers who can least afford it —
 * a long passage is set across as many leaves as it needs, which is what a
 * printed page does.
 *
 * The number is empirical: it is the largest value at which no prose leaf
 * overflowed at 1440x900, 1280x720, 768x1024 or 390x844, in all three
 * languages, measured in Chrome. It is deliberately conservative — a leaf that
 * ends early is a well-set page; a leaf that overflows is a defect.
 */
const LEAF_CHARACTERS = 420;

/** How many characters of a bulleted or paired list fit on one leaf. */
const LIST_LEAF_CHARACTERS = 440;

/**
 * Sets one list across as many leaves as it needs, breaking between items.
 *
 * Same reasoning as the prose paginator: the alternative is a leaf that scrolls
 * or type shrunk until it fits, and a book does neither. The lede rides on the
 * first leaf only — repeated under every continuation it would read as
 * boilerplate rather than as an introduction.
 */
function listPages(id: string, heading: string, items: string[], lede?: string): VolumePage[] {
  const leaves: string[][] = [[]];
  let length = lede?.length ?? 0;

  for (const item of items) {
    const head = leaves[leaves.length - 1];
    if (head.length > 0 && length + item.length > LIST_LEAF_CHARACTERS) {
      leaves.push([item]);
      length = item.length;
      continue;
    }
    head.push(item);
    length += item.length;
  }

  return leaves.map((group, index) =>
    page(leaves.length > 1 ? `${id}-${index + 1}` : id, {
      kind: 'list',
      heading,
      lede: index === 0 ? lede : undefined,
      items: group,
    }),
  );
}

/** The same, for term/detail pairs. */
function pairsPages(
  id: string,
  heading: string,
  items: { term: string; detail: string }[],
  lede?: string,
): VolumePage[] {
  const leaves: { term: string; detail: string }[][] = [[]];
  let length = lede?.length ?? 0;

  for (const item of items) {
    const head = leaves[leaves.length - 1];
    const size = item.term.length + item.detail.length;
    if (head.length > 0 && length + size > LIST_LEAF_CHARACTERS) {
      leaves.push([item]);
      length = size;
      continue;
    }
    head.push(item);
    length += size;
  }

  return leaves.map((group, index) =>
    page(leaves.length > 1 ? `${id}-${index + 1}` : id, {
      kind: 'pairs',
      heading,
      lede: index === 0 ? lede : undefined,
      items: group,
    }),
  );
}

/**
 * Sets one passage across as many leaves as it needs, breaking between
 * sentences so no leaf ends mid-clause.
 *
 * The heading repeats on every leaf of the passage, the way a running head
 * repeats: a reader who turns into the middle of a long section should not have
 * to turn back to find out what they are reading.
 */
function prosePages(id: string, heading: string, body: string): VolumePage[] {
  if (body.length <= LEAF_CHARACTERS) return [page(id, { kind: 'prose', heading, body })];

  // Keep the delimiter with the sentence it ends.
  const sentences = body.match(/[^.!?…]+(?:[.!?…]+["'’”]?\s*|$)/g) ?? [body];

  const leaves: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    if (current && current.length + sentence.length > LEAF_CHARACTERS) {
      leaves.push(current.trim());
      current = '';
    }
    current += sentence;
  }
  if (current.trim()) leaves.push(current.trim());

  // A single sentence longer than a leaf cannot be broken without mangling it;
  // it stays whole and the leaf scrolls, which is the accessible outcome.
  return leaves.map((text, index) =>
    page(leaves.length > 1 ? `${id}-${index + 1}` : id, { kind: 'prose', heading, body: text }),
  );
}

/** Pages for one of the four service volumes. */
function servicePages(locale: Locale, spine: VolumeSpine, book: ReturnType<typeof getShelfBooks>[number]): VolumePage[] {
  const ui = getUI(locale);
  const service = getService(spine.id as never);
  const copy = getAllServiceCopy(locale)[spine.id as never] as ReturnType<typeof getAllServiceCopy>['forecasting'];

  const pages: VolumePage[] = [
    page('title', {
      kind: 'title',
      roman: book.roman,
      discipline: book.discipline,
      title: book.title,
      note: book.note,
    }),
    ...prosePages('problem', ui.work.sections.problem, copy.problem),
    ...prosePages('audience', ui.work.sections.audience, copy.audience),
  ];

  // The regulated volume states its boundary before anything that reads as an
  // offer, exactly as the old service page did.
  if (service?.regulated && copy.regulatedNotice) {
    pages.push(...prosePages('boundary', ui.work.sections.limitations, copy.regulatedNotice));
  }
  if (copy.responsibilities) {
    pages.push(
      ...pairsPages(
        'responsibilities',
        ui.work.sections.role,
        copy.responsibilities.map((entry) => ({ term: entry.actor, detail: entry.does })),
      ),
    );
  }

  pages.push(
    ...listPages('deliverable', copy.deliverable.title, copy.deliverable.items, copy.deliverable.body),
    ...prosePages('evidence', ui.work.sections.evidence, copy.evidence),
  );

  copy.process.forEach((stage, index) => {
    pages.push(
      page(`process-${index + 1}`, {
        kind: 'pairs',
        heading: `${ui.home.processLabel} · ${String(index + 1).padStart(2, '0')}`,
        lede: stage.body,
        items: [{ term: stage.stage, detail: stage.output }],
      }),
    );
  });

  pages.push(
    ...listPages('inputs', ui.work.sections.data, copy.inputs),
    /*
     * What is in scope and what is not are two lists, not one. They were a
     * single leaf, which was both the longest page in every service volume —
     * the one page that still needed a scrollbar of its own — and a worse
     * reading of the material: "we will do these things" and "we will not do
     * these things" are a claim and its boundary, and the boundary deserves
     * its own page rather than a run-on after the promises.
     */
    ...listPages('scope-in', ui.work.sections.deliverables, copy.boundaries.inScope),
    ...listPages('scope-out', ui.work.sections.limitations, copy.boundaries.outOfScope),
    page('offer', { kind: 'offer', heading: ui.work.nextStepTitle, name: copy.offer.name, output: copy.offer.output }),
  );

  copy.faqs.forEach((faq, index) => {
    pages.push(...prosePages(`faq-${index + 1}`, faq.q, faq.a));
  });

  if (copy.stack.length > 0) {
    pages.push(...listPages('stack', ui.work.sections.approach, copy.stack));
  }

  pages.push(
    page('colophon', {
      kind: 'colophon',
      heading: copy.ctaTitle,
      body: copy.ctaBody,
      cta: copy.ctaButton,
      href: `/${locale}/contact?topic=${spine.id}`,
    }),
  );

  return pages;
}

/** Pages for one of the three evidence volumes. */
function evidencePages(
  locale: Locale,
  spine: VolumeSpine,
  book: ReturnType<typeof getShelfBooks>[number],
  study: CaseStudySpine,
): VolumePage[] {
  const ui = getUI(locale);
  const copy = getCaseStudyCopy(locale, spine.id)!;
  const services = getAllServiceCopy(locale);

  const pages: VolumePage[] = [
    page('title', {
      kind: 'title',
      roman: book.roman,
      discipline: book.discipline,
      title: book.title,
      note: book.note,
    }),
    ...prosePages('maturity', ui.maturity[study.maturity].label, ui.maturity[study.maturity].description),
    ...prosePages('problem', ui.work.sections.problem, copy.problem),
    ...prosePages('audience', ui.work.sections.audience, copy.audience),
    ...prosePages('context', ui.work.sections.context, copy.context),
    ...prosePages('role', ui.work.sections.role, copy.role),
    ...prosePages('data', ui.work.sections.data, copy.dataProvenance),
    ...prosePages('constraints', ui.work.sections.constraints, copy.constraints),
    ...listPages('approach', ui.work.sections.approach, copy.approach),
    ...pairsPages(
      'decisions',
      ui.work.sections.decisions,
      copy.decisions.map((entry) => ({ term: entry.decision, detail: entry.because })),
    ),
    page('figure', {
      kind: 'figure',
      heading: ui.work.figureLabel,
      slug: study.slug,
      caption: copy.visualCaption,
      alt: copy.visualAlt,
      synthetic: study.maturity === 'synthetic-demo',
    }),
  ];

  if (copy.baseline) {
    pages.push(...prosePages('baseline', ui.work.sections.baseline, copy.baseline));
  }

  pages.push(...prosePages('evaluation', ui.work.sections.evaluation, copy.evaluation));

  pages.push(
    copy.results.length > 0
      ? page('results', { kind: 'list', heading: ui.work.sections.results, items: copy.results })
      : page('results', { kind: 'prose', heading: ui.work.sections.results, body: ui.work.noResults }),
  );

  pages.push(
    page('deliverables', { kind: 'list', heading: ui.work.sections.deliverables, items: copy.deliverables }),
    ...prosePages('consequences', ui.work.sections.consequences, copy.consequences),
    page('limitations', { kind: 'list', heading: ui.work.sections.limitations, items: copy.limitations }),
    ...prosePages('human-review', ui.work.sections.humanReview, copy.humanReview),
  );

  /*
   * The optimizer used to sit on a service page that no longer exists. It is
   * the artefact this volume is about, so it is bound into the volume: the
   * reader loads it on demand when the page is reached.
   */
  if (spine.id === 'portfolio-optimizer') {
    pages.push(
      page('demo', {
        kind: 'demo',
        heading: ui.labels.interactiveCalculation,
        lede: ui.labels.interactiveHint,
      }),
    );
  }

  /*
   * One figure per leaf.
   *
   * These four used to share a page, which made that page four times taller
   * than the book it sits in and gave it a scrollbar of its own — a second
   * thing to scroll inside a reader whose whole premise is that only the book
   * moves. A figure with its source, method, baseline, date and limits is
   * exactly one page of reading, so it gets one page.
   */
  study.evidence.forEach((key, index) => {
    const item = getEvidence(key);
    pages.push(
      page(`evidence-${index + 1}`, {
        kind: 'evidence',
        heading:
          study.evidence.length > 1
            ? `${ui.work.sections.evidence} · ${String(index + 1).padStart(2, '0')}`
            : ui.work.sections.evidence,
        // The standing note belongs on the first leaf only; repeating it four
        // times would read as boilerplate rather than as a caveat.
        lede: index === 0 ? ui.work.evidenceIntro : '',
        entries: [
          {
            metric: item.metric,
            value: item.value,
            source: item.source,
            sourceUrl: item.sourceUrl,
            method: `${item.context} ${item.method}`,
            baseline: item.baseline,
            asOf: item.asOf,
            limitations: item.limitations,
          },
        ],
      }),
    );
  });

  if (study.links.length > 0) {
    pages.push(
      page('sources', {
        kind: 'links',
        heading: ui.work.sections.links,
        items: study.links.map((link) => ({
          label: link.kind === 'repository' ? ui.work.repository : ui.work.report,
          href: link.external ? link.href : `/${locale}${link.href}`,
          external: link.external,
        })),
      }),
    );
  }

  pages.push(
    page('colophon', {
      kind: 'colophon',
      heading: ui.work.nextStepTitle,
      body: `${ui.work.nextStepLede} ${ui.work.relatedService}: ${services[study.service].name}.`,
      cta: ui.nav.primaryCta,
      href: `/${locale}/contact?topic=${study.service}`,
    }),
  );

  return pages;
}

/**
 * The front matter: the argument the whole shelf rests on.
 *
 * Every volume answers one expensive problem. This answers the question before
 * that one — why any of it costs anything — and it is deliberately not a book
 * on the shelf, because front matter is not a volume. It is what you read
 * first: the thesis, what the four costs look like in a real month, how an
 * engagement runs, and the figures that can be checked.
 *
 * It used to be prose below the canvas on the home page, in the old site's
 * material. That put the most important argument on the site in the one place
 * that did not look like the site, and it gave the home page a second scroll
 * region under a scene that already owns the wheel. It is pages now, turned the
 * same way every other page here is turned.
 */
function frontMatterPages(locale: Locale): VolumePage[] {
  const ui = getUI(locale);
  const shelf = getShelfUI(locale);

  const pages: VolumePage[] = [
    page('title', {
      kind: 'title',
      roman: FRONT_MATTER_ROMAN,
      label: shelf.frontMatter,
      discipline: ui.home.costLabel,
      // The short line is the title and the long one is the note. The other way
      // round set a full sentence at display size, which overflowed the leaf on
      // a laptop and read as a paragraph pretending to be a title.
      title: shelf.staticTitle,
      note: ui.home.costTitle,
    }),
    ...prosePages('thesis', ui.home.costLabel, ui.home.costLede),
  ];

  // One cost per leaf. Four short pages read as four separate problems; one
  // long page reads as a list, which is how the old section read.
  ui.home.costPoints.forEach((point, index) => {
    pages.push(...prosePages(`cost-${index + 1}`, point.cost, point.body));
  });

  pages.push(...prosePages('process-intro', ui.home.processTitle, ui.home.processLede));

  ui.home.process.forEach((stage, index) => {
    pages.push(
      page(`process-${index + 1}`, {
        kind: 'pairs',
        heading: `${ui.home.processLabel} · ${String(index + 1).padStart(2, '0')}`,
        lede: stage.body,
        items: [{ term: stage.stage, detail: stage.output }],
      }),
    );
  });

  // The evidence record, unchanged: the same four figures the volumes quote,
  // each with what it does not tell you.
  // One figure per leaf, for the same reason the volumes do it: a figure with
  // its source, method, baseline, date and limits is a page of reading.
  FRONT_MATTER_EVIDENCE.forEach((key, index) => {
    const item = getEvidence(key);
    pages.push(
      page(`evidence-${index + 1}`, {
        kind: 'evidence',
        heading: index === 0 ? ui.home.evidenceTitle : ui.home.evidenceLabel,
        lede: index === 0 ? ui.home.evidenceLede : '',
        entries: [
          {
            metric: item.metric,
            value: item.value,
            source: item.source,
            sourceUrl: item.sourceUrl,
            method: `${item.context} ${item.method}`,
            baseline: item.baseline,
            asOf: item.asOf,
            limitations: item.limitations,
          },
        ],
      }),
    );
  });

  pages.push(
    page('colophon', {
      kind: 'colophon',
      heading: ui.home.contactTitle,
      body: ui.home.contactLede,
      cta: ui.nav.primaryCta,
      href: `/${locale}/contact`,
    }),
  );

  return pages;
}

/** Front matter carries no numeral, so the running head prints its name instead. */
const FRONT_MATTER_ROMAN = '';

/** The figures quoted in the front matter, in the order they are read. */
const FRONT_MATTER_EVIDENCE: EvidenceKey[] = ['gw-sample-size', 'gw-alpha', 'gw-pearson-v1', 'gw-recall-v3'];

/**
 * The front matter's binding.
 *
 * It borrows the first volume's spine so the reader's palette and motif match
 * the shelf, and overrides only what makes it front matter rather than a
 * volume: its own route, and an id that no cover in the atlas claims.
 */
export function getFrontMatter(locale: Locale): Volume {
  const ui = getUI(locale);
  const borrowed = VOLUMES[0];

  return {
    spine: { ...borrowed, id: 'front-matter', href: '/front-matter' },
    title: getShelfUI(locale).staticTitle,
    discipline: ui.home.costLabel,
    note: ui.home.heroLede,
    deck: ui.home.costLede,
    theme: ui.home.costLabel,
    binding: ui.home.costLabel,
    format: ui.home.processLabel,
    roman: getShelfUI(locale).frontMatter,
    pages: frontMatterPages(locale),
  };
}

export function getVolume(locale: Locale, slug: string): Volume | undefined {
  const spine = VOLUMES.find((volume) => volume.id === slug);
  if (!spine) return undefined;

  const book = getShelfBooks(locale).find((entry) => entry.id === slug)!;
  const study = getCaseStudy(slug);

  const pages =
    spine.kind === 'evidence' && study
      ? evidencePages(locale, spine, book, study)
      : servicePages(locale, spine, book);

  return {
    spine,
    title: book.title,
    discipline: book.discipline,
    note: book.note,
    deck: book.deck,
    theme: book.theme,
    binding: book.binding,
    format: book.format,
    roman: book.roman,
    pages,
  };
}

export const volumeSlugs = VOLUMES.map((volume) => volume.id);
