Small, focused update to reflect the app is still in development while keeping the marketing site live.

## What we'll change

1. **Landing page CTAs**
   - Remove both "Launch App" buttons:
     - Hero section (currently the primary CTA).
     - Bottom call-to-action section.
   - Keep "Read Docs" as the only primary action in those areas.

2. **Global footer / status notice**
   - Add a short, unobtrusive "Not live yet — we're making changes in the background" footnote.
   - Render it in a shared footer or `AppShell` so it appears on every page (Landing, Docs, Auth, Dashboard, etc.).
   - Style it to match the Future Brutalist theme: small mono text, silver/cyan, glass border or subtle dot indicator.

3. **Navbar consideration**
   - The Navbar currently has a "Connect" button (links to `/auth`). Since the app is not live, this is effectively another launch entry point. We can either replace it with "Read Docs" or keep it as-is if you want wallet connect to remain visible. I'll default to leaving it unless you say otherwise, but flag it in the implementation so you can confirm.

## Files likely touched
- `src/pages/Landing.tsx` — remove the two Launch App CTAs.
- `src/components/layout/AppShell.tsx` or a new shared footer component — add the global status notice.
- `src/components/layout/Navbar.tsx` — optional: replace Connect with Read Docs (pending confirmation).

## Outcome
Marketing site stays up, but the only public action is reading docs, and every page carries a clear "not live yet" status note.