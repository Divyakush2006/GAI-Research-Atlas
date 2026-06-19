import type { AtlasData } from '../types/atlas';

const API_BASE = '';

interface BackendPaper {
  title: string;
  year: number;
  authors: string[];
  citation_count: number;
  abstract: string;
  score: number;
}

interface BackendRepository {
  name: string;
  description: string;
  stars: number;
  url: string;
}

interface BackendResource {
  title: string;
  category: string;
  source: string;
  url: string;
}

interface BackendAtlas {
  topic: string;
  overview: string;
  papers: BackendPaper[];
  datasets: string[];
  models: string[];
  repositories: BackendRepository[];
  resources: BackendResource[];
}

function transformAtlas(backend: BackendAtlas): AtlasData {
  return {
    topic: backend.topic,
    overview: backend.overview,
    papers: backend.papers.map((p) => ({
      title: p.title,
      authors: p.authors ?? [],
      year: p.year,
      citation_count: p.citation_count,
      score: p.score,
      abstract: p.abstract ?? '',
    })),
    repositories: backend.repositories.map((r) => ({
      name: r.name,
      description: r.description ?? '',
      stars: r.stars,
      url: r.url,
      language: '',
    })),
    resources: backend.resources.map((r) => ({
      title: r.title,
      url: r.url,
      organization: r.source ?? '',
      category: r.category ?? '',
    })),
  };
}

export async function generateAtlas(topic: string): Promise<AtlasData> {
  const response = await fetch(`${API_BASE}/api/atlas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate atlas');
  }

  const data: BackendAtlas = await response.json();
  return transformAtlas(data);
}
