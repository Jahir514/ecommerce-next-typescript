// src/utils/getImageUrl.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return "";
  // Ensure no double slashes
  return `${API_URL.replace(/\/$/, "")}${
    imagePath.startsWith("/") ? imagePath : "/" + imagePath
  }`;
}
