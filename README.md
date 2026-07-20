<div align="center">

# 🔬 GAI Research Atlas
### Semantic Discovery Platform for AI-Governance Research

<em>Board-ready governance intelligence — unifying papers, repositories, and policy resources into one semantic, relevance-ranked research experience. Built on behalf of GovernAI.</em>

<br/>

[![React](https://img.shields.io/badge/React-18.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com/)

**[Overview](#-overview) • [Features](#-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [API Contract](#-api-contract)**

</div>

---

## 📖 Overview

**Research in AI governance is fragmented** — split across arXiv papers, GitHub toolkits, and policy documents from bodies like NIST, OECD, IEEE, and the EU AI Act. Research Atlas consolidates them into a **single semantic search surface**, ranking every result by a custom **AtlasScore** relevance metric so practitioners can find *what matters* without hopping across a dozen sources.

This repository is the **production frontend** — a polished, board-ready SPA — designed against a clearly-defined [API contract](#-api-contract) for a semantic-search backend (vector retrieval over OpenAlex + GitHub). The frontend ships with a typed service layer and mock fixtures, so it runs standalone and drops onto the live backend by switching a single base-URL.

> Part of the **GovernAI** ecosystem · open-sourced by the author.

---

## ✨ Features

- 🔎 **Unified semantic search** across three resource types — **Papers**, **Repositories**, and **Governance Resources**
- 🏅 **AtlasScore relevance badges** — every result surfaced with a transparent, normalised relevance score
- 📊 **Board-ready overview dashboard** — executive-level metrics on the AI-governance landscape
- 🧩 **Typed dashboards & cards** — `PaperCard`, `RepoCard`, `ResourceCard`, `OverviewSection`, knowledge-graph view
- 🎬 **State-machine UX** — Landing → Loading → Dashboard, with smooth motion transitions
- 🌗 **Accessible by design** — Radix UI primitives + shadcn/ui, WCAG-minded, fully responsive
- 🔌 **Backend-agnostic service layer** — swap mock data for the live API via one environment variable

---

## 🏗️ Architecture

A three-screen single-page application driven by a central state machine, with a decoupled API service layer:

```
┌──────────────┐     ┌───────────────┐     ┌────────────────────────────┐
│ Landing Page │ ──> │ Loading Screen │ ──> │ Dashboard (Overview / Search) │
└──────────────┘     └───────────────┘     └───────────────┬────────────┘
                                                            │
                                          src/app/services/atlasApi.ts
                                                            │  (typed contract)
                                                            ▼
                                   ┌──────────────────────────────────────┐
                                   │  Semantic-Search Backend (contract)   │
                                   │  • Sentence-Transformer embeddings    │
                                   │  • ChromaDB vector retrieval          │
                                   │  • Sources: OpenAlex + GitHub         │
                                   │  • AtlasScore relevance ranking       │
                                   └──────────────────────────────────────┘
```

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 18 · TypeScript 5 · Vite 6 |
| **UI System** | Tailwind CSS 4 · Radix UI · shadcn/ui · Emotion · Motion |
| **State & Data** | Central state machine · typed `atlasApi` service layer |
| **Intended Backend** | Sentence-Transformers · ChromaDB · OpenAlex API · GitHub API |
| **Tooling** | pnpm · PostCSS · ESLint |

---

## 🚀 Quick Start

```bash
git clone https://github.com/Divyakush2006/GAI-Research-Atlas.git
cd GAI-Research-Atlas

pnpm install        # or: npm install
pnpm dev            # http://localhost:5173
```

Runs standalone against typed mock fixtures — no backend required to explore the UI.

```bash
pnpm build          # production build
pnpm preview        # preview the production bundle
```

---

## 📡 API Contract

The frontend consumes a typed service (`src/app/services/atlasApi.ts`). Point it at a live semantic-search backend by setting the base URL:

```bash
# .env
VITE_ATLAS_API_URL=https://your-backend.example.com
```

Expected response shape (per result):

```ts
interface AtlasResult {
  title: string;
  summary: string;
  score: number;        // AtlasScore relevance (0–100)
  url: string;
  type: "paper" | "repository" | "resource";
}
```

The backend is expected to embed the query with a Sentence-Transformer, retrieve nearest neighbours from a **ChromaDB** vector store populated from **OpenAlex** and **GitHub**, and return results ranked by AtlasScore.

---

## 📁 Project Structure

```
GAI-Research-Atlas/
├── src/app/
│   ├── App.tsx                     # state machine root
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── AtlasDashboard.tsx
│   │   ├── OverviewSection.tsx
│   │   ├── PaperCard.tsx / RepoCard.tsx / ResourceCard.tsx
│   │   ├── AtlasScoreBadge.tsx
│   │   ├── KnowledgeGraphPlaceholder.tsx
│   │   └── ui/                      # shadcn/ui + Radix primitives
│   └── services/
│       └── atlasApi.ts             # typed API contract + fixtures
├── index.html
└── package.json
```

---

## 🗺️ Roadmap
- [ ] Wire the live ChromaDB + Sentence-Transformer retrieval backend
- [ ] Interactive knowledge graph linking papers ↔ repos ↔ policies
- [ ] Saved searches & exportable board reports

---

## 👤 Author

**Divyakush Punjabi** — B.Tech CSE @ VIT Vellore · AI Major @ IIT Ropar · built on behalf of **GovernAI**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/divyakush-punjabi)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat&logo=googlechrome&logoColor=white)](https://divyakush2006.github.io/divyakush-resume/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/divyakush2006)

<div align="center"><sub>⭐ Star the repo if you find it useful.</sub></div>
