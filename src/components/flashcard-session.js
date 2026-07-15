"use client";

/**
 * FlashcardSession - Main session component that orchestrates the study flow
 */

import { useEffect, useState } from "react";
import { FlashcardDisplay } from "./flashcard-display";
import { SessionProgress, CompactProgress } from "./session-progress";
import { SessionResults } from "./session-results";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { useEscapeKey } from "@/hooks/use-keyboard";

export function FlashcardSession({ onEndSession, onStartNewSession, className = "" }) {
  const {
    session,
    currentCard,
    progress,
    isSessionActive,
    isCompleted,
    revealAnswer,
    markAnswer,
    getSessionStats,
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
    if (onEndSession) {
      onEndSession();
    }
  });

  const handleRevealAnswer = () => {
    revealAnswer();
  };

  const handleMarkAnswer = (isCorrect) => {
    markAnswer(isCorrect);
  };

  const handleStartNewSession = () => {
    setShowResults(false);
    setFinalStats(null);
    if (onStartNewSession) {
      onStartNewSession(session?.deckId);
    }
  };

  const handleBackToMenu = () => {
    if (onEndSession) {
      onEndSession();
    }
  };

  if (!isSessionActive) {
    return (
      <div className={`text-center space-y-4 ${className}`}>
        <p className="text-muted-foreground">No active session</p>
        <Button onClick={onEndSession} className="rounded-full">
          Choose a Deck
        </Button>
      </div>
    );
  }

  if (showResults && finalStats) {
    return (
      <SessionResults
        sessionStats={finalStats}
        finalSession={session}
        onStartNewSession={handleStartNewSession}
        onBackToMenu={handleBackToMenu}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {session?.deckTitleKhmer && (
            <span className="khmer-text text-lg font-semibold truncate">
              {session.deckTitleKhmer}
            </span>
          )}
          <CompactProgress progress={progress} />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToMenu}
          className="rounded-full shrink-0"
        >
          Menu (ESC)
        </Button>
      </div>

      <SessionProgress progress={progress} sessionStats={getSessionStats()} />

      {currentCard ? (
        <FlashcardDisplay
          card={currentCard}
          sessionState={session?.sessionState}
          onRevealAnswer={handleRevealAnswer}
          onMarkCorrect={() => handleMarkAnswer(true)}
          onMarkIncorrect={() => handleMarkAnswer(false)}
        />
      ) : (
        <div className="text-center p-8">
          <p className="text-muted-foreground">Loading next card…</p>
        </div>
      )}

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Your progress is saved automatically • Press ESC anytime to return to menu</p>
      </div>
    </div>
  );
}
