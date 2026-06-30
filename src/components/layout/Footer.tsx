import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-silver/10 bg-background/50 backdrop-blur-sm">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan">
            <Shield className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-silver tracking-tight">ChainHire</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-silver-mute order-first md:order-none">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse shrink-0" />
          <span>Not live yet — we&apos;re making changes in the background.</span>
        </div>
        <p className="text-[11px] text-silver-mute font-mono tracking-wider">
          © 2026 ChainHire Protocol · Built on Polygon
        </p>
      </div>
    </footer>
  );
}
