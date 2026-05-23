import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromptStudio from './components/PromptStudio';
import PromptConverter from './components/PromptConverter';
import PromptHistory, { HistoryEntry } from './components/PromptHistory';
import Footer from './components/Footer';

type Page = 'home' | 'studio' | 'converter' | 'history';

const HISTORY_KEY = 'monzirgraphix_history';

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // localStorage full or unavailable
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  // Persist history
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleSaveToHistory = useCallback((entry: HistoryEntry) => {
    setHistory(prev => {
      // Prevent duplicate saves
      if (prev.some(e => e.id === entry.id)) return prev;
      return [entry, ...prev];
    });
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setHistory(prev => prev.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e));
  }, []);

  const handleDeleteFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(e => e.id !== id));
  }, []);

  const handleCopyFromHistory = useCallback((_text: string) => {
    // Already handled in component
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased noise-bg">
      {/* Cursor glow effect (desktop only) */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-white/[0.008] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.005] blur-[120px]" />
      </div>

      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <Hero onNavigate={handleNavigate} />
            </motion.div>
          )}
          {currentPage === 'studio' && (
            <motion.div key="studio" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <PromptStudio onSaveToHistory={handleSaveToHistory} />
            </motion.div>
          )}
          {currentPage === 'converter' && (
            <motion.div key="converter" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <PromptConverter />
            </motion.div>
          )}
          {currentPage === 'history' && (
            <motion.div key="history" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <PromptHistory entries={history} onToggleFavorite={handleToggleFavorite} onDelete={handleDeleteFromHistory} onCopy={handleCopyFromHistory} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
