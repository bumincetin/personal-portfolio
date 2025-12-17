'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Assets', href: isHome ? '#products' : '/#products' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-3 px-8 rounded-full bg-void/60 backdrop-blur-2xl border border-glass-border flex gap-8 w-[90%] max-w-fit justify-center">
      {links.map((link) => (
        link.href.startsWith('#') || link.href.includes('#') ? (
          <a 
            key={link.name}
            href={link.href}
            className="text-xs md:text-sm uppercase tracking-wider text-text-muted hover:text-accent-cyan transition-colors duration-300"
          >
            {link.name}
          </a>
        ) : (
          <Link 
            key={link.name}
            href={link.href}
            className={`
              text-xs md:text-sm uppercase tracking-wider transition-colors duration-300
              ${pathname === link.href ? 'text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
            `}
          >
            {link.name}
          </Link>
        )
      ))}
      <a 
        href="mailto:cetinbumink@gmail.com"
        className="text-xs md:text-sm uppercase tracking-wider text-text-primary hover:text-accent-cyan transition-colors duration-300"
      >
        Contact
      </a>
    </nav>
  );
};

export default Navbar;
