import { useSpaceKey } from "@/hooks/use-keyboard";

const CONFETTI = ["🎉", "⭐", "🎊", "✨", "🏆", "🌈", "🦄"];

function getPerformanceLevel(accuracy) {
  if (accuracy >= 90) return { level: "ល្អឥតខ្ចោះ!", title: "Excellent!", color: "text-success", emoji: "🏆", stars: 3 };
  if (accuracy >= 75) return { level: "ល្អណាស់!", title: "Great job!", color: "text-success", emoji: "🎉", stars: 3 };
  if (accuracy >= 60) return { level: "ល្អ!", title: "Good work!", color: "text-sky", emoji: "👍", stars: 2 };
  if (accuracy >= 40) return { level: "កំពុងរីកចម្រើន!", title: "Getting there!", color: "text-sunny", emoji: "📚", stars: 1 };
  return { level: "បន្តព្យាយាម!", title: "Keep practicing!", color: "text-primary", emoji: "💪", stars: 1 };
}

export function SessionResults({ sessionStats, onStartNewSession, onBackToMenu }) {
  const { deckTitleKhmer = "", totalCards = 10, correctAnswers = 0, incorrectAnswers = 0, accuracy = 0, masteredThisSession = 0 } = sessionStats || {};
  const performance = getPerformanceLevel(accuracy);
  useSpaceKey(onStartNewSession);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-pop-in">
      <div className="bg-card rounded-3xl border-4 border-primary/30 shadow-lg overflow-hidden relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around text-2xl opacity-90">
          {CONFETTI.map((c, i) => (
            <span key={i} className="animate-confetti" style={{ animationDelay: `${i * 100}ms` }}>
              {c}
            </span>
          ))}
        </div>
        <div className="p-8 text-center space-y-5">
          <div className="text-6xl animate-bounce-in">{performance.emoji}</div>
          <div className="space-y-1">
            <p className="text-3xl font-bold display-text text-foreground">
              Session Complete!
            </p>
            <p className="khmer-text text-lg text-muted-foreground">
              {deckTitleKhmer}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`text-4xl transition-all ${i <= performance.stars ? "animate-bounce-in" : "opacity-20"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className={`text-3xl font-bold ${performance.color}`}>
            {correctAnswers} / {totalCards}
          </div>
          <p className={`text-lg font-bold khmer-text ${performance.color}`}>
            {performance.level}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {performance.title}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center p-3 rounded-2xl bg-success/10 border border-success/20">
              <div className="text-2xl font-bold text-success">{correctAnswers}</div>
              <p className="text-xs font-medium text-success/70">Correct</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-primary">{incorrectAnswers}</div>
              <p className="text-xs font-medium text-primary/70">To review</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-ocean/10 border border-ocean/20">
              <div className="text-2xl font-bold text-ocean">{masteredThisSession}</div>
              <p className="text-xs font-medium text-ocean/70">Mastered</p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 space-y-3">
          <button
            onClick={onStartNewSession}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-md"
          >
            🔄 Study Again
          </button>
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="w-full py-3 rounded-2xl border-2 border-muted text-muted-foreground font-bold text-base hover:bg-muted/50 transition-all"
            >
              📚 Choose Another Deck
            </button>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Press Spacebar to study again
      </p>
    </div>
  );
}