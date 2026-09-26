import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/translations";
import { getUI } from "@/lib/content/ui";
import { getLibraryUI } from "@/lib/content/library-ui";
import { getCaseStudy } from "@/lib/content/case-studies";
import type { Volume, VolumePage } from "@/lib/content/volume-pages";
import CaseStudyFigure from "@/app/components/content/CaseStudyFigure";
import { ProvenanceBadge } from "@/app/components/content/Badges";
import { getEditorialUI } from "@/lib/content/editorial-ui";
import OptimizerLeaf from "./OptimizerLeaf";
import EvidenceRecord from "./EvidenceRecord";
import QuickRead from "./QuickRead";
import { getPortfolioUI, workType } from "@/lib/content/portfolio-ui";
import { VOLUMES } from "@/lib/content/volumes";
import WorkArt from "../experience/WorkArt";
import Footer from "@/app/sections/Footer";
import PrintCV from "@/app/[locale]/chapters/PrintCV";

/** The running title of a leaf: what the caption and the index call it. */
function leafTitle(page: VolumePage, volume: Volume): string {
  const block = page.block;
  switch (block.kind) {
    case "title":
      return volume.title;
    case "colophon":
    case "prose":
    case "list":
    case "pairs":
    case "figure":
    case "evidence":
    case "links":
    case "offer":
    case "demo":
      return block.heading;
    default:
      return volume.title;
  }
}

function PageBody({ page, locale }: { page: VolumePage; locale: Locale }) {
  const block = page.block;

  switch (block.kind) {
    case "title":
      return (
        <>
          <p className="reader-eyebrow">
            {block.label ?? `${getEditorialUI(locale).volume} ${block.roman}`} ·{" "}
            {block.discipline}
          </p>
          {/* Not an `h1`: see the running head. A book's half-title is
              display type, and the document's heading has to outlive the leaf
              it is printed on. */}
          <p className="reader-title">{block.title}</p>
          <p className="reader-note">{block.note}</p>
        </>
      );

    case "prose":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <p className="reader-prose">{block.body}</p>
        </>
      );

    case "list":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          {block.lede && <p className="reader-prose">{block.lede}</p>}
          <ul className="reader-list">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      );

    case "pairs":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          {block.lede && <p className="reader-prose">{block.lede}</p>}
          <dl className="reader-pairs">
            {block.items.map((item) => (
              <div key={item.term + item.detail}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </>
      );

    case "figure": {
      const study = getCaseStudy(block.slug);
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          {study && (
            <div className="reader-figure">
              <CaseStudyFigure
                study={study}
                locale={locale}
                caption={block.caption}
                alt={block.alt}
                provenance={block.synthetic ? "synthetic" : "recorded"}
              />
            </div>
          )}
        </>
      );
    }

    case "evidence":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          {block.lede && <p className="reader-prose">{block.lede}</p>}
          <div className="reader-evidence">
            {block.entries.map((entry) => (
              <EvidenceRecord
                key={entry.metric}
                entry={entry}
                locale={locale}
              />
            ))}
          </div>
        </>
      );

    case "offer":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <p className="reader-offer-name">{block.name}</p>
          <p className="reader-prose">{block.output}</p>
        </>
      );

    case "links":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <ul className="reader-links">
            {block.items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ExternalLink
                      size={13}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </>
      );

    case "demo":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <ProvenanceBadge
            kind="synthetic"
            locale={locale}
            detail={block.lede}
            className="reader-provenance"
          />
          <div className="reader-demo">
            <OptimizerLeaf locale={locale} />
          </div>
        </>
      );

    case "colophon":
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <p className="reader-prose">{block.body}</p>
          <Link className="reader-cta" href={block.href}>
            {block.cta}
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </>
      );

    default:
      return null;
  }
}

export default function VolumeReader({
  locale,
  volume,
}: {
  locale: Locale;
  volume: Volume;
}) {
  const ui = getUI(locale),
    copy = getLibraryUI(locale),
    p = getPortfolioUI(locale);
  const front = volume.spine.id === "front-matter";
  const groups: { title: string; pages: VolumePage[] }[] = [];
  volume.pages.forEach((page) => {
    const title = leafTitle(page, volume),
      last = groups[groups.length - 1];
    if (last?.title === title) last.pages.push(page);
    else groups.push({ title, pages: [page] });
  });
  return (
    <>
      <main
        className="volume-page"
        data-work-type={front ? "approach" : workType(volume.spine.id)}
      >
        <header className="volume-hero">
          <Link className="text-link" href={`/${locale}#work`}>
            <ArrowLeft size={16} />
            {p.back}
          </Link>
          <div className="volume-heading">
            <div>
              <p className="eyebrow">
                {front
                  ? getEditorialUI(locale).frontMatter
                  : `VOL. ${String(VOLUMES.findIndex((v) => v.id === volume.spine.id) + 1).padStart(2, "0")}`}{" "}
                / {front ? p.approach : p[workType(volume.spine.id)]}
              </p>
              <h1>{front ? p.approach : volume.title}</h1>
              <p>{volume.deck}</p>
            </div>
            {!front && (
              <div
                className={`volume-art gallery-item-${VOLUMES.findIndex((v) => v.id === volume.spine.id)}`}
              >
                <WorkArt
                  index={VOLUMES.findIndex((v) => v.id === volume.spine.id)}
                />
                <span>{p.illustration}</span>
              </div>
            )}
          </div>
        </header>
        {!front && <QuickRead locale={locale} volume={volume} />}
        <div className="reading-layout" id="full-record">
          <aside className="reading-index">
            <details open>
              <summary>{p.contents}</summary>
              <ol>
                {groups.map((group) => (
                  <li key={group.pages[0].id}>
                    <a href={`#leaf-${group.pages[0].id}`}>{group.title}</a>
                  </li>
                ))}
              </ol>
            </details>
            <PrintCV label={copy.print} />
          </aside>
          <div className="reading-body">
            {groups.map((group, i) => (
              <section
                className="reader-section"
                key={group.pages[0].id}
                data-section={String(i).padStart(2, "0")}
              >
                {group.pages.map((page, part) => (
                  <div
                    className="reading-block"
                    id={`leaf-${page.id}`}
                    data-kind={page.block.kind}
                    data-continuation={part > 0 || undefined}
                    key={page.id}
                  >
                    <PageBody page={page} locale={locale} />
                  </div>
                ))}
              </section>
            ))}
            <p className="reading-disclaimer">{ui.labels.disclaimer}</p>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
