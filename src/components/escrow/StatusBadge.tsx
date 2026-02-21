import { cn } from '@/lib/utils';
import type { EscrowStatus, MilestoneStatus } from '@/lib/mock-data';

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-success/15 text-success border-success/30' },
  completed: { label: 'Completed', className: 'bg-primary/15 text-primary border-primary/30' },
  disputed: { label: 'Disputed', className: 'bg-destructive/15 text-destructive border-destructive/30' },
  resolved: { label: 'Resolved', className: 'bg-muted-foreground/15 text-muted-foreground border-muted-foreground/30' },
  locked: { label: 'Locked', className: 'bg-muted/50 text-muted-foreground border-muted-foreground/20' },
  released: { label: 'Released', className: 'bg-success/15 text-success border-success/30' },
};

export function StatusBadge({ status }: { status: EscrowStatus | MilestoneStatus }) {
  const config = statusConfig[status] ?? statusConfig.active;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
