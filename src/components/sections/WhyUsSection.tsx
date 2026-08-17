'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Palette, SearchCheck, MessageSquare } from 'lucide-react';
import { WHY_US_POINTS, TrustPoint } from '@/lib/constants';

const iconMap: Record<string, React.ReactNode> = {
  '01': <Lightbulb className="w-5 h-5 text-warm-orange" />,
  '02': <Palette className="w-5 h-5 text-warm-orange" />,
  '03': <SearchCheck className="w-5 h-5 text-warm-orange" />,
  '04': <MessageSquare className="w-5 h-5 text-warm-orange" />,
};

export default function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-dark-surface text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
            Why Rakesh Designs?
          </h2>

          <p className="text-sm sm:text-base text-offwhite-muted">
            Crafting tailored visual solutions built around precision, creativity, and direct collaboration.
          </p>
        </div>

        {/* 4 Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_POINTS.map((point: TrustPoint, idx: number) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-dark-card border border-dark-border rounded-3xl p-6 hover:border-warm-orange hover:shadow-premium-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-near-black border border-dark-border flex items-center justify-center group-hover:border-warm-orange transition-colors">
                    {iconMap[point.number] || <Lightbulb className="w-5 h-5 text-warm-orange" />}
                  </div>

                  <span className="font-display font-bold text-sm text-warm-orange">
                    {point.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-light-bg group-hover:text-warm-orange transition-colors">
                  {point.title}
                </h3>

                <p className="text-xs text-offwhite-muted leading-relaxed">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
