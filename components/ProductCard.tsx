import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl || '/placeholder-shoe.jpg'}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-white/90 text-black">
              {product.brand}
            </Badge>
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">
          {product.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-gray-700">Sizes: </span>
            <span className="text-sm text-gray-600">
              {product.sizes.slice(0, 3).join(', ')}
              {product.sizes.length > 3 && ` +${product.sizes.length - 3} more`}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Colors: </span>
            <span className="text-sm text-gray-600">
              {product.colors.slice(0, 2).join(', ')}
              {product.colors.length > 2 &&
                ` +${product.colors.length - 2} more`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={!product.inStock}>
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
