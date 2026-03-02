# ChainHire — Developer & Architecture Guide

> **Purpose**: This document is the single source of truth for building, extending, and maintaining ChainHire outside of Lovable. Follow these conventions rigorously to keep the codebase consistent whether you're working in Lovable, VS Code, Cursor, or any other IDE.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Version Pins](#tech-stack--version-pins)
3. [Architecture](#architecture)
4. [Directory Structure](#directory-structure)
5. [Design System](#design-system)
6. [Component Conventions](#component-conventions)
7. [Routing & Auth](#routing--auth)
8. [Web3 Integration](#web3-integration)
9. [Backend (Lovable Cloud / Supabase)](#backend-lovable-cloud--supabase)
10. [State Management](#state-management)
11. [3D & Animation](#3d--animation)
12. [Testing](#testing)
13. [MCP Context7 — Dependency Verification](#mcp-context7--dependency-verification)
14. [Do's & Don'ts](#dos--donts)
15. [Scripts](#scripts)

---

## Project Overview

ChainHire is a **non-custodial USDC escrow platform on Polygon** for Web3 freelance work. Core features:

- Milestone-based escrow contracts
- Configurable 7-day auto-release window
- On-chain reputation system
- Dispute resolution with 2.5% arbitration fee
- Hybrid auth: Supabase (email/password) + Civic Auth Web3 (embedded wallets)

**Published URL**: `https://chainhire.lovable.app`

---

## Tech Stack & Version Pins

> ⚠️ **Use Context7 MCP** to verify latest compatible versions before upgrading any dependency.

| Layer | Technology | Pinned Version | Notes |
|---|---|---|---|
| **Framework** | React | `^18.3.x` | Do NOT upgrade to React 19 |
| **Build** | Vite | `^5.4.x` | SWC plugin for fast refresh |
| **Language** | TypeScript | `^5.8.x` | Strict mode enabled |
| **Styling** | Tailwind CSS | `^3.4.x` | With `tailwindcss-animate` |
| **UI Components** | shadcn/ui (Radix) | Various `^1.x–^2.x` | Customized with CVA variants |
| **Animation** | Framer Motion | `^12.x` | Landing page transitions |
| **3D** | Three.js | `^0.160.1` | Pinned — do not bump |
| **3D React** | @react-three/fiber | `^8.18.0` | **Not v9+** (requires React 19) |
| **3D Helpers** | @react-three/drei | `^9.122.0` | **Not v10+** |
| **Routing** | react-router-dom | `^6.30.x` | BrowserRouter, no data loaders |
| **Server State** | TanStack React Query | `^5.x` | For Supabase data fetching |
| **Forms** | react-hook-form + zod | `^7.x` / `^3.x` | With `@hookform/resolvers` |
| **Web3** | wagmi | `^3.5.x` | Polygon chain config |
| **Web3 Wallet** | viem | `^2.46.x` | Transport layer for wagmi |
| **Web3 Identity** | @civic/auth-web3 | `^0.10.x` | Embedded wallet provisioning |
| **Backend** | Supabase (Lovable Cloud) | `^2.97.x` | Auth, DB, Edge Functions |
| **Charts** | Recharts | `^2.15.x` | Dashboard visualizations |

### Critical Version Constraints

```
@react-three/fiber MUST be ^8.x (v9+ requires React 19)
@react-three/drei  MUST be ^9.x (v10+ requires React 19)
three              MUST be ^0.160.x (matched with @types/three)
```

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Browser                        │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Landing  │  │   Auth   │  │  Protected    │  │
│  │  (public) │  │  (login) │  │  (Dashboard,  │  │
│  │          │  │          │  │   Escrow, …)  │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│       │              │              │             │
│       └──────────────┼──────────────┘             │
│                      ▼                            │
│         ┌────────────────────────┐                │
│         │   Provider Stack       │                │
│         │  QueryClient           │                │
│         │  └─ TooltipProvider    │                │
│         │     └─ WagmiProvider   │                │
│         │        └─ AuthProvider │                │
│         └────────────────────────┘                │
│                      │                            │
│         ┌────────────┴────────────┐               │
│         ▼                         ▼               │
│  Supabase Client            wagmi/viem            │
│  (auth, DB, storage)       (Polygon RPC)          │
│         │                         │               │
└─────────┼─────────────────────────┼───────────────┘
          ▼                         ▼
   Lovable Cloud              Polygon Network
   (Supabase)                 (USDC contracts)
```

### Provider Hierarchy (order matters)

```tsx
QueryClientProvider → TooltipProvider → BrowserRouter → WagmiProvider → AuthProvider
```

---

## Directory Structure

```
src/
├── assets/                    # Static assets (images, fonts — ES6 imported)
├── components/
│   ├── ui/                    # shadcn/ui primitives (DO NOT customize inline)
│   ├── layout/                # AppShell, Navbar
│   ├── landing/               # Landing page sections & 3D components
│   ├── escrow/                # Escrow feature components
│   └── profile/               # Profile-related components
├── contexts/
│   ├── AuthContext.tsx         # Supabase email/password auth
│   └── CivicAuthContext.tsx    # Civic Web3 embedded wallet auth
├── hooks/                     # Custom React hooks
├── integrations/
│   └── supabase/
│       ├── client.ts          # ⛔ AUTO-GENERATED — never edit
│       └── types.ts           # ⛔ AUTO-GENERATED — never edit
├── lib/
│   ├── utils.ts               # cn() and shared utilities
│   ├── wagmi-config.ts        # wagmi chain & connector config
│   └── mock-data.ts           # Development mock data
├── pages/                     # Route-level page components
├── test/                      # Test setup & test files
├── index.css                  # Design system tokens & utilities
├── App.tsx                    # Root component with provider stack
└── main.tsx                   # Entry point

supabase/
├── config.toml                # ⛔ AUTO-GENERATED — never edit
├── functions/                 # Edge Functions (Deno runtime)
│   └── <function-name>/
│       └── index.ts
└── migrations/                # ⛔ READ-ONLY — managed by Lovable Cloud
```

### Files You Must NEVER Edit

| File | Reason |
|---|---|
| `src/integrations/supabase/client.ts` | Auto-generated by Lovable Cloud |
| `src/integrations/supabase/types.ts` | Auto-generated from DB schema |
| `supabase/config.toml` | Managed by Lovable Cloud |
| `.env` | Managed by Lovable Cloud |
| `supabase/migrations/*` | Managed by Lovable Cloud |

---

## Design System

### Philosophy

**Black Blockchain Aesthetic** — dark-first, neon-accented, glass-morphic UI. Every color in the system is defined as an HSL CSS variable and mapped through Tailwind.

### Color Tokens (index.css → tailwind.config.ts)

```
--background:  0 0% 3%        (near-black)
--foreground:  0 0% 95%       (off-white)
--card:        0 0% 6%        (dark card)
--primary:     160 100% 50%   (neon green — brand color)
--accent:      263 70% 58%    (violet)
--neon:        160 100% 50%   (alias for primary)
--violet:      263 70% 58%    (purple accent)
--cyan:        187 72% 50%    (blue accent)
--glass:       0 0% 8%        (glass background)
--glass-border: 0 0% 15%     (glass border)
```

### Rules

1. **NEVER** use raw color values (`text-white`, `bg-black`, `text-green-500`) — always use semantic tokens
2. **All colors must be HSL** in both `index.css` and `tailwind.config.ts`
3. Use utility classes: `glass`, `glow-neon`, `glow-violet`, `text-gradient`, `gradient-border`, `grid-bg`
4. New colors → add to `index.css` as CSS variable → map in `tailwind.config.ts`

### Typography

| Role | Font | Tailwind Class |
|---|---|---|
| Body | Space Grotesk | `font-sans` (default) |
| Display/Headings | Orbitron | `font-display` |
| Code/Mono | JetBrains Mono | `font-mono` |

### Utility Classes

```css
.glass           /* Frosted glass effect with backdrop-blur */
.glow-neon       /* Neon green box-shadow glow */
.glow-violet     /* Violet box-shadow glow */
.glow-cyan       /* Cyan box-shadow glow */
.text-gradient   /* Neon-to-cyan text gradient */
.gradient-border /* Animated gradient border with ::before */
.grid-bg         /* Subtle grid background pattern */
```

---

## Component Conventions

### File Naming

- Components: `PascalCase.tsx` (e.g., `EscrowCard.tsx`)
- Hooks: `use-kebab-case.tsx` (e.g., `use-mobile.tsx`)
- Utilities: `kebab-case.ts` (e.g., `mock-data.ts`)
- Pages: `PascalCase.tsx` in `src/pages/`

### Component Structure

```tsx
// 1. Imports (React, libraries, local)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Component (named export preferred for non-pages)
export function MyComponent({ title, onAction }: MyComponentProps) {
  // hooks first
  const [state, setState] = useState(false);

  // handlers
  const handleClick = () => { /* ... */ };

  // render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl border border-glass-border/30 bg-card p-6"
    >
      <h3 className="text-xl font-bold font-display text-foreground">{title}</h3>
      <Button onClick={handleClick}>Action</Button>
    </motion.div>
  );
}
```

### Import Aliases

Always use `@/` path alias (maps to `src/`):

```tsx
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
```

### shadcn/ui Components

- Located in `src/components/ui/`
- Customize via **CVA variants**, not inline styles
- When adding new shadcn components, use the CLI or copy from shadcn/ui docs

---

## Routing & Auth

### Route Map

| Path | Component | Auth Required |
|---|---|---|
| `/` | `Landing` | No |
| `/docs` | `Docs` | No |
| `/auth` | `Auth` | No |
| `/dashboard` | `Dashboard` | ✅ |
| `/create` | `CreateEscrow` | ✅ |
| `/escrow/:id` | `EscrowDetail` | ✅ |
| `/profile` | `Profile` | ✅ |

### Protected Routes

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isConnected) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}
```

### Dual Auth System

| Context | File | Purpose |
|---|---|---|
| `AuthContext` | `src/contexts/AuthContext.tsx` | Supabase email/password — **currently active** in `App.tsx` |
| `CivicAuthContext` | `src/contexts/CivicAuthContext.tsx` | Civic Web3 embedded wallets — available but not wired into App.tsx provider stack |

To switch to Civic auth, replace `AuthProvider` with `CivicAuthWrapper` in `App.tsx`.

---

## Web3 Integration

### Chain Config

- **Network**: Polygon (chainId 137)
- **Configured in**: `src/lib/wagmi-config.ts`

### Wallet Connectors

1. **Civic Embedded Wallet** — auto-provisioned on sign-in
2. **MetaMask** (injected)
3. **Coinbase Wallet**
4. **WalletConnect** (needs real project ID for production)

### Adding New Chains

```ts
// wagmi-config.ts
import { polygon, arbitrum } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [polygon, arbitrum],
  transports: {
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  // ...connectors
});
```

---

## Backend (Lovable Cloud / Supabase)

### Client Usage

```tsx
import { supabase } from '@/integrations/supabase/client';

// Query
const { data } = await supabase.from('profiles').select('*').eq('user_id', userId);

// Insert
await supabase.from('profiles').insert({ user_id, display_name });
```

### Database Schema (current)

| Table | Key Columns | RLS |
|---|---|---|
| `profiles` | `id`, `user_id`, `display_name`, `wallet_address`, `avatar_url` | ✅ |

### Edge Functions

- Located in `supabase/functions/<name>/index.ts`
- Deno runtime — use `Deno.env.get()` for secrets
- Always include CORS headers
- Auto-deployed by Lovable Cloud

### Environment Variables

Available at runtime (do not hardcode):

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

---

## State Management

| Type | Tool | Usage |
|---|---|---|
| Server state | TanStack React Query | Supabase data fetching, caching, mutations |
| Auth state | React Context | `AuthContext` / `CivicAuthContext` |
| Form state | react-hook-form + zod | All user-input forms |
| Local UI state | `useState` / `useReducer` | Component-scoped toggles, modals |
| Web3 state | wagmi hooks | `useAccount`, `useConnect`, `useBalance`, etc. |

### React Query Patterns

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Fetch
const { data } = useQuery({
  queryKey: ['escrows', userId],
  queryFn: () => supabase.from('escrows').select('*').eq('user_id', userId),
});

// Mutate
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (newEscrow) => supabase.from('escrows').insert(newEscrow),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['escrows'] }),
});
```

---

## 3D & Animation

### Three.js Components

Located in `src/components/landing/`:

| Component | Purpose |
|---|---|
| `HeroScene.tsx` | Landing hero 3D canvas |
| `WireframeShape.tsx` | Reusable rotating wireframe geometry |
| `FeatureWireframeCard.tsx` | Feature card with embedded 3D icon |
| `AudienceWireframeIcon.tsx` | Audience card wireframe icons (incl. blockchain shape) |

### 3D Rules

1. Always wrap `<Canvas>` content in `<Suspense fallback={null}>`
2. Use `dpr={[1, 1]}` for small canvases (icons) to save GPU
3. Keep geometries simple — wireframe materials only
4. Use `<Float>` from drei for idle animation

### Framer Motion Patterns

```tsx
// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.08, duration: 0.5 }}
>

// Scroll-linked
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
```

---

## Testing

### Setup

- **Runner**: Vitest (`^3.2.x`)
- **Environment**: jsdom
- **Libraries**: `@testing-library/react`, `@testing-library/jest-dom`

### Running Tests

```bash
bun run test        # Single run
bun run test:watch  # Watch mode
```

### Test File Naming

```
src/test/example.test.ts          # Unit tests
src/components/MyComp.test.tsx    # Component tests (co-located)
```

---

## MCP Context7 — Dependency Verification

When adding or upgrading **any** dependency, use the **Context7 MCP server** to verify compatibility:

### Workflow

1. **Before installing**, query Context7 for the library's latest docs:
   - Confirm the version is compatible with React 18
   - Confirm no breaking changes vs. our pinned versions
   - Verify peer dependency requirements

2. **Version constraints to enforce**:
   ```
   React must stay at ^18.x
   @react-three/fiber must stay at ^8.x
   @react-three/drei must stay at ^9.x
   three must stay at ^0.160.x
   ```

3. **Install with exact ranges**:
   ```bash
   bun add package-name@^x.y.z
   ```

4. **After installing**, run `bun run build` to verify no type errors or bundle issues.

### Example Context7 Query

> "What is the latest version of @react-three/fiber that supports React 18? Are there breaking changes from v8 to v9?"

This prevents accidentally pulling in packages that require React 19 or introduce incompatible APIs.

---

## Do's & Don'ts

### ✅ Do

- Use semantic Tailwind tokens (`text-foreground`, `bg-card`, `border-glass-border`)
- Use `@/` import aliases everywhere
- Create small, focused components in domain folders
- Add Framer Motion entrance animations to new landing sections
- Use `glass` and `glow-*` utility classes for the blockchain aesthetic
- Write Edge Functions for any server-side logic
- Use `supabase.functions.invoke()` to call Edge Functions
- Keep the provider stack order in `App.tsx`

### ❌ Don't

- Use raw colors (`text-white`, `bg-gray-900`, `text-green-500`)
- Edit auto-generated files (`client.ts`, `types.ts`, `config.toml`, `.env`, `migrations/`)
- Import from `src/integrations/supabase/` inside Edge Functions
- Upgrade React to v19 or r3f to v9+
- Store secrets in code (use Lovable Cloud secrets or `.env`)
- Use `localStorage` for auth/role checks
- Create new Supabase client instances — always import from `@/integrations/supabase/client`
- Use `fetch('/api/...')` for Edge Functions — use `supabase.functions.invoke()`

---

## Scripts

```bash
bun run dev          # Start dev server (port 8080)
bun run build        # Production build
bun run build:dev    # Development build
bun run preview      # Preview production build
bun run lint         # ESLint
bun run test         # Run tests (single)
bun run test:watch   # Run tests (watch mode)
```

---

## Syncing with Lovable

When working outside Lovable and pushing changes back:

1. **Never modify auto-generated files** — they will be overwritten
2. **Database changes** must be done through Lovable Cloud (migration tool) — do not create migration files manually
3. **Edge Functions** can be edited locally and will be auto-deployed on push
4. **New shadcn components** — add them following the existing pattern in `src/components/ui/`
5. **Run `bun run build`** before pushing to catch type errors early

---

*Last updated: 2026-03-02*
