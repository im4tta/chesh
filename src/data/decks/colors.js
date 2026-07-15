/**
 * Colors Deck — ពណ៌
 */

export const deckMeta = {
  id: "colors",
  title: "ពណ៌",
  titleEnglish: "Colors",
  emoji: "🎨",
  description: "Learn common colors in Khmer",
  category: "vocabulary",
  order: 8,
};

const items = [
  { khmer: "ក្រហម", english: "Red", emoji: "🔴" },
  { khmer: "លឿង", english: "Yellow", emoji: "🟡" },
  { khmer: "ខៀវ", english: "Blue", emoji: "🔵" },
  { khmer: "បៃតង", english: "Green", emoji: "🟢" },
  { khmer: "ស", english: "White", emoji: "⚪" },
  { khmer: "ខ្មៅ", english: "Black", emoji: "⚫" },
  { khmer: "ត្នោត", english: "Brown", emoji: "🟤" },
  { khmer: "ស្វាយ", english: "Purple", emoji: "🟣" },
  { khmer: "ទឹកក្រូច", english: "Orange", emoji: "🟠" },
];

export const cards = items.map((item, index) => ({
  id: `color-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "colors",
}));

