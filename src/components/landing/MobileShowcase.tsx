import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import promoVideo from '@/assets/chainhire-promo.mp4';

export function MobileShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

        {/* Mobile device frame */}
        <motion.div
          style={{ y, opacity }}
          className="flex justify-center"
        >
          <div className="relative mx-auto">
            {/* Phone bezel */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[3rem] border-[6px] border-foreground/10 bg-background shadow-2xl shadow-neon/10 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-foreground/10 rounded-b-2xl z-10" />

              {/* Screen content */}
              <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.5rem] bg-background">
                <video
                  src={promoVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Top fade for notch area */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background/60 to-transparent z-[1]" />
              </div>
            </div>

            {/* Glow effect behind phone */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon/40 via-violet/30 to-cyan/20 scale-150" />
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
