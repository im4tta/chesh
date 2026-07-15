"use client";

import { useEffect, useState } from "react";
import { FlashcardDisplay } from "./flashcard-display";
import { SessionProgress } from "./session-progress";
import { SessionResults } from "./session-results";
import { WordList } from "./word-list";
import { LessonContent } from "./lesson-content";
import { useSession } from "@/hooks/use-session";
import { useEscapeKey } from "@/hooks/use-keyboard";

export function FlashcardSession({ onEndSession, onStartNewSession }) {
  const {
    session,
    currentCard,
    progress,
    isSessionActive,
    isCompleted,
    revealAnswer,
    markAnswer,
    getSessionStats,
    createNewSession,
  } = useSession();
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState(null);

  useEffect(() => {
    if (isCompleted && !showResults) {
      const stats = getSessionStats();
      setFinalStats(stats);
      setShowResults(true);
    }
  }, [isCompleted, showResults, getSessionStats]);

  useEscapeKey(() => {
    if (onEndSession) onEndSession();
  });

  const [studyMode, setStudyMode] = useState("random");

  useEffect(() => {
    if (session?.studyMode) setStudyMode(session.studyMode);
  }, [session?.studyMode]);

  const handleModeChange = (newMode) => {
    if (session?.deckId) {
      createNewSession(session.deckId, session.cards?.length ?? Infinity, newMode);
    }
  };

  const handleStartNewSession = () => {
    setShowResults(false);
    setFinalStats(null);
    if (onStartNewSession) onStartNewSession(session?.deckId);
  };

  if (!isSessionActive) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="text-muted-foreground text-lg">No active session</p>
        <button
          onClick={onEndSession}
          className="py-3 px-8 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          📚 Choose a Deck
        </button>
      </div>
    );
  }

  if (showResults && finalStats) {
    return (
      <SessionResults
        sessionStats={finalStats}
        onStartNewSession={handleStartNewSession}
        onBackToMenu={onEndSession}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-2">
        {session?.deckTitleKhmer && (
          <span className="khmer-text text-lg font-bold truncate display-text">
            {session.deckTitleKhmer}
          </span>
        )}
        <button
          onClick={onEndSession}
          className="shrink-0 py-2 px-4 rounded-full border-2 border-muted text-muted-foreground font-bold text-sm hover:bg-muted/50 transition-all active:scale-95"
        >
          Menu
        </button>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-bold text-muted-foreground">Mode:</span>
        <div className="flex rounded-xl border-2 border-muted overflow-hidden">
          <button
            onClick={() => handleModeChange("sequential")}
            className={`px-3 py-1.5 text-xs font-bold transition-all ${studyMode === "sequential" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"}`}
          >
            📋 Sequential
          </button>
          <button
            onClick={() => handleModeChange("random")}
            className={`px-3 py-1.5 text-xs font-bold transition-all ${studyMode === "random" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted/50"}`}
          >
            🔀 Random
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {session?.lessonContent && (
          <div className="w-full lg:w-72 shrink-0">
            <LessonContent sections={session.lessonContent} titleKhmer={session.deckTitleKhmer} />
          </div>
        )}
        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-center">
            <FlashcardDisplay
              card={currentCard}
              sessionState={session?.sessionState}
              onRevealAnswer={revealAnswer}
              onMarkCorrect={() => markAnswer(true)}
              onMarkIncorrect={() => markAnswer(false)}
              deckId={session?.deckId}
            />
          </div>

          {currentCard && (
            <SessionProgress progress={progress} sessionStats={getSessionStats()} />
          )}
        </div>

        <div className="w-full lg:w-64 shrink-0">
          <WordList session={session} currentCard={currentCard} deckId={session?.deckId} />
        </div>
      </div>
    </div>
  );
}