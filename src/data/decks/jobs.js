export const deckMeta = {
  id: "jobs",
  title: "មុខរបរ",
  titleEnglish: "Jobs & Professions",
  emoji: "👨‍🏫",
  description: "Common jobs and professions in Khmer",
  category: "vocabulary",
  order: 23,
};

const items = [
  { khmer: "គ្រូ", english: "Teacher", emoji: "👨‍🏫" },
  { khmer: "ពេទ្យ", english: "Doctor", emoji: "👨‍⚕️" },
  { khmer: "អ្នកបើកបរ", english: "Driver", emoji: "🚕" },
  { khmer: "កសិករ", english: "Farmer", emoji: "🧑‍🌾" },
  { khmer: "អ្នកនេសាទ", english: "Fisher", emoji: "🎣" },
  { khmer: "មេចុងភៅ", english: "Chef", emoji: "👨‍🍳" },
  { khmer: "អ្នកសាងសង់", english: "Builder", emoji: "🏗️" },
  { khmer: "នគរបាល", english: "Police officer", emoji: "👮" },
  { khmer: "អ្នកលក់", english: "Seller / Shopkeeper", emoji: "🧑‍💼" },
  { khmer: "វិស្វករ", english: "Engineer", emoji: "👷" },
];

export const cards = items.map((item, index) => ({
  id: `job-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "jobs",
}));
