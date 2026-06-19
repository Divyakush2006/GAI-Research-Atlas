import { motion } from 'motion/react';

interface AtlasScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md';
}

export function AtlasScoreBadge({ score, size = 'md' }: AtlasScoreBadgeProps) {
  const clamped = Math.min(100, Math.max(0, score));
  const color =
    clamped >= 80 ? '#16A34A' : clamped >= 60 ? '#CA8A04' : '#DC2626';
  const bgColor =
    clamped >= 80 ? '#F0FDF4' : clamped >= 60 ? '#FEFCE8' : '#FEF2F2';

  const dim = size === 'sm' ? 44 : 56;
  const strokeWidth = size === 'sm' ? 3.5 : 4;
  const radius = (dim - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center rounded-full flex-shrink-0"
      style={{ width: dim, height: dim, background: bgColor }}
    >
      <svg
        width={dim}
        height={dim}
        className="absolute inset-0 -rotate-90"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 font-bold leading-none"
        style={{
          fontSize: size === 'sm' ? '10px' : '12px',
          color,
        }}
      >
        {clamped.toFixed(0)}
      </motion.span>
    </div>
  );
}
