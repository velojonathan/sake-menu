import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sake Menu | Explore Our Collection',
  description:
    'Discover our curated selection of premium Japanese sake. Explore by flavor, style, and taste profile.',
  openGraph: {
    title: 'Sake Menu',
    description: 'Explore our curated sake collection',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#fdfbf7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream antialiased">{children}</body>
    </html>
  );
}
