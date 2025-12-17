'use client';

import React from 'react';

const Navbar: React.FC = () => {
  const links = [
    { name: 'Methodology', href: '#services' },
    { name: 'Assets', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact', highlight: true },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 p-3 px-8 rounded-full bg-void/60 backdrop-blur-2xl border border-glass-border flex gap-8 w-[90%] max-w-fit justify-center">
      {links.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          className={`
            text-xs md:text-sm uppercase tracking-wider transition-colors duration-300
            ${link.highlight ? 'text-text-primary hover:text-accent-cyan' : 'text-text-muted hover:text-accent-cyan'}
          `}
        >
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
