'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronLeft, ChevronRight, Eye, Grid, Box, Tag } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/lib/constants';
import Modal from '@/components/ui/Modal';

gsap.registerPlugin(ScrollTrigger);

const Portfolio3DCanvas = dynamic(() => import('@/components/3d/Portfolio3DCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-dark-card/50 rounded-3xl animate-pulse" />,
});

interface PortfolioSectionProps {
  onOpenQuote: () => void;
}

export default function PortfolioSection({ onOpenQuote }: PortfolioSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'branding', label: 'Branding' },
    { id: 'posters', label: 'Posters' },
    { id: 'flex', label: 'Flex & Banners' },
    { id: 'social', label: 'Social Media' },
    { id: 'editing', label: 'Photo Editing' },
    { id: 'frames', label: 'Custom Frames' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (viewMode !== '3d' || !pinWrapperRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinWrapperRef.current,
        start: 'top top+=80',
        end: '+=1200',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const newAngle = self.progress * (Math.PI * 2 * 1.2);
          setRotationOffset(newAngle);
        },
      });
    }, pinWrapperRef);

    return () => ctx.revert();
  }, [viewMode, selectedCategory]);

  const handlePrev = () => {
    setRotationOffset((prev) => prev + Math.PI / 3);
  };

  const handleNext = () => {
    setRotationOffset((prev) => prev - Math.PI / 3);
  };

  return (
    <section ref={sectionRef} id="portfolio" className="py-20 md:py-28 bg-near-black text-light-bg relative border-t border-dark-border/60">
      <div ref={pinWrapperRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-orange uppercase tracking-widest px-3.5 py-1 bg-dark-card border border-dark-border rounded-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Showcase</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-light-bg tracking-tight">
              Our Work
            </h2>

            <p className="text-sm sm:text-base text-offwhite-muted">
              Explore our gallery of design projects, custom photoframes, flex prints, and digital media.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-dark-card/80 p-1.5 rounded-2xl border border-dark-border self-start md:self-auto">
            <button
              onClick={() => setViewMode('3d')}
              data-cursor="magnetic"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-warm-orange text-near-black shadow-orange-glow'
                  : 'text-light-bg/70 hover:text-warm-orange'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Gallery</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              data-cursor="magnetic"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-warm-orange text-near-black shadow-orange-glow'
                  : 'text-light-bg/70 hover:text-warm-orange'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* 7 Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setRotationOffset(0);
              }}
              data-cursor="magnetic"
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-warm-orange border-warm-orange text-near-black shadow-orange-glow'
                  : 'bg-dark-card/50 border-dark-border hover:border-warm-orange text-light-bg'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Experience View */}
        {viewMode === '3d' ? (
          <div className="space-y-4">
            <div data-cursor="drag">
              <Portfolio3DCanvas
                items={filteredItems.length > 0 ? filteredItems : PORTFOLIO_ITEMS}
                onSelectItem={(item) => setActiveItem(item)}
                rotationOffset={rotationOffset}
                setRotationOffset={setRotationOffset}
              />
            </div>

            {/* 3D Controls Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-dark-card/60 border border-dark-border rounded-2xl">
              <button
                onClick={handlePrev}
                data-cursor="magnetic"
                className="px-4 py-2 bg-near-black border border-dark-border hover:border-warm-orange rounded-xl text-xs font-bold text-light-bg flex items-center gap-1 transition-all shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-warm-orange" />
                <span>Rotate Prev</span>
              </button>

              <span className="text-xs font-semibold text-offwhite-muted hidden sm:inline">
                Scroll page or drag left / right to scrub 3D rotation • {filteredItems.length} Pieces
              </span>

              <button
                onClick={handleNext}
                data-cursor="magnetic"
                className="px-4 py-2 bg-near-black border border-dark-border hover:border-warm-orange rounded-xl text-xs font-bold text-light-bg flex items-center gap-1 transition-all shadow-sm cursor-pointer"
              >
                <span>Rotate Next</span>
                <ChevronRight className="w-4 h-4 text-warm-orange" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filteredItems.length > 0 ? filteredItems : PORTFOLIO_ITEMS).map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => setActiveItem(item)}
                data-cursor="view"
                className="group relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-premium-hover transition-all"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-near-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-near-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-warm-orange text-near-black font-bold text-xs rounded-full shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-near-black" />
                      <span>Inspect Artwork</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-dark-card border-t border-dark-border/60">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-warm-orange uppercase tracking-wider mb-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.categoryLabel}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-light-bg group-hover:text-warm-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-offwhite-muted line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Project Lightbox Preview Modal */}
      <Modal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onOpenQuote={onOpenQuote}
      />
    </section>
  );
}
