import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { type Locale } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { VOLUMES, getShelfBooks } from '@/app/components/shelf/volumes';
import { CONTACT, PROFILE, mailtoHref, whatsappHref } from '@/lib/profile';

/**
 * Footer.
 *
 * A server component with no client JavaScript. It lists all seven volumes,
 * which is the site's only complete index outside the shelf itself — a crawler
 * or a reader with no WebGL still reaches every page from here.
 *
 * The terminal prompt, the booking dialog and the 3D wireframe that used to
 * live down here are gone; between them they shipped roughly 65 kB of
 * JavaScript to every route to render decoration below the fold, and the
 * contact route now does the job properly.
 */

export default function Footer({ locale }: { locale: Locale }) {
  const ui = getUI(locale);
  const books = getShelfBooks(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-12 lg:grid-cols-[1fr_2fr_1fr]">
          <div>
            <p className="text-[0.9375rem] font-medium text-charcoal">{PROFILE.name}</p>
            <p className="mt-2 flex items-center gap-2 text-[0.875rem] text-muted">
              <MapPin size={14} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              {PROFILE.city}, {PROFILE.country}
            </p>
            <p className="measure-narrow mt-4 text-[0.875rem] leading-relaxed text-muted">{ui.home.brandLine}</p>
          </div>

          <nav aria-label={ui.nav.volumes}>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{ui.nav.volumes}</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {VOLUMES.map((volume, index) => (
                <li key={volume.id}>
                  <Link
                    href={`/${locale}${volume.href}`}
                    className="flex items-baseline gap-2.5 py-1.5 text-[0.875rem] text-charcoal transition-colors hover:text-accent"
                  >
                    <span className="w-6 flex-shrink-0 font-mono text-[0.6875rem] text-muted" aria-hidden="true">
                      {books[index].roman}
                    </span>
                    {books[index].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{ui.nav.contact}</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={mailtoHref('Project inquiry')}
                  className="inline-flex min-h-[40px] items-center gap-2.5 text-[0.875rem] text-charcoal transition-colors hover:text-accent"
                >
                  <Mail size={15} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  {CONTACT.email.address}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2.5 text-[0.875rem] text-charcoal transition-colors hover:text-accent"
                >
                  <MessageCircle size={15} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  {CONTACT.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2.5 text-[0.875rem] text-charcoal transition-colors hover:text-accent"
                >
                  <Linkedin size={15} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2.5 text-[0.875rem] text-charcoal transition-colors hover:text-accent"
                >
                  <Github size={15} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-[0.8125rem] text-muted-light">
            © {year} {PROFILE.name}
          </p>
          <p className="measure text-[0.8125rem] leading-relaxed text-muted-light">{ui.labels.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
