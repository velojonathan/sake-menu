// Filter range constants derived from realistic sake data
export const FILTER_DEFAULTS = {
  smvMin: -20,
  smvMax: 20,
  acidityMin: 0.5,
  acidityMax: 3.0,
  priceMin: 0,
  priceMax: 2500,
} as const;

export const FLAVOR_TAGS = [
  'complex',
  'creamy',
  'crisp',
  'dry',
  'earthy',
  'floral',
  'fruity',
  'light',
  'rice-forward',
  'rich',
  'smooth',
  'sweet',
  'umami',
] as const;

export const SAKE_STYLES = [
  'junmai',
  'junmai ginjo',
  'junmai daiginjo',
  'honjozo',
  'ginjo',
  'daiginjo',
  'nigori',
  'sparkling',
  'genshu',
  'other',
] as const;

export const PAGE_SIZE = 20;
