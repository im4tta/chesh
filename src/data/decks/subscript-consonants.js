export const deckMeta = {
  id: "subscript-consonants",
  title: "ជើងអក្សរ",
  titleEnglish: "Subscript Consonants",
  emoji: "🔽",
  description: "Recognize the subscript (sub-consonant) form of each letter",
  category: "literacy",
  order: 2,
  // Each card pairs a consonant with its OWN subscript form (e.g. ក + ្ក =
  // ក្ក) rather than stacking every subscript under the carrier អ. អ is
  // itself a full, unrelated consonant, so using it as a universal carrier
  // obscured the shape being taught. Self-pairing keeps the base letter the
  // learner already recognizes right next to the new subscript shape.
  // Exception: ឡ has no subscript form in standard Khmer orthography
  // (per Wikipedia's "Khmer script" article and the Unicode Khmer chart);
  // some fonts render a fallback glyph for ្ឡ, so that card is marked
  // accordingly instead of implying a standard form exists.
};

const COENG = "\u17D2";
const letters = [
  "ក", "ខ", "គ", "ឃ", "ង",
  "ច", "ឆ", "ជ", "ឈ", "ញ",
  "ដ", "ឋ", "ឌ", "ឍ", "ណ",
  "ត", "ថ", "ទ", "ធ", "ន",
  "ប", "ផ", "ព", "ភ", "ម",
  "យ", "រ", "ល", "វ",
  "ស", "ហ", "ឡ", "អ",
];

const NO_STANDARD_SUBSCRIPT = new Set(["ឡ"]);

export const cards = letters.map((ch, index) => ({
  id: `subscript-${index + 1}`,
  khmer: ch + COENG + ch,
  english: NO_STANDARD_SUBSCRIPT.has(ch)
    ? `Subscript of ${ch} (consonant #${index + 1} of 33) — no standard subscript form; shown as a font fallback`
    : `Subscript of ${ch} (consonant #${index + 1} of 33)`,
  category: "subscript-consonants",
}));
