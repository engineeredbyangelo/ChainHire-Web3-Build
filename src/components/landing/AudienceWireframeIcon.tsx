import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

type AudienceShape = 'octahedron' | 'blockchain' | 'icosahedron' | 'dodecahedron';

const boxGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
const cylinderGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.35, 6);

const simpleGeometries: Record<string, { geo: THREE.BufferGeometry; scale: number }> = {
  octahedron: { geo: new THREE.OctahedronGeometry(1, 0), scale: 1 },
  icosahedron: { geo: new THREE.IcosahedronGeometry(1, 0), scale: 1 },
  dodecahedron: { geo: new THREE.DodecahedronGeometry(1, 0), scale: 0.9 },
};

function BlockchainShape({ color }: { color: string }) {
  const mat = <meshBasicMaterial wireframe color={color} transparent opacity={0.85} />;
  return (
    <group scale={0.95} rotation={[0.3, 0.5, 0.15]}>
      {/* Block 1 */}
      <mesh geometry={boxGeo} position={[-0.6, 0.35, 0]}>
        {mat}
      </mesh>
      {/* Link 1→2 */}
      <mesh geometry={cylinderGeo} position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        {mat}
      </mesh>
      {/* Block 2 */}
      <mesh geometry={boxGeo} position={[0.15, -0.2, 0.15]}>
        {mat}
      </mesh>
      {/* Link 2→3 */}
      <mesh geometry={cylinderGeo} position={[0.5, -0.45, 0.05]} rotation={[0, 0, -Math.PI / 5]}>
        {mat}
      </mesh>
      {/* Block 3 */}
      <mesh geometry={boxGeo} position={[0.75, -0.65, -0.1]}>
        {mat}
      </mesh>
    </group>
  );
}

function SimpleShape({ shape, color }: { shape: string; color: string }) {
  const { geo, scale } = simpleGeometries[shape];
  return (
    <mesh geometry={geo} rotation={[0.4, 0.6, 0]} scale={scale}>
      <meshBasicMaterial wireframe color={color} transparent opacity={0.85} />
    </mesh>
  );
}

function Shape({ shape, color }: { shape: AudienceShape; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.3}>
      {shape === 'blockchain' ? (
        <BlockchainShape color={color} />
      ) : (
        <SimpleShape shape={shape} color={color} />
      )}
    </Float>
  );
}

export function AudienceWireframeIcon({ shape, color, className }: { shape: AudienceShape; color: string; className?: string }) {
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
