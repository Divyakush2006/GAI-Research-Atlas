import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  FileText,
  Github,
  Globe,
  Network,
  ArrowLeft,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { OverviewSection } from './OverviewSection';
import { PaperCard } from './PaperCard';
import { RepoCard } from './RepoCard';
import { ResourceCard } from './ResourceCard';
import { KnowledgeGraphPlaceholder } from './KnowledgeGraphPlaceholder';
import type { AtlasData } from '../types/atlas';
import { GovernAILogo } from './GovernAILogo';

type Section = 'overview' | 'papers' | 'repositories' | 'resources' | 'graph';

const NAV_ITEMS: {
  id: Section;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  locked?: boolean;
}[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'papers', label: 'Papers', icon: FileText },
  { id: 'repositories', label: 'Repositories', icon: Github },
  { id: 'resources', label: 'Resources', icon: Globe },
  { id: 'graph', label: 'Knowledge Graph', icon: Network },
];

interface AtlasDashboardProps {
  atlas: AtlasData;
  onReset: () => void;
}

export function AtlasDashboard({ atlas, onReset }: AtlasDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const mainRef = useRef<HTMLDivElement>(null);

  const navigate = (section: Section) => {
    setActiveSection(section);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen w-full bg-[#FAFAF8] overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-64 flex-shrink-0 bg-white border-r border-[#E8E3DC] flex flex-col h-full"
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#E8E3DC]">
          <div className="flex items-center gap-2.5 mb-4">
            <GovernAILogo className="h-8 w-auto" />
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-[#0D0D0D]">Research</span>
              <span className="font-semibold text-sm" style={{ color: '#F16A24' }}>Atlas</span>
            </div>
          </div>

          {/* Topic badge */}
          <div className="px-3 py-2.5 rounded-xl bg-[#FFF4EC] border border-[#F5D4C0]">
            <p className="text-xs text-[#7A7169] mb-0.5">Current Topic</p>
            <p className="text-sm font-semibold text-[#0D0D0D] leading-snug truncate">{atlas.topic}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto border-b border-[#E8E3DC]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B0A99F] mb-3 px-2">Navigation</p>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isLocked = item.id === 'graph';

            return (
              <button
                key={item.id}
                onClick={() => !isLocked && navigate(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group"
                style={{
                  background: isActive ? '#FFF4EC' : 'transparent',
                  border: isActive ? '1px solid #F5D4C0' : '1px solid transparent',
                  cursor: isLocked ? 'default' : 'pointer',
                }}
              >
                <item.icon
                  className="w-4 h-4 flex-shrink-0 transition-colors"
                  style={{
                    color: isActive ? '#F16A24' : isLocked ? '#D5CFC6' : '#7A7169',
                  }}
                />
                <span
                  className="text-sm font-medium flex-1 transition-colors"
                  style={{
                    color: isActive ? '#F16A24' : isLocked ? '#D5CFC6' : '#3D3730',
                  }}
                >
                  {item.label}
                </span>
                {isLocked ? (
                  <Lock className="w-3 h-3 text-[#D5CFC6]" />
                ) : isActive ? (
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: '#F16A24' }} />
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Footer — New Search */}
        <div className="px-4 py-4 border-t border-[#E8E3DC]">
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-md"
            style={{ background: '#F16A24' }}
          >
            <ArrowLeft className="w-4 h-4" />
            New Search
          </button>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="text-xs text-[#B0A99F]">Powered by</span>
            <GovernAILogo className="h-4 w-auto max-w-[88px]" />
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-shrink-0 bg-white/80 border-b border-[#E8E3DC] px-8 py-4 flex items-center justify-between z-10"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          <div>
            <h2 className="font-semibold text-[#0D0D0D]">
              {NAV_ITEMS.find((n) => n.id === activeSection)?.label}
            </h2>
            <p className="text-xs text-[#7A7169]">{atlas.topic} · Research Atlas</p>
          </div>
          <div className="flex items-center gap-3">
            {activeSection === 'papers' && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#FFF4EC] border border-[#F5D4C0] font-medium" style={{ color: '#F16A24' }}>
                {atlas.papers.length} papers ranked by Atlas Score
              </span>
            )}
            {activeSection === 'repositories' && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#F7F4F0] border border-[#E8E3DC] font-medium text-[#7A7169]">
                {atlas.repositories.length} repositories
              </span>
            )}
            {activeSection === 'resources' && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] font-medium text-[#16A34A]">
                {atlas.resources.length} trusted sources
              </span>
            )}
          </div>
        </motion.header>

        {/* Scrollable content */}
        <div ref={mainRef} className="flex-1 overflow-y-auto px-8 py-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {activeSection === 'overview' && (
              <div className="max-w-3xl space-y-6">
                <OverviewSection atlas={atlas} onNavigate={navigate} />
              </div>
            )}

            {activeSection === 'papers' && (
              <div className="max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-[#0D0D0D]">Top Research Papers</h2>
                    <p className="text-sm text-[#7A7169] mt-0.5">Ranked by Atlas Score — semantic relevance + citation impact</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {atlas.papers.map((paper, i) => (
                    <PaperCard key={paper.title + i} paper={paper} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'repositories' && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="font-bold text-[#0D0D0D]">Open-Source Repositories</h2>
                  <p className="text-sm text-[#7A7169] mt-0.5">Top GitHub implementations relevant to this topic</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {atlas.repositories.map((repo, i) => (
                    <RepoCard key={repo.name + i} repo={repo} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'resources' && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="font-bold text-[#0D0D0D]">Trusted Resources</h2>
                  <p className="text-sm text-[#7A7169] mt-0.5">Curated policy frameworks, legislation, and research organizations</p>
                </div>
                <div className="space-y-3">
                  {atlas.resources.map((resource, i) => (
                    <ResourceCard key={resource.title + i} resource={resource} index={i} />
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'graph' && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="font-bold text-[#0D0D0D]">Knowledge Graph</h2>
                  <p className="text-sm text-[#7A7169] mt-0.5">Visual map of research relationships for this topic</p>
                </div>
                <KnowledgeGraphPlaceholder topic={atlas.topic} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
