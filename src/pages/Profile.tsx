import { motion } from 'framer-motion';
import { Copy, Shield } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { StatCard } from '@/components/escrow/StatCard';
import { ReputationBadge } from '@/components/profile/ReputationBadge';
import { mockUser, mockEscrows } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Star, AlertTriangle, Calendar } from 'lucide-react';

type Filter = 'all' | 'active' | 'completed' | 'disputed';

export default function Profile() {
  const [filter, setFilter] = useState<Filter>('all');
  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const { toast } = useToast();

  const filtered = filter === 'all' ? mockEscrows : mockEscrows.filter(e => e.status === filter);
  const disputeRate = mockEscrows.length > 0
    ? Math.round((mockEscrows.filter(e => e.status === 'disputed').length / mockEscrows.length) * 100)
    : 0;

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header */}
        <div className="gradient-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="h-20 w-20 rounded-full gradient-neon flex items-center justify-center glow-neon">
              <Shield className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="text-lg font-bold bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-foreground text-center sm:text-left"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(mockUser.wallet);
                toast({ title: 'Copied', description: 'Wallet address copied.' });
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mx-auto sm:mx-0"
            >
              {mockUser.wallet}
              <Copy className="h-3 w-3" />
            </button>
          </div>

          <ReputationBadge score={mockUser.reputationScore} tier={mockUser.tier} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Completed" value={String(mockUser.completedEscrows)} icon={Star} accent="neon" />
          <StatCard label="Total Earned" value={`$${mockUser.totalEarned.toLocaleString()}`} icon={DollarSign} accent="cyan" />
          <StatCard label="Dispute Rate" value={`${disputeRate}%`} icon={AlertTriangle} accent="violet" />
          <StatCard label="Member Since" value="Jan 2026" icon={Calendar} accent="success" />
        </div>

        {/* Escrow History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Escrow History</h2>
            <div className="flex gap-1">
              {(['all', 'active', 'completed', 'disputed'] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${
                    filter === f ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((escrow) => {
              const role = escrow.clientWallet === mockUser.wallet ? 'client' : 'freelancer';
              return <EscrowCard key={escrow.id} escrow={escrow} role={role} />;
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No escrows found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
