/**
 * Buildings & Places Deck — អគារ និងកន្លែង
 */

export const deckMeta = {
  id: "buildings",
  title: "អគារ និងកន្លែង",
  titleEnglish: "Buildings & Places",
  emoji: "🏠",
  description: "Common buildings and places in a town",
  category: "vocabulary",
  order: 17,
};

const items = [
  { khmer: "ផ្ទះ", english: "House", emoji: "🏠" },
  { khmer: "សាលារៀន", english: "School", emoji: "🏫" },
  { khmer: "មន្ទីរពេទ្យ", english: "Hospital", emoji: "🏥" },
  { khmer: "ផ្សារ", english: "Market", emoji: "🏪" },
  { khmer: "វត្ត", english: "Temple", emoji: "🛕" },
  { khmer: "ធនាគារ", english: "Bank", emoji: "🏦" },
  { khmer: "ភោជនីយដ្ឋាន", english: "Restaurant", emoji: "🍽️" },
  { khmer: "សណ្ឋាគារ", english: "Hotel", emoji: "🏨" },
  { khmer: "ប៉ុស្តិ៍នគរបាល", english: "Police station", emoji: "🚓" },
  { khmer: "ព្រលានយន្តហោះ", english: "Airport", emoji: "✈️" },
];

export const cards = items.map((item, index) => ({
  id: `building-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "buildings",
}));

