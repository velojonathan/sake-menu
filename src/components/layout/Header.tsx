import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface px-6 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-headline tracking-display text-sm uppercase text-primary">
          OMA
        </span>
        <span className="font-headline tracking-display text-sm uppercase text-primary">
          KASE
        </span>
      </Link>
      <div className="flex items-center gap-4">
        <Link
          href="/#discovery"
          className="hover:opacity-70 transition-opacity"
          aria-label="Discovery map"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
