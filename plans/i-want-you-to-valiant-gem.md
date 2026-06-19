# Research Atlas — Premium MNC-Grade Frontend Plan

## Context

Research Atlas is an AI-powered research exploration platform for an AI governance firm. The backend (Python) is fully functional and returns an `Atlas` object containing ranked papers, GitHub repositories, and trusted resources for any topic query. The goal is to replace the temporary Streamlit UI with a world-class, MNC-grade React frontend inspired by **ResearchRabbit's UX** and **GovernAI.info's visual identity** — dark, authoritative, premium.

---

## Color Palette (GovernAI-Inspired)

GovernAI.info uses a deep navy + electric blue + cyan governance aesthetic. We'll rewrite `theme.css` to reflect:

| Token | Value | Usage |
|---|---|---|
| `--background` | `#020B18` | App background (near-black navy) |
| `--card` | `#081426` | Card surfaces |
| `--card-elevated` | `#0D1F3C` | Elevated/hover card |
| `--primary` | `#2563EB` | Primary blue (buttons, links) |
| `--accent` | `#06B6D4` | Cyan accent (scores, highlights) |
| `--accent-glow` | `rgba(6,182,212,0.15)` | Glow effects |
| `--border` | `rgba(59,130,246,0.12)` | Subtle blue borders |
| `--foreground` | `#F1F5F9` | Primary text |
| `--muted-foreground` | `#64748B` | Secondary text |
| `--success` | `#10B981` | Good scores / green |

---

## Architecture — State Machine (3 App States)

```
App State: "landing" → "loading" → "dashboard"
```

All state lives in `App.tsx`. No routing needed — simple state transitions with Motion animations.

---

## Pages & Components

### 1. `App.tsx`
- Holds state: `appState`, `topic`, `atlasData`
- Manages API call (mocked with realistic delay)
- Renders one of three views based on `appState`
- Sets dark class on `<html>` permanently (dark mode only app)

### 2. `src/app/components/LandingPage.tsx`
**Hero section** — full viewport, animated particle network background
- Animated `<canvas>` background with floating dots/connections (drawn with HTML Canvas API — no Konva)
- GovernAI logo placeholder + "Research Atlas" wordmark
- Tagline: "Explore the frontier of AI research — intelligently."
- Large centered `<Input>` with glowing cyan border on focus
- "Generate Atlas" `<Button>` with gradient fill + shimmer animation
- Clickable example domain chips: AI Governance, Deepfake Detection, Medical Imaging, etc. (clicking pre-fills input)
- Motion: entrance stagger on all elements (y: 30 → 0, opacity: 0 → 1)

### 3. `src/app/components/LoadingScreen.tsx`
**Multi-step animated progress**
- Orbital/pulse loader animation (CSS + Motion)
- 5 sequential steps with icons (FileText, Github, Globe, Brain, Layers) that light up one by one:
  1. Retrieving research papers from OpenAlex...
  2. Fetching GitHub repositories...
  3. Loading trusted resources...
  4. Running semantic ranking pipeline...
  5. Building your Research Atlas...
- Each step: pending (gray) → active (cyan pulse) → complete (green checkmark)
- Animated progress bar at bottom
- Uses `useEffect` with `setInterval` to advance steps every ~1.2s

### 4. `src/app/components/AtlasDashboard.tsx`
**Main results view** — ResearchRabbit-inspired split layout
- **Left Sidebar** (fixed, 220px): Navigation with icons
  - Overview, Papers, Repositories, Resources, Knowledge Graph (locked/coming soon)
  - Topic badge at top, "New Search" button at bottom
- **Main Content** (scrollable): Tabbed sections, smooth scroll anchoring
- **Top Header**: Sticky, blurred glass effect, shows topic + stats (paper count, repo count)
- Motion: content sections animate in with stagger as user scrolls

### 5. `src/app/components/OverviewSection.tsx`
- Topic name in large display type with cyan underline accent
- Overview paragraph text (from `atlas.overview`) with typewriter reveal animation
- 3 stat cards in a row: Total Papers, Repositories, Trusted Resources (numbers count up with Motion)

### 6. `src/app/components/PaperCard.tsx`
- Atlas Score badge (circular progress ring showing score/100, color-coded: green/yellow/red)
- Paper title, authors, year badge, citation count with BookOpen icon
- Expandable abstract (collapsible, smooth height animation)
- "View Paper" external link button
- Cards stagger in with `motion` on mount

### 7. `src/app/components/RepoCard.tsx`
- Repository name with Github icon
- Description text (truncated)
- Stars count with Star icon + yellow color
- "View on GitHub" button as external link
- Subtle left-border accent in cyan

