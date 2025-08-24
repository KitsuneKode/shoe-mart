'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartItemCount?: number;
}

export function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: '/men', label: 'Men' },
    { href: '/women', label: 'Women' },
    { href: '/kids', label: 'Kids' },
    { href: '/collections', label: 'Collections' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* Nike Swoosh Logo - using a simple SVG representation */}
              <svg
                className="h-8 w-8 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="Nike Logo"
              >
                <path d="M21.5 4.5c-1.5-1.5-3.5-2.5-5.5-2.5s-4 1-5.5 2.5L9 7l-2-2.5C5.5 3 3.5 2 1.5 2S-1 3.5-1 5.5s1 4 2.5 5.5L3 12l2.5 2.5c1.5 1.5 3.5 2.5 5.5 2.5s4-1 5.5-2.5L15 12l2.5-2.5c1.5-1.5 2.5-3.5 2.5-5.5s-1-4-2.5-5.5z" />
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Search</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">My Cart</span>
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-900 hover:text-gray-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Search and Cart */}
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start relative"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  My Cart
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="ml-2 h-5 w-5 flex items-center justify-center text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
