/**
 * Daily Items Deck — របស់របរប្រចាំថ្ងៃ
 *
 * Common everyday objects a kid encounters at home and school.
 */

export const deckMeta = {
  id: "daily-items",
  title: "របស់របរប្រចាំថ្ងៃ",
  titleEnglish: "Everyday Items",
  emoji: "🎒",
  description: "Common objects you use every day",
  category: "vocabulary",
  order: 16,
};

const items = [
  { khmer: "ទូរស័ព្ទ", english: "Phone", emoji: "📱" },
  { khmer: "សៀវភៅ", english: "Book", emoji: "📖" },
  { khmer: "ប៊ិក", english: "Pen", emoji: "🖊️" },
  { khmer: "ខ្មៅដៃ", english: "Pencil", emoji: "✏️" },
  { khmer: "តុ", english: "Table", emoji: "🪑" },
  { khmer: "កៅអី", english: "Chair", emoji: "🪑" },
  { khmer: "កាបូប", english: "Bag", emoji: "🎒" },
  { khmer: "កូនសោ", english: "Key", emoji: "🔑" },
  { khmer: "នាឡិកា", english: "Clock / Watch", emoji: "⏰" },
  { khmer: "លុយ", english: "Money", emoji: "💵" },
  { khmer: "ខោអាវ", english: "Clothes", emoji: "👕" },
  { khmer: "ក្រដាស", english: "Paper", emoji: "📄" },
];

export const cards = items.map((item, index) => ({
  id: `daily-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "daily-items",
}));
