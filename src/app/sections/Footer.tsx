'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Linkedin, Github, MessageCircle, MapPin } from 'lucide-react';
import { type Locale, type TranslationType, translations } from '@/lib/translations';
import { BookingModal } from '@/app/components/BookingModal';
import Reveal from '@/app/components/ui/Reveal';
import RevealText from '@/app/components/ui/RevealText';
import { MicroLabel } from '@/app/components/ui/SectionHeading';
import { ShellButton } from '@/app/components/ui/ShellButton';
import Wireframe3D from '@/app/components/three/Wireframe3D';

interface FooterProps {
  t?: TranslationType;
  locale?: Locale;
}

const SOCIALS = [
  { label: 'WhatsApp', href: 'https://wa.me/393481705207', Icon: MessageCircle },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/buminkcetin', Icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/bumincetin', Icon: Github },
  { label: 'Email', href: 'mailto:cetinbumink@gmail.com', Icon: Mail },
];

const Footer: React.FC<FooterProps> = ({ t, locale = 'en' }) => {
  const trans = t || translations[locale];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const secondaryLinks = [
    { name: trans.nav.methodology, href: `/${locale}/methodology` },
    { name: trans.nav.projects, href: `/${locale}/assets` },
    { name: trans.nav.portal || 'Portal', href: `/${locale}/portal` },
    { name: trans.nav.whySME, href: `/${locale}/why-sme` },
    { name: trans.nav.about, href: `/${locale}/about` },
  ];

  return (
    <footer id="contact" className="relative border-t border-border bg-surface-alt/80 backdrop-blur-md">
      {/* Gold hairline: marks the seam between page and footer. */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(230,200,121,0.35), transparent)' }}
        aria-hidden="true"
      />

      {/* Wireframe ornament floating over the CTA corner */}
      <div className="pointer-events-none absolute right-10 top-12 hidden h-28 w-28 opacity-40 lg:block" aria-hidden="true">
        <Wireframe3D shape="octahedron" speed={0.8} lineAlpha={0.55} />
      </div>

      {/* CTA */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal className="mb-6">
              <MicroLabel>{trans.footer.cta}</MicroLabel>
            </Reveal>

            <RevealText
              as="h2"
              text={trans.footer.ctaTitle}
              className="text-heading text-charcoal"
              stagger={40}
            />

            <Reveal delay={160} className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
              {trans.footer.ctaDesc}
            </Reveal>
          </div>

          <Reveal delay={220} className="flex flex-col items-start gap-8 lg:items-end">
            <ShellButton variant="primary" onClick={() => setIsBookingModalOpen(true)}>
              {trans.footer.button}
              <ArrowRight size={15} strokeWidth={1.5} />
            </ShellButton>

            <div className="flex flex-col gap-3 font-sans text-[0.8125rem] text-muted lg:items-end">
              <a
                href="mailto:cetinbumink@gmail.com"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-charcoal"
              >
                <Mail size={14} strokeWidth={1.5} className="text-accent-blue" />
                cetinbumink@gmail.com
              </a>
              <a
                href="https://wa.me/393481705207"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-charcoal"
              >
                <MessageCircle size={14} strokeWidth={1.5} className="text-accent-blue" />
                +39 348 170 5207
              </a>
              <span className="inline-flex items-center gap-2.5 text-muted-light">
                <MapPin size={14} strokeWidth={1.5} className="text-muted-light" />
                Milan, Italy
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sitemap rail */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 md:px-12 lg:px-16">
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-light transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 md:flex-row md:px-12 lg:px-16">
          <p className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted-light">{trans.footer.copyright}</p>

          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                title={label}
                className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-light transition-colors hover:text-charcoal"
              >
                <Icon size={14} strokeWidth={1.5} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={trans}
      />
    </footer>
  );
};

export default Footer;
