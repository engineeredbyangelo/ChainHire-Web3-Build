import { motion } from 'framer-motion';
import { Plus, History, Shield, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/escrow/StatCard';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { mockEscrows, mockUser } from '@/lib/mock-data';

const Index = () => {
  const activeCount = mockEscrows.filter(e => e.status === 'active').length;
  const totalLocked = mockEscrows
    .filter(e => e.status === 'active' || e.status === 'disputed')
    .reduce((sum, e) => sum + e.totalAmount, 0);

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient">{mockUser.displayName}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's your escrow overview</p>
        </div>
        <div className="flex gap-3">
          <Button asChild className="gradient-violet-cyan text-primary-foreground gap-2 glow-violet">
            <Link to="/create">
              <Plus className="h-4 w-4" />
              Create Escrow
            </Link>
          </Button>
          <Button variant="outline" asChild className="glass border-glass-border/50 gap-2">
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
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Escrows</h2>
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

export default Index;
