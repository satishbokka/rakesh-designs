'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram, MessageSquare, Phone, MapPin, Sparkles, CheckCircle2, ArrowUpRight, ExternalLink } from 'lucide-react';
import { STUDIO_INFO, SERVICES } from '@/lib/constants';

export default function ContactSection() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const serviceTitle = SERVICES.find((s) => s.id === selectedService)?.title || selectedService;
    const text = `Hello Rakesh Designs!\n\nNew Project Inquiry:\n- Name: ${name}\n- Contact: ${phone}\n- Service Interest: ${serviceTitle}\n- Details: ${message}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encoded}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-navy-dark text-soft-cream relative border-t border-navy-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Real Studio Contact Channels & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-coral uppercase tracking-widest px-3.5 py-1 bg-navy-card border border-navy-border rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start a Conversation</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-soft-cream tracking-tight">
              Ready to Craft Your Next Visual Project?
            </h2>

            <p className="text-sm sm:text-base text-cream-muted leading-relaxed">
              Whether you need large-format flex printing, bespoke canvas frames, or a signature CDP for an upcoming event, we are here to bring your vision to life.
            </p>

            {/* Real Studio Contact Channels */}
            <div className="space-y-4 pt-2">
              
              {/* Direct Phone Call / WhatsApp */}
              <a
                href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`}
                data-cursor="magnetic"
                className="p-5 bg-navy-card border border-navy-border rounded-2xl flex items-center justify-between hover:border-warm-coral hover:shadow-premium-hover transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-coral/10 border border-warm-coral/20 flex items-center justify-center text-warm-coral group-hover:bg-warm-coral group-hover:text-indigo-navy transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cream-muted uppercase block">Direct Phone</span>
                    <span className="font-display font-bold text-base text-soft-cream group-hover:text-warm-coral transition-colors">
                      +91 {STUDIO_INFO.phone}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-coral group-hover:translate-x-1 transition-transform">
                  Call →
                </span>
              </a>

              {/* Instant WhatsApp Direct Card */}
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-warm-coral text-indigo-navy rounded-2xl flex items-center justify-between hover:bg-coral-light hover:shadow-coral-glow transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-navy/20 flex items-center justify-center text-indigo-navy">
                    <MessageSquare className="w-6 h-6 text-indigo-navy" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-indigo-navy/80 uppercase block">Instant WhatsApp</span>
                    <span className="font-display font-extrabold text-base text-indigo-navy">
                      Chat on WhatsApp
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-indigo-navy group-hover:translate-x-1 transition-transform">
                  Message →
                </span>
              </a>

              {/* Instagram Card */}
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-navy-card border border-navy-border rounded-2xl flex items-center justify-between hover:border-warm-coral hover:shadow-premium-hover transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-coral/10 border border-warm-coral/20 flex items-center justify-center text-warm-coral group-hover:bg-warm-coral group-hover:text-indigo-navy transition-colors">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cream-muted uppercase block">Instagram Live Feed</span>
                    <span className="font-display font-bold text-base text-soft-cream group-hover:text-warm-coral transition-colors">
                      {STUDIO_INFO.instagramHandle}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-coral group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Follow <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Behance Portfolio Link */}
              <a
                href={STUDIO_INFO.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-navy-card border border-navy-border rounded-2xl flex items-center justify-between hover:border-warm-coral hover:shadow-premium-hover transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-coral/10 border border-warm-coral/20 flex items-center justify-center text-warm-coral group-hover:bg-warm-coral group-hover:text-indigo-navy transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-cream-muted uppercase block">Behance Studio Portfolio</span>
                    <span className="font-display font-bold text-base text-soft-cream group-hover:text-warm-coral transition-colors">
                      behance.net/rakeshmangam
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-coral group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Location Badge */}
              <div className="p-4 bg-indigo-navy border border-navy-border rounded-2xl text-xs space-y-1 text-cream-muted flex items-center gap-3">
                <MapPin className="w-5 h-5 text-warm-coral flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-warm-coral uppercase block">Studio Location</span>
                  <span className="font-semibold text-soft-cream text-sm">{STUDIO_INFO.location}</span>
                </div>
              </div>

            </div>

          </motion.div>

          {/* Right Column: Contact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-navy-card border border-navy-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-premium"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-warm-coral text-indigo-navy rounded-full flex items-center justify-center mx-auto shadow-coral-glow">
                  <CheckCircle2 className="w-8 h-8 text-indigo-navy" />
                </div>
                <h3 className="font-display text-2xl font-bold text-soft-cream">
                  Thank You for Your Inquiry!
                </h3>
                <p className="text-sm text-cream-muted max-w-md mx-auto">
                  Opening WhatsApp to launch direct chat with Rakesh Designs...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-soft-cream">
                  Send a Direct Project Brief
                </h3>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-2">
                    Select Discipline Interest
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-border bg-indigo-navy text-soft-cream focus:outline-none focus:border-warm-coral text-sm font-medium"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} className="bg-indigo-navy text-soft-cream">
                        {s.title} ({s.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-navy-border bg-indigo-navy text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                      WhatsApp / Mobile *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Phone or WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-navy-border bg-indigo-navy text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm"
                    />
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-bold text-soft-cream uppercase tracking-wider mb-1.5">
                    Project Requirements / Deadline
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your design vision, dimensions, text details, or required delivery date..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-border bg-indigo-navy text-soft-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-warm-coral text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="magnetic"
                  className="w-full py-4 bg-warm-coral hover:bg-coral-light text-indigo-navy rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-coral-glow transition-all"
                >
                  <Send className="w-4 h-4 text-indigo-navy" />
                  <span>Submit Inquiry & Connect</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
