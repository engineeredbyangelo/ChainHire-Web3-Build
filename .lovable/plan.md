

# ChainHire — Feature Cards Redesign, Auth, Escrow Flow, Detail & Profile Pages

## 1. Blockchain-Style Feature Cards (Landing Page)

Redesign the 6 feature cards to look like stylized smart contract blocks:

- Each card gets a "contract header" bar with a mock contract address (e.g., `0x7F2c...E9a1`) and a blinking green status dot
- Pseudo-code/Solidity-style snippet inside each card showing the feature as a function signature (e.g., `function autoRelease(uint256 milestoneId)`)
- Monospace font (JetBrains Mono) for the code snippets
- Line numbers on the left side in muted color
- Neon green terminal-style left border accent
- Glass background with subtle scan-line or grid-line overlay
- Hover effect: neon glow intensifies, border pulses

Example card layout:
```text
+----------------------------------------------+
| [green dot] 0x7F2c...E9a1  |  DEPLOYED       |
|----------------------------------------------|
|  1  // Non-Custodial Escrow                  |
|  2  contract ChainEscrow {                   |
|  3    function fund(uint256 amt)             |
|  4      external payable { ... }             |
|  5  }                                        |
|----------------------------------------------|
| Funds held in audited smart contracts...     |
+----------------------------------------------+
```

## 2. Wallet-Based Auth (Sign In / Sign Up)

Since this is a decentralized product, authentication will be wallet-first:

**New page: `/auth`**
- Clean centered card with glass-morphism styling
- ChainHire logo at top
- "Connect Wallet" as the primary CTA (large neon-green button)
- Visual showing supported wallets (MetaMask, WalletConnect, Coinbase icons)
- Subtext: "Connect your wallet to access ChainHire. No email or password needed."
- Polygon network badge to reinforce chain requirement
- Animated blockchain node connection graphic in the background (subtle)

**Auth flow (mock for now):**
- Clicking "Connect Wallet" simulates wallet connection
- Stores a mock wallet address in local state (or Zustand later)
- Redirects to `/dashboard`
- Navbar updates to show connected wallet address
- "Disconnect" option in wallet dropdown

**Route protection:**
- Dashboard, Create Escrow, Profile, Escrow Detail routes require "connected" state
- Redirect to `/auth` if not connected

## 3. Create Escrow Flow (`/create`)

Multi-step form with progress indicator:

**Step 1 — Freelancer Wallet**
- Input for freelancer wallet address (with 0x validation)
- Paste button, address format hint

**Step 2 — Milestones**
- Dynamic milestone list (add/remove)
- Each milestone: name, description (optional), amount in USDC
- Sequential ordering enforced visually
- Running total displayed
- Minimum 1 milestone required

**Step 3 — Settings**
- Auto-release window (default 7 days, slider or dropdown: 3/5/7/14/30 days)

**Step 4 — Review**
- Summary card showing: freelancer address, all milestones with amounts, total USDC, auto-release window
- Arbitration fee explanation (2.5% only if dispute arises)
- "Deploy Escrow" CTA (mock action, shows success toast)

**Styling:** Each step in a glass card, step indicator at top with neon progress line, animated transitions between steps using framer-motion.

## 4. Escrow Detail Page (`/escrow/:id`)

**EscrowHeroCard (top section):**
- Contract address (monospace, copyable)
- Total USDC amount (large)
- Status badge (Active/Disputed/Completed)
- Countdown timer ring for auto-release (animated SVG circle)
- Client and freelancer wallet addresses

**MilestoneTimeline:**
- Vertical layout on mobile, horizontal on desktop
- Each milestone node: name, amount, status badge
- Completed milestones: checkmark icon, neon green line
- Active milestone: pulsing dot, violet accent
- Locked milestones: lock icon, muted/dimmed
- Sequential progression line connecting all nodes

**Action CTAs (role-dependent):**
- Freelancer view: "Mark Complete" (on active milestone), "Auto Release Available" (glowing neon when eligible)
- Client view: "Approve Milestone" (on completed milestone)
- Either party: "Raise Dispute" (destructive red button)
- Actions are mock — show toast on click

**DisputeBanner:**
- Shown when status is `disputed`
- Full-width red/destructive gradient banner
- Pulsing warning icon
- Text: "This contract is under dispute. All milestone actions are locked."

**Activity Feed:**
- Scrollable list of escrow events from mock data
- Each event: icon, description, relative timestamp, tx hash link (mock)

## 5. Profile Page (`/profile`)

**Profile Header:**
- Large wallet address (monospace)
- Display name (editable mock)
- Avatar placeholder with gradient ring

**ReputationBadge:**
- Animated circular SVG ring showing score progress
- Score number in center
- Tier label below (Bronze/Silver/Gold/Diamond)
- Tier-specific color: bronze=#CD7F32, silver=#C0C0C0, gold=#FFD700, diamond=cyan

**Stats Grid:**
- Completed Escrows count
- Total Earned (USDC)
- Dispute rate
- Member since

**Escrow History:**
- List of all escrows (reuses EscrowCard component)
- Filter tabs: All / Active / Completed / Disputed

---

## Technical Details

### New Files
- `src/pages/Auth.tsx` — Wallet connect page
- `src/pages/CreateEscrow.tsx` — Multi-step escrow creation
- `src/pages/EscrowDetail.tsx` — Full escrow detail view
- `src/pages/Profile.tsx` — User profile and reputation
- `src/components/landing/FeatureContractCard.tsx` — Blockchain-styled feature card
- `src/components/escrow/MilestoneTimeline.tsx` — Visual timeline component
- `src/components/escrow/EscrowHeroCard.tsx` — Hero card for detail page
- `src/components/escrow/DisputeBanner.tsx` — Dispute warning banner
- `src/components/escrow/ActivityFeed.tsx` — Event activity feed
- `src/components/escrow/CountdownRing.tsx` — Animated SVG countdown
- `src/components/profile/ReputationBadge.tsx` — Animated score ring
- `src/contexts/WalletContext.tsx` — Simple React context for mock wallet state

### Modified Files
- `src/pages/Landing.tsx` — Replace feature cards with new blockchain-styled cards
- `src/App.tsx` — Add new routes (`/auth`, `/create`, `/escrow/:id`, `/profile`)
- `src/components/layout/Navbar.tsx` — Connect/disconnect wallet state, auth-aware links
- `src/lib/mock-data.ts` — Add mock evidence and dispute data

### Routing
- `/` — Landing page (public)
- `/auth` — Wallet connection (public)
- `/dashboard` — Dashboard (protected)
- `/create` — Create escrow flow (protected)
- `/escrow/:id` — Escrow detail (protected)
- `/profile` — User profile (protected)

All protected routes redirect to `/auth` if wallet not connected.

