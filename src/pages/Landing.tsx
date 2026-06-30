import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/landing/HeroScene';
import { FeatureWireframeCard } from '@/components/landing/FeatureWireframeCard';
import { AudienceWireframeIcon } from '@/components/landing/AudienceWireframeIcon';
import { MobileShowcase } from '@/components/landing/MobileShowcase';
import { TrustNode } from '@/components/landing/TrustNode';
import type { AudienceShape } from '@/components/landing/AudienceWireframeIcon';
import type { ShapeType } from '@/components/landing/WireframeShape';

const spring = { type: 'spring' as const, stiffness: 140, damping: 20, mass: 0.9 };
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay: i * 0.08 },
  }),
};

const features: Array<{ title: string; desc: string; contractAddress: string; code: string[]; shape: ShapeType }> = [
  {
    title: 'Non-Custodial Escrow',
    desc: 'Funds are held in audited smart contracts on Polygon. No intermediary ever touches your USDC. Milestone-based releases ensure work is verified before payment.',
    contractAddress: '0x7F2c…E9a1',
    shape: 'dodecahedron',
    code: [
      '// Non-Custodial Escrow',
      'contract ChainEscrow {',
      '  mapping(address => uint256) balances;',
      '  function fund(uint256 amt)',
      '    external payable { ... }',
      '}',
    ],
  },
  {
    title: 'Auto-Release & Deadlines',
    desc: 'Built-in 7-day countdown protects freelancers. No client response? Funds auto-release on-chain. No more chasing invoices.',
    contractAddress: '0xC5e1…D7f3',
    shape: 'torus',
    code: [
      '// Auto Release Logic',
      'function autoRelease(',
      '  uint256 milestoneId',
      ') external {',
      '  require(block.timestamp > deadline);',
      '}',
    ],
  },
  {
    title: 'Fair Arbitration',
    desc: 'Disputes resolved by neutral arbitrators for a flat 2.5% fee. Evidence-based, on-chain outcomes with transparent split logic.',
    contractAddress: '0xE9b4…F2a6',
    shape: 'octahedron',
    code: [
      '// Dispute Resolution',
      'function resolveDispute(',
      '  address arbiter,',
      '  uint256 splitA, uint256 splitB',
      ') external returns (bool) { ... }',
    ],
  },
  {
    title: 'On-Chain Reputation',
    desc: 'Every completed escrow builds your verifiable reputation. Bronze → Diamond. Fully permissionless and borderless.',
    contractAddress: '0x1B3c…8D5e',
    shape: 'icosahedron',
    code: [
      '// Reputation Scoring',
      'event ReputationUpdated(',
      '  address indexed user,',
      '  uint256 newScore',
      ');',
    ],
  },
];

const audiences = [
  {
    shape: 'octahedron' as AudienceShape,
    label: 'DAO Contributors',
    desc: 'Get paid reliably for governance proposals, treasury management, and protocol development work.',
    tag: 'GOVERNANCE',
    code: 'dao.propose({ action: "fund", amount: 5000 });',
    color: '#22e6ff',
  },
  {
    shape: 'blockchain' as AudienceShape,
    label: 'Web3 Developers',
    desc: 'Secure milestone-based contracts for smart contract audits, dApp front-ends, and protocol integrations.',
    tag: 'DEPLOY',
    code: 'contract.deploy({ network: "polygon" });',
    color: '#a78bfa',
  },
  {
    shape: 'icosahedron' as AudienceShape,
    label: 'NFT Artists & Creators',
    desc: 'Protect your creative work with escrowed commissions — from PFP collections to generative art.',
    tag: 'MINT',
    code: 'nft.mint({ collection: "genesis", royalty: 7.5 });',
    color: '#22e6ff',
  },
  {
    shape: 'dodecahedron' as AudienceShape,
    label: 'Crypto-Native Founders',
    desc: 'Hire contractors globally with trustless guarantees. No borders, no banks, no middlemen.',
    tag: 'SCALE',
    code: 'escrow.create({ global: true, kyc: false });',
    color: '#cfd6e4',
  },
];

const benefits = [
  'Eliminate payment disputes with on-chain escrow',
  'Build portable reputation across the web3 ecosystem',
  'Low gas on Polygon — transactions cost fractions of a cent',
  'No platform lock-in — your contracts live on the blockchain',
  'Automated release protects freelancers from ghosting',
  'Evidence-based arbitration for fair dispute resolution',
];

