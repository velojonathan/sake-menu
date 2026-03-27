'use client';

import { useState, useCallback } from 'react';
import { SakeCardData } from '@/domain/catalog/types';
import SakeCard from './SakeCard';

interface SakeGridProps {
  sakes: SakeCardData[];
}

/** Prefecture ordering from north to south */
const PREFECTURE_ORDER: string[] = [
  'Hokkaido',
  'Aomori',
  'Akita',
  'Iwate',
  'Miyagi',
  'Yamagata',
  'Fukushima',
  'Niigata',
  'Toyama',
  'Ishikawa',
  'Fukui',
  'Nagano',
  'Tochigi',
  'Hyogo',
  'Okayama',
  'Wakayama',
];

/** Group sakes by prefecture (region field), sorted north to south */
function groupByPrefecture(sakes: SakeCardData[]): [string, SakeCardData[]][] {
  const groups = new Map<string, SakeCardData[]>();
  for (const sake of sakes) {
    const key = sake.region || 'Other';
    const existing = groups.get(key) || [];
    existing.push(sake);
    groups.set(key, existing);
  }

  // Sort groups by prefecture order (north to south)
  const sorted: [string, SakeCardData[]][] = [];
  for (const pref of PREFECTURE_ORDER) {
    const items = groups.get(pref);
    if (items) {
      sorted.push([pref, items]);
      groups.delete(pref);
    }
  }
  // Any remaining prefectures not in the order list go at the end
  const remaining = Array.from(groups.entries());
  for (const entry of remaining) {
    sorted.push(entry);
  }

  return sorted;
}

function PrefectureSection({ prefecture, sakes }: { prefecture: string; sakes: SakeCardData[] }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-4 group"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-3">
          <h3 className="font-headline text-xl text-on-surface">{prefecture}</h3>
          <span className="label-sm text-outline/60">
            {sakes.length} selection{sakes.length !== 1 ? 's' : ''}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-outline transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="divide-y divide-outline-variant/15 pb-4">
          {sakes.map((sake) => (
            <SakeCard key={sake.id} sake={sake} />
          ))}
        </div>
      )}
      <div className="h-px bg-outline-variant/20" />
    </div>
  );
}

export default function SakeGrid({ sakes }: SakeGridProps) {
  if (sakes.length === 0) {
    return (
      <div className="text-center py-20 px-6">
        <h3 className="font-headline text-xl text-on-surface mb-2">No sakes found</h3>
        <p className="font-body text-sm text-outline">
          Try adjusting your filters or search to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  const grouped = groupByPrefecture(sakes);

  return (
    <div>
      {grouped.map(([prefecture, items]) => (
        <PrefectureSection key={prefecture} prefecture={prefecture} sakes={items} />
      ))}
    </div>
  );
}
