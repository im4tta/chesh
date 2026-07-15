/**
 * Solar System Deck — ប្រព័ន្ធព្រះអាទិត្យ
 *
 * The sun, moon, and eight planets. Khmer names for Mercury through Saturn
 * are the same words used for the days of the week (see days.js) — they
 * come from the traditional Khmer/Sanskrit "nine heavenly bodies"
 * (នព្វគ្រោះ). Uranus and Neptune are modern transliterations, since
 * those planets aren't part of that older naming system.
 * Verified against Khmer Wikipedia articles ភពអ៊ុយរ៉ានុស / ភពណិបទូន and
 * multiple Khmer-language science explainers (see answerkid.blogspot.com,
 * cambodiapiece.wordpress.com).
 */

export const deckMeta = {
  id: "solar-system",
  title: "ប្រព័ន្ធព្រះអាទិត្យ",
  titleEnglish: "The Solar System",
  emoji: "🪐",
  description: "The sun, moon, and eight planets in Khmer",
  category: "vocabulary",
  order: 13,
};

const items = [
  { khmer: "ព្រះអាទិត្យ", english: "Sun", emoji: "☀️" },
  { khmer: "ព្រះច័ន្ទ", english: "Moon", emoji: "🌙" },
  { khmer: "ភពពុធ", english: "Mercury", emoji: "🪐" },
  { khmer: "ភពសុក្រ", english: "Venus", emoji: "🪐" },
  { khmer: "ភពផែនដី", english: "Earth", emoji: "🌍" },
  { khmer: "ភពអង្គារ", english: "Mars", emoji: "🔴" },
  { khmer: "ភពព្រហស្បតិ៍", english: "Jupiter", emoji: "🪐" },
  { khmer: "ភពសៅរ៍", english: "Saturn", emoji: "🪐" },
  { khmer: "ភពអ៊ុយរ៉ានុស", english: "Uranus", emoji: "🪐" },
  { khmer: "ភពណិបទូន", english: "Neptune", emoji: "🪐" },
];

export const cards = items.map((item, index) => ({
  id: `solar-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "solar-system",
}));

