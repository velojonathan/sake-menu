export default function Footer() {
  return (
    <footer className="mt-24 border-t border-outline-variant/10">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <span className="font-headline text-sm uppercase tracking-widest text-primary">
              OMAKASE
            </span>
            <p className="font-body text-xs text-outline mt-2">Curated sake collection</p>
          </div>
          <p className="font-label text-[10px] uppercase tracking-widest text-outline/60">
            Please drink responsibly
          </p>
        </div>
      </div>
    </footer>
  );
}
