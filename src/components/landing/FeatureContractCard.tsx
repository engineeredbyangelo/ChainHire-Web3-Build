import { motion } from 'framer-motion';

interface FeatureContractCardProps {
  title: string;
  desc: string;
  contractAddress: string;
  code: string[];
}

export function FeatureContractCard({ title, desc, contractAddress, code }: FeatureContractCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-xl overflow-hidden border-l-2 border-l-neon/60 border border-glass-border/30 bg-card hover:glow-neon transition-shadow duration-500"
    >
      {/* Contract header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-glass-border/30 bg-secondary/40">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-neon animate-pulse-glow" />
          <span className="text-xs font-mono text-muted-foreground">{contractAddress}</span>
        </div>
        <span className="text-[10px] font-mono font-semibold tracking-widest text-neon/80 uppercase">Deployed</span>
      </div>

      {/* Code block */}
      <div className="px-4 py-3 font-mono text-xs leading-relaxed border-b border-glass-border/20 bg-background/40">
        {code.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-muted-foreground/40 select-none w-4 text-right shrink-0">{i + 1}</span>
            <span
              className="text-muted-foreground group-hover:text-foreground/80 transition-colors"
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/(function|contract|external|payable|returns|event|modifier|uint256|address|bool|mapping)/g, '<span class="text-violet">$1</span>')
                  .replace(/(\/\/.*)/g, '<span class="text-neon/60">$1</span>')
                  .replace(/(".*?")/g, '<span class="text-cyan">$1</span>'),
              }}
            />
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}
