'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, ExternalLink, Sparkles } from 'lucide-react';
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
    { label: 'Home', href: '#' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      setTimeout(() => {
        const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-near-black/90 backdrop-blur-xl border-b border-dark-border/80 shadow-premium'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Real Brand Logo & Name (Acts as Home smooth-scroll link) */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          data-cursor="magnetic"
          className="flex items-center gap-3 group cursor-pointer select-none"
          title="Return to top"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
            <Image
              src="/logo.png"
              alt="Rakesh Designs Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg text-light-bg tracking-tight group-hover:text-warm-orange transition-colors">
              {STUDIO_INFO.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-warm-orange">
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
              onClick={(e) => handleNavClick(e, link.href)}
              data-cursor="magnetic"
              className="text-sm font-medium text-light-bg/80 hover:text-warm-orange transition-colors tracking-wide cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="p-2 rounded-full border border-dark-border bg-dark-card/80 text-light-bg hover:text-warm-orange hover:border-warm-orange transition-colors flex items-center justify-center cursor-pointer"
            title={`Follow on Instagram ${STUDIO_INFO.instagramHandle}`}
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={STUDIO_INFO.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="p-2 rounded-full border border-dark-border bg-dark-card/80 text-light-bg hover:text-warm-orange hover:border-warm-orange transition-colors flex items-center justify-center cursor-pointer"
            title="View Behance Portfolio"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenQuote}
            data-cursor="magnetic"
            className="px-5 py-2 bg-warm-orange hover:bg-orange-light text-near-black text-xs uppercase tracking-wider font-extrabold rounded-full shadow-orange-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-near-black" />
            <span>Start a Project</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-cursor="magnetic"
          className="md:hidden p-2.5 rounded-xl text-light-bg bg-dark-card border border-dark-border hover:border-warm-orange transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-warm-orange" /> : <Menu className="w-6 h-6 text-light-bg" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-near-black border-b border-dark-border px-6 py-6 space-y-4 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-bold text-light-bg hover:text-warm-orange transition-colors py-2 border-b border-dark-border/40 flex items-center justify-between cursor-pointer"
                >
                  <span>{link.label}</span>
                  <span className="text-warm-orange text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-dark-card border border-dark-border rounded-xl text-xs font-semibold text-light-bg hover:border-warm-orange flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-warm-orange" />
                    <span>Instagram</span>
                  </span>
                  <span className="text-warm-orange text-[10px]">{STUDIO_INFO.instagramHandle}</span>
                </a>

                <a
                  href={STUDIO_INFO.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 bg-dark-card border border-dark-border rounded-xl text-xs font-semibold text-light-bg hover:border-warm-orange flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-warm-orange" />
                  <span>Behance</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3.5 bg-warm-orange text-near-black rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-orange-glow active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-near-black" />
                <span>Start a Project</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
