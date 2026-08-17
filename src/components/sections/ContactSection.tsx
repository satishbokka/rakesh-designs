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
    <section id="contact" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
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
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest px-3.5 py-1 bg-dark-card border border-dark-border rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start a Project</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
              Get a Quote for Your Next Design Project.
            </h2>

            <p className="text-sm sm:text-base text-offwhite-muted leading-relaxed">
              Whether you need flex printing, bespoke photo frames, or custom social media posters, we are ready to bring your vision to life.
            </p>

            {/* Real Studio Contact Channels */}
            <div className="space-y-4 pt-2">
              
              {/* Direct Phone Call */}
              <a
                href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`}
                data-cursor="magnetic"
                className="p-5 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-between hover:border-warm-orange hover:shadow-premium-hover transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-orange/10 border border-warm-orange/20 flex items-center justify-center text-warm-orange group-hover:bg-warm-orange group-hover:text-near-black transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-offwhite-muted uppercase block">Direct Phone</span>
                    <span className="font-display font-bold text-base text-light-bg group-hover:text-warm-orange transition-colors">
                      +91 {STUDIO_INFO.phone}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-orange group-hover:translate-x-1 transition-transform">
                  Call →
                </span>
              </a>

              {/* Instant WhatsApp Direct Card */}
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-warm-orange text-near-black rounded-2xl flex items-center justify-between hover:bg-orange-light hover:shadow-orange-glow transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-near-black/20 flex items-center justify-center text-near-black">
                    <MessageSquare className="w-6 h-6 text-near-black" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-near-black/80 uppercase block">Instant WhatsApp</span>
                    <span className="font-display font-extrabold text-base text-near-black">
                      Chat on WhatsApp
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-near-black group-hover:translate-x-1 transition-transform">
                  Message →
                </span>
              </a>

              {/* Instagram Card */}
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-between hover:border-warm-orange hover:shadow-premium-hover transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-orange/10 border border-warm-orange/20 flex items-center justify-center text-warm-orange group-hover:bg-warm-orange group-hover:text-near-black transition-colors">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-offwhite-muted uppercase block">Instagram Live Work</span>
                    <span className="font-display font-bold text-base text-light-bg group-hover:text-warm-orange transition-colors">
                      {STUDIO_INFO.instagramHandle}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-orange group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Follow <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Behance Portfolio Link */}
              <a
                href={STUDIO_INFO.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magnetic"
                className="p-5 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-between hover:border-warm-orange hover:shadow-premium-hover transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warm-orange/10 border border-warm-orange/20 flex items-center justify-center text-warm-orange group-hover:bg-warm-orange group-hover:text-near-black transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-offwhite-muted uppercase block">Behance Studio Portfolio</span>
                    <span className="font-display font-bold text-base text-light-bg group-hover:text-warm-orange transition-colors">
                      behance.net/rakeshmangam
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-warm-orange group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>

              {/* Location Badge */}
              <div className="p-4 bg-near-black border border-dark-border rounded-2xl text-xs space-y-1 text-offwhite-muted flex items-center gap-3">
                <MapPin className="w-5 h-5 text-warm-orange flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-warm-orange uppercase block">Studio Location</span>
                  <span className="font-semibold text-light-bg text-sm">{STUDIO_INFO.location}</span>
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
            className="lg:col-span-7 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-premium"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-warm-orange text-near-black rounded-full flex items-center justify-center mx-auto shadow-orange-glow">
                  <CheckCircle2 className="w-8 h-8 text-near-black" />
                </div>
                <h3 className="font-display text-2xl font-bold text-light-bg">
                  Thank You for Your Inquiry!
                </h3>
                <p className="text-sm text-offwhite-muted max-w-md mx-auto">
                  Opening WhatsApp to launch direct chat with Rakesh Designs...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-light-bg">
                  Send a Direct Project Brief
                </h3>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-2">
                    Select Discipline Interest
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg focus:outline-none focus:border-warm-orange text-sm font-medium"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} className="bg-near-black text-light-bg">
                        {s.title} ({s.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                      WhatsApp / Mobile *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Phone or WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm"
                    />
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                    Project Details / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your design vision, dimensions, text details, or required delivery date..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-cursor="magnetic"
                  className="w-full py-4 bg-warm-orange hover:bg-orange-light text-near-black rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-orange-glow transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-near-black" />
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
