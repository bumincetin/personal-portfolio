import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { getCaseStudy } from '@/lib/content/case-studies';
import type { Volume, VolumePage } from '@/lib/content/volume-pages';
import CaseStudyFigure from '@/app/components/content/CaseStudyFigure';
import { ProvenanceBadge } from '@/app/components/content/Badges';
import { getShelfUI } from '@/app/components/shelf/shelf-ui';
import { getSketchbookUI } from './sketchbook-ui';
import Sketchbook from './Sketchbook';
import OptimizerLeaf from './OptimizerLeaf';
import './sketchbook.css';
import './sketchbook-overrides.css';

/**
 * A volume, read as a book.
 *
 * This is a **server** component, which is the whole point of its shape. The
 * leaves below — several thousand words of argument, evidence and limitation —
 * are rendered to HTML on the server and handed to `<Sketchbook />` as
 * children. The client gets the machinery that turns them into a book and not
 * one word of the prose as JavaScript.
 *
 * That also settles the question a design like this always raises. The pages of
 * the ThreeUI sketchbook are pictures; these are text, and they stay text: every
 * leaf is real DOM, selectable, findable with Ctrl+F, translatable, and legible
 * to a screen reader whether or not the book ever renders. With scripting off,
 * `#sbSource` is simply the document, in order, and the book is not drawn at
 * all.
 */

/**
 * Leaves that take a spread to themselves.
 *
 * The optimizer is an instrument — inputs, a solver and three charts — and a
 * figure is a plate. Setting either beside half a page of prose cramps both, so
 * they get the whole sheet, the way a bound book gives a full-page plate its own
 * spread. The engine reads this off `data-solo`.
 */
const SOLO_KINDS = new Set(['demo', 'figure']);

/** The running title of a leaf: what the caption and the index call it. */
function leafTitle(page: VolumePage, volume: Volume): string {
  const block = page.block;
  switch (block.kind) {
    case 'title':
      return volume.title;
    case 'colophon':
    case 'prose':
    case 'list':
    case 'pairs':
    case 'figure':
    case 'evidence':
    case 'links':
    case 'offer':
    case 'demo':
      return block.heading;
    default:
      return volume.title;
  }
}

function PageBody({ page, locale }: { page: VolumePage; locale: Locale }) {
  const ui = getUI(locale);
  const block = page.block;

  switch (block.kind) {
    case 'title':
      return (
        <>
          <p className="reader-eyebrow">
            {block.label ?? `${getShelfUI(locale).volume} ${block.roman}`} · {block.discipline}
          </p>
          {/* Not an `h1`: see the running head. A book's half-title is
              display type, and the document's heading has to outlive the leaf
              it is printed on. */}
          <p className="reader-title">{block.title}</p>
          <p className="reader-note">{block.note}</p>
        </>
      );

    case 'prose':
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <p className="reader-prose">{block.body}</p>
        </>
      );

    case 'list':
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

    case 'pairs':
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

    case 'figure': {
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
                provenance={block.synthetic ? 'synthetic' : 'recorded'}
              />
            </div>
          )}
        </>
      );
    }

    case 'evidence':
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          {block.lede ? <p className="reader-prose">{block.lede}</p> : null}
          <div className="reader-evidence">
            {block.entries.map((entry) => (
              <article key={entry.metric}>
                <p className="reader-metric">
                  <span>{entry.metric}</span>
                  <strong>{entry.value}</strong>
                </p>
                <dl>
                  <div>
                    <dt>{ui.work.evidenceSource}</dt>
                    <dd>
                      {entry.sourceUrl ? (
                        <a href={entry.sourceUrl} target="_blank" rel="noreferrer">
                          {entry.source}
                          <ExternalLink size={11} strokeWidth={2} aria-hidden="true" />
                        </a>
                      ) : (
                        entry.source
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>{ui.work.evidenceMethod}</dt>
                    <dd>{entry.method}</dd>
                  </div>
                  {entry.baseline && (
                    <div>
                      <dt>{ui.work.evidenceBaseline}</dt>
                      <dd>{entry.baseline}</dd>
                    </div>
                  )}
                  <div>
                    <dt>{ui.work.evidenceAsOf}</dt>
                    <dd>{entry.asOf}</dd>
                  </div>
                  <div>
                    <dt>{ui.work.evidenceLimits}</dt>
                    <dd>{entry.limitations}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </>
      );

    case 'offer':
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <p className="reader-offer-name">{block.name}</p>
          <p className="reader-prose">{block.output}</p>
        </>
      );

    case 'links':
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <ul className="reader-links">
            {block.items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </>
      );

    case 'demo':
      return (
        <>
          <h2 className="reader-heading">{block.heading}</h2>
          <ProvenanceBadge kind="synthetic" locale={locale} detail={block.lede} className="reader-provenance" />
          <div className="reader-demo">
            <OptimizerLeaf />
          </div>
        </>
      );

    case 'colophon':
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

export default function VolumeReader({ locale, volume }: { locale: Locale; volume: Volume }) {
  const ui = getUI(locale);
  const sketchUI = getSketchbookUI(locale);
  const total = volume.pages.length;

  return (
    <main>
      <Sketchbook
        locale={locale}
        slug={volume.spine.id}
        kind={volume.spine.kind}
        head={
          <header className="sb-head">
            <Link href={`/${locale}`} className="sb-back">
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden="true" />
              {sketchUI.back}
            </Link>
            {/*
              The running head, and the document's only `h1`.

              It has to be here rather than on the title leaf. The book replaces
              its own contents as it turns, so a heading printed on leaf one is
              gone by leaf three and the page is left with no `h1` at all — which
              is exactly what axe found. A running head repeating the title is
              also just what a bound book does.
            */}
            <h1 className="sb-running">
              {volume.title} <span aria-hidden="true">· {volume.roman}</span>
            </h1>
          </header>
        }
        foot={
          /*
            The site disclaimer. It used to sit in the footer, which this route
            does not render — and it applies to the whole work rather than to
            any one leaf, so it belongs under the book rather than on a page of
            it.
          */
          <p className="sb-smallprint">{ui.labels.disclaimer}</p>
        }
      >
        {volume.pages.map((page, index) => (
          <article
            key={page.id}
            id={`leaf-${page.id}`}
            className="sb-leaf"
            data-title={leafTitle(page, volume)}
            data-folio={index + 1}
            data-solo={SOLO_KINDS.has(page.block.kind) ? '' : undefined}
          >
            <PageBody page={page} locale={locale} />
            <p className="reader-folio" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </article>
        ))}
      </Sketchbook>
    </main>
  );
}
