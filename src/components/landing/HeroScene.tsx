import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ShieldMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} scale={2.3}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#22e6ff"
          emissive="#22e6ff"
          emissiveIntensity={0.12}
          roughness={0.15}
          metalness={0.95}
          distort={0.15}
          speed={1.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 220;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#cfd6e4" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.006, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 5, 5]} intensity={0.7} color="#22e6ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.35} color="#e6ecf5" />
        <ShieldMesh />
        <OrbitalRing radius={3.2} speed={0.08} color="#22e6ff" />
        <OrbitalRing radius={3.8} speed={-0.06} color="#cfd6e4" />
        <ParticleField />
      </Canvas>
    </div>
  );
}
