'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Instagram, MessageSquare, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

interface FooterProps {
  onOpenQuote: () => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-near-black text-light-bg pt-16 pb-12 border-t border-dark-border relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-warm-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-dark-border/80">
          {/* Studio Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Rakesh Designs Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-light-bg">
                {STUDIO_INFO.name}
              </span>
            </div>

            <p className="text-sm text-offwhite-muted max-w-sm leading-relaxed">
              Creative design studio for brands, businesses and special moments. Located in {STUDIO_INFO.location}.
            </p>

            {/* Live Social Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card hover:bg-warm-orange hover:text-near-black text-light-bg text-xs font-semibold rounded-full border border-dark-border transition-colors group cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-warm-orange group-hover:text-near-black" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={STUDIO_INFO.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card hover:bg-warm-orange hover:text-near-black text-light-bg text-xs font-semibold rounded-full border border-dark-border transition-colors group cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-warm-orange group-hover:text-near-black" />
                <span>Behance</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-warm-orange">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-offwhite-muted">
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNavClick(e, '#')}
                  className="hover:text-warm-orange transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleNavClick(e, '#portfolio')}
                  className="hover:text-warm-orange transition-colors cursor-pointer"
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-warm-orange transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-warm-orange transition-colors cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-warm-orange transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Lead */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-warm-orange">
              Direct Contact
            </h4>
            <div className="text-xs text-offwhite-muted space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-warm-orange" />
                <a href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-warm-orange font-semibold text-light-bg cursor-pointer">
                  +91 {STUDIO_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-warm-orange" />
                <span>{STUDIO_INFO.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                data-cursor="magnetic"
                className="px-5 py-2.5 bg-warm-orange hover:bg-orange-light text-near-black rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-orange-glow cursor-pointer inline-flex items-center justify-center gap-1.5"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5 text-near-black" />
              </a>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="px-4 py-2.5 border border-dark-border hover:border-warm-orange text-light-bg rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-warm-orange" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Final Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-offwhite-muted/70 gap-4">
          <p>© {new Date().getFullYear()} {STUDIO_INFO.name}. All Rights Reserved.</p>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-warm-orange font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Let's create something memorable</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
