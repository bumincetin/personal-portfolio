'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { type Locale, locales } from '@/lib/translations';
import { getUI } from '@/lib/content/ui';
import { PROFILE } from '@/lib/profile';
import { VOLUMES, getShelfBooks } from '@/app/components/shelf/volumes';

/**
 * Primary navigation.
 *
 * The site is a shelf and a contact page, so the bar is short: the shelf, the
 * seven volumes behind one disclosure, and Contact. The old Services / Work &
 * Research / For SMEs / Demo portal items are gone along with the pages they
 * pointed at — that material is bound into the volumes now.
 *
 * The volume list is the one piece of real navigation. It is how a reader who
 * already knows what they want reaches a volume without spinning the shelf, and
 * how a crawler finds all seven from any page.
 *
 * The mobile sheet is a focus-trapped dialog: Escape closes it, focus is held
 * inside while it is open, and it returns to the trigger on close.
 */

interface NavbarProps {
  locale: Locale;
}

const LANGUAGE_NAMES: Record<Locale, string> = { en: 'EN', tr: 'TR', it: 'IT' };
const LANGUAGE_LABELS: Record<Locale, string> = { en: 'English', tr: 'Türkçe', it: 'Italiano' };

const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const pathname = usePathname();
  const ui = getUI(locale);
  const books = getShelfBooks(locale);

  const [isOpen, setIsOpen] = useState(false);
  const [volumesOpen, setVolumesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const volumesRef = useRef<HTMLDivElement>(null);
  const volumesTriggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const volumesId = useId();

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
    setVolumesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeDisclosures = () => {
      setIsOpen(false);
      setVolumesOpen(false);
    };
    desktop.addEventListener('change', closeDisclosures);
    return () => desktop.removeEventListener('change', closeDisclosures);
  }, []);

  /** Close the volumes disclosure on outside click or Escape. */
  useEffect(() => {
    if (!volumesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!volumesRef.current?.contains(event.target as Node)) setVolumesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setVolumesOpen(false);
        volumesTriggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [volumesOpen]);

  // Dialog behaviour for the mobile sheet: scroll lock, Escape, focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(
        (el) => el.offsetParent !== null,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  /** The current path with its locale segment removed, for language links. */
  const pathWithoutLocale = (() => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) segments.shift();
    return segments.length ? `/${segments.join('/')}` : '';
  })();

  const onVolume = pathWithoutLocale.startsWith('/volumes');
  const onContact = pathWithoutLocale === '/contact';
  const onFrontMatter = pathWithoutLocale === '/front-matter';
  const onShelf = !onVolume && !onContact && !onFrontMatter;

  const itemClass = (active: boolean) =>
    `relative whitespace-nowrap py-2 text-[0.875rem] transition-colors duration-200 ${
      active
        ? 'text-charcoal after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-accent'
        : 'text-muted hover:text-charcoal'
    }`;

  return (
    <>
      <nav
        aria-label={ui.nav.mainLabel}
        className={`site-nav fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-border bg-cream/85 shadow-editorial backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="nav-inner mx-auto flex h-[68px] items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="group flex flex-shrink-0 items-center gap-2.5 rounded transition-opacity hover:opacity-90"
          >
            {/*
              The mark, cut out rather than filtered.

              `public/logo-mark.webp` is generated by `scripts/make-logo-mark.mjs`
              from the brand lock-up: the monogram cropped out of it and given a
              real alpha channel, in the site's own ink. So it renders here with
              no filter, no blend mode and no plate — it is simply the mark.

              The two things it replaces are recorded in that script. The short
              version: inverting the artwork produced a white smear, and faking
              the transparency with `mix-blend-mode` cost a full re-composite of
              the navigation bar on every frame of the shelf's animation.
            */}
            <Image
              src="/logo-mark.webp"
              alt=""
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] flex-shrink-0 object-contain"
            />
            <span className="text-[0.9375rem] font-normal tracking-tight text-charcoal">
              {PROFILE.name}
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden flex-shrink-0 items-center gap-7 xl:flex">
            <Link href={`/${locale}`} aria-current={onShelf ? 'page' : undefined} className={itemClass(onShelf)}>
              {ui.nav.shelf}
            </Link>

            <Link
              href={`/${locale}/front-matter`}
              aria-current={onFrontMatter ? 'page' : undefined}
              className={itemClass(onFrontMatter)}
            >
              {ui.nav.frontMatter}
            </Link>

            <div className="relative" ref={volumesRef}>
              <button
                ref={volumesTriggerRef}
                type="button"
                onClick={() => setVolumesOpen((open) => !open)}
                aria-expanded={volumesOpen}
                aria-controls={volumesId}
                className={`${itemClass(onVolume)} inline-flex items-center gap-1.5`}
              >
                {ui.nav.volumes}
                <ChevronDown size={13} aria-hidden="true" className={`transition-transform duration-200 ${volumesOpen ? 'rotate-180' : ''}`} />
              </button>

              {volumesOpen && (
                <div
                  id={volumesId}
                  className="nav-disclosure absolute left-1/2 top-full z-10 mt-3 w-[23rem] -translate-x-1/2 rounded-editorial border border-border bg-surface p-2 shadow-editorial"
                >
                  <ul>
                    {VOLUMES.map((volume, index) => (
                      <li key={volume.id}>
                        <Link
                          href={`/${locale}${volume.href}`}
                          onClick={() => setVolumesOpen(false)}
                          className="flex items-baseline gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-surface-alt"
                        >
                          <span className="w-6 flex-shrink-0 font-mono text-[0.6875rem] text-accent" aria-hidden="true">
                            {books[index].roman}
                          </span>
                          <span>
                            <span className="block text-[0.875rem] text-charcoal">{books[index].title}</span>
                            <span className="mt-0.5 block text-[0.75rem] text-muted">{books[index].discipline}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/contact`}
              aria-current={onContact ? 'page' : undefined}
              className={itemClass(onContact)}
            >
              {ui.nav.contact}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="nav-cta inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-5 text-[0.875rem] border border-control text-charcoal transition-colors duration-200 hover:border-accent hover:text-accent-hi"
            >
              {ui.nav.primaryCta}
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </Link>

            <div className="flex items-center gap-1 border-l border-border pl-4" role="group" aria-label={ui.nav.language}>
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathWithoutLocale}`}
                  hrefLang={loc}
                  lang={loc}
                  aria-current={locale === loc ? 'true' : undefined}
                  aria-label={LANGUAGE_LABELS[loc]}
                  className={`inline-flex min-h-[44px] items-center rounded px-1.5 py-1 font-mono text-[0.6875rem] tracking-[0.1em] transition-colors ${
                    locale === loc ? 'text-accent' : 'text-muted hover:text-charcoal'
                  }`}
                >
                  {LANGUAGE_NAMES[loc]}
                </Link>
              ))}
            </div>

          </div>

          {/* Compact controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href={`/${locale}/contact`}
              className="hidden min-h-[44px] items-center rounded-full px-4 text-[0.8125rem] border border-control text-charcoal transition-colors duration-200 hover:border-accent hover:text-accent-hi sm:inline-flex"
            >
              {ui.nav.primaryCta}
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface/70 text-charcoal"
              aria-label={isOpen ? ui.nav.closeMenu : ui.nav.menu}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id={panelId}
        ref={panelRef}
        role="dialog"
        aria-modal={isOpen || undefined}
        aria-label={ui.nav.menu}
        hidden={!isOpen}
        className="nav-mobile fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-cream xl:hidden"
      >
        <div className="flex min-h-full flex-col px-5 py-6">
          {/* Inside an already-labelled dialog, so it needs no landmark label. */}
          <nav className="flex flex-col">
            <Link
              href={`/${locale}`}
              onClick={() => setIsOpen(false)}
              className="border-b border-border py-4 text-xl tracking-tight text-charcoal"
            >
              {ui.nav.shelf}
            </Link>

            <Link
              href={`/${locale}/front-matter`}
              onClick={() => setIsOpen(false)}
              className="border-b border-border py-4 text-xl tracking-tight text-charcoal"
            >
              {ui.nav.frontMatter}
            </Link>

            <p className="border-b border-border pb-2 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {ui.nav.volumes}
            </p>
            <ul>
              {VOLUMES.map((volume, index) => (
                <li key={volume.id}>
                  <Link
                    href={`/${locale}${volume.href}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-baseline gap-3 border-b border-border py-3.5"
                  >
                    <span className="w-6 flex-shrink-0 font-mono text-[0.6875rem] text-accent" aria-hidden="true">
                      {books[index].roman}
                    </span>
                    <span>
                      <span className="block text-[1.0625rem] text-charcoal">{books[index].title}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-muted">{books[index].discipline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsOpen(false)}
              className="border-b border-border py-4 text-xl tracking-tight text-charcoal"
            >
              {ui.nav.contact}
            </Link>
          </nav>

          <Link
            href={`/${locale}/contact`}
            onClick={() => setIsOpen(false)}
            className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-base border border-control text-charcoal transition-colors duration-200 hover:border-accent hover:text-accent-hi"
          >
            {ui.nav.primaryCta}
            <ArrowRight size={17} strokeWidth={1.75} aria-hidden="true" />
          </Link>

          <div className="mt-8">
            <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{ui.nav.language}</p>
            <div className="flex gap-2" role="group" aria-label={ui.nav.language}>
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathWithoutLocale}`}
                  hrefLang={loc}
                  lang={loc}
                  aria-current={locale === loc ? 'true' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md border text-sm transition-colors ${
                    locale === loc
                      ? 'border-accent text-accent-hi'
                      : 'border-control text-charcoal hover:border-accent hover:text-accent'
                  }`}
                >
                  {LANGUAGE_LABELS[loc]}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto flex gap-6 pt-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noreferrer" className="hover:text-charcoal">
              LinkedIn
            </a>
            <a href="https://github.com/bumincetin" target="_blank" rel="noreferrer" className="hover:text-charcoal">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
