import { prisma } from '@/lib/db';
import { SakeFilters, SakeWithTags } from './types';

/** Fetch all sakes with their flavor tags, optionally filtered */
export async function getSakes(filters?: SakeFilters): Promise<SakeWithTags[]> {
  const where: Record<string, unknown> = {};

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { brewery: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters?.smvMin !== undefined || filters?.smvMax !== undefined) {
    where.smv = {};
    if (filters?.smvMin !== undefined) (where.smv as Record<string, number>).gte = filters.smvMin;
    if (filters?.smvMax !== undefined) (where.smv as Record<string, number>).lte = filters.smvMax;
  }

  if (filters?.acidityMin !== undefined || filters?.acidityMax !== undefined) {
    where.acidity = {};
    if (filters?.acidityMin !== undefined) (where.acidity as Record<string, number>).gte = filters.acidityMin;
    if (filters?.acidityMax !== undefined) (where.acidity as Record<string, number>).lte = filters.acidityMax;
  }

  if (filters?.priceMin !== undefined || filters?.priceMax !== undefined) {
    where.price = {};
    if (filters?.priceMin !== undefined) (where.price as Record<string, number>).gte = filters.priceMin;
    if (filters?.priceMax !== undefined) (where.price as Record<string, number>).lte = filters.priceMax;
  }

  if (filters?.flavors && filters.flavors.length > 0) {
    where.flavorTags = {
      some: {
        flavorTag: {
          name: { in: filters.flavors, mode: 'insensitive' },
        },
      },
    };
  }

  const sakes = await prisma.sake.findMany({
    where,
    include: {
      flavorTags: {
        include: {
          flavorTag: true,
        },
      },
    },
    orderBy: [{ name: 'asc' }],
  });

  return sakes;
}

/** Fetch a single sake by slug */
export async function getSakeBySlug(slug: string): Promise<SakeWithTags | null> {
  const sake = await prisma.sake.findUnique({
    where: { slug },
    include: {
      flavorTags: {
        include: {
          flavorTag: true,
        },
      },
    },
  });

  return sake;
}

/** Fetch related sakes based on flavor tag overlap and numeric similarity */
export async function getRelatedSakes(
  sakeId: string,
  limit: number = 4
): Promise<SakeWithTags[]> {
  // Get the current sake's flavor tags
  const currentSake = await prisma.sake.findUnique({
    where: { id: sakeId },
    include: {
      flavorTags: {
        include: { flavorTag: true },
      },
    },
  });

  if (!currentSake) return [];

  const tagNames = currentSake.flavorTags.map((ft: { flavorTag: { name: string } }) => ft.flavorTag.name);

  // Find sakes that share flavor tags, excluding the current one
  const related = await prisma.sake.findMany({
    where: {
      id: { not: sakeId },
      flavorTags: {
        some: {
          flavorTag: {
            name: { in: tagNames },
          },
        },
      },
    },
    include: {
      flavorTags: {
        include: { flavorTag: true },
      },
    },
    take: limit * 2, // fetch extra to sort by relevance
  });

  // Score by tag overlap + numeric similarity
  const scored = related.map((sake: SakeWithTags) => {
    const sharedTags = sake.flavorTags.filter((ft: { flavorTag: { name: string } }) =>
      tagNames.includes(ft.flavorTag.name)
    ).length;
    const smvDiff = (sake.smv != null && currentSake.smv != null)
      ? Math.abs(sake.smv - currentSake.smv) / 35
      : 0.5;
    const acidityDiff = Math.abs(sake.acidity - currentSake.acidity) / 2.5;
    const score = sharedTags * 2 - smvDiff - acidityDiff;
    return { sake, score };
  });

  scored.sort((a: { score: number }, b: { score: number }) => b.score - a.score);

  return scored.slice(0, limit).map((s: { sake: SakeWithTags }) => s.sake);
}

/** Get all unique flavor tag names */
export async function getAllFlavorTags(): Promise<string[]> {
  const tags = await prisma.flavorTag.findMany({
    orderBy: { name: 'asc' },
  });
  return tags.map((t: { name: string }) => t.name);
}
