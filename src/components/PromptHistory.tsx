import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Copy, Trash2, Check, Inbox } from 'lucide-react';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  input: string;
  model: string;
  prompt: string;
  negativePrompt: string;
  favorite: boolean;
}

interface PromptHistoryProps {
  entries: HistoryEntry[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onCopy: (text: string) => void;
}

export default function PromptHistory({ entries, onToggleFavorite, onDelete, onCopy }: PromptHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    onCopy(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  const favorites = sorted.filter(e => e.favorite);
  const others = sorted.filter(e => !e.favorite);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">Prompt History</span>
          </h1>
          <p className="text-white/40 text-sm">{entries.length} saved prompts</p>
        </motion.div>

        {entries.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4 border border-white/[0.06]">
              <Inbox size={24} className="text-white/20" />
            </div>
            <p className="text-white/30 mb-1">No saved prompts yet</p>
            <p className="text-xs text-white/15">Generate and save prompts to see them here</p>
          </motion.div>
        ) : (
          <>
            {/* Favorites */}
            {favorites.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-semibold text-white/30 mb-3 flex items-center gap-2">
                  <Heart size={12} /> Favorites ({favorites.length})
                </h2>
                <div className="space-y-3">
                  <AnimatePresence>
                    {favorites.map(entry => (
                      <HistoryCard key={entry.id} entry={entry} copied={copiedId === entry.id}
                        onCopy={handleCopy} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* All Others */}
            {others.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-white/30 mb-3 flex items-center gap-2">
                  <Clock size={12} /> Recent ({others.length})
                </h2>
                <div className="space-y-3">
                  <AnimatePresence>
                    {others.map(entry => (
                      <HistoryCard key={entry.id} entry={entry} copied={copiedId === entry.id}
                        onCopy={handleCopy} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

function HistoryCard({ entry, copied, onCopy, onToggleFavorite, onDelete }: {
  entry: HistoryEntry;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(entry.timestamp);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="glass rounded-2xl overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.06] text-white/40 font-medium">{entry.model}</span>
              <span className="text-[10px] text-white/20">{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-xs text-white/30 truncate">{entry.input}</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => onToggleFavorite(entry.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-all">
              <Heart size={14} className={entry.favorite ? 'text-white fill-white' : 'text-white/30'} />
            </button>
            <button onClick={() => onCopy(entry.prompt, entry.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-all">
              {copied ? <Check size={14} className="text-white/70" /> : <Copy size={14} className="text-white/30" />}
            </button>
            <button onClick={() => onDelete(entry.id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.06] transition-all">
              <Trash2 size={14} className="text-white/30 hover:text-red-400" />
            </button>
          </div>
        </div>

        <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
          <p className={`text-sm text-white/60 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {entry.prompt}
          </p>
        </button>

        {expanded && entry.negativePrompt && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
            <p className="text-[10px] text-white/20 font-semibold mb-1">NEGATIVE PROMPT</p>
            <p className="text-[11px] text-white/25 leading-relaxed">{entry.negativePrompt}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
