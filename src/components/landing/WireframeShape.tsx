import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export type ShapeType = 'dodecahedron' | 'torusKnot' | 'torus' | 'octahedron' | 'icosahedron' | 'sphere';

interface WireframeShapeProps {
  shape: ShapeType;
  color?: string;
}

function ShapeGeometry({ shape }: { shape: ShapeType }) {
  switch (shape) {
    case 'dodecahedron':
      return <dodecahedronGeometry args={[1, 0]} />;
    case 'torusKnot':
      return <torusKnotGeometry args={[0.8, 0.25, 80, 12]} />;
    case 'torus':
      return <torusGeometry args={[0.85, 0.3, 16, 40]} />;
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={[1, 0]} />;
    case 'sphere':
      return <sphereGeometry args={[1, 16, 12]} />;
  }
}

export function WireframeShape({ shape, color = '#00ffaa' }: WireframeShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={1.3}>
        <ShapeGeometry shape={shape} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}
