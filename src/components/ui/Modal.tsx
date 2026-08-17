'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '@/lib/constants';

interface ModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function Modal({ item, onClose, onOpenQuote }: ModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-dark-bg/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-navy-card border border-navy-border rounded-3xl overflow-hidden text-warm-offwhite shadow-2xl my-8 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-charcoal-navy/80 border border-navy-border text-warm-offwhite/80 hover:text-vivid-teal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Artwork Image Showcase */}
          <div className="w-full md:w-1/2 relative bg-dark-bg min-h-[280px] sm:min-h-[360px] md:min-h-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Project Details & Deliverables */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-vivid-teal px-3 py-1 bg-charcoal-navy rounded-full border border-navy-border">
                  {item.categoryLabel}
                </span>
                <span className="text-xs text-offwhite-muted font-semibold">
                  {item.year}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-warm-offwhite leading-tight">
                {item.title}
              </h3>

              <p className="text-sm text-offwhite-muted leading-relaxed">
                {item.description}
              </p>

              {/* Deliverables Scope */}
              <div className="pt-2 border-t border-navy-border/60 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-warm-offwhite">
                  Included Deliverables:
                </h4>
                <div className="space-y-1.5">
                  {item.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-warm-offwhite/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-vivid-teal flex-shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Footer */}
            <div className="pt-4 border-t border-navy-border/60 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="w-full py-3 bg-vivid-teal hover:bg-teal-light text-charcoal-navy font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-teal-glow transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-charcoal-navy" />
                <span>Request Similar Project</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
