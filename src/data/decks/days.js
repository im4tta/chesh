export const deckMeta = {
  id: "days",
  title: "ថ្ងៃ",
  titleEnglish: "Days of the Week",
  emoji: "📅",
  description: "The seven days of the week in Khmer",
  category: "vocabulary",
  order: 12,
};

const items = [
  { khmer: "ថ្ងៃច័ន្ទ", english: "Monday", emoji: "🌙" },
  { khmer: "ថ្ងៃអង្គារ", english: "Tuesday", emoji: "🔥" },
  { khmer: "ថ្ងៃពុធ", english: "Wednesday", emoji: "💧" },
  { khmer: "ថ្ងៃព្រហស្បតិ៍", english: "Thursday", emoji: "🌳" },
  { khmer: "ថ្ងៃសុក្រ", english: "Friday", emoji: "⛰️" },
  { khmer: "ថ្ងៃសៅរ៍", english: "Saturday", emoji: "🪐" },
  { khmer: "ថ្ងៃអាទិត្យ", english: "Sunday", emoji: "☀️" },
];

export const cards = items.map((item, index) => ({
  id: `day-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "days",
}));
