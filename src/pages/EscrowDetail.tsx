import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EscrowHeroCard } from '@/components/escrow/EscrowHeroCard';
import { MilestoneTimeline } from '@/components/escrow/MilestoneTimeline';
import { DisputeBanner } from '@/components/escrow/DisputeBanner';
import { ActivityFeed } from '@/components/escrow/ActivityFeed';
import { mockEscrows, mockUser } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function EscrowDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const escrow = mockEscrows.find(e => e.id === id);

  if (!escrow) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Escrow not found.</p>
        <Button variant="outline" onClick={() => navigate('/dashboard')} className="mt-4 glass border-glass-border/50">Back to Dashboard</Button>
      </div>
    );
  }

  const role = escrow.clientWallet === mockUser.wallet ? 'client' : 'freelancer';
  const activeMilestone = escrow.milestones.find(m => m.status === 'active' || m.status === 'completed');

  const mockAction = (action: string) => {
    toast({ title: action, description: 'Transaction submitted (mock).' });
  };

  return (
    <div className="container max-w-3xl py-8 space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2 text-muted-foreground mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>

        {escrow.status === 'disputed' && <DisputeBanner />}

        <div className="mt-4 space-y-6">
          <EscrowHeroCard escrow={escrow} />

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Timeline */}
            <div className="lg:col-span-3 gradient-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Milestones</h3>
              <MilestoneTimeline milestones={escrow.milestones} />
            </div>

            {/* Actions + Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Actions */}
              {escrow.status === 'active' && (
                <div className="gradient-border rounded-xl p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">Actions</h3>
                  {role === 'freelancer' && activeMilestone?.status === 'active' && (
                    <Button onClick={() => mockAction('Milestone marked complete')} className="w-full gradient-neon text-primary-foreground glow-neon gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Mark Complete
                    </Button>
                  )}
                  {role === 'client' && activeMilestone?.status === 'completed' && (
                    <Button onClick={() => mockAction('Milestone approved')} className="w-full gradient-neon text-primary-foreground glow-neon gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Approve Milestone
                    </Button>
                  )}
                  {role === 'freelancer' && (
                    <Button variant="outline" className="w-full glass border-neon/30 text-neon gap-2 glow-neon" onClick={() => mockAction('Auto-release triggered')}>
                      <Clock className="h-4 w-4" /> Auto Release Available
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => mockAction('Dispute raised')} className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 gap-2">
                    <AlertTriangle className="h-4 w-4" /> Raise Dispute
                  </Button>
                </div>
              )}

              <ActivityFeed events={escrow.events} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
