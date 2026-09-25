import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Locale } from '@/lib/translations';
import { getLibraryUI } from '@/lib/content/library-ui';
import { getShelfBooks } from './volumes';
import { getShelfUI } from './shelf-ui';
import ShelfLauncher from './ShelfLauncher';
import Footer from '@/app/sections/Footer';
import './catalogue.css';

/** Purposeful line motifs; no texture or graphics engine needed to read a cover. */
function CoverMotif({ index }: { index: number }) {
  const motifs = [
    <g key="documents"><path d="M27 24h48v64H27zM36 35h28M36 45h20M36 55h25M36 65h16"/><path d="M17 17v-6h22M63 99h22v-8M18 79l8 8 18-21"/></g>,
    <g key="forecast"><path d="M15 88h72M18 91V22M20 78l17-10 15 7 15-26 18-20M20 78l17-5 15 11 15-13 18 2M20 78l17-22 15 2 15-26 18-16"/><path strokeDasharray="3 5" d="M52 20v68"/></g>,
    <g key="reporting"><path d="M16 26h70M16 44h70M16 62h70M16 80h70M33 18v70M66 18v70"/><path d="m51 94 8 7 25-24"/></g>,
    <g key="coordination"><path d="M18 34h24v30H18zM62 55h24v30H62zM42 48h32v7M30 64v15h32M45 39l9 9-9 9"/><circle cx="30" cy="18" r="3"/><circle cx="74" cy="101" r="3"/></g>,
    <g key="research"><path d="M23 92V22h58v70zM33 37h38M33 49h23M33 61h33"/><circle cx="52" cy="74" r="12"/><path d="m61 84 13 14"/></g>,
    <g key="seats"><path d="M14 87a38 38 0 0 1 76 0M25 87a27 27 0 0 1 54 0M37 87a15 15 0 0 1 30 0M14 94h76"/><path strokeDasharray="3 4" d="M52 26v63"/></g>,
    <g key="optimizer"><circle cx="52" cy="58" r="31"/><path d="M52 19v78M13 58h78M30 80l12-31 29-13-13 31z"/></g>,
  ];
  return <svg viewBox="0 0 104 116" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">{motifs[index]}</svg>;
}

export default function Catalogue({ locale }: { locale: Locale }) {
  const copy = getLibraryUI(locale);
  const shelf = getShelfUI(locale);
  const books = getShelfBooks(locale);
  const category = (index: number) => index < 4 ? copy.service : index < 6 ? copy.research : copy.synthetic;
  return <>
    <main className="library-page">
      <header className="library-hero">
        <div>
          <p className="library-eyebrow">{shelf.identity} <span aria-hidden="true">/</span> Bumin Kağan Çetin</p>
          <h1>{copy.hero}</h1>
          <p className="library-intro">{copy.intro}</p>
          <div className="library-actions">
            <Link className="library-button" href={`/${locale}/contact`}>{copy.contact} <span aria-hidden="true">↗</span></Link>
            <a className="library-text-link" href="#catalogue">{copy.browse} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <aside className="library-invitation" aria-labelledby="library-invitation-title">
          <div className="library-bookends" aria-hidden="true">
            {books.slice(0, 4).map((book, index) => <div className="library-cover" key={book.id} style={{'--cover': book.color} as CSSProperties}><span>{book.roman}</span><CoverMotif index={index}/></div>)}
          </div>
          <h2 id="library-invitation-title">{copy.shelfTitle}</h2>
          <p>{copy.shelfNote}</p>
          <ShelfLauncher locale={locale} copy={copy}/>
          <noscript><style>{'[data-enter-shelf]{display:none}'}</style></noscript>
        </aside>
      </header>
      <section id="catalogue" aria-labelledby="catalogue-title" className="library-catalogue">
        <div className="library-section-head"><div><p className="library-eyebrow">{copy.collection}</p><h2 id="catalogue-title">{copy.directory}</h2></div><p>{copy.collectionNote}</p></div>
        <ol className="library-list">
          {books.map((book, index) => <li key={book.id}>
            <article className="library-entry" aria-labelledby={`catalogue-${book.id}`}>
              <div className="library-cover" style={{'--cover': book.color} as CSSProperties} aria-hidden="true"><span>{book.roman}</span><CoverMotif index={index}/><span>{shelf.identity}</span></div>
              <div className="library-entry-title"><p className="library-category">{category(index)} <span aria-hidden="true">·</span> {book.discipline}</p><h3 id={`catalogue-${book.id}`}><Link href={`/${locale}${book.href}`} prefetch={false}>{book.title}</Link></h3><p>{book.note}</p></div>
              <div className="library-entry-detail"><p className="library-eyebrow">{copy.takeaway}</p><p>{book.format}</p>{book.id === 'cross-border' && <p className="library-boundary">{copy.boundary}</p>}<Link className="library-text-link" href={`/${locale}${book.href}`} prefetch={false} aria-label={`${copy.read}: ${book.title}`}>{copy.read} <span aria-hidden="true">→</span></Link></div>
            </article>
          </li>)}
        </ol>
      </section>
      <section className="library-endnote"><p>{shelf.fallbackNote}</p><div className="library-actions"><Link className="library-button" href={`/${locale}/contact`}>{copy.contact} <span aria-hidden="true">↗</span></Link><Link className="library-text-link" href={`/${locale}/front-matter`}>{copy.approach} <span aria-hidden="true">→</span></Link></div></section>
    </main>
    <Footer locale={locale}/>
  </>;
}
