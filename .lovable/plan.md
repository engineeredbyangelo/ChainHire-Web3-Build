
# Apply Future Brutalist Branding to All Pages

The token-level changes already done (cyan `--neon`, midnight `--background`, Inter font, refined `.glass`) auto-propagate to every page. This pass refines the remaining surfaces — Navbar, app shell, auth, dashboard, profile, create-escrow, escrow detail, docs — so the entire app feels like one boutique product, not just the landing page.

---

## 1. Global polish (`src/index.css`)

- Make `.font-display` render as Inter 600 with `letter-spacing: -0.02em` so every existing `font-display` heading across pages instantly gets the new boutique look (no per-page edits needed).
- Add a global `h1, h2, h3, h4 { letter-spacing: -0.02em }` so even non-`font-display` headings tighten up.

## 2. App Shell (`src/components/layout/AppShell.tsx`)

- Add the global `grain` overlay so every page inherits the subtle noise texture used on the landing.
- Wrap `<main>` as `relative` so per-page auras can layer correctly.

## 3. Navbar (`src/components/layout/Navbar.tsx`)

- Replace the bold Orbitron logotype with a clean Inter logo: small cyan square + "ChainHire" in `text-silver` with tight tracking.
- Hairline border (`border-silver/10`) instead of `border-border/30` for a more architectural feel.
- Replace the gradient-neon Connect button with a flat cyan button matching the Hero CTA.
- Mobile drawer reuses the same `glass` + cyan accents.

## 4. Auth (`src/pages/Auth.tsx`)

- Swap `gradient-border` panel for `glass-strong grain rounded-3xl`.
- Logo block: keep the cyan square; replace the `text-gradient` Orbitron headline with `tracking-[-0.02em]` Inter.
- Floating particle dots → `bg-cyan/40` (already auto-cyan via token).
- Add an `aura-cyan` blob behind the card.
- Submit button uses the same boutique style: `bg-cyan text-primary-foreground glow-cyan`, replacing the bordered neon-outline button.
- Eyebrow tag at top using the boutique tracking pattern (`text-[10px] font-mono tracking-boutique uppercase`).

## 5. Dashboard (`src/pages/Dashboard.tsx`)

- Replace `gradient-neon` "New Escrow" CTA with a flat cyan button + `glow-cyan`.
- Page heading wrapped with eyebrow ("Your Workspace") and silver gradient applied to the keyword.
- Wrap the stat row / escrow grid with consistent vertical rhythm (py-12).

## 6. Profile (`src/pages/Profile.tsx`)

- Avatar block: `gradient-neon` ring → `bg-cyan glow-cyan` with an outer silver hairline ring.
- Section headings get the eyebrow + tight Inter heading treatment.
- Cards using `bg-card` + `border` get upgraded to the new `glass` utility for consistency.

## 7. Create Escrow (`src/pages/CreateEscrow.tsx`)

- Step indicator: active step uses `bg-cyan text-primary-foreground glow-cyan`; future steps use `border border-silver/15`; current step gets `border-cyan text-cyan`.
- Milestone "+" tile uses cyan focus ring.
- Bottom Deploy / Next buttons use the flat cyan style.
- Wrap form panels in `glass grain rounded-2xl`.

## 8. Escrow Detail (`src/pages/EscrowDetail.tsx`)

- Action buttons (`Mark complete`, `Approve`, `Auto-release`): switch from `gradient-neon glow-neon` to `bg-cyan glow-cyan`; the secondary outline button uses `border-cyan/30 text-cyan glass`.
- Section panels move to `glass`.

## 9. Docs (`src/pages/Docs.tsx`)

- Sidebar logo + headers: same cyan-square + Inter treatment as Navbar.
- Body headings use the boutique eyebrow + `tracking-[-0.02em]` style.
- "Get started" CTA at the bottom uses the same flat cyan button.
- Inline code blocks already use `font-mono` (JetBrains) — verify and bump background to `bg-obsidian/60 border-silver/10` for consistency with the landing's terminal feel.

## 10. Escrow components (cards, milestones, badges, etc.)

These already use semantic tokens (`bg-card`, `border-border`, `text-muted-foreground`) so they auto-inherit the new palette. Light pass:

- `StatCard`: replace `bg-card` + `border` with the `.glass` utility.
- `EscrowCard` / `EscrowHeroCard`: hairline silver borders, cyan accent dots replace any green dots that were hardcoded.
- `CountdownRing`: confirm stroke uses `hsl(var(--neon))` (now cyan) — already token-driven, just verify visually.
- `ReputationBadge`: tier colors stay (Bronze/Silver/Gold/Diamond), but the outer ring uses `border-silver/15`.

## Files Changed

- `src/index.css`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/Navbar.tsx`
- `src/pages/Auth.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Profile.tsx`
- `src/pages/CreateEscrow.tsx`
- `src/pages/EscrowDetail.tsx`
- `src/pages/Docs.tsx`
- `src/components/escrow/StatCard.tsx`
- `src/components/escrow/EscrowCard.tsx`
- `src/components/escrow/EscrowHeroCard.tsx`
- `src/components/profile/ReputationBadge.tsx`

## Out of Scope

- No backend, routing, data, or auth-flow changes.
- `Landing.tsx`, `MobileShowcase.tsx`, `TrustNode.tsx`, `HeroScene.tsx`, `FeatureWireframeCard.tsx` already redesigned in the previous turn — left as-is.
- shadcn UI primitives (`button.tsx`, `input.tsx`, etc.) already token-driven; not touched.
