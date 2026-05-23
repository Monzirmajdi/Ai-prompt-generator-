import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Sparkles, Copy, Check } from 'lucide-react';
import { getModelsByCategory, ModelCategory } from '@/lib/models';
import { convertPromptToModel, DEFAULT_OPTIONS } from '@/lib/promptEngine';

export default function PromptConverter() {
  const [fromModel, setFromModel] = useState('midjourney');
  const [toModel, setToModel] = useState('flux-pro');
  const [inputPrompt, setInputPrompt] = useState('');
  const [converted, setConverted] = useState('');
  const [copied, setCopied] = useState(false);
  const [fromCat, setFromCat] = useState<ModelCategory>('image');
  const [toCat, setToCat] = useState<ModelCategory>('image');

  const handleConvert = () => {
    if (!inputPrompt.trim()) return;
    const result = convertPromptToModel(inputPrompt, fromModel, toModel, DEFAULT_OPTIONS);
    setConverted(result);
  };

  const handleSwap = () => {
    const tempModel = fromModel;
    const tempCat = fromCat;
    setFromModel(toModel);
    setFromCat(toCat);
    setToModel(tempModel);
    setToCat(tempCat);
    setInputPrompt(converted || inputPrompt);
    setConverted('');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(converted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fromModels = getModelsByCategory(fromCat);
  const toModels = getModelsByCategory(toCat);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">Prompt Converter</span>
          </h1>
          <p className="text-white/40 text-sm">Convert prompts between AI model formats</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
          {/* From */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/70">From</h3>
              <div className="flex gap-1">
                {(['image', 'video'] as ModelCategory[]).map(c => (
                  <button key={c} onClick={() => setFromCat(c)}
                    className={`px-2 py-1 rounded-lg text-[10px] transition-all ${fromCat === c ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
                    {c === 'image' ? '🖼️' : '🎬'}
                  </button>
                ))}
              </div>
            </div>
            <select value={fromModel} onChange={e => setFromModel(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white mb-4 focus:outline-none focus:border-white/25">
              {fromModels.map(m => <option key={m.id} value={m.id} className="bg-[#121212]">{m.name}</option>)}
            </select>
            <textarea value={inputPrompt} onChange={e => setInputPrompt(e.target.value)}
              placeholder="Paste your prompt here..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none h-48 focus:outline-none focus:border-white/25" />
          </motion.div>

          {/* Swap Button */}
          <div className="flex md:flex-col items-center justify-center gap-2 py-4">
            <button onClick={handleSwap}
              className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-all active:scale-95 border border-white/10">
              <ArrowRightLeft size={18} className="text-white/50" />
            </button>
            <button onClick={handleConvert}
              className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center hover:bg-white/90 transition-all active:scale-95">
              <Sparkles size={18} className="text-black" />
            </button>
          </div>

          {/* To */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/70">To</h3>
              <div className="flex gap-1">
                {(['image', 'video'] as ModelCategory[]).map(c => (
                  <button key={c} onClick={() => setToCat(c)}
                    className={`px-2 py-1 rounded-lg text-[10px] transition-all ${toCat === c ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
                    {c === 'image' ? '🖼️' : '🎬'}
                  </button>
                ))}
              </div>
            </div>
            <select value={toModel} onChange={e => setToModel(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white mb-4 focus:outline-none focus:border-white/25">
              {toModels.map(m => <option key={m.id} value={m.id} className="bg-[#121212]">{m.name}</option>)}
            </select>
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 h-48 overflow-auto">
              {converted ? (
                <>
                  <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{converted}</p>
                  <button onClick={handleCopy}
                    className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] text-[11px] text-white/60 hover:text-white transition-all">
                    {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy'}
                  </button>
                </>
              ) : (
                <p className="text-sm text-white/20 pt-2">Converted prompt will appear here...</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Convert Presets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 mt-6">
          <h3 className="text-xs font-semibold text-white/40 mb-3">Quick Conversions</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { from: 'midjourney', to: 'flux-pro', label: 'Midjourney → Flux' },
              { from: 'flux-pro', to: 'sdxl', label: 'Flux → SDXL' },
              { from: 'sdxl', to: 'dalle', label: 'SDXL → DALL·E' },
              { from: 'kling', to: 'sora', label: 'Kling → Sora' },
              { from: 'dalle', to: 'midjourney', label: 'DALL·E → Midjourney' },
            ].map(preset => (
              <button key={preset.label}
                onClick={() => { setFromModel(preset.from); setToModel(preset.to); }}
                className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all">
                {preset.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
