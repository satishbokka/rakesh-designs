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
    const text = `Hi Rakesh Designs, I'm interested in getting a design. I'd like to discuss my requirements.\n\nDetails:\n- Name: ${name}\n- Contact: ${phone}\n- Service Interest: ${serviceTitle}\n- Project Brief: ${message}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encoded}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Copy & WhatsApp Conversion */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest px-3.5 py-1 bg-dark-card border border-dark-border rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Connect</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
              Have a project in mind?
            </h2>

            <p className="text-base sm:text-lg text-offwhite-muted leading-relaxed font-medium">
              Let's turn your idea into something people remember.
            </p>

            {/* Prominent Instant WhatsApp Conversion Card */}
            <div className="space-y-4 pt-2">
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
                    <span className="text-xs font-extrabold text-near-black/80 uppercase block">Direct Consultation</span>
                    <span className="font-display font-extrabold text-lg text-near-black">
                      Chat on WhatsApp →
                    </span>
                  </div>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href={`tel:+91${STUDIO_INFO.phone.replace(/[^0-9]/g, '')}`}
                data-cursor="magnetic"
                className="p-4 bg-dark-card border border-dark-border rounded-2xl flex items-center justify-between hover:border-warm-orange transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-warm-orange" />
                  <span className="text-xs font-bold text-light-bg">
                    Direct Phone: +91 {STUDIO_INFO.phone}
                  </span>
                </div>
                <span className="text-xs text-warm-orange">Call →</span>
              </a>

              {/* Instagram & Behance Links */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-dark-card border border-dark-border rounded-xl text-xs font-semibold text-light-bg hover:border-warm-orange flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-4 h-4 text-warm-orange" />
                    <span>Instagram</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-warm-orange" />
                </a>

                <a
                  href={STUDIO_INFO.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-dark-card border border-dark-border rounded-xl text-xs font-semibold text-light-bg hover:border-warm-orange flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-warm-orange" />
                    <span>Behance</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-warm-orange" />
                </a>
              </div>

              {/* Location Badge */}
              <div className="p-3.5 bg-near-black border border-dark-border rounded-xl text-xs text-offwhite-muted flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-warm-orange flex-shrink-0" />
                <span>{STUDIO_INFO.location}</span>
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
                  Inquiry Received!
                </h3>
                <p className="text-sm text-offwhite-muted max-w-md mx-auto">
                  Opening WhatsApp to complete your consultation...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display text-2xl font-bold text-light-bg">
                  Send a Direct Message
                </h3>

                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-2">
                    Service Interest
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
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm"
                    />
                  </div>
                </div>

                {/* Message / Requirements */}
                <div>
                  <label className="block text-xs font-bold text-light-bg uppercase tracking-wider mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your design requirements, dimensions, deadline, or text details..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-dark-border bg-near-black text-light-bg placeholder:text-offwhite-muted/50 focus:outline-none focus:border-warm-orange text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    data-cursor="magnetic"
                    className="w-full sm:flex-1 py-4 bg-warm-orange hover:bg-orange-light text-near-black rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-orange-glow transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-near-black" />
                    <span>Get in Touch</span>
                  </button>

                  <a
                    href="#portfolio"
                    onClick={handleViewWork}
                    className="w-full sm:w-auto px-6 py-4 border border-dark-border hover:border-warm-orange text-light-bg rounded-xl font-semibold text-xs text-center transition-colors cursor-pointer"
                  >
                    View Our Work
                  </a>
                </div>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
