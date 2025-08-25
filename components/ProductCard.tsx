import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isBestSeller?: boolean;
  colorCount?: number;
  discount?: number;
  isSustainable?: boolean;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export function ProductCard({
  product,
  variant = 'default',
}: ProductCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white cursor-pointer p-0 rounded-sm hover:border-gray-500 h-full">
      <CardHeader className="p-0 relative">
        <div className={`relative ${isCompact ? 'h-56' : 'h-72'} bg-gray-50`}>
          <Image
            src={product.imageUrl || '/shoes/shoe-1.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 33vw"
          />

          {/* Best Seller Badge */}
          {product.isBestSeller && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Best Seller
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Extra {product.discount}% off
              </Badge>
            </div>
          )}

          {/* Sustainable Materials Badge */}
          {product.isSustainable && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Sustainable Materials
              </Badge>
            </div>
          )}

          {/* Brand Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-black text-xs font-medium"
            >
              {product.brand}
            </Badge>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-1">
        {/* Product Name and Price on same line */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight flex-1 pr-4">
            {product.name}
          </h3>
          <span className="text-body-medium text-gray-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Category */}
        <p className="text-sm text-gray-600">{product.category}</p>

        {/* Color Count */}
        {product.colorCount && (
          <p className="text-sm text-gray-600">
            {product.colorCount} Colour{product.colorCount > 1 ? 's' : ''}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