export default function Landing() {
  return (
    <div className="relative overflow-hidden grain">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[92vh] flex items-center justify-center grid-bg">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-[1]" />
        <div className="aura aura-cyan w-[520px] h-[520px] -top-40 left-1/2 -translate-x-1/2" />
        <div className="container relative z-[2] text-center py-24">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto space-y-7">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
                Trust Layer · Polygon · Audited
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]"
            >
              The trust layer for<br />
              <span className="text-gradient">Web3 talent.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-base sm:text-lg text-silver-mute max-w-xl mx-auto leading-relaxed"
            >
              Non-custodial USDC escrows, milestone releases, and on-chain reputation — built for the frontier of work.
            </motion.p>

            {/* Glass-Card CTA */}
            <motion.div variants={fadeUp} custom={3} className="pt-2 flex justify-center">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="glass border-silver/20 text-silver hover:text-foreground hover:border-cyan/40 font-semibold text-base gap-2 px-7 rounded-xl"
                >
                  <Link to="/docs">
                    Read Docs <span aria-hidden="true">→</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.p variants={fadeUp} custom={4} className="text-[11px] text-silver-mute/80 pt-1 font-mono tracking-wider">
              No KYC · No platform fees · 2.5% on arbitration only
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE PILLARS — BENTO ===== */}
      <section className="py-28 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="aura aura-violet w-[400px] h-[400px] top-1/3 -left-32" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={spring}
            className="text-center mb-16"
          >
            <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-4">
              Core Pillars
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] mb-3">
              How <span className="text-gradient">ChainHire</span> works.
            </h2>
            <p className="text-silver-mute max-w-lg mx-auto">A complete escrow protocol for the way web3 teams actually ship.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <div className="lg:col-span-2 lg:row-span-1">
              <FeatureWireframeCard {...features[0]} index={0} large />
            </div>
            <div className="lg:col-span-1">
              <FeatureWireframeCard {...features[1]} index={1} />
            </div>
            <div className="lg:col-span-1">
              <FeatureWireframeCard {...features[2]} index={2} />
            </div>
            <div className="lg:col-span-2">
              <FeatureWireframeCard {...features[3]} index={3} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIVE PROTOCOL WALKTHROUGH ===== */}
      <MobileShowcase />

      {/* ===== TRUST NODE ===== */}
      <TrustNode />

      {/* ===== WHO IT'S FOR ===== */}
      <section className="py-28 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={spring}
            className="text-center mb-16"
          >
            <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-4">
              Audience
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] mb-3">
              Built for <span className="text-gradient">crypto-native</span> teams.
            </h2>
            <p className="text-silver-mute max-w-lg mx-auto">Stop closing deals over Discord DMs.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {audiences.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ ...spring, delay: i * 0.08 }}
                className="glass grain rounded-2xl overflow-hidden group relative hover:border-cyan/30 transition-colors"
              >
                <div className="h-px w-full bg-gradient-to-r from-cyan/40 via-silver/15 to-transparent" />
                <div className="p-7 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-silver/15 group-hover:glow-cyan transition-shadow">
                      <AudienceWireframeIcon shape={a.shape} color={a.color} className="h-12 w-12" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-silver tracking-[-0.01em]">{a.label}</h3>
                      <span className="text-[10px] font-mono uppercase tracking-boutique text-silver-mute">{a.tag}</span>
                    </div>
                  </div>
                  <p className="text-sm text-silver-mute leading-relaxed mb-5 flex-1">{a.desc}</p>
                  <div className="rounded-lg bg-obsidian/60 border border-silver/10 px-4 py-3 font-mono text-xs text-silver-mute/80 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse shrink-0" />
                    <code className="truncate">{a.code}</code>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-28 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={spring}
            >
              <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-4">
                Why Teams Choose
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.02em] mb-8">
                Trust, <span className="text-gradient">composed.</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...spring, delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-cyan shrink-0 mt-0.5" />
                    <p className="text-silver-mute">{b}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={spring}
              className="glass-strong grain rounded-3xl p-8 space-y-6 relative overflow-hidden"
            >
              <div className="aura aura-cyan w-64 h-64 -top-20 -right-20" />
              <div className="text-center relative">
                <p className="text-6xl font-semibold tracking-[-0.04em] text-gradient mb-2">$0</p>
                <p className="text-silver-mute text-sm">Platform fees. Zero. Always.</p>
              </div>
              <div className="h-px bg-silver/10" />
              <div className="grid grid-cols-3 gap-4 text-center relative">
                <div>
                  <p className="text-2xl font-semibold text-silver tracking-[-0.02em]">2.5%</p>
                  <p className="text-[11px] text-silver-mute mt-1">Arbitration only</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-silver tracking-[-0.02em]">7d</p>
                  <p className="text-[11px] text-silver-mute mt-1">Auto-release</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-silver font-mono">&lt;$0.01</p>
                  <p className="text-[11px] text-silver-mute mt-1">Gas per tx</p>
                </div>
              </div>
              <div className="h-px bg-silver/10" />
              <p className="text-center text-[11px] text-silver-mute font-mono tracking-wider">
                Powered by Polygon · Settled in USDC
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 relative">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        <div className="aura aura-cyan w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={spring}
            className="glass-strong grain rounded-3xl max-w-3xl mx-auto p-12 sm:p-16 text-center space-y-6"
          >
            <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
              Work <span className="text-gradient">trustlessly.</span>
            </h2>
            <p className="text-silver-mute text-base max-w-md mx-auto">
              Connect your wallet and create your first escrow in under two minutes.
            </p>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className="inline-block pt-2">
              <Button
                asChild
                size="lg"
                className="bg-cyan text-primary-foreground hover:bg-cyan-glow font-semibold text-base glow-cyan gap-2 px-10 rounded-xl"
              >
                <Link to="/auth">
                  Launch App <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-silver/10 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan">
              <Shield className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm text-silver tracking-tight">ChainHire</span>
          </div>
          <p className="text-[11px] text-silver-mute font-mono tracking-wider">
            © 2026 ChainHire Protocol · Built on Polygon
          </p>
        </div>
      </footer>
    </div>
  );
}
