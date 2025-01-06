import React, { Suspense, lazy } from 'react';
import { 
  ShoppingCartIcon, 
  PackageIcon, 
  CheckCircleIcon, 
  Loader2Icon 
} from 'lucide-react';

// Lazy load components for better performance
const Cart = lazy(() => import('./components/Cart'));
const OrderList = lazy(() => import('./components/OrderList'));
const ConfirmedOrderList = lazy(() => import('./components/ConfirmedOrderList'));
const ProductList = lazy(() => import('./components/ProductList'));

// Loading Fallback Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <Loader2Icon 
      className="animate-spin text-primary" 
      size={48} 
    />
  </div>
);

function App() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Product Listing Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-3">
            <PackageIcon className="w-6 h-6" />
            Agricultural Products
          </h2>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        </section>

        {/* Cart and Order Management Section */}
        <section className="lg:border-l lg:pl-6 space-y-6">
          {/* Shopping Cart Subsection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-3">
              <ShoppingCartIcon className="w-6 h-6" />
              Shopping Cart
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              <Cart />
            </Suspense>
          </div>

          {/* Order Waitlist Subsection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-3">
              <PackageIcon className="w-6 h-6" />
              Order Waitlist
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderList />
            </Suspense>
          </div>

          {/* Confirmed Orders Subsection */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6" />
              Confirmed Orders
            </h2>
            <Suspense fallback={<LoadingSpinner />}>
              <ConfirmedOrderList />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;