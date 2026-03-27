export default function Footer() {
  return (
    <footer className="bg-surface-container-low mt-24">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <span className="font-serif text-lg font-medium text-on-surface tracking-display">
              Sake Menu
            </span>
            <p className="body-md mt-1">Explore our curated collection</p>
          </div>
          <p className="text-xs text-on-surface-variant/60">
            Please drink responsibly. Must be 21+ to consume alcohol.
          </p>
        </div>
      </div>
    </footer>
  );
}
