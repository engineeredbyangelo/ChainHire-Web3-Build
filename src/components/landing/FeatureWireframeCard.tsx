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
}

export function FeatureWireframeCard({ title, desc, contractAddress, code, shape, index }: FeatureWireframeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative rounded-2xl overflow-hidden border border-glass-border/30 bg-card hover:glow-neon transition-shadow duration-500 flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-neon/60 via-violet/40 to-transparent" />

      {/* Main content: text-first layout */}
      <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-7 flex-1">
        {/* Wireframe icon — compact */}
        <div className="shrink-0 h-16 w-16 rounded-xl border border-glass-border/30 bg-background/60 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[3, 3, 3]} intensity={0.6} color="#00ffaa" />
            <pointLight position={[-3, -2, 2]} intensity={0.3} color="#7c3aed" />
            <Suspense fallback={null}>
              <WireframeShape shape={shape} />
            </Suspense>
          </Canvas>
        </div>

        {/* Text content — prominent */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-neon animate-pulse-glow shrink-0" />
            <span className="text-[10px] font-mono font-semibold tracking-widest text-neon/80 uppercase">
              {contractAddress}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-display leading-tight">
            {title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      {/* Code block — secondary, collapsed */}
      <div className="px-6 sm:px-7 pb-5">
        <div className="rounded-lg bg-secondary/40 border border-glass-border/20 px-4 py-3 font-mono text-xs leading-relaxed text-muted-foreground/70 group-hover:text-muted-foreground transition-colors overflow-x-auto">
          <code className="whitespace-pre">{code.join('\n')}</code>
        </div>
      </div>
    </motion.div>
  );
}
