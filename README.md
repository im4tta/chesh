<div align="center">

<img src="https://raw.githubusercontent.com/im4tta/kflashcard/main/public/icon.svg" width="72" height="72" alt="App icon">

# កាតរៀនភាសាខ្មែរ — Khmer Kids Flashcards

*Bilingual Khmer/English flashcards for kids — no accounts, no tracking.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

</div>

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

Pick a deck and start flipping cards.

---

## ✨ Features

| | Feature | |
|---|---|---|
| 🎨 | **Kids-friendly UI** | Bright candy palette, big emoji, playful animations, extra-rounded corners |
| 📚 | **24 decks** | Consonants → subscripts → vowels → numbers → colors → greetings → family → animals → food → body parts → days → solar system → months → time → daily items → buildings → relatives → feelings → weather → transportation → nature → fruits → jobs |
| 🆎 | **Vowel coverage** | Independent vowels & dependent vowel signs, flagged for native-speaker review |
| 🔤 | **Proper Khmer rendering** | Noto Sans Khmer via `next/font/google` for correct script display |
| 🖼️ | **Auto-detected images** | Drop kid-safe photos into `public/images/decks/{deckId}/{cardId}.jpg` — they appear on cards automatically |
| ⭐ | **Spaced repetition** | Built-in Leitner-box system (6 levels). Cards you miss come back sooner |
| 📋 | **Word list panel** | See all session words alongside the flashcard with ✅/🔄 status per card — no more guessing what's left |
| 🔊 | **Pronunciation** | Browser-native speech synthesis for Khmer (tap the speaker icon) |
| ⌨️ | **Keyboard shortcuts** | Space/Enter to reveal, arrows or Y/N to mark right/wrong |
| 📱 | **PWA** | Install on your home screen, works offline, receives update notifications |
| 💾 | **Session persistence** | Progress survives a page refresh |
| 🔒 | **No tracking** | No accounts, no analytics, nothing leaves the browser |
| 🌐 | **Bilingual** | Khmer script + English meaning on every card |

---

## 📖 How It Works

```
Choose a deck
    ↓
See the Khmer word + emoji → say it out loud → tap "Show Answer"
    ↓
Mark yourself correct (✅) or needs review (🔄)
    ↓
See your score → study again or pick another deck
```

All progress saves automatically. Missed cards come back within the same session so kids keep practicing until it sticks.

---

## 🧠 Spaced Repetition (Leitner System)

| Box | Interval | Meaning |
|-----|----------|---------|
| 0 | Immediate | Just missed — must retry now |
| 1 | 1 day | Beginning to stick |
| 2 | 2 days | Getting familiar |
| 3 | 4 days | Solid recognition |
| 4 | 9 days | Strong recall |
| 5 | 18 days | Mastered |

Correct answers promote a card up one box. Wrong answers drop it back to box 0. Progress persists in `localStorage`.

---

## 🖼️ Adding Photos to Cards

The app uses **emoji-only by default** (safe for everyone). To add real photos:

1. Generate kid-safe images (see [IMAGE_SETUP.md](IMAGE_SETUP.md) for Gemini prompt templates)
2. Save to `public/images/decks/{deckId}/{filename}.{ext}`
3. Restart the dev server — images appear automatically next to each card's emoji

### Image naming

The app tries two filename patterns (in order):

1. **Slugified English name** — the card's `english` label, lowercased with all non-alphanumeric characters replaced by a single `-`. For `english: "Hand / Arm"` → `hand-arm.jpg`.
2. **Card ID fallback** — the card's `id` field, e.g. `body-7.jpg`.

Place the file as `public/images/decks/{deckId}/{stem}.{ext}` where `ext` is one of `png`, `jpg`, `jpeg`, `webp`.

> **Common pitfalls &raquo;** Special characters in English names (`/`, `(`, `)`, `&`, `#`) are stripped by the slugifier. `"Cart / Wagon"` becomes `cart-wagon`, not `cart---wagon` or any other variant. Always match the **exact** slugify() output — see [src/lib/utils.js](src/lib/utils.js) for the logic.

### Verifying

```bash
npm run build    # rebuilds the static export into out/
```

