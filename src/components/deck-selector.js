"use client";

import { useState, useEffect } from "react";
import { masteryStore, onMasteryChange } from "@/lib/mastery-store";
import { getDeckListByCategory } from "@/data/deck-registry";

const CARD_COLORS = [
  "border-coral/40 hover:border-coral bg-gradient-to-br from-coral/5 to-white",
  "border-ocean/40 hover:border-ocean bg-gradient-to-br from-ocean/5 to-white",
  "border-sunny/40 hover:border-sunny bg-gradient-to-br from-sunny/5 to-white",
  "border-grass/40 hover:border-grass bg-gradient-to-br from-grass/5 to-white",
  "border-candy/40 hover:border-candy bg-gradient-to-br from-candy/5 to-white",
  "border-purple/40 hover:border-purple bg-gradient-to-br from-purple/5 to-white",
];

function DeckMasteryBar({ deckId, cardCount }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(masteryStore.getDeckStats(deckId, cardCount));
    const unsub = onMasteryChange(() => setStats(masteryStore.getDeckStats(deckId, cardCount)));
    return unsub;
  }, [deckId, cardCount]);

  if (!stats) return null;
  // masteryPercent (based on masteredCount) only moves once a card hits
  // full mastery (5 correct in a row), so it can sit at 0% for a while
  // even though real progress is being saved. learningPercent is
  // weighted by box level across every card seen, so the bar visibly
  // fills in after just one or two correct answers — that's what should
  // drive the fill, with the star rating reserved for true mastery.
  const pct = stats.masteryPercent;
  const fillPct = stats.learningPercent;
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
        <span>
          {stats.masteredCount}/{stats.totalCards} mastered
          {stats.inProgressCount > 0 && (
            <span className="text-primary/70"> · {stats.inProgressCount} learning</span>
          )}
        </span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((star) => (
            <span key={star} className={`text-xs ${star * 33 <= pct ? "opacity-100" : "opacity-20"}`}>⭐</span>
          ))}
        </div>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-muted-foreground/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-coral transition-all duration-700"
          style={{ width: `${fillPct}%` }}
        />
      </div>
    </div>
  );
}

function CategoryHeader({ title, titleEnglish, description }) {
  return (
    <div className="flex flex-col items-start gap-0.5 px-1">
      <div className="flex items-baseline gap-2">
        <h2 className="khmer-text text-2xl font-extrabold display-text text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground font-bold">{titleEnglish}</span>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export function DeckSelector({ onSelectDeck, lastSessionStats = null }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("order");

  const allCategories = getDeckListByCategory();

  const allDecks = allCategories.flatMap((cat) =>
    cat.decks.map((d) => ({ ...d, categoryTitle: cat.title, categoryEnglish: cat.titleEnglish }))
  );

  const filtered = allDecks.filter((deck) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      deck.title.toLowerCase().includes(q) ||
      deck.titleEnglish.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.titleEnglish.localeCompare(b.titleEnglish);
    if (sortBy === "name-khmer") return a.title.localeCompare(b.title);
    if (sortBy === "cards") return a.cardCount - b.cardCount;
    if (sortBy === "cards-desc") return b.cardCount - a.cardCount;
    return (a.order ?? 99) - (b.order ?? 99);
  });

  const grouped = allCategories.map((cat) => ({
    ...cat,
    decks: sorted.filter((d) => d.category === cat.id || (!d.category && cat.id === "vocabulary")),
  })).filter((g) => g.decks.length > 0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2 animate-pop-in">
        <div className="text-6xl mb-1 animate-float">🐘</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold display-text text-foreground">
          <span className="khmer-text">ជ្រើសរើសកញ្ចប់</span>
        </h2>
        <p className="text-muted-foreground text-base font-medium">Pick a deck to study! 🎈</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
          <input
            type="text"
            placeholder="Search decks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-muted bg-card text-sm font-medium focus:outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-2.5 px-3 rounded-2xl border-2 border-muted bg-card text-sm font-medium focus:outline-none focus:border-primary transition-all"
          >
            <option value="order">Order</option>
            <option value="name">Name</option>
            <option value="name-khmer">ឈ្មោះ</option>
            <option value="cards">Cards ↑</option>
            <option value="cards-desc">Cards ↓</option>
          </select>
        </div>
      </div>

      {lastSessionStats && (
        <div className="max-w-md mx-auto bg-success/10 border-2 border-success/30 rounded-2xl p-4 animate-pop-in text-center">
          <p className="text-lg font-bold text-success">✨ Great job!</p>
          <p className="text-sm text-muted-foreground">
            <span className="khmer-text">{lastSessionStats.deckTitleKhmer}</span> — {lastSessionStats.correctAnswers}/{lastSessionStats.answeredCards} correct
          </p>
        </div>
      )}

      {grouped.map((cat) => (
        <section key={cat.id} className="space-y-4">
          <CategoryHeader {...cat} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.decks.map((deck, i) => (
              <button
                key={deck.id}
                onClick={() => onSelectDeck(deck.id, deck.cardCount)}
                className={`text-left group border-4 rounded-3xl p-5 transition-all hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl shadow-sm cursor-pointer ${CARD_COLORS[i % CARD_COLORS.length]}`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center text-4xl w-14 h-14 rounded-2xl bg-white shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
                    {deck.emoji}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="khmer-text text-lg font-extrabold leading-tight">{deck.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{deck.titleEnglish}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <DeckMasteryBar deckId={deck.id} cardCount={deck.cardCount} />
                </div>
                {deck.needsVerification && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    Pending review
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}