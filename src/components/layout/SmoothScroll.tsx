'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis: Lenis | null = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2.0,
      });

      const updateGSAP = () => {
        ScrollTrigger.update();
      };

      lenis.on('scroll', updateGSAP);

      const rafFunc = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(rafFunc);
      gsap.ticker.lagSmoothing(0);

      return () => {
        if (lenis) {
          lenis.destroy();
        }
        gsap.ticker.remove(rafFunc);
      };
    } catch (err) {
      console.warn('Lenis smooth scroll initialization skipped:', err);
    }
  }, []);

  return <>{children}</>;
}
