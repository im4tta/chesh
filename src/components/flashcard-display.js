"use client";

/**
 * FlashcardDisplay - Individual flashcard component with two-step interaction flow
 * Shows the Khmer side first, then reveals the English meaning.
 */

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFlashcardKeyboard } from "@/hooks/use-keyboard";
import { useSpeech } from "@/hooks/use-speech";
import { SESSION_STATES } from "@/lib/session-manager";

export function FlashcardDisplay({
  card,
  sessionState,
  onRevealAnswer,
  onMarkCorrect,
  onMarkIncorrect,
  className = "",
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [canMarkAnswer, setCanMarkAnswer] = useState(false);
  const { speak, supported: speechSupported } = useSpeech();

  useEffect(() => {
    setShowAnswer(sessionState === SESSION_STATES.SHOW_ANSWER);
    setCanMarkAnswer(sessionState === SESSION_STATES.SHOW_ANSWER);
  }, [sessionState]);

  // Re-run the little pop-in animation for a fresh card by keying on card.id
  // in the JSX below, rather than tracking transition state here.

  const handleRevealAnswer = () => {
    if (sessionState === SESSION_STATES.SHOW_CLUE && onRevealAnswer) {
      onRevealAnswer();
    }
  };

  const handleMarkCorrect = () => {
    if (canMarkAnswer && onMarkCorrect) {
      onMarkCorrect(true);
      setCanMarkAnswer(false);
    }
  };

  const handleMarkIncorrect = () => {
    if (canMarkAnswer && onMarkIncorrect) {
      onMarkIncorrect(false);
      setCanMarkAnswer(false);
    }
  };

  useFlashcardKeyboard({
    onRevealAnswer: sessionState === SESSION_STATES.SHOW_CLUE ? handleRevealAnswer : undefined,
    onMarkCorrect: canMarkAnswer ? handleMarkCorrect : undefined,
    onMarkIncorrect: canMarkAnswer ? handleMarkIncorrect : undefined,
    enabled: true,
  });

  if (!card) {
    return (
      <Card className={`w-full max-w-2xl mx-auto ${className}`}>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">No card available</p>
        </CardContent>
      </Card>
    );
  }

  const seriesTone = card.series === 1 ? "sky" : card.series === 2 ? "secondary" : null;

  return (
    <Card
      key={card.id}
      className={`w-full max-w-2xl mx-auto border-2 animate-pop-in ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {showAnswer ? "Meaning" : "What does this say?"}
          </CardTitle>
          <div className="flex items-center gap-2 shrink-0">
            {card.needsVerification && (
              <Badge tone="warning">Pending review</Badge>
            )}
            {seriesTone && card.seriesLabel && (
              <Badge tone={seriesTone}>{card.seriesLabel}</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Khmer side - always visible, this is the "question" */}
        <div className="text-center py-6 relative">
          {card.emoji && <div className="text-5xl mb-4">{card.emoji}</div>}
          <div className="flex items-center justify-center gap-3">
            <p className="khmer-text text-6xl sm:text-7xl font-bold leading-relaxed">
              {card.khmer}
            </p>
            {speechSupported && (
              <button
                onClick={() => speak(card.khmer)}
                aria-label="Play pronunciation"
                className="shrink-0 w-11 h-11 rounded-full bg-sky/10 hover:bg-sky/20 text-sky flex items-center justify-center transition-colors active:scale-95"
              >
                <span className="text-xl">🔊</span>
              </button>
            )}
          </div>
          {card.secondary && (
            <p className="khmer-text text-3xl text-muted-foreground mt-2">{card.secondary}</p>
          )}
        </div>

        {/* English answer, only shown when revealed */}
        {showAnswer && (
          <div className="text-center border-t pt-6 animate-bounce-in">
            <p className="text-3xl font-bold text-success">{card.english}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        {sessionState === SESSION_STATES.SHOW_CLUE && (
          <div className="text-center w-full">
            <Button
              onClick={handleRevealAnswer}
              size="lg"
              className="w-full max-w-md h-14 text-base rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-md"
            >
              Reveal Meaning
              <span className="ml-2 text-xs opacity-75 hidden sm:inline">(Space/Enter)</span>
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Say it out loud, then reveal to check
            </p>
          </div>
        )}

        {canMarkAnswer && (
          <div className="w-full space-y-3">
            <p className="text-center text-sm font-medium">Did you get it right?</p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleMarkCorrect}
                size="lg"
                className="flex-1 max-w-52 h-14 rounded-full bg-success text-success-foreground hover:opacity-90 shadow-md text-base"
              >
                ✓ Correct
                <span className="ml-1 text-xs opacity-75 hidden sm:inline">(→/Y)</span>
              </Button>
              <Button
                onClick={handleMarkIncorrect}
                size="lg"
                className="flex-1 max-w-52 h-14 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 shadow-md text-base"
              >
                ✗ Not yet
                <span className="ml-1 text-xs opacity-75 hidden sm:inline">(←/N)</span>
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-center text-muted-foreground opacity-60">
          <p>Keyboard: Space/Enter to reveal • Arrow keys or Y/N to mark • ESC for menu</p>
        </div>
      </CardFooter>
    </Card>
  );
}
