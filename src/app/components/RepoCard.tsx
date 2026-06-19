import { motion } from 'motion/react';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';
import type { Repository } from '../types/atlas';

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Java: '#B07219',
};

interface RepoCardProps {
  repo: Repository;
  index: number;
}

export function RepoCard({ repo, index }: RepoCardProps) {
  const langColor = repo.language ? LANG_COLORS[repo.language] ?? '#7A7169' : '#7A7169';

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col bg-white rounded-2xl border border-[#E8E3DC] hover:border-[#F5D4C0] hover:shadow-md transition-all duration-300 overflow-hidden p-5 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#F7F4F0' }}
          >
            <Github className="w-5 h-5 text-[#0D0D0D]" />
          </div>
          <div>
            <p className="font-semibold text-sm text-[#0D0D0D] group-hover:text-[#F16A24] transition-colors duration-200 leading-snug">
              {repo.name}
            </p>
            {repo.language && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: langColor }}
                />
                <span className="text-xs text-[#7A7169]">{repo.language}</span>
              </div>
            )}
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-[#B0A99F] group-hover:text-[#F16A24] transition-colors duration-200 flex-shrink-0 mt-0.5" />
      </div>

      {repo.description && (
        <p className="text-xs text-[#3D3730] leading-relaxed mb-4 line-clamp-2 flex-1">
          {repo.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F0EDE8]">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-[#CA8A04]" />
          <span className="text-xs font-semibold text-[#7A7169]">
            {repo.stars >= 1000
              ? `${(repo.stars / 1000).toFixed(1)}k`
              : repo.stars.toLocaleString()}
          </span>
          <span className="text-xs text-[#B0A99F]">stars</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Code2 className="w-3 h-3 text-[#B0A99F]" />
          <span className="text-xs text-[#7A7169]">Open Source</span>
        </div>
      </div>
    </motion.a>
  );
}
