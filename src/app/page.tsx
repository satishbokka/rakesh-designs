'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import Preloader from '@/components/ui/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import SignatureScrollSection from '@/components/sections/SignatureScrollSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import QuoteModal from '@/components/ui/QuoteModal';

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-near-black text-light-bg relative selection:bg-warm-orange selection:text-near-black">
        {/* Studio Intro Preloader */}
        <Preloader />

        {/* Custom Magnetic Ring Cursor */}
        <CustomCursor />

        {/* Floating Studio Navbar */}
        <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 1. Hero Section with 3D Depth Composition */}
        <HeroSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 2. Services ("What We Create") */}
        <ServicesSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 3. Portfolio ("Our Work") Centerpiece Showcase */}
        <PortfolioSection onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* 4. Signature Exploded 3D Photo Story */}
        <SignatureScrollSection />

        {/* 5. Why Rakesh Designs? (Trust Building) */}
        <WhyUsSection />

        {/* 6. Process (4-Step Workflow) */}
        <ProcessSection />

        {/* 7. Studio Story & Philosophy */}
        <AboutSection />

        {/* 8. Contact / Final Conversion CTA */}
        <ContactSection />

        {/* Studio Footer */}
        <Footer onOpenQuote={() => setIsQuoteOpen(true)} />

        {/* Interactive Quote / Project Inquiry Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
        />
      </main>
    </SmoothScroll>
  );
}
