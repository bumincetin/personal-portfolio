"use client";
import ExperienceIcon from './ExperienceIcon';

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/translations";
import type { UIStrings } from "@/lib/content/ui";
import { CONTACT, PROFILE } from "@/lib/profile";
import { experience } from './director/experience-director';

type Props = {
  locale: Locale;
  nav: UIStrings["nav"];
  about: string;
  books: {
    id: string;
    href: string;
    roman: string;
    title: string;
    discipline: string;
  }[];
};
const languages: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  it: "Italiano",
};
export default function ExperienceNavigation({
  locale,
  nav,
  about,
  books,
}: Props) {
  const pathname = usePathname(),
    dialog = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    id = useId();
  const [open, setOpen] = useState(false);
  const suffix = pathname.replace(/^\/(en|tr|it)(?=\/|$)/, "");
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current,
      previous = document.body.style.overflow,
      returnTo = trigger.current;
    document.body.style.overflow = "hidden";
    const unlock = experience.lock('navigation');
    modal?.showModal();
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !modal) return;
      const items = Array.from(
        modal.querySelectorAll<HTMLElement>("a[href],button:not([disabled])"),
      ).filter((e) => e.getClientRects().length > 0);
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    modal?.addEventListener("keydown", containFocus);
    return () => {
      modal?.removeEventListener("keydown", containFocus);
      modal?.close();
      document.body.style.overflow = previous;
      unlock();
      returnTo?.focus({ preventScroll: true });
    };
  }, [open]);
  const link = (path: string, label: string) => (
    <Link
      href={`/${locale}${path}`}
      prefetch={false}
      onClick={() => setOpen(false)}
      aria-current={suffix === path ? "page" : undefined}
    >
      {label}
      <span aria-hidden="true"><ExperienceIcon name="external" /></span>
    </Link>
  );
  return (
    <>
      <nav className="site-nav atlas-nav" aria-label={nav.mainLabel}>
        <Link
          className="atlas-brand"
          href={`/${locale}`}
          prefetch={false}
          aria-label={PROFILE.name}
        >
          <Image src="/logo-mark.webp" width={28} height={28} alt="" priority />
          <span>{PROFILE.name}</span>
        </Link>
        <div className="atlas-nav-links">
          {link("/front-matter", nav.frontMatter)}
          {link("/chapters", about)}
          {link("/contact", nav.contact)}
        </div>
        <div className="atlas-nav-tools">
          <div
            className="atlas-languages"
            role="group"
            aria-label={nav.language}
          >
            {(["en", "tr", "it"] as Locale[]).map((l) => (
              <Link
                key={l}
                href={`/${l}${suffix}`}
                prefetch={false}
                hrefLang={l}
                lang={l}
                aria-label={languages[l]}
                aria-current={l === locale ? "true" : undefined}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            ref={trigger}
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={id}
            aria-label={nav.menu}
            className="atlas-menu-trigger"
          >
            <span>{nav.volumes}</span>
            <span aria-hidden="true" className="atlas-menu-symbol">
              <ExperienceIcon name="menu" />
            </span>
          </button>
        </div>
      </nav>
      <dialog
        className="atlas-menu nav-mobile"
        ref={dialog}
        id={id}
        aria-label={nav.mainLabel}
        onCancel={() => setOpen(false)}
      >
        <div className="atlas-menu-top">
          <Link href={`/${locale}`} prefetch={false} onClick={() => setOpen(false)}>
            {PROFILE.name}
          </Link>
          <button onClick={() => setOpen(false)} aria-label={nav.closeMenu}>
            {nav.closeMenu}
            <span aria-hidden="true"><ExperienceIcon name="close" /></span>
          </button>
        </div>
        <div className="atlas-menu-body">
          <nav className="atlas-menu-primary" aria-label={nav.mainLabel}>
            {link("", nav.shelf)}
            {link("/front-matter", nav.frontMatter)}
            {link("/chapters", about)}
            {link("/contact", nav.contact)}
          </nav>
          <nav className="atlas-menu-volumes" aria-label={nav.volumes}>
            <p>{nav.volumes} / 07</p>
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/${locale}${book.href}`}
                onClick={() => setOpen(false)}
                prefetch={false}
              >
                <span>{book.roman}</span>
                <span>
                  <strong>{book.title}</strong>
                  <small>{book.discipline}</small>
                </span>
                <span aria-hidden="true"><ExperienceIcon name="external" /></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="atlas-menu-bottom">
          <div
            className="atlas-languages"
            role="group"
            aria-label={nav.language}
          >
            {(["en", "tr", "it"] as Locale[]).map((l) => (
              <Link
                key={l}
                onClick={() => setOpen(false)}
                href={`/${l}${suffix}`}
                prefetch={false}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
              >
                {languages[l]}
              </Link>
            ))}
          </div>
          <div>
            <a href={CONTACT.linkedin.url} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={CONTACT.github.url} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
