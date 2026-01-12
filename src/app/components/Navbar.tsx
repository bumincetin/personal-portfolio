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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="font-serif text-xl md:text-2xl text-charcoal tracking-tight">
              Bumin K. Çetin
            </Link>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className={`
                    font-mono text-xs uppercase tracking-wider transition-colors duration-300 relative
                    ${isActive(link.href) 
                      ? 'text-charcoal after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-accent' 
                      : 'text-muted hover:text-charcoal'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="mailto:cetinbumink@gmail.com"
                className="font-mono text-xs uppercase tracking-wider px-5 py-2.5 bg-charcoal text-cream hover:bg-navy transition-colors duration-300"
              >
                {trans.nav.contact}
              </a>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1 ml-2 pl-4 border-l border-border">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${currentPath}`}
                    className={`
                      px-2 py-1 font-mono text-xs transition-all
                      ${locale === loc 
                        ? 'text-charcoal font-medium' 
                        : 'text-muted hover:text-charcoal'
                      }
                    `}
                  >
                    {languageNames[loc]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-1">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${currentPath}`}
                    className={`
                      px-1.5 py-0.5 font-mono text-[10px] transition-all
                      ${locale === loc 
                        ? 'text-charcoal font-medium' 
                        : 'text-muted'
                      }
                    `}
                  >
                    {languageNames[loc]}
                  </Link>
                ))}
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex items-center justify-center text-charcoal"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-cream transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col h-full px-6 py-12">
          <nav className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  py-4 border-b border-border font-serif text-2xl transition-all duration-300
                  ${isActive(link.href) ? 'text-charcoal' : 'text-muted'}
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
              className="py-4 font-serif text-2xl text-accent"
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
            className="mt-auto flex gap-6 text-muted font-mono text-sm"
            style={{
              transitionDelay: isOpen ? '300ms' : '0ms',
              opacity: isOpen ? 1 : 0,
            }}
          >
            <a href="https://linkedin.com/in/buminkcetin" target="_blank" rel="noreferrer" className="hover:text-charcoal transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/bumincetin" target="_blank" rel="noreferrer" className="hover:text-charcoal transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
