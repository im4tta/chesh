"use client";

import { useEffect, useState } from "react";
import { getCardImageUrls } from "@/lib/utils";
import { useFlashcardKeyboard } from "@/hooks/use-keyboard";
import { useSpeech } from "@/hooks/use-speech";
import { SESSION_STATES } from "@/lib/session-manager";
import { masteryStore, onMasteryChange, MAX_BOX } from "@/lib/mastery-store";

// Small "how well do you know this card" indicator — reads straight from
// the saved mastery record so a tap on "Yes!" shows up here immediately,
// instead of the only feedback being a deck-wide badge the learner isn't
// even looking at during a session.
function CardProgressDots({ deckId, cardId }) {
  const [box, setBox] = useState(0);

  useEffect(() => {
    const read = () => setBox(masteryStore.getCardRecord(deckId, cardId)?.box ?? 0);
    read();
    const unsub = onMasteryChange(read);
    return unsub;
  }, [deckId, cardId]);

  if (!deckId || !cardId) return null;

  return (
    <div className="flex items-center justify-center gap-1" aria-label={`Progress: box ${box} of ${MAX_BOX}`}>
      {Array.from({ length: MAX_BOX }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-all ${
            i < box ? "bg-success scale-110" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-pop-in cursor-zoom-out"
      />
    </div>
  );
}

function LocalImage({ deckId, cardId, alt }) {
  const candidates = getCardImageUrls(deckId, cardId, alt);
  const [index, setIndex] = useState(0);
  const [found, setFound] = useState(null);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setIndex(0);
    setFound(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, cardId]);

  useEffect(() => {
    if (index >= candidates.length) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setFound(candidates[index]);
    };
    img.onerror = () => {
      if (!cancelled) setIndex((i) => i + 1);
    };
    img.src = candidates[index];
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, deckId, cardId]);

  if (!found) return null;
  return (
    <>
      <button
        onClick={() => setLightbox(true)}
        className="mx-auto block cursor-zoom-in focus:outline-none"
        aria-label={`View ${alt} full size`}
      >
        <img
          src={found}
          alt={alt}
          className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl border-4 border-white shadow-lg animate-bounce-in hover:scale-105 hover:shadow-xl transition-all"
        />
      </button>
      {lightbox && (
        <ImageLightbox src={found} alt={alt} onClose={() => setLightbox(false)} />
      )}
    </>
  );
}

const EDGE_THRESHOLD = 60;

const GLOW = {
  top: { shadow: "0 -12px 40px -8px hsl(var(--primary) / 0.4)", border: "border-primary/60" },
  bottom: { shadow: "0 12px 40px -8px hsl(var(--success) / 0.4)", border: "border-success/60" },
  left: { shadow: "-12px 0 40px -8px hsl(var(--ocean) / 0.4)", border: "border-ocean/60" },
  right: { shadow: "12px 0 40px -8px hsl(var(--candy) / 0.4)", border: "border-candy/60" },
};

function useEdgeGlow() {
  const [edge, setEdge] = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dist = {
      top: y,
      bottom: rect.height - y,
      left: x,
      right: rect.width - x,
    };
    const min = Math.min(...Object.values(dist));
    setEdge(min <= EDGE_THRESHOLD ? Object.keys(dist).find((k) => dist[k] === min) : null);
  };

  const handleMouseLeave = () => setEdge(null);

  return { edge, handleMouseMove, handleMouseLeave };
}

