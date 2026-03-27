import { filterSakes, toCardData, toChartPoint, parseFiltersFromParams, filtersToParams } from '@/domain/catalog/filters';
import { SakeWithTags, SakeFilters } from '@/domain/catalog/types';

// Helper to create a mock sake
function makeSake(overrides: Partial<SakeWithTags> & { flavorNames?: string[] }): SakeWithTags {
  const { flavorNames = [], ...rest } = overrides;
  return {
    id: 'test-id',
    slug: 'test-slug',
    name: 'Test Sake',
    brewery: 'Test Brewery',
    region: 'Tokyo',
    description: 'A test sake',
    imageUrl: null,
    smv: 3,
    acidity: 1.2,
    price: 25,
    riceType: null,
    polishRatio: null,
    style: 'Junmai',
    abv: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    flavorTags: flavorNames.map((name) => ({
      flavorTag: { id: `tag-${name}`, name },
    })),
    ...rest,
  };
}

describe('filterSakes', () => {
  const sakes: SakeWithTags[] = [
    makeSake({ id: '1', name: 'Dassai 23', brewery: 'Asahi', smv: 4, acidity: 1.1, price: 45, flavorNames: ['floral', 'fruity'] }),
    makeSake({ id: '2', name: 'Hakkaisan', brewery: 'Hakkaisan Brewery', smv: 4, acidity: 1.0, price: 18, flavorNames: ['crisp', 'dry'] }),
    makeSake({ id: '3', name: 'Ozeki Nigori', brewery: 'Ozeki', smv: -12, acidity: 1.0, price: 14, flavorNames: ['sweet', 'rich'] }),
    makeSake({ id: '4', name: 'Suigei Tokubetsu', brewery: 'Suigei', smv: 7, acidity: 1.5, price: 20, flavorNames: ['crisp', 'dry'] }),
    makeSake({ id: '5', name: 'Daishichi Kimoto', brewery: 'Daishichi', smv: 2, acidity: 1.6, price: 27, flavorNames: ['umami', 'earthy', 'rich'] }),
  ];

  it('returns all sakes when no filters applied', () => {
    const result = filterSakes(sakes, {});
    expect(result).toHaveLength(5);
  });

  it('filters by search text (sake name)', () => {
    const result = filterSakes(sakes, { search: 'dassai' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Dassai 23');
  });

  it('filters by search text (brewery)', () => {
    const result = filterSakes(sakes, { search: 'ozeki' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Ozeki Nigori');
  });

  it('search is case-insensitive', () => {
    const result = filterSakes(sakes, { search: 'HAKKAISAN' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Hakkaisan');
  });

  it('filters by SMV minimum', () => {
    const result = filterSakes(sakes, { smvMin: 4 });
    expect(result).toHaveLength(3); // Dassai (4), Hakkaisan (4), Suigei (7)
    expect(result.every((s) => s.smv >= 4)).toBe(true);
  });

  it('filters by SMV maximum', () => {
    const result = filterSakes(sakes, { smvMax: 0 });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Ozeki Nigori');
  });

  it('filters by SMV range', () => {
    const result = filterSakes(sakes, { smvMin: 2, smvMax: 5 });
    expect(result).toHaveLength(3);
  });

  it('filters by acidity minimum', () => {
    const result = filterSakes(sakes, { acidityMin: 1.5 });
    expect(result).toHaveLength(2);
  });

  it('filters by acidity maximum', () => {
    const result = filterSakes(sakes, { acidityMax: 1.0 });
    expect(result).toHaveLength(2);
  });

  it('filters by price range', () => {
    const result = filterSakes(sakes, { priceMin: 20, priceMax: 30 });
    expect(result).toHaveLength(2);
  });

  it('filters by single flavor tag', () => {
    const result = filterSakes(sakes, { flavors: ['fruity'] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Dassai 23');
  });

  it('filters by multiple flavor tags (AND logic)', () => {
    const result = filterSakes(sakes, { flavors: ['umami', 'earthy'] });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Daishichi Kimoto');
  });

  it('returns empty when no sakes match flavors', () => {
    const result = filterSakes(sakes, { flavors: ['spicy'] });
    expect(result).toHaveLength(0);
  });

  it('combines multiple filter types', () => {
    const result = filterSakes(sakes, {
      smvMin: 0,
      acidityMax: 1.2,
      priceMax: 50,
    });
    expect(result).toHaveLength(2); // Dassai 23 and Hakkaisan
  });

  it('search + numeric filters combined', () => {
    const result = filterSakes(sakes, {
      search: 'sake',
      smvMin: 0,
    });
    // No sakes match "sake" in name or brewery
    expect(result).toHaveLength(0);
  });
});

describe('toCardData', () => {
  it('converts SakeWithTags to SakeCardData', () => {
    const sake = makeSake({
      id: 'x',
      slug: 'test',
      name: 'Test',
      brewery: 'Brew',
      smv: 3,
      acidity: 1.2,
      price: 20,
      style: 'Junmai',
      flavorNames: ['floral', 'fruity'],
    });

    const card = toCardData(sake);
    expect(card.id).toBe('x');
    expect(card.slug).toBe('test');
    expect(card.name).toBe('Test');
    expect(card.flavorTags).toEqual(['floral', 'fruity']);
    expect(card.style).toBe('Junmai');
  });
});

describe('toChartPoint', () => {
  it('converts SakeWithTags to ChartPoint', () => {
    const sake = makeSake({ id: 'c', slug: 'chart-test', smv: 5, acidity: 1.5, price: 30 });
    const point = toChartPoint(sake);
    expect(point.id).toBe('c');
    expect(point.smv).toBe(5);
    expect(point.acidity).toBe(1.5);
    expect(point.price).toBe(30);
  });
});

describe('parseFiltersFromParams / filtersToParams', () => {
  it('parses empty params to empty filters', () => {
    const params = new URLSearchParams('');
    const filters = parseFiltersFromParams(params);
    expect(filters).toEqual({});
  });

  it('parses search param', () => {
    const params = new URLSearchParams('search=dassai');
    const filters = parseFiltersFromParams(params);
    expect(filters.search).toBe('dassai');
  });

  it('parses numeric params', () => {
    const params = new URLSearchParams('smvMin=-5&smvMax=10&acidityMin=1.0&acidityMax=2.0&priceMin=10&priceMax=50');
    const filters = parseFiltersFromParams(params);
    expect(filters.smvMin).toBe(-5);
    expect(filters.smvMax).toBe(10);
    expect(filters.acidityMin).toBe(1.0);
    expect(filters.acidityMax).toBe(2.0);
    expect(filters.priceMin).toBe(10);
    expect(filters.priceMax).toBe(50);
  });

  it('parses comma-separated flavors', () => {
    const params = new URLSearchParams('flavors=floral,fruity,earthy');
    const filters = parseFiltersFromParams(params);
    expect(filters.flavors).toEqual(['floral', 'fruity', 'earthy']);
  });

  it('roundtrips filters through params', () => {
    const original: SakeFilters = {
      search: 'test',
      smvMin: -5,
      smvMax: 10,
      flavors: ['floral', 'fruity'],
    };

    const paramString = filtersToParams(original);
    const parsed = parseFiltersFromParams(new URLSearchParams(paramString));

    expect(parsed.search).toBe(original.search);
    expect(parsed.smvMin).toBe(original.smvMin);
    expect(parsed.smvMax).toBe(original.smvMax);
    expect(parsed.flavors).toEqual(original.flavors);
  });

  it('produces empty string for empty filters', () => {
    const result = filtersToParams({});
    expect(result).toBe('');
  });
});
