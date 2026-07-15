/**
 * Months Deck — ខែ
 *
 * The 12 months of the (Western/Gregorian) solar calendar as used in
 * modern Cambodia — the same names appear on Khmer calendars, ID
 * documents, and news dates. Verified against horakhmer.com's calendar
 * grid and multiple Khmer calendar references.
 */

export const deckMeta = {
  id: "months",
  title: "ខែ",
  titleEnglish: "Months of the Year",
  emoji: "🗓️",
  description: "The 12 months of the year in Khmer",
  category: "vocabulary",
  order: 14,
};

const items = [
  { khmer: "មករា", english: "January" },
  { khmer: "កុម្ភៈ", english: "February" },
  { khmer: "មីនា", english: "March" },
  { khmer: "មេសា", english: "April" },
  { khmer: "ឧសភា", english: "May" },
  { khmer: "មិថុនា", english: "June" },
  { khmer: "កក្កដា", english: "July" },
  { khmer: "សីហា", english: "August" },
  { khmer: "កញ្ញា", english: "September" },
  { khmer: "តុលា", english: "October" },
  { khmer: "វិច្ឆិកា", english: "November" },
  { khmer: "ធ្នូ", english: "December" },
];

export const cards = items.map((item, index) => ({
  id: `month-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  category: "months",
}));
