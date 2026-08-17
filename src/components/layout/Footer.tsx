'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Instagram, MessageSquare, Heart, Phone, MapPin, ExternalLink } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

interface FooterProps {
  onOpenQuote: () => void;
}

export default function Footer({ onOpenQuote }: FooterProps) {
  return (
    <footer className="bg-navy-dark text-soft-cream pt-16 pb-12 border-t border-navy-border relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-warm-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-navy-border/80">
          {/* Studio Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="Rakesh Designs Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-soft-cream">
                {STUDIO_INFO.name}
              </span>
            </div>

            <p className="text-sm text-cream-muted max-w-sm leading-relaxed">
              Bespoke visual identities, archival photo framing, high-impact print architecture, and digital campaign design. Located in {STUDIO_INFO.location}.
            </p>

            {/* Live Social Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-card hover:bg-warm-coral hover:text-indigo-navy text-soft-cream text-xs font-semibold rounded-full border border-navy-border transition-colors group"
              >
                <Instagram className="w-4 h-4 text-warm-coral group-hover:text-indigo-navy" />
                <span>Instagram {STUDIO_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={STUDIO_INFO.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-card hover:bg-warm-coral hover:text-indigo-navy text-soft-cream text-xs font-semibold rounded-full border border-navy-border transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-warm-coral group-hover:text-indigo-navy" />
                <span>Behance Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-warm-coral">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-sm text-cream-muted">
              <li>
                <a href="#portfolio" className="hover:text-warm-coral transition-colors">
                  Interactive 3D Gallery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-warm-coral transition-colors">
                  Services & Disciplines
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-warm-coral transition-colors">
                  Studio Story & Philosophy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-warm-coral transition-colors">
                  Start a Project / Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Lead */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-warm-coral">
              Direct Contact Channels
            </h4>
            <div className="text-xs text-cream-muted space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-warm-coral" />
                <a href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-warm-coral font-semibold text-soft-cream">
                  +91 {STUDIO_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-warm-coral" />
                <span>{STUDIO_INFO.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onOpenQuote}
                data-cursor="magnetic"
                className="px-5 py-2.5 bg-warm-coral hover:bg-coral-light text-indigo-navy rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-coral-glow"
              >
                Get Custom Quote
              </button>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="px-4 py-2.5 border border-navy-border hover:border-warm-coral text-soft-cream rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-warm-coral" />
                <span>WhatsApp Studio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-muted/60 gap-4">
          <p>© {new Date().getFullYear()} {STUDIO_INFO.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-warm-coral fill-warm-coral" />
            <span>in {STUDIO_INFO.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
