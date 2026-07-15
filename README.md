<div align="center">

# កាតរៀនភាសាខ្មែរ — Khmer Kids Flashcards

*Bilingual Khmer/English flashcards for kids*

[![Next.js](https://img.shields.io/badge/Next.js-15.4-000000?style=flat-square&logo=next.js)](https://nextjs.org)
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
| 📚 | **8 decks** | Consonants, numbers, colors, animals, family, greetings, food, body parts |
| 🔤 | **Proper Khmer rendering** | Loads Noto Sans Khmer so the script always displays correctly |
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
khmer-kids-flashcards/
├── src/
│   ├── app/
│   │   ├── layout.js               # Root layout, loads Khmer font
│   │   ├── page.js                 # Renders <FlashcardApp />
│   │   └── globals.css             # Theme + .khmer-text font utility
│   ├── components/
│   │   ├── flashcard-app.js        # Root: deck picker <-> session state machine
│   │   ├── deck-selector.js        # Grid of deck cards to choose from
│   │   ├── flashcard-session.js    # Orchestrates one study session
│   │   ├── flashcard-display.js    # Single card: Khmer front, English back
│   │   ├── session-progress.js     # Progress bar + running score
│   │   ├── session-results.js      # End-of-session summary screen
│   │   └── ui/                     # button.jsx, card.jsx, progress.jsx (shadcn-style)
│   ├── data/
│   │   ├── deck-registry.js        # Central list of decks — add a deck here
│   │   └── decks/
│   │       ├── consonants.js       # 33 Khmer consonants (letter recognition)
│   │       ├── numbers.js          # 0–10, numeral + Khmer word + English
│   │       ├── colors.js
│   │       ├── animals.js
│   │       ├── family.js
│   │       ├── greetings.js
│   │       └── food.js
│   │       └── body-parts.js
│   ├── hooks/
│   │   ├── use-session.js          # React state wrapper around sessionManager
│   │   └── use-keyboard.js         # Keyboard shortcut hooks
│   └── lib/
│       ├── session-manager.js      # Session state machine (deck-aware)
│       ├── storage-adapter.js      # sessionStorage wrapper with fallback
│       └── utils.js                # `cn()` class-merging helper
├── package.json
└── ... (Next.js/Tailwind config)
```

---

## 📚 Adding a New Deck

1. Create `src/data/decks/your-deck.js`:

   ```js
   export const deckMeta = {
     id: "your-deck",
     title: "ចំណងជើងជាភាសាខ្មែរ",   // Khmer title
     titleEnglish: "Your Deck",
     emoji: "🎈",
     description: "One sentence describing this deck",
   };

   const items = [
     { khmer: "...", english: "...", emoji: "..." }, // emoji optional
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

That's it — the deck picker, session manager, and stats all read from the registry automatically.

---

## ⚠️ A note on content accuracy

The **alphabet deck intentionally does not pair each consonant with an example word.** Traditional Khmer alphabet charts vary in which example word they use per letter, and getting even one wrong in a children's literacy tool does more harm than leaving it out — so that deck is letter recognition + sequence only (which letter is this, and where does it fall in the 33-letter order). The vocabulary decks (animals, colors, family, food, etc.) use common, everyday words. If you spot a word that doesn't match how your family says it, Khmer has regional/dialect variation — feel free to edit the relevant file in `src/data/decks/`.

---

## 🛠 Tech Stack

Next.js 15 + React 19 · Tailwind CSS 4 · Noto Sans Khmer (via `next/font/google`) · Radix UI primitives

---

## 📄 License

MIT — see [LICENSE](./LICENSE). Educational content (Khmer words/translations) is provided as-is for personal/family use.
