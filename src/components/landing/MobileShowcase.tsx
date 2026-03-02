import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Wallet, FileCheck, Clock, CheckCircle2, ArrowRight, Shield, Coins } from 'lucide-react';

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

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-neon/5 px-4 py-1.5 text-xs font-mono font-medium text-neon uppercase tracking-widest mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-glow" />
            Live Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display">
            See <span className="text-gradient">ChainHire</span> in Action
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            From wallet connect to milestone release — experience the full escrow flow on any device.
          </p>
        </motion.div>

        <motion.div style={{ y, opacity }} className="flex justify-center">
          <div className="relative mx-auto">
            {/* Phone bezel */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[3rem] border-[6px] border-foreground/10 bg-background shadow-2xl shadow-neon/10 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />

              {/* Screen */}
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.5rem] bg-card">
                <AnimatePresence mode="wait">
                  <MobileScreen step={steps[activeStep]} />
                </AnimatePresence>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon/40 via-violet/30 to-cyan/20 scale-150" />
            </div>

            {/* Step indicators */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
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

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-1/4 -left-4 sm:-left-36 glass rounded-xl border border-glass-border/30 px-4 py-3 hidden sm:block"
            >
              <p className="text-xs font-mono text-neon font-semibold">✓ Wallet Connected</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">0x7F2c...E9a1</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-1/2 -right-4 sm:-right-40 glass rounded-xl border border-glass-border/30 px-4 py-3 hidden sm:block"
            >
              <p className="text-xs font-mono text-violet font-semibold">Milestone 2/3</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">2,500 USDC released</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-xl border border-glass-border/30 px-5 py-3 hidden sm:block"
            >
              <p className="text-xs font-mono text-cyan font-semibold text-center">⚡ Auto-release in 6d 23h</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
