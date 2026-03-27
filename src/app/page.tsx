import { getSakes, getAllFlavorTags } from '@/domain/catalog/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CatalogExplorer from '@/components/catalog/CatalogExplorer';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [sakes, flavorTags] = await Promise.all([
    getSakes(),
    getAllFlavorTags(),
  ]);

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-16">
        {/* Hero — minimal, refined */}
        <section className="pt-12 pb-8">
          <p className="label-sm text-outline mb-3">Curated Selection</p>
          <h1 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-on-surface leading-tight">
            Discover the<br />Soul of Rice
          </h1>
          <p className="mt-4 font-body text-sm text-on-surface-variant max-w-md leading-relaxed">
            A guided journey through Japan&apos;s finest expressions.
            Explore by flavor, sweetness, acidity, and more.
          </p>
        </section>

        {/* Catalog Explorer (client component with filters, chart, grid) */}
        <CatalogExplorer sakes={sakes} flavorTags={flavorTags} />
      </main>
      <Footer />
    </>
  );
}
