import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Trash2Icon, MinusIcon, PlusIcon } from "lucide-react";
import { CartItem } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, createOrder, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>Your cart is empty</p>
        <p className="text-sm mt-2">Start adding products to your cart</p>
      </div>
    );
  }

  return (
    <div className="space-y-4
      bg-soil-brown-50
      dark:bg-soil-brown-100/10
      p-4
      rounded-lg"
    >
      <div className="divide-y">
        {cart.map((item: CartItem) => (
          <div
            key={item.product.id}
            className="flex justify-between items-center py-3 hover:bg-muted/20 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="font-medium">{item.product.name}</span>
              
              {/* Quantity Control */}
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <span className="px-3 text-sm">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= 99}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-primary">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.product.id)}
              >
                <Trash2Icon className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Rest of the component remains the same */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="text-lg font-bold">Total</span>
          <span className="text-xl font-bold text-primary">
            ₹{calculateTotal().toLocaleString()}
          </span>
        </div>

        <div className="space-y-2">
          <Button
            onClick={clearCart}
            variant="destructive"
            className="w-full"
          >
            <Trash2Icon className="mr-2 w-4 h-4" />
            Clear Cart
          </Button>
          <Button
            className="w-full"
            onClick={createOrder}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;