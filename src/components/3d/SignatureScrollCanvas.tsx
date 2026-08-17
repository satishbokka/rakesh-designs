'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh, Group } from 'three';
import { Sparkles as DreiSparkles } from '@react-three/drei';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/lib/constants';

interface SequentialCardProps {
  item: PortfolioItem;
  itemIndex: number;
  totalItems: number;
  globalProgress: number;
}

function SequentialPhotoCard({
  item,
  itemIndex,
  totalItems,
  globalProgress,
}: SequentialCardProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, item.image);

  // Each photo has a window of (1 / totalItems) in globalProgress space
  const windowSize = 1 / totalItems;
  const startTime = itemIndex * windowSize;
  const endTime = (itemIndex + 1) * windowSize;
  const centerTime = startTime + windowSize / 2;

  useFrame((state) => {
    if (!meshRef.current) return;

    // Distance from center of this photo's active window
    const distFromCenter = globalProgress - centerTime;
    const absDist = Math.abs(distFromCenter);

    // Is this item active or near active?
    if (absDist > windowSize * 1.2) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    // Normalized progress within active window (-1 to +1)
    const normPos = distFromCenter / (windowSize / 2); // -1 (entering), 0 (peak focus), +1 (exiting)

    // Opacity: 1 at center, 0 at edges
    const opacity = Math.max(0, 1 - Math.pow(normPos, 2));

    // 3D Exploded Layer Motion:
    // At center (normPos = 0), layers disassemble slightly with depth and tilt
    const explodeFactor = Math.sin((1 - Math.abs(normPos)) * Math.PI);
    
    // Position offset: enters from Z = -2, moves to Z = 0 at center, exits to Z = 2
    const targetZ = normPos * -3;
    const targetX = normPos * 1.8;
    const targetRotY = normPos * -0.4;
    const targetRotX = (1 - explodeFactor) * 0.2;
    const targetScale = 1.8 + explodeFactor * 0.3;

    // Smooth lerp to targets
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.12;
    meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.12;

    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.12;
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.12;

    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.12;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.12;

    if (meshRef.current.material && !Array.isArray(meshRef.current.material)) {
      meshRef.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[2.2, 2.8]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.2}
        metalness={0.1}
        transparent={true}
        opacity={0}
      />
    </mesh>
  );
}

function SceneGroup({ progress }: { progress: number }) {
  const groupRef = useRef<Group>(null);
  const items = PORTFOLIO_ITEMS.slice(0, 5); // 5 primary studio items

  useFrame((state) => {
    if (!groupRef.current) return;
    const mx = state.mouse.x * 0.15;
    const my = state.mouse.y * 0.15;
    groupRef.current.rotation.y = mx * 0.15;
    groupRef.current.rotation.x = -my * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {items.map((item, index) => (
        <SequentialPhotoCard
          key={item.id}
          item={item}
          itemIndex={index}
          totalItems={items.length}
          globalProgress={progress}
        />
      ))}

      {/* Ambient Particle Atmosphere */}
      <DreiSparkles
        count={70}
        scale={7}
        size={3}
        speed={0.4}
        color="#FF6B4A"
      />
    </group>
  );
}

export default function SignatureScrollCanvas({ progress }: { progress: number }) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
      >
        <color attach="background" args={['#13162B']} />
        <ambientLight intensity={1.1} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.2}
          color="#F7F3EC"
        />
        <pointLight position={[-4, -4, 3]} intensity={1.5} color="#FF6B4A" />
        <Suspense fallback={null}>
          <SceneGroup progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
