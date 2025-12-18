'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
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
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 p-2 md:p-3 px-4 md:px-6 rounded-full backdrop-blur-2xl border border-glass-border hidden md:flex items-center gap-4 lg:gap-6 transition-all duration-300 ${scrolled ? 'bg-void/80' : 'bg-void/60'}`}>
        {links.map((link) => (
          <Link 
            key={link.name}
            href={link.href}
            className={`
              text-xs lg:text-sm uppercase tracking-wider transition-colors duration-300
              ${isActive(link.href) ? 'text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
            `}
          >
            {link.name}
          </Link>
        ))}
        <a 
          href="mailto:cetinbumink@gmail.com"
          className="text-xs lg:text-sm uppercase tracking-wider text-text-primary hover:text-accent-cyan transition-colors duration-300"
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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        {/* Mobile Header */}
        <div className={`flex items-center justify-between p-4 transition-all duration-300 ${scrolled || isOpen ? 'bg-void/95 backdrop-blur-xl' : 'bg-transparent'}`}>
          <Link href={`/${locale}`} className="font-serif text-lg text-text-primary">
            BKÇ
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${currentPath}`}
                  className={`
                    px-1.5 py-0.5 text-[10px] font-mono rounded transition-all
                    ${locale === loc 
                      ? 'bg-accent-cyan/20 text-accent-cyan' 
                      : 'text-text-muted'
                    }
                  `}
                >
                  {languageNames[loc]}
                </Link>
              ))}
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-glass-surface border border-glass-border"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-void/98 backdrop-blur-xl transition-all duration-500 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '64px' }}
        >
          <div className="flex flex-col items-center justify-center h-full pb-20">
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, idx) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    text-2xl font-serif transition-all duration-300
                    ${isActive(link.href) ? 'text-accent-cyan' : 'text-text-muted'}
                  `}
                  style={{
                    transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="mailto:cetinbumink@gmail.com"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif text-text-primary mt-4"
                style={{
                  transitionDelay: isOpen ? `${links.length * 50}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {trans.nav.contact}
              </a>
            </nav>
            
            {/* Social Links */}
            <div 
              className="absolute bottom-12 flex gap-6 text-text-muted text-sm font-mono"
              style={{
                transitionDelay: isOpen ? '300ms' : '0ms',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/bumincetin" target="_blank" rel="noreferrer" className="hover:text-accent-cyan transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
