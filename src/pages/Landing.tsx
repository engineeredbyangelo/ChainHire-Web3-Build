import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Zap, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroScene } from '@/components/landing/HeroScene';
import { FeatureContractCard } from '@/components/landing/FeatureContractCard';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const features = [
  {
    title: 'Non-Custodial Escrow',
    desc: 'Funds are held in audited smart contracts on Polygon. No intermediary ever touches your USDC.',
    contractAddress: '0x7F2c...E9a1',
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
  { icon: Users, label: 'DAO Contributors', desc: 'Get paid reliably for governance and dev work.' },
  { icon: Zap, label: 'Web3 Developers', desc: 'Secure milestone-based contracts for dApp builds.' },
  { icon: TrendingUp, label: 'NFT Artists & Creators', desc: 'Protect your creative work with escrowed payments.' },
  { icon: Globe, label: 'Crypto-Native Founders', desc: 'Hire contractors globally with trustless guarantees.' },
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
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Trustless Payments<br /><span className="text-gradient">for Web3 Work</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
              Non-custodial USDC escrow with milestone-based releases, auto-release timers, and on-chain reputation — purpose-built for crypto-native freelancers and clients.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gradient-neon text-primary-foreground font-semibold text-base glow-neon gap-2 px-8">
                <Link to="/auth">Launch App <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="glass border-glass-border/50 text-base gap-2 px-8">Read the Docs</Button>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How <span className="text-gradient">ChainHire</span> Works</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">A complete escrow protocol designed for the way web3 teams actually work.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureContractCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO IT'S FOR ===== */}
      <section className="py-24 relative grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="container relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for <span className="text-gradient">Crypto-Native</span> Teams</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Stop closing deals over Discord DMs. ChainHire gives you the payment rails web3 deserves.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((a, i) => (
              <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-6 text-center group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon/10 border border-neon/20 mx-auto mb-4 group-hover:glow-neon transition-shadow">
                  <a.icon className="h-6 w-6 text-neon" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{a.label}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Teams Choose <span className="text-gradient">ChainHire</span></h2>
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
            <h2 className="text-4xl sm:text-5xl font-bold">Ready to Work <span className="text-gradient">Trustlessly</span>?</h2>
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
