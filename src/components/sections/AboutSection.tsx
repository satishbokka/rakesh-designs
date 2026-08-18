'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Sparkles, CheckCircle } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Real Studio Emblem Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-dark-border bg-dark-card p-8 shadow-premium flex flex-col items-center text-center space-y-6">
              {/* Real Logo Emblem without border ring */}
              <div className="relative w-28 h-28 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Rakesh Designs Emblem"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-light-bg">
                  Rakesh Designs
                </h3>
                <p className="text-xs uppercase tracking-widest text-warm-orange font-semibold mt-1">
                  Graphic Design & Visual Craft
                </p>
              </div>

              <div className="w-full pt-4 border-t border-dark-border grid grid-cols-2 gap-4 text-left text-xs">
                <div className="bg-near-black p-3.5 rounded-xl border border-dark-border">
                  <span className="text-offwhite-muted block font-medium">Location</span>
                  <span className="font-semibold text-light-bg text-sm">{STUDIO_INFO.location}</span>
                </div>
                <div className="bg-near-black p-3.5 rounded-xl border border-dark-border">
                  <span className="text-offwhite-muted block font-medium">Instagram</span>
                  <span className="font-semibold text-warm-orange text-sm">{STUDIO_INFO.instagramHandle}</span>
                </div>
              </div>

              <div className="px-4 py-2 bg-warm-orange text-near-black text-xs font-extrabold rounded-full flex items-center gap-2 shadow-orange-glow">
                <Sparkles className="w-3.5 h-3.5 text-near-black" />
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest">
              <Award className="w-4 h-4" />
              <span>Studio Craft & Philosophy</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight leading-tight">
              Graphic Design That Gives Your Ideas Permanent Impact.
            </h2>

            <p className="text-base text-offwhite-muted leading-relaxed">
              At <strong>Rakesh Designs</strong>, graphic design is about creating clear, striking visuals for your brand, family milestones, and public events.
            </p>

            <p className="text-sm sm:text-base text-offwhite-muted/90 leading-relaxed">
              We deliver custom photo frames, custom display pictures (CDPs), portrait retouches, and outdoor flex banners across Telangana and Andhra Pradesh.
            </p>

            {/* Core Strengths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Pixel-perfect print resolution for large-scale flex & hoardings',
                'Color correction & natural skin tone retouching',
                'Custom typography tailored to birthday & event themes',
                'Direct studio consultation with fast turnarounds',
              ].map((value, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-light-bg font-medium">
                  <CheckCircle className="w-4 h-4 text-warm-orange flex-shrink-0 mt-0.5" />
                  <span>{value}</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
