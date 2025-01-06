import React from 'react';
import { useCart } from '../context/CartContext';
import { PackageIcon, TruckIcon } from "lucide-react";
import { Button } from './ui/button';

const OrderProcessingList = () => {
  const { processingOrders, startShipping } = useCart();

  if (processingOrders.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No orders in processing</p>
        <p className="text-sm mt-2">Confirmed orders will appear here when processing starts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-3">
        <PackageIcon className="w-6 h-6" />
        Orders in Processing
      </h3>
      {processingOrders.map((order) => (
        <div
          key={order.id}
          className="
            bg-crop-yellow-50
            dark:bg-crop-yellow-100/10
            p-4
            rounded-lg
            border
            border-crop-yellow/30
          "
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-primary">
              Order ID: {order.id.slice(-6)}
            </span>
            <span className="text-sm text-muted-foreground">
              Processing Started: {order.processingStartDate?.toLocaleString()}
            </span>
          </div>

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
            <Button
              onClick={() => startShipping(order.id)}
              className="flex items-center gap-2"
              variant="default"
            >
              <TruckIcon className="w-4 h-4" />
              Start Shipping
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderProcessingList;