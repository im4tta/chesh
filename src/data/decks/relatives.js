/**
 * Relatives Deck — សាច់ញាតិ
 *
 * Extended-family terms beyond the immediate family already covered in
 * family.js. Khmer kinship terms for aunt/uncle depend on whether the
 * relative is younger or older than your parent — ពូ/មីង for a younger
 * uncle/aunt, អ៊ំ for an older uncle or aunt of either gender. Verified
 * against Basic Khmer (Sok), Open Books/LibreTexts, and a Khmer
 * novice-level vocabulary list (studykhmer.com).
 */

export const deckMeta = {
  id: "relatives",
  title: "សាច់ញាតិ",
  titleEnglish: "Relatives",
  emoji: "👪",
  description: "Extended family words beyond mom, dad, and siblings",
  category: "vocabulary",
  order: 18,
};

const items = [
  { khmer: "ពូ", english: "Uncle (younger than parent)", emoji: "👨" },
  { khmer: "មីង", english: "Aunt (younger than parent)", emoji: "👩" },
  { khmer: "អ៊ំ", english: "Uncle/Aunt (older than parent)", emoji: "🧑" },
  { khmer: "ក្មួយ", english: "Nephew / Niece", emoji: "🧒" },
  { khmer: "ជីដូនមួយ", english: "Cousin", emoji: "🧑" },
  { khmer: "ចៅ", english: "Grandchild", emoji: "👶" },
  { khmer: "ប្តី", english: "Husband", emoji: "🤵" },
  { khmer: "ប្រពន្ធ", english: "Wife", emoji: "👰" },
  { khmer: "កូនប្រុស", english: "Son", emoji: "👦" },
  { khmer: "កូនស្រី", english: "Daughter", emoji: "👧" },
];

export const cards = items.map((item, index) => ({
  id: `relative-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "relatives",
}));

