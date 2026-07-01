Docs page is already clean (Launch App removed, "Not live yet" footer visible). Now: roadmap to get ChainHire in front of real users via a private beta on Polygon, focused on smart contracts, core escrow flows, and launch readiness.

## Phase 1 — Smart contracts & on-chain integration

Foundation everything else depends on.

- **Contracts (separate `/contracts` workspace, Foundry or Hardhat):**
  - `ChainEscrow.sol` — non-custodial USDC escrow, per-milestone funding/release, party roles (client, freelancer, arbiter).
  - `Arbitration.sol` — dispute open/resolve, 2.5% fee split, evidence hash on-chain.
  - `AutoRelease` logic — 7-day deadline, permissionless `release()` after expiry.
  - `Reputation.sol` (or off-chain events indexed) — emits `ReputationUpdated` on completion/dispute.
- **Testing & audit:**
  - Full Foundry unit + fuzz tests, invariant tests for balance conservation.
  - Deploy to Polygon Amoy testnet first; run an internal review, then a paid audit (Spearbit/Hats/lightweight boutique) before mainnet.
- **Frontend wiring (wagmi + viem):**
  - Replace mock data in `src/lib/mock-data.ts` with real contract reads via `useReadContract` / `useWatchContractEvent`.
  - USDC `approve` → `fund` two-step flow with clear UX and gas estimates.
  - Transaction states: pending, confirming, success, reverted, with toasts.
  - Event indexer: lightweight Supabase edge function polling logs (or Envio/Ponder) that mirrors escrows into Postgres for fast dashboard reads.

## Phase 2 — Core product flows end-to-end

Everything a beta user must be able to do without help.

- **Create escrow** (`CreateEscrow.tsx`): connect wallet, define milestones, counterparty address ENS-resolvable, USDC approve + fund in one guided flow.
- **Fund & release**: milestone-by-milestone release, partial release, freelancer-side "request release" nudge.
- **Auto-release timer**: real on-chain deadline reflected in `CountdownRing`, permissionless release button after expiry.
- **Dispute**: open dispute UI with evidence upload (Supabase Storage → IPFS pin via edge function), arbiter dashboard, resolution flow with split slider.
- **Notifications**: email on milestone funded / release requested / dispute opened / deadline near (uses Lovable Cloud email infra).
- **Activity feed & dashboard**: real events from indexer, filtering by role, empty states.
- **Profile & reputation**: computed from on-chain history, tier badges, public `/profile/:address` route.

## Phase 3 — Trust, compliance & launch readiness

What turns "demo" into "beta users trust it with real USDC".

- **Legal**: Terms of Service, Privacy Policy, disclaimer that ChainHire is a non-custodial protocol (no fiduciary duty), arbitration ToS. Route: `/legal/*`.
- **Security**:
  - Contract audit report published (`/docs/audit`).
  - RLS review on every Supabase table; roles in a separate `user_roles` table (arbiter role gates the arbiter dashboard).
  - Add `security--run_security_scan` to CI mindset before publish.
- **Waitlist for private beta**:
  - Landing CTA changes from "Read Docs" only → also "Join Waitlist".
  - Supabase table `waitlist(email, wallet_address, role_interest, created_at)` with grants + RLS (anon insert only).
  - Confirmation email via Lovable transactional email; admin export view.
  - Invite mechanism: `beta_invites(code, redeemed_by, expires_at)` gated at `/auth`.
- **Ops & observability**:
  - Error monitoring (Sentry) on frontend + edge functions.
  - PostHog or Plausible for funnel analytics (waitlist → connect → first escrow).
  - Health check for indexer lag.
- **Content & SEO**:
  - Real `<title>`, meta description, OG image, JSON-LD `SoftwareApplication`.
  - `/docs` split into deeper pages (contracts, fees, arbitration, security) for indexable long-tail.
  - Remove the "Not live yet" note once beta opens; replace with "Private beta — invite only".
- **Beta launch checklist:**
  1. Contracts audited & deployed to Polygon mainnet with caps (max escrow size, e.g. $5k).
  2. Multisig ownership for admin/pause functions (Safe on Polygon).
  3. Circuit-breaker `pause()` on the escrow contract.
  4. Waitlist → invite codes → cohort of ~25 users.
  5. Feedback loop: in-app Canny/Featurebase or simple `feedback` table.
  6. Public status page (uptime, indexer lag, contract addresses).

## Suggested build order (rough sprints)

```text
Sprint 1  Contracts v1 + Foundry tests + Amoy deploy
Sprint 2  Wagmi wiring: create/fund/release on Amoy, indexer MVP
Sprint 3  Dispute + arbiter dashboard + notifications
Sprint 4  Waitlist + legal + auth gating + Sentry/analytics
Sprint 5  Audit remediation + mainnet deploy + private beta launch
```

## Open questions before I start building

1. **Contracts**: Do you already have Solidity code (repo/gist) or should we scaffold from scratch inside a new `/contracts` folder?
2. **Arbiter model**: Single admin arbiter to start, curated pool, or Kleros-style? Impacts contract + dashboard scope.
3. **Chain**: Polygon PoS mainnet only, or also zkEVM/Base for beta?
4. **Audit budget**: Determines whether we target a boutique audit (~$15-40k) or run community review + bug bounty only.

Once you pick a starting sprint I'll produce a focused implementation plan for just that slice.
