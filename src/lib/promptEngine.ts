import { getModel, CAMERA_MAP, LIGHTING_MAP, ENVIRONMENT_MAP, MOOD_MAP, QUALITY_MAP, STYLE_PRESETS } from './models';

// ── Arabic Detection ──
export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

// ── Arabic to English Dictionary ──
const ARABIC_DICT: [string, string][] = [
  ['عالي الجودة', 'high quality'],
  ['لابس جلابية', 'wearing traditional jalabiya'],
  ['واقعي للغاية', 'ultra realistic'],
  ['سايبربانك في الليل', 'cyberpunk at night'],
  ['ضوء نيون', 'neon light'],
  ['إضاءة درامية', 'dramatic lighting'],
  ['زاوية منخفضة', 'low angle'],
  ['تعمق المجال', 'shallow depth of field'],
  ['خلفية ضبابية', 'blurry background'],
  ['لوحة زيتية', 'oil painting'],
  ['ألوان مائية', 'watercolor'],
  ['عالي الدقة', 'high resolution'],
  ['رسم يدوي', 'hand-drawn'],
  ['أسلوب أنمي', 'anime style'],
  ['أسلوب سينمائي', 'cinematic style'],
  ['مشهد واسع', 'wide shot'],
  ['لقطة قريبة', 'close-up shot'],
  ['مدينة مستقبلية', 'futuristic city'],
  ['شارع مظلم', 'dark street'],
  ['سماء مرصعة بالنجوم', 'starry sky'],
  ['غروب الشمس', 'sunset'],
  ['شروق الشمس', 'sunrise'],
  ['في الليل', 'at night'],
  ['في النهار', 'during the day'],
  ['واقف في', 'standing in'],
  ['جالس في', 'sitting in'],
  ['يمشي في', 'walking in'],
  ['ينظر إلى', 'looking at'],
  ['بجانب', 'next to'],
  ['في وسط', 'in the middle of'],
  ['محاط بـ', 'surrounded by'],
  ['مستوى عالي من التفاصيل', 'highly detailed'],
  ['ثلاثي الأبعاد', '3D rendered'],
  ['فيلم سينمائي', 'cinematic film'],
  ['كثيف ومظلم', 'dense and dark'],
  ['زول', 'man'],
  ['رجل', 'man'],
  ['امرأة', 'woman'],
  ['بنت', 'girl'],
  ['ولد', 'boy'],
  ['طفل', 'child'],
  ['عجوز', 'elderly person'],
  ['فتاة', 'young woman'],
  ['شاب', 'young man'],
  ['شخص', 'person'],
  ['وجه', 'face'],
  ['عائلة', 'family'],
  ['فارس', 'knight'],
  ['ملك', 'king'],
  ['ملكة', 'queen'],
  ['أمير', 'prince'],
  ['أميرة', 'princess'],
  ['محارب', 'warrior'],
  ['ساحر', 'wizard'],
  ['طبيب', 'doctor'],
  ['مهندس', 'engineer'],
  ['رائد فضاء', 'astronaut'],
  ['فنان', 'artist'],
  ['موسيقي', 'musician'],
  ['راقص', 'dancer'],
  ['حيوان', 'animal'],
  ['قطة', 'cat'],
  ['كلب', 'dog'],
  ['حصان', 'horse'],
  ['طائر', 'bird'],
  ['تنين', 'dragon'],
  ['سوداني', 'Sudanese'],
  ['عربي', 'Arab'],
  ['أفريقي', 'African'],
  ['مصري', 'Egyptian'],
  ['أمريكي', 'American'],
  ['ياباني', 'Japanese'],
  ['كوري', 'Korean'],
  ['أوروبي', 'European'],
  ['آسيوي', 'Asian'],
  ['جلابية', 'traditional white jalabiya'],
  ['ثوب', 'traditional thobe'],
  ['عمامة', 'turban'],
  ['فستان', 'dress'],
  ['بدلة', 'suit'],
  ['قبعة', 'hat'],
  ['عباية', 'abayah'],
  ['حجاب', 'hijab'],
  ['نظارة', 'glasses'],
  ['وشاح', 'scarf'],
  ['معطف', 'coat'],
  ['درع', 'armor'],
  ['واقف', 'standing'],
  ['جالس', 'sitting'],
  ['يمشي', 'walking'],
  ['يركض', 'running'],
  ['ينظر', 'looking'],
  ['يبتسم', 'smiling'],
  ['يغني', 'singing'],
  ['يرقص', 'dancing'],
  ['يطير', 'flying'],
  ['يحمل', 'holding'],
  ['يركب', 'riding'],
  ['يقرأ', 'reading'],
  ['يكتب', 'writing'],
  ['يطبخ', 'cooking'],
  ['يلعب', 'playing'],
  ['يفكر', 'thinking'],
  ['يصارع', 'fighting'],
  ['يصلي', 'praying'],
  ['يحارب', 'battling'],
  ['يضحك', 'laughing'],
  ['يبكي', 'crying'],
  ['شارع', 'street'],
  ['مدينة', 'city'],
  ['صحراء', 'desert'],
  ['بحر', 'sea'],
  ['جبل', 'mountain'],
  ['غابة', 'forest'],
  ['سماء', 'sky'],
  ['نهر', 'river'],
  ['مبنى', 'building'],
  ['مسجد', 'mosque'],
  ['حديقة', 'garden'],
  ['كوخ', 'cabin'],
  ['قلعة', 'castle'],
  ['كهف', 'cave'],
  ['جزيرة', 'island'],
  ['كوكب', 'planet'],
  ['قمر', 'moon'],
  ['كوبري', 'bridge'],
  ['سوق', 'market'],
  ['مكتبة', 'library'],
  ['كنيسة', 'church'],
  ['معبد', 'temple'],
  ['محطة', 'station'],
  ['مطار', 'airport'],
  ['ميناء', 'port'],
  ['جميل', 'beautiful'],
  ['كبير', 'large'],
  ['صغير', 'small'],
  ['واقعي', 'realistic'],
  ['سينمائي', 'cinematic'],
  ['مظلم', 'dark'],
  ['مضيء', 'bright'],
  ['ليلي', 'nocturnal'],
  ['حديث', 'modern'],
  ['قديم', 'ancient'],
  ['مستقبلي', 'futuristic'],
  ['غامض', 'mysterious'],
  ['رائع', 'magnificent'],
  ['مرعب', 'terrifying'],
  ['هادئ', 'peaceful'],
  ['رومانسي', 'romantic'],
  ['حزين', 'sad'],
  ['سعيد', 'happy'],
  ['قوي', 'powerful'],
  ['ضعيف', 'weak'],
  ['سريع', 'fast'],
  ['بطيء', 'slow'],
  ['طويل', 'tall'],
  ['قصير', 'short'],
  ['سميك', 'thick'],
  ['رفيع', 'thin'],
  ['نظيف', 'clean'],
  ['وسخ', 'dirty'],
  ['أبيض', 'white'],
  ['أسود', 'black'],
  ['أحمر', 'red'],
  ['أزرق', 'blue'],
  ['أخضر', 'green'],
  ['أصفر', 'yellow'],
  ['ذهبي', 'golden'],
  ['فضي', 'silver'],
  ['بنفسجي', 'purple'],
  ['برتقالي', 'orange'],
  ['وردي', 'pink'],
  ['بني', 'brown'],
  ['رمادي', 'gray'],
  ['سايبربانك', 'cyberpunk'],
  ['أنمي', 'anime'],
  ['فانتازيا', 'fantasy'],
  ['رعب', 'horror'],
  ['خيال علمي', 'science fiction'],
  ['ستيمبانك', 'steampunk'],
  ['كوميكس', 'comic book'],
  ['بكسار', 'Pixar style'],
  ['غيبلي', 'Ghibli style'],
  ['نوار', 'film noir'],
  ['بورتريه', 'portrait'],
  ['منظر طبيعي', 'landscape'],
  ['تصميم', 'design'],
  ['مجرد', 'abstract'],
  ['حقيقي', 'real'],
  ['حالم', 'dreamy'],
  ['مطر', 'rain'],
  ['ثلج', 'snow'],
  ['شمس', 'sun'],
  ['نجوم', 'stars'],
  ['غيوم', 'clouds'],
  ['ضباب', 'fog'],
  ['رعد', 'thunder'],
  ['رياح', 'wind'],
  ['عاصفة', 'storm'],
  ['صورة', 'photo'],
  ['لقطة', 'shot'],
  ['إضاءة', 'lighting'],
  ['خلفية', 'background'],
  ['تفاصيل', 'details'],
  ['بؤرة', 'focus'],
  ['عدسة', 'lens'],
  ['فلتر', 'filter'],
  ['مجال عمق', 'depth of field'],
  ['تأثير', 'effect'],
  [' و ', ' and '],
  [' في ', ' in '],
  [' على ', ' on '],
  [' مع ', ' with '],
  [' من ', ' from '],
  [' إلى ', ' to '],
  [' تحت ', ' under '],
  [' فوق ', ' above '],
  [' بين ', ' between '],
  [' خلف ', ' behind '],
  [' أمام ', ' in front of '],
  [' لابس ', ' wearing '],
  [' لابسة ', ' wearing '],
];

