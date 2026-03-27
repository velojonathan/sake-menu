import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="font-semibold text-lg">
                🍶 Admin
              </Link>
              <nav className="flex items-center gap-4">
                <Link
                  href="/admin/sake"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Sake Catalog
                </Link>
                <Link
                  href="/admin/flavors"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Flavor Tags
                </Link>
              </nav>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← View Site
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
