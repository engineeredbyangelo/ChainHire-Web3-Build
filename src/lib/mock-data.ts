export type EscrowStatus = 'active' | 'disputed' | 'completed' | 'resolved';
export type MilestoneStatus = 'locked' | 'active' | 'completed' | 'released' | 'disputed';
export type ReputationTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface Milestone {
  id: string;
  name: string;
  description: string;
  amount: number;
  status: MilestoneStatus;
  completedAt?: string;
  releasedAt?: string;
}

export interface EscrowEvent {
  id: string;
  type: 'created' | 'funded' | 'milestone_completed' | 'milestone_approved' | 'auto_released' | 'dispute_raised' | 'resolved';
  description: string;
  timestamp: string;
  txHash?: string;
  milestoneIndex?: number;
}

export interface Escrow {
  id: string;
  escrowAddress: string;
  clientWallet: string;
  freelancerWallet: string;
  status: EscrowStatus;
  totalAmount: number;
  milestones: Milestone[];
  autoReleaseWindow: number; // days
  createdAt: string;
  events: EscrowEvent[];
}

export interface UserProfile {
  wallet: string;
  displayName: string;
  avatar?: string;
  reputationScore: number;
  tier: ReputationTier;
  completedEscrows: number;
  totalEarned: number;
}

export const getTier = (score: number): ReputationTier => {
  if (score >= 400) return 'diamond';
  if (score >= 150) return 'gold';
  if (score >= 50) return 'silver';
  return 'bronze';
};

export const tierColors: Record<ReputationTier, string> = {
  bronze: '30 60% 50%',
  silver: '220 10% 65%',
  gold: '45 93% 47%',
  diamond: '187 72% 50%',
};

export const mockUser: UserProfile = {
  wallet: '0x1a2B...9cDe',
  displayName: 'cryptobuilder.eth',
  reputationScore: 185,
  tier: 'gold',
  completedEscrows: 12,
  totalEarned: 47_500,
};

export const mockEscrows: Escrow[] = [
  {
    id: '1',
    escrowAddress: '0xABC...123',
    clientWallet: '0x1a2B...9cDe',
    freelancerWallet: '0x5f6G...3hIj',
    status: 'active',
    totalAmount: 5000,
    autoReleaseWindow: 7,
    createdAt: '2026-02-15T10:00:00Z',
    milestones: [
      { id: 'm1', name: 'Design System', description: 'Complete UI/UX design', amount: 1500, status: 'released', completedAt: '2026-02-17T10:00:00Z', releasedAt: '2026-02-17T12:00:00Z' },
      { id: 'm2', name: 'Frontend Build', description: 'Build React frontend', amount: 2000, status: 'completed', completedAt: '2026-02-20T10:00:00Z' },
      { id: 'm3', name: 'Integration', description: 'API & smart contract integration', amount: 1500, status: 'locked' },
    ],
    events: [
      { id: 'e1', type: 'created', description: 'Escrow created', timestamp: '2026-02-15T10:00:00Z', txHash: '0xabc...' },
      { id: 'e2', type: 'funded', description: 'Contract funded with 5,000 USDC', timestamp: '2026-02-15T10:05:00Z', txHash: '0xdef...' },
      { id: 'e3', type: 'milestone_completed', description: 'Milestone 1 marked complete', timestamp: '2026-02-17T10:00:00Z', milestoneIndex: 0 },
      { id: 'e4', type: 'milestone_approved', description: 'Milestone 1 approved & released', timestamp: '2026-02-17T12:00:00Z', milestoneIndex: 0, txHash: '0xghi...' },
      { id: 'e5', type: 'milestone_completed', description: 'Milestone 2 marked complete', timestamp: '2026-02-20T10:00:00Z', milestoneIndex: 1 },
    ],
  },
  {
    id: '2',
    escrowAddress: '0xDEF...456',
    clientWallet: '0x7kLm...4nOp',
    freelancerWallet: '0x1a2B...9cDe',
    status: 'disputed',
    totalAmount: 8000,
    autoReleaseWindow: 7,
    createdAt: '2026-02-10T08:00:00Z',
    milestones: [
      { id: 'm4', name: 'Smart Contract Audit', description: 'Security audit of contracts', amount: 3000, status: 'released', completedAt: '2026-02-12T10:00:00Z', releasedAt: '2026-02-13T10:00:00Z' },
      { id: 'm5', name: 'Fix Critical Issues', description: 'Fix audit findings', amount: 3000, status: 'disputed' },
      { id: 'm6', name: 'Final Report', description: 'Deliver final audit report', amount: 2000, status: 'locked' },
    ],
    events: [
      { id: 'e6', type: 'created', description: 'Escrow created', timestamp: '2026-02-10T08:00:00Z' },
      { id: 'e7', type: 'funded', description: 'Contract funded with 8,000 USDC', timestamp: '2026-02-10T08:10:00Z' },
      { id: 'e8', type: 'dispute_raised', description: 'Dispute raised by client', timestamp: '2026-02-18T14:00:00Z' },
    ],
  },
  {
    id: '3',
    escrowAddress: '0xGHI...789',
    clientWallet: '0x1a2B...9cDe',
    freelancerWallet: '0x9qRs...6tUv',
    status: 'completed',
    totalAmount: 3200,
    autoReleaseWindow: 7,
    createdAt: '2026-01-20T12:00:00Z',
    milestones: [
      { id: 'm7', name: 'Logo Design', description: 'Create brand logo', amount: 1200, status: 'released', completedAt: '2026-01-25T10:00:00Z', releasedAt: '2026-01-26T10:00:00Z' },
      { id: 'm8', name: 'Brand Guide', description: 'Complete brand guidelines', amount: 2000, status: 'released', completedAt: '2026-02-01T10:00:00Z', releasedAt: '2026-02-02T10:00:00Z' },
    ],
    events: [
      { id: 'e9', type: 'created', description: 'Escrow created', timestamp: '2026-01-20T12:00:00Z' },
      { id: 'e10', type: 'milestone_approved', description: 'All milestones completed', timestamp: '2026-02-02T10:00:00Z' },
    ],
  },
];
