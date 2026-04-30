
# Future Brutalist Redesign — ChainHire Landing

A targeted overhaul of the landing page that keeps the existing protocol narrative (Hero → How it Works → Live Protocol → Audiences → Benefits → CTA) but reskins the entire visual system and adds a new Trust Node section. No backend or routing changes.

---

## 1. Visual System Overhaul (`src/index.css`, `tailwind.config.ts`)

**Palette — Midnight to Obsidian**
- `--background`: deep midnight (220 40% 4%) instead of pure black, so the gradient reads.
- New tokens: `--obsidian` (220 50% 2%), `--midnight` (225 45% 8%), `--silver` (210 15% 88%), `--silver-mute` (210 12% 65%).
- Re-tune `--neon` → "neon-cyan" (180 100% 55%) as the primary high-contrast accent; keep current neon-green available as `--accent-emerald` for legacy components so other pages don't break.
- Body gets a fixed radial + linear gradient: obsidian at edges, midnight in the center.

**Materiality**
- Upgrade `.glass`: `backdrop-blur-2xl`, 4–6% white fill, 1px hairline border in `silver/15%`, inner highlight via `box-shadow: inset 0 1px 0 hsl(var(--silver)/0.08)`.
- New `.grain` utility — tiny inline SVG noise (data-URI) at 4% opacity, mix-blend-overlay, applied at the page root.
- New `.aura` utility — radial cyan/silver glow blob component for section corners.
- Adjust `.grid-bg` lines to `silver/6%` (was neon-green) so it reads as architectural blueprint, not gamer-green. Keep the breathing pulse.

**Typography**
- Swap Google Font import: drop Orbitron/Space Grotesk, load **Inter** (300/400/500/600/700) and keep **JetBrains Mono**.
- `font-sans` → Inter, `font-display` → Inter (tight weights, wide tracking).
- Headings: `tracking-[-0.02em]` for large display, `tracking-[0.18em] uppercase` for eyebrow labels — boutique editorial feel.

---

## 2. Hero — "Exclusive" Hook (`src/pages/Landing.tsx`, `HeroScene.tsx`)

- Slim eyebrow chip → uppercase wide-tracked label "Trust Layer · Polygon · Audited".
- Headline shifts from neon-green to **liquid silver** gradient text (silver → cyan). Smaller, tighter, more confident: ~text-6xl max.
- Replace dual CTAs with one **Glass-Card CTA**: a single elevated glass panel containing "Launch App →" plus a fine-print row beneath ("No KYC · No platform fees · 2.5% arbitration only"). Outline CTA becomes a quiet text link.
- `HeroScene`: swap emissive neon-green for cyan + a faint silver rim light, distortion turned down for a calmer, premium feel. Slow ring rotation.

---

## 3. Core Pillars — Bento Reveal (replaces current "How it Works" stagger)

- Convert the 4 feature cards into an **asymmetric bento grid** (1 large hero tile + 3 supporting tiles) on desktop; vertical stack on mobile.
- Tiles use the new glass + grain + hairline border, with a corner aura matched to the tile's role (security=cyan, automation=silver, arbitration=violet retained, reputation=cyan).
- Each tile reveals on scroll with a spring (stiffness ~120, damping ~18) — staggered 80ms.
- Wireframe 3D icon stays but rendered smaller and monochromatic (cyan/silver only).

---

## 4. Trust Node — New Section (terminal-style)

A new section inserted between "Live Protocol" and "Audiences":

```text
┌─ TRUST.NODE ──────────────── status: ONLINE ─┐
│ contract     0x7F2c…E9a1                     │
│ network      polygon-mainnet (chain 137)     │
│ audit        OpenZeppelin · 2025-11          │
│ tvl          $4.2M USDC                      │
│ uptime       99.998%   ▰▰▰▰▰▰▰▰▰▰           │
│ block        72,481,329  ◉ live              │
└──────────────────────────────────────────────┘
```

- Implemented as a glass card with mono font, blinking cursor, and a typewriter line at the bottom that cycles ("verifying milestone…", "settlement confirmed", "auto-release armed").
- Right column: three small data cards (Audited, On-chain, Permissionless) with silver hairline icons.
- Lives in a new component `src/components/landing/TrustNode.tsx`.

---

## 5. Audiences, Benefits, CTA — Reskin only

- Audience bento: same grid, but new glass treatment, silver eyebrow tags instead of neon, cyan accent dot.
- Benefits panel: stat tile gets liquid-silver gradient text for "$0", hairline dividers replace solid borders.
- Final CTA: full-width glass plate centered on a soft cyan aura, single CTA, removing the secondary text noise.

---

## 6. Motion — PWA-grade Spring Feel

- Centralize a spring preset in Landing.tsx (`type: 'spring', stiffness: 140, damping: 20, mass: 0.9`) and apply to all `whileInView` reveals, replacing the current ease curves.
- Buttons: add `whileTap={{ scale: 0.97 }}` and `whileHover={{ y: -2 }}` to the hero/CTA buttons (wrap in `motion.div`).
- Section entries use `viewport={{ once: true, margin: '-15%' }}` so they trigger earlier on mobile.

---

## 7. Mobile

- Hero typography scales down to `text-4xl` with the same tracking; CTA glass card becomes full-width with safe-area padding.
- Bento collapses to single column with full-bleed cards (rounded-3xl).
- Trust Node terminal stays mono but font-size shrinks to 11px and horizontal-scrolls if needed.
- Existing `MobileShowcase` already handles the phone animation — only restyle the surrounding section to match new palette (silver text, cyan accent dot).

---

## Files Changed

- `src/index.css` — palette tokens, Inter import, `.glass`, `.grain`, `.aura`, `.grid-bg` retune.
- `tailwind.config.ts` — add silver/midnight/obsidian colors, swap font families.
- `src/pages/Landing.tsx` — restructure hero CTA, bento pillars, insert `<TrustNode />`, reskin remaining sections, centralize spring preset.
- `src/components/landing/HeroScene.tsx` — cyan/silver lighting, calmer distortion.
- `src/components/landing/FeatureWireframeCard.tsx` — bento variants (large vs. compact), new glass treatment.
- `src/components/landing/MobileShowcase.tsx` — restyle accents to cyan/silver (no logic change).
- **new** `src/components/landing/TrustNode.tsx` — terminal-style trust/audit panel.

## Out of Scope

- Other pages (Dashboard, Profile, Auth, Docs) keep their current visual system; the new color tokens are additive so nothing breaks. A follow-up pass can propagate the redesign app-wide.
- No new backend, auth, or data work.
