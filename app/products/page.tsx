'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

// Sample product data for the listing
const sampleProducts = [
  {
    id: '1',
    name: "Air Force 1 Mid '07",
    brand: 'Nike',
    description:
      "The Nike Air Force 1 Mid '07 features a classic design with premium leather construction.",
    price: 98.3,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black', 'Blue'],
    inStock: true,
    isBestSeller: true,
    colorCount: 6,
  },
  {
    id: '2',
    name: 'Court Vision Low Next Nature',
    brand: 'Nike',
    description: 'Sustainable design meets classic style.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Blue', 'White'],
    inStock: true,
    discount: 20,
    colorCount: 4,
  },
  {
    id: '3',
    name: 'Air Force 1 PLATFORM',
    brand: 'Nike',
    description: 'Elevated style with sustainable materials.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    category: "Women's Shoes",
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['Grey/Green', 'White/Pink'],
    inStock: true,
    isSustainable: true,
    colorCount: 2,
  },
  {
    id: '4',
    name: 'Dunk Low Retro',
    brand: 'Nike',
    description: 'Classic basketball heritage with modern comfort.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Yellow/Green', 'Black/White'],
    inStock: true,
    isBestSeller: true,
    colorCount: 4,
  },
  {
    id: '5',
    name: 'Air Max SYSTM',
    brand: 'Nike',
    description: 'Maximum comfort with iconic Air technology.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White/Red', 'Black'],
    inStock: true,
    discount: 20,
    colorCount: 3,
  },
  {
    id: '6',
    name: 'Air Force 1 PLATFORM',
    brand: 'Nike',
    description: 'Elevated platform design for women.',
    price: 98.3,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: "Women's Shoes",
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White/Pink', 'Black'],
    inStock: true,
    isBestSeller: true,
    colorCount: 3,
  },
  {
    id: '7',
    name: 'Dunk Low Retro SE',
    brand: 'Nike',
    description: 'Special edition with premium materials.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Beige', 'Brown'],
    inStock: true,
    discount: 20,
    colorCount: 2,
  },
  {
    id: '8',
    name: 'Air Max 90 SE',
    brand: 'Nike',
    description: 'Special edition with enhanced comfort.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Beige/Orange', 'White'],
    inStock: true,
    isBestSeller: true,
    colorCount: 3,
  },
  {
    id: '9',
    name: 'Legend Essential 3 Next Nature',
    brand: 'Nike',
    description: 'Sustainable training shoes for performance.',
    price: 98.3,
    imageUrl:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    category: "Men's Training Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Dark Blue/Red', 'Black'],
    inStock: true,
    discount: 10,
    colorCount: 2,
  },
];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar cartItemCount={2} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">New (500)</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {sortBy}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden'
            } sm:block`}
          >
            <div className="space-y-6">
              {/* Shoe Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shoe Type
                </h3>
                <div className="space-y-2">
                  {['Low Top', 'High Top', 'Skateboarding', 'Nike By You'].map(
                    (type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Gender
                </h3>
                <div className="space-y-2">
                  {['Men', 'Women', 'Unisex'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kids */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Kids
                </h3>
                <div className="space-y-2">
                  {['Boys', 'Girls'].map((kid) => (
                    <label key={kid} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{kid}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shop By Price */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Shop By Price
                </h3>
                <div className="space-y-2">
                  {['$25 - $50', '$50 - $100', '$100 - $150', 'Over $150'].map(
                    (price) => (
                      <label key={price} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-700">{price}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Sports */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Sports
                </h3>
                <div className="space-y-2">
                  {['Lifestyle', 'Skateboarding', 'Dance'].map((sport) => (
                    <label key={sport} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{sport}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer location="Croatia" />
    </div>
  );
}


