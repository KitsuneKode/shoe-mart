import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import Image from 'next/image';

const jostSans = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Authentication - Footwear Store',
  description: 'Sign in or create your account to start shopping',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-yellow-500/10"></div>

        {/* Logo */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <h1 className="text-5xl font-bold text-white mb-6">Just Do It</h1>
          <p className="text-xl text-gray-300 max-w-md leading-relaxed">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>

          {/* Pagination Dots */}
          <div className="flex space-x-2 mt-12">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="absolute bottom-8 left-8 text-gray-400 text-sm">
          © 2024 Nike. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 lg:w-3/5 flex items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
