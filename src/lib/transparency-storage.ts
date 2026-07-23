import { FeedbackType } from "../types/transparency";

const STORAGE_KEY = "startplay_transparency_feedback";

interface TransparencyFeedbackRecord {
  messageId: string;
  feedback: FeedbackType;
  questionText: string;
  timestamp: number;
}

export function getAllTransparencyFeedback(): TransparencyFeedbackRecord[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function saveTransparencyFeedback(
  messageId: string,
  feedback: FeedbackType,
  questionText: string
): void {
  const records = getAllTransparencyFeedback();
  const existing = records.findIndex((r) => r.messageId === messageId);

  if (existing >= 0) {
    if (records[existing].feedback === feedback) {
      records.splice(existing, 1);
    } else {
      records[existing].feedback = feedback;
      records[existing].timestamp = Date.now();
    }
  } else {
    records.push({ messageId, feedback, questionText, timestamp: Date.now() });
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

export function getTransparencyFeedback(messageId: string): FeedbackType | null {
  const records = getAllTransparencyFeedback();
  return records.find((r) => r.messageId === messageId)?.feedback ?? null;
}
