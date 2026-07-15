export const deckMeta = {
  id: "vowels-independent",
  title: "ស្រៈពេញតួ",
  titleEnglish: "Independent Vowels",
  emoji: "🆎",
  description: "Full-form vowels that stand on their own without a consonant",
  category: "literacy",
  order: 3,
  // Verified against the Unicode Khmer block chart (U+17A5-U+17B3) and the
  // Wikipedia "Khmer script" independent-vowel table (GD romanization).
  // Fixed: U+17B1 ឱ and U+17B2 ឲ were both mislabeled "oa" (should be "ao"),
  // matching the same transposition error found in the dependent-vowel deck.
  needsVerification: false,
};

const items = [
  { ch: "\u17A5", english: "Independent e" },
  { ch: "\u17A6", english: "Independent ei" },
  { ch: "\u17A7", english: "Independent o" },
  { ch: "\u17A8", english: "Independent o (archaic)" },
  { ch: "\u17A9", english: "Independent ou" },
  { ch: "\u17AA", english: "Independent au" },
  { ch: "\u17AB", english: "Independent ru" },
  { ch: "\u17AC", english: "Independent ruu" },
  { ch: "\u17AD", english: "Independent lu" },
  { ch: "\u17AE", english: "Independent luu" },
  { ch: "\u17AF", english: "Independent ae" },
  { ch: "\u17B0", english: "Independent ai" },
  { ch: "\u17B1", english: "Independent ao" },
  { ch: "\u17B2", english: "Independent ao (variant)" },
  { ch: "\u17B3", english: "Independent au" },
];

export const cards = items.map((item, index) => ({
  id: `vowel-ind-${index + 1}`,
  khmer: item.ch,
  english: item.english,
  needsVerification: true,
  category: "vowels-independent",
}));
