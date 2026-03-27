import Link from 'next/link';
import { SakeCardData } from '@/domain/catalog/types';
import { formatPrice, formatPolishRatio } from '@/lib/utils';

interface SakeCardProps {
  sake: SakeCardData;
  /** When true, show a compact version (used in related sakes) */
  compact?: boolean;
}

export default function SakeCard({ sake, compact }: SakeCardProps) {
  if (compact) {
    return (
      <Link href={`/sake/${sake.slug}`} className="sake-card group block">
        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-lg text-on-surface leading-tight">
            {sake.name}
          </h3>
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1">
            {sake.brewery}
          </p>
        </div>
        <span className="font-headline text-base text-on-surface whitespace-nowrap ml-4">
          {formatPrice(sake.price)}
        </span>
      </Link>
    );
  }

  return (
    <Link href={`/sake/${sake.slug}`} className="sake-card-full group block">
      {/* Brewery label */}
      <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">
        {sake.brewery}
      </p>

      {/* Sake name */}
      <h3 className="font-headline text-2xl sm:text-[1.7rem] text-on-surface leading-tight mb-3">
        {sake.name}
      </h3>

      {/* Tasting note */}
      <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-2">
        {sake.description}
      </p>

      {/* Bottom row: SMV, Polishing, Price */}
      <div className="flex items-baseline gap-6">
        {sake.smv != null && (
          <div>
            <span className="font-label text-[9px] uppercase tracking-widest text-outline">SMV</span>
            <p className="font-headline text-base text-on-surface">
              {sake.smv > 0 ? `+${sake.smv}` : sake.smv === 0 ? '\u00B10' : String(sake.smv)}
            </p>
          </div>
        )}
        {sake.polishRatio != null && (
          <div>
            <span className="font-label text-[9px] uppercase tracking-widest text-outline">Polishing</span>
            <p className="font-headline text-base text-on-surface">{formatPolishRatio(sake.polishRatio)}</p>
          </div>
        )}
        <div className="ml-auto">
          <span className="font-headline text-base text-on-surface">{formatPrice(sake.price)}</span>
        </div>
      </div>
    </Link>
  );
}
