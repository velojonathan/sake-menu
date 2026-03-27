'use client';

import { Suspense, useState } from 'react';
import { SakeWithTags } from '@/domain/catalog/types';
import { useFilters } from '@/hooks/useFilters';
import SearchBar from './SearchBar';
import FilterBottomSheet from './FilterBottomSheet';
import SakeChart from './SakeChart';
import SakeGrid from './SakeGrid';

interface CatalogExplorerProps {
  sakes: SakeWithTags[];
  flavorTags: string[];
}

function CatalogExplorerInner({ sakes, flavorTags }: CatalogExplorerProps) {
  const {
    filters,
    setFilters,
    setSearch,
    cardData,
    chartData,
    filteredCount,
  } = useFilters(sakes);

  const [showFilters, setShowFilters] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const activeFilterCount = [
    filters.smvMin !== undefined || filters.smvMax !== undefined,
    filters.acidityMin !== undefined || filters.acidityMax !== undefined,
    filters.priceMin !== undefined || filters.priceMax !== undefined,
    filters.flavors && filters.flavors.length > 0,
    !!filters.search,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Search */}
      <SearchBar value={filters.search || ''} onChange={setSearch} />

      {/* Filter + Chart toggle buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(true)}
          className="btn-secondary text-[10px] gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
          Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
        </button>
        <button
          onClick={() => setShowChart(!showChart)}
          className="btn-secondary text-[10px] gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          {showChart ? 'Hide Map' : 'Discovery Map'}
        </button>
      </div>

      {/* Filter bottom sheet (auto-filtering, no Apply button) */}
      <FilterBottomSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onChange={setFilters}
        filteredCount={filteredCount}
        availableFlavors={flavorTags}
      />

      {/* Results count + clear */}
      <div className="flex items-baseline justify-between">
        <p className="font-headline text-xl italic text-on-surface">
          The Selection
        </p>
        <div className="flex items-center gap-4">
          <span className="label-sm text-outline/60">
            {filteredCount} selection{filteredCount !== 1 ? 's' : ''} found
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setFilters({});
              }}
              className="label-sm text-tertiary hover:text-tertiary-container transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="h-px bg-outline-variant/20" />

      {/* Sake list (primary browsing experience) */}
      <SakeGrid sakes={cardData} />

      {/* Chart (secondary, below list) */}
      {showChart && (
        <div id="discovery" className="mt-12">
          <SakeChart data={chartData} />
        </div>
      )}
    </div>
  );
}

export default function CatalogExplorer(props: CatalogExplorerProps) {
  return (
    <Suspense fallback={<CatalogSkeleton />}>
      <CatalogExplorerInner {...props} />
    </Suspense>
  );
}

function CatalogSkeleton() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-12 rounded-sm" />
      <div className="skeleton h-10 rounded-sm w-48" />
      <div className="space-y-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-24 rounded-sm" />
        ))}
      </div>
    </div>
  );
}
