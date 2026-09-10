import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { locales, isLocale, getTranslation } from '@/lib/translations';
import { getExperienceCopy } from '@/lib/experience-copy';
import { getStory } from '@/lib/story';
import { CONTACT, PROFILE } from '@/lib/profile';
import { pageMetadata } from '@/lib/seo';
import PersonSchema from '@/app/components/content/PersonSchema';
import Footer from '@/app/sections/Footer';
import CareerTimeline from './CareerTimeline';
import PrintCV from './PrintCV';
import './chapters.css';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getExperienceCopy(locale);
  return pageMetadata({ locale, path: '/chapters', title: `${c.chapters} — CV`, description: c.intro });
}
export default async function ChaptersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getExperienceCopy(locale), story = getStory(locale), about = getTranslation(locale).aboutPage;
  return <div className="chapters-root">
    <PersonSchema path={`/${locale}/chapters`} />
    <main className="chapters-page">
      <p className="chapters-print-identity">{PROFILE.name} · {CONTACT.email.address} · {CONTACT.whatsapp.display}</p>
      <header className="chapters-hero">
        <div><p className="chapters-eyebrow">{c.cv} <span>2020 — 2025</span></p><h1>{c.title}<br /><em>{c.titleAccent}</em></h1><p className="chapters-lede">{c.intro}</p><div className="chapters-hero-links"><a href="#career-story">{c.scroll}<ArrowDown size={16} /></a><a href="#career-record">{c.record}<ArrowUpRight size={16} /></a></div></div>
        <figure className="chapters-portrait"><Image src="/portrait.jpg" alt={PROFILE.name} width={720} height={720} priority sizes="(max-width: 700px) 70vw, 330px" /><figcaption><span>{PROFILE.name}</span><span>{PROFILE.city}, {PROFILE.country}</span></figcaption><span className="portrait-edition" aria-hidden="true">BKÇ / 01</span></figure>
      </header>
      <CareerTimeline chapters={story.chapters} copy={c} />
      <section id="career-record" className="career-record" aria-labelledby="record-title">
        <header><div><p className="chapters-eyebrow">Curriculum vitae</p><h2 id="record-title">{c.record}</h2><p>{c.recordNote}</p></div><PrintCV label={c.print} /></header>
        <div className="career-record-grid"><section aria-labelledby="education-title"><h3 id="education-title">{about.education}</h3>{about.educationData.map(entry => <article key={entry.school + entry.period}><p className="record-date">{entry.period}</p><h4>{entry.degree}</h4><p className="record-institution">{entry.school} · {entry.location}</p><p className="record-detail">{about.thesis}: {entry.thesis}</p></article>)}</section>
          <section aria-labelledby="experience-title"><h3 id="experience-title">{about.experience}</h3>{about.experienceData.map(entry => <article key={entry.company + entry.period}><p className="record-date">{entry.period}</p><h4>{entry.role}</h4><p className="record-institution">{entry.company} · {entry.location}</p><ul>{entry.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></article>)}</section></div>
        <section className="career-languages" aria-labelledby="languages-title"><h3 id="languages-title">{about.languages}</h3><ul>{about.languageData.map(entry => <li key={entry.lang}><strong>{entry.lang}</strong><span>{entry.level}</span></li>)}</ul></section>
      </section>
      <section className="chapters-next"><p className="chapters-eyebrow">VI / …</p><h2>{c.nextTitle}<br /><em>{c.nextAccent}</em></h2><Link href={`/${locale}/contact`}>{c.nextLink}<ArrowUpRight size={20} /></Link></section>
    </main><Footer locale={locale} />
  </div>;
}
