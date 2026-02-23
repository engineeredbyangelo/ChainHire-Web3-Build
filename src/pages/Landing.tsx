import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Zap, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/landing/HeroScene';
import { FeatureWireframeCard } from '@/components/landing/FeatureWireframeCard';
import type { ShapeType } from '@/components/landing/WireframeShape';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const features: Array<{ title: string; desc: string; contractAddress: string; code: string[]; shape: ShapeType }> = [
  {
    title: 'Non-Custodial Escrow',
    desc: 'Funds are held in audited smart contracts on Polygon. No intermediary ever touches your USDC.',
    contractAddress: '0x7F2c...E9a1',
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
    title: 'Sequential Milestones',
    desc: 'Break work into milestones. Funds release only when each phase is approved.',
    contractAddress: '0xA3d8...B4c2',
    shape: 'torusKnot',
    code: [
      '// Milestone Progression',
      'function completeMilestone(',
      '  uint256 milestoneId',
      ') external {',
      '  require(isSequential(milestoneId));',
      '}',
    ],
  },
  {
    title: 'Auto-Release Timer',
    desc: 'Built-in 7-day countdown protects freelancers. No response? Funds auto-release.',
    contractAddress: '0xC5e1...D7f3',
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
    desc: 'Disputes resolved by neutral arbitrators for a flat 2.5% fee. Evidence-based outcomes.',
    contractAddress: '0xE9b4...F2a6',
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
    desc: 'Every completed escrow builds your verifiable reputation. Bronze → Diamond.',
    contractAddress: '0x1B3c...8D5e',
    shape: 'icosahedron',
    code: [
      '// Reputation Scoring',
      'event ReputationUpdated(',
      '  address indexed user,',
      '  uint256 newScore',
      ');',
    ],
  },
  {
    title: 'Global & Permissionless',
    desc: 'No KYC, no borders, no bank accounts. Connect your wallet and start working.',
    contractAddress: '0x4F7a...2E9c',
    shape: 'sphere',
    code: [
      '// Permissionless Access',
      'modifier onlyParticipant() {',
      '  require(',
      '    msg.sender == client ||',
      '    msg.sender == freelancer',
      '  );',
      '  _;',
      '}',
    ],
  },
];

