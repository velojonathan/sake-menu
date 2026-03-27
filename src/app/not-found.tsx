import Link from 'next/link';
import Header from '@/components/layout/Header';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-headline text-2xl text-on-surface mb-2">Page Not Found</h2>
          <p className="font-body text-sm text-outline mb-8">
            The sake you&apos;re looking for seems to have been finished.
          </p>
          <Link href="/" className="btn-primary">
            Back to Collection
          </Link>
        </div>
      </div>
    </>
  );
}
