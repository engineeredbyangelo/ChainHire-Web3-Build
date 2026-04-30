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
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Link
        to={`/escrow/${escrow.id}`}
        className="block glass grain rounded-2xl p-5 group transition-all hover:border-cyan/30 hover:glow-cyan"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0">
            <p className="text-[10px] font-mono text-silver-mute mb-1 tracking-boutique uppercase">
              {role === 'client' ? 'Freelancer' : 'Client'}
            </p>
            <p className="text-sm font-mono text-silver truncate">{counterparty}</p>
          </div>
          <StatusBadge status={escrow.status} />
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-1">Total Value</p>
            <p className="text-xl font-semibold tracking-[-0.02em] text-silver">
              {escrow.totalAmount.toLocaleString()}
              <span className="text-sm text-silver-mute ml-1">USDC</span>
            </p>
          </div>
          <p className="text-[11px] font-mono text-silver-mute">
            {completedCount}/{totalCount} milestones
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full rounded-full bg-obsidian/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan to-silver"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-3 flex items-center justify-end text-[11px] font-mono tracking-boutique uppercase text-silver-mute group-hover:text-cyan transition-colors">
          <span>View details</span>
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </Link>
    </motion.div>
  );
}
