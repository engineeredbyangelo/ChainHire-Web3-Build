import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Escrow } from '@/lib/mock-data';

interface EscrowCardProps {
  escrow: Escrow;
  role: 'client' | 'freelancer';
}

export function EscrowCard({ escrow, role }: EscrowCardProps) {
  const completedCount = escrow.milestones.filter(m => m.status === 'released').length;
  const totalCount = escrow.milestones.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const counterparty = role === 'client' ? escrow.freelancerWallet : escrow.clientWallet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Link
        to={`/escrow/${escrow.id}`}
        className="block gradient-border rounded-xl p-5 group transition-shadow hover:glow-violet"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1">
              {role === 'client' ? 'Freelancer' : 'Client'}
            </p>
            <p className="text-sm font-mono text-foreground truncate">{counterparty}</p>
          </div>
          <StatusBadge status={escrow.status} />
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-xl font-bold text-foreground">
              {escrow.totalAmount.toLocaleString()} <span className="text-sm text-muted-foreground">USDC</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{totalCount} milestones
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-violet-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-3 flex items-center justify-end text-xs text-muted-foreground group-hover:text-foreground transition-colors">
          <span>View details</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </Link>
    </motion.div>
  );
}
