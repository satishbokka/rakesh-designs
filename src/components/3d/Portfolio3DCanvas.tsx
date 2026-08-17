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
}

function CarouselCard({ item, angle, radius, rotationOffset, onSelect }: CarouselCardProps) {
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

    const targetScale = hovered ? 1.15 : isFront ? 1.05 : 0.88;
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
      <planeGeometry args={[1.7, 2.3]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.25}
        metalness={0.1}
        transparent={true}
      />
    </mesh>
  );
}

interface CarouselGroupProps {
  items: PortfolioItem[];
  rotationOffset: number;
  onSelect: (item: PortfolioItem) => void;
}

function CarouselGroup({ items, rotationOffset, onSelect }: CarouselGroupProps) {
  const groupRef = useRef<Group>(null);
  const count = items.length || 1;
  const radius = 3.6;

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
    setRotationOffset((prev) => prev + deltaX * 0.005);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  if (!mounted) {
    return <div className="w-full h-[480px] bg-warm-ivory rounded-2xl animate-pulse" />;
  }

  if (hasError) {
    return (
      <div className="w-full h-[480px] bg-warm-sand/30 rounded-3xl p-6 flex items-center justify-center text-center">
        <p className="text-sm font-semibold text-deep-forest">
          WebGL preview suspended. Switch to Grid View above to view all portfolio items.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-[460px] md:h-[550px] relative select-none cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden bg-gradient-to-b from-warm-sand/30 via-warm-ivory to-warm-ivory border border-warm-border/50 shadow-inner"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.6 : 4.6], fov: isMobile ? 55 : 45 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasError(true);
          });
        }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.3} />
        <pointLight position={[-4, -2, 3]} intensity={0.6} color="#C5623A" />
        <Suspense fallback={null}>
          <CarouselGroup
            items={items}
            rotationOffset={rotationOffset}
            onSelect={onSelectItem}
          />
        </Suspense>
      </Canvas>

      {/* Interactive Helper Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-charcoal/85 text-warm-ivory text-xs tracking-wider rounded-full backdrop-blur-md shadow-lg pointer-events-none z-10">
        <span className="w-2 h-2 rounded-full bg-burnt-terracotta animate-ping" />
        Drag left / right to rotate 3D showcase • Click to view details
      </div>
    </div>
  );
}
