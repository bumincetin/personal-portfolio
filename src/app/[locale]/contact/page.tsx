import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { locales, isLocale, getTranslation } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { getShelfUI } from '@/app/components/shelf/shelf-ui';
import { getSketchbookUI } from '@/app/components/sketchbook/sketchbook-ui';
import { getStory } from '@/lib/story';
import { pageMetadata } from '@/lib/seo';
import { CONTACT, PROFILE, mailtoHref, whatsappHref } from '@/lib/profile';
import { isContactConfigured } from '@/lib/contact/config';
import PersonSchema from '@/app/components/content/PersonSchema';
import Footer from '@/app/sections/Footer';
import ContactPageClient from './ContactPageClient';
import '@/app/components/shelf/shelf.css';
import '@/app/components/shelf/shelf-overrides.css';
import './contact.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Dynamic because whether the form works depends on whether a mail provider is
 * configured at request time, and that is not something the page may guess at
 * build time — a form rendered as working when it is not is exactly the failure
 * this redesign set out to remove.
 */
export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const ui = getUI(locale);

  return pageMetadata({
    locale,
    path: '/contact',
    title: ui.contact.label,
    description: ui.contact.lede,
  });
}

/**
 * The colophon.
 *
 * The one page that is not a volume. It carries the three things a shelf cannot:
 * the face behind the work, the record it rests on, and a way to start a
 * conversation. The About page folded into this — a portrait beside a CV beside
 * a form is one page, not three — and /about permanently redirects here.
 *
 * Styled in the shelf's own paper and ink so that leaving the volumes does not
 * feel like leaving the site.
 */
export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ topic?: string }>;
}) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();

  const { topic } = await props.searchParams;
  const ui = getUI(locale);
  const shelfUI = getShelfUI(locale);
  const t = getTranslation(locale);
  const story = getStory(locale);
  const about = t.aboutPage;

  return (
    <div className="shelf-root colophon-root">
      <PersonSchema path={`/${locale}/contact`} />

      <main className="colophon">
        {/* ---------------------------------------------------------------
            Portrait and the short version.
            --------------------------------------------------------------- */}
        <section className="colophon-hero">
          <figure className="colophon-portrait">
            <Image
              src="/portrait.jpg"
              alt={`${PROFILE.name}, ${PROFILE.city}`}
              width={720}
              height={720}
              priority
              sizes="(max-width: 900px) 90vw, 420px"
            />
            <figcaption>
              <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
              {PROFILE.name} · {PROFILE.city}, {PROFILE.country}
            </figcaption>
          </figure>

          <div className="colophon-intro">
            <p className="reader-eyebrow">{shelfUI.identity} · {ui.contact.label}</p>
            <h1 className="reader-title">{ui.contact.title}</h1>
            <p className="reader-note">{ui.contact.lede}</p>
            <p className="colophon-bio">{t.about.desc1}</p>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            The inquiry form.
            --------------------------------------------------------------- */}
        <section className="colophon-form" aria-labelledby="inquiry-heading">
          <h2 id="inquiry-heading" className="reader-heading">
            {ui.contact.label}
          </h2>
          <ContactPageClient locale={locale} configured={isContactConfigured()} initialTopic={topic} />
        </section>

        {/* ---------------------------------------------------------------
            The record. Kept dated exactly as stated; nothing says "present".
            --------------------------------------------------------------- */}
        <section className="colophon-record" aria-labelledby="record-heading">
          <h2 id="record-heading" className="reader-heading">
            {story.chaptersLabel}
          </h2>

          <ol className="colophon-chapters">
            {story.chapters.map((chapter) => (
              <li key={chapter.numeral}>
                <p className="colophon-chapter-meta">
                  <span aria-hidden="true">{chapter.numeral}</span>
                  <span>{chapter.years}</span>
                  <span>
                    {chapter.institution} · {chapter.place}
                  </span>
                </p>
                <h3>{chapter.title}</h3>
                <p className="colophon-role">{chapter.role}</p>
                <p className="colophon-body">{chapter.body}</p>
              </li>
            ))}
          </ol>

          <div className="colophon-columns">
            <div>
              <h3 className="reader-heading">{about.education}</h3>
              <ul className="colophon-entries">
                {about.educationData.map((entry) => (
                  <li key={`${entry.school}-${entry.period}`}>
                    <p className="colophon-entry-head">
                      <strong>{entry.degree}</strong>
                      <span>{entry.period}</span>
                    </p>
                    <p className="colophon-entry-sub">
                      {entry.school} · {entry.location}
                    </p>
                    <p className="colophon-entry-note">
                      {about.thesis}: {entry.thesis}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="reader-heading">{about.experience}</h3>
              <ul className="colophon-entries">
                {about.experienceData.map((entry) => (
                  <li key={`${entry.company}-${entry.period}`}>
                    <p className="colophon-entry-head">
                      <strong>
                        {entry.role} · {entry.company}
                      </strong>
                      <span>{entry.period}</span>
                    </p>
                    <p className="colophon-entry-sub">{entry.location}</p>
                    <ul className="colophon-highlights">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="colophon-languages">
            <h3 className="reader-heading">{about.languages}</h3>
            <ul>
              {about.languageData.map((entry) => (
                <li key={entry.lang}>
                  <strong>{entry.lang}</strong> <span>{entry.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            Direct channels.
            --------------------------------------------------------------- */}
        <section className="colophon-direct" aria-labelledby="direct-heading">
          <h2 id="direct-heading" className="reader-heading">
            {ui.contact.directTitle}
          </h2>
          <ul>
            <li>
              <a href={mailtoHref('Project inquiry')}>
                <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                {CONTACT.email.address}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noreferrer">
                <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                {CONTACT.whatsapp.display}
                <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={CONTACT.linkedin.url} target="_blank" rel="noreferrer">
                <Linkedin size={16} strokeWidth={1.5} aria-hidden="true" />
                linkedin.com/in/{CONTACT.linkedin.handle}
                <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={CONTACT.github.url} target="_blank" rel="noreferrer">
                <Github size={16} strokeWidth={1.5} aria-hidden="true" />
                github.com/{CONTACT.github.handle}
                <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          </ul>
          <p className="colophon-note">{ui.contact.noScheduling}</p>
          {/* "Return volume to shelf" is the shelf's own label for putting a
              book back; from the colophon the reader is simply going back. */}
          <Link className="reader-cta" href={`/${locale}`}>
            {getSketchbookUI(locale).back}
          </Link>
        </section>
      </main>

      {/* The one route that scrolls, so the one route that can carry a footer:
          the complete index of volumes, the contact channels and the site
          disclaimer, for anyone who arrived here first. */}
      <Footer locale={locale} />
    </div>
  );
}
