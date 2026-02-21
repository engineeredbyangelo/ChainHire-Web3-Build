import { motion } from 'framer-motion';
import type { ReputationTier } from '@/lib/mock-data';

interface ReputationBadgeProps {
  score: number;
  tier: ReputationTier;
  maxScore?: number;
}

const tierConfig: Record<ReputationTier, { color: string; label: string }> = {
  bronze: { color: '30 60% 50%', label: 'Bronze' },
  silver: { color: '220 10% 65%', label: 'Silver' },
  gold: { color: '45 93% 47%', label: 'Gold' },
  diamond: { color: '187 72% 50%', label: 'Diamond' },
};

export function ReputationBadge({ score, tier, maxScore = 500 }: ReputationBadgeProps) {
  const { color, label } = tierConfig[tier];
  const progress = Math.min(score / maxScore, 1);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--glass-border))" strokeWidth="6" />
          <motion.circle
            cx="64" cy="64" r="54"
            fill="none"
            stroke={`hsl(${color})`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-foreground">{score}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">points</span>
        </div>
      </div>
      <span
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: `hsl(${color})` }}
      >
        {label}
      </span>
    </div>
  );
}
