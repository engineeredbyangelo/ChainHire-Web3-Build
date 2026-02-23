

# 3D Wireframe Smart Contract Cards for "How ChainHire Works"

## Overview
Replace the current flat `FeatureContractCard` components with interactive 3D wireframe visualizations. Each feature card will have a unique rotating 3D wireframe shape representing its smart contract concept, with the feature text overlaid.

## Design Approach

Each of the 6 features gets a unique 3D wireframe geometry that metaphorically represents its function:

| Feature | 3D Shape | Rationale |
|---------|----------|-----------|
| Non-Custodial Escrow | Wireframe **Dodecahedron** | Vault-like, multi-faceted security |
| Sequential Milestones | Wireframe **Torus Knot** | Connected, sequential flow |
| Auto-Release Timer | Wireframe **Torus** (ring) | Circular countdown concept |
| Fair Arbitration | Wireframe **Octahedron** | Balance, symmetry, fairness |
| On-Chain Reputation | Wireframe **Icosahedron** | Diamond-like, multi-tier |
| Global & Permissionless | Wireframe **Sphere** | Globe, borderless |

Each shape will slowly rotate, use the feature's accent color (neon green), and emit a subtle glow. The contract code snippet and description text will overlay beneath each 3D canvas.

## Technical Plan

### 1. Create `src/components/landing/FeatureWireframeCard.tsx`
- A new component containing:
  - A small inline `<Canvas>` (roughly 200px tall) rendering the assigned 3D wireframe geometry
  - The wireframe mesh rotates slowly on Y-axis with a gentle float animation
  - Neon green wireframe material with emissive glow
  - Ambient + point light for the glow effect
- Below the canvas: the contract address header, title, and description (reusing the existing text styling)
- The card itself keeps the glass/border styling consistent with the current dark theme

### 2. Create `src/components/landing/WireframeShape.tsx`
- A reusable R3F component that accepts a `shape` prop (string enum) and renders the corresponding Three.js geometry with wireframe material
- Uses `useFrame` for rotation animation and `Float` from drei for gentle bobbing
- Accent color passed as prop for per-card customization

### 3. Update `src/pages/Landing.tsx`
- Replace `FeatureContractCard` imports with `FeatureWireframeCard`
- Add a `shape` field to each feature in the `features` array
- Keep all existing text content (titles, descriptions, contract addresses, code snippets)

### 4. Performance Considerations
- Each card gets its own small Canvas (lightweight with low DPR)
- Use `frameloop="demand"` or low DPR `[1, 1]` to keep 6 canvases performant
- Simple geometries with wireframe material are very GPU-light
- Intersection observer pattern: canvases only animate when in viewport

