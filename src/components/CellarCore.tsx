'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      {/* Outer shell — obsidian */}
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          roughness={0.15}
          metalness={0.95}
          distort={0.08}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>

      {/* Inner core — cyan energy */}
      <mesh ref={innerRef} scale={0.6}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Energy ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.8}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Second ring — violet */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={3.0}>
        <torusGeometry args={[1, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#6D28FF"
          emissive="#6D28FF"
          emissiveIntensity={1}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Particles */}
      <Sparkles count={80} scale={5} speed={0.4} color="#00F5FF" opacity={0.4} />
      <Sparkles count={40} scale={4} speed={0.6} color="#6D28FF" opacity={0.3} />
    </Float>
  );
}

function NeuralLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 2.5 + Math.random() * 0.5;
      const points = [];
      for (let j = 0; j < 3; j++) {
        const a = angle + (j - 1) * 0.15;
        const r2 = r + (j - 1) * 0.15;
        points.push(new THREE.Vector3(
          Math.cos(a) * r2,
          (Math.random() - 0.5) * 1.5,
          Math.sin(a) * r2
        ));
      }
      arr.push(new THREE.CatmullRomCurve3(points));
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 20, 0.008, 4, false]} />
          <meshStandardMaterial
            color="#00F5FF"
            emissive="#00F5FF"
            emissiveIntensity={0.8}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CellarCore() {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] relative z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#050505', 6, 20]} />

        {/* Lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#00F5FF" distance={10} />
        <pointLight position={[3, -2, -3]} intensity={0.4} color="#6D28FF" distance={10} />
        <spotLight
          position={[0, 8, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00F5FF"
        />

        <CoreSphere />
        <NeuralLines />
      </Canvas>
    </div>
  );
}
