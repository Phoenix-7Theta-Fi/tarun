import React from 'react';
import { useCart } from '../context/CartContext';
import { PackageOpenIcon } from "lucide-react";

const PackedOrderList = () => {
  const { packedOrders } = useCart();

  if (packedOrders.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No packed orders yet</p>
        <p className="text-sm mt-2">Orders will appear here when packing is completed</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {packedOrders.map((order) => (
        <div
          key={order.id}
          className="bg-crop-yellow-50 p-4 rounded-lg border border-crop-yellow/30"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium text-primary">
              Order ID: {order.id.slice(-6)}
            </span>
            <span className="text-sm text-muted-foreground">
              Packed on: {new Date().toLocaleString()}
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
            <span className="text-agri-green font-semibold flex items-center">
              <PackageOpenIcon className="mr-2 w-5 h-5" />
              Packed
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackedOrderList;