'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'THOUGHTS', path: '/#thoughts' },
    { label: 'PROJECTS', path: '/#projects' },
    { label: 'RESEARCH', path: '/#research' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/#contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-black">
      <div className="container flex items-center justify-between h-7">
        <Link href="/" className="text-base font-bold">
          ŁB
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block main-nav" id="main-header-nav">
          <ul className="flex h-full">
            {navItems.map((item, index) => (
              <li key={item.path} 
                  className={`h-full ${index !== navItems.length - 1 ? 'border-r border-black' : ''}`}
                  style={{ padding: 0, margin: 0 }}
              >
                <Link 
                  href={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: 'inherit',
                  }}
                  className="main-nav-link"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ef4444';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  <span className="text-xs" style={{ padding: '0.5rem 1rem' }}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <div className="flex flex-col justify-center w-4 h-4 space-y-1">
            <span className={`w-4 h-0.5 bg-black block transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-4 h-0.5 bg-black block transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-black block transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-black">
          <nav>
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.path} className="border-b border-black">
                  <Link 
                    href={item.path}
                    className="block px-4 py-1 text-xs"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
} 