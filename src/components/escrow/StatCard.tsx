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
  neon: 'from-neon to-neon-glow',
};

export function StatCard({ label, value, icon: Icon, accent = 'violet' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-5 relative overflow-hidden group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accentMap[accent]} opacity-80`}>
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl glow-violet" />
    </motion.div>
  );
}
