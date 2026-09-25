/**
 * Measurement adapter.
 *
 * There is no analytics provider on this site and this module does not add one.
 * It defines the funnel — the small set of events worth counting — and routes
 * them to a sink that is a no-op unless one is explicitly configured. Shipping
 * the call sites now means enabling measurement later is a configuration
 * change rather than a hunt through every component.
 *
 * Why it is disabled by default rather than wired to something popular:
 * adding a third-party tracker to a consulting site is a data-protection
 * decision with consent obligations attached, and that is the site owner's call
 * to make deliberately. docs/launch-checklist.md records what enabling it
 * requires.
 *
 * THE RULE THIS FILE ENFORCES: an event may carry a topic, a slug, a service
 * key or a sample id. It may never carry a name, an email address, form text,
 * uploaded content, a figure derived from a document, or a query string. The
 * `EventProps` type is deliberately narrow so that passing anything else is a
 * type error rather than a leak.
 */

export type AnalyticsEvent =
  /** A volume was opened from the shelf or from a link. */
  | 'volume_viewed'
  /** The reader turned at least one page of a volume. */
  | 'volume_page_turned'
  /** The visitor began filling in the inquiry form. */
  | 'inquiry_started'
  /** The backend accepted the inquiry. Distinct from an email link click. */
  | 'inquiry_submitted'
  /** The visitor clicked the published email address instead of the form. */
  | 'contact_email_clicked';

/**
 * The complete set of properties any event may carry. Every value is a stable
 * identifier chosen by this codebase, never anything a visitor typed.
 */
export interface EventProps {
  /** Inquiry topic key, e.g. 'forecasting'. */
  topic?: string;
  /** Volume slug. */
  slug?: string;
  /** Whether the volume is a service or a piece of evidence. */
  kind?: string;
}

type Sink = (event: AnalyticsEvent, props: EventProps) => void;

/**
 * Guards against a duplicate event from a re-render or a double-mounted effect
 * in React strict mode. Keyed on the event plus its properties, so two
 * genuinely different case-study views still both count.
 */
const seen = new Set<string>();

/** Replaced only when a provider is configured. */
let sink: Sink | null = null;

/**
 * Installs a sink. Intentionally not called anywhere in this repository: the
 * activation step is described in docs/launch-checklist.md and is a deliberate
 * act, not a default.
 */
export function setAnalyticsSink(next: Sink | null): void {
  sink = next;
}

export function track(event: AnalyticsEvent, props: EventProps = {}): void {
  if (typeof window === 'undefined') return;

  // Deduplicate view-type events for the life of the page.
  if (event.endsWith('_viewed')) {
    const key = `${event}:${JSON.stringify(props)}`;
    if (seen.has(key)) return;
    seen.add(key);
  }

  if (!sink) return;

  try {
    sink(event, props);
  } catch {
    // Measurement must never break a page. A failed event is simply lost.
  }
}
