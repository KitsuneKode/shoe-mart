'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

// Sample product data
const sampleProducts = [
  {
    id: '1',
    name: "Nike Air Force 1 Mid '07",
    brand: 'Nike',
    description: 'Classic basketball-inspired design',
    price: 98.3,
    imageUrl: '/shoes/shoe-1.jpg',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red'],
    inStock: true,
    isBestSeller: true,
    colorCount: 6,
  },
  {
    id: '2',
    name: 'Nike Court Vision Low Next Nature',
    brand: 'Nike',
    description: 'Sustainable basketball shoes',
    price: 98.3,
    imageUrl: '/shoes/shoe-2.webp',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Black', 'Blue'],
    inStock: true,
    discount: 20,
    colorCount: 4,
  },
  {
    id: '3',
    name: 'Nike Air Force 1 PLATFORM',
    brand: 'Nike',
    description: 'Elevated platform design',
    price: 98.3,
    imageUrl: '/shoes/shoe-3.webp',
    category: "Women's Shoes",
    sizes: ['6', '7', '8', '9', '10'],
    colors: ['White', 'Pink'],
    inStock: true,
    isSustainable: true,
    colorCount: 2,
  },
  {
    id: '4',
    name: 'Nike Dunk Low Retro',
    brand: 'Nike',
    description: 'Retro basketball design',
    price: 98.3,
    imageUrl: '/shoes/shoe-4.webp',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Yellow', 'Green'],
    inStock: true,
    isBestSeller: true,
    colorCount: 3,
  },
  {
    id: '5',
    name: 'Nike Air Max SYSTM',
    brand: 'Nike',
    description: 'Modern running shoes',
    price: 98.3,
    imageUrl: '/shoes/shoe-5.avif',
    category: "Men's Running",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Red'],
    inStock: true,
    discount: 20,
    colorCount: 4,
  },
  {
    id: '6',
    name: 'Nike Air Force 1 PLATFORM',
    brand: 'Nike',
    description: "Women's platform design",
    price: 98.3,
    imageUrl: '/shoes/shoe-6.avif',
    category: "Women's Shoes",
    sizes: ['6', '7', '8', '9'],
    colors: ['White', 'Pink'],
    inStock: true,
    isBestSeller: true,
    colorCount: 2,
  },
  {
    id: '7',
    name: 'Nike Dunk Low Retro SE',
    brand: 'Nike',
    description: 'Special edition retro design',
    price: 98.3,
    imageUrl: '/shoes/shoe-7.avif',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Beige'],
    inStock: true,
    discount: 20,
    colorCount: 1,
  },
  {
    id: '8',
    name: 'Nike Air Max 90 SE',
    brand: 'Nike',
    description: 'Special edition Air Max',
    price: 98.3,
    imageUrl: '/shoes/shoe-8.avif',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Beige', 'Orange', 'White'],
    inStock: true,
    isBestSeller: true,
    colorCount: 5,
  },
  {
    id: '9',
    name: 'Nike Legend Essential 3 Next Nature',
    brand: 'Nike',
    description: 'Sustainable training shoes',
    price: 98.3,
    imageUrl: '/shoes/shoe-9.avif',
    category: "Men's Training",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Dark Blue', 'Red'],
    inStock: true,
    discount: 10,
    colorCount: 3,
  },
  {
    id: '10',
    name: 'Nike SB Zoom Janoski OG+',
    brand: 'Nike',
    description: 'Skateboarding shoes',
    price: 98.3,
    imageUrl: '/shoes/shoe-10.avif',
    category: "Men's Skateboarding",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Light Blue', 'Beige', 'Red'],
    inStock: true,
    isBestSeller: true,
    colorCount: 4,
  },
  {
    id: '11',
    name: 'Jordan Series ES',
    brand: 'Nike',
    description: 'Jordan lifestyle shoes',
    price: 98.3,
    imageUrl: '/shoes/shoe-11.avif',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Olive Green'],
    inStock: true,
    isSustainable: true,
    colorCount: 2,
  },
  {
    id: '12',
    name: "Nike Blazer Low '77 Jumbo",
    brand: 'Nike',
    description: 'Classic blazer with jumbo swoosh',
    price: 98.3,
    imageUrl: '/shoes/shoe-12.avif',
    category: "Men's Shoes",
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Light Blue', 'Green'],
    inStock: true,
    discount: 20,
    colorCount: 3,
  },
];

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New</h1>
          <p className="text-gray-600 mt-1">500 products</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {showFilters ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Categories
              </h4>
              <div className="space-y-2">
                {['Low Top', 'High Top', 'Skateboarding', 'Nike By You'].map(
                  (category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Gender</h4>
              <div className="space-y-2">
                {['Men', 'Women', 'Unisex'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Shop By Price
              </h4>
              <div className="space-y-2">
                {['$25 - $50', '$50 - $100', '$100 - $150', 'Over $150'].map(
                  (range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {range}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Sports */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Sports</h4>
              <div className="space-y-2">
                {['Lifestyle', 'Skateboarding', 'Dance'].map((sport) => (
                  <label key={sport} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{sport}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
