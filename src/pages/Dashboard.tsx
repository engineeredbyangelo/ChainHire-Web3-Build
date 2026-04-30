import { motion } from 'framer-motion';
import { Plus, History, Shield, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/escrow/StatCard';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { mockEscrows, mockUser } from '@/lib/mock-data';

const Dashboard = () => {
  const activeCount = mockEscrows.filter(e => e.status === 'active').length;
  const totalLocked = mockEscrows
    .filter(e => e.status === 'active' || e.status === 'disputed')
    .reduce((sum, e) => sum + e.totalAmount, 0);

  return (
    <div className="container py-12 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div className="space-y-2">
          <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
            Workspace
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-silver">
            Welcome back, <span className="text-gradient">{mockUser.displayName}</span>
          </h1>
          <p className="text-silver-mute mt-1">Here's your escrow overview.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="bg-cyan text-primary-foreground hover:bg-cyan-glow gap-2 glow-cyan rounded-xl">
            <Link to="/create">
              <Plus className="h-4 w-4" />
              Create Escrow
            </Link>
          </Button>
          <Button variant="outline" asChild className="glass border-silver/15 gap-2 rounded-xl">
            <Link to="/history">
              <History className="h-4 w-4" />
              History
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active Escrows" value={String(activeCount)} icon={Shield} accent="violet" />
        <StatCard label="USDC Locked" value={`$${totalLocked.toLocaleString()}`} icon={DollarSign} accent="cyan" />
        <StatCard label="Reputation" value={`${mockUser.reputationScore} pts`} icon={Star} accent="success" />
      </div>

      {/* Escrow List */}
      <div>
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-lg font-semibold tracking-[-0.01em] text-silver">Your Escrows</h2>
          <span className="text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
            {mockEscrows.length} total
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEscrows.map((escrow) => {
            const role = escrow.clientWallet === mockUser.wallet ? 'client' : 'freelancer';
            return <EscrowCard key={escrow.id} escrow={escrow} role={role} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
