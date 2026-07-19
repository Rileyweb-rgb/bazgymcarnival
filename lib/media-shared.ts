export function pickMedia(images: string[], index: number): string | undefined {
  if (images.length === 0) return undefined;
  return images[index % images.length];
}
