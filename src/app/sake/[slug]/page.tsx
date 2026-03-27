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
      <main className="max-w-4xl mx-auto px-8 sm:px-10 lg:px-12 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/"
            className="btn-tertiary text-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to menu
          </Link>
        </nav>

        {/* Sake Detail Card */}
        <div className="bg-surface-container-lowest rounded-sm shadow-ambient overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface tracking-display">{sake.name}</h1>
                <p className="text-on-surface-variant mt-1.5">{sake.brewery}</p>
                {sake.region && (
                  <p className="text-sm text-on-surface-variant/60 mt-0.5">{sake.region}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-on-surface">{formatPrice(sake.price)}</p>
                {sake.style && <span className="badge-style mt-1">{sake.style}</span>}
              </div>
            </div>

            {/* Flavor tags */}
            {flavorTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {flavorTags.map((tag) => (
                  <span key={tag} className="badge-flavor capitalize text-sm px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats Grid — no borders, use background shift */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-surface-container-low">
            {sake.smv != null && (
              <StatItem label="SMV" value={sake.smv > 0 ? `+${sake.smv}` : String(sake.smv)} />
            )}
            <StatItem label="Acidity" value={String(sake.acidity)} />
            {sake.abv && <StatItem label="ABV" value={`${sake.abv}%`} />}
            {sake.polishRatio && (
              <StatItem label="Polish" value={formatPolishRatio(sake.polishRatio)} />
            )}
          </div>

          {/* Description & Details */}
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="label-sm mb-3">
                Description
              </h2>
              <p className="text-on-surface leading-relaxed">{sake.description}</p>
            </div>

            {(sake.riceType || sake.polishRatio) && (
              <div>
                <h2 className="label-sm mb-3">
                  Details
                </h2>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  {sake.riceType && (
                    <div>
                      <dt className="text-on-surface-variant/60">Rice Type</dt>
                      <dd className="font-medium text-on-surface mt-0.5">{sake.riceType}</dd>
                    </div>
                  )}
                  {sake.polishRatio && (
                    <div>
                      <dt className="text-on-surface-variant/60">Polish Ratio</dt>
                      <dd className="font-medium text-on-surface mt-0.5">
                        {formatPolishRatio(sake.polishRatio)}
                      </dd>
                    </div>
                  )}
                  {sake.abv && (
                    <div>
                      <dt className="text-on-surface-variant/60">ABV</dt>
                      <dd className="font-medium text-on-surface mt-0.5">{sake.abv}%</dd>
                    </div>
                  )}
                  {sake.region && (
                    <div>
                      <dt className="text-on-surface-variant/60">Region</dt>
                      <dd className="font-medium text-on-surface mt-0.5">{sake.region}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* SMV/Acidity quadrant indicator */}
            <div>
              <h2 className="label-sm mb-3">
                Taste Profile
              </h2>
              <div className="bg-surface-container-low rounded-sm p-5">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-on-surface-variant/60 text-xs">Sweet</span>
                      <span className="text-on-surface-variant/60 text-xs">Dry</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full relative">
                      {sake.smv != null && (
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full"
                          style={{
                            left: `${Math.min(100, Math.max(0, ((sake.smv + 20) / 40) * 100))}%`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-on-surface-variant/60 text-xs">Mild</span>
                      <span className="text-on-surface-variant/60 text-xs">Sharp</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full relative">
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
            </div>
          </div>
        </div>

        {/* Related Sakes */}
        {relatedSakes.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-xl font-medium text-on-surface tracking-display mb-6">
              You Might Also Enjoy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5 px-4 text-center">
      <p className="label-sm">{label}</p>
      <p className="text-lg font-semibold text-on-surface mt-1">{value}</p>
    </div>
  );
}
