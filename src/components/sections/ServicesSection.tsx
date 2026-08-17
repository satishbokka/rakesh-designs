'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Frame, Sparkles, Wand2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES, ServiceCategory } from '@/lib/constants';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Printer: <Printer className="w-6 h-6 text-warm-orange" />,
  Wand2: <Wand2 className="w-6 h-6 text-warm-orange" />,
  Frame: <Frame className="w-6 h-6 text-warm-orange" />,
  Sparkles: <Sparkles className="w-6 h-6 text-warm-orange" />,
};

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const handleNavScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest px-3.5 py-1 bg-dark-card border border-dark-border rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Disciplines</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
            What We Create
          </h2>

          <p className="text-sm sm:text-base text-offwhite-muted">
            Crafted design services tailored for events, commercial printing, social media, and photo editing.
          </p>
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service: ServiceCategory, idx: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 hover:shadow-premium-hover hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-near-black border border-dark-border flex items-center justify-center group-hover:border-warm-orange transition-colors">
                    {iconMap[service.iconName] || <Sparkles className="w-6 h-6 text-warm-orange" />}
                  </div>

                  <span className="font-display font-bold text-xl text-warm-orange opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.number}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-light-bg group-hover:text-warm-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-warm-orange tracking-wide uppercase mt-0.5">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sm text-offwhite-muted leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Scope */}
                <div className="pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-light-bg/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-warm-orange flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-dark-border/60 flex items-center justify-between">
                <span className="text-xs text-offwhite-muted/70 italic">
                  Custom inquiries welcome
                </span>

                <a
                  href="#contact"
                  onClick={(e) => handleNavScroll(e, '#contact')}
                  data-cursor="magnetic"
                  className="px-4 py-2.5 bg-warm-orange hover:bg-orange-light text-near-black text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-orange-glow cursor-pointer"
                >
                  <span>Let's talk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-near-black" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
