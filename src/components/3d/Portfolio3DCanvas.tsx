'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh, Group } from 'three';
import { PortfolioItem } from '@/lib/constants';

interface CarouselCardProps {
  item: PortfolioItem;
  angle: number;
  radius: number;
  rotationOffset: number;
  onSelect: (item: PortfolioItem) => void;
  isMobile: boolean;
}

function CarouselCard({ item, angle, radius, rotationOffset, onSelect, isMobile }: CarouselCardProps) {
  const groupRef = useRef<Group>(null);
  const texture = useLoader(TextureLoader, item.image);
  const [hovered, setHovered] = useState(false);

  // Calculate precise aspect ratio to prevent stretching, squashing, or cropping
  let aspect = 0.8;
  if (texture?.image?.width && texture?.image?.height) {
    aspect = texture.image.width / texture.image.height;
  } else if (item.aspectRatio === 'aspect-[3/4]') {
    aspect = 0.75;
  } else if (item.aspectRatio === 'aspect-[4/5]') {
    aspect = 0.8;
  } else if (item.aspectRatio === 'aspect-[1/1]') {
    aspect = 1.0;
  } else if (item.aspectRatio === 'aspect-[16/9]') {
    aspect = 16 / 9;
  }

  const baseH = 3.2;
  let planeW = baseH * aspect;
  let planeH = baseH;

  if (aspect > 1.3) {
    planeW = 3.8;
    planeH = 3.8 / aspect;
  }

  const currentAngle = angle + rotationOffset;
  const x = Math.sin(currentAngle) * radius;
  const z = Math.cos(currentAngle) * radius - radius;
  const rotY = currentAngle;

  const normAngle = Math.atan2(Math.sin(currentAngle), Math.cos(currentAngle));
  const isFront = Math.abs(normAngle) < 0.42;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x += (x - groupRef.current.position.x) * 0.12;
    groupRef.current.position.z += (z - groupRef.current.position.z) * 0.12;
    groupRef.current.rotation.y += (rotY - groupRef.current.rotation.y) * 0.12;

    const baseScale = isMobile ? 1.65 : 1.45;
    const sideScale = isMobile ? 0.55 : 0.76;
    const targetScale = hovered ? baseScale * 1.06 : isFront ? baseScale : sideScale;

    groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.12;
    groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      rotation={[0, rotY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(item);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      {/* 3D Physical Card Backing */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[planeW + 0.08, planeH + 0.08]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>

      {/* Main Artwork Texture Plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[planeW, planeH]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.02}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

interface CarouselGroupProps {
  items: PortfolioItem[];
  rotationOffset: number;
  onSelect: (item: PortfolioItem) => void;
  isMobile: boolean;
}

function CarouselGroup({ items, rotationOffset, onSelect, isMobile }: CarouselGroupProps) {
  const groupRef = useRef<Group>(null);
  const count = items.length || 1;
  const radius = isMobile ? 3.3 : 4.4;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {items.map((item, index) => {
        const angle = (index / count) * Math.PI * 2;
        return (
          <CarouselCard
            key={item.id}
            item={item}
            angle={angle}
            radius={radius}
            rotationOffset={rotationOffset}
            onSelect={onSelect}
            isMobile={isMobile}
          />
        );
      })}
    </group>
  );
}

interface Portfolio3DCanvasProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
  rotationOffset: number;
  setRotationOffset: React.Dispatch<React.SetStateAction<number>>;
}

export default function Portfolio3DCanvas({
  items,
  onSelectItem,
  rotationOffset,
  setRotationOffset,
}: Portfolio3DCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isDragging = useRef(false);
  const previousTouchX = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    previousTouchX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousTouchX.current;
    previousTouchX.current = e.clientX;
    setRotationOffset((prev) => prev + deltaX * 0.007);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Only initialize the heavy WebGL context once this element is near the viewport.
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className="w-full h-[460px] sm:h-[560px] md:h-[640px] bg-dark-card rounded-3xl animate-pulse flex items-center justify-center border border-dark-border"
      >
        <span className="text-xs font-semibold text-offwhite-muted/60 tracking-widest uppercase">
          Loading showcase…
        </span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-[460px] bg-dark-card rounded-3xl p-6 flex items-center justify-center text-center border border-dark-border">
        <p className="text-sm font-semibold text-light-bg">
          WebGL preview suspended. Switch to Grid View above to view all portfolio items.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[460px] sm:h-[560px] md:h-[640px] relative select-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-gradient-to-b from-dark-card/90 via-near-black to-near-black border border-dark-border shadow-premium"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 3.0 : 3.6], fov: isMobile ? 48 : 42 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasError(true);
          });
        }}
      >
        <color attach="background" args={['#0D0D0D']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <pointLight position={[-4, -2, 3]} intensity={0.8} color="#FF8900" />
        <Suspense fallback={null}>
          <CarouselGroup
            items={items}
            rotationOffset={rotationOffset}
            onSelect={onSelectItem}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* Exact Interaction Guidance Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 bg-near-black/90 border border-dark-border text-light-bg/90 text-[11px] font-medium tracking-wider rounded-full backdrop-blur-md shadow-lg pointer-events-none z-10 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-warm-orange animate-ping" />
        <span>Drag left / right • Tap to view</span>
      </div>
    </div>
  );
}
