// Recordings from the Learning Khmer (ReanKhmer) distribution. The two
// ambiguous "thor" recordings are omitted until their mapping is verified.
const consonants = [
  "kor", "khor", "kou", "khou", "ngou", "chor", "chhor", "Chou", "chhou", "nhou",
  "dor", null, "dou_siem", "thou_siam", "nor", "tor", null, "tou", "thou", "nou",
  "bor", "phor", "pou", "phou", "mou", "you", "rou", "lou", "vou", "sor", "hor", "lor", "or",
];
const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export function getLearningKhmerAudio(deckId, cardId) {
  const match = /^(consonant|number)-(\d+)$/.exec(cardId || "");
  if (!match) return null;
  const index = Number(match[2]) - 1;
  const name = deckId === "consonants" && match[1] === "consonant"
    ? consonants[index]
    : deckId === "numbers" && match[1] === "number" ? numbers[index] : null;
  if (!name) return null;
  const folder = deckId === "numbers" ? "numbers" : "consonants";
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/audio/learning-khmer/${folder}/${name}.mp3`;
}
