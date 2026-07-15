/**
 * Family Deck — ក្រុមគ្រួសារ
 */

export const deckMeta = {
  id: "family",
  title: "ក្រុមគ្រួសារ",
  titleEnglish: "Family",
  emoji: "👪",
  description: "Words for family members in Khmer",
  category: "vocabulary",
  order: 7,
};

const items = [
  { khmer: "ម៉ែ", english: "Mother", emoji: "👩" },
  { khmer: "ប៉ា", english: "Father", emoji: "👨" },
  { khmer: "បងប្រុស", english: "Older brother", emoji: "👦" },
  { khmer: "បងស្រី", english: "Older sister", emoji: "👧" },
  { khmer: "ប្អូនប្រុស", english: "Younger brother", emoji: "👦" },
  { khmer: "ប្អូនស្រី", english: "Younger sister", emoji: "👧" },
  { khmer: "តា", english: "Grandfather", emoji: "👴" },
  { khmer: "យាយ", english: "Grandmother", emoji: "👵" },
];

export const cards = items.map((item, index) => ({
  id: `family-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "family",
}));

