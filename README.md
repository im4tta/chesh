<div align="center">

# កាតរៀនភាសាខ្មែរ — Khmer Kids Flashcards

*Bilingual Khmer/English flashcards for kids*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

**No database, no accounts — just open it and start studying.**

</div>

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
```

Pick a deck, and start flipping cards.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🌐 | **Bilingual** | Khmer script + English meaning on every card |
| 📚 | **12+ decks** | Consonants, subscripts, vowels, numbers, colors, animals, family, greetings, food, body parts, days, and more |
| 🔤 | **Proper Khmer rendering** | Noto Sans Khmer via `next/font/google` for correct script display |
| 🔽 | **Subscript consonants** | 33 sub-consonant forms generated mechanically via Unicode COENG (U+17D2) |
| 🆎 | **Vowel coverage** | Independent vowels & dependent vowel signs, flagged for native-speaker review |
| ⌨️ | **Keyboard shortcuts** | Space/Enter to reveal, arrows or Y/N to mark right/wrong, ESC for menu |
| 📊 | **Honest scoring** | Kids self-report right/wrong — no gotchas, no pressure |
| 💾 | **Session persistence** | Progress in the current deck survives a page refresh |
| 🔒 | **No tracking** | No accounts, no analytics, nothing leaves the browser |

---

## 📖 How It Works

```
Choose a deck (e.g. Colors — ពណ៌)
        ↓
See the Khmer word/letter → say it out loud → reveal the English meaning
        ↓
Mark yourself correct or incorrect → next card
        ↓
See your score → study again or pick another deck
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js               # Root layout, loads Khmer font
│   ├── page.js                 # Renders <FlashcardApp />
│   └── globals.css             # Theme + .khmer-text font utility
├── components/
│   ├── flashcard-app.js        # Root: deck picker <-> session state machine
│   ├── deck-selector.js        # Grid of deck cards, grouped by category
│   ├── flashcard-session.js    # Orchestrates one study session
│   ├── flashcard-display.js    # Single card: Khmer front, English back
│   ├── session-progress.js     # Progress bar + running score
│   ├── session-results.js      # End-of-session summary with stars
│   └── ui/                     # Badge, Button, Card, Progress (shadcn-style)
├── data/
│   ├── deck-registry.js        # Central deck list — add a deck here
│   └── decks/
│       ├── consonants.js       # 33 consonants (letter + series recognition)
│       ├── subscript-consonants.js  # 33 subscripts via COENG carrier
│       ├── vowels-independent.js    # 15 independent vowels ⚠️
│       ├── vowels-dependent.js      # 19 dependent vowel signs ⚠️
│       ├── numbers.js           # 0–10 (numeral + Khmer word + English)
│       ├── colors.js, animals.js, family.js, greetings.js, food.js
│       ├── body-parts.js, days.js
│       └── ...                 # Additional community decks
├── hooks/
│   ├── use-session.js          # React state wrapper around sessionManager
│   ├── use-keyboard.js         # Keyboard shortcut hooks
│   └── use-speech.js           # Web Speech API for Khmer pronunciation
└── lib/
    ├── mastery-store.js        # Leitner-box spaced repetition (6 boxes)
    ├── session-manager.js      # Session state machine (deck-aware)
    ├── storage-adapter.js      # sessionStorage wrapper with fallback
    └── utils.js                # `cn()` class-merging helper
```

---

## 📚 Adding a New Deck

1. Create `src/data/decks/your-deck.js`:

   ```js
   export const deckMeta = {
     id: "your-deck",
     title: "ចំណងជើងជាភាសាខ្មែរ",
     titleEnglish: "Your Deck",
     emoji: "🎈",
     description: "One sentence describing this deck",
     category: "vocabulary",               // or "literacy"
     order: 10,                            // position in the deck list
     needsVerification: true,              // optional: shows ⚠️ badge
   };

   const items = [
     { khmer: "...", english: "...", emoji: "..." },
   ];

   export const cards = items.map((item, index) => ({
     id: `your-deck-${index + 1}`,
     khmer: item.khmer,
     english: item.english,
     emoji: item.emoji,
     category: "your-deck",
   }));
   ```

2. Register it in `src/data/deck-registry.js` (import + add to the `decks` array).

The deck picker, session manager, and spaced-repetition store all read from the registry automatically.

---

## 🧠 Spaced Repetition

Built-in Leitner-box system with 6 levels:

| Box | Interval | Label |
|-----|----------|-------|
| 0 | Immediate | Just missed / new — must re-study now |
| 1 | 1 day | Beginning to stick |
| 2 | 2 days | Getting familiar |
| 3 | 4 days | Solid recognition |
| 4 | 9 days | Strong recall |
| 5 | 18 days | Mastered — longest gap before review |

Cards move up when marked correct, drop to box 0 when missed. All progress persists in `localStorage` — no server needed.

---

## ⚠️ Content Accuracy

**Literacy decks** (consonants, subscripts) are mechanically generated from fixed Unicode data and intentionally avoid pairing letters with example words — traditional alphabet charts vary by source, and getting even one wrong in a kids' tool does more harm than leaving it out.

**Vowel decks** include a visible "Pending review" badge — the romanization labels are based on Unicode character names and may need a native-speaker pass for regional accuracy.

**Vocabulary decks** use common, everyday words (animals, colors, family, food, etc.). If a word doesn't match how your family says it, Khmer has regional/dialect variation — edit the relevant file in `src/data/decks/`.

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 · React 19 |
| Styling | Tailwind CSS 4 with custom Cambodian-palette theme |
| UI primitives | Radix UI (Slot, Progress) + custom Badge/Button/Card |
| Font | Noto Sans Khmer (via `next/font/google`) |
| Speech | Web Speech API (browser-native TTS for Khmer) |
| Storage | `localStorage` — no database, no accounts |
| Bundler | Turbopack (dev) · Next.js compiler (prod) |

---

## 📄 License

MIT — see [LICENSE](./LICENSE). Educational content (Khmer words/translations) is provided as-is for personal/family use.
