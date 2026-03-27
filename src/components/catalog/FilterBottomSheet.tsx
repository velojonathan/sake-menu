'use client';

import { useState, useEffect, useCallback } from 'react';
import { SakeFilters } from '@/domain/catalog/types';
import { FILTER_DEFAULTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SakeFilters;
  onApply: (filters: SakeFilters) => void;
  availableFlavors: string[];
}

export default function FilterBottomSheet({
  isOpen,
  onClose,
  filters,
  onApply,
  availableFlavors,
}: FilterBottomSheetProps) {
  const [draft, setDraft] = useState<SakeFilters>(filters);

  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, filters]);

  const updateDraft = useCallback((key: keyof SakeFilters, value: unknown) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleFlavor = useCallback((flavor: string) => {
    setDraft((prev) => {
      const current = prev.flavors || [];
      const updated = current.includes(flavor)
        ? current.filter((f) => f !== flavor)
        : [...current, flavor];
      return { ...prev, flavors: updated.length > 0 ? updated : undefined };
    });
  }, []);

  const handleReset = () => {
    setDraft({});
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const activeCount = [
    draft.smvMin !== undefined || draft.smvMax !== undefined,
    draft.acidityMin !== undefined || draft.acidityMax !== undefined,
    draft.priceMin !== undefined || draft.priceMax !== undefined,
    draft.flavors && draft.flavors.length > 0,
  ].filter(Boolean).length;

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
      <div className="bottom-sheet animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h2 className="font-headline text-2xl text-on-surface">Filter Selection</h2>
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
                const isSelected = draft.flavors?.includes(flavor);
                return (
                  <button
                    key={flavor}
                    onClick={() => toggleFlavor(flavor)}
                    className={cn(
                      'px-4 py-2 rounded-sm font-label text-[11px] uppercase tracking-wider transition-colors',
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
                ${draft.priceMin ?? FILTER_DEFAULTS.priceMin} &mdash; ${draft.priceMax ?? FILTER_DEFAULTS.priceMax}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min={FILTER_DEFAULTS.priceMin}
                max={FILTER_DEFAULTS.priceMax}
                step={5}
                value={draft.priceMin ?? FILTER_DEFAULTS.priceMin}
                onChange={(e) => updateDraft('priceMin', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={FILTER_DEFAULTS.priceMin}
                max={FILTER_DEFAULTS.priceMax}
                step={5}
                value={draft.priceMax ?? FILTER_DEFAULTS.priceMax}
                onChange={(e) => updateDraft('priceMax', parseFloat(e.target.value))}
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
                {(draft.smvMin ?? FILTER_DEFAULTS.smvMin) > 0 ? '+' : ''}{draft.smvMin ?? FILTER_DEFAULTS.smvMin}
                {' '}&mdash;{' '}
                {(draft.smvMax ?? FILTER_DEFAULTS.smvMax) > 0 ? '+' : ''}{draft.smvMax ?? FILTER_DEFAULTS.smvMax}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min={FILTER_DEFAULTS.smvMin}
                max={FILTER_DEFAULTS.smvMax}
                step={1}
                value={draft.smvMin ?? FILTER_DEFAULTS.smvMin}
                onChange={(e) => updateDraft('smvMin', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Minimum SMV"
              />
              <input
                type="range"
                min={FILTER_DEFAULTS.smvMin}
                max={FILTER_DEFAULTS.smvMax}
                step={1}
                value={draft.smvMax ?? FILTER_DEFAULTS.smvMax}
                onChange={(e) => updateDraft('smvMax', parseFloat(e.target.value))}
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
                {draft.acidityMin ?? FILTER_DEFAULTS.acidityMin} &mdash; {draft.acidityMax ?? FILTER_DEFAULTS.acidityMax}
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="range"
                min={FILTER_DEFAULTS.acidityMin}
                max={FILTER_DEFAULTS.acidityMax}
                step={0.1}
                value={draft.acidityMin ?? FILTER_DEFAULTS.acidityMin}
                onChange={(e) => updateDraft('acidityMin', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Minimum acidity"
              />
              <input
                type="range"
                min={FILTER_DEFAULTS.acidityMin}
                max={FILTER_DEFAULTS.acidityMax}
                step={0.1}
                value={draft.acidityMax ?? FILTER_DEFAULTS.acidityMax}
                onChange={(e) => updateDraft('acidityMax', parseFloat(e.target.value))}
                className="flex-1"
                aria-label="Maximum acidity"
              />
            </div>
          </div>
        </div>

        {/* Footer with Reset / Apply */}
        <div className="px-6 pb-8 pt-4 border-t border-outline-variant/10">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleReset} className="btn-secondary">
              Reset
            </button>
            <button onClick={handleApply} className="btn-primary">
              Apply Filters{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
