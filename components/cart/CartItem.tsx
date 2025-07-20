'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { CartItem as CartItemType } from '@/types';
import { Plus, Minus, Trash2, Star } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { addItem, removeItem, updateQuantity } = useCart();

  const handleIncrement = () => {
    if (item.quantity < item.stock) {
      addItem(item);
    }
  };

  const handleDecrement = () => {
    removeItem(item.id);
  };

  const handleRemove = () => {
    updateQuantity(item.id, 0);
  };

  const itemTotal = item.price * item.quantity;
  const originalTotal = item.originalPrice ? item.originalPrice * item.quantity : null;
  const savings = originalTotal ? originalTotal - itemTotal : 0;

  return (
    <div className="flex items-center space-x-4 py-4">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 line-clamp-2">
          {item.name}
        </h3>
        
        <div className="flex items-center space-x-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(item.rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">({item.rating})</span>
        </div>

        <div className="flex items-center space-x-2 mt-1">
          <span className="font-semibold text-green-600">
            Rs. {item.price.toLocaleString()}
          </span>
          {item.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {item.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-xs text-gray-500">
            {item.unit}
          </span>
        </div>

        {savings > 0 && (
          <div className="text-xs text-green-600 mt-1">
            You save Rs. {savings.toLocaleString()}
          </div>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrement}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          disabled={item.quantity >= item.stock}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Total Price */}
      <div className="flex flex-col items-end">
        <div className="font-semibold text-gray-900">
          Rs. {itemTotal.toLocaleString()}
        </div>
        {originalTotal && (
          <div className="text-sm text-gray-500 line-through">
            Rs. {originalTotal.toLocaleString()}
          </div>
        )}
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 p-2"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}