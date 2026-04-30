import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { WireframeShape, type ShapeType } from './WireframeShape';

interface FeatureWireframeCardProps {
  title: string;
  desc: string;
  contractAddress: string;
  code: string[];
  shape: ShapeType;
  index: number;
  large?: boolean;
}

export function FeatureWireframeCard({
  title,
  desc,
  contractAddress,
  code,
  shape,
  index,
  large = false,
}: FeatureWireframeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, delay: index * 0.08 }}
      className="group relative glass grain rounded-3xl overflow-hidden flex flex-col h-full hover:border-cyan/30 transition-colors duration-500"
    >
      {/* Corner aura */}
      <div className="aura aura-cyan w-48 h-48 -top-16 -right-16 opacity-30 group-hover:opacity-60 transition-opacity duration-700" />

      {/* Hairline accent */}
      <div className="h-px w-full bg-gradient-to-r from-cyan/50 via-silver/20 to-transparent" />

      <div className={`flex-1 flex ${large ? 'flex-col' : 'flex-col sm:flex-row'} gap-5 p-7 sm:p-8 relative`}>
        {/* Wireframe icon */}
        <div className={`shrink-0 ${large ? 'h-32 w-32' : 'h-16 w-16'} rounded-2xl border border-silver/12 bg-obsidian/50 overflow-hidden`}>
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1]}>
            <ambientLight intensity={0.35} />
            <pointLight position={[3, 3, 3]} intensity={0.7} color="#22e6ff" />
            <pointLight position={[-3, -2, 2]} intensity={0.3} color="#cfd6e4" />
            <Suspense fallback={null}>
              <WireframeShape shape={shape} color="#22e6ff" />
            </Suspense>
          </Canvas>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow shrink-0" />
            <span className="text-[10px] font-mono font-medium tracking-boutique text-silver-mute uppercase">
              {contractAddress}
            </span>
          </div>
          <h3 className={`${large ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'} font-semibold tracking-[-0.02em] text-silver mb-2.5 leading-tight`}>
            {title}
          </h3>
          <p className="text-[15px] text-silver-mute leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="px-7 sm:px-8 pb-6">
        <div className="rounded-xl bg-obsidian/60 border border-silver/10 px-4 py-3 font-mono text-[11px] leading-relaxed text-silver-mute/90 group-hover:text-silver/90 transition-colors overflow-x-auto">
          <code className="whitespace-pre">{code.join('\n')}</code>
        </div>
      </div>
    </motion.div>
  );
}
