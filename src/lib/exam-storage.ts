import { DownloadedFile } from "../types/simulation";

const STORAGE_KEY = "consultadecandidatos_exam_metadata";
const BLOB_KEY_PREFIX = "consultadecandidatos_blob_";

interface ExamMetadata {
  exam: {
    id: string;
    name: string;
    sourceUrl: string;
    type: "exam" | "gabarito";
    mimeType: string;
    size: number;
    downloadedAt: string;
    blobKey: string;
  } | null;
  gabarito: {
    id: string;
    name: string;
    sourceUrl: string;
    type: "exam" | "gabarito";
    mimeType: string;
    size: number;
    downloadedAt: string;
    blobKey: string;
  } | null;
}

function generateBlobKey(): string {
  return `${BLOB_KEY_PREFIX}${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function saveFileToSession(file: DownloadedFile): void {
  const blobKey = generateBlobKey();
  const metadata = getMetadata();

  if (file.type === "exam") {
    metadata.exam = {
      id: file.id,
      name: file.name,
      sourceUrl: file.sourceUrl,
      type: file.type,
      mimeType: file.mimeType,
      size: file.size,
      downloadedAt: file.downloadedAt,
      blobKey,
    };
  } else {
    metadata.gabarito = {
      id: file.id,
      name: file.name,
      sourceUrl: file.sourceUrl,
      type: file.type,
      mimeType: file.mimeType,
      size: file.size,
      downloadedAt: file.downloadedAt,
      blobKey,
    };
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(metadata));
    sessionStorage.setItem(blobKey, file.objectUrl);
  } catch (e) {
    console.warn("Falha ao salvar metadados do arquivo em sessionStorage:", e);
  }
}

export function getDownloadedExam(): DownloadedFile | null {
  return getFileByType("exam");
}

export function getDownloadedGabarito(): DownloadedFile | null {
  return getFileByType("gabarito");
}

function getFileByType(type: "exam" | "gabarito"): DownloadedFile | null {
  const metadata = getMetadata();
  const fileMeta = type === "exam" ? metadata.exam : metadata.gabarito;
  if (!fileMeta) return null;

  const objectUrl = sessionStorage.getItem(fileMeta.blobKey);
  if (!objectUrl) return null;

  return {
    id: fileMeta.id,
    name: fileMeta.name,
    sourceUrl: fileMeta.sourceUrl,
    type: fileMeta.type,
    mimeType: fileMeta.mimeType,
    size: fileMeta.size,
    objectUrl,
    downloadedAt: fileMeta.downloadedAt,
  };
}

function getMetadata(): ExamMetadata {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ExamMetadata;
    }
  } catch {
    // ignore parse errors
  }
  return { exam: null, gabarito: null };
}

export function clearExamData(): void {
  const metadata = getMetadata();
  for (const key of [metadata.exam?.blobKey, metadata.gabarito?.blobKey]) {
    if (key) {
      const objectUrl = sessionStorage.getItem(key);
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      sessionStorage.removeItem(key);
    }
  }
  sessionStorage.removeItem(STORAGE_KEY);
}
