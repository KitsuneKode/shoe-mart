'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShoppingBag, User, LogOut, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { products, loading, error, fetchProducts } = useAppStore();
  const [authStatus, setAuthStatus] = useState<
    'loading' | 'authenticated' | 'guest'
  >('loading');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
    checkAuthStatus();
  }, [fetchProducts]);

  const checkAuthStatus = async () => {
    try {
      // Check if user is authenticated by looking for auth session cookie
      const hasAuthSession = document.cookie.includes('auth_session');
      if (hasAuthSession) {
        setAuthStatus('authenticated');
        // In a real app, you'd fetch user details here
        setUser({ email: 'user@example.com', name: 'Authenticated User' });
      } else {
        setAuthStatus('guest');
        setUser(null);
      }
    } catch (error) {
      setAuthStatus('guest');
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      // Clear cookies and redirect to sign in
      document.cookie =
        'auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie =
        'guest_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setAuthStatus('guest');
      setUser(null);
      window.location.href = '/sign-in';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Products
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Authentication Status Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {authStatus === 'authenticated'
                  ? 'Authenticated User'
                  : 'Guest User'}
              </p>
              <p className="text-xs text-gray-600">
                {authStatus === 'authenticated'
                  ? `Signed in as ${user?.email || 'User'}`
                  : 'Browse as guest - sign in to checkout'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {authStatus === 'authenticated' ? (
              <>
                <Link href="/checkout">
                  <Button size="sm" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Checkout
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button size="sm" variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Premium Footwear Collection
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the latest styles from top brands like Nike and Adidas. From
          running shoes to lifestyle sneakers, we have everything you need.
        </p>
        {authStatus === 'guest' && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">
              💡 <strong>Pro tip:</strong> You can browse and add items to cart
              as a guest!
            </p>
            <p className="text-sm text-gray-600">
              Sign in when you're ready to checkout and your cart will be saved.
            </p>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600">
            Try refreshing the page or check your database connection.
          </p>
        </div>
      )}
    </div>
  );
}
