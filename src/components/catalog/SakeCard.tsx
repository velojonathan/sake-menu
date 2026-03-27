import Link from 'next/link';
import { SakeCardData } from '@/domain/catalog/types';
import { formatPrice } from '@/lib/utils';

interface SakeCardProps {
  sake: SakeCardData;
}

export default function SakeCard({ sake }: SakeCardProps) {
  return (
    <Link href={`/sake/${sake.slug}`} className="sake-card block p-4 active:scale-[0.98]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-charcoal text-sm leading-tight truncate">
            {sake.name}
          </h3>
          <p className="text-xs text-sake-500 mt-0.5 truncate">{sake.brewery}</p>
        </div>
        <span className="text-sm font-semibold text-sake-800 whitespace-nowrap">
          {formatPrice(sake.price)}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-3 text-xs text-sake-600">
        {sake.smv != null && (
          <>
            <span className="flex items-center gap-1">
              <span className="font-medium">SMV</span>
              <span className="text-charcoal font-semibold">
                {sake.smv > 0 ? `+${sake.smv}` : sake.smv}
              </span>
            </span>
            <span className="text-sake-200">|</span>
          </>
        )}
        <span className="flex items-center gap-1">
          <span className="font-medium">Acid</span>
          <span className="text-charcoal font-semibold">{sake.acidity}</span>
        </span>
        {sake.style && (
          <>
            <span className="text-sake-200">|</span>
            <span className="badge-style">{sake.style}</span>
          </>
        )}
      </div>

      {sake.flavorTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {sake.flavorTags.map((tag) => (
            <span key={tag} className="badge-flavor capitalize">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
