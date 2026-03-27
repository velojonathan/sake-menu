'use client';

import { useState } from 'react';
import { SakeFilters } from '@/domain/catalog/types';
import { FILTER_DEFAULTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: SakeFilters;
  onFiltersChange: (filters: SakeFilters) => void;
  availableFlavors: string[];
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  availableFlavors,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof SakeFilters, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleFlavor = (flavor: string) => {
    const current = filters.flavors || [];
    const updated = current.includes(flavor)
      ? current.filter((f) => f !== flavor)
      : [...current, flavor];
    updateFilter('flavors', updated.length > 0 ? updated : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters =
    filters.smvMin !== undefined ||
    filters.smvMax !== undefined ||
    filters.acidityMin !== undefined ||
    filters.acidityMax !== undefined ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    (filters.flavors && filters.flavors.length > 0);

  return (
    <div className="filter-section">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between sm:hidden"
        aria-expanded={isExpanded}
      >
        <span className="font-medium text-sm text-charcoal flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="bg-sake-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </span>
        <svg
          className={cn('w-5 h-5 transition-transform', isExpanded && 'rotate-180')}
          fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Filter content */}
      <div className={cn('mt-4 sm:mt-0 space-y-5', !isExpanded && 'hidden sm:block')}>
        {/* SMV Range */}
        <div>
          <label className="block text-xs font-medium text-sake-600 mb-2">
            SMV (Sake Meter Value): {filters.smvMin ?? FILTER_DEFAULTS.smvMin} to{' '}
            {filters.smvMax ?? FILTER_DEFAULTS.smvMax}
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={FILTER_DEFAULTS.smvMin}
              max={FILTER_DEFAULTS.smvMax}
              step={1}
              value={filters.smvMin ?? FILTER_DEFAULTS.smvMin}
              onChange={(e) => updateFilter('smvMin', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Minimum SMV"
            />
            <input
              type="range"
              min={FILTER_DEFAULTS.smvMin}
              max={FILTER_DEFAULTS.smvMax}
              step={1}
              value={filters.smvMax ?? FILTER_DEFAULTS.smvMax}
              onChange={(e) => updateFilter('smvMax', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Maximum SMV"
            />
          </div>
          <div className="flex justify-between text-xs text-sake-400 mt-1">
            <span>Sweet ({FILTER_DEFAULTS.smvMin})</span>
            <span>Dry (+{FILTER_DEFAULTS.smvMax})</span>
          </div>
        </div>

        {/* Acidity Range */}
        <div>
          <label className="block text-xs font-medium text-sake-600 mb-2">
            Acidity: {filters.acidityMin ?? FILTER_DEFAULTS.acidityMin} to{' '}
            {filters.acidityMax ?? FILTER_DEFAULTS.acidityMax}
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={FILTER_DEFAULTS.acidityMin}
              max={FILTER_DEFAULTS.acidityMax}
              step={0.1}
              value={filters.acidityMin ?? FILTER_DEFAULTS.acidityMin}
              onChange={(e) => updateFilter('acidityMin', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Minimum acidity"
            />
            <input
              type="range"
              min={FILTER_DEFAULTS.acidityMin}
              max={FILTER_DEFAULTS.acidityMax}
              step={0.1}
              value={filters.acidityMax ?? FILTER_DEFAULTS.acidityMax}
              onChange={(e) => updateFilter('acidityMax', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Maximum acidity"
            />
          </div>
          <div className="flex justify-between text-xs text-sake-400 mt-1">
            <span>Mild ({FILTER_DEFAULTS.acidityMin})</span>
            <span>Sharp ({FILTER_DEFAULTS.acidityMax})</span>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-medium text-sake-600 mb-2">
            Price: ${filters.priceMin ?? FILTER_DEFAULTS.priceMin} &ndash; $
            {filters.priceMax ?? FILTER_DEFAULTS.priceMax}
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="range"
              min={FILTER_DEFAULTS.priceMin}
              max={FILTER_DEFAULTS.priceMax}
              step={1}
              value={filters.priceMin ?? FILTER_DEFAULTS.priceMin}
              onChange={(e) => updateFilter('priceMin', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={FILTER_DEFAULTS.priceMin}
              max={FILTER_DEFAULTS.priceMax}
              step={1}
              value={filters.priceMax ?? FILTER_DEFAULTS.priceMax}
              onChange={(e) => updateFilter('priceMax', parseFloat(e.target.value))}
              className="flex-1"
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* Flavor Tags */}
        <div>
          <label className="block text-xs font-medium text-sake-600 mb-2">
            Flavor Profile
          </label>
          <div className="flex flex-wrap gap-2">
            {availableFlavors.map((flavor) => {
              const isSelected = filters.flavors?.includes(flavor);
              return (
                <button
                  key={flavor}
                  onClick={() => toggleFlavor(flavor)}
                  className={cn(
                    'badge transition-colors capitalize',
                    isSelected
                      ? 'bg-sake-700 text-white'
                      : 'bg-sake-50 text-sake-600 hover:bg-sake-100'
                  )}
                >
                  {flavor}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-sake-500 hover:text-sake-700 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
