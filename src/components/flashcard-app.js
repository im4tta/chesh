"use client";

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
  const [refreshKey, setRefreshKey] = useState(0);

  const { isSessionActive, createNewSession, getSessionStats, loading, error, clearSession } = useSession();

  useEffect(() => {
    if (!loading) {
      setAppState(isSessionActive ? APP_STATES.SESSION : APP_STATES.DECKS);
    }
  }, [isSessionActive, loading]);

  useEffect(() => {
    setStreak(masteryStore.getStreak());
  }, [appState]);

  const handleSelectDeck = (deckId, cardCount = Infinity, mode = "random") => {
    const success = createNewSession(deckId, cardCount, mode);
    if (success) {
      setAppState(APP_STATES.SESSION);
    }
  };

  const handleBackToMenu = () => {
    const stats = getSessionStats();
    if (stats && stats.isCompleted) {
      setLastSessionStats(stats);
    }
    clearSession();
    setAppState(APP_STATES.DECKS);
    setRefreshKey((k) => k + 1);
  };

  if (error) {
    return (
      <div className="min-h-screen kids-bg bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="text-7xl animate-wiggle">😵</div>
          <h1 className="text-3xl font-bold display-text text-primary">Something went wrong</h1>
          <p className="text-muted-foreground">{error}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-md">Reload App</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen kids-bg bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-7xl animate-float">🐘</div>
          <p className="text-muted-foreground text-lg font-medium">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen kids-bg bg-background flex flex-col">
      <header className="bg-card/95 backdrop-blur-sm border-b-4 border-primary/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleBackToMenu}
              className="flex items-center gap-3 min-w-0 text-left"
            >
              <img
                src="/assets/icon.svg"
                alt="Khmer Flashcards"
                className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 drop-shadow-sm"
              />
              <div className="min-w-0">
                <h1 className="khmer-text text-2xl sm:text-3xl font-extrabold display-text leading-tight truncate bg-gradient-to-r from-primary via-candy to-ocean bg-clip-text text-transparent animate-gradient">
                  កាតរៀនភាសាខ្មែរ
                </h1>
                <p className="text-xs font-medium text-muted-foreground leading-tight">Khmer Kids Flashcards</p>
              </div>
            </button>
            <div className="flex items-center gap-2 shrink-0">
              {streak.count > 0 && (
                <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 text-amber-700 rounded-full px-3 py-1.5 text-sm font-bold shadow-sm">
                  <span className="text-lg animate-wiggle">🔥</span>
                  <span>{streak.count}</span>
                </div>
              )}
              {appState === APP_STATES.SESSION && (
                <span className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-success bg-success/10 border-2 border-success/30 rounded-full px-3 py-1.5">
                  <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse" />
                  Studying
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-6 flex-1">
        {appState === APP_STATES.DECKS && (
          <DeckSelector key={refreshKey} onSelectDeck={handleSelectDeck} lastSessionStats={lastSessionStats} />
        )}
        {appState === APP_STATES.SESSION && (
          <FlashcardSession onEndSession={handleBackToMenu} onStartNewSession={handleSelectDeck} />
        )}
      </main>

      <footer className="border-t mt-auto bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <p className="text-center text-xs text-muted-foreground">កូនខ្មែរ ត្រូវចេះអក្សរខ្មែរ</p>
        </div>
      </footer>
    </div>
  );
}

export default FlashcardApp;