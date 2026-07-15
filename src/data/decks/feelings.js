/**
 * Feelings Deck — អារម្មណ៍
 *
 * Verified against Talkpal's Khmer emotion-word guide and Quizlet Khmer
 * feelings sets compiled by learners/teachers, cross-checked for spelling.
 */

export const deckMeta = {
  id: "feelings",
  title: "អារម្មណ៍",
  titleEnglish: "Feelings",
  emoji: "😊",
  description: "Words for how you feel",
  category: "vocabulary",
  order: 19,
};

const items = [
  { khmer: "សប្បាយចិត្ត", english: "Happy", emoji: "😊" },
  { khmer: "ក្រៀមក្រំ", english: "Sad", emoji: "😢" },
  { khmer: "ខឹង", english: "Angry", emoji: "😠" },
  { khmer: "ភ័យខ្លាច", english: "Scared", emoji: "😨" },
  { khmer: "នឿយហត់", english: "Tired", emoji: "😴" },
  { khmer: "រំភើប", english: "Excited", emoji: "🤩" },
  { khmer: "ភ្ញាក់ផ្អើល", english: "Surprised", emoji: "😲" },
  { khmer: "បារម្ភ", english: "Worried", emoji: "😟" },
  { khmer: "ខ្មាសអៀន", english: "Shy", emoji: "😳" },
  { khmer: "អផ្សុក", english: "Bored", emoji: "😑" },
];

export const cards = items.map((item, index) => ({
  id: `feeling-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "feelings",
}));
