import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Wallet, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Create Escrow', path: '/create' },
  { label: 'Profile', path: '/profile' },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = location.pathname === '/';
  const { isConnected, user, walletAddress, signOut } = useAuth();

  const displayAddress = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : '';

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b",
      isLanding
        ? "bg-background/60 backdrop-blur-xl border-border/30"
        : "glass border-glass-border/30"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-neon">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-gradient font-display">ChainHire</span>
        </Link>

        {/* Desktop Nav */}
        {isConnected && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-md bg-secondary"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isConnected ? (
            <>
              {displayAddress && (
                <Button variant="outline" className="glass border-glass-border/50 gap-2 text-sm font-mono">
                  <Wallet className="h-4 w-4" />
                  <span>{displayAddress}</span>
                </Button>
              )}
              <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : !isLanding ? (
            <Button asChild className="gradient-neon text-primary-foreground gap-2">
              <Link to="/auth"><Wallet className="h-4 w-4" /> Connect</Link>
            </Button>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-muted-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-glass-border/30 p-4 space-y-2"
        >
          {isConnected && navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          {isConnected ? (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-muted-foreground truncate flex-1">{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
            </div>
          ) : (
            <Button asChild className="w-full gradient-neon text-primary-foreground gap-2 mt-2">
              <Link to="/auth" onClick={() => setMobileOpen(false)}><Wallet className="h-4 w-4" /> Connect</Link>
            </Button>
          )}
        </motion.div>
      )}
    </nav>
  );
}
