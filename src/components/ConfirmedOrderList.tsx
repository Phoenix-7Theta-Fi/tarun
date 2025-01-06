import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircleIcon, PackageIcon, PackageOpenIcon } from "lucide-react";
import { Badge } from './ui/badge';

const ConfirmedOrderList = () => {
  const { confirmedOrders, packedOrders } = useCart();

  // Function to check if an order is packed
  const isOrderPacked = (orderId: string) => {
    return packedOrders.some(packedOrder => packedOrder.id === orderId);
  };

  if (confirmedOrders.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No confirmed orders yet</p>
        <p className="text-sm mt-2">Confirmed orders will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-3">
        <CheckCircleIcon className="w-6 h-6" />
        Confirmed Orders
      </h3>
      {confirmedOrders.map((order) => (
        <div
          key={order.id}
          className="
            bg-agri-green-50
            dark:bg-agri-green-100/10
            p-4
            rounded-lg
            border
            border-agri-green/30
          "
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-primary">
              Order ID: {order.id.slice(-6)}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Confirmed on: {order.confirmationDate?.toLocaleString()}
              </span>
              {/* Packing Status Badge */}
              <Badge 
                variant={
                  isOrderPacked(order.id) 
                    ? 'default' 
                    : 'secondary'
                }
                className="flex items-center gap-2"
              >
                {isOrderPacked(order.id) ? (
                  <PackageOpenIcon className="w-4 h-4" />
                ) : (
                  <PackageIcon className="w-4 h-4" />
                )}
                {isOrderPacked(order.id) 
                  ? 'Packing Completed' 
                  : 'Packing Pending'}
              </Badge>
            </div>
          </div>

          {/* Rest of the order details remain the same */}
          <div className="divide-y">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between py-2"
              >
                <div>
                  <span>{item.product.name}</span>
                  <span className="text-muted-foreground ml-2">
                    x {item.quantity}
                  </span>
                </div>
                <span className="font-semibold">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              Total: ₹{order.total.toLocaleString()}
            </span>
            <span className="text-agri-green font-semibold flex items-center">
              <CheckCircleIcon className="mr-2 w-5 h-5" />
              Confirmed
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfirmedOrderList;