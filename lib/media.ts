import fs from "fs";
import path from "path";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export function getMediaImages(): string[] {
  const mediaDir = path.join(process.cwd(), "public", "media");

  if (!fs.existsSync(mediaDir)) {
    return [];
  }

  return fs
    .readdirSync(mediaDir)
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/media/${file}`);
}

export function pickMedia(images: string[], index: number): string | undefined {
  if (images.length === 0) return undefined;
  return images[index % images.length];
}
