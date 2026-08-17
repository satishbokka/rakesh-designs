'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-charcoal-navy/90 backdrop-blur-xl border-b border-navy-border/80 shadow-premium'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name (Unbordered clean emblem) */}
        <a href="#" data-cursor="magnetic" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
            <Image
              src="/assets/logo.png"
              alt="Rakesh Designs Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-warm-offwhite tracking-tight group-hover:text-vivid-teal transition-colors">
              {STUDIO_INFO.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-vivid-teal">
              Creative Studio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor="magnetic"
              className="text-sm font-medium text-warm-offwhite/80 hover:text-vivid-teal transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="text-xs font-semibold text-warm-offwhite/90 hover:text-vivid-teal transition-colors flex items-center gap-1"
          >
            <span>{STUDIO_INFO.instagramHandle}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenQuote}
            data-cursor="magnetic"
            className="px-5 py-2.5 bg-vivid-teal hover:bg-teal-light text-charcoal-navy text-xs uppercase tracking-wider font-extrabold rounded-full shadow-teal-glow hover:scale-[1.02] transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-charcoal-navy" />
            <span>Start a Project</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-cursor="magnetic"
          className="md:hidden p-2 rounded-xl text-warm-offwhite hover:bg-navy-card transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-navy border-b border-navy-border px-6 py-6 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-warm-offwhite hover:text-vivid-teal transition-colors py-1.5"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-navy-border/60 flex flex-col space-y-3">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-warm-offwhite flex items-center justify-between"
              >
                <span>Instagram Profile</span>
                <span className="text-vivid-teal">{STUDIO_INFO.instagramHandle}</span>
              </a>

              <a
                href={STUDIO_INFO.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-warm-offwhite flex items-center justify-between"
              >
                <span>Behance Portfolio</span>
                <span className="text-vivid-teal">Behance</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-vivid-teal text-charcoal-navy rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-teal-glow"
              >
                <Sparkles className="w-4 h-4 text-charcoal-navy" />
                <span>Start a Project</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
