import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, Trash2, Rocket, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface MilestoneInput {
  name: string;
  description: string;
  amount: string;
}

const STEPS = ['Freelancer', 'Milestones', 'Settings', 'Review'];

const autoReleaseOptions = [3, 5, 7, 14, 30];

export default function CreateEscrow() {
  const [step, setStep] = useState(0);
  const [freelancerAddress, setFreelancerAddress] = useState('');
  const [milestones, setMilestones] = useState<MilestoneInput[]>([{ name: '', description: '', amount: '' }]);
  const [autoRelease, setAutoRelease] = useState(7);
  const navigate = useNavigate();
  const { toast } = useToast();

  const total = milestones.reduce((s, m) => s + (parseFloat(m.amount) || 0), 0);
  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(freelancerAddress);

  const addMilestone = () => setMilestones([...milestones, { name: '', description: '', amount: '' }]);
  const removeMilestone = (i: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, idx) => idx !== i));
  };
  const updateMilestone = (i: number, field: keyof MilestoneInput, value: string) => {
    const updated = [...milestones];
    updated[i] = { ...updated[i], [field]: value };
    setMilestones(updated);
  };

  const canNext = () => {
    if (step === 0) return isValidAddress;
    if (step === 1) return milestones.every(m => m.name && parseFloat(m.amount) > 0);
    return true;
  };

  const handleDeploy = () => {
    toast({ title: 'Escrow Deployed!', description: `Contract created with ${total.toLocaleString()} USDC across ${milestones.length} milestones.` });
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                i < step ? 'gradient-neon text-primary-foreground' : i === step ? 'border-2 border-neon text-neon' : 'border border-glass-border text-muted-foreground'
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-neon' : 'bg-glass-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="gradient-border rounded-xl p-6 space-y-6"
        >
          {step === 0 && (
            <>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 font-display">Freelancer Wallet</h2>
                <p className="text-sm text-muted-foreground">Enter the wallet address of the freelancer you're hiring.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Wallet Address</label>
                <Input
                  value={freelancerAddress}
                  onChange={(e) => setFreelancerAddress(e.target.value)}
                  placeholder="0x0000000000000000000000000000000000000000"
                  className="font-mono glass border-glass-border/50"
                />
                <p className="text-xs text-muted-foreground">Must be a valid Ethereum address (0x + 40 hex characters)</p>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-1 font-display">Milestones</h2>
                  <p className="text-sm text-muted-foreground">Define the work phases and payment amounts.</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-lg font-bold font-mono text-neon">${total.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={i} className="glass rounded-lg p-4 space-y-3 border-glass-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">Milestone {i + 1}</span>
                      {milestones.length > 1 && (
                        <button onClick={() => removeMilestone(i)} className="text-destructive/70 hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        value={m.name}
                        onChange={(e) => updateMilestone(i, 'name', e.target.value)}
                        placeholder="Name"
                        className="col-span-2 glass border-glass-border/50"
                      />
                      <Input
                        type="number"
                        value={m.amount}
                        onChange={(e) => updateMilestone(i, 'amount', e.target.value)}
                        placeholder="USDC"
                        className="font-mono glass border-glass-border/50"
                      />
                    </div>
                    <Input
                      value={m.description}
                      onChange={(e) => updateMilestone(i, 'description', e.target.value)}
                      placeholder="Description (optional)"
                      className="glass border-glass-border/50 text-sm"
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" onClick={addMilestone} className="w-full glass border-glass-border/50 gap-2">
                <Plus className="h-4 w-4" /> Add Milestone
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 font-display">Auto-Release Window</h2>
                <p className="text-sm text-muted-foreground">
                  If the client doesn't respond after a milestone is marked complete, funds auto-release after this period.
                </p>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {autoReleaseOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setAutoRelease(d)}
                    className={`rounded-lg py-3 text-center font-mono text-sm font-bold transition-all ${
                      autoRelease === d
                        ? 'gradient-neon text-primary-foreground glow-neon'
                        : 'glass border-glass-border/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1 font-display">Review & Deploy</h2>
                <p className="text-sm text-muted-foreground">Confirm the details before deploying your escrow contract.</p>
              </div>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4 border-glass-border/30 space-y-2">
                  <p className="text-xs text-muted-foreground">Freelancer</p>
                  <p className="font-mono text-sm text-foreground break-all">{freelancerAddress}</p>
                </div>
                <div className="glass rounded-lg p-4 border-glass-border/30 space-y-3">
                  <p className="text-xs text-muted-foreground">Milestones ({milestones.length})</p>
                  {milestones.map((m, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-foreground">{m.name}</span>
                      <span className="font-mono text-neon">${parseFloat(m.amount || '0').toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-glass-border/30 pt-2 flex justify-between text-sm font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="font-mono text-neon">${total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="glass rounded-lg p-4 border-glass-border/30 flex justify-between text-sm">
                  <span className="text-muted-foreground">Auto-release window</span>
                  <span className="font-mono text-foreground">{autoRelease} days</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Arbitration fee of 2.5% applies only if a dispute is raised.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => step === 0 ? navigate('/dashboard') : setStep(step - 1)}
          className="glass border-glass-border/50 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="gradient-neon text-primary-foreground gap-2 glow-neon"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleDeploy} className="gradient-neon text-primary-foreground gap-2 glow-neon">
            <Rocket className="h-4 w-4" />
            Deploy Escrow
          </Button>
        )}
      </div>
    </div>
  );
}
