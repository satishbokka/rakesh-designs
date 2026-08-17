'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageSquare } from 'lucide-react';
import { SERVICES, STUDIO_INFO } from '@/lib/constants';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceTitle = SERVICES.find((s) => s.id === selectedService)?.title || selectedService;
    const text = `Hello Rakesh Designs!\n\nNew Quote Request:\n- Name: ${name}\n- Contact: ${phone}\n- Service Interest: ${serviceTitle}\n- Details: ${details}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-near-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 text-light-bg shadow-2xl space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-near-black border border-dark-border text-light-bg/70 hover:text-warm-orange transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-orange uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Quote Estimator</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-light-bg">
              Start Your Project Inquiry
            </h3>
            <p className="text-xs text-offwhite-muted">
              Select your design category interest and we will connect instantly via WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                Design Category
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg focus:outline-none focus:border-warm-orange text-sm font-medium"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id} className="bg-near-black text-light-bg">
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                Project Details / Specifications
              </label>
              <textarea
                rows={3}
                placeholder="Mention size (e.g. 10x6 ft flex), deadline, or special photo enhancement requests..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-warm-orange hover:bg-orange-light text-near-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-near-black" />
              <span>Connect on WhatsApp</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
