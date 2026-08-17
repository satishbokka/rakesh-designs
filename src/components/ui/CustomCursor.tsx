'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const attr = cursorTarget.getAttribute('data-cursor');
        setIsHovered(true);
        if (attr === 'view') setCursorText('VIEW');
        else if (attr === 'drag') setCursorText('DRAG 3D');
        else if (attr === 'magnetic') setCursorText('');
        else setCursorText(attr || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-warm-coral rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-coral-glow"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Fluid Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full border border-warm-coral/50 pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          width: isHovered ? 72 : 48,
          height: isHovered ? 72 : 48,
          backgroundColor: isHovered ? 'rgba(255, 107, 74, 0.9)' : 'rgba(255, 107, 74, 0.08)',
          borderColor: isHovered ? 'rgba(255, 133, 107, 1)' : 'rgba(255, 107, 74, 0.4)',
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 250, mass: 0.15 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-navy"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
