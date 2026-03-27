import Link from 'next/link';
import { SakeCardData } from '@/domain/catalog/types';
import { formatPrice } from '@/lib/utils';

interface SakeCardProps {
  sake: SakeCardData;
}

export default function SakeCard({ sake }: SakeCardProps) {
  const styleLabel = sake.style ? sake.style.toUpperCase() : '';
  const flavorLabel = sake.flavorTags.length > 0
    ? sake.flavorTags.map((t) => t.toUpperCase()).join(' \u00B7 ')
    : '';
  const metaLine = [styleLabel, flavorLabel].filter(Boolean).join(' \u00B7 ');

  return (
    <Link href={`/sake/${sake.slug}`} className="sake-card group block">
      <div className="flex-1 min-w-0">
        <h3 className="font-headline text-lg text-on-surface leading-tight">
          {sake.name}
        </h3>
        {metaLine && (
          <p className="font-label text-[10px] uppercase tracking-widest text-outline mt-1 leading-relaxed">
            {metaLine}
          </p>
        )}
      </div>
      <span className="font-headline text-base text-on-surface whitespace-nowrap ml-4">
        {formatPrice(sake.price)}
      </span>
    </Link>
  );
}
