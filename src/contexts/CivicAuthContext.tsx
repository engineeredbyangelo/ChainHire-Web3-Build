import { createContext, useContext, type ReactNode } from 'react';
import { CivicAuthProvider as CivicProvider, useUser } from '@civic/auth-web3/react';
import { useNavigate } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { useAutoConnect } from '@civic/auth-web3/wagmi';
import { userHasWallet } from '@civic/auth-web3';
import { polygon } from 'wagmi/chains';
import { wagmiConfig } from '@/lib/wagmi-config';

const CIVIC_CLIENT_ID = '362d36db-8742-4379-adca-d9b39962295a';

interface AuthState {
  isConnected: boolean;
  address: string | null;
  walletAddress: string | null;
  hasWallet: boolean;
  createWallet: (() => Promise<void>) | null;
  walletCreationInProgress: boolean;
  user: ReturnType<typeof useUser>['user'];
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

function AuthBridge({ children }: { children: ReactNode }) {
  const userContext = useUser();
  const { user, signIn, signOut, isLoading } = userContext;

  // Auto-connect the embedded wallet when the user signs in
  useAutoConnect();

  const hasWallet = !!user && userHasWallet(userContext);
  const walletAddress = hasWallet ? (userContext as any).ethereum?.address ?? null : null;
  const createWalletFn = user && !hasWallet ? (userContext as any).createWallet ?? null : null;
  const walletCreationInProgress = user && !hasWallet ? (userContext as any).walletCreationInProgress ?? false : false;

  const value: AuthState = {
    isConnected: !!user,
    address: user?.id ?? null,
    walletAddress,
    hasWallet,
    createWallet: createWalletFn,
    walletCreationInProgress,
    user,
    signIn: () => { signIn(); },
    signOut: () => { signOut(); },
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function CivicAuthWrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const handleSignIn = (options: { error?: Error }) => {
    if (options.error) {
      console.error('Civic Auth sign-in failed:', options.error);
      return;
    }
    navigate('/dashboard');
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <CivicProvider
        clientId={CIVIC_CLIENT_ID}
        onSignIn={handleSignIn}
        initialChain={polygon}
      >
        <AuthBridge>{children}</AuthBridge>
      </CivicProvider>
    </WagmiProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within CivicAuthWrapper');
  return ctx;
}
