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
  status: 'waitlist' | 'confirmed' | 'processing' | 'shipped' | 'cancelled';
  confirmationDate?: Date;
  processingStartDate?: Date;
  shippingDate?: Date;
  packingStatus: 'pending' | 'completed';
  packedDate?: Date;
}

interface CartContextProps {
  cart: CartItem[];
  orders: Order[];
  confirmedOrders: Order[];
  processingOrders: Order[];
  packedOrders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  cancelOrder: (orderId: string) => void;
  confirmOrder: (orderId: string) => void;
  startProcessing: (orderId: string) => void;
  startShipping: (orderId: string) => void;
  updatePackingStatus: (orderId: string, status: 'pending' | 'completed') => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<Order[]>([]);
  const [processingOrders, setProcessingOrders] = useState<Order[]>([]);
  const [packedOrders, setPackedOrders] = useState<Order[]>([]);

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
      packingStatus: 'pending'
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
      setOrders(prevOrders =>
        prevOrders.filter(order => order.id !== orderId)
      );

      const confirmedOrder: Order = {
        ...orderToConfirm,
        status: 'confirmed' as const,
        confirmationDate: new Date(),
        packingStatus: 'pending'
      };

      setConfirmedOrders(prevConfirmedOrders => [
        confirmedOrder,
        ...prevConfirmedOrders
      ]);
      toast.success(`Order ${orderId.slice(-6)} confirmed!`);
    }
  };

  const startProcessing = (orderId: string) => {
    const orderToProcess = confirmedOrders.find(order => order.id === orderId);

    if (orderToProcess) {
      setConfirmedOrders(prevOrders =>
        prevOrders.filter(order => order.id !== orderId)
      );

      const processingOrder = {
        ...orderToProcess,
        status: 'processing' as const,
        processingStartDate: new Date()
      };

      setProcessingOrders(prevOrders => [
        processingOrder,
        ...prevOrders
      ]);
      toast.success(`Order ${orderId.slice(-6)} started processing!`);
    }
  };

  const startShipping = (orderId: string) => {
    const orderToShip = processingOrders.find(order => order.id === orderId);

    if (orderToShip) {
      setProcessingOrders(prevOrders =>
        prevOrders.filter(order => order.id !== orderId)
      );

      const shippedOrder = {
        ...orderToShip,
        status: 'shipped' as const,
        shippingDate: new Date()
      };

      setOrders(prevOrders => [
        shippedOrder,
        ...prevOrders
      ]);
      toast.success(`Order ${orderId.slice(-6)} is now shipping!`);
    }
  };

  const updatePackingStatus = (orderId: string, status: 'pending' | 'completed') => {
    if (status === 'completed') {
      const orderToMove = confirmedOrders.find(order => order.id === orderId);

      if (orderToMove) {
        // Remove from confirmed orders
        setConfirmedOrders(prevOrders =>
          prevOrders.filter(order => order.id !== orderId)
        );

        // Add to packed orders with packedDate
        const packedOrder: Order = {
          ...orderToMove,
          packingStatus: 'completed',
          packedDate: new Date()
        };

        setPackedOrders(prevPackedOrders => [
          packedOrder,
          ...prevPackedOrders
        ]);

        toast.success(`Order ${orderId.slice(-6)} packing completed and moved to packed orders`);
      }
    } else {
      setConfirmedOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, packingStatus: status }
            : order
        )
      );
      toast.info(`Order ${orderId.slice(-6)} packing status set to pending`);
    }
  };

  const value: CartContextProps = {
    cart,
    orders,
    confirmedOrders,
    processingOrders,
    packedOrders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    createOrder,
    cancelOrder,
    confirmOrder,
    startProcessing,
    startShipping,
    updatePackingStatus,
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