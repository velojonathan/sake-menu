/** Generate a URL-friendly slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Format price as USD */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/** Format polish ratio as percentage */
export function formatPolishRatio(ratio: number): string {
  return `${ratio}%`;
}

/** Combine class names (simple cn utility) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Calculate similarity score between two sakes based on numeric attributes */
export function calculateSimilarity(
  sake1: { smv: number; acidity: number; price: number },
  sake2: { smv: number; acidity: number; price: number }
): number {
  const smvDiff = Math.abs(sake1.smv - sake2.smv) / 35; // normalized over typical range
  const acidityDiff = Math.abs(sake1.acidity - sake2.acidity) / 2.5;
  const priceDiff = Math.abs(sake1.price - sake2.price) / 100;
  return 1 - (smvDiff + acidityDiff + priceDiff) / 3;
}