const SORTED_DICT = [...ARABIC_DICT].sort((a, b) => b[0].length - a[0].length);

export function translateArabicToEnglish(text: string): string {
  let result = text;
  for (const [arabic, english] of SORTED_DICT) {
    result = result.replace(new RegExp(arabic, 'g'), english);
  }
  result = result.replace(/\s+/g, ' ').trim();
  return result;
}

// ── Prompt Options ──
export interface PromptOptions {
  style: string;
  camera: string;
  lighting: string;
  environment: string;
  mood: string;
  qualities: string[];
  characterDetails: {
    hair: string;
    age: string;
    clothing: string;
    ethnicity: string;
    expression: string;
  };
  advanced: {
    aspectRatio: string;
    stylize: number;
    chaos: number;
    seed: number;
    negativePrompt: string;
    promptStrength: number;
  };
}

export const DEFAULT_OPTIONS: PromptOptions = {
  style: '',
  camera: '',
  lighting: '',
  environment: '',
  mood: '',
  qualities: ['8k', 'ultra-detailed', 'photorealistic'],
  characterDetails: { hair: '', age: '', clothing: '', ethnicity: '', expression: '' },
  advanced: {
    aspectRatio: '16:9',
    stylize: 250,
    chaos: 0,
    seed: -1,
    negativePrompt: '',
    promptStrength: 1,
  },
};

