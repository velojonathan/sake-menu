import { SakeFilters, SakeWithTags, SakeCardData, ChartPoint } from './types';

/**
 * Apply client-side filters to sake data.
 * Used for filtering already-fetched data (e.g., after initial SSR load).
 */
export function filterSakes(
  sakes: SakeWithTags[],
  filters: SakeFilters
): SakeWithTags[] {
  return sakes.filter((sake) => {
    // Text search on name and brewery
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = sake.name.toLowerCase().includes(searchLower);
      const matchesBrewery = sake.brewery.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesBrewery) return false;
    }

    // SMV range (sakes with null smv are excluded when SMV filter is active)
    if (filters.smvMin !== undefined || filters.smvMax !== undefined) {
      if (sake.smv == null) return false;
      if (filters.smvMin !== undefined && sake.smv < filters.smvMin) return false;
      if (filters.smvMax !== undefined && sake.smv > filters.smvMax) return false;
    }

    // Acidity range
    if (filters.acidityMin !== undefined && sake.acidity < filters.acidityMin) return false;
    if (filters.acidityMax !== undefined && sake.acidity > filters.acidityMax) return false;

    // Price range (sakes with null price are excluded when price filter is active)
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      if (sake.price == null) return false;
      if (filters.priceMin !== undefined && sake.price < filters.priceMin) return false;
      if (filters.priceMax !== undefined && sake.price > filters.priceMax) return false;
    }

    // Flavor tags (multi-select: sake must have ALL selected tags)
    if (filters.flavors && filters.flavors.length > 0) {
      const sakeFlavors = sake.flavorTags.map((ft) => ft.flavorTag.name.toLowerCase());
      const allMatch = filters.flavors.every((f) => sakeFlavors.includes(f.toLowerCase()));
      if (!allMatch) return false;
    }

    return true;
  });
}

/** Convert SakeWithTags to card display data */
export function toCardData(sake: SakeWithTags): SakeCardData {
  return {
    id: sake.id,
    slug: sake.slug,
    name: sake.name,
    brewery: sake.brewery,
    region: sake.region,
    description: sake.description,
    smv: sake.smv,
    acidity: sake.acidity,
    price: sake.price,
    polishRatio: sake.polishRatio,
    style: sake.style,
    flavorTags: sake.flavorTags.map((ft) => ft.flavorTag.name),
  };
}

/** Convert SakeWithTags to chart point data. Returns null if smv is missing (can't plot). */
export function toChartPoint(sake: SakeWithTags): ChartPoint | null {
  if (sake.smv == null) return null;
  return {
    id: sake.id,
    slug: sake.slug,
    name: sake.name,
    brewery: sake.brewery,
    smv: sake.smv,
    acidity: sake.acidity,
    price: sake.price,
    style: sake.style,
  };
}

/** Parse filter params from URL search params */
export function parseFiltersFromParams(params: URLSearchParams): SakeFilters {
  const filters: SakeFilters = {};

  const search = params.get('search');
  if (search) filters.search = search;

  const smvMin = params.get('smvMin');
  if (smvMin) filters.smvMin = parseFloat(smvMin);

  const smvMax = params.get('smvMax');
  if (smvMax) filters.smvMax = parseFloat(smvMax);

  const acidityMin = params.get('acidityMin');
  if (acidityMin) filters.acidityMin = parseFloat(acidityMin);

  const acidityMax = params.get('acidityMax');
  if (acidityMax) filters.acidityMax = parseFloat(acidityMax);

  const priceMin = params.get('priceMin');
  if (priceMin) filters.priceMin = parseFloat(priceMin);

  const priceMax = params.get('priceMax');
  if (priceMax) filters.priceMax = parseFloat(priceMax);

  const flavors = params.get('flavors');
  if (flavors) filters.flavors = flavors.split(',').filter(Boolean);

  return filters;
}

/** Serialize filters to URL search params string */
export function filtersToParams(filters: SakeFilters): string {
  const params = new URLSearchParams();

  if (filters.search) params.set('search', filters.search);
  if (filters.smvMin !== undefined) params.set('smvMin', String(filters.smvMin));
  if (filters.smvMax !== undefined) params.set('smvMax', String(filters.smvMax));
  if (filters.acidityMin !== undefined) params.set('acidityMin', String(filters.acidityMin));
  if (filters.acidityMax !== undefined) params.set('acidityMax', String(filters.acidityMax));
  if (filters.priceMin !== undefined) params.set('priceMin', String(filters.priceMin));
  if (filters.priceMax !== undefined) params.set('priceMax', String(filters.priceMax));
  if (filters.flavors && filters.flavors.length > 0) params.set('flavors', filters.flavors.join(','));

  return params.toString();
}
