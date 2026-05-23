import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Copy, Download, Heart, ChevronDown, ChevronUp,
  Sparkles, Camera, Sun, Trees, CloudRain, Gauge,
  User, Settings2, Zap, Film, Palette,
  Check, Languages, RotateCcw, MonitorSmartphone
} from 'lucide-react';
import {
  MODELS, STYLE_PRESETS, CAMERA_OPTIONS, LIGHTING_OPTIONS,
  ENVIRONMENT_OPTIONS, MOOD_OPTIONS, QUALITY_OPTIONS,
  getModelsByCategory, ModelCategory
} from '@/lib/models';
import {
  generatePrompt, enhanceCinematic, enhanceRealistic,
  enhanceArtistic, enhanceDramaticLighting, isArabic,
  DEFAULT_OPTIONS, PromptOptions, PromptResult
} from '@/lib/promptEngine';

interface PromptStudioProps {
  onSaveToHistory: (entry: { id: string; timestamp: number; input: string; model: string; prompt: string; negativePrompt: string; favorite: boolean }) => void;
}

type SectionKey = 'style' | 'camera' | 'lighting' | 'environment' | 'mood' | 'quality' | 'character' | 'advanced';

export default function PromptStudio({ onSaveToHistory }: PromptStudioProps) {
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('flux-pro');
  const [modelCategory, setModelCategory] = useState<ModelCategory>('image');
  const [options, setOptions] = useState<PromptOptions>(DEFAULT_OPTIONS);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [showArabic, setShowArabic] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedNeg, setCopiedNeg] = useState(false);
  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    style: true, camera: false, lighting: false, environment: false, mood: false, quality: false, character: false, advanced: false,
  });

  const toggleSection = (key: SectionKey) => setSections(p => ({ ...p, [key]: !p[key] }));

  const updateOption = useCallback(<K extends keyof PromptOptions>(key: K, value: PromptOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateCharDetail = useCallback((key: string, value: string) => {
    setOptions(prev => ({ ...prev, characterDetails: { ...prev.characterDetails, [key]: value } }));
  }, []);

  const updateAdvanced = useCallback((key: string, value: string | number) => {
    setOptions(prev => ({ ...prev, advanced: { ...prev.advanced, [key]: value } }));
  }, []);

  const toggleQuality = useCallback((id: string) => {
    setOptions(prev => ({
      ...prev,
      qualities: prev.qualities.includes(id) ? prev.qualities.filter(q => q !== id) : [...prev.qualities, id],
    }));
  }, []);

  const handleGenerate = useCallback(() => {
    if (!input.trim()) return;
    const res = generatePrompt(input, selectedModel, options);
    setResult(res);
  }, [input, selectedModel, options]);

  const handleEnhance = useCallback((enhancer: (p: string) => string) => {
    if (!result) return;
    setResult(prev => prev ? { ...prev, prompt: enhancer(prev.prompt) } : prev);
  }, [result]);

  const handleCopy = useCallback(async (text: string, type: 'main' | 'neg') => {
    await navigator.clipboard.writeText(text);
    if (type === 'main') { setCopied(true); setTimeout(() => setCopied(false), 2000); }
    else { setCopiedNeg(true); setTimeout(() => setCopiedNeg(false), 2000); }
  }, []);

  const handleSave = useCallback(() => {
    if (!result) return;
    onSaveToHistory({
      id: Date.now().toString(),
      timestamp: Date.now(),
      input: result.originalInput,
      model: selectedModel,
      prompt: result.prompt,
      negativePrompt: result.negativePrompt,
      favorite: false,
    });
  }, [result, selectedModel, onSaveToHistory]);

  const handleExport = useCallback(() => {
    if (!result) return;
    const content = `# MonzirGraphix AI Prompt Studio — Export\n\nModel: ${selectedModel}\n\n## Generated Prompt\n${result.prompt}\n\n${result.negativePrompt ? `## Negative Prompt\n${result.negativePrompt}\n\n` : ''}## Original Input\n${result.originalInput}\n${result.isArabicInput ? `\n## Translated Subject\n${result.translatedSubject}\n` : ''}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'monzirgraphix-prompt.md'; a.click();
    URL.revokeObjectURL(url);
  }, [result, selectedModel]);

  const handleReset = useCallback(() => {
    setInput(''); setResult(null); setShowArabic(false);
    setOptions(DEFAULT_OPTIONS);
  }, []);

  const models = getModelsByCategory(modelCategory);
  const inputIsArabic = input ? isArabic(input) : false;

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">Prompt Studio</span>
          </h1>
          <p className="text-white/40 text-sm">Engineer cinematic AI prompts with model-specific optimization</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* LEFT: Controls */}
          <div className="space-y-4">
            {/* Model Selector */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                <MonitorSmartphone size={16} /> AI Model
              </h3>
              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                {(['image', 'video', 'llm'] as ModelCategory[]).map(cat => (
                  <button key={cat} onClick={() => setModelCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
                      modelCategory === cat ? 'tab-active' : 'text-white/40 border-transparent hover:text-white/60 hover:bg-white/5'
                    }`}>
                    {cat === 'image' ? '🖼️ Image' : cat === 'video' ? '🎬 Video' : '🤖 LLM'}
                  </button>
                ))}
              </div>
              {/* Model Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {models.map(model => (
                  <button key={model.id} onClick={() => setSelectedModel(model.id)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selectedModel === model.id
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/[0.03] border-transparent text-white/40 hover:bg-white/[0.06] hover:text-white/60'
                    }`}>
                    <div className="text-xs font-semibold truncate">{model.name}</div>
                    <div className="text-[10px] text-white/30 mt-0.5 truncate">{model.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Subject Input */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
                  <Wand2 size={16} /> Subject / Idea
                </h3>
                {input && (
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-medium ${
                    inputIsArabic ? 'bg-white/10 text-white/70' : 'bg-white/5 text-white/40'
                  }`}>
                    {inputIsArabic ? '🇸🇩 Arabic — auto-translating' : '🇺🇸 English'}
                  </span>
                )}
              </div>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Describe your vision in Arabic or English... مثال: زول سوداني لابس جلابية في شارع سايبربانك"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none h-28 focus:outline-none focus:border-white/25 transition-colors"
                dir={inputIsArabic ? 'rtl' : 'ltr'}
              />
              {inputIsArabic && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-white/30 mt-2">
                  💡 Your Arabic input will be automatically translated and optimized in English
                </motion.p>
              )}
            </motion.div>

            {/* Style Cards */}
            <Section title="Style" icon={<Palette size={16} />} open={sections.style} onToggle={() => toggleSection('style')}>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {STYLE_PRESETS.map(style => (
                  <button key={style.id} onClick={() => updateOption('style', options.style === style.id ? '' : style.id)}
                    className={`relative rounded-xl overflow-hidden h-20 transition-all border ${
                      options.style === style.id ? 'border-white/30 ring-1 ring-white/20' : 'border-white/5 hover:border-white/15'
                    }`}>
                    <div className="absolute inset-0" style={{ background: style.gradient }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col items-center justify-end p-2">
                      <span className="text-base mb-0.5">{style.emoji}</span>
                      <span className="text-[10px] font-medium text-white/80 truncate">{style.name}</span>
                    </div>
                    {options.style === style.id && (
                      <div className="absolute top-1.5 right-1.5 z-10 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                        <Check size={10} className="text-black" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {!options.style && (
                <button onClick={() => updateOption('style', '')}
                  className="mt-2 text-[11px] text-white/30 hover:text-white/50 transition-colors">
                  No style selected — prompt will use natural language
                </button>
              )}
            </Section>

            {/* Camera */}
            <Section title="Camera Angle" icon={<Camera size={16} />} open={sections.camera} onToggle={() => toggleSection('camera')}>
              <div className="flex flex-wrap gap-2">
                {CAMERA_OPTIONS.map(cam => (
                  <Pill key={cam.id} label={`${cam.icon} ${cam.name}`} active={options.camera === cam.id}
                    onClick={() => updateOption('camera', options.camera === cam.id ? '' : cam.id)} />
                ))}
              </div>
            </Section>

            {/* Lighting */}
            <Section title="Lighting" icon={<Sun size={16} />} open={sections.lighting} onToggle={() => toggleSection('lighting')}>
              <div className="flex flex-wrap gap-2">
                {LIGHTING_OPTIONS.map(l => (
                  <Pill key={l.id} label={`${l.icon} ${l.name}`} active={options.lighting === l.id}
                    onClick={() => updateOption('lighting', options.lighting === l.id ? '' : l.id)} />
                ))}
              </div>
            </Section>

            {/* Environment */}
            <Section title="Environment" icon={<Trees size={16} />} open={sections.environment} onToggle={() => toggleSection('environment')}>
              <div className="flex flex-wrap gap-2">
                {ENVIRONMENT_OPTIONS.map(e => (
                  <Pill key={e.id} label={`${e.icon} ${e.name}`} active={options.environment === e.id}
                    onClick={() => updateOption('environment', options.environment === e.id ? '' : e.id)} />
                ))}
              </div>
            </Section>

            {/* Mood */}
            <Section title="Mood" icon={<CloudRain size={16} />} open={sections.mood} onToggle={() => toggleSection('mood')}>
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map(m => (
                  <Pill key={m.id} label={`${m.icon} ${m.name}`} active={options.mood === m.id}
                    onClick={() => updateOption('mood', options.mood === m.id ? '' : m.id)} />
                ))}
              </div>
            </Section>

            {/* Quality */}
            <Section title="Quality" icon={<Gauge size={16} />} open={sections.quality} onToggle={() => toggleSection('quality')}>
              <div className="flex flex-wrap gap-2">
                {QUALITY_OPTIONS.map(q => (
                  <Pill key={q.id} label={q.name} active={options.qualities.includes(q.id)}
                    onClick={() => toggleQuality(q.id)} />
                ))}
              </div>
            </Section>

            {/* Character Details */}
            <Section title="Character Details" icon={<User size={16} />} open={sections.character} onToggle={() => toggleSection('character')}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'hair', placeholder: 'Hair style/color' },
                  { key: 'age', placeholder: 'Age range' },
                  { key: 'clothing', placeholder: 'Clothing description' },
                  { key: 'ethnicity', placeholder: 'Ethnicity' },
                  { key: 'expression', placeholder: 'Expression' },
                ].map(field => (
                  <input key={field.key}
                    type="text"
                    value={options.characterDetails[field.key as keyof typeof options.characterDetails]}
                    onChange={e => updateCharDetail(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
                  />
                ))}
              </div>
            </Section>

            {/* Advanced Controls */}
            <Section title="Advanced" icon={<Settings2 size={16} />} open={sections.advanced} onToggle={() => toggleSection('advanced')}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">Aspect Ratio</label>
                  <select value={options.advanced.aspectRatio}
                    onChange={e => updateAdvanced('aspectRatio', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-white/25">
                    {['1:1', '4:3', '16:9', '9:16', '21:9', '3:2'].map(r => <option key={r} value={r} className="bg-[#121212]">{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">Stylize: {options.advanced.stylize}</label>
                  <input type="range" min="0" max="1000" value={options.advanced.stylize}
                    onChange={e => updateAdvanced('stylize', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">Chaos: {options.advanced.chaos}</label>
                  <input type="range" min="0" max="100" value={options.advanced.chaos}
                    onChange={e => updateAdvanced('chaos', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="text-[11px] text-white/40 mb-1.5 block">Seed</label>
                  <input type="number" value={options.advanced.seed}
                    onChange={e => updateAdvanced('seed', parseInt(e.target.value) || -1)}
                    placeholder="Random (-1)"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/25" />
                </div>
                <div className="col-span-2">
                  <label className="text-[11px] text-white/40 mb-1.5 block">Custom Negative Prompt</label>
                  <input type="text" value={options.advanced.negativePrompt}
                    onChange={e => updateAdvanced('negativePrompt', e.target.value)}
                    placeholder="blurry, low quality, distorted..."
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/25" />
                </div>
              </div>
            </Section>

            {/* Enhancer Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-4">
              <h3 className="text-xs font-semibold text-white/40 mb-3 flex items-center gap-2">
                <Zap size={14} /> Quick Enhancers
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '🎬 More Cinematic', action: () => handleEnhance(enhanceCinematic) },
                  { label: '📸 Ultra Realistic', action: () => handleEnhance(enhanceRealistic) },
                  { label: '🎨 More Artistic', action: () => handleEnhance(enhanceArtistic) },
                  { label: '💡 Dramatic Lighting', action: () => handleEnhance(enhanceDramaticLighting) },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} disabled={!result}
                    className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[11px] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    {btn.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Generate & Reset */}
            <div className="flex gap-3">
              <button onClick={handleGenerate} disabled={!input.trim()}
                className="flex-1 flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]">
                <Sparkles size={18} /> Generate Prompt
              </button>
              <button onClick={handleReset}
                className="flex items-center justify-center gap-2 glass px-4 py-4 rounded-2xl text-white/40 hover:text-white/70 transition-all">
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT: Output Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="glass-strong rounded-2xl overflow-hidden">
              {/* Output Header */}
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse-glow" />
                  <span className="text-xs font-semibold text-white/50 tracking-wide">OUTPUT</span>
                </div>
                <span className="text-[10px] text-white/20 font-mono">
                  {MODELS.find(m => m.id === selectedModel)?.name || selectedModel}
                </span>
              </div>

              {/* Output Content */}
              <div className="p-5">
                {result ? (
                  <AnimatePresence mode="wait">
                    <motion.div key={result.prompt} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {/* Prompt */}
                      <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06] mb-4">
                        <p className="prompt-output-text text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{result.prompt}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={() => handleCopy(result.prompt, 'main')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] text-white/60 hover:text-white transition-all">
                          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button onClick={handleExport}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] text-white/60 hover:text-white transition-all">
                          <Download size={12} /> Export
                        </button>
                        <button onClick={handleSave}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] text-white/60 hover:text-white transition-all">
                          <Heart size={12} /> Save
                        </button>
                        {result.isArabicInput && (
                          <button onClick={() => setShowArabic(!showArabic)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-[11px] text-white/60 hover:text-white transition-all">
                            <Languages size={12} /> {showArabic ? 'Hide Arabic' : 'Read in Arabic'}
                          </button>
                        )}
                      </div>

                      {/* Arabic Explanation */}
                      <AnimatePresence>
                        {showArabic && result.arabicExplanation && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-4">
                            <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.06]" dir="rtl">
                              <p className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap font-[Cairo]">{result.arabicExplanation}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Negative Prompt */}
                      {result.negativePrompt && (
                        <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-white/30 font-semibold tracking-wide">NEGATIVE PROMPT</span>
                            <button onClick={() => handleCopy(result.negativePrompt, 'neg')}
                              className="text-[10px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
                              {copiedNeg ? <Check size={10} /> : <Copy size={10} />} {copiedNeg ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <p className="text-[11px] text-white/30 leading-relaxed">{result.negativePrompt}</p>
                        </div>
                      )}

                      {/* Translation info */}
                      {result.isArabicInput && (
                        <div className="mt-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                          <p className="text-[10px] text-white/25">
                            🔄 Translated from Arabic: <span className="text-white/40">{result.translatedSubject}</span>
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4 border border-white/[0.06]">
                      <Film size={24} className="text-white/20" />
                    </div>
                    <p className="text-sm text-white/20 mb-1">No prompt generated yet</p>
                    <p className="text-[11px] text-white/10">Enter your vision and click Generate</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* MonzirGraphix Watermark */}
            <div className="text-center py-2">
              <span className="text-[9px] text-white/15 tracking-[0.2em]">POWERED BY MONZIRGRAPHIX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Generate Button */}
      <div className="mobile-bottom-bar lg:hidden">
        <button onClick={handleGenerate} disabled={!input.trim()}
          className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-semibold text-sm shadow-lg shadow-black/50 disabled:opacity-30 active:scale-[0.98] transition-all">
          <Sparkles size={18} /> Generate Prompt
        </button>
      </div>
    </div>
  );
}

// ── Reusable Sub-Components ──

function Section({ title, icon, open, onToggle, children }: {
  title: string; icon: React.ReactNode; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-sm font-semibold text-white/70 flex items-center gap-2">{icon} {title}</span>
        {open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border whitespace-nowrap ${
        active ? 'bg-white/12 text-white border-white/20' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/[0.06] hover:text-white/60'
      }`}>
      {label}
    </button>
  );
}
