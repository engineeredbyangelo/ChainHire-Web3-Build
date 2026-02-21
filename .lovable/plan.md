

# ChainHire — Implementation Plan

## Overview
ChainHire is a non-custodial USDC escrow platform on Polygon for crypto-native freelancers and clients. We'll build the full UI with mock data first, then wire up Supabase and smart contract integration.

---

## Phase 1: Design System & Core Layout

### Visual Foundation
- Deep slate background with violet → cyan gradient accents
- Glass-morphism card components with soft glows
- Custom color tokens and animation system (subtle fade-ins, hover lifts, spring animations)
- Mobile-first responsive layout with sticky bottom action dock

### Core Layout Components
- App shell with top navigation bar (wallet connect button, logo, nav links)
- 12-column grid layout for desktop, stacked mobile layout
- Max-width containers and consistent spacing system

---

## Phase 2: Pages & UI Components (Mock Data)

### Landing / Dashboard Page
- Overview stats (active escrows, total USDC locked, reputation score)
- List of user's escrows as **EscrowCards** with gradient borders, status badges, and animated progress bars
- Quick-action buttons: "Create Escrow" and "View History"

### Create Escrow Flow (Multi-Step Form)
- Step 1: Enter freelancer wallet address
- Step 2: Add sequential milestones (name, amount, description) — dynamic add/remove
- Step 3: Set auto-release window (default 7 days, configurable)
- Step 4: Review screen showing total USDC, milestone breakdown, and arbitration fee explanation
- Validation: at least 1 milestone, valid wallet addresses, positive amounts

### Escrow Detail Page
- **EscrowHeroCard**: Total USDC, contract state badge, countdown timer (animated ring)
- **MilestoneTimeline**: Vertical on mobile, horizontal on desktop, with sequential lock icons
- Action CTAs contextual to role:
  - Freelancer: "Mark Complete", "Auto Release Available" (glowing when eligible)
  - Client: "Approve Milestone"
  - Either party: "Raise Dispute"
- Activity feed showing escrow events
- **DisputeBanner**: Full-width red gradient with pulsing icon when contract is disputed

### Dispute / Evidence Page
- Evidence submission form (text + file upload)
- Timeline of submitted evidence from both parties
- Dispute status and resolution details

### Profile Page
- Wallet address and identity info
- **ReputationBadge**: Animated circular score ring, tier-colored (Bronze/Silver/Gold/Diamond)
- Escrow history and stats

### Admin Arbitration Panel (email auth)
- Dispute queue with filters
- Dispute detail view with evidence from both parties
- Resolution form: enter split amounts, confirm 2.5% fee
- Submit resolution action

---

## Phase 3: Supabase Backend

### Database Schema
- **profiles**: wallet address, display name, avatar, created_at
- **escrows**: client/freelancer wallets, escrow_address, status, milestone count, total amount, auto-release window
- **milestones**: linked to escrow, sequential index, amount, status, completed_at
- **escrow_events**: event type, timestamp, tx hash, milestone index
- **disputes**: linked to escrow, raised_by, evidence entries, resolution details
- **reputation_snapshots**: wallet, score, tier, computed_at
- **admin_wallets**: allowlist table for admin access

### Authentication
- Wallet-based auth for users (via RainbowKit + wagmi + Supabase custom auth)
- Email/password auth for admin arbitration panel
- Role-based access using a separate user_roles table

### RLS Policies
- Profiles: wallet owner can update own record
- Escrows: readable by client or freelancer only
- Milestones: readable by escrow participants
- Disputes: participants can insert evidence, admins can resolve
- Admin tables: restricted to admin role

---

## Phase 4: Wallet & Contract Integration

### Wallet Connection
- RainbowKit + wagmi setup with Polygon chain enforcement
- Chain switching prompt if wrong network detected
- Zustand store for wallet state and pending transactions

### Smart Contract Scaffolding
- Solidity contract files for EscrowFactory and Escrow (for external deployment)
- TypeScript ABIs and contract interaction hooks
- Mock contract interactions during development

### Contract Integration (Post-Deployment)
- Wire up Create Escrow → Factory deploy → fund flow
- Milestone actions: markComplete, approve, autoRelease
- Dispute actions: raiseDispute, resolveDispute
- Event syncing: on-chain events → Supabase escrow_events table

---

## Phase 5: Reputation & Polish

### Reputation System
- Off-chain score computation from escrow history
- Score formula: +10 per completed escrow, +2 per milestone, -15 per lost dispute, +5 bonus for clean record
- Tier display: Bronze / Silver / Gold / Diamond
- Periodic snapshot storage in Supabase

### Final Polish
- Optimistic UI updates for pending transactions
- Toast notifications for transaction states
- Loading skeletons and error states
- Mobile responsiveness pass
- Animation refinements

