const CARRIER = "\u1780";

export const deckMeta = {
  id: "vowels-dependent",
  title: "ស្រៈនិស្ស័យ",
  titleEnglish: "Dependent Vowel Signs",
  emoji: "➕",
  description: "Vowel signs that attach to a consonant — shown here with ក",
  category: "literacy",
  order: 4,
  needsVerification: false,
};

const items = [
  { sign: "\u17B6", english: "Vowel sign a (aa)" },
  { sign: "\u17B7", english: "Vowel sign i" },
  { sign: "\u17B8", english: "Vowel sign ii" },
  { sign: "\u17B9", english: "Vowel sign ue" },
  { sign: "\u17BA", english: "Vowel sign uee" },
  { sign: "\u17BB", english: "Vowel sign u" },
  { sign: "\u17BC", english: "Vowel sign uu" },
  { sign: "\u17BD", english: "Vowel sign ua" },
  { sign: "\u17BE", english: "Vowel sign oe" },
  { sign: "\u17BF", english: "Vowel sign uea" },
  { sign: "\u17C0", english: "Vowel sign ie" },
  { sign: "\u17C1", english: "Vowel sign e" },
  { sign: "\u17C2", english: "Vowel sign ae" },
  { sign: "\u17C3", english: "Vowel sign ai" },
  { sign: "\u17C4", english: "Vowel sign ao" },
  { sign: "\u17C5", english: "Vowel sign au" },
  { sign: "\u17C6", english: "Vowel sign am" },
  { sign: "\u17C7", english: "Vowel sign ah" },
  { sign: "\u17C8", english: "Vowel sign a (with glottal)" },
];

export const cards = items.map((item, index) => ({
  id: `vowel-dep-${index + 1}`,
  khmer: CARRIER + item.sign,
  english: item.english,
  needsVerification: true,
  category: "vowels-dependent",
}));
