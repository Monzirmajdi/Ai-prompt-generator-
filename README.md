# 🎬 MonzirGraphix AI Prompt Studio

> Premium futuristic multilingual AI prompt engineering platform

![MonzirGraphix](https://img.shields.io/badge/MonzirGraphix-AI%20Prompt%20Studio-white?style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square)

---

## ✨ المميزات

- 🧠 **محرك ذكي للبرومبت** — توليد برومبتات سينمائية محسّنة لكل موديل
- 🌍 **عربي + إنجليزي** — ترجمة تلقائية من العربي للإنجليزي (180+ كلمة)
- 🎨 **30+ موديل AI** — Flux, Midjourney, SDXL, DALL·E, Kling, Sora, وغيرها
- 🎬 **تحكم سينمائي كامل** — كاميرا، إضاءة، بيئة، مزاج، جودة
- 🔄 **محول البرومبت** — تحويل بين صيغ الموديلات المختلفة
- 💾 **سجل البرومبتات** — حفظ، مفضلة، نسخ، تصدير
- 📱 **متجاوب بالكامل** — تجربة موبايل احترافية
- 🪟 **Glassmorphism UI** — تصميم مستقبلي فاخر

---

## 🚀 التشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/your-username/monzirgraphix-prompt-studio.git
cd monzirgraphix-prompt-studio

# تثبيت المكتبات
npm install

# تشغيل محلي
npm run dev

# بناء للإنتاج
npm run build
```

---

## 📁 هيكل المشروع

```
monzirgraphix-prompt-studio/
├── index.html                    # الصفحة الرئيسية
├── package.json                  # إعدادات المشروع
├── vite.config.ts               # إعدادات Vite
├── tsconfig.json                # إعدادات TypeScript
├── .gitignore                   # ملفات مستبعدة
├── README.md                    # التوثيق
│
└── src/
    ├── main.tsx                  # نقطة الدخول
    ├── App.tsx                   # التطبيق الرئيسي + التوجيه
    ├── index.css                 # Glassmorphism + Animations
    │
    ├── lib/
    │   ├── models.ts             # 28+ موديل + 18 ستايل + كل الخيارات
    │   └── promptEngine.ts       # محرك البرومبت + ترجمة عربي
    │
    ├── components/
    │   ├── Navbar.tsx             # شريط التنقل
    │   ├── Hero.tsx               # الصفحة الرئيسية
    │   ├── PromptStudio.tsx       # استوديو البرومبت الكامل
    │   ├── PromptConverter.tsx    # محول البرومبت
    │   ├── PromptHistory.tsx      # سجل البرومبتات
    │   └── Footer.tsx             # الفوتر
    │
    └── utils/
        └── cn.ts                  # أداة CSS
```

---

## 🧠 كيف يعمل محرك البرومبت

### الترجمة العربية
عند كتابة نص عربي يتم:
1. كشف اللغة تلقائياً
2. ترجمة الكلمات باستخدام قاموس 180+ كلمة
3. تحسين الصياغة لتصبح برومبت إنجليزي احترافي

**مثال:**
```
الإدخال:  زول سوداني لابس جلابية في شارع سايبربانك
الناتج:   A cinematic close-up shot, with neon lighting, neon glow, neon reflections 
          of man Sudanese wearing traditional white jalabiya in street, set in cyberpunk, 
          neon-lit, futuristic, dystopian street, 8K resolution ultra high definition, 
          ultra detailed, photorealistic.
```

### التحسين حسب الموديل
كل موديل AI يحصل على برومبت محسّن بشكل مختلف:
- **Flux** → لغة طبيعية سينمائية
- **Midjourney** → صياغة فنية + `--ar --v --s --q`
- **SDXL** → كلمات مفتاحية موزونة `(word:1.4)`
- **DALL·E** → وصف مشهد منطقي
- **Video Models** → حركة كاميرا + انتقالات

---

## 🎨 الموديلات المدعومة

### نماذج الصور (15)
Flux Dev, Flux Pro, SDXL, Midjourney, DALL·E 3, GPT Image, Leonardo AI, Ideogram, Recraft, Imagen, Qwen Image, HiDream, Seedream, Janus, Stable Diffusion

### نماذج الفيديو (6)
Kling, Veo, Runway Gen-3, Pika, Luma Dream Machine, Sora

### نماذج اللغة (7)
GPT-4o, Claude, Gemini, Grok, DeepSeek, Llama, Mistral

---

## 🛠️ التقنيات

| التقنية | الاستخدام |
|---------|----------|
| React 19 | واجهة المستخدم |
| TypeScript | أنواع البيانات |
| Tailwind CSS 4 | التصميم |
| Framer Motion | الحركات |
| Lucide React | الأيقونات |
| Vite 7 | أداة البناء |

---

## 🌐 النشر

### Vercel
```bash
npm run build
# ارفع مجلد dist/ أو وصل GitHub repo
```

### Netlify
```bash
npm run build
# ارفع مجلد dist/
```

### GitHub Pages
```bash
npm run build
# ارفع محتويات dist/
```

---

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT.

---

## 👤 المطور

**MonzirGraphix**

> Premium AI Prompt Engineering Platform

---

<p align="center">
  <sub>Built with ❤️ by MonzirGraphix</sub>
</p>
