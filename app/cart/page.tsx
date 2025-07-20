'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/cart/CartItem';
import BillingSummary from '@/components/cart/BillingSummary';
import PaymentOptions from '@/components/cart/PaymentOptions';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function CartPage() {
  const { items, total } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addLoyaltyPoints } = useAuth();

  const handleCheckout = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      addLoyaltyPoints(20);
      alert(`Payment processed successfully via ${selectedPayment}!`);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
            <Link href="/groceries">
              <Button size="lg">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id}>
                    <CartItem item={item} />
                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Checkout Section */}
          <div className="space-y-6">
            <BillingSummary />
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentOptions 
                  selectedPayment={selectedPayment}
                  onPaymentSelect={setSelectedPayment}
                />
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing || !selectedPayment}
                >
                  {isProcessing ? 'Processing...' : `Pay Rs. ${total.toLocaleString()}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}