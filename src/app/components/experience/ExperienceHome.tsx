import ExperienceIcon from './ExperienceIcon';
import Link from "next/link";
import type { Locale } from "@/lib/translations";
import { getLibraryUI } from "@/lib/content/library-ui";
import { PROFILE } from "@/lib/profile";
import { getShelfBooks } from "../shelf/volumes";
import { getShelfUI } from "../shelf/shelf-ui";
import ShelfLauncher from "../shelf/ShelfLauncher";
import Footer from "@/app/sections/Footer";
import WorldExperience from "./world/WorldExperience";
import SubjectArt from "./SubjectArt";
import "../shelf/catalogue.css";
import "./experience.css";

/** Original content, rebuilt as a spatial index and readable narrative chapters. */
export default function ExperienceHome({ locale }: { locale: Locale }) {
  const copy = getLibraryUI(locale),
    shelf = getShelfUI(locale),
    books = getShelfBooks(locale);
  return (
    <>
      <main className="atlas-page">
        <WorldExperience
          locale={locale}
          subjects={books}
          copy={copy}
          identity={shelf.identity}
        />
        <section
          className="atlas-context"
          aria-labelledby="catalogue-title"
          id="catalogue"
          data-story-section="editorial"
        >
          <div className="atlas-section-label">
            <span>01 /</span>
            <p>{copy.collection}</p>
          </div>
          <div>
            <p className="atlas-intro">{copy.intro}</p>
            <div className="atlas-context-bottom">
              <h2 id="catalogue-title">{copy.directory}</h2>
              <p>{copy.collectionNote}</p>
              <Link href={`/${locale}/front-matter`} className="atlas-link">
                {copy.approach}
                <span aria-hidden="true"><ExperienceIcon name="external" /></span>
              </Link>
            </div>
          </div>
        </section>
        <section className="atlas-services" aria-label={copy.service}>
          {books.slice(0, 4).map((book, index) => (
            <article
              className="atlas-service"
              data-story-section="editorial"
              data-volume={index}
              id={`subject-${book.id}`}
              key={book.id}
              aria-labelledby={`catalogue-${book.id}`}
            >
              <div className="atlas-service-top">
                <span className="atlas-number">{book.roman}</span>
                <p className="atlas-meta">
                  {copy.service} <span aria-hidden="true">/</span>{" "}
                  {book.discipline}
                </p>
              </div>
              <div className="atlas-service-body">
                <div className="atlas-service-copy">
                  <h3 id={`catalogue-${book.id}`}>
                    <Link href={`/${locale}${book.href}`} prefetch={false}>
                      {book.title}
                      <span aria-hidden="true"><ExperienceIcon name="external" /></span>
                    </Link>
                  </h3>
                  <p>{book.note}</p>
                  <div className="atlas-deliverable">
                    <span className="atlas-meta">{copy.takeaway}</span>
                    <p>{book.format}</p>
                  </div>
                  {book.id === "cross-border" && (
                    <p className="atlas-boundary">{copy.boundary}</p>
                  )}
                  <Link
                    href={`/${locale}${book.href}`}
                    prefetch={false}
                    className="atlas-link"
                    aria-label={`${copy.read}: ${book.title}`}
                  >
                    {copy.read}
                    <span aria-hidden="true"><ExperienceIcon name="external" /></span>
                  </Link>
                </div>
                <div className="atlas-service-plate">
                  <SubjectArt index={index} />
                  <span className="atlas-plate-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="atlas-research" aria-label={copy.research}>
          <div className="atlas-section-label">
            <span>02 /</span>
            <p>{copy.research}</p>
            <span className="atlas-label-right">V — VII</span>
          </div>
          {books.slice(4).map((book, i) => (
            <article
              className={`atlas-case atlas-case-${i}`}
              data-story-section="editorial"
              data-volume={i + 4}
              id={`subject-${book.id}`}
              key={book.id}
              aria-labelledby={`catalogue-${book.id}`}
            >
              <Link
                className="atlas-case-art"
                href={`/${locale}${book.href}`}
                prefetch={false}
                aria-label={`${copy.read}: ${book.title}`}
              >
                <SubjectArt index={i + 4} />
                <span className="atlas-case-roman" aria-hidden="true">
                  {book.roman}
                </span>
                <span className="atlas-case-open" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <div className="atlas-case-heading">
                <p className="atlas-meta">
                  {i === 2 ? copy.synthetic : copy.research} / {book.discipline}
                </p>
                <h3 id={`catalogue-${book.id}`}>
                  <Link href={`/${locale}${book.href}`} prefetch={false}>
                    {book.title}
                  </Link>
                </h3>
              </div>
              <div className="atlas-case-description">
                <p>{book.note}</p>
                <div className="atlas-deliverable">
                  <span className="atlas-meta">{copy.takeaway}</span>
                  <p>{book.format}</p>
                </div>
                <Link
                  className="atlas-link"
                  href={`/${locale}${book.href}`}
                  prefetch={false}
                >
                  {copy.read}
                  <span aria-hidden="true"><ExperienceIcon name="external" /></span>
                </Link>
              </div>
            </article>
          ))}
        </section>
        <section
          className="atlas-explore"
          data-story-section="explore"
          aria-labelledby="library-invitation-title"
        >
          <div className="atlas-section-label">
            <span>03 /</span>
            <p>{copy.collection}</p>
          </div>
          <div className="atlas-bindings" aria-hidden="true">
            {books.map((book, i) => (
              <div
                key={book.id}
                style={{
                  background: book.color,
                  transform: `rotate(${(i - 3) * 5}deg) translateY(${Math.abs(i - 3) * 12}px)`,
                }}
              >
                <span>{book.roman}</span>
                <span>{book.title}</span>
              </div>
            ))}
          </div>
          <div className="atlas-explore-bottom">
            <h2 id="library-invitation-title">{copy.shelfTitle}</h2>
            <div>
              <p>{copy.shelfNote}</p>
              <ShelfLauncher locale={locale} copy={copy} />
              <noscript>
                <style>{"[data-enter-shelf]{display:none}"}</style>
              </noscript>
            </div>
          </div>
        </section>
        <section className="atlas-conversation" data-story-section="contact" id="conversation">
          <div className="atlas-section-label">
            <span>04 /</span>
            <p>{PROFILE.name}</p>
          </div>
          <Link className="atlas-contact-title" href={`/${locale}/contact`}>
            {copy.contact}
            <span aria-hidden="true"><ExperienceIcon name="external" /></span>
          </Link>
          <div className="atlas-endnote">
            <p>{shelf.fallbackNote}</p>
            <Link className="atlas-link" href={`/${locale}/front-matter`}>
              {copy.approach}
              <span aria-hidden="true"><ExperienceIcon name="external" /></span>
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
