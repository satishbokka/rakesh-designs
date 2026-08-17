'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, ChevronDown } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const SignatureScrollCanvas = dynamic(
  () => import('@/components/3d/SignatureScrollCanvas'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-navy-dark animate-pulse" />,
  }
);

export default function SignatureScrollSection() {
  const [progress, setProgress] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);

  const showcaseItems = PORTFOLIO_ITEMS.slice(0, 5);
  const totalItems = showcaseItems.length;

  useEffect(() => {
    if (!triggerRef.current || !pinTargetRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=2600',
        pin: pinTargetRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  // Determine active photo index (0 to 4)
  const activeIndex = Math.min(
    totalItems - 1,
    Math.max(0, Math.floor(progress * totalItems))
  );
  const activeItem = showcaseItems[activeIndex] || showcaseItems[0];

  return (
    <section ref={triggerRef} className="relative bg-navy-dark text-soft-cream min-h-screen">
      <div
        ref={pinTargetRef}
        className="w-full h-screen relative flex flex-col justify-between p-6 sm:p-10 overflow-hidden select-none"
      >
        {/* 3D Canvas Background Scene */}
        <div className="absolute inset-0 z-0">
          <SignatureScrollCanvas progress={progress} />
        </div>

        {/* Minimal UI Chrome: Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-3 bg-navy-dark/80 backdrop-blur-xl px-4 py-2 rounded-full border border-navy-border shadow-lg">
            <span className="w-2 h-2 rounded-full bg-warm-coral animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-soft-cream">
              EST. 2024 • BESPOKE CRAFT
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-soft-cream/80 bg-navy-dark/80 backdrop-blur-xl px-4 py-2 rounded-full border border-navy-border">
            <Layers className="w-3.5 h-3.5 text-warm-coral" />
            <span>Scroll-Driven Showcase Story</span>
          </div>
        </div>

        {/* Center Prompt (visible only at start) */}
        {progress < 0.12 && (
          <div className="relative z-10 text-center pointer-events-none self-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warm-coral text-indigo-navy rounded-full text-xs font-extrabold uppercase tracking-widest shadow-coral-glow animate-bounce">
              <ChevronDown className="w-4 h-4 text-indigo-navy" />
              <span>Scroll to reveal portfolio sequence</span>
            </div>
          </div>
        )}

        {/* Minimal UI Chrome: Bottom Status Panel & Photo Dots */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 w-full">
          
          {/* Active Photo Card Summary */}
          <div className="bg-navy-dark/85 backdrop-blur-xl p-5 rounded-2xl border border-navy-border max-w-md shadow-2xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-warm-coral">
                {activeItem.categoryLabel}
              </span>
              <span className="text-[11px] font-bold text-soft-cream/60">
                0{activeIndex + 1} / 0{totalItems}
              </span>
            </div>
            
            <h3 className="font-display font-bold text-lg text-soft-cream leading-tight">
              {activeItem.title}
            </h3>

            <p className="text-xs text-soft-cream/80 font-normal leading-relaxed line-clamp-2">
              {activeItem.description}
            </p>
          </div>

          {/* 5-Photo Progress Indicator Dots */}
          <div className="bg-navy-dark/85 backdrop-blur-xl px-5 py-3.5 rounded-2xl border border-navy-border flex flex-col gap-2 shadow-2xl">
            <div className="flex items-center gap-2">
              {showcaseItems.map((_, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeIndex
                      ? 'w-7 h-2 bg-warm-coral shadow-coral-glow'
                      : 'w-2 h-2 bg-soft-cream/30'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[10px] font-semibold text-soft-cream/70 tracking-wider uppercase">
              <span>Sequence</span>
              <span className="text-warm-coral font-bold">{Math.round(progress * 100)}%</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
