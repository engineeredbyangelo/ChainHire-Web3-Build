import { motion } from 'framer-motion';
import { Copy, Shield, Wallet, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EscrowCard } from '@/components/escrow/EscrowCard';
import { StatCard } from '@/components/escrow/StatCard';
import { ReputationBadge } from '@/components/profile/ReputationBadge';
import { mockUser, mockEscrows } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { supabase } from '@/integrations/supabase/client';
import { DollarSign, Star, AlertTriangle, Calendar } from 'lucide-react';

/* Brand-colored wallet icons */
const MetaMaskIcon = () => (
  <svg viewBox="0 0 35 33" className="h-5 w-5" fill="none">
    <path d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.66 1l13.02 9.81L13.35 4.99 2.66 1z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.23 23.53l-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12zM1.27 23.65l2.13 7.28 7.47-2.06-3.48-5.34-6.12.12z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CoinbaseIcon = () => (
  <svg viewBox="0 0 32 32" className="h-5 w-5">
    <circle cx="16" cy="16" r="16" fill="#0052FF"/>
    <path d="M16 6.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm-3.17 7.33h6.34a.84.84 0 01.83.84v2.66a.84.84 0 01-.83.84h-6.34a.84.84 0 01-.83-.84v-2.66a.84.84 0 01.83-.84z" fill="#fff"/>
  </svg>
);

const WalletConnectIcon = () => (
  <svg viewBox="0 0 32 32" className="h-5 w-5">
    <circle cx="16" cy="16" r="16" fill="#3B99FC"/>
    <path d="M10.82 12.83c2.86-2.8 7.5-2.8 10.36 0l.34.34a.35.35 0 010 .5l-1.18 1.15a.18.18 0 01-.26 0l-.47-.46a5.4 5.4 0 00-7.49 0l-.5.49a.18.18 0 01-.26 0L10.18 13.7a.35.35 0 010-.5l.64-.37zm12.8 2.38l1.05 1.03a.35.35 0 010 .5l-4.73 4.63a.37.37 0 01-.52 0l-3.36-3.29a.09.09 0 00-.13 0l-3.36 3.29a.37.37 0 01-.52 0l-4.73-4.63a.35.35 0 010-.5l1.05-1.03a.37.37 0 01.52 0l3.36 3.29a.09.09 0 00.13 0l3.36-3.29a.37.37 0 01.52 0l3.36 3.29a.09.09 0 00.13 0l3.36-3.29a.37.37 0 01.52 0z" fill="#fff"/>
  </svg>
);

const walletIcons: Record<string, React.FC> = {
  metaMask: MetaMaskIcon,
  'io.metamask': MetaMaskIcon,
  injected: MetaMaskIcon,
  coinbaseWalletSDK: CoinbaseIcon,
  coinbaseWallet: CoinbaseIcon,
  'com.coinbase.wallet': CoinbaseIcon,
  walletConnect: WalletConnectIcon,
};

function getWalletIcon(connector: { id: string; name: string }) {
  const DefaultIcon = () => (
    <Wallet className="h-5 w-5 text-muted-foreground" />
  );
  return walletIcons[connector.id] ?? walletIcons[connector.name] ?? DefaultIcon;
}

type Filter = 'all' | 'active' | 'completed' | 'disputed';

export default function Profile() {
  const [filter, setFilter] = useState<Filter>('all');
  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const { toast } = useToast();
  const { walletAddress, user } = useAuth();
  const { connectors, connect, isPending } = useConnect();
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [savingWallet, setSavingWallet] = useState(false);

  const externalConnectors = connectors.filter(
    (c) => c.id !== 'civic-embedded' && c.type !== 'civic'
  );

  const activeWallet = walletAddress || (isWagmiConnected ? wagmiAddress : null);

  // Save wallet address to profile when wagmi connects
  const handleConnect = async (connector: any) => {
    connect(
      { connector },
      {
        onSuccess: async (data) => {
          const addr = data.accounts?.[0];
          if (addr && user) {
            setSavingWallet(true);
            await supabase
              .from('profiles')
              .update({ wallet_address: addr })
              .eq('user_id', user.id);
            setSavingWallet(false);
            toast({ title: 'Wallet connected', description: `${addr.slice(0, 6)}…${addr.slice(-4)} linked to your account.` });
          }
        },
      }
    );
  };

  const handleDisconnect = async () => {
    disconnect();
    if (user) {
      await supabase
        .from('profiles')
        .update({ wallet_address: null })
        .eq('user_id', user.id);
    }
    toast({ title: 'Wallet disconnected' });
  };

  const filtered = filter === 'all' ? mockEscrows : mockEscrows.filter(e => e.status === filter);
  const disputeRate = mockEscrows.length > 0
    ? Math.round((mockEscrows.filter(e => e.status === 'disputed').length / mockEscrows.length) * 100)
    : 0;

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Header */}
        <div className="gradient-border rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
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
            {activeWallet ? (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeWallet);
                  toast({ title: 'Copied', description: 'Wallet address copied.' });
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors mx-auto sm:mx-0"
              >
                {activeWallet.slice(0, 6)}…{activeWallet.slice(-4)}
                <Copy className="h-3 w-3" />
              </button>
            ) : (
              <p className="text-xs text-muted-foreground font-mono mx-auto sm:mx-0">No wallet connected</p>
            )}
          </div>

          <ReputationBadge score={mockUser.reputationScore} tier={mockUser.tier} />
        </div>

        {/* Wallet Connection Section */}
        <div className="gradient-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Wallet className="h-4 w-4 text-neon" />
              Wallet Connection
            </h2>
            {activeWallet && (
              <button
                onClick={handleDisconnect}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                Disconnect
              </button>
            )}
          </div>

          {activeWallet ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 border border-neon/20">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              <span className="text-xs font-mono text-foreground">{activeWallet}</span>
              <span className="ml-auto text-[10px] text-neon font-medium">Connected</span>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                Connect an external wallet to use on-chain escrow features.
              </p>
              <div className="flex items-center gap-2">
                {externalConnectors.map((connector) => {
                  const IconComp = getWalletIcon(connector);
                  return (
                    <motion.button
                      key={connector.uid}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConnect(connector)}
                      disabled={isPending || savingWallet}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary/60 border border-border hover:border-neon/40 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      title={connector.name}
                    >
                      <IconComp />
                      <span className="text-xs font-medium text-foreground">{connector.name}</span>
                    </motion.button>
                  );
                })}
              </div>
              {(isPending || savingWallet) && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {savingWallet ? 'Saving wallet…' : 'Connecting…'}
                </div>
              )}
            </div>
          )}
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
