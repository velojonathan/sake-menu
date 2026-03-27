import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sake-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="sake">
              🍶
            </span>
            <span className="font-semibold text-lg text-charcoal tracking-tight">
              Sake Menu
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-sake-600 hover:text-sake-900 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/#chart"
              className="text-sm text-sake-600 hover:text-sake-900 transition-colors"
            >
              Chart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