// ── Generate Arabic explanation ──
export function generateArabicExplanation(components: {
  subject: string;
  style: string;
  camera: string;
  lighting: string;
  environment: string;
  mood: string;
  qualities: string[];
}): string {
  const parts: string[] = [];
  if (components.style) {
    const styleName = STYLE_PRESETS.find(s => s.id === components.style)?.name || components.style;
    parts.push(`الأسلوب الفني: ${styleName}`);
  }
  if (components.camera) parts.push(`زاوية الكاميرا: ${CAMERA_MAP[components.camera]?.split(',')[0] || components.camera}`);
  if (components.lighting) parts.push(`الإضاءة: ${LIGHTING_MAP[components.lighting]?.split(',')[0] || components.lighting}`);
  if (components.environment) parts.push(`البيئة: ${ENVIRONMENT_MAP[components.environment]?.split(',')[0] || components.environment}`);
  if (components.mood) parts.push(`المزاج: ${MOOD_MAP[components.mood]?.split(',')[0] || components.mood}`);
  if (components.qualities.length > 0) parts.push(`الجودة: ${components.qualities.join('، ')}`);
  return `هذا البرومبت يصف مشهد "${components.subject}" مع:\n${parts.join('\n')}\n\nالبرومبت النهائي مكتوب بالإنجليزية ومحسّن لفهم نماذج الذكاء الاصطناعي.`;
}

// ── Negative Prompt Generation ──
export function generateNegativePrompt(modelId: string, style: string): string {
  const model = getModel(modelId);
  if (!model || !model.supportsNegative) return '';
  const base = ['blurry', 'low quality', 'bad anatomy', 'distorted', 'deformed', 'ugly'];
  const anatomy = ['bad hands', 'extra fingers', 'missing fingers', 'extra limbs', 'mutated hands'];
  const artifacts = ['compression artifacts', 'watermark', 'text', 'logo', 'signature', 'cropped', 'out of frame'];
  let negatives: string[] = [];
  switch (model.negativePromptStyle) {
    case 'detailed': negatives = [...base, ...anatomy, ...artifacts, 'worst quality', 'normal quality', 'jpeg artifacts', 'duplicate']; break;
    case 'standard': negatives = [...base, ...artifacts]; break;
    case 'minimal': negatives = [...base]; break;
  }
  if (style === 'realistic' || style === 'cinematic') negatives.push('cartoon', 'anime', 'illustration', 'painting', 'drawing', 'cgi');
  else if (style === 'anime' || style === 'ghibli') negatives.push('photorealistic', 'photo', 'real person', '3d render');
  return negatives.join(', ');
}

