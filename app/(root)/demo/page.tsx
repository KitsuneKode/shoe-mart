import { ProductCard } from '@/components/ProductCard';

// Sample product data for demo
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
];

export default function DemoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Component Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          This page showcases the Navbar, ProductCard, and Footer components in
          action.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Compact Variant Demo */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Compact Product Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <ProductCard
              key={`compact-${product.id}`}
              product={product}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
