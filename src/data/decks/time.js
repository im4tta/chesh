/**
 * Time Deck — ពេលវេលា
 *
 * Units of time (day, week, month, year, hour, minute) and the basic
 * parts of the day. Pairs well with days.js and months.js.
 */

export const deckMeta = {
  id: "time",
  title: "ពេលវេលា",
  titleEnglish: "Time & Years",
  emoji: "⏰",
  description: "Days, weeks, months, years, and the parts of the day",
  category: "vocabulary",
  order: 15,
};

const items = [
  { khmer: "ថ្ងៃ", english: "Day", emoji: "📆" },
  { khmer: "សប្តាហ៍", english: "Week", emoji: "🗓️" },
  { khmer: "ខែ", english: "Month", emoji: "🌙" },
  { khmer: "ឆ្នាំ", english: "Year", emoji: "🎉" },
  { khmer: "ម៉ោង", english: "Hour", emoji: "🕐" },
  { khmer: "នាទី", english: "Minute", emoji: "⏱️" },
  { khmer: "ព្រឹក", english: "Morning", emoji: "🌅" },
  { khmer: "ថ្ងៃត្រង់", english: "Noon", emoji: "🌞" },
  { khmer: "ល្ងាច", english: "Evening", emoji: "🌇" },
  { khmer: "យប់", english: "Night", emoji: "🌃" },
];

export const cards = items.map((item, index) => ({
  id: `time-${index + 1}`,
  khmer: item.khmer,
  english: item.english,
  emoji: item.emoji,
  category: "time",
}));
