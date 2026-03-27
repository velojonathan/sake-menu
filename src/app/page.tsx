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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-8 sm:py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Explore Our Sake Collection
          </h1>
          <p className="mt-3 text-base sm:text-lg text-sake-500 max-w-2xl mx-auto">
            Discover the perfect sake for your palate. Browse by flavor profile,
            sweetness, acidity, and more.
          </p>
        </section>

        {/* Catalog Explorer (client component with filters, chart, grid) */}
        <CatalogExplorer sakes={sakes} flavorTags={flavorTags} />
      </main>
      <Footer />
    </>
  );
}
