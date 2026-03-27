import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-24 bg-surface-container-low">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <Image
              src="/omakase-logo.png"
              alt="OMAKASE"
              width={80}
              height={22}
              className="h-5 w-auto object-contain opacity-60"
            />
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
