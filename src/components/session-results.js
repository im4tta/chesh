/**
 * SessionResults - Component showing final session results
 */

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSpaceKey } from "@/hooks/use-keyboard";

const CONFETTI = ["🎉", "⭐", "🎊", "✨", "🏆"];

function getPerformanceLevel(accuracy) {
  if (accuracy >= 90)
    return { level: "ល្អឥតខ្ចោះ! Excellent!", color: "text-success", emoji: "🏆", stars: 3 };
  if (accuracy >= 75)
    return { level: "ល្អណាស់! Great job!", color: "text-success", emoji: "🎉", stars: 3 };
  if (accuracy >= 60)
    return { level: "ល្អ! Good work!", color: "text-primary", emoji: "👍", stars: 2 };
  if (accuracy >= 40)
    return { level: "កំពុងរីកចម្រើន! Getting there!", color: "text-primary", emoji: "📚", stars: 1 };
  return { level: "បន្តព្យាយាម! Keep practicing!", color: "text-secondary", emoji: "💪", stars: 1 };
}

function StarRow({ stars }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`text-3xl transition-transform ${i <= stars ? "animate-bounce-in" : "opacity-25"}`}
          style={{ animationDelay: `${i * 90}ms` }}
        >
          {i <= stars ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

export function SessionResults({
  sessionStats,
  finalSession,
  onStartNewSession,
  onBackToMenu,
  className = "",
}) {
  const {
    deckTitle = "",
    deckTitleKhmer = "",
    totalCards = 10,
    correctAnswers = 0,
    incorrectAnswers = 0,
    accuracy = 0,
    masteredThisSession = 0,
  } = sessionStats || {};

  const performance = getPerformanceLevel(accuracy);

  useSpaceKey(onStartNewSession);

  return (
    <div className={`w-full max-w-2xl mx-auto space-y-6 ${className}`}>
      <Card className="border-2 border-primary/30 overflow-hidden relative animate-pop-in">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around text-2xl opacity-80">
          {CONFETTI.map((c, i) => (
            <span
              key={i}
              className="animate-confetti"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {c}
            </span>
          ))}
        </div>

        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl flex items-center justify-center gap-2 display-text">
            <span>{performance.emoji}</span>
            <span>Session Complete!</span>
          </CardTitle>
          {deckTitle && (
            <p className="text-muted-foreground">
              <span className="khmer-text">{deckTitleKhmer}</span> — {deckTitle}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <StarRow stars={performance.stars} />

          <div className="text-center space-y-1">
            <p className={`text-3xl font-bold ${performance.color}`}>
              {correctAnswers} / {totalCards}
            </p>
            <p className={`text-lg font-semibold khmer-text ${performance.color}`}>
              {performance.level}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-success">{correctAnswers}</div>
              <p className="text-xs font-medium text-success/80">Correct</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-secondary">{incorrectAnswers}</div>
              <p className="text-xs font-medium text-secondary/80">To review</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-sky">{masteredThisSession}</div>
              <p className="text-xs font-medium text-sky/80">Mastered</p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Missed cards come back sooner next time — that's how the practice adapts to you.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button
            onClick={onStartNewSession}
            size="lg"
            className="w-full max-w-md h-14 rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-md text-base"
          >
            Study This Deck Again
            <span className="ml-2 text-xs opacity-75 hidden sm:inline">(Spacebar)</span>
          </Button>

          {onBackToMenu && (
            <Button
              onClick={onBackToMenu}
              variant="outline"
              size="sm"
              className="w-full max-w-md rounded-full"
            >
              Choose Another Deck
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Press Spacebar to study again • ESC for menu
        </p>
      </div>
    </div>
  );
}
