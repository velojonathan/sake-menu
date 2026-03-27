import { SakeCardData } from '@/domain/catalog/types';
import SakeCard from './SakeCard';

interface SakeGridProps {
  sakes: SakeCardData[];
}

/** Group sakes by style category for tasting-menu presentation */
function groupByStyle(sakes: SakeCardData[]): Map<string, SakeCardData[]> {
  const groups = new Map<string, SakeCardData[]>();
  for (const sake of sakes) {
    const key = sake.style || 'other';
    const existing = groups.get(key) || [];
    existing.push(sake);
    groups.set(key, existing);
  }
  return groups;
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

  const grouped = groupByStyle(sakes);

  return (
    <div className="space-y-12">
      {Array.from(grouped.entries()).map(([style, items]) => (
        <div key={style}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-headline text-xl text-on-surface capitalize">{style}</h3>
            <span className="label-sm text-outline/60">{items.length} selection{items.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {items.map((sake) => (
              <SakeCard key={sake.id} sake={sake} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