// ── Model-Specific Formatting ──
function formatForFlux(subject: string, options: PromptOptions): string {
  const parts: string[] = [];
  if (options.camera) parts.push(CAMERA_MAP[options.camera]);
  if (options.lighting) parts.push(`with ${LIGHTING_MAP[options.lighting]}`);
  parts.push(`of ${subject}`);
  if (options.style) {
    const sp = STYLE_PRESETS.find(s => s.id === options.style);
    if (sp) parts.push(`in ${sp.keywords.join(', ')} style`);
  }
  if (options.environment) parts.push(`set in ${ENVIRONMENT_MAP[options.environment]}`);
  if (options.mood) parts.push(MOOD_MAP[options.mood]);
  if (options.qualities.length > 0) parts.push(options.qualities.map(q => QUALITY_MAP[q]).join(', '));
  if (options.characterDetails.clothing) parts.push(`wearing ${options.characterDetails.clothing}`);
  if (options.characterDetails.ethnicity) parts.push(options.characterDetails.ethnicity);
  if (options.characterDetails.expression) parts.push(`${options.characterDetails.expression} expression`);
  return `A cinematic ${parts.join(', ')}.`;
}

function formatForMidjourney(subject: string, options: PromptOptions): string {
  const parts: string[] = [];
  parts.push(subject);
  if (options.style) { const sp = STYLE_PRESETS.find(s => s.id === options.style); if (sp) parts.push(sp.keywords.join(' ')); }
  if (options.camera) parts.push(CAMERA_MAP[options.camera]);
  if (options.lighting) parts.push(LIGHTING_MAP[options.lighting]);
  if (options.environment) parts.push(ENVIRONMENT_MAP[options.environment]);
  if (options.mood) parts.push(MOOD_MAP[options.mood]);
  if (options.qualities.length > 0) parts.push(options.qualities.map(q => QUALITY_MAP[q]).join(' '));
  if (options.characterDetails.clothing) parts.push(`wearing ${options.characterDetails.clothing}`);
  if (options.characterDetails.ethnicity) parts.push(options.characterDetails.ethnicity);
  if (options.characterDetails.expression) parts.push(`${options.characterDetails.expression} expression`);
  let prompt = parts.join(', ');
  prompt += ` --ar ${options.advanced.aspectRatio} --v 6.1 --s ${options.advanced.stylize}`;
  if (options.advanced.chaos > 0) prompt += ` --c ${options.advanced.chaos}`;
  if (options.advanced.seed >= 0) prompt += ` --seed ${options.advanced.seed}`;
  prompt += ' --q 2';
  return prompt;
}

function formatForSDXL(subject: string, options: PromptOptions): string {
  const parts: string[] = [];
  parts.push('(masterpiece, best quality, ultra detailed:1.3)');
  if (options.camera) parts.push(`(${CAMERA_MAP[options.camera]}:1.2)`);
  parts.push(`(${subject}:1.4)`);
  if (options.style) { const sp = STYLE_PRESETS.find(s => s.id === options.style); if (sp) parts.push(`(${sp.keywords.join(', ')}:1.2)`); }
  if (options.lighting) parts.push(`(${LIGHTING_MAP[options.lighting]}:1.1)`);
  if (options.environment) parts.push(`(${ENVIRONMENT_MAP[options.environment]}:1.1)`);
  if (options.mood) parts.push(MOOD_MAP[options.mood]);
  if (options.qualities.length > 0) parts.push(options.qualities.map(q => `(${QUALITY_MAP[q]}:1.1)`).join(', '));
  if (options.characterDetails.clothing) parts.push(`(wearing ${options.characterDetails.clothing}:1.1)`);
  if (options.characterDetails.ethnicity) parts.push(`(${options.characterDetails.ethnicity}:1.1)`);
  if (options.characterDetails.expression) parts.push(`(${options.characterDetails.expression} expression:1.1)`);
  return parts.join(', ');
}

function formatForDalle(subject: string, options: PromptOptions): string {
  const parts: string[] = [];
  parts.push(`Create a highly detailed image of ${subject}`);
  if (options.style) { const sp = STYLE_PRESETS.find(s => s.id === options.style); if (sp) parts.push(`in a ${sp.name.toLowerCase()} style`); }
  if (options.camera) parts.push(`Shot as a ${CAMERA_MAP[options.camera]}`);
  if (options.lighting) parts.push(`The lighting features ${LIGHTING_MAP[options.lighting]}`);
  if (options.environment) parts.push(`The scene is set in ${ENVIRONMENT_MAP[options.environment]}`);
  if (options.mood) parts.push(`The overall mood is ${MOOD_MAP[options.mood]}`);
  if (options.characterDetails.clothing) parts.push(`The subject is wearing ${options.characterDetails.clothing}`);
  if (options.characterDetails.ethnicity) parts.push(`The subject is ${options.characterDetails.ethnicity}`);
  if (options.characterDetails.expression) parts.push(`with a ${options.characterDetails.expression} expression`);
  if (options.qualities.length > 0) parts.push(`Quality: ${options.qualities.map(q => QUALITY_MAP[q]).join(', ')}`);
  return parts.join('. ') + '.';
}

