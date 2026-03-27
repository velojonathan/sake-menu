import { SakeCardData } from '@/domain/catalog/types';
import SakeCard from './SakeCard';

interface SakeGridProps {
  sakes: SakeCardData[];
}

export default function SakeGrid({ sakes }: SakeGridProps) {
  if (sakes.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-4xl mb-3">🍶</div>
        <h3 className="text-sm font-medium text-charcoal mb-1">No sakes found</h3>
        <p className="text-xs text-sake-500">
          Try adjusting your filters or search to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sakes.map((sake) => (
        <SakeCard key={sake.id} sake={sake} />
      ))}
    </div>
  );
}
