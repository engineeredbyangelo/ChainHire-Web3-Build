import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function DisputeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 flex items-center gap-3 bg-destructive/10 border border-destructive/30"
    >
      <AlertTriangle className="h-5 w-5 text-destructive animate-pulse-glow shrink-0" />
      <div>
        <p className="text-sm font-semibold text-destructive">Contract Under Dispute</p>
        <p className="text-xs text-destructive/70">All milestone actions are locked until the dispute is resolved.</p>
      </div>
    </motion.div>
  );
}
