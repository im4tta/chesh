/**
 * Animals Deck — សត្វ
 */

export const deckMeta = {
  id: "animals",
  title: "សត្វ",
  titleEnglish: "Animals",
  emoji: "🐾",
  description: "Common animals in Khmer",
  category: "vocabulary",
  order: 9,
};

const items = [
  { khmer: "ឆ្កែ", english: "Dog", emoji: "🐕" },
  { khmer: "ឆ្មា", english: "Cat", emoji: "🐈" },
  { khmer: "គោ", english: "Cow", emoji: "🐄" },
  { khmer: "ជ្រូក", english: "Pig", emoji: "🐖" },
  { khmer: "មាន់", english: "Chicken", emoji: "🐓" },
  { khmer: "ត្រី", english: "Fish", emoji: "🐟" },
  { khmer: "ដំរី", english: "Elephant", emoji: "🐘" },
  { khmer: "សេះ", english: "Horse", emoji: "🐎" },
  { khmer: "ស្វា", english: "Monkey", emoji: "🐒" },
  { khmer: "ខ្លា", english: "Tiger", emoji: "🐅" },
  { khmer: "កណ្តុរ", english: "Mouse", emoji: "🐁" },
  { khmer: "សត្វស្លាប", english: "Bird", emoji: "🐦" },
];

export const cards = items.map((item, index) => ({
  id: `animal-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "animals",
}));

