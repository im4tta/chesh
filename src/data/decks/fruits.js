export const deckMeta = {
  id: "fruits",
  title: "ផ្លែឈើ",
  titleEnglish: "Fruits",
  emoji: "🍎",
  description: "Fruit names in Khmer",
  category: "vocabulary",
  order: 24,
};

const items = [
  { khmer: "ផ្លែប៉ោម", english: "Apple", emoji: "🍎" },
  { khmer: "ផ្លែចេក", english: "Banana", emoji: "🍌" },
  { khmer: "ផ្លែទំពាំងបាយជូរ", english: "Grapes", emoji: "🍇" },
  { khmer: "ផ្លែក្រូច", english: "Orange", emoji: "🍊" },
  { khmer: "ផ្លែស្វាយ", english: "Mango", emoji: "🥭" },
  { khmer: "ផ្លែម្នាស់", english: "Pineapple", emoji: "🍍" },
  { khmer: "ផ្លែឪឡឹក", english: "Watermelon", emoji: "🍉" },
  { khmer: "ផ្លែស្ត្របឺរី", english: "Strawberry", emoji: "🍓" },
  { khmer: "ផ្លែក្រូចឆ្មារ", english: "Lime", emoji: "🍋" },
  { khmer: "ផ្លែទុរេន", english: "Durian", emoji: "🌰" },
];

export const cards = items.map((item, index) => ({
  id: `fruit-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "fruits",
}));
