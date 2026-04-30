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
    toast({
      title: 'Escrow Deployed!',
      description: `Contract created with ${total.toLocaleString()} USDC across ${milestones.length} milestones.`,
    });
    navigate('/dashboard');
  };

  const inputCls = 'bg-obsidian/60 border-silver/15 focus-visible:ring-cyan/50 rounded-xl';

  return (
    <div className="container max-w-2xl py-12 space-y-8">
      {/* Header */}
      <div>
        <span className="inline-block text-[10px] font-mono text-silver-mute tracking-boutique uppercase mb-2">
          New Contract
        </span>
        <h1 className="text-3xl font-semibold tracking-[-0.02em] text-silver">
          Create <span className="text-gradient">Escrow.</span>
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex items-center gap-2 flex-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  i < step
                    ? 'bg-cyan text-primary-foreground glow-cyan'
                    : i === step
                    ? 'border-2 border-cyan text-cyan'
                    : 'border border-silver/15 text-silver-mute'
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span
                className={`text-[11px] font-mono tracking-boutique uppercase hidden sm:block ${
                  i <= step ? 'text-silver' : 'text-silver-mute'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${i < step ? 'bg-cyan' : 'bg-silver/10'}`} />
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
          transition={{ duration: 0.25 }}
          className="glass grain rounded-2xl p-6 space-y-6"
        >
          {step === 0 && (
            <>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-silver mb-1">Freelancer Wallet</h2>
                <p className="text-sm text-silver-mute">Enter the wallet address of the freelancer you're hiring.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-silver">Wallet Address</label>
                <Input
                  value={freelancerAddress}
                  onChange={(e) => setFreelancerAddress(e.target.value)}
                  placeholder="0x0000000000000000000000000000000000000000"
                  className={`font-mono ${inputCls}`}
                />
                <p className="text-xs text-silver-mute">Must be a valid Ethereum address (0x + 40 hex characters)</p>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-silver mb-1">Milestones</h2>
                  <p className="text-sm text-silver-mute">Define the work phases and payment amounts.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-mono tracking-boutique uppercase text-silver-mute">Total</p>
                  <p className="text-lg font-semibold font-mono text-cyan">${total.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                {milestones.map((m, i) => (
                  <div key={i} className="rounded-xl bg-obsidian/60 border border-silver/10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-boutique uppercase text-silver-mute">
                        Milestone {i + 1}
                      </span>
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
                        className={`col-span-2 ${inputCls}`}
                      />
                      <Input
                        type="number"
                        value={m.amount}
                        onChange={(e) => updateMilestone(i, 'amount', e.target.value)}
                        placeholder="USDC"
                        className={`font-mono ${inputCls}`}
                      />
                    </div>
                    <Input
                      value={m.description}
                      onChange={(e) => updateMilestone(i, 'description', e.target.value)}
                      placeholder="Description (optional)"
                      className={`text-sm ${inputCls}`}
                    />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={addMilestone}
                className="w-full glass border-silver/15 hover:border-cyan/40 gap-2 rounded-xl"
              >
                <Plus className="h-4 w-4" /> Add Milestone
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-silver mb-1">Auto-Release Window</h2>
                <p className="text-sm text-silver-mute">
                  If the client doesn't respond after a milestone is marked complete, funds auto-release after this period.
                </p>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {autoReleaseOptions.map((d) => (
                  <button
                    key={d}
                    onClick={() => setAutoRelease(d)}
                    className={`rounded-xl py-3 text-center font-mono text-sm font-bold transition-all ${
                      autoRelease === d
                        ? 'bg-cyan text-primary-foreground glow-cyan'
                        : 'bg-obsidian/60 border border-silver/15 text-silver-mute hover:text-silver hover:border-cyan/30'
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
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-silver mb-1">Review & Deploy</h2>
                <p className="text-sm text-silver-mute">Confirm the details before deploying your escrow contract.</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-obsidian/60 border border-silver/10 p-4 space-y-2">
                  <p className="text-[10px] font-mono tracking-boutique uppercase text-silver-mute">Freelancer</p>
                  <p className="font-mono text-sm text-silver break-all">{freelancerAddress}</p>
                </div>
                <div className="rounded-xl bg-obsidian/60 border border-silver/10 p-4 space-y-3">
                  <p className="text-[10px] font-mono tracking-boutique uppercase text-silver-mute">
                    Milestones ({milestones.length})
                  </p>
                  {milestones.map((m, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-silver">{m.name}</span>
                      <span className="font-mono text-cyan">${parseFloat(m.amount || '0').toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-silver/10 pt-2 flex justify-between text-sm font-semibold">
                    <span className="text-silver">Total</span>
                    <span className="font-mono text-cyan">${total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-obsidian/60 border border-silver/10 p-4 flex justify-between text-sm">
                  <span className="text-silver-mute">Auto-release window</span>
                  <span className="font-mono text-silver">{autoRelease} days</span>
                </div>
                <p className="text-[11px] text-silver-mute text-center font-mono tracking-wider">
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
          onClick={() => (step === 0 ? navigate('/dashboard') : setStep(step - 1))}
          className="glass border-silver/15 gap-2 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 0 ? 'Cancel' : 'Back'}
        </Button>
        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="bg-cyan text-primary-foreground hover:bg-cyan-glow gap-2 glow-cyan rounded-xl"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleDeploy}
            className="bg-cyan text-primary-foreground hover:bg-cyan-glow gap-2 glow-cyan rounded-xl"
          >
            <Rocket className="h-4 w-4" />
            Deploy Escrow
          </Button>
        )}
      </div>
    </div>
  );
}
