import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface-bright/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-xl font-semibold tracking-display text-on-surface">
              Sake Menu
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Explore
            </Link>
            <Link
              href="/#chart"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Chart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
