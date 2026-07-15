export function WordList({ session, currentCard, onJumpToCard }) {
  const answered = new Map(
    session.responses.map((r) => [r.cardId, r.isCorrect])
  );
  const currentIndex = session.currentCardIndex;
  const total = session.cards.length;
  const doneCount = [...answered.values()].length;

  return (
    <div className="w-full bg-card rounded-3xl border-4 border-muted/60 p-3 flex flex-col max-h-[60vh] lg:max-h-[32rem]">
      <h3 className="text-sm font-bold text-muted-foreground mb-2 flex items-center gap-2 shrink-0">
        <span>📋</span> All Words
        <span className="ml-auto font-normal">{doneCount}/{total}</span>
      </h3>
      <div className="flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin">
        {session.cards.map((card, i) => {
          const isCurrent = i === currentIndex;
          const result = answered.get(card.id);
          let status;
          if (isCurrent) status = "current";
          else if (result === true) status = "correct";
          else if (result === false) status = "incorrect";
          else status = "pending";

          const statusColors = {
            current: "border-primary bg-primary/5",
            correct: "border-success bg-success/10",
            incorrect: "border-primary bg-primary/10",
            pending: "border-muted bg-muted/30",
          };

          return (
            <button
              key={card.id}
              onClick={() => onJumpToCard?.(i)}
              className={`w-full flex items-center gap-2 rounded-xl border-2 px-2.5 py-1.5 transition-all hover:scale-[1.01] ${statusColors[status]} ${isCurrent ? "ring-2 ring-primary shadow-sm" : ""}`}
            >
              <span className="text-lg shrink-0">{card.emoji}</span>
              <div className="min-w-0 text-left leading-tight">
                <p className="khmer-text text-sm font-bold leading-tight truncate">
                  {card.khmer}
                </p>
                <p className="text-[11px] text-muted-foreground truncate leading-tight">
                  {card.english}
                </p>
              </div>
              <span className="ml-auto shrink-0 text-sm">
                {isCurrent ? "👈" : result === true ? "✅" : result === false ? "🔄" : "⭕"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}