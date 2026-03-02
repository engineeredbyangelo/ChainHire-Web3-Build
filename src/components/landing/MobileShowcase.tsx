import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Wallet, FileCheck, Clock, CheckCircle2, ArrowRight, Shield, Coins, Blocks, Link2, Zap } from 'lucide-react';

const steps = [
  {
    id: 'connect',
    icon: Wallet,
    title: 'Connect Wallet',
    subtitle: '0x7F2c…E9a1',
    accent: 'text-neon',
    items: [
      { label: 'MetaMask', status: 'connected' },
      { label: 'Network', value: 'Polygon' },
      { label: 'Balance', value: '12,450 USDC' },
    ],
  },
  {
    id: 'create',
    icon: FileCheck,
    title: 'Create Escrow',
    subtitle: 'New Contract',
    accent: 'text-violet',
    items: [
      { label: 'Freelancer', value: '0xAb3…9f2' },
      { label: 'Amount', value: '5,000 USDC' },
      { label: 'Milestones', value: '3 phases' },
    ],
  },
  {
    id: 'milestone',
    icon: Clock,
    title: 'Track Progress',
    subtitle: 'Milestone 2 of 3',
    accent: 'text-cyan',
    items: [
      { label: 'Phase 1', status: 'done' },
      { label: 'Phase 2', status: 'active' },
      { label: 'Phase 3', status: 'pending' },
    ],
  },
  {
    id: 'release',
    icon: CheckCircle2,
    title: 'Release Funds',
    subtitle: 'Confirmed on-chain',
    accent: 'text-neon',
    items: [
      { label: 'Released', value: '2,500 USDC' },
      { label: 'Remaining', value: '2,500 USDC' },
      { label: 'Tx Hash', value: '0x8d1…c4e' },
    ],
  },
];

function MobileScreen({ step }: { step: typeof steps[0] }) {
  const Icon = step.icon;

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 flex flex-col p-5 pt-10"
    >
      {/* Status bar */}
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 mb-6 px-1">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="h-1.5 w-3 rounded-sm border border-muted-foreground/40" />
          <Shield className="h-2.5 w-2.5" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-10 w-10 rounded-xl border border-glass-border/30 bg-background/80 flex items-center justify-center ${step.accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground font-display">{step.title}</p>
          <p className="text-[10px] font-mono text-muted-foreground">{step.subtitle}</p>
        </div>
      </div>

      {/* Content cards */}
      <div className="space-y-2.5 flex-1">
        {step.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center justify-between rounded-lg border border-glass-border/20 bg-secondary/30 px-3.5 py-2.5"
          >
            <span className="text-xs text-muted-foreground">{item.label}</span>
            {'status' in item ? (
              <span className={`text-[10px] font-mono font-semibold ${
                item.status === 'done' ? 'text-neon' :
                item.status === 'active' ? 'text-violet' :
                item.status === 'connected' ? 'text-neon' :
                'text-muted-foreground/50'
              }`}>
                {item.status === 'done' ? '✓ Complete' :
                 item.status === 'active' ? '● In Progress' :
                 item.status === 'connected' ? '● Connected' :
                 '○ Pending'}
              </span>
            ) : (
              <span className="text-xs font-mono font-semibold text-foreground">{item.value}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-neon/10 border border-neon/20 py-3 text-neon"
      >
        <Coins className="h-3.5 w-3.5" />
        <span className="text-xs font-mono font-semibold">Continue</span>
        <ArrowRight className="h-3 w-3" />
      </motion.div>
    </motion.div>
  );
}

const protocolStats = [
  { label: 'Block Confirmations', value: '12', icon: Blocks },
  { label: 'Chain', value: 'Polygon', icon: Link2 },
  { label: 'Finality', value: '~2s', icon: Zap },
];

export function MobileShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStep = steps[activeStep];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-4 py-1.5 text-xs font-mono font-medium text-neon uppercase tracking-widest mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
            On-Chain Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            The Escrow <span className="text-gradient">Protocol</span> in Action
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            Watch a live transaction flow — from wallet connect to on-chain settlement on Polygon.
          </p>
        </motion.div>

        {/* Web3-oriented layout: side-by-side with protocol details */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Protocol context & step details (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col space-y-8 order-2 lg:order-1"
          >
            {/* Protocol stats bar */}
            <div className="grid grid-cols-3 gap-3">
              {protocolStats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center">
                    <StatIcon className="h-4 w-4 text-neon mx-auto mb-2" />
                    <p className="text-lg font-bold font-mono text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Step-by-step breakdown */}
            <div className="space-y-3">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isActive = i === activeStep;
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-neon/30 bg-neon/5 glow-neon'
                        : 'border-glass-border/20 bg-card/50 hover:border-glass-border/40'
                    }`}
                    animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-neon/10 text-neon' : 'bg-secondary/50 text-muted-foreground'
                    }`}>
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </p>
                      <p className="text-[11px] font-mono text-muted-foreground/60 truncate">
                        {step.subtitle}
                      </p>
                    </div>
                    <div className={`h-2 w-2 rounded-full shrink-0 ${
                      i < activeStep ? 'bg-neon' :
                      isActive ? 'bg-neon animate-pulse-glow' :
                      'bg-muted-foreground/20'
                    }`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Transaction hash */}
            <div className="glass rounded-xl p-4 border border-glass-border/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
                <span className="text-[10px] font-mono text-neon uppercase tracking-widest">Live Transaction</span>
              </div>
              <code className="text-xs font-mono text-muted-foreground break-all">
                0x8d1f4e7c2a3b9d0e5f6a1c8b7d4e2f3a9c0b5d8e1f7a2c3b4d6e9f0a1c2d3e4f
              </code>
            </div>
          </motion.div>

          {/* Right: Phone mockup (full-width centered on mobile) */}
          <motion.div style={{ y, opacity }} className="flex justify-center lg:order-2">
            <div className="relative mx-auto">
              {/* Phone bezel */}
              <div className="relative w-[280px] sm:w-[320px] rounded-[3rem] border-[6px] border-foreground/10 bg-background shadow-2xl shadow-neon/10 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />

                {/* Screen */}
                <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.5rem] bg-card">
                  <AnimatePresence mode="wait">
                    <MobileScreen step={currentStep} />
                  </AnimatePresence>
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon/40 via-violet/30 to-cyan/20 scale-150" />
              </div>

              {/* Step progress ring */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeStep ? 'w-6 bg-neon' : 'w-1.5 bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
