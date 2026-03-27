'use client';

import { useEffect, useCallback, useRef } from 'react';
import { SakeFilters } from '@/domain/catalog/types';
import { FILTER_DEFAULTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SakeFilters;
  onChange: (filters: SakeFilters) => void;
  filteredCount: number;
  availableFlavors: string[];
}

export default function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onChange,
  filteredCount,
  availableFlavors,
}: FilterBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const updateFilter = useCallback((key: keyof SakeFilters, value: unknown) => {
    onChange({ ...filters, [key]: value });
  }, [filters, onChange]);

  const toggleFlavor = useCallback((flavor: string) => {
    const current = filters.flavors || [];
    const updated = current.includes(flavor)
      ? current.filter((f) => f !== flavor)
      : [...current, flavor];
    onChange({ ...filters, flavors: updated.length > 0 ? updated : undefined });
  }, [filters, onChange]);

  const handleReset = () => {
    onChange({});
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="bottom-sheet-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div ref={sheetRef} className="bottom-sheet animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className="font-headline text-2xl text-on-surface">Filter Selection</h2>
            <p className="font-label text-[11px] text-outline mt-1">
              {filteredCount} selection{filteredCount !== 1 ? 's' : ''} match
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:opacity-70 transition-opacity active:scale-95"
            aria-label="Close filters"
          >
            <svg className="w-6 h-6 text-on-surface" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-px bg-outline-variant/20 mx-6" />

        {/* Content */}
        <div className="px-6 py-8 space-y-10 overflow-y-auto max-h-[60vh]">
          {/* Flavor Profile */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="label-sm">Flavor Profile</span>
              <span className="label-sm text-outline/60">Multi-select</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableFlavors.map((flavor) => {
                const isSelected = filters.flavors?.includes(flavor);
                return (
                  <button
                    key={flavor}
                    onClick={() => toggleFlavor(flavor)}
                    className={cn(
                      'px-4 py-2 rounded-full font-label text-[11px] uppercase tracking-wider transition-colors',
                      isSelected
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    )}
                  >
                    {flavor}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="label-sm">Price Point</span>
              <span className="font-headline text-lg text-on-surface">
                ${filters.priceMin ?? FILTER_DEFAULTS.priceMin} &mdash; ${filters.priceMax ?? FILTER_DEFAULTS.priceMax}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min={FILTER_DEFAULTS.priceMin}
                max={FILTER_DEFAULTS.priceMax}
                step={5}
                value={filters.priceMin ?? FILTER_DEFAULTS.priceMin}
                onChange={(e) => updateFilter('priceMin', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={FILTER_DEFAULTS.priceMin}
                max={FILTER_DEFAULTS.priceMax}
                step={5}
                value={filters.priceMax ?? FILTER_DEFAULTS.priceMax}
                onChange={(e) => updateFilter('priceMax', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Maximum price"
              />
            </div>
          </div>

          {/* SMV Range */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="label-sm">Sake Meter Value (SMV)</span>
              <span className="font-headline text-lg text-on-surface">
                {(filters.smvMin ?? FILTER_DEFAULTS.smvMin) > 0 ? '+' : ''}{filters.smvMin ?? FILTER_DEFAULTS.smvMin}
                {' '}&mdash;{' '}
                {(filters.smvMax ?? FILTER_DEFAULTS.smvMax) > 0 ? '+' : ''}{filters.smvMax ?? FILTER_DEFAULTS.smvMax}
              </span>
            </div>
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
            <div className="flex justify-between mt-2">
              <span className="label-sm text-outline/60">Sweet ({FILTER_DEFAULTS.smvMin})</span>
              <span className="label-sm text-outline/60">Neutral (0)</span>
              <span className="label-sm text-outline/60">Dry (+{FILTER_DEFAULTS.smvMax})</span>
            </div>
          </div>

          {/* Acidity Range */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="label-sm">Acidity Level</span>
              <span className="font-headline text-lg text-on-surface">
                {filters.acidityMin ?? FILTER_DEFAULTS.acidityMin} &mdash; {filters.acidityMax ?? FILTER_DEFAULTS.acidityMax}
              </span>
            </div>
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
          </div>
        </div>

        {/* Footer with Reset only (auto-filtering, no Apply needed) */}
        <div className="px-6 pb-8 pt-4 border-t border-outline-variant/10">
          <button onClick={handleReset} className="btn-secondary w-full">
            Reset All Filters
          </button>
        </div>
      </div>
    </>
  );
}
