import { motion } from 'framer-motion';
import { Shield, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'signup';

export default function Auth() {
  const { isConnected } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected) navigate('/dashboard', { replace: true });
  }, [isConnected, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName || email },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Check your email', description: 'We sent you a confirmation link.' });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <div className="aura aura-cyan w-[480px] h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />

      {/* Floating nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan/40"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 20 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div className="glass-strong grain rounded-3xl p-8 text-center space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan glow-cyan">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </span>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-silver">ChainHire</h1>
            <p className="text-silver-mute text-xs max-w-xs">
              {mode === 'login' ? 'Welcome back to the trust layer.' : 'Join the trust layer for Web3 talent.'}
            </p>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3 text-left">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver-mute" />
                <Input
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10 bg-obsidian/60 border-silver/15 focus-visible:ring-cyan/50 rounded-xl"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver-mute" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-obsidian/60 border-silver/15 focus-visible:ring-cyan/50 rounded-xl"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silver-mute" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="pl-10 bg-obsidian/60 border-silver/15 focus-visible:ring-cyan/50 rounded-xl"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              className="w-full h-12 rounded-xl bg-cyan text-primary-foreground font-semibold text-sm tracking-wide transition-all glow-cyan hover:bg-cyan-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/50 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : mode === 'login' ? (
                'Log in'
              ) : (
                'Create account'
              )}
            </motion.button>
          </form>

          {/* Toggle mode */}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-xs text-silver-mute hover:text-cyan transition-colors"
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
          </button>

          {/* Hint */}
          <p className="text-[10px] text-silver-mute/80 font-mono">
            Connect your wallet on your profile page after signing in.
          </p>

          {/* Badge */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
            Polygon · Secure
          </div>
        </div>
      </motion.div>
    </div>
  );
}
