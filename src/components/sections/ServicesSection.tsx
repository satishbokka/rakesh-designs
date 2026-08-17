'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Frame, Sparkles, Wand2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES, ServiceCategory } from '@/lib/constants';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Printer: <Printer className="w-6 h-6 text-warm-coral" />,
  Frame: <Frame className="w-6 h-6 text-warm-coral" />,
  Sparkles: <Sparkles className="w-6 h-6 text-warm-coral" />,
  Wand2: <Wand2 className="w-6 h-6 text-warm-coral" />,
};

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 md:py-28 bg-navy-dark text-soft-cream relative border-t border-navy-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-coral uppercase tracking-widest px-3.5 py-1 bg-navy-card border border-navy-border rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Disciplines</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-soft-cream tracking-tight">
            Bespoke Services & Visual Capabilities
          </h2>

          <p className="text-sm sm:text-base text-cream-muted">
            Refined creative disciplines engineered to elevate personal milestones, commercial print campaigns, and digital visual identities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service: ServiceCategory, idx: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-navy-card border border-navy-border rounded-3xl p-6 sm:p-8 hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-navy border border-navy-border flex items-center justify-center group-hover:border-warm-coral transition-colors">
                    {iconMap[service.iconName] || <Sparkles className="w-6 h-6 text-warm-coral" />}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-warm-coral px-3 py-1 bg-indigo-navy rounded-full border border-navy-border">
                    {service.highlightTag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-soft-cream group-hover:text-warm-coral transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-warm-coral tracking-wide uppercase mt-0.5">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sm text-cream-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-soft-cream mb-2">
                    Key Scope Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-soft-cream/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-warm-coral flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-navy-border/60 flex items-center justify-between">
                <span className="text-xs text-cream-muted/70 italic">
                  Custom quote tailored to project scope
                </span>

                <button
                  onClick={onOpenQuote}
                  data-cursor="magnetic"
                  className="px-4 py-2.5 bg-warm-coral hover:bg-coral-light text-indigo-navy text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-coral-glow"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-navy" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
