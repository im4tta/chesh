/**
 * Khmer Consonants Deck — អក្សរខ្មែរ
 *
 * The 33 consonants of the modern Khmer script, in their standard
 * dictionary order. Each card shows the letter large (front) and its
 * position in the alphabet (back) — this is letter *recognition and
 * sequence* practice, not vocabulary. We deliberately do NOT attach an
 * "example word" to every letter: many such example-word charts vary
 * source to source, and getting even one wrong in a kids' literacy tool
 * is worse than leaving it out. Vocabulary (real words) lives in the
 * other decks instead.
 */

export const deckMeta = {
  id: "consonants",
  title: "អក្សរខ្មែរ",
  titleEnglish: "Khmer Consonants",
  emoji: "🔤",
  description: "Learn to recognize all 33 Khmer consonants in order",
  category: "literacy",
  order: 1,
};

// Each consonant carries an inherent vowel sound, and Cambodian schools
// group the 33 consonants into two "series" (សំឡេង) by that inherent
// sound — this determines how dependent vowels are pronounced when
// attached to the letter, so it's one of the first things taught after
// the letter shapes themselves. Series 1 = inherent "â" sound (formerly
// unvoiced consonants), Series 2 = inherent "ô" sound (formerly voiced
// consonants). This grouping is standard and stable, unlike example-word
// associations, which is why we include it here — but as with all Khmer
// content in this app, a native-speaker pass before classroom use is
// still recommended.
const letters = [
  { ch: "ក", series: 1 }, { ch: "ខ", series: 1 }, { ch: "គ", series: 2 }, { ch: "ឃ", series: 2 }, { ch: "ង", series: 2 },
  { ch: "ច", series: 1 }, { ch: "ឆ", series: 1 }, { ch: "ជ", series: 2 }, { ch: "ឈ", series: 2 }, { ch: "ញ", series: 2 },
  { ch: "ដ", series: 1 }, { ch: "ឋ", series: 1 }, { ch: "ឌ", series: 2 }, { ch: "ឍ", series: 2 }, { ch: "ណ", series: 2 },
  { ch: "ត", series: 1 }, { ch: "ថ", series: 1 }, { ch: "ទ", series: 2 }, { ch: "ធ", series: 2 }, { ch: "ន", series: 2 },
  { ch: "ប", series: 1 }, { ch: "ផ", series: 1 }, { ch: "ព", series: 2 }, { ch: "ភ", series: 2 }, { ch: "ម", series: 2 },
  { ch: "យ", series: 2 }, { ch: "រ", series: 2 }, { ch: "ល", series: 2 }, { ch: "វ", series: 2 },
  { ch: "ស", series: 1 }, { ch: "ហ", series: 1 }, { ch: "ឡ", series: 2 }, { ch: "អ", series: 1 },
];

export const cards = letters.map(({ ch, series }, index) => ({
  id: `consonant-${index + 1}`,
  khmer: ch,
  english: `Consonant #${index + 1} of 33`,
  series,
  seriesLabel: series === 1 ? "Series 1 · â" : "Series 2 · ô",
  category: "consonants",
}));
