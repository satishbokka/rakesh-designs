'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { Float } from '@react-three/drei';

interface FloatingCardProps {
  imagePath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  speed?: number;
}

function FloatingCard({ imagePath, position, rotation, scale, speed = 1.5 }: FloatingCardProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, imagePath);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.12;
    const mx = state.mouse.x * 0.25;
    const my = state.mouse.y * 0.25;
    meshRef.current.rotation.y = rotation[1] + mx * 0.15;
    meshRef.current.rotation.x = rotation[0] - my * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1.3]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.25}
        metalness={0.1}
        transparent={true}
      />
    </mesh>
  );
}

function FloatingComposition() {
  return (
    <group position={[0, 0, 0]}>
      {/* Central hero artwork card */}
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <FloatingCard
          imagePath="/assets/Photo1.jpeg"
          position={[0.1, 0.05, 0.4]}
          rotation={[0.04, -0.12, -0.04]}
          scale={[2.2, 2.8, 1]}
          speed={1.1}
        />
      </Float>

      {/* Secondary accent artwork card - top left */}
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
        <FloatingCard
          imagePath="/assets/photo2.jpeg"
          position={[-2.0, 1.1, -0.4]}
          rotation={[0.08, 0.18, 0.08]}
          scale={[1.6, 2.1, 1]}
          speed={1.4}
        />
      </Float>

      {/* Tertiary accent artwork card - bottom right */}
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.4}>
        <FloatingCard
          imagePath="/assets/photo3.jpeg"
          position={[2.1, -1.0, -0.2]}
          rotation={[-0.08, -0.2, -0.06]}
          scale={[1.7, 2.2, 1]}
          speed={1.3}
        />
      </Float>

      {/* Studio Emblem Badge */}
      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <FloatingCard
          imagePath="/assets/logo.png"
          position={[1.6, 1.4, 0.2]}
          rotation={[-0.04, -0.08, 0.1]}
          scale={[1.3, 1.3, 1]}
          speed={1.8}
        />
      </Float>
    </group>
  );
}

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Defer WebGL initialization until after the hero text / CTAs have painted.
    // requestIdleCallback lets the browser finish the first meaningful paint first;
    // fall back to a short setTimeout for Safari which lacks rIC support.
    const schedule =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) => (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(cb)
        : (cb: () => void) => setTimeout(cb, 50);

    schedule(() => {
      setMounted(true);
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    return () => {
      // cleanup is best-effort; the listener is attached only after mount
    };
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-warm-ivory animate-pulse" />;
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-warm-sand/40 p-6 text-center">
        <img src="/assets/Photo1.jpeg" alt="Hero Showcase" className="max-h-full rounded-2xl shadow-md object-cover" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 5.8 : 5.0], fov: isMobile ? 55 : 45 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasError(true);
          });
        }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#C5623A" />
        <Suspense fallback={null}>
          <FloatingComposition />
        </Suspense>
      </Canvas>
    </div>
  );
}
