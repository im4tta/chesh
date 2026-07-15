/**
 * Deck Registry — central place that lists every available flashcard deck.
 *
 * To add a new deck:
 *   1. Create src/data/decks/your-deck.js exporting `deckMeta` and `cards`
 *      (see any existing file in that folder for the shape).
 *   2. Import it below and add it to the `decks` array.
 * Nothing else in the app needs to change — the deck picker, session
 * manager, and stats all read from this registry.
 */

import * as consonants from "./decks/consonants.js";
import * as subscriptConsonants from "./decks/subscript-consonants.js";
import * as vowelsIndependent from "./decks/vowels-independent.js";
import * as vowelsDependent from "./decks/vowels-dependent.js";
import * as numbers from "./decks/numbers.js";
import * as greetings from "./decks/greetings.js";
import * as family from "./decks/family.js";
import * as colors from "./decks/colors.js";
import * as animals from "./decks/animals.js";
import * as food from "./decks/food.js";
import * as bodyParts from "./decks/body-parts.js";
import * as days from "./decks/days.js";
import * as solarSystem from "./decks/solar-system.js";
import * as months from "./decks/months.js";
import * as time from "./decks/time.js";
import * as dailyItems from "./decks/daily-items.js";
import * as buildings from "./decks/buildings.js";
import * as relatives from "./decks/relatives.js";
import * as feelings from "./decks/feelings.js";
import * as weather from "./decks/weather.js";
import * as transportation from "./decks/transportation.js";
import * as nature from "./decks/nature.js";
import * as jobs from "./decks/jobs.js";
import * as fruits from "./decks/fruits.js";

const decks = [
  consonants,
  subscriptConsonants,
  vowelsIndependent,
  vowelsDependent,
  numbers,
  greetings,
  family,
  colors,
  animals,
  food,
  bodyParts,
  days,
  solarSystem,
  months,
  time,
  dailyItems,
  buildings,
  relatives,
  feelings,
  weather,
  transportation,
  nature,
  jobs,
  fruits,
];

/**
 * Get metadata for every deck, including card counts, for the deck picker UI.
 * @returns {Array} List of { ...deckMeta, cardCount }
 */
export function getDeckList() {
  return decks
    .map(({ deckMeta, cards }) => ({
      ...deckMeta,
      cardCount: cards.length,
    }))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

/**
 * Category labels, in display order. Mirrors how a Khmer primary
 * classroom separates learning to read the script (អក្ខរកម្ម) from
 * building spoken vocabulary (វាក្យសព្ទ).
 */
export const DECK_CATEGORIES = [
  {
    id: "literacy",
    title: "អក្ខរកម្ម",
    titleEnglish: "Reading the Script",
    description: "Letters first — recognize every shape before the words.",
  },
  {
    id: "vocabulary",
    title: "វាក្យសព្ទ",
    titleEnglish: "Words & Everyday Life",
    description: "Real words for the people, places, and things around you.",
  },
];

/**
 * Get decks grouped by category, in the standard learning order.
 * @returns {Array} List of { ...category, decks: [...] }
 */
export function getDeckListByCategory() {
  const list = getDeckList();
  return DECK_CATEGORIES.map((cat) => ({
    ...cat,
    decks: list.filter((d) => (d.category || "vocabulary") === cat.id),
  })).filter((group) => group.decks.length > 0);
}

/**
 * Get a single deck's metadata by id.
 * @param {string} deckId
 * @returns {Object|null}
 */
export function getDeckMeta(deckId) {
  const deck = decks.find((d) => d.deckMeta.id === deckId);
  return deck ? deck.deckMeta : null;
}

/**
 * Get all cards for a given deck.
 * @param {string} deckId
 * @returns {Array}
 */
export function getAllCards(deckId) {
  const deck = decks.find((d) => d.deckMeta.id === deckId);
  return deck ? deck.cards : [];
}

/**
 * Get a shuffled selection of cards from a deck.
 * @param {string} deckId
 * @param {number} count - Number of cards to select. Pass a number >= the
 *   deck size (e.g. Infinity) to get the whole deck shuffled.
 * @returns {Array}
 */
export function getRandomCards(deckId, count) {
  const all = getAllCards(deckId);
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
