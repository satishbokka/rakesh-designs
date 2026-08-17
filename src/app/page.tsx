'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import SignatureScrollSection from '@/components/sections/SignatureScrollSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactSection from '@/components/sections/ContactSection';
import QuoteModal from '@/components/ui/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-indigo-navy text-soft-cream relative selection:bg-warm-coral selection:text-indigo-navy">
        {/* Studio Intro Preloader */}
        <Preloader />

        {/* Custom Magnetic Ring Cursor */}
        <CustomCursor />

        {/* Floating Studio Navbar */}
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 1. Hero Section with 3D Parallax Canvas */}
        <HeroSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 2. Signature Exploded 3D Scroll Sequence (Centerpiece Experience) */}
        <SignatureScrollSection />

        {/* 3. Interactive 3D Work Pinned Portfolio Gallery */}
        <PortfolioSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 4. Reframed Premium Services & Disciplines */}
        <ServicesSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 5. Studio Story & Credibility */}
        <AboutSection />

        {/* 6. Contact & Direct Lead Builder with Real Studio Channels */}
        <ContactSection />

        {/* Studio Footer */}
        <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Global Interactive Quote / Inquiry Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
