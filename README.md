<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">...</svg>

# GAI Research Atlas — Frontend

> Enterprise-grade AI governance intelligence platform. Board-ready metrics, semantic research discovery, and comprehensive repository analysis across the evolving landscape of AI governance.

[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Contract](#api-contract)
- [Backend Integration Guide](#backend-integration-guide)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Architecture Overview

The application is a three-screen single-page application (SPA) built with React and managed via a central state machine:

```
Landing Page ──> Loading Screen ──> Dashboard (Overview)
     ^                                    │
     └────────────────────────────────────┘
            (New Search / Reset)
```

| Screen | Route (conceptual) | Purpose |
|--------|-------------------|---------|
| **Landing** | `/` | Topic input, feature showcase, orbit visualization |
| **Loading** | `/loading` | Animated progress screen with 5-step pipeline status |
| **Dashboard** | `/dashboard` | Executive overview, paper cards, repository cards, resource links |

State transitions are handled by `App.tsx` using `useState` with three valid states: `'landing' | 'loading' | 'dashboard'`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18.3 with TypeScript |
| **Build Tool** | Vite 6.3 |
| **Styling** | Tailwind CSS 4.1 + MUI 7.3 |
| **Animation** | Motion (Framer Motion) 12 |
| **Icons** | Lucide React + MUI Icons |
| **Routing** | React Router 7 (available, client-side) |
| **Data Fetching** | Native `fetch` (via service layer) |
| **Charts** | Recharts 2 |
| **DnD** | React DnD |
| **Package Manager** | pnpm 11 |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx                        # Root component — state machine
│   ├── components/
│   │   ├── LandingPage.tsx            # Topic input screen
│   │   ├── LoadingScreen.tsx          # Animated loading pipeline
│   │   ├── AtlasDashboard.tsx         # Main dashboard layout
│   │   ├── OverviewSection.tsx        # Executive summary + metrics
│   │   ├── PaperCard.tsx              # Individual paper result
│   │   ├── RepoCard.tsx               # Individual repository result
│   │   ├── ResourceCard.tsx           # Individual resource link
│   │   ├── AtlasScoreBadge.tsx        # Score visualization
│   │   ├── GovernAILogo.tsx           # Brand logo component
│   │   ├── KnowledgeGraphPlaceholder.tsx
│   │   └── figma/
│   │       └── ImageWithFallback.tsx   # Image with error fallback
│   ├── services/
│   │   └── atlasApi.ts                # API service layer
│   └── types/
│       └── atlas.ts                   # TypeScript interfaces
├── imports/                           # Static assets
├── styles/                            # Global CSS, fonts, theme
└── main.tsx                           # Entry point
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8 (install: `npm install -g pnpm`)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Starts the Vite dev server at `http://localhost:5173` with HMR.

### Build

```bash
pnpm build
```

Outputs a production build to the `dist/` directory.

---

## API Contract

The frontend communicates with the backend via a single POST endpoint.

### `POST /api/atlas`

Generates a complete Research Atlas for a given topic.

#### Request

```json
{
  "topic": "AI Governance"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `topic` | `string` | Yes | Research topic or strategic objective |

#### Response — `200 OK`

```json
{
  "topic": "AI Governance",
  "overview": "AI Governance encompasses the frameworks...",
  "papers": [
    {
      "title": "Towards Responsible AI: A Framework...",
      "authors": ["Sarah Chen", "Marcus Williams"],
      "year": 2024,
      "citation_count": 1240,
      "score": 94.7,
      "abstract": "We propose a comprehensive governance framework...",
      "url": "https://arxiv.org/abs/2401.example1"
    }
  ],
  "repositories": [
    {
      "name": "responsible-ai-toolbox",
      "description": "Microsoft's suite of tools...",
      "stars": 4800,
      "url": "https://github.com/microsoft/responsible-ai-toolbox",
      "language": "Python"
    }
  ],
  "resources": [
    {
      "title": "IAPP AI Governance Center",
      "url": "https://iapp.org/resources/topics/artificial-intelligence/",
      "organization": "IAPP",
      "category": "Framework"
    }
  ]
}
```

#### Response — `4xx/5xx`

```json
{
  "error": "Failed to generate atlas"
}
```

### TypeScript Interfaces

```typescript
interface Paper {
  title: string;
  authors?: string[];
  year: number;
  citation_count: number;
  score: number;
  abstract?: string;
  url?: string;
}

interface Repository {
  name: string;
  description?: string;
  stars: number;
  url: string;
  language?: string;
}

interface Resource {
  title: string;
  url: string;
  organization?: string;
  category?: string;
}

interface AtlasData {
  topic: string;
  overview: string;
  papers: Paper[];
  repositories: Repository[];
  resources: Resource[];
}
```

---

## Backend Integration Guide

### 1. Implement the Endpoint

The frontend expects a backend that:

- Listens on the same origin (or configure a proxy — see [Environment Configuration](#environment-configuration))
- Accepts `POST /api/atlas` with `Content-Type: application/json`
- Returns a JSON body conforming to `AtlasData`

### 2. Connect the Frontend

In `src/app/services/atlasApi.ts`, replace the mock implementation:

```typescript
// BEFORE — Mock implementation used for development
export async function generateAtlas(topic: string): Promise<AtlasData> {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return buildMockAtlas(topic);
}

// AFTER — Real backend integration
export async function generateAtlas(topic: string): Promise<AtlasData> {
  const response = await fetch('/api/atlas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.statusText}`);
  }

  return response.json();
}
```

### 3. Backend Implementation Guidelines

The dashboard section expects:

| Section | Data Source | Display |
|---------|------------|---------|
| **Executive Summary** | `atlas.overview` | Typewriter-animated paragraph |
| **Board Metrics** | Hardcoded (Risk Exposure, Regulatory Readiness, Governance Posture) | Static stat cards |
| **Papers** | `atlas.papers[]` | Scored, ranked list with citation counts |
| **Repositories** | `atlas.repositories[]` | Card grid with star counts |
| **Resources** | `atlas.resources[]` | Link list with organization/category |
| **Knowledge Graph** | Placeholder | Locked in sidebar (coming soon) |

### 4. Scoring Requirement

The `papers[].score` field (0–100) drives the Atlas Score badge color:

| Range | Color |
|-------|-------|
| 90–100 | Green (excellent) |
| 70–89 | Orange (strong) |
| 50–69 | Amber (moderate) |
| 0–49 | Red (limited) |

---

## Environment Configuration

Vite uses environment variables prefixed with `VITE_`. Create a `.env` file in the project root:

```env
# API base URL (defaults to same-origin if unset)
VITE_API_BASE_URL=https://api.example.com

# Optional: timeout in milliseconds for API requests
VITE_API_TIMEOUT=30000
```

For development behind a backend proxy, configure `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## Deployment

### Build

```bash
pnpm build
```

The output is written to `dist/`. Serve it with any static file server (Nginx, Caddy, Cloudflare Pages, Vercel, etc.)

### Docker

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'feat: add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a pull request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance
- `refactor:` — code restructuring

---

<div align="center">
  <sub>Built with React, Vite, and Tailwind CSS</sub>
  <br/>
  <sub>© 2026 GAI Research Atlas. All rights reserved.</sub>
</div>
