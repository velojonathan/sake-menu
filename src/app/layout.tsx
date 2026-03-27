import type { Metadata, Viewport } from 'next';
import { Noto_Serif, Manrope } from 'next/font/google';
import './globals.css';

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

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
  themeColor: '#fcf9f3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-surface text-on-surface font-sans antialiased">{children}</body>
    </html>
  );
}