export function FlashcardDisplay({
  card,
  sessionState,
  onRevealAnswer,
  onMarkCorrect,
  onMarkIncorrect,
  deckId,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [canMarkAnswer, setCanMarkAnswer] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const { edge, handleMouseMove, handleMouseLeave } = useEdgeGlow();
  const { speak, supported: speechSupported } = useSpeech();

  useEffect(() => {
    setShowAnswer(sessionState === SESSION_STATES.SHOW_ANSWER);
    setCanMarkAnswer(sessionState === SESSION_STATES.SHOW_ANSWER);
  }, [sessionState]);

  const handleRevealAnswer = () => {
    if (sessionState === SESSION_STATES.SHOW_CLUE && onRevealAnswer) onRevealAnswer();
  };

  const handleCorrect = () => {
    if (canMarkAnswer && onMarkCorrect) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 600);
      onMarkCorrect(true);
      setCanMarkAnswer(false);
    }
  };

  const handleIncorrect = () => {
    if (canMarkAnswer && onMarkIncorrect) {
      onMarkIncorrect(false);
      setCanMarkAnswer(false);
    }
  };

  useFlashcardKeyboard({
    onRevealAnswer: sessionState === SESSION_STATES.SHOW_CLUE ? handleRevealAnswer : undefined,
    onMarkCorrect: canMarkAnswer ? handleCorrect : undefined,
    onMarkIncorrect: canMarkAnswer ? handleIncorrect : undefined,
    enabled: true,
  });

  if (!card) {
    return (
      <div className="w-full max-w-lg mx-auto bg-card rounded-3xl border-4 border-muted p-8 text-center">
        <p className="text-lg text-muted-foreground">No card available</p>
      </div>
    );
  }

  const glow = edge ? GLOW[edge] : null;

  return (
    <div
      key={card.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full max-w-lg mx-auto bg-card rounded-3xl border-4 animate-pop-in overflow-hidden transition-shadow duration-150 ${celebrate ? "animate-celebrate" : ""} ${glow ? glow.border : !showAnswer ? "border-primary/30" : "border-success/30"} ${glow ? "shadow-none" : "shadow-lg"}`}
      style={glow ? { boxShadow: glow.shadow } : undefined}
    >
      <div className="p-6 sm:p-8">
        <div className="text-center space-y-4">
          <LocalImage deckId={deckId} cardId={card.id} alt={card.english} />
          {card.emoji && !showAnswer && (
            <span className="inline-block text-4xl sm:text-5xl animate-float leading-none">{card.emoji}</span>
          )}
          <div className="flex items-center justify-center gap-3">
            <p className="khmer-text text-5xl sm:text-6xl font-bold leading-relaxed text-foreground">
              {card.khmer}
            </p>
            {speechSupported && (
              <button
                onClick={() => speak(card.khmer)}
                aria-label="Listen"
                className="shrink-0 w-12 h-12 rounded-full bg-ocean/10 hover:bg-ocean/20 text-ocean flex items-center justify-center transition-all active:scale-90 text-xl"
              >
                🔊
              </button>
            )}
          </div>
          {card.secondary && (
            <p className="khmer-text text-2xl text-muted-foreground">{card.secondary}</p>
          )}
          <CardProgressDots deckId={deckId} cardId={card.id} />
        </div>

        {showAnswer && (
          <div className="text-center mt-6 pt-6 border-t-2 border-dashed border-muted animate-bounce-in">
            <p className="text-3xl font-bold text-success">{card.english}</p>
          </div>
        )}

        {card.needsVerification && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-700">
              Pending review
            </span>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8 space-y-3">
        {sessionState === SESSION_STATES.SHOW_CLUE && (
          <div className="text-center">
            <button
              onClick={handleRevealAnswer}
              className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-md animate-pulse-glow"
            >
              Show Answer! ✨
            </button>
            <p className="text-xs text-muted-foreground mt-2">Say it out loud first!</p>
          </div>
        )}

        {canMarkAnswer && (
          <div className="space-y-3">
            <p className="text-center text-sm font-bold text-muted-foreground">Did you get it right?</p>
            <div className="flex gap-3">
              <button
                onClick={handleCorrect}
                className="flex-1 py-4 rounded-2xl bg-success text-success-foreground font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                ✅ Yes!
              </button>
              <button
                onClick={handleIncorrect}
                className="flex-1 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}