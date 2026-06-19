import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Github, Globe, Brain, Layers, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import dashLogo from '../../imports/image-removebg-preview.png';

const STEPS = [
  {
    icon: FileText,
    label: 'Retrieving research papers',
    sublabel: 'Querying OpenAlex semantic database...',
  },
  {
    icon: Github,
    label: 'Fetching GitHub repositories',
    sublabel: 'Scanning open-source implementations...',
  },
  {
    icon: Globe,
    label: 'Loading trusted resources',
    sublabel: 'Accessing curated policy & framework sources...',
  },
  {
    icon: Brain,
    label: 'Running semantic ranking',
    sublabel: 'ChromaDB vector similarity pipeline...',
  },
  {
    icon: Layers,
    label: 'Building your Research Atlas',
    sublabel: 'Compiling and scoring results...',
  },
];

interface LoadingScreenProps {
  topic: string;
}

export function LoadingScreen({ topic }: LoadingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const timings = [0, 1100, 2200, 3300, 4200];
    const completeTimings = [900, 2000, 3100, 4000, 4900];

    const activateTimers = timings.map((t, i) =>
      setTimeout(() => setActiveStep(i), t)
    );
    const completeTimers = completeTimings.map((t, i) =>
      setTimeout(() => setCompletedSteps((prev) => [...prev, i]), t)
    );

    return () => {
      [...activateTimers, ...completeTimers].forEach(clearTimeout);
    };
  }, []);

  const progress = ((completedSteps.length) / STEPS.length) * 100;

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FAFAF8] px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(241,106,36,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <div className="relative">
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(241,106,36,0.15)' }}
            />
            {/* Inner pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute inset-1 rounded-full"
              style={{ background: 'rgba(241,106,36,0.1)' }}
            />
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg bg-white overflow-hidden"
            >
              <ImageWithFallback 
                src={dashLogo} 
                alt="Research Atlas Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Topic label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
        >
          <p className="text-xs text-[#7A7169] mb-1 font-medium uppercase tracking-widest">Generating Atlas for</p>
          <h2 className="text-xl font-bold text-[#0D0D0D]">{topic}</h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-2 mb-4">
          {STEPS.map((step, index) => {
            const isComplete = completedSteps.includes(index);
            const isActive = activeStep === index && !isComplete;
            const isPending = index > activeStep;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-500"
                style={{
                  background: isActive ? '#FFF4EC' : isComplete ? '#F7F4F0' : 'transparent',
                  border: isActive ? '1px solid #F5D4C0' : '1px solid transparent',
                }}
              >
                {/* Icon container */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500"
                  style={{
                    background: isComplete
                      ? '#16A34A'
                      : isActive
                      ? '#F16A24'
                      : '#E8E3DC',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isComplete ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div key="icon">
                        {isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <step.icon className="w-4 h-4 text-white" />
                          </motion.div>
                        ) : (
                          <step.icon
                            className="w-4 h-4 transition-colors duration-300"
                            style={{ color: isPending ? '#B0A99F' : '#F16A24' }}
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold transition-colors duration-300"
                    style={{
                      color: isComplete ? '#16A34A' : isActive ? '#0D0D0D' : '#B0A99F',
                    }}
                  >
                    {step.label}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs mt-0.5 overflow-hidden"
                        style={{ color: '#7A7169' }}
                      >
                        {step.sublabel}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Status dot */}
                {isActive && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: '#F16A24' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-[#E8E3DC] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: '#F16A24' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-center mt-3 text-[#7A7169]">
          This may take a few seconds...
        </p>
      </div>
    </div>
  );
}
