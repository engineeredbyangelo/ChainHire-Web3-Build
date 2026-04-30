import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: 'violet' | 'cyan' | 'success' | 'neon';
}

const accentMap = {
  violet: 'from-violet to-violet-glow',
  cyan: 'from-cyan to-cyan-glow',
  success: 'from-success to-success',
  neon: 'from-cyan to-cyan-glow',
};

export function StatCard({ label, value, icon: Icon, accent = 'violet' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 20 }}
      whileHover={{ y: -2 }}
      className="glass grain rounded-2xl p-5 relative overflow-hidden group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono text-silver-mute mb-2 tracking-boutique uppercase">{label}</p>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-silver">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentMap[accent]} opacity-90 ring-1 ring-silver/10`}>
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl glow-cyan" />
    </motion.div>
  );
}
