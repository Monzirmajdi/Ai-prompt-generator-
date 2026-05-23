import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Globe, Layers } from 'lucide-react';

type Page = 'home' | 'studio' | 'converter' | 'history';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const FLOATING_CARDS = [
  { label: 'Flux Pro', icon: '🎨', delay: 0 },
  { label: 'Midjourney', icon: '✨', delay: 1.5 },
  { label: 'SDXL', icon: '🖼️', delay: 3 },
  { label: 'Kling AI', icon: '🎬', delay: 0.8 },
  { label: 'DALL·E', icon: '🤖', delay: 2.2 },
  { label: 'Sora', icon: '🎥', delay: 4 },
];

const FEATURES = [
  { icon: <Zap size={20} />, title: 'Smart Optimization', desc: 'Model-specific prompt engineering' },
  { icon: <Globe size={20} />, title: 'Arabic + English', desc: 'Auto-translate and optimize' },
  { icon: <Layers size={20} />, title: '30+ AI Models', desc: 'Image, Video, and LLM support' },
];

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-[80px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={i}
            className="absolute glass-subtle rounded-2xl px-4 py-3 flex items-center gap-2 text-sm"
            style={{
              left: `${10 + (i * 15) % 75}%`,
              top: `${15 + (i * 18) % 60}%`,
            }}
            animate={{
              y: [0, -20, 0, 10, 0],
              rotate: [0, 1, -1, 0.5, 0],
              opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: card.delay,
            }}
          >
            <span className="text-lg">{card.icon}</span>
            <span className="text-white/60 text-xs font-medium">{card.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-2 mb-8"
        >
          <Sparkles size={14} className="text-white/60" />
          <span className="text-xs text-white/60 font-medium tracking-wide">AI-NATIVE PROMPT ENGINEERING PLATFORM</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
        >
          <span className="text-white">Craft </span>
          <span className="bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Intelligent
          </span>
          <br />
          <span className="text-white">AI Prompts</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Generate cinematic prompts optimized for every AI model.
          <br className="hidden sm:block" />
          Arabic & English. Model-specific. Cinematic intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => onNavigate('studio')}
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Creating
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('studio')}
            className="flex items-center gap-3 glass glass-hover px-8 py-4 rounded-2xl font-medium text-sm text-white/70 hover:text-white transition-all"
          >
            Explore Styles
          </button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-5 text-left group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 text-white/50 group-hover:text-white/80 transition-colors border border-white/5">
                {feat.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{feat.title}</h3>
              <p className="text-xs text-white/40">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
