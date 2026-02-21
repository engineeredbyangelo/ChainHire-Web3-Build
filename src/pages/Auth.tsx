import { motion } from 'framer-motion';
import { Shield, Wallet, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Auth() {
  const { isConnected, connect } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) navigate('/dashboard', { replace: true });
  }, [isConnected, navigate]);

  const handleConnect = () => {
    connect();
    navigate('/dashboard');
  };

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
              Connect your wallet to access ChainHire. No email or password needed.
            </p>
          </div>

          {/* Connect button */}
          <Button
            onClick={handleConnect}
            size="lg"
            className="w-full gradient-neon text-primary-foreground font-semibold text-base glow-neon gap-3 h-14"
          >
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </Button>

          {/* Supported wallets */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Supported Wallets</p>
            <div className="flex justify-center gap-4">
              {['MetaMask', 'WalletConnect', 'Coinbase'].map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5">
                  <div className="h-10 w-10 rounded-lg glass border-glass-border/50 flex items-center justify-center">
                    <Hexagon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Polygon badge */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-glow" />
            Polygon Network
          </div>
        </div>
      </motion.div>
    </div>
  );
}
