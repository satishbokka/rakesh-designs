'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageSquare, ExternalLink, ArrowRight, MapPin, Phone } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Minimal Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-light-bg tracking-tight">
            Let's talk.
          </h2>
          <p className="text-base sm:text-lg text-offwhite-muted max-w-md mx-auto">
            Available for select graphic design, custom frame, and visual projects.
          </p>
        </motion.div>

        {/* Minimal Action Row: Instagram · WhatsApp · Behance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          {/* Main WhatsApp CTA */}
          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="px-8 py-4 bg-warm-orange hover:bg-orange-light text-near-black font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-orange-glow hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-near-black" />
            <span>WhatsApp →</span>
          </a>

          {/* Instagram Button */}
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="px-6 py-4 bg-dark-card border border-dark-border hover:border-warm-orange text-light-bg text-sm font-semibold rounded-2xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-warm-orange" />
            <span>Instagram</span>
          </a>

          {/* Behance Button */}
          <a
            href={STUDIO_INFO.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magnetic"
            className="px-6 py-4 bg-dark-card border border-dark-border hover:border-warm-orange text-light-bg text-sm font-semibold rounded-2xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-warm-orange" />
            <span>Behance</span>
          </a>
        </motion.div>

        {/* Studio Info Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 text-xs text-offwhite-muted flex flex-wrap items-center justify-center gap-6"
        >
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-warm-orange" />
            <a href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-warm-orange font-medium text-light-bg/90 transition-colors">
              +91 {STUDIO_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-warm-orange" />
            <span>{STUDIO_INFO.location}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
