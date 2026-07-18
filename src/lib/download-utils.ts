import { DownloadedFile } from "../types/simulation";

export function validateUrl(url: string): string | null {
  if (!url || url.trim().length === 0) {
    return "O link não pode estar vazio.";
  }
  try {
    const parsed = new URL(url.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "O link deve começar com http:// ou https://.";
    }
    return null;
  } catch {
    return "Link inválido. Verifique a URL informada.";
  }
}

export function getFileNameFromUrl(url: string, type: "exam" | "gabarito"): string {
  const parsed = new URL(url);
  const pathSegments = parsed.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || "";
  if (lastSegment.includes(".")) {
    return decodeURIComponent(lastSegment);
  }
  const prefix = type === "exam" ? "prova" : "gabarito";
  const ext = guessExtension(parsed.pathname);
  return `${prefix}${ext}`;
}

function guessExtension(pathname: string): string {
  const ext = pathname.split(".").pop()?.toLowerCase();
  if (ext && ["pdf", "png", "jpg", "jpeg", "gif", "txt", "html", "docx"].includes(ext)) {
    return `.${ext}`;
  }
  return ".pdf";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function downloadFile(
  url: string,
  type: "exam" | "gabarito",
  signal?: AbortSignal
): Promise<DownloadedFile> {
  const trimmedUrl = url.trim();

  const response = await fetch(trimmedUrl, {
    mode: "cors",
    signal,
    headers: { Accept: "application/pdf,image/*,text/plain,text/html,*/*" },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText || "Erro ao acessar o link"}`);
  }

  const blob = await response.blob();
  const mimeType = blob.type || "application/octet-stream";
  const name = getFileNameFromUrl(trimmedUrl, type);

  const objectUrl = URL.createObjectURL(blob);

  return {
    id: `${type}_${Date.now()}`,
    name,
    sourceUrl: trimmedUrl,
    type,
    mimeType,
    size: blob.size,
    objectUrl,
    downloadedAt: new Date().toISOString(),
  };
}

export function revokeDownloadedFile(file: DownloadedFile): void {
  URL.revokeObjectURL(file.objectUrl);
}
