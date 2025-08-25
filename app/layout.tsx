import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import './globals.css';

const jostSans = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Footwear Store',
  description: 'Premium footwear collection from top brands',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jostSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
