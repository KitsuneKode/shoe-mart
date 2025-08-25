import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar cartItemCount={2} />
      <main className="flex-1">{children}</main>
      <Footer location="Croatia" />
    </div>
  );
}
