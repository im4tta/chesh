/**
 * SessionManager - Manages flashcard study sessions
 * Handles session creation, state management, and persistence.
 *
 * Unlike a single-topic flashcard app, every session here belongs to a
 * `deckId` (see src/data/deck-registry.js) so the same session machinery
 * powers the consonants deck, the numbers deck, the vocabulary decks, etc.
 */

import { getAllCards, getDeckMeta } from "@/data/deck-registry.js";
import { storageAdapter } from "./storage-adapter.js";
import { masteryStore } from "./mastery-store.js";

export const SESSION_STATES = {
  SHOW_CLUE: "SHOW_CLUE",
  SHOW_ANSWER: "SHOW_ANSWER",
  COMPLETED: "COMPLETED",
};

// A missed card gets reinserted this many cards later so it comes back
// around within the same session ("keep going until you get it"),
// capped so one stubborn card can't loop forever.
const REQUEUE_OFFSET = 4;
const MAX_REQUEUES_PER_CARD = 2;

export class SessionManager {
  constructor() {
    this.currentSession = null;
    this.sessionKey = "khmer_flashcard_session";
  }

  /**
   * Create a new study session for one deck, built by the mastery store
   * into a smart queue: cards due for review first, then a few new
   * cards, then everything else — not a plain shuffle.
   * @param {string} deckId - Which deck to study (see deck-registry.js)
   * @param {number} cardCount - Number of cards for the session. Pass
   *   Infinity to study the whole deck.
   * @returns {Object} New session object
   */
  createSession(deckId, cardCount = Infinity) {
    const sessionId = this.generateSessionId();
    const allCards = getAllCards(deckId);
    const cards = masteryStore.buildStudyQueue(deckId, allCards, cardCount);
    const deckMeta = getDeckMeta(deckId);

    this.currentSession = {
      id: sessionId,
      deckId,
      deckTitle: deckMeta ? deckMeta.titleEnglish : deckId,
      deckTitleKhmer: deckMeta ? deckMeta.title : "",
      cards,
      currentCardIndex: 0,
      responses: [],
      requeueCounts: {},
      masteredThisSession: [],
      score: 0,
      sessionState: SESSION_STATES.SHOW_CLUE,
      startTime: new Date().toISOString(),
      endTime: null,
    };

    this.saveSession();
    return this.currentSession;
  }

  loadSession() {
    const sessionData = storageAdapter.getItem(this.sessionKey);

    if (sessionData && this.validateSession(sessionData)) {
      this.currentSession = sessionData;
      return this.currentSession;
    }

    return null;
  }

  saveSession() {
    if (!this.currentSession) {
      return false;
    }

    return storageAdapter.setItem(this.sessionKey, this.currentSession);
  }

  getCurrentSession() {
    return this.currentSession;
  }

  getCurrentCard() {
    if (
      !this.currentSession ||
      this.currentSession.currentCardIndex >= this.currentSession.cards.length
    ) {
      return null;
    }

    return this.currentSession.cards[this.currentSession.currentCardIndex];
  }

  revealAnswer() {
    if (
      !this.currentSession ||
      this.currentSession.sessionState !== SESSION_STATES.SHOW_CLUE
    ) {
      return false;
    }

    this.currentSession.sessionState = SESSION_STATES.SHOW_ANSWER;
    this.saveSession();
    return true;
  }

