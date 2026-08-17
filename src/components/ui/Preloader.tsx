'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { STUDIO_INFO } from '@/lib/constants';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 25) + 15);
      });
    }, 60);

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 300);
    }, 900);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ y: '-100%', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        className="fixed inset-0 z-50 bg-dark-bg text-warm-offwhite flex flex-col items-center justify-between p-8 sm:p-12 select-none pointer-events-none"
      >
        {/* Top Brand Mark */}
        <div className="w-full flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-semibold text-vivid-teal">
            {STUDIO_INFO.name} Studio
          </span>
          <span className="text-xs text-warm-offwhite/60">
            © {new Date().getFullYear()}
          </span>
        </div>

        {/* Center Logo Emblem & Title */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden"
          >
            <Image
              src="/assets/logo.png"
              alt="Rakesh Designs Emblem"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="space-y-1">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-warm-offwhite">
              {STUDIO_INFO.name}
            </h1>
            <p className="text-[11px] sm:text-xs text-vivid-teal uppercase tracking-widest font-semibold">
              Bespoke Visual Identity & Studio Retouching
            </p>
          </div>
        </div>

        {/* Bottom Counter & Progress Line */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-warm-offwhite/70 tracking-wider">Initialising Studio</span>
            <span className="font-display font-bold text-vivid-teal text-sm">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-warm-offwhite/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-vivid-teal rounded-full transition-all duration-150 ease-out shadow-teal-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
