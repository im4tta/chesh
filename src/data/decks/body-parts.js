/**
 * Body Parts Deck — ផ្នែកនៃរាងកាយ
 */

export const deckMeta = {
  id: "body-parts",
  title: "ផ្នែកនៃរាងកាយ",
  titleEnglish: "Body Parts",
  emoji: "🧍",
  description: "Words for parts of the body in Khmer",
  category: "vocabulary",
  order: 11,
};

const items = [
  { khmer: "ក្បាល", english: "Head", emoji: "🧠" },
  { khmer: "ភ្នែក", english: "Eye", emoji: "👁️" },
  { khmer: "ច្រមុះ", english: "Nose", emoji: "👃" },
  { khmer: "មាត់", english: "Mouth", emoji: "👄" },
  { khmer: "ត្រចៀក", english: "Ear", emoji: "👂" },
  { khmer: "ដៃ", english: "Hand / Arm", emoji: "✋" },
  { khmer: "ជើង", english: "Leg / Foot", emoji: "🦶" },
  { khmer: "សក់", english: "Hair", emoji: "💇" },
];

export const cards = items.map((item, index) => ({
  id: `body-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "body-parts",
}));
