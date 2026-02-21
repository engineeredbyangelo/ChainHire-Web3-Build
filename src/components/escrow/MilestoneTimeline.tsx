import { Check, Lock, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Milestone } from '@/lib/mock-data';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="space-y-0">
      {milestones.map((m, i) => {
        const isComplete = m.status === 'released' || m.status === 'completed';
        const isActive = m.status === 'active' || m.status === 'completed';
        const isLocked = m.status === 'locked';
        const isDisputed = m.status === 'disputed';
        const isLast = i === milestones.length - 1;

        return (
          <div key={m.id} className="flex gap-4">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.status === 'released' ? 'gradient-neon' :
                  isActive ? 'border-2 border-violet bg-violet/10' :
                  isDisputed ? 'border-2 border-destructive bg-destructive/10' :
                  'border border-glass-border bg-secondary/30'
                }`}
              >
                {m.status === 'released' ? <Check className="h-4 w-4 text-primary-foreground" /> :
                 isLocked ? <Lock className="h-3 w-3 text-muted-foreground" /> :
                 isDisputed ? <Circle className="h-3 w-3 text-destructive" /> :
                 <Circle className="h-3 w-3 text-violet animate-pulse-glow" />}
              </motion.div>
              {!isLast && (
                <div className={`w-px flex-1 min-h-[2rem] ${m.status === 'released' ? 'bg-neon/50' : 'bg-glass-border/40'}`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLocked ? 'opacity-50' : ''}`}>
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-sm font-semibold text-foreground">{m.name}</h4>
                <span className="font-mono text-xs text-neon">${m.amount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">{m.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