Missing images are handled silently (emoji fallback). You can add images one deck at a time.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js             # Root layout, fonts, PWA meta tags
│   ├── page.js               # Entry point
│   └── globals.css           # Kids-friendly theme + animations
├── components/
│   ├── flashcard-app.js      # Root: deck picker ↔ session state
│   ├── deck-selector.js      # Colorful deck grid with star mastery
│   ├── flashcard-session.js  # Orchestrates one study session
│   ├── flashcard-display.js  # Card: Khmer front, English flip side
│   ├── session-progress.js   # Animated progress bar + dot track
│   ├── session-results.js    # End-of-session celebration with stars
│   ├── word-list.js          # Sidebar showing all words + status
│   └── update-toast.js       # PWA update notification
├── data/
│   ├── deck-registry.js      # Central deck list — add a deck here
│   └── decks/                # 19 deck files (consonants → feelings)
├── hooks/
│   ├── use-session.js        # React wrapper around sessionManager
│   ├── use-keyboard.js       # Keyboard shortcut hooks
│   └── use-speech.js         # Web Speech API for Khmer
└── lib/
    ├── mastery-store.js      # Leitner-box spaced repetition
    ├── session-manager.js    # Session state machine
    ├── storage-adapter.js    # sessionStorage wrapper
    └── utils.js              # cn() helper + getCardImageUrl()
```

---

## 📚 Deck Reference

| # | Deck | Cards | Type |
|---|------|-------|------|
| 1 | Consonants (ព្យព្ជានៈ) | 33 | Literacy |
| 2 | Subscripts (ជើងព្យព្ជានៈ) | 33 | Literacy |
| 3 | Independent Vowels (ស្រៈពេញតួ) | 15 | Literacy ⚠️ |
| 4 | Dependent Vowels (ស្រៈនិស្ស័យ) | 19 | Literacy ⚠️ |
| 5 | Numbers (លេខ) | 11 | Vocabulary |
| 6 | Greetings & Phrases (ការស្វាគមន៍) | 8 | Vocabulary |
| 7 | Family (គ្រួសារ) | 8 | Vocabulary |
| 8 | Colors (ពណ៌) | 9 | Vocabulary |
| 9 | Animals (សត្វ) | 12 | Vocabulary |
| 10 | Food (អាហារ) | 10 | Vocabulary |
| 11 | Body Parts (ផ្នែករាងកាយ) | 8 | Vocabulary |
| 12 | Days (ថ្ងៃ) | 7 | Vocabulary |
| 13 | Solar System (ប្រព័ន្ធព្រះអាទិត្យ) | 10 | Vocabulary |
| 14 | Months (ខែ) | 12 | Vocabulary |
| 15 | Time (ម៉ោង) | 10 | Vocabulary |
| 16 | Everyday Items (របស់របរប្រចាំថ្ងៃ) | 12 | Vocabulary |
| 17 | Buildings & Places (អគារ និងកន្លែង) | 10 | Vocabulary |
| 18 | Relatives (សាច់ញាតិ) | 10 | Vocabulary |
| 19 | Feelings (អារម្មណ៍) | 10 | Vocabulary |
| 20 | Weather (អាកាសធាតុ) | 12 | Vocabulary |
| 21 | Transportation (យានជំនិះ) | 10 | Vocabulary |
| 22 | Nature (ធម្មជាតិ) | 10 | Vocabulary |
| 23 | Fruits (ផ្លែឈើ) | 10 | Vocabulary |
| 24 | Jobs & Professions (មុខរបរ) | 10 | Vocabulary |

⚠️ = Vowel decks need native-speaker review (romanization labels based on Unicode names)

---

## 📦 PWA

The app is a full Progressive Web App:

- **Installable** — "Add to Home Screen" on any supported browser
- **Offline-capable** — service worker caches all static assets
- **Auto-updating** — notification toast when a new version is available
- **Push-ready** — push subscription infrastructure is wired up

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 · React 19 |
| Styling | Tailwind CSS 4 (kids-friendly palette) |
| Font | Noto Sans Khmer + Baloo 2 (display) via `next/font/google` |
| Speech | Web Speech API (browser-native TTS) |
| PWA | Custom service worker + manifest |
| Storage | `localStorage` — no database, no accounts |
| Bundler | Turbopack (dev) · Next.js compiler (prod) |

---

## 📄 License

MIT — see [LICENSE](./LICENSE). Educational content (Khmer words/translations) is provided as-is for personal/family use.
