/**
 * MasteryStore — persistent, cross-session learning progress.
 *
 * This is what turns the app from "shuffle and show cards" into an actual
 * spaced-repetition learning system. Every card lives in one of 5 Leitner
 * boxes (0 = new / needs work, 4 = mastered). A correct answer promotes a
 * card to the next box and schedules it further into the future.
 *
 * Tuned for kids rather than adult Anki-style drilling:
 *  - A wrong answer only drops a card ONE box, not all the way back to 0.
 *    A single slip shouldn't erase a week of real progress — that reads
 *    as punishment to a child, not feedback.
 *  - Mastery only needs 4 correct answers in a row (not 5), and the
 *    interval ramp is shorter, so "mastered" is a reachable payoff
 *    instead of a multi-week grind.
 *
 * Session queues (see session-manager.js) are built by prioritizing
 * whatever is due, mixed with a few new cards at a time — this is the
 * same "little and often, review what you're forgetting" principle used
 * in most literacy drilling.
 *
 * Storage is localStorage (survives closing the browser), separate from
 * storage-adapter.js which handles the transient in-progress session.
 */

const STORAGE_KEY = "khmer_flashcard_mastery_v1";
export const MAX_BOX = 4;

// Days until a card in a given box is due again. Shorter ramp than a
// typical adult SRS schedule — this app is used in bursts, not daily
// drilling, so a card shouldn't disappear from rotation for over a week.
const BOX_INTERVAL_DAYS = [0, 1, 2, 5, 10];

function isBrowser() {
  return typeof window !== "undefined";
}

function nowMs() {
  return Date.now();
}

function daysToMs(days) {
  return days * 24 * 60 * 60 * 1000;
}

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function loadAll() {
  if (!isBrowser()) return { decks: {}, streak: { lastStudyDate: null, count: 0 } };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { decks: {}, streak: { lastStudyDate: null, count: 0 } };
    const data = safeParse(raw, {});
    return {
      decks: data.decks || {},
      streak: data.streak || { lastStudyDate: null, count: 0 },
    };
  } catch {
    return { decks: {}, streak: { lastStudyDate: null, count: 0 } };
  }
}

const listeners = new Set();

function notify() {
  try { window.dispatchEvent(new CustomEvent("mastery-changed")); } catch {}
  listeners.forEach((fn) => { try { fn(); } catch {} });
}

export function onMasteryChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function saveAll(data) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    notify();
    return true;
  } catch {
    return false;
  }
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD, local-ish enough for a streak
}

export const masteryStore = {
  /**
   * Record the outcome of answering one card. Updates its Leitner box
   * and next-due timestamp.
   */
  recordAnswer(deckId, cardId, isCorrect) {
    const all = loadAll();
    if (!all.decks[deckId]) all.decks[deckId] = {};
    const existing = all.decks[deckId][cardId] || {
      box: 0,
      seenCount: 0,
      correctCount: 0,
      nextDue: 0,
    };

    // A miss costs one box, not everything — one slip shouldn't undo a
    // week of real progress. It still comes back due almost immediately
    // (box 0-2 intervals are 0-2 days) so the review cadence is barely
    // affected, but the child's earned progress isn't erased.
    const box = isCorrect
      ? Math.min(existing.box + 1, MAX_BOX)
      : Math.max(existing.box - 1, 0);

    all.decks[deckId][cardId] = {
      box,
      seenCount: existing.seenCount + 1,
      correctCount: existing.correctCount + (isCorrect ? 1 : 0),
      nextDue: nowMs() + daysToMs(BOX_INTERVAL_DAYS[box]),
      lastSeen: nowMs(),
    };

    saveAll(all);
    return all.decks[deckId][cardId];
  },

  getCardRecord(deckId, cardId) {
    const all = loadAll();
    return all.decks[deckId]?.[cardId] || null;
  },

  /**
   * Build a prioritized, shuffled queue of cards for a study session:
   * due-for-review cards first, then never-seen cards, then everything
   * else — each tier shuffled internally so it doesn't feel robotic.
   * @param {string} deckId
   * @param {Array} allCards - full card list for the deck
   * @param {number} sessionSize - Infinity for the whole deck
   */
  buildStudyQueue(deckId, allCards, sessionSize = Infinity, mode = "random") {
    const all = loadAll();
    const records = all.decks[deckId] || {};
    const now = nowMs();

    if (mode === "sequential") {
      const queue = [...allCards];
      if (!Number.isFinite(sessionSize)) return queue;
      return queue.slice(0, Math.min(sessionSize, queue.length));
    }

    const due = [];
    const fresh = [];
    const notDue = [];

    for (const card of allCards) {
      const rec = records[card.id];
      if (!rec) {
        fresh.push(card);
      } else if (rec.nextDue <= now) {
        due.push(card);
      } else {
        notDue.push(card);
      }
    }

    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    due.sort((a, b) => (records[a.id]?.nextDue ?? 0) - (records[b.id]?.nextDue ?? 0));

    const queue = [...due, ...shuffle(fresh), ...shuffle(notDue)];
    if (!Number.isFinite(sessionSize)) return queue;
    return queue.slice(0, Math.min(sessionSize, queue.length));
  },

  /**
   * Aggregate stats for a deck, used for the mastery badge on the deck
   * picker (e.g. "18/33 mastered").
   *
   * `masteryPercent` only counts cards that hit MAX_BOX, which needs 5
   * correct answers in a row — by design, so a couple of correct taps
   * doesn't look "learned" too soon. But that means it's a bad signal
   * for "is anything being saved at all", especially right after a
   * short study session. `learningPercent` is the fix: a weighted
   * percent (box / MAX_BOX, averaged across every card ever seen) that
   * moves visibly after every single answer, so progress is never
   * invisible even before a card is fully mastered.
   */
  getDeckStats(deckId, totalCards) {
    const all = loadAll();
    const records = all.decks[deckId] || {};
    let mastered = 0;
    let inProgress = 0;
    let seen = 0;
    let boxSum = 0;

    Object.values(records).forEach((rec) => {
      seen++;
      boxSum += rec.box;
      if (rec.box >= MAX_BOX) mastered++;
      else if (rec.box > 0) inProgress++;
    });

    return {
      totalCards,
      seenCount: seen,
      masteredCount: mastered,
      inProgressCount: inProgress,
      newCount: Math.max(totalCards - seen, 0),
      masteryPercent: totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0,
      // Weighted across the WHOLE deck (unseen cards count as 0 box),
      // so this number starts near 0 and creeps up with every answer
      // instead of jumping only when a card hits full mastery.
      learningPercent:
        totalCards > 0 ? Math.round((boxSum / (MAX_BOX * totalCards)) * 100) : 0,
    };
  },

  resetDeck(deckId) {
    const all = loadAll();
    delete all.decks[deckId];
    return saveAll(all);
  },

  /**
   * Call once when a session completes. Bumps the daily streak counter,
   * counting consecutive calendar days (not sessions) with at least one
   * finished session.
   */
  recordSessionComplete() {
    const all = loadAll();
    const today = todayKey();
    const last = all.streak.lastStudyDate;

    if (last === today) {
      // Already studied today, streak unchanged.
    } else if (last === todayKey(new Date(Date.now() - daysToMs(1)))) {
      all.streak.count = (all.streak.count || 0) + 1;
      all.streak.lastStudyDate = today;
    } else {
      all.streak.count = 1;
      all.streak.lastStudyDate = today;
    }

    saveAll(all);
    return all.streak;
  },

  getStreak() {
    return loadAll().streak;
  },
};

export default masteryStore;
