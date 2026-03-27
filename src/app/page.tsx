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
      <main className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Hero — asymmetrical editorial spacing */}
        <section className="pt-16 pb-10 sm:pt-20 sm:pb-14">
          <h1 className="display-lg">
            Explore Our Sake Collection
          </h1>
          <p className="mt-4 text-base sm:text-lg text-on-surface-variant max-w-xl">
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
