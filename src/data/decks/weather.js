export const deckMeta = {
  id: "weather",
  title: "អាកាសធាតុ",
  titleEnglish: "Weather",
  emoji: "🌤️",
  description: "Weather conditions and seasons in Khmer",
  category: "vocabulary",
  order: 20,
};

const items = [
  { khmer: "ថ្ងៃក្តៅ", english: "Hot", emoji: "☀️" },
  { khmer: "ថ្ងៃត្រជាក់", english: "Cold", emoji: "❄️" },
  { khmer: "មានពពក", english: "Cloudy", emoji: "☁️" },
  { khmer: "មានខ្យល់", english: "Windy", emoji: "💨" },
  { khmer: "ភ្លៀង", english: "Rain", emoji: "🌧️" },
  { khmer: "ផ្គររន្ទះ", english: "Thunderstorm", emoji: "⛈️" },
  { khmer: "ឥន្ទធនូ", english: "Rainbow", emoji: "🌈" },
  { khmer: "ធ្លាក់ព្រិល", english: "Snow", emoji: "🌨️" },
  { khmer: "អ័ព្ទ", english: "Foggy", emoji: "🌫️" },
  { khmer: "រដូវប្រាំង", english: "Dry season", emoji: "🏜️" },
  { khmer: "រដូវវស្សា", english: "Rainy season", emoji: "🌂" },
  { khmer: "រដូវរងារ", english: "Winter", emoji: "⛄" },
];

export const cards = items.map((item, index) => ({
  id: `weather-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "weather",
}));
