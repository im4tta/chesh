/**
 * Greetings & Everyday Phrases Deck — ការស្វាគមន៍
 */

export const deckMeta = {
  id: "greetings",
  title: "ការស្វាគមន៍",
  titleEnglish: "Greetings & Phrases",
  emoji: "👋",
  description: "Everyday polite words and greetings",
  category: "vocabulary",
  order: 6,
};

const items = [
  { khmer: "សួស្តី", english: "Hello", emoji: "👋" },
  { khmer: "អរគុណ", english: "Thank you", emoji: "🙏" },
  { khmer: "សូមទោស", english: "Sorry / Excuse me", emoji: "😅" },
  { khmer: "លាហើយ", english: "Goodbye", emoji: "👋" },
  { khmer: "បាទ", english: "Yes (said by boys/men)", emoji: "✅" },
  { khmer: "ចាស", english: "Yes (said by girls/women)", emoji: "✅" },
  { khmer: "ទេ", english: "No", emoji: "❌" },
  { khmer: "សុខសប្បាយទេ", english: "How are you?", emoji: "😊" },
];

export const cards = items.map((item, index) => ({
  id: `greeting-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "greetings",
}));
