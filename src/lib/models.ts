export type ModelCategory = 'image' | 'video' | 'llm';

export interface ModelProfile {
  id: string;
  name: string;
  category: ModelCategory;
  description: string;
  promptStyle: 'natural' | 'artistic' | 'weighted' | 'descriptive' | 'motion';
  maxPromptLength: number;
  supportsNegative: boolean;
  supportsParameters: boolean;
  defaultParams: Record<string, string | number>;
  bannedPhrases: string[];
  preferredWording: string[];
  negativePromptStyle: 'detailed' | 'minimal' | 'standard';
}

export const MODELS: ModelProfile[] = [
  // Image Models
  { id: 'flux-dev', name: 'Flux Dev', category: 'image', description: 'Open-source text-to-image model', promptStyle: 'natural', maxPromptLength: 512, supportsNegative: false, supportsParameters: true, defaultParams: { steps: 28, guidance: 3.5 }, bannedPhrases: [], preferredWording: ['cinematic', 'photorealistic', 'detailed', 'natural language'], negativePromptStyle: 'minimal' },
  { id: 'flux-pro', name: 'Flux Pro', category: 'image', description: 'Professional grade image generation', promptStyle: 'natural', maxPromptLength: 512, supportsNegative: false, supportsParameters: true, defaultParams: { steps: 28, guidance: 3.5 }, bannedPhrases: [], preferredWording: ['cinematic', 'photorealistic', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'sdxl', name: 'SDXL', category: 'image', description: 'Stable Diffusion XL', promptStyle: 'weighted', maxPromptLength: 256, supportsNegative: true, supportsParameters: true, defaultParams: { steps: 30, cfg: 7 }, bannedPhrases: ['nsfw'], preferredWording: ['masterpiece', 'best quality', 'highly detailed'], negativePromptStyle: 'detailed' },
  { id: 'midjourney', name: 'Midjourney', category: 'image', description: 'Artistic AI image generator', promptStyle: 'artistic', maxPromptLength: 400, supportsNegative: false, supportsParameters: true, defaultParams: { stylize: 250, chaos: 0, quality: 1 }, bannedPhrases: [], preferredWording: ['cinematic', 'atmospheric', 'ethereal', 'dramatic'], negativePromptStyle: 'minimal' },
  { id: 'dalle', name: 'DALL·E 3', category: 'image', description: 'OpenAI image generation', promptStyle: 'descriptive', maxPromptLength: 1000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'vibrant', 'well-composed'], negativePromptStyle: 'minimal' },
  { id: 'gpt-image', name: 'GPT Image', category: 'image', description: 'GPT-4o native image generation', promptStyle: 'descriptive', maxPromptLength: 1000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'realistic', 'natural'], negativePromptStyle: 'minimal' },
  { id: 'leonardo', name: 'Leonardo AI', category: 'image', description: 'Creative AI image platform', promptStyle: 'weighted', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: { steps: 30 }, bannedPhrases: [], preferredWording: ['cinematic', 'detailed', 'artistic'], negativePromptStyle: 'detailed' },
  { id: 'ideogram', name: 'Ideogram', category: 'image', description: 'Text-aware image generation', promptStyle: 'natural', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'creative', 'text-rendering'], negativePromptStyle: 'standard' },
  { id: 'recraft', name: 'Recraft', category: 'image', description: 'Professional design AI', promptStyle: 'natural', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['clean', 'professional', 'detailed'], negativePromptStyle: 'standard' },
  { id: 'imagen', name: 'Imagen', category: 'image', description: 'Google DeepMind image model', promptStyle: 'descriptive', maxPromptLength: 800, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['photorealistic', 'detailed', 'well-lit'], negativePromptStyle: 'minimal' },
  { id: 'qwen-image', name: 'Qwen Image', category: 'image', description: 'Alibaba image generation', promptStyle: 'natural', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'realistic'], negativePromptStyle: 'standard' },
  { id: 'hidream', name: 'HiDream', category: 'image', description: 'High-fidelity dream generation', promptStyle: 'artistic', maxPromptLength: 400, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['dreamy', 'ethereal', 'detailed'], negativePromptStyle: 'standard' },
  { id: 'seedream', name: 'Seedream', category: 'image', description: 'ByteDance image model', promptStyle: 'natural', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'cinematic'], negativePromptStyle: 'standard' },
  { id: 'janus', name: 'Janus', category: 'image', description: 'DeepSeek multimodal model', promptStyle: 'natural', maxPromptLength: 500, supportsNegative: true, supportsParameters: true, defaultParams: {}, bannedPhrases: [], preferredWording: ['detailed', 'realistic'], negativePromptStyle: 'standard' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', category: 'image', description: 'Original SD model', promptStyle: 'weighted', maxPromptLength: 200, supportsNegative: true, supportsParameters: true, defaultParams: { steps: 30, cfg: 7 }, bannedPhrases: ['nsfw'], preferredWording: ['masterpiece', 'best quality'], negativePromptStyle: 'detailed' },
  // Video Models
  { id: 'kling', name: 'Kling', category: 'video', description: 'Kuaishou video generation', promptStyle: 'motion', maxPromptLength: 500, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 5, fps: 24 }, bannedPhrases: [], preferredWording: ['cinematic motion', 'smooth camera', 'dynamic'], negativePromptStyle: 'minimal' },
  { id: 'veo', name: 'Veo', category: 'video', description: 'Google DeepMind video model', promptStyle: 'motion', maxPromptLength: 800, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 5 }, bannedPhrases: [], preferredWording: ['cinematic', 'smooth motion', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'runway', name: 'Runway Gen-3', category: 'video', description: 'Runway video generation', promptStyle: 'motion', maxPromptLength: 500, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 5 }, bannedPhrases: [], preferredWording: ['cinematic', 'fluid motion', 'dramatic'], negativePromptStyle: 'minimal' },
  { id: 'pika', name: 'Pika', category: 'video', description: 'AI video creation platform', promptStyle: 'motion', maxPromptLength: 400, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 3 }, bannedPhrases: [], preferredWording: ['smooth', 'cinematic', 'dynamic'], negativePromptStyle: 'minimal' },
  { id: 'luma', name: 'Luma Dream Machine', category: 'video', description: 'Luma AI video generation', promptStyle: 'motion', maxPromptLength: 500, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 5 }, bannedPhrases: [], preferredWording: ['cinematic', 'realistic motion', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'sora', name: 'Sora', category: 'video', description: 'OpenAI video generation', promptStyle: 'motion', maxPromptLength: 1000, supportsNegative: false, supportsParameters: true, defaultParams: { duration: 10 }, bannedPhrases: [], preferredWording: ['cinematic', 'realistic', 'detailed', 'natural motion'], negativePromptStyle: 'minimal' },
  // LLM Models
  { id: 'gpt', name: 'GPT-4o', category: 'llm', description: 'OpenAI language model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'specific', 'structured'], negativePromptStyle: 'minimal' },
  { id: 'claude', name: 'Claude', category: 'llm', description: 'Anthropic language model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'nuanced', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'gemini', name: 'Gemini', category: 'llm', description: 'Google multimodal model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'structured', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'grok', name: 'Grok', category: 'llm', description: 'xAI language model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['witty', 'clear', 'direct'], negativePromptStyle: 'minimal' },
  { id: 'deepseek', name: 'DeepSeek', category: 'llm', description: 'DeepSeek language model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'analytical', 'detailed'], negativePromptStyle: 'minimal' },
  { id: 'llama', name: 'Llama', category: 'llm', description: 'Meta open-source model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'specific', 'task-oriented'], negativePromptStyle: 'minimal' },
  { id: 'mistral', name: 'Mistral', category: 'llm', description: 'Mistral AI language model', promptStyle: 'descriptive', maxPromptLength: 4000, supportsNegative: false, supportsParameters: false, defaultParams: {}, bannedPhrases: [], preferredWording: ['clear', 'concise', 'structured'], negativePromptStyle: 'minimal' },
];

export function getModel(id: string): ModelProfile | undefined {
  return MODELS.find(m => m.id === id);
}

export function getModelsByCategory(category: ModelCategory): ModelProfile[] {
  return MODELS.filter(m => m.category === category);
}

export interface StylePreset {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  keywords: string[];
}

export const STYLE_PRESETS: StylePreset[] = [
  { id: 'realistic', name: 'Realistic', emoji: '📸', gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)', keywords: ['photorealistic', 'realistic', 'lifelike', 'natural', 'detailed'] },
  { id: 'cinematic', name: 'Cinematic', emoji: '🎬', gradient: 'linear-gradient(135deg, #0f0f23, #1a1a3e)', keywords: ['cinematic', 'dramatic', 'film-like', 'anamorphic', 'movie still'] },
  { id: 'anime', name: 'Anime', emoji: '🎌', gradient: 'linear-gradient(135deg, #2d1b69, #11998e)', keywords: ['anime style', 'cel-shaded', 'vibrant colors', 'dynamic composition'] },
  { id: 'ghibli', name: 'Ghibli', emoji: '🌿', gradient: 'linear-gradient(135deg, #134e5e, #71b280)', keywords: ['Studio Ghibli style', 'whimsical', 'hand-painted', 'dreamy watercolor'] },
  { id: 'pixar', name: 'Pixar', emoji: '✨', gradient: 'linear-gradient(135deg, #43165c, #e94560)', keywords: ['Pixar 3D style', 'rendered', 'smooth shading', 'expressive characters'] },
  { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🌃', gradient: 'linear-gradient(135deg, #0a0a23, #ff006e)', keywords: ['cyberpunk', 'neon-lit', 'futuristic', 'dystopian', 'high-tech low-life'] },
  { id: 'noir', name: 'Noir', emoji: '🎭', gradient: 'linear-gradient(135deg, #000000, #434343)', keywords: ['film noir', 'high contrast', 'dramatic shadows', 'black and white', 'moody'] },
  { id: 'watercolor', name: 'Watercolor', emoji: '🎨', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', keywords: ['watercolor painting', 'soft edges', 'flowing colors', 'artistic wash'] },
  { id: 'oil-painting', name: 'Oil Painting', emoji: '🖼️', gradient: 'linear-gradient(135deg, #3c1053, #ad5389)', keywords: ['oil painting', 'rich textures', 'visible brushstrokes', 'classical art'] },
  { id: 'fantasy', name: 'Fantasy', emoji: '🧙', gradient: 'linear-gradient(135deg, #1a0530, #614385)', keywords: ['fantasy art', 'magical', 'ethereal', 'mystical atmosphere'] },
  { id: 'scifi', name: 'Sci-fi', emoji: '🚀', gradient: 'linear-gradient(135deg, #0c0c1d, #00d2ff)', keywords: ['science fiction', 'futuristic technology', 'space', 'advanced civilization'] },
  { id: 'comic', name: 'Comic', emoji: '💥', gradient: 'linear-gradient(135deg, #fc4a1a, #f7b733)', keywords: ['comic book style', 'bold lines', 'halftone dots', 'dynamic action'] },
  { id: 'horror', name: 'Horror', emoji: '👻', gradient: 'linear-gradient(135deg, #0d0d0d, #8b0000)', keywords: ['dark horror', 'eerie atmosphere', 'disturbing', 'gothic', 'haunting'] },
  { id: 'fashion', name: 'Fashion', emoji: '👗', gradient: 'linear-gradient(135deg, #2c1810, #c9a96e)', keywords: ['fashion editorial', 'high fashion', 'Vogue style', 'studio lighting', 'elegant'] },
  { id: 'steampunk', name: 'Steampunk', emoji: '⚙️', gradient: 'linear-gradient(135deg, #3c2415, #b8860b)', keywords: ['steampunk', 'Victorian era', 'brass gears', 'mechanical', 'retro-futuristic'] },
  { id: 'vaporwave', name: 'Vaporwave', emoji: '🌊', gradient: 'linear-gradient(135deg, #0d0221, #ff71ce)', keywords: ['vaporwave aesthetic', 'retro', 'neon pink', 'pastel', '80s nostalgia'] },
  { id: 'minimalist', name: 'Minimalist', emoji: '◻️', gradient: 'linear-gradient(135deg, #1a1a1a, #e0e0e0)', keywords: ['minimalist design', 'clean', 'simple', 'geometric', 'modern'] },
  { id: 'surreal', name: 'Surreal', emoji: '🌀', gradient: 'linear-gradient(135deg, #0f0c29, #24243e)', keywords: ['surrealism', 'dreamlike', 'impossible geometry', 'Salvador Dalí inspired'] },
];

export const CAMERA_OPTIONS = [
  { id: 'closeup', name: 'Close-up', icon: '🔍' },
  { id: 'wide-shot', name: 'Wide Shot', icon: '🏔️' },
  { id: 'medium-shot', name: 'Medium Shot', icon: '👤' },
  { id: 'drone', name: 'Drone / Aerial', icon: '🚁' },
  { id: 'pov', name: 'POV / First Person', icon: '👁️' },
  { id: 'low-angle', name: 'Low Angle', icon: '⬆️' },
  { id: 'dutch-angle', name: 'Dutch Angle', icon: '↗️' },
  { id: 'macro', name: 'Macro', icon: '🔬' },
  { id: 'tracking', name: 'Tracking Shot', icon: '📷' },
];

export const LIGHTING_OPTIONS = [
  { id: 'neon', name: 'Neon', icon: '💡' },
  { id: 'soft-light', name: 'Soft Light', icon: '🌤️' },
  { id: 'golden-hour', name: 'Golden Hour', icon: '🌅' },
  { id: 'volumetric', name: 'Volumetric', icon: '🔊' },
  { id: 'studio', name: 'Studio Lighting', icon: '🎦' },
  { id: 'rim-light', name: 'Rim Lighting', icon: '🔵' },
  { id: 'dark-moody', name: 'Dark Moody', icon: '🌑' },
  { id: 'high-contrast', name: 'High Contrast', icon: '⚡' },
];

export const ENVIRONMENT_OPTIONS = [
  { id: 'futuristic-city', name: 'Futuristic City', icon: '🏙️' },
  { id: 'desert', name: 'Desert', icon: '🏜️' },
  { id: 'space-station', name: 'Space Station', icon: '🛸' },
  { id: 'forest', name: 'Forest', icon: '🌲' },
  { id: 'hospital', name: 'Hospital', icon: '🏥' },
  { id: 'luxury-office', name: 'Luxury Office', icon: '🏢' },
  { id: 'cyberpunk-street', name: 'Cyberpunk Street', icon: '🌃' },
  { id: 'sci-fi-lab', name: 'Sci-fi Lab', icon: '🧪' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'mountain', name: 'Mountain', icon: '⛰️' },
];

export const MOOD_OPTIONS = [
  { id: 'dramatic', name: 'Dramatic', icon: '🎭' },
  { id: 'emotional', name: 'Emotional', icon: '💫' },
  { id: 'epic', name: 'Epic', icon: '⚔️' },
  { id: 'peaceful', name: 'Peaceful', icon: '☮️' },
  { id: 'dark', name: 'Dark', icon: '🖤' },
  { id: 'romantic', name: 'Romantic', icon: '❤️' },
  { id: 'tense', name: 'Tense', icon: '😰' },
];

export const QUALITY_OPTIONS = [
  { id: '4k', name: '4K Resolution' },
  { id: '8k', name: '8K Resolution' },
  { id: 'ultra-detailed', name: 'Ultra Detailed' },
  { id: 'hdr', name: 'HDR' },
  { id: 'sharp-focus', name: 'Sharp Focus' },
  { id: 'photorealistic', name: 'Photorealistic' },
];

export const CAMERA_MAP: Record<string, string> = {
  'closeup': 'extreme close-up shot',
  'wide-shot': 'wide establishing shot',
  'medium-shot': 'medium shot',
  'drone': 'aerial drone shot, birds-eye view',
  'pov': 'first-person POV shot',
  'low-angle': 'low angle shot looking up',
  'dutch-angle': 'dramatic Dutch angle',
  'macro': 'macro photography, extreme close-up detail',
  'tracking': 'tracking shot following the subject',
};

export const LIGHTING_MAP: Record<string, string> = {
  'neon': 'neon lighting, colorful neon glow, neon reflections',
  'soft-light': 'soft diffused lighting, gentle ambient light',
  'golden-hour': 'golden hour lighting, warm sunset tones, natural backlight',
  'volumetric': 'volumetric lighting, god rays, light beams through atmosphere',
  'studio': 'professional studio lighting, three-point lighting setup',
  'rim-light': 'rim lighting, edge light, backlit silhouette outline',
  'dark-moody': 'dark moody lighting, low-key illumination, deep shadows',
  'high-contrast': 'high contrast dramatic lighting, stark light and shadow',
};

export const ENVIRONMENT_MAP: Record<string, string> = {
  'futuristic-city': 'futuristic cityscape with towering skyscrapers and holographic displays',
  'desert': 'vast desert landscape with sweeping dunes and dramatic sky',
  'space-station': 'interior of an advanced space station with panoramic views of Earth',
  'forest': 'dense enchanted forest with ancient trees and filtered sunlight',
  'hospital': 'sterile hospital corridor with clinical fluorescent lighting',
  'luxury-office': 'luxury penthouse office with floor-to-ceiling glass windows',
  'cyberpunk-street': 'rain-soaked cyberpunk street at night with neon signs and steam vents',
  'sci-fi-lab': 'advanced sci-fi research laboratory with holographic interfaces',
  'ocean': 'open ocean with deep blue waters and dramatic sky',
  'mountain': 'majestic mountain landscape with snow-capped peaks',
};

export const MOOD_MAP: Record<string, string> = {
  'dramatic': 'dramatic atmosphere, intense emotional weight',
  'emotional': 'deeply emotional, evocative and moving',
  'epic': 'epic and grand scale, awe-inspiring magnitude',
  'peaceful': 'peaceful and serene, calm tranquility',
  'dark': 'dark and ominous, foreboding atmosphere',
  'romantic': 'romantic mood, intimate and tender',
  'tense': 'tense and suspenseful, edge-of-seat intensity',
};

export const QUALITY_MAP: Record<string, string> = {
  '4k': '4K resolution',
  '8k': '8K resolution ultra high definition',
  'ultra-detailed': 'ultra detailed, intricate detail',
  'hdr': 'HDR, high dynamic range',
  'sharp-focus': 'sharp focus, crisp detail',
  'photorealistic': 'photorealistic, indistinguishable from reality',
};
