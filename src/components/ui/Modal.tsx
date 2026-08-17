'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PortfolioItem, STUDIO_INFO } from '@/lib/constants';

interface ModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function Modal({ item, onClose, onOpenQuote }: ModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-dark/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-indigo-navy border border-navy-border rounded-3xl shadow-2xl overflow-hidden overflow-y-auto z-10 text-soft-cream flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy-card hover:bg-warm-coral hover:text-indigo-navy transition-colors text-soft-cream"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Image Preview */}
          <div className="w-full md:w-1/2 relative bg-navy-dark p-6 flex items-center justify-center min-h-[300px] md:min-h-[480px]">
            <div className="relative w-full h-full max-h-[450px] aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-navy-border">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right Column: Project Details & Content */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-warm-coral tracking-wider uppercase mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.categoryLabel}</span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-soft-cream mb-4 leading-tight">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-cream-muted leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-navy-border/60 text-xs mb-6">
                <div>
                  <span className="text-cream-muted/70 block font-medium flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-warm-coral" /> Client
                  </span>
                  <span className="font-semibold text-soft-cream text-sm">{item.client}</span>
                </div>
                <div>
                  <span className="text-cream-muted/70 block font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-warm-coral" /> Year
                  </span>
                  <span className="font-semibold text-soft-cream text-sm">{item.year}</span>
                </div>
              </div>

              {/* Scope & Deliverables */}
              <div>
                <h4 className="text-xs font-bold text-soft-cream uppercase tracking-wider mb-3">
                  Scope & Deliverables
                </h4>
                <ul className="space-y-2">
                  {item.deliverables.map((del, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-soft-cream/90">
                      <CheckCircle2 className="w-4 h-4 text-warm-coral flex-shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-navy-border/60 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-warm-coral text-indigo-navy rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-coral-light transition-all shadow-coral-glow"
              >
                <span>Request Similar Project</span>
                <ArrowRight className="w-4 h-4 text-indigo-navy" />
              </button>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 border border-warm-coral text-warm-coral hover:bg-warm-coral hover:text-indigo-navy rounded-xl font-bold text-sm flex items-center justify-center transition-all"
              >
                Direct WhatsApp Inquiry
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
