'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { SakeFilters } from '@/domain/catalog/types';
import { SakeWithTags } from '@/domain/catalog/types';
import { filterSakes, toCardData, toChartPoint } from '@/domain/catalog/filters';
import { parseFiltersFromParams, filtersToParams } from '@/domain/catalog/filters';

export function useFilters(allSakes: SakeWithTags[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFiltersState] = useState<SakeFilters>(() =>
    parseFiltersFromParams(searchParams)
  );

  const setFilters = useCallback(
    (newFilters: SakeFilters) => {
      setFiltersState(newFilters);
      const params = filtersToParams(newFilters);
      const newUrl = params ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [router, pathname]
  );

  const setSearch = useCallback(
    (search: string) => {
      setFilters({ ...filters, search: search || undefined });
    },
    [filters, setFilters]
  );

  const filteredSakes = useMemo(() => filterSakes(allSakes, filters), [allSakes, filters]);

  const cardData = useMemo(() => filteredSakes.map(toCardData), [filteredSakes]);

  const chartData = useMemo(
    () => filteredSakes.map(toChartPoint).filter((p): p is NonNullable<typeof p> => p != null),
    [filteredSakes]
  );

  return {
    filters,
    setFilters,
    setSearch,
    filteredSakes,
    cardData,
    chartData,
    totalCount: allSakes.length,
    filteredCount: filteredSakes.length,
  };
}
