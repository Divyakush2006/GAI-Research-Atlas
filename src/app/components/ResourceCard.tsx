import { motion } from 'motion/react';
import { ExternalLink, Building2, Tag } from 'lucide-react';
import type { Resource } from '../types/atlas';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Framework: { bg: '#EFF6FF', text: '#1D4ED8' },
  Legislation: { bg: '#FEF2F2', text: '#DC2626' },
  Policy: { bg: '#F0FDF4', text: '#16A34A' },
  Research: { bg: '#FFF7ED', text: '#EA580C' },
  Standard: { bg: '#FAF5FF', text: '#7C3AED' },
};

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const catStyle = resource.category
    ? CATEGORY_COLORS[resource.category] ?? { bg: '#F3EFE9', text: '#7A7169' }
    : { bg: '#F3EFE9', text: '#7A7169' };

  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex items-start gap-4 bg-white rounded-2xl border border-[#E8E3DC] hover:border-[#F5D4C0] hover:shadow-md transition-all duration-300 p-4 cursor-pointer"
    >
      {/* Left accent */}
      <div
        className="w-1 self-stretch rounded-full flex-shrink-0 transition-opacity duration-300"
        style={{ background: '#F16A24', opacity: 0.5 }}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-[#0D0D0D] group-hover:text-[#F16A24] transition-colors duration-200 leading-snug line-clamp-2">
            {resource.title}
          </p>
          <ExternalLink className="w-3.5 h-3.5 text-[#B0A99F] group-hover:text-[#F16A24] transition-colors flex-shrink-0 mt-0.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          {resource.organization && (
            <div className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#B0A99F]" />
              <span className="text-xs text-[#7A7169] font-medium">{resource.organization}</span>
            </div>
          )}
          {resource.category && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: catStyle.bg, color: catStyle.text }}
            >
              <Tag className="w-2.5 h-2.5" />
              {resource.category}
            </span>
          )}
          <span className="text-xs text-[#B0A99F]">{getDomain(resource.url)}</span>
        </div>
      </div>
    </motion.a>
  );
}
