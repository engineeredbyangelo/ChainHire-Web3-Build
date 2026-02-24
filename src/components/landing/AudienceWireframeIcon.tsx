import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

type AudienceShape = 'octahedron' | 'torusKnot' | 'icosahedron' | 'dodecahedron';

const geometries: Record<AudienceShape, THREE.BufferGeometry> = {
  octahedron: new THREE.OctahedronGeometry(1, 0),
  torusKnot: new THREE.TorusKnotGeometry(0.7, 0.25, 64, 8),
  icosahedron: new THREE.IcosahedronGeometry(1, 0),
  dodecahedron: new THREE.DodecahedronGeometry(1, 0),
};

interface Props {
  shape: AudienceShape;
  color: string;
  className?: string;
}

function Shape({ shape, color }: { shape: AudienceShape; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
      <mesh geometry={geometries[shape]} rotation={[0.4, 0.6, 0]}>
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
