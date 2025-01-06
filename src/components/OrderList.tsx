import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { CheckCircle2Icon, Trash2Icon, PackageIcon } from "lucide-react";

const OrderList = () => {
  const { orders, confirmOrder, cancelOrder } = useCart();

  if (orders.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No orders in the waitlist</p>
        <p className="text-sm mt-2">Your orders will appear here after checkout</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-primary flex items-center gap-3">
        <PackageIcon className="w-6 h-6" />
        Order Waitlist
      </h3>
      {orders.map((order) => (
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
              {order.date.toLocaleString()}
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
            <div className="space-x-2">
              <Button
                size="sm"
                onClick={() => cancelOrder(order.id)}
                variant="destructive"
              >
                <Trash2Icon className="mr-2 w-4 h-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => confirmOrder(order.id)}
              >
                <CheckCircle2Icon className="mr-2 w-4 h-4" />
                Confirm
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;