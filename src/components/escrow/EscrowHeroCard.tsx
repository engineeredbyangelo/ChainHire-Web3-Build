import { Copy } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { CountdownRing } from './CountdownRing';
import type { Escrow } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface EscrowHeroCardProps {
  escrow: Escrow;
}

export function EscrowHeroCard({ escrow }: EscrowHeroCardProps) {
  const { toast } = useToast();
  const daysLeft = Math.max(
    0,
    escrow.autoReleaseWindow -
      Math.floor(
        (Date.now() -
          new Date(escrow.milestones.find(m => m.status === 'completed')?.completedAt || escrow.createdAt).getTime()) /
          86400000
      )
  );

  const copyAddress = () => {
    navigator.clipboard.writeText(escrow.escrowAddress);
    toast({ title: 'Copied', description: 'Contract address copied to clipboard.' });
  };

  return (
    <div className="glass grain rounded-2xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={escrow.status} />
            <button
              onClick={copyAddress}
              className="flex items-center gap-1.5 text-xs font-mono text-silver-mute hover:text-cyan transition-colors"
            >
              {escrow.escrowAddress}
              <Copy className="h-3 w-3" />
            </button>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-[-0.02em] font-mono text-silver">
              ${escrow.totalAmount.toLocaleString()}
            </p>
            <p className="text-[11px] font-mono text-silver-mute tracking-boutique uppercase mt-1">Total USDC</p>
          </div>
          <div className="flex gap-6 text-xs">
            <div>
              <p className="text-silver-mute mb-0.5 text-[10px] font-mono tracking-boutique uppercase">Client</p>
              <p className="font-mono text-silver">{escrow.clientWallet}</p>
            </div>
            <div>
              <p className="text-silver-mute mb-0.5 text-[10px] font-mono tracking-boutique uppercase">Freelancer</p>
              <p className="font-mono text-silver">{escrow.freelancerWallet}</p>
            </div>
          </div>
        </div>
        {escrow.status === 'active' && <CountdownRing daysLeft={daysLeft} totalDays={escrow.autoReleaseWindow} />}
      </div>
    </div>
  );
}
