'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t-4 border-black mt-16 py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl mb-4 border-b-2 border-black pb-2">ABOUT</h3>
            <p className="mb-4">
              I explore the intersection of technology, entrepreneurship, and research to develop innovative solutions to complex problems.
            </p>
          </div>
          
          <div className="md:col-start-3">
            <h3 className="text-xl mb-4 border-b-2 border-black pb-2">CONNECT</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/lbartoszcze" className="hover:text-accent-text">GITHUB</a></li>
              <li><a href="http://linkedin.com/in/lbartoszcze/" className="hover:text-accent-text">LINKEDIN</a></li>
              <li><a href="https://x.com/ten_lukasz" className="hover:text-accent-text">X</a></li>
              <li><a href="https://www.youtube.com/c/EkonomicznePocztówki" className="hover:text-accent-text">YOUTUBE</a></li>
              <li><a href="https://www.instagram.com/lukasz.bartoszcze/" className="hover:text-accent-text">INSTAGRAM</a></li>
              <li><a href="mailto:&#108;&#117;&#107;&#97;&#115;&#122;&#46;&#98;&#97;&#114;&#116;&#111;&#115;&#122;&#99;&#122;&#101;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;" className="hover:text-accent-text">EMAIL</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t-2 border-black">
          <p>© {currentYear} LUKASZ BARTOSZCZE</p>
        </div>
      </div>
    </footer>
  );
} 