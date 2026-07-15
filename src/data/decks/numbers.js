/**
 * Numbers Deck — លេខ
 * Khmer numerals 0-10 with their Khmer number word and English meaning.
 */

export const deckMeta = {
  id: "numbers",
  title: "លេខ",
  titleEnglish: "Numbers",
  emoji: "🔢",
  description: "Count from 0 to 10 in Khmer",
  category: "vocabulary",
  order: 5,
};

const items = [
  { numeral: "០", khmer: "សូន្យ", english: "Zero (0)" },
  { numeral: "១", khmer: "មួយ", english: "One (1)" },
  { numeral: "២", khmer: "ពីរ", english: "Two (2)" },
  { numeral: "៣", khmer: "បី", english: "Three (3)" },
  { numeral: "៤", khmer: "បួន", english: "Four (4)" },
  { numeral: "៥", khmer: "ប្រាំ", english: "Five (5)" },
  { numeral: "៦", khmer: "ប្រាំមួយ", english: "Six (6)" },
  { numeral: "៧", khmer: "ប្រាំពីរ", english: "Seven (7)" },
  { numeral: "៨", khmer: "ប្រាំបី", english: "Eight (8)" },
  { numeral: "៩", khmer: "ប្រាំបួន", english: "Nine (9)" },
  { numeral: "១០", khmer: "ដប់", english: "Ten (10)" },
];

export const cards = items.map((item, index) => ({
  id: `number-${index + 1}`,
  khmer: item.khmer,
  secondary: item.numeral,
  english: item.english,
  category: "numbers",
}));
