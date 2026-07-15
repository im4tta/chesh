export const deckMeta = {
  id: "transportation",
  title: "យានជំនិះ",
  titleEnglish: "Transportation",
  emoji: "🚗",
  description: "Vehicles and modes of transport in Khmer",
  category: "vocabulary",
  order: 21,
};

const items = [
  { khmer: "ឡាន", english: "Car", emoji: "🚗" },
  { khmer: "ឡានក្រុង", english: "Bus", emoji: "🚌" },
  { khmer: "ម៉ូតូ", english: "Motorcycle", emoji: "🏍️" },
  { khmer: "កង់", english: "Bicycle", emoji: "🚲" },
  { khmer: "យន្តហោះ", english: "Airplane", emoji: "✈️" },
  { khmer: "ទូក", english: "Boat", emoji: "⛵" },
  { khmer: "រថភ្លើង", english: "Train", emoji: "🚂" },
  { khmer: "តុកតុក", english: "Tuk-tuk", emoji: "🛺" },
  { khmer: "រទេះ", english: "Cart / Wagon", emoji: "🛒" },
  { khmer: "ជិះកង់", english: "Ride a bike", emoji: "🚴" },
];

export const cards = items.map((item, index) => ({
  id: `transport-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "transportation",
}));
