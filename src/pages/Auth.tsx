import { motion } from 'framer-motion';
import { Shield, Hexagon, Loader2, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/CivicAuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserButton } from '@civic/auth-web3/react';
import { useConnect, useAccount } from 'wagmi';

export default function Auth() {
  const { isConnected, hasWallet, createWallet, walletCreationInProgress } = useAuth();
  const navigate = useNavigate();
  const { connectors, connect, isPending } = useConnect();
  const { isConnected: isWagmiConnected } = useAccount();

  useEffect(() => {
    if (isConnected && hasWallet) navigate('/dashboard', { replace: true });
  }, [isConnected, hasWallet, navigate]);

  // Also redirect if connected via external wallet
  useEffect(() => {
    if (isWagmiConnected && isConnected) navigate('/dashboard', { replace: true });
  }, [isWagmiConnected, isConnected, navigate]);

  // Auto-create wallet for newly signed-in users
  useEffect(() => {
    if (isConnected && !hasWallet && createWallet && !walletCreationInProgress) {
      createWallet();
    }
  }, [isConnected, hasWallet, createWallet, walletCreationInProgress]);

  // Filter to only external wallet connectors (exclude civic embedded)
  const externalConnectors = connectors.filter(
    (c) => c.id !== 'civic-embedded' && c.type !== 'civic'
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Floating nodes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-neon/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="gradient-border rounded-2xl p-8 text-center space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl gradient-neon glow-neon">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">ChainHire</h1>
            <p className="text-muted-foreground text-sm max-w-xs">
              {walletCreationInProgress
                ? 'Creating your embedded wallet on Polygon...'
                : 'Sign in with Civic Auth or connect your existing wallet.'}
            </p>
          </div>

          {/* Wallet creation spinner or sign-in */}
          {walletCreationInProgress ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-neon" />
              <p className="text-sm text-muted-foreground">Setting up your wallet...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Civic Auth (email, Google, etc.) */}
              <div className="flex justify-center">
                <UserButton />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-mono uppercase">or connect wallet</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* External wallet connectors */}
              <div className="grid gap-3">
                {externalConnectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    variant="outline"
                    className="w-full glass border-glass-border/50 gap-3 h-12 text-sm font-medium hover:border-neon/30 transition-colors"
                    onClick={() => connect({ connector })}
                    disabled={isPending}
                  >
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    {connector.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Badge */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-glow" />
            Polygon Network · Civic Auth
          </div>
        </div>
      </motion.div>
    </div>
  );
}
