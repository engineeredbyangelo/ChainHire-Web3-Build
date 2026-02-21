import { motion } from 'framer-motion';

interface CountdownRingProps {
  daysLeft: number;
  totalDays: number;
}

export function CountdownRing({ daysLeft, totalDays }: CountdownRingProps) {
  const progress = daysLeft / totalDays;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--glass-border))" strokeWidth="4" />
        <motion.circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--neon))" />
            <stop offset="100%" stopColor="hsl(var(--cyan))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-mono text-foreground">{daysLeft}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">days</span>
      </div>
    </div>
  );
}
