import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { STUDIO_INFO } from '@/lib/constants';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: `${STUDIO_INFO.name} — Premium Graphic Design Studio | Flex Banners, Photoframes & CDPs`,
  description: `${STUDIO_INFO.subTagline} Services include Flex Designing, Bespoke Photoframes, Custom Display Pictures (CDPs), Social Media Posters, and High-End Color Restoration.`,
  keywords: [
    'Rakesh Designs',
    'Graphic Design Studio',
    'Flex Banner Design',
    'Custom Photo Frames',
    'CDP Design',
    'Birthday Poster Design',
    'Photo Retouching',
    'Telangana Graphic Designer',
    'Bespoke Visual Identity',
  ],
  authors: [{ name: STUDIO_INFO.name }],
  openGraph: {
    title: `${STUDIO_INFO.name} — Graphic Design & Visual Craft`,
    description: STUDIO_INFO.subTagline,
    url: 'https://rakeshdesigns.in',
    siteName: STUDIO_INFO.name,
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${syne.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-warm-ivory text-charcoal antialiased selection:bg-deep-forest selection:text-warm-ivory font-sans">
        {children}
      </body>
    </html>
  );
}
