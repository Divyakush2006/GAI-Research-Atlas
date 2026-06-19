import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Quote, ChevronDown, ExternalLink, Users } from 'lucide-react';
import { AtlasScoreBadge } from './AtlasScoreBadge';
import type { Paper } from '../types/atlas';

interface PaperCardProps {
  paper: Paper;
  index: number;
}

export function PaperCard({ paper, index }: PaperCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group bg-white rounded-2xl border border-[#E8E3DC] hover:border-[#F5D4C0] hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Score */}
          <AtlasScoreBadge score={paper.score} size="md" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-[#0D0D0D] leading-snug text-sm group-hover:text-[#F16A24] transition-colors duration-200 line-clamp-2">
                {paper.title}
              </h3>
              {paper.url && (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-1.5 rounded-lg text-[#7A7169] hover:text-[#F16A24] hover:bg-[#FFF4EC] transition-all duration-200"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {paper.authors && paper.authors.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#B0A99F]" />
                  <span className="text-xs text-[#7A7169] truncate max-w-[200px]">
                    {paper.authors.slice(0, 2).join(', ')}
                    {paper.authors.length > 2 && ` +${paper.authors.length - 2}`}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#B0A99F]" />
                <span className="text-xs text-[#7A7169]">{paper.year}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Quote className="w-3 h-3 text-[#B0A99F]" />
                <span className="text-xs text-[#7A7169]">{paper.citation_count.toLocaleString()} citations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" style={{ color: '#F16A24' }} />
                <span className="text-xs font-semibold" style={{ color: '#F16A24' }}>
                  Atlas {paper.score.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract toggle */}
        {paper.abstract && (
          <div className="mt-4">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: expanded ? '#F16A24' : '#7A7169' }}
            >
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
              {expanded ? 'Hide abstract' : 'Show abstract'}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-xs leading-relaxed text-[#3D3730] p-3 rounded-lg bg-[#F7F4F0] border border-[#E8E3DC]">
                    {paper.abstract}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{ background: '#F16A24' }}
      />
    </motion.div>
  );
}
