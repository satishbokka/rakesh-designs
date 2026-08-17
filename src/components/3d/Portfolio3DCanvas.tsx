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
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, item.image);
  const [hovered, setHovered] = useState(false);

  const currentAngle = angle + rotationOffset;
  const x = Math.sin(currentAngle) * radius;
  const z = Math.cos(currentAngle) * radius - radius;
  const rotY = currentAngle;

  const isFront = Math.abs(currentAngle % (Math.PI * 2)) < 0.35;

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.x += (x - meshRef.current.position.x) * 0.1;
    meshRef.current.position.z += (z - meshRef.current.position.z) * 0.1;
    meshRef.current.rotation.y += (rotY - meshRef.current.rotation.y) * 0.1;

    // Center artwork occupies ~65-80% of showcase area on mobile
    const baseScale = isMobile ? 1.55 : 1.45;
    const sideScale = isMobile ? 0.62 : 0.82;
    const targetScale = hovered ? baseScale * 1.08 : isFront ? baseScale : sideScale;

    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
  });

  return (
    <mesh
      ref={meshRef}
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
      {/* Natural aspect ratio plane dimensions */}
      <planeGeometry args={[2.6, 3.4]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.2}
        metalness={0.05}
        transparent={true}
      />
    </mesh>
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
  const radius = isMobile ? 3.6 : 4.4;

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
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
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

  if (!mounted) {
    return <div className="w-full h-[420px] sm:h-[540px] md:h-[640px] bg-dark-card rounded-3xl animate-pulse" />;
  }

  if (hasError) {
    return (
      <div className="w-full h-[420px] bg-dark-card rounded-3xl p-6 flex items-center justify-center text-center border border-dark-border">
        <p className="text-sm font-semibold text-light-bg">
          WebGL preview suspended. Switch to Grid View above to view all portfolio items.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[420px] sm:h-[540px] md:h-[640px] relative select-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-gradient-to-b from-dark-card/90 via-near-black to-near-black border border-dark-border shadow-premium"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 3.4 : 3.8], fov: isMobile ? 50 : 45 }}
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

      {/* Exact Instruction Overlay */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 bg-near-black/90 border border-dark-border text-light-bg/90 text-[11px] tracking-wider rounded-full backdrop-blur-md shadow-lg pointer-events-none z-10 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-warm-orange animate-ping" />
        <span>Drag left / right • Tap to view</span>
      </div>
    </div>
  );
}
