import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🍶</div>
          <h2 className="text-2xl font-bold text-charcoal mb-2">Page Not Found</h2>
          <p className="text-sake-500 mb-6">
            The sake you&apos;re looking for seems to have been finished.
          </p>
          <Link href="/" className="btn-primary">
            Back to Menu
          </Link>
        </div>
      </div>
    </>
  );
}
