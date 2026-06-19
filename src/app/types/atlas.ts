export interface Paper {
  title: string;
  authors?: string[];
  year: number;
  citation_count: number;
  score: number;
  abstract?: string;
  url?: string;
}

export interface Repository {
  name: string;
  description?: string;
  stars: number;
  url: string;
  language?: string;
}

export interface Resource {
  title: string;
  url: string;
  organization?: string;
  category?: string;
}

export interface AtlasData {
  topic: string;
  overview: string;
  papers: Paper[];
  repositories: Repository[];
  resources: Resource[];
}

export type AppState = 'landing' | 'loading' | 'dashboard';

export interface LoadingStep {
  id: number;
  label: string;
  sublabel: string;
  status: 'pending' | 'active' | 'complete';
}
