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
        {/* Hero — minimal, elegant, quick orientation */}
        <section className="pt-8 pb-6">
          <h1 className="font-headline text-2xl sm:text-3xl tracking-tight text-on-surface leading-tight">
            The Selection
          </h1>
          <p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed">
            A curated journey through Japan&apos;s finest sake, organized by prefecture.
          </p>
        </section>

        {/* Catalog Explorer (client component with filters, chart, grid) */}
        <CatalogExplorer sakes={sakes} flavorTags={flavorTags} />
      </main>
      <Footer />
    </>
  );
}
