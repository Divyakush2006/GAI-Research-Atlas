import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { LoadingScreen } from './components/LoadingScreen';
import { AtlasDashboard } from './components/AtlasDashboard';
import { generateAtlas } from './services/atlasApi';
import type { AppState, AtlasData } from './types/atlas';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [topic, setTopic] = useState('');
  const [atlasData, setAtlasData] = useState<AtlasData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (inputTopic: string) => {
    setTopic(inputTopic);
    setError(null);
    setAppState('loading');

    try {
      const data = await generateAtlas(inputTopic);
      setAtlasData(data);
      setAppState('dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to generate atlas. Please try again.');
      setAppState('landing');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('landing');
    setAtlasData(null);
    setTopic('');
    setError(null);
  }, []);

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div
            key="landing"
            className="size-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            <LandingPage onGenerate={handleGenerate} />
            {error && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium shadow-lg">
                {error}
              </div>
            )}
          </motion.div>
        )}

        {appState === 'loading' && (
          <motion.div
            key="loading"
            className="size-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35 }}
          >
            <LoadingScreen topic={topic} />
          </motion.div>
        )}

        {appState === 'dashboard' && atlasData && (
          <motion.div
            key="dashboard"
            className="size-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AtlasDashboard atlas={atlasData} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
