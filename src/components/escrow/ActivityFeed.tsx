import { FileText, DollarSign, CheckCircle2, AlertTriangle, Rocket, Shield } from 'lucide-react';
import type { EscrowEvent } from '@/lib/mock-data';

const icons: Record<EscrowEvent['type'], typeof FileText> = {
  created: Rocket,
  funded: DollarSign,
  milestone_completed: CheckCircle2,
  milestone_approved: Shield,
  auto_released: DollarSign,
  dispute_raised: AlertTriangle,
  resolved: Shield,
};

interface ActivityFeedProps {
  events: EscrowEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Activity</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {[...events].reverse().map((event) => {
          const Icon = icons[event.type] || FileText;
          return (
            <div key={event.id} className="flex items-start gap-3 glass rounded-lg p-3 border-glass-border/20">
              <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground">{event.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(event.timestamp).toLocaleDateString()}
                  </span>
                  {event.txHash && (
                    <span className="text-[10px] font-mono text-neon/60">{event.txHash}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
