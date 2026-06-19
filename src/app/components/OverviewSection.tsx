import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, FileText, Github, Globe, TrendingUp, AlertTriangle, Scale, ShieldCheck } from 'lucide-react';
import type { AtlasData } from '../types/atlas';

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: number;
  color: string;
  onClick: () => void;
}) {
  const count = useCountUp(value, 1000);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex-1 bg-white rounded-xl border border-[#E8E3DC] p-5 flex items-center gap-4 text-left hover:border-[#F5D4C0] hover:shadow-sm transition-all duration-300"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}10` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-2xl font-bold text-[#0D0D0D] leading-none">{count}</p>
        <p className="text-xs text-[#7A7169] mt-1 font-medium">{label}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-[#B0A99F] group-hover:text-[#F16A24] transition-colors" />
    </motion.button>
  );
}

interface OverviewSectionProps {
  atlas: AtlasData;
  onNavigate: (section: 'papers' | 'repositories' | 'resources') => void;
}

export function OverviewSection({ atlas, onNavigate }: OverviewSectionProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < atlas.overview.length) {
        setDisplayedText(atlas.overview.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [atlas.overview]);

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#7A7169] mb-4">Executive Summary</h2>
        <div className="bg-white rounded-xl border border-[#E8E3DC] p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" style={{ color: '#F16A24' }} />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0D0D0D]">
                  Research Topic Analysis
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[#0D0D0D] mb-4">{atlas.topic}</h1>
              <p className="text-[15px] leading-relaxed text-[#3D3730]">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 ml-1 align-middle rounded-sm"
                  style={{ background: '#F16A24' }}
                />
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Board-Ready Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#7A7169] mb-4">Board-Ready Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#FAFAF8] rounded-xl border border-[#E8E3DC] p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-[#F16A24]" />
              <span className="text-xs font-semibold text-[#5C544B]">Risk Exposure</span>
            </div>
            <p className="text-2xl font-bold text-[#0D0D0D]">High</p>
            <p className="text-xs text-[#7A7169] mt-1">Requires immediate compliance review</p>
          </div>
          <div className="bg-[#FAFAF8] rounded-xl border border-[#E8E3DC] p-5">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-[#0D0D0D]" />
              <span className="text-xs font-semibold text-[#5C544B]">Regulatory Readiness</span>
            </div>
            <p className="text-2xl font-bold text-[#0D0D0D]">42%</p>
            <p className="text-xs text-[#7A7169] mt-1">Alignment with EU AI Act</p>
          </div>
          <div className="bg-[#FAFAF8] rounded-xl border border-[#E8E3DC] p-5">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span className="text-xs font-semibold text-[#5C544B]">Governance Posture</span>
            </div>
            <p className="text-2xl font-bold text-[#0D0D0D]">Developing</p>
            <p className="text-xs text-[#7A7169] mt-1">Foundational policies established</p>
          </div>
        </div>

        {/* Discovery Repositories */}
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#7A7169] mb-4">Discovery Repositories</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard
            icon={FileText}
            label="Research Papers"
            value={atlas.papers.length}
            color="#F16A24"
            onClick={() => onNavigate('papers')}
          />
          <StatCard
            icon={Github}
            label="Source Implementations"
            value={atlas.repositories.length}
            color="#0D0D0D"
            onClick={() => onNavigate('repositories')}
          />
          <StatCard
            icon={Globe}
            label="Trusted Policies"
            value={atlas.resources.length}
            color="#16A34A"
            onClick={() => onNavigate('resources')}
          />
        </div>
      </motion.div>
    </div>
  );
}
