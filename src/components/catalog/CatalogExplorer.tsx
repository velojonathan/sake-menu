'use client';

import { Suspense } from 'react';
import { SakeWithTags } from '@/domain/catalog/types';
import { useFilters } from '@/hooks/useFilters';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
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
    totalCount,
    filteredCount,
  } = useFilters(sakes);

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar value={filters.search || ''} onChange={setSearch} />

      {/* Filters */}
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        availableFlavors={flavorTags}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-sake-500">
          Showing{' '}
          <span className="font-semibold text-charcoal">{filteredCount}</span> of{' '}
          <span className="font-semibold text-charcoal">{totalCount}</span> sakes
        </p>
      </div>

      {/* Chart */}
      <div id="chart">
        <SakeChart data={chartData} />
      </div>

      {/* Results Grid */}
      <SakeGrid sakes={cardData} />
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
    <div className="space-y-6">
      <div className="skeleton h-12 rounded-lg" />
      <div className="skeleton h-48 rounded-xl" />
      <div className="skeleton h-72 rounded-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
