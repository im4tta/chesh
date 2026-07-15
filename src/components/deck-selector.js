"use client";

/**
 * DeckSelector - Lets the child (or parent) pick which flashcard deck to
 * study. Decks are grouped the way a Khmer primary classroom would split
 * them: learning to read the script first, then building vocabulary.
 * Each deck shows a mastery bar driven by the persistent spaced-repetition
 * store, not just a card count.
 */

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDeckListByCategory } from "@/data/deck-registry";
import { masteryStore } from "@/lib/mastery-store";

const SMART_SESSION_SIZE = 15;

function DeckMasteryBar({ deckId, cardCount }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(masteryStore.getDeckStats(deckId, cardCount));
  }, [deckId, cardCount]);

  if (!stats) return <div className="h-1.5" />;

  return (
    <div className="space-y-1">
      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden flex">
        {stats.masteredCount > 0 && (
          <div
            className="h-full bg-success"
            style={{ width: `${(stats.masteredCount / cardCount) * 100}%` }}
          />
        )}
        {stats.inProgressCount > 0 && (
          <div
            className="h-full bg-primary"
            style={{ width: `${(stats.inProgressCount / cardCount) * 100}%` }}
          />
        )}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{stats.masteredCount > 0 ? `${stats.masteredCount} mastered` : "Not started"}</span>
        <span>{cardCount} cards</span>
      </div>
    </div>
  );
}

export function DeckSelector({ onSelectDeck, lastSessionStats = null, className = "" }) {
  const categories = getDeckListByCategory();

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-10 ${className}`}>
      <div className="text-center space-y-2 animate-pop-in">
        <h2 className="text-2xl sm:text-3xl font-bold display-text">
          <span className="khmer-text">ជ្រើសរើសកញ្ចប់</span>{" "}
          <span className="text-muted-foreground text-lg sm:text-xl font-medium">
            Choose a deck
          </span>
        </h2>
        <p className="text-muted-foreground text-sm">Pick a topic to start studying 🎓</p>
      </div>

      {lastSessionStats && (
        <Card className="max-w-md mx-auto border-success/30 bg-success/5 animate-pop-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <span>✨</span>
              Last session:{" "}
              <span className="khmer-text">{lastSessionStats.deckTitleKhmer}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-success">{lastSessionStats.correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-xl font-bold text-secondary">{lastSessionStats.incorrectAnswers}</p>
                <p className="text-xs text-muted-foreground">Missed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-sky">{lastSessionStats.accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {categories.map((cat) => (
        <section key={cat.id} className="space-y-4">
          <div className="flex items-baseline gap-2 px-1">
            <h3 className="khmer-text text-xl font-bold">{cat.title}</h3>
            <span className="text-sm text-muted-foreground">{cat.titleEnglish}</span>
          </div>
          <p className="text-xs text-muted-foreground px-1 -mt-2">{cat.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.decks.map((deck) => (
              <button
                key={deck.id}
                onClick={() => onSelectDeck(deck.id, Math.min(deck.cardCount, SMART_SESSION_SIZE))}
                className="text-left group"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary hover:-translate-y-1 cursor-pointer border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <span className="text-3xl group-hover:scale-110 transition-transform">
                          {deck.emoji}
                        </span>
                        <span className="khmer-text">{deck.title}</span>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{deck.titleEnglish}</span>
                        {deck.needsVerification && (
                          <Badge tone="warning">Pending review</Badge>
                        )}
                      </CardDescription>
                    </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{deck.description}</p>
                    <DeckMasteryBar deckId={deck.id} cardCount={deck.cardCount} />
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
