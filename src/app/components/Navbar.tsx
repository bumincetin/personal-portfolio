'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { type Locale, type TranslationType, locales, translations } from '@/lib/translations';
import { BookingModal } from './BookingModal';

interface NavbarProps {
  locale?: Locale;
  t?: TranslationType;
}

const languageNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
  it: 'IT',
};

const Navbar: React.FC<NavbarProps> = ({ locale = 'en', t }) => {
  const pathname = usePathname();
  const trans = t || translations[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // Passive + rAF-coalesced: the handler only ever flips one boolean, so it
    // must not force a synchronous re-render on every scroll tick.
    let queued = false;

    const handleScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        queued = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'personal-portfolio') segments.shift();
    if (locales.includes(segments[0] as Locale)) segments.shift();
    return '/' + segments.join('/');
  };

  const currentPath = getPathWithoutLocale();

  const links = [
    { name: trans.nav.home, href: `/${locale}` },
    { name: trans.nav.methodology, href: `/${locale}/methodology` },
    { name: trans.nav.projects, href: `/${locale}/assets` },
    { name: trans.nav.portal || 'Portal', href: `/${locale}/portal` },
    { name: trans.nav.whySME, href: `/${locale}/why-sme` },
    { name: trans.nav.about, href: `/${locale}/about` },
  ];

  const isActive = (href: string) => {
    const hrefPath = href.replace(`/${locale}`, '') || '/';
    return currentPath === hrefPath || (hrefPath === '/' && currentPath === '');
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-cream/70 shadow-editorial backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="group flex flex-shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface/60 shadow-editorial backdrop-blur-sm">
              <Image
                src="/logo.webp"
                alt=""
                width={22}
                height={22}
                priority
                className="h-[22px] w-[22px] object-contain opacity-90 invert"
              />
            </span>
            <span className="hidden text-[0.9375rem] font-light tracking-tight text-charcoal lg:inline">
              Bumin Kağan Çetin
            </span>
            <span className="text-[0.9375rem] font-light tracking-[0.12em] text-charcoal lg:hidden">BKÇ</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden flex-shrink-0 items-center gap-5 lg:gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`relative whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors duration-300 lg:text-[0.6875rem] ${
                  isActive(link.href)
                    ? 'text-charcoal after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-accent'
                    : 'text-muted hover:text-charcoal'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Gradient shell CTA */}
            <span className="shell">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="block whitespace-nowrap rounded-full bg-surface/80 px-5 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-accent backdrop-blur-sm transition-colors duration-300 hover:bg-accent hover:text-cream lg:text-[0.6875rem]"
              >
                {trans.nav.contact}
              </button>
            </span>

            <div className="flex items-center gap-1 border-l border-border pl-4">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentPath}`}
                  className={`px-1.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] transition-colors ${
                    locale === loc ? 'text-accent' : 'text-muted-light hover:text-charcoal'
                  }`}
                >
                  {languageNames[loc]}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <div className="flex items-center gap-1">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentPath}`}
                  className={`px-1.5 py-0.5 font-mono text-[0.625rem] transition-colors ${
                    locale === loc ? 'text-accent' : 'text-muted-light'
                  }`}
                >
                  {languageNames[loc]}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface/60 text-charcoal backdrop-blur-sm"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-cream/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex h-full flex-col px-6 py-10">
          <nav className="flex flex-col">
            {links.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`border-b border-border py-4 text-2xl font-extralight tracking-tight transition-all duration-300 ${
                  isActive(link.href) ? 'text-charcoal' : 'text-muted'
                }`}
                style={{
                  transitionDelay: isOpen ? `${idx * 45}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {link.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsBookingModalOpen(true);
              }}
              className="py-5 text-left text-2xl font-extralight tracking-tight text-accent"
              style={{
                transitionDelay: isOpen ? `${links.length * 45}ms` : '0ms',
                transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {trans.nav.contact}
            </button>
          </nav>

          <div className="mt-auto flex gap-6 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-light">
            <a
              href="https://linkedin.com/in/buminkcetin"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-charcoal"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/bumincetin"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-charcoal"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        locale={locale}
        t={trans}
      />
    </>
  );
};

export default Navbar;
