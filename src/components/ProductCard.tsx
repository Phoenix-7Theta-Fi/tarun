import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="w-[250px] flex flex-col 
      hover:shadow-lg 
      transition-shadow 
      duration-300 
      border-2 
      hover:border-agri-green/50 
      bg-white 
      dark:bg-gray-800"
    >
      <CardHeader className="pb-2 bg-agri-green-50 dark:bg-agri-green-200/20">
        <CardTitle className="text-lg font-bold text-agri-green dark:text-agri-green-100 truncate">
          {product.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex items-center justify-center p-4">
        {product.image ? (
          <div className="w-full h-48 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-muted/10 flex items-center justify-center rounded-lg">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 p-4 pt-0">
        <div className="flex justify-between items-center w-full">
          <span className="text-lg font-semibold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="flex items-center gap-2"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
        <div className="w-full h-1 bg-primary/10 rounded-full"></div>
      </CardFooter>
    </Card>
  );
}