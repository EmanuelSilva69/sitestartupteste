import { ChatMessage } from "../types/simulation";

const STORAGE_KEY = "consultadecandidatos_ai_ratings";

interface RatingRecord {
  messageId: string;
  questionId: string;
  rating: "like" | "dislike" | null;
  timestamp: number;
}

function getAllRatings(): RatingRecord[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function getMessageRating(messageId: string): "like" | "dislike" | null {
  const ratings = getAllRatings();
  const found = ratings.find((r) => r.messageId === messageId);
  return found?.rating ?? null;
}

export function setMessageRating(
  messageId: string,
  questionId: string,
  rating: "like" | "dislike"
): void {
  const ratings = getAllRatings();
  const existing = ratings.findIndex((r) => r.messageId === messageId);

  if (existing >= 0) {
    if (ratings[existing].rating === rating) {
      ratings[existing].rating = null;
    } else {
      ratings[existing].rating = rating;
    }
    ratings[existing].timestamp = Date.now();
  } else {
    ratings.push({ messageId, questionId, rating, timestamp: Date.now() });
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  } catch {
    // ignore
  }
}

export function attachRatingsToMessages(
  messages: ChatMessage[],
  questionId: string
): ChatMessage[] {
  return messages.map((msg) => {
    if (msg.role !== "assistant") return msg;
    const rating = getMessageRating(msg.id);
    return { ...msg, rating };
  });
}
