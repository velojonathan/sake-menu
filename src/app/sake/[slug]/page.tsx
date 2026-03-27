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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="text-sm text-sake-500 hover:text-sake-700 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to menu
          </Link>
        </nav>

        {/* Sake Detail Card */}
        <div className="bg-white rounded-2xl border border-sake-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-sake-50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">{sake.name}</h1>
                <p className="text-sake-500 mt-1">{sake.brewery}</p>
                {sake.region && (
                  <p className="text-sm text-sake-400 mt-0.5">{sake.region}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-sake-800">{formatPrice(sake.price)}</p>
                {sake.style && <span className="badge-style mt-1">{sake.style}</span>}
              </div>
            </div>

            {/* Flavor tags */}
            {flavorTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {flavorTags.map((tag) => (
                  <span key={tag} className="badge-flavor capitalize text-sm px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-sake-50 border-b border-sake-50">
            <StatItem label="SMV" value={sake.smv > 0 ? `+${sake.smv}` : String(sake.smv)} />
            <StatItem label="Acidity" value={String(sake.acidity)} />
            {sake.abv && <StatItem label="ABV" value={`${sake.abv}%`} />}
            {sake.polishRatio && (
              <StatItem label="Polish" value={formatPolishRatio(sake.polishRatio)} />
            )}
          </div>

          {/* Description & Details */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-sake-600 uppercase tracking-wide mb-2">
                Description
              </h2>
              <p className="text-charcoal leading-relaxed">{sake.description}</p>
            </div>

            {(sake.riceType || sake.polishRatio) && (
              <div>
                <h2 className="text-sm font-semibold text-sake-600 uppercase tracking-wide mb-2">
                  Details
                </h2>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {sake.riceType && (
                    <div>
                      <dt className="text-sake-400">Rice Type</dt>
                      <dd className="font-medium text-charcoal">{sake.riceType}</dd>
                    </div>
                  )}
                  {sake.polishRatio && (
                    <div>
                      <dt className="text-sake-400">Polish Ratio</dt>
                      <dd className="font-medium text-charcoal">
                        {formatPolishRatio(sake.polishRatio)}
                      </dd>
                    </div>
                  )}
                  {sake.abv && (
                    <div>
                      <dt className="text-sake-400">ABV</dt>
                      <dd className="font-medium text-charcoal">{sake.abv}%</dd>
                    </div>
                  )}
                  {sake.region && (
                    <div>
                      <dt className="text-sake-400">Region</dt>
                      <dd className="font-medium text-charcoal">{sake.region}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* SMV/Acidity quadrant indicator */}
            <div>
              <h2 className="text-sm font-semibold text-sake-600 uppercase tracking-wide mb-2">
                Taste Profile
              </h2>
              <div className="bg-sake-50 rounded-lg p-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sake-400">Sweet</span>
                      <span className="text-sake-400">Dry</span>
                    </div>
                    <div className="h-2 bg-sake-200 rounded-full relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sake-700 rounded-full border-2 border-white shadow"
                        style={{
                          left: `${Math.min(100, Math.max(0, ((sake.smv + 15) / 35) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sake-400">Mild</span>
                      <span className="text-sake-400">Sharp</span>
                    </div>
                    <div className="h-2 bg-sake-200 rounded-full relative">
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sake-700 rounded-full border-2 border-white shadow"
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
          <section className="mt-10">
            <h2 className="text-lg font-semibold text-charcoal mb-4">
              You Might Also Enjoy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    <div className="py-4 px-4 text-center">
      <p className="text-xs text-sake-400 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-charcoal mt-0.5">{value}</p>
    </div>
  );
}
