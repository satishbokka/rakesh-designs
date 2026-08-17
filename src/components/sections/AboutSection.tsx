'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Sparkles, CheckCircle } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-charcoal-navy text-warm-offwhite relative border-t border-navy-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Studio Emblem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-navy-border bg-navy-card p-8 shadow-premium flex flex-col items-center text-center space-y-6">
              {/* Clean Emblem without border ring */}
              <div className="relative w-28 h-28 overflow-hidden">
                <Image
                  src="/assets/logo.png"
                  alt="Rakesh Designs Emblem"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-warm-offwhite">
                  Rakesh Designs
                </h3>
                <p className="text-xs uppercase tracking-widest text-vivid-teal font-semibold mt-1">
                  Creative Studio & Visual Craft
                </p>
              </div>

              <div className="w-full pt-4 border-t border-navy-border grid grid-cols-2 gap-4 text-left text-xs">
                <div className="bg-charcoal-navy p-3.5 rounded-xl border border-navy-border">
                  <span className="text-offwhite-muted block font-medium">Location</span>
                  <span className="font-semibold text-warm-offwhite text-sm">{STUDIO_INFO.location}</span>
                </div>
                <div className="bg-charcoal-navy p-3.5 rounded-xl border border-navy-border">
                  <span className="text-offwhite-muted block font-medium">Instagram</span>
                  <span className="font-semibold text-vivid-teal text-sm">{STUDIO_INFO.instagramHandle}</span>
                </div>
              </div>

              <div className="px-4 py-2 bg-vivid-teal text-charcoal-navy text-xs font-extrabold rounded-full flex items-center gap-2 shadow-teal-glow">
                <Sparkles className="w-3.5 h-3.5 text-charcoal-navy" />
                <span>Crafting Memories with Precision & Quality</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-vivid-teal uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Studio Story & Philosophy</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-warm-offwhite tracking-tight leading-tight">
              Graphic Design That Gives Your Ideas Permanent Impact.
            </h2>

            <p className="text-base text-offwhite-muted leading-relaxed">
              At <strong>Rakesh Designs</strong>, graphic design is about creating clear, striking visuals for your brand, family milestones, and public events.
            </p>

            <p className="text-sm sm:text-base text-offwhite-muted/90 leading-relaxed">
              Over the past 5+ years, we have delivered custom photo frames, custom display pictures (CDPs), high-key portrait retouches, and large-format outdoor flex banners across Telangana and Andhra Pradesh.
            </p>

            {/* Core Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Pixel-perfect print resolution for large-scale flex & hoardings',
                'Color correction & natural skin tone retouching',
                'Custom typography tailored to birthday & event themes',
                'Direct studio consultation with fast turnarounds',
              ].map((value, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-warm-offwhite font-medium">
                  <CheckCircle className="w-4 h-4 text-vivid-teal flex-shrink-0 mt-0.5" />
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Metrics Counter */}
            <div className="pt-6 border-t border-navy-border/60 grid grid-cols-3 gap-4 text-center">
              <div className="bg-navy-card p-4 rounded-2xl border border-navy-border">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-vivid-teal block">
                  {STUDIO_INFO.projectsCompleted}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-warm-offwhite/80">
                  Projects Delivered
                </span>
              </div>

              <div className="bg-navy-card p-4 rounded-2xl border border-navy-border">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-warm-offwhite block">
                  {STUDIO_INFO.yearsExperience}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-warm-offwhite/80">
                  Years Crafting
                </span>
              </div>

              <div className="bg-navy-card p-4 rounded-2xl border border-navy-border">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-vivid-teal block">
                  {STUDIO_INFO.satisfactionRate}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-warm-offwhite/80">
                  Satisfaction Rate
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
