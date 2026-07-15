/**
 * Food Deck — អាហារ
 */

export const deckMeta = {
  id: "food",
  title: "អាហារ",
  titleEnglish: "Food",
  emoji: "🍚",
  description: "Everyday food and drink words in Khmer",
  category: "vocabulary",
  order: 10,
};

const items = [
  { khmer: "បាយ", english: "Rice / Food", emoji: "🍚" },
  { khmer: "ទឹក", english: "Water", emoji: "💧" },
  { khmer: "សាច់", english: "Meat", emoji: "🍖" },
  { khmer: "ត្រី", english: "Fish", emoji: "🐟" },
  { khmer: "បន្លែ", english: "Vegetables", emoji: "🥬" },
  { khmer: "ផ្លែឈើ", english: "Fruit", emoji: "🍎" },
  { khmer: "ស៊ុប", english: "Soup", emoji: "🍲" },
  { khmer: "ទឹកដោះគោ", english: "Milk", emoji: "🥛" },
  { khmer: "ស្ករ", english: "Sugar", emoji: "🍬" },
  { khmer: "នំបុ័ង", english: "Bread", emoji: "🍞" },
];

export const cards = items.map((item, index) => ({
  id: `food-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "food",
}));

