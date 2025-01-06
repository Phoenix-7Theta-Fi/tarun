import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Button } from './components/ui/button';
import { TruckIcon } from 'lucide-react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderList from './components/OrderList';
import ConfirmedOrderList from './components/ConfirmedOrderList';
import LoadingSpinner from './components/ui/loading-spinner';

function App() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <Toaster position="top-center" richColors />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          AgriTech Order Management
        </h1>
        <Button 
          onClick={() => navigate('/order-processing')}
          className="flex items-center gap-2"
        >
          <TruckIcon className="w-4 h-4" />
          Order Processing
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Products
          </h2>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Cart
          </h2>
          <Cart />
        </section>

        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Orders
          </h2>
          <Suspense fallback={<LoadingSpinner />}>
            <OrderList />
          </Suspense>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Confirmed Orders
        </h2>
        <Suspense fallback={<LoadingSpinner />}>
          <ConfirmedOrderList />
        </Suspense>
      </section>
    </main>
  );
}

export default App;