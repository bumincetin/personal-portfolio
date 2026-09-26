import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/translations";
import { getLibraryUI } from "@/lib/content/library-ui";
import { getPortfolioUI, workType } from "@/lib/content/portfolio-ui";
import { getWorkVolumes } from "@/lib/content/volumes";
import { getVolume } from "@/lib/content/volume-pages";
import { getUI } from "@/lib/content/ui";
import { PROFILE } from "@/lib/profile";
import Footer from "@/app/sections/Footer";
import EvidenceRecord from "../content/EvidenceRecord";
import WorkGallery from "./WorkGallery";
import WorkArt from "./WorkArt";
import WorldExperience from "./world/WorldExperience";

export default function ExperienceHome({ locale }: { locale: Locale }) {
  const copy = getLibraryUI(locale),
    p = getPortfolioUI(locale),
    ui = getUI(locale),
    volumes = getWorkVolumes(locale);
  const evidence = getVolume(
    locale,
    "greenwashing-risk-scoring",
  )!.pages.flatMap((page) =>
    page.block.kind === "evidence" ? page.block.entries : [],
  );
  return (
    <>
      <main className="portfolio-home">
        <section
          className="portfolio-hero portfolio-hero-world"
          aria-labelledby="home-title"
        >
          <div className="world-introduction">
            <div className="hero-heading">
              <h1 id="home-title">
                {p.headline}
                <br />
                <em>{p.headlineAccent}</em>
              </h1>
            </div>
            <div className="hero-bottom">
              <p>{copy.intro}</p>
              <div className="hero-actions">
                <a className="button-primary" href="#work">
                  {copy.browse}
                  <span aria-hidden="true">↓</span>
                </a>
                <Link className="text-link" href={`/${locale}/contact`}>
                  {copy.contact}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
          <WorldExperience locale={locale} subjects={volumes} />
        </section>
        <section
          id="work"
          className="work-section"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <p className="eyebrow">01 / {p.work}</p>
            <h2 id="work-title">{p.galleryNote}</h2>
          </div>
          <WorkGallery copy={p}>
            {volumes.map((volume, index) => (
              <li
                key={volume.id}
                className={`gallery-item gallery-item-${index}`}
              >
                <Link
                  className="gallery-card"
                  draggable={false}
                  href={`/${locale}${volume.href}`}
                  prefetch={false}
                  data-work-type={workType(volume.id)}
                >
                  <div className="gallery-visual">
                    <span className="gallery-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <WorkArt index={index} />
                    <span className="gallery-caption">{p.illustration}</span>
                    <span className="gallery-open" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="gallery-meta">
                    <p>
                      <span>VOL. {String(index + 1).padStart(2, "0")}</span>
                      <span>{p[workType(volume.id)]}</span>
                    </p>
                    <h3>{volume.title}</h3>
                    <span>{volume.discipline}</span>
                  </div>
                </Link>
              </li>
            ))}
          </WorkGallery>
        </section>
        <section
          className="problem-section section-shell"
          aria-labelledby="problems-title"
        >
          <div className="section-heading">
            <p className="eyebrow">02 / {p.work}</p>
            <h2 id="problems-title">{p.problems}</h2>
            <p>{copy.collectionNote}</p>
          </div>
          <div className="problem-list">
            {volumes.map((v, i) => (
              <Link
                key={v.id}
                className="problem-row"
                href={`/${locale}${v.href}`}
              >
                <span className="problem-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="work-type" data-type={workType(v.id)}>
                    {p[workType(v.id)]}
                  </span>
                  <h3>{v.discipline}</h3>
                  <p>{v.note}</p>
                </div>
                <span className="problem-output">{v.format}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
        <section
          className="selected-evidence section-shell"
          aria-labelledby="evidence-title"
        >
          <div className="section-heading">
            <p className="eyebrow">03 / {ui.work.sections.evidence}</p>
            <h2 id="evidence-title">{p.evidence}</h2>
            <p>{p.evidenceIntro}</p>
          </div>
          <div className="evidence-grid">
            {[evidence[0], evidence[3]].filter(Boolean).map((entry) => (
              <EvidenceRecord
                key={entry.metric}
                entry={entry}
                locale={locale}
              />
            ))}
          </div>
          <Link
            className="text-link"
            href={`/${locale}/volumes/greenwashing-risk-scoring#leaf-evidence-1`}
          >
            {p.full}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <section
          className="method-section section-shell"
          aria-labelledby="method-title"
        >
          <div className="section-heading">
            <p className="eyebrow">04 / {p.approach}</p>
            <h2 id="method-title">{p.method}</h2>
          </div>
          <ol className="method-grid">
            {ui.home.process.map((stage, i) => (
              <li key={stage.stage}>
                <span>0{i + 1}</span>
                <h3>{stage.stage}</h3>
                <p>{stage.body}</p>
                <p className="method-output">{stage.output}</p>
              </li>
            ))}
          </ol>
          <Link className="text-link" href={`/${locale}/front-matter`}>
            Front Matter / {p.approach}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
        <section
          className="about-preview section-shell"
          aria-labelledby="about-title"
        >
          <Image
            src="/profile.webp"
            alt={PROFILE.name}
            width={480}
            height={480}
            sizes="(max-width:700px) 80vw, 340px"
          />
          <div>
            <p className="eyebrow">05 / {p.about}</p>
            <h2 id="about-title">{p.trajectory}</h2>
            <p>{p.biography}</p>
            <Link className="text-link" href={`/${locale}/chapters`}>
              {copy.about}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <section className="portfolio-contact section-shell">
          <p className="eyebrow">06 / {PROFILE.name}</p>
          <h2>{copy.contact}</h2>
          <Link className="button-primary" href={`/${locale}/contact`}>
            {copy.contact}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