const audiences = [
  {
    icon: Users,
    label: 'DAO Contributors',
    desc: 'Get paid reliably for governance proposals, treasury management, and protocol development work.',
    tag: 'GOVERNANCE',
    visual: '⚖️',
    code: 'dao.propose({ action: "fund", amount: 5000 });',
    accent: 'neon' as const,
  },
  {
    icon: Zap,
    label: 'Web3 Developers',
    desc: 'Secure milestone-based contracts for smart contract audits, dApp front-ends, and protocol integrations.',
    tag: 'DEPLOY',
    visual: '⛓️',
    code: 'contract.deploy({ network: "polygon" });',
    accent: 'violet' as const,
  },
  {
    icon: TrendingUp,
    label: 'NFT Artists & Creators',
    desc: 'Protect your creative work with escrowed commissions — from PFP collections to generative art.',
    tag: 'MINT',
    visual: '🎨',
    code: 'nft.mint({ collection: "genesis", royalty: 7.5 });',
    accent: 'cyan' as const,
  },
  {
    icon: Globe,
    label: 'Crypto-Native Founders',
    desc: 'Hire contractors globally with trustless guarantees. No borders, no banks, no middlemen.',
    tag: 'SCALE',
    visual: '🚀',
    code: 'escrow.create({ global: true, kyc: false });',
    accent: 'neon' as const,
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
    <div className="relative overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center grid-bg">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-[1]" />
        <div className="container relative z-[2] text-center py-20">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto space-y-6">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-4 py-1.5 text-xs font-mono font-medium text-neon uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
                Built on Polygon
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] font-display">
              The trust layer for<br /><span className="text-neon animate-pulse-glow inline-block">Web3 talent</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
              Non-custodial USDC payments designed for the frontier of work. Deploy milestone-based contracts, set auto-release deadlocks, and stack your on-chain reputation. No middlemen, no payment delays, just pure Web3 commerce.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gradient-neon text-primary-foreground font-semibold text-base glow-neon gap-2 px-8">
                <Link to="/auth">Launch App <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="glass border-glass-border/50 text-base gap-2 px-8" asChild>
                <Link to="/docs">Read the Docs</Link>
              </Button>
            </motion.div>
            <motion.p variants={fadeUp} custom={4} className="text-xs text-muted-foreground pt-2 font-mono">
              No KYC · No platform fees · Only 2.5% on arbitration
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">How <span className="text-gradient">ChainHire</span> Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">A complete escrow protocol designed for the way web3 teams actually work.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureWireframeCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IT'S FOR ===== */}
      <section className="py-24 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">Built for <span className="text-gradient">Crypto-Native</span> Teams</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Stop closing deals over Discord DMs. ChainHire gives you the payment rails web3 deserves.</p>
          </motion.div>

          {/* Staggered Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audiences.map((a, i) => {
              const accentColor = a.accent === 'neon' ? 'neon' : a.accent === 'violet' ? 'violet' : 'cyan';
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className={`glass rounded-2xl overflow-hidden group relative ${isLarge ? 'md:row-span-1' : ''}`}
                >
                  {/* Top accent line */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${
                    accentColor === 'neon' ? 'from-neon/60 to-cyan/30' :
                    accentColor === 'violet' ? 'from-violet/60 to-neon/30' :
                    'from-cyan/60 to-violet/30'
                  }`} />

                  <div className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-shadow ${
                          accentColor === 'neon' ? 'bg-neon/10 border-neon/20 group-hover:glow-neon' :
                          accentColor === 'violet' ? 'bg-violet/10 border-violet/20 group-hover:glow-violet' :
                          'bg-cyan/10 border-cyan/20 group-hover:glow-cyan'
                        }`}>
                          <a.icon className={`h-5 w-5 ${
                            accentColor === 'neon' ? 'text-neon' :
                            accentColor === 'violet' ? 'text-violet' :
                            'text-cyan'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{a.label}</h3>
                          <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest ${
                            accentColor === 'neon' ? 'text-neon/60' :
                            accentColor === 'violet' ? 'text-violet/60' :
                            'text-cyan/60'
                          }`}>{a.tag}</span>
                        </div>
                      </div>
                      <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform">{a.visual}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{a.desc}</p>

                    {/* Code snippet */}
                    <div className="rounded-lg bg-secondary/40 border border-border px-4 py-3 font-mono text-xs text-foreground/60 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        accentColor === 'neon' ? 'bg-neon' :
                        accentColor === 'violet' ? 'bg-violet' :
                        'bg-cyan'
                      } animate-pulse`} />
                      <code className="truncate">{a.code}</code>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-display">Why Teams Choose <span className="text-gradient">ChainHire</span></h2>
              <div className="space-y-4">
                {benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-neon shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{b}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="gradient-border rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-gradient mb-2">$0</p>
                <p className="text-muted-foreground text-sm">Platform fees. Zero. Always.</p>
              </div>
              <div className="h-px bg-border" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><p className="text-2xl font-bold text-foreground">2.5%</p><p className="text-xs text-muted-foreground">Arbitration only</p></div>
                <div><p className="text-2xl font-bold text-foreground">7 days</p><p className="text-xs text-muted-foreground">Auto-release</p></div>
                <div><p className="text-2xl font-bold text-foreground font-mono">&lt;$0.01</p><p className="text-xs text-muted-foreground">Gas per tx</p></div>
              </div>
              <div className="h-px bg-border" />
              <p className="text-center text-xs text-muted-foreground font-mono">Powered by Polygon · Settled in USDC</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        <div className="container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold font-display">Ready to Work <span className="text-gradient">Trustlessly</span>?</h2>
            <p className="text-muted-foreground text-lg">Connect your wallet and create your first escrow in under 2 minutes.</p>
            <Button asChild size="lg" className="gradient-neon text-primary-foreground font-semibold text-base glow-neon gap-2 px-10">
              <Link to="/auth">Launch App <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded gradient-neon"><Shield className="h-3 w-3 text-primary-foreground" /></div>
            <span className="font-semibold text-sm text-gradient">ChainHire</span>
          </div>
          <p className="text-xs text-muted-foreground font-mono">© 2026 ChainHire Protocol · Built on Polygon</p>
        </div>
      </footer>
    </div>
  );
}
