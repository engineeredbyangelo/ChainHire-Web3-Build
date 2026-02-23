import { createContext, useContext, type ReactNode } from 'react';
import { CivicAuthProvider as CivicProvider, useUser } from '@civic/auth-web3/react';
import { useNavigate } from 'react-router-dom';

const CIVIC_CLIENT_ID = '362d36db-8742-4379-adca-d9b39962295a';

interface AuthState {
  isConnected: boolean;
  address: string | null;
  user: ReturnType<typeof useUser>['user'];
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

function AuthBridge({ children }: { children: ReactNode }) {
  const { user, signIn, signOut, isLoading } = useUser();

  const value: AuthState = {
    isConnected: !!user,
    address: user?.id ?? null,
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
    <CivicProvider clientId={CIVIC_CLIENT_ID} onSignIn={handleSignIn}>
      <AuthBridge>{children}</AuthBridge>
    </CivicProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within CivicAuthWrapper');
  return ctx;
}
