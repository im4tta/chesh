"use client";

/**
 * useSpeech - thin wrapper around the browser's SpeechSynthesis API.
 *
 * Khmer voice support varies a lot by device/OS, so this is treated as a
 * "bonus" feature: if the browser can't speak, the button quietly does
 * nothing rather than erroring out. We don't gate the button's presence
 * on voice detection because voice lists load asynchronously and are
 * unreliable on first paint — better to always offer it and no-op.
 */

import { useCallback, useState } from "react";

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(
    () => typeof window !== "undefined" && "speechSynthesis" in window
  );

  const speak = useCallback(
    (text, lang = "km-KH") => {
      if (!supported || !text) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.85;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setSpeaking(false);
      }
    },
    [supported]
  );

  return { speak, speaking, supported };
}
