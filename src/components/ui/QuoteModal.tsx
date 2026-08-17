'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageSquare, CheckCircle } from 'lucide-react';
import { SERVICES, STUDIO_INFO } from '@/lib/constants';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [budgetTier, setBudgetTier] = useState('standard');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const selectedServiceTitle = SERVICES.find((s) => s.id === selectedService)?.title || selectedService;
    const message = `Hello Rakesh Designs!\n\nNew Project Inquiry:\n- Name: ${name}\n- Contact: ${contact}\n- Service Interest: ${selectedServiceTitle}\n- Budget Scope: ${budgetTier.toUpperCase()}\n- Project Details: ${details}`;
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

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

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-indigo-navy border border-navy-border rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 z-10 text-soft-cream max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-navy-card hover:bg-warm-coral hover:text-indigo-navy transition-colors text-soft-cream"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-warm-coral text-indigo-navy rounded-full flex items-center justify-center mx-auto shadow-coral-glow"
              >
                <CheckCircle className="w-8 h-8 text-indigo-navy" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-soft-cream">Inquiry Generated!</h3>
              <p className="text-sm text-cream-muted max-w-md mx-auto">
                Opening WhatsApp to connect directly with Rakesh Designs... You can also message anytime on Instagram <strong className="text-warm-coral">{STUDIO_INFO.instagramHandle}</strong>.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 bg-warm-coral text-indigo-navy rounded-xl text-sm font-bold hover:bg-coral-light transition-all shadow-coral-glow"
              >
                Return to Portfolio
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-warm-coral uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Custom Project Inquiry</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-soft-cream mb-2">
                Start a Studio Project
              </h3>
              <p className="text-xs sm:text-sm text-cream-muted mb-6">
                Tell us about your visual vision. Premium custom quotes are provided within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Select Service Category */}
                <div>
                  <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-3">
                    1. Select Service Discipline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                          selectedService === s.id
                            ? 'border-warm-coral bg-warm-coral text-indigo-navy shadow-coral-glow'
                            : 'border-navy-border bg-navy-card hover:border-warm-coral text-soft-cream'
                        }`}
                      >
                        <span className="font-bold text-sm mb-1">{s.title}</span>
                        <span className={`text-[11px] ${selectedService === s.id ? 'text-indigo-navy/90 font-medium' : 'text-cream-muted'}`}>
                          {s.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Budget Tier */}
                <div>
                  <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-3">
                    2. Project Scope / Tier
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'standard', title: 'Single Asset', desc: 'Single CDP or Frame' },
                      { id: 'studio', title: 'Studio Package', desc: 'Full Event / Print' },
                      { id: 'bespoke', title: 'Bespoke Campaign', desc: 'Multi-Asset Retouch' },
                    ].map((tier) => (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setBudgetTier(tier.id)}
                        className={`p-3 rounded-xl border text-center text-xs transition-all ${
                          budgetTier === tier.id
                            ? 'border-warm-coral bg-warm-coral text-indigo-navy font-bold shadow-coral-glow'
                            : 'border-navy-border bg-navy-card hover:border-warm-coral text-soft-cream'
                        }`}
                      >
                        <div className="font-semibold">{tier.title}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">{tier.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-border bg-navy-card text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98765 43210"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-navy-border bg-navy-card text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm"
                    />
                  </div>
                </div>

                {/* 4. Project Details */}
                <div>
                  <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                    Project Vision & Specifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe dimensions, photo requirements, wording, or deadlines..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-navy-border bg-navy-card text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 px-6 bg-warm-coral hover:bg-coral-light text-indigo-navy rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-coral-glow transition-all"
                  >
                    <Send className="w-4 h-4 text-indigo-navy" />
                    <span>Send Inquiry & Connect</span>
                  </button>

                  <a
                    href={STUDIO_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3.5 border border-warm-coral text-warm-coral hover:bg-warm-coral hover:text-indigo-navy rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp</span>
                  </a>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
