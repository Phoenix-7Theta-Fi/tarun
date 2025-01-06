import React from 'react';
import OrderProcessingList from '../components/OrderProcessingList';
import ConfirmedOrderList from '../components/ConfirmedOrderList';
import PackedOrderList from '../components/PackedOrderList'; // Import PackedOrderList
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, PackageOpenIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const { confirmedOrders, packedOrders, updatePackingStatus } = useCart(); // Get packedOrders from context

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button
          variant="outline"
          className="mr-4"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold text-primary">
          Order Processing
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5" />
            Confirmed Orders
          </h2>
          <div className="space-y-4">
            {confirmedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-agri-green-50 p-4 rounded-lg border border-agri-green/30 flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">
                    Order ID: {order.id.slice(-6)}
                  </span>
                  <div className="text-sm text-muted-foreground mt-1">
                    {order.items.length} items
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={order.packingStatus === 'pending' ? 'default' : 'outline'}
                    onClick={() => updatePackingStatus(order.id, 'pending')}
                  >
                    Packing Pending
                  </Button>
                  <Button
                    variant={order.packingStatus === 'completed' ? 'default' : 'outline'}
                    onClick={() => updatePackingStatus(order.id, 'completed')}
                  >
                    <PackageOpenIcon className="mr-2 w-4 h-4" />
                    Packing Completed
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Processing Orders
          </h2>
          <OrderProcessingList />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
            <PackageOpenIcon className="w-5 h-5" />
            Packed Orders
          </h2>
          <PackedOrderList /> {/* Render PackedOrderList */}
        </section>
      </div>
    </div>
  );
};

export default OrderProcessingPage;