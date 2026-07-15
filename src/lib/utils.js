import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Returns candidate image URLs for a flashcard, in order of preference.
 * Tries the English name first (e.g. "dog.png", "dog.jpg"), then falls
 * back to the card ID (e.g. "animal-1.png", "animal-1.jpg").
 *
 * Drop generated images into public/images/decks/{deckId}/{name}.{ext}
 * using the English name as the filename — no code changes needed.
 */
export function getCardImageUrls(deckId, cardId, english = null) {
  const stems = [];
  if (english) stems.push(slugify(english));
  stems.push(cardId);

  return stems.flatMap((stem) =>
    IMAGE_EXTENSIONS.map((ext) => `/images/decks/${deckId}/${stem}.${ext}`)
  );
}
