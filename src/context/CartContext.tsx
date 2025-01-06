import React, { createContext, useState, useContext } from 'react';
import { Product } from '../data/products';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'waitlist' | 'confirmed' | 'cancelled';
  confirmationDate?: Date;
}

interface CartContextProps {
  cart: CartItem[];
  orders: Order[];
  confirmedOrders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  cancelOrder: (orderId: string) => void;
  confirmOrder: (orderId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success(`${product.name} quantity updated!`);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    toast.error('Product removed from cart.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const sanitizedQuantity = Math.max(1, Math.min(quantity, 99));
    setCart(cart.map(item =>
      item.product.id === productId ? { ...item, quantity: sanitizedQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
    toast.error('Cart cleared.');
  };

  const createOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 15),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      date: new Date(),
      status: 'waitlist',
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    toast.success('Order placed successfully!');
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    toast.error('Order cancelled.');
  };

  const confirmOrder = (orderId: string) => {
    const orderToConfirm = orders.find(order => order.id === orderId);

    if (orderToConfirm) {
      // Remove from waitlist orders
      setOrders(prevOrders =>
        prevOrders.filter(order => order.id !== orderId)
      );

      // Add to confirmed orders with updated status
      const confirmedOrder = {
        ...orderToConfirm,
        status: 'confirmed' as const,
        confirmationDate: new Date()
      };

      setConfirmedOrders(prevConfirmedOrders => [
        confirmedOrder,
        ...prevConfirmedOrders
      ]);
      toast.success(`Order ${orderId.slice(-6)} confirmed!`);
    }
  };

  const value: CartContextProps = {
    cart,
    orders,
    confirmedOrders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder,
    cancelOrder,
    confirmOrder,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};