  markAnswer(isCorrect) {
    if (
      !this.currentSession ||
      this.currentSession.sessionState !== SESSION_STATES.SHOW_ANSWER
    ) {
      return false;
    }

    const currentCard = this.getCurrentCard();
    if (!currentCard) {
      return false;
    }

    const response = {
      cardId: currentCard.id,
      isCorrect,
      responseTime: new Date().toISOString(),
    };

    this.currentSession.responses.push(response);
    masteryStore.recordAnswer(this.currentSession.deckId, currentCard.id, isCorrect);

    if (isCorrect) {
      this.currentSession.score++;
      if (!this.currentSession.masteredThisSession.includes(currentCard.id)) {
        this.currentSession.masteredThisSession.push(currentCard.id);
      }
    } else {
      // Give the child another shot at this card later in the session,
      // instead of only recording the miss and moving on for good.
      const requeues = this.currentSession.requeueCounts[currentCard.id] || 0;
      if (requeues < MAX_REQUEUES_PER_CARD) {
        this.currentSession.requeueCounts[currentCard.id] = requeues + 1;
        const insertAt = Math.min(
          this.currentSession.currentCardIndex + 1 + REQUEUE_OFFSET,
          this.currentSession.cards.length
        );
        this.currentSession.cards.splice(insertAt, 0, currentCard);
      }
      this.currentSession.masteredThisSession = this.currentSession.masteredThisSession.filter(
        (id) => id !== currentCard.id
      );
    }

    this.currentSession.currentCardIndex++;

    if (this.currentSession.currentCardIndex >= this.currentSession.cards.length) {
      this.currentSession.sessionState = SESSION_STATES.COMPLETED;
      this.currentSession.endTime = new Date().toISOString();
      masteryStore.recordSessionComplete();
    } else {
      this.currentSession.sessionState = SESSION_STATES.SHOW_CLUE;
    }

    this.saveSession();
    return true;
  }

  resetToClue() {
    if (
      !this.currentSession ||
      this.currentSession.sessionState === SESSION_STATES.COMPLETED
    ) {
      return false;
    }

    this.currentSession.sessionState = SESSION_STATES.SHOW_CLUE;
    this.saveSession();
    return true;
  }

  completeSession() {
    if (!this.currentSession) {
      return null;
    }

    const finalSession = { ...this.currentSession };
    if (finalSession.sessionState !== SESSION_STATES.COMPLETED) {
      finalSession.sessionState = SESSION_STATES.COMPLETED;
      finalSession.endTime = new Date().toISOString();
    }

    this.clearSession();
    return finalSession;
  }

  clearSession() {
    this.currentSession = null;
    return storageAdapter.removeItem(this.sessionKey);
  }

  getProgress() {
    if (!this.currentSession) {
      return null;
    }

    return {
      currentCard: this.currentSession.currentCardIndex + 1,
      totalCards: this.currentSession.cards.length,
      score: this.currentSession.score,
      percentage: Math.round(
        (this.currentSession.currentCardIndex / this.currentSession.cards.length) * 100
      ),
    };
  }

  canTransitionTo(targetState) {
    if (!this.currentSession) {
      return false;
    }

    const current = this.currentSession.sessionState;

    switch (targetState) {
      case SESSION_STATES.SHOW_ANSWER:
        return current === SESSION_STATES.SHOW_CLUE;
      case SESSION_STATES.SHOW_CLUE:
        return (
          current === SESSION_STATES.SHOW_ANSWER &&
          this.currentSession.currentCardIndex < this.currentSession.cards.length
        );
      case SESSION_STATES.COMPLETED:
        return (
          current === SESSION_STATES.SHOW_ANSWER &&
          this.currentSession.currentCardIndex >= this.currentSession.cards.length - 1
        );
      default:
        return false;
    }
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  validateSession(sessionData) {
    if (!sessionData || typeof sessionData !== "object") {
      return false;
    }

    const required = [
      "id",
      "deckId",
      "cards",
      "currentCardIndex",
      "responses",
      "score",
      "sessionState",
      "startTime",
    ];
    return required.every((field) => sessionData.hasOwnProperty(field));
  }

  getSessionStats() {
    if (!this.currentSession) {
      return null;
    }

    const responses = this.currentSession.responses;
    const correctCount = responses.filter((r) => r.isCorrect).length;
    const distinctCardIds = new Set(this.currentSession.cards.map((c) => c.id));

    return {
      deckId: this.currentSession.deckId,
      deckTitle: this.currentSession.deckTitle,
      deckTitleKhmer: this.currentSession.deckTitleKhmer,
      totalCards: this.currentSession.cards.length,
      distinctCards: distinctCardIds.size,
      answeredCards: responses.length,
      correctAnswers: correctCount,
      incorrectAnswers: responses.length - correctCount,
      masteredThisSession: this.currentSession.masteredThisSession.length,
      accuracy:
        responses.length > 0 ? Math.round((correctCount / responses.length) * 100) : 0,
      isCompleted: this.currentSession.sessionState === SESSION_STATES.COMPLETED,
    };
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
