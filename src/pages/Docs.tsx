import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { 
  Shield, ArrowLeft, BookOpen, Wallet, Milestone, Timer, Scale, Star, 
  Globe, FileCode2, Layers, AlertTriangle, CheckCircle2, ArrowRight, Menu, X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

interface DocSection {
  id: string;
  icon: React.ElementType;
  title: string;
  content: string[];
  code?: string[];
}

const sections: DocSection[] = [
  {
    id: 'overview',
    icon: BookOpen,
    title: 'What is ChainHire?',
    content: [
      'ChainHire is a non-custodial escrow protocol built on Polygon, purpose-built for crypto-native freelancers and clients.',
      'It enables trustless, milestone-based payments settled in USDC — with no intermediary, no KYC, and zero platform fees.',
      'Whether you\'re a DAO contributor, Web3 developer, or NFT creator, ChainHire gives you the payment rails Web3 deserves.',
    ],
  },
  {
    id: 'wallet-auth',
    icon: Wallet,
    title: 'Wallet Authentication',
    content: [
      'ChainHire uses wallet-based authentication. No email, no password — just connect your Ethereum-compatible wallet (MetaMask, WalletConnect, Coinbase Wallet).',
      'Your wallet address serves as your identity. All contracts, reputation, and history are tied to your on-chain address.',
    ],
    code: [
      '// Connect to ChainHire',
      'const { connect } = useWallet();',
      'await connect("metamask");',
      '// Address: 0x7F2c...E9a1',
    ],
  },
  {
    id: 'escrow-creation',
    icon: FileCode2,
    title: 'Creating an Escrow',
    content: [
      'Creating an escrow is a 4-step process:',
      '1. Enter the freelancer\'s wallet address — the party receiving funds.',
      '2. Define milestones — break the project into sequential phases, each with a name and USDC amount.',
      '3. Set auto-release window — a safety timer (3–30 days) that auto-releases funds if the client doesn\'t respond.',
      '4. Review & deploy — confirm all details and deploy the escrow contract to Polygon.',
    ],
    code: [
      'function createEscrow(',
      '  address _freelancer,',
      '  Milestone[] _milestones,',
      '  uint256 _autoReleaseDays',
      ') external payable {',
      '  // Deploy new escrow contract',
      '}',
    ],
  },
  {
    id: 'milestones',
    icon: Milestone,
    title: 'Milestone-Based Releases',
    content: [
      'Funds are locked in the escrow contract and released sequentially as each milestone is completed.',
      'Freelancer marks a milestone as complete → Client reviews and approves → Funds released for that milestone.',
      'Milestones must be completed in order. Skipping is not allowed to ensure quality and accountability.',
    ],
    code: [
      'function completeMilestone(',
      '  uint256 milestoneId',
      ') external onlyFreelancer {',
      '  require(isSequential(milestoneId));',
      '  milestones[milestoneId].status = COMPLETED;',
      '}',
    ],
  },
  {
    id: 'auto-release',
    icon: Timer,
    title: 'Auto-Release Timer',
    content: [
      'Every milestone has a built-in countdown timer. Once a freelancer marks work as complete, the clock starts.',
      'If the client doesn\'t approve or dispute within the auto-release window (default: 7 days), funds are automatically released to the freelancer.',
      'This protects freelancers from unresponsive clients and ensures timely payments.',
    ],
    code: [
      'function autoRelease(',
      '  uint256 milestoneId',
      ') external {',
      '  require(',
      '    block.timestamp > milestone.deadline',
      '  );',
      '  _releaseFunds(milestoneId);',
      '}',
    ],
  },
  {
    id: 'disputes',
    icon: AlertTriangle,
    title: 'Disputes & Arbitration',
    content: [
      'Either party can raise a dispute on any active milestone. When disputed, all milestone actions are frozen.',
      'A neutral arbitrator reviews evidence submitted by both parties and determines a fair split of the escrowed funds.',
      'Arbitration incurs a flat 2.5% fee — only charged if a dispute is raised. No disputes = no fees.',
    ],
    code: [
      'function resolveDispute(',
      '  address arbiter,',
      '  uint256 splitClient,',
      '  uint256 splitFreelancer',
      ') external onlyArbiter {',
      '  // Evidence-based resolution',
      '}',
    ],
  },
  {
    id: 'reputation',
    icon: Star,
    title: 'On-Chain Reputation',
    content: [
      'Every completed escrow contributes to your on-chain reputation score. Scores are public, immutable, and portable.',
      'Tiers: Bronze (0–25) → Silver (26–50) → Gold (51–75) → Diamond (76–100).',
      'Higher reputation unlocks trust signals for future clients and freelancers.',
    ],
  },
  {
    id: 'fees',
    icon: Layers,
    title: 'Fee Structure',
    content: [
      'ChainHire charges zero platform fees. Creating escrows, funding milestones, and releasing payments are completely free.',
      'The only fee is a 2.5% arbitration fee, charged only when a dispute is raised and resolved by an arbiter.',
      'Gas fees on Polygon are minimal — typically less than $0.01 per transaction.',
    ],
  },
  {
    id: 'network',
    icon: Globe,
    title: 'Network & Settlement',
    content: [
      'ChainHire operates on the Polygon (PoS) network for fast, low-cost transactions.',
      'All payments are settled in USDC (USD Coin) — a fully-backed stablecoin pegged to the US dollar.',
      'Contracts are open-source and audited. Your funds are secured by the blockchain, not by a company.',
    ],
  },
];

const toc = sections.map(s => ({ id: s.id, title: s.title }));

export default function Docs() {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <section className="border-b border-border py-12 grid-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 to-background" />
        <div className="container relative">
          <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground gap-2">
            <Link to="/"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          </Button>
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-neon">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display">Documentation</h1>
            </motion.div>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg">
              Everything you need to know about creating, managing, and settling escrow contracts on ChainHire.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mobile TOC toggle */}
      <div className="lg:hidden sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-lg">
        <button
          onClick={() => setMobileTocOpen(!mobileTocOpen)}
          className="container flex items-center justify-between w-full py-3 text-sm font-medium text-foreground"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-neon" />
            On this page
          </span>
          {mobileTocOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        {mobileTocOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="container pb-3 space-y-1"
          >
            {toc.map(t => (
              <a
                key={t.id}
                href={`#${t.id}`}
                onClick={() => setMobileTocOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-md hover:bg-secondary/50 transition-colors"
              >
                {t.title}
              </a>
            ))}
          </motion.div>
        )}
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          {/* Sidebar TOC — desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">On this page</p>
              {toc.map(t => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  {t.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-16 min-w-0">
            {sections.map((section, idx) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.05, duration: 0.5 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon/10 border border-neon/20 shrink-0">
                    <section.icon className="h-4 w-4 text-neon" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">{section.title}</h2>
                </div>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  {section.content.map((para, i) => (
                    <p key={i} className="break-words">{para}</p>
                  ))}
                </div>
                {section.code && (
                  <div className="mt-4 rounded-lg border border-border bg-secondary/30 overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
                      <span className="h-2 w-2 rounded-full bg-neon/60" />
                      <span className="text-xs font-mono text-muted-foreground">Solidity</span>
                    </div>
                    <div className="overflow-x-auto">
                      <pre className="p-4 text-xs sm:text-sm font-mono min-w-0">
                        {section.code.map((line, i) => (
                          <div key={i} className="flex">
                            <span className="w-6 sm:w-8 text-right pr-3 sm:pr-4 text-muted-foreground/40 select-none shrink-0">{i + 1}</span>
                            <span className="text-foreground/80 whitespace-pre">{line}</span>
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="gradient-border rounded-xl p-8 text-center space-y-4"
            >
              <h3 className="text-xl font-bold font-display">Ready to get started?</h3>
              <p className="text-muted-foreground text-sm">Connect your wallet and create your first escrow contract.</p>
              <Button asChild className="gradient-neon text-primary-foreground font-semibold gap-2 glow-neon">
                <Link to="/auth">Launch App <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