function formatForVideo(subject: string, options: PromptOptions): string {
  const parts: string[] = [];
  parts.push(`Cinematic video of ${subject}`);
  if (options.style) { const sp = STYLE_PRESETS.find(s => s.id === options.style); if (sp) parts.push(sp.keywords.join(', ')); }
  if (options.camera) parts.push(`camera executing a smooth ${CAMERA_MAP[options.camera]} with fluid motion`);
  if (options.lighting) parts.push(LIGHTING_MAP[options.lighting]);
  if (options.environment) parts.push(`set in ${ENVIRONMENT_MAP[options.environment]}`);
  if (options.mood) parts.push(MOOD_MAP[options.mood]);
  parts.push('smooth cinematic motion, fluid transitions, professional cinematography');
  if (options.qualities.length > 0) parts.push(options.qualities.map(q => QUALITY_MAP[q]).join(', '));
  if (options.characterDetails.clothing) parts.push(`wearing ${options.characterDetails.clothing}`);
  if (options.characterDetails.ethnicity) parts.push(options.characterDetails.ethnicity);
  return parts.join(', ') + '.';
}

function formatForLLM(subject: string): string {
  return `You are an expert AI assistant. ${subject}\n\nPlease provide a detailed, well-structured response that is clear and comprehensive.`;
}

// ── Main Generate ──
export interface PromptResult {
  prompt: string;
  negativePrompt: string;
  isArabicInput: boolean;
  originalInput: string;
  translatedSubject: string;
  arabicExplanation: string;
}

export function generatePrompt(input: string, modelId: string, options: PromptOptions): PromptResult {
  const model = getModel(modelId);
  if (!model) return { prompt: input, negativePrompt: '', isArabicInput: false, originalInput: input, translatedSubject: input, arabicExplanation: '' };

  const arabicInput = isArabic(input);
  const subject = arabicInput ? translateArabicToEnglish(input) : input;
  let prompt = '';

  if (model.category === 'video') {
    prompt = formatForVideo(subject, options);
  } else if (model.category === 'llm') {
    prompt = formatForLLM(subject);
  } else {
    switch (model.id) {
      case 'midjourney': prompt = formatForMidjourney(subject, options); break;
      case 'sdxl': case 'stable-diffusion': case 'leonardo': prompt = formatForSDXL(subject, options); break;
      case 'dalle': case 'gpt-image': case 'imagen': prompt = formatForDalle(subject, options); break;
      default: prompt = formatForFlux(subject, options); break;
    }
  }

  const negativePrompt = options.advanced.negativePrompt || generateNegativePrompt(modelId, options.style);
  const arabicExplanation = arabicInput ? generateArabicExplanation({
    subject, style: options.style, camera: options.camera, lighting: options.lighting,
    environment: options.environment, mood: options.mood, qualities: options.qualities,
  }) : '';

  return { prompt, negativePrompt, isArabicInput: arabicInput, originalInput: input, translatedSubject: subject, arabicExplanation };
}

// ── Enhancers ──
export function enhanceCinematic(prompt: string): string {
  return `${prompt.replace(/\.$/, '')}, cinematic composition, film grain, anamorphic lens flare, dramatic depth of field, color graded, movie still quality.`;
}
export function enhanceRealistic(prompt: string): string {
  return `${prompt.replace(/\.$/, '')}, RAW photo, shot on Canon EOS R5, 85mm lens, f/1.4 aperture, natural skin texture, subsurface scattering, photorealistic rendering.`;
}
export function enhanceArtistic(prompt: string): string {
  return `${prompt.replace(/\.$/, '')}, artistic composition, masterful color palette, expressive brushwork, gallery-worthy, museum quality fine art.`;
}
export function enhanceDramaticLighting(prompt: string): string {
  return `${prompt.replace(/\.$/, '')}, dramatic chiaroscuro lighting, Rembrandt lighting pattern, deep shadows, volumetric light rays, atmospheric haze.`;
}

// ── Model Conversion ──
export function convertPromptToModel(currentPrompt: string, _fromModelId: string, toModelId: string, options: PromptOptions): string {
  let subject = currentPrompt
    .replace(/\(masterpiece.*?\)/g, '').replace(/--\w+\s+\S+/g, '')
    .replace(/Create a highly detailed image of/i, '').replace(/Cinematic video of/i, '')
    .replace(/A cinematic\s*/i, '').replace(/,\s*$/, '').trim();
  const result = generatePrompt(subject || currentPrompt, toModelId, options);
  return result.prompt;
}
