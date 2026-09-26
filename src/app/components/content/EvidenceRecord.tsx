import type { Locale } from "@/lib/translations";
import type { EvidencePageEntry } from "@/lib/content/volume-pages";
import { getUI } from "@/lib/content/ui";
import { getPortfolioUI } from "@/lib/content/portfolio-ui";

export default function EvidenceRecord({
  entry,
  locale,
  type = "research",
}: {
  entry: EvidencePageEntry;
  locale: Locale;
  type?: "research" | "demo" | "client";
}) {
  const ui = getUI(locale).work,
    copy = getPortfolioUI(locale);
  return (
    <article className="evidence-record" data-evidence-type={type}>
      <header>
        <span className="work-type">{copy[`${type}Evidence`]}</span>
        <span className="evidence-date">{entry.asOf}</span>
      </header>
      <h3>{entry.metric}</h3>
      <p className="evidence-value">{entry.value}</p>
      <dl>
        <div>
          <dt>{ui.evidenceSource}</dt>
          <dd>
            {entry.sourceUrl ? (
              <a
                href={entry.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {entry.source} ↗
              </a>
            ) : (
              entry.source
            )}
          </dd>
        </div>
        <div>
          <dt>{ui.evidenceMethod}</dt>
          <dd>{entry.method}</dd>
        </div>
        {entry.baseline && (
          <div>
            <dt>{ui.evidenceBaseline}</dt>
            <dd>{entry.baseline}</dd>
          </div>
        )}
        <div>
          <dt>{ui.evidenceAsOf}</dt>
          <dd>{entry.asOf}</dd>
        </div>
        <div className="evidence-limit">
          <dt>{ui.evidenceLimits}</dt>
          <dd>{entry.limitations}</dd>
        </div>
      </dl>
    </article>
  );
}
