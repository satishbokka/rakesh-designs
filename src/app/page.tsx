'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import SignatureScrollSection from '@/components/sections/SignatureScrollSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ContactSection from '@/components/sections/ContactSection';
import QuoteModal from '@/components/ui/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-near-black text-light-bg relative selection:bg-warm-orange selection:text-near-black">
        {/* Custom Magnetic Ring Cursor */}
        <CustomCursor />

        {/* Floating Navbar */}
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 1. Hero Section */}
        <HeroSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 2. Services ("What We Create") */}
        <ServicesSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 3. Portfolio ("Our Work") Centerpiece */}
        <PortfolioSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 4. Signature 3D Photo Showcase */}
        <SignatureScrollSection />

        {/* 5. Why Rakesh Designs? (Concise Trust Points) */}
        <WhyUsSection />

        {/* 6. Minimal Contact ("Let's talk.") */}
        <ContactSection />

        {/* Footer */}
        <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Direct Inquiry Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
