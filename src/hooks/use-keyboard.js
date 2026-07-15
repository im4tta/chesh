"use client";

/**
 * useKeyboard - Custom hook for keyboard navigation and shortcuts
 */

import { useEffect, useCallback } from "react";

export function useKeyboard(handlers = {}, options = {}) {
  const {
    enabled = true,
    preventDefault = true,
    stopPropagation = false,
    target = null,
  } = options;

  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      const key = event.key.toLowerCase();
      const keyCode = event.keyCode || event.which;

      const handler = handlers[key] || handlers[keyCode];

      if (handler && typeof handler === "function") {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }

        handler(event);
      }
    },
    [handlers, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (!enabled) return;

    const targetElement = target || document;

    targetElement.addEventListener("keydown", handleKeyDown);

    return () => {
      targetElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, enabled, target]);

  return { handleKeyDown };
}

/**
 * useFlashcardKeyboard - Specialized keyboard hook for flashcard interactions
 */
export function useFlashcardKeyboard({
  onRevealAnswer,
  onMarkCorrect,
  onMarkIncorrect,
  onStartNewSession,
  onEscape,
  enabled = true,
}) {
  const keyHandlers = {
    " ": onRevealAnswer,
    enter: onRevealAnswer,

    arrowright: onMarkCorrect,
    y: onMarkCorrect,
    1: onMarkCorrect,

    arrowleft: onMarkIncorrect,
    n: onMarkIncorrect,
    0: onMarkIncorrect,

    escape: onEscape,

    s: onStartNewSession,
  };

  const filteredHandlers = Object.fromEntries(
    Object.entries(keyHandlers).filter(([_, handler]) => handler !== undefined)
  );

  return useKeyboard(filteredHandlers, {
    enabled,
    preventDefault: true,
    stopPropagation: false,
  });
}

/**
 * useEscapeKey - Hook for escape key handling
 */
export function useEscapeKey(handler, enabled = true) {
  return useKeyboard(
    { escape: handler },
    {
      enabled,
      preventDefault: true,
    }
  );
}

/**
 * useSpaceKey - Hook for spacebar handling
 */
export function useSpaceKey(handler, enabled = true) {
  return useKeyboard(
    { " ": handler },
    {
      enabled,
      preventDefault: true,
    }
  );
}
