import type { AtlasData, GraphData } from '../types/atlas';

const API_BASE = '';

interface BackendPaper {
  title: string;
  year: number;
  authors: string[];
  citation_count: number;
  abstract: string;
  score: number;
  url: string;
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
      url: p.url ?? '',
    })),
    repositories: backend.repositories.map((r) => ({
      name: r.name,
      description: r.description ?? '',
      stars: r.stars,
      url: r.url,
      language: '',
    })),
    datasets: backend.datasets ?? [],
    models: backend.models ?? [],
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

export function buildGraphFromAtlas(atlas: AtlasData): GraphData {
  const nodes: GraphData['nodes'] = [
    { id: atlas.topic, label: atlas.topic, type: 'topic' },
  ];
  const edges: GraphData['edges'] = [];

  for (const paper of atlas.papers) {
    nodes.push({ id: paper.title, label: paper.title, type: 'paper', url: paper.url });
    edges.push({ source: atlas.topic, target: paper.title, relation: 'contains' });
  }

  for (const repo of atlas.repositories) {
    nodes.push({ id: repo.name, label: repo.name, type: 'repository', url: repo.url });
    edges.push({ source: atlas.topic, target: repo.name, relation: 'implemented_by' });
  }

  for (const resource of atlas.resources) {
    nodes.push({ id: resource.title, label: resource.title, type: 'repository', url: resource.url });
    edges.push({ source: atlas.topic, target: resource.title, relation: 'references' });
  }

  for (const dataset of atlas.datasets) {
    nodes.push({ id: dataset, label: dataset, type: 'dataset' });
    edges.push({ source: atlas.topic, target: dataset, relation: 'uses' });
  }

  for (const model of atlas.models) {
    nodes.push({ id: model, label: model, type: 'model' });
    edges.push({ source: atlas.topic, target: model, relation: 'model' });
  }

  return { nodes, edges };
}

export async function fetchGraph(topic: string): Promise<GraphData> {
  const response = await fetch(`${API_BASE}/api/graph`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch graph data');
  }

  return response.json();
}
