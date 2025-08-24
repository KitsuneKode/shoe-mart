import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';

// Sample product data for demo
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
    name: 'Air Jordan 1 Retro High',
    brand: 'Nike',
    description:
      'The Air Jordan 1 Retro High features a classic design with premium leather construction.',
    price: 170.0,
    imageUrl:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    category: 'Basketball',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black/Red', 'White/Black', 'Blue'],
    inStock: true,
    isBestSeller: false,
    colorCount: 3,
  },
  {
    id: '3',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    description:
      'The adidas Ultraboost 22 features responsive Boost midsole technology.',
    price: 190.0,
    imageUrl:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    category: 'Running',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue'],
    inStock: true,
    isBestSeller: false,
    colorCount: 3,
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar cartItemCount={2} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Component Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing the responsive Navbar, ProductCard, and Footer components
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Compact Variant Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Compact Product Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleProducts.map((product) => (
              <ProductCard
                key={`compact-${product.id}`}
                product={product}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer location="Croatia" />
    </div>
  );
}


