'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (outer.current) {
      outer.current.rotation.y = s.clock.elapsedTime * 0.1;
      outer.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.08) * 0.05;
    }
    if (inner.current) {
      inner.current.rotation.y = -s.clock.elapsedTime * 0.2;
      inner.current.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 1.5) * 0.02);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      {/* Outer shell */}
      <mesh ref={outer} scale={2.4}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#080808"
          roughness={0.1}
          metalness={0.95}
          distort={0.05}
          speed={1.5}
        />
      </mesh>

      {/* Core */}
      <mesh ref={inner} scale={0.5}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00F5FF" emissive="#00F5FF" emissiveIntensity={3}
          transparent opacity={0.85} roughness={0.1} metalness={0.3}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2.8}>
        <torusGeometry args={[1, 0.015, 16, 128]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]} scale={3.1}>
        <torusGeometry args={[1, 0.01, 16, 128]} />
        <meshStandardMaterial color="#6D28FF" emissive="#6D28FF" emissiveIntensity={0.8} transparent opacity={0.2} />
      </mesh>

      <Sparkles count={50} scale={5} speed={0.3} color="#00F5FF" opacity={0.3} />
    </Float>
  );
}

export default function CellarCore() {
  return (
    <div className="w-full h-[75vh] md:h-[85vh]">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#050505', 7, 18]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-3, 2, 3]} intensity={0.6} color="#00F5FF" distance={12} />
        <pointLight position={[2, -3, -2]} intensity={0.3} color="#6D28FF" distance={12} />
        <Core />
      </Canvas>
    </div>
  );
}
