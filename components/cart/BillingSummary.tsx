'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/cart-context';

export default function BillingSummary() {
  const { items, total } = useCart();

  const subtotal = total;
  const originalTotal = items.reduce((sum, item) => {
    return sum + ((item.originalPrice || item.price) * item.quantity);
  }, 0);
  
  const totalSavings = originalTotal - subtotal;
  const deliveryFee = subtotal > 1000 ? 0 : 50;
  const finalTotal = subtotal + deliveryFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({items.length} items)</span>
          <span>Rs. {subtotal.toLocaleString()}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Total Savings</span>
            <span>-Rs. {totalSavings.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>
            Delivery Fee
            {deliveryFee === 0 && (
              <span className="text-green-600 ml-1">(Free above Rs. 1000)</span>
            )}
          </span>
          <span>
            {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
          </span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total Amount</span>
          <span className="text-green-600">Rs. {finalTotal.toLocaleString()}</span>
        </div>

        {deliveryFee > 0 && (
          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
            💡 Add Rs. {(1000 - subtotal).toLocaleString()} more for free delivery!
          </div>
        )}
      </CardContent>
    </Card>
  );
}