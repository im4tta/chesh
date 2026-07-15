"use client";

/**
 * FlashcardApp - Root application component
 * Flow: DECKS (pick a topic) -> SESSION (study that deck) -> back to DECKS
 */

import { useState, useEffect } from "react";
import { DeckSelector } from "./deck-selector";
import { FlashcardSession } from "./flashcard-session";
import { useSession } from "@/hooks/use-session";
import { masteryStore } from "@/lib/mastery-store";

const APP_STATES = {
  DECKS: "DECKS",
  SESSION: "SESSION",
};

export function FlashcardApp() {
  const [appState, setAppState] = useState(APP_STATES.DECKS);
  const [lastSessionStats, setLastSessionStats] = useState(null);
  const [streak, setStreak] = useState({ count: 0, lastStudyDate: null });

  const { isSessionActive, createNewSession, getSessionStats, loading, error } = useSession();

  useEffect(() => {
    if (!loading) {
      setAppState(isSessionActive ? APP_STATES.SESSION : APP_STATES.DECKS);
    }
  }, [isSessionActive, loading]);

  useEffect(() => {
    setStreak(masteryStore.getStreak());
  }, [appState]);

  const handleSelectDeck = (deckId, cardCount = Infinity) => {
    const success = createNewSession(deckId, cardCount);
    if (success) {
      setAppState(APP_STATES.SESSION);
    }
  };

  const handleBackToMenu = () => {
    const stats = getSessionStats();
    if (stats && stats.isCompleted) {
      setLastSessionStats(stats);
    }
    setAppState(APP_STATES.DECKS);
  };

  if (error) {
    return (
      <div className="min-h-screen kroma-pattern bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-5xl">😵</div>
          <h1 className="text-2xl font-bold display-text text-secondary">Something went wrong</h1>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen kroma-pattern bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-5xl animate-float">🐘</div>
          <p className="text-muted-foreground">Loading flashcards…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen kroma-pattern bg-background flex flex-col">
      <header className="bg-card/90 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-3xl shrink-0">🐘</span>
              <div className="min-w-0">
                <h1 className="khmer-text text-xl font-bold leading-tight truncate">
                  កាតរៀនភាសាខ្មែរ
                </h1>
                <p className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
                  Khmer Kids Flashcards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {streak.count > 0 && (
                <div
                  className="flex items-center gap-1 bg-secondary/10 border border-secondary/25 text-secondary rounded-full px-3 py-1.5 text-sm font-bold"
                  title="Daily study streak"
                >
                  <span>🔥</span>
                  <span>{streak.count}</span>
                </div>
              )}
              {appState === APP_STATES.SESSION && (
                <span className="hidden sm:flex items-center gap-1.5 text-sm text-success font-medium">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  Studying
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 flex-1">
        {appState === APP_STATES.DECKS && (
          <DeckSelector onSelectDeck={handleSelectDeck} lastSessionStats={lastSessionStats} />
        )}

        {appState === APP_STATES.SESSION && (
          <FlashcardSession
            onEndSession={handleBackToMenu}
            onStartNewSession={handleSelectDeck}
          />
        )}
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-5">
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">
              កូនខ្មែរ ត្រូវចេះអក្សរខ្មែរ • Every card saves your progress automatically
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FlashcardApp;
