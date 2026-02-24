import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

type AudienceShape = 'octahedron' | 'torusKnot' | 'icosahedron' | 'dodecahedron';

const geometries: Record<AudienceShape, { geo: THREE.BufferGeometry; scale: number }> = {
  octahedron: { geo: new THREE.OctahedronGeometry(1, 0), scale: 1 },
  torusKnot: { geo: new THREE.TorusKnotGeometry(0.6, 0.2, 48, 6), scale: 0.85 },
  icosahedron: { geo: new THREE.IcosahedronGeometry(1, 0), scale: 1 },
  dodecahedron: { geo: new THREE.DodecahedronGeometry(1, 0), scale: 0.9 },
};

interface Props {
  shape: AudienceShape;
  color: string;
  className?: string;
}

function Shape({ shape, color }: { shape: AudienceShape; color: string }) {
  const { geo, scale } = geometries[shape];
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh geometry={geo} rotation={[0.4, 0.6, 0]} scale={scale}>
        <meshBasicMaterial wireframe color={color} transparent opacity={0.85} />
      </mesh>
    </Float>
  );
}

export function AudienceWireframeIcon({ shape, color, className }: Props) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0, 3], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Shape shape={shape} color={color} />
      </Canvas>
    </div>
  );
}

export type { AudienceShape };
