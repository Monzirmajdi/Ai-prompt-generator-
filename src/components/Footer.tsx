import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                <Sparkles size={16} className="text-white/60" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white/60">
                  Monzir<span className="text-white/30">Graphix</span>
                </span>
                <span className="text-[9px] text-white/20 block tracking-[0.15em]">AI PROMPT STUDIO</span>
              </div>
            </div>
            <p className="text-xs text-white/25 max-w-sm leading-relaxed">
              A premium futuristic AI prompt engineering platform. Generate cinematic prompts optimized for every AI model with Arabic & English support.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 mb-3 tracking-wide">PLATFORM</h4>
            <div className="space-y-2">
              {['Prompt Studio', 'Converter', 'History', 'Style Gallery'].map(item => (
                <p key={item} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-default">{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 mb-3 tracking-wide">MODELS</h4>
            <div className="space-y-2">
              {['Flux Pro', 'Midjourney', 'SDXL', 'DALL·E 3', 'Kling AI', 'Sora'].map(item => (
                <p key={item} className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-default">{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/15">
            © {new Date().getFullYear()} MonzirGraphix. All rights reserved.
          </p>
          <p className="text-[10px] text-white/10 tracking-wider">
            CRAFTED WITH PRECISION
          </p>
        </div>
      </div>
    </footer>
  );
}