### 8. `src/app/components/ResourceCard.tsx`
- Resource title + domain badge (extracted from URL)
- Organization tag (IAPP, etc.)
- External link icon
- Muted card style distinct from papers

### 9. `src/app/components/AtlasScoreBadge.tsx`
- SVG circular progress ring
- Score number in center
- Color: ≥80 → green, 60–79 → yellow, <60 → red
- Animated fill on mount using Motion

### 10. `src/app/components/KnowledgeGraphPlaceholder.tsx`
- Canvas-drawn simple radial graph (topic node center → category nodes → item nodes)
- Animated node pulsing and connecting lines
- "Full Interactive Graph — Coming Soon" overlay
- Clicking nodes shows a tooltip with item info
- Uses HTML Canvas API directly

### 11. `src/app/components/AnimatedBackground.tsx`
- HTML Canvas particle network (floating dots that draw connecting lines when close)
- Subtle, performance-optimized with `requestAnimationFrame`
- Uses navy/blue palette, very low opacity so content remains readable

---

## API Integration (Mocked)

```typescript
// services/atlasApi.ts
async function generateAtlas(topic: string): Promise<AtlasData>
```

- POST to `/api/atlas` with `{ topic }` (placeholder URL, easily swappable)
- Mock returns realistic Atlas object after a 4–5 second delay (simulating backend processing)
- Mock data covers AI Governance topic with ~10 papers, 6 repos, 8 resources
- TypeScript types defined in `types/atlas.ts`

---

## Motion & Animation Strategy

Using `motion` package (`import { motion } from "motion/react"`):

| Element | Animation |
|---|---|
| Landing entrance | Stagger y+30→0, opacity 0→1, delay 0.1s each |
| State transitions | Cross-fade + scale 0.97→1 |
| Score badge | SVG stroke-dashoffset animated on mount |
| Stats counter | Number counting up from 0 |
| Card list | Stagger with `staggerChildren: 0.06` |
| Loading steps | Sequential opacity + x-translate |
| Sidebar nav | Hover: x+4, background glow |
| Search input focus | Border glow expand via CSS transition |
| Overview text | Word-by-word reveal with Motion |

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/styles/theme.css` | **Rewrite** — GovernAI dark palette, new CSS vars |
| `src/styles/fonts.css` | **Add** — Inter + JetBrains Mono from Google Fonts |
| `src/app/App.tsx` | **Rewrite** — state machine orchestrator |
| `src/app/types/atlas.ts` | **Create** — TypeScript type definitions |
| `src/app/services/atlasApi.ts` | **Create** — API call + mock |
| `src/app/components/LandingPage.tsx` | **Create** |
| `src/app/components/LoadingScreen.tsx` | **Create** |
| `src/app/components/AtlasDashboard.tsx` | **Create** |
| `src/app/components/OverviewSection.tsx` | **Create** |
| `src/app/components/PaperCard.tsx` | **Create** |
| `src/app/components/RepoCard.tsx` | **Create** |
| `src/app/components/ResourceCard.tsx` | **Create** |
| `src/app/components/AtlasScoreBadge.tsx` | **Create** |
| `src/app/components/KnowledgeGraphPlaceholder.tsx` | **Create** |
| `src/app/components/AnimatedBackground.tsx` | **Create** |

---

## Existing UI Components to Reuse

From `src/app/components/ui/`:
- `button.tsx` — CTA buttons, nav buttons
- `input.tsx` — Search field
- `badge.tsx` — Year, domain, org tags
- `card.tsx` — Base card containers
- `tabs.tsx` — Section navigation (mobile fallback)
- `scroll-area.tsx` — Sidebar scroll
- `separator.tsx` — Section dividers
- `tooltip.tsx` — Star counts, score explanations
- `skeleton.tsx` — If adding shimmer loading within dashboard

---

## Verification

1. **Landing**: Enter "AI Governance" → example chips auto-fill → "Generate Atlas" triggers loading
2. **Loading**: All 5 steps animate in sequence over ~5s, then auto-transition to dashboard
3. **Dashboard**: Overview shows, Papers section shows ranked cards with Atlas Scores, Repositories show star counts and links, Resources show with domain badges
4. **Score Badge**: Circular ring animates on card mount, colors differ by score tier
5. **Knowledge Graph**: Canvas renders radial layout with pulsing nodes, "Coming Soon" overlay present
6. **Responsiveness**: Sidebar collapses on mobile, cards stack vertically
7. **"New Search"** button in sidebar resets to landing state with transition
