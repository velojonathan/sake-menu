import Link from 'next/link';
import { SakeCardData } from '@/domain/catalog/types';
import { formatPrice } from '@/lib/utils';

interface SakeCardProps {
  sake: SakeCardData;
}

export default function SakeCard({ sake }: SakeCardProps) {
  return (
    <Link href={`/sake/${sake.slug}`} className="sake-card block p-6 active:scale-[0.99]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="title-md leading-tight truncate">
            {sake.name}
          </h3>
          <p className="text-sm text-on-surface-variant/70 mt-1 truncate">{sake.brewery}</p>
        </div>
        <span className="text-sm font-semibold text-on-surface whitespace-nowrap">
          {formatPrice(sake.price)}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        {sake.smv != null && (
          <span className="label-sm">
            SMV {sake.smv > 0 ? `+${sake.smv}` : sake.smv}
          </span>
        )}
        <span className="label-sm">
          Acid {sake.acidity}
        </span>
        {sake.style && (
          <span className="badge-style capitalize">{sake.style}</span>
        )}
      </div>

      {sake.flavorTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
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
