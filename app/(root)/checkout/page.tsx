import { requireAuth } from '@/lib/auth-utils';

export default async function CheckoutPage() {
  // This will redirect to sign-in if not authenticated
  const user = await requireAuth('/sign-in');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <p className="text-gray-600">
              Welcome, {user.name || user.email}! You're now ready to complete
              your purchase.
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Shipping Information
            </h3>
            <p className="text-gray-600">
              This is a protected checkout page that requires authentication. If
              you can see this, you're successfully authenticated as{' '}
              {user.email}.
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Payment Method
            </h3>
            <p className="text-gray-600">
              Payment integration would go here in a real application.
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
