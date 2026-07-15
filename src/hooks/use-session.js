"use client";

/**
 * useSession - Custom hook for managing flashcard session state
 */

import { useState, useEffect, useCallback } from "react";
import { sessionManager, SESSION_STATES } from "@/lib/session-manager";

export function useSession() {
  const [session, setSession] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateSessionState = useCallback(() => {
    try {
      const currentSession = sessionManager.getCurrentSession();
      const card = sessionManager.getCurrentCard();
      const progressInfo = sessionManager.getProgress();

      setSession(currentSession);
      setCurrentCard(card);
      setProgress(progressInfo);
      setError(null);
    } catch (err) {
      console.error("Error updating session state:", err);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    sessionManager.loadSession();
    updateSessionState();
    setLoading(false);
  }, [updateSessionState]);

  /**
   * Create a new study session for a given deck.
   * @param {string} deckId
   * @param {number} cardCount - Infinity to study the whole deck
   */
  const createNewSession = useCallback(
    (deckId, cardCount = Infinity) => {
      try {
        setLoading(true);
        sessionManager.createSession(deckId, cardCount);
        updateSessionState();
        setLoading(false);
        return true;
      } catch (err) {
        console.error("Error creating session:", err);
        setError(err.message);
        setLoading(false);
        return false;
      }
    },
    [updateSessionState]
  );

  const revealAnswer = useCallback(() => {
    try {
      const success = sessionManager.revealAnswer();
      if (success) {
        updateSessionState();
      }
      return success;
    } catch (err) {
      console.error("Error revealing answer:", err);
      setError(err.message);
      return false;
    }
  }, [updateSessionState]);

  const markAnswer = useCallback(
    (isCorrect) => {
      try {
        const success = sessionManager.markAnswer(isCorrect);
        if (success) {
          updateSessionState();
        }
        return success;
      } catch (err) {
        console.error("Error marking answer:", err);
        setError(err.message);
        return false;
      }
    },
    [updateSessionState]
  );

  const clearSession = useCallback(() => {
    try {
      sessionManager.clearSession();
      updateSessionState();
      return true;
    } catch (err) {
      console.error("Error clearing session:", err);
      setError(err.message);
      return false;
    }
  }, [updateSessionState]);

  const getSessionStats = useCallback(() => {
    return sessionManager.getSessionStats();
  }, []);

  return {
    session,
    currentCard,
    progress,
    loading,
    error,

    isSessionActive: session !== null,
    isCompleted: session?.sessionState === SESSION_STATES.COMPLETED,
    isShowingClue: session?.sessionState === SESSION_STATES.SHOW_CLUE,
    isShowingAnswer: session?.sessionState === SESSION_STATES.SHOW_ANSWER,

    createNewSession,
    revealAnswer,
    markAnswer,
    clearSession,

    getSessionStats,

    SESSION_STATES,
  };
}
