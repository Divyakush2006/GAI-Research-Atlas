# GovernAI Research Atlas

> Enterprise-grade AI governance intelligence platform — semantic discovery of papers, open-source repositories, and trusted regulatory resources. Built for board-ready reporting and deep research analysis.

<p align="center">
  <img src="https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/ChromaDB-0.6-FC6E6E?logo=chroma" alt="ChromaDB" />
  <img src="https://img.shields.io/badge/Sentence_Transformers-4.1-FF6F00?logo=huggingface" alt="Sentence Transformers" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Platform Notes](#platform-notes)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Data Flow](#data-flow)
- [Production Build](#production-build)
- [Docker](#docker)
- [Contributing](#contributing)

---

## Overview

**GovernAI Research Atlas** ingests real-time data from **OpenAlex** (30M+ scholarly works), **GitHub** (repository search), and a curated **governance resources** database to produce a comprehensive intelligence report on any AI governance topic. Results are ranked by a multi-factor scoring algorithm combining semantic relevance, citation impact, recency, and keyword overlap.

The platform is built as a **monorepo** containing a React + TypeScript frontend and a Python + FastAPI backend, communicating over a REST API.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (:5173)                         │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────────────┐  │
│  │ Landing  │→ │ Loading  │→ │         Dashboard             │  │
│  │  Page    │  │  Screen  │  │  ┌─────┐ ┌────┐ ┌─────────┐  │  │
│  └──────────┘  └──────────┘  │  │Papers│ │Repos│ │Resources│  │  │
│                               │  └─────┘ └────┘ └─────────┘  │  │
│                               │  ┌─────────────────────────┐  │  │
│                               │  │   Knowledge Graph (2D)  │  │  │
│                               │  └─────────────────────────┘  │  │
│                               └───────────────────────────────┘  │
│                                     │                             │
│                          Vite Proxy │ /api/*                      │
└─────────────────────────────────────┼───────────────────────────┘
                                      │
                               ┌────────────────┐
                               │  FastAPI (:8000)│
                               │   api_main.py   │
                               └───────┬────────┘
                                       │
                   ┌───────────────────┼────────────────────┐
                   ▼                   ▼                    ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │   OpenAlex   │   │    GitHub    │   │   ChromaDB   │
            │   (papers)   │   │  (repos)     │   │ (vector DB)  │
            └──────────────┘   └──────────────┘   └──────────────┘
                                         │                 │
                                         ▼                 ▼
                                   ┌──────────────┐ ┌──────────────────┐
                                   │sentence-     │ │     Local        │
                                   │transformers  │ │  CSV (govt       │
                                   │(embeddings)  │ │  resources)      │
                                   └──────────────┘ └──────────────────┘
```

---

## Features

- **Semantic Paper Discovery** — Real-time search of 30M+ scholarly works via OpenAlex with multi-factor ranking (semantic relevance 65%, citation impact 10%, recency 10%, keyword overlap 15%)
- **GitHub Repository Intelligence** — Topic-relevant open-source repos ranked by description relevance (60%), keyword overlap (25%), and star score (15%)
- **Curated Governance Resources** — 47 hand-picked policy frameworks, legislation trackers, certification bodies, and legal databases (IAPP, NIST, EU AI Act, GDPR, etc.)
- **Knowledge Graph** — Interactive 2D force-directed graph visualizing relationships between topics, papers, repositories, datasets, and models
- **Board-Ready Metrics Dashboard** — Executive summary with typewriter animation, paper/repo/resource cards with Atlas Scores
- **Live Embeddings** — Sentence-transformer models generate embeddings on-the-fly for ChromaDB-powered semantic similarity search

---

## Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18.3 + TypeScript 5 |
| **Build Tool** | Vite 6.3 |
| **Styling** | Tailwind CSS 4.1 + MUI 7.3 |
| **Animation** | Motion (Framer Motion) 12 |
| **Icons** | Lucide React + MUI Icons |
| **Charts** | Recharts 2 |
| **Package Manager** | pnpm 11 |

### Backend

| Layer | Technology |
|-------|-----------|
| **API Framework** | FastAPI 0.115 |
| **Runtime** | Python 3.13 |
| **Vector Database** | ChromaDB 0.6 |
| **Embeddings** | sentence-transformers 4.1 (all-MiniLM-L6-v2) |
| **Data Sources** | OpenAlex REST API · GitHub Search API · Local CSV |

---

## Project Structure

```
GovernAI-Research-Atlas/
├── api_main.py                       # FastAPI entry point (health, atlas, graph endpoints)
├── app.py                            # Legacy Streamlit entry point (unused)
├── requirements.txt                  # Python dependencies
├── package.json                      # Frontend dependencies
├── pnpm-lock.yaml                    # pnpm lockfile
├── vite.config.ts                    # Vite config with API proxy
├── tsconfig.json                     # TypeScript config
├── .env.example                      # Environment variable template
├── .gitignore                        # Git ignore rules
├── README.md                         # This file
│
├── services/                         # Python backend services
│   ├── atlas_service.py              # Orchestrator — generates Atlas from topic
│   ├── paper_service.py              # OpenAlex paper retrieval
│   ├── github_service.py             # GitHub repository search
│   ├── resource_service.py           # Local CSV governance resources
│   ├── ranking_service.py            # Paper scoring & ranking
│   ├── scoring_service.py            # Scoring utilities (semantic, citation, recency)
│   ├── repo_ranking_service.py       # Repository ranking with embeddings
│   ├── embedding_service.py          # sentence-transformers embeddings
│   ├── vector_store.py               # ChromaDB vector store operations
│   ├── extractor_service.py          # Dataset & model extraction from paper text
│   ├── search_service.py             # Vector search wrapper
│   └── graph_service.py              # Knowledge graph node/edge builder
│
├── models/                           # Pydantic data models
│   └── atlas_schema.py               # Paper, Repository, Resource, Atlas schemas
│
├── data/
│   └── governance_resources.csv      # 47 curated AI governance resources
│
├── tests/                            # Python test scripts
│   ├── test_scoring.py
│   ├── test_atlas.py
│   ├── test_papers.py
│   ├── test_github.py
│   ├── test_resources.py
│   └── ...                           # Additional test scripts
│
├── src/                              # React frontend source
│   ├── main.tsx                      # Entry point
│   ├── styles/                       # Global CSS
│   └── app/
│       ├── App.tsx                   # Root state machine
│       ├── types/
│       │   └── atlas.ts              # TypeScript interfaces
│       ├── services/
│       │   └── atlasApi.ts           # API service layer
│       └── components/
│           ├── LandingPage.tsx        # Topic input & hero
│           ├── LoadingScreen.tsx      # Pipeline progress animation
│           ├── AtlasDashboard.tsx     # Main dashboard layout
│           ├── OverviewSection.tsx    # Executive summary
│           ├── PaperCard.tsx          # Paper result card
│           ├── RepoCard.tsx           # Repository card
│           ├── ResourceCard.tsx       # Resource link card
│           ├── KnowledgeGraph.tsx     # Interactive 2D force graph
│           ├── AtlasScoreBadge.tsx    # Score indicator
│           ├── GovernAILogo.tsx       # Brand logo
│           └── figma/
│               └── ImageWithFallback.tsx
│
├── chroma_db/                        # ChromaDB persistence (gitignored)
└── dist/                             # Production build output (gitignored)
```

---

## Prerequisites

| Tool | Version | Installation |
|------|---------|-------------|
| **Node.js** | ≥ 18 | [nodejs.org](https://nodejs.org) |
| **pnpm** | ≥ 8 | `npm install -g pnpm` |
| **Python** | ≥ 3.10 | [python.org](https://python.org) |
| **pip** | (bundled with Python) | — |

---

## Platform Notes

### Windows-Specific Packages

This project includes two Windows-native binaries required by Vite:

| Package | Purpose |
|---------|---------|
| `@rollup/rollup-win32-x64-msvc` | Native Rollup binary for module bundling |
| `lightningcss-win32-x64-msvc` | Native LightningCSS binary for CSS processing |

These are listed in `package.json` as **optional dependencies** and are only installed on Windows x64. They do not affect other platforms.

### Other Operating Systems

If you're on **macOS** or **Linux**, these packages are simply skipped during installation. The package manager automatically selects the correct native binaries for your platform (e.g., `@rollup/rollup-linux-x64-gnu` for Linux, `@rollup/rollup-darwin-arm64` for Apple Silicon). No manual action is needed.

### Python Backend

The Python backend is cross-platform. On Windows, ensure:
- Python is added to your system PATH
- Long path support is enabled if needed: `git config --system core.longpaths true`

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Divyakush2006/GovernAI-Research-Atlas.git
cd GovernAI-Research-Atlas
```

### 2. Frontend Dependencies

```bash
pnpm install
```

### 3. Backend Dependencies

```bash
pip install -r requirements.txt
```

> **Note:** The `sentence-transformers` package downloads a ~80MB model (`all-MiniLM-L6-v2`) on first use. This happens automatically when you make your first API call to `/api/atlas` or `/api/graph`.

---

## Environment Configuration

### Backend

Copy the environment template and configure your tokens:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Recommended | GitHub personal access token (avoids 60 req/hr rate limit) |
| `OPENALEX_EMAIL` | Optional | Email for OpenAlex polite pool (higher rate limits) |

Generate a GitHub token at: [github.com/settings/tokens](https://github.com/settings/tokens) (no scopes needed for public repos).

### Frontend

No frontend environment variables are required for local development. The Vite dev server proxies `/api/*` requests to the backend automatically.

---

## Running Locally

Start both servers in separate terminals.

### Terminal 1 — Backend API Server

```bash
uvicorn api_main:app --reload --port 8000
```

The backend starts on `http://localhost:8000`. On first startup, the sentence-transformers model loads (takes 5–15 seconds depending on your internet connection). Subsequent startups are instant.

**Available endpoints:**
- `GET /health` — Health check
- `POST /api/atlas` — Generate a Research Atlas
- `POST /api/graph` — Generate knowledge graph data

### Terminal 2 — Frontend Dev Server

```bash
pnpm dev
```

The frontend starts on `http://localhost:5173` with Hot Module Replacement (HMR). API requests to `/api/*` are automatically proxied to `http://localhost:8000` (configured in `vite.config.ts`).

### Verify the Setup

```bash
# Check backend health
curl http://localhost:8000/health

# Generate an atlas
curl -X POST http://localhost:8000/api/atlas \
  -H "Content-Type: application/json" \
  -d '{"topic":"AI Governance"}'

# Generate graph data
curl -X POST http://localhost:8000/api/graph \
  -H "Content-Type: application/json" \
  -d '{"topic":"AI Governance"}'
```

Then open `http://localhost:5173` in your browser, enter a topic, and explore the dashboard.

---

## API Reference

### `GET /health`

Returns the backend health status.

```json
{
  "status": "ok"
}
```

### `POST /api/atlas`

Generates a complete Research Atlas for a given topic.

**Request:**

```json
{
  "topic": "AI Governance"
}
```

**Response — `200 OK`:**

```json
{
  "topic": "AI Governance",
  "overview": "AI Governance research domain",
  "papers": [
    {
      "title": "The Oxford Handbook of AI Governance",
      "year": 2024,
      "authors": ["Justin B. Bullock", "Yu-Che Chen", "et al."],
      "citation_count": 45,
      "abstract": "This handbook provides a comprehensive overview...",
      "score": 86.24,
      "url": "https://doi.org/10.1093/oxfordhb/9780197579329.001.0001"
    }
  ],
  "datasets": ["ImageNet", "COCO"],
  "models": ["BERT", "Transformer"],
  "repositories": [
    {
      "name": "awesome-ai-governance",
      "description": "Curated list of AI governance resources",
      "stars": 1200,
      "url": "https://github.com/...",
      "score": 91.86
    }
  ],
  "resources": [
    {
      "title": "AIGP Certification",
      "category": "Certification",
      "source": "IAPP",
      "url": "https://iapp.org/certify/aigp/"
    }
  ]
}
```

### `POST /api/graph`

Generates knowledge graph node/edge data for a topic. Internally calls the same pipeline as `/api/atlas` and transforms the result into graph format.

**Request:** Same as `/api/atlas`

**Response — `200 OK`:**

```json
{
  "nodes": [
    { "id": "AI Governance", "label": "AI Governance", "type": "topic" },
    { "id": "The Oxford Handbook...", "label": "The Oxford Handbook...", "type": "paper", "url": "https://..." }
  ],
  "edges": [
    { "source": "AI Governance", "target": "The Oxford Handbook...", "relation": "contains" }
  ]
}
```

**Node types:** `topic`, `paper`, `repository`, `dataset`, `model`

**Edge relations:** `contains`, `implemented_by`, `uses`, `model`

---

## Data Flow

```
User Input (topic)
    │
    ▼
POST /api/atlas { topic: "AI Governance" }
    │
    ▼
AtlasService.generate_atlas(topic)
    │
    ├── PaperService.get_papers()
    │     └── OpenAlex API → papers[]
    │
    ├── VectorStore.add_paper() (for each paper)
    │     └── ChromaDB persistent storage
    │
    ├── RankingService.rank_papers()
    │     └── ChromaDB semantic search + citation/recency/overlap scoring
    │
    ├── GitHubService.get_repositories()
    │     └── GitHub Search API → repositories[]
    │
    ├── RepoRankingService.rank_repositories()
    │     └── Embedding similarity + keyword overlap + star score
    │
    ├── ResourceService.get_resources()
    │     └── Local CSV → resources[]
    │
    ├── ExtractorService.extract_datasets() / extract_models()
    │     └── Keyword matching in paper titles/abstracts
    │
    └── Results capped: 10 papers, 5 repos, 10 resources
    │
    ▼
Response → Frontend renders dashboard
```

---

## Production Build

```bash
# Build the frontend
pnpm build

# Output: dist/ directory with static files
```

For production deployment, serve the `dist/` folder alongside the FastAPI backend. This can be done via:

- **Nginx reverse proxy** — Serve static files and proxy `/api/` to FastAPI
- **FastAPI static files** — Mount `dist/` as a static directory in `api_main.py`
- **Cloud deployment** — Deploy frontend to Vercel/Netlify/Cloudflare Pages and backend to a Python host (Railway, Render, fly.io)

---

## Docker

### Frontend

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

### Backend

```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "api_main:app", "--host", "0.0.0.0", "--port", "8000"]
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

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `chore:` | Maintenance |
| `refactor:` | Code restructuring |
| `perf:` | Performance improvement |
| `ci:` | CI/CD changes |

---

<div align="center">
  <sub>© 2026 GovernAI Research Atlas. All rights reserved.</sub>
  <br/>
  <sub>Built with ❤️ by <a href="https://github.com/Divyakush2006">Divyakush2006</a></sub>
  <br/>
  <sub>Powered by OpenAlex, GitHub, ChromaDB, and sentence-transformers</sub>
</div>
