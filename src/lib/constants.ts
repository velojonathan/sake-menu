// Filter range constants derived from realistic sake data
export const FILTER_DEFAULTS = {
  smvMin: -15,
  smvMax: 20,
  acidityMin: 0.5,
  acidityMax: 3.0,
  priceMin: 0,
  priceMax: 100,
} as const;

export const FLAVOR_TAGS = [
  'floral',
  'fruity',
  'spicy',
  'earthy',
  'umami',
  'crisp',
  'rich',
  'sweet',
  'dry',
  'smooth',
] as const;

export const SAKE_STYLES = [
  'Junmai',
  'Junmai Ginjo',
  'Junmai Daiginjo',
  'Honjozo',
  'Ginjo',
  'Daiginjo',
  'Nigori',
  'Sparkling',
  'Nama',
  'Yamahai',
  'Kimoto',
  'Futsu-shu',
] as const;

export const PAGE_SIZE = 20;
