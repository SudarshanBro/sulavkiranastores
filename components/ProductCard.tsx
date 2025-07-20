'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { Product } from '@/types';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onImageOrNameClick?: () => void;
  hideImageAndName?: boolean;
}

export default function ProductCard({ product, onImageOrNameClick, hideImageAndName }: ProductCardProps) {
  const { addItem, removeItem, getItemQuantity } = useCart();
  const { addLoyaltyPoints } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  const quantity = getItemQuantity(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      addLoyaltyPoints(10);
    }
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleIncrement = () => {
    addItem(product);
  };

  const handleDecrement = () => {
    removeItem(product.id);
  };

  return (
    <Card 
      className="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 flex-1">
        {!hideImageAndName && (
          <div className="relative mb-4">
            <div 
              className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
              onClick={onImageOrNameClick}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2"
              >
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 bg-orange-100 text-orange-800"
              >
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge 
                variant="secondary" 
                className="absolute top-2 right-2 bg-red-100 text-red-800"
              >
                Out of Stock
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2">
          {!hideImageAndName && (
            <h3 
              className="font-semibold text-sm line-clamp-2 text-gray-900 cursor-pointer hover:underline"
              onClick={onImageOrNameClick}
            >
              {product.name}
            </h3>
          )}
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-green-600">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {product.unit} • Stock: {product.stock}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button 
            onClick={handleAddToCart}
            className="w-full transition-all duration-200"
            disabled={product.stock === 0}
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrement}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-semibold text-sm px-3">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrement}
              className="h-8 w-8 p-0"
              disabled={quantity >= product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}