import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, ArrowRight, BookOpen, Github, Globe, Network, ArrowUpRight } from 'lucide-react';
import { GovernAILogo } from './GovernAILogo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import heroImage from '../../imports/WhatsApp_Image_2026-06-19_at_5.13.40_AM.jpeg';

const EXAMPLE_TOPICS = [
  'AI Governance',
  'Deepfake Detection',
  'Medical Image Analysis',
  'Computer Vision',
];

const FEATURES = [
  { icon: BookOpen, label: 'Semantic Paper Search', desc: 'Vector similarity across thousands of papers' },
  { icon: Github, label: 'GitHub Repositories', desc: 'Top open-source implementations ranked by relevance' },
  { icon: Globe, label: 'Trusted Resources', desc: 'Curated policy, framework, and legislation links' },
  { icon: Network, label: 'Knowledge Graph', desc: 'Interactive visualization of research relationships' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Orbit Component
function GovernanceOrbit() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Abstract Hero Image Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
        }}
      />
      
      <div className="relative z-10 w-[min(90vw,600px)] aspect-square flex items-center justify-center scale-75 lg:scale-90 xl:scale-100 origin-center">
        {/* Core Node */}
        <div className="absolute w-24 h-24 rounded-full bg-white shadow-[0_0_40px_rgba(241,106,36,0.3)] border border-[#E8E3DC] flex items-center justify-center z-20">
          <Network className="w-10 h-10" style={{ color: '#F16A24' }} />
        </div>
        
        {/* Orbit 1 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] rounded-full border border-[#E8E3DC] border-dashed"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#E8E3DC] rounded-full flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <BookOpen className="w-3.5 h-3.5" style={{ color: '#0D0D0D' }} />
            </motion.div>
          </div>
        </motion.div>

        {/* Orbit 2 */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[420px] h-[420px] rounded-full border border-[#E8E3DC] border-dashed"
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-[#E8E3DC] rounded-full flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Globe className="w-4 h-4" style={{ color: '#16A34A' }} />
            </motion.div>
          </div>
          <div className="absolute bottom-1/4 left-[10%] -translate-x-1/2 w-8 h-8 bg-white border border-[#E8E3DC] rounded-full flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Github className="w-3.5 h-3.5" style={{ color: '#0D0D0D' }} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Orbit 3 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute w-[560px] h-[560px] rounded-full border border-[#E8E3DC] border-dashed opacity-60"
        >
          <div className="absolute top-1/4 right-[10%] translate-x-1/2 w-6 h-6 bg-[#FFF4EC] border border-[#F5D4C0] rounded-full shadow-sm" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white border border-[#E8E3DC] rounded-full flex items-center justify-center shadow-sm">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-full" style={{ background: '#F16A24' }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface LandingPageProps {
  onGenerate: (topic: string) => void;
}

export function LandingPage({ onGenerate }: LandingPageProps) {
  const [topic, setTopic] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 800);
  }, []);

  const handleSubmit = (value?: string) => {
    const t = (value ?? topic).trim();
    if (!t) return;
    onGenerate(t);
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full bg-[#FAFAF8] flex flex-col font-sans overflow-hidden">
      {/* Warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(241,106,36,0.03) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-20 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-[#E8E3DC]"
      >
        <div className="flex items-center gap-4">
          <GovernAILogo className="h-6 w-auto" />
          <div className="h-5 w-px bg-[#E8E3DC]" />
          <div className="flex items-center gap-1.5">
            <span className="text-[#0D0D0D] font-semibold text-lg tracking-tight">Research</span>
            <span className="font-semibold text-lg tracking-tight" style={{ color: '#F16A24' }}>Atlas</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold text-[#3D3730] hover:text-[#0D0D0D] transition-colors flex items-center gap-1.5">
            Documentation <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.header>

      {/* Split Hero */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        {/* Left Content */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E8E3DC] bg-white mb-6 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#F16A24] animate-pulse" />
                <span className="text-[11px] font-semibold text-[#3D3730] tracking-wide uppercase">
                  AI Governance Intelligence
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0D0D0D] mb-5 leading-[1.1]"
            >
              Strategic oversight for the{' '}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: '#F16A24' }}>AI frontier</span>
                <span className="absolute bottom-1 lg:bottom-1.5 left-0 w-full h-2 lg:h-3 bg-[#FFF4EC] -z-10 rounded-sm" />
              </span>.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base lg:text-lg text-[#5C544B] mb-8 max-w-xl leading-relaxed">
              Research Atlas equips enterprise boards and compliance teams with board-ready metrics, semantic research discovery, and comprehensive repository analysis across the evolving landscape of AI governance.
            </motion.p>

            {/* Search box */}
            <motion.div variants={itemVariants} className="w-full mb-6">
              <div
                className="relative flex items-center rounded-xl transition-all duration-300 bg-white"
                style={{
                  border: focused ? '1px solid #F16A24' : '1px solid #E8E3DC',
                  boxShadow: focused
                    ? '0 0 0 4px rgba(241,106,36,0.1), 0 10px 40px rgba(0,0,0,0.06)'
                    : '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <Search
                  className="absolute left-5 w-5 h-5 transition-colors duration-200"
                  style={{ color: focused ? '#F16A24' : '#7A7169' }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter a strategic objective (e.g. LLM Compliance)..."
                  className="w-full bg-transparent outline-none pl-14 pr-44 py-4 lg:py-5 text-[#0D0D0D] placeholder:text-[#B0A99F] font-medium"
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={!topic.trim()}
                  className="absolute right-2.5 flex items-center gap-2 px-5 py-2 lg:py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: '#0D0D0D',
                  }}
                >
                  Analyze Topic
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Example chips */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 mb-10">
              <span className="text-[11px] font-semibold text-[#7A7169] uppercase tracking-wider">Trending:</span>
              {EXAMPLE_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => handleSubmit(t)}
                  className="px-3 py-1.5 rounded-md text-xs font-medium border border-[#E8E3DC] bg-white text-[#3D3730] transition-colors hover:border-[#F16A24] hover:text-[#F16A24]"
                >
                  {t}
                </button>
              ))}
            </motion.div>

            {/* Feature Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 pt-6 border-t border-[#E8E3DC]">
              {FEATURES.slice(0,2).map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#FFF4EC] border border-[#F5D4C0]">
                    <f.icon className="w-5 h-5" style={{ color: '#F16A24' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0D0D0D] mb-0.5">{f.label}</h3>
                    <p className="text-xs text-[#5C544B] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <div className="hidden lg:flex lg:w-[45%] relative border-l border-[#E8E3DC] bg-[#0D0D0D] items-center justify-center overflow-hidden">
          <ImageWithFallback 
            src={heroImage} 
            alt="AI Governance Network Visualization" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-6 right-6 z-20">
            <span className="text-xs font-semibold text-white px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 shadow-lg">
              Enterprise Edition
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
