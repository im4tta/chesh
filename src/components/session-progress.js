/**
 * SessionProgress - Component showing current progress and score
 */

import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

export function SessionProgress({ progress, sessionStats, className = "" }) {
  if (!progress && !sessionStats) {
    return null;
  }

  const { currentCard = 0, totalCards = 10, score = 0, percentage = 0 } = progress || {};

  const { incorrectAnswers = 0, accuracy = 0, answeredCards = 0, isCompleted = false } =
    sessionStats || {};

  return (
    <Card className={`w-full max-w-2xl mx-auto border-2 ${className}`}>
      <CardContent className="p-5 sm:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>
                {currentCard} of {totalCards}
              </span>
            </div>
            <Progress
              value={percentage}
              className="w-full h-2.5 bg-muted [&>div]:bg-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-success">{score}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-secondary">{incorrectAnswers}</p>
              <p className="text-sm text-muted-foreground">Still learning</p>
            </div>
          </div>

          {answeredCards > 0 && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Accuracy:</span>
                <span
                  className={`text-lg font-semibold ${
                    accuracy >= 80
                      ? "text-success"
                      : accuracy >= 60
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  {accuracy}%
                </span>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="text-center p-3 bg-success/10 rounded-xl border border-success/30">
              <p className="text-success font-semibold">Session Complete! 🎉</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * CompactProgress - Smaller progress indicator for use in headers
 */
export function CompactProgress({ progress, className = "" }) {
  if (!progress) {
    return null;
  }

  const { currentCard = 0, totalCards = 10, score = 0, percentage = 0 } = progress;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2 text-sm">
        <span className="font-semibold">
          {currentCard}/{totalCards}
        </span>
        <span className="text-muted-foreground">•</span>
        <span className="text-success font-medium">{score} ✓</span>
      </div>
      <Progress
        value={percentage}
        className="flex-1 h-1.5 max-w-28 bg-muted [&>div]:bg-primary"
      />
    </div>
  );
}
