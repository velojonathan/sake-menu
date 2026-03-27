import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSakeBySlug, getRelatedSakes } from '@/domain/catalog/queries';
import { toCardData } from '@/domain/catalog/filters';
import { formatPrice, formatPolishRatio } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SakeCard from '@/components/catalog/SakeCard';

interface SakeDetailPageProps {
  params: { slug: string };
}

export default async function SakeDetailPage({ params }: SakeDetailPageProps) {
  const sake = await getSakeBySlug(params.slug);

  if (!sake) {
    notFound();
  }

  const relatedSakes = await getRelatedSakes(sake.id, 4);
  const flavorTags = sake.flavorTags.map((ft) => ft.flavorTag.name);

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-16">
        {/* Back link */}
        <nav className="pt-8 mb-10">
          <Link
            href="/"
            className="label-sm text-tertiary flex items-center gap-1.5 hover:text-tertiary-container transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Collection
          </Link>
        </nav>

        {/* Editorial header */}
        <div className="mb-10">
          {sake.style && (
            <p className="label-sm text-outline mb-3">{sake.style}</p>
          )}
          <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            {sake.name}
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-2">
            {sake.brewery}{sake.region ? ` \u2022 ${sake.region}` : ''}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-px bg-outline-variant/10 mb-10">
          {sake.smv != null && (
            <div className="bg-surface py-5 text-center">
              <p className="label-sm text-outline mb-1">SMV</p>
              <p className="font-headline text-2xl text-on-surface">
                {sake.smv > 0 ? `+${sake.smv}` : String(sake.smv)}
              </p>
            </div>
          )}
          <div className="bg-surface py-5 text-center">
            <p className="label-sm text-outline mb-1">Acidity</p>
            <p className="font-headline text-2xl text-on-surface">{sake.acidity}</p>
          </div>
          <div className="bg-surface py-5 text-center">
            <p className="label-sm text-outline mb-1">Price</p>
            <p className="font-headline text-2xl text-on-surface">{formatPrice(sake.price)}</p>
          </div>
        </div>

        {/* Taste Profile visualization */}
        <div className="mb-10">
          <p className="label-sm text-outline mb-5">Flavor Architecture</p>
          <div className="space-y-5">
            {sake.smv != null && (
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">Sweet</span>
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">Dry</span>
                </div>
                <div className="h-[2px] bg-outline-variant/20 relative">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full"
                    style={{
                      left: `${Math.min(100, Math.max(0, ((sake.smv + 20) / 40) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            )}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">Light</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">Rich</span>
              </div>
              <div className="h-[2px] bg-outline-variant/20 relative">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full"
                  style={{
                    left: `${Math.min(100, Math.max(0, ((sake.acidity - 0.5) / 2.5) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tasting Notes */}
        <div className="mb-10">
          <p className="label-sm text-outline mb-4">Tasting Notes</p>
          <p className="font-body text-base text-on-surface leading-relaxed">
            {sake.description}
          </p>
        </div>

        {/* Flavor tags */}
        {flavorTags.length > 0 && (
          <div className="mb-10">
            <p className="label-sm text-outline mb-4">Flavor Profile</p>
            <div className="flex flex-wrap gap-2">
              {flavorTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-surface-container-high font-label text-[11px] uppercase tracking-wider text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        {(sake.riceType || sake.polishRatio || sake.abv) && (
          <div className="mb-10">
            <p className="label-sm text-outline mb-4">Details</p>
            <dl className="space-y-3">
              {sake.riceType && (
                <div className="flex justify-between items-baseline py-2 border-b border-outline-variant/10">
                  <dt className="font-label text-[10px] uppercase tracking-widest text-outline">Rice Type</dt>
                  <dd className="font-body text-sm text-on-surface">{sake.riceType}</dd>
                </div>
              )}
              {sake.polishRatio && (
                <div className="flex justify-between items-baseline py-2 border-b border-outline-variant/10">
                  <dt className="font-label text-[10px] uppercase tracking-widest text-outline">Polish Ratio</dt>
                  <dd className="font-body text-sm text-on-surface">{formatPolishRatio(sake.polishRatio)}</dd>
                </div>
              )}
              {sake.abv && (
                <div className="flex justify-between items-baseline py-2 border-b border-outline-variant/10">
                  <dt className="font-label text-[10px] uppercase tracking-widest text-outline">ABV</dt>
                  <dd className="font-body text-sm text-on-surface">{sake.abv}%</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {/* Related Sakes */}
        {relatedSakes.length > 0 && (
          <section className="mt-16 mb-16">
            <p className="label-sm text-outline mb-6">Similar Expressions</p>
            <div className="divide-y divide-outline-variant/10">
              {relatedSakes.map((related) => (
                <SakeCard key={related.id} sake={toCardData(related)} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
