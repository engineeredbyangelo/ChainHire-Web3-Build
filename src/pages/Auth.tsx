import { motion } from 'framer-motion';
import { Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/CivicAuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserButton } from '@civic/auth-web3/react';
import { useConnect, useAccount } from 'wagmi';

/* Brand-colored wallet icons */
const MetaMaskIcon = () => (
  <svg viewBox="0 0 35 33" className="h-5 w-5" fill="none">
    <path d="M32.96 1l-13.14 9.72 2.45-5.73L32.96 1z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.66 1l13.02 9.81L13.35 4.99 2.66 1z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M28.23 23.53l-3.5 5.34 7.49 2.06 2.14-7.28-6.13-.12zM1.27 23.65l2.13 7.28 7.47-2.06-3.48-5.34-6.12.12z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.47 14.51l-2.08 3.14 7.4.34-.26-7.96-5.06 4.48zM25.15 14.51l-5.13-4.57-.17 8.05 7.4-.34-2.1-3.14z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.87 28.87l4.49-2.16-3.88-3.02-.61 5.18zM20.27 26.71l4.46 2.16-.59-5.18-3.87 3.02z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
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

const InjectedIcon = () => (
  <svg viewBox="0 0 32 32" className="h-5 w-5">
    <circle cx="16" cy="16" r="16" fill="hsl(160, 100%, 50%)"/>
    <path d="M10 11a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2V11zm3 2v6h6v-6h-6z" fill="#000" fillOpacity="0.8"/>
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
  return walletIcons[connector.id] ?? walletIcons[connector.name] ?? InjectedIcon;
}

export default function Auth() {
  const { isConnected, hasWallet, createWallet, walletCreationInProgress, signIn } = useAuth();
  const navigate = useNavigate();
  const { connectors, connect, isPending } = useConnect();
  const { isConnected: isWagmiConnected } = useAccount();

  useEffect(() => {
    if (isConnected && hasWallet) navigate('/dashboard', { replace: true });
  }, [isConnected, hasWallet, navigate]);

  useEffect(() => {
    if (isWagmiConnected && isConnected) navigate('/dashboard', { replace: true });
  }, [isWagmiConnected, isConnected, navigate]);

  useEffect(() => {
    if (isConnected && !hasWallet && createWallet && !walletCreationInProgress) {
      createWallet();
    }
  }, [isConnected, hasWallet, createWallet, walletCreationInProgress]);

  const externalConnectors = connectors.filter(
    (c) => c.id !== 'civic-embedded' && c.type !== 'civic'
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

      {/* Floating nodes */}
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
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="gradient-border rounded-2xl p-8 text-center space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-neon glow-neon">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-gradient">ChainHire</h1>
            <p className="text-muted-foreground text-xs max-w-xs">
              {walletCreationInProgress
                ? 'Creating your embedded wallet on Polygon...'
                : 'Sign in with Civic or connect your wallet'}
            </p>
          </div>

          {walletCreationInProgress ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-neon" />
              <p className="text-sm text-muted-foreground">Setting up your wallet...</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Civic Auth — custom styled button */}
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={signIn}
                  className="w-full h-12 rounded-lg bg-background border border-neon/40 text-neon font-medium text-sm tracking-wide transition-all hover:shadow-[0_0_20px_hsl(160_100%_50%/0.25)] hover:border-neon/70 active:shadow-[0_0_30px_hsl(160_100%_50%/0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
                >
                  Log in
                </motion.button>
              </div>
              {/* Hidden Civic UserButton — keeps SDK mounted */}
              <div className="sr-only" aria-hidden="true">
                <UserButton />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" />
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Wallet icons in a shield-shaped container */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl glass border-glass-border/50">
                  {externalConnectors.map((connector) => {
                    const IconComp = getWalletIcon(connector);
                    return (
                      <motion.button
                        key={connector.uid}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => connect({ connector })}
                        disabled={isPending}
                        className="flex items-center justify-center h-11 w-11 rounded-lg bg-secondary/60 border border-border hover:border-neon/40 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                        title={connector.name}
                      >
                        <IconComp />
                      </motion.button>
                    );
                  })}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Connect external wallet
                </span>
              </div>
            </div>
          )}

          {/* Badge */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-pulse-glow" />
            Polygon · Civic Auth
          </div>
        </div>
      </motion.div>
    </div>
  );
}
