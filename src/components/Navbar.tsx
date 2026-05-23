import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Wand2, ArrowRightLeft, Clock } from 'lucide-react';

type Page = 'home' | 'studio' | 'converter' | 'history';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Sparkles size={16} /> },
  { id: 'studio', label: 'Prompt Studio', icon: <Wand2 size={16} /> },
  { id: 'converter', label: 'Converter', icon: <ArrowRightLeft size={16} /> },
  { id: 'history', label: 'History', icon: <Clock size={16} /> },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/15 transition-all">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-wide text-white">
                  Monzir<span className="text-white/50">Graphix</span>
                </span>
                <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase -mt-0.5">AI Prompt Studio</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-white/12 text-white border border-white/15'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden"
          >
            <div className="glass-strong rounded-2xl p-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    currentPage === item.id
                      ? 'bg-white/12 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
