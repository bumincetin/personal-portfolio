'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Object Component that responds to scroll
function ScrollableTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!meshRef.current || !groupRef.current) return;

    // GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      // Create a timeline that responds to scroll
      gsap.to(meshRef.current!.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI * 2,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Smooth scrubbing
        },
      });

      // Move the object as user scrolls through sections
      gsap.to(groupRef.current!.position, {
        y: 2,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Scale animation when entering focus areas
      gsap.to(meshRef.current!.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        scrollTrigger: {
          trigger: '#focus-areas',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });

      // Reset scale after focus areas
      gsap.to(meshRef.current!.scale, {
        x: 1,
        y: 1,
        z: 1,
        scrollTrigger: {
          trigger: '#about',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    });

    return () => {
      ctx.revert(); // Cleanup
    };
  }, []);

  // Smooth continuous rotation (subtle, scroll takes precedence)
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle idle rotation that doesn't interfere with scroll animations
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <TorusKnot
        ref={meshRef}
        args={[1, 0.3, 128, 32]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#C19A6B"
          metalness={0.3}
          roughness={0.4}
          emissive="#1A1A1A"
          emissiveIntensity={0.1}
        />
      </TorusKnot>
      
      {/* Additional ambient lighting effect */}
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#C19A6B" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#1A1A1A" />
    </group>
  );
}

// Main ThreeBackground Component
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Adaptive performance
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.4} color="#F9F9F7" />
        
        {/* Directional light for depth */}
        <directionalLight position={[10, 10, 5]} intensity={0.6} color="#FFFFFF" />
        
        {/* Scrollable 3D Object */}
        <ScrollableTorusKnot />
        
        {/* Disable orbit controls for background (pointer-events-none on container) */}
      </Canvas>
    </div>
  );
}
