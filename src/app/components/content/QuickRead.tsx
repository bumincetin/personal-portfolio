import Link from "next/link";
import type { Locale } from "@/lib/translations";
import type { Volume } from "@/lib/content/volume-pages";
import { getAllServiceCopy } from "@/lib/content/services";
import { getCaseStudyCopy, type ServiceKey } from "@/lib/content/case-studies";
import { getPortfolioUI, workType } from "@/lib/content/portfolio-ui";
import { getLibraryUI } from "@/lib/content/library-ui";

export default function QuickRead({
  volume,
  locale,
}: {
  volume: Volume;
  locale: Locale;
}) {
  const p = getPortfolioUI(locale),
    type = workType(volume.spine.id);
  const service =
    type === "service"
      ? getAllServiceCopy(locale)[volume.spine.id as ServiceKey]
      : undefined;
  const study =
    type !== "service" ? getCaseStudyCopy(locale, volume.spine.id) : undefined;
  const values = [
    [p.problem, volume.note],
    [p.audience, service?.audience ?? study?.audience],
    [p.output, volume.format],
    [
      p.status,
      type === "service"
        ? p.noEvidenceNote
        : type === "demo"
          ? p.demoNote
          : volume.spine.id === "greenwashing-risk-scoring"
            ? p.measuredNote
            : p.researchNote,
    ],
    [
      p.limitation,
      service?.regulatedNotice ??
        service?.boundaries.outOfScope[0] ??
        study?.limitations[0],
    ],
  ];
  return (
    <section className="quick-read" aria-labelledby="quick-title">
      <div>
        <p className="eyebrow">{p.quick}</p>
        <h2 id="quick-title">{volume.discipline}</h2>
        <span className="work-type" data-type={type}>
          {p[type]}
        </span>
      </div>
      <dl>
        {values.map(
          ([label, value]) =>
            value && (
              <div
                key={label}
                data-evidence-state={
                  label === p.status
                    ? type === "service"
                      ? "unpublished"
                      : type
                    : undefined
                }
              >
                <dt>{label}</dt>
                <dd>
                  {label === p.status && (
                    <strong className="evidence-status-label">
                      {type === "service"
                        ? p.noEvidence
                        : type === "demo"
                          ? p.demoEvidence
                          : p.researchEvidence}
                    </strong>
                  )}
                  {value}
                </dd>
              </div>
            ),
        )}
      </dl>
      <Link
        className="button-primary"
        href={`/${locale}/contact?topic=${volume.spine.kind === "service" ? volume.spine.id : volume.spine.id === "greenwashing-risk-scoring" ? "document-intelligence" : "forecasting"}`}
      >
        {service?.ctaButton ?? getLibraryUI(locale).contact}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
