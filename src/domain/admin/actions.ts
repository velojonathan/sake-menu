'use server';

import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

interface SakeFormData {
  name: string;
  brewery: string;
  region?: string;
  description: string;
  imageUrl?: string;
  smv?: number;
  acidity: number;
  price?: number;
  riceType?: string;
  polishRatio?: number;
  style?: string;
  abv?: number;
  flavorTagNames: string[];
}

/** Create a new sake record */
export async function createSake(data: SakeFormData) {
  const slug = slugify(`${data.name}-${data.brewery}`);

  // Ensure flavor tags exist
  const tagIds = await ensureFlavorTags(data.flavorTagNames);

  const sake = await prisma.sake.create({
    data: {
      slug,
      name: data.name,
      brewery: data.brewery,
      region: data.region || null,
      description: data.description,
      imageUrl: data.imageUrl || null,
      smv: data.smv ?? null,
      acidity: data.acidity,
      price: data.price ?? null,
      riceType: data.riceType || null,
      polishRatio: data.polishRatio || null,
      style: data.style || null,
      abv: data.abv || null,
      flavorTags: {
        create: tagIds.map((tagId) => ({
          flavorTagId: tagId,
        })),
      },
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/sake');
  return sake;
}

/** Update an existing sake record */
export async function updateSake(id: string, data: SakeFormData) {
  const slug = slugify(`${data.name}-${data.brewery}`);

  // Ensure flavor tags exist
  const tagIds = await ensureFlavorTags(data.flavorTagNames);

  // Remove existing tag associations
  await prisma.sakeFlavorTag.deleteMany({
    where: { sakeId: id },
  });

  const sake = await prisma.sake.update({
    where: { id },
    data: {
      slug,
      name: data.name,
      brewery: data.brewery,
      region: data.region || null,
      description: data.description,
      imageUrl: data.imageUrl || null,
      smv: data.smv ?? null,
      acidity: data.acidity,
      price: data.price ?? null,
      riceType: data.riceType || null,
      polishRatio: data.polishRatio || null,
      style: data.style || null,
      abv: data.abv || null,
      flavorTags: {
        create: tagIds.map((tagId) => ({
          flavorTagId: tagId,
        })),
      },
    },
  });

  revalidatePath('/');
  revalidatePath('/admin/sake');
  revalidatePath(`/sake/${sake.slug}`);
  return sake;
}

/** Delete a sake record */
export async function deleteSake(id: string) {
  await prisma.sake.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/admin/sake');
}

/** Ensure flavor tags exist and return their IDs */
async function ensureFlavorTags(names: string[]): Promise<string[]> {
  const ids: string[] = [];

  for (const name of names) {
    const tag = await prisma.flavorTag.upsert({
      where: { name: name.toLowerCase() },
      create: { name: name.toLowerCase() },
      update: {},
    });
    ids.push(tag.id);
  }

  return ids;
}
