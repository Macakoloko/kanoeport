import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function HeroScene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 32, 32]} scale={1.5}>
        <MeshDistortMaterial
          color="#00ff41"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      <mesh position={[2, -1, -2]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
      <mesh position={[-2, 1, -3]} rotation={[0.2, 0.8, 0.5]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial color="#d4af37" wireframe />
      </mesh>
    </Float>
  );
}
