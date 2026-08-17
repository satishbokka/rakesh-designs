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

  const windowSize = 1 / totalItems;
  const startTime = itemIndex * windowSize;
  const endTime = (itemIndex + 1) * windowSize;
  const centerTime = startTime + windowSize / 2;

  useFrame((state) => {
    if (!meshRef.current) return;

    const distFromCenter = globalProgress - centerTime;
    const absDist = Math.abs(distFromCenter);

    if (absDist > windowSize * 1.2) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    const normPos = distFromCenter / (windowSize / 2);
    const opacity = Math.max(0, 1 - Math.pow(normPos, 2));

    const explodeFactor = Math.sin((1 - Math.abs(normPos)) * Math.PI);
    
    const targetZ = normPos * -3;
    const targetX = normPos * 1.8;
    const targetRotY = normPos * -0.4;
    const targetRotX = (1 - explodeFactor) * 0.2;
    const targetScale = 1.8 + explodeFactor * 0.3;

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
  const items = PORTFOLIO_ITEMS.slice(0, 5);

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

      {/* Ambient Teal Particle Atmosphere */}
      <DreiSparkles
        count={70}
        scale={7}
        size={3}
        speed={0.4}
        color="#2FE6C9"
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
        <color attach="background" args={['#0D0F14']} />
        <ambientLight intensity={1.1} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.4}
          penumbra={0.8}
          intensity={2.2}
          color="#F1EEE7"
        />
        <pointLight position={[-4, -4, 3]} intensity={1.6} color="#2FE6C9" />
        <Suspense fallback={null}>
          <SceneGroup progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
