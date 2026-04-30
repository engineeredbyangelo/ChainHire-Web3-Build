import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShieldCheck, Network, Globe2 } from 'lucide-react';

const lines = [
  { k: 'contract', v: '0x7F2c…E9a1' },
  { k: 'network ', v: 'polygon-mainnet · chain 137' },
  { k: 'audit   ', v: 'OpenZeppelin · 2025-11' },
  { k: 'tvl     ', v: '$4.2M USDC' },
  { k: 'uptime  ', v: '99.998%   ▰▰▰▰▰▰▰▰▰▰' },
];

const cycle = [
  '> verifying milestone…',
  '> settlement confirmed on block 72,481,329',
  '> auto-release armed · t-7d',
  '> arbitration pool: 24 active nodes',
];

const trustCards = [
  { icon: ShieldCheck, label: 'Audited', value: 'OpenZeppelin' },
  { icon: Network, label: 'On-Chain', value: 'Polygon · Settled' },
  { icon: Globe2, label: 'Permissionless', value: 'No KYC · No Borders' },
];

export function TrustNode() {
  const [idx, setIdx] = useState(0);
  const [block, setBlock] = useState(72481329);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % cycle.length), 2400);
    const b = setInterval(() => setBlock((n) => n + 1), 2000);
    return () => {
      clearInterval(t);
      clearInterval(b);
    };
  }, []);

  return (
    <section className="py-24 relative grid-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="aura aura-cyan w-[420px] h-[420px] -top-32 -right-32" />
      <div className="aura aura-violet w-[360px] h-[360px] bottom-0 -left-32" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-4">
            Trust Node · Live
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] mb-3">
            <span className="text-gradient">Verifiable</span> by design.
          </h2>
          <p className="text-silver-mute max-w-xl mx-auto text-base">
            Every contract, every release, every dispute — anchored to public state.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
          {/* Terminal panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            className="glass-strong grain rounded-2xl overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-silver/10">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan/80 glow-cyan" />
                <span className="ml-3 text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
                  trust.node ~ chainhire
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-glow" />
                ONLINE
              </span>
            </div>

            <div className="p-6 sm:p-8 font-mono text-xs sm:text-sm space-y-1.5">
              <p className="text-silver-mute">$ chainhire status --live</p>
              {lines.map((l) => (
                <p key={l.k} className="flex gap-4">
                  <span className="text-cyan/80 w-20 shrink-0">{l.k}</span>
                  <span className="text-silver">{l.v}</span>
                </p>
              ))}
              <p className="flex gap-4">
                <span className="text-cyan/80 w-20 shrink-0">block   </span>
                <span className="text-silver tabular-nums">
                  {block.toLocaleString()} <span className="text-cyan ml-2">◉ live</span>
                </span>
              </p>
              <div className="h-px my-3 bg-silver/10" />
              <p className="text-silver/90">
                {cycle[idx]}
                <span className="inline-block w-2 h-4 ml-1 bg-cyan/80 align-middle animate-pulse" />
              </p>
            </div>
          </motion.div>

          {/* Trust cards */}
          <div className="grid grid-cols-1 gap-4">
            {trustCards.map((t, i) => {
              const Icon = t.icon;
              return (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{ type: 'spring', stiffness: 140, damping: 20, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-xl border border-silver/15 flex items-center justify-center text-cyan glow-cyan/50">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-boutique text-silver-mute mb-1">
                      {t.label}
                    </p>
                    <p className="text-sm font-medium text-silver">{t.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
