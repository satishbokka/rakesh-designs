'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS, ProcessStep } from '@/lib/constants';

export default function ProcessSection() {
  return (
    <section className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest px-3.5 py-1 bg-dark-card border border-dark-border rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
            How We Work
          </h2>

          <p className="text-sm sm:text-base text-offwhite-muted">
            A simple, structured 4-step workflow from initial brief to final print and digital delivery.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step: ProcessStep, idx: number) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-dark-card border border-dark-border rounded-3xl p-6 relative hover:border-warm-orange transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-extrabold text-warm-orange opacity-90">
                    {step.step}
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-offwhite-muted/40 group-hover:text-warm-orange transition-colors" />
                  )}
                </div>

                <h3 className="font-display font-bold text-xl text-light-bg group-hover:text-warm-orange transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-offwhite-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-dark-border/40 text-[10px] font-bold uppercase tracking-wider text-warm-orange">
                Step 0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
