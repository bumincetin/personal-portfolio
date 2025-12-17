'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale, type TranslationType, locales, translations } from '@/lib/translations';

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
  
  // Get current path without locale
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
    { name: trans.nav.about, href: `/${locale}/about` },
  ];

  const isActive = (href: string) => {
    const hrefPath = href.replace(`/${locale}`, '') || '/';
    return currentPath === hrefPath || (hrefPath === '/' && currentPath === '');
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-3 px-6 rounded-full bg-void/60 backdrop-blur-2xl border border-glass-border flex items-center gap-6 w-[95%] max-w-fit justify-center">
      {links.map((link) => (
        <Link 
          key={link.name}
          href={link.href}
          className={`
            text-xs md:text-sm uppercase tracking-wider transition-colors duration-300
            ${isActive(link.href) ? 'text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
          `}
        >
          {link.name}
        </Link>
      ))}
      <a 
        href="mailto:cetinbumink@gmail.com"
        className="text-xs md:text-sm uppercase tracking-wider text-text-primary hover:text-accent-cyan transition-colors duration-300"
      >
        {trans.nav.contact}
      </a>
      
      {/* Language Switcher */}
      <div className="flex items-center gap-1 ml-2 border-l border-glass-border pl-4">
        {locales.map((loc) => (
          <Link
            key={loc}
            href={`/${loc}${currentPath}`}
            className={`
              px-2 py-1 text-xs font-mono rounded transition-all
              ${locale === loc 
                ? 'bg-accent-cyan/20 text-accent-cyan' 
                : 'text-text-muted hover:text-white hover:bg-white/5'
              }
            `}
          >
            {languageNames[loc]}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
