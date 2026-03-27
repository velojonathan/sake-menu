export default function Footer() {
  return (
    <footer className="border-t border-sake-100 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍶</span>
            <span className="text-sm text-sake-500">
              Sake Menu &mdash; Explore our collection
            </span>
          </div>
          <p className="text-xs text-sake-400">
            Please drink responsibly. Must be 21+ to consume alcohol.
          </p>
        </div>
      </div>
    </footer>
  );
}
