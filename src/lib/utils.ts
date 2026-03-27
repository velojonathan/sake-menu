/** Generate a URL-friendly slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Format price as USD, or 'Market Price' if null */
export function formatPrice(price: number | null): string {
  if (price == null) return 'Market Price';
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
  sake1: { smv: number | null; acidity: number; price: number | null },
  sake2: { smv: number | null; acidity: number; price: number | null }
): number {
  const smvDiff = (sake1.smv != null && sake2.smv != null)
    ? Math.abs(sake1.smv - sake2.smv) / 35
    : 0.5; // moderate penalty when SMV unknown
  const acidityDiff = Math.abs(sake1.acidity - sake2.acidity) / 2.5;
  const priceDiff = (sake1.price != null && sake2.price != null)
    ? Math.abs(sake1.price - sake2.price) / 2500
    : 0.5;
  return 1 - (smvDiff + acidityDiff + priceDiff) / 3;
}
