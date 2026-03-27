/** Types for the catalog domain */

export interface SakeWithTags {
  id: string;
  slug: string;
  name: string;
  brewery: string;
  region: string | null;
  description: string;
  imageUrl: string | null;
  smv: number | null;
  acidity: number;
  price: number | null;
  riceType: string | null;
  polishRatio: number | null;
  style: string | null;
  abv: number | null;
  createdAt: Date;
  updatedAt: Date;
  flavorTags: {
    flavorTag: {
      id: string;
      name: string;
    };
  }[];
}

export interface SakeCardData {
  id: string;
  slug: string;
  name: string;
  brewery: string;
  smv: number | null;
  acidity: number;
  price: number | null;
  style: string | null;
  flavorTags: string[];
}

export interface SakeFilters {
  search?: string;
  smvMin?: number;
  smvMax?: number;
  acidityMin?: number;
  acidityMax?: number;
  priceMin?: number;
  priceMax?: number;
  flavors?: string[];
}

export interface ChartPoint {
  id: string;
  slug: string;
  name: string;
  brewery: string;
  smv: number;
  acidity: number;
  price: number | null;
  style: string | null;
}
