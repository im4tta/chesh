export const deckMeta = {
  id: "nature",
  title: "ធម្មជាតិ",
  titleEnglish: "Nature",
  emoji: "🌳",
  description: "The natural world — plants, water, sky, and land in Khmer",
  category: "vocabulary",
  order: 22,
};

const items = [
  { khmer: "ដើមឈើ", english: "Tree", emoji: "🌳" },
  { khmer: "ផ្កា", english: "Flower", emoji: "🌸" },
  { khmer: "ស្មៅ", english: "Grass", emoji: "🌿" },
  { khmer: "ទន្លេ", english: "River", emoji: "🏞️" },
  { khmer: "សមុទ្រ", english: "Sea / Ocean", emoji: "🌊" },
  { khmer: "ភ្នំ", english: "Mountain", emoji: "⛰️" },
  { khmer: "ព្រៃ", english: "Forest", emoji: "🌲" },
  { khmer: "ថ្ម", english: "Rock / Stone", emoji: "🪨" },
  { khmer: "ខ្សាច់", english: "Sand", emoji: "🏖️" },
  { khmer: "ផ្កាយ", english: "Star", emoji: "⭐" },
];

export const cards = items.map((item, index) => ({
  id: `nature-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "nature",
}));
