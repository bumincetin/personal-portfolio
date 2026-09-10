import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { locales, isLocale } from '@/lib/translations';
import { getExperienceCopy } from '@/lib/experience-copy';
import { pageMetadata } from '@/lib/seo';
import { CONTACT, mailtoHref, whatsappHref } from '@/lib/profile';
import Footer from '@/app/sections/Footer';
import ContactConversation from './ContactConversation';
import './contact.css';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getExperienceCopy(locale);
  return pageMetadata({ locale, path: '/contact', title: c.contact, description: c.contactIntro });
}
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getExperienceCopy(locale);
  return <div className="conversation-root">
    <main className="conversation-page">
      <header className="conversation-intro">
        <p className="experience-eyebrow">{c.contactEyebrow}</p>
        <h1>{c.contactTitle}<br /><em>{c.contactAccent}</em></h1>
        <p className="conversation-lede">{c.contactIntro}</p>
      </header>
      <ContactConversation locale={locale} />
      <noscript><style>{`.conversation-panel { display: none; }`}</style></noscript>
      <section className="conversation-direct" aria-labelledby="direct-title">
        <h2 id="direct-title">{c.direct}</h2>
        <div><a href={mailtoHref(c.subject)}><Mail size={17} />{CONTACT.email.address}</a><a href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle size={17} />{CONTACT.whatsapp.display}</a></div>
        <Link href={`/${locale}/chapters`}>{c.careerLink}<ArrowUpRight size={16} /></Link>
      </section>
    </main>
    <Footer locale={locale} />
  </div>;
}
