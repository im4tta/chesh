export function SessionProgress({ progress, sessionStats }) {
  if (!progress) return null;
  const { currentCard = 0, totalCards = 10, score = 0, percentage = 0 } = progress || {};
  const { incorrectAnswers = 0, isCompleted = false } = sessionStats || {};

  return (
    <div className="w-full max-w-lg mx-auto space-y-3 animate-pop-in">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold text-muted-foreground">
          Card {currentCard} of {totalCards}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-success font-bold">✅ {score}</span>
          {incorrectAnswers > 0 && (
            <span className="text-primary font-bold">🔄 {incorrectAnswers}</span>
          )}
        </div>
      </div>

      <div className="relative h-4 bg-muted rounded-full overflow-hidden border border-muted-foreground/20">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-coral rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
        </div>
      </div>

      {isCompleted && (
        <div className="text-center py-3 bg-success/10 rounded-2xl border-2 border-success/30 animate-bounce-in">
          <p className="text-success font-bold text-lg">🎉 Session Complete!</p>
        </div>
      )}

      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        {[...Array(totalCards)].map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full border transition-all ${
              i < currentCard - 1
                ? "bg-success border-success"
                : i === currentCard - 1
                  ? "bg-primary border-primary animate-pulse"
                  : "bg-muted border-muted-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function CompactProgress({ progress }) {
  if (!progress) return null;
  const { currentCard = 0, totalCards = 10, score = 0 } = progress;
  return (
    <div className="flex items-center gap-2 text-sm font-bold">
      <span>{currentCard}/{totalCards}</span>
      <span className="text-success">✅{score}</span>
    </div>
  );
}