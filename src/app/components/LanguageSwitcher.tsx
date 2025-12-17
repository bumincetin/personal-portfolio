'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/translations';

const languageNames: Record<Locale, string> = {
  en: 'EN',
  tr: 'TR',
  it: 'IT',
};

const languageFlags: Record<Locale, string> = {
  en: '🇬🇧',
  tr: '🇹🇷',
  it: '🇮🇹',
};

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  
  // Get the path without the locale prefix
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/').filter(Boolean);
    // Remove basePath segment if present
    if (segments[0] === 'personal-portfolio') {
      segments.shift();
    }
    // Remove locale segment if present
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    return '/' + segments.join('/');
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="flex items-center gap-1 ml-4 border-l border-glass-border pl-4">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathWithoutLocale}`}
          className={`
            px-2 py-1 text-xs font-mono rounded transition-all
            ${currentLocale === locale 
              ? 'bg-accent-cyan/20 text-accent-cyan' 
              : 'text-text-muted hover:text-white hover:bg-white/5'
            }
          `}
          title={languageFlags[locale]}
        >
          {languageNames[locale]}
        </Link>
      ))}
    </div>
  );
}

