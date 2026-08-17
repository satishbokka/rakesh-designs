'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, ShieldCheck, ChevronDown } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

// Dynamically import 3D Canvas
const Hero3DCanvas = dynamic(() => import('@/components/3d/Hero3DCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-navy-card/50 rounded-3xl animate-pulse" />,
});

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export default function HeroSection({ onOpenQuote }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 md:pt-36 md:pb-20 flex items-center bg-navy-gradient overflow-hidden z-10 text-warm-offwhite">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-vivid-teal/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-light/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 space-y-6 text-left relative z-20"
          >
            {/* Top Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy-card border border-navy-border rounded-full text-xs font-semibold text-warm-offwhite tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-vivid-teal" />
              <span>BESPOKE CREATIVE STUDIO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-vivid-teal" />
              <span className="text-vivid-teal">{STUDIO_INFO.yearsExperience} EXPERIENCE</span>
            </div>

            {/* Main Headline (Clear & Direct) */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm-offwhite tracking-tight leading-[1.1]">
              Graphic Design That Makes Your Photos & Brand Look <span className="text-teal-gradient">Premium</span>.
            </h1>

            {/* Clear Subtext */}
            <p className="text-base sm:text-lg text-offwhite-muted max-w-xl font-normal leading-relaxed">
              Custom photo frames, flex banners, posters, and social media designs — crafted with precision and delivered print-ready, every time.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenQuote}
                data-cursor="magnetic"
                className="px-8 py-4 bg-vivid-teal hover:bg-teal-light text-charcoal-navy font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-teal-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 text-charcoal-navy group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#portfolio"
                data-cursor="magnetic"
                className="px-7 py-4 border border-navy-border hover:border-vivid-teal bg-navy-card/80 hover:bg-navy-light text-warm-offwhite font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Explore 3D Work Gallery</span>
              </a>
            </div>

            {/* Credibility Badges */}
            <div className="pt-6 border-t border-navy-border/60 flex items-center gap-6 text-xs text-offwhite-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-vivid-teal" />
                <span>Print & HD Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-warm-offwhite" />
                <span>500+ Projects Delivered</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Layered Artwork Canvas Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 h-[380px] sm:h-[450px] lg:h-[500px] relative rounded-3xl overflow-hidden border border-navy-border bg-gradient-to-b from-navy-card to-dark-bg shadow-premium z-10"
          >
            <Hero3DCanvas />
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#portfolio"
            data-cursor="magnetic"
            className="flex flex-col items-center gap-1 text-xs font-semibold text-offwhite-muted hover:text-vivid-teal transition-colors group"
          >
            <span className="uppercase tracking-widest text-[10px]">Explore Studio Showcase</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